import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PopButton } from "@/components/ui/pop-button";
import contactImgWebp from "@/assets/contact-img.webp";

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

export const FaqSection: React.FC = () => {
  const navigate = useNavigate();
  // 2nd question open by default matching reference image
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // Content entrance animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleQuestion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-24 sm:pb-32 md:pb-36 bg-[#f6f6f6] border-t border-[#cecece] font-['Switzer'] select-none overflow-hidden"
    >
      {/* Symmetrical container with matching left/right padding and boundary alignment */}
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        {/* 1. Header (Exact from Image 1) */}
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <h2
            className="text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-[550] text-[#000000] tracking-[-0.035em] leading-[1.1] m-0"
            style={{ fontFamily: "'Switzer', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="mt-3 sm:mt-3.5 text-[15px] sm:text-[17px] md:text-[18px] text-[#555555] font-[450] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Switzer', sans-serif" }}
          >
            Here are some of the most common questions we get.
          </p>
        </div>

        {/* 2. Bento Layout (0px Corners, compact fit, grey borders between questions) */}
        <div
          ref={contentRef}
          className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 md:gap-5 items-start"
        >
          {/* Left Column Card: "Book an Intro Call" (Compact, tightly fitted, 0px corners) */}
          <div
            style={{ borderRadius: "0px" }}
            className="lg:col-span-4 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white p-6 sm:p-7 flex flex-col h-fit self-start border border-neutral-800 shadow-sm"
          >
            {/* Top: Avatar */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-white/20 shadow-sm mb-4.5 bg-neutral-800">
              <img
                src={contactImgWebp}
                alt="Creative Director Profile"
                className="w-full h-full object-cover object-top select-none"
                loading="lazy"
              />
            </div>

            {/* Title & Description */}
            <h3
              className="text-[21px] sm:text-[23px] font-[600] text-white tracking-[-0.02em] leading-tight m-0"
              style={{ fontFamily: "'Switzer', sans-serif" }}
            >
              Book an Intro Call
            </h3>
            <p
              className="mt-2 text-[13px] sm:text-[13.5px] text-neutral-400 font-[450] leading-relaxed m-0 mb-5"
              style={{ fontFamily: "'Switzer', sans-serif" }}
            >
              Book a free discovery call to explore our unique creative process.
            </p>

            {/* Bottom: PopButton "Get started" */}
            <PopButton
              color="default"
              size="default"
              onClick={() => navigate("/contact")}
              className="w-full rounded-full py-2.5 px-6 bg-white hover:bg-neutral-100 text-neutral-950 font-['Switzer'] font-[600] text-[14px] shadow-sm transition-all cursor-pointer"
            >
              <span>Get started</span>
            </PopButton>
          </div>

          {/* Right Column: Stacked Questions with 0px Corners and 3.5px Grey Separators */}
          <div
            style={{ borderRadius: "0px" }}
            className="lg:col-span-8 flex flex-col gap-[3.5px] bg-[#dedede] border border-[#cecece] p-[3.5px] shadow-xs"
          >
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleQuestion(idx)}
                  style={{ borderRadius: "0px" }}
                  className="bg-white px-6 sm:px-8 py-5 sm:py-6 cursor-pointer select-none transition-colors duration-200 hover:bg-[#fafafa]"
                >
                  {/* Question Header Row */}
                  <div className="flex items-center justify-between gap-4 w-full">
                    <span
                      className="text-[16px] sm:text-[17px] md:text-[18px] font-[600] text-[#111111] tracking-[-0.015em] leading-snug"
                      style={{ fontFamily: "'Switzer', sans-serif" }}
                    >
                      {item.question}
                    </span>

                    {/* Small Animated Circular + / × button */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-xs"
                      aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                    >
                      <Plus className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                    </motion.div>
                  </div>

                  {/* Heavy, Buttery-Smooth Top-to-Bottom Unfolding Animation with Slide-up Text */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="faq-answer-dropdown"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.52,
                              ease: [0.16, 1, 0.3, 1], // Slow, heavy, buttery smooth downward unfold
                            },
                            opacity: {
                              duration: 0.42,
                              ease: "easeOut",
                            },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: {
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1], // Smooth bottom-to-up fold
                            },
                            opacity: {
                              duration: 0.22,
                              ease: "easeIn",
                            },
                          },
                        }}
                        style={{ transformOrigin: "top" }}
                        className="overflow-hidden will-change-[height,opacity]"
                      >
                        <motion.p
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{
                            duration: 0.46,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.06,
                          }}
                          className="mt-3.5 sm:mt-4 text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#555555] font-[450] m-0 select-none"
                          style={{ fontFamily: "'Switzer', sans-serif" }}
                        >
                          {item.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
