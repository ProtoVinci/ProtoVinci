import React, { useState } from "react";
import { Layers, MoveRight, Sparkles } from "lucide-react";

export interface ProjectCard {
  id: string;
  category: string;
  headline: string;
  subtext: string;
  themeColor: string;
  glowColor: string;
  image: string;
}

const CARDS: ProjectCard[] = [
  {
    id: "brand-identity",
    category: "BRAND IDENTITY",
    headline: "Our projects",
    subtext: "Artisanal roasting & luxury packaging experience designed for tactile human connection.",
    themeColor: "from-amber-950/80 via-neutral-950 to-black",
    glowColor: "rgba(217, 119, 6, 0.3)",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "digital-exp",
    category: "DIGITAL EXPERIENCE",
    headline: "Publish Faster Framer Studio",
    subtext: "Immersive 3D environments with zero latency and cinema-level shader choreography.",
    themeColor: "from-blue-950/80 via-indigo-950 to-black",
    glowColor: "rgba(59, 130, 246, 0.35)",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "website-design",
    category: "WEBSITE DESIGN",
    headline: "Just publish it with Framer",
    subtext: "The website tailor made for designers.",
    themeColor: "from-sky-950/80 via-neutral-950 to-black",
    glowColor: "rgba(14, 165, 233, 0.4)",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "saas-platform",
    category: "SAAS PLATFORM",
    headline: "Build better sites, faster",
    subtext: "Enterprise architecture unified with micro-interactions, dark mode, and real-time insights.",
    themeColor: "from-neutral-900/90 via-neutral-950 to-black",
    glowColor: "rgba(99, 102, 241, 0.3)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3d-motion",
    category: "3D & MOTION GRAPHICS",
    headline: "Dimensional Form & Kinetics",
    subtext: "Fluid computational simulations and bespoke 3D identity packages for market disruptors.",
    themeColor: "from-yellow-950/80 via-neutral-950 to-black",
    glowColor: "rgba(234, 179, 8, 0.3)",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1200&q=80",
  },
];

export const HeroCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Center card active by default

  const activeCard = CARDS[activeIndex];

  return (
    <div className="w-full flex flex-col items-center select-none pt-2 pb-6">
      {/* 5-Card Expanding Stage (Matches Reference Image 2: No rounded corners, sharp rectangles) */}
      <div className="relative w-full max-w-6xl px-2 sm:px-4 flex items-center justify-center min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
        {/* Ambient Backlight Glow behind active card */}
        <div
          className="pointer-events-none absolute w-[480px] sm:w-[640px] h-[340px] sm:h-[420px] blur-[110px] opacity-65 transition-all duration-700 ease-out z-0"
          style={{
            background: `radial-gradient(circle, ${activeCard.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Seamless 5-Card Contiguous Row */}
        <div className="relative z-10 flex items-stretch justify-center w-full h-[380px] sm:h-[440px] md:h-[480px] gap-1.5 sm:gap-2">
          {CARDS.map((card, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={card.id}
                onClick={() => setActiveIndex(idx)}
                className={`group cursor-pointer relative overflow-hidden rounded-none border border-neutral-800/90 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] ${
                  isActive
                    ? "flex-[4.5] min-w-[320px] sm:min-w-[480px] md:min-w-[580px] border-neutral-700 shadow-2xl z-20"
                    : "flex-[1] min-w-[50px] sm:min-w-[80px] md:min-w-[110px] opacity-75 hover:opacity-100 hover:border-neutral-600 z-10"
                }`}
                style={{
                  background: "#050608",
                }}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
                    isActive
                      ? "opacity-40 scale-100"
                      : "opacity-30 scale-105 group-hover:opacity-45"
                  }`}
                  style={{
                    backgroundImage: `url(${card.image})`,
                  }}
                />

                {/* Dark Vignette / Gradient Mask */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${card.themeColor} ${
                    isActive ? "opacity-85" : "opacity-95"
                  }`}
                />

                {/* Card Interior */}
                {isActive ? (
                  /* Expanded Active Card View (Matches Image 2) */
                  <div className="relative h-full w-full flex flex-col justify-between text-white z-10 p-5 sm:p-7 md:p-8 animate-in fade-in duration-500">
                    {/* Top Status Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="font-['Switzer'] text-[14px] font-[500] text-[#7D7D7D] ml-2 tracking-wide hidden sm:inline">
                          ProtoVinci Studio · {card.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                        <span className="font-['Switzer'] text-[14px] font-[500] text-[#7D7D7D]">
                          Interactive Prototype
                        </span>
                      </div>
                    </div>

                    {/* Center Preview Content */}
                    <div className="my-auto py-3 flex flex-col items-center justify-center text-center">
                      <h3 className="font-['Switzer'] text-[22px] sm:text-[28px] md:text-[32px] text-[#ffffff] font-[500] leading-tight mb-2.5 max-w-lg drop-shadow-md">
                        {card.headline}
                      </h3>
                      <p className="font-['Switzer'] text-[14px] sm:text-[16px] text-[#7D7D7D] font-[500] max-w-md line-clamp-2 mb-5">
                        {card.subtext}
                      </p>

                      {/* Mockup Canvas UI Frame */}
                      <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-700/80 rounded-none p-3 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-8 h-8 rounded-none bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-['Switzer'] text-[14px] font-[550] text-[#ffffff]">
                              Canvas Preview
                            </div>
                            <div className="font-['Switzer'] text-[12px] font-[500] text-[#7D7D7D]">
                              Responsive Flex Layout · 120 FPS
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="bg-white hover:bg-neutral-100 text-black font-['Switzer'] text-[12px] font-[600] px-3.5 py-1.5 rounded-none flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>Inspect</span>
                          <MoveRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom: Uppercase Category Name INSIDE the active card as requested */}
                    <div className="w-full pt-4 border-t border-white/10 text-center">
                      <div className="font-['Switzer'] text-[14px] uppercase text-[#ffffff] font-[600] tracking-[0.25em] drop-shadow-xs">
                        {card.category}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Contracted Side Card Slice (Smooth vertical layout) */
                  <div className="relative h-full w-full flex flex-col justify-between text-white z-10 p-2 sm:p-3">
                    <div className="text-center font-['Switzer'] text-[11px] font-[500] text-[#7D7D7D] pt-1">
                      0{idx + 1}
                    </div>

                    {/* Vertically oriented category hint */}
                    <div className="my-auto flex items-center justify-center">
                      <span className="font-['Switzer'] text-[11px] sm:text-[13px] font-[550] text-[#7D7D7D] uppercase tracking-wider whitespace-nowrap transform -rotate-90 select-none group-hover:text-white transition-colors">
                        {card.category.split(" ")[0]}
                      </span>
                    </div>

                    <div className="text-center pb-2">
                      <div className="w-1.5 h-1.5 bg-neutral-600 rounded-none mx-auto group-hover:bg-white transition-colors" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
