import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_PROJECTS } from "@/data/projects";
import { useInView } from "@/lib/hooks";

// Only the cards visible on first paint load eagerly; the rest wait until they scroll into view.
const EAGER_COUNT = 3;
// Seconds for one full loop of the row at normal speed
const LOOP_SECONDS = 70;
// Time constant of the row's slow-down / speed-up (exponential ease; ~95% settled after 3x this)
const RATE_TAU = 0.22;
// Hover intent: once a card is in the spotlight, the pointer must rest on another card this long
// before it takes over, so crossing cards on the way to the centred one doesn't steal it.
const SWITCH_DELAY_MS = 140;
// How long a card that just left the spotlight stays layered above its neighbours (matches the CSS transition)
const SETTLE_MS = 800;
// Spotlight geometry (applied through CSS vars on .hero-ticker-item.is-active)
const MAX_ACTIVE_SCALE = 1.4;
const MIN_ACTIVE_SCALE = 1.1; // on short screens the card grows less so it fits under the CTA
const LIFT = 0.2; // default rise, as a fraction of the card's height
const VIEWPORT_MARGIN = 24; // px kept clear between the raised card and the viewport edges
const CEILING_GAP = 16; // px kept clear below the element passed as `ceilingRef`

const CardSet: React.FC<{ setId: "a" | "b"; activeKey: string | null; leavingKey: string | null }> = ({
  setId,
  activeKey,
  leavingKey,
}) => {
  const clone = setId === "b";
  return (
    // The cloned set exists only to make the loop seamless: hidden from assistive tech and the tab order,
    // but still hoverable/clickable, since it's half of what's on screen at any moment.
    <ul className="hero-ticker-set" aria-hidden={clone || undefined}>
      {ALL_PROJECTS.map((project, idx) => {
        const key = `${setId}-${project.id}`;
        const state = activeKey === key ? " is-active" : leavingKey === key ? " is-leaving" : "";
        return (
          <li key={project.id} data-card-key={key} className={`hero-ticker-item${state}`}>
            {/* The link is an untransformed box, so its hover target never shifts while the visual animates */}
            <Link
              to={`/projects/${project.id}`}
              aria-label={`View ${project.name} project`}
              tabIndex={clone ? -1 : undefined}
              className="hero-card-hit block h-full w-full outline-none"
            >
              <div className="hero-card">
                <span className="relative block h-full w-full overflow-hidden rounded-[14px] bg-[#e4e4e7]">
                  <img
                    src={project.landingImage}
                    alt=""
                    width={1600}
                    height={800}
                    loading={!clone && idx < EAGER_COUNT ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </span>
                {/* Solid chip: a backdrop blur here would be re-rendered every frame as the row moves */}
                <span className="hero-mono absolute left-4 bottom-4 z-10 inline-flex items-center gap-2 rounded-[4px] bg-white/95 px-2 py-[3px] text-[12px] font-semibold leading-[20px] text-[#09090b] shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#09090b]/60" aria-hidden="true" />
                  {project.name}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

/** Infinite, skewed ticker of project cards; hovering one glides the row to a stop and brings that card to centre stage. */
export const HeroShowcase: React.FC<{ ceilingRef?: React.RefObject<HTMLElement | null> }> = ({ ceilingRef }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLElement | null>(null);
  const inView = useInView(rootRef, { rootMargin: "100px" });

  // Marquee state lives in refs: it changes every frame and must never trigger a React render.
  const offsetRef = useRef(0);
  const rateRef = useRef(1);
  const targetRateRef = useRef(1);
  const setWidthRef = useRef(0);
  const needsRecentreRef = useRef(false);

  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pendingKeyRef = useRef<string | null>(null);
  const activeKeyRef = useRef<string | null>(null);
  const lastPointerRef = useRef({ x: -1, y: -1 });
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [leavingKey, setLeavingKey] = useState<string | null>(null);

  const getItem = (key: string) =>
    trackRef.current?.querySelector<HTMLElement>(`[data-card-key="${key}"]`) ?? null;

  /** Offset that puts the item's (untransformed) slot at the viewport's horizontal centre, after the row drifts `drift` px further left. */
  const centreOffset = (item: HTMLElement, drift = 0) => {
    const rect = item.getBoundingClientRect();
    return Math.round(window.innerWidth / 2 - (rect.left + rect.width / 2) + drift);
  };

  /**
   * Vertical lift and scale. Priority: the enlarged card is fully inside the viewport, then it stays clear
   * of the element above (the CTA) - shrinking toward MIN_ACTIVE_SCALE on short screens to make room -
   * then it rises by LIFT.
   */
  const lift = (item: HTMLElement) => {
    const rect = item.getBoundingClientRect();
    const ceiling = ceilingRef?.current?.getBoundingClientRect().bottom ?? -Infinity;
    const top = Math.max(VIEWPORT_MARGIN, ceiling + CEILING_GAP);
    const room = window.innerHeight - VIEWPORT_MARGIN - top;
    const scale = Math.max(MIN_ACTIVE_SCALE, Math.min(MAX_ACTIVE_SCALE, room / rect.height));

    const half = (rect.height * scale) / 2;
    const slotCentre = rect.top + rect.height / 2;
    let target = slotCentre - rect.height * LIFT;
    target = Math.max(target, top + half); // clear of the CTA
    target = Math.min(target, window.innerHeight - VIEWPORT_MARGIN - half); // bottom on screen
    target = Math.max(target, VIEWPORT_MARGIN + half); // top on screen
    return { dy: Math.round(target - slotCentre), scale: Math.round(scale * 1000) / 1000 };
  };

  const place = (item: HTMLElement, drift = 0) => {
    const { dy, scale } = lift(item);
    item.style.setProperty("--hero-dx", `${centreOffset(item, drift)}px`);
    item.style.setProperty("--hero-dy", `${dy}px`);
    item.style.setProperty("--hero-scale", `${scale}`);
  };

  // The marquee: one rAF loop owns both position and speed, so slowing down never desyncs from the motion.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    firstSetRef.current = track.querySelector("ul");
    const measure = () => {
      setWidthRef.current = firstSetRef.current?.offsetWidth ?? 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (firstSetRef.current) ro.observe(firstSetRef.current);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000); // clamp after tab switches
      last = now;

      const target = targetRateRef.current;
      rateRef.current += (target - rateRef.current) * (1 - Math.exp(-dt / RATE_TAU));
      if (Math.abs(target - rateRef.current) < 0.002) rateRef.current = target;

      const setWidth = setWidthRef.current;
      if (setWidth > 0 && rateRef.current > 0) {
        offsetRef.current = (offsetRef.current + (setWidth / LOOP_SECONDS) * rateRef.current * dt) % setWidth;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      // Once fully stopped, correct any small error in the predicted landing spot (the CSS transition retargets smoothly)
      if (needsRecentreRef.current && rateRef.current === 0) {
        needsRecentreRef.current = false;
        const item = activeKeyRef.current ? getItem(activeKeyRef.current) : null;
        if (item) place(item);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // place/getItem only read refs; the loop restarts when the ticker scrolls in or out of view
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const setActive = (key: string | null) => {
    const previous = activeKeyRef.current;
    if (previous === key) return;
    activeKeyRef.current = key;
    setActiveKey(key);
    // The card leaving the spotlight stays layered above its neighbours (but below the new one) while it settles
    if (previous) {
      clearTimeout(settleTimerRef.current);
      setLeavingKey(previous);
      settleTimerRef.current = setTimeout(() => setLeavingKey(null), SETTLE_MS);
    }
  };

  const activate = (key: string) => {
    const item = getItem(key);
    if (!item) return;
    // The row may still be slowing down. With an exponential ease it still travels speed * rate * tau,
    // so aim where the card will be once it stops.
    const speed = setWidthRef.current / LOOP_SECONDS;
    place(item, speed * rateRef.current * RATE_TAU);
    needsRecentreRef.current = rateRef.current > 0;
    setActive(key);
  };

  const clearPending = () => {
    clearTimeout(switchTimerRef.current);
    pendingKeyRef.current = null;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    // Ignore synthetic moves fired when cards slide under a still cursor
    if (e.clientX === lastPointerRef.current.x && e.clientY === lastPointerRef.current.y) return;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };

    const key = (e.target as Element).closest<HTMLElement>("[data-card-key]")?.dataset.cardKey;
    if (!key || key === activeKeyRef.current) {
      clearPending();
      return;
    }
    if (activeKeyRef.current === null) {
      activate(key);
      return;
    }
    if (pendingKeyRef.current === key) return;
    clearPending();
    pendingKeyRef.current = key;
    switchTimerRef.current = setTimeout(() => {
      pendingKeyRef.current = null;
      activate(key);
    }, SWITCH_DELAY_MS);
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") targetRateRef.current = 0;
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearPending();
    needsRecentreRef.current = false;
    setActive(null);
    lastPointerRef.current = { x: -1, y: -1 };
    targetRateRef.current = 1;
  };

  useEffect(
    () => () => {
      clearTimeout(switchTimerRef.current);
      clearTimeout(settleTimerRef.current);
    },
    [],
  );

  return (
    <div
      ref={rootRef}
      className="hero-ticker"
      role="region"
      aria-label="Selected projects"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      // Keyboard users tabbing through cards get a still row
      onFocus={() => (targetRateRef.current = 0)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) targetRateRef.current = 1;
      }}
    >
      <div ref={trackRef} className="hero-ticker-track">
        <CardSet setId="a" activeKey={activeKey} leavingKey={leavingKey} />
        <CardSet setId="b" activeKey={activeKey} leavingKey={leavingKey} />
      </div>
    </div>
  );
};

export default HeroShowcase;
