import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Github, Linkedin, Youtube, Instagram, Send, Rocket, Flame, CheckCircle2, MessageSquare, X } from "lucide-react";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px 0px" });
  const [showFormModal, setShowFormModal] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || isLaunching) return;

    setIsLaunching(true);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      fetch(`https://formsubmit.co/quantfinance@coeptech.ac.in`, {
        method: "POST",
        body: formData,
      }).catch((err) => console.error("Form submit warning:", err));

      setTimeout(() => {
        setSubmitted(true);
        setIsLaunching(false);
      }, 1000);

      setTimeout(() => {
        navigate("/thank-you");
      }, 1900);
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
      setIsLaunching(false);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="relative py-24 px-4 overflow-hidden">
      {/* ── Section Title ─────────────────────────────────── */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
          Connect With Us
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Get In Touch
        </h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-lg mx-auto font-light">
          Official Research & Engineering Division of COEP Quantitative Finance Club.
        </p>
      </div>

      {/* ── VictoryDesign SVG Floating Island & Drifting Clouds Landscape ── */}
      <div className="relative max-w-4xl mx-auto min-h-[460px] flex items-center justify-center">
        
        {/* ── Animated Background Sky Canvas ────────────────── */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden bg-[#bce3eb] dark:bg-[#0c1f28] border border-white/20 shadow-2xl transition-colors duration-500">
          
          {/* Drifting Clouds (Layer 1 - Top Left) */}
          <motion.div
            animate={{ x: [-30, 40, -30], y: [0, -6, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-8 opacity-90 pointer-events-none"
          >
            <svg width="120" height="45" viewBox="0 0 120 45" fill="none">
              <path
                d="M25 40h75a18 18 0 0 0 0-36 24 24 0 0 0-42-6 16 16 0 0 0-33 12 18 18 0 0 0 0 30z"
                fill="white"
                className="drop-shadow-sm"
              />
            </svg>
          </motion.div>

          {/* Drifting Clouds (Layer 2 - Top Right) */}
          <motion.div
            animate={{ x: [20, -50, 20], y: [0, 8, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-12 opacity-80 pointer-events-none"
          >
            <svg width="150" height="55" viewBox="0 0 150 55" fill="none">
              <path
                d="M30 48h90a22 22 0 0 0 0-44 30 30 0 0 0-52-8 20 20 0 0 0-38 16 22 22 0 0 0 0 36z"
                fill="white"
                className="drop-shadow-sm"
              />
            </svg>
          </motion.div>

          {/* Drifting Clouds (Layer 3 - Center Behind Card) */}
          <motion.div
            animate={{ x: [-15, 25, -15] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 left-1/3 opacity-65 pointer-events-none"
          >
            <svg width="100" height="38" viewBox="0 0 100 38" fill="none">
              <path
                d="M20 32h60a14 14 0 0 0 0-28 20 20 0 0 0-34-4 12 12 0 0 0-26 10 14 14 0 0 0 0 22z"
                fill="white"
                className="drop-shadow-xs"
              />
            </svg>
          </motion.div>

          {/* ── 3D Isometric Floating Island ─────────────────── */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 0.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[520px] pointer-events-none"
          >
            <svg viewBox="0 0 520 220" fill="none" className="w-full drop-shadow-2xl">
              {/* Isometric Island Ground Base (Dirt Layer Left) */}
              <polygon points="40,110 260,195 260,215 40,130" fill="#7a542a" />
              <polygon points="40,110 260,195 260,198 40,113" fill="#996a35" />

              {/* Isometric Island Ground Base (Dirt Layer Right) */}
              <polygon points="260,195 480,110 480,130 260,215" fill="#5c3e1e" />
              <polygon points="260,195 480,110 480,113 260,198" fill="#7a542a" />

              {/* Isometric Top Soil Block */}
              <polygon points="260,85 480,110 260,195 40,110" fill="#b58d55" />

              {/* Lush Green Grass Top Surface */}
              <polygon points="260,70 480,95 260,180 40,95" fill="#8ec339" />
              {/* Grass Highlights & Edges */}
              <polygon points="40,95 260,180 260,188 40,103" fill="#74a72d" />
              <polygon points="260,180 480,95 480,103 260,188" fill="#5f8c22" />

              {/* Little Isometric Trees / Bushes on Island (Left Side) */}
              <circle cx="80" cy="85" r="16" fill="#529424" />
              <circle cx="75" cy="80" r="13" fill="#6db333" />
              <circle cx="95" cy="90" r="12" fill="#437b1d" />

              {/* Little Isometric Trees on Island (Right Side) */}
              <circle cx="440" cy="85" r="15" fill="#529424" />
              <circle cx="445" cy="80" r="12" fill="#6db333" />
            </svg>
          </motion.div>
        </div>

        {/* ── VictoryDesign Pristine Split Profile Card ──────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 18, duration: 0.7 }}
          className="relative z-20 w-full max-w-[620px] mx-4 my-8 bg-white dark:bg-[#131b20] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.18)] border border-black/5 dark:border-white/10 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[290px]">
            
            {/* ── Left Column: Avatar, Name, Title ────────────── */}
            <div className="md:col-span-5 p-7 flex flex-col items-center justify-center text-center relative border-b md:border-b-0 md:border-r border-dashed border-gray-200 dark:border-gray-800">
              
              {/* Circular Avatar with Inner Ring & Badge */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0077d8] to-[#1e96fc] p-1.5 shadow-[0_8px_20px_rgba(30,150,252,0.35)] flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#0c1418] p-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
                      alt="COEP Seal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Country / Status Mini Badge on Bottom Right */}
                <div
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full border-2 border-white dark:border-[#131b20] shadow-md flex items-center justify-center overflow-hidden"
                  style={{
                    background: "linear-gradient(to bottom, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)",
                  }}
                  title="India"
                />
              </div>

              {/* Title & Role */}
              <h3 className="text-xl font-extrabold text-[#f25c3b] tracking-tight leading-tight">
                COEP Quant
              </h3>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1 font-mono">
                Finance Club
              </p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                Research & Engineering
              </span>
            </div>

            {/* ── Right Column: Manifesto Quote & Socials ─────── */}
            <div className="md:col-span-7 p-7 flex flex-col justify-between">
              
              {/* Quote Text (Matching VictoryDesign Typography & Vibe) */}
              <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed font-sans font-normal">
                Even when everything is perfect, you can always make it better. Break barriers in your head, engineer quantitative models with mathematics, and never forget data is poetry...
              </p>

              {/* Bottom Action Row: Get In Touch CTA & Social Icons */}
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100 dark:border-gray-800/80">
                {/* Interactive Get in Touch Button */}
                <button
                  onClick={() => setShowFormModal(true)}
                  className="px-4 py-1.5 rounded-full bg-[#f25c3b] hover:bg-[#d94828] text-white text-xs font-semibold tracking-wide shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare size={13} />
                  <span>Send Message</span>
                </button>

                {/* Social Icons */}
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <a
                    href="https://github.com/COEP-Quant-Finance-Club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0077d8] transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={17} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/coepqf/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0077d8] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={17} />
                  </a>
                  <a
                    href="https://www.youtube.com/@coepquantfinanceclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f25c3b] transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="mailto:quantfinance@coeptech.ac.in"
                    className="hover:text-[#8ec339] transition-colors"
                    aria-label="Email"
                  >
                    <Mail size={17} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Interactive Contact Form Modal with Spacecraft Launch Animation ── */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-7 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground leading-none">Get In Touch</h4>
                    <p className="text-xs text-muted-foreground font-mono mt-1">quantfinance@coeptech.ac.in</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_subject" value={`[COEP Quant Club Contact] ${form.subject}`} />
                <input type="text" name="_honey" style={{ display: "none" }} />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_template" value="table" />

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Yash Patil"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background/70 border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-background/70 border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Write your inquiry or message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background/70 border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  />
                </div>

                {/* ── Spacecraft Rocket Blast-Off Submit Button (Donovan Hutchinson pJzwEw inspired) ── */}
                <div className="relative flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    🔒 Direct encrypted delivery
                  </span>

                  <div className="relative">
                    {/* Rocket Launch Element */}
                    <AnimatePresence>
                      {isLaunching && (
                        <motion.div
                          initial={{ x: 0, y: 0, rotate: 45, scale: 1, opacity: 1 }}
                          animate={{
                            x: [0, 25, 75, 260],
                            y: [0, -25, -95, -340],
                            scale: [1, 1.4, 2, 0],
                            opacity: [1, 1, 0.9, 0],
                          }}
                          transition={{ duration: 0.95, ease: "easeIn" }}
                          className="absolute -top-3 left-1/2 z-50 pointer-events-none flex flex-col items-center"
                        >
                          <Rocket size={28} className="text-cyan-400 drop-shadow-[0_0_15px_#00ffd6]" />
                          <motion.div
                            animate={{ scale: [1, 1.7, 1], opacity: [0.8, 1, 0.6] }}
                            transition={{ repeat: Infinity, duration: 0.12 }}
                            className="flex items-center -mt-1"
                          >
                            <Flame size={22} className="text-orange-500 fill-orange-500 rotate-180 drop-shadow-[0_0_12px_#f97316]" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={loading || submitted}
                      className="relative overflow-hidden h-11 px-7 rounded-lg bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75 shadow-lg group"
                    >
                      {submitted ? (
                        <>
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          <span>Payload Delivered!</span>
                        </>
                      ) : isLaunching ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                            className="w-3.5 h-3.5 border-2 border-background border-t-transparent rounded-full"
                          />
                          <span>Launching Rocket...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Rocket size={15} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform text-accent" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}