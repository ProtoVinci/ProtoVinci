import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/** Reactive matchMedia - re-renders only when the query result flips. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * True while the element is within `rootMargin` of the viewport.
 * Used to pause WebGL / looping animations and lazy-mount media that is off-screen.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = "0px", once = false }: { rootMargin?: string; once?: boolean } = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
