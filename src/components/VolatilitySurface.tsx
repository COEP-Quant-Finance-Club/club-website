import { useRef, useMemo, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

function Surface() {
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const size = 40;
    const geo = new THREE.PlaneGeometry(6, 6, size, size);
    const pos = geo.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < pos.count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1];
      const r = Math.sqrt(x * x + y * y);
      arr[i * 3 + 2] = Math.exp(-r * 0.3) * (1 + 0.5 * Math.sin(x * 1.5) * Math.cos(y * 1.5));
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta * 0.3;
    const pos = geometry.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < pos.count; i++) {
      const x = arr[i * 3];
      const y = arr[i * 3 + 1];
      const r = Math.sqrt(x * x + y * y);
      arr[i * 3 + 2] =
        Math.exp(-r * 0.3) *
        (1 + 0.5 * Math.sin(x * 1.5 + timeRef.current) * Math.cos(y * 1.5 + timeRef.current * 0.7));
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 3, 0, Math.PI / 6]}>
      <meshStandardMaterial wireframe color="#ffffff" emissive="#00D9FF" emissiveIntensity={0.15} />
    </mesh>
  );
}

function Axes() {
  const axisColor = "#666666";
  const accentColor = "#00D9FF";
  return (
    <group rotation={[-Math.PI / 3, 0, Math.PI / 6]}>
      <Line points={[[-3.5, 0, 0], [3.5, 0, 0]]} color={axisColor} lineWidth={1} />
      <Line points={[[0, -3.5, 0], [0, 3.5, 0]]} color={axisColor} lineWidth={1} />
      <Line points={[[0, 0, -0.5], [0, 0, 2.5]]} color={accentColor} lineWidth={1} />
      <Text position={[4, 0, 0]} fontSize={0.22} color={accentColor} anchorX="left">
        Strike Price
      </Text>
      <Text position={[0, 4, 0]} fontSize={0.22} color={accentColor} anchorX="center">
        Time to Maturity
      </Text>
      <Text position={[0, 0, 2.8]} fontSize={0.22} color={accentColor} anchorX="center">
        Implied Vol (σ)
      </Text>
    </group>
  );
}

export default function VolatilitySurface() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Canvas camera={{ position: [5, 4, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Surface />
        <Axes />
        <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
