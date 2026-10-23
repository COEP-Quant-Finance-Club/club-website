import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CHF", "AUD", "CAD", "NZD"];

interface CellFreq {
  f1: number;
  f2: number;
  p1: number;
  p2: number;
}

interface CellBase {
  base: number | null;
  freq: CellFreq;
}

interface CellValue {
  value: number | null;
  percentage: number | null;
}

function buildMatrix(): CellBase[][] {
  return CURRENCIES.map((_, i) =>
    CURRENCIES.map((__, j) => {
      if (i === j) return { base: null, freq: { f1: 0, f2: 0, p1: 0, p2: 0 } };
      const seed = (i * 7 + j * 13 + i * j * 3) % 100;
      return {
        base: (seed / 100) * 2 - 1,
        freq: {
          f1: 0.4 + Math.random() * 1.2,
          f2: 0.3 + Math.random() * 0.8,
          p1: Math.random() * Math.PI * 2,
          p2: Math.random() * Math.PI * 2,
        },
      };
    }),
  );
}

function getValue(cell: CellBase, time: number): number | null {
  if (cell.base === null) return null;
  const { f1, f2, p1, p2 } = cell.freq;
  const noise = Math.sin(time * f1 + p1) * 0.35 + Math.cos(time * f2 + p2) * 0.2;
  return Math.max(-1, Math.min(1, cell.base * 0.6 + noise));
}

function formatClock() {
  return `${new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })} UTC`;
}

export default function CrossoverMap({ isDark }: { isDark: boolean }) {
  const matrixRef = useRef(buildMatrix());
  const timeRef = useRef(0);
  const [clock, setClock] = useState("");
  const [hoveredPair, setHoveredPair] = useState("");
  const [values, setValues] = useState<CellValue[][]>(() =>
    CURRENCIES.map((_, i) =>
      CURRENCIES.map((__, j) => ({
        value: i === j ? null : 0,
        percentage: i === j ? null : 0,
      })),
    ),
  );
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => {
      timeRef.current += 0.4;
      setValues(CURRENCIES.map((_, i) =>
        CURRENCIES.map((__, j) => {
          const value = getValue(matrixRef.current[i][j], timeRef.current);
          return {
            value,
            percentage: value === null ? null : value * 100 * 0.18,
          };
        }),
      ));
      setClock(formatClock());
    };
    update();
    if (reduceMotion) return;
    const interval = window.setInterval(update, 500);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="flex h-full min-h-[280px] w-full flex-col overflow-hidden bg-transparent p-1 text-foreground sm:p-2">
      <div className="mb-3 flex shrink-0 items-end justify-between">
        <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          FX Cross Rates
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          LIVE
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full table-fixed border-separate border-spacing-1 text-center">
          <thead>
            <tr>
              <th aria-hidden="true" className="w-9" />
              {CURRENCIES.map((currency) => (
                <th key={currency} className="pb-1 text-[9px] font-medium tracking-wide text-muted-foreground sm:text-[10px]">
                  {currency}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CURRENCIES.map((rowCurrency, row) => (
              <tr key={rowCurrency}>
                <th scope="row" className="pr-1 text-right text-[9px] font-medium tracking-wide text-muted-foreground sm:text-[10px]">
                  {rowCurrency}
                </th>
                {CURRENCIES.map((columnCurrency, column) => {
                  const cell = values[row][column];
                  const diagonal = cell.value === null;
                  const sign = cell.value !== null && cell.value >= 0 ? "+" : "";
                  const value = diagonal ? "—" : `${sign}${cell.value?.toFixed(3)}`;
                  const percentage = cell.percentage === null
                    ? ""
                    : `${cell.percentage >= 0 ? "+" : ""}${cell.percentage.toFixed(2)}%`;
                  const intensity = cell.value === null
                    ? 0
                    : 0.04 + Math.abs(cell.value) * (isDark ? 0.28 : 0.2);

                  return (
                    <td
                      key={columnCurrency}
                      tabIndex={diagonal ? -1 : 0}
                      aria-label={diagonal ? `${rowCurrency} ${columnCurrency}` : `${rowCurrency}/${columnCurrency}: ${value}, ${percentage}`}
                      onMouseEnter={() => !diagonal && setHoveredPair(`${rowCurrency}/${columnCurrency}`)}
                      onMouseLeave={() => setHoveredPair("")}
                      onFocus={() => !diagonal && setHoveredPair(`${rowCurrency}/${columnCurrency}`)}
                      onBlur={() => setHoveredPair("")}
                      className="h-9 rounded-sm border border-border/60 px-0.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:h-11"
                      style={{
                        backgroundColor: `rgba(var(--accent), ${intensity})`,
                        color: "rgb(var(--foreground))",
                      }}
                    >
                      <span className="block font-mono text-[9px] font-medium tabular-nums sm:text-[10px]">
                        {value}
                      </span>
                      {percentage && (
                        <span className="hidden font-mono text-[8px] tabular-nums text-muted-foreground sm:block">
                          {percentage}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex shrink-0 items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[9px] font-medium tracking-wide text-muted-foreground">
          <span>WEAK</span>
          <span className="h-px w-16 bg-accent/60" />
          <span>STRONG</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground">
          {hoveredPair && <span className="text-foreground">{hoveredPair}</span>}
          <span>{clock}</span>
        </div>
      </div>
    </div>
  );
}
