import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X, Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Market Index", path: "/market-index" },
  { name: "Projects", path: "/#projects" },
  { name: "Events", path: "/#events" },
  { name: "Collaborations", path: "/collaborations" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Resources", path: "/resources" },
];

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const handleNavigation = (linkName: string) => {
    setMobileOpen(false);

    if (linkName === "Home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (linkName === "Market Index") {
      navigate("/market-index");
      return;
    }

    if (linkName === "About") {
      navigate("/about");
      return;
    }

    if (linkName === "Collaborations") {
      navigate("/collaborations");
      return;
    }

    if (linkName === "Contact") {
      navigate("/contact");
      return;
    }

    if (linkName === "Resources") {
      navigate("/resources");
      return;
    }

    // Anchor-based homepage sections (Projects, Events)
    const targetId = linkName.toLowerCase();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: targetId } });
      return;
    }

    scrollTo(targetId);
  };

  const isLinkActive = (item: { name: string; path: string }) => {
    if (item.name === "Home") return location.pathname === "/";
    if (item.name === "Market Index") return location.pathname === "/market-index";
    if (item.name === "About") return location.pathname === "/about";
    if (item.name === "Collaborations") return location.pathname === "/collaborations";
    if (item.name === "Contact") return location.pathname === "/contact" || location.pathname === "/connect";
    if (item.name === "Resources") return location.pathname === "/resources";
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-border"
          : location.pathname === "/"
          ? "bg-transparent border-transparent"
          : "bg-background/80 backdrop-blur-md border-border/60"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <a
            href="https://www.coeptech.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            title="COEP Technological University"
          >
            <img
              src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
              alt="COEP Seal"
              className={`h-14 w-auto object-contain mt-0.5 hover:opacity-80 transition ${
                !isDark ? "invert" : ""
              }`}
            />
          </a>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold tracking-wider uppercase text-foreground hover:text-accent transition-colors cursor-pointer"
          >
            COEP Quant Finance Club
          </button>
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://github.com/COEP-Quant-Finance-Club" className="text-muted-foreground hover:text-accent transition-colors" aria-label="GitHub"><Github size={14} /></a>
            <a href="https://www.linkedin.com/company/coepqf/posts/?feedView=all" className="text-muted-foreground hover:text-accent transition-colors" aria-label="LinkedIn"><Linkedin size={14} /></a>
            <a href="mailto:quantfinance@coeptech.ac.in" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Email"><Mail size={14} /></a>
            <a href="https://www.instagram.com/coep_quant_finance/" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={14} /></a>
            <a href="https://www.youtube.com/@coepquantfinanceclub" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube Channel"><Youtube size={14} /></a>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((item) => {
            const active = isLinkActive(item);
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`label-style transition-colors cursor-pointer text-xs uppercase tracking-wider font-mono ${
                  active ? "text-accent font-bold" : "text-foreground/80 hover:text-accent"
                }`}
              >
                {item.name}
              </button>
            );
          })}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-sm border border-border hover:border-accent transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-2">
          <button onClick={toggleTheme} className="p-2 border border-border rounded-sm cursor-pointer" aria-label="Toggle theme">
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 cursor-pointer" aria-label="Menu">
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
            {links.map((item) => {
              const active = isLinkActive(item);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.name)}
                  className={`label-style text-left transition-colors text-xs uppercase tracking-wider font-mono ${
                    active ? "text-accent font-bold" : "text-foreground/80 hover:text-accent"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
