import Navbar from "@/components/Navbar";
import { useState } from "react";
import IndexTicker from "@/components/IndexTicker";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PixelCard } from "@/components/ui/PixelPrimitives";

export default function MarketIndex() {
  const { isDark, toggle } = useTheme();
  const [terminalLoaded, setTerminalLoaded] = useState(false);
  const [terminalFailed, setTerminalFailed] = useState(false);
  const [terminalAttempt, setTerminalAttempt] = useState(0);
  const terminalUrl = `${import.meta.env.BASE_URL}terminal/index.html`;

  return (
    <div className="relative min-h-screen">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />

        {/* Streaming Ticker */}
        <div className="pt-16">
          <IndexTicker />
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

        {/* Live terminal */}
        <div id="full-terminal-view" className="max-w-7xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PixelCard className="border border-border rounded-xl overflow-hidden shadow-2xl bg-card/60 backdrop-blur-xl">
              <div className="flex justify-end border-b border-border/70 bg-secondary/30 px-4 py-2.5 sm:px-5">
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

              <div
                className="market-terminal-frame w-full bg-background"
                style={{ height: "85vh" }}
                aria-busy={!terminalLoaded && !terminalFailed}
              >
                {!terminalLoaded && !terminalFailed && (
                  <div className="market-terminal-loading" role="status" aria-live="polite">
                    <span className="market-terminal-loader" aria-hidden="true" />
                    <span>Loading market terminal</span>
                    <span className="market-terminal-loading-detail">
                      Preparing sector data and regime view
                    </span>
                  </div>
                )}
                {terminalFailed && (
                  <div className="market-terminal-loading" role="alert">
                    <span className="market-terminal-loading-error">
                      The market terminal could not be loaded.
                    </span>
                    <button
                      type="button"
                      className="market-terminal-retry"
                      onClick={() => {
                        setTerminalLoaded(false);
                        setTerminalFailed(false);
                        setTerminalAttempt((attempt) => attempt + 1);
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}
                <iframe
                  key={terminalAttempt}
                  src={terminalUrl}
                  title="COEP Market Index Terminal"
                  className={`market-terminal-iframe h-full w-full border-0 ${
                    terminalLoaded ? "market-terminal-iframe--loaded" : ""
                  }`}
                  onLoad={() => setTerminalLoaded(true)}
                  onError={() => setTerminalFailed(true)}
                />
              </div>
            </PixelCard>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
