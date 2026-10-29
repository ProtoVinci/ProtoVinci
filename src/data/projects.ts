import awarddockImg from "@/assets/landing-pages/awarddock.webp";
import rkEnterprisesImg from "@/assets/landing-pages/rk-enterprises.webp";
import socialxbrandImg from "@/assets/landing-pages/socialxbrand.webp";
import wmcImg from "@/assets/landing-pages/wmc.webp";
import gullycultureImg from "@/assets/landing-pages/gullyculture.webp";
import firdoshImg from "@/assets/landing-pages/firdosh.webp";
import theArtEventsImg from "@/assets/landing-pages/theart.webp";

// Gallery image imports
import rk1 from "@/assets/rk/rk-1.webp";
import rk2 from "@/assets/rk/rk-2.webp";
import rk3 from "@/assets/rk/rk-3.webp";
import rk4 from "@/assets/rk/rk-4.webp";

import firdosh1 from "@/assets/firdosh/firdosh-1.webp";
import firdosh2 from "@/assets/firdosh/firdosh-2.webp";
import firdosh3 from "@/assets/firdosh/firdosh-3.webp";
import firdosh4 from "@/assets/firdosh/firdosh-4.webp";

import gc1 from "@/assets/gullyculture/gullyculture-1.webp";
import gc2 from "@/assets/gullyculture/gullyculture-2.webp";
import gc3 from "@/assets/gullyculture/gullyculture-3.webp";
import gc4 from "@/assets/gullyculture/gullyculture-4.webp";

import sxb1 from "@/assets/socialxbrand/socialxbrand-1.webp";
import sxb2 from "@/assets/socialxbrand/socialxbrand-2.webp";
import sxb3 from "@/assets/socialxbrand/socialxbrand-3.webp";
import sxb4 from "@/assets/socialxbrand/socialxbrand-4.webp";

import wmc1 from "@/assets/wmc/wmc-1.webp";
import wmc2 from "@/assets/wmc/wmc-2.webp";
import wmc3 from "@/assets/wmc/wmc-3.webp";
import wmc4 from "@/assets/wmc/wmc-4.webp";

import dock1 from "@/assets/awarddock/dock-1.webp";
import dock2 from "@/assets/awarddock/dock-2.webp";
import dock3 from "@/assets/awarddock/dock-3.webp";
import dock4 from "@/assets/awarddock/dock-4.webp";

import tae1 from "@/assets/the-art-events/the-art-event-1.webp";
import tae2 from "@/assets/the-art-events/the-art-event-2.webp";
import tae3 from "@/assets/the-art-events/the-art-event-3.webp";
import tae4 from "@/assets/the-art-events/the-art-event-4.webp";

