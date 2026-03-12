import { useState, useEffect, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { VolSurface } from "./three/VolSurface";
import { MonteCarloPaths } from "./three/MonteCarloPaths";
import { CorrelationMatrix } from "./three/CorrelationMatrix";

const SCENES = [
  {
    key: "vol",
    label: "Volatility Surface",
    tag: "∂V/∂t + ½σ²S²∂²V/∂S²",
    description: "Implied volatility smile across strikes and maturities",
  },
  {
    key: "mc",
    label: "Monte Carlo Paths",
    tag: "dS = μSdt + σSdW",
    description: "Geometric Brownian Motion simulation trajectories",
  },
  {
    key: "corr",
    label: "Correlation Matrix",
    tag: "ρᵢⱼ = Cov(Xᵢ,Xⱼ) / σᵢσⱼ",
    description: "Dynamic asset correlation structure",
  },
];

export default function SceneCarousel() {
  const [activeScene, setActiveScene] = useState(0);
  const [fade, setFade] = useState(true);

  const cycleScene = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setActiveScene((prev) => (prev + 1) % SCENES.length);
      setFade(true);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleScene, 8000);
    return () => clearInterval(interval);
  }, [cycleScene]);

  const scene = SCENES[activeScene];

  return (
    <div className="relative w-full">
      {/* Scene label overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
        <span className="label-style text-accent">{scene.label}</span>
        <span className="text-xs text-muted-foreground font-mono">{scene.tag}</span>
      </div>

      {/* Scene selector dots */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {SCENES.map((s, i) => (
          <button
            key={s.key}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setActiveScene(i);
                setFade(true);
              }, 300);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeScene
                ? "bg-accent scale-125"
                : "bg-muted-foreground/40 hover:bg-muted-foreground"
            }`}
            aria-label={`View ${s.label}`}
          />
        ))}
      </div>

      {/* Description */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="text-xs text-muted-foreground font-mono">{scene.description}</span>
      </div>

      {/* 3D Canvas */}
      <div
        style={{ width: "100%", height: "550px" }}
        className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
      >
        <Canvas camera={{ position: [6, 4, 6], fov: 42 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <pointLight position={[-5, 5, -5]} intensity={0.3} color="#00D9FF" />
          <Suspense fallback={null}>
            {activeScene === 0 && <VolSurface />}
            {activeScene === 1 && <MonteCarloPaths />}
            {activeScene === 2 && <CorrelationMatrix />}
          </Suspense>
          <OrbitControls
            enableZoom
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </div>
    </div>
  );
}
