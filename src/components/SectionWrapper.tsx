import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, title, children, className = "" }: Props) {
  return (
    <section id={id} className={`py-24 px-4 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="label-style text-accent mb-2">// {title}</h2>
          <div className="w-12 h-px bg-accent mb-12" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
