export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Pricing", href: "/pricing", key: "pricing" },
  { label: "Examples", href: "/examples", key: "examples" },
  { label: "FAQ", href: "/faq", key: "faq" },
  { label: "Contact Us", href: "/contact", key: "contact" },
];

export const brand = {
  name: "Builder by HotCode",
  shortName: "Builder",
  tagline: "The fastest way to turn an idea into a production-ready website.",
  ctaLabel: "Start Building",
  signInLabel: "Sign In",
};

export interface PricingTier {
  key: string;
  name: string;
  credits: number;
  price: number;
  perCredit: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  accentColor: string;
  bgColor: string;
  iconBg: string;
  features: string[];
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    key: "free",
    name: "Free",
    credits: 50,
    price: 0,
    perCredit: "$0.00",
    accentColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    iconBg: "bg-emerald-500",
    features: [
      "50 generation credits",
      "Next.js + TypeScript output",
      "Live preview",
      "Community support",
      "Export as ZIP",
    ],
    cta: "Get Started Free",
  },
  {
    key: "starter",
    name: "Starter",
    credits: 100,
    price: 10,
    perCredit: "$0.10",
    isPopular: true,
    accentColor: "text-[var(--primary)]",
    bgColor: "bg-[var(--soft)]",
    iconBg: "bg-[var(--primary)]",
    features: [
      "100 generation credits",
      "Next.js + TypeScript output",
      "Live preview",
      "GitHub export",
      "Priority queue",
      "Email support",
    ],
    cta: "Buy Starter Pack",
  },
  {
    key: "builder",
    name: "Builder",
    credits: 250,
    price: 23,
    perCredit: "$0.092",
    accentColor: "text-violet-600",
    bgColor: "bg-violet-50",
    iconBg: "bg-violet-500",
    features: [
      "250 generation credits",
      "Next.js + TypeScript output",
      "Live preview",
      "GitHub export",
      "Priority queue",
      "API access",
      "Email support",
    ],
    cta: "Buy Builder Pack",
  },
  {
    key: "pro",
    name: "Pro",
    credits: 500,
    price: 42,
    perCredit: "$0.084",
    isBestValue: true,
    accentColor: "text-orange-600",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-500",
    features: [
      "500 generation credits",
      "Next.js + TypeScript output",
      "Live preview",
      "GitHub export",
      "Priority queue",
      "API access",
      "Custom domain deploy",
      "Dedicated support",
    ],
    cta: "Buy Pro Pack",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "How do credits work?",
    answer:
      "Each generation uses one credit, regardless of site complexity or size. Credits never expire, so you can use them at your own pace.",
  },
  {
    question: "What frameworks does Builder output?",
    answer:
      "All sites are generated as Next.js 14 App Router projects with TypeScript and Tailwind CSS.",
  },
  {
    question: "Do I own the generated code?",
    answer:
      "Yes, 100%. Once exported, the code is entirely yours with no licensing restrictions.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. Every new account starts with 50 free credits — enough to generate and experiment with up to 50 websites. No credit card required.",
  },
];