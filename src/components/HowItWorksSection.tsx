import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface ProcessStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  elevation: string;
  description: string;
  deliverables: string[];
  metrics: string;
  x: number;
  y: number;
}

const STAGES: ProcessStage[] = [
  {
    id: "understand",
    step: "01",
    title: "Understand",
    subtitle: "Discovery & Strategic Immersion",
    elevation: "Stage 01 • Baseline Analysis",
    description:
      "We dissect your brand DNA, user psychology, and competitive landscape through structured research. Uncovering core friction and isolating your single strategic advantage before design begins.",
    deliverables: [
      "Stakeholder Audit",
      "Friction Mapping",
      "Competitive Positioning",
      "Strategic Architecture",
    ],
    metrics: "100% Foundation Alignment",
    x: 120,
    y: 165,
  },
  {
    id: "shape",
    step: "02",
    title: "Shape",
    subtitle: "Creative Direction & Structural Architecture",
    elevation: "Stage 02 • Design Architecture",
    description:
      "Translating raw intelligence into structured creative vision. We sculpt tactile moodboards, bespoke typography systems, and high-fidelity interaction blueprints into a bulletproof design foundation.",
    deliverables: [
      "Art Direction & Palette",
      "Information Blueprints",
      "Design System Kit",
      "Interactive Wireframes",
    ],
    metrics: "+45% Directional Clarity",
    x: 370,
    y: 120,
  },
  {
    id: "create",
    step: "03",
    title: "Create",
    subtitle: "High-Craft Engineering & Production",
    elevation: "Stage 03 • Production Velocity",
    description:
      "Where vision meets obsessive execution. From pixel-perfect front-end craftsmanship to GPU-accelerated micro-interactions and custom CMS schemas, engineered with uncompromising speed and precision.",
    deliverables: [
      "Production React & TS",
      "Fluid 60FPS Animations",
      "Semantic SEO Architecture",
      "Custom CMS Schemas",
    ],
    metrics: "99+ Lighthouse Performance",
    x: 630,
    y: 75,
  },
  {
    id: "elevate",
    step: "04",
    title: "Elevate",
    subtitle: "Deployment, Telemetry & Compounding Scale",
    elevation: "Stage 04 • Compounding Scale",
    description:
      "Launching with zero downtime, full analytics telemetry, and ongoing conversion optimization. Observing live visitor behavior to continuously calibrate and scale toward undisputed category leadership.",
    deliverables: [
      "Zero-Downtime Launch",
      "Telemetry Dashboard",
      "Conversion Optimization",
      "Continuous Scale",
    ],
    metrics: "3.4x Average Client ROI",
    x: 880,
    y: 30,
  },
];

// SVG Dimensions for the elevating curve
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 210;

// Smooth cubic bezier trajectory rising from bottom-left to top-right
const CURVE_PATH =
  "M 120 165 C 220 165, 270 120, 370 120 C 470 120, 530 75, 630 75 C 730 75, 780 30, 880 30";
const AREA_PATH = `${CURVE_PATH} L 880 195 L 120 195 Z`;

// Exact arc-length fractions where the cubic bezier arrives at each stage node:
// Node 0 (Understand) at start: 0.000
// Node 1 (Shape) at (370, 120): ~0.3291
// Node 2 (Create) at (630, 75): ~0.6709
// Node 3 (Elevate) at (880, 30): 1.0000
const NODE_RATIOS = [0, 0.3291, 0.6709, 1.0];

// Mapped scroll arrival intervals:
// - 0.00 to 0.28: Beacon travels from Node 0 to Node 1 (Stage 0 active)
// - 0.28: Beacon arrives exactly at Node 1 -> Stage 1 activates
// - 0.28 to 0.54: Beacon travels from Node 1 to Node 2 (Stage 1 active)
// - 0.54: Beacon arrives exactly at Node 2 -> Stage 2 activates
// - 0.54 to 0.80: Beacon travels from Node 2 to Node 3 (Stage 2 active)
// - 0.80: Beacon arrives exactly at Node 3 -> Stage 3 activates
// - 0.80 to 1.00: Beacon stays comfortably at Node 3, allowing full reading time
const SCROLL_THRESHOLDS = [0, 0.28, 0.54, 0.80];

