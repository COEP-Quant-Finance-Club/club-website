import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const focuses = [
  "Quantitative research & financial mathematics",
  "Algorithmic trading systems & execution",
  "Financial modeling & derivatives pricing",
  "Open-source quantitative tools & libraries",
];


const leadership = [
  {
    name: "Abhiraj Vaidya",
    role: "Co-Founder",
    email: "abhivaidya57@gmail.com",
    contact: "+91 90220 80982",
  },
  {
    name: "Vedant Varpe",
    role: "Co-Founder",
    email: "vedant.algofy@gmail.com",
    contact: "+91 94050 06110",
  },
  {
    name: "Aadarsh Jha",
    role: "Secretary",
    email: "jhaas23.extc@coeptech.ac.in",
    contact: "+91 7620 157 083",
  },
  {
    name: "Yashraj Patil",
    role: "Joint Secretary",
    email: "patilyr23.mfg@coeptech.ac.in",
    contact: "+91 70574 44660",
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About">
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lg font-light text-foreground leading-relaxed mb-8"
        >
          COEP Quant Finance Club is a student-driven research and engineering group focused on
          applying mathematics, statistics, and computing to financial markets.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {focuses.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="text-accent mt-1">▸</span>
              <span className="text-sm text-muted-foreground font-light">{f}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="mt-16"
>
  <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">
    Leadership
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {leadership.map((member, index) => (
      <motion.div
        key={member.name}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="border border-border p-4"
      >
        <h4 className="text-foreground">{member.name}</h4>

        <p className="text-sm text-accent mt-1">
          {member.role}
        </p>

        <div className="mt-3 text-xs text-muted-foreground space-y-1">
          <p>Email: {member.email}</p>
          <p>Contact: {member.contact}</p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>
      </div>
    </SectionWrapper>
  );
}
