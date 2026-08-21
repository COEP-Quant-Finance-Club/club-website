import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Rocket, Flame, CheckCircle2, MessageSquare, X, RefreshCw } from "lucide-react";
import "./VictoryDesign.css";

export default function ContactSection() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
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
        navigate("/thank-you");
      }, 1900);
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
      setIsLaunching(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* ── Section Title & Replay Button ── */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
          Connect With Us
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Get In Touch
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <p className="text-muted-foreground text-sm max-w-lg font-light">
            Official Research & Engineering Division of COEP Quantitative Finance Club.
          </p>
          <button
            onClick={handleReplay}
            title="Replay Animation"
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 text-xs cursor-pointer"
          >
            <RefreshCw size={13} />
            <span className="text-[11px] font-mono">Replay</span>
          </button>
        </div>
      </div>

      {/* ── Exact VictoryDesign Stage Container ── */}
      <div key={animKey} className="victory-stage">
        {/* Exact VictoryDesign Profile Card Markup */}
        <aside className="profile-card">
          <header>
            {/* Avatar */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setShowFormModal(true);
              }}
              title="Click to Send Message"
            >
              <img
                src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
                alt="COEP Quant Club"
              />
            </a>

            {/* Username & Role */}
            <h1>COEP Quant</h1>
            <h2>Finance Club</h2>
          </header>

          {/* Bio Quote */}
          <div className="profile-bio">
            <p>
              Even when everything is perfect, you can always make it better. Break barriers in your head, create something crazy and don't forget Code is Poetry...
            </p>
          </div>

          {/* Social Links */}
          <ul className="profile-social-links">
            {/* GitHub */}
            <li>
              <a
                href="https://github.com/COEP-Quant-Finance-Club"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#333333"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                  />
                </svg>
              </a>
            </li>

            {/* LinkedIn */}
            <li>
              <a
                href="https://www.linkedin.com/company/coepqf/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#0077B5"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                </svg>
              </a>
            </li>

            {/* Direct Message Launch */}
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setShowFormModal(true);
                }}
                title="Send Message"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#FF5722"
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </aside>
      </div>

      {/* ── Spacecraft Rocket Launch Submit Modal ── */}
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

                {/* ── Spacecraft Rocket Blast-Off Submit Button ── */}
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