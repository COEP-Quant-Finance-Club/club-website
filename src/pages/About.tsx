import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { Mail, Phone, ArrowRight, ShieldCheck, Binary, Cpu, LineChart, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const focuses = [
  {
    icon: Binary,
    title: "Quantitative Research & Financial Mathematics",
    desc: "Rigorous statistical analysis, stochastic calculus, time-series forecasting, and cross-sectional factor models engineered specifically for Indian equities.",
  },
  {
    icon: Cpu,
    title: "Algorithmic Trading & High-Speed Execution",
    desc: "Low-latency backtesting engines, automated regime-adaptive trading systems, and execution routing architectures.",
  },
  {
    icon: LineChart,
    title: "Financial Modeling & Derivatives Pricing",
    desc: "Black-Scholes-Merton extensions, Monte Carlo simulation engines, implied volatility surface calibration, and option Greeks modeling.",
  },
  {
    icon: Code2,
    title: "Open-Source Quantitative Tools & Infrastructure",
    desc: "Architecting open-source quantitative libraries, market micro-structure datasets, and real-time market indices for student researchers across India.",
  },
];

const leadership = [
  {
    name: "Abhiraj Vaidya",
    role: "Co-Founder",
    email: "abhivaidya57@gmail.com",
    contact: "+91 90220 80982",
    dept: "COEP Tech University",
  },
  {
    name: "Vedant Varpe",
    role: "Co-Founder",
    email: "vedant.algofy@gmail.com",
    contact: "+91 94050 06110",
    dept: "COEP Tech University",
  },
  {
    name: "Aadarsh Jha",
    role: "Secretary",
    email: "jhaas23.extc@coeptech.ac.in",
    contact: "+91 7620 157 083",
    dept: "Electronics & Telecom",
  },
  {
    name: "Yashraj Patil",
    role: "Joint Secretary",
    email: "patilyr23.mfg@coeptech.ac.in",
    contact: "+91 70574 44660",
    dept: "Manufacturing Science & Engg",
  },
];

export default function About() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />

        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="pt-28 pb-12 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur-md mb-4 text-xs font-mono tracking-widest text-accent uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>COEP Technological University • Est. 1854</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              About The Club
            </h1>
            <p className="mt-4 text-muted-foreground font-light text-base sm:text-lg max-w-3xl leading-relaxed">
              India's premier student-driven quantitative finance organization. We bridge mathematical theory, computational infrastructure, and algorithmic trading systems across Indian equities.
            </p>
          </motion.div>
        </div>

        {/* ── Core Research Pillars ───────────────────────────── */}
        <div className="py-12 px-4 max-w-6xl mx-auto border-t border-border/80">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-semibold block mb-3">
            RESEARCH FOCUS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-8">
            What We Engineer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {focuses.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-border bg-card/70 backdrop-blur-md hover:border-accent/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Leadership & Core Team ─────────────────────────── */}
        <div className="py-12 px-4 max-w-6xl mx-auto border-t border-border/80">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-semibold block mb-3">
            LEADERSHIP
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-8">
            Club Leadership Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {leadership.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-xl border border-border bg-card/70 backdrop-blur-md hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent block mb-1">
                    {m.role}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-1">{m.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono mb-4">{m.dept}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-border text-xs font-mono text-muted-foreground">
                  <a
                    href={`mailto:${m.email}`}
                    className="flex items-center gap-2 hover:text-accent transition-colors truncate"
                  >
                    <Mail size={12} className="flex-shrink-0 text-accent" />
                    <span className="truncate">{m.email}</span>
                  </a>
                  <a
                    href={`tel:${m.contact.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 hover:text-accent transition-colors truncate"
                  >
                    <Phone size={12} className="flex-shrink-0 text-accent" />
                    <span>{m.contact}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Call To Action ──────────────────────────────────── */}
        <div className="py-16 px-4 max-w-6xl mx-auto text-center border-t border-border/80">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-3">
            Want to Join Our Quantitative Team?
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            We actively recruit driven students passionate about mathematics, machine learning, and algorithmic trading.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="h-11 px-7 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,214,0.3)]"
          >
            <span>Apply to Join Club</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
