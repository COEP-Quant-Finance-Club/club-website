import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DatasetDownloadSection from "@/components/DatasetDownloadSection";
import MasterUniverseExplorer from "@/components/MasterUniverseExplorer";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { Cpu, Activity, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export default function Resources() {
  const { isDark, toggle } = useTheme();

  const researchPapers = [
    {
      title: "Free-Float Market-Cap Sector Index Formulation",
      category: "Index Methodology",
      description: "Mathematical formulation of the 36-sector basket architecture using fixed-share count normalization, base-year scaling, and corporate action split auditing.",
      features: ["Fixed Share Normalization", "Zero Forward Bias", "Corporate Action Audited"],
      icon: Layers,
      tag: "Core Framework",
    },
    {
      title: "3-State Macro Regime State Machine",
      category: "Regime Detection",
      description: "Multi-factor regime classification utilizing EMA trends, ATR expansion, and momentum thresholds to determine Bullish (State 2), Accumulation (State 1), and Bearish (State 0) market phases.",
      features: ["3-State Markov Model", "Volatility Risk Parity", "Momentum Thresholds"],
      icon: Activity,
      tag: "Risk Model",
    },
    {
      title: "Intraday Candlestick & Volume Spillover Analysis",
      category: "Microstructure",
      description: "High-frequency 5-minute and 1-hour candlestick precision analytics for tracking sector-to-sector liquidity flows, institutional volume surges, and lead-lag cross-correlations.",
      features: ["5m & 1H Precision Candlesticks", "Cross-Sector Liquidity Flows", "Lead-Lag Correlations"],
      icon: Cpu,
      tag: "Alpha Research",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDark={isDark} toggleTheme={toggle} />

      <main>
        <header className="mx-auto max-w-[1360px] px-6 pb-14 pt-16 sm:px-12 sm:pb-20 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="flex max-w-5xl items-center gap-3 text-4xl font-light leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              <BookOpen
                className="h-7 w-7 shrink-0 text-accent sm:h-9 sm:w-9"
                aria-hidden="true"
              />
              <span>Research Papers & Open Data</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
              Transparent, reproducible quantitative finance research. Access institutional-grade sector index datasets, high-frequency 5-minute cleaned equities data, and universe registries built by COEP Quant Finance Club.
            </p>
          </motion.div>
        </header>

        <section
          aria-label="Research methodology"
          className="mx-auto max-w-[1360px] border-t border-border px-6 py-12 sm:px-12 sm:py-16"
        >
          <div className="grid grid-cols-1 gap-x-10 md:grid-cols-3">
            {researchPapers.map((paper, idx) => {
              const IconComp = paper.icon;
              return (
                <motion.div
                  key={paper.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border-t border-border py-6 md:py-8"
                >
                  <div className="flex h-full flex-col">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="grid size-10 shrink-0 place-items-center border border-border text-accent">
                        <IconComp size={18} aria-hidden="true" />
                      </div>
                      <span className="label-style text-right">{paper.tag}</span>
                    </div>

                    <p className="label-style mb-3">{paper.category}</p>
                    <h2 className="mb-3 text-xl font-medium leading-snug tracking-tight">
                      {paper.title}
                    </h2>
                    <p className="mb-6 text-sm font-light leading-relaxed text-muted-foreground">
                      {paper.description}
                    </p>

                    <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
                      {paper.features.map((feat) => (
                        <div key={feat} className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 size={13} className="shrink-0 text-accent" aria-hidden="true" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <DatasetDownloadSection />
        <MasterUniverseExplorer />
      </main>
      <Footer />
    </div>
  );
}