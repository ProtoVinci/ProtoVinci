import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PopButton } from "@/components/ui/pop-button";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { FaqSection } from "@/components/FaqSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";
import { ALL_PROJECTS } from "@/data/projects";

// Figures for the stats strip, derived from the project data so they stay accurate
const avgWeeks = Math.round(
  ALL_PROJECTS.reduce((sum, p) => sum + parseInt(p.timeline, 10), 0) / ALL_PROJECTS.length
);
const STATS = [
  { value: String(ALL_PROJECTS.length).padStart(2, "0"), label: "Projects shipped" },
  { value: `${avgWeeks} wks`, label: "Average delivery" },
  { value: `${ALL_PROJECTS.length}/${ALL_PROJECTS.length}`, label: "Live in production" },
];

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-word",
        { opacity: 0, y: 28, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.06 },
        0.1
      )
        .fromTo(".hero-aside", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45)
        .fromTo(".hero-stat", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.6);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline: { word: string; muted?: boolean }[][] = [
    [{ word: "Websites" }, { word: "and" }, { word: "platforms" }],
    [{ word: "built" }, { word: "for" }, { word: "real", muted: true }, { word: "growth.", muted: true }],
  ];

  return (
    <div
      ref={containerRef}
      id="projects-page"
      className="relative min-h-screen w-full bg-[#f6f6f6] text-neutral-900 overflow-x-clip selection:bg-neutral-900 selection:text-white font-['Switzer']"
    >
      <Navbar />

      <main>
        {/* Hero: editorial, left-aligned headline with the intro and CTAs on the right */}
        <header className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-page">
          <div className="pt-4 sm:pt-8 lg:pt-12">
            <div>
              <SectionLabel>Selected work , 2024 - Now</SectionLabel>
              <h1 className="m-0 mt-5 sm:mt-6 text-[clamp(40px,10.5vw,52px)] sm:text-[64px] md:text-[76px] lg:text-[84px] font-[600] leading-[0.98] tracking-[-0.045em] text-black">
                {headline.map((line, i) => (
                  <span key={i} className="block">
                    {line.map(({ word, muted }, j) => (
                      <React.Fragment key={word}>
                        <span className={`hero-word inline-block ${muted ? "text-neutral-400" : ""}`}>{word}</span>
                        {j < line.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </span>
                ))}
              </h1>
            </div>

            <div className="hero-aside mt-7 sm:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <p className="m-0 text-[16px] sm:text-[17px] leading-[1.55] font-[450] text-neutral-600 max-w-[460px]">
                A selection of digital products we've designed and shipped - from industrial catalogues and
                craft showrooms to virtual labs and automation tools.
              </p>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <PopButton
                  color="black"
                  size="lg"
                  onClick={() => navigate("/contact")}
                  className="rounded-full px-6 py-3 text-[15px] font-[500] text-white gap-3 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Start a project</span>
                  <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </span>
                </PopButton>
                <PopButton
                  color="default"
                  size="lg"
                  onClick={() => navigate("/services")}
                  className="rounded-full px-6 py-3 text-[15px] font-[550] bg-white hover:bg-neutral-50 border-neutral-300 border-b-neutral-400 text-neutral-900 shadow-sm cursor-pointer"
                >
                  <span>Our services</span>
                </PopButton>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <dl className="m-0 mt-12 sm:mt-16 grid grid-cols-3 border-t border-neutral-300">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`hero-stat pt-5 sm:pt-6 ${i > 0 ? "pl-4 sm:pl-8 border-l border-neutral-300" : ""} ${
                  i < STATS.length - 1 ? "pr-4" : ""
                }`}
              >
                <dt className="text-[12px] sm:text-[13px] font-[500] text-neutral-500">{stat.label}</dt>
                <dd className="m-0 mt-1.5 text-[26px] sm:text-[36px] font-[600] leading-none tracking-[-0.035em] text-black tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Project grid */}
        <section
          aria-labelledby="all-projects-heading"
          className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-16 sm:pt-24 pb-24 sm:pb-32"
        >
          <div className="flex items-baseline justify-between gap-4 mb-8 sm:mb-10">
            <h2 id="all-projects-heading" className="m-0 text-[20px] sm:text-[22px] font-[600] tracking-[-0.02em] text-black">
              All projects
            </h2>
            <span className="text-[13px] sm:text-[14px] font-[500] text-neutral-500 tabular-nums">
              {String(ALL_PROJECTS.length).padStart(2, "0")} case studies
            </span>
          </div>

          <ProjectsGrid projects={ALL_PROJECTS} />
        </section>
      </main>

      <FaqSection />
      <GetStartedSection />
      <Footer />
    </div>
  );
};

export default ProjectsPage;
