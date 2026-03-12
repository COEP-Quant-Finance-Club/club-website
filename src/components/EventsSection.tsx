import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const events = [
  { title: "Quant Workshop: Stochastic Calculus", date: "March 2026", status: "Upcoming" },
  { title: "Trading Simulation Challenge", date: "April 2026", status: "Upcoming" },
  { title: "Guest Lecture: Industry Quant Insights", date: "May 2026", status: "Planned" },
  { title: "FinTech Hackathon", date: "June 2026", status: "Planned" },
];

export default function EventsSection() {
  return (
    <SectionWrapper id="events" title="Events">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

        <div className="flex flex-col gap-8">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Dot */}
              <div className="absolute left-[13px] md:left-[29px] top-1 w-2 h-2 rounded-full bg-accent" />

              <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center">
                <span className="label-style text-accent min-w-[100px]">{e.date}</span>
                <div>
                  <h3 className="text-base font-medium text-foreground">{e.title}</h3>
                  <span className="label-style mt-1 inline-block">{e.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
