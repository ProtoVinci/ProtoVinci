import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PopButton } from "@/components/ui/pop-button";
import { SectionLabel } from "@/components/ui/section-label";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FaqSection } from "@/components/FaqSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";
import { ALL_SERVICES, SERVICE_PILLARS, type ServicePillar } from "@/data/services";
import { ALL_PROJECTS } from "@/data/projects";
import { scrollToTarget } from "@/lib/scroll";
import { useGoToContactForm } from "@/lib/useContactNav";

gsap.registerPlugin(ScrollTrigger);

const CONTAINER = "w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10";

// Terms quoted from the FAQ, so this page never promises more than the rest of the site
const WORKING_TERMS = [
  {
    title: "2-6 weeks",
    body: "Most projects wrap up within 2-6 weeks. After our first call you get a clear timeline with milestones.",
  },
  {
    title: "Unlimited revisions",
    body: "Within the agreed scope, we keep refining until the result matches your vision.",
  },
  {
    title: "Direct access",
    body: "Talk to us on Slack, WhatsApp, Discord or Telegram, with regular check-ins along the way.",
  },
  {
    title: "Post-launch support",
    body: "Maintenance plans keep your site secure, optimised and up to date long after launch.",
  },
];

const serviceAnchor = (id: string) => `service-${id}`;
const pillarAnchor = (id: string) => `pillar-${id}`;

