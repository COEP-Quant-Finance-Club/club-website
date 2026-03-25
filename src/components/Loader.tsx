import { useEffect, useRef, useState } from "react";

// ── Timing (seconds) ─────────────────────────────────────────────────────────
const T_CONVERGE = 0.9;   // diffuse → converge
const T_EDGES    = 1.9;   // converge → draw edges
const T_HOLD     = 2.6;   // edges fully drawn, idle breathing begins
const T_TEXT_IN  = 2.1;   // brand text starts fading in
const T_DONE     = 3.0;   // loader exits (~3 s total)
const LOOP_AT    = 18;    // internal loop guard (won't be seen by user)
const SZ         = 600;

// ── Node & Edge definitions (unchanged from original) ────────────────────────
const NODE_DEFS = [
  { id:0,  fx:198, fy:115, r:11, color:'#1EC8C8', hollow:false },
  { id:1,  fx:463, fy:144, r:11, color:'#1EC8C8', hollow:false },
  { id:2,  fx:120, fy:171, r:11, color:'#1EC8C8', hollow:false },
  { id:3,  fx:492, fy:312, r:11, color:'#1EC8C8', hollow:false },
  { id:4,  fx:88,  fy:285, r:10, color:'#1EC8C8', hollow:false },
  { id:5,  fx:463, fy:456, r:10, color:'#1EC8C8', hollow:false },
  { id:6,  fx:302, fy:500, r:10, color:'#1EC8C8', hollow:false },
  { id:7,  fx:224, fy:485, r:10, color:'#1EC8C8', hollow:false },
  { id:8,  fx:386, fy:246, r:19, color:'#F5B731', hollow:false, dollar:true },
  { id:9,  fx:178, fy:348, r:11, color:'#F5B731', hollow:false },
  { id:10, fx:298, fy:356, r:12, color:'#F5B731', hollow:false },
  { id:11, fx:361, fy:290, r:11, color:'#F5B731', hollow:false },
  { id:12, fx:514, fy:238, r:11, color:'#F5B731', hollow:false },
  { id:13, fx:214, fy:406, r:11, color:'#F5B731', hollow:false },
  { id:14, fx:308, fy:440, r:11, color:'#F5B731', hollow:false },
  { id:15, fx:386, fy:425, r:10, color:'#F5B731', hollow:false },
  { id:16, fx:263, fy:88,  r:15, color:'#FFFFFF', hollow:true  },
  { id:17, fx:153, fy:248, r:14, color:'#FFFFFF', hollow:true  },
  { id:18, fx:235, fy:237, r:13, color:'#FFFFFF', hollow:true  },
  { id:19, fx:143, fy:431, r:15, color:'#FFFFFF', hollow:true  },
  { id:20, fx:496, fy:390, r:15, color:'#FFFFFF', hollow:true  },
  { id:21, fx:340, fy:148, r:6,  color:'#8BBCCC', hollow:true  },
  { id:22, fx:415, fy:200, r:6,  color:'#8BBCCC', hollow:true  },
  { id:23, fx:170, fy:195, r:6,  color:'#8BBCCC', hollow:true  },
  { id:24, fx:280, fy:195, r:6,  color:'#8BBCCC', hollow:true  },
];

