import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Building2, Send, Github, Linkedin, Instagram, Youtube, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px 0px" });
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "research" | "join">("general");
  const navigate = useNavigate();

  // Automatically trigger the unfolding animation when user reaches the end of website
  useEffect(() => {
    if (isInView && !hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAutoOpened]);

  const handleTabChange = (tab: "general" | "research" | "join", label: string) => {
    setActiveTab(tab);
    setForm({ ...form, subject: label });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await fetch(`https://formsubmit.co/quantfinance@coeptech.ac.in`, {
        method: "POST",
        body: formData,
      });
      setSubmitted(true);
      setTimeout(() => {
        navigate("/thank-you");
      }, 1200);
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="relative py-28 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
          Connect With Us
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Get In Touch
        </h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-lg mx-auto font-light">
          Have questions regarding our research, quantitative models, or collaborations? Send us a message.
        </p>
      </div>

      {/* ── VictoryDesign 3D Unfolding Contact Card ─────────── */}
      <div className="flex flex-col items-center justify-center">
        {/* Unfold Trigger Banner if collapsed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="p-6 rounded-2xl border border-accent/40 bg-card/80 backdrop-blur-xl shadow-2xl hover:border-accent cursor-pointer transition-all max-w-md w-full flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-background border border-border p-1 flex items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
                    alt="COEP Seal"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-foreground block">COEP Quant Finance</span>
                  <span className="text-[11px] text-muted-foreground font-mono">Click to unfold contact card</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-semibold uppercase tracking-wider group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Sparkles size={13} />
                <span>Open</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Unfolded Card Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateX: 15, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, rotateX: -10, y: 30 }}
              transition={{ type: "spring", stiffness: 90, damping: 18, duration: 0.8 }}
              className="relative w-full rounded-2xl overflow-hidden border border-border/80 bg-card/75 backdrop-blur-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border/80"
              style={{ perspective: 1200 }}
            >
              {/* ── Left Column: Profile & Info Pane ───────────────── */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-secondary/30">
                <div>
                  {/* Header Profile Identity with Staggered Entrance */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="flex items-center gap-3.5 mb-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shadow-lg p-1.5 flex-shrink-0">
                      <img
                        src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
                        alt="COEP Tech Seal"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground leading-tight">
                        COEP Quant Finance Club
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        Research & Engineering Division
                      </p>
                    </div>
                  </motion.div>

                  {/* Status Pill */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open for Research Inquiries</span>
                  </motion.div>

                  {/* Contact Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-4 text-xs font-mono text-muted-foreground"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/70 flex items-center justify-center text-foreground flex-shrink-0 shadow-xs">
                        <Mail size={14} />
                      </div>
                      <div className="truncate">
                        <span className="block text-[10px] text-muted-foreground/70 uppercase">Email</span>
                        <a href="mailto:quantfinance@coeptech.ac.in" className="text-foreground hover:text-accent transition-colors">
                          quantfinance@coeptech.ac.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/70 flex items-center justify-center text-foreground flex-shrink-0 shadow-xs">
                        <Building2 size={14} />
                      </div>
                      <div>
                        <span className="block text-[10px] text-muted-foreground/70 uppercase">Institution</span>
                        <span className="text-foreground">COEP Technological University</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/70 flex items-center justify-center text-foreground flex-shrink-0 shadow-xs">
                        <MapPin size={14} />
                      </div>
                      <div>
                        <span className="block text-[10px] text-muted-foreground/70 uppercase">Location</span>
                        <span className="text-foreground">Wellesley Rd, Shivajinagar, Pune, MH 411005</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Social Row with Bouncing Icons */}
                <div className="pt-8 mt-6 border-t border-border/60">
                  <span className="block text-[10px] uppercase font-mono text-muted-foreground mb-3 tracking-wider">
                    Connect on Socials
                  </span>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: Github, href: "https://github.com/COEP-Quant-Finance-Club", label: "GitHub" },
                      { icon: Linkedin, href: "https://www.linkedin.com/company/coepqf/posts/?feedView=all", label: "LinkedIn" },
                      { icon: Instagram, href: "https://www.instagram.com/coep_quant_finance/", label: "Instagram" },
                      { icon: Youtube, href: "https://www.youtube.com/@coepquantfinanceclub", label: "YouTube" },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <motion.a
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 + idx * 0.08 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-background/90 hover:bg-accent/15 border border-border hover:border-accent/50 text-foreground hover:text-accent flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                          aria-label={item.label}
                        >
                          <Icon size={15} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Right Column: Interactive Form Pane ────────────── */}
              <div className="lg:col-span-7 p-8 flex flex-col justify-between">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="_subject" value={`[COEP Quant Club] ${form.subject}`} />
                  <input type="text" name="_honey" style={{ display: "none" }} />
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_template" value="table" />

                  {/* Category Tabs */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Inquiry Topic
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "general", label: "General Inquiry" },
                        { id: "research", label: "Research Collab" },
                        { id: "join", label: "Join Club" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleTabChange(item.id as any, item.label)}
                          className={`py-2 px-3 rounded-lg text-xs font-medium font-mono transition-all cursor-pointer text-center ${
                            activeTab === item.id
                              ? "bg-foreground text-background font-semibold shadow-xs"
                              : "bg-background/60 hover:bg-muted border border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full bg-background/60 border border-border/80 rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
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
                        className="w-full bg-background/60 border border-border/80 rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Write your message or inquiry here..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-background/60 border border-border/80 rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit and Fold Action Row */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-mono text-muted-foreground">
                      🔒 Direct encrypted submission
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        disabled={loading || submitted}
                        className="h-11 px-6 rounded-lg bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
                      >
                        {submitted ? (
                          <>
                            <CheckCircle2 size={15} className="text-emerald-500" />
                            <span>Sent!</span>
                          </>
                        ) : loading ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={13} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}