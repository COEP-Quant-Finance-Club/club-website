import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const facts = [
  { value: 36, display: "36", label: "Sector indices" },
  { value: 1445, display: "1,445+", label: "Equities tracked" },
  { value: null, display: "3-state", label: "Market regimes" },
];

const asks = [
  { price: "2,247.93", depth: 38 },
  { price: "2,247.83", depth: 47 },
  { price: "2,247.73", depth: 34 },
  { price: "2,247.63", depth: 56 },
  { price: "2,247.53", depth: 43 },
  { price: "2,247.43", depth: 69 },
  { price: "2,247.33", depth: 52 },
];

const bids = [
  { price: "2,247.23", depth: 48 },
  { price: "2,247.13", depth: 62 },
  { price: "2,247.03", depth: 41 },
  { price: "2,246.93", depth: 72 },
  { price: "2,246.83", depth: 54 },
  { price: "2,246.73", depth: 36 },
  { price: "2,246.63", depth: 58 },
];

function CountUp({ value, display }: { value: number | null; display: string }) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const [current, setCurrent] = useState("0");
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("en-IN"),
  );

  useMotionValueEvent(rounded, "change", setCurrent);

  useEffect(() => {
    if (value === null || reduceMotion) return;
    const controls = animate(count, value, { duration: 1.1, ease: "easeOut" });
    return controls.stop;
  }, [count, reduceMotion, value]);

  if (value === null || reduceMotion) return <span>{display}</span>;
  return (
    <span aria-label={display}>
      {current}
      {display.endsWith("+") ? "+" : ""}
    </span>
  );
}

function CodeLine({ children, delay }: { children: string; delay: string }) {
  return (
    <span
      className="hero-code-line block"
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function DepthRows({
  label,
  rows,
}: {
  label: string;
  rows: { price: string; depth: number }[];
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>{label}</span>
        <span>Price</span>
      </div>
      <ol aria-label={`Simulated ${label.toLowerCase()}`} className="space-y-0.5">
        {rows.map(({ price, depth }) => (
          <li
            key={price}
            className="relative flex h-7 items-center justify-between overflow-hidden px-2 font-mono text-xs tabular-nums"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 right-0 bg-accent/10"
              style={{ width: `${depth}%` }}
            />
            <span className="relative text-muted-foreground">{label === "ASK" ? "−" : "+"}</span>
            <span className="relative text-foreground">{price}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-[min(800px,calc(100svh-4.75rem))] max-w-[1360px] grid-cols-1 items-end gap-12 px-6 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-[clamp(3rem,6vw,5rem)] lg:px-12 lg:pb-20 lg:pt-12"
    >
      <div className="max-w-[780px]">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="label-style mb-7"
        >
          COEP Technological University <span aria-hidden="true">•</span> Est. 1854
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.04 }}
          className="text-[clamp(3.35rem,8vw,7.4rem)] font-light leading-[0.91] tracking-[-0.06em]"
        >
          <span className="block">Engineering</span>
          <span className="hero-rotating-word block text-accent" aria-hidden="true">
            <span>finance</span>
            <span>markets</span>
            <span>research</span>
          </span>
          <span className="sr-only">finance</span>
          <span className="block">through math.</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-7 max-w-[37rem] text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Student researchers building market indices, systematic strategies, and open-source tools for Indian markets.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Button size="lg" onClick={() => navigate("/market-index")}>
            Press start <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <Button variant="outline" size="lg" onClick={scrollToProjects}>
            View projects
          </Button>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-9 max-w-[34rem] border-l border-border pl-4 font-mono text-xs leading-[1.9] text-muted-foreground sm:mt-11 sm:pl-5"
          role="img"
          aria-label="Illustrative code: load the COEP 36-sector index, calculate returns, and classify three market regimes."
        >
          <CodeLine delay="0.25s">
            <span className="text-accent">idx</span> = load(<span className="text-foreground">"coep36"</span>)
          </CodeLine>
          <CodeLine delay="0.45s">
            <span className="text-accent">r</span> = idx.pct_change().dropna()
          </CodeLine>
          <CodeLine delay="0.65s">
            <span className="text-accent">regime</span> = classify(r, states=3)
          </CodeLine>
          <CodeLine delay="0.85s">
            <span className="text-accent">&gt;&gt;&gt;</span> 36 sectors | 1,445 equities | state 2
          </CodeLine>
        </motion.div>

        <motion.dl
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="mt-9 grid grid-cols-3 gap-5 border-t border-border pt-5 sm:mt-11 sm:gap-8"
          aria-label="Club research at a glance"
        >
          {facts.map(({ value, display, label }) => (
            <div key={label}>
              <dt className="text-xs leading-snug text-muted-foreground sm:text-sm">{label}</dt>
              <dd className="mt-2 font-mono text-xl font-medium tracking-tight text-foreground tabular-nums sm:text-2xl">
                <CountUp value={value} display={display} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.aside
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
        aria-label="Simulated order book depth, illustrative only"
        className="w-full max-w-[560px] justify-self-end border border-border p-4 sm:p-5 lg:p-6"
      >
        <header className="mb-5 flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="font-mono text-xs font-medium tracking-wide text-foreground">COEP36 · depth</p>
            <p className="mt-1 text-xs text-muted-foreground">Market depth</p>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Simulated feed
          </span>
        </header>

        <div className="grid grid-cols-2 gap-x-6">
          <DepthRows label="ASK" rows={asks} />
          <DepthRows label="BID" rows={bids} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 font-mono">
          <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Mid price</span>
          <span className="text-base font-medium tabular-nums text-foreground">2,247.28</span>
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>Illustrative only</span>
          <span className="tabular-nums">Spread 0.10</span>
        </div>
      </motion.aside>

      <button
        type="button"
        onClick={scrollToProjects}
        className="absolute bottom-5 right-6 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:right-8 lg:right-12"
        aria-label="Scroll to discover content"
      >
        Scroll to discover content <ArrowDown size={14} aria-hidden="true" />
      </button>
    </section>
  );
}
