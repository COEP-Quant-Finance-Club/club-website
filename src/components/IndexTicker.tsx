import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { SECTOR_INDICES_DATA } from "@/data/sectorIndicesData";

interface IndexTickerProps {
  onSelectSector?: (secCode: string) => void;
}

export default function IndexTicker({ onSelectSector }: IndexTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);

  const tickerItems = useMemo(() => {
    const leaders = [...SECTOR_INDICES_DATA]
      .sort((a, b) => b.totalReturn - a.totalReturn)
      .slice(0, 6);
    return leaders;
  }, []);

  useEffect(() => {
    const element = tickerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    const updateTabVisibility = () => setTabVisible(!document.hidden);
    observer.observe(element);
    document.addEventListener("visibilitychange", updateTabVisibility);
    updateTabVisibility();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateTabVisibility);
    };
  }, []);

  const paused = isPaused || Boolean(reduceMotion) || !isVisible || !tabVisible;

  return (
    <div
      ref={tickerRef}
      className="landing-ticker"
      aria-label="Sector total returns"
      role="region"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className={`landing-ticker-track ${paused ? "landing-ticker-track--paused" : ""}`}>
        {[false, true].map((isDuplicate) => (
          <div className="landing-ticker-sequence" key={String(isDuplicate)} aria-hidden={isDuplicate}>
            {tickerItems.map((sector) => (
              <button
                key={sector.code}
                type="button"
                className="landing-ticker-item"
                onClick={() => onSelectSector?.(sector.code)}
                aria-label={`${sector.name}, total return ${sector.totalReturn >= 0 ? "plus " : ""}${sector.totalReturn.toFixed(1)} percent`}
                tabIndex={isDuplicate ? -1 : undefined}
              >
                <span className="landing-live-dot" aria-hidden="true" />
                <span>{sector.name}</span>
                <strong>
                  {sector.totalReturn >= 0 ? "+" : ""}
                  {sector.totalReturn.toFixed(1)}%
                </strong>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