const EDGE_DEFS: [number, number, string, number][] = [
  [9, 13,  'rgba(245,183,49,0.90)', 2.0],
  [13,10,  'rgba(245,183,49,0.90)', 2.0],
  [9, 10,  'rgba(245,183,49,0.85)', 1.8],
  [10, 8,  'rgba(245,183,49,0.90)', 2.0],
  [8, 11,  'rgba(245,183,49,0.90)', 2.0],
  [11,12,  'rgba(245,183,49,0.85)', 1.8],
  [14,15,  'rgba(245,183,49,0.80)', 1.6],
  [10,14,  'rgba(245,183,49,0.75)', 1.5],
  [0, 16,  'rgba(30,200,200,0.60)', 1.2],
  [0,  1,  'rgba(30,200,200,0.55)', 1.1],
  [1, 16,  'rgba(30,200,200,0.55)', 1.1],
  [16, 2,  'rgba(30,200,200,0.50)', 1.0],
  [2,  4,  'rgba(30,200,200,0.60)', 1.2],
  [4, 17,  'rgba(30,200,200,0.55)', 1.1],
  [4, 19,  'rgba(30,200,200,0.50)', 1.0],
  [3, 12,  'rgba(30,200,200,0.55)', 1.1],
  [3,  5,  'rgba(30,200,200,0.55)', 1.1],
  [5, 20,  'rgba(30,200,200,0.50)', 1.0],
  [5,  6,  'rgba(30,200,200,0.55)', 1.1],
  [6,  7,  'rgba(30,200,200,0.55)', 1.1],
  [7, 19,  'rgba(30,200,200,0.50)', 1.0],
  [0, 18,  'rgba(30,200,200,0.40)', 0.9],
  [1,  3,  'rgba(30,200,200,0.40)', 0.9],
  [2, 17,  'rgba(30,200,200,0.40)', 0.9],
  [18,17,  'rgba(200,220,240,0.35)',0.8],
  [16, 1,  'rgba(200,220,240,0.35)',0.8],
  [17, 9,  'rgba(200,220,240,0.35)',0.8],
  [18, 8,  'rgba(200,220,240,0.30)',0.7],
  [20, 12, 'rgba(200,220,240,0.30)',0.7],
  [19, 13, 'rgba(200,220,240,0.30)',0.7],
  [20,  5, 'rgba(200,220,240,0.28)',0.7],
  [0, 23,  'rgba(200,220,240,0.25)',0.6],
  [1, 21,  'rgba(200,220,240,0.25)',0.6],
  [21,22,  'rgba(200,220,240,0.22)',0.6],
  [22, 8,  'rgba(200,220,240,0.22)',0.6],
  [23,18,  'rgba(200,220,240,0.22)',0.6],
  [24,11,  'rgba(200,220,240,0.20)',0.5],
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

type NodeState = typeof NODE_DEFS[number] & {
  bx: number; by: number;
  angle: number; speed: number; turnRate: number;
  cx: number; cy: number;
  arrived: boolean; pulse: number; alpha: number; appearTime: number;
};
type EdgeState = { a: number; b: number; col: string; w: number; progress: number; active: boolean; delay: number };

function makeNodes(): NodeState[] {
  return NODE_DEFS.map((d, i) => ({
    ...d,
    dollar: (d as any).dollar ?? false,
    bx: 80 + Math.random() * (SZ - 160),
    by: 80 + Math.random() * (SZ - 160),
    angle: Math.random() * Math.PI * 2,
    speed: 1.6 + Math.random() * 1.8,
    turnRate: (Math.random() - 0.5) * 0.04,
    cx: 0, cy: 0,
    arrived: false,
    pulse: Math.random() * Math.PI * 2,
    alpha: 0,
    appearTime: 0.02 + (i / NODE_DEFS.length) * 0.45,
  }));
}

function makeEdges(): EdgeState[] {
  return EDGE_DEFS.map(([a, b, col, w], i) => ({
    a, b, col: col as string, w: w as number,
    progress: 0, active: false,
    delay: T_EDGES + i * 0.022,
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────
interface LoaderProps {
  onDone?: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaderAlpha, setLoaderAlpha] = useState(1);
  const [textAlpha, setTextAlpha]   = useState(0);
  const [visible, setVisible]       = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.height = SZ;

    let nodes = makeNodes();
    let edges = makeEdges();
    let startTime: number | null = null;
    let rafId: number;

    function drawEdge(e: EdgeState, t: number) {
      if (!e.active || e.progress <= 0) return;
      const na = nodes[e.a], nb = nodes[e.b];
      if (na.alpha < 0.05 || nb.alpha < 0.05) return;
      const tx = lerp(na.cx, nb.cx, e.progress);
      const ty = lerp(na.cy, nb.cy, e.progress);
      const glowAlpha = (0.12 + 0.08 * Math.sin(t * 2.2 + e.a * 0.6)) * e.progress;
      ctx.save();
      ctx.globalAlpha = glowAlpha;
      ctx.beginPath(); ctx.moveTo(na.cx, na.cy); ctx.lineTo(tx, ty);
      ctx.strokeStyle = e.col; ctx.lineWidth = e.w * 4.5; ctx.lineCap = "round"; ctx.stroke();
      ctx.restore();
      const shimmer = 0.55 + 0.45 * Math.sin(t * 2.8 + e.a * 0.75);
      ctx.save();
      ctx.globalAlpha = shimmer * Math.min(na.alpha, nb.alpha);
      ctx.beginPath(); ctx.moveTo(na.cx, na.cy); ctx.lineTo(tx, ty);
      ctx.strokeStyle = e.col; ctx.lineWidth = e.w; ctx.lineCap = "round"; ctx.stroke();
      ctx.restore();
    }

    function drawNode(n: NodeState, t: number) {
      if (n.alpha <= 0) return;
      const breathe = n.arrived ? 1 + 0.06 * Math.sin(t * 2.0 + n.pulse) : 1;
      const r = n.r * breathe;
      const px = n.cx, py = n.cy;
      const glowR = r * ((n as any).dollar ? 3.5 : 3.0);
      const glowStr = n.arrived
        ? (0.14 + 0.07 * Math.sin(t * 1.6 + n.pulse)) * n.alpha
        : 0.06 * n.alpha;
      ctx.save(); ctx.globalAlpha = glowStr;
      ctx.beginPath(); ctx.arc(px, py, glowR, 0, Math.PI * 2);
      ctx.fillStyle = n.color; ctx.fill(); ctx.restore();
      ctx.save(); ctx.globalAlpha = glowStr * 2;
      ctx.beginPath(); ctx.arc(px, py, r * 1.7, 0, Math.PI * 2);
      ctx.fillStyle = n.color; ctx.fill(); ctx.restore();
      ctx.save(); ctx.globalAlpha = n.alpha;
      ctx.beginPath(); ctx.arc(px, py, Math.max(r, 1), 0, Math.PI * 2);
      if (n.hollow) {
        ctx.strokeStyle = n.color;
        ctx.lineWidth = n.id < 16 ? 2.2 : 1.4;
        ctx.stroke();
      } else {
        ctx.fillStyle = n.color; ctx.fill();
      }
      ctx.restore();
      if ((n as any).dollar && n.alpha > 0.4) {
        ctx.save(); ctx.globalAlpha = n.alpha;
        ctx.font = `bold ${Math.round(r * 0.88)}px monospace`;
        ctx.fillStyle = "#000"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("$", px, py + 0.5); ctx.restore();
      }
    }

    function frame(ts: number) {
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;

      // Background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, SZ, SZ);

      // Subtle grid
      ctx.save(); ctx.strokeStyle = "rgba(20,55,55,0.06)"; ctx.lineWidth = 0.5;
      for (let x = 0; x < SZ; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,SZ); ctx.stroke(); }
      for (let y = 0; y < SZ; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(SZ,y); ctx.stroke(); }
      ctx.restore();

      // Update nodes
      nodes.forEach(n => {
        if (t >= n.appearTime) n.alpha = clamp(n.alpha + 0.04, 0, 1);
        if (t < T_CONVERGE) {
          n.turnRate += (Math.random() - 0.5) * 0.006;
          n.turnRate  = clamp(n.turnRate, -0.055, 0.055);
          n.angle    += n.turnRate;
          n.bx += Math.cos(n.angle) * n.speed;
          n.by += Math.sin(n.angle) * n.speed;
          const mg = 50;
          if (n.bx < mg)    { n.bx = mg;    n.angle = Math.PI - n.angle; }
          if (n.bx > SZ-mg) { n.bx = SZ-mg; n.angle = Math.PI - n.angle; }
          if (n.by < mg)    { n.by = mg;     n.angle = -n.angle; }
          if (n.by > SZ-mg) { n.by = SZ-mg;  n.angle = -n.angle; }
          n.cx = n.bx; n.cy = n.by;
        } else if (t < T_HOLD) {
          const elapsed  = t - T_CONVERGE;
          const totalDur = T_HOLD - T_CONVERGE;
          const urgency  = clamp(elapsed / totalDur, 0, 1);
          const steerStr = 0.04 + urgency * urgency * 0.35;
          const dx = n.fx - n.bx, dy = n.fy - n.by;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const targetAngle = Math.atan2(dy, dx);
          let da = targetAngle - n.angle;
          while (da >  Math.PI) da -= 2*Math.PI;
          while (da < -Math.PI) da += 2*Math.PI;
          n.turnRate = lerp(n.turnRate, da * steerStr * 3.5, steerStr);
          n.turnRate = clamp(n.turnRate, -0.12, 0.12);
          n.angle   += n.turnRate;
          const slowdown = dist < 40 ? dist / 40 : 1;
          const curSpeed = n.speed * (0.3 + 0.7 * slowdown);
          n.bx += Math.cos(n.angle) * curSpeed;
          n.by += Math.sin(n.angle) * curSpeed;
          if (dist < 2) { n.bx = n.fx; n.by = n.fy; n.arrived = true; }
          n.cx = n.bx; n.cy = n.by;
        } else {
          const jx = Math.sin(t * 0.38 + n.pulse) * 1.4 + Math.sin(t * 0.71 + n.pulse*1.3) * 0.7;
          const jy = Math.cos(t * 0.42 + n.pulse*0.8) * 1.4 + Math.cos(t * 0.65 + n.pulse*1.1) * 0.7;
          n.cx = n.fx + jx; n.cy = n.fy + jy; n.arrived = true;
        }
      });

      // Update edges
      edges.forEach(e => {
        if (t >= e.delay) {
          e.active = true;
          e.progress = clamp(easeOutCubic((t - e.delay) / 0.22), 0, 1);
        }
      });

      // Render
      edges.forEach(e => drawEdge(e, t));
      [...nodes].sort((a, b) => a.fy - b.fy).forEach(n => drawNode(n, t));

      // Brand text fade-in — drive React state from rAF
      if (t >= T_TEXT_IN) {
        const ta = clamp((t - T_TEXT_IN) / 0.5, 0, 1);
        setTextAlpha(ta);
      }

      // Exit fade
      if (t >= T_DONE) {
        const exitProg = clamp((t - T_DONE) / 0.6, 0, 1);
        setLoaderAlpha(1 - exitProg);
        if (exitProg >= 1) {
          setVisible(false);
          onDone?.();
          return; // stop rAF
        }
      }

      if (t > LOOP_AT) startTime = ts - T_HOLD * 1000;
      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: loaderAlpha,
        transition: "opacity 0.1s linear",
      }}
    >
      {/* Canvas — square, max 480px so it never crowds the text on mobile */}
      <canvas
        ref={canvasRef}
        style={{
          width:  "min(72vw, 72vh, 480px)",
          height: "min(72vw, 72vh, 480px)",
          display: "block",
        }}
      />

      {/* Brand text */}
      <div
        style={{
          opacity: textAlpha,
          transition: "opacity 0.08s linear",
          textAlign: "center",
          marginTop: "clamp(12px, 3vh, 28px)",
          userSelect: "none",
          lineHeight: 1.15,
        }}
      >
        {/* COEP — large, white, wide tracking */}
        <div
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
            fontSize:   "clamp(28px, 6vw, 52px)",
            letterSpacing: "0.22em",
            color: "#FFFFFF",
            textTransform: "uppercase",
          }}
        >
          COEP
        </div>

        {/* QUANTITATIVE — medium weight, white */}
        <div
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300,
            fontSize:   "clamp(13px, 2.8vw, 24px)",
            letterSpacing: "0.28em",
            color: "#FFFFFF",
            textTransform: "uppercase",
            marginTop: "2px",
          }}
        >
          Quantitative
        </div>

        {/* FINANCE CLUB — gold + grey */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "0.4em",
            marginTop: "4px",
          }}
        >
          <span
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 700,
              fontSize:   "clamp(14px, 3vw, 26px)",
              letterSpacing: "0.22em",
              color: "#F5B731",
              textTransform: "uppercase",
            }}
          >
            Finance
          </span>
          <span
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 300,
              fontSize:   "clamp(10px, 2vw, 18px)",
              letterSpacing: "0.18em",
              color: "rgba(180,200,210,0.75)",
              textTransform: "uppercase",
            }}
          >
            Club
          </span>
        </div>
      </div>
    </div>
  );
}