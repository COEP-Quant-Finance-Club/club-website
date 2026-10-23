import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IndexTicker from "@/components/IndexTicker";
import IndexShowcaseSection from "@/components/IndexShowcaseSection";
import ProjectsSection from "@/components/ProjectsSection";
import MathModelsSection from "@/components/MathModelsSection";
import EventsSection from "@/components/EventsSection";
import BlogsSection from "@/components/BlogsSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
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
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar isDark={isDark} toggleTheme={toggle} />
      <main className="relative isolate">
        <MathModelsSection />
        <div className="relative z-10">
          <HeroSection />
          <IndexTicker onSelectSector={() => navigate("/market-index")} />
          <IndexShowcaseSection />
          <ProjectsSection />
          <EventsSection />
          <BlogsSection />
          <section
            id="contact-cta"
            className="mx-auto max-w-[1360px] border-t border-border px-6 py-16 sm:px-8 sm:py-24 lg:px-12"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Get In Touch
              </h2>
              <Button size="lg" onClick={() => navigate("/contact")}>
                Get In Touch <ArrowUpRight aria-hidden="true" />
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
