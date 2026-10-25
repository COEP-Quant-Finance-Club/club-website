import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const partners = [
  {
    name: "National Institute of Securities Markets (NISM)",
    type: "Research Institution",
    category: "Academic & Regulatory Research",
    desc: "Collaborative research and academic exploration in financial market structures and quantitative risk frameworks.",
    logo: "/nism-logo.png",
    logoClass: "h-12 w-full max-w-[240px]",
  },
  {
    name: "AQUA Pvt Ltd",
    type: "Quant Research Platform",
    category: "Industry Technology Partner",
    desc: "High-performance institutional quant platform powering algorithmic strategy development and backtesting research.",
    logo: "/aqua-logo.jpg",
    logoClass: "h-16 w-16 rounded-lg",
  },
  {
    name: "Ainosoft Technologies",
    type: "Tech Consultant",
    category: "Software & Infrastructure",
    desc: "Technology consulting and computational infrastructure advisory for low-latency quantitative finance models.",
    logo: "/ainosoft-logo.jpg",
    logoClass: "h-16 w-16 rounded-lg",
  },
  {
    name: "Quant Club, BITS Pilani",
    type: "Student Organization",
    category: "Inter-Collegiate Chapter",
    desc: "Joint quantitative research summits, inter-university hackathons, and algorithmic trading knowledge exchanges.",
    logo: "/quant-club-bits-logo.jpg",
    logoClass: "h-16 w-16 rounded-lg",
  },
  {
    name: "QuantNet",
    type: "Quantitative Community",
    category: "Global Network",
    desc: "Global financial engineering community collaboration and educational resource sharing.",
    logo: "/quantnet-logo.jpg",
    logoClass: "h-16 w-16 rounded-lg",
  },
  {
    name: "Databento",
    type: "Data Provider",
    category: "Market Microstructure Data",
    desc: "Institutional tick-level data access and market microstructure research datasets.",
    logo: "/databento-logo.jpg",
    logoClass: "h-16 w-16 rounded-lg",
  },
];

const collaborationAreas = [
  {
    title: "Quant research and Market Making",
    desc: "We develop and deploy market making solutions for crypto markets and jointly work with entities on hypothesis research/strategies across various other markets.",
  },
  {
    title: "Market Microstructure Datasets and Tools",
    desc: "Partnerships with institutional data vendors and exchanges to build technology accessible student research infrastructure.",
  },
  {
    title: "Quant Hackathons & Case Competitions",
    desc: "Sponsoring and hosting high-stakes quantitative finance competitions and quant/algo trading simulations.",
  },
  {
    title: "Talent & Research Fellowships",
    desc: "We generously back the best minds by providing opportunities in competitive programming, trading and research, making them look good for future career opportunities in the quant space",
  },
];

export default function Collaborations() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />

        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="pt-8 pb-12 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="text-muted-foreground font-light text-base sm:text-lg max-w-3xl leading-relaxed">
              We partner with industry-leading trading desks, financial institutions, research universities, and data providers to advance open quantitative finance education in India.
            </p>
          </motion.div>
        </div>

        {/* ── Partner Logo Ticker ─────────────────────────────── */}
        <div className="py-12 px-4 max-w-6xl mx-auto border-t border-border/80">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-mono font-semibold block mb-3">
            ECOSYSTEM PARTNERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase mb-8">
            Institutions & Platforms We Work With
          </h2>

          <div
            className={`partner-ticker-mask${reduceMotion ? " partner-ticker-mask--static" : ""}`}
            role="region"
            aria-label="Our ecosystem partners"
            tabIndex={0}
          >
            <div className={`partner-ticker-track${reduceMotion ? " partner-ticker-track--static" : ""}`}>
              {[0, ...(reduceMotion ? [] : [1])].map((copy) => (
                <div
                  key={copy}
                  className="partner-ticker-group"
                  aria-hidden={copy === 1 ? "true" : undefined}
                >
                  {partners.map((partner) => (
                    <article
                      key={partner.name}
                      className="pixel-card partner-ticker-card group"
                    >
                      <div className="flex h-20 items-center justify-between gap-3">
                        <img
                          src={partner.logo}
                          alt={copy === 0 ? `${partner.name} logo` : ""}
                          className={`${partner.logoClass} shrink-0 object-contain`}
                        />
                        <span className="text-right text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                          {partner.type}
                        </span>
                      </div>
                      <div className="mt-5 border-t border-border/70 pt-4">
                        <h3 className="min-h-12 text-base font-bold text-foreground transition-colors group-hover:text-accent">
                          {partner.name}
                        </h3>
                        <span className="text-xs text-accent font-mono">{partner.category}</span>
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground font-light line-clamp-3">
                          {partner.desc}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-right text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
            {reduceMotion ? "Scroll to explore partners" : ""}
          </p>
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
                className="pixel-card p-5 border border-border bg-card/70 backdrop-blur-md hover:border-accent/40 transition-all flex items-start gap-4"
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
            Whether you are a investing and trading firm, academic institution, student society, experienced professional or fintech startup, let's build the future together!.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="h-11 px-7 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,214,0.3)]"
          >
            <span>Lets Collaborate!</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
