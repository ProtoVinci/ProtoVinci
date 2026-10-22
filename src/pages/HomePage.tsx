import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { FaqSection } from "@/components/FaqSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/ui/section-label";
import { ALL_SERVICES, SERVICE_PILLARS } from "@/data/services";
import { ALL_PROJECTS } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const CONTAINER = "w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10";
const FEATURED_COUNT = 4;

/** Headline left, supporting copy + link right; stacks on mobile. */
const SectionHeader: React.FC<{
  label: string;
  id: string;
  title: React.ReactNode;
  description: string;
  link: { to: string; label: string };
}> = ({ label, id, title, description, link }) => (
  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10" data-reveal>
    <div>
      <SectionLabel>{label}</SectionLabel>
      <h2
        id={id}
        className="m-0 mt-4 max-w-[640px] text-[32px] sm:text-[40px] md:text-[48px] font-[600] leading-[1.06] tracking-[-0.035em] text-black"
      >
        {title}
      </h2>
    </div>
    <div className="flex flex-col items-start gap-4 md:max-w-[380px]">
      <p className="m-0 text-[15.5px] font-[450] leading-[1.6] text-[#4b5563]">{description}</p>
      <Link
        to={link.to}
        className="group inline-flex items-center gap-2 text-[15px] font-[600] text-black no-underline rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <span className="border-b border-black/30 pb-0.5 transition-colors group-hover:border-black">{link.label}</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  </div>
);

const ServicesOverview: React.FC = () => (
  <section aria-labelledby="home-services-title" className="border-t border-[#cecece] bg-[#f6f6f6]">
    <div className={`${CONTAINER} py-20 sm:py-24 md:py-28`}>
      <SectionHeader
        label="Services"
        id="home-services-title"
        title={
          <>
            Technology, automation and design, <span className="text-[#6b7280]">under one roof</span>
          </>
        }
        description={`${ALL_SERVICES.length} services across three disciplines, helping businesses build, improve and grow, from concept to execution.`}
        link={{ to: "/services", label: "Explore all services" }}
      />

      <ul className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 m-0 p-0 list-none">
        {SERVICE_PILLARS.map((pillar) => (
          <li key={pillar.id} data-reveal>
            <Link
              to={`/services#pillar-${pillar.id}`}
              className="group flex flex-col h-full rounded-[18px] border border-[#e1e1e1] bg-white p-2.5 sm:p-3 no-underline text-black transition-[border-color,box-shadow] duration-300 hover:border-[#cecece] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <div className="w-full aspect-[16/10] overflow-hidden rounded-[12px] bg-[#e4e4e7]">
                <img
                  src={pillar.image}
                  alt=""
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  style={{ objectPosition: pillar.objectPosition }}
                />
              </div>
              <div className="flex flex-1 flex-col px-1.5 pt-4 pb-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-[600] text-[#6b7280]">
                    <span className="tabular-nums">{pillar.number}</span> · {pillar.label}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 shrink-0 text-[#6b7280] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="m-0 mt-3 text-[19px] sm:text-[21px] font-[600] leading-[1.2] tracking-[-0.02em]">
                  {pillar.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2 m-0 p-0 list-none">
                  {pillar.services.map((service) => (
                    <li key={service.id} className="flex items-start gap-2.5 text-[14px] font-[500] leading-snug text-[#4b5563]">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#09090b]" aria-hidden="true" />
                      {service.title}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const SelectedWork: React.FC = () => (
  <section id="projects" aria-labelledby="home-work-title" className="border-t border-[#cecece] bg-white">
    <div className={`${CONTAINER} py-20 sm:py-24 md:py-28`}>
      <SectionHeader
        label="Selected work"
        id="home-work-title"
        title={
          <>
            Recent projects, <span className="text-[#6b7280]">built to perform</span>
          </>
        }
        description="Websites and platforms we've designed and shipped for growing businesses."
        link={{ to: "/projects", label: "View all projects" }}
      />

      <ul className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 sm:gap-y-12 m-0 p-0 list-none">
        {ALL_PROJECTS.slice(0, FEATURED_COUNT).map((project) => (
          <li key={project.id} data-reveal>
            <Link
              to={`/projects/${project.id}`}
              className="group block no-underline text-black rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <div className="overflow-hidden rounded-[18px] border border-[#e1e1e1] bg-[#e4e4e7] shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-[box-shadow] duration-500 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
                <img
                  src={project.landingImage}
                  alt={`${project.name} website`}
                  width={1600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="m-0 text-[18px] sm:text-[20px] font-[600] tracking-[-0.02em]">{project.name}</h3>
                  <p className="m-0 mt-1 text-[14px] font-[500] text-[#6b7280] line-clamp-1">
                    {project.tag} · {project.timeline}
                  </p>
                </div>
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e1e1e1] transition-colors duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const HomePage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Section content rises in as it enters the viewport
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = contentRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items?.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform",
          }),
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      <HeroSection />

      <div ref={contentRef}>
        <ServicesOverview />
        <SelectedWork />
      </div>

      <div className="border-t border-[#cecece] bg-[#eeeef0]">
        <HowItWorksSection />
      </div>

      <FaqSection />
      <TestimonialsSection />
      <GetStartedSection />
      <Footer />
    </div>
  );
};

export default HomePage;
