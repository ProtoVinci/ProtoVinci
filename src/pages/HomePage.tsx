import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { ServicesIntro } from "@/components/ServicesIntro";
import { ServicesSection } from "@/components/ServicesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { OurProjectsSection } from "@/components/OurProjectsSection";

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Landing Hero Section */}
      <HeroSection />

      {/* 2. Increased Gap & Editorial Transition with Blurry Slide-in Animation */}
      <ServicesIntro />

      {/* 3. Four Full-Width Services with Parallax & Static Slicing */}
      <ServicesSection />

      {/* Spacing Gap between Services Section and How It Works */}
      <div
        className="w-full h-28 sm:h-36 md:h-44"
        style={{
          background: "#e1e1e1",
        }}
        aria-hidden="true"
      />

      {/* 4. Strictly Created How It Works Section with Frosted Neomorphic Graph */}
      <HowItWorksSection />

      {/* 5. Our Projects Section (Stacked Cards Format) */}
      <OurProjectsSection />
    </div>
  );
};

export default HomePage;
