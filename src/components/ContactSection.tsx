import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MessageSquare, Github, Linkedin, Youtube, X, CheckCircle2, Rocket, Flame } from "lucide-react";

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "research" | "join">("general");
  const navigate = useNavigate();

  const handleTabChange = (tab: "general" | "research" | "join", label: string) => {
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
      }).catch((err) => console.error("Form submit warning:", err));

      setTimeout(() => {
        setSubmitted(true);
        setIsLaunching(false);
      }, 1000);

      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
        setLoading(false);
        navigate("/thank-you");
      }, 2100);
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
      setIsLaunching(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 max-w-5xl mx-auto flex flex-col items-center">
      {/* ── Minimalist Section Header ──────────────────────── */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono font-semibold block mb-2">
          CONNECT WITH US
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
          Get In Touch
        </h2>
        <p className="mt-3 text-white/70 text-sm sm:text-base max-w-xl mx-auto font-mono">
          Official Research & Engineering Division of COEP Quantitative Finance Club.
        </p>
      </div>

      {/* ── VictoryDesign Minimalist Profile Card (Exact Design) ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10 bg-[#0d131a]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10"
      >
        {/* ── Left Column: Avatar & Brand Block ──────────────── */}
        <div className="md:col-span-5 p-8 sm:p-10 flex flex-col items-center justify-center text-center bg-[#111822]/40">
          {/* Avatar Ring with Electric Blue Neon Glow + India Flag */}
          <div className="relative mb-5 group">
            <div className="w-28 h-28 rounded-full p-1 border-2 border-cyan-400 shadow-[0_0_28px_rgba(0,210,255,0.75),inset_0_0_15px_rgba(0,210,255,0.4)] flex items-center justify-center bg-[#070b10] transition-transform duration-300 group-hover:scale-105">
              <img
                src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
                alt="COEP Seal"
                className="w-20 h-20 object-contain filter brightness-110"
              />
            </div>

            {/* India Flag Badge at 4 o'clock position */}
            <div className="absolute bottom-0 right-1 w-7 h-7 rounded-full overflow-hidden border-2 border-[#111822] shadow-lg flex items-center justify-center bg-white">
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

          {/* Typography Header */}
          <h3 className="text-xl font-black tracking-tight text-[#ff6b4a] leading-snug">
            COEP Quant
          </h3>
          <span className="text-sm font-semibold text-white/90">
            Finance Club
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 mt-1">
            Research & Engineering
          </span>
        </div>

        {/* ── Right Column: Poetry Quote & Actions ────────────── */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          {/* Poetic Mission Statement */}
          <p className="text-white/80 font-light text-sm sm:text-[15px] leading-relaxed italic">
            "Even when everything is perfect, you can always make it better. Break barriers in your head, engineer quantitative models with mathematics, and never forget data is poetry..."
          </p>

          {/* Action Row */}
          <div className="pt-8 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Orange/Coral Send Message Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff5733] to-[#ff451a] hover:from-[#ff6b4a] hover:to-[#ff5733] text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_4px_20px_rgba(255,87,51,0.4)] cursor-pointer"
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
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/coepqf/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:scale-110 transition-all p-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.youtube.com/@coepquantfinanceclub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:scale-110 transition-all p-1"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="mailto:quantfinance@coeptech.ac.in"
                className="hover:text-white hover:scale-110 transition-all p-1"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Interactive Message Modal with Spacecraft Blast-Off ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="relative z-10 w-full max-w-lg rounded-2xl overflow-hidden border border-white/15 bg-[#0d131a] p-6 sm:p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Send Direct Inquiry</h3>
                  <p className="text-xs text-white/50 font-mono">
                    quantfinance@coeptech.ac.in
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_subject" value={`[COEP Quant Club] ${form.subject}`} />
                <input type="text" name="_honey" style={{ display: "none" }} />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_template" value="table" />

                {/* Category Tabs */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                    Inquiry Topic
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "general", label: "General" },
                      { id: "research", label: "Research" },
                      { id: "join", label: "Join Club" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleTabChange(item.id as any, item.label)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-medium font-mono transition-all cursor-pointer text-center ${
                          activeTab === item.id
                            ? "bg-[#ff5733] text-white font-bold shadow-md"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                      Your Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Yash Patil"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                      Your Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="name@coeptech.ac.in"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Write your research inquiry or collaboration idea here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733] outline-none transition-all resize-none"
                  />
                </div>

                {/* ── Spacecraft Rocket Blast-Off Submit Row ── */}
                <div className="relative flex items-center justify-between pt-3">
                  <span className="text-[11px] font-mono text-white/40">
                    🔒 Encrypted direct delivery
                  </span>

                  <div className="relative">
                    {/* Rocket Blast-off Element */}
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
                          <Rocket size={28} className="text-cyan-300 drop-shadow-[0_0_15px_#00ffd6]" />
                          <motion.div
                            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.6] }}
                            transition={{ repeat: Infinity, duration: 0.15 }}
                            className="flex items-center -mt-1"
                          >
                            <Flame size={22} className="text-orange-400 fill-orange-400 rotate-180 drop-shadow-[0_0_12px_#f97316]" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={loading || submitted}
                      className="relative overflow-hidden h-10 px-6 rounded-full bg-gradient-to-r from-[#ff5733] to-[#ff451a] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-70"
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
                          <span>Transmit Message</span>
                          <Rocket size={14} className="text-white" />
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