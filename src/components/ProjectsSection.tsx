import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const githubOrgUrl = "https://github.com/orgs/COEP-Quant-Finance-Club/repositories";

const projects = [
  {
    title: "COEP Market Index",
    desc: "India's first student-engineered 36 Master Sector Indices with 3-state macro regime detection across 1,445+ equities.",
    tags: ["Python", "Quant Index", "HMM"],
    status: "Flagship",
    updated: "Aug 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/COEP_Market_index",
  },
  {
    title: "Financial Data Analysis",
    desc: "Analysis workflows and exploratory tooling for market and financial datasets.",
    tags: ["Python", "Data Analysis", "Finance"],
    status: "Active",
    updated: "Mar 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/financial-data-analysis",
  },
  {
    title: "Low-Level Programming HFT",
    desc: "Low-latency systems and performance-focused components for semi-high-frequency trading workflows.",
    tags: ["C++", "HFT", "Systems"],
    status: "Active",
    updated: "Feb 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/low-level-programming-HFT",
  },
  {
    title: "Exchange Simulator",
    desc: "Simulation environment for exchange behavior, order matching, and execution flow testing.",
    tags: ["Simulation", "Microstructure", "Systems"],
    status: "In Development",
    updated: "Mar 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/exchange_simulator",
  },
  {
    title: "Quant Research Projects",
    desc: "Research notebooks and experiments across quantitative finance topics and strategy ideas.",
    tags: ["Research", "Python", "Quant"],
    status: "Active",
    updated: "Jan 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/Quant-Research-Projects",
  },
  {
    title: "AI/ML Projects",
    desc: "Machine learning projects focused on prediction, feature engineering, and quantitative workflows.",
    tags: ["AI", "ML", "Python"],
    status: "Active",
    updated: "Dec 2025",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/AI-ML-projects",
  },
];

export default function ProjectsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mb-9 flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-style mb-3">Take a look at our Github</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Current Projects
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Explore open-source research and systems built by the club.
          </p>
        </div>
        <a
          href={githubOrgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          See all projects <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="group flex min-h-64 flex-col border-b border-border py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xs text-muted-foreground">{project.updated}</span>
            </div>
            <div className="mb-auto">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <ArrowUpRight size={15} className="shrink-0 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-xs font-medium text-foreground">{project.status}</span>
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
