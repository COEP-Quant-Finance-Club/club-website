import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { Mail, Phone, ArrowRight, ShieldCheck, Binary, Cpu, LineChart, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const focuses = [
  {
    icon: Binary,
    title: "Research & Investment Analysis",
    desc: "We study companies, industries, and markets through financial analysis, forecasting, and quantitative methods—from long-term investing to evaluating early-stage ideas.",
  },
  {
    icon: Cpu,
    title: "Trading Across Markets",
    desc: "We explore both directional/systematic trading and market making, turning market views into testable strategies and learning to manage risk across global markets.",
  },
  {
    icon: LineChart,
    title: "Technology & Product Development",
    desc: "We love to code and build: from open-source research tools and market data infrastructure to practical technology products shaped by real problems.",
  },
  {
    icon: Code2,
    title: "Writing, Puzzles & Market Challenges",
    desc: "We share our teams’ analysis through blogs and social media, and make problem-solving fun with regular puzzles, brainteasers, and trading challenges.",
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              About The Club
            </h1>
            <p className="mt-4 text-muted-foreground font-light text-base sm:text-lg max-w-3xl leading-relaxed">
              Rooted at COEP, Asia’s third-oldest college, we bring curious builders together around mathematics, technology, and financial markets. What began with a love of programming and problem-solving now spans development, research, and trading across global markets.
            </p>
          </motion.div>
        </div>

        {/* ── Core Research Pillars ───────────────────────────── */}
        <div className="py-12 px-4 max-w-6xl mx-auto border-t border-border/80">
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
                  className="pixel-card p-6 border border-border bg-card/70 backdrop-blur-md hover:border-accent/50 transition-all flex flex-col justify-between group"
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
            Driven by Passion and Curiosity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {leadership.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="pixel-card p-5 border border-border bg-card/70 backdrop-blur-md hover:border-accent/40 transition-all flex flex-col justify-between"
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
        <div className="max-w-6xl mx-auto border-t border-border/80 px-4 py-10 sm:py-12">
          <div className="pixel-card flex flex-col gap-6 border border-border bg-card/70 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">
                Get involved
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Want to Join Our Team?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Curious about markets, mathematics, or building things? Bring your ideas and learn with us—whatever your starting point.
              </p>
            </div>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start border border-accent bg-accent px-6 text-xs font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:self-auto"
            >
              <span>Apply to Join Club</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
