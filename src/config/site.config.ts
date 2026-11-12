/**
 * site.config.ts — EDIT EVERYTHING HERE.
 * This is the single source of truth for the site's content.
 * Anything marked EDITABLE PLACEHOLDER must be replaced with real
 * information before launch. Nothing here is a fake result.
 */

export const siteConfig = {
  name: "Rakibul Hasan",
  role: "Web Developer & SEO Professional",
  tagline:
    "I build fast, modern websites and help your business grow on Google.",
  email: "hrakibul571@gmail.com",

  // EDITABLE PLACEHOLDER — put your real WhatsApp number here, digits only,
  // with country code and no "+" or spaces, e.g. "8801XXXXXXXXX".
  // Until you set it, the WhatsApp button is hidden.
  whatsappNumber: "", // e.g. "8801XXXXXXXXX"

  // EDITABLE PLACEHOLDER — your domain, no trailing slash.
  // Used for canonical URL, sitemap, robots.txt and Open Graph.
  siteUrl: "https://rakibulhasan.dev",

  // EDITABLE PLACEHOLDER — add a location keyword when you know it,
  // e.g. "Dhaka, Bangladesh" or "Bangladesh". Leave "" to omit it.
  locationKeyword: "",

  // EDITABLE PLACEHOLDER — paste your Google Search Console verification
  // code here when you have one, e.g. "abc123...". Leave "" to omit the tag.
  googleSiteVerification: "",

  keywords: [
    "web developer",
    "SEO professional",
    "ecommerce website developer",
    "website developer Bangladesh",
    "on-page SEO",
    "technical SEO",
    "dropshipping store setup",
  ],

  socials: [
    // EDITABLE PLACEHOLDER — replace "#" with your real profile URLs,
    // or remove a line to hide that link.
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "X (Twitter)", href: "#" },
  ],

  colours: {
    background: "#070B10",
    accentTeal: "#14E3C6",
    accentTealAlt: "#2DD4BF",
    glowBlue: "#3B82F6",
    text: "#E6EDF3",
    muted: "#8B98A5",
  },
} as const;

export const stats = [
  // EDITABLE PLACEHOLDERS — do NOT ship with invented numbers.
  // Replace each value with a real one, or remove the stat.
  { value: "—", label: "Projects delivered" },
  { value: "—", label: "Years of experience" },
  { value: "—", label: "Happy clients" },
] as const;

export const skills = [
  {
    title: "Web Development",
    benefit: "A fast, modern website that works on every device.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    shape: "cube" as const,
  },
  {
    title: "SEO",
    benefit: "Your business found on Google when customers search.",
    tags: ["On-page SEO", "Technical SEO", "Local SEO"],
    shape: "torus" as const,
  },
  {
    title: "Ecommerce",
    benefit: "A store that is easy to shop, easy to manage, easy to grow.",
    tags: ["Store setup", "Checkout", "Product pages"],
    shape: "icosahedron" as const,
  },
  {
    title: "Dropshipping",
    benefit: "Sell products online without holding stock yourself.",
    tags: ["Supplier setup", "Automation", "Cash on delivery"],
    shape: "sphere" as const,
  },
] as const;

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  whatIDid: string;
  result: string; // EDITABLE PLACEHOLDER text — replace with a real result.
  liveUrl: string;
  image: string;
  imageAlt: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "bexobd",
    title: "BexoBD",
    category: "Ecommerce website-builder",
    summary:
      "A dropshipping and reselling platform for Bangladesh — free registration, cash-on-delivery reselling and wholesale products.",
    problem:
      "Resellers in Bangladesh needed a simple way to start selling online without investment, stock, or a technical setup.",
    whatIDid:
      "Built the platform experience: product browsing, reseller onboarding, cash-on-delivery flow, and a clean, fast, mobile-first site.",
    result: "EDITABLE PLACEHOLDER — add a real result here, e.g. resellers onboarded or orders processed. Do not invent a number.",
    liveUrl: "https://www.bexobd.online",
    image: "/projects/bexobd.svg",
    imageAlt:
      "Placeholder screenshot slot for the BexoBD dropshipping platform homepage",
    tags: ["Next.js", "Ecommerce", "Cash on delivery"],
  },
  {
    slug: "bexobd-seo",
    title: "SEO for bexobd.online",
    category: "SEO — on-page & technical",
    summary:
      "A full SEO review of bexobd.online: titles, meta descriptions, sitemap, and the fixes that help it show up on Google.",
    problem:
      "The site loaded well and had good Bangla content, but it had no page title, no visible meta description, and a sitemap with only 6 pages.",
    whatIDid:
      "Audited the homepage and key pages, wrote the title and meta description copy, and listed the fixes in priority order — title first, then popup, then sitemap.",
    result: "EDITABLE PLACEHOLDER — add a real result here after the fixes are live, e.g. search visibility or clicks. Do not invent a number.",
    liveUrl: "https://www.bexobd.online",
    image: "/projects/seo-audit.svg",
    imageAlt:
      "Placeholder screenshot slot for the bexobd.online SEO audit",
    tags: ["On-page SEO", "Technical SEO", "Audit"],
  },
  // To add a project: copy one object above, change the slug, title,
  // problem / what I did / result, and add a screenshot to /public/projects/.
  // The grid is designed for 4–6 projects.
];

export const services = [
  {
    title: "Custom Website Development",
    benefit: "A fast, modern website built for your business — not a template.",
    tags: ["Next.js", "Responsive", "Fast"],
  },
  {
    title: "Ecommerce Website Build",
    benefit: "A store your customers can shop easily, and you can manage easily.",
    tags: ["Store setup", "Checkout", "Products"],
  },
  {
    title: "SEO — On-page, Technical, Local",
    benefit: "Get found on Google when customers search for what you sell.",
    tags: ["On-page", "Technical", "Local"],
  },
  {
    title: "Website Speed Optimization",
    benefit: "A faster site keeps visitors, ranks better, and sells more.",
    tags: ["Core Web Vitals", "Images", "Caching"],
  },
  {
    title: "Dropshipping Store Setup",
    benefit: "Start selling online without holding stock or investing upfront.",
    tags: ["Suppliers", "Automation", "COD"],
  },
] as const;

export const processSteps = [
  {
    step: "1",
    title: "Discuss",
    text: "Tell me about your business and what you need. I ask questions, you get a clear plan.",
  },
  {
    step: "2",
    title: "Build",
    text: "I design and build your website, and fix the SEO basics as I go.",
  },
  {
    step: "3",
    title: "Launch & Grow",
    text: "We launch, check it on Google, and keep improving it step by step.",
  },
] as const;
