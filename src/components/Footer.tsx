import React, { useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useInView, useMediaQuery } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";
import { CONTACT } from "@/lib/contact";
import vinciFooterWebm from "@/assets/vinci-footer.webm";
import logoImg from "@/assets/logo.webp";
import { PopButton } from "@/components/ui/pop-button";

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const footerRef = useRef<HTMLElement>(null);

  // The video only shows on lg+ screens. Mount it there, and only once the footer is close
  // to the viewport, so phones and first paint never download it.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const nearViewport = useInView(footerRef, { rootMargin: "600px", once: true });
  const showVideo = isDesktop && nearViewport;

  const handleHashClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (location.pathname !== "/") navigate(`/${href}`);
    else scrollToTarget(href);
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative w-full border-t border-black/15 select-none font-['Switzer'] overflow-hidden"
      style={{
        background: "linear-gradient(to right, #808382 0%, #8c8e8d 40%, #8c8e8d 55%, #949998 80%, #9ba0a0 100%)",
      }}
    >
      {/* Main Split: Left content aligned with layout, Right video extends BIG edge-to-edge */}
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-between relative">
        {/* Left Side: Brand + Quick Links + Other Information (Strictly elevated to z-30 isolate above any video fade) */}
        <div className="w-full lg:w-auto lg:max-w-[54%] xl:max-w-[50%] flex flex-col justify-between pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-14 pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-[max(1.5rem,calc((100vw-1300px)/2+1.5rem))] pr-4 lg:pr-8 relative z-30 isolate shrink-0">
          <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-8 md:gap-10 lg:gap-11">
            {/* 1. Brand Block: Identical logo capsule to Navbar + description + PopButtons */}
            <div className="flex flex-col items-start w-full sm:w-[210px] md:w-[220px] shrink-0">
              <Link to="/" className="flex items-center gap-2.5 select-none no-underline group cursor-pointer">
                {/* Logo Capsule identical to Navbar */}
                <div className="w-10 h-10 rounded-full border border-neutral-300/90 bg-[#f8f8f8] overflow-hidden flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] shrink-0">
                  <img
                    src={logoImg}
                    alt="ProtoVinci Logo"
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full scale-110"
                  />
                </div>
                <span className="font-['Switzer'] font-[750] text-[20px] sm:text-[22px] tracking-[-0.02em] text-[#000000]">
                  ProtoVinci
                </span>
              </Link>

              {/* Short Brand Description */}
              <p className="mt-3.5 mb-5 font-['Switzer'] text-[14px] sm:text-[14.5px] text-[#000000] font-[500] leading-relaxed max-w-[240px] m-0">
                A full-service technology and digital solutions agency helping businesses build, automate and grow.
              </p>

              {/* PopButtons for Social Links: X, LinkedIn, Instagram */}
              <div className="flex items-center gap-2.5">
                {/* 1. X */}
                <PopButton
                  asChild
                  color="black"
                  size="sm"
                  className="w-9 h-9 rounded-full p-0 flex items-center justify-center cursor-pointer shadow-sm text-white no-underline"
                >
                  <a
                    href="https://x.com/protovincistdio"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </PopButton>

                {/* 2. LinkedIn */}
                <PopButton
                  asChild
                  color="black"
                  size="sm"
                  className="w-9 h-9 rounded-full p-0 flex items-center justify-center cursor-pointer shadow-sm text-white no-underline"
                >
                  <a
                    href="https://www.linkedin.com/company/protovinci/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                </PopButton>

                {/* 3. Instagram */}
                <PopButton
                  asChild
                  color="black"
                  size="sm"
                  className="w-9 h-9 rounded-full p-0 flex items-center justify-center cursor-pointer shadow-sm text-white no-underline"
                >
                  <a
                    href="https://www.instagram.com/protovinci?psln=MTdwNTc5OXI0cnVhNA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </PopButton>
              </div>
            </div>

            {/* Middle Columns: Quick Links + Other Information shifted left, strictly z-30 isolate */}
            <div className="flex flex-wrap gap-x-10 gap-y-8 sm:gap-8 md:gap-10 shrink-0 relative z-30 isolate">
              {/* Quick links Column */}
              <div className="flex flex-col min-w-[100px]">
                <h3 className="font-['Switzer'] font-[750] text-[15px] sm:text-[16px] text-[#000000] mb-3.5 tracking-tight">
                  Quick links
                </h3>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  <li>
                    <Link
                      to="/"
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block"
                    >
                      Homepage
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/projects"
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      onClick={(e) => handleHashClick(e, "#faq")}
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              {/* Other Information Column: Solid Black, High Contrast, strictly z-30 isolate */}
              <div className="flex flex-col min-w-[125px]">
                <h3 className="font-['Switzer'] font-[750] text-[15px] sm:text-[16px] text-[#000000] mb-3.5 tracking-tight">
                  Other Information
                </h3>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block break-all"
                    >
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <span className="font-['Switzer'] text-[14px] text-[#000000] font-[600] block whitespace-nowrap">
                      {CONTACT.location}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Big Edge-to-Edge Video (Desktop only, hidden on mobile) */}
        <div className="hidden lg:flex flex-1 relative self-stretch items-center justify-end overflow-hidden z-10 min-w-0">
          {/* Seamless Transition Fade Overlay on Left Edge of Video, strictly z-0 under content */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-24 md:w-28 lg:w-32 z-0 bg-gradient-to-r from-[#8c8e8d] via-[#8c8e8d]/50 to-transparent"
            aria-hidden="true"
          />

          {showVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              className="w-full h-full object-cover object-center block"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 70px, black 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 70px, black 100%)",
              }}
            >
              <source src={vinciFooterWebm} type="video/webm" />
            </video>
          )}
        </div>
      </div>

      {/* Bottom Bar: Seam line & Copyright aligned with left boundary */}
      <div className="w-full border-t border-black/15 py-6 sm:py-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[max(1.5rem,calc((100vw-1300px)/2+1.5rem))] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left relative z-30 isolate">
        <p className="font-['Switzer'] text-[13px] text-[#000000] font-[600] m-0">
          © 2026 ProtoVinci. All rights reserved.
        </p>
        <p className="font-['Switzer'] text-[13px] text-[#000000] font-[600] m-0">
          Crafted with Purpose
        </p>
      </div>
    </footer>
  );
};

export default Footer;