export interface ProjectItem {
  id: string;
  step: string;
  name: string;
  tag: string;
  shortDescription: string;
  timeline: string;
  service: string;
  kickoff: string;
  clientName: string;
  clientRole: string;
  landingImage: string;
  galleryImages: string[];
  isMobileGallery?: boolean;
  liveUrl: string;
  siteLabel: string;
  theme: "light" | "dark";
  overview: string;
  process: string[];
  result: string;
}

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "rk-enterprises",
    step: "01",
    name: "RK Enterprises",
    tag: "Product Catalogue",
    shortDescription:
      "A high-performance industrial equipment platform engineered with comprehensive machine catalogs, instant quotation flows, and precision responsive layout.",
    timeline: "2 Weeks",
    service: "Product Catalogue",
    kickoff: "Sep 2026",
    clientName: "Ramesh Kumar",
    clientRole: "Food Manufacturer",
    landingImage: rkEnterprisesImg,
    galleryImages: [rk1, rk2, rk3, rk4],
    isMobileGallery: false,
    liveUrl: "https://rk-enterprises-platform-rouge.vercel.app/",
    siteLabel: "RK Enterprises",
    theme: "dark",
    overview:
      "We developed a professional digital platform for RK Enterprises to showcase its industrial machinery, communicate product information, and help prospective buyers enquire about equipment. The goal was to establish a credible online presence and simplify the customer discovery process.",
    process: [
      "Understood the business, product range, and target audience.",
      "Designed a structured website with clear product categories and detailed product presentations.",
      "Integrated enquiry and WhatsApp contact options to simplify communication.",
      "Developed, tested, and deployed the complete website.",
    ],
    result:
      "A centralised digital platform that presents the company's machinery professionally, improves product discoverability, and provides potential buyers with a direct channel for enquiries and quotation requests.",
  },
  {
    id: "firdosh",
    step: "02",
    name: "Firdosh Marble Arts",
    tag: "Digital Showroom",
    shortDescription:
      "A visually driven digital showroom crafted to translate the timeless quality of handcrafted marble art, temple architecture, and bespoke fountains into a compelling online experience.",
    timeline: "2 Weeks",
    service: "Digital Showroom",
    kickoff: "Oct 2026",
    clientName: "Kalamuddin",
    clientRole: "Founder of Firdosh Marble Arts, Makrana Rajasthan",
    landingImage: firdoshImg,
    galleryImages: [firdosh1, firdosh2, firdosh3, firdosh4],
    isMobileGallery: false,
    liveUrl: "https://firdoshmarblearts.vercel.app/",
    siteLabel: "Firdosh Marble Arts",
    theme: "dark",
    overview:
      "We created a visually driven website for Firdosh Marble Arts to showcase its marble products, handcrafted designs, fountains, and custom temple work. The primary objective was to translate the quality of its craftsmanship into a compelling online experience.",
    process: [
      "Identified the key product categories and customer requirements.",
      "Designed an elegant, image-focused interface that highlights craftsmanship.",
      "Organised products and services for easy browsing.",
      "Integrated direct contact and enquiry options for customers interested in custom work.",
      "Developed and deployed the website across desktop and mobile devices.",
    ],
    result:
      "A digital showroom that gives the business a professional online presence, showcases its craftsmanship to a wider audience, and makes it easier for prospective customers to initiate enquiries.",
  },
  {
    id: "gullyculture",
    step: "03",
    name: "Gully Culture",
    tag: "Social Commerce",
    shortDescription:
      "An energetic, street-culture inspired e-commerce landing experience built with bold art direction, punchy typography, and fluid social order channels.",
    timeline: "3 Weeks",
    service: "Social Commerce",
    kickoff: "Aug 2026",
    clientName: "Rudra Mewadi",
    clientRole: "Founder of thrift brands like Gully Culture and Rudezfit",
    landingImage: gullycultureImg,
    galleryImages: [gc1, gc2, gc3, gc4],
    isMobileGallery: false,
    liveUrl: "https://gullyculture.vercel.app/",
    siteLabel: "Gully Culture",
    theme: "light",
    overview:
      "We built a brand-focused digital platform for Gully Culture, a streetwear brand centred on football jerseys and urban fashion. The objective was to establish a distinctive digital identity, showcase its products, and connect potential buyers with its social ordering channels.",
    process: [
      "Understood the brand's audience, streetwear culture, and visual identity.",
      "Designed a distinctive interface aligned with the brand's personality.",
      "Created product showcases and browsing categories.",
      "Connected the product discovery experience with social contact and ordering channels.",
      "Developed and deployed the responsive website.",
    ],
    result:
      "A dedicated digital presence that communicates the brand's identity, presents its product collection, and creates a direct path from product discovery to customer enquiries and social-channel orders.",
  },
  {
    id: "socialxbrand",
    step: "04",
    name: "SocialxBrand Pilot",
    tag: "Agency Website",
    shortDescription:
      "A conversion-focused digital brand presence engineered to accelerate social momentum, elevate visual authority, and capture market share.",
    timeline: "3 Weeks",
    service: "Agency Website",
    kickoff: "Sep 2026",
    clientName: "Sanket Shedge",
    clientRole: "Founder of Vishay Group of Companies",
    landingImage: socialxbrandImg,
    galleryImages: [sxb1, sxb2, sxb3, sxb4],
    isMobileGallery: false,
    liveUrl: "https://www.socialxbrandpilot.com/",
    siteLabel: "SocialxBrand Pilot",
    theme: "light",
    overview:
      "We developed a digital presence for SOCIALxBRAND PILOT to communicate its marketing capabilities, showcase its work, and establish a professional first impression for prospective clients. The website was designed to turn the agency's services and creative expertise into a clear online experience.",
    process: [
      "Reviewed the agency's positioning, target audience, and service offerings.",
      "Structured the website around its core services, creative work, and brand messaging.",
      "Designed an engaging interface consistent with the agency's identity.",
      "Built the website with responsive layouts and clear enquiry pathways.",
      "Tested and deployed the final platform.",
    ],
    result:
      "A professional agency website that communicates the brand's capabilities, presents its portfolio, and gives prospective clients a central destination to explore its services and make contact.",
  },
  {
    id: "wmc",
    step: "05",
    name: "WMC Labs",
    tag: "Educational Software",
    shortDescription:
      "An interactive virtual laboratory for Wireless and Mobile Communication, designed to help students explore networking concepts through practical hands-on experiments.",
    timeline: "6 Weeks",
    service: "Educational Software",
    kickoff: "Jul 2026",
    clientName: "Prof. Priyadarshini Badgujjar",
    clientRole:
      "Faculty at K.C. College of Engineering & Management Studies & Research Thane",
    landingImage: wmcImg,
    galleryImages: [wmc1, wmc2, wmc3, wmc4],
    isMobileGallery: true,
    liveUrl: "https://wmc-virtual-lab.onrender.com/",
    siteLabel: "WMC Labs",
    theme: "dark",
    overview:
      "We developed an interactive virtual laboratory for Wireless and Mobile Communication, designed to help students explore networking concepts through practical experiments. The platform focuses on bridging theoretical learning with hands-on experimentation using supported device capabilities.",
    process: [
      "Identified the educational objectives and requirements for wireless communication experiments.",
      "Designed an interactive interface for accessing experiments and viewing results.",
      "Implemented experiment workflows for supported measurements, such as Wi-Fi signal strength, latency, and network throughput.",
      "Integrated the necessary application logic and data visualisation.",
      "Tested the experiments and deployed the platform for browser-based access.",
    ],
    result:
      "An interactive educational platform that makes wireless networking concepts more accessible through practical experiments, measurable results, and visual feedback, supporting a more engaging learning experience.",
  },
  {
    id: "awarddock",
    step: "06",
    name: "AwardDock",
    tag: "Workflow Automation",
    shortDescription:
      "A certificate automation infrastructure structured to generate, verify, and deliver high-volume credentials with zero friction.",
    timeline: "6 Weeks",
    service: "Workflow Automation",
    kickoff: "Jul 2026",
    clientName: "Dr. B.R. Patil",
    clientRole:
      "Principal of K.C. College of Engineering & Management Studies & Research Thane",
    landingImage: awarddockImg,
    galleryImages: [dock1, dock2, dock3, dock4],
    isMobileGallery: false,
    liveUrl: "https://certify-nu.vercel.app/",
    siteLabel: "AwardDock",
    theme: "light",
    overview:
      "We developed a certificate automation platform to simplify the process of generating and distributing certificates for events, courses, and other organised activities. The solution replaces repetitive manual work with a streamlined workflow for creating personalised certificates and delivering them to recipients.",
    process: [
      "Identified the repetitive tasks involved in certificate creation and distribution.",
      "Designed a workflow for importing participant information from spreadsheets.",
      "Implemented certificate templates and automated personalised PDF generation.",
      "Integrated email distribution and delivery-status tracking.",
      "Developed, tested, and deployed the complete application.",
    ],
    result:
      "A centralised certificate management platform that streamlines bulk certificate creation and distribution, reduces repetitive administrative work, and provides organisers with a more organised process for managing certificate delivery.",
  },
  {
    id: "the-art-events",
    step: "07",
    name: "The Art Events",
    tag: "Celebration Décor",
    shortDescription:
      "A visually engaging celebration décor and styling showcase engineered to turn creative event themes and balloon installations into client enquiries.",
    timeline: "1 Week",
    service: "Event Website & Digital Portfolio",
    kickoff: "Oct 2026",
    clientName: "The Art Events",
    clientRole: "Celebration Décor & Styling Company",
    landingImage: theArtEventsImg,
    galleryImages: [tae1, tae2, tae3, tae4],
    isMobileGallery: false,
    liveUrl: "https://theartevents.vercel.app/#top",
    siteLabel: "The Art Events",
    theme: "light",
    overview:
      "We designed and developed a visually engaging website for The Art Events, a celebration décor and styling company, to showcase its creative work, highlight its services, and help customers plan their celebrations. The goal was to translate the company's creativity and attention to detail into a polished digital experience that inspires visitors and turns their ideas into enquiries.",
    process: [
      "Structured the website around the company's services, occasions, and creative portfolio.",
      "Designed an image-led interface that showcases event décor, themed backdrops, balloon installations, and venue styling.",
      "Organised services and past work into clear, easy-to-explore sections.",
      "Integrated an event enquiry form to help prospective customers share their occasion, date, venue, and styling preferences.",
      "Developed and deployed a responsive website optimised for desktop and mobile browsing.",
    ],
    result:
      "A modern digital showcase that strengthens The Art Events' online presence, brings its creative work to life, and makes it easier for customers to discover services and enquire about customised event décor.",
  },
];
