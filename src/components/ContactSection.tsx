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
    <section id="contact" className="relative py-20 px-4 max-w-5xl mx-auto flex flex-col items-center select-none">
      {/* ── Section Header ─────────────────────────────────── */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-semibold block mb-2">
          CONNECT WITH US
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
          Get In Touch
        </h2>
        <p className="mt-2 text-muted-foreground text-xs sm:text-sm max-w-lg mx-auto font-mono">
          Official Research & Engineering Division of COEP Quantitative Finance Club.
        </p>
      </div>

      {/* ── Compact Dark Glassmorphic Contact Card ─────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 bg-[#070c12]/98 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10 text-white"
      >
        {/* ── Left Column: Identity & Profile Pane ───────────── */}
        <div className="relative z-10 md:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-[#0b131c]/60">
          <div>
            {/* Header Avatar with Official Quant Logo, Cyan Glow & India Flag */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="relative group">
                <div className="w-14 h-14 rounded-full p-1 border-2 border-accent shadow-[0_0_20px_rgba(0,255,214,0.4),inset_0_0_10px_rgba(0,255,214,0.2)] flex items-center justify-center bg-[#050a10] transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={`${import.meta.env.BASE_URL}club-logo-dark.png`}
                    alt="COEP Quant Logo"
                    className="w-10 h-10 object-contain filter brightness-110"
                    onError={(e) => {
                      // Fallback to club-logo.png if needed
                      (e.currentTarget as HTMLImageElement).src = `${import.meta.env.BASE_URL}club-logo.png`;
                    }}
                  />
                </div>

                {/* India Flag Badge */}
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full overflow-hidden border-2 border-[#070c12] shadow-md flex items-center justify-center bg-white">
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
                <h3 className="text-base font-bold tracking-tight text-white leading-tight">
                  COEP Quant
                </h3>
                <p className="text-xs font-semibold text-white/70">
                  Finance Club
                </p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent/80 block mt-0.5">
                  Research & Engineering
                </span>
              </div>
            </div>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open for Inquiries & Collabs</span>
            </div>

            {/* Direct Contact Meta */}
            <div className="space-y-3 text-xs font-mono text-white/70">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Mail size={12} />
                </div>
                <a href="mailto:quantfinance@coeptech.ac.in" className="text-white hover:text-accent transition-colors truncate">
                  quantfinance@coeptech.ac.in
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Building2 size={12} />
                </div>
                <span className="text-white/90">COEP Technological University</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                  <MapPin size={12} />
                </div>
                <span className="text-white/90">Shivajinagar, Pune, MH 411005</span>
              </div>
            </div>
          </div>

          {/* Social Row */}
          <div className="pt-5 mt-5 border-t border-white/10">
            <span className="block text-[10px] uppercase font-mono text-white/40 mb-2 tracking-wider">
              Connect on Socials
            </span>
            <div className="flex items-center gap-2">
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
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent/15 border border-white/10 hover:border-accent/40 text-white/80 hover:text-accent flex items-center justify-center transition-all cursor-pointer shadow-xs"
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
        <div className="relative z-10 md:col-span-7 p-6 sm:p-7 flex flex-col justify-between bg-[#070c12]/90">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="_subject" value={`[COEP Quant Club] ${form.subject}`} />
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />

            {/* Work Category Selector Tabs (Joining Club / General Contact / Collaboration) */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1.5 flex items-center justify-between">
                <span>Select Work Intent</span>
                <span className="text-[10px] text-accent font-normal">{form.subject}</span>
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
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                      activeTab === item.id
                        ? "bg-accent text-accent-foreground font-bold shadow-[0_0_15px_rgba(0,255,214,0.3)] scale-[1.01]"
                        : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[9px] mt-0.5 ${activeTab === item.id ? "text-accent-foreground/80" : "text-white/40"}`}>
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                  Your Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Yash Patil"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all font-mono"
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all font-mono"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1 flex items-center justify-between">
                <span>Message / Details</span>
                <span className="text-[10px] text-white/40 font-normal">
                  {activeTab === "join" ? "Branch, year & interests" : activeTab === "collab" ? "Proposal details" : "Inquiry text"}
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
                    ? "Describe your research proposal, institutional partnership, or quantitative strategy ideas..."
                    : "Write your message or inquiry here..."
                }
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-all resize-none font-mono"
              />
            </div>

            {/* ── Spacecraft Rocket Blast-Off Submit Row ─────────── */}
            <div className="relative flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-white/40">
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
                      <Rocket size={26} className="text-cyan-300 drop-shadow-[0_0_15px_#00ffd6]" />
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 0.15 }}
                        className="flex items-center -mt-1"
                      >
                        <Flame size={20} className="text-emerald-400 fill-emerald-400 rotate-180 drop-shadow-[0_0_12px_#10b981]" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="relative overflow-hidden h-10 px-6 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,214,0.3)] disabled:opacity-75"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Payload Delivered!</span>
                    </>
                  ) : isLaunching ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                        className="w-3.5 h-3.5 border-2 border-accent-foreground border-t-transparent rounded-full"
                      />
                      <span>Launching Rocket...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Rocket size={14} />
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