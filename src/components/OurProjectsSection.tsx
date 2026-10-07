import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { PopButton } from "@/components/ui/pop-button";

import awarddockImg from "@/assets/landing-pages/awarddock.webp";
import rkEnterprisesImg from "@/assets/landing-pages/rk-enterprises.webp";
import socialxbrandImg from "@/assets/landing-pages/socialxbrand.webp";

gsap.registerPlugin(ScrollTrigger);

export interface ProjectItem {
  id: string;
  step: string;
  name: string;
  description: string;
  timeline: string;
  service: string;
  kickoff: string;
  landingImage: string;
  theme: "light" | "dark";
}

const PROJECTS: ProjectItem[] = [
  {
    id: "awarddock",
    step: "01",
    name: "AwardDock",
    description:
      "A certificate automation infrastructure structured to generate, verify, and deliver high-volume credentials with zero friction.",
    timeline: "4 Weeks",
    service: "Certificate Automation",
    kickoff: "Mar 12, 2024",
    landingImage: awarddockImg,
    theme: "light",
  },
  {
    id: "rk-enterprises",
    step: "02",
    name: "RK Enterprises",
    description:
      "A high-performance industrial equipment platform engineered with comprehensive machine catalogs, instant quotation flows, and precision responsive layout.",
    timeline: "6 Weeks",
    service: "Website Development",
    kickoff: "Jan 15, 2024",
    landingImage: rkEnterprisesImg,
    theme: "dark",
  },
  {
    id: "socialxbrand",
    step: "03",
    name: "SocialX Brand",
    description:
      "A conversion-focused digital brand presence engineered to accelerate social momentum, elevate visual authority, and capture market share.",
    timeline: "5 Weeks",
    service: "Digital Product Strategy",
    kickoff: "Nov 04, 2024",
    landingImage: socialxbrandImg,
    theme: "light",
  },
];

