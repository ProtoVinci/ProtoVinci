import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { PopButton } from "@/components/ui/pop-button";
import { scrollToTop } from "@/lib/scroll";
import { ALL_PROJECTS, type ProjectItem } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export { ALL_PROJECTS, type ProjectItem };

export interface OurProjectsSectionProps {
  limit?: number;
  showHeader?: boolean;
  showBorderTop?: boolean;
  showCta?: boolean;
  sectionPadding?: string;
  bg?: string;
}

export const OurProjectsSection: React.FC<OurProjectsSectionProps> = ({
  limit,
  showHeader = true,
  showBorderTop = true,
  showCta = true,
  sectionPadding,
  bg = "#dedede",
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const displayedProjects = limit ? ALL_PROJECTS.slice(0, limit) : ALL_PROJECTS;

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        // Smooth subtle entrance animation on scroll aligning the whole card unit
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 32,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [displayedProjects.length]);

  const paddingClasses =
    sectionPadding ||
    (showHeader
      ? "pt-20 sm:pt-28 md:pt-32 pb-20 sm:pb-28 md:pb-32"
      : "pt-4 sm:pt-6 pb-20 sm:pb-28 md:pb-32");

  return (
    <section
      ref={containerRef}
      id="projects"
      aria-label="Selected Projects"
      className={`relative w-full ${paddingClasses} overflow-hidden select-none ${
        showBorderTop ? "border-t border-[#cecece]" : ""
      }`}
      style={{
        background: bg,
      }}
    >
      {/* 1. Header Area (Only displayed when showHeader is true) */}
      {showHeader && (
        <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col items-center text-center mb-10 sm:mb-12 md:mb-14">
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

          {/* Section Headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-[50px] lg:text-[54px] text-[#000000] font-[550] tracking-[-0.035em] text-center max-w-3xl leading-[1.08] m-0"
            style={{ fontFamily: "'Switzer', sans-serif" }}
          >
            <span>Selected </span>
            <span className="text-[#6b7280]">projects</span>
            <br />
            <span>crafted with purpose</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-neutral-500 font-medium text-sm sm:text-base md:text-[17px] max-w-xl mx-auto mt-3 sm:mt-3.5 leading-relaxed text-center"
            style={{ fontFamily: "'Switzer', sans-serif" }}
          >
            A showcase of thoughtfully designed products, websites, and brand experiences
            built for modern, fast-growing teams.
          </p>
        </div>
      )}

      {/* 2. Full Landing Page Image with Top-Left and Bottom-Right Metadata Cards */}
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-10 sm:gap-12 md:gap-14">
        {displayedProjects.map((project, idx) => {
          const isDark = project.theme === "dark";

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group flex flex-col w-full cursor-pointer isolate block no-underline text-inherit"
            >
              {/* Top-Left: Sleek Translucent Frosted Glass Card OUTSIDE the image at top-left */}
              <div className="self-start mb-2.5 sm:mb-3 transform-gpu transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                <div
                  className={`p-2.5 sm:p-3 md:p-3.5 border transition-all duration-300 shadow-sm group-hover:shadow-md ${
                    isDark
                      ? "bg-neutral-950/90 border-white/20 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
                      : "bg-white/95 border-neutral-300/90 text-neutral-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                  }`}
                  style={{ borderRadius: "0px", maxWidth: "280px" }}
                >
                  {/* Status Capsule Pill matching Reference Image */}
                  <div className="inline-flex items-center gap-2 p-0.5 pr-2.5 rounded-full bg-white border border-[#e2e2e2] shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-2 select-none">
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-[700] shrink-0">
                      {project.step}
                    </div>
                    <span className="text-[11px] font-[550] text-[#1f2937] tracking-tight">
                      {project.tag}
                    </span>
                  </div>

                  <h3
                    className={`text-[15px] sm:text-[17px] md:text-[18px] font-[650] tracking-[-0.02em] m-0 mb-1 ${
                      isDark ? "text-white" : "text-neutral-950"
                    }`}
                    style={{ fontFamily: "'Switzer', sans-serif" }}
                  >
                    {project.name}
                  </h3>

                  <p
                    className={`text-[10.5px] sm:text-[11.5px] leading-snug line-clamp-2 m-0 ${
                      isDark ? "text-neutral-300 font-normal" : "text-neutral-700 font-medium"
                    }`}
                    style={{ fontFamily: "'Switzer', sans-serif" }}
                  >
                    {project.shortDescription}
                  </p>
                </div>
              </div>

              {/* Full Landing Page Image: Whole image visible without cutting, 3px linear-gradient border #d8d8d8, soft shadow */}
              <div
                className="relative w-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] group-hover:shadow-[0_16px_44px_rgba(0,0,0,0.1)] transition-all duration-300"
                style={{
                  borderRadius: "0px",
                  backgroundColor: isDark ? "#070b14" : "#ffffff",
                  border: "3px solid #d8d8d8",
                  borderImage: "linear-gradient(to right, #d8d8d8 0%, #d8d8d8 100%) 1",
                }}
              >
                <img
                  src={project.landingImage}
                  alt={project.name}
                  width={1600}
                  height={800}
                  decoding="async"
                  loading={idx < 1 ? "eager" : "lazy"}
                  className="w-full h-auto block select-none transition-transform duration-500 ease-out group-hover:scale-[1.012]"
                  style={{
                    borderRadius: "0px",
                  }}
                />
              </div>

              {/* Bottom-Right: Sleek Translucent Frosted Glass Card OUTSIDE the image at bottom-right */}
              <div className="self-end mt-2.5 sm:mt-3 transform-gpu transition-transform duration-500 ease-out group-hover:translate-y-1.5">
                <div
                  className={`p-2 sm:p-2.5 md:p-3 border transition-all duration-300 shadow-sm group-hover:shadow-md ${
                    isDark
                      ? "bg-neutral-950/90 border-white/20 text-white shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
                      : "bg-white/95 border-neutral-300/90 text-neutral-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                  }`}
                  style={{ borderRadius: "0px", minWidth: "min(190px, 70vw)" }}
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
                  <div className="flex items-center justify-between py-1">
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

                  {/* Row 4: View Project Detail Link */}
                  <div
                    className={`flex items-center justify-between pt-1.5 mt-0.5 border-t ${
                      isDark ? "border-white/12" : "border-neutral-200/80"
                    }`}
                  >
                    <span
                      className={`text-[9.5px] sm:text-[10.5px] font-[500] ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      Project Detail
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[9.5px] sm:text-[10.5px] font-[600] group-hover:underline ${
                        isDark ? "text-white" : "text-neutral-950"
                      }`}
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. PopButton to view more projects (Redirects instantly to top of Projects page) */}
      {showCta && (
        <div className="w-full mt-10 sm:mt-12 md:mt-14 flex items-center justify-center">
          <PopButton
            color="black"
            size="lg"
            onClick={() => {
              scrollToTop();
              navigate("/projects");
            }}
            className="rounded-full px-8 sm:px-10 py-3.5 sm:py-4 font-['Switzer'] text-[15px] sm:text-[16px] font-[550] text-[#ffffff] gap-3 shadow-md hover:shadow-lg transition-transform cursor-pointer"
          >
            <span>View more projects</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </PopButton>
        </div>
      )}
    </section>
  );
};

export default OurProjectsSection;
