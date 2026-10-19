// ProtoVinci's services: ten services grouped into three pillars,
// following the positioning "technology, automation, and creative services".

import webDesignImg from "@/assets/project-section/web-design.webp";
import socialMediaImg from "@/assets/project-section/social-media.webp";
import awardDockShot from "@/assets/landing-pages/awarddock.webp";

export interface ServiceDetail {
  id: string;
  title: string;
  summary: string;
  /** What's typically included */
  includes: string[];
}

export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  /** Short label used on cards and indexes */
  label: string;
  summary: string;
  image: string;
  objectPosition: string;
  alt: string;
  services: ServiceDetail[];
  /** Projects from data/projects that genuinely used this pillar */
  relatedProjectIds?: string[];
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "technology",
    number: "01",
    title: "Technology & Development",
    label: "Build",
    summary:
      "Fast, scalable websites, apps and custom software engineered for performance, backed by cloud setup and ongoing maintenance.",
    image: webDesignImg,
    objectPosition: "center 42%",
    alt: "Website development by ProtoVinci",
    relatedProjectIds: ["rk-enterprises", "wmc", "firdosh"],
    services: [
      {
        id: "web-development",
        title: "Website & Web Application Development",
        summary:
          "Responsive websites and web apps, from business sites and product catalogues to dashboards and portals, built on modern frameworks.",
        includes: ["Business & marketing websites", "Web apps & dashboards", "E-commerce & catalogues", "SEO-ready, responsive builds"],
      },
      {
        id: "custom-software",
        title: "Custom Software Development",
        summary:
          "Software shaped around how your business actually works: internal tools, management systems and platforms that replace spreadsheets and manual steps.",
        includes: ["Internal tools & admin panels", "Management systems", "Specialised platforms", "Clean, documented code"],
      },
      {
        id: "mobile-apps",
        title: "Mobile App Development",
        summary:
          "Android and iOS apps that put your product or service in your customers' hands, designed for everyday use.",
        includes: ["iOS & Android apps", "App UI/UX & prototypes", "Backend & API connectivity", "Store launch support"],
      },
      {
        id: "cloud",
        title: "Cloud & Technology Solutions",
        summary:
          "Hosting, deployment and cloud setup that keep your applications secure, fast and ready to scale, with guidance on the right technology choices.",
        includes: ["Cloud hosting & deployment", "Domain, email & server setup", "Performance & security", "Technology consulting"],
      },
      {
        id: "maintenance",
        title: "Website & Software Maintenance",
        summary:
          "Ongoing care after launch: updates, fixes, backups and improvements, so your website and software stay secure and up to date.",
        includes: ["Updates & security patches", "Bug fixes & monitoring", "Backups", "Content & feature changes"],
      },
    ],
  },
  {
    id: "automation",
    number: "02",
    title: "AI & Automation",
    label: "Automate",
    summary:
      "Practical AI, automation and integrations that take repetitive work off your team's plate and connect the systems you already use.",
    image: awardDockShot,
    objectPosition: "left top",
    alt: "AwardDock certificate automation platform built by ProtoVinci",
    relatedProjectIds: ["awarddock"],
    services: [
      {
        id: "ai-solutions",
        title: "AI Solutions & Integrations",
        summary:
          "AI built into your workflows and products: chatbots, assistants, document processing and smart features powered by modern AI models.",
        includes: ["AI chatbots & assistants", "Document & data processing", "AI features in existing apps", "Model integration"],
      },
      {
        id: "workflow-automation",
        title: "Workflow & Business Automation",
        summary:
          "We find the repetitive tasks in your process and automate them, from data entry and reporting to document generation and email workflows.",
        includes: ["Process mapping", "Automated documents & reports", "Email & notification flows", "Spreadsheet & form automation"],
      },
      {
        id: "integrations",
        title: "API & System Integrations",
        summary:
          "Connect the tools you already rely on so data flows between them: CRMs, payment gateways, messaging platforms and third-party APIs.",
        includes: ["Third-party API integrations", "Payment gateways", "CRM & WhatsApp integrations", "Custom APIs & data sync"],
      },
    ],
  },
  {
    id: "creative",
    number: "03",
    title: "Design & Creative",
    label: "Create",
    summary:
      "Interfaces people enjoy using and content that tells your story, designed to make your product clear and your brand memorable.",
    image: socialMediaImg,
    objectPosition: "center 46%",
    alt: "Creative and video content by ProtoVinci",
    relatedProjectIds: ["gullyculture", "socialxbrand"],
    services: [
      {
        id: "ui-ux",
        title: "UI/UX & Digital Design",
        summary:
          "Clear, consistent interfaces, from wireframes and prototypes to complete design systems and brand visuals.",
        includes: ["Wireframes & user flows", "High-fidelity UI & prototypes", "Design systems", "Brand & digital visuals"],
      },
      {
        id: "video-creative",
        title: "Video Editing & Creative Services",
        summary:
          "Video and visual content for social media, ads and your website: edited, paced and branded to hold attention.",
        includes: ["Reels & short-form video", "Promo & product videos", "Motion graphics", "Social media creatives"],
      },
    ],
  },
];

/** All ten services in order, each with its pillar and running number */
export const ALL_SERVICES = SERVICE_PILLARS.flatMap((pillar) =>
  pillar.services.map((service) => ({ ...service, pillar })),
).map((service, idx) => ({ ...service, number: String(idx + 1).padStart(2, "0") }));
