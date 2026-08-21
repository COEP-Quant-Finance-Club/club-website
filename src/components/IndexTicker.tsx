import { motion } from "framer-motion";
import { SECTOR_INDICES_DATA } from "@/data/sectorIndicesData";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

export default function IndexTicker({ onSelectSector }: { onSelectSector?: (secCode: string) => void }) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate array for seamless infinite ticker loop
  const tickerItems = [...SECTOR_INDICES_DATA, ...SECTOR_INDICES_DATA];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full bg-background/90 border-y border-border/80 overflow-hidden py-2 backdrop-blur-md select-none"
    >
      <div className="flex items-center">
        {/* Static Title Pill */}
        <div className="flex-shrink-0 px-4 flex items-center gap-2 border-r border-border/80 z-10 bg-background/95">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-foreground/90">
            COEP 36 SECTOR INDICES
          </span>
        </div>

        {/* Scrolling Ticker Track with Calibrated Calm Pace & Pause on Hover */}
        <motion.div
          animate={isPaused ? {} : { x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 115,
              ease: "linear",
            },
          }}
          className="flex items-center gap-6 whitespace-nowrap pl-4 cursor-pointer"
        >
          {tickerItems.map((sec, idx) => {
            const isTotPos = sec.totalReturn >= 0;
            return (
              <div
                key={`${sec.code}-${idx}`}
                onClick={() => onSelectSector && onSelectSector(sec.code)}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm hover:bg-accent/15 border border-transparent hover:border-accent/30 transition-all text-xs font-mono"
              >
                <span className="text-foreground/90 font-medium">{sec.name}</span>
                <span className="text-muted-foreground font-semibold">₹{sec.currentValue.toLocaleString()}</span>
                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                    isTotPos ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {isTotPos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {isTotPos ? "+" : ""}
                  {sec.totalReturn.toFixed(1)}%
                </span>
                <span
                  className={`text-[9px] px-1 py-0.5 rounded-xs font-bold uppercase tracking-wider ${
                    sec.regime === "Bullish"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : sec.regime === "Bearish"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {sec.regime}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
