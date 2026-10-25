import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

export default function Contact() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar isDark={isDark} toggleTheme={toggle} />
      <main className="flex-1 py-8 sm:py-12">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
