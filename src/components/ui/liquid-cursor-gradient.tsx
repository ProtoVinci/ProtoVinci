import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useInView } from "@/lib/hooks";

export interface LiquidCursorGradientProps {
  className?: string;
  orb1Color?: string;
  orb2Color?: string;
  cursorOrbColor?: string;
  baseColor?: string;
}

// Soft-edged orb: a radial gradient looks the same as a solid circle under a heavy blur,
// but costs nothing to composite. The previous version ran `backdrop-filter: blur(90px)`
// over animating layers, which forced a full-section re-blur on every frame.
//
// `closest-side` makes the gradient reach full transparency *inside* its box. The default
// (farthest-corner) runs past the box edges, where the browser clips it into hard seams.
// The many stops trace an ease-out curve so no ring is visible where the falloff ends.
const orb = (color: string) =>
  `radial-gradient(ellipse closest-side at center, ${color} 0%, ${color}e6 12%, ${color}b3 28%, ${color}73 45%, ${color}3d 62%, ${color}17 78%, ${color}05 90%, ${color}00 100%)`;

const NOISE =
  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")';

export const LiquidCursorGradient: React.FC<LiquidCursorGradientProps> = ({
  className = "",
  orb1Color = "#27272a", // Graphite
  orb2Color = "#3f3f46", // Steel
  cursorOrbColor = "#52525b", // Soft silver light that follows the cursor
  baseColor = "#09090b", // Ink, same as the site's text colour
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorOrbRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { rootMargin: "100px" });

  // Cursor-following orb: only on devices with a real hover pointer, only while in view.
  useEffect(() => {
    const container = containerRef.current;
    const orbEl = cursorOrbRef.current;
    const parent = container?.parentElement;
    if (!container || !orbEl || !parent || !inView) return;

    const { width, height } = container.getBoundingClientRect();
    gsap.set(orbEl, { x: width / 2, y: height / 2, xPercent: -50, yPercent: -50 });
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(orbEl, "x", { duration: 1.4, ease: "power3.out" });
    const yTo = gsap.quickTo(orbEl, "y", { duration: 1.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };
    parent.addEventListener("mousemove", onMove, { passive: true });
    return () => parent.removeEventListener("mousemove", onMove);
  }, [inView]);

  return (
    <div
      ref={containerRef}
      data-paused={!inView}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ zIndex: 0, backgroundColor: baseColor }}
      aria-hidden="true"
    >
      {/* Ambient Orb 1 */}
      <div
        className="absolute top-[-45%] left-[-35%] w-[115%] h-[150%] mix-blend-screen opacity-90 will-change-transform"
        style={{ background: orb(orb1Color), animation: "pv-orb-a 16s linear infinite" }}
      />

      {/* Ambient Orb 2 */}
      <div
        className="absolute bottom-[-45%] right-[-35%] w-[110%] h-[150%] mix-blend-screen opacity-85 will-change-transform"
        style={{ background: orb(orb2Color), animation: "pv-orb-b 18s linear infinite" }}
      />

      {/* Mouse-tracking orb (starts centered; GSAP moves it on hover devices) */}
      <div
        ref={cursorOrbRef}
        className="absolute top-0 left-0 w-[760px] h-[760px] mix-blend-screen opacity-60 will-change-transform"
        style={{ background: orb(cursorOrbColor) }}
      />

      {/* Tint */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />
    </div>
  );
};

export default LiquidCursorGradient;
