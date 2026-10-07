import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { CloudShader } from "@/components/ui/cloud-shader";
import { PopButton } from "@/components/ui/pop-button";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Entrance Timeline on Mount / Page Reload
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Headline word-by-word blur & rise effect
      const words = headlineRef.current?.querySelectorAll(".hero-word");
      if (words && words.length > 0) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 35,
            filter: "blur(14px)",
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
          },
          0.2
        );
      }

      // 2. Description rise-up with subtle blur
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.95, ease: "power2.out" },
          0.7
        );
      }

      // 3. CTA Buttons pop up
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          { opacity: 0, y: 24, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "back.out(1.5)" },
          0.95
        );
      }

      // 4. Animated 5-card carousel rise
      if (carouselRef.current) {
        tl.fromTo(
          carouselRef.current,
          { opacity: 0, y: 45, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
          1.1
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Headline lines and words
  // Line 1: Get premium design
  // Line 2: with endless solutions.
  const headlineLines = [
    [
      { text: "Get", highlight: false },
      { text: "premium", highlight: false },
      { text: "design", highlight: true }, // Distinctive lighter/muted grey tone matching Image 1
    ],
    [
      { text: "with", highlight: false },
      { text: "endless", highlight: false },
      { text: "solutions.", highlight: false },
    ],
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-[#e1e1e1] font-['Switzer']"
    >
      {/* 1. Live WebGL Cloud Shader Background (Reference Image 2) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <CloudShader
          speed={0.9}
          count={6}
          cloudColor="#ffffff"
          skyTopColor="#3876ba"
          skyBottomColor="#8cbfe8"
          className="h-full w-full"
        />
        {/* Soft luminous white veil overlay to ensure pristine typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-white/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Floating Navbar (Reference Image 1) */}
      <Navbar />

      {/* 3. Hero Main Content Area (Badge removed per user request) */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 flex flex-col items-center text-center">
        {/* Large Headline: 
            Get premium design
            with endless solutions.
            Heading 1: 66px, #000000, 550 weight
        */}
        <h1
          ref={headlineRef}
          className="font-h1 text-[40px] sm:text-[54px] md:text-[66px] font-[550] leading-[1.1] tracking-[-0.035em] text-[#000000] max-w-4xl mx-auto [text-shadow:_0_2px_4px_rgba(0,0,0,0.08),_0_8px_24px_rgba(0,0,0,0.05),_0_1px_2px_rgba(0,0,0,0.12)] select-none"
        >
          {headlineLines.map((line, lIdx) => (
            <span key={lIdx} className="block">
              {line.map((item, index) => (
                <span
                  key={index}
                  className={`hero-word inline-block mr-[0.24em] last:mr-0 ${
                    item.highlight
                      ? "text-[#555555] font-[500] italic [text-shadow:_0_1px_3px_rgba(0,0,0,0.08)]"
                      : "text-[#000000]"
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle / Description:
            Our agency delivers unlimited, high-quality design services to help
            your brand stand out and grow stronger effortlessly.
            text 18px / 16px - #7D7D7D, weight 500
        */}
        <p
          ref={descRef}
          className="mt-5 sm:mt-6 font-['Switzer'] text-[16px] sm:text-[18px] text-[#4d4d4d] font-[500] max-w-2xl mx-auto leading-relaxed [text-shadow:_0_1px_2px_rgba(255,255,255,0.7),_0_1px_3px_rgba(0,0,0,0.06)]"
        >
          <span className="block sm:inline">Our agency delivers unlimited, high-quality design services to help</span>{" "}
          <span className="block sm:inline">your brand stand out and grow stronger effortlessly.</span>
        </p>

        {/* Action PopButtons (Reference Image 3) */}
        <div
          ref={buttonsRef}
          className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
        >
          {/* Primary PopButton: "Explore projects" */}
          <PopButton
            color="black"
            size="lg"
            className="rounded-full px-6 sm:px-7 py-3 font-['Switzer'] text-[15px] sm:text-[16px] font-[500] text-[#ffffff] gap-3 shadow-md hover:shadow-lg transition-transform"
          >
            <span>Explore projects</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </PopButton>

          {/* Secondary PopButton: "Contact Us" (Light Color) */}
          <PopButton
            color="default"
            size="lg"
            className="rounded-full px-7 sm:px-8 py-3 font-['Switzer'] text-[15px] sm:text-[16px] font-[550] bg-white hover:bg-neutral-50 border-neutral-300 border-b-neutral-400 text-neutral-900 shadow-sm transition-all"
          >
            <span>Contact Us</span>
          </PopButton>
        </div>

        {/* 4. Animated 5-Card Expanding Carousel (Reference Image 2) */}
        <div ref={carouselRef} className="w-full mt-8 sm:mt-10 md:mt-12">
          <HeroCarousel />
        </div>
      </main>

      {/* Seamless Transition Fade at bottom of Landing Section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-18 z-20 bg-gradient-to-t from-[#e1e1e1] via-[#e1e1e1]/50 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

export default HeroSection;
