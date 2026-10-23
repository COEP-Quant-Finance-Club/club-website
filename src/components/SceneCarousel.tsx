import { lazy, Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

const VolSurface = lazy(() =>
  import("./three/VolSurface").then((module) => ({ default: module.VolSurface })),
);
const MonteCarloPaths = lazy(() =>
  import("./three/MonteCarloPaths").then((module) => ({ default: module.MonteCarloPaths })),
);
const CorrelationMatrix = lazy(() =>
  import("./three/CorrelationMatrix").then((module) => ({ default: module.CorrelationMatrix })),
);
const HFTHeatmap = lazy(() => import("./three/HFTHeatmap"));
const CrossoverMap = lazy(() => import("./three/CrossoverMap"));

const scenes = [
  { key: "vol", label: "Volatility Surface" },
  { key: "mc", label: "Monte Carlo Paths" },
  { key: "corr", label: "Correlation Matrix" },
  { key: "hft", label: "HFT Heatmap" },
  { key: "cross", label: "FX Cross Rates" },
] as const;

export type SceneKey = (typeof scenes)[number]["key"];

interface SceneCarouselProps {
  activeSceneKey: SceneKey;
}

function SceneFallback({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" aria-label={label} role="img">
      <path
        d="M24 250H456M24 200H456M24 150H456M24 100H456M24 50H456"
        fill="none"
        stroke="rgb(var(--border))"
        strokeOpacity=".65"
      />
      <path
        d="M24 222C70 192 92 214 128 172S195 181 238 139 308 159 348 107 414 119 456 55"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="2"
      />
    </svg>
  );
}

function SceneLoading() {
  return <div className="h-full w-full" aria-hidden="true" />;
}

function hasWebGL() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
  context?.getExtension("WEBGL_lose_context")?.loseContext();
  return Boolean(context);
}

export default function SceneCarousel({ activeSceneKey }: SceneCarouselProps) {
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches,
  );
  const [webglAvailable] = useState(hasWebGL);
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const scene = scenes.find(({ key }) => key === activeSceneKey) ?? scenes[0];
  const lowEndDevice =
    !webglAvailable || (isMobile && (navigator.hardwareConcurrency || 4) <= 4);
  const render3D = tabVisible && !lowEndDevice;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(media.matches);
    const updateVisibility = () => setTabVisible(!document.hidden);
    media.addEventListener("change", updateViewport);
    document.addEventListener("visibilitychange", updateVisibility);
    updateViewport();
    updateVisibility();
    return () => {
      media.removeEventListener("change", updateViewport);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  if (!render3D) return <SceneFallback label={scene.label} />;

  if (activeSceneKey === "hft") {
    return (
      <Suspense fallback={<SceneLoading />}>
        <HFTHeatmap isDark={isDark} mobile={isMobile} />
      </Suspense>
    );
  }

  if (activeSceneKey === "cross") {
    return (
      <Suspense fallback={<SceneLoading />}>
        <CrossoverMap isDark={isDark} />
      </Suspense>
    );
  }

  return (
    <Canvas
      camera={{ position: [6, 4, 6], fov: 42 }}
      dpr={isMobile ? 1 : [1, 1.15]}
      frameloop={reduceMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.35} />
      <Suspense fallback={null}>
        {activeSceneKey === "vol" && <VolSurface mobile={isMobile} animate={!reduceMotion} />}
        {activeSceneKey === "mc" && (
          <MonteCarloPaths mobile={isMobile} animate={!reduceMotion} />
        )}
        {activeSceneKey === "corr" && (
          <CorrelationMatrix mobile={isMobile} animate={!reduceMotion} />
        )}
      </Suspense>
    </Canvas>
  );
}
