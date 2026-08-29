import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Download, Database, Layers, Clock, ShieldCheck, ChevronLeft, ChevronRight, BarChart2, Filter } from "lucide-react";
import masterUniverseData from "@/data/masterUniverseSummary.json";

interface StockRecord {
  sr: number;
  name: string;
  symbol: string;
  mcap: number;
  tier: string;
  sector: string;
  m5_rows: number;
  m5_start: string;
  m5_end: string;
  m5_status: string;
  daily_rows: number;
  daily_start: string;
  daily_end: string;
  daily_status: string;
}

export default function MasterUniverseExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const masterSummaryUrl = `${baseUrl}downloads/Master_Universe_Summary.csv`;

  const stocks = masterUniverseData as StockRecord[];

  // Unique sectors for dropdown
  const uniqueSectors = useMemo(() => {
    const sSet = new Set<string>();
    stocks.forEach((s) => {
      if (s.sector) sSet.add(s.sector);
    });
    return Array.from(sSet).sort();
  }, [stocks]);

  // Filtered stocks
  const filteredStocks = useMemo(() => {
    return stocks.filter((stk) => {
      // Search term
      const sTerm = searchTerm.toLowerCase().trim();
      const matchSearch =
        !sTerm ||
        stk.symbol.toLowerCase().includes(sTerm) ||
        stk.name.toLowerCase().includes(sTerm);

      // Tier filter
      const matchTier = selectedTier === "all" || stk.tier === selectedTier;

      // Sector filter
      const matchSector = selectedSector === "all" || stk.sector.toLowerCase() === selectedSector.toLowerCase();

      return matchSearch && matchTier && matchSector;
    });
  }, [stocks, searchTerm, selectedTier, selectedSector]);

  // Pagination
  const totalPages = Math.ceil(filteredStocks.length / pageSize) || 1;
  const paginatedStocks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStocks.slice(start, start + pageSize);
  }, [filteredStocks, currentPage, pageSize]);

  const handleTierChange = (tier: string) => {
    setSelectedTier(tier);
    setCurrentPage(1);
  };

  const handleSectorChange = (sec: string) => {
    setSelectedSector(sec);
    setCurrentPage(1);
  };

  return (
    <section id="universe-explorer" className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Database size={14} />
              <span>1,213 Equities • 84M+ 5-Minute Intraday Bars • 1.16M+ Daily Bars</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Master Stock Universe & Timeline Explorer
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-light max-w-2xl">
              Inspect our comprehensive multi-asset data foundry coverage. Search across all 1,213 Indian equities with exact 5-minute and Daily time horizons, bar counts, and market cap tiers.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href={masterSummaryUrl}
              download="Master_Universe_Summary.csv"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-cyan-500/20"
            >
              <Download size={16} />
              <span>Download Master Summary (CSV)</span>
            </a>
          </div>
        </div>

        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card border border-border/70 backdrop-blur-md">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Coverage Universe</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-foreground">1,213</span>
              <span className="text-xs text-cyan-400 font-mono">Equities</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">Large, Mid & Small Cap</span>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border/70 backdrop-blur-md">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">5m Intraday Timeline</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">84.0M</span>
              <span className="text-xs text-muted-foreground font-mono">Bars</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">Jan 2022 – Aug 2026</span>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border/70 backdrop-blur-md">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Daily OHLCV Timeline</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-cyan-400">1.16M</span>
              <span className="text-xs text-muted-foreground font-mono">Bars</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">Jan 2022 – Aug 2026</span>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border/70 backdrop-blur-md">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">Data Cleanliness</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-purple-400">100%</span>
              <span className="text-xs text-muted-foreground font-mono">Audited</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">Split & Bonus Adjusted</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-xl bg-card border border-border/80 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search symbol or company..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-secondary/70 border border-border focus:outline-none focus:border-cyan-500 font-mono text-foreground placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Market Cap Tier Tabs */}
            <div className="inline-flex rounded-lg bg-secondary/80 p-1 border border-border">
              {[
                { id: "all", label: "All (1,213)" },
                { id: "largecap", label: "Large Cap (339)" },
                { id: "midcap", label: "Mid Cap (405)" },
                { id: "smallcap", label: "Small Cap (469)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTierChange(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedTier === tab.id
                      ? "bg-cyan-500 text-black font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sector Dropdown */}
            <div className="relative">
              <select
                value={selectedSector}
                onChange={(e) => handleSectorChange(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-secondary/80 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Sectors ({uniqueSectors.length})</option>
                {uniqueSectors.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Interactive Stock Table */}
        <div className="rounded-xl border border-border bg-card/60 backdrop-blur-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-secondary/60 border-b border-border text-muted-foreground uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Symbol & Company Name</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Market Cap</th>
                  <th className="py-3 px-4">5m Intraday Timeline</th>
                  <th className="py-3 px-4">5m Bars</th>
                  <th className="py-3 px-4">Daily Timeline</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {paginatedStocks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-muted-foreground text-sm font-sans">
                      No stocks found matching your criteria. Try adjusting the search query or filters.
                    </td>
                  </tr>
                ) : (
                  paginatedStocks.map((stk) => {
                    const tierBadgeColor =
                      stk.tier === "largecap"
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        : stk.tier === "midcap"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30";

                    return (
                      <tr key={stk.symbol} className="hover:bg-secondary/30 transition-colors">
                        <td className="py-3 px-4 text-center text-muted-foreground">{stk.sr}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-foreground text-sm tracking-tight">{stk.symbol}</div>
                          <div className="text-[11px] text-muted-foreground font-sans truncate max-w-[200px]">{stk.name}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-secondary text-foreground border border-border/60">
                            {stk.sector}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-foreground font-semibold">₹{stk.mcap.toLocaleString("en-IN")} Cr</div>
                          <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border ${tierBadgeColor}`}>
                            {stk.tier}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-foreground">{stk.m5_start} → {stk.m5_end}</div>
                          <span className="text-[10px] text-emerald-400">Continuous 5m series</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-emerald-400">
                            {stk.m5_rows.toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-foreground">{stk.daily_start} → {stk.daily_end}</div>
                          <span className="text-[10px] text-muted-foreground">{stk.daily_rows.toLocaleString("en-IN")} daily bars</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{stk.m5_status}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-4 bg-secondary/40 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{(currentPage - 1) * pageSize + 1}</span> to{" "}
              <span className="font-semibold text-foreground">
                {Math.min(currentPage * pageSize, filteredStocks.length)}
              </span>{" "}
              of <span className="font-semibold text-foreground">{filteredStocks.length}</span> stocks
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-border hover:bg-secondary text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="px-3 py-1 rounded-md bg-secondary text-foreground font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-border hover:bg-secondary text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
