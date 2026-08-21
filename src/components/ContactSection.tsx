import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MessageSquare, Github, Linkedin, Youtube, X, CheckCircle2, Rocket, Flame, ArrowLeft } from "lucide-react";

export default function ContactSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "General Contact", message: "" });
  const [loading, setLoading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"join" | "general" | "collab">("general");
  const navigate = useNavigate();

  const handleTabChange = (tab: "join" | "general" | "collab", label: string) => {
    setActiveTab(tab);
    setForm({ ...form, subject: label });
  };

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
      }).catch((err) => console.error("Form submit notice:", err));

      setTimeout(() => {
        setSubmitted(true);
        setIsLaunching(false);
      }, 1000);

      setTimeout(() => {
        setIsFlipped(false);
        setSubmitted(false);
        setLoading(false);
        navigate("/thank-you");
      }, 2200);
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
      setIsLaunching(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 max-w-5xl mx-auto flex flex-col items-center select-none">
      {/* ── Minimalist Section Header ──────────────────────── */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono font-semibold block mb-2">
          CONNECT WITH US
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
          Get In Touch
        </h2>
        <p className="mt-2 text-white/70 text-sm sm:text-base max-w-xl mx-auto font-mono">
          Official Research & Engineering Division of COEP Quantitative Finance Club.
        </p>
      </div>

      {/* ── VictoryDesign Stylized Outer Game Canvas (Exact Screenshot) ── */}
      <div className="relative w-full rounded-[32px] overflow-hidden border border-white/10 bg-[#0c1f2b] shadow-[0_25px_80px_rgba(0,0,0,0.8)] min-h-[520px] p-6 sm:p-12 flex items-center justify-center">
        {/* Floating Cartoon Clouds */}
        <motion.div
          animate={{ x: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 left-12 w-28 h-10 rounded-full bg-[#dbe5ea]/80 filter blur-[0.3px] pointer-events-none hidden sm:block shadow-sm"
        >
          <div className="absolute -top-3 left-4 w-12 h-10 rounded-full bg-[#dbe5ea]/90" />
          <div className="absolute -top-5 left-10 w-14 h-12 rounded-full bg-[#dbe5ea]/95" />
        </motion.div>

        <motion.div
          animate={{ x: [10, -10, 10] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-1/3 w-20 h-7 rounded-full bg-[#dbe5ea]/60 pointer-events-none hidden sm:block"
        >
          <div className="absolute -top-3 left-4 w-9 h-7 rounded-full bg-[#dbe5ea]/70" />
        </motion.div>

        <motion.div
          animate={{ x: [15, -15, 15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-16 w-32 h-11 rounded-full bg-[#dbe5ea]/80 filter blur-[0.3px] pointer-events-none hidden sm:block shadow-sm"
        >
          <div className="absolute -top-4 left-6 w-14 h-11 rounded-full bg-[#dbe5ea]/90" />
          <div className="absolute -top-6 left-14 w-14 h-13 rounded-full bg-[#dbe5ea]/95" />
        </motion.div>

        {/* 3D Isometric Grass Island Platform (Bottom-Right Corner) */}
        <div className="absolute -bottom-6 -right-6 w-64 h-48 pointer-events-none hidden sm:block">
          {/* Isometric Grass Block */}
          <div
            className="w-52 h-36 rounded-lg ml-auto mt-auto"
            style={{
              transform: "rotateX(58deg) rotateZ(-45deg) skewX(0deg)",
              boxShadow: "20px 20px 0px #704724, 25px 25px 0px #4d3016",
              backgroundColor: "#7bc332",
            }}
          >
            {/* Tree / Sphere on Island */}
            <div className="absolute top-4 left-6 w-9 h-9 rounded-full bg-[#5da322] shadow-inner" />
          </div>
        </div>

        {/* ── Centered Card with 3D Flip Mechanics ───────────── */}
        <div className="relative z-10 w-full max-w-2xl" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              /* ── FRONT OF CARD (Exact Layout in Screenshot) ── */
              <motion.div
                key="front"
                initial={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#111822]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10"
              >
                {/* Left Column: Avatar & Brand */}
                <div className="md:col-span-5 p-8 flex flex-col items-center justify-center text-center bg-[#0d131a]/60">
                  {/* Avatar with Electric Blue Glow Ring + India Flag */}
                  <div className="relative mb-4 group">
                    <div className="w-24 h-24 rounded-full p-1 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.75),inset_0_0_12px_rgba(0,210,255,0.4)] flex items-center justify-center bg-[#070b10] transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
                        alt="COEP Seal"
                        className="w-16 h-16 object-contain filter brightness-110"
                      />
                    </div>

                    {/* India Flag */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full overflow-hidden border-2 border-[#111822] shadow-lg flex items-center justify-center bg-white">
                      <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                        <path fill="#ff9933" d="M0 0h640v160H0z" />
                        <path fill="#ffffff" d="M0 160h640v160H0z" />
                        <path fill="#128807" d="M0 320h640v160H0z" />
                        <circle cx="320" cy="240" r="40" fill="#000080" />
                        <circle cx="320" cy="240" r="35" fill="#ffffff" />
                        <circle cx="320" cy="240" r="8" fill="#000080" />
                        {Array.from({ length: 24 }).map((_, i) => (
                          <line
                            key={i}
                            x1="320"
                            y1="240"
                            x2={320 + 35 * Math.cos((i * 15 * Math.PI) / 180)}
                            y2={240 + 35 * Math.sin((i * 15 * Math.PI) / 180)}
                            stroke="#000080"
                            strokeWidth="2"
                          />
                        ))}
                      </svg>
                    </div>
                  </div>

                  {/* Typography */}
                  <h3 className="text-xl font-black tracking-tight text-[#ff6b4a] leading-tight">
                    COEP Quant
                  </h3>
                  <span className="text-sm font-semibold text-white/90">
                    Finance Club
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 mt-1">
                    Research & Engineering
                  </span>
                </div>

                {/* Right Column: Poetry Quote & Actions */}
                <div className="md:col-span-7 p-8 flex flex-col justify-between">
                  <p className="text-white/80 font-light text-sm leading-relaxed">
                    Even when everything is perfect, you can always make it better. Break barriers in your head, engineer quantitative models with mathematics, and never forget data is poetry...
                  </p>

                  {/* Action Row */}
                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
                    {/* Orange/Coral Send Message Trigger Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setIsFlipped(true)}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff5733] to-[#ff451a] hover:from-[#ff6b4a] hover:to-[#ff5733] text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_4px_20px_rgba(255,87,51,0.4)] cursor-pointer"
                    >
                      <MessageSquare size={14} className="fill-white/20" />
                      <span>Send Message</span>
                    </motion.button>

                    {/* Monochromatic Social Icons */}
                    <div className="flex items-center gap-3 text-white/60">
                      <a
                        href="https://github.com/COEP-Quant-Finance-Club"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white hover:scale-110 transition-all p-1"
                        aria-label="GitHub"
                      >
                        <Github size={17} />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/coepqf/posts/?feedView=all"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white hover:scale-110 transition-all p-1"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={17} />
                      </a>
                      <a
                        href="https://www.youtube.com/@coepquantfinanceclub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white hover:scale-110 transition-all p-1"
                        aria-label="YouTube"
                      >
                        <Youtube size={17} />
                      </a>
                      <a
                        href="mailto:quantfinance@coeptech.ac.in"
                        className="hover:text-white hover:scale-110 transition-all p-1"
                        aria-label="Email"
                      >
                        <Mail size={17} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── BACK OF CARD: Multi-Work Category Form + Rocket Blast-Off ── */
              <motion.div
                key="back"
                initial={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0d131a]/98 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl"
              >
                {/* Form Header with Back Button */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsFlipped(false)}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Back to card"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">Send Inquiry</h3>
                      <span className="text-[10px] text-white/50 font-mono">quantfinance@coeptech.ac.in</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_subject" value={`[COEP Quant Club] ${form.subject}`} />
                  <input type="text" name="_honey" style={{ display: "none" }} />
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_template" value="table" />

                  {/* Work Intent Category Tabs */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5 flex items-center justify-between">
                      <span>Select Work Intent</span>
                      <span className="text-[10px] text-cyan-400 font-normal">{form.subject}</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "join", label: "Joining Club", tag: "Membership" },
                        { id: "general", label: "General Contact", tag: "Inquiry" },
                        { id: "collab", label: "Collaboration", tag: "Research/Industry" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleTabChange(item.id as any, item.label)}
                          className={`py-2 px-2.5 rounded-xl text-[11px] font-medium font-mono transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                            activeTab === item.id
                              ? "bg-gradient-to-r from-[#ff5733] to-[#ff451a] text-white font-bold shadow-[0_4px_15px_rgba(255,87,51,0.35)] scale-[1.02]"
                              : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className={`text-[9px] mt-0.5 ${activeTab === item.id ? "text-white/80" : "text-white/40"}`}>
                            {item.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Your Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Yash Patil"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Your Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1 flex items-center justify-between">
                      <span>Message / Details</span>
                      <span className="text-[10px] text-white/40 font-normal">
                        {activeTab === "join" ? "Mention branch, year & quant interests" : activeTab === "collab" ? "Describe proposal" : "Write details"}
                      </span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder={
                        activeTab === "join"
                          ? "Tell us about your background, programming skills, and quantitative interests..."
                          : activeTab === "collab"
                          ? "Describe your research proposal or partnership idea..."
                          : "Write your message or inquiry here..."
                      }
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733] outline-none transition-all resize-none"
                    />
                  </div>

                  {/* ── Spacecraft Rocket Blast-Off Action Row ──────── */}
                  <div className="relative flex items-center justify-between pt-2">
                    <span className="text-[10px] font-mono text-white/40">
                      🔒 Direct encrypted delivery
                    </span>

                    <div className="relative">
                      {/* Rocket Launch Element */}
                      <AnimatePresence>
                        {isLaunching && (
                          <motion.div
                            initial={{ x: 0, y: 0, rotate: 45, scale: 1, opacity: 1 }}
                            animate={{
                              x: [0, 30, 80, 260],
                              y: [0, -30, -110, -360],
                              scale: [1, 1.4, 2, 0],
                              opacity: [1, 1, 0.9, 0],
                            }}
                            transition={{ duration: 0.95, ease: "easeIn" }}
                            className="absolute -top-3 left-1/2 z-50 pointer-events-none flex flex-col items-center"
                          >
                            <Rocket size={26} className="text-cyan-300 drop-shadow-[0_0_15px_#00ffd6]" />
                            <motion.div
                              animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.6] }}
                              transition={{ repeat: Infinity, duration: 0.15 }}
                              className="flex items-center -mt-1"
                            >
                              <Flame size={20} className="text-orange-400 fill-orange-400 rotate-180 drop-shadow-[0_0_12px_#f97316]" />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={loading || submitted}
                        className="relative overflow-hidden h-10 px-6 rounded-full bg-gradient-to-r from-[#ff5733] to-[#ff451a] hover:from-[#ff6b4a] hover:to-[#ff5733] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_4px_18px_rgba(255,87,51,0.4)] disabled:opacity-75"
                      >
                        {submitted ? (
                          <>
                            <CheckCircle2 size={15} className="text-white" />
                            <span>Payload Delivered!</span>
                          </>
                        ) : isLaunching ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                              className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Launching Rocket...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Rocket size={14} className="text-white" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}