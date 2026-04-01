import { useEffect, useRef, useState } from "react";

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
    })
  );
}

function getValue(cell: CellBase, t: number): number | null {
  if (cell.base === null) return null;
  const { f1, f2, p1, p2 } = cell.freq;
  const noise = Math.sin(t * f1 + p1) * 0.35 + Math.cos(t * f2 + p2) * 0.2;
  return Math.max(-1, Math.min(1, cell.base * 0.6 + noise));
}

function getCellBg(v: number | null, dark: boolean): string {
  if (v === null)
    return dark ? "rgba(30,30,35,0.45)" : "rgba(0,150,184,0.06)";
  const abs = Math.abs(v);
  if (dark) {
    if (v > 0) {
      const g = Math.round(120 + 97 * abs);
      const b = Math.round(80 + 175 * abs);
      return `rgba(0,${g},${b},${(0.12 + abs * 0.82).toFixed(2)})`;
    }
    const r = Math.round(20 + 40 * abs);
    const g = Math.round(40 + 30 * abs);
    const b = Math.round(60 + 60 * abs);
    return `rgba(${r},${g},${b},${(0.15 + abs * 0.7).toFixed(2)})`;
  } else {
    if (v > 0) {
      // Positive: cyan-teal tint — same hue as vol surface wireframe
      const r = Math.round(210 - 130 * abs);
      const g = Math.round(232 - 55 * abs);
      const b = Math.round(240 - 15 * abs);
      return `rgba(${r},${g},${b},${(0.2 + abs * 0.6).toFixed(2)})`;
    }
    // Negative: muted slate-blue
    const r = Math.round(215 - 25 * abs);
    const g = Math.round(220 - 25 * abs);
    const b = Math.round(232 - 12 * abs);
    return `rgba(${r},${g},${b},${(0.28 + abs * 0.45).toFixed(2)})`;
  }
}

function getCellText(v: number | null, dark: boolean): string {
  if (v === null)
    return dark ? "rgba(120,120,130,0.4)" : "rgba(0,130,160,0.3)";
  const abs = Math.abs(v);
  if (dark) {
    if (abs < 0.15) return "rgba(140,160,170,0.7)";
    if (v > 0) {
      const r = Math.round(180 + 75 * abs);
      const g = Math.round(230 + 25 * abs);
      return `rgba(${r},${g},255,1)`;
    }
    const b = Math.round(170 + 60 * abs);
    return `rgba(130,160,${b},1)`;
  } else {
    if (abs < 0.15) return "rgba(80,110,130,0.65)";
    if (v > 0) {
      // Dark teal for positive in light mode
      const g = Math.round(100 + 30 * abs);
      const b = Math.round(140 + 30 * abs);
      return `rgba(0,${g},${b},0.9)`;
    }
    // Slate-blue for negative
    return `rgba(60,80,${Math.round(120 + 40 * abs)},0.85)`;
  }
}

interface CellValues {
  bg: string;
  textColor: string;
  val: string;
  pct: string;
}

/** Tracks the site's current colour scheme. Responds instantly when toggled. */
function useIsDark(): boolean {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;

    const html = document.documentElement;

    if (html.getAttribute("data-theme") === "dark") return true;
    if (html.getAttribute("data-theme") === "light") return false;

    return html.classList.contains("dark");
  });

  useEffect(() => {
    const html = document.documentElement;

    const update = () => {
      if (html.getAttribute("data-theme") === "dark") return setDark(true);
      if (html.getAttribute("data-theme") === "light") return setDark(false);
      setDark(html.classList.contains("dark"));
    };

    const observer = new MutationObserver(update);

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    update(); // 🔥 IMPORTANT: sync immediately

    return () => observer.disconnect();
  }, []);

  return dark;
}

