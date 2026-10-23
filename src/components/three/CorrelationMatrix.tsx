import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThemeColor } from "./themeColor";

interface CorrelationMatrixProps {
  mobile: boolean;
  animate: boolean;
}

export function CorrelationMatrix({ mobile, animate }: CorrelationMatrixProps) {
  const grid = mobile ? 8 : 12;
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const accentColor = getThemeColor("--accent");
  const neutralColor = getThemeColor("--muted-foreground");
  const gridColor = getThemeColor("--border");

  const cells = useMemo(() => {
    const data: { x: number; z: number; corr: number; baseCorr: number }[] = [];
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        const dist = Math.abs(i - j);
        const baseCorr = i === j ? 1 : Math.max(-0.3, 1 - dist * 0.18 + (Math.random() - 0.5) * 0.3);
        data.push({
          x: (i - grid / 2 + 0.5) * 0.55,
          z: (j - grid / 2 + 0.5) * 0.55,
          corr: baseCorr,
          baseCorr,
        });
      }
    }
    return data;
  }, [grid]);

  useFrame((_, delta) => {
    if (!animate) return;
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

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (newCorr > 0) {
          const intensity = newCorr;
          mat.color.copy(accentColor).multiplyScalar(0.35 + intensity * 0.65);
          mat.emissive.copy(mat.color).multiplyScalar(0.15);
        } else {
          const intensity = Math.abs(newCorr);
          mat.color.copy(neutralColor).multiplyScalar(0.35 + intensity * 0.65);
          mat.emissive.copy(mat.color).multiplyScalar(0.08);
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
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.12}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {Array.from({ length: grid + 1 }).map((_, i) => {
        const pos = (i - grid / 2) * 0.55;
        const half = (grid / 2) * 0.55;
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
              <lineBasicMaterial color={gridColor} transparent opacity={0.7} />
            </line>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-half, 0, pos, half, 0, pos]), 3]}
                  count={2}
                />
              </bufferGeometry>
              <lineBasicMaterial color={gridColor} transparent opacity={0.7} />
            </line>
          </group>
        );
      })}
    </group>
  );
}
