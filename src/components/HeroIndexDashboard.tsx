import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTOR_INDICES_DATA, SectorIndex } from "@/data/sectorIndicesData";
import { TrendingUp, TrendingDown, ExternalLink, Activity, Layers, Sliders, BarChart2 } from "lucide-react";

interface HeroIndexDashboardProps {
  onOpenTerminal: () => void;
  selectedSectorCode?: string;
  onSelectSector?: (secCode: string) => void;
}

export default function HeroIndexDashboard({
  onOpenTerminal,
  selectedSectorCode,
  onSelectSector,
}: HeroIndexDashboardProps) {
  const [activeCode, setActiveCode] = useState<string>(selectedSectorCode || "ELECTRONICS_EMS");
  const [filterRegime, setFilterRegime] = useState<"ALL" | "Bullish" | "Neutral" | "Bearish">("ALL");

  const filteredSectors = useMemo(() => {
    if (filterRegime === "ALL") return SECTOR_INDICES_DATA;
    return SECTOR_INDICES_DATA.filter((s) => s.regime === filterRegime);
  }, [filterRegime]);

  const activeSector = useMemo(() => {
    return SECTOR_INDICES_DATA.find((s) => s.code === activeCode) || SECTOR_INDICES_DATA[0];
  }, [activeCode]);

  const handleSelect = (sec: SectorIndex) => {
    setActiveCode(sec.code);
    if (onSelectSector) onSelectSector(sec.code);
  };

  // Generate SVG path for sparkline
  const sparklineSvgPath = useMemo(() => {
    const data = activeSector.sparkline;
    if (!data || data.length === 0) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 480;
    const height = 140;
    const padding = 10;

    const points = data.map((val, idx) => {
      const x = padding + (idx / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((val - min) / range) * (height - 2 * padding);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M ${points.join(" L ")}`;
  }, [activeSector]);

  const isTotPos = activeSector.totalReturn >= 0;

  return (
    <div className="w-full bg-card/60 backdrop-blur-xl border border-border/80 rounded-xl overflow-hidden shadow-2xl">
      {/* Terminal Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-border/70 bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest pl-2 border-l border-border">
            COEP Quant Index Terminal v2.4
          </span>
          <span className="hidden sm:inline-flex text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            36 Sectors • 1,445 Equities
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Regime Filter Tabs */}
          <div className="flex items-center rounded-md bg-background/60 p-0.5 border border-border text-[11px] font-mono">
            {(["ALL", "Bullish", "Neutral", "Bearish"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilterRegime(r)}
                className={`px-2.5 py-1 rounded-sm transition-all cursor-pointer ${
                  filterRegime === r
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "ALL" ? `ALL (${SECTOR_INDICES_DATA.length})` : r}
              </button>
            ))}
          </div>

          {/* Launch Fullscreen Terminal Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1 bg-accent text-accent-foreground rounded-md text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <span>Launch Full Terminal</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>

      {/* Main Terminal Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border/80">
        {/* Left Column: Active Sector Metric Card + Real-time Chart (7 Cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between">
          <div>
            {/* Header / Active Sector Status */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    {activeSector.name}
                  </h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      activeSector.regime === "Bullish"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : activeSector.regime === "Bearish"
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {activeSector.regime} Regime
                  </span>
                </div>
                <p className="text-xs font-mono text-muted-foreground">
                  Sector Benchmark Code: <span className="text-foreground/80 font-semibold">{activeSector.code}</span>
                </p>
              </div>

              {/* Price / Return Highlight */}
              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-foreground">
                  ₹{activeSector.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div
                  className={`inline-flex items-center gap-1 text-xs font-mono font-semibold ${
                    isTotPos ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {isTotPos ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  <span>
                    {isTotPos ? "+" : ""}
                    {activeSector.totalReturn.toFixed(2)}% Return
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-lg bg-background/50 border border-border/70 font-mono text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">Base Value</span>
                <span className="font-semibold text-foreground">100.00</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">Daily Momentum</span>
                <span className={`font-semibold ${activeSector.dailyChange >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {activeSector.dailyChange >= 0 ? "+" : ""}
                  {activeSector.dailyChange.toFixed(2)}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase">3-State Macro</span>
                <span className="font-semibold text-foreground">State {activeSector.state} (36 Baskets)</span>
              </div>
            </div>

            {/* Sparkline Visualizer */}
            <div className="relative w-full h-[150px] bg-background/40 rounded-lg p-2 border border-border/50 overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground px-2 pt-1">
                <span>30-Day Trendline (Normalized)</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Activity size={12} /> High-Precision OHLCV
                </span>
              </div>

              <svg className="w-full h-[110px] overflow-visible" viewBox="0 0 480 140" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`grad-${activeSector.code}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isTotPos ? "#10b981" : "#f43f5e"} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={isTotPos ? "#10b981" : "#f43f5e"} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <path
                  d={`${sparklineSvgPath} L 470,130 L 10,130 Z`}
                  fill={`url(#grad-${activeSector.code})`}
                />
                {/* Stroke line */}
                <path
                  d={sparklineSvgPath}
                  fill="none"
                  stroke={isTotPos ? "#10b981" : "#f43f5e"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Quick Terminal Launch CTA */}
          <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between gap-4 text-xs">
            <span className="text-muted-foreground">
              Explore 36 sector charts, constituent stocks & sensitivities in the live terminal.
            </span>
            <button
              onClick={onOpenTerminal}
              className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors cursor-pointer flex-shrink-0"
            >
              Open Full Terminal →
            </button>
          </div>
        </div>

        {/* Right Column: 36 Sectors Leaderboard Matrix (5 Cols) */}
        <div className="lg:col-span-5 p-4 flex flex-col h-[400px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border text-xs font-mono text-muted-foreground">
            <span className="font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={13} /> Sector Baskets ({filteredSectors.length})
            </span>
            <span>Total Return</span>
          </div>

          {/* Scrollable Sector List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
            {filteredSectors.map((sec, idx) => {
              const isActive = sec.code === activeSector.code;
              const isP = sec.totalReturn >= 0;
              return (
                <div
                  key={sec.code}
                  onClick={() => handleSelect(sec)}
                  className={`flex items-center justify-between p-2 rounded-md transition-all cursor-pointer font-mono text-xs ${
                    isActive
                      ? "bg-accent/15 border border-accent text-foreground font-semibold shadow-xs"
                      : "hover:bg-muted/50 border border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] w-5 text-muted-foreground/60 text-right">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{sec.name}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[11px] font-semibold ${
                        isP ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {isP ? "+" : ""}
                      {sec.totalReturn.toFixed(1)}%
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        sec.regime === "Bullish"
                          ? "bg-emerald-500"
                          : sec.regime === "Bearish"
                          ? "bg-rose-500"
                          : "bg-amber-500"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
