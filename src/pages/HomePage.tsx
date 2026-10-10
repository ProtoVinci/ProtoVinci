import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { ServicesIntro } from "@/components/ServicesIntro";
import { ServicesSection } from "@/components/ServicesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { OurProjectsSection } from "@/components/OurProjectsSection";
import { FaqSection } from "@/components/FaqSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Landing Hero Section */}
      <HeroSection />

      {/* 2. Increased Gap & Editorial Transition with Blurry Slide-in Animation */}
      <ServicesIntro />

      {/* 3. Four Full-Width Services with Parallax & Static Slicing */}
      <ServicesSection />

      {/* Symmetrical Section Transition Gap between Services and How It Works */}
      <div
        className="w-full h-24 sm:h-32 md:h-36 border-t border-[#cecece]"
        style={{
          background: "#eeeef0",
        }}
        aria-hidden="true"
      />

      {/* 4. Strictly Created How It Works Section with Frosted Neomorphic Graph */}
      <HowItWorksSection />

      {/* 5. Our Projects Section (Stacked Cards Format - Top 3 featured on Home) */}
      <OurProjectsSection limit={3} showHeader={true} showCta={true} />

      {/* 6. Frequently Asked Questions (FAQ) Section */}
      <FaqSection />

      {/* 7. Get Started Section with Interactive Ripple Grid Background */}
      <GetStartedSection />

      {/* 8. Footer Section with Looping Muted Video & Brand Links */}
      <Footer />
    </div>
  );
};

export default HomePage;
