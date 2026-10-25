import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThemeColor } from "./themeColor";

interface VolSurfaceProps {
  mobile: boolean;
  animate: boolean;
}

function updateSurface(geometry: THREE.PlaneGeometry, time: number) {
  const position = geometry.attributes.position;
  const vertices = position.array as Float32Array;
  for (let i = 0; i < position.count; i++) {
    const x = vertices[i * 3];
    const y = vertices[i * 3 + 1];
    const smile = 0.15 * (x * x) / 16;
    const skew = -0.08 * x / 4;
    const termStructure = 0.3 * Math.exp(-Math.abs(y) * 0.2);
    const noise = 0.12 * Math.sin(x * 2.5 + time) * Math.cos(y * 2 + time * 0.6);
    vertices[i * 3 + 2] = smile + skew + termStructure + noise + 0.6;
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
}

export function VolSurface({ mobile, animate }: VolSurfaceProps) {
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const resolution = mobile ? 24 : 38;
    const geo = new THREE.PlaneGeometry(8, 8, resolution, resolution);
    updateSurface(geo, 0);
    return geo;
  }, [mobile]);

  useFrame((_, delta) => {
    if (!animate) return;
    timeRef.current += delta * 0.4;
    updateSurface(geometry, timeRef.current);
  });

  const surfaceColor = getThemeColor("--accent");
  const gridColor = getThemeColor("--border");
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
          color={surfaceColor}
          emissive={surfaceColor}
          emissiveIntensity={0.08}
          transparent
          opacity={0.8}
        />
      </mesh>
      {gridLines.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(pts.flatMap(p => [p.x, p.y, p.z])), 3]}
              count={2}
            />
          </bufferGeometry>
          <lineBasicMaterial color={gridColor} transparent opacity={0.55} />
        </line>
      ))}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([-4.5, 0, 0, 4.5, 0, 0]), 3]} count={2} />
        </bufferGeometry>
        <lineBasicMaterial color={gridColor} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([0, -4.5, 0, 0, 4.5, 0]), 3]} count={2} />
        </bufferGeometry>
        <lineBasicMaterial color={gridColor} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, -0.2, 0, 0, 2.5]), 3]} count={2} />
        </bufferGeometry>
        <lineBasicMaterial color={surfaceColor} />
      </line>
    </group>
  );
}
