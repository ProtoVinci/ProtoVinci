import React, { useEffect, useState } from "react";
import noiseImg from "@/assets/noise.webp";

interface BackgroundNoiseGridProps {
  className?: string;
  stripWidth?: number;
}

/**
 * BackgroundNoiseGrid
 * Inspired by Aceternity UI's background-with-noise-grid:
 * - Responsive vertical fluted strips with subtle horizontal gradient fills.
 * - Hairline column dividers creating a crisp rhythmic column grid.
 * - Soft radial vignette to keep hero headline and CTAs perfectly readable.
 * - Aceternity noise texture overlay for tactile, modern depth.
 */
export const BackgroundNoiseGrid: React.FC<BackgroundNoiseGridProps> = ({
  className = "",
  stripWidth,
}) => {
  const [stripCount, setStripCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const defaultWidth = window.innerWidth < 640 ? 44 : 54;
      const target = stripWidth ?? defaultWidth;
      return Math.max(8, Math.round(window.innerWidth / target));
    }
    return 22;
  });

  useEffect(() => {
    let rafId: number | null = null;
    const updateStrips = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const defaultWidth = window.innerWidth < 640 ? 44 : 54;
        const target = stripWidth ?? defaultWidth;
        const count = Math.max(8, Math.round(window.innerWidth / target));
        setStripCount((prev) => (prev !== count ? count : prev));
      });
    };

    updateStrips();
    window.addEventListener("resize", updateStrips, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateStrips);
    };
  }, [stripWidth]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#f7f7f9] select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Dynamic vertical strips with horizontal gradient fills */}
      <div className="absolute inset-0 flex w-full h-full">
        {Array.from({ length: stripCount }).map((_, i) => (
          <div
            key={i}
            className="h-full flex-1 border-r border-[#e6e6ea]/60 bg-gradient-to-r from-[#ececef] via-[#f5f5f7] to-[#ffffff]"
          />
        ))}
      </div>

      {/* 2. Soft radial vignette centering light on hero copy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.15)_60%,transparent_85%)]" />

      {/* 3. Smooth bottom blend into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#f0f0f3]/40 to-[#e4e4e7]" />

      {/* 4. Fine-grain noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.38] mix-blend-overlay"
        style={{
          backgroundImage: `url(${noiseImg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
};

export default BackgroundNoiseGrid;
