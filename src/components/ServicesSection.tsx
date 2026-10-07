import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, X, Sparkles, CheckCircle2 } from "lucide-react";

import visualIdentityImg from "@/assets/visual-identity.webp";
import webDesignImg from "@/assets/web-design.webp";
import marketingImg from "@/assets/marketing.webp";
import socialMediaImg from "@/assets/social-media.webp";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItemData {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  objectPosition: string;
  alt: string;
  summary: string;
  deliverables: string[];
  capabilities: string[];
}

const SERVICES_DATA: ServiceItemData[] = [
  {
    id: "visual-identity",
    number: "01",
    title: "Logo Design & Visual Identity",
    category: "Brand Systems & Strategy",
    image: visualIdentityImg,
    objectPosition: "center 30%",
    alt: "Logo Design and Visual Identity by ProtoVinci",
    summary:
      "We design distinct logos and comprehensive visual brand systems engineered around the core character and market positioning of your business. From initial strategic direction to high-craft identity guidelines.",
    deliverables: [
      "Core Logo Suite & Lockups (Primary, Secondary, Badges)",
      "Bespoke Typography & Hierarchy Guidelines",
      "Curated Chromatic Color Palette & System Tokens",
      "Brand Guidelines Book (Digital & Print Specs)",
      "Stationery & Social Media Brand Assets Kit",
    ],
    capabilities: [
      "Brand Discovery & Positioning",
      "Art Direction & Mood Exploration",
      "Logo Iconography & Symbol Craft",
      "Design Systems & Component Kits",
    ],
  },
  {
    id: "web-design",
    number: "02",
    title: "Web Design & Development",
    category: "Digital Products & Engineering",
    image: webDesignImg,
    objectPosition: "center 42%",
    alt: "Web Design and Development by ProtoVinci",
    summary:
      "We craft custom, world-class web experiences that merge editorial aesthetics with high-performance engineering. Built from pixel-perfect Figma prototypes into responsive, accessible, and fast digital realities.",
    deliverables: [
      "Custom High-Fidelity UI/UX Figma Prototypes",
      "Modern React / Next.js / TypeScript Architecture",
      "Fluid 60FPS Micro-interactions & Parallax Effects",
      "Search Engine Optimized Semantic HTML5 Structure",
      "Headless CMS Integration & Custom Workflows",
    ],
    capabilities: [
      "User Experience (UX) Architecture",
      "User Interface (UI) Craftsmanship",
      "Full-Stack Web Development",
      "Performance & Core Web Vitals Optimization",
    ],
  },
  {
    id: "marketing",
    number: "03",
    title: "Digital Marketing",
    category: "Performance & Growth",
    image: marketingImg,
    objectPosition: "center 22%",
    alt: "Digital Marketing by ProtoVinci",
    summary:
      "We build data-informed digital marketing engines designed with sharp strategic direction and a relentless focus on measurable ROI. Every touchpoint connects within an integrated framework for compounding growth.",
    deliverables: [
      "Multi-Channel Campaign Strategy & Media Planning",
      "Targeted Google & Meta Advertising Funnels",
      "Comprehensive Conversion Rate Optimization (CRO)",
      "Server-side Tracking & Attribution Modeling",
      "Real-time Executive Analytics Dashboard",
    ],
    capabilities: [
      "Search Engine Optimization (SEO)",
      "Paid Search & Performance Social Ads",
      "Funnel Architecture & Retargeting",
      "Audience Segmentation & Behavioral Analytics",
    ],
  },
  {
    id: "social-media",
    number: "04",
    title: "Social Media Content",
    category: "Narrative & Studio Media",
    image: socialMediaImg,
    objectPosition: "center 46%",
    alt: "Social Media Content by ProtoVinci",
    summary:
      "We direct and produce high-impact social media assets that break through the feed. Unifying bold narrative storytelling, aesthetic art direction, and viral-ready video editing into cohesive digital culture.",
    deliverables: [
      "Monthly Editorial Content Calendar & Strategy",
      "High-Production Reels & Short-Form Video Assets",
      "Custom Carousels, Motion Graphics & Static Frames",
      "Community Voice & Copywriting Framework",
      "Monthly Engagement & Reach Performance Audits",
    ],
    capabilities: [
      "Motion Design & Micro-animations",
      "Short-form Video Production",
      "Creative Concepting & Viral Hooks",
      "Brand Storytelling & Visual Tone",
    ],
  },
];

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const serviceItemRefs = useRef<(HTMLElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<ServiceItemData | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // 1. GSAP ScrollTrigger Setup: Slow, heavy, buttery parallax scrub
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop and larger viewports: Weighted 1.6s inertial scrub with 9vh bleed
      mm.add("(min-width: 769px)", () => {
        serviceItemRefs.current.forEach((itemEl, idx) => {
          const imgEl = imageRefs.current[idx];
          if (!itemEl || !imgEl) return;

          gsap.set(imgEl, {
            willChange: "transform",
            force3D: true,
          });

          gsap.fromTo(
            imgEl,
            { y: "-9vh" },
            {
              y: "9vh",
              ease: "none",
              scrollTrigger: {
                trigger: itemEl,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.6, // Slow, heavy, buttery scrub
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      // Mobile devices: Gentler 5vh bleed with 1.0s scrub
      mm.add("(max-width: 768px)", () => {
        serviceItemRefs.current.forEach((itemEl, idx) => {
          const imgEl = imageRefs.current[idx];
          if (!itemEl || !imgEl) return;

          gsap.set(imgEl, {
            willChange: "transform",
            force3D: true,
          });

          gsap.fromTo(
            imgEl,
            { y: "-5vh" },
            {
              y: "5vh",
              ease: "none",
              scrollTrigger: {
                trigger: itemEl,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.0,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });
    }, containerRef);

    // Refresh ScrollTrigger after elements paint
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // 2. Interactive Magnetic Floating Cursor Card on Hover
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Keyboard accessibility: ESC key dismisses modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedService) {
        setSelectedService(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedService]);

  return (
    <section
      ref={containerRef}
      id="services"
      aria-label="Our Agency Services"
      className="services-section relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(to right, #f8f9fb 0%, #f8f9fb 100%)",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Interactive Floating Hover Pill (Desktop only) */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-2xl ${
          isHovering && !selectedService ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{
          transformOrigin: "center center",
        }}
      >
        <span className="font-text-14-upper text-xs tracking-wider text-white">
          Explore Service
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
      </div>

      {/* 4 Full-Width Parallax Service Images */}
      {SERVICES_DATA.map((service, idx) => (
        <article
          key={service.id}
          ref={(el) => {
            serviceItemRefs.current[idx] = el;
          }}
          className="service-item relative w-full h-[calc(100vh+140px)] overflow-hidden block select-none cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-black"
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label={`View details for ${service.title}`}
          onClick={() => setSelectedService(service)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelectedService(service);
            }
          }}
          style={{
            clipPath: "inset(0 0 0 0)",
          }}
        >
          {/* 1. Full-Width Background Image with Controlled Bleed for Full Visibility */}
          <picture>
            <img
              ref={(el) => {
                imageRefs.current[idx] = el;
              }}
              src={service.image}
              alt={service.alt}
              className="service-bg-img absolute left-0 w-full object-cover pointer-events-none transition-opacity duration-500"
              style={{
                top: "calc(-9vh)",
                height: "calc(100% + 18vh)",
                objectPosition: service.objectPosition,
                willChange: "transform",
              }}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </picture>

          {/* 2. Soft Dark Vignette for Text Contrast */}
          <div
            className="absolute inset-0 pointer-events-none z-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.46) 100%)",
            }}
          />

          {/* 3. Static Bottom-Left Text (Clipped seamlessly by clip-path: inset(0 0 0 0)) */}
          <div
            className="service-content fixed z-2 pointer-events-none flex flex-col"
            style={{
              bottom: "clamp(48px, 8vh, 88px)",
              left: "clamp(24px, 5.5vw, 84px)",
              maxWidth: "min(88vw, 960px)",
            }}
          >
            {/* Main Service Title */}
            <h3
              className="font-text-28 text-white font-medium m-0 tracking-tight leading-[1.14]"
              style={{
                fontSize: "clamp(28px, 3.8vw, 48px)",
                textShadow: "0 2px 20px rgba(0, 0, 0, 0.55)",
              }}
            >
              {service.title}
            </h3>
          </div>
        </article>
      ))}

      {/* Interactive Service Detail Modal / Drawer */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-service-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 p-6 sm:p-10 flex flex-col gap-8 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-6">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-text-14-upper text-xs px-2.5 py-0.5 rounded bg-neutral-900 text-white font-semibold">
                    Service {selectedService.number}
                  </span>
                  <span className="font-text-14 text-neutral-500 font-medium">
                    {selectedService.category}
                  </span>
                </div>
                <h2
                  id="modal-service-title"
                  className="font-h3 text-neutral-950 text-2xl sm:text-3xl md:text-4xl font-semibold m-0"
                >
                  {selectedService.title}
                </h2>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Close modal"
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body Preview & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Image Thumbnail */}
              <div className="md:col-span-5 rounded-xl overflow-hidden shadow-md border border-neutral-200 aspect-[4/3] bg-neutral-100">
                <img
                  src={selectedService.image}
                  alt={selectedService.alt}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: selectedService.objectPosition,
                  }}
                />
              </div>

              {/* Text Summary & Capabilities */}
              <div className="md:col-span-7 flex flex-col gap-5">
                <p className="font-text-18 text-neutral-700 leading-relaxed m-0">
                  {selectedService.summary}
                </p>

                <div className="flex flex-col gap-2.5 pt-2">
                  <span className="font-text-14-upper text-xs text-neutral-400 tracking-wider font-semibold">
                    Core Capabilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="font-text-14 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 font-medium border border-neutral-200"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="flex flex-col gap-4 bg-neutral-50 rounded-xl p-6 border border-neutral-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neutral-800" />
                <h4 className="font-text-16 font-semibold text-neutral-900 m-0">
                  What We Deliver
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {selectedService.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="font-text-15 text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer / Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-100">
              <span className="font-text-14 text-neutral-500">
                Ready to elevate your agency presence?
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-lg font-text-15 font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-text-15 font-semibold bg-neutral-950 hover:bg-neutral-800 text-white transition-all shadow-md hover:shadow-lg cursor-pointer w-full sm:w-auto"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
