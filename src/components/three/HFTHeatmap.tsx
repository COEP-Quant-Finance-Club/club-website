import { useEffect, useState } from "react";

const GRID = 14;

// 🔥 tweak these if needed
const ZOOM_MIN = 0.9;     // start zoomed out
const ZOOM_MAX = 1.00;    // final zoom level
const ZOOM_SPEED = 0.0005; // lower = slower cinematic zoom

function generateInitialData() {
  return Array.from({ length: GRID * GRID }, () =>
    Number((Math.random() * 2 - 1).toFixed(2))
  );
}

export default function HFTHeatmap2D() {
  const [data, setData] = useState<number[]>(generateInitialData());
  const [scale, setScale] = useState(ZOOM_MIN);

  // detect theme
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  // 🔹 live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((v) => {
          const next = v + (Math.random() - 0.5) * 0.08;
          return Math.max(-1, Math.min(1, Number(next.toFixed(2))));
        })
      );
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // 🔥 TRUE cinematic zoom IN only (no zoom out)
  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => {
        if (prev >= ZOOM_MAX) return prev; // stop at max
        return prev + ZOOM_SPEED;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "550px",
        background: isDark ? "black" : "transparent", // ✅ fixed light mode
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${GRID}, 1fr)`,
          gap: "2px",
          padding: "40px", // spacing for overlay text
          transform: `scale(${scale})`,
          transition: "transform 0.1s linear", // smooth motion
        }}
      >
        {data.map((value, i) => {
          const intensity = Math.abs(value);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "monospace",
                fontSize: "12px",

                backgroundColor: isDark
                  ? `rgba(0, 217, 255, ${0.1 + intensity * 0.9})`
                  : `rgba(0, 217, 255, ${0.08 + intensity * 0.5})`,

                color: isDark ? "#00D9FF" : "#0284c7",
              }}
            >
              {value > 0 ? "+" : ""}
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}