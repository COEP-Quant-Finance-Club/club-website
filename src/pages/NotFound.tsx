import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const NotFound = () => {
  const location = useLocation();
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar isDark={isDark} toggleTheme={toggle} />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="label-style mb-4">404</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Oops! Page not found
        </h1>
        <Link to="/" className="mt-6 w-fit text-sm font-medium text-accent underline underline-offset-4">
          Return to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
