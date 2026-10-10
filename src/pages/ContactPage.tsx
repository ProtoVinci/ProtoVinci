import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Mail, Phone, MapPin, ChevronDown, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PopButton } from "@/components/ui/pop-button";
import { Navbar } from "@/components/Navbar";
import { FaqSection } from "@/components/FaqSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";
import contactImgWebp from "@/assets/contact-img.webp";

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    alternativeContact: "",
    budget: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // GSAP Entrance Animations:
  // "add blurry text reveal animation on the heading and description.
  // cta buttons will also have smooth slide up animations.
  // No animation for the form and the image."
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Headline word-by-word blur and rise animation
      const words = headlineRef.current?.querySelectorAll(".contact-word");
      if (words && words.length > 0) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 35,
            filter: "blur(14px)",
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.15
        );
      }

      // 2. Description blur and rise animation
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          {
            opacity: 0,
            y: 28,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          },
          0.55
        );
      }

      // 3. CTA Buttons smooth slide-up animation
      if (ctaButtonsRef.current) {
        tl.fromTo(
          ctaButtonsRef.current,
          {
            opacity: 0,
            y: 24,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "back.out(1.4)",
          },
          0.8
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Interface created per user request: "Where to deliver this from i will let you know next time. Just craete the interface."
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        alternativeContact: "",
        budget: "",
        description: "",
      });
    }, 4500);
  };

  // Heading lines with muted "toward" matching Image 1
  const headlineLines = [
    [
      { text: "The", highlight: false },
      { text: "first", highlight: false },
      { text: "step", highlight: false },
      { text: "toward", highlight: true }, // Muted grey tone as seen in Image 1
    ],
    [
      { text: "better", highlight: false },
      { text: "design", highlight: false },
      { text: "today.", highlight: false },
    ],
  ];

  return (
    <div
      ref={containerRef}
      id="contact"
      className="relative min-h-screen w-full bg-[#e1e1e1] text-neutral-900 overflow-x-hidden selection:bg-neutral-900 selection:text-white font-['Switzer']"
    >
      {/* 1. Expandable Pop-out Navbar (Identical logo behavior and capsule) */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-28 flex flex-col items-center">
        {/* Top Indicator: ▪ CONTACT US (Exact from Image 1) */}
        <div className="flex items-center gap-2 mb-4 sm:mb-5 select-none">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-black inline-block" />
          <span
            className="text-[11.5px] sm:text-[12.5px] uppercase font-[650] tracking-[0.22em] text-[#000000]"
            style={{ fontFamily: "'Switzer', sans-serif" }}
          >
            CONTACT US
          </span>
        </div>

        {/* Big Editorial Heading: "The first step toward better design today." */}
        <h1
          ref={headlineRef}
          className="text-center text-[40px] sm:text-[54px] md:text-[66px] lg:text-[74px] font-[550] leading-[1.08] tracking-[-0.038em] text-[#000000] max-w-4xl mx-auto select-none m-0"
          style={{ fontFamily: "'Switzer', sans-serif" }}
        >
          {headlineLines.map((line, lIdx) => (
            <span key={lIdx} className="block">
              {line.map((item, index) => (
                <span
                  key={index}
                  className={`contact-word inline-block mr-[0.24em] last:mr-0 ${
                    item.highlight ? "text-[#757575] font-[500]" : "text-[#000000]"
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle / Description (Exact from Image 1) */}
        <p
          ref={descRef}
          className="mt-4 sm:mt-5 md:mt-6 text-center text-[16px] sm:text-[18px] md:text-[19px] text-[#555555] font-[450] max-w-2xl mx-auto leading-relaxed select-none"
          style={{ fontFamily: "'Switzer', sans-serif" }}
        >
          Transform your workflow by connecting with an elite group of designers focused on
          your long term success.
        </p>

        {/* CTA PopButtons: "Explore projects" & "Our services" (Exact from Image 1) */}
        <div
          ref={ctaButtonsRef}
          className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 select-none"
        >
          {/* Button 1: "Explore projects" -> PopButton with white circle arrow, redirects to /projects */}
          <PopButton
            color="black"
            size="lg"
            onClick={() => navigate("/projects")}
            className="rounded-full px-6 sm:px-7 py-3 font-['Switzer'] text-[15px] sm:text-[16px] font-[550] text-[#ffffff] gap-3 shadow-sm hover:shadow-md cursor-pointer transition-transform"
          >
            <span>Explore projects</span>
            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </span>
          </PopButton>

          {/* Button 2: "Our services" -> Light PopButton, redirects to our services section */}
          <PopButton
            color="default"
            size="lg"
            onClick={() => {
              navigate("/#services");
              setTimeout(() => {
                const el = document.querySelector("#services");
                el?.scrollIntoView({ behavior: "smooth" });
              }, 120);
            }}
            className="rounded-full px-7 sm:px-8 py-3 font-['Switzer'] text-[15px] sm:text-[16px] font-[550] bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-900 shadow-sm transition-all cursor-pointer"
          >
            <span>Our services</span>
          </PopButton>
        </div>

        {/* 2. Bento Grid Section (Decreased gaps for a sleek, cohesive bento layout) */}
        {/* "No animation for the form and the image." */}
        <div className="w-full mt-8 sm:mt-11 md:mt-14 flex flex-col gap-3 sm:gap-3.5 md:gap-4">
          {/* Row 1: Left Form Card + Right Image Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 md:gap-4 items-stretch">
            {/* Left Bento Card: Contact Form (From Image 2 & 3) */}
            <div className="lg:col-span-7 bg-white rounded-[20px] sm:rounded-[20px] p-6 sm:p-8 md:p-9 border border-neutral-300/80 shadow-[0_12px_36px_rgba(0,0,0,0.04)] flex flex-col justify-between">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-[650] text-neutral-900 m-0">
                    Project Request Received!
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base max-w-md mt-2">
                    Thank you for reaching out. We will review your details and get back to
                    you shortly with our proposal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                  {/* Grid Row 1: Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-[13px] sm:text-[13.5px] font-[600] text-neutral-900 tracking-tight"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your name"
                        className="w-full bg-[#f8f9fa] border border-neutral-200/90 rounded-[20px] px-4 py-3 text-[14px] sm:text-[14.5px] text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 outline-none transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-[13px] sm:text-[13.5px] font-[600] text-neutral-900 tracking-tight"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                        className="w-full bg-[#f8f9fa] border border-neutral-200/90 rounded-[20px] px-4 py-3 text-[14px] sm:text-[14.5px] text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Grid Row 2: Alternative Contact & Budget (INR) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Alternative Contact (Whatsapp/LinkedIn/Discord) */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-alt"
                        className="text-[13px] sm:text-[13.5px] font-[600] text-neutral-900 tracking-tight truncate"
                      >
                        Alternative Contact{" "}
                        <span className="text-[11.5px] text-neutral-500 font-normal">
                          (Whatsapp/LinkedIn/Discord)
                        </span>
                      </label>
                      <input
                        id="contact-alt"
                        type="text"
                        name="alternativeContact"
                        value={formData.alternativeContact}
                        onChange={handleInputChange}
                        placeholder="e.g. @username"
                        className="w-full bg-[#f8f9fa] border border-neutral-200/90 rounded-[20px] px-4 py-3 text-[14px] sm:text-[14.5px] text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 outline-none transition-all"
                      />
                    </div>

                    {/* Budget (INR) */}
                    {/* "Budget will be in INR and options will be 1000-3000 , 3000-5000 , 5000-7000 , 7000-10000, 10000 above." */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-budget"
                        className="text-[13px] sm:text-[13.5px] font-[600] text-neutral-900 tracking-tight"
                      >
                        Budget (INR)
                      </label>
                      <div className="relative">
                        <select
                          id="contact-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          required
                          className="w-full appearance-none bg-[#f8f9fa] border border-neutral-200/90 rounded-[20px] px-4 py-3 pr-10 text-[14px] sm:text-[14.5px] text-neutral-900 focus:bg-white focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 outline-none transition-all cursor-pointer"
                        >
                          <option value="" disabled className="text-neutral-400">
                            Please select...
                          </option>
                          <option value="1000-3000">₹1,000 - ₹3,000</option>
                          <option value="3000-5000">₹3,000 - ₹5,000</option>
                          <option value="5000-7000">₹5,000 - ₹7,000</option>
                          <option value="7000-10000">₹7,000 - ₹10,000</option>
                          <option value="10000-above">₹10,000 above</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      </div>
                    </div>
                  </div>

                  {/* Description (Extendable vertical resize) */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-description"
                      className="text-[13px] sm:text-[13.5px] font-[600] text-neutral-900 tracking-tight"
                    >
                      Description
                    </label>
                    <textarea
                      id="contact-description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your project..."
                      className="w-full resize-y min-h-[110px] bg-[#f8f9fa] border border-neutral-200/90 rounded-[20px] px-4 py-3 text-[14px] sm:text-[14.5px] text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 outline-none transition-all"
                    />
                  </div>

                  {/* Form Footer: 100% free & non-binding + Send project request PopButton */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 pt-2">
                    <span className="text-[12.5px] sm:text-[13.5px] text-neutral-500 font-medium">
                      100% free & non-binding
                    </span>

                    <PopButton
                      type="submit"
                      color="black"
                      size="default"
                      className="rounded-full px-7 py-3 w-full sm:w-auto font-['Switzer'] text-[14.5px] sm:text-[15px] font-[550] shadow-sm hover:shadow-md cursor-pointer text-white"
                    >
                      <span>Send project request</span>
                    </PopButton>
                  </div>
                </form>
              )}
            </div>

            {/* Right Bento Card: Portrait Image from assets/contact-img.webp */}
            <div className="lg:col-span-5 rounded-[20px] sm:rounded-[20px] overflow-hidden border border-neutral-300/80 shadow-[0_12px_36px_rgba(0,0,0,0.04)] bg-neutral-900 min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
              <img
                src={contactImgWebp}
                alt="ProtoVinci High-Fashion Creative Profile"
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Row 2: 3 Bottom Bento Information Cards (Decreased gap) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 md:gap-4">
            {/* Card 1: Email Address */}
            <a
              href="mailto:Pixello@gmail.com"
              className="group bg-white rounded-[20px] sm:rounded-[20px] p-5 sm:p-2.5 border border-neutral-300/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 group-hover:bg-neutral-200/70 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14.5px] sm:text-[15.5px] font-[650] text-neutral-950 tracking-tight leading-tight">
                    Email Address
                  </span>
                  <span className="text-[12.5px] sm:text-[13.5px] text-neutral-500 font-normal truncate mt-0.5">
                    Pixello@gmail.com
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-400 group-hover:text-black group-hover:border-neutral-400 group-hover:translate-x-0.5 transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Card 2: Phone Number */}
            <a
              href="tel:+12345678900"
              className="group bg-white rounded-[20px] sm:rounded-[20px] p-5 sm:p-2.5 border border-neutral-300/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 group-hover:bg-neutral-200/70 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14.5px] sm:text-[15.5px] font-[650] text-neutral-950 tracking-tight leading-tight">
                    Phone Number
                  </span>
                  <span className="text-[12.5px] sm:text-[13.5px] text-neutral-500 font-normal truncate mt-0.5">
                    +123 456 789 00
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-400 group-hover:text-black group-hover:border-neutral-400 group-hover:translate-x-0.5 transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Card 3: Location (Mumbai, India) */}
            {/* "and location put mumbai india" */}
            <div className="group bg-white rounded-[20px] sm:rounded-[20px] p-5 sm:p-2.5 border border-neutral-300/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 group-hover:bg-neutral-200/70 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14.5px] sm:text-[15.5px] font-[650] text-neutral-950 tracking-tight leading-tight">
                    Location
                  </span>
                  <span className="text-[12.5px] sm:text-[13.5px] text-neutral-500 font-normal truncate mt-0.5">
                    Mumbai, India
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-400 group-hover:text-black group-hover:border-neutral-400 group-hover:translate-x-0.5 transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Frequently Asked Questions Section on Contact Page */}
      <FaqSection />

      {/* Get Started Section with Interactive Ripple Grid Background */}
      <GetStartedSection />

      {/* Footer Section with Looping Muted Video & Brand Links */}
      <Footer />
    </div>
  );
};

export default ContactPage;
