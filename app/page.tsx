"use client";

import { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight, Zap, Globe, Download, Terminal, FileCode, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { pricingTiers } from "@/lib/data";
type faqItems = any;
const faqItems: any = [];
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const STATS = [
  { value: "10K+", label: "Websites Generated" },
  { value: "< 60s", label: "Average Build Time" },
  { value: "100%", label: "Production Ready" },
  { value: "Free", label: "To Get Started" },
];

const FEATURES = [
  {
    id: "ai-powered",
    icon: Sparkles,
    iconBg: "bg-violet-500",
    title: "AI-Powered",
    description: "Describe what you want and our AI builds it instantly",
    badge: "GPT-4o",
    badgeColor: "text-emerald-700 bg-emerald-100",
    watermark: "✦",
    span: "col-span-2",
  },
  {
    id: "production-code",
    icon: FileCode,
    iconBg: "bg-blue-500",
    title: "Production Code",
    description: "Clean, typed, production-ready code output",
    badge: "TypeScript",
    badgeColor: "text-blue-700 bg-blue-100",
    watermark: "</>",
    span: "col-span-1",
  },
  {
    id: "live-preview",
    icon: Globe,
    iconBg: "bg-emerald-500",
    title: "Live Preview",
    description: "See your website come to life in real time",
    badge: "Instant",
    badgeColor: "text-emerald-700 bg-emerald-100",
    watermark: "◎",
    span: "col-span-1",
  },
  {
    id: "full-stack",
    icon: Terminal,
    iconBg: "bg-orange-500",
    title: "Full Stack",
    description: "Complete frontend with components and styling",
    badge: "Next.JS",
    badgeColor: "text-orange-700 bg-orange-100",
    watermark: "⬡",
    span: "col-span-1",
  },
  {
    id: "export-ready",
    icon: Download,
    iconBg: "bg-red-500",
    title: "Export Ready",
    description: "Download and deploy anywhere you want",
    badge: "One click",
    badgeColor: "text-orange-700 bg-orange-100",
    watermark: "↓",
    span: "col-span-1",
  },
  {
    id: "lightning-fast",
    icon: Zap,
    iconBg: "bg-yellow-500",
    title: "Lightning Fast",
    description: "Generate full websites in under a minute",
    badge: "< 60s",
    badgeColor: "text-yellow-700 bg-yellow-100",
    watermark: "⚡",
    span: "col-span-1",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    color: "bg-violet-500",
    title: "Describe your vision",
    description:
      "Type what you want in plain English — brand, style, content, anything.",
  },
  {
    step: "02",
    color: "bg-blue-500",
    title: "AI generates your site",
    description:
      "Our AI builds a complete, responsive website with real code in under a minute.",
  },
  {
    step: "03",
    color: "bg-emerald-500",
    title: "Export & deploy",
    description:
      "Preview, edit, download the full source code, and deploy it anywhere.",
  },
];

const EXAMPLE_PROJECTS = [
  {
    id: "tesla",
    title: "Tesla Website",
    subtitle: "AI-generated Tesla website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/df25a263cf98456b803e73753e0d5d1c.jpg",
  },
  {
    id: "apple",
    title: "Apple Store Website",
    subtitle: "AI-generated Apple website",
    image: "https://s3-alpha.figma.com/hub/file/2219958310232930685/cacc76a6-e76b-4946-9b14-d5425e559779-cover.png",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    subtitle: "AI-generated portfolio website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8bc3907d73e8487aa336dcfff9887a83.png",
  },
  {
    id: "saas",
    title: "SaaS Dashboard",
    subtitle: "AI-generated SaaS product",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bf08b52a71d84f76894446da422af5fd.jpg",
  },
];

const PREVIEW_PRICING = pricingTiers.slice(0, 4);

const PREVIEW_FAQS = faqItems.slice(0, 3);

// ─── Hero dot/star background ────────────────────────────────────────────────

const DOTS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.floor((i * 137.508) % 100),
  y: Math.floor((i * 97.3) % 100),
  size: i % 5 === 0 ? 4 : 2,
  opacity: 0.15 + (i % 4) * 0.08,
}));

// ─── Variants ────────────────────────────────────────────────────────────────

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Carousel ────────────────────────────────────────────────────────────────

