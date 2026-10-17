import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PopButton } from "@/components/ui/pop-button";
import { OurProjectsSection } from "@/components/OurProjectsSection";
import { FaqSection } from "@/components/FaqSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  // Guarantee instant scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const lenis = (window as unknown as { lenis?: any }).lenis;
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, []);

  // Entrance animations matching HeroSection and Framer reference
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Headline words blur and rise animation
      const words = headlineRef.current?.querySelectorAll(".project-word");
      if (words && words.length > 0) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 30,
            filter: "blur(12px)",
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.1
        );
      }

      // 2. Description blur and rise
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          {
            opacity: 0,
            y: 22,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          0.45
        );
      }

      // 3. CTA Buttons slide-up
      if (ctaButtonsRef.current) {
        tl.fromTo(
          ctaButtonsRef.current,
          {
            opacity: 0,
            y: 18,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.3)",
          },
          0.65
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="projects-page"
      className="relative min-h-screen w-full bg-[#f6f6f6] text-neutral-900 overflow-x-hidden selection:bg-neutral-900 selection:text-white font-['Switzer']"
    >
      {/* 1. Expandable Pop-out Navbar */}
      <Navbar />

      {/* 2. Hero Header Section: Tight, balanced vertical rhythm matching reference */}
      <header className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-30 pb-4 sm:pb-6 flex flex-col items-center text-center">
        {/* Top Indicator: ▪ PROJECTS */}
        <div className="flex items-center gap-2 mb-2.5 sm:mb-3 select-none">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-black inline-block" />
          <span
            className="text-[11.5px] sm:text-[12px] uppercase font-[650] tracking-[0.22em] text-[#000000]"
            style={{ fontFamily: "'Switzer', sans-serif" }}
          >
            PROJECTS
          </span>
        </div>

        {/* Big Editorial Heading */}
        <h1
          ref={headlineRef}
          className="text-center text-[38px] sm:text-[50px] md:text-[62px] lg:text-[70px] font-[600] leading-[1.05] tracking-[-0.038em] text-[#000000] max-w-4xl mx-auto select-none m-0"
          style={{ fontFamily: "'Switzer', sans-serif" }}
        >
          <span className="block">
            <span className="project-word inline-block mr-[0.01em] text-[#000000]">High-impact</span>{" "}
            <span className="project-word inline-block text-[#6b7280]">projects</span>
          </span>
          <span className="block">
            <span className="project-word inline-block mr-[0.01em] text-[#000000]">designed</span>{" "}
            <span className="project-word inline-block mr-[0.01em] text-[#000000]">for</span>{" "}
            <span className="project-word inline-block text-[#000000]">growth</span>
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p
          ref={descRef}
          className="mt-3.5 sm:mt-4 font-['Switzer'] text-[15px] sm:text-[16.5px] text-[#4b5563] font-[450] max-w-[560px] mx-auto leading-snug sm:leading-normal"
        >
          A showcase of strategic design solutions created to support products, teams, and long-term business success.
        </p>

        {/* Action PopButtons (Pop Style) */}
        <div
          ref={ctaButtonsRef}
          className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
        >
          {/* Primary PopButton: "Explore services" */}
          <PopButton
            color="black"
            size="lg"
            onClick={() => navigate("/#services")}
            className="rounded-full px-6 sm:px-7 py-3 font-['Switzer'] text-[15px] sm:text-[16px] font-[500] text-[#ffffff] gap-3 shadow-md hover:shadow-lg transition-transform cursor-pointer"
          >
            <span>Explore services</span>
            <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
            </span>
          </PopButton>

          {/* Secondary PopButton: "Contact Us" */}
          <PopButton
            color="default"
            size="lg"
            onClick={() => navigate("/contact")}
            className="rounded-full px-7 sm:px-8 py-3 font-['Switzer'] text-[15px] sm:text-[16px] font-[550] bg-white hover:bg-neutral-50 border-neutral-300 border-b-neutral-400 text-neutral-900 shadow-sm transition-all cursor-pointer"
          >
            <span>Contact Us</span>
          </PopButton>
        </div>
      </header>

      {/* 3. All 5 Projects Showcase with Full Landing Page Image & Top-Left / Bottom-Right Cards */}
      <OurProjectsSection
        limit={5}
        showHeader={false}
        showCta={false}
        showBorderTop={false}
        sectionPadding="pt-4 sm:pt-6 pb-20 sm:pb-28"
        bg="#f6f6f6"
      />

      {/* 4. Frequently Asked Questions (FAQ) Section */}
      <FaqSection />

      {/* 5. Get Started Section with Interactive Ripple Grid Background */}
      <GetStartedSection />

      {/* 6. Footer Section with Looping Muted Video & Brand Links */}
      <Footer />
    </div>
  );
};

export default ProjectsPage;
