import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BarChart3, Box, ArrowUpRight, Zap } from "lucide-react";
import SceneCarousel from "./SceneCarousel";
import HeroIndexDashboard from "./HeroIndexDashboard";
import IndexTicker from "./IndexTicker";
import TerminalModal from "./TerminalModal";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"index" | "models">("index");
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [selectedSectorCode, setSelectedSectorCode] = useState<string>("ELECTRONICS_EMS");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSelectSector = (code: string) => {
    setSelectedSectorCode(code);
    setActiveTab("index");
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-start relative pt-16 pb-12">
      {/* Top Real-Time 36-Sector Ticker Bar */}
      <IndexTicker onSelectSector={handleSelectSector} />

      {/* Hero Content Area */}
      <div className="w-full max-w-6xl mx-auto px-4 mt-8 flex flex-col items-center">
        {/* Headline & Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          {/* Institution Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur-md mb-4 text-xs font-mono text-muted-foreground shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-foreground font-semibold">COEP Technological University</span>
            <span>•</span>
            <span>Quantitative Finance Research</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
            Engineering Finance
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent">
              Through Mathematics
            </span>
          </h1>

          <p className="mt-4 text-muted-foreground font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Pioneering India's first student-engineered <strong>36 Master Sector Indices</strong>, 3-state macro regime models, and algorithmic trading infrastructure across 1,445+ equities.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              onClick={() => setIsTerminalOpen(true)}
              className="h-11 px-6 bg-primary text-primary-foreground font-medium text-xs tracking-wider uppercase rounded-md shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Zap size={14} className="text-emerald-300" />
              <span>Launch 36-Sector Terminal</span>
              <ArrowUpRight size={14} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              onClick={() => scrollTo("projects")}
              className="h-11 px-6 border border-border bg-card/50 text-foreground font-medium text-xs tracking-wider uppercase rounded-md hover:border-accent hover:bg-accent/10 transition-colors cursor-pointer"
            >
              Explore Projects
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              onClick={() => window.open("https://forms.gle/6vDtykJqrVwn6Reu5", "_blank", "noopener,noreferrer")}
              className="h-11 px-6 border border-border bg-card/50 text-muted-foreground hover:text-foreground font-medium text-xs tracking-wider uppercase rounded-md hover:border-border/80 transition-colors cursor-pointer"
            >
              Join the Club
            </motion.button>
          </div>
        </motion.div>

        {/* Interactive View Switcher Tabs (Index Terminal vs 3D Math Models) */}
        <div className="flex items-center gap-2 p-1 bg-secondary/50 border border-border/80 rounded-lg mb-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab("index")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all cursor-pointer ${
              activeTab === "index"
                ? "bg-background text-foreground font-semibold shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 size={15} className={activeTab === "index" ? "text-emerald-500" : ""} />
            <span>COEP Market Index Terminal</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 rounded-sm font-bold">
              36 Sectors
            </span>
          </button>

          <button
            onClick={() => setActiveTab("models")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all cursor-pointer ${
              activeTab === "models"
                ? "bg-background text-foreground font-semibold shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Box size={15} className={activeTab === "models" ? "text-accent" : ""} />
            <span>3D Mathematical Models</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-accent/10 text-accent rounded-sm font-bold">
              Vol Surface
            </span>
          </button>
        </div>

        {/* Dynamic Visualizer Viewport */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full"
        >
          <AnimatePresence mode="wait">
            {activeTab === "index" ? (
              <motion.div
                key="index-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <HeroIndexDashboard
                  onOpenTerminal={() => setIsTerminalOpen(true)}
                  selectedSectorCode={selectedSectorCode}
                  onSelectSector={(code) => setSelectedSectorCode(code)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="models-tab"
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

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          onClick={() => scrollTo("projects")}
          className="mt-8 flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="Scroll to projects"
        >
          <span className="label-style group-hover:text-accent transition-colors">Explore Club Research</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* Fullscreen Interactive Sector Index Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        initialSectorCode={selectedSectorCode}
      />
    </section>
  );
}
