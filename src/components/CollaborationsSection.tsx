import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const partners = [
  { name: "COEP Finance Lab", type: "Research Group" },
  { name: "QuantConnect", type: "Platform Partner" },
  { name: "AlphaVantage", type: "Data Provider" },
  { name: "FinTech Pune", type: "Startup Ecosystem" },
  { name: "NSE India", type: "Exchange" },
  { name: "IGIDR Mumbai", type: "Research Institute" },
];

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function CollaborationsSection() {
  return (
    <SectionWrapper id="collaborations" title="Collaborations">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4, transition: spring }}
            className="p-6 rounded-lg card-border hover:card-border-hover transition-shadow text-center"
          >
            <h3 className="text-base font-medium text-foreground">{p.name}</h3>
            <span className="label-style mt-2 inline-block">{p.type}</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
