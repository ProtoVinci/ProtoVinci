import React, { useEffect, useRef } from "react";

export interface AsciiHoverFieldProps {
  /** Characters from faintest to brightest */
  ramp?: string;
  cellWidth?: number;
  cellHeight?: number;
  fontSize?: number;
  /** Radius of the glow around the cursor, in px */
  radius?: number;
  /** Seconds for the trail to fade to ~37% */
  decay?: number;
  /** RGB triplet, e.g. "255, 255, 255" */
  color?: string;
  maxAlpha?: number;
  /** Cells under elements matching this selector (inside the parent) stay empty, so text stays readable */
  safeSelector?: string;
  /**
   * Draw this image (a dark mark on a light, opaque background) in each cell instead of a character.
   * It's turned into a `color` silhouette once; brightness then sets each icon's size and opacity.
   */
  glyphSrc?: string;
  /** Image mode: extra scale at the cursor (0 = no lens, 0.9 = icons grow to 1.9x at the centre) */
  lens?: number;
  /** Image mode: radius of the magnifying lens, in px */
  lensRadius?: number;
  className?: string;
}

/**
 * Turns a dark-on-light raster mark into tinted silhouettes cropped to the ink, at several sizes:
 * ink darkness becomes alpha (the background drops out, edges stay anti-aliased), strokes are
 * thickened slightly so fine lines survive at icon size, and each size is a clean halving of the
 * previous so small icons stay crisp instead of being squashed from the full image every frame.
 */
function buildGlyphMips(img: HTMLImageElement, color: string): HTMLCanvasElement[] {
  const src = document.createElement("canvas");
  const w = (src.width = img.naturalWidth);
  const h = (src.height = img.naturalHeight);
  const sctx = src.getContext("2d", { willReadFrequently: true });
  if (!sctx || !w || !h) return [];
  sctx.drawImage(img, 0, 0);
  const data = sctx.getImageData(0, 0, w, h);
  const px = data.data;
  const lum = (i: number) => 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];

  // Background brightness from the corners, ink from the darkest pixel
  const corners = [0, (w - 1) * 4, (h - 1) * w * 4, ((h - 1) * w + w - 1) * 4];
  const bg = corners.reduce((sum, i) => sum + lum(i), 0) / corners.length;
  let ink = 255;
  for (let i = 0; i < px.length; i += 4) ink = Math.min(ink, lum(i));
  const range = Math.max(1, bg - ink);

  // Alpha from ink darkness, ignoring the faint background vignette
  let alpha = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const t = Math.min(1, Math.max(0, ((bg - lum(i * 4)) / range - 0.12) / 0.6));
    alpha[i] = t * t * (3 - 2 * t);
  }

  // Thicken strokes: separable max filter (~1.5% of the image per side)
  const grow = Math.max(1, Math.round(w * 0.015));
  const dilate = (input: Float32Array, horizontal: boolean) => {
    const out = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let m = 0;
        for (let k = -grow; k <= grow; k++) {
          const xx = horizontal ? x + k : x;
          const yy = horizontal ? y : y + k;
          if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          m = Math.max(m, input[yy * w + xx]);
        }
        out[y * w + x] = m;
      }
    }
    return out;
  };
  alpha = dilate(dilate(alpha, true), false);

  const [r, g, b] = color.split(",").map((v) => Number(v.trim()));
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let i = 0; i < w * h; i++) {
    const a = Math.round(alpha[i] * 255);
    px[i * 4] = r;
    px[i * 4 + 1] = g;
    px[i * 4 + 2] = b;
    px[i * 4 + 3] = a;
    if (a > 24) {
      const x = i % w;
      const y = (i - x) / w;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  if (maxX <= minX || maxY <= minY) return [];
  sctx.putImageData(data, 0, 0);

  // Square crop around the ink at 128px, then successive halvings
  const side = Math.max(maxX - minX, maxY - minY) + 2;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const mips: HTMLCanvasElement[] = [];
  let prev: HTMLCanvasElement = src;
  let prevRect = [cx - side / 2, cy - side / 2, side, side];
  for (let size = 128; size >= 8; size /= 2) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const cctx = c.getContext("2d");
    if (!cctx) break;
    cctx.imageSmoothingEnabled = true;
    cctx.imageSmoothingQuality = "high";
    cctx.drawImage(prev, prevRect[0], prevRect[1], prevRect[2], prevRect[3], 0, 0, size, size);
    mips.push(c);
    prev = c;
    prevRect = [0, 0, size, size];
  }
  return mips; // largest first
}

