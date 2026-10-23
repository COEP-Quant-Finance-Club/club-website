import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  { label: "GitHub", href: "https://github.com/COEP-Quant-Finance-Club", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/coepqf/posts/?feedView=all", icon: Linkedin },
  { label: "Email", href: "mailto:quantfinance@coeptech.ac.in", icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/coep_quant_finance/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@coepquantfinanceclub", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-6 py-8 sm:flex-row sm:items-end sm:justify-between lg:px-12 lg:py-10">
        <div className="flex flex-col gap-5">
          <Link to="/" className="w-fit text-base font-medium tracking-tight text-foreground">
            COEP Quant Finance Club
          </Link>
          <p className="text-sm text-muted-foreground">© 2026 All rights reserved</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
          <nav aria-label="Social links" className="flex items-center gap-5">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={label}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Contact <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
