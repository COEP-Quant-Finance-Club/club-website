import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BarChart3, Box, ArrowUpRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SceneCarousel from "./SceneCarousel";
import HeroIndexDashboard from "./HeroIndexDashboard";
import IndexTicker from "./IndexTicker";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

/* ── Ambient floating shape that tracks the mouse ─────────── */
function AmbientShapes() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!shellRef.current) return;
      const r = shellRef.current.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      setMouse({ x: nx * 28, y: ny * 22 });
    };
    const onLeave = () => setMouse({ x: 0, y: 0 });

    const el = shellRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Blob A — large mint organic */}
      <motion.span
        animate={{
          x: mouse.x,
          y: mouse.y,
          rotate: -8,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute"
        style={{
          width: "clamp(100px, 22vw, 180px)",
          height: "clamp(100px, 22vw, 180px)",
          left: "5%",
          top: "10%",
          borderRadius: "58% 42% 62% 38% / 48% 52% 48% 52%",
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), transparent 45%), linear-gradient(145deg, #00ffd6, #22c55e)",
          boxShadow:
            "0 24px 50px rgba(0,0,0,0.45), 0 0 60px rgba(0,255,214,0.25)",
          opacity: 0.6,
        }}
      />

      {/* Blob B — conic sphere */}
      <motion.span
        animate={{
          x: -mouse.x * 1.1,
          y: mouse.y * 0.9,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute"
        style={{
          width: "clamp(72px, 14vw, 120px)",
          height: "clamp(72px, 14vw, 120px)",
          right: "8%",
          top: "15%",
          borderRadius: "50%",
          background:
            "conic-gradient(from 210deg, #a855f7, #ec4899, #fbbf24, #a855f7)",
          opacity: 0.5,
          boxShadow: "0 20px 45px rgba(0,0,0,0.4)",
        }}
      />

      {/* Ring — outer */}
      <motion.span
        animate={{
          x: mouse.x,
          y: mouse.y,
          rotate: 12,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute"
        style={{
          width: "clamp(160px, 36vw, 260px)",
          height: "clamp(160px, 36vw, 260px)",
          left: "50%",
          top: "35%",
          marginLeft: "calc(clamp(160px, 36vw, 260px) / -2)",
          marginTop: "calc(clamp(160px, 36vw, 260px) / -2)",
          borderRadius: "50%",
          border: "2px solid rgba(0,255,214,0.18)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 48px rgba(0,255,214,0.08)",
        }}
      />

      {/* Ring — inner dashed */}
      <motion.span
        animate={{
          x: mouse.x * 0.6,
          y: mouse.y * 0.5,
          rotate: -18,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute"
        style={{
          width: "clamp(96px, 22vw, 150px)",
          height: "clamp(96px, 22vw, 150px)",
          left: "50%",
          top: "35%",
          marginLeft: "calc(clamp(96px, 22vw, 150px) / -2)",
          marginTop: "calc(clamp(96px, 22vw, 150px) / -2)",
          borderRadius: "50%",
          border: "2px dashed rgba(255,255,255,0.12)",
        }}
      />

      {/* Hex — orange */}
      <motion.span
        animate={{
          x: -mouse.x * 0.7,
          y: mouse.y * 0.65,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute"
        style={{
          width: "clamp(64px, 12vw, 100px)",
          height: "clamp(64px, 12vw, 100px)",
          right: "12%",
          bottom: "25%",
          background:
            "linear-gradient(135deg, rgba(251,191,36,0.9), rgba(249,115,22,0.75))",
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          boxShadow: "0 18px 40px rgba(234,88,12,0.28)",
          opacity: 0.45,
        }}
      />

      {/* Small blob C */}
      <motion.span
        animate={{
          x: mouse.x * 0.85,
          y: -mouse.y * 1.05,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        className="absolute"
        style={{
          width: "clamp(56px, 11vw, 90px)",
          height: "clamp(56px, 11vw, 90px)",
          left: "35%",
          bottom: "10%",
          borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%",
          background: "linear-gradient(160deg, rgba(34,211,238,0.95), #2563eb)",
          boxShadow: "0 16px 36px rgba(37,99,235,0.35)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"index" | "models">("index");
  const [selectedSectorCode, setSelectedSectorCode] = useState("ELECTRONICS_EMS");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-start pt-16 pb-12 overflow-hidden"
    >
      {/* ── Ambient floating shapes ─────────────────────────── */}
      <AmbientShapes />

      {/* ── Top Ticker Bar ──────────────────────────────────── */}
      <IndexTicker
        onSelectSector={(code) => {
          setSelectedSectorCode(code);
          setActiveTab("index");
        }}
      />

      {/* ── Hero Content ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-10 flex flex-col items-center">
        {/* Institution eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur-xl mb-6 text-xs font-mono shadow-lg"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-foreground/90 font-semibold">
            COEP Technological University
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">Est. 1854</span>
        </motion.div>

        {/* ── Main headline ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            <span className="text-foreground">Where </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #5eead4 0%, #86efac 28%, #d8b4fe 62%, #fda4af)",
                filter: "drop-shadow(0 4px 28px rgba(0,255,214,0.18))",
              }}
            >
              Mathematics
            </span>
            <br />
            <span className="text-foreground">Meets </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #00ffd6 0%, #08e260 40%, #a78bfa 80%)",
                filter: "drop-shadow(0 4px 28px rgba(8,226,96,0.18))",
              }}
            >
              Markets
            </span>
          </h1>

          <p className="mt-5 text-muted-foreground font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Building India's first student-engineered{" "}
            <strong className="text-foreground font-medium">
              36 Master Sector Indices
            </strong>
            , 3-state macro regime models, and algorithmic trading
            infrastructure — spanning{" "}
            <strong className="text-foreground font-medium">
              1,445+ equities
            </strong>{" "}
            across NSE and BSE.
          </p>

          {/* ── CTA Buttons ──────────────────────────────── */}
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              onClick={() => navigate("/market-index")}
              className="h-12 px-7 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 cursor-pointer"
              style={{
                border: "1px solid rgba(0,255,214,0.45)",
                background:
                  "linear-gradient(135deg, rgba(0,255,214,0.22), rgba(167,139,250,0.18))",
                color: "#ecfffb",
                boxShadow:
                  "0 0 32px rgba(0,255,214,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <Zap size={15} className="text-emerald-300" />
              <span>Explore 36-Sector Terminal</span>
              <ArrowUpRight size={15} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              onClick={() => scrollTo("projects")}
              className="h-12 px-7 rounded-full font-bold text-sm tracking-wide cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(0,0,0,0.25)",
                color: "rgba(220,255,245,0.92)",
              }}
            >
              View Projects
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              onClick={() =>
                window.open(
                  "https://forms.gle/6vDtykJqrVwn6Reu5",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="h-12 px-7 rounded-full font-bold text-sm tracking-wide cursor-pointer border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              Join the Club
            </motion.button>
          </div>
        </motion.div>

        {/* ── Tab Switcher ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2 p-1 bg-secondary/50 border border-border/80 rounded-full mt-10 mb-5 text-xs font-mono"
        >
          <button
            onClick={() => setActiveTab("index")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all cursor-pointer ${
              activeTab === "index"
                ? "bg-background text-foreground font-semibold shadow-md border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3
              size={15}
              className={activeTab === "index" ? "text-emerald-500" : ""}
            />
            <span>Index Terminal Preview</span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
              style={{
                background: "rgba(0,255,214,0.1)",
                color: "#5eead4",
              }}
            >
              36
            </span>
          </button>

          <button
            onClick={() => setActiveTab("models")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all cursor-pointer ${
              activeTab === "models"
                ? "bg-background text-foreground font-semibold shadow-md border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Box
              size={15}
              className={activeTab === "models" ? "text-accent" : ""}
            />
            <span>3D Models</span>
          </button>
        </motion.div>

        {/* ── Dynamic Viewport ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full"
        >
          <AnimatePresence mode="wait">
            {activeTab === "index" ? (
              <motion.div
                key="idx"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <HeroIndexDashboard
                  onOpenTerminal={() => navigate("/market-index")}
                  selectedSectorCode={selectedSectorCode}
                  onSelectSector={setSelectedSectorCode}
                />
              </motion.div>
            ) : (
              <motion.div
                key="models"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="border border-border rounded-xl overflow-hidden shadow-2xl"
              >
                <SceneCarousel />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Scroll indicator ────────────────────────────── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          onClick={() => scrollTo("projects")}
          className="mt-10 flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="Scroll to projects"
        >
          <span className="label-style group-hover:text-accent transition-colors">
            Explore Research
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown
              size={18}
              className="text-muted-foreground group-hover:text-accent transition-colors"
            />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
