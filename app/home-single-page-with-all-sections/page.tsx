"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight, Zap, Globe, Download, FileCode, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { pricingTiers } from "@/lib/data";
type faqItems = any;
const faqItems: any = [];
import { useTranslations } from "next-intl";

// ─── Inline mock data ────────────────────────────────────────────────────────

const STATS = [
  { value: "10K+", label: "Websites Generated" },
  { value: "< 60s", label: "Average Build Time" },
  { value: "100%", label: "Production Ready" },
  { value: "Free", label: "To Get Started" },
];

const FEATURES = [
  {
    id: "ai",
    icon: Sparkles,
    iconBg: "bg-violet-500",
    title: "AI-Powered",
    desc: "Describe what you want and our AI builds it instantly",
    tag: "GPT-4o",
    tagColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    label: "Powered by",
    watermarkColor: "text-violet-100",
  },
  {
    id: "code",
    icon: FileCode,
    iconBg: "bg-blue-500",
    title: "Production Code",
    desc: "Clean, typed, production-ready code output",
    tag: "TypeScript",
    tagColor: "text-blue-600 bg-blue-50 border-blue-200",
    label: "Always typed",
    watermarkColor: "text-blue-100",
  },
  {
    id: "preview",
    icon: Globe,
    iconBg: "bg-emerald-500",
    title: "Live Preview",
    desc: "See your website come to life in real time",
    tag: "Instant",
    tagColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    label: "Rendering",
    watermarkColor: "text-emerald-100",
  },
  {
    id: "stack",
    icon: Star,
    iconBg: "bg-orange-500",
    title: "Full Stack",
    desc: "Complete frontend with components and styling",
    tag: "Next.JS",
    tagColor: "text-orange-600 bg-orange-50 border-orange-200",
    label: "Built with",
    watermarkColor: "text-orange-100",
  },
  {
    id: "export",
    icon: Download,
    iconBg: "bg-red-500",
    title: "Export Ready",
    desc: "Download and deploy anywhere you want",
    tag: "One click",
    tagColor: "text-red-600 bg-red-50 border-red-200",
    label: "Export",
    watermarkColor: "text-red-100",
  },
  {
    id: "fast",
    icon: Zap,
    iconBg: "bg-yellow-500",
    title: "Lightning Fast",
    desc: "Generate full websites in under a minute",
    tag: "< 60s",
    tagColor: "text-yellow-700 bg-yellow-50 border-yellow-200",
    label: "Build time",
    watermarkColor: "text-yellow-100",
  },
];

const HOW_STEPS = [
  {
    num: "01",
    color: "bg-violet-500",
    title: "Describe your vision",
    desc: "Type what you want in plain English — brand, style, content, anything.",
  },
  {
    num: "02",
    color: "bg-blue-500",
    title: "AI generates your site",
    desc: "Our AI builds a complete, responsive website with real code in under a minute.",
  },
  {
    num: "03",
    color: "bg-emerald-500",
    title: "Export & deploy",
    desc: "Preview, edit, download the full source code, and deploy it anywhere.",
  },
];

const EXAMPLE_SLIDES = [
  {
    id: 1,
    title: "Tesla Website",
    subtitle: "AI-generated Tesla website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/df25a263cf98456b803e73753e0d5d1c.jpg",
    side: "left",
  },
  {
    id: 2,
    title: "Apple Store Website",
    subtitle: "AI-generated Apple website",
    image: "https://s3-alpha.figma.com/hub/file/2219958310232930685/cacc76a6-e76b-4946-9b14-d5425e559779-cover.png",
    side: "center",
  },
  {
    id: 3,
    title: "Portfolio Website",
    subtitle: "AI-generated portfolio website",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/b0630c4ad3ab4934b57aa5d1247a15ab.jpg",
    side: "right",
  },
];

// ─── Dot grid background ─────────────────────────────────────────────────────