function ExamplesCarousel() {
  const [active, setActive] = useState(1);
  const total = EXAMPLE_PROJECTS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative flex w-full items-center justify-center gap-4 overflow-hidden py-8">
        {EXAMPLE_PROJECTS.map((proj, i) => {
          const offset = ((i - active + total) % total + total) % total;
          const isCenter = offset === 0;
          const isLeft = offset === total - 1;
          const isRight = offset === 1;
          const isHidden = !isCenter && !isLeft && !isRight;

          return (
            <motion.div
              key={proj.id}
              animate={{
                scale: isCenter ? 1 : 0.82,
                opacity: isHidden ? 0 : isCenter ? 1 : 0.55,
                zIndex: isCenter ? 10 : 1,
                x: isLeft ? "-55%" : isRight ? "55%" : "0%",
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={cn(
                "absolute w-[min(520px,88vw)] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.13)]",
                isCenter ? "relative" : "pointer-events-none"
              )}
              style={{ position: isCenter ? "relative" : "absolute" }}
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-black/8">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-[300px] object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='520' height='300' fill='%23e5e7eb'%3E%3Crect width='520' height='300'/%3E%3C/svg%3E";
                  }}
                />
                <div className="p-4">
                  <p className="font-semibold text-gray-900">{proj.title}</p>
                  <p className="text-sm text-gray-500">{proj.subtitle}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prev/Next */}
      <button
        onClick={prev}
        aria-label="Previous example"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/10 shadow-sm hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 text-gray-700" />
      </button>
      <button
        onClick={next}
        aria-label="Next example"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/10 shadow-sm hover:bg-gray-50 transition-colors"
      >
        <ChevronRight className="h-4 w-4 text-gray-700" />
      </button>

      {/* Dots */}
      <div className="mt-4 flex gap-2">
        {EXAMPLE_PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to example ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active
                ? "w-6 bg-violet-600"
                : "w-2 bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FaqAccordion({ items }: { items: typeof PREVIEW_FAQS }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900">{item.question}</span>
            <motion.span
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="ml-4 flex-shrink-0"
            >
              <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />
            </motion.span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #ddd6fe 0%, #ede9fe 30%, #f5f5fa 70%)",
          minHeight: "620px",
        }}
      >
        {/* Dot field */}
        <div className="pointer-events-none absolute inset-0">
          {DOTS.map((d) => (
            <span
              key={d.id}
              className="absolute rounded-full bg-violet-500"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: d.size,
                height: d.size,
                opacity: d.opacity,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-16 text-center">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={heroItem}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-violet-700 backdrop-blur-sm shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroItem}
              className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight md:text-6xl"
            >
              {t("hero.headline1")}
              <br />
              <span className="text-violet-600">{t("hero.headline2")}</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={heroItem}
              className="max-w-xl text-base text-gray-500 leading-relaxed"
            >
              {t("hero.subhead")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)] hover:bg-violet-700 transition-all duration-200"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/examples"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 backdrop-blur-sm hover:bg-white transition-all duration-200"
              >
                {t("hero.cta.secondary")}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-4 flex flex-wrap justify-center gap-8"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={statItem}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl font-bold text-gray-900">
                    {s.value}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-[#f5f5fa]">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {t("features.heading")}
            </h2>
            <p className="mt-2 text-gray-500">{t("features.subheading")}</p>
            <div className="mt-4 mx-auto h-px w-48 bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
          </Reveal>

          {/* Bento grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Row 1: wide + narrow */}
            {FEATURES.slice(0, 2).map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Reveal
                  key={feat.id}
                  delay={i * 0.08}
                  className={cn(
                    feat.span === "col-span-2" ? "col-span-2" : "col-span-1"
                  )}
                >
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-2xl border border-black/6 bg-white p-6 h-full shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
                  >
                    <div
                      className={cn(
                        "mb-4 flex h-10 w-10 items-center justify-center rounded-xl",
                        feat.iconBg
                      )}
                    >
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-gray-900">{feat.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{feat.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {feat.id === "ai-powered"
                          ? "Powered by"
                          : feat.id === "production-code"
                          ? "Always typed"
                          : feat.id === "live-preview"
                          ? "Rendering"
                          : feat.id === "full-stack"
                          ? "Built with"
                          : feat.id === "export-ready"
                          ? "Export"
                          : "Build time"}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          feat.badgeColor
                        )}
                      >
                        {feat.badge}
                      </span>
                    </div>
                    {/* Watermark */}
                    <span className="pointer-events-none absolute bottom-4 right-6 text-6xl font-black text-gray-100 select-none">
                      {feat.watermark}
                    </span>
                  </motion.div>
                </Reveal>
              );
            })}

            {/* Row 2: narrow + narrow + narrow */}
            {FEATURES.slice(2, 5).map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Reveal key={feat.id} delay={(i + 2) * 0.08}>
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-2xl border border-black/6 bg-white p-6 h-full shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
                  >
                    <div
                      className={cn(
                        "mb-4 flex h-10 w-10 items-center justify-center rounded-xl",
                        feat.iconBg
                      )}
                    >
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-gray-900">{feat.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{feat.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {feat.id === "live-preview"
                          ? "Rendering"
                          : feat.id === "full-stack"
                          ? "Built with"
                          : "Export"}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          feat.badgeColor
                        )}
                      >
                        {feat.badge}
                      </span>
                    </div>
                    <span className="pointer-events-none absolute bottom-4 right-6 text-6xl font-black text-gray-100 select-none">
                      {feat.watermark}
                    </span>
                  </motion.div>
                </Reveal>
              );
            })}

            {/* Row 3: narrow + wide */}
            {FEATURES.slice(5, 6).map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Reveal key={feat.id} delay={(i + 5) * 0.08}>
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-2xl border border-black/6 bg-white p-6 h-full shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
                  >
                    <div
                      className={cn(
                        "mb-4 flex h-10 w-10 items-center justify-center rounded-xl",
                        feat.iconBg
                      )}
                    >
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-gray-900">{feat.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{feat.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-gray-400">Build time</span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          feat.badgeColor
                        )}
                      >
                        {feat.badge}
                      </span>
                    </div>
                    <span className="pointer-events-none absolute bottom-4 right-6 text-6xl font-black text-gray-100 select-none">
                      {feat.watermark}
                    </span>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-[#f5f5fa]">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {t("howItWorks.heading")}
            </h2>
            <p className="mt-2 text-gray-500">{t("howItWorks.subheading")}</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full text-white font-bold text-sm",
                      step.color
                    )}
                  >
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAMPLES CAROUSEL ────────────────────────────────────────────── */}
      <section id="examples" className="py-20 bg-[#f5f5fa]">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {t("examples.heading")}
            </h2>
            <p className="mt-2 text-gray-500">{t("examples.subheading")}</p>
          </Reveal>
          <ExamplesCarousel />
        </div>
      </section>

      {/* ── VIDEO TUTORIAL ───────────────────────────────────────────────── */}
      <section id="tutorial" className="py-20 bg-[#f5f5fa]">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {t("tutorial.heading")}
            </h2>
            <p className="mt-2 text-gray-500">{t("tutorial.subheading")}</p>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.10)]">
              <div className="h-3 bg-gray-100 flex items-center px-3 gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-green-400" />
              </div>
              <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8bc3907d73e8487aa336dcfff9887a83.png"
                  alt="Builder tutorial preview"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                    <span className="ml-1 text-white text-xl">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 flex items-center gap-3">
                  <span className="text-white text-xs">▶</span>
                  <div className="flex-1 h-1 bg-white/20 rounded-full">
                    <div className="h-1 w-0 bg-white rounded-full" />
                  </div>
                  <span className="text-white/60 text-xs">0:00 / 0:32</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 bg-[#f5f5fa]">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-violet-700 mb-4">
              <Star className="h-3.5 w-3.5" />
              {t("pricing.badge")}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {t("pricing.heading")}
            </h2>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {t("pricing.subheading")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PREVIEW_PRICING.map((tier, i) => (
              <Reveal key={tier.key} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "relative flex flex-col rounded-2xl border p-5 h-full",
                    tier.isPopular
                      ? "border-violet-400 bg-white shadow-[0_4px_24px_rgba(124,58,237,0.18)]"
                      : "border-black/8 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
                  )}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wide">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={cn(
                      "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
                      tier.iconBg
                    )}
                  >
                    <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>

                  <p className="text-sm font-semibold text-gray-700">
                    {tier.credits} credits
                  </p>

                  {tier.price === 0 ? (
                    <div className="mt-1">
                      <span className="text-3xl font-extrabold text-gray-900">
                        Free
                      </span>
                      <span className="ml-1 text-sm text-gray-400">forever</span>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <span className="text-3xl font-extrabold text-gray-900">
                        ${tier.price}
                      </span>
                      <span className="ml-1 text-sm text-gray-400">one-time</span>
                    </div>
                  )}

                  <p className={cn("mt-1 text-xs font-medium", tier.accentColor)}>
                    {tier.creditLabel}
                  </p>

                  <ul className="mt-4 flex-1 space-y-2">
                    {tier.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check
                          className={cn("mt-0.5 h-3.5 w-3.5 flex-shrink-0", tier.accentColor)}
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/pricing"
                    className={cn(
                      "mt-5 block rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200",
                      tier.isPopular
                        ? "bg-violet-600 text-white hover:bg-violet-700 shadow-[0_2px_8px_rgba(124,58,237,0.3)]"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {tier.price === 0
                      ? "Get started free"
                      : `Get ${tier.credits} credits`}
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 text-center">
            <Link
              href="/pricing"
              className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors"
            >
              {t("pricing.viewAll")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ PREVIEW ──────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-[#f5f5fa]">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 mb-3">
                    <Star className="h-3 w-3" />
                    {t("faq.badge")}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("faq.heading")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{t("faq.subheading")}</p>
                </div>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {t("faq.viewAll")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <FaqAccordion items={PREVIEW_FAQS} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section id="cta" className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
              }}
            >
              {/* Dot field on CTA */}
              <div className="pointer-events-none absolute inset-0">
                {DOTS.slice(0, 20).map((d) => (
                  <span
                    key={d.id}
                    className="absolute rounded-full bg-white"
                    style={{
                      left: `${d.x}%`,
                      top: `${d.y}%`,
                      width: d.size,
                      height: d.size,
                      opacity: d.opacity * 0.5,
                    }}
                  />
                ))}
              </div>

              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t("cta.badge")}
                </span>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">
                  {t("cta.heading")}
                </h2>
                <p className="mt-3 text-white/70 max-w-md mx-auto">
                  {t("cta.subheading")}
                </p>
                <div className="mt-8">
                  <Link
                    href="/generate"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-violet-700 hover:bg-violet-50 transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
                  >
                    {t("cta.button")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}