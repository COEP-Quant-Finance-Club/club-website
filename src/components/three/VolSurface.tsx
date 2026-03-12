import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Scene 1: Animated volatility surface with data grid */
export function VolSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const res = 50;
    const geo = new THREE.PlaneGeometry(8, 8, res, res);
    return geo;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.4;
    const pos = geometry.attributes.position;
    const arr = pos.array as Float32Array;
    const t = timeRef.current;

    for (let i = 0; i < pos.count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1];
      const r = Math.sqrt(x * x + y * y);
      // Implied vol smile shape + time decay
      const smile = 0.15 * (x * x) / 16;
      const skew = -0.08 * x / 4;
      const termStructure = 0.3 * Math.exp(-Math.abs(y) * 0.2);
      const noise = 0.12 * Math.sin(x * 2.5 + t) * Math.cos(y * 2 + t * 0.6);
      arr[i * 3 + 2] = smile + skew + termStructure + noise + 0.6;
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  // Generate grid lines
  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = -4; i <= 4; i += 0.8) {
      lines.push([new THREE.Vector3(i, -4, -0.01), new THREE.Vector3(i, 4, -0.01)]);
      lines.push([new THREE.Vector3(-4, i, -0.01), new THREE.Vector3(4, i, -0.01)]);
    }
    return lines;
  }, []);

  return (
    <group rotation={[-Math.PI / 3.5, 0, Math.PI / 7]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          wireframe
          color="#ffffff"
          emissive="#00D9FF"
          emissiveIntensity={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Base grid */}
      {gridLines.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(pts.flatMap(p => [p.x, p.y, p.z])), 3]}
              count={2}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1a1a1a" transparent opacity={0.5} />
        </line>
      ))}
      {/* Axes */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([-4.5, 0, 0, 4.5, 0, 0]), 3]} count={2} />
        </bufferGeometry>
        <lineBasicMaterial color="#444444" />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([0, -4.5, 0, 0, 4.5, 0]), 3]} count={2} />
        </bufferGeometry>
        <lineBasicMaterial color="#444444" />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, -0.2, 0, 0, 2.5]), 3]} count={2} />
        </bufferGeometry>
        <lineBasicMaterial color="#00D9FF" />
      </line>
    </group>
  );
}
