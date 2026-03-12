import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const projects = [
  { title: "Algorithmic Trading Infrastructure", desc: "Building low-latency execution systems for systematic trading strategies across multiple asset classes.", tags: ["Python", "C++", "Systems"] },
  { title: "Volatility Surface Modeling", desc: "Calibrating and interpolating implied volatility surfaces using parametric and non-parametric methods.", tags: ["Options", "Statistics", "Python"] },
  { title: "Options Pricing Engine", desc: "Implementing Monte Carlo and finite difference methods for exotic derivatives valuation.", tags: ["Pricing", "Monte Carlo", "C++"] },
  { title: "Market Microstructure Analysis", desc: "Studying order flow dynamics, bid-ask spreads, and price impact models using tick data.", tags: ["Data Science", "HFT", "Python"] },
  { title: "ML Alpha Signals", desc: "Developing machine learning pipelines for generating and validating predictive trading signals.", tags: ["ML", "Python", "Research"] },
  { title: "Risk Modeling Systems", desc: "Constructing VaR, CVaR, and stress-testing frameworks for portfolio risk management.", tags: ["Risk", "Statistics", "Python"] },
];

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Current Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: spring }}
            className="p-6 rounded-lg card-border hover:card-border-hover transition-shadow cursor-pointer group"
          >
            <div className="label-style text-accent mb-3">Project {String(i + 1).padStart(2, "0")}</div>
            <h3 className="text-lg font-medium text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 border border-border rounded-sm text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <span className="label-style group-hover:text-accent transition-colors">View Project →</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
