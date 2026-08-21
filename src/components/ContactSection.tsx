import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Building2, Send, Github, Linkedin, Instagram, Youtube, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "research" | "join">("general");
  const navigate = useNavigate();

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
    <section id="contact" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Section Headline */}
      <div className="text-center mb-12">
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

      {/* ── VictoryDesign-Inspired Interactive Profile & Contact Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl overflow-hidden border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border/80"
      >
        {/* ── Left Column: Profile & Info Pane ───────────────── */}
        <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-secondary/20">
          <div>
            {/* Club Identity */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-md p-1">
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
                <p className="text-xs text-muted-foreground font-mono">
                  Research & Engineering Division
                </p>
              </div>
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open for Research Inquiries</span>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/70 flex items-center justify-center text-foreground flex-shrink-0">
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
                <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/70 flex items-center justify-center text-foreground flex-shrink-0">
                  <Building2 size={14} />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground/70 uppercase">Institution</span>
                  <span className="text-foreground">COEP Technological University</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-background/80 border border-border/70 flex items-center justify-center text-foreground flex-shrink-0">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground/70 uppercase">Location</span>
                  <span className="text-foreground">Wellesley Rd, Shivajinagar, Pune, MH 411005</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Row */}
          <div className="pt-8 mt-6 border-t border-border/60">
            <span className="block text-[10px] uppercase font-mono text-muted-foreground mb-3 tracking-wider">
              Connect on Socials
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/COEP-Quant-Finance-Club"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background/80 hover:bg-accent/15 border border-border hover:border-accent/40 text-foreground hover:text-accent flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="https://www.linkedin.com/company/coepqf/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background/80 hover:bg-accent/15 border border-border hover:border-accent/40 text-foreground hover:text-accent flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://www.instagram.com/coep_quant_finance/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background/80 hover:bg-accent/15 border border-border hover:border-accent/40 text-foreground hover:text-accent flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://www.youtube.com/@coepquantfinanceclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background/80 hover:bg-accent/15 border border-border hover:border-accent/40 text-foreground hover:text-accent flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Form Pane ────────────── */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Hidden config for formsubmit.co */}
            <input type="hidden" name="_subject" value={`[COEP Quant Club] ${form.subject}`} />
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />

            {/* Subject / Category Tabs */}
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
                  className="w-full bg-background/50 border border-border/80 rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
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
                  className="w-full bg-background/50 border border-border/80 rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
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
                className="w-full bg-background/50 border border-border/80 rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-muted-foreground">
                🔒 Direct encrypted email delivery
              </span>

              <button
                type="submit"
                disabled={loading || submitted}
                className="h-11 px-6 rounded-lg bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-50"
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
          </form>
        </div>
      </motion.div>
    </section>
  );
}