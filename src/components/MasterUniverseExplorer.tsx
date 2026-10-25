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
    <section id="universe-explorer" className="w-full py-12 sm:py-16">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-border pb-6 md:flex-row md:items-end">
          <div>
            <div className="label-style mb-3 flex items-center gap-2 text-accent">
              <Database size={14} aria-hidden="true" />
              <span>1,213 Equities • 84M+ 5-Minute Intraday Bars • 1.16M+ Daily Bars</span>
            </div>
            <h2 className="text-3xl font-light leading-tight tracking-[-0.035em] sm:text-5xl">
              Master Stock Universe & Timeline Explorer
            </h2>
            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
              Inspect our comprehensive multi-asset data foundry coverage. Search across all 1,213 Indian equities with exact 5-minute and Daily time horizons, bar counts, and market cap tiers.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href={masterSummaryUrl}
              download="Master_Universe_Summary.csv"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-xs font-medium text-background transition-opacity hover:opacity-80 sm:text-sm"
            >
              <Download size={16} aria-hidden="true" />
              <span>Download Master Summary (CSV)</span>
            </a>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-x-6 border-b border-border sm:grid-cols-4">
          <div className="border-t border-border py-4">
            <span className="label-style block">Coverage Universe</span>
            <div className="mt-1 text-2xl font-medium tabular-nums">1,213 <span className="text-sm text-muted-foreground">Equities</span></div>
            <span className="mt-1 block text-xs text-muted-foreground">Large, Mid & Small Cap</span>
          </div>

          <div className="border-t border-border py-4">
            <span className="label-style block">5m Intraday Timeline</span>
            <div className="mt-1 text-2xl font-medium tabular-nums">84.0M <span className="text-sm text-muted-foreground">Bars</span></div>
            <span className="mt-1 block text-xs text-muted-foreground">Jan 2022 – Aug 2026</span>
          </div>

          <div className="border-t border-border py-4">
            <span className="label-style block">Daily OHLCV Timeline</span>
            <div className="mt-1 text-2xl font-medium tabular-nums">1.16M <span className="text-sm text-muted-foreground">Bars</span></div>
            <span className="mt-1 block text-xs text-muted-foreground">Jan 2022 – Aug 2026</span>
          </div>

          <div className="border-t border-border py-4">
            <span className="label-style block">Data Cleanliness</span>
            <div className="mt-1 text-2xl font-medium tabular-nums">100% <span className="text-sm text-muted-foreground">Audited</span></div>
            <span className="mt-1 block text-xs text-muted-foreground">Split & Bonus Adjusted</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 border-y border-border py-4 md:flex-row md:items-center">
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
              className="w-full border border-border bg-background py-2 pl-9 pr-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Market Cap Tier Tabs */}
            <div className="inline-flex max-w-full overflow-x-auto border-b border-border">
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
                      ? "border-b-2 border-accent text-foreground"
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
                className="border border-border bg-background px-3 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
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
        <div className="overflow-hidden border-y border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-border text-muted-foreground uppercase text-[11px] tracking-wider">
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
                          <span className="mt-1 inline-block border border-border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                            {stk.tier}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-foreground">{stk.m5_start} → {stk.m5_end}</div>
                          <span className="text-[10px] text-muted-foreground">Continuous 5m series</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold tabular-nums text-foreground">
                            {stk.m5_rows.toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-foreground">{stk.daily_start} → {stk.daily_end}</div>
                          <span className="text-[10px] text-muted-foreground">{stk.daily_rows.toLocaleString("en-IN")} daily bars</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center gap-1 border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            <span className="size-1.5 bg-accent" />
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
          <div className="flex flex-col items-center justify-between gap-3 border-t border-border bg-background py-4 text-xs font-mono sm:flex-row">
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

              <span className="px-3 py-1 text-foreground font-semibold">
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
