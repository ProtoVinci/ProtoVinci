import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Pause, Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "@/components/ui/section-label";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

// Time each slide stays put before the row advances by one card
const AUTOPLAY_MS = 4500;
const SLIDE_MS = 700;
const SLIDE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
// Copies of the first cards appended after the last, so the loop never shows a gap (= most cards visible at once)
const CLONES = 3;
const SWIPE_THRESHOLD = 50;

const COUNT = TESTIMONIALS.length;
const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, CLONES)];

const initials = (text: string) =>
  text
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const QuoteMark: React.FC = () => (
  <svg viewBox="0 0 32 24" className="w-8 h-6 text-[#09090b]" fill="currentColor" aria-hidden="true">
    <path d="M0 24V14.4C0 6.6 4.1 1.8 12.3 0l1.4 3.1C9.4 4.4 7.2 7 7 10.8h6V24H0Zm18 0V14.4C18 6.6 22.1 1.8 30.3 0l1.4 3.1c-4.3 1.3-6.5 3.9-6.7 7.7h6V24H18Z" />
  </svg>
);

const TestimonialCard: React.FC<{ item: Testimonial; clone: boolean }> = ({ item, clone }) => (
  <figure className="m-0 flex h-full flex-col justify-between gap-8 rounded-[20px] border border-[#e2e2e2] bg-white p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-shadow duration-500 hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)]">
    <div>
      <QuoteMark />
      <blockquote className="m-0 mt-5 text-[15.5px] sm:text-[16.5px] font-[450] leading-[1.65] text-[#4b5563]">
        {item.quote}
      </blockquote>
      <div className="mt-5 flex items-center gap-1" role="img" aria-label={`Rated ${item.rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-[18px] h-[18px] ${i < item.rating ? "text-[#09090b] fill-[#09090b]" : "text-[#cecece]"}`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>

    <figcaption className="flex items-center gap-4">
      <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden border border-[#e2e2e2] bg-[#09090b] flex items-center justify-center">
        {item.logo ? (
          <img
            src={item.logo}
            alt={`${item.project} logo`}
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full h-full object-cover bg-white"
            style={
              item.logoZoom
                ? { transform: `scale(${item.logoZoom})`, transformOrigin: item.logoFocus ?? "50% 50%" }
                : undefined
            }
          />
        ) : (
          <span className="text-[15px] font-[650] tracking-[0.04em] text-white" aria-hidden="true">
            {initials(item.project)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="m-0 text-[16.5px] sm:text-[17px] font-[600] tracking-[-0.01em] text-[#09090b]">{item.name}</p>
        <p className="m-0 mt-0.5 text-[13.5px] font-[500] leading-snug text-[#6b7280]">{item.role}</p>
        <Link
          to={`/projects/${item.projectId}`}
          tabIndex={clone ? -1 : undefined}
          draggable={false}
          className="mt-1 inline-block text-[13px] font-[600] text-[#09090b] underline decoration-[#cecece] underline-offset-[3px] transition-colors hover:decoration-[#09090b]"
        >
          {item.project}
        </Link>
      </div>
    </figcaption>
  </figure>
);

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  // Position state lives in refs: the row is moved by writing its transform directly, never by re-rendering
  const indexRef = useRef(0);
  const stepRef = useRef(0);
  const lastMoveRef = useRef(0);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const dragRef = useRef<{ id: number; startX: number; dx: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const place = useCallback((target: number, animate: boolean, offset = 0) => {
    const track = trackRef.current;
    if (!track) return;
    if (!stepRef.current) {
      const card = track.querySelector("li");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      stepRef.current = (card?.getBoundingClientRect().width || 0) + gap;
    }
    track.style.transition = animate ? `transform ${SLIDE_MS}ms ${SLIDE_EASE}` : "none";
    track.style.transform = `translate3d(${-target * stepRef.current + offset}px, 0, 0)`;
    indexRef.current = target;
  }, []);

  const next = useCallback(() => {
    lastMoveRef.current = performance.now();
    // Mid-wrap (sitting on a clone): settle first, then move
    if (indexRef.current >= COUNT) {
      place(indexRef.current - COUNT, false);
      void trackRef.current?.offsetWidth;
    }
    place(indexRef.current + 1, true);
  }, [place]);

  const prev = useCallback(() => {
    lastMoveRef.current = performance.now();
    // From the first card, jump (invisibly) to its clone so there is a card to slide back to
    if (indexRef.current === 0) {
      place(COUNT, false);
      void trackRef.current?.offsetWidth;
    }
    place(indexRef.current - 1, true);
  }, [place]);

  // After sliding onto the clones, snap back to the matching real card - it looks identical
  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    if (indexRef.current >= COUNT) place(indexRef.current - COUNT, false);
  };

  // Measure one step (card width + gap) and keep the current card aligned on resize
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const card = track.querySelector("li");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      stepRef.current = card.getBoundingClientRect().width + gap;
      place(indexRef.current % COUNT, false);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [place]);

  // Autoplay: advance automatically when not paused and not hovered/dragging
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      if (hoverRef.current || focusRef.current || dragRef.current || document.hidden) {
        return;
      }
      next();
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [paused, next]);

  // Entrance
  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headerRef.current, viewportRef.current],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Touch / pen swipe (mouse uses the arrows). touch-action: pan-y keeps vertical page scrolling native.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    if (indexRef.current === 0) place(COUNT, false); // so there is a card on both sides
    if (indexRef.current > COUNT) place(indexRef.current - COUNT, false);
    dragRef.current = { id: e.pointerId, startX: e.clientX, dx: 0 };
    try {
      viewportRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // Pointer already released (e.g. a cancelled touch); the drag still works without capture
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    drag.dx = e.clientX - drag.startX;
    place(indexRef.current, false, drag.dx);
  };
  const endDrag = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    lastMoveRef.current = performance.now();
    if (drag.dx <= -SWIPE_THRESHOLD) {
      // Swap a clone for its identical real card *with* the current drag offset, so the slide starts where the finger let go
      if (indexRef.current >= COUNT) place(indexRef.current - COUNT, false, drag.dx);
      next();
    } else if (drag.dx >= SWIPE_THRESHOLD) {
      prev(); // index is never 0 here (pointerdown moved it onto the clones), so prev() animates from the dragged spot
    } else {
      place(indexRef.current, true);
    }
  };

  const controlClass =
    "w-10 h-10 rounded-full border border-[#cecece] bg-white text-[#09090b] flex items-center justify-center transition-all duration-200 hover:border-[#09090b] hover:bg-[#09090b] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-14 sm:pb-20 md:pb-24 bg-[#f6f6f6] border-t border-[#cecece] font-['Switzer'] overflow-hidden"
    >
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <div className="mb-2.5 sm:mb-3">
            <SectionLabel>Testimonials</SectionLabel>
          </div>
          <h2
            id="testimonials-title"
            className="m-0 text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-[550] tracking-[-0.035em] leading-[1.1] text-black"
          >
            Loved by the <span className="text-[#6b7280]">people</span> we build for
          </h2>
          <p className="m-0 mt-3 sm:mt-3.5 text-[15px] sm:text-[17px] md:text-[18px] text-[#555555] font-[450] max-w-xl leading-relaxed">
            Founders, educators and growing businesses on what it's like to work with ProtoVinci.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 flex justify-end gap-2.5">
          <button
            type="button"
            className={controlClass}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play testimonials" : "Pause testimonials"}
          >
            {paused ? <Play className="w-4 h-4" strokeWidth={2} /> : <Pause className="w-4 h-4" strokeWidth={2} />}
          </button>
          <button type="button" className={controlClass} onClick={prev} aria-label="Previous testimonial">
            <ChevronLeft className="w-4.5 h-4.5" strokeWidth={2} />
          </button>
          <button type="button" className={controlClass} onClick={next} aria-label="Next testimonial">
            <ChevronRight className="w-4.5 h-4.5" strokeWidth={2} />
          </button>
        </div>

        {/* Vertical padding (offset by negative margin) keeps the cards' hover shadow from being clipped */}
        <div
          ref={viewportRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="-mt-2 -mb-6 py-6 overflow-hidden touch-pan-y select-none"
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
          onPointerEnter={() => {
            hoverRef.current = true;
          }}
          onPointerLeave={() => {
            hoverRef.current = false;
          }}
          onFocus={() => (focusRef.current = true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) focusRef.current = false;
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <ul
            ref={trackRef}
            onTransitionEnd={onTransitionEnd}
            className="flex gap-4 sm:gap-5 m-0 p-0 list-none will-change-transform"
          >
            {SLIDES.map((item, i) => {
              const clone = i >= COUNT;
              return (
                <li
                  key={`${item.id}-${i}`}
                  aria-hidden={clone || undefined}
                  className="shrink-0 basis-[86%] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
                >
                  <div
                    role={clone ? undefined : "group"}
                    aria-roledescription={clone ? undefined : "slide"}
                    aria-label={clone ? undefined : `${i + 1} of ${COUNT}`}
                    className="h-full w-full"
                  >
                    <TestimonialCard item={item} clone={clone} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
