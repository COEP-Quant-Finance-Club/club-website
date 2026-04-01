import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const githubOrgUrl = "https://github.com/orgs/COEP-Quant-Finance-Club/repositories";

const projects = [
  {
    title: "Financial Data Analysis",
    desc: "Analysis workflows and exploratory tooling for market and financial datasets.",
    tags: ["Python", "Data Analysis", "Finance"],
    status: "Active",
    updated: "Mar 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/financial-data-analysis",
  },
  {
    title: "Low Level Programming HFT",
    desc: "Low-latency systems and performance-focused components for high-frequency trading workflows.",
    tags: ["C++", "HFT", "Systems"],
    status: "Active",
    updated: "Feb 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/low-level-programming-HFT",
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
    title: "Exchange Simulator",
    desc: "Simulation environment for exchange behavior, order matching, and execution flow testing.",
    tags: ["Simulation", "Market Microstructure", "Systems"],
    status: "In Development",
    updated: "Mar 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/exchange_simulator",
  },
  {
    title: "AI ML Projects",
    desc: "Machine learning projects focused on prediction, feature engineering, and quantitative workflows.",
    tags: ["AI", "ML", "Python"],
    status: "Active",
    updated: "Dec 2025",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/AI-ML-projects",
  },
  {
    title: "High-Frequency Limit Order Book Dynamics",
    desc: "Analysis and simulation of limit order book dynamics in high-frequency trading environments.",
    tags: ["HFT", "Market Microstructure", "Systems"],
    status: "Active",
    updated: "Mar 2026",
    repoUrl: "https://github.com/COEP-Quant-Finance-Club/High-Frequency-Limit-Order-Book-Dynamics",
  },
];

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Current Projects">
      <div className="mb-8 flex justify-end">
        <motion.button
          whileHover={{ x: 3 }}
          transition={spring}
          onClick={() => window.open(githubOrgUrl, "_blank", "noopener,noreferrer")}
          className="label-style text-muted-foreground hover:text-accent transition-colors duration-300"
        >
          {"// See All Projects ->"}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: spring }}
            onClick={() => window.open(p.repoUrl, "_blank", "noopener,noreferrer")}
            className="p-6 rounded-lg card-border hover:card-border-hover transition-shadow cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="label-style text-accent">Project {String(i + 1).padStart(2, "0")}</div>
              <span className="text-xs px-2 py-1 border border-border rounded-sm text-muted-foreground">{p.status}</span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">{p.desc}</p>
            <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
              <span>Updated: {p.updated}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 border border-border rounded-sm text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <span className="label-style group-hover:text-accent transition-colors">View on GitHub →</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
