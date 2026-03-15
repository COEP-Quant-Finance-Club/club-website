import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-sm font-medium tracking-wider uppercase text-foreground">
          COEP Quant Finance Club
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/COEP-Quant-Finance-Club"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/company/coepqf/posts/?feedView=all"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:quantfinance@coeptech.ac.in"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://www.instagram.com/coep_quant_finance/"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.youtube.com/@coepquantfinanceclub"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={18} />
          </a>
        </div>
        <span className="label-style">© 2026 All rights reserved</span>
      </div>
    </footer>
  );
}
