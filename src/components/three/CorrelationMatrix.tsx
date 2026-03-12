import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GRID = 12;

/** Scene 3: Animated correlation/covariance matrix heatmap in 3D */
export function CorrelationMatrix() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Generate correlation values
  const cells = useMemo(() => {
    const data: { x: number; z: number; corr: number; baseCorr: number }[] = [];
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const dist = Math.abs(i - j);
        const baseCorr = i === j ? 1 : Math.max(-0.3, 1 - dist * 0.18 + (Math.random() - 0.5) * 0.3);
        data.push({
          x: (i - GRID / 2 + 0.5) * 0.55,
          z: (j - GRID / 2 + 0.5) * 0.55,
          corr: baseCorr,
          baseCorr,
        });
      }
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.5;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.2) * 0.3 + 0.5;
    }

    // Animate bar heights
    cells.forEach((cell, idx) => {
      const mesh = meshRefs.current[idx];
      if (mesh) {
        const noise = Math.sin(timeRef.current + cell.x * 3) * Math.cos(timeRef.current * 0.7 + cell.z * 2) * 0.15;
        const newCorr = Math.max(-0.5, Math.min(1, cell.baseCorr + noise));
        const height = Math.abs(newCorr) * 2.5 + 0.05;
        mesh.scale.y = height;
        mesh.position.y = height / 2;

        // Color: cyan for positive, white for negative, brighter for stronger
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (newCorr > 0) {
          const intensity = newCorr;
          mat.color.setRGB(0, intensity * 0.85, intensity);
          mat.emissive.setRGB(0, intensity * 0.3, intensity * 0.4);
        } else {
          const intensity = Math.abs(newCorr);
          mat.color.setRGB(intensity * 0.8, intensity * 0.8, intensity * 0.8);
          mat.emissive.setRGB(intensity * 0.1, intensity * 0.1, intensity * 0.1);
        }
      }
    });
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 5, 0, 0]} position={[0, -1, 0]}>
      {cells.map((cell, idx) => (
        <mesh
          key={idx}
          ref={(el) => { meshRefs.current[idx] = el; }}
          position={[cell.x, 0, cell.z]}
        >
          <boxGeometry args={[0.45, 1, 0.45]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Grid base lines */}
      {Array.from({ length: GRID + 1 }).map((_, i) => {
        const pos = (i - GRID / 2) * 0.55;
        const half = (GRID / 2) * 0.55;
        return (
          <group key={i}>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([pos, 0, -half, pos, 0, half]), 3]}
                  count={2}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#222222" transparent opacity={0.6} />
            </line>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-half, 0, pos, half, 0, pos]), 3]}
                  count={2}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#222222" transparent opacity={0.6} />
            </line>
          </group>
        );
      })}
    </group>
  );
}
