import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileSpreadsheet, Archive, Clock, ShieldCheck, Copy, Check, Database, Sparkles } from "lucide-react";

interface DownloadItem {
  id: string;
  title: string;
  filename: string;
  description: string;
  format: "CSV" | "ZIP Archive";
  size: string;
  frequency: "Daily OHLCV" | "1-Hour Candlesticks" | "Statistical Report";
  records: string;
  badge: string;
  icon: typeof FileSpreadsheet;
  featured?: boolean;
}

export default function DatasetDownloadSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const downloadsPath = `${baseUrl}downloads/`;

  const downloadDatasets: DownloadItem[] = [
    {
      id: "daily-master",
      title: "Consolidated Master Daily CSV",
      filename: "coep_36_sector_indices_daily_master.csv",
      description: "Complete unified table containing historical daily OHLCV time series for all 36 sector indices from 2015 to 2026.",
      format: "CSV",
      size: "7.84 MB",
      frequency: "Daily OHLCV",
      records: "103,227 Trading Bars",
      badge: "Most Popular",
      icon: FileSpreadsheet,
      featured: true,
    },
    {
      id: "daily-zip",
      title: "36-Sector Daily OHLCV Bundle",
      filename: "coep_36_sector_indices_daily_csv.zip",
      description: "Individual dedicated CSV files for each of the 36 master sector indices plus full metadata and classification summaries.",
      format: "ZIP Archive",
      size: "2.28 MB",
      frequency: "Daily OHLCV",
      records: "36 Individual CSVs",
      badge: "Comprehensive",
      icon: Archive,
    },
    {
      id: "hourly-zip",
      title: "36-Sector 1-Hour Intraday Bundle",
      filename: "coep_36_sector_indices_1hour_csv.zip",
      description: "High-precision 1-hour candlestick OHLCV dataset covering all 36 sector baskets for intraday quantitative modeling.",
      format: "ZIP Archive",
      size: "2.27 MB",
      frequency: "1-Hour Candlesticks",
      records: "36 Intraday CSVs",
      badge: "Intraday Alpha",
      icon: Clock,
    },
    {
      id: "metrics-summary",
      title: "Sector Metrics & Audit Report",
      filename: "coep_36_sector_indices_metrics_summary.csv",
      description: "Audited statistical metrics including 11.5-year CAGR, Sharpe ratios, annualized volatility, and maximum drawdown per sector.",
      format: "CSV",
      size: "6.6 KB",
      frequency: "Statistical Report",
      records: "36 Sector Profiles",
      badge: "Risk & Return",
      icon: Database,
    },
  ];

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
              <span>100% Free-Float Adjusted • Zero Forward Bias • Open Access</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Download 36-Sector Index Datasets
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-light max-w-2xl">
              Access decision-grade quantitative datasets covering India's 36 sector indices. Download complete historical OHLCV series with a single click.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Coverage: 2015 – 2026 (2,868 Daily Bars)</span>
            </div>
          </div>
        </div>

        {/* Dataset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloadDatasets.map((item, idx) => {
            const IconComponent = item.icon;
            const fileUrl = `${downloadsPath}${item.filename}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
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
                          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            {item.frequency}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                            item.featured ? "bg-cyan-500/20 text-cyan-300" : "bg-secondary text-muted-foreground"
                          }`}>
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Metadata Tags */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-lg bg-secondary/40 border border-border/50 text-xs font-mono mb-6">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block">Format</span>
                      <span className="font-semibold text-foreground">{item.format}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block">File Size</span>
                      <span className="font-semibold text-emerald-400">{item.size}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block">Records</span>
                      <span className="font-semibold text-foreground">{item.records}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={fileUrl}
                    download={item.filename}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-xs sm:text-sm tracking-wide transition-all shadow-sm ${
                      item.featured
                        ? "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-cyan-500/25"
                        : "bg-foreground text-background hover:opacity-90"
                    }`}
                  >
                    <Download size={16} />
                    <span>Download {item.format}</span>
                  </a>

                  <button
                    onClick={() => handleCopyLink(item.filename, item.id)}
                    title="Copy Direct Download Link"
                    className="flex items-center justify-center p-2.5 rounded-lg border border-border hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedId === item.id ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Programmatic Access Snippet */}
        <div className="mt-8 p-5 rounded-xl bg-card border border-border/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-secondary text-cyan-400 font-mono text-xs">
                curl / python
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Programmatic API & Python Access</h4>
                <p className="text-xs text-muted-foreground font-light">
                  Load directly into pandas DataFrame via URL without manual download:
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-secondary/70 border border-border px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto max-w-full">
              <code>df = pd.read_csv("https://coep-quant-finance-club.github.io/club-website/downloads/coep_36_sector_indices_daily_master.csv")</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
