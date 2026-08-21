import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToContent = () => {
    const nextSection = document.getElementById("index-showcase") || document.getElementById("projects");
    if (nextSection) {
      const y = nextSection.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const videoUrl = `${import.meta.env.BASE_URL}hero-bg.mp4`;

  return (
    <section id="home" className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* ── Background Video with Cinematic Overlay ─────────── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-75 filter brightness-90 contrast-105"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Multi-layer Dark Gradient Overlays for High Contrast & Film Look */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70 pointer-events-none" />
      </div>

      {/* ── Hero Center Content ─────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 max-w-5xl flex flex-col items-center text-center mt-12">
        {/* Subtle Institutional Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-md mb-6 text-[11px] font-mono tracking-widest text-white/80 uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>COEP Technological University • Est. 1854</span>
        </motion.div>

        {/* Clean, Bold, Minimal Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase leading-[1.02] drop-shadow-2xl"
        >
          Engineering Finance
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
            Through Mathematics
          </span>
        </motion.h1>

        {/* Minimal Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-white/80 font-light text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          India's premier student quantitative research club. Architecting 36 Master Sector Indices, 3-state macro regimes, and algorithmic trading systems across 1,445+ Indian equities.
        </motion.p>

        {/* Clean Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-wrap gap-4 justify-center items-center"
        >
          <button
            onClick={() => navigate("/market-index")}
            className="h-12 px-8 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore 36-Sector Terminal</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={scrollToContent}
            className="h-12 px-8 rounded-full bg-black/40 border border-white/25 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-white/50 backdrop-blur-md transition-all duration-300 cursor-pointer"
          >
            Explore Projects
          </button>
        </motion.div>
      </div>

      {/* ── Scroll Prompt Indicator ─────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll to discover content"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors">
          Scroll To Discover
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
