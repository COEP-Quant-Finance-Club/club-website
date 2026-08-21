import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IndexTicker from "@/components/IndexTicker";
import IndexShowcaseSection from "@/components/IndexShowcaseSection";
import ProjectsSection from "@/components/ProjectsSection";
import MathModelsSection from "@/components/MathModelsSection";
import EventsSection from "@/components/EventsSection";
import CollaborationsSection from "@/components/CollaborationsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const targetId = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!targetId) return;

    const timeout = window.setTimeout(() => {
      const element = document.getElementById(targetId);
      if (!element) return;

      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      navigate(".", { replace: true, state: null });
    }, 40);

    return () => window.clearTimeout(timeout);
  }, [location.state, navigate]);

  return (
    <div className="relative min-h-screen">
      {/* Blueprint grid background */}
      <div className="fixed inset-0 grid-background opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggle} />
        
        {/* Fullscreen Video Hero */}
        <HeroSection />

        {/* Live Streaming Ticker at the transition */}
        <div className="relative z-20 shadow-md">
          <IndexTicker onSelectSector={() => navigate("/market-index")} />
        </div>

        {/* Sections revealed on scroll */}
        <IndexShowcaseSection />
        <ProjectsSection />
        <MathModelsSection />
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
