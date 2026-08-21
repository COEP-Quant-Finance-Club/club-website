import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [userWantsAudio, setUserWantsAudio] = useState<boolean>(true);

  const videoUrl = `${import.meta.env.BASE_URL}hero-bg.mp4`;

  // Initialize audio: Attempt unmuted playback immediately, with fallback on first gesture
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 0.85;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // Browser prevented unmuted autoplay -> mute initially and listen for first interaction
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});

          const handleFirstInteraction = () => {
            if (video && userWantsAudio && window.scrollY < window.innerHeight * 0.75) {
              video.muted = false;
              video.volume = 0.85;
              video.play().catch(() => {});
              setIsMuted(false);
            }
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("scroll", handleFirstInteraction);
            window.removeEventListener("keydown", handleFirstInteraction);
            window.removeEventListener("touchstart", handleFirstInteraction);
          };

          window.addEventListener("click", handleFirstInteraction, { once: true });
          window.addEventListener("scroll", handleFirstInteraction, { once: true });
          window.addEventListener("keydown", handleFirstInteraction, { once: true });
          window.addEventListener("touchstart", handleFirstInteraction, { once: true });
        });
    }
  }, [userWantsAudio]);

  // Toggle audio manually
  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.85;
      videoRef.current.play().catch(() => {});
      setIsMuted(false);
      setUserWantsAudio(true);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
      setUserWantsAudio(false);
    }
  };

  // Scroll listener: Automatically mute audio when scrolling down, resume when returning to top
  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      const heroHeight = window.innerHeight * 0.75;
      const currentScroll = window.scrollY;

      if (currentScroll > heroHeight) {
        if (!videoRef.current.muted) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      } else {
        if (userWantsAudio && videoRef.current.muted) {
          videoRef.current.muted = false;
          videoRef.current.volume = 0.85;
          videoRef.current.play().catch(() => {});
          setIsMuted(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [userWantsAudio]);

  const scrollToContent = () => {
    const nextSection = document.getElementById("index-showcase") || document.getElementById("projects");
    if (nextSection) {
      const y = nextSection.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* ── Background Video with Dark Cinematic Overlays (Constant across dark/light themes) ── */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center opacity-85 filter brightness-95 contrast-105"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Constant Dark Cinematic Gradient Overlays (Never turns white) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70 pointer-events-none" />
      </div>

      {/* ── Minimalist Clean Speaker Icon Button ─────────────── */}
      <div className="absolute top-20 right-5 sm:right-8 z-30">
        <button
          onClick={toggleAudio}
          className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-white/50 text-white backdrop-blur-md transition-all flex items-center justify-center cursor-pointer shadow-lg group"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
          aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? (
            <VolumeX size={17} className="text-white/60 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 size={17} className="text-white group-hover:text-cyan-400 transition-colors" />
          )}
        </button>
      </div>

      {/* ── Hero Center Content ─────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 max-w-4xl flex flex-col items-center text-center mt-10">
        {/* Subtle Institutional Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-black/50 backdrop-blur-md mb-5 text-[11px] font-mono tracking-widest text-white/80 uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>COEP Technological University • Est. 1854</span>
        </motion.div>

        {/* Clean, Refined Title with Balanced Proportional Font Size */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08] drop-shadow-2xl"
        >
          Engineering Finance
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-white/70">
            Through Mathematics
          </span>
        </motion.h1>

        {/* Minimal Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 text-white/85 font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          India's premier student quantitative research club. Architecting 36 Sector Indices, and algorithmic trading systems across Indian equities.
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
            className="h-11 px-7 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white/90 transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore 36-Sector Terminal</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={scrollToContent}
            className="h-11 px-7 rounded-full bg-black/50 border border-white/25 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/15 hover:border-white/50 backdrop-blur-md transition-all duration-300 cursor-pointer"
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll to discover content"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors">
          Scroll To Discover
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
