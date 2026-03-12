import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = ["Home", "Blogs", "Projects", "Collaborations", "Events", "About", "Contact"];

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-border" : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <span className="text-sm font-semibold tracking-wider uppercase text-foreground">
          COEP Quant Finance Club
        </span>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="label-style hover:text-accent transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-sm border border-border hover:border-accent transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-2">
          <button onClick={toggleTheme} className="p-2 border border-border rounded-sm" aria-label="Toggle theme">
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2" aria-label="Menu">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-background/95 backdrop-blur-lg border-b border-border"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="label-style text-left hover:text-accent transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
