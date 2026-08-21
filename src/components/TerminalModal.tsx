import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ExternalLink } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSectorCode?: string;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  // Prevent background body scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const terminalUrl = `${import.meta.env.BASE_URL}terminal/index.html`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-2 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="relative w-full h-full max-w-7xl bg-card border border-border/80 rounded-xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/40 border-b border-border text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              </div>
              <span className="font-semibold text-foreground">
                COEP Quantitative Sector Index & 3-State Macro Regime Terminal
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={terminalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors"
                title="Open in new standalone tab"
              >
                <ExternalLink size={12} />
                <span className="hidden sm:inline">Open Standalone</span>
              </a>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-rose-500/20 hover:text-rose-400 text-muted-foreground transition-colors cursor-pointer"
                aria-label="Close terminal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Embedded Terminal Frame */}
          <div className="flex-1 w-full h-full bg-background relative">
            <iframe
              src={terminalUrl}
              title="COEP Market Index Dashboard"
              className="w-full h-full border-0"
              allow="fullscreen"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
