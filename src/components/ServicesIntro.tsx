import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ServicesIntro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          end: "top 35%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Badge blurry slide-in
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          {
            opacity: 0,
            y: 28,
            filter: "blur(12px)",
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
          }
        );
      }

      // 2. Headline words blurry slide-in with progressive stagger
      const words = headlineRef.current?.querySelectorAll(".intro-word");
      if (words && words.length > 0) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 38,
            filter: "blur(16px)",
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.85,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.45"
        );
      }

      // 3. Subtitle description blurry slide-in
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.55"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headlineLines = [
    ["Endless", "creative", "solutions"],
    ["engineered", "for", "scale."],
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 md:py-44 px-6 sm:px-12 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: "linear-gradient(to right, #f8f9fb 0%, #f8f9fb 100%)",
      }}
      aria-label="Services Introduction"
    >
      {/* 1. Glassmorphic Depth Badge */}
      <div
        ref={badgeRef}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] mb-6 select-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
        <span className="font-text-14-upper text-[11px] sm:text-[12px] tracking-[0.24em] text-neutral-700 font-semibold [text-shadow:_0_1px_0_rgba(255,255,255,0.8)]">
          Core Disciplines
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
      </div>

      {/* 2. Headline with Visual Depth and Blurry Slide-In Animation */}
      <h2
        ref={headlineRef}
        className="font-h2 text-3xl sm:text-4xl md:text-[54px] text-[#0a0a0b] font-[550] tracking-[-0.035em] max-w-3xl leading-[1.12] [text-shadow:_0_2px_4px_rgba(0,0,0,0.08),_0_10px_30px_rgba(0,0,0,0.04)] m-0"
      >
        {headlineLines.map((line, lineIdx) => (
          <span key={lineIdx} className="block">
            {line.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="intro-word inline-block mr-[0.28em] will-change-transform"
              >
                {word}
              </span>
            ))}
          </span>
        ))}
      </h2>

      {/* 3. Subtitle with Visual Contrast Depth */}
      <p
        ref={descRef}
        className="font-text-18 text-[#5f5f65] font-medium max-w-xl mt-6 leading-relaxed text-sm sm:text-base md:text-lg [text-shadow:_0_1px_1px_rgba(255,255,255,0.8)]"
      >
        Explore our four specialized practices bridging strategic brand
        direction, digital product engineering, and performance growth.
      </p>
    </section>
  );
};