export const OurProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        // Pure opacity fade entrance with zero vertical displacement to prevent scroll fighting/jitter
        gsap.fromTo(
          card,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      aria-label="Selected Projects"
      className="relative w-full py-28 sm:py-36 md:py-44 overflow-hidden select-none"
      style={{
        background: "linear-gradient(to right, #f8f9fb 0%, #f8f9fb 100%)",
      }}
    >
      {/* 1. Header Area (Uniform spacing matching Landing-to-Services gap) */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-16">
        {/* Pill matching How It Works */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-300/80 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] mb-3 sm:mb-4 transition-transform hover:scale-105 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          <span
            className="text-[12px] uppercase font-[600] tracking-[0.22em] text-[#000000]"
            style={{ color: "#000000", fontFamily: "'Switzer', sans-serif" }}
          >
            OUR PROJECTS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        </div>

        {/* Section Headline */}
        <h2
          className="text-3xl sm:text-4xl md:text-[50px] lg:text-[54px] text-[#000000] font-[550] tracking-[-0.035em] text-center max-w-3xl leading-[1.1] m-0"
          style={{ fontFamily: "'Switzer', sans-serif" }}
        >
          <span>Selected </span>
          <span className="text-[#6b7280]">projects</span>
          <br />
          <span>crafted with purpose</span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-neutral-500 font-medium text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-3 sm:mt-4 leading-relaxed text-center"
          style={{ fontFamily: "'Switzer', sans-serif" }}
        >
          A showcase of thoughtfully designed products, websites, and brand experiences
          built for modern, fast-growing teams.
        </p>
      </div>

      {/* 2. Project Cards: Decreased width (max-w-[1080px]), larger side padding, increased gap between cards (gap-6 to gap-8) */}
      <div className="w-full max-w-[1080px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 flex flex-col gap-6 sm:gap-7 md:gap-8">
        {PROJECTS.map((project, idx) => {
          const isDark = project.theme === "dark";

          return (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[480px] overflow-hidden border border-neutral-200/90 cursor-pointer isolate"
              style={{
                borderRadius: "0px",
                backgroundColor: isDark ? "#070b14" : "#ffffff",
              }}
            >
              {/* Plain Landing Page Image directly filling the card (No background beneath it) */}
              <img
                src={project.landingImage}
                alt={project.name}
                decoding="async"
                loading="eager"
                className="w-full h-full object-cover object-top select-none transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                style={{
                  borderRadius: "0px",
                }}
              />

              {/* Top-Left Corner: Small, Sleek Translucent Frosted Glass Card */}
              <div className="absolute top-3 sm:top-4 md:top-4 left-3 sm:left-4 md:left-4 z-20 max-w-[200px] sm:max-w-[240px] md:max-w-[260px] transform-gpu">
                <div
                  className={`p-2.5 sm:p-3 md:p-3.5 backdrop-blur-sm border transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-950/85 border-white/15 text-white shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
                      : "bg-white/92 border-neutral-300/80 text-neutral-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <div className="flex items-baseline gap-1.5 mb-1 sm:mb-1.5">
                    <span
                      className={`text-[11px] sm:text-[12px] font-[550] ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      {project.step}
                    </span>
                    <h3
                      className={`text-[15px] sm:text-[17px] md:text-[18px] font-[650] tracking-[-0.02em] m-0 ${
                        isDark ? "text-white" : "text-neutral-950"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      {project.name}
                    </h3>
                  </div>
                  <p
                    className={`text-[10.5px] sm:text-[11.5px] leading-snug line-clamp-2 m-0 ${
                      isDark ? "text-neutral-300 font-normal" : "text-neutral-700 font-medium"
                    }`}
                    style={{ fontFamily: "'Switzer', sans-serif" }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom-Right Corner: Small, Sleek Translucent Frosted Glass Card (Timeline, Service, Kickoff) */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-4 right-3 sm:right-4 md:right-4 z-20 w-[170px] sm:w-[195px] md:w-[215px] transform-gpu">
                <div
                  className={`p-2 sm:p-2.5 md:p-3 backdrop-blur-sm border transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-950/85 border-white/15 text-white shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
                      : "bg-white/92 border-neutral-300/80 text-neutral-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  {/* Row 1: Timeline */}
                  <div
                    className={`flex items-center justify-between py-1 border-b ${
                      isDark ? "border-white/12" : "border-neutral-200/80"
                    }`}
                  >
                    <span
                      className={`text-[9.5px] sm:text-[10.5px] font-[500] ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      Timeline
                    </span>
                    <span
                      className={`text-[9.5px] sm:text-[10.5px] font-[600] ${
                        isDark ? "text-white" : "text-neutral-950"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      {project.timeline}
                    </span>
                  </div>

                  {/* Row 2: Service */}
                  <div
                    className={`flex items-center justify-between py-1 border-b ${
                      isDark ? "border-white/12" : "border-neutral-200/80"
                    }`}
                  >
                    <span
                      className={`text-[9.5px] sm:text-[10.5px] font-[500] ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      Service
                    </span>
                    <span
                      className={`text-[9.5px] sm:text-[10.5px] font-[600] ${
                        isDark ? "text-white" : "text-neutral-950"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      {project.service}
                    </span>
                  </div>

                  {/* Row 3: Project Kickoff */}
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`text-[9.5px] sm:text-[10.5px] font-[500] ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      Kickoff
                    </span>
                    <span
                      className={`text-[9.5px] sm:text-[10.5px] font-[600] ${
                        isDark ? "text-white" : "text-neutral-950"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      {project.kickoff}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. PopButton to view more projects */}
      <div className="w-full mt-10 sm:mt-14 md:mt-16 flex items-center justify-center">
        <PopButton
          color="black"
          size="lg"
          onClick={() => {
            window.location.hash = "projects";
          }}
          className="rounded-full px-8 sm:px-10 py-3.5 sm:py-4 font-['Switzer'] text-[15px] sm:text-[16px] font-[550] text-[#ffffff] gap-3 shadow-md hover:shadow-lg transition-transform cursor-pointer"
        >
          <span>View more projects</span>
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </span>
        </PopButton>
      </div>
    </section>
  );
};

export default OurProjectsSection;