/**
 * Codex-style character reveal: a fixed monospace grid where characters fade in around the
 * cursor (brightness picks the glyph) and leave a short fading trail.
 *
 * Listens on its parent element. Runs a frame loop only while the pointer is inside or the
 * trail is still fading, and does nothing on touch-only devices or with reduced motion.
 */
export const AsciiHoverField: React.FC<AsciiHoverFieldProps> = ({
  ramp = "-_>o",
  cellWidth = 11,
  cellHeight = 17,
  fontSize = 11,
  radius = 120,
  decay = 0.45,
  color = "255, 255, 255",
  maxAlpha = 0.8,
  safeSelector = "[data-ascii-safe]",
  glyphSrc,
  lens = 0,
  lensRadius = 60,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0); // brightness per cell, 0..1
    let blocked = new Uint8Array(0); // 1 = keep empty (behind text/buttons)
    let grain = new Float32Array(0); // fixed per-cell jitter so the edge looks organic

    // Image mode: build the tinted icon once, at several sizes (largest first)
    let mips: HTMLCanvasElement[] = [];
    let disposed = false;
    if (glyphSrc) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (!disposed) mips = buildGlyphMips(img, color);
      };
      img.src = glyphSrc;
    }
    // Smallest pre-scaled icon that is still at least `devicePx` wide
    const pickMip = (devicePx: number) => {
      for (let m = mips.length - 1; m >= 0; m--) if (mips[m].width >= devicePx) return mips[m];
      return mips[0];
    };
    let dpr = 1;
    // Lens strength eases in on enter and out on leave, so the zoom never pops
    let lensAmount = 0;

    let cachedHostRect: DOMRect | null = null;
    const updateHostRect = () => {
      if (host) cachedHostRect = host.getBoundingClientRect();
    };

    const layout = () => {
      // 1. Batch all layout reads BEFORE modifying canvas or DOM properties
      const hostRect = host.getBoundingClientRect();
      cachedHostRect = hostRect;
      const { width, height } = hostRect;
      const safeEls = Array.from(host.querySelectorAll<HTMLElement>(safeSelector)).map((el) => el.getBoundingClientRect());

      // 2. Batch canvas dimensions and context configuration
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `500 ${fontSize}px ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      cols = Math.ceil(width / cellWidth);
      rows = Math.ceil(height / cellHeight);
      field = new Float32Array(cols * rows);
      grain = new Float32Array(cols * rows).map(() => 0.8 + Math.random() * 0.4);
      blocked = new Uint8Array(cols * rows);

      const pad = 6;
      for (const r of safeEls) {
        const c0 = Math.max(0, Math.floor((r.left - hostRect.left - pad) / cellWidth));
        const c1 = Math.min(cols - 1, Math.floor((r.right - hostRect.left + pad) / cellWidth));
        const r0 = Math.max(0, Math.floor((r.top - hostRect.top - pad) / cellHeight));
        const r1 = Math.min(rows - 1, Math.floor((r.bottom - hostRect.top + pad) / cellHeight));
        for (let y = r0; y <= r1; y++) for (let x = c0; x <= c1; x++) blocked[y * cols + x] = 1;
      }
    };

    // Cursor target (raw) and drawn position (smoothed), in host px
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let inside = false;
    let raf = 0;
    let last = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;

      // Ease toward the cursor so fast flicks still draw a continuous trail
      const ease = 1 - Math.exp(-dt / 0.06);
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;

      const fade = Math.exp(-dt / decay);
      let alive = false;
      const r2 = radius * radius;
      const c0 = Math.max(0, Math.floor((pos.x - radius) / cellWidth));
      const c1 = Math.min(cols - 1, Math.floor((pos.x + radius) / cellWidth));
      const rr0 = Math.max(0, Math.floor((pos.y - radius) / cellHeight));
      const rr1 = Math.min(rows - 1, Math.floor((pos.y + radius) / cellHeight));

      for (let i = 0; i < field.length; i++) {
        if (field[i] > 0.002) {
          field[i] *= fade;
          alive = true;
        } else field[i] = 0;
      }

      if (inside) {
        alive = true;
        for (let y = rr0; y <= rr1; y++) {
          const dy = (y + 0.5) * cellHeight - pos.y;
          for (let x = c0; x <= c1; x++) {
            const dx = (x + 0.5) * cellWidth - pos.x;
            const d2 = dx * dx + dy * dy;
            if (d2 > r2) continue;
            // Smooth falloff: 1 at the centre, 0 at the radius
            const t = 1 - d2 / r2;
            const v = t * t;
            const i = y * cols + x;
            if (v > field[i]) field[i] = v;
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const steps = ramp.length;
      const cell = Math.min(cellWidth, cellHeight);
      const imageMode = mips.length > 0;

      lensAmount += ((inside ? 1 : 0) - lensAmount) * (1 - Math.exp(-dt / 0.18));
      if (lensAmount < 0.002) lensAmount = 0;
      else alive = true;
      const useLens = imageMode && lens > 0 && lensAmount > 0;
      const lr2 = lensRadius * lensRadius;
      // Icons inside the lens are drawn last (smallest zoom first) so the magnified ones sit on top
      const lensed: { x: number; y: number; size: number; alpha: number; l: number }[] = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const v = field[i] * grain[i];
          if (v < 0.06 || blocked[i]) continue;
          let alpha = Math.min(1, v * 1.3) * maxAlpha;
          let cx = (x + 0.5) * cellWidth;
          let cy = (y + 0.5) * cellHeight;

          if (imageMode) {
            // Brightness grows the icon from small at the edge to ~2/3 of the cell at the core,
            // leaving a gap so neighbours never touch
            let size = cell * (0.38 + 0.28 * Math.min(1, v));
            if (useLens) {
              const dx = cx - pos.x;
              const dy = cy - pos.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < lr2) {
                const t = 1 - Math.sqrt(d2) / lensRadius;
                const l = t * t * (3 - 2 * t) * lensAmount;
                // Magnifier: icons grow and spread away from the cursor by the same factor,
                // so spacing scales with size and magnified icons never overlap
                const zoom = lens * l;
                size *= 1 + zoom;
                cx += dx * zoom;
                cy += dy * zoom;
                alpha = Math.max(alpha, l * maxAlpha);
                if (l > 0.02) {
                  lensed.push({ x: cx, y: cy, size, alpha, l });
                  continue;
                }
              }
            }
            ctx.globalAlpha = alpha;
            ctx.drawImage(pickMip(size * dpr), cx - size / 2, cy - size / 2, size, size);
          } else if (!glyphSrc) {
            const glyph = ramp[Math.min(steps - 1, Math.floor(Math.min(v, 0.999) * steps))];
            ctx.fillStyle = `rgba(${color}, ${alpha.toFixed(3)})`;
            ctx.fillText(glyph, cx, cy);
          }
        }
      }
      if (lensed.length) {
        lensed.sort((a, b) => a.l - b.l);
        for (const icon of lensed) {
          ctx.globalAlpha = icon.alpha;
          ctx.drawImage(pickMip(icon.size * dpr), icon.x - icon.size / 2, icon.y - icon.size / 2, icon.size, icon.size);
        }
      }
      ctx.globalAlpha = 1;

      raf = alive ? requestAnimationFrame(frame) : 0;
    };

    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const local = (e: PointerEvent) => {
      const r = cachedHostRect || host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      updateHostRect();
      const p = local(e);
      target.x = pos.x = p.x;
      target.y = pos.y = p.y;
      inside = true;
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const p = local(e);
      target.x = p.x;
      target.y = p.y;
      if (!inside) onEnter(e);
    };
    const onLeave = () => {
      inside = false;
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(host);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", updateHostRect, { passive: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", updateHostRect);
    };
  }, [ramp, cellWidth, cellHeight, fontSize, radius, decay, color, maxAlpha, safeSelector, glyphSrc, lens, lensRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
    />
  );
};

export default AsciiHoverField;
