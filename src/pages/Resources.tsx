import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DatasetDownloadSection from "@/components/DatasetDownloadSection";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { FileText, Cpu, Activity, ArrowUpRight, BookOpen, Layers } from "lucide-react";

export default function Resources() {
  const { isDark, toggle } = useTheme();

  const researchPapers = [
    {
      title: "Free-Float Market-Cap Sector Index Formulation",
      category: "Index Methodology",
      description: "Mathematical formulation of the 36-sector basket architecture using fixed-share count normalization, base-year scaling, and corporate action split auditing.",
      math: "I_t = I_{t-1} \\times \\left(1 + \\sum w_{i,t-1} R_{i,t}\\right)",
      icon: Layers,
      tag: "Core Framework",
    },
    {
      title: "3-State Macro Regime State Machine",
      category: "Regime Detection",
      description: "Multi-factor regime classification utilizing EMA trends, ATR expansion, and momentum thresholds to determine Bullish (State 2), Accumulation (State 1), and Bearish (State 0) market phases.",
      math: "\\mathcal{S}_t \\in \\{\\text{State 0}, \\text{State 1}, \\text{State 2}\\}",
      icon: Activity,
      tag: "Risk Model",
    },
    {
      title: "Intraday Candlestick & Volume Spillover Analysis",
      category: "Microstructure",
      description: "1-hour candlestick precision analytics for tracking sector-to-sector liquidity flows, institutional volume surges, and lead-lag cross-correlations.",
      math: "\\rho_{A,B}(\\tau) = \\text{Corr}(R_{A,t}, R_{B,t+\\tau})",
      icon: Cpu,
      tag: "Alpha Research",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 pt-28 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <BookOpen size={14} />
              <span>Open Quantitative Knowledge & Datasets</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Research Papers & Open Data
            </h1>
            <p className="mt-3 text-muted-foreground font-light text-base max-w-2xl">
              Transparent, reproducible quantitative finance research. Access institutional-grade sector index datasets, mathematical methodologies, and regime models built by COEP Quant Finance Club.
            </p>
          </motion.div>
        </div>

        {/* Research Methodology Cards */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchPapers.map((paper, idx) => {
              const IconComp = paper.icon;
              return (
                <motion.div
                  key={paper.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-xl p-6 bg-card/60 border border-border hover:border-cyan-500/40 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="p-2.5 rounded-lg bg-secondary text-cyan-400">
                        <IconComp size={20} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                        {paper.tag}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                      {paper.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light mb-4">
                      {paper.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <div className="p-2.5 rounded-md bg-secondary/60 text-xs font-mono text-muted-foreground flex items-center justify-between">
                      <code>{paper.math}</code>
                      <FileText size={14} className="text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 1-Click Dataset Download Section */}
        <DatasetDownloadSection />

        <Footer />
      </div>
    </div>
  );
}