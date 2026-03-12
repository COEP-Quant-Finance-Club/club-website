import { motion } from "framer-motion";
import VolatilitySurface from "./VolatilitySurface";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mx-auto"
      >
        <VolatilitySurface />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-8 px-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight text-foreground">
          Engineering Finance
          <br />
          Through Mathematics
        </h1>
        <p className="mt-4 text-muted-foreground font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          COEP's student-led quantitative finance research and engineering club.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={spring}
            onClick={() => scrollTo("contact")}
            className="h-11 px-8 bg-primary text-primary-foreground font-medium text-sm tracking-wider uppercase rounded-sm"
          >
            Join the Club
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={spring}
            onClick={() => scrollTo("projects")}
            className="h-11 px-8 border border-border text-foreground font-medium text-sm tracking-wider uppercase rounded-sm hover:border-accent transition-colors"
          >
            Explore Projects
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
