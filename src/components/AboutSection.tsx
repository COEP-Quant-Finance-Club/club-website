import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const focuses = [
  "Quantitative research & financial mathematics",
  "Algorithmic trading systems & execution",
  "Financial modeling & derivatives pricing",
  "Open-source quantitative tools & libraries",
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About">
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lg font-light text-foreground leading-relaxed mb-8"
        >
          COEP Quant Finance Club is a student-driven research and engineering group focused on
          applying mathematics, statistics, and computing to financial markets.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {focuses.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="text-accent mt-1">▸</span>
              <span className="text-sm text-muted-foreground font-light">{f}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
