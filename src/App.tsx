import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyMotion, domAnimation } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HomePage } from "@/pages/HomePage";
import { scrollToTarget, scrollToTop } from "@/lib/scroll";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);
// Mobile address bars resize the viewport while scrolling; re-measuring every pin on each
// show/hide causes visible jumps in the pinned sections.
ScrollTrigger.config({ ignoreMobileResize: true });

// Home is the landing route, so it ships in the main bundle. Everything else is split
// into its own chunk and only downloaded when visited.
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));

// Dev-only visual feedback toolbar (~700 KB). import.meta.env.DEV is statically false in
// production builds, so the bundler drops this import entirely.
const Agentation = import.meta.env.DEV
  ? lazy(() => import("agentation").then((m) => ({ default: m.Agentation })))
  : null;

// Scroll reset on route change + hash scrolling (#services, #faq) that also works when the
// target page is a lazy chunk that hasn't rendered yet.
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (hash === "#contact") return; // handled by the redirect route below

    if (!hash) {
      scrollToTop();
      const t = setTimeout(() => ScrollTrigger.refresh(), 60);
      return () => clearTimeout(t);
    }

    // Poll for up to ~3s for the target to mount (lazy page + layout), then glide to it.
    // setTimeout rather than rAF: rAF is paused in background tabs, so a link opened in a
    // new tab would otherwise never reach its section.
    let timer = 0;
    let tries = 0;
    const seek = () => {
      const el = document.querySelector<HTMLElement>(hash);
      if (el) {
        ScrollTrigger.refresh();
        scrollToTarget(el);
      } else if (tries++ < 100) {
        timer = window.setTimeout(seek, 30);
      }
    };
    timer = window.setTimeout(seek, 0);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function HashContactRedirect() {
  const { hash } = useLocation();
  return hash === "#contact" ? <Navigate to="/contact" replace /> : null;
}

export function App() {
  useEffect(() => {
    // Respect OS-level "reduce motion": skip inertial scrolling entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
      wheelMultiplier: 1.0,
      autoRaf: false, // Driven by the GSAP ticker for frame-locked sync with ScrollTrigger
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    // Re-measure pinned sections once fonts have swapped in (line heights change).
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(updateTicker);
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <LazyMotion features={domAnimation} strict>
        <ScrollManager />
        <HashContactRedirect />
        <div className="w-full min-h-screen bg-[#e1e1e1] selection:bg-neutral-900 selection:text-white">
          {Agentation && (
            <Suspense fallback={null}>
              <Agentation />
            </Suspense>
          )}

          <Suspense fallback={<div className="min-h-screen w-full bg-[#f6f6f6]" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
        <Analytics />
        <SpeedInsights />
      </LazyMotion>
    </BrowserRouter>
  );
}

export default App;
