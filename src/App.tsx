import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Agentation } from "agentation";
import { HeroSection } from "@/components/HeroSection";
import { ServicesIntro } from "@/components/ServicesIntro";
import { ServicesSection } from "@/components/ServicesSection";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

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

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white selection:bg-neutral-900 selection:text-white">
      {/* Visual Feedback Toolbar for AI Agents */}
      <Agentation />

      {/* 1. Landing Hero Section */}
      <HeroSection />

      {/* 2. Increased Gap & Editorial Transition with Blurry Slide-in Animation */}
      <ServicesIntro />

      {/* 3. Four Full-Width Services with Parallax & Static Slicing */}
      <ServicesSection />
    </div>
  );
}

export default App;
