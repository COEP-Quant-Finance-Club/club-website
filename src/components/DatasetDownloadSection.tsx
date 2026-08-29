import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileSpreadsheet, Archive, Clock, ShieldCheck, Copy, Check, Database, Sparkles, Layers, Activity } from "lucide-react";

interface DownloadItem {
  id: string;
  category: "sector-indices" | "equities-foundary";
  title: string;
  filename: string;
  description: string;
  format: "CSV" | "ZIP Archive" | "Parquet ZIP";
  size: string;
  frequency: "Daily OHLCV" | "5-Minute Intraday" | "1-Hour Candlesticks" | "Master Registry" | "Audit Report";
  timeline: string;
  records: string;
  badge: string;
  icon: typeof FileSpreadsheet;
  featured?: boolean;
}

export default function DatasetDownloadSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "sector-indices" | "equities-foundary">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const downloadsPath = `${baseUrl}downloads/`;

  const downloadDatasets: DownloadItem[] = [
    // ── DATA FOUNDARY (1,213 EQUITIES) ──
    {
      id: "master-universe-summary",
      category: "equities-foundary",
      title: "Master Universe Registry & Timeline Summary",
      filename: "Master_Universe_Summary.csv",
      description: "Master registry of all 1,213 Indian equities with exact 5-minute & Daily time horizons, bar counts, market cap tiers, sector groupings, and availability status.",
      format: "CSV",
      size: "169.5 KB",
      frequency: "Master Registry",
      timeline: "Jan 2022 – Aug 2026",
      records: "1,213 Stock Profiles",
      badge: "Essential Index",
      icon: Database,
      featured: true,
    },
    {
      id: "equities-daily-zip",
      category: "equities-foundary",
      title: "All 1,213 Equities Daily OHLCV Bundle",
      filename: "coep_1213_equities_daily_csv.zip",
      description: "Comprehensive daily OHLCV candlestick dataset covering all 1,213 universe stocks across large, mid, and small cap tiers from 2022 to 2026.",
      format: "ZIP Archive",
      size: "36.70 MB",
      frequency: "Daily OHLCV",
      timeline: "Jan 3, 2022 – Aug 28, 2026",
      records: "1,162,971 Daily Bars",
      badge: "Full Universe Daily",
      icon: Archive,
      featured: true,
    },
    {
      id: "nifty50-5m-zip",
      category: "equities-foundary",
      title: "Nifty 50 Benchmark 5-Minute Intraday Bundle",
      filename: "coep_nifty50_5m_clean_adjusted_csv.zip",
      description: "Cleaned, split-adjusted 5-minute high-frequency candlestick OHLCV dataset covering India's top 50 liquid benchmark equities.",
      format: "ZIP Archive",
      size: "57.70 MB",
      frequency: "5-Minute Intraday",
      timeline: "Jan 3, 2022 – Aug 29, 2026",
      records: "4.3M+ 5m Bars (Cleaned)",
      badge: "5m Cleaned & Adjusted",
      icon: Clock,
      featured: true,
    },
    {
      id: "top100-5m-parquet",
      category: "equities-foundary",
      title: "Top 100 Liquid Equities 5-Minute Parquet Bundle",
      filename: "coep_top100_liquid_5m_parquet.zip",
      description: "High-performance columnar Parquet dataset of top 100 liquid equities for ultra-fast algorithmic backtesting in Python / DuckDB / Polars.",
      format: "Parquet ZIP",
      size: "94.54 MB",
      frequency: "5-Minute Intraday",
      timeline: "Jan 3, 2022 – Aug 29, 2026",
      records: "8.6M+ 5m Parquet Bars",
      badge: "High Performance",
      icon: Sparkles,
    },
    {
      id: "equities-cross-audit",
      category: "equities-foundary",
      title: "Dataset Cross-Verification & Quality Report",
      filename: "Full_Dataset_Cross_Verification_Report.csv",
      description: "Full cross-verification audit report validating continuity, timestamp integrity, and split adjustments across all 1,213 equities.",
      format: "CSV",
      size: "65.9 KB",
      frequency: "Audit Report",
      timeline: "Jan 2022 – Aug 2026",
      records: "1,213 Audit Records",
      badge: "Quality Verified",
      icon: ShieldCheck,
    },

    // ── 36 SECTOR INDICES ──
    {
      id: "daily-master",
      category: "sector-indices",
      title: "36-Sector Consolidated Master Daily CSV",
      filename: "coep_36_sector_indices_daily_master.csv",
      description: "Unified consolidated time series table containing historical daily OHLCV for all 36 sector indices from Jan 2015 to Aug 2026.",
      format: "CSV",
      size: "7.84 MB",
      frequency: "Daily OHLCV",
      timeline: "Jan 1, 2015 – Aug 28, 2026",
      records: "103,608 Trading Bars",
      badge: "Sector Benchmark",
      icon: FileSpreadsheet,
      featured: true,
    },
    {
      id: "daily-zip",
      category: "sector-indices",
      title: "36-Sector Daily OHLCV Bundle",
      filename: "coep_36_sector_indices_daily_csv.zip",
      description: "Individual dedicated CSV files for each of the 36 master sector indices plus full metadata and classification summaries.",
      format: "ZIP Archive",
      size: "2.28 MB",
      frequency: "Daily OHLCV",
      timeline: "Jan 1, 2015 – Aug 28, 2026",
      records: "36 Dedicated CSVs",
      badge: "11.66-Yr Horizon",
      icon: Archive,
    },
    {
      id: "hourly-zip",
      category: "sector-indices",
      title: "36-Sector 1-Hour Intraday Bundle",
      filename: "coep_36_sector_indices_1hour_csv.zip",
      description: "High-precision 1-hour candlestick OHLCV dataset covering all 36 sector baskets for intraday liquidity flow modeling.",
      format: "ZIP Archive",
      size: "2.27 MB",
      frequency: "1-Hour Candlesticks",
      timeline: "2024 – 2026 Intraday",
      records: "36 Intraday CSVs",
      badge: "Intraday Alpha",
      icon: Clock,
    },
    {
      id: "metrics-summary",
      category: "sector-indices",
      title: "Sector Metrics & 11.5-Yr Risk/Return Matrix",
      filename: "coep_36_sector_indices_metrics_summary.csv",
      description: "Audited statistical metrics including 11.66-year CAGR, Sharpe ratios, annualized volatility, and maximum drawdown per sector.",
      format: "CSV",
      size: "6.6 KB",
      frequency: "Statistical Report",
      timeline: "2015 – 2026 Horizon",
      records: "36 Sector Profiles",
      badge: "Risk & Return",
      icon: Activity,
    },
  ];

  const filteredDatasets = downloadDatasets.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const handleCopyLink = (filename: string, id: string) => {
    const fullUrl = `${window.location.origin}${downloadsPath}${filename}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="download-datasets" className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <ShieldCheck size={14} />
              <span>100% Free-Float Adjusted • Cleaned & Split-Adjusted • Open Access</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Quantitative Datasets & Downloads
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-light max-w-2xl">
              Access production-grade institutional datasets covering India's 36 Sector Indices and 1,213 Indian Equities (Daily & 5-Minute Intraday). Download complete packages with 1 click.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="inline-flex rounded-lg bg-secondary/80 p-1 border border-border">
              {[
                { id: "all", label: "All Datasets (9)" },
                { id: "equities-foundary", label: "⚡ 1,213 Equities Foundary (5)" },
                { id: "sector-indices", label: "🏛️ 36 Sector Indices (4)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeCategory === tab.id
                      ? "bg-cyan-500 text-black font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dataset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((item, idx) => {
            const IconComponent = item.icon;
            const fileUrl = `${downloadsPath}${item.filename}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`relative rounded-xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  item.featured
                    ? "bg-gradient-to-br from-card via-card to-cyan-950/20 border-cyan-500/40 shadow-lg shadow-cyan-500/5 hover:border-cyan-400/60"
                    : "bg-card/70 border-border hover:border-border/80 hover:bg-card"
                }`}
              >
                {/* Header info */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${
                        item.featured ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "bg-secondary text-foreground"
                      }`}>
                        <IconComponent size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                            {item.frequency}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            item.featured ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "bg-secondary text-muted-foreground"
                          }`}>
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground mt-0.5 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Metadata Tags */}
                  <div className="grid grid-cols-2 gap-2 py-2.5 px-3 rounded-lg bg-secondary/40 border border-border/50 text-xs font-mono mb-5">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block">Format & Size</span>
                      <span className="font-semibold text-foreground">
                        {item.format} • <span className="text-emerald-400">{item.size}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block">Timeline</span>
                      <span className="font-semibold text-cyan-400 text-[11px]">{item.timeline}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-border/40 flex justify-between">
                      <span className="text-[10px] text-muted-foreground uppercase">Records Coverage</span>
                      <span className="font-semibold text-foreground text-[11px]">{item.records}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                  <a
                    href={fileUrl}
                    download={item.filename}
                    className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg font-medium text-xs tracking-wide transition-all shadow-sm ${
                      item.featured
                        ? "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-cyan-500/20"
                        : "bg-foreground text-background hover:opacity-90 font-medium"
                    }`}
                  >
                    <Download size={15} />
                    <span>Download {item.format}</span>
                  </a>

                  <button
                    onClick={() => handleCopyLink(item.filename, item.id)}
                    title="Copy Direct Download URL"
                    className="flex items-center justify-center p-2.5 rounded-lg border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedId === item.id ? (
                      <Check size={15} className="text-emerald-400" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Programmatic Access Snippet */}
        <div className="mt-8 p-5 rounded-xl bg-card border border-border/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-secondary text-cyan-400 font-mono text-xs font-bold">
                python
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Direct Pandas / Python Streaming</h4>
                <p className="text-xs text-muted-foreground font-light">
                  Load Master Universe Summary directly into pandas DataFrame via URL:
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-secondary/70 border border-border px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto max-w-full">
              <code>df = pd.read_csv("https://coep-quant-finance-club.github.io/club-website/downloads/Master_Universe_Summary.csv")</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