export default function CrossoverMap() {
  const isDark = useIsDark();

  const matrixRef = useRef<CellBase[][]>(buildMatrix());
  const tRef = useRef(0);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);

  const [cells, setCells] = useState<CellValues[][]>(() =>
    CURRENCIES.map((_, i) =>
      CURRENCIES.map((__, j) => ({
        bg: "transparent",
        textColor: "rgba(140,160,170,0.7)",
        val: i === j ? "—" : "0.000",
        pct: i === j ? "" : "+0.00%",
      }))
    )
  );

  const [clock, setClock] = useState("");
  const [hoveredPair, setHoveredPair] = useState("");

  useEffect(() => {
    function tick(ts: number) {
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      tRef.current += dt * 0.8;
      frameRef.current += 1;
      const t = tRef.current;
      const fr = frameRef.current;

      if (fr % 3 === 0) {
        setCells(
          CURRENCIES.map((_, i) =>
            CURRENCIES.map((__, j) => {
              if (i === j)
                return {
                  bg: getCellBg(null, isDark),
                  textColor: getCellText(null, isDark),
                  val: "—",
                  pct: "",
                };
              const v = getValue(matrixRef.current[i][j], t)!;
              const sign = v >= 0 ? "+" : "";
              return {
                bg: getCellBg(v, isDark),
                textColor: getCellText(v, isDark),
                val: `${sign}${v.toFixed(3)}`,
                pct: `${sign}${(v * 100 * 0.18).toFixed(2)}%`,
              };
            })
          )
        );
      }

      if (fr % 60 === 0) {
        const now = new Date();
        setClock(
          now.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }) + " UTC"
        );
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame((ts) => {
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [isDark]);

  // ── Theme tokens ────────────────────────────────────────────────────────────
  const accentColor  = isDark ? "rgba(0,217,255,0.55)"  : "rgba(0,130,160,0.8)";
  const titleColor   = isDark ? "rgba(220,240,255,0.92)" : "rgba(15,35,50,0.88)";
  const headerLabel  = isDark ? "rgba(0,217,255,0.45)"  : "rgba(0,100,140,0.6)";
  const liveColor    = isDark ? "rgba(0,217,255,0.6)"   : "rgba(0,120,155,0.8)";
  const legendWeak   = isDark ? "rgba(130,160,180,0.55)" : "rgba(70,100,120,0.65)";
  const legendStrong = isDark ? "rgba(0,217,255,0.6)"   : "rgba(0,120,155,0.9)";
  const legendGrad   = isDark
    ? "linear-gradient(to right, rgba(20,50,80,0.8), rgba(30,30,40,0.4), rgba(0,217,255,0.85))"
    : "linear-gradient(to right, rgba(180,210,225,0.6), rgba(230,238,242,0.3), rgba(0,160,200,0.75))";
  const clockColor   = isDark ? "rgba(130,150,160,0.5)" : "rgba(80,105,120,0.6)";
  const pairColor    = isDark ? "rgba(0,217,255,0.7)"   : "rgba(0,120,155,0.85)";
  const cellBorder   = isDark ? "none"                  : "0.5px solid rgba(0,130,160,0.12)";

  return (
    <div
      style={{
        width: "100%",
        height: "550px",
        // Dark: opaque dark bg | Light: fully transparent so site grid shows through
        background: isDark ? "#06080a" : "transparent",
        display: "flex",
        flexDirection: "column",
        padding: "16px 18px 12px",
        boxSizing: "border-box",
        fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "14px",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: accentColor,
              marginBottom: "3px",
            }}
          >
            
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: titleColor,
              letterSpacing: "-0.02em",
            }}
          >
            
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "10px",
            fontFamily: "'IBM Plex Mono', monospace",
            color: liveColor,
            letterSpacing: "0.08em",
          }}
        >
          <LiveDot isDark={isDark} />
          LIVE
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: "3px",
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "44px" }} />
              {CURRENCIES.map((cur) => (
                <th
                  key={cur}
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: headerLabel,
                    textAlign: "center",
                    paddingBottom: "7px",
                  }}
                >
                  {cur}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CURRENCIES.map((rowCur, i) => (
              <tr key={rowCur}>
                <td
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    color: headerLabel,
                    textAlign: "right",
                    paddingRight: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {rowCur}
                </td>
                {CURRENCIES.map((colCur, j) => {
                  const cell = cells[i][j];
                  const isSelf = i === j;
                  return (
                    <td
                      key={colCur}
                      style={{
                        background: cell.bg,
                        borderRadius: "4px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        cursor: isSelf ? "default" : "crosshair",
                        transition: "background 0.18s ease",
                        padding: "3px 1px",
                        height: "46px",
                        outline: cellBorder,
                      }}
                      onMouseEnter={() =>
                        !isSelf && setHoveredPair(`${rowCur}/${colCur}`)
                      }
                      onMouseLeave={() => setHoveredPair("")}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "1px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "10.5px",
                            fontWeight: 600,
                            color: cell.textColor,
                            lineHeight: 1,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {cell.val}
                        </span>
                        {cell.pct && (
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: "8.5px",
                              color: cell.textColor,
                              opacity: 0.65,
                              lineHeight: 1,
                            }}
                          >
                            {cell.pct}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "9px", color: legendWeak, letterSpacing: "0.06em", fontWeight: 500 }}>
            WEAK
          </span>
          <div style={{ width: "100px", height: "5px", borderRadius: "3px", background: legendGrad }} />
          <span style={{ fontSize: "9px", color: legendStrong, letterSpacing: "0.06em", fontWeight: 500 }}>
            STRONG
          </span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {hoveredPair && (
            <span style={{ fontSize: "9px", fontFamily: "'IBM Plex Mono', monospace", color: pairColor, letterSpacing: "0.05em" }}>
              {hoveredPair}
            </span>
          )}
          <span style={{ fontSize: "9px", fontFamily: "'IBM Plex Mono', monospace", color: clockColor, letterSpacing: "0.05em" }}>
            {clock}
          </span>
        </div>
      </div>
    </div>
  );
}

function LiveDot({ isDark }: { isDark: boolean }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: isDark ? "#00D9FF" : "#0096b8",
        opacity: on ? 1 : 0.25,
        transition: "opacity 0.4s ease",
      }}
    />
  );
}