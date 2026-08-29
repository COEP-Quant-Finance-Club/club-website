import { useState, useEffect } from "react";

// Global listeners for instant reactive syncing across all components
const listeners = new Set<(isDark: boolean) => void>();

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("theme");
  // If user explicitly selected "light", respect it; otherwise always default to true (Dark Mode)
  if (stored === "light") return false;
  return true;
}

let globalIsDark = getInitialTheme();

// Ensure initial DOM state is always dark by default
if (typeof window !== "undefined") {
  if (globalIsDark) {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(globalIsDark);

  useEffect(() => {
    // Check current state from document.documentElement
    const current = document.documentElement.classList.contains("dark") || !document.documentElement.classList.contains("light");
    setIsDark(current);
    globalIsDark = current;

    const callback = (val: boolean) => setIsDark(val);
    listeners.add(callback);

    // MutationObserver on document.documentElement class attribute to catch any DOM changes
    const observer = new MutationObserver(() => {
      const isNowDark = document.documentElement.classList.contains("dark") || !document.documentElement.classList.contains("light");
      if (isNowDark !== globalIsDark) {
        globalIsDark = isNowDark;
        setIsDark(isNowDark);
        listeners.forEach((fn) => fn(isNowDark));
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      listeners.delete(callback);
      observer.disconnect();
    };
  }, []);

  const toggle = () => {
    const next = !globalIsDark;
    globalIsDark = next;
    if (next) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    setIsDark(next);
    listeners.forEach((fn) => fn(next));
  };

  return { isDark, toggle };
}
