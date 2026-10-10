import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import vinciFooterWebm from "@/assets/vinci-footer.webm";
import vinciFooterMp4 from "@/assets/vinci-footer.mp4";
import logoImg from "@/assets/Logo.png";
import { PopButton } from "@/components/ui/pop-button";

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      id="footer"
      className="relative w-full border-t border-black/15 select-none font-['Switzer'] overflow-hidden"
      style={{
        background: "linear-gradient(to right, #808382 0%, #8c8e8d 40%, #8c8e8d 55%, #949998 80%, #9ba0a0 100%)",
      }}
    >
      {/* Main Split: Left content aligned with layout, Right video extends BIG edge-to-edge */}
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-between relative">
        {/* Left Side: Brand + Quick Links + Other Information (Strictly elevated to z-30 isolate above any video fade) */}
        <div className="w-full lg:w-auto lg:max-w-[54%] xl:max-w-[50%] flex flex-col justify-between pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-14 pl-6 sm:pl-10 md:pl-12 lg:pl-16 xl:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] pr-6 lg:pr-10 relative z-30 isolate shrink-0">
          <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-8 md:gap-10 lg:gap-11">
            {/* 1. Brand Block: Identical logo capsule to Navbar + description + PopButtons */}
            <div className="flex flex-col items-start w-full sm:w-[210px] md:w-[220px] shrink-0">
              <Link to="/" className="flex items-center gap-2.5 select-none no-underline group cursor-pointer">
                {/* Logo Capsule identical to Navbar */}
                <div className="w-10 h-10 rounded-full border border-neutral-300/90 bg-[#f8f8f8] overflow-hidden flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] shrink-0">
                  <img
                    src={logoImg}
                    alt="ProtoVinci Logo"
                    className="w-full h-full object-cover rounded-full scale-110"
                  />
                </div>
                <span className="font-['Switzer'] font-[750] text-[20px] sm:text-[22px] tracking-[-0.02em] text-[#000000]">
                  ProtoVinci
                </span>
              </Link>

              {/* Short Brand Description */}
              <p className="mt-3.5 mb-5 font-['Switzer'] text-[14px] sm:text-[14.5px] text-[#000000] font-[500] leading-relaxed max-w-[240px] m-0">
                A premium design agency engineered to scale modern brands and products.
              </p>

              {/* PopButtons for Social Links */}
              {/* Note: Update these links with your custom URLs */}
              <div className="flex items-center gap-2.5">
                {/* X / Twitter */}
                <PopButton
                  color="black"
                  size="sm"
                  className="w-9 h-9 rounded-full p-0 flex items-center justify-center cursor-pointer shadow-sm text-white"
                  onClick={() => window.open("https://x.com", "_blank")}
                  aria-label="X (Twitter)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </PopButton>

                {/* Instagram / Facebook */}
                <PopButton
                  color="black"
                  size="sm"
                  className="w-9 h-9 rounded-full p-0 flex items-center justify-center cursor-pointer shadow-sm text-white"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </PopButton>

                {/* Dribbble / Web */}
                <PopButton
                  color="black"
                  size="sm"
                  className="w-9 h-9 rounded-full p-0 flex items-center justify-center cursor-pointer shadow-sm text-white"
                  onClick={() => window.open("https://dribbble.com", "_blank")}
                  aria-label="Dribbble"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
                  </svg>
                </PopButton>

                {/* YouTube */}
                <PopButton
                  color="black"
                  size="sm"
                  className="w-9 h-9 rounded-full p-0 flex items-center justify-center cursor-pointer shadow-sm text-white"
                  onClick={() => window.open("https://youtube.com", "_blank")}
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </PopButton>
              </div>
            </div>

            {/* Middle Columns: Quick Links + Other Information shifted left, strictly z-30 isolate */}
            <div className="flex gap-7 sm:gap-8 md:gap-10 shrink-0 relative z-30 isolate">
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
                    <a
                      href="#services"
                      onClick={(e) => handleHashClick(e, "#services")}
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block"
                    >
                      Services
                    </a>
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
                      href="tel:+12345678900"
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block whitespace-nowrap"
                    >
                      +123 456 789 00
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:Pixello@gmail.com"
                      className="font-['Switzer'] text-[14px] text-[#000000] hover:text-neutral-700 transition-colors font-[600] no-underline block"
                    >
                      Pixello@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="font-['Switzer'] text-[14px] text-[#000000] font-[600] block whitespace-nowrap">
                      California, USA
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

          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center block"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 70px, black 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 70px, black 100%)",
            }}
          >
            <source src={vinciFooterWebm} type="video/webm" />
            <source src={vinciFooterMp4} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Bottom Bar: Seam line & Copyright aligned with left boundary */}
      <div className="w-full border-t border-black/15 py-6 sm:py-7 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left relative z-30 isolate">
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
