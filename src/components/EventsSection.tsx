import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { useEffect, useState } from "react";

interface Event {
  title: string;
  date: string;
  time?: string;
  venue?: string;
  status: string;
}
function isValidDate(dateString: string) {
  return !isNaN(new Date(dateString).getTime());
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        // sort by date (earliest first)
        const sorted = data.sort(
          (a: Event, b: Event) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setEvents(sorted);
      });
  }, []);

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
                {/* Date with day */}
                <span className="label-style text-accent min-w-[140px]">
                  {isValidDate(e.date)
  ? new Date(e.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  : e.date}
                </span>

                <div>
                  <h3 className="text-base font-medium text-foreground">
                    {e.title}
                  </h3>

                  {/* Time + Venue */}
                  {(e.time || e.venue) && (
                    <div className="label-style mt-1 text-muted-foreground">
                      {e.time && <span>{e.time}</span>}
                      {e.time && e.venue && <span> • </span>}
                      {e.venue && <span>{e.venue}</span>}
                    </div>
                  )}

                  {/* Status */}
                  <span className="label-style mt-1 inline-block">
                    {e.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}