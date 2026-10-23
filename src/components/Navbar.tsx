import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, Moon, Sun, X, Youtube } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { name: "Market Index", path: "/market-index" },
  { name: "Projects", path: "/", section: "projects" },
  { name: "Events", path: "/", section: "events" },
  { name: "Collaborations", path: "/collaborations" },
  { name: "About", path: "/about" },
  { name: "Resources", path: "/resources" },
];

const homeLink = { name: "Home", path: "/" };

const socials = [
  { label: "GitHub", href: "https://github.com/COEP-Quant-Finance-Club", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/coepqf/posts/?feedView=all", icon: Linkedin },
  { label: "Email", href: "mailto:quantfinance@coeptech.ac.in", icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/coep_quant_finance/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@coepquantfinanceclub", icon: Youtube },
];

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    if (!onHome) {
      setActiveSection("");
      return;
    }

    const sections = links
      .filter((link) => link.section)
      .map((link) => document.getElementById(link.section!))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  const navigateTo = (link: (typeof links)[number] | typeof homeLink) => {
    setMobileOpen(false);
    if ("section" in link && link.section) {
      if (onHome) {
        document.getElementById(link.section)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: link.section } });
      }
      return;
    }
    if (link.path === "/" && onHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(link.path);
  };

  const isActive = (link: (typeof links)[number]) => {
    if (link.section) return onHome && activeSection === link.section;
    return location.pathname === link.path;
  };

  const renderNavigationLinks = (mobile = false) =>
    links.map((link) => {
      const active = isActive(link);
      return (
        <button
          key={link.name}
          type="button"
          onClick={() => navigateTo(link)}
          aria-current={active ? "page" : undefined}
          className={`relative text-sm transition-colors ${
            active
              ? "font-medium text-foreground after:absolute after:inset-x-0 after:-bottom-[1.15rem] after:h-px after:bg-foreground"
              : "text-muted-foreground hover:text-foreground"
          } ${mobile ? "w-full py-4 text-left text-base after:hidden" : "py-2"}`}
        >
          {link.name}
        </button>
      );
    });

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-[1360px] items-center justify-between gap-6 px-6 lg:px-12"
      >
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="https://www.coeptech.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            title="COEP Technological University"
            className="flex size-9 shrink-0 items-center justify-center"
          >
            <img
              src={`${import.meta.env.BASE_URL}coep-tech-seal.png`}
              alt="COEP Seal"
              className={`max-h-8 w-auto object-contain ${
                isDark ? "mix-blend-screen" : "invert mix-blend-multiply"
              }`}
            />
          </a>
          <svg
            aria-hidden="true"
            className="hidden size-[18px] shrink-0 text-foreground sm:block"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path d="M2 15.5 7 10l3.2 2.5L17.5 4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12.5 4h5v5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <button
            type="button"
            onClick={() => navigateTo(homeLink)}
            className="truncate text-left text-sm font-medium tracking-tight text-foreground sm:text-base"
          >
            COEP Quant Finance Club
          </button>
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          {renderNavigationLinks()}
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Contact <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          {themeButton}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {themeButton}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(90vw,24rem)] border-l border-border bg-background p-6">
              <SheetTitle className="mb-7 pr-10 text-left text-base font-medium tracking-tight">
                COEP Quant Finance Club
              </SheetTitle>
              <div className="divide-y divide-border">{renderNavigationLinks(true)}</div>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/contact");
                }}
                className="mt-7 flex min-h-11 w-full items-center justify-between rounded-full bg-foreground px-5 text-sm font-medium text-background"
              >
                Contact <ArrowUpRight size={15} aria-hidden="true" />
              </button>
              <div className="mt-8 flex items-center gap-5">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
