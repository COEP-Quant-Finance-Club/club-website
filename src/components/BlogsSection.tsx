import { motion, useReducedMotion } from "framer-motion";

const blogs = [
  {
    title: "When Rain Becomes an Asset Class: India's First Weather Derivative and the Financialization of the…",
    date: "2026-06-14",
    read: "7 min",
    url: "https://medium.com/@quantfinance/when-rain-becomes-an-asset-class-indias-first-weather-derivative-and-the-financialization-of-the-47af9062bc60",
  },
  {
    title: "Why the Indian Rupee Is Sitting Near Record Lows",
    date: "2026-04-06",
    read: "7 min",
    url: "https://medium.com/@quantfinance/why-the-indian-rupee-is-sitting-near-record-lows-c55eb5e6c6b0",
  },
  {
    title: "When Safe Havens Stop Acting Safe",
    date: "2026-03-19",
    read: "5 min",
    url: "https://medium.com/@quantfinance/when-safe-heavens-stop-acting-safe-fa8d9bb992c6",
  },
];

const mediumProfileUrl = "https://medium.com/@quantfinance";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

export default function BlogsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="blogs"
      className="mx-auto w-full max-w-[1360px] px-6 py-20 sm:py-24 lg:px-12 lg:py-32"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-foreground">
            Blogs
          </h2>
        </motion.header>
        <motion.button
          whileHover={{ x: 3 }}
          transition={spring}
          onClick={() => window.open(mediumProfileUrl, "_blank", "noopener,noreferrer")}
          className="label-style text-muted-foreground hover:text-accent transition-colors duration-300"
        >
          {"// See All Blogs ->"}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b, i) => (
          <motion.a
            key={b.title}
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="group flex h-full flex-col border border-border p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="mb-3 flex items-center gap-4">
              <span className="label-style">{b.date}</span>
              {"read" in b && <span className="label-style">· {b.read}</span>}
            </div>
            <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-accent">
              {b.title}
            </h3>
            <span className="label-style mt-auto pt-6 inline-block transition-colors group-hover:text-accent">
              Read Article →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
