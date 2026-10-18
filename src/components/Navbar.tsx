import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.webp";
import { Menu, X } from "lucide-react";
import { PopButton } from "@/components/ui/pop-button";
import { useNavigate, useLocation } from "react-router-dom";
import { getLenis, scrollToTarget } from "@/lib/scroll";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "#services" },
  { name: "FAQs", href: "#faq" },
];

const smoothToTop = () => {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isExpanded = isHovered || mobileMenuOpen;

  const collapse = () => {
    setMobileMenuOpen(false);
    setIsHovered(false);
  };

  // Touch devices never fire mouseleave, so collapse on outside tap or Escape.
  // (Route changes remount the Navbar, since each page renders its own.)
  useEffect(() => {
    if (!isExpanded) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) collapse();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && collapse();
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isExpanded]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsHovered(false), 300);
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    collapse();

    if (href === "/") {
      if (location.pathname === "/") smoothToTop();
      else navigate("/");
      return;
    }

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    // Hash link: on another page, let the router's ScrollManager find the section once it mounts.
    if (location.pathname !== "/") navigate(`/${href}`);
    else scrollToTarget(href);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    collapse();
    if (location.pathname === "/contact") smoothToTop();
    else navigate("/contact");
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // On touch screens the collapsed capsule *is* the logo (no hover to pre-expand it),
    // so the first tap opens the bar instead of navigating away.
    if (!isExpanded) {
      setIsHovered(true);
      return;
    }
    if (location.pathname === "/") smoothToTop();
    else navigate("/");
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-[max(1.25rem,env(safe-area-inset-top))] left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      {/* Weighted, ultra-smooth animated pop-out capsule */}
      <m.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (!isExpanded) setIsHovered(true);
        }}
        animate={{
          width: isExpanded ? 760 : 54,
          paddingLeft: isExpanded ? 14 : 6,
          paddingRight: isExpanded ? 14 : 6,
        }}
        transition={{
          type: "spring",
          stiffness: 145,
          damping: 20,
          mass: 1.12,
        }}
        style={{ maxWidth: "calc(100vw - 32px)" }}
        className="pointer-events-auto h-[54px] rounded-full flex items-center justify-between cursor-pointer relative overflow-hidden transition-colors duration-300 bg-white/95 backdrop-blur-xl border border-neutral-300/80 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)]"
      >
        {/* Left: ProtoVinci Logo (Always visible as the anchor) */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 shrink-0 select-none cursor-pointer"
        >
          <m.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-neutral-300/90 bg-[#f8f8f8] overflow-hidden flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] shrink-0"
          >
            <img
              src={logoImg}
              alt="ProtoVinci Logo"
              width={40}
              height={40}
              fetchPriority="high"
              className="w-full h-full object-cover rounded-full scale-110"
            />
          </m.div>

          <AnimatePresence>
            {isExpanded && (
              <m.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="font-['Switzer'] font-[650] text-[18px] sm:text-[20px] text-[#000000] tracking-[-0.02em] hidden sm:inline-block hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                ProtoVinci
              </m.span>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Desktop Navigation Links (Pops out when expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <m.nav
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
              className="hidden md:flex items-center gap-6 lg:gap-8 mx-auto whitespace-nowrap"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-['Switzer'] text-[14px] font-[500] text-neutral-600 hover:text-black transition-colors py-1 hover:translate-y-[-0.5px]"
                >
                  {link.name}
                </a>
              ))}
            </m.nav>
          )}
        </AnimatePresence>

        {/* Right: Contact Us Button & Mobile Trigger (Pops out when expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
              className="flex items-center gap-1.5 sm:gap-2 shrink-0 pr-0.5 sm:pr-1.5"
            >
              <PopButton
                color="black"
                size="sm"
                className="rounded-full px-4 sm:px-5 py-2 font-['Switzer'] text-[13px] sm:text-[14px] font-[550] shadow-sm tracking-tight cursor-pointer"
                onClick={handleContactClick}
              >
                Contact us
              </PopButton>

              {/* Mobile Drawer Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="md:hidden w-10 h-10 flex items-center justify-center text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>

      {/* Mobile Drawer (When mobileMenuOpen is true) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto md:hidden absolute top-[66px] left-4 right-4 bg-white/98 backdrop-blur-2xl border border-neutral-300 rounded-3xl p-5 shadow-2xl flex flex-col gap-4"
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-['Switzer'] text-[17px] font-medium text-neutral-800 hover:text-neutral-950 py-3 border-b border-neutral-100"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <PopButton
              color="black"
              size="default"
              className="w-full h-12 rounded-xl font-['Switzer'] text-[15px] font-[550]"
              onClick={handleContactClick}
            >
              Contact us
            </PopButton>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
