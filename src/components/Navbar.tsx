import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/Logo.png";
import { Menu, X } from "lucide-react";
import { PopButton } from "@/components/ui/pop-button";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "#services" },
    { name: "FAQs", href: "#faq" },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 220);
  };

  const isExpanded = isHovered || mobileMenuOpen;

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setIsHovered(false);

    if (href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    // Hash link handling
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

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileMenuOpen(false);
    setIsHovered(false);

    if (location.pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/contact");
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Animated Pop-out Capsule matching animated-search-demo spring physics */}
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (!isExpanded) setIsHovered(true);
        }}
        animate={{
          width: isExpanded ? 760 : 56,
          maxWidth: "calc(100vw - 32px)",
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 26,
        }}
        className={`pointer-events-auto h-[54px] rounded-full flex items-center justify-between cursor-pointer relative overflow-hidden transition-colors duration-200 bg-white/95 backdrop-blur-xl border border-neutral-300/80 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] ${
          isExpanded ? "px-3.5 sm:px-6" : "px-1.5 justify-center"
        }`}
      >
        {/* Left: ProtoVinci Logo (Always visible as the anchor) */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 shrink-0 select-none cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-neutral-300/90 bg-[#f8f8f8] overflow-hidden flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] shrink-0"
          >
            <img
              src={logoImg}
              alt="ProtoVinci Logo"
              className="w-full h-full object-cover rounded-full scale-110"
            />
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="font-['Switzer'] font-[650] text-[18px] sm:text-[20px] text-[#000000] tracking-[-0.02em] hidden sm:inline-block hover:opacity-80 transition-opacity"
              >
                ProtoVinci
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Desktop Navigation Links (Pops out when expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.nav
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, delay: 0.05 }}
              className="hidden md:flex items-center gap-6 lg:gap-8 mx-auto"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-['Switzer'] text-[14px] font-[500] text-neutral-600 hover:text-black transition-colors py-1 hover:translate-y-[-0.5px]"
                >
                  {link.name}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Right: Contact Us Button & Mobile Trigger (Pops out when expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: 0.08 }}
              className="flex items-center gap-2 shrink-0"
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
                className="md:hidden p-1.5 text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Drawer (When mobileMenuOpen is true) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className="pointer-events-auto md:hidden absolute top-20 left-4 right-4 bg-white/98 backdrop-blur-2xl border border-neutral-300 rounded-3xl p-6 shadow-2xl flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-['Switzer'] text-base font-medium text-neutral-800 hover:text-neutral-950 py-1.5 border-b border-neutral-100"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <PopButton
              color="black"
              size="default"
              className="w-full rounded-xl font-['Switzer'] text-[14px] font-[550]"
              onClick={handleContactClick}
            >
              Contact us
            </PopButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
