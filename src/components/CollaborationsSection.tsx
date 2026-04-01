import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const partners = [
  { name: "National Institute of Securities Markets", type: "Research Institution" },
  { name: "AQUA pvt Ltd", type: "Quant research platform" },
  { name: "Ainosoft Technologies", type: "Tech consultant" },
  { name: "Quant Society, BITS PILANI", type: "Student Organization" },
  { name: "QuantNet", type: "Quantitative Finance Community" },
  { name: "Databento", type: "Data provider" },
  { name: "You Can Be The Next!", type: "Contact us in form below!" },
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
