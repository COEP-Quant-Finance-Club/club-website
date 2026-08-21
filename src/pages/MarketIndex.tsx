import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroIndexDashboard from "@/components/HeroIndexDashboard";
import IndexTicker from "@/components/IndexTicker";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { Maximize2, ExternalLink } from "lucide-react";

export default function MarketIndex() {
  const { isDark, toggle } = useTheme();
  const [selectedSector, setSelectedSector] = useState("ELECTRONICS_EMS");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const terminalUrl = `${import.meta.env.BASE_URL}terminal/index.html`;

  return (
    <div className="relative min-h-screen">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      {/* Ambient neon glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 10% -10%, rgba(0,255,214,0.06), transparent 50%), radial-gradient(ellipse 70% 50% at 95% 10%, rgba(192,132,252,0.05), transparent 45%)",
        }}
      />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />

        {/* Ticker */}
        <div className="pt-16">
          <IndexTicker onSelectSector={setSelectedSector} />
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs uppercase tracking-[0.22em] font-extrabold mb-2"
              style={{
                color: "rgba(0,255,214,0.75)",
                textShadow: "0 0 24px rgba(0,255,214,0.35)",
              }}
            >
              Institutional-Grade Research Terminal
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              COEP{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                36-Sector Market Index
              </span>
            </h1>
            <p className="mt-3 text-muted-foreground font-light text-base max-w-2xl">
              Explore India's first student-engineered sector indices with
              real-time 3-state macro regime detection, constituent stock
              breakdowns, and sensitivity analysis across 1,445+ equities.
            </p>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <HeroIndexDashboard
              onOpenTerminal={() => setIsFullscreen(true)}
              selectedSectorCode={selectedSector}
              onSelectSector={setSelectedSector}
            />
          </motion.div>
        </div>

        {/* Full Interactive Terminal */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Terminal chrome */}
            <div className="border border-border rounded-xl overflow-hidden shadow-2xl bg-card/60 backdrop-blur-xl">
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/70 bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest pl-2 border-l border-border">
                    Live Interactive Terminal — 36 Sectors • 1,445 Equities •
                    3-State HMM Regimes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={terminalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors text-xs font-mono"
                  >
                    <ExternalLink size={12} />
                    <span className="hidden sm:inline">Standalone Tab</span>
                  </a>
                  <button
                    onClick={() => {
                      const el = document.getElementById("terminal-frame");
                      if (el) el.requestFullscreen?.();
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Maximize2 size={12} />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                </div>
              </div>

              {/* Iframe */}
              <div
                id="terminal-frame"
                className="w-full bg-background"
                style={{ height: "80vh" }}
              >
                <iframe
                  src={terminalUrl}
                  title="COEP Market Index Terminal"
                  className="w-full h-full border-0"
                  allow="fullscreen"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
