import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

/* ── colour themes (from CodePen DepthFold) ─────────────────────────── */
const THEMES = {
  mint: {
    grad: "linear-gradient(135deg, #00ffd6 0%, #08e260 100%)",
    title: "#00894d",
    body: "rgba(0,137,78,0.82)",
    orbit: "rgba(0,249,203,0.22)",
    fill: "#00894d",
    glow: "rgba(0,255,214,0.25)",
  },
  violet: {
    grad: "linear-gradient(145deg, #a855f7 0%, #6366f1 40%, #ec4899 100%)",
    title: "#3b0764",
    body: "rgba(59,7,100,0.85)",
    orbit: "rgba(216,180,254,0.35)",
    fill: "#5b21b6",
    glow: "rgba(168,85,247,0.25)",
  },
  solar: {
    grad: "linear-gradient(135deg, #fbbf24 0%, #f97316 45%, #dc2626 100%)",
    title: "#7c2d12",
    body: "rgba(124,45,18,0.88)",
    orbit: "rgba(254,243,199,0.4)",
    fill: "#9a3412",
    glow: "rgba(251,191,36,0.25)",
  },
  ocean: {
    grad: "linear-gradient(155deg, #22d3ee 0%, #0284c7 50%, #1e3a8a 100%)",
    title: "#0c4a6e",
    body: "rgba(12,74,110,0.88)",
    orbit: "rgba(125,211,252,0.35)",
    fill: "#0e7490",
    glow: "rgba(34,211,238,0.25)",
  },
  prism: {
    grad: "conic-gradient(from 200deg at 65% 35%, #22d3ee, #818cf8, #f472b6, #facc15, #22d3ee)",
    title: "#0f172a",
    body: "rgba(15,23,42,0.88)",
    orbit: "rgba(255,255,255,0.35)",
    fill: "#312e81",
    glow: "rgba(129,140,248,0.25)",
  },
  void: {
    grad: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    title: "#5eead4",
    body: "rgba(203,213,225,0.82)",
    orbit: "rgba(167,139,250,0.25)",
    fill: "#c084fc",
    glow: "rgba(167,139,250,0.3)",
  },
} as const;

export type NeonTheme = keyof typeof THEMES;

interface NeonGlassCardProps {
  theme: NeonTheme;
  title: string;
  description: string;
  status: string;
  updated: string;
  tags: string[];
  repoUrl: string;
  index: number;
}

export default function NeonGlassCard({
  theme,
  title,
  description,
  status,
  updated,
  tags,
  repoUrl,
  index,
}: NeonGlassCardProps) {
  const t = THEMES[theme];
  const parentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    window.open(repoUrl, "_blank", "noopener,noreferrer");
  }, [repoUrl]);

  return (
    <div
      ref={parentRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="w-full cursor-pointer select-none"
      style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 50%",
        filter: `drop-shadow(0 28px 50px rgba(0,40,30,0.45))`,
      }}
    >
      {/* 3D Card Body */}
      <motion.div
        animate={
          isHovered
            ? {
                rotateX: 12,
                rotateY: 12,
                boxShadow: `${t.glow} 0 0 60px -10px, rgba(5,71,17,0.15) 0 25px 35px 0`,
              }
            : {
                rotateX: 0,
                rotateY: 0,
                boxShadow: `rgba(5,71,17,0) 40px 50px 25px -40px, rgba(5,71,17,0.28) 0 25px 25px -5px`,
              }
        }
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative h-full rounded-[50px] overflow-hidden"
        style={{
          background: t.grad,
          transformStyle: "preserve-3d",
          minHeight: "320px",
        }}
      >
        {/* ── Concentric orbit circles (top-right) ─────────────── */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[170, 140, 110, 80, 50].map((size, i) => (
            <motion.span
              key={i}
              animate={{
                z: isHovered ? 20 + (i + 1) * 20 : 20 + i * 0,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: i * 0.04 }}
              className="block absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: 8 + i * 3,
                right: 8 + i * 3,
                background: t.orbit,
                boxShadow: "rgba(100,100,111,0.25) -10px 10px 24px 0",
                backdropFilter: "blur(6px)",
                transform: `translate3d(0, 0, ${20 + i * 0}px)`,
              }}
            />
          ))}
        </div>

        {/* ── Glass overlay ────────────────────────────────────── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            inset: "8px",
            borderRadius: "55px",
            borderTopRightRadius: "100%",
            background:
              theme === "void"
                ? "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(15,23,42,0.55) 100%)"
                : "linear-gradient(0deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.82) 100%)",
            borderLeft: theme === "void" ? "1px solid rgba(148,163,184,0.25)" : "1px solid rgba(255,255,255,0.85)",
            borderBottom: theme === "void" ? "1px solid rgba(148,163,184,0.25)" : "1px solid rgba(255,255,255,0.75)",
            transform: "translate3d(0, 0, 25px)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* ── Content ──────────────────────────────────────────── */}
        <div
          className="relative z-[3] flex flex-col justify-between h-full"
          style={{
            padding: "100px 3.75rem 20px 1.85rem",
            transform: "translate3d(0, 0, 26px)",
          }}
        >
          <div>
            <span
              className="block font-black text-xl tracking-tight"
              style={{ color: t.title }}
            >
              {title}
            </span>
            <span
              className="block mt-3 text-sm font-semibold leading-relaxed"
              style={{ color: t.body }}
            >
              {description}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: `${t.orbit}`,
                  color: t.title,
                  border: `1px solid ${t.orbit}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex items-center justify-between mt-4"
            style={{ transform: "translate3d(0, 0, 26px)" }}
          >
            <div className="flex gap-2.5" style={{ transformStyle: "preserve-3d" }}>
              <motion.button
                animate={{ z: isHovered ? 50 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.05 }}
                className="w-8 h-8 rounded-full bg-white grid place-content-center"
                style={{
                  boxShadow: isHovered
                    ? "rgba(5,71,17,0.25) -5px 20px 12px 0"
                    : "rgba(5,71,17,0.45) 0 8px 6px -5px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(repoUrl, "_blank", "noopener,noreferrer");
                }}
                aria-label="GitHub"
              >
                <Github size={14} style={{ color: t.fill }} />
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: t.body }}
              >
                {status} · {updated}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
