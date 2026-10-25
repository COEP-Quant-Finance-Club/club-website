import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const { theme, resolvedTheme, setTheme } = useNextTheme();
  const currentTheme =
    resolvedTheme ??
    theme ??
    (typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light");
  const isDark = currentTheme === "dark";

  return {
    isDark,
    toggle: () => setTheme(isDark ? "light" : "dark"),
  };
}
