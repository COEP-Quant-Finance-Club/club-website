import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, FileSpreadsheet, Archive, Clock, ShieldCheck,
  Copy, Check, Database, Sparkles, ChevronDown, ChevronRight
} from "lucide-react";

interface DownloadItem {
  id: string;
  title: string;
  filename: string;
  description: string;
  format: "CSV" | "ZIP Archive" | "Parquet ZIP";
  size: string;
  timeline: string;
  records: string;
  badge: string;
  badgeColor: string;
  icon: typeof FileSpreadsheet;
  featured?: boolean;
}

interface DownloadGroup {
  id: string;
  label: string;
  emoji: string;
  description: string;
  accent: string;
  datasets: DownloadItem[];
}

export default function DatasetDownloadSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<string[]>([
    "registry",
    "large-cap",
    "mid-cap",
    "small-cap",
    "sector-indices",
  ]);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const dl = `${baseUrl}downloads/`;

  const groups: DownloadGroup[] = [
    // ── MASTER REGISTRY & CONSOLIDATED DATASETS ──
    {
      id: "registry",
      label: "Master Universe Registry & All-in-One Bundles",
      emoji: "📋",
      description: "Master coverage registry of all 1,213 equities with exact timelines, row counts, and all-in-one bundles",
      accent: "purple",
      datasets: [
        {
          id: "master-universe-summary",
          title: "Master Universe Registry & Timeline Summary",
          filename: "Master_Universe_Summary.csv",
          description: "Complete master registry of all 1,213 Indian equities with exact 5-minute & Daily time horizons, bar counts, market cap tiers, sector groupings, and availability status.",
          format: "CSV",
          size: "169.5 KB",
          timeline: "Jan 2022 – Aug 2026",
          records: "1,213 Stock Profiles",
          badge: "Essential Registry",
          badgeColor: "purple",
          icon: Database,
          featured: true,
        },
        {
          id: "equities-daily-all",
          title: "All 1,213 Equities Daily OHLCV Bundle",
          filename: "coep_1213_equities_daily_csv.zip",
          description: "Complete consolidated daily OHLCV dataset covering all 1,213 universe stocks across large, mid, and small cap tiers.",
          format: "ZIP Archive",
          size: "36.70 MB",
          timeline: "Jan 3, 2022 – Aug 28, 2026",
          records: "1,162,971 Daily Bars",
          badge: "All 1,213 Stocks",
          badgeColor: "purple",
          icon: Archive,
          featured: true,
        },
        {
          id: "nifty50-5m-zip",
          title: "Nifty 50 Benchmark 5-Minute Intraday Bundle",
          filename: "coep_nifty50_5m_clean_adjusted_csv.zip",
          description: "Cleaned, split-adjusted 5-minute high-frequency candlestick OHLCV dataset covering India's top 50 liquid benchmark equities.",
          format: "ZIP Archive",
          size: "57.70 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "4.3M+ 5m Bars (Cleaned)",
          badge: "Benchmark 5m",
          badgeColor: "purple",
          icon: Clock,
        },
      ],
    },

    // ── LARGE CAP ──
    {
      id: "large-cap",
      label: "Large Cap Equities (339 Stocks)",
      emoji: "🟦",
      description: "India's 339 largest companies by market cap | Daily + 5-Minute Intraday | Jan 2022 – Aug 2026",
      accent: "blue",
      datasets: [
        {
          id: "largecap-daily",
          title: "Large Cap Daily OHLCV Bundle",
          filename: "coep_5m_largecap_daily_csv.zip",
          description: "Complete split-adjusted daily OHLCV for all 339 large cap equities. Covers NSE-listed companies with the highest market capitalisation.",
          format: "ZIP Archive",
          size: "12.16 MB",
          timeline: "Jan 3, 2022 – Aug 28, 2026",
          records: "~391,086 Daily Bars",
          badge: "Daily OHLCV",
          badgeColor: "blue",
          icon: Archive,
          featured: true,
        },
        {
          id: "largecap-5m-p1",
          title: "Large Cap 5m Parquet — Part 1 of 4 (85 stocks)",
          filename: "coep_5m_largecap_parquet_part1of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for large caps #1–85 (ranked by market cap).",
          format: "Parquet ZIP",
          size: "82.16 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~7.3M 5-Minute Bars",
          badge: "5m Parquet Part 1",
          badgeColor: "blue",
          icon: Sparkles,
        },
        {
          id: "largecap-5m-p2",
          title: "Large Cap 5m Parquet — Part 2 of 4 (85 stocks)",
          filename: "coep_5m_largecap_parquet_part2of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for large caps #86–170.",
          format: "Parquet ZIP",
          size: "74.79 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~7.3M 5-Minute Bars",
          badge: "5m Parquet Part 2",
          badgeColor: "blue",
          icon: Sparkles,
        },
        {
          id: "largecap-5m-p3",
          title: "Large Cap 5m Parquet — Part 3 of 4 (85 stocks)",
          filename: "coep_5m_largecap_parquet_part3of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for large caps #171–255.",
          format: "Parquet ZIP",
          size: "75.13 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~7.3M 5-Minute Bars",
          badge: "5m Parquet Part 3",
          badgeColor: "blue",
          icon: Sparkles,
        },
        {
          id: "largecap-5m-p4",
          title: "Large Cap 5m Parquet — Part 4 of 4 (84 stocks)",
          filename: "coep_5m_largecap_parquet_part4of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for large caps #256–339.",
          format: "Parquet ZIP",
          size: "69.89 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~7.2M 5-Minute Bars",
          badge: "5m Parquet Part 4",
          badgeColor: "blue",
          icon: Sparkles,
        },
      ],
    },

    // ── MID CAP ──
    {
      id: "mid-cap",
      label: "Mid Cap Equities (405 Stocks)",
      emoji: "🟩",
      description: "India's 405 mid-tier companies by market cap | Daily + 5-Minute Intraday | Jan 2022 – Aug 2026",
      accent: "emerald",
      datasets: [
        {
          id: "midcap-daily",
          title: "Mid Cap Daily OHLCV Bundle",
          filename: "coep_5m_midcap_daily_csv.zip",
          description: "Complete split-adjusted daily OHLCV for all 405 mid cap equities.",
          format: "ZIP Archive",
          size: "12.29 MB",
          timeline: "Jan 3, 2022 – Aug 28, 2026",
          records: "~467,370 Daily Bars",
          badge: "Daily OHLCV",
          badgeColor: "emerald",
          icon: Archive,
          featured: true,
        },
        {
          id: "midcap-5m-p1",
          title: "Mid Cap 5m Parquet — Part 1 of 4 (102 stocks)",
          filename: "coep_5m_midcap_parquet_part1of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for mid caps #1–102.",
          format: "Parquet ZIP",
          size: "79.30 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~8.8M 5-Minute Bars",
          badge: "5m Parquet Part 1",
          badgeColor: "emerald",
          icon: Sparkles,
        },
        {
          id: "midcap-5m-p2",
          title: "Mid Cap 5m Parquet — Part 2 of 4 (102 stocks)",
          filename: "coep_5m_midcap_parquet_part2of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for mid caps #103–204.",
          format: "Parquet ZIP",
          size: "76.99 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~8.8M 5-Minute Bars",
          badge: "5m Parquet Part 2",
          badgeColor: "emerald",
          icon: Sparkles,
        },
        {
          id: "midcap-5m-p3",
          title: "Mid Cap 5m Parquet — Part 3 of 4 (102 stocks)",
          filename: "coep_5m_midcap_parquet_part3of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for mid caps #205–306.",
          format: "Parquet ZIP",
          size: "80.00 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~8.8M 5-Minute Bars",
          badge: "5m Parquet Part 3",
          badgeColor: "emerald",
          icon: Sparkles,
        },
        {
          id: "midcap-5m-p4",
          title: "Mid Cap 5m Parquet — Part 4 of 4 (99 stocks)",
          filename: "coep_5m_midcap_parquet_part4of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for mid caps #307–405.",
          format: "Parquet ZIP",
          size: "75.41 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~8.5M 5-Minute Bars",
          badge: "5m Parquet Part 4",
          badgeColor: "emerald",
          icon: Sparkles,
        },
      ],
    },

    // ── SMALL CAP ──
    {
      id: "small-cap",
      label: "Small Cap Equities (469 Stocks)",
      emoji: "🟨",
      description: "India's 469 small cap companies | Daily + 5-Minute Intraday | Jan 2022 – Aug 2026",
      accent: "amber",
      datasets: [
        {
          id: "smallcap-daily",
          title: "Small Cap Daily OHLCV Bundle",
          filename: "coep_5m_smallcap_daily_csv.zip",
          description: "Complete split-adjusted daily OHLCV for all 469 small cap equities.",
          format: "ZIP Archive",
          size: "12.30 MB",
          timeline: "Jan 3, 2022 – Aug 28, 2026",
          records: "~541,461 Daily Bars",
          badge: "Daily OHLCV",
          badgeColor: "amber",
          icon: Archive,
          featured: true,
        },
        {
          id: "smallcap-5m-p1",
          title: "Small Cap 5m Parquet — Part 1 of 4 (118 stocks)",
          filename: "coep_5m_smallcap_parquet_part1of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for small caps #1–118.",
          format: "Parquet ZIP",
          size: "86.34 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~10.1M 5-Minute Bars",
          badge: "5m Parquet Part 1",
          badgeColor: "amber",
          icon: Sparkles,
        },
        {
          id: "smallcap-5m-p2",
          title: "Small Cap 5m Parquet — Part 2 of 4 (118 stocks)",
          filename: "coep_5m_smallcap_parquet_part2of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for small caps #119–236.",
          format: "Parquet ZIP",
          size: "84.39 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~10.1M 5-Minute Bars",
          badge: "5m Parquet Part 2",
          badgeColor: "amber",
          icon: Sparkles,
        },
        {
          id: "smallcap-5m-p3",
          title: "Small Cap 5m Parquet — Part 3 of 4 (118 stocks)",
          filename: "coep_5m_smallcap_parquet_part3of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for small caps #237–354.",
          format: "Parquet ZIP",
          size: "78.09 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~10.1M 5-Minute Bars",
          badge: "5m Parquet Part 3",
          badgeColor: "amber",
          icon: Sparkles,
        },
        {
          id: "smallcap-5m-p4",
          title: "Small Cap 5m Parquet — Part 4 of 4 (115 stocks)",
          filename: "coep_5m_smallcap_parquet_part4of4.zip",
          description: "Cleaned & split-adjusted 5-minute intraday Parquet data for small caps #355–469.",
          format: "Parquet ZIP",
          size: "74.03 MB",
          timeline: "Jan 3, 2022 – Aug 29, 2026",
          records: "~9.8M 5-Minute Bars",
          badge: "5m Parquet Part 4",
          badgeColor: "amber",
          icon: Sparkles,
        },
      ],
    },

    // ── SECTOR INDICES ──
    {
      id: "sector-indices",
      label: "36 Master Sector Indices",
      emoji: "🏛️",
      description: "Free-float market-cap weighted indices for 36 sectors | Jan 2015 – Aug 2026 (11.66-year horizon)",
      accent: "cyan",
      datasets: [
        {
          id: "daily-zip",
          title: "36-Sector Daily OHLCV Bundle",
          filename: "coep_36_sector_indices_daily_csv.zip",
          description: "Individual dedicated CSV files for each of the 36 master sector indices plus full metadata and classification summaries.",
          format: "ZIP Archive",
          size: "2.28 MB",
          timeline: "Jan 2015 – Aug 2026",
          records: "36 Dedicated CSVs",
          badge: "11.66-Yr Horizon",
          badgeColor: "cyan",
          icon: Archive,
          featured: true,
        },
      ],
    },
  ];

  const accentMap: Record<string, string> = {
    cyan: "border-cyan-500/40 bg-cyan-500/5",
    blue: "border-blue-500/40 bg-blue-500/5",
    emerald: "border-emerald-500/40 bg-emerald-500/5",
    amber: "border-amber-500/40 bg-amber-500/5",
    purple: "border-purple-500/40 bg-purple-500/5",
  };
  const badgeMap: Record<string, string> = {
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    blue: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  };
  const headerMap: Record<string, string> = {
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    blue: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  };

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleCopyLink = (filename: string, id: string) => {
    const fullUrl = `${window.location.origin}${dl}${filename}`;
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
              <span>100% Cleaned & Split-Adjusted • Open Access • 84M+ 5m Intraday Bars</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Quantitative Datasets & Downloads
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-light max-w-2xl">
              Access institutional-grade datasets for India's 36 Sector Indices and all 1,213 equities categorized by market cap tier. Download complete Daily OHLCV and 5-Minute Intraday Parquet packages.
            </p>
          </div>

          {/* Stats badges */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-blue-400" />1,213 Equities
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />Updated Aug 29, 2026
            </span>
          </div>
        </div>

        {/* Collapsible Groups */}
        <div className="space-y-4">
          {groups.map((group) => {
            const isOpen = openGroups.includes(group.id);
            return (
              <div key={group.id} className={`rounded-xl border ${accentMap[group.accent]} overflow-hidden transition-all`}>
                {/* Group Header — clickable toggle */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-lg border text-sm font-bold ${headerMap[group.accent]}`}>
                      {group.emoji}
                    </span>
                    <div>
                      <div className="font-bold text-foreground text-sm sm:text-base">{group.label}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{group.description}</div>
                    </div>
                  </div>
                  <div className="shrink-0 ml-4">
                    {isOpen ? <ChevronDown size={18} className="text-muted-foreground" /> : <ChevronRight size={18} className="text-muted-foreground" />}
                  </div>
                </button>

                {/* Dataset Cards */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                        {group.datasets.map((item, idx) => {
                          const IconComponent = item.icon;
                          const fileUrl = `${dl}${item.filename}`;
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.04 }}
                              className={`rounded-xl p-5 border flex flex-col justify-between transition-all duration-200 ${
                                item.featured
                                  ? "bg-card border-border/80 shadow-md"
                                  : "bg-card/60 border-border/50 hover:border-border"
                              }`}
                            >
                              {/* Header */}
                              <div>
                                <div className="flex items-start gap-3 mb-3">
                                  <div className={`p-2 rounded-lg border shrink-0 ${headerMap[item.badgeColor]}`}>
                                    <IconComponent size={18} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border mb-1 ${badgeMap[item.badgeColor]}`}>
                                      {item.badge}
                                    </span>
                                    <h4 className="text-sm font-bold text-foreground leading-snug">{item.title}</h4>
                                  </div>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{item.description}</p>

                                {/* Metadata */}
                                <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono bg-secondary/40 rounded-lg px-3 py-2 border border-border/40 mb-4">
                                  <div>
                                    <span className="text-muted-foreground uppercase block">Format</span>
                                    <span className="font-semibold text-foreground">{item.format}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground uppercase block">Size</span>
                                    <span className="font-semibold text-emerald-400">{item.size}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground uppercase block">Timeline</span>
                                    <span className="font-semibold text-cyan-400 text-[9px]">{item.timeline}</span>
                                  </div>
                                  <div className="col-span-3 pt-1 border-t border-border/40 flex justify-between items-center">
                                    <span className="text-muted-foreground uppercase">Records</span>
                                    <span className="font-semibold text-foreground">{item.records}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <a
                                  href={fileUrl}
                                  download={item.filename}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide bg-foreground text-background hover:opacity-90 transition-all"
                                >
                                  <Download size={13} />
                                  <span>Download</span>
                                </a>
                                <button
                                  onClick={() => handleCopyLink(item.filename, item.id)}
                                  title="Copy direct download URL"
                                  className="p-2 rounded-lg border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {copiedId === item.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Python snippet */}
        <div className="mt-8 p-5 rounded-xl bg-card border border-border/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-secondary text-cyan-400 font-mono text-xs font-bold">python</div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Direct Pandas Streaming Access</h4>
                <p className="text-xs text-muted-foreground font-light">Load Master Universe Summary directly into pandas:</p>
              </div>
            </div>
            <div className="bg-secondary/70 border border-border px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto">
              <code>df = pd.read_csv("https://coep-quant-finance-club.github.io/club-website/downloads/Master_Universe_Summary.csv")</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
