import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Agentation } from "agentation";
import { HomePage } from "@/pages/HomePage";
import { ContactPage } from "@/pages/ContactPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Helper component to handle scroll reset and hash scrolling with Lenis
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      lenis?.scrollTo(0, { immediate: true, force: true });

      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        lenis?.scrollTo(0, { immediate: true, force: true });
        ScrollTrigger.refresh();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
}

// Redirect hash #contact to dedicated /contact route for consistent experience
function HashRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact") {
      navigate("/contact", { replace: true });
    }
  }, [location, navigate]);

  return null;
}

export function App() {
  useEffect(() => {
    // 1. Initialize Lenis for luxurious buttery-smooth weighted scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
      wheelMultiplier: 1.0,
      autoRaf: false, // Driven strictly via GSAP ticker for frame-locked sync
    });

    // 2. Synchronize Lenis with GSAP ScrollTrigger & expose globally
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <HashRedirect />
      <div className="w-full min-h-screen bg-[#e1e1e1] selection:bg-neutral-900 selection:text-white">
        {/* Visual Feedback Toolbar for AI Agents */}
        <Agentation />

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
