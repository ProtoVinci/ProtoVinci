import React from "react";
import { useGoToContactForm } from "@/lib/useContactNav";
import { PopButton } from "@/components/ui/pop-button";
import { LiquidCursorGradient } from "@/components/ui/liquid-cursor-gradient";

export const GetStartedSection: React.FC = () => {
  const goToContactForm = useGoToContactForm();

  return (
    <section
      id="get-started"
      aria-label="Get Started"
      className="relative w-full pt-2 sm:pt-4 md:pt-6 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#f6f6f6] select-none font-['Switzer']"
    >
      {/* Symmetrical container with matching left/right padding, boundary alignment and sharp 0px corners */}
      <div className="w-full max-w-[1300px] mx-auto relative rounded-none overflow-hidden border border-black/15 shadow-[0_20px_50px_rgba(2,11,29,0.18)] bg-[#020612]">
        {/* RewampUI Liquid Cursor Gradient Background */}
        <LiquidCursorGradient
          orb1Color="#023065"
          orb2Color="#0178c0"
          cursorOrbColor="#0284c7"
        />

        {/* Section Content - Symmetrical Standard Layout Container */}
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
              onClick={goToContactForm}
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
