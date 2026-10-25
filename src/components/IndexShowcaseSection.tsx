import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroIndexDashboard from "./HeroIndexDashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sectorTiles = [
  { label: "DEFENCE", code: "DEFENCE", icon: "shield" },
  { label: "ELECTRONICS", code: "ELECTRONICS_EMS", icon: "chip" },
  { label: "GREEN ENERGY", code: "RENEWABLE_ENERGY", icon: "leaf" },
  { label: "BANKING", code: "BANKING", icon: "bank" },
] as const;

function SectorIcon({ name }: { name: (typeof sectorTiles)[number]["icon"] }) {
  const common = {
    className: "h-5 w-5 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "shield") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}><path d="M12 2 20 5v6c0 5-3 8-8 11-5-3-8-6-8-11V5l8-3Z" /><path d="m8 12 3 3 5-6" /></svg>;
  }
  if (name === "chip") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}><rect x="6" y="6" width="12" height="12" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /><path d="M9 9h6v6H9z" /></svg>;
  }
  if (name === "leaf") {
    return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}><path d="M20 4c-9 0-15 3-15 10a6 6 0 0 0 6 6c7 0 9-7 9-16Z" /><path d="M4 21c3-5 7-8 12-11" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}><path d="m2 9 10-6 10 6H2Zm2 2v8m4-8v8m4-8v8m4-8v8m4-8v8M2 21h20" /></svg>;
}

export default function IndexShowcaseSection() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [selectedSector, setSelectedSector] = useState("ELECTRONICS_EMS");

  return (
    <section id="index-showcase" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="label-style mb-3 block">
            
          </span>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            COEP 36-Sector Market Index
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            India's first student-built sector index architecture. Tracking 36 specialized sectors, 3-state macro regimes, and dynamic momentum across 1,445+ equities.
          </p>
        </div>

        <Button
          onClick={() => navigate("/market-index")}
          className="self-start md:self-auto"
        >
          <span>Open Standalone Terminal</span>
          <ArrowUpRight size={14} />
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-2 border-y border-border sm:grid-cols-4">
        {sectorTiles.map((tile) => (
          <button
            key={tile.code}
            type="button"
            onClick={() => navigate("/market-index")}
            className="group flex min-h-16 items-center justify-between gap-2 border-b border-r border-border px-3 py-3 text-left text-xs font-medium tracking-wide text-foreground transition-colors hover:bg-secondary sm:border-b-0 sm:px-4 sm:text-sm [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:last:border-r-0"
            aria-label={`Explore ${tile.label} sector index`}
          >
            <SectorIcon name={tile.icon} />
            <span>{tile.label}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Terminal Preview Card */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden rounded-md p-0 font-mono">
          <HeroIndexDashboard
            onOpenTerminal={() => navigate("/market-index")}
            selectedSectorCode={selectedSector}
            onSelectSector={setSelectedSector}
          />
        </Card>
      </motion.div>
    </section>
  );
}
