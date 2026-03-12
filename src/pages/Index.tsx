import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogsSection from "@/components/BlogsSection";
import EventsSection from "@/components/EventsSection";
import CollaborationsSection from "@/components/CollaborationsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { isDark, toggle } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />
        <HeroSection />
        <ProjectsSection />
        <BlogsSection />
        <EventsSection />
        <CollaborationsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
