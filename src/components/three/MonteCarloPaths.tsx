import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;
const PATH_LENGTH = 60;

/** Scene 2: Monte Carlo simulation paths — Geometric Brownian Motion */
export function MonteCarloPaths() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Pre-generate random walk paths
  const pathsData = useMemo(() => {
    const paths: Float32Array[] = [];
    const colors: Float32Array[] = [];

    for (let p = 0; p < 80; p++) {
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

        // Color based on return: cyan for positive, white for negative
        const intensity = Math.abs(price) * 2;
        if (price >= 0) {
          color[i * 3] = 0;
          color[i * 3 + 1] = 0.85 * Math.min(intensity, 1);
          color[i * 3 + 2] = 1;
        } else {
          color[i * 3] = 1;
          color[i * 3 + 1] = 1;
          color[i * 3 + 2] = 1;
        }
      }
      paths.push(positions);
      colors.push(color);
    }
    return { paths, colors };
  }, []);

  // Floating data points
  const pointsGeo = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const isAccent = Math.random() > 0.7;
      colors[i * 3] = isAccent ? 0 : 0.4;
      colors[i * 3 + 1] = isAccent ? 0.85 : 0.4;
      colors[i * 3 + 2] = isAccent ? 1 : 0.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.15;
    if (groupRef.current) {
      groupRef.current.rotation.y = timeRef.current * 0.3;
    }

    // Animate particles
    const pos = pointsGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] += Math.sin(timeRef.current * 2 + i * 0.1) * 0.002;
    }
    pointsGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Simulation paths */}
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

      {/* Data points cloud */}
      <points geometry={pointsGeo}>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>

      {/* Central axis */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([-5, 0, 0, 5, 0, 0]), 3]} count={2} />
        </bufferGeometry>
        <lineBasicMaterial color="#00D9FF" transparent opacity={0.4} />
      </line>
    </group>
  );
}
