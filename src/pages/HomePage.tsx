import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { ServicesIntro } from "@/components/ServicesIntro";
import { ServicesSection } from "@/components/ServicesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { OurProjectsSection } from "@/components/OurProjectsSection";
import { FaqSection } from "@/components/FaqSection";

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Landing Hero Section */}
      <HeroSection />

      {/* 2. Increased Gap & Editorial Transition with Blurry Slide-in Animation */}
      <ServicesIntro />

      {/* 3. Four Full-Width Services with Parallax & Static Slicing */}
      <ServicesSection />

      {/* 4. Strictly Created How It Works Section with Frosted Neomorphic Graph */}
      <HowItWorksSection />

      {/* 5. Our Projects Section (Stacked Cards Format) */}
      <OurProjectsSection />

      {/* 6. Frequently Asked Questions (FAQ) Section */}
      <FaqSection />
    </div>
  );
};

export default HomePage;
