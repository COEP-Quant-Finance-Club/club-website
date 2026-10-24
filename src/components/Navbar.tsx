import { useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { name: "Home", path: "/" },
  { name: "Market Index", path: "/market-index" },
  { name: "Projects", path: "/", section: "projects" },
  { name: "Events", path: "/", section: "events" },
  { name: "Collaborations", path: "/collaborations" },
  { name: "About", path: "/about" },
  { name: "Resources", path: "/resources" },
];

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (link: (typeof links)[number]) => {
    setMobileOpen(false);
    if (link.section) {
      if (location.pathname === "/") {
        document.getElementById(link.section)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: link.section } });
      }
      return;
    }

    if (link.path === "/" && location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(link.path);
  };

  const themeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-grid size-11 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );

  return (
    <header className="landing-nav sticky top-0 z-50 bg-background">
      <nav aria-label="Primary" className="landing-nav-inner">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="https://www.coeptech.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="COEP Technological University website"
            title="COEP Technological University"
            className="inline-flex size-11 shrink-0 items-center justify-center"
          >
            <img
              src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
              alt="COEP Technological University seal"
              className={`h-12 w-10 object-contain ${isDark ? "" : "invert"}`}
            />
          </a>
          <Link
            to="/"
            aria-label="COEP Quant Finance Club home"
            title="COEP Quant Finance Club"
            className="inline-flex size-11 shrink-0 items-center justify-center"
          >
            <img
              src={`${import.meta.env.BASE_URL}${isDark ? "club-logo-dark.png" : "club-logo-light.png"}`}
              alt="COEP Quant Finance Club logo"
              className="size-11 object-contain"
            />
          </Link>
          <span className="landing-brand-divider" aria-hidden="true" />
          <Link to="/" className="landing-brand max-w-[10rem] truncate sm:max-w-none">
            COEP Quant Finance Club
          </Link>
        </div>

        <div className="landing-nav-links">
          {links.map((link) => {
            const active =
              (link.section && location.pathname === "/" && location.hash === `#${link.section}`) ||
              (!link.section && location.pathname === link.path);

            return (
              <button
                key={link.name}
                type="button"
                onClick={() => navigateTo(link)}
                aria-current={active ? "page" : undefined}
                className={`landing-nav-link ${active ? "landing-nav-link--active" : ""}`}
              >
                {link.name}
              </button>
            );
          })}
          <Link to="/contact" className="landing-nav-cta">
            Contact
          </Link>
          {themeToggle}
        </div>

        <div className="landing-nav-mobile">
          {themeToggle}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-grid size-11 place-items-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(90vw,24rem)] border-l border-border bg-background p-6">
              <SheetTitle className="mb-7 pr-10 text-left text-base font-medium tracking-tight">
                COEP Quant Finance Club
              </SheetTitle>
              <div className="flex flex-col divide-y divide-border">
                {links.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => navigateTo(link)}
                    className="py-4 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-7 flex min-h-11 items-center justify-between rounded-full bg-foreground px-5 text-sm font-medium text-background"
              >
                Contact <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