/** All ten services in one rounded panel; each cell glides to its service below. */
const ServiceIndex: React.FC = () => (
  <nav aria-label="Services" className={`${CONTAINER} pt-8 sm:pt-10`}>
    {/* The 1px gaps over the border colour draw the dividers */}
    <ul className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-[#cecece] border border-[#cecece] rounded-[20px] overflow-hidden m-0 p-0 list-none">
      {ALL_SERVICES.map((service) => (
        <li key={service.id} className="bg-[#f6f6f6]" data-reveal>
          <a
            href={`#${serviceAnchor(service.id)}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget(`#${serviceAnchor(service.id)}`, -110);
            }}
            className="group flex h-full min-h-[112px] sm:min-h-[150px] flex-col justify-between gap-3 sm:gap-5 p-3.5 sm:p-5 no-underline text-black transition-colors duration-300 hover:bg-white focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:-outline-offset-2"
          >
            <div className="flex items-start justify-between">
              <span className="text-[13px] font-[600] text-[#6b7280] tabular-nums">{service.number}</span>
              <ArrowDownRight
                className="w-4 h-4 text-[#6b7280] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-black"
                aria-hidden="true"
              />
            </div>
            <div>
              <h2 className="m-0 text-[15px] sm:text-[17px] font-[600] leading-[1.25] tracking-[-0.015em]">
                {service.title}
              </h2>
              <p className="m-0 mt-1.5 text-[13px] font-[500] text-[#6b7280] hidden sm:block">{service.pillar.title}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const RelatedWork: React.FC<{ ids: string[] }> = ({ ids }) => {
  const projects = ids
    .map((id) => ALL_PROJECTS.find((p) => p.id === id))
    .filter((p): p is (typeof ALL_PROJECTS)[number] => Boolean(p));
  if (!projects.length) return null;

  return (
    <div className="mt-10 sm:mt-12" data-reveal>
      <h3 className="m-0 mb-4 text-[12px] uppercase font-[650] tracking-[0.18em] text-[#6b7280]">Related work</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 m-0 p-0 list-none">
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`} className="group block no-underline text-black">
              <div className="aspect-[16/10] overflow-hidden rounded-[14px] bg-[#e4e4e7]">
                <img
                  src={project.landingImage}
                  alt={`${project.name} website`}
                  width={1600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-2.5 flex items-start justify-between gap-3">
                <div>
                  <p className="m-0 text-[15px] font-[600]">{project.name}</p>
                  <p className="m-0 text-[13px] font-[500] text-[#6b7280]">{project.tag}</p>
                </div>
                <ArrowUpRight
                  className="mt-0.5 w-4 h-4 shrink-0 text-[#6b7280] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


/** One pillar: summary on the left (sticky on desktop), its services on the right. */
const PillarChapter: React.FC<{ pillar: ServicePillar; first: boolean; onStart: () => void }> = ({
  pillar,
  first,
  onStart,
}) => (
  <section
    id={pillarAnchor(pillar.id)}
    aria-labelledby={`${pillarAnchor(pillar.id)}-title`}
    className="border-t border-[#cecece]"
  >
    <div className={`${CONTAINER} py-14 sm:py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16`}>
      {/* Left: stays in view while the services scroll past */}
      <div className="lg:col-span-5 lg:sticky lg:top-[112px] self-start" data-reveal>
        <div className="flex items-center gap-3 text-[13px] font-[600] text-[#6b7280]">
          <span className="tabular-nums text-black">{pillar.number}</span>
          <span className="h-px w-6 bg-[#cecece]" aria-hidden="true" />
          <span>{pillar.label}</span>
        </div>
        <h2
          id={`${pillarAnchor(pillar.id)}-title`}
          className="m-0 mt-3 sm:mt-3.5 text-[30px] sm:text-[36px] md:text-[40px] font-[600] leading-[1.08] tracking-[-0.035em] text-black"
        >
          {pillar.title}
        </h2>
        <p className="m-0 mt-3 text-[15px] sm:text-[16px] font-[450] leading-[1.55] text-[#4b5563] max-w-[460px]">
          {pillar.summary}
        </p>

        {/* Desktop: image under the summary (smaller screens show it above the services) */}
        <div className="mt-7 aspect-[16/10] overflow-hidden rounded-[20px] bg-[#e4e4e7] hidden lg:block">
          <img
            src={pillar.image}
            alt={pillar.alt}
            width={1600}
            height={1000}
            loading={first ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: pillar.objectPosition }}
          />
        </div>

        <PopButton
          color="black"
          onClick={onStart}
          className="mt-8 rounded-full h-11 px-5 text-[15px] font-[550] text-white gap-2.5 shadow-sm hover:shadow-md cursor-pointer"
        >
          <span>Start a project</span>
          <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </span>
        </PopButton>
      </div>

      {/* Right: the services in this pillar */}
      <div className="lg:col-span-7">
        <div className="mb-8 aspect-[16/10] overflow-hidden rounded-[20px] bg-[#e4e4e7] lg:hidden" data-reveal>
          <img
            src={pillar.image}
            alt=""
            width={1600}
            height={1000}
            loading={first ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: pillar.objectPosition }}
          />
        </div>

        <ul className="m-0 p-0 list-none flex flex-col gap-4">
          {ALL_SERVICES.filter((s) => s.pillar.id === pillar.id).map((service) => (
            <li
              key={service.id}
              id={serviceAnchor(service.id)}
              className="rounded-[20px] border border-[#e2e2e2] bg-white p-6 sm:p-7"
              data-reveal
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[13px] font-[600] text-[#6b7280] tabular-nums">{service.number}</span>
                <h3 className="m-0 text-[20px] sm:text-[22px] font-[600] leading-[1.25] tracking-[-0.02em] text-black">
                  {service.title}
                </h3>
              </div>
              <p className="m-0 mt-3 text-[15px] sm:text-[15.5px] font-[450] leading-[1.6] text-[#4b5563]">
                {service.summary}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 m-0 p-0 list-none" aria-label={`${service.title} includes`}>
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[#e2e2e2] bg-[#f6f6f6] px-3 py-1.5 text-[13px] font-[550] text-black"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {pillar.relatedProjectIds && <RelatedWork ids={pillar.relatedProjectIds} />}
      </div>
    </div>
  </section>
);

const WorkingTogether: React.FC = () => (
  <section aria-labelledby="working-together-title" className="border-t border-[#cecece] bg-white">
    <div className={`${CONTAINER} py-16 sm:py-20 md:py-24`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <SectionLabel>Working together</SectionLabel>
          <h2
            id="working-together-title"
            className="m-0 mt-4 text-[32px] sm:text-[40px] md:text-[44px] font-[600] leading-[1.06] tracking-[-0.035em] text-black"
          >
            Clear terms, <span className="text-[#6b7280]">from kickoff to launch</span>
          </h2>
        </div>
        <p className="m-0 max-w-[400px] text-[15.5px] font-[450] leading-[1.6] text-[#4b5563]">
          Every service runs on the same simple model, so you always know what happens next.
        </p>
      </div>

      <ul className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#cecece] border border-[#cecece] rounded-[20px] overflow-hidden m-0 p-0 list-none">
        {WORKING_TERMS.map((term) => (
          <li key={term.title} className="bg-white p-5 sm:p-6" data-reveal>
            <h3 className="m-0 text-[22px] sm:text-[24px] font-[600] tracking-[-0.025em] text-black">{term.title}</h3>
            <p className="m-0 mt-3 text-[14.5px] font-[450] leading-[1.6] text-[#4b5563]">{term.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);


export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const goToContactForm = useGoToContactForm();
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Header entrance, matching the Projects page
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const words = headlineRef.current?.querySelectorAll(".services-word");
      if (words?.length) {
        tl.fromTo(
          words,
          { opacity: 0, y: 30, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.07, clearProps: "filter,transform" },
          0.1,
        );
      }
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 22, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, clearProps: "filter,transform" },
        0.45,
      );
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, clearProps: "transform" },
        0.65,
      );

      // Content rises in as it enters the viewport
      gsap.set("[data-reveal]", { opacity: 0, y: 28 });
      ScrollTrigger.batch("[data-reveal]", {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <div
      ref={containerRef}
      id="services-page"
      className="relative min-h-screen w-full bg-[#f6f6f6] text-neutral-900 overflow-x-clip selection:bg-neutral-900 selection:text-white font-['Switzer']"
    >
      <Navbar />

      <main id="main-content">
        <header className={`relative z-10 ${CONTAINER} pt-page flex flex-col items-center text-center`}>
          <div className="mb-2.5 sm:mb-3">
            <SectionLabel>Services</SectionLabel>
          </div>

          <h1
            ref={headlineRef}
            className="m-0 text-center text-balance text-[clamp(32px,9.6vw,38px)] sm:text-[50px] md:text-[62px] lg:text-[70px] font-[600] leading-[1.05] tracking-[-0.038em] text-black max-w-4xl mx-auto"
          >
            <span className="sm:block">
              <span className="services-word inline-block">Everything</span>{" "}
              <span className="services-word inline-block">you</span>{" "}
              <span className="services-word inline-block">need</span>{" "}
              <span className="services-word inline-block">to</span>
            </span>{" "}
            <span className="sm:block">
              <span className="services-word inline-block">build,</span>{" "}
              <span className="services-word inline-block text-[#6b7280]">automate</span>{" "}
              <span className="services-word inline-block">and</span>{" "}
              <span className="services-word inline-block">grow</span>
            </span>
          </h1>

          <p
            ref={descRef}
            className="m-0 mt-3.5 sm:mt-4 text-[15px] sm:text-[16.5px] text-[#4b5563] font-[450] max-w-[600px] mx-auto leading-snug sm:leading-normal"
          >
            Websites, custom software, mobile apps, AI, automation, design and video. Ten services that take your
            project from concept to execution, under one roof.
          </p>

          <div ref={ctaRef} className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <PopButton
              color="black"
              size="lg"
              onClick={goToContactForm}
              className="rounded-full px-6 sm:px-7 py-3 text-[15px] sm:text-[16px] font-[500] text-white gap-3 shadow-md hover:shadow-lg transition-transform cursor-pointer"
            >
              <span>Start a project</span>
              <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </span>
            </PopButton>
            <PopButton
              color="default"
              size="lg"
              onClick={() => navigate("/projects")}
              className="rounded-full px-7 sm:px-8 py-3 text-[15px] sm:text-[16px] font-[550] bg-white hover:bg-neutral-50 border-neutral-300 border-b-neutral-400 text-neutral-900 shadow-sm transition-all cursor-pointer"
            >
              <span>View projects</span>
            </PopButton>
          </div>
        </header>

        <ServiceIndex />

        <div className="mt-16 sm:mt-20">
          {SERVICE_PILLARS.map((pillar, idx) => (
            <PillarChapter key={pillar.id} pillar={pillar} first={idx === 0} onStart={goToContactForm} />
          ))}
        </div>

        <WorkingTogether />

        {/* Process (shared with the homepage) */}
        <div className="border-t border-[#cecece] bg-[#eeeef0]">
          <HowItWorksSection />
        </div>

        <FaqSection />
        <GetStartedSection />
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
