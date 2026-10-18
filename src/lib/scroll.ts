import type Lenis from "lenis";

export const getLenis = () => (window as unknown as { lenis?: Lenis }).lenis;

/** Instantly jump to the top — keeps Lenis' internal position in sync with the window. */
export function scrollToTop() {
  window.scrollTo(0, 0);
  getLenis()?.scrollTo(0, { immediate: true, force: true });
}

/**
 * Smooth-scroll to a selector or element through Lenis.
 * Native scrollIntoView({behavior:"smooth"}) fights Lenis' own interpolation and stutters.
 */
export function scrollToTarget(target: string | HTMLElement, offset = -60) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    // Lenis re-measures page height on a 250ms debounce. Right after a lazy route mounts its
    // limit is still the loading screen's, which would clamp the target to ~0 — re-measure now.
    lenis.resize();
    lenis.scrollTo(el, { offset, duration: 1.2 });
  }
  else el.scrollIntoView({ behavior: "smooth" });
}
