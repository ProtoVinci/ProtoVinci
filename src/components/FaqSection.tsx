import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Plus } from "lucide-react";
import { useGoToContactForm } from "@/lib/useContactNav";
import { SectionLabel } from "@/components/ui/section-label";
import { PopButton } from "@/components/ui/pop-button";
import contactImgWebp from "@/assets/contact-avatar.webp";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "hire-developer",
    question: "Why not just hire a full-time developer?",
    answer:
      "Hiring in-house is costly, experienced designers can exceed $100k and developers $120k annually, not including the benefits. We deliver senior-level expertise at a fraction of the cost.",
  },
  {
    id: "delivery-time",
    question: "How fast can you deliver my project?",
    answer:
      "Timelines depend on scope, but most projects wrap up within 2-6 weeks. After our initial discussion, you'll receive a clear timeline with milestones.",
  },
  {
    id: "satisfaction",
    question: "What if I'm not satisfied with the outcome?",
    answer:
      "It's rare, but if you're not fully happy, we include unlimited revisions within the project scope. We'll refine until the final product matches your vision.",
  },
  {
    id: "communication",
    question: "How will we talk throughout the project?",
    answer:
      "We typically communicate through Discord, Whatsapp, Telegram or Slack (or your preferred platform) and schedule regular check-ins. You'll always know the progress and have direct access to us when needed.",
  },
  {
    id: "support",
    question: "Do you provide support after the launch?",
    answer:
      "Absolutely. We offer end-to-end support and maintenance plans so your website stays secure, optimized, and up-to-date long after launch.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export const FaqSection: React.FC = () => {
  const goToContactForm = useGoToContactForm();
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-faq-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full py-20 sm:py-24 md:py-32 bg-[#f6f6f6] border-t border-[#d9d9d9] font-['Switzer']"
    >
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16">
        {/* Left: heading and contact prompt, sticky on desktop */}
        <div className="lg:col-span-5 lg:sticky lg:top-[112px] self-start" data-faq-reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2
            id="faq-heading"
            className="m-0 mt-5 text-[40px] sm:text-[52px] lg:text-[60px] font-[600] leading-[1] tracking-[-0.045em] text-black"
          >
            Questions,
            <br />
            <span className="text-neutral-400">answered.</span>
          </h2>
          <p className="m-0 mt-5 text-[16px] sm:text-[17px] leading-[1.55] font-[450] text-neutral-600 max-w-[400px]">
            Everything you need to know about working with us - timelines, revisions, communication and support.
          </p> 

          <div className="mt-10 pt-6 border-t border-neutral-300 flex items-center gap-4 max-w-[400px]">
            <img
              src={contactImgWebp}
              alt=""
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
              className="w-12 h-12 rounded-full object-cover object-top bg-neutral-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="m-0 text-[15px] font-[600] text-black leading-tight">Still have questions?</p>
              <p className="m-0 mt-1 text-[14px] font-[450] text-neutral-500 leading-snug">
                Book a free discovery call with our team.
              </p>
            </div>
          </div>
          <PopButton
            color="black"
            size="default"
            onClick={goToContactForm}
            className="mt-5 rounded-full pl-6 pr-2 h-12 text-[15px] font-[550] text-white cursor-pointer shadow-md hover:shadow-lg gap-3"
          >
            <span>Book an intro call</span>
            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </PopButton>
        </div>

        {/* Right: numbered accordion separated by hairlines */}
        <ul className="lg:col-span-7 m-0 p-0 list-none border-t border-neutral-300" data-faq-reveal>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <li key={item.id} className="border-b border-neutral-300">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="group w-full flex items-start gap-4 sm:gap-6 py-6 sm:py-7 text-left font-['Switzer'] cursor-pointer bg-transparent border-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <span
                      className="pt-[5px] w-6 shrink-0 text-[13px] font-[600] tabular-nums text-neutral-400"
                      aria-hidden="true"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-[18px] sm:text-[21px] font-[550] leading-[1.3] tracking-[-0.02em] transition-colors duration-200 ${
                        isOpen ? "text-black" : "text-neutral-800 group-hover:text-black"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? "bg-black border-black text-white"
                          : "bg-white border-neutral-300 text-black group-hover:border-black"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus
                        className={`w-4 h-4 stroke-[2.25] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: { height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.35 } },
                      }}
                      exit={
                        reduceMotion
                          ? { opacity: 0, transition: { duration: 0 } }
                          : {
                              height: 0,
                              opacity: 0,
                              transition: { height: { duration: 0.38, ease: EASE }, opacity: { duration: 0.2 } },
                            }
                      }
                      className="overflow-hidden"
                    >
                      <p className="m-0 pb-7 pl-10 sm:pl-12 pr-12 sm:pr-16 text-[15px] sm:text-[16px] leading-[1.65] font-[450] text-neutral-600 max-w-[640px]">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqSection;
