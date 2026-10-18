import React, { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, User, Briefcase, Clock, Calendar, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FaqSection } from "@/components/FaqSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";
import { ALL_PROJECTS, type ProjectItem } from "@/data/projects";

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Find current project
  const projectIndex = ALL_PROJECTS.findIndex((p) => p.id === slug);
  const project: ProjectItem | undefined = ALL_PROJECTS[projectIndex];

  // Calculate next project in loop
  const nextProject =
    projectIndex !== -1
      ? ALL_PROJECTS[(projectIndex + 1) % ALL_PROJECTS.length]
      : ALL_PROJECTS[0];

  // Entrance animations strictly on heading and description
  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Headline words blur and rise animation
      const words = headlineRef.current?.querySelectorAll(".project-title-word");
      if (words && words.length > 0) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 28,
            filter: "blur(10px)",
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.75,
            stagger: 0.06,
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
            y: 20,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power2.out",
          },
          0.4
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [slug, project]);

  // If project not found, redirect to projects page
  if (!project) {
    return (
      <div className="min-h-screen bg-[#f6f6f6] flex flex-col items-center justify-center text-center p-6 font-['Switzer']">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-neutral-600 mb-6">The project you are looking for does not exist.</p>
        <button
          onClick={() => navigate("/projects")}
          className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  // Split title words for staggered reveal animation
  const titleWords = project.name.split(" ");

  return (
    <div
      ref={containerRef}
      id="project-detail-page"
      className="relative min-h-screen w-full bg-[#f6f6f6] text-neutral-900 overflow-x-clip selection:bg-neutral-900 selection:text-white font-['Switzer']"
    >
      {/* 1. Expandable Pop-out Navbar */}
      <Navbar />

      {/* 2. Header Area: Tag, Project Title & Full Description */}
      <header className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-page pb-8 sm:pb-12 flex flex-col items-center text-center">
        {/* Project Status Capsule Pill matching Reference Image */}
        <div className="inline-flex items-center gap-2.5 p-1 pr-4 rounded-full bg-white border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-5 select-none">
          <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[12px] sm:text-[13px] font-[700] shrink-0">
            {project.step}
          </div>
          <span className="text-[13px] sm:text-[14px] font-[550] text-[#1f2937] tracking-tight">
            {project.tag}
          </span>
        </div>

        {/* Big Editorial Headline */}
        <h1
          ref={headlineRef}
          className="text-center text-[clamp(32px,10vw,40px)] sm:text-[54px] md:text-[68px] lg:text-[76px] font-[600] leading-[1.05] tracking-[-0.038em] text-[#000000] max-w-4xl mx-auto select-none m-0"
          style={{ fontFamily: "'Switzer', sans-serif" }}
        >
          {titleWords.map((word, wIdx) => (
            <span
              key={wIdx}
              className="project-title-word inline-block mr-[0.24em] last:mr-0 text-[#000000]"
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Full Uncut Project Description */}
        <p
          ref={descRef}
          className="mt-4 sm:mt-5 font-['Switzer'] text-[15px] sm:text-[17px] md:text-[18px] text-[#4b5563] font-[450] max-w-[720px] mx-auto leading-relaxed"
        >
          {project.shortDescription}
        </p>
      </header>

      {/* 3. Hero Landing Page Image (Whole image visible, 3px linear-gradient border #d8d8d8, soft shadow) */}
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-14 sm:mb-18 md:mb-22">
        <div
          className="relative w-full rounded-[20px] shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-white overflow-hidden"
          style={{
            // Plain border: a border-image would stop the radius from rounding it
            border: "3px solid #d8d8d8",
          }}
        >
          <img
            src={project.landingImage}
            alt={`${project.name} Landing Page Hero`}
            width={1600}
            height={800}
            decoding="async"
            fetchPriority="high"
            className="w-full h-auto block select-none"
          />
        </div>
      </div>

      {/* 4. Two-Column Split: Overview / Process / Result on Left, Metadata Card on Right */}
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-16 sm:mb-20 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Project Overview, Project Process, Final Result */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {/* Section A: Project Overview */}
            <div className="mb-10 sm:mb-12">
              <h2
                className="text-[26px] sm:text-[32px] md:text-[36px] font-[600] tracking-[-0.03em] text-[#000000] mb-3.5 m-0 leading-[1.2]"
                style={{ fontFamily: "'Switzer', sans-serif", lineHeight: 1.2 }}
              >
                Project overview
              </h2>
              <p
                className="text-[15px] sm:text-[16.5px] text-[#4b5563] font-[450] m-0 leading-[1.5]"
                style={{ lineHeight: 1.5 }}
              >
                {project.overview}
              </p>
            </div>

            {/* Section B: Project Process */}
            <div className="mb-10 sm:mb-12">
              <h2
                className="text-[26px] sm:text-[32px] md:text-[36px] font-[600] tracking-[-0.03em] text-[#000000] mb-4 m-0 leading-[1.2]"
                style={{ fontFamily: "'Switzer', sans-serif", lineHeight: 1.2 }}
              >
                Project process
              </h2>
              <ul className="space-y-3.5 p-0 m-0 list-none">
                {project.process.map((step, sIdx) => (
                  <li
                    key={sIdx}
                    className="flex items-start gap-3.5 text-[15px] sm:text-[16.5px] text-[#4b5563] font-[450] leading-[1.5]"
                    style={{ lineHeight: 1.5 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                    <span style={{ lineHeight: 1.5 }}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section C: Final Result */}
            <div>
              <h2
                className="text-[26px] sm:text-[32px] md:text-[36px] font-[600] tracking-[-0.03em] text-[#000000] mb-3.5 m-0 leading-[1.2]"
                style={{ fontFamily: "'Switzer', sans-serif", lineHeight: 1.2 }}
              >
                Final result
              </h2>
              <p
                className="text-[15px] sm:text-[16.5px] text-[#4b5563] font-[450] m-0 leading-[1.5]"
                style={{ lineHeight: 1.5 }}
              >
                {project.result}
              </p>
            </div>
          </div>

          {/* Right Column: Metadata Card matching Reference Image */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-[20px] bg-[#f0f0f2] border border-neutral-300/80 p-6 sm:p-7 shadow-sm flex flex-col">
              {/* Row 1: Client Name (Highlighted & Bold with Subtitle) */}
              <div className="py-4 border-b border-neutral-300/80 flex items-start justify-between gap-4 first:pt-1">
                <div className="flex flex-col">
                  <span className="text-[11.5px] uppercase font-[650] text-neutral-500 tracking-[0.08em] mb-1">
                    Client Name
                  </span>
                  <span className="text-[16px] sm:text-[17px] font-[750] text-[#000000] leading-snug">
                    {project.clientName}
                  </span>
                  {project.clientRole && (
                    <span className="text-[13px] text-neutral-600 font-[500] mt-1 leading-snug">
                      {project.clientRole}
                    </span>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 border border-neutral-300/70 flex items-center justify-center shrink-0 text-neutral-700 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <User className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              {/* Row 2: Service Offered */}
              <div className="py-4 border-b border-neutral-300/80 flex items-start justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[11.5px] uppercase font-[650] text-neutral-500 tracking-[0.08em] mb-1">
                    Service Offered
                  </span>
                  <span className="text-[15px] sm:text-[16px] font-[600] text-[#000000]">
                    {project.service}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 border border-neutral-300/70 flex items-center justify-center shrink-0 text-neutral-700 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <Briefcase className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              {/* Row 3: Timeline */}
              <div className="py-4 border-b border-neutral-300/80 flex items-start justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[11.5px] uppercase font-[650] text-neutral-500 tracking-[0.08em] mb-1">
                    Timeline
                  </span>
                  <span className="text-[15px] sm:text-[16px] font-[600] text-[#000000]">
                    {project.timeline}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 border border-neutral-300/70 flex items-center justify-center shrink-0 text-neutral-700 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <Clock className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              {/* Row 4: Project Kickoff */}
              <div className="py-4 border-b border-neutral-300/80 flex items-start justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[11.5px] uppercase font-[650] text-neutral-500 tracking-[0.08em] mb-1">
                    Project Kickoff
                  </span>
                  <span className="text-[15px] sm:text-[16px] font-[600] text-[#000000]">
                    {project.kickoff}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 border border-neutral-300/70 flex items-center justify-center shrink-0 text-neutral-700 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <Calendar className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              {/* Row 5: Visit Site (Globe Icon + Tap Redirect with Hover Effect) */}
              <div className="pt-4 flex items-start justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[11.5px] uppercase font-[650] text-neutral-500 tracking-[0.08em] mb-1">
                    Visit Site
                  </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-[15px] sm:text-[16px] font-[650] text-[#000000] hover:text-neutral-700 transition-colors no-underline cursor-pointer"
                  >
                    <span>{project.siteLabel || project.name}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 border border-neutral-300/70 flex items-center justify-center shrink-0 text-neutral-700 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <Globe className="w-4 h-4 stroke-[2]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Project Images Showcase (Full image visible, 3px linear-gradient border #d8d8d8, soft shadow) */}
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mb-16 sm:mb-20">
        {project.isMobileGallery ? (
          /* WMC Mobile Showcase: Fixed blank white space with items-start, each card tightly hugging its image, gap-3 */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-start">
            {project.galleryImages.map((imgSrc, gIdx) => (
              <div
                key={gIdx}
                className="w-full h-fit self-start overflow-hidden rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)] hover:scale-[1.015]"
                style={{
                  border: "3px solid #d8d8d8",
                }}
              >
                <img
                  src={imgSrc}
                  alt={`${project.name} mobile screen ${gIdx + 1}`}
                  width={755}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block select-none"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Standard Projects: 2x2 Grid with full image visible, gap-3, 3px linear-gradient border #d8d8d8 and soft shadow */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.galleryImages.map((imgSrc, gIdx) => (
              <div
                key={gIdx}
                className="w-full rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.07)] bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.11)]"
                style={{
                  border: "3px solid #d8d8d8",
                }}
              >
                <img
                  src={imgSrc}
                  alt={`${project.name} showcase image ${gIdx + 1}`}
                  width={1600}
                  height={760}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block select-none transition-transform duration-500 ease-out hover:scale-[1.015]"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Next Project Navigation Link matching Reference Image */}
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-4 pb-14 sm:pb-20 flex justify-start">
        <Link
          to={`/projects/${nextProject.id}`}
          className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-[600] text-[#000000] hover:text-neutral-600 transition-colors no-underline group select-none"
        >
          <span>Next project</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 7. Frequently Asked Questions (FAQ) Section */}
      <FaqSection />

      {/* 8. Get Started Section with Liquid Cursor Gradient */}
      <GetStartedSection />

      {/* 9. Footer Section with Looping Muted Video & Brand Links */}
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
