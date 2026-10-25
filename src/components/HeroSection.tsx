import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const headlineWords = ["mathematics", "probability", "statistics", "physics"];

const asks = [
  { price: "2,247.93", width: "38%" },
  { price: "2,247.83", width: "47%" },
  { price: "2,247.73", width: "34%" },
  { price: "2,247.63", width: "56%" },
  { price: "2,247.53", width: "43%" },
  { price: "2,247.43", width: "69%" },
  { price: "2,247.33", width: "52%" },
];

const bids = [
  { price: "2,247.23", width: "48%" },
  { price: "2,247.13", width: "62%" },
  { price: "2,247.03", width: "41%" },
  { price: "2,246.93", width: "72%" },
  { price: "2,246.83", width: "54%" },
  { price: "2,246.73", width: "36%" },
  { price: "2,246.63", width: "58%" },
];

function useTypedHeadline() {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setTypedWord(headlineWords[0]);
      return;
    }

    const word = headlineWords[wordIndex];
    let timeout: number;

    if (!deleting && typedWord.length < word.length) {
      timeout = window.setTimeout(
        () => setTypedWord(word.slice(0, typedWord.length + 1)),
        85,
      );
    } else if (!deleting) {
      timeout = window.setTimeout(() => setDeleting(true), 950);
    } else if (typedWord.length > 0) {
      timeout = window.setTimeout(() => setTypedWord(typedWord.slice(0, -1)), 48);
    } else {
      timeout = window.setTimeout(() => {
        setWordIndex((index) => (index + 1) % headlineWords.length);
        setDeleting(false);
      }, 240);
    }

    return () => window.clearTimeout(timeout);
  }, [deleting, reduceMotion, typedWord, wordIndex]);

  return { typedWord, reduceMotion };
}

function BookRows({
  rows,
  side,
}: {
  rows: { price: string; width: string }[];
  side: "ask" | "bid";
}) {
  return (
    <div className={`book-rows book-rows--${side}`} aria-label={`${side} prices`}>
      {rows.map(({ price, width }) => (
        <div className="book-row" key={price}>
          <span>{price}</span>
          <i style={{ "--book-width": width } as React.CSSProperties} aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { typedWord, reduceMotion } = useTypedHeadline();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="home" className="landing-hero">
      <div className="landing-hero-copy">
        <h1 className="landing-hero-title" aria-label="Engineering finance through mathematics">
          <span className="landing-title-line">
            <motion.span
              className="landing-title-inner"
              initial={reduceMotion ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.2, 0.7, 0.1, 1] }}
            >
              Engineering
            </motion.span>
          </span>
          <span className="landing-title-line">
            <motion.span
              className="landing-title-inner"
              initial={reduceMotion ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.2, 0.7, 0.1, 1] }}
            >
              finance
            </motion.span>
          </span>
          <span className="landing-title-line landing-title-line--muted">
            <motion.span
              className="landing-title-inner"
              initial={reduceMotion ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.2, 0.7, 0.1, 1] }}
            >
              <span className="block">through</span>
              <span className="landing-typewriter-line" aria-hidden="true">
                <span className="landing-typewriter">
                  {typedWord}
                  <span className="landing-typewriter-cursor">_</span>
                </span>
              </span>
              <span className="sr-only">mathematics.</span>
            </motion.span>
          </span>
        </h1>

        <p className="landing-hero-description">
          Student researchers building market hypothesis, systematic strategies, and open/close source projects for Indian & Global Financial Markets.
        </p>

        <div className="landing-hero-actions">
          <Link to="/market-index" className="landing-action landing-action--primary">
            Press start <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button type="button" onClick={scrollToProjects} className="landing-action">
            View projects
          </button>
        </div>

        <div className="landing-code-shell" aria-label="Illustrative quantitative finance code in OCaml">
          <div className="landing-code-header">
            <span>MARKET REGIME MODEL</span>
            <span className="landing-code-language"></span>
          </div>
          <div className="landing-code">
            <code>
              <span className="landing-code-line">
                <span className="landing-code-keyword">let</span> idx ={" "}
                <span className="landing-code-function">load</span>{" "}
                <span className="landing-code-string">"coep36"</span> ;;
              </span>
              <span className="landing-code-line">
                <span className="landing-code-keyword">let</span> r = idx |&gt;{" "}
                <span className="landing-code-function">pct_change</span> |&gt;{" "}
                <span className="landing-code-function">dropna</span> ;;
              </span>
              <span className="landing-code-line">
                <span className="landing-code-keyword">let</span> regime ={" "}
                <span className="landing-code-function">classify</span> ~states:3 r ;;
              </span>
              <span className="landing-code-line landing-code-line--output">
                (* 36 sectors | 1,445 equities | state 2 *)
              </span>
            </code>
          </div>
        </div>

        <dl className="landing-stats">
          <div>
            <dt>Sector indices</dt>
            <dd>36</dd>
          </div>
          <div>
            <dt>Equities tracked</dt>
            <dd>1,445+</dd>
          </div>
          <div>
            <dt>Market regimes</dt>
            <dd>3-state</dd>
          </div>
        </dl>
      </div>

      <aside
        className="landing-order-book"
        aria-label="Simulated order book depth, illustrative only"
      >
        <div className="landing-order-book-heading">
          <span>COEP36 · depth</span>
          <span className="landing-simulated-feed">Order book</span>
        </div>
        <BookRows rows={asks} side="ask" />
        <div className="landing-mid-price">
          <span className="landing-live-dot" aria-hidden="true" />
          <strong>2,247.28</strong>
          <span>spread 0.10</span>
        </div>
        <BookRows rows={bids} side="bid" />
      </aside>
    </section>
  );
}