function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(109,40,217,0.18) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function HeroSection() {
  const t = useTranslations();
  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#ede9fe] via-[#f3f0ff] to-[#f8f7ff] pt-24 pb-16">
      <DotGrid />
      {/* floating dots */}
      {[
        { top: "12%", left: "8%", size: 6, opacity: 0.5 },
        { top: "22%", left: "18%", size: 4, opacity: 0.35 },
        { top: "8%", left: "55%", size: 5, opacity: 0.4 },
        { top: "18%", left: "78%", size: 7, opacity: 0.45 },
        { top: "35%", left: "90%", size: 4, opacity: 0.3 },
        { top: "60%", left: "5%", size: 5, opacity: 0.35 },
        { top: "70%", left: "85%", size: 6, opacity: 0.4 },
        { top: "80%", left: "30%", size: 4, opacity: 0.25 },
      ].map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-violet-500"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* badge */}
        <motion.div variants={heroItem}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-violet-200 bg-white/70 text-violet-700 text-sm font-medium mb-8 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </span>
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight mb-2"
        >
          {t("hero.headline")}
        </motion.h1>
        <motion.h1
          variants={heroItem}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary)] leading-tight mb-6"
        >
          {t("hero.headlineAccent")}
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="text-gray-500 text-lg leading-relaxed max-w-xl mb-10"
        >
          {t("hero.subheadline")}
        </motion.p>

        <motion.div variants={heroItem} className="flex flex-wrap gap-3 justify-center mb-14">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-base shadow-[0_4px_20px_rgba(109,40,217,0.35)] hover:bg-violet-700 transition-all duration-200"
          >
            {t("hero.cta1")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/examples"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-base hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            {t("hero.cta2")}
          </Link>
        </motion.div>

        {/* stats */}
        <motion.div
          variants={heroItem}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">{s.value}</span>
              <span className="text-xs text-gray-500 mt-0.5">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Features bento ──────────────────────────────────────────────────────────

function FeaturesSection() {
  const t = useTranslations();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {t("features.heading")}
            </h2>
            <p className="text-gray-500 text-lg">{t("features.subheading")}</p>
          </div>
        </Reveal>

        {/* Bento grid: 2 wide + 2 medium + 2 wide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Row 1: AI-Powered (wide) + Production Code (wide) */}
          {FEATURES.slice(0, 2).map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.id} delay={i * 0.08}>
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)] transition-all duration-300 min-h-[180px] flex flex-col justify-between">
                  <div>
                    <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${f.iconBg} mb-4`}>
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <p className="font-bold text-gray-900 text-lg mb-1">{f.title}</p>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-gray-400">{f.label}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${f.tagColor}`}>
                      {f.tag}
                    </span>
                  </div>
                  {/* watermark icon */}
                  <Icon
                    className={`absolute -bottom-4 -right-4 h-28 w-28 ${f.watermarkColor} opacity-60`}
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            );
          })}

          {/* Row 2: Live Preview + Full Stack */}
          {FEATURES.slice(2, 4).map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.id} delay={i * 0.08 + 0.1}>
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)] transition-all duration-300 min-h-[180px] flex flex-col justify-between">
                  <div>
                    <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${f.iconBg} mb-4`}>
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <p className="font-bold text-gray-900 text-lg mb-1">{f.title}</p>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-gray-400">{f.label}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${f.tagColor}`}>
                      {f.tag}
                    </span>
                  </div>
                  <Icon
                    className={`absolute -bottom-4 -right-4 h-28 w-28 ${f.watermarkColor} opacity-60`}
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            );
          })}

          {/* Row 3: Export Ready + Lightning Fast */}
          {FEATURES.slice(4, 6).map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.id} delay={i * 0.08 + 0.2}>
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)] transition-all duration-300 min-h-[180px] flex flex-col justify-between">
                  <div>
                    <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${f.iconBg} mb-4`}>
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <p className="font-bold text-gray-900 text-lg mb-1">{f.title}</p>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-gray-400">{f.label}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${f.tagColor}`}>
                      {f.tag}
                    </span>
                  </div>
                  <Icon
                    className={`absolute -bottom-4 -right-4 h-28 w-28 ${f.watermarkColor} opacity-60`}
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const t = useTranslations();
  return (
    <section className="py-24 bg-[#f8f7ff]">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {t("how.heading")}
            </h2>
            <p className="text-gray-500 text-base">{t("how.subheading")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center">
                <span
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${step.color} text-white font-bold text-lg mb-5 shadow-md`}
                >
                  {step.num}
                </span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Examples carousel ────────────────────────────────────────────────────────

function ExamplesSection() {
  const t = useTranslations();
  const [active, setActive] = useState(1);

  const prev = () => setActive((a) => (a === 0 ? EXAMPLE_SLIDES.length - 1 : a - 1));
  const next = () => setActive((a) => (a === EXAMPLE_SLIDES.length - 1 ? 0 : a + 1));

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {t("examples.heading")}
            </h2>
            <p className="text-gray-500 text-base">{t("examples.subheading")}</p>
          </div>
        </Reveal>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-4 min-h-[380px]">
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous example"
            className="absolute left-0 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          {/* Slides */}
          <div className="flex items-center justify-center gap-4 w-full">
            {EXAMPLE_SLIDES.map((slide, i) => {
              const isCenter = i === active;
              const isLeft = i === (active - 1 + EXAMPLE_SLIDES.length) % EXAMPLE_SLIDES.length;
              const isRight = i === (active + 1) % EXAMPLE_SLIDES.length;

              if (!isCenter && !isLeft && !isRight) return null;

              return (
                <motion.div
                  key={slide.id}
                  layout
                  animate={{
                    scale: isCenter ? 1 : 0.82,
                    opacity: isCenter ? 1 : 0.55,
                    zIndex: isCenter ? 10 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-100 flex-shrink-0 ${
                    isCenter
                      ? "w-[340px] md:w-[420px]"
                      : "w-[220px] md:w-[280px] hidden md:block"
                  }`}
                  style={{ cursor: isCenter ? "default" : "pointer" }}
                  onClick={() => !isCenter && setActive(i)}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full object-cover"
                    style={{ height: isCenter ? 280 : 200 }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {isCenter && (
                    <div className="p-4 bg-white">
                      <p className="font-bold text-gray-900 text-base">{slide.title}</p>
                      <p className="text-gray-500 text-sm">{slide.subtitle}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next example"
            className="absolute right-0 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-50 transition-all"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {EXAMPLE_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i === active ? "bg-[var(--primary)] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Video tutorial ───────────────────────────────────────────────────────────

function VideoSection() {
  const t = useTranslations();
  return (
    <section className="py-24 bg-[#f8f7ff]">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {t("video.heading")}
            </h2>
            <p className="text-gray-500 text-base">{t("video.subheading")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)] bg-white p-3">
            <div className="rounded-xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center">
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8bc3907d73e8487aa336dcfff9887a83.png"
                alt="Builder tutorial preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.background = "#1e1b4b";
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PricingSection() {
  const t = useTranslations();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {t("pricing.badge")}
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {t("pricing.heading")}
            </h2>
            <p className="text-gray-500 text-base max-w-md mx-auto">
              {t("pricing.subheading")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.key} delay={i * 0.08}>
              <div
                className={`relative rounded-2xl border p-6 flex flex-col h-full transition-all duration-300 ${
                  tier.isPopular
                    ? "border-[var(--primary)] shadow-[0_4px_32px_-8px_rgba(109,40,217,0.25)] bg-white"
                    : "border-gray-200 bg-gray-50 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold tracking-wide uppercase shadow">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <span
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${tier.iconBg} mb-4`}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </span>

                <p className="text-sm font-semibold text-gray-500 mb-1">
                  {tier.credits} credits
                </p>

                {tier.price === 0 ? (
                  <div className="mb-1">
                    <span className="text-4xl font-extrabold text-gray-900">Free</span>
                    <span className="text-gray-400 text-sm ml-1">forever</span>
                  </div>
                ) : (
                  <div className="mb-1">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${tier.price}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">one-time</span>
                  </div>
                )}

                <p className={`text-sm font-semibold mb-5 ${tier.accentColor}`}>
                  {tier.creditLabel}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/generate"
                  className={`w-full text-center py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    tier.isPopular
                      ? "bg-[var(--primary)] text-white hover:bg-violet-700 shadow-[0_4px_16px_rgba(109,40,217,0.3)]"
                      : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {tier.price === 0
                    ? "Get started free"
                    : `Get ${tier.credits} credits`}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors"
            >
              {t("pricing.viewAll")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ teaser ───────────────────────────────────────────────────────────────

function FAQSection() {
  const t = useTranslations();
  return (
    <section className="py-16 bg-[#f8f7ff]">
      <div className="max-w-5xl mx-auto px-4">
        <Reveal>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-medium mb-4">
                <Sparkles className="h-3 w-3" />
                {t("faq.badge")}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                {t("faq.heading")}
              </h2>
              <p className="text-gray-500 text-sm">{t("faq.subheading")}</p>
            </div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-violet-700 transition-all duration-200 shadow-[0_4px_16px_rgba(109,40,217,0.3)] whitespace-nowrap"
            >
              {t("faq.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA banner ───────────────────────────────────────────────────────────────

function CTASection() {
  const t = useTranslations();
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 px-8 py-16 text-center shadow-[0_8px_48px_-8px_rgba(109,40,217,0.5)]">
            {/* dot grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* floating dots */}
            {[
              { top: "15%", left: "10%", size: 5 },
              { top: "25%", left: "80%", size: 4 },
              { top: "65%", left: "15%", size: 6 },
              { top: "70%", left: "75%", size: 4 },
              { top: "40%", left: "5%", size: 3 },
              { top: "50%", left: "92%", size: 5 },
            ].map((d, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white/30"
                style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
              />
            ))}

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                {t("cta.badge")}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                {t("cta.heading")}
              </h2>
              <p className="text-violet-200 text-lg mb-10 max-w-md mx-auto">
                {t("cta.subheading")}
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-violet-700 font-bold text-base hover:bg-violet-50 transition-all duration-200 shadow-lg"
              >
                {t("cta.button")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeAllSectionsPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ExamplesSection />
      <VideoSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}