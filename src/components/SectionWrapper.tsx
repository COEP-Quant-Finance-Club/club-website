import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  windowTitle?: string;
}

export default function SectionWrapper({ id, title, children, className = "", windowTitle }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      data-window-title={windowTitle}
      className={`mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-8 px-6 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-32 ${className}`}
    >
      <motion.header
        className="lg:col-span-4"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="max-w-[12ch] text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-foreground">
          {title}
        </h2>
      </motion.header>
      <div className="min-w-0 lg:col-span-8">{children}</div>
    </section>
  );
}
