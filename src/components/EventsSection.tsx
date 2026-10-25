import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { useEffect, useState } from "react";
import { ClubEvent, loadEvents } from "@/lib/events";

function isValidDate(dateString: string) {
  return !isNaN(new Date(dateString).getTime());
}

export default function EventsSection() {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    loadEvents()
      .then((data) => {
        if (cancelled) return;
        const sorted = data.sort((a, b) => {
          const firstDate = new Date(a.date).getTime();
          const secondDate = new Date(b.date).getTime();
          if (!Number.isFinite(firstDate)) return Number.isFinite(secondDate) ? 1 : 0;
          if (!Number.isFinite(secondDate)) return -1;
          return firstDate - secondDate;
        });
        setEvents(sorted);
      })
      .catch((error: unknown) => {
        console.error("Could not load events.", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SectionWrapper
      id="events"
      title="Events"
      className="border-t border-border"
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

        <div className="flex flex-col gap-8">
          {events.map((e, i) => (
            <motion.div
              key={e.id}
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
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