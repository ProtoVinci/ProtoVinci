import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectItem } from "@/data/projects";

/** Hostname shown in the mock browser bar, e.g. "gullyculture.vercel.app" */
const displayHost = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const ProjectCard: React.FC<{ project: ProjectItem; eager: boolean }> = ({ project, eager }) => (
  <Link
    to={`/projects/${project.id}`}
    className="project-card group block rounded-[22px] no-underline text-inherit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
  >
    {/* Presentation panel: the landing page sits in a slim browser frame that bleeds off the bottom edge */}
    <div
      className="relative overflow-hidden rounded-[22px] px-[6%] pt-[6%] bg-[#e8e8e6] transition-colors duration-500 group-hover:bg-[#e1e1df]"
    >
      <span
        className="absolute left-4 top-4 sm:left-5 sm:top-5 text-[12px] font-[600] tracking-[0.08em] tabular-nums text-black/40"
        aria-hidden="true"
      >
        {project.step}
      </span>

      <div
        className="relative overflow-hidden rounded-t-[12px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5"
      >
        <div className="flex items-center gap-3 h-7 sm:h-8 px-3" aria-hidden="true">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-2 h-2 rounded-full bg-black/12" />
            ))}
          </div>
          <span
            className="flex-1 max-w-[220px] mx-auto truncate rounded-md px-2 py-[3px] text-center text-[10px] sm:text-[10.5px] font-[500] bg-black/[0.045] text-black/45"
          >
            {displayHost(project.liveUrl)}
          </span>
          <span className="w-[42px]" />
        </div>

        <div className="aspect-[2/1] overflow-hidden">
          <img
            src={project.landingImage}
            alt={`${project.name} website homepage`}
            width={1600}
            height={800}
            decoding="async"
            loading={eager ? "eager" : "lazy"}
            className="w-full h-full object-cover object-top select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          />
        </div>
      </div>
    </div>

    {/* Caption */}
    <div className="flex items-start justify-between gap-5 pt-5 sm:pt-6 px-1">
      <div className="min-w-0">
        <h3 className="m-0 text-[22px] sm:text-[24px] font-[600] leading-[1.15] tracking-[-0.025em] text-black">
          {project.name}
        </h3>
        <p className="m-0 mt-2 text-[15px] leading-[1.55] font-[450] text-neutral-500 line-clamp-2 max-w-[520px]">
          {project.shortDescription}
        </p>
        <ul className="m-0 mt-4 p-0 list-none flex flex-wrap items-center gap-2">
          {[project.tag, project.timeline].map((item) => (
            <li
              key={item}
              className="rounded-full border border-neutral-300/90 bg-white/60 px-3 py-[5px] text-[12.5px] font-[550] leading-none text-neutral-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <span
        className="shrink-0 mt-0.5 w-11 h-11 rounded-full border border-neutral-300 bg-white text-black flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:text-white"
        aria-hidden="true"
      >
        <ArrowUpRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </div>
  </Link>
);

export const ProjectsGrid: React.FC<{ projects: ProjectItem[] }> = ({ projects }) => {
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <ul
      ref={gridRef}
      className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-12 sm:gap-y-14 lg:gap-y-20"
    >
      {projects.map((project, idx) => (
        <li key={project.id}>
          <ProjectCard project={project} eager={idx < 2} />
        </li>
      ))}
    </ul>
  );
};

export default ProjectsGrid;
