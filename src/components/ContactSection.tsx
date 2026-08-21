import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Building2, Github, Linkedin, Youtube, CheckCircle2, Rocket, Flame } from "lucide-react";

export default function ContactSection() {
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
        navigate("/thank-you");
      }, 2100);
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
      setIsLaunching(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 max-w-6xl mx-auto flex flex-col items-center select-none">
      {/* ── Section Header ─────────────────────────────────── */}
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

      {/* ── Ultra-Clean Minimalist Glassmorphic Contact Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c141d]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]"
      >
        {/* ── Left Column: Identity & Profile Pane ───────────── */}
        <div className="relative z-10 lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-[#0f1924]/40">
          <div>
            {/* Header Avatar with Electric Blue Glow & India Flag */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full p-1 border-2 border-cyan-400 shadow-[0_0_24px_rgba(0,210,255,0.7),inset_0_0_12px_rgba(0,210,255,0.4)] flex items-center justify-center bg-[#070b10] transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
                    alt="COEP Seal"
                    className="w-12 h-12 object-contain filter brightness-110"
                  />
                </div>

                {/* India Flag Badge */}
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full overflow-hidden border-2 border-[#0f1924] shadow-md flex items-center justify-center bg-white">
                  <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                    <path fill="#ff9933" d="M0 0h640v160H0z" />
                    <path fill="#ffffff" d="M0 160h640v160H0z" />
                    <path fill="#128807" d="M0 320h640v160H0z" />
                    <circle cx="320" cy="240" r="40" fill="#000080" />
                    <circle cx="320" cy="240" r="35" fill="#ffffff" />
                    <circle cx="320" cy="240" r="8" fill="#000080" />
                  </svg>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black tracking-tight text-[#ff6b4a] leading-tight">
                  COEP Quant
                </h3>
                <p className="text-sm font-semibold text-white/90">
                  Finance Club
                </p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                  Research & Engineering
                </span>
              </div>
            </div>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open for Inquiries & Collaborations</span>
            </div>

            {/* Poetic Mission Quote */}
            <p className="text-white/75 font-light text-xs sm:text-[13px] leading-relaxed italic mb-6 border-l-2 border-cyan-400/40 pl-3">
              "Even when everything is perfect, you can always make it better. Break barriers in your head, engineer quantitative models with mathematics, and never forget data is poetry..."
            </p>

            {/* Direct Contact Meta */}
            <div className="space-y-3 text-xs font-mono text-white/60">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Mail size={13} />
                </div>
                <a href="mailto:quantfinance@coeptech.ac.in" className="text-white/80 hover:text-cyan-400 transition-colors truncate">
                  quantfinance@coeptech.ac.in
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Building2 size={13} />
                </div>
                <span className="text-white/80">COEP Technological University</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <MapPin size={13} />
                </div>
                <span className="text-white/80">Shivajinagar, Pune, MH 411005</span>
              </div>
            </div>
          </div>

          {/* Social Row */}
          <div className="pt-6 mt-6 border-t border-white/[0.08]">
            <span className="block text-[10px] uppercase font-mono text-white/40 mb-2.5 tracking-wider">
              Connect on Socials
            </span>
            <div className="flex items-center gap-2.5">
              {[
                { icon: Github, href: "https://github.com/COEP-Quant-Finance-Club", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/coepqf/posts/?feedView=all", label: "LinkedIn" },
                { icon: Youtube, href: "https://www.youtube.com/@coepquantfinanceclub", label: "YouTube" },
                { icon: Mail, href: "mailto:quantfinance@coeptech.ac.in", label: "Email" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-cyan-400/15 border border-white/[0.08] hover:border-cyan-400/40 text-white/70 hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    aria-label={item.label}
                  >
                    <Icon size={14} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Multi-Work Category Form ── */}
        <div className="relative z-10 lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="_subject" value={`[COEP Quant Club] ${form.subject}`} />
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />

            {/* Work Category Selector Tabs (Joining Club / General Contact / Collaboration) */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2 flex items-center justify-between">
                <span>Select Work Intent</span>
                <span className="text-[10px] text-cyan-400 font-normal">{form.subject}</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "join", label: "Joining Club", tag: "Membership" },
                  { id: "general", label: "General Contact", tag: "Inquiry" },
                  { id: "collab", label: "Collaboration", tag: "Research/Industry" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabChange(item.id as any, item.label)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-[#ff5733] to-[#ff451a] text-white font-bold shadow-[0_4px_16px_rgba(255,87,51,0.3)] scale-[1.01]"
                        : "bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white/60 hover:text-white"
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

            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                  Your Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Yash Patil"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/25 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733]/40 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                  Your Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/25 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733]/40 outline-none transition-all"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5 flex items-center justify-between">
                <span>Message / Details</span>
                <span className="text-[10px] text-white/40 font-normal">
                  {activeTab === "join" ? "Mention your branch, year & interests" : activeTab === "collab" ? "Describe proposal or project" : "Write message"}
                </span>
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder={
                  activeTab === "join"
                    ? "Tell us about your background, programming skills, quantitative interests, and why you want to join the COEP Quant Finance Club..."
                    : activeTab === "collab"
                    ? "Describe your research proposal, institutional partnership, or algorithmic trading collaboration ideas..."
                    : "Write your message or inquiry here..."
                }
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/25 focus:border-[#ff5733] focus:ring-1 focus:ring-[#ff5733]/40 outline-none transition-all resize-none"
              />
            </div>

            {/* ── Spacecraft Rocket Blast-Off Submit Row ─────────── */}
            <div className="relative flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-white/40">
                🔒 Direct encrypted transmission
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
                  className="relative overflow-hidden h-11 px-7 rounded-full bg-gradient-to-r from-[#ff5733] to-[#ff451a] hover:from-[#ff6b4a] hover:to-[#ff5733] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(255,87,51,0.35)] disabled:opacity-75"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 size={16} className="text-white" />
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
                      <Rocket size={15} className="text-white" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}