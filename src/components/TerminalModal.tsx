import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Maximize2, ExternalLink } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSectorCode?: string;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const terminalUrl = `${import.meta.env.BASE_URL}terminal/index.html`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="terminal-modal-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-2 sm:p-4 md:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="COEP Quantitative Sector Index and Macro Regime Terminal"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden border border-border bg-background"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 text-xs sm:px-5">
              <span className="font-medium text-foreground">
                COEP Quantitative Sector Index &amp; 3-State Macro Regime Terminal
              </span>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={terminalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  title="Open in new standalone tab"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open Standalone</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close terminal"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="relative h-full w-full flex-1 bg-background">
              <iframe
                src={terminalUrl}
                title="COEP Market Index Dashboard"
                className="h-full w-full border-0"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
