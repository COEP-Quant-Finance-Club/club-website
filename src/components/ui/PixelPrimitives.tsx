import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared UI primitives. The names are kept from the original codebase so
 * existing call sites keep working, but the visual language is now a
 * consistent glass-panel style: soft borders, 16px radius, mono kickers.
 */

interface PanelCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

export function PixelCard({ title, className, children, ...props }: PanelCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/70 bg-card/70 shadow-[0_24px_60px_-40px_rgb(0_0_0/0.7)] backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {title && (
        <div className="border-b border-border/60 bg-secondary/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export function PixelButton({ className, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]",
        className,
      )}
      type={type}
      {...props}
    />
  );
}

export function PixelBadge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-primary",
        className,
      )}
      {...props}
    />
  );
}

export function PixelTable({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border/70 bg-card/70 backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}

export function PixelNavbar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <nav className={cn("w-full", className)} {...props} />;
}