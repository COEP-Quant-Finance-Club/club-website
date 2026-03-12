import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const blogs = [
  { title: "Understanding the Black-Scholes Equation", date: "2026-02-15", read: "8 min" },
  { title: "Building a Monte Carlo Options Simulator", date: "2026-01-20", read: "12 min" },
  { title: "How Quant Funds Actually Make Money", date: "2025-12-10", read: "6 min" },
  { title: "Market Microstructure Explained", date: "2025-11-05", read: "10 min" },
];

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function BlogsSection() {
  return (
    <SectionWrapper id="blogs" title="Blogs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: spring }}
            className="p-6 rounded-lg card-border hover:card-border-hover transition-shadow cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="label-style">{b.date}</span>
              <span className="label-style">· {b.read}</span>
            </div>
            <h3 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">
              {b.title}
            </h3>
            <span className="label-style mt-4 inline-block group-hover:text-accent transition-colors">
              Read Article →
            </span>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
