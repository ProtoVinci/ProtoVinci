import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Pointer } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroShowcase } from "@/components/HeroShowcase";
import { useInView } from "@/lib/hooks";
import { useGoToContactForm } from "@/lib/useContactNav";

// One tag per service, in the same order as data/services
const TAGS = [
  "Web Development",
  "Custom Software",
  "Mobile Apps",
  "Cloud Solutions",
  "Maintenance",
  "AI Solutions",
  "Automation",
  "API Integrations",
  "UI/UX Design",
  "Video Editing",
];

// Headline lines; `muted` words take the soft grey accent.
const HEADLINE: { text: string; muted?: boolean }[][] = [
  [{ text: "Build," }, { text: "automate", muted: true }, { text: "and" }, { text: "grow" }],
  [{ text: "with" }, { text: "endless" }, { text: "solutions." }],
];

const CTA_LABEL = "Let's talk...";

const TagList: React.FC<{ clone?: boolean }> = ({ clone = false }) => (
  <ul className="hero-tags-set" aria-hidden={clone || undefined}>
    {TAGS.map((tag) => (
      <li
        key={tag}
        className="hero-mono inline-flex shrink-0 items-center gap-2 rounded-[4px] bg-[rgba(152,152,163,0.1)] px-2 py-[2px] text-[13px] sm:text-[14px] font-semibold leading-[22px] text-[#09090b]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#09090b]/55" aria-hidden="true" />
        {tag}
      </li>
    ))}
  </ul>
);

/** Each letter is stacked on a copy of itself; on hover the stack rolls up one line, letter by letter. */
const RollingText: React.FC<{ text: string }> = ({ text }) => (
  <span className="relative inline-flex overflow-hidden" aria-hidden="true">
    {Array.from(text).map((char, i) => (
      <span
        key={i}
        className="hero-roll-letter relative inline-block whitespace-pre"
        style={{ transitionDelay: `${i * 18}ms` }}
      >
        <span className="block">{char}</span>
        <span className="absolute left-0 top-full block">{char}</span>
      </span>
    ))}
  </span>
);

export const HeroSection: React.FC = () => {
  const goToContactForm = useGoToContactForm();
  const containerRef = useRef<HTMLElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  // Pause both tickers once the hero has scrolled away
  const inView = useInView(containerRef, { rootMargin: "100px" });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        tagsRef.current,
        { opacity: 0, y: 12, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, clearProps: "filter,transform" },
        0.1,
      );

      const words = headlineRef.current?.querySelectorAll(".hero-word");
      if (words?.length) {
        tl.fromTo(
          words,
          { opacity: 0, y: 24, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.08, clearProps: "filter,transform" },
          0.2,
        );
      }

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
        0.75,
      );

      tl.fromTo(
        showcaseRef.current,
        { opacity: 0, y: 90 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", clearProps: "transform" },
        0.85,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-paused={!inView}
      // At least one full screen tall (svh = with the browser bars showing), so the next section never peeks in.
      // Phones (< 640px): larger cards, and the hero extends just past the screen with the cards anchored to its
      // bottom, so about 90% of each card shows above the fold. Card height = 0.52 × card width.
      className="relative w-full flex flex-col overflow-hidden bg-[linear-gradient(to_bottom,#f4f4f5_0%,#f4f4f5_60%,#e1e1e1_100%)] [--hero-card-w:clamp(260px,76vw,600px)] sm:[--hero-card-w:clamp(280px,40vw,600px)] min-h-[calc(100svh_+_var(--hero-card-w)_*_0.05_+_56px)] sm:min-h-[100svh]"
    >
      <Navbar />

      {/* Phones: this block takes the free height and centres the copy above the cards; sm+: natural height */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1300px] flex-1 flex-col items-center justify-center px-4 pt-page text-center sm:flex-none sm:justify-start sm:px-6">
        {/* Service tags ticker, faded at both ends */}
        <div ref={tagsRef} className="hero-tags w-[260px] max-w-full sm:w-[300px]">
          <span className="sr-only">Services: {TAGS.join(", ")}</span>
          <div className="hero-tags-track" aria-hidden="true">
            <TagList />
            <TagList clone />
          </div>
        </div>

        <h1
          ref={headlineRef}
          className="mt-5 sm:mt-6 max-w-[16ch] sm:max-w-none text-balance text-[clamp(36px,10.8vw,52px)] sm:text-[64px] md:text-[76px] font-[600] leading-[1.08] tracking-[-0.045em] text-[#09090b]"
        >
          {HEADLINE.map((line, lineIdx) => (
            <span key={lineIdx} className="sm:block">
              {line.map((word, wordIdx) => (
                <React.Fragment key={wordIdx}>
                  <span className={`hero-word inline-block ${word.muted ? "text-[#9898a3]" : ""}`}>
                    {word.text}
                  </span>{" "}
                </React.Fragment>
              ))}
            </span>
          ))}
        </h1>

        <div ref={ctaRef} className="hero-cta mt-7 sm:mt-8 flex items-center gap-4">
          <Pointer
            className="hero-hand h-6 w-6 rotate-90 text-[#09090b]"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={goToContactForm}
            className="hero-cta-button group inline-flex h-[50px] items-center rounded-full bg-black px-6 text-[16px] font-[600] text-white shadow-[0_0.8px_0.8px_-0.6px_rgba(0,0,0,0.13),0_2.4px_2.4px_-1.25px_rgba(0,0,0,0.13),0_6.4px_6.4px_-1.9px_rgba(0,0,0,0.13),0_20px_20px_-2.5px_rgba(0,0,0,0.13)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f4f5]"
          >
            <span className="sr-only">{CTA_LABEL}</span>
            <RollingText text={CTA_LABEL} />
          </button>
        </div>
      </div>

      {/* Above the copy (z-10) so a raised spotlight card is never drawn under the CTA */}
      <div
        ref={showcaseRef}
        className="relative z-20 flex-none sm:flex-1 flex flex-col sm:justify-center mt-12 sm:mt-20 md:mt-[100px] pb-[56px] sm:pb-[clamp(56px,9vw,96px)]"
      >
        <HeroShowcase ceilingRef={ctaRef} />
      </div>
    </section>
  );
};

export default HeroSection;
