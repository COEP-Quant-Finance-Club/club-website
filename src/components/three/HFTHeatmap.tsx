import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface HFTHeatmapProps {
  isDark: boolean;
  mobile: boolean;
}

function createData(size: number) {
  return Array.from({ length: size * size }, () => Number((Math.random() * 2 - 1).toFixed(2)));
}

export default function HFTHeatmap({ isDark, mobile }: HFTHeatmapProps) {
  const gridSize = mobile ? 10 : 14;
  const [data, setData] = useState(() => createData(gridSize));
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setData(createData(gridSize));
  }, [gridSize]);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setData((previous) =>
        previous.map((value) => {
          const next = value + (Math.random() - 0.5) * 0.08;
          return Math.max(-1, Math.min(1, Number(next.toFixed(2))));
        }),
      );
    }, 500);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="flex h-full w-full items-center justify-center p-5 sm:p-10">
      <div
        className="grid h-full w-full max-w-3xl gap-1"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        role="img"
        aria-label="High-frequency market activity intensity grid"
      >
        {data.map((value, index) => {
          const intensity = Math.abs(value);
          return (
            <div
              key={index}
              aria-hidden="true"
              className="flex items-center justify-center rounded-sm font-mono text-[9px] tabular-nums sm:text-xs"
              style={{
                backgroundColor: `rgba(var(--accent), ${0.07 + intensity * (isDark ? 0.39 : 0.22)})`,
                color: "rgb(var(--foreground))",
              }}
            >
              {value > 0 ? "+" : ""}
              {value.toFixed(2)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
