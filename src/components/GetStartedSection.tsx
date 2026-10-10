import React from "react";
import { useNavigate } from "react-router-dom";
import { PopButton } from "@/components/ui/pop-button";
import { RippleGrid } from "@/components/ui/ripple-grid";

export const GetStartedSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="get-started"
      aria-label="Get Started"
      className="relative w-full pt-2 sm:pt-4 md:pt-6 pb-16 sm:pb-20 md:pb-24 px-6 sm:px-10 md:px-12 lg:px-16 bg-[#f6f6f6] select-none font-['Switzer']"
    >
      {/* Symmetrical container with matching left/right padding, boundary alignment and sharp 0px corners */}
      <div
        className="w-full max-w-[1240px] mx-auto relative rounded-none overflow-hidden border border-black/15 shadow-[0_20px_50px_rgba(2,11,29,0.18)]"
        style={{
          background: "linear-gradient(135deg, #020612 0%, #020b1d 50%, #010612 100%)",
        }}
      >
        {/* 1. Ambient Cosmic Blue Beam & Gradients matching Reference */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 80% 25%, rgba(1, 120, 192, 0.25) 0%, transparent 65%), radial-gradient(ellipse 65% 55% at 15% 75%, rgba(2, 48, 101, 0.45) 0%, transparent 70%), linear-gradient(60deg, transparent 25%, rgba(2, 48, 101, 0.22) 42%, rgba(1, 120, 192, 0.18) 55%, transparent 72%)",
          }}
          aria-hidden="true"
        />

        {/* 2. Interactive Ripple Grid Canvas Background (Base #023065, Ripple #0178c0) */}
        <RippleGrid
          baseColor="#023065"
          hoverColor="#0178c0"
          spacing={28}
          baseRadius={1.35}
          interactionRadius={140}
        />

        {/* 3. Subtle Vignette / Edge Softening */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(1,6,18,0.75)_100%)]"
          aria-hidden="true"
        />

        {/* 4. Section Content - Symmetrical Standard Layout Container */}
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 py-20 sm:py-24 md:py-28 flex flex-col items-center text-center">
          {/* Top Indicator: ▪ GET STARTED */}
          <div className="flex items-center gap-2 mb-3.5 sm:mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-white inline-block shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span
              className="text-[11.5px] sm:text-[12px] uppercase font-[650] tracking-[0.22em] text-[#ffffff]"
              style={{ fontFamily: "'Switzer', sans-serif" }}
            >
              GET STARTED
            </span>
          </div>

          {/* Big Editorial Headline */}
          <h2
            className="text-center text-[36px] sm:text-[48px] md:text-[58px] lg:text-[66px] font-[600] leading-[1.08] tracking-[-0.038em] text-white max-w-4xl mx-auto select-none m-0"
            style={{ fontFamily: "'Switzer', sans-serif" }}
          >
            <span className="text-white">Got a vision? </span>
            <span className="text-neutral-400 font-[400]">Let's </span>
            <span className="text-white">ship it.</span>
          </h2>

          {/* Subtitle / Description */}
          <p className="mt-4 sm:mt-5 font-['Switzer'] text-[15px] sm:text-[16.5px] text-neutral-300 font-[450] max-w-[620px] mx-auto leading-relaxed">
            Websites, UI/UX, landing pages, automation, social media and digital marketing. Everything you need to build, launch and grow your online presence, under one roof.
          </p>

          {/* CTA Button: Pure White PopButton with Solid Dark Text & Lightning Bolt */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center">
            <PopButton
              color="white"
              size="lg"
              onClick={() => navigate("/contact")}
              className="rounded-full px-7 sm:px-9 py-3.5 sm:py-4 font-['Switzer'] text-[15px] sm:text-[16px] font-[650] !bg-white hover:!bg-neutral-100 !text-black !border-neutral-300 !border-b-neutral-400 shadow-[0_8px_28px_rgba(0,0,0,0.35),0_0_24px_rgba(1,120,192,0.2)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45),0_0_32px_rgba(1,120,192,0.35)] transition-all cursor-pointer gap-2"
            >
              <span className="text-[#000000]">Book a Strategy Call</span>
              {/* Lightning Bolt Icon matching 3rd image */}
              <svg
                className="w-4 h-4 fill-[#000000] text-[#000000] inline-block -mr-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h8l-1 8 11-12h-8l1-8z" />
              </svg>
            </PopButton>

            {/* 3 Points Below Button with Checkmarks */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-7 md:gap-9 select-none">
              <div className="flex items-center gap-2 text-neutral-300 font-['Switzer'] text-[13px] sm:text-[14px] font-[500]">
                <span className="text-neutral-400 font-bold">✓</span>
                <span>Clear Pricing</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-300 font-['Switzer'] text-[13px] sm:text-[14px] font-[500]">
                <span className="text-neutral-400 font-bold">✓</span>
                <span>Fast Turnarounds</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-300 font-['Switzer'] text-[13px] sm:text-[14px] font-[500]">
                <span className="text-neutral-400 font-bold">✓</span>
                <span>Direct Communication</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