function calculateTrajectory(scrollProgress: number): {
  curveProgress: number;
  stageIndex: number;
} {
  const s = Math.min(Math.max(scrollProgress, 0), 1);

  if (s < SCROLL_THRESHOLDS[1]) {
    // Stage 0: gliding from Node 0 to Node 1
    const localT = (s - SCROLL_THRESHOLDS[0]) / (SCROLL_THRESHOLDS[1] - SCROLL_THRESHOLDS[0]);
    const curveProgress = NODE_RATIOS[0] + localT * (NODE_RATIOS[1] - NODE_RATIOS[0]);
    return { curveProgress, stageIndex: 0 };
  } else if (s < SCROLL_THRESHOLDS[2]) {
    // Stage 1: gliding from Node 1 to Node 2
    const localT = (s - SCROLL_THRESHOLDS[1]) / (SCROLL_THRESHOLDS[2] - SCROLL_THRESHOLDS[1]);
    const curveProgress = NODE_RATIOS[1] + localT * (NODE_RATIOS[2] - NODE_RATIOS[1]);
    return { curveProgress, stageIndex: 1 };
  } else if (s < SCROLL_THRESHOLDS[3]) {
    // Stage 2: gliding from Node 2 to Node 3
    const localT = (s - SCROLL_THRESHOLDS[2]) / (SCROLL_THRESHOLDS[3] - SCROLL_THRESHOLDS[2]);
    const curveProgress = NODE_RATIOS[2] + localT * (NODE_RATIOS[3] - NODE_RATIOS[2]);
    return { curveProgress, stageIndex: 2 };
  } else {
    // Stage 3: arrived at Node 3 (Elevate)
    return { curveProgress: 1.0, stageIndex: 3 };
  }
}

