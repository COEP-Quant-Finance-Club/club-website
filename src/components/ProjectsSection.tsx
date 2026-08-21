import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NeonGlassCard, { NeonTheme } from "./NeonGlassCard";
import SectionWrapper from "./SectionWrapper";

const githubOrgUrl =
  "https://github.com/orgs/COEP-Quant-Finance-Club/repositories";

const projects: {
  title: string;
  desc: string;
  tags: string[];
  status: string;
  updated: string;
  repoUrl: string;
  theme: NeonTheme;
}[] = [
  {
    title: "COEP Market Index",
    desc: "India's first student-engineered 36 Master Sector Indices with 3-state macro regime detection across 1,445+ equities.",
    tags: ["Python", "Quant Index", "HMM"],
    status: "Flagship",
    updated: "Aug 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/COEP_Market_index",
    theme: "mint",
  },
  {
    title: "Financial Data Analysis",
    desc: "Analysis workflows and exploratory tooling for market and financial datasets.",
    tags: ["Python", "Data Analysis", "Finance"],
    status: "Active",
    updated: "Mar 2026",
    repoUrl:
      "https://github.com/COEP-Quant-Finance-Club/financial-data-analysis",
    theme: "violet",
  },
  {
    title: "Low-Level Programming HFT",
    desc: "Low-latency systems and performance-focused components for high-frequency trading workflows.",
    tags: ["C++", "HFT", "Systems"],
    status: "Active",
    updated: "Feb 2026",
    repoUrl:
      "https://github.com/COEP-Quant-Finance-Club/low-level-programming-HFT",
    theme: "solar",
  },
  {
    title: "Exchange Simulator",
    desc: "Simulation environment for exchange behavior, order matching, and execution flow testing.",
    tags: ["Simulation", "Microstructure", "Systems"],
    status: "In Development",
    updated: "Mar 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/exchange_simulator",
    theme: "ocean",
  },
  {
    title: "Quant Research Projects",
    desc: "Research notebooks and experiments across quantitative finance topics and strategy ideas.",
    tags: ["Research", "Python", "Quant"],
    status: "Active",
    updated: "Jan 2026",
    repoUrl:
      "https://github.com/COEP-Quant-Finance-Club/Quant-Research-Projects",
    theme: "prism",
  },
  {
    title: "AI/ML Projects",
    desc: "Machine learning projects focused on prediction, feature engineering, and quantitative workflows.",
    tags: ["AI", "ML", "Python"],
    status: "Active",
    updated: "Dec 2025",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/AI-ML-projects",
    theme: "void",
  },
];

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function ProjectsSection() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ── Horizontal scroll driven by vertical scroll ───────────── */
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  // The track width = (N cards * card width) - viewport. We'll use a transform.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section id="projects" className="relative">
      {/* Section header outside the sticky zone */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.22em] font-extrabold"
              style={{
                color: "rgba(0,255,214,0.75)",
                textShadow: "0 0 24px rgba(0,255,214,0.35)",
              }}
            >
              Open-Source Research
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black tracking-tight text-foreground mt-2"
            >
              Current Projects
            </motion.h2>
          </div>
          <motion.button
            whileHover={{ x: 3 }}
            transition={spring}
            onClick={() =>
              window.open(githubOrgUrl, "_blank", "noopener,noreferrer")
            }
            className="label-style text-muted-foreground hover:text-accent transition-colors duration-300"
          >
            {"// See All Projects ->"}
          </motion.button>
        </div>
        <p className="text-muted-foreground font-light text-sm max-w-lg">
          Six structural themes — hover the cards for parallax depth, then click
          to explore on GitHub.
        </p>
      </div>

      {/* ── Sticky horizontal-scroll wrapper ──────────────────── */}
      <div ref={stickyRef} className="relative" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            ref={scrollRef}
            style={{ x }}
            className="flex gap-8 pl-8 pr-[40vw]"
          >
            {projects.map((p, i) => (
              <div
                key={p.title}
                className="flex-shrink-0"
                style={{ width: "clamp(320px, 28vw, 400px)" }}
              >
                <NeonGlassCard
                  theme={p.theme}
                  title={p.title}
                  description={p.desc}
                  status={p.status}
                  updated={p.updated}
                  tags={p.tags}
                  repoUrl={p.repoUrl}
                  index={i}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
