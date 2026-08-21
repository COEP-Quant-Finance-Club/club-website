import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroIndexDashboard from "./HeroIndexDashboard";

export default function IndexShowcaseSection() {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState("ELECTRONICS_EMS");

  return (
    <section id="index-showcase" className="relative py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
            Flagship Research & Quant Terminal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            COEP 36-Sector Market Index
          </h2>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl font-light">
            India's first student-built sector index architecture. Tracking 36 specialized sectors, 3-state macro regimes, and dynamic momentum across 1,445+ equities.
          </p>
        </div>

        <button
          onClick={() => navigate("/market-index")}
          className="h-11 px-6 rounded-full bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer self-start md:self-auto flex-shrink-0"
        >
          <span>Open Standalone Terminal</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Terminal Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <HeroIndexDashboard
          onOpenTerminal={() => navigate("/market-index")}
          selectedSectorCode={selectedSector}
          onSelectSector={setSelectedSector}
        />
      </motion.div>
    </section>
  );
}
