import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ThankYou from "./pages/Thankyou.tsx";
import Resources from "./pages/Resources.tsx";
import MarketIndex from "./pages/MarketIndex.tsx";
import About from "./pages/About.tsx";
import Collaborations from "./pages/Collaborations.tsx";
import Contact from "./pages/Contact.tsx";
import Loader from "./components/Loader.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [loaded, setLoaded] = useState(
    () => sessionStorage.getItem("loaded") === "true"
  );
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {!loaded && (
            <Loader
              onDone={() => {
                sessionStorage.setItem("loaded", "true");
                setLoaded(true);
              }}
            />
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            >
              <Routes location={location}>
                <Route path="/" element={<Index />} />
                <Route path="/market-index" element={<MarketIndex />} />
                <Route path="/about" element={<About />} />
                <Route path="/collaborations" element={<Collaborations />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/connect" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;