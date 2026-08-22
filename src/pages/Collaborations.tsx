import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { Handshake, Building, GraduationCap, Database, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const partners = [
  {
    name: "National Institute of Securities Markets (NISM)",
    type: "Research Institution",
    category: "Academic & Regulatory Research",
    desc: "Collaborative research and academic exploration in financial market structures and quantitative risk frameworks.",
    icon: GraduationCap,
  },
  {
    name: "AQUA Pvt Ltd",
    type: "Quant Research Platform",
    category: "Industry Technology Partner",
    desc: "High-performance institutional quant platform powering algorithmic strategy development and backtesting research.",
    icon: Building,
  },
  {
    name: "Ainosoft Technologies",
    type: "Tech Consultant",
    category: "Software & Infrastructure",
    desc: "Technology consulting and computational infrastructure advisory for low-latency quantitative finance models.",
    icon: Building,
  },
  {
    name: "Quant Society, BITS Pilani",
    type: "Student Organization",
    category: "Inter-Collegiate Chapter",
    desc: "Joint quantitative research summits, inter-university hackathons, and algorithmic trading knowledge exchanges.",
    icon: Handshake,
  },
  {
    name: "QuantNet",
    type: "Quantitative Community",
    category: "Global Network",
    desc: "Global financial engineering community collaboration and educational resource sharing.",
    icon: Sparkles,
  },
  {
    name: "Databento",
    type: "Data Provider",
    category: "Market Microstructure Data",
    desc: "Institutional tick-level data access and market microstructure research datasets.",
    icon: Database,
  },
];

const collaborationAreas = [
  {
    title: "Joint Quantitative Research",
    desc: "Co-authoring empirical whitepapers on Indian equity sector dynamics, volatility modeling, and regime-switching algorithms.",
  },
  {
    title: "Market Microstructure Datasets",
    desc: "Partnerships with institutional data vendors and exchanges to build accessible student research infrastructure.",
  },
  {
    title: "Quant Hackathons & Case Competitions",
    desc: "Sponsoring and hosting high-stakes quantitative finance competitions and algorithmic trading simulations.",
  },
  {
    title: "Talent & Research Fellowships",
    desc: "Connecting high-performing student quantitative researchers with hedge funds, prop desks, and fintech firms.",
  },
];

export default function Collaborations() {
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
              <span>GLOBAL & INSTITUTIONAL PARTNERSHIPS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              Collaborations
            </h1>
            <p className="mt-4 text-muted-foreground font-light text-base sm:text-lg max-w-3xl leading-relaxed">
              We partner with industry-leading trading desks, financial institutions, research universities, and data providers to advance open quantitative finance education in India.
            </p>
          </motion.div>
        </div>

        {/* ── Partner Showcase Grid ───────────────────────────── */}
        <div className="py-12 px-4 max-w-6xl mx-auto border-t border-border/80">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-semibold block mb-3">
            ECOSYSTEM PARTNERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-8">
            Institutions & Platforms We Work With
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-xl border border-border bg-card/70 backdrop-blur-md hover:border-accent/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        {p.type}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-1.5">{p.name}</h3>
                    <span className="text-xs text-accent font-mono block mb-3">{p.category}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Collaboration Pillars ───────────────────────────── */}
        <div className="py-12 px-4 max-w-6xl mx-auto border-t border-border/80">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-semibold block mb-3">
            OPPORTUNITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-8">
            How We Can Collaborate
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {collaborationAreas.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl border border-border bg-card/70 backdrop-blur-md hover:border-accent/40 transition-all flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">{c.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Call To Action ──────────────────────────────────── */}
        <div className="py-16 px-4 max-w-6xl mx-auto text-center border-t border-border/80">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-3">
            Interested in Partnering With Us?
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Whether you are a prop desk, academic institution, or fintech startup, let's build the future of quant finance together.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="h-11 px-7 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,214,0.3)]"
          >
            <span>Initiate Collaboration</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
