// Client feedback, written in ProtoVinci's words with each client's approval.
// `logo` is the client's brand mark; without one, the card shows a monogram.

import wmcLogo from "@/assets/feedback_logo/WMC.png";
// Large originals are kept alongside; these are 168px copies sized for the 56px avatar
import rkLogo from "@/assets/feedback_logo/rk-avatar.jpg";
import gullyCultureLogo from "@/assets/feedback_logo/gully-culture-avatar.jpg";
import firdoshLogo from "@/assets/feedback_logo/firdosh-marbel-arts.webp";
import awardDockLogo from "@/assets/feedback_logo/AwardDock.png";
import socialxBrandLogo from "@/assets/feedback_logo/social.jpeg";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Project name as shown on the card */
  project: string;
  /** Matches an id in data/projects, so the card can link to the case study */
  projectId: string;
  logo?: string;
  /** Zoom into the logo's mark when the full artwork is too detailed for a small circle */
  logoZoom?: number;
  /** Zoom origin (CSS position). This point stays fixed while the rest scales away from it, e.g. "50% 8%" keeps the top area */
  logoFocus?: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "wmc",
    quote:
      "ProtoVinci turned our wireless communication syllabus into a virtual lab our students genuinely enjoy. Experiments on signal strength, latency and throughput now run right in the browser, with results students can see and measure. Difficult networking concepts have become far easier to teach.",
    name: "Prof. Priyadarshini Badgujjar",
    role: "Faculty, K.C. College of Engineering, Thane",
    project: "WMC Virtual Lab",
    projectId: "wmc",
    logo: wmcLogo,
    rating: 5,
  },
  {
    id: "rk-enterprises",
    quote:
      "Our machines finally have a proper home online. ProtoVinci organised our whole product range into clear categories, and buyers can enquire or message us on WhatsApp straight from any product. The website looks professional and gives customers confidence before they even call us.",
    name: "Ramesh Kumar",
    role: "Owner, RK Enterprises",
    project: "RK Enterprises",
    projectId: "rk-enterprises",
    logo: rkLogo,
    logoZoom: 1.65,
    logoFocus: "50% 8%",
    rating: 5,
  },
  {
    id: "firdosh",
    quote:
      "Marble work has to be seen to be appreciated, and ProtoVinci understood that from the start. Our mandirs, jali work and fountains look beautiful on the new website, on mobile and desktop. Customers now discover our craft online and contact us directly for custom orders.",
    name: "Kalamuddin",
    role: "Founder, Firdosh Marble Arts",
    project: "Firdosh Marble Arts",
    projectId: "firdosh",
    logo: firdoshLogo,
    logoZoom: 1.66,
    logoFocus: "59% 5%",
    rating: 5,
  },
  {
    id: "gullyculture",
    quote:
      "They got the vibe of Gully Culture from day one. The site feels exactly like our brand: bold, street and full of energy, and browsing our jerseys is effortless. Every product leads straight to our social channels, so turning interest into orders is now simple.",
    name: "Rudra Mewadi",
    role: "Founder, Gully Culture",
    project: "Gully Culture",
    projectId: "gullyculture",
    logo: gullyCultureLogo,
    logoZoom: 1.1,
    logoFocus: "70% 50%",
    rating: 5,
  },
  {
    id: "socialxbrand",
    quote:
      "As a marketing agency, our own website has to set the standard. ProtoVinci shaped our services, portfolio and messaging into a site that makes a strong first impression and gives prospective clients one clear place to explore what we do and reach out.",
    name: "Sanket Shedge",
    role: "Founder, Vishay Group of Companies",
    project: "SocialxBrand Pilot",
    projectId: "socialxbrand",
    logo: socialxBrandLogo,
    logoZoom: 1.6,
    logoFocus: "50% 50%",
    rating: 5,
  },
  {
    id: "awarddock",
    quote:
      "Issuing certificates for events used to mean hours of manual work. With AwardDock we import participants from a spreadsheet, and personalised certificates are generated and emailed automatically, with delivery tracked. It has made running events at our college noticeably smoother.",
    name: "Dr. B.R. Patil",
    role: "Principal, K.C. College of Engineering, Thane",
    project: "AwardDock",
    projectId: "awarddock",
    logo: awardDockLogo,
    rating: 5,
  },
];
