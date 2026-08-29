import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroIndexDashboard from "@/components/HeroIndexDashboard";
import IndexTicker from "@/components/IndexTicker";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function MarketIndex() {
  const { isDark, toggle } = useTheme();
  const [selectedSector, setSelectedSector] = useState("ELECTRONICS_EMS");

  const terminalUrl = `${import.meta.env.BASE_URL}terminal/index.html`;

  return (
    <div className="relative min-h-screen">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />

        {/* Streaming Ticker */}
        <div className="pt-16">
          <IndexTicker onSelectSector={setSelectedSector} />
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Institutional Quant Terminal
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              COEP 36-Sector Market Index
            </h1>
            <p className="mt-3 text-muted-foreground font-light text-base max-w-2xl">
              India's first student-built sector index architecture. Tracking 36 specialized sectors, 3-state macro regimes, and dynamic momentum across 1,445+ Indian equities.
            </p>
          </motion.div>
        </div>

        {/* Dashboard Preview Matrix */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <HeroIndexDashboard
              onOpenTerminal={() => {
                const el = document.getElementById("full-terminal-view");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              selectedSectorCode={selectedSector}
              onSelectSector={setSelectedSector}
            />
          </motion.div>
        </div>

        {/* Full Interactive Terminal Embed */}
        <div id="full-terminal-view" className="max-w-7xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="border border-border rounded-xl overflow-hidden shadow-2xl bg-card/60 backdrop-blur-xl">
              {/* Top Bar with ONLY Standalone Tab Action */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/70 bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest pl-2 border-l border-border">
                    Live Sector Index Terminal • 36 Baskets • 3-State Regimes
                  </span>
                </div>

                <a
                  href={terminalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <span>Open Standalone Tab</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Embedded Frame */}
              <div className="w-full bg-background" style={{ height: "85vh" }}>
                <iframe
                  src={terminalUrl}
                  title="COEP Market Index Terminal"
                  className="w-full h-full border-0"
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
