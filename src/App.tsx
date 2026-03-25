import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ThankYou from "./pages/Thankyou.tsx";
import Loader from "./components/Loader.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [loaded, setLoaded] = useState(
    () => sessionStorage.getItem("loaded") === "true"
  );

  return (
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;