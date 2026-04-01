import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const blogs = [
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
  return (
    <SectionWrapper id="blogs" title="Blogs">
      <div className="mb-8 flex justify-end">
        <motion.button
          whileHover={{ x: 3 }}
          transition={spring}
          onClick={() => window.open(mediumProfileUrl, "_blank", "noopener,noreferrer")}
          className="label-style text-muted-foreground hover:text-accent transition-colors duration-300"
        >
          {"// See All Blogs ->"}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: spring }}
            onClick={() => window.open(b.url, "_blank", "noopener,noreferrer")}
            className="p-6 rounded-lg card-border hover:card-border-hover transition-shadow cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="label-style">{b.date}</span>
              <span className="label-style">· {b.read}</span>
            </div>
            <h3 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">
              {b.title}
            </h3>
            <span className="label-style mt-4 inline-block group-hover:text-accent transition-colors">
              Read Article →
            </span>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
