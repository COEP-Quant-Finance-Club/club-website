import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { SceneKey } from "./SceneCarousel";

const SceneCarousel = lazy(() => import("./SceneCarousel"));

const storyScenes = [
  { sectionId: "index-showcase", key: "vol" },
  { sectionId: "projects", key: "mc" },
  { sectionId: "events", key: "corr" },
  { sectionId: "blogs", key: "hft" },
  { sectionId: "contact-cta", key: "cross" },
] as const;

export default function MathModelsSection() {
  const [activeScene, setActiveScene] = useState<SceneKey | null>(null);
  const ratios = useRef(new Map<string, number>());

  useEffect(() => {
    const targets = storyScenes
      .map(({ sectionId, key }) => ({
        element: document.getElementById(sectionId),
        key,
      }))
      .filter(
        (target): target is { element: HTMLElement; key: SceneKey } =>
          target.element !== null,
      );

    if (!("IntersectionObserver" in window)) {
      setActiveScene(targets[0]?.key ?? null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        const current = targets
          .map(({ element, key }) => ({
            key,
            ratio: ratios.current.get(element.id) ?? 0,
          }))
          .filter(({ ratio }) => ratio > 0)
          .sort((a, b) => b.ratio - a.ratio)[0];

        setActiveScene(current?.key ?? null);
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    targets.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-[12vh] left-0 z-0 h-[30vh] w-full overflow-hidden transition-opacity duration-700 md:inset-y-20 md:bottom-auto md:left-auto md:right-0 md:h-auto md:w-[min(42vw,600px)] ${
          activeScene ? "opacity-[0.08] md:opacity-[0.16]" : "opacity-0"
        }`}
      >
        {activeScene && (
          <Suspense fallback={null}>
            <SceneCarousel activeSceneKey={activeScene} />
          </Suspense>
        )}
      </div>
      <p className="sr-only">
        Mathematical Physics &amp; Simulations. 3D Quantitative Visualizers. Interactive real-time
        3D models for implied volatility surfaces, geometric Brownian motion paths, dynamic
        correlation structures, and limit order book heatmaps.
      </p>
    </>
  );
}
