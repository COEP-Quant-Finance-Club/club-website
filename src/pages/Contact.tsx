import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

export default function Contact() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar isDark={isDark} toggleTheme={toggle} />

        <div className="pt-20 pb-12 flex-1 flex items-center justify-center">
          <ContactSection />
        </div>

        <Footer />
      </div>
    </div>
  );
}
