import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getThemeColor } from "./themeColor";

const PATH_LENGTH = 60;

interface MonteCarloPathsProps {
  mobile: boolean;
  animate: boolean;
}

export function MonteCarloPaths({ mobile, animate }: MonteCarloPathsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const particleCount = mobile ? 180 : 500;
  const pathCount = mobile ? 32 : 64;
  const accent = getThemeColor("--accent");
  const neutral = getThemeColor("--muted-foreground");

  const pathsData = useMemo(() => {
    const paths: Float32Array[] = [];
    const colors: Float32Array[] = [];

    for (let p = 0; p < pathCount; p++) {
      const positions = new Float32Array(PATH_LENGTH * 3);
      const color = new Float32Array(PATH_LENGTH * 3);
      let price = 0;
      const drift = (Math.random() - 0.5) * 0.02;
      const vol = 0.03 + Math.random() * 0.06;

      for (let i = 0; i < PATH_LENGTH; i++) {
        const x = (i / PATH_LENGTH) * 8 - 4;
        price += drift + vol * (Math.random() * 2 - 1);
        const z = (Math.random() - 0.5) * 2;

        positions[i * 3] = x;
        positions[i * 3 + 1] = price;
        positions[i * 3 + 2] = z;

        const intensity = Math.abs(price) * 2;
        const colorValue = (price >= 0 ? accent : neutral).clone().multiplyScalar(
          0.55 + 0.45 * Math.min(intensity, 1),
        );
        color[i * 3] = colorValue.r;
        color[i * 3 + 1] = colorValue.g;
        color[i * 3 + 2] = colorValue.b;
      }
      paths.push(positions);
      colors.push(color);
    }
    return { paths, colors };
  }, [accent, neutral, pathCount]);

  const pointsGeo = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const isAccent = Math.random() > 0.7;
      const color = isAccent ? accent : neutral;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [accent, neutral, particleCount]);

  useFrame((_, delta) => {
    if (!animate) return;
    timeRef.current += delta * 0.15;
    if (groupRef.current) {
      groupRef.current.rotation.y = timeRef.current * 0.3;
    }

    // Animate particles
    const pos = pointsGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 1] += Math.sin(timeRef.current * 2 + i * 0.1) * 0.002;
    }
    pointsGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {pathsData.paths.map((positions, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
              count={PATH_LENGTH}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[pathsData.colors[i], 3]}
              count={PATH_LENGTH}
            />
          </bufferGeometry>
          <lineBasicMaterial vertexColors transparent opacity={0.35} />
        </line>
      ))}

      <points geometry={pointsGeo}>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>

      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([-5, 0, 0, 5, 0, 0]), 3]} count={2} />
        </bufferGeometry>
        <lineBasicMaterial color={accent} transparent opacity={0.45} />
      </line>
    </group>
  );
}
