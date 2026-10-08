import React from "react";
import { Navbar } from "@/components/Navbar";
import { OurProjectsSection } from "@/components/OurProjectsSection";
import { FaqSection } from "@/components/FaqSection";
import { PopButton } from "@/components/ui/pop-button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#e1e1e1] text-neutral-900 overflow-x-hidden selection:bg-neutral-900 selection:text-white font-['Switzer']">
      {/* 1. Expandable Pop-out Navbar */}
      <Navbar />

      <main className="relative z-10 w-full pt-28 sm:pt-32">
        {/* Top Back Action */}
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 mb-4 flex items-center justify-between">
          <PopButton
            color="default"
            size="sm"
            onClick={() => navigate("/")}
            className="rounded-full px-4 py-2 bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-800 text-[13px] font-[550] gap-2 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </PopButton>
        </div>

        {/* Stacked Showcase from OurProjectsSection */}
        <OurProjectsSection />

        {/* Frequently Asked Questions Section on Projects Page */}
        <FaqSection />
      </main>
    </div>
  );
};

export default ProjectsPage;
