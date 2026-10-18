import React, { useRef, useState } from "react";
import Lenis from "lenis";

import socialxbrandBg from "@/assets/landing-page-bg/socialxbrand.webp";
import wmcBg from "@/assets/landing-page-bg/wmc.webp";
import rkEnterprisesBg from "@/assets/landing-page-bg/rk-enterprises.webp";
import gullycultureBg from "@/assets/landing-page-bg/gullyculture.webp";
import awarddockBg from "@/assets/landing-page-bg/awarddock.webp";

import socialxbrandImg from "@/assets/landing-pages/socialxbrand.webp";
import wmcImg from "@/assets/landing-pages/wmc.webp";
import rkEnterprisesImg from "@/assets/landing-pages/rk-enterprises.webp";
import gullycultureImg from "@/assets/landing-pages/gullyculture.webp";
import awarddockImg from "@/assets/landing-pages/awarddock.webp";

export interface ShowcaseProject {
  id: string;
  category: string;
  title: string;
  bgImage: string;
  landingImage: string;
  glowColor: string;
}

// Exactly ordered as requested:
// 1. socialxbrand -> PRODUCT DESIGN
// 2. wmc -> UI/UX DESIGN
// 3. gullyculture -> LANDING PAGE (center, active by default)
// 4. rk enterprises -> WEBSITE DEVELOPMENT
// 5. awarddock -> AUTOMATION
const PROJECTS: ShowcaseProject[] = [
  {
    id: "socialxbrand",
    category: "PRODUCT DESIGN",
    title: "SocialX Brand",
    bgImage: socialxbrandBg,
    landingImage: socialxbrandImg,
    glowColor: "rgba(99, 102, 241, 0.25)",
  },
  {
    id: "wmc",
    category: "UI/UX DESIGN",
    title: "WMC Labs",
    bgImage: wmcBg,
    landingImage: wmcImg,
    glowColor: "rgba(168, 85, 247, 0.25)",
  },
  {
    id: "gullyculture",
    category: "LANDING PAGE",
    title: "Gully Culture",
    bgImage: gullycultureBg,
    landingImage: gullycultureImg,
    glowColor: "rgba(217, 119, 6, 0.25)",
  },
  {
    id: "rk-enterprises",
    category: "WEBSITE DEVELOPMENT",
    title: "RK Enterprises",
    bgImage: rkEnterprisesBg,
    landingImage: rkEnterprisesImg,
    glowColor: "rgba(14, 165, 233, 0.25)",
  },
  {
    id: "awarddock",
    category: "AUTOMATION",
    title: "AwardDock",
    bgImage: awarddockBg,
    landingImage: awarddockImg,
    glowColor: "rgba(234, 179, 8, 0.25)",
  },
];

export const HeroCarousel: React.FC = () => {
  // Center card (gullyculture: LANDING PAGE) active by default
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = PROJECTS[activeIndex];

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);

    // Synchronize with Lenis for smooth scroll stabilization if off-center
    const globalLenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (globalLenis && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < 50 || rect.bottom > vh + 70) {
        globalLenis.scrollTo(containerRef.current, {
          offset: -70,
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none pt-2 pb-6">
      {/* 5-Card Expanding Showcase Stage */}
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl px-0 sm:px-4 flex items-center justify-center"
      >
        {/* Soft Ambient Glow matching active card */}
        <div
          className="pointer-events-none absolute w-[90%] max-w-[680px] h-[70%] blur-[90px] opacity-50 transition-[background] duration-700 ease-out z-0"
          style={{
            background: `radial-gradient(circle, ${activeProject.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* 5-Card Contiguous Row: Butter-smooth heavy weighted physics */}
        <div className="relative z-10 flex items-stretch justify-center w-full h-[clamp(220px,62vw,300px)] sm:h-[380px] md:h-[420px] lg:h-[480px] gap-1 sm:gap-2">
          {PROJECTS.map((project, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={project.id}
                onClick={() => handleSelect(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Show ${project.title}`}
                aria-pressed={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(idx);
                  }
                }}
                className={`group cursor-pointer relative overflow-hidden rounded-none border transition-[flex-grow,min-width,opacity,border-color,box-shadow] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? "flex-[4.8] min-w-0 sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[560px] border-neutral-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.25)] z-20"
                    : "flex-[1] min-w-0 sm:min-w-[50px] md:min-w-[56px] lg:min-w-[80px] xl:min-w-[95px] opacity-85 hover:opacity-100 border-neutral-300/80 hover:border-neutral-500 z-10"
                }`}
                style={{
                  borderRadius: "0px",
                }}
              >
                {/* 1. Fully Opaque Background Image (No metadata, no dark fade) */}
                <img
                  src={project.bgImage}
                  alt=""
                  width={1600}
                  height={783}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-100"
                />

                {/* 2. Simple Landing Page Image: 0px Corners, Object-Contain, Hover Zoom */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-1.5 sm:p-5 md:p-6 overflow-hidden">
                  <img
                    src={project.landingImage}
                    alt={project.category}
                    className={`max-w-full max-h-full object-contain rounded-none select-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "group-hover:scale-[1.03] shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
                        : "group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    }`}
                    style={{
                      borderRadius: "0px",
                    }}
                    width={1600}
                    height={800}
                    decoding="async"
                    fetchPriority={isActive ? "high" : "auto"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Text Below: PRODUCT DESIGN, UI/UX DESIGN, WEBSITE DEVELOPMENT, LANDING PAGE, AUTOMATION */}
      <div className="w-full mt-6 sm:mt-8 flex items-center justify-center text-center">
        <span
          className="text-[13px] sm:text-[15px] md:text-[16px] font-[650] uppercase tracking-[0.24em] text-[#000000] select-none transition-all duration-300 [text-shadow:_0_1px_2px_rgba(0,0,0,0.06)]"
          style={{ fontFamily: "'Switzer', sans-serif" }}
        >
          {activeProject.category}
        </span>
      </div>
    </div>
  );
};

export default HeroCarousel;
