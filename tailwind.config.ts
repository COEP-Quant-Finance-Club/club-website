import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', '"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        terminal: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        border: "rgb(var(--border-rgb, var(--border)) / <alpha-value>)",
        input: "rgb(var(--input-rgb, var(--input)) / <alpha-value>)",
        ring: "rgb(var(--ring-rgb, var(--ring)) / <alpha-value>)",
        background: "rgb(var(--background-rgb, var(--background)) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb, var(--foreground)) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary-rgb, var(--primary)) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground-rgb, var(--primary-foreground)) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary-rgb, var(--secondary)) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground-rgb, var(--secondary-foreground)) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive-rgb, var(--destructive)) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground-rgb, var(--destructive-foreground)) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted-rgb, var(--muted)) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground-rgb, var(--muted-foreground)) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb, var(--accent)) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground-rgb, var(--accent-foreground)) / <alpha-value>)",
        },
        info: "rgb(var(--info-rgb, var(--info)) / <alpha-value>)",
        up: "rgb(var(--up-rgb, var(--up)) / <alpha-value>)",
        down: "rgb(var(--destructive-rgb, var(--destructive)) / <alpha-value>)",
        amber: "rgb(var(--primary-rgb, var(--primary)) / <alpha-value>)",
        cyan: "rgb(var(--accent-rgb, var(--accent)) / <alpha-value>)",
        panel: "rgb(var(--card-rgb, var(--card)) / <alpha-value>)",
        popover: {
          DEFAULT: "rgb(var(--popover-rgb, var(--popover)) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground-rgb, var(--popover-foreground)) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card-rgb, var(--card)) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground-rgb, var(--card-foreground)) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "rgb(var(--sidebar-background-rgb, var(--sidebar-background)) / <alpha-value>)",
          foreground: "rgb(var(--sidebar-foreground-rgb, var(--sidebar-foreground)) / <alpha-value>)",
          primary: "rgb(var(--sidebar-primary-rgb, var(--sidebar-primary)) / <alpha-value>)",
          "primary-foreground": "rgb(var(--sidebar-primary-foreground-rgb, var(--sidebar-primary-foreground)) / <alpha-value>)",
          accent: "rgb(var(--sidebar-accent-rgb, var(--sidebar-accent)) / <alpha-value>)",
          "accent-foreground": "rgb(var(--sidebar-accent-foreground-rgb, var(--sidebar-accent-foreground)) / <alpha-value>)",
          border: "rgb(var(--sidebar-border-rgb, var(--sidebar-border)) / <alpha-value>)",
          ring: "rgb(var(--sidebar-ring-rgb, var(--sidebar-ring)) / <alpha-value>)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
        md: "0 4px 12px -4px rgb(0 0 0 / 0.14)",
        lg: "0 12px 28px -12px rgb(0 0 0 / 0.25)",
        xl: "0 20px 45px -20px rgb(0 0 0 / 0.35)",
        "2xl": "0 30px 60px -30px rgb(0 0 0 / 0.45)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 30px -8px rgb(var(--primary) / 0.55)",
        "glow-accent": "0 0 30px -8px rgb(var(--accent) / 0.5)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -32px rgb(0 0 0 / 0.65)",
      },
      transitionDuration: {
        120: "120ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%, 70%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;