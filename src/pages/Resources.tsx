import Navbar from "@/components/Navbar";
import { useTheme } from "@/hooks/useTheme";

export default function Resources() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />
      </div>
    </div>
  );
}