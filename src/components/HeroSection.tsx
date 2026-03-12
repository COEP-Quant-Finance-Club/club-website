import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SceneCarousel from "./SceneCarousel";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative pt-16">
      {/* 3D Scene Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl mx-auto px-4"
      >
        <div className="border border-border rounded-lg overflow-hidden relative">
          <SceneCarousel />
        </div>

        {/* Discover button right below the 3D viz */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={() => scrollTo("headline")}
          className="mt-4 mx-auto flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="Scroll to headline"
        >
          <span className="label-style group-hover:text-accent transition-colors">Discover</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Headline & CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        id="headline"
        className="text-center mt-10 px-4"
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
    </section>
  );
}
