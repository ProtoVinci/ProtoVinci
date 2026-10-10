import React, { useRef, useEffect } from "react";

export interface RippleGridProps {
  className?: string;
  spacing?: number;
  baseColor?: string; // default: #023065
  hoverColor?: string; // default: #0178c0
  baseRadius?: number;
  interactionRadius?: number;
}

interface Dot {
  x: number;
  y: number;
  baseRadius: number;
  targetRadius: number;
  currentRadius: number;
  t: number; // 0 (base) to 1 (hover/ripple)
}

interface WaveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

export const RippleGrid: React.FC<RippleGridProps> = ({
  className = "",
  spacing = 28,
  baseColor = "#023065",
  hoverColor = "#0178c0",
  baseRadius = 1.35,
  interactionRadius = 135,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -2000, y: -2000 });
  const ripplesRef = useRef<WaveRipple[]>([]);

  // Parse hex colors into RGB components
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const baseRgb = hexToRgb(baseColor);
  const hoverRgb = hexToRgb(hoverColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;

    const setupDots = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;

      dots = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseRadius,
            targetRadius: baseRadius,
            currentRadius: baseRadius,
            t: 0,
          });
        }
      }
    };

    setupDots();

    const handleResize = () => {
      setupDots();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -2000, y: -2000 };
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 280,
        strength: 1.0,
      });
    };

    // Attach mouse events to the parent container so interactions work across child overlays
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
      parent.addEventListener("click", handleClick);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Update and filter click wave ripples
      for (let r = 0; r < ripplesRef.current.length; r++) {
        const ripple = ripplesRef.current[r];
        ripple.radius += 5.5;
        ripple.strength *= 0.965;
      }
      ripplesRef.current = ripplesRef.current.filter(
        (rip) => rip.radius < rip.maxRadius && rip.strength > 0.05
      );

      const currentRipples = ripplesRef.current;

      // Render dots matrix
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // 1. Proximity to cursor
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetT = 0;
        let scaleBonus = 0;

        if (dist < interactionRadius) {
          const prox = 1 - dist / interactionRadius;
          targetT = prox;
          scaleBonus = prox * 3.2; // Expand radius smoothly on proximity
        }

        // 2. Wave ripples contribution
        for (let r = 0; r < currentRipples.length; r++) {
          const rip = currentRipples[r];
          const rx = rip.x - dot.x;
          const ry = rip.y - dot.y;
          const rDist = Math.sqrt(rx * rx + ry * ry);
          const waveDelta = Math.abs(rDist - rip.radius);

          if (waveDelta < 35) {
            const waveStrength = (1 - waveDelta / 35) * rip.strength;
            scaleBonus = Math.max(scaleBonus, waveStrength * 3.8);
            targetT = Math.max(targetT, waveStrength);
          }
        }

        dot.targetRadius = dot.baseRadius + scaleBonus;
        // Smooth spring-like lerp
        dot.currentRadius += (dot.targetRadius - dot.currentRadius) * 0.16;
        dot.t += (targetT - dot.t) * 0.18;

        // Color interpolation between baseColor (#023065) and hoverColor (#0178c0)
        const tClamped = Math.max(0, Math.min(1, dot.t));
        const r = Math.round(baseRgb.r + (hoverRgb.r - baseRgb.r) * tClamped);
        const g = Math.round(baseRgb.g + (hoverRgb.g - baseRgb.g) * tClamped);
        const b = Math.round(baseRgb.b + (hoverRgb.b - baseRgb.b) * tClamped);
        const alpha = 0.55 + 0.45 * tClamped;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
        parent.removeEventListener("click", handleClick);
      }
      cancelAnimationFrame(animationId);
    };
  }, [baseColor, hoverColor, spacing, baseRadius, interactionRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default RippleGrid;
