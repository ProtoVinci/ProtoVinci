import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface LiquidCursorGradientProps {
  className?: string;
  orb1Color?: string;
  orb2Color?: string;
  cursorOrbColor?: string;
}

export const LiquidCursorGradient: React.FC<LiquidCursorGradientProps> = ({
  className = "",
  orb1Color = "#023065", // Deep rich navy
  orb2Color = "#0178c0", // Vibrant electric cyan/blue
  cursorOrbColor = "#0284c7", // Cursor tracking luminous cyan orb
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery smooth liquid spring tracking (rewampui liquid-cursor-gradient physics)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    parent.addEventListener("mousemove", handleMouseMove);
    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none bg-[#020612] ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* The Colored Orbs Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Static / Floating Ambient Orb 1 */}
        <motion.div
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -50, 50, -20, 0],
            scale: [1, 1.25, 0.95, 1.15, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] rounded-full mix-blend-screen opacity-90"
          style={{ backgroundColor: orb1Color }}
        />

        {/* Static / Floating Ambient Orb 2 */}
        <motion.div
          animate={{
            x: [0, -60, 20, 40, 0],
            y: [0, 40, -40, 30, 0],
            scale: [1, 0.85, 1.3, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-15%] right-[-15%] w-[65%] h-[70%] rounded-full mix-blend-screen opacity-85"
          style={{ backgroundColor: orb2Color }}
        />

        {/* The Mouse Tracking Liquid Orb */}
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full mix-blend-screen opacity-80"
          style={{
            backgroundColor: cursorOrbColor,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </div>

      {/* The Heavy Blur Glass Layer (The Magic) */}
      <div className="absolute inset-0 z-10 backdrop-blur-[90px] bg-black/15" />

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
};

export default LiquidCursorGradient;