export const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const beaconRef = useRef<SVGGElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  // Initialize and run the pinned scroll animation
  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const totalLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2400", // Heavy, deliberate scroll distance for buttery smoothness
        pin: true,
        scrub: 1.6, // Weighted scrub in sync with Lenis
        anticipatePin: 1,
        onUpdate: (self) => {
          const s = Math.min(Math.max(self.progress, 0), 1);
          setScrollProgress(s);

          // Compute exact physical trajectory along the cubic bezier
          const { curveProgress, stageIndex } = calculateTrajectory(s);

          // 1. Elevate the graph stroke exactly to the current point
          const currentOffset = totalLength * (1 - curveProgress);
          gsap.set(path, { strokeDashoffset: currentOffset });

          // 2. Position travelling beacon directly along the curve
          if (beaconRef.current) {
            const point = path.getPointAtLength(curveProgress * totalLength);
            gsap.set(beaconRef.current, {
              attr: { transform: `translate(${point.x}, ${point.y})` },
            });
          }

          // 3. Switch active stage strictly when beacon arrives at the node
          if (stageIndex !== activeIndexRef.current) {
            activeIndexRef.current = stageIndex;
            setActiveStageIndex(stageIndex);
          }
        },
      });

      triggerRef.current = trigger;
    }, section);

    return () => ctx.revert();
  }, []);

  // Jump to a specific stage when clicking its graph node
  const handleStageClick = (idx: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const targetScrolls = [0.04, 0.32, 0.58, 0.86];
    const targetY = trigger.start + targetScrolls[idx] * (trigger.end - trigger.start);
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-label="How It Works Methodology"
      className="relative w-full h-screen max-h-screen flex flex-col items-center justify-center overflow-hidden py-4 sm:py-6 px-4 sm:px-8 select-none"
      style={{
        background: "linear-gradient(to right, #f8f9fb 0%, #f8f9fb 100%)",
      }}
    >
      <div id="process" className="absolute -top-32" aria-hidden="true" />

      {/* Subtle Ambient Depth Radial Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] rounded-full blur-[140px] opacity-35 bg-gradient-to-tr from-neutral-200 via-white to-neutral-300"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* 1. Translucent Frosted Pill with Solid Dark Text: "HOW IT WORKS" */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-300/80 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] mb-2.5 transition-transform hover:scale-105 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          <span
            className="text-[12px] uppercase font-[600] tracking-[0.22em] text-[#000000]"
            style={{ color: "#000000", fontFamily: "'Switzer', sans-serif" }}
          >
            HOW IT WORKS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        </div>

        {/* Section Headline */}
        <h2
          className="text-xl sm:text-2xl md:text-[28px] text-[#000000] font-[550] tracking-[-0.03em] text-center max-w-2xl leading-[1.18] m-0 mb-3.5"
          style={{ fontFamily: "'Switzer', sans-serif" }}
        >
          A disciplined trajectory from discovery to compounding impact.
        </h2>

        {/* 2. Frosted Neomorphic Elevating Graph Card */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06),0_10px_20px_-5px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Subtle Vertical Guides */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="w-full h-full grid grid-cols-4 divide-x divide-neutral-200/50" />
          </div>

          {/* SVG Graph View */}
          <div className="relative w-full aspect-[1000/210] min-h-[160px] sm:min-h-[185px] md:min-h-[205px]">
            <svg
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="w-full h-full overflow-visible"
            >
              <defs>
                {/* Elevating Line Gradient */}
                <linearGradient
                  id="elevateGradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#101011" />
                  <stop offset="50%" stopColor="#252528" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>

                {/* Soft Frosted Area Fill */}
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#101011" stopOpacity="0.08" />
                  <stop offset="70%" stopColor="#101011" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#101011" stopOpacity="0.0" />
                </linearGradient>

                {/* Neomorphic Drop Shadow for Graph Points */}
                <filter
                  id="nodeShadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="5"
                    floodColor="#000000"
                    floodOpacity="0.14"
                  />
                  <feDropShadow
                    dx="0"
                    dy="1"
                    stdDeviation="2"
                    floodColor="#000000"
                    floodOpacity="0.08"
                  />
                </filter>
              </defs>

              {/* 1. Underlying Base Track (Muted Inactive Curve) */}
              <path
                d={CURVE_PATH}
                fill="none"
                stroke="#e4e6ea"
                strokeWidth="3.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />

              {/* 2. Frosted Gradient Area Under Curve */}
              <path
                ref={areaRef}
                d={AREA_PATH}
                fill="url(#areaGradient)"
                style={{ opacity: Math.max(scrollProgress * 1.2, 0.2) }}
              />

              {/* 3. Elevating Dynamic Stroke (Scrubbed with exact trajectory) */}
              <path
                ref={pathRef}
                d={CURVE_PATH}
                fill="none"
                stroke="url(#elevateGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* 4. Active Beacon Gliding along the curve */}
              <g
                ref={beaconRef}
                transform={`translate(${STAGES[0].x}, ${STAGES[0].y})`}
              >
                <circle
                  r="16"
                  fill="rgba(16, 16, 17, 0.12)"
                  className="animate-ping"
                />
                <circle
                  r="9"
                  fill="#ffffff"
                  stroke="#101011"
                  strokeWidth="3"
                  filter="url(#nodeShadow)"
                />
                <circle r="3.5" fill="#101011" />
              </g>

              {/* 5. Four Anchor Nodes & Titles: Understand, Shape, Create, Elevate */}
              {STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                const isPassed = idx <= activeStageIndex;

                return (
                  <g
                    key={stage.id}
                    onClick={() => handleStageClick(idx)}
                    className="cursor-pointer group"
                  >
                    {/* Active Node Ambient Pulse Glow */}
                    {isActive && (
                      <circle
                        cx={stage.x}
                        cy={stage.y}
                        r="18"
                        fill="rgba(16, 16, 17, 0.08)"
                        className="animate-pulse pointer-events-none"
                      />
                    )}

                    {/* Vertical Connector Guide Line */}
                    <line
                      x1={stage.x}
                      y1={stage.y + 14}
                      x2={stage.x}
                      y2={SVG_HEIGHT - 10}
                      stroke={isActive ? "#101011" : "#e5e7eb"}
                      strokeWidth={isActive ? "1.5" : "1"}
                      strokeDasharray={isActive ? "none" : "3 4"}
                      opacity={isActive ? 0.7 : 0.35}
                      style={{ transition: "stroke 0.3s ease, opacity 0.3s ease" }}
                    />

                    {/* Node Outer Ring */}
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r={isActive ? "11.5" : "8.5"}
                      fill="#ffffff"
                      stroke={isPassed ? "#101011" : "#d1d5db"}
                      strokeWidth={isActive ? "3.5" : "2"}
                      filter="url(#nodeShadow)"
                      style={{
                        transition:
                          "r 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease",
                      }}
                    />

                    {/* Node Inner Core */}
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r={isActive ? "4.5" : "3"}
                      fill={isPassed ? "#101011" : "#9ca3af"}
                      style={{ transition: "r 0.3s ease, fill 0.3s ease" }}
                    />

                    {/* Stage Title Text on Graph - Fixed Font Weight & Size to prevent any FOUT flash */}
                    <text
                      x={stage.x}
                      y={stage.y - 18}
                      textAnchor="middle"
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        transition: "fill 0.35s ease, opacity 0.35s ease",
                      }}
                      fill={isActive ? "#000000" : "#8a8a90"}
                      opacity={isActive ? 1 : 0.55}
                      className="select-none pointer-events-none"
                    >
                      {stage.title}
                    </text>

                    {/* Step Index Badge */}
                    <text
                      x={stage.x}
                      y={stage.y - 34}
                      textAnchor="middle"
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        transition: "fill 0.35s ease, opacity 0.35s ease",
                      }}
                      fill={isActive ? "#000000" : "#a3a3a3"}
                      opacity={isActive ? 1 : 0.55}
                      className="select-none pointer-events-none"
                    >
                      {stage.step}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 3. Description Area with Buttery Smooth Crossfade Directly on Plain Background (Card Container Removed) */}
        <div className="w-full max-w-3xl mt-4 sm:mt-5 px-3 sm:px-6 relative min-h-[160px] sm:min-h-[145px] flex items-center justify-center">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isPast = idx < activeStageIndex;

            return (
              <div
                key={stage.id}
                className="absolute inset-0 flex flex-col items-center text-center pointer-events-none"
                style={{
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? "blur(0px)" : "blur(10px)",
                  transform: isActive
                    ? "translateY(0px) scale(1)"
                    : isPast
                    ? "translateY(-10px) scale(0.985)"
                    : "translateY(10px) scale(0.985)",
                  pointerEvents: isActive ? "auto" : "none",
                  visibility: isActive ? "visible" : "hidden",
                  transition:
                    "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s",
                }}
              >
                {/* Stage Indicator Pill */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[11px] uppercase tracking-[0.2em] font-[600] px-2.5 py-0.5 rounded-full bg-neutral-900 text-white shadow-xs"
                    style={{ fontFamily: "'Switzer', sans-serif" }}
                  >
                    PHASE {stage.step}
                  </span>
                  <span
                    className="text-neutral-500 font-[500] text-xs sm:text-[13.5px] tracking-[-0.01em]"
                    style={{ fontFamily: "'Switzer', sans-serif" }}
                  >
                    {stage.subtitle}
                  </span>
                </div>

                {/* Stage Primary Description directly on plain background */}
                <p
                  className="text-[#1a1a1d] font-[500] leading-relaxed max-w-2xl m-0 text-sm sm:text-[16px] md:text-[17px] tracking-[-0.01em]"
                  style={{ fontFamily: "'Switzer', sans-serif" }}
                >
                  {stage.description}
                </p>

                {/* Deliverables Badges Horizontal Row directly on plain background */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-3 pt-3 border-t border-neutral-300/60 w-full max-w-2xl">
                  {stage.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-neutral-300/70 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                      <span
                        className="text-neutral-700 font-[500] text-[11.5px] sm:text-xs"
                        style={{ fontFamily: "'Switzer', sans-serif" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
