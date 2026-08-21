import { motion } from "framer-motion";
import SceneCarousel from "./SceneCarousel";

export default function MathModelsSection() {
  return (
    <section id="models" className="relative py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
            Mathematical Physics & Simulations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            3D Quantitative Visualizers
          </h2>
          <p className="mt-2 text-muted-foreground text-sm max-w-xl font-light">
            Interactive real-time 3D models for implied volatility surfaces, geometric Brownian motion paths, dynamic correlation structures, and limit order book heatmaps.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border border-border/80 rounded-2xl overflow-hidden shadow-2xl bg-card/60 backdrop-blur-xl"
      >
        <SceneCarousel />
      </motion.div>
    </section>
  );
}
