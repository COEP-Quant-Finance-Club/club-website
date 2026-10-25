import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar isDark={isDark} toggleTheme={toggle} />
      <main className="flex flex-1 items-center px-4 py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto w-full max-w-3xl border-y border-border py-12 sm:py-16"
        >
          <p className="label-style mb-4">COEP Quant Finance Club</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Thank You</h1>
          <p className="mt-5 text-lg text-foreground">
            Your message has been successfully submitted.
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            We appreciate you reaching out. Our team will review your message and respond as soon as possible.
          </p>
          <Button variant="outline" className="mt-8" onClick={() => navigate(-1)}>
            <ArrowLeft aria-hidden="true" /> Go Back
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
