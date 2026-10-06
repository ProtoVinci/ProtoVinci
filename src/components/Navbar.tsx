import React, { useState } from "react";
import logoImg from "@/assets/Logo.png";
import { Menu, X } from "lucide-react";
import { PopButton } from "@/components/ui/pop-button";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Pricing", href: "#pricing" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-full px-3.5 sm:px-6 py-2 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] flex items-center justify-between gap-6 md:gap-10 w-full max-w-4xl transition-all duration-300">
        {/* Brand / Logo with depth */}
        <a href="#" className="flex items-center gap-2.5 group select-none">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300/90 bg-[#f8f8f8] overflow-hidden flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-transform duration-300 group-hover:scale-105 shrink-0">
            <img
              src={logoImg}
              alt="ProtoVinci Logo"
              className="w-full h-full object-cover rounded-full scale-110"
            />
          </div>
          <span className="font-['Switzer'] font-[600] text-[20px] text-[#000000] tracking-[-0.02em] [text-shadow:_0_1px_2px_rgba(0,0,0,0.12),_0_3px_8px_rgba(0,0,0,0.06)] group-hover:text-black transition-all">
            ProtoVinci
          </span>
        </a>

        {/* Desktop Nav Items with subtle typography depth */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-['Switzer'] text-[14px] font-[500] text-[#666666] hover:text-[#000000] [text-shadow:_0_1px_1px_rgba(255,255,255,0.7)] transition-all py-1 hover:translate-y-[-0.5px]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button: Using tactile PopButton */}
        <div className="flex items-center gap-2">
          <PopButton
            color="black"
            size="sm"
            className="rounded-full px-5 py-2 font-['Switzer'] text-[13px] sm:text-[14px] font-[550] shadow-sm tracking-tight [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]"
            onClick={() => {
              const contact = document.querySelector("#contact");
              contact?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact us
          </PopButton>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-700 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-18 left-4 right-4 bg-white/98 backdrop-blur-xl border border-neutral-200 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
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
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact us
          </PopButton>
        </div>
      )}
    </header>
  );
};

export default Navbar;
