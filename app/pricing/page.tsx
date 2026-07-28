"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { pricingTiers } from "@/lib/data";
type faqItems = any;
const faqItems: any = [];
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const COMPARISON_FEATURES = [
  { label: "Generation credits", free: "50 / month", starter: "100", builder: "250", pro: "500" },
  { label: "Next.js + TypeScript output", free: true, starter: true, builder: true, pro: true },
  { label: "Live preview", free: true, starter: true, builder: true, pro: true },
  { label: "Export as ZIP", free: true, starter: true, builder: true, pro: true },
  { label: "GitHub export", free: false, starter: true, builder: true, pro: true },
  { label: "Priority queue", free: false, starter: true, builder: true, pro: true },
  { label: "API access", free: false, starter: false, builder: true, pro: true },
  { label: "Custom domain deploy", free: false, starter: false, builder: false, pro: true },
  { label: "Email support", free: false, starter: true, builder: true, pro: true },
  { label: "Dedicated support", free: false, starter: false, builder: false, pro: true },
  { label: "Credits expiry", free: "Monthly reset", starter: "Never expire", builder: "Never expire", pro: "Never expire" },
];

const TIER_ICON_MAP: Record<string, string> = {
  free: "✦",
  starter: "◈",
  builder: "✦",
  pro: "⚡",
};

const PREVIEW_FAQS = faqItems.slice(0, 3);

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-[var(--primary)]" aria-label="Included" />
    ) : (
      <span className="mx-auto block h-4 w-4 text-center text-gray-300 leading-4" aria-label="Not included">—</span>
    );
  }
  return <span className="text-xs text-gray-600">{value}</span>;
}

export default function PricingPage() {
  const t = useTranslations();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#f5f5fa]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-12 text-center px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-1.5 text-sm text-purple-700 mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {t("pricing.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight text-balance mb-4">
            {t("pricing.headline")}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            {t("pricing.subheadline")}
          </p>
        </section>
      </Reveal>

      {/* Pricing Cards */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.key}
                variants={fadeInUp}
                className={cn(
                  "relative rounded-2xl border bg-white p-6 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)]",
                  tier.isPopular
                    ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20"
                    : "border-gray-100"
                )}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[var(--primary)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow">
                      Most Popular
                    </span>
                  </div>
                )}
                {tier.isBestValue && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-orange-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow">
                      Best Value
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white text-lg font-bold mb-4", tier.iconBg)}>
                  {TIER_ICON_MAP[tier.key]}
                </div>

                {/* Credits */}
                <p className="text-sm font-semibold text-gray-700 mb-1">{tier.credits} credits</p>

                {/* Price */}
                {tier.price === 0 ? (
                  <div className="mb-1">
                    <span className="text-4xl font-extrabold text-gray-900">Free</span>
                    <span className="ml-2 text-sm text-gray-400">forever</span>
                  </div>
                ) : (
                  <div className="mb-1">
                    <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                    <span className="ml-2 text-sm text-gray-400">one-time</span>
                  </div>
                )}

                {/* Credit label */}
                <p className={cn("text-xs font-medium mb-5", tier.accentColor)}>
                  {tier.creditLabel}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className={cn("h-4 w-4 mt-0.5 shrink-0", tier.accentColor)} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/generate"
                  className={cn(
                    "block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200",
                    tier.isPopular
                      ? "bg-[var(--primary)] text-white hover:opacity-90"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  )}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 text-center">
            <Link href="/faq" className="text-sm text-gray-500 underline underline-offset-4 hover:text-[var(--primary)] transition-colors">
              {t("pricing.viewAllPlans")}
            </Link>
          </div>
        </section>
      </Reveal>

      {/* Feature Comparison Table */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              {t("pricing.compareTitle")}
            </h2>
            <p className="text-gray-500 text-base">{t("pricing.compareSubtitle")}</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-5 text-left font-semibold text-gray-700 w-1/3">{t("pricing.featureCol")}</th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.key} className="py-4 px-4 text-center font-semibold text-gray-700">
                      <span className={cn("font-bold", tier.accentColor)}>{tier.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b border-gray-50 last:border-0",
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    )}
                  >
                    <td className="py-3.5 px-5 text-gray-700 font-medium">{row.label}</td>
                    <td className="py-3.5 px-4 text-center">
                      <FeatureCell value={row.free} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <FeatureCell value={row.starter} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <FeatureCell value={row.builder} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <FeatureCell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* FAQ Teaser */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs text-purple-700 mb-3">
                  <ChevronDown className="h-3 w-3" />
                  {t("pricing.faqBadge")}
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                  {t("pricing.faqTitle")}
                </h2>
                <p className="text-gray-500 text-sm">{t("pricing.faqSubtitle")}</p>
              </div>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all duration-200 shrink-0"
              >
                {t("pricing.faqCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden">
              {PREVIEW_FAQS.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-medium text-gray-800 text-sm">{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ml-4",
                        openFaq === i && "rotate-180"
                      )}
                    />
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="px-5 pb-4 text-sm text-gray-500 leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
            style={{
              background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 40%, #8b5cf6 100%)",
            }}
          >
            {/* Decorative dots */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[
                { top: "15%", left: "8%", size: 4 },
                { top: "30%", left: "20%", size: 3 },
                { top: "70%", left: "5%", size: 5 },
                { top: "80%", left: "15%", size: 3 },
                { top: "20%", right: "10%", size: 4 },
                { top: "50%", right: "6%", size: 3 },
                { top: "75%", right: "18%", size: 5 },
                { top: "10%", right: "25%", size: 3 },
              ].map((dot, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    top: dot.top,
                    left: (dot as { left?: string }).left,
                    right: (dot as { right?: string }).right,
                    width: dot.size,
                    height: dot.size,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white/90 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                {t("pricing.ctaBadge")}
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
                {t("pricing.ctaTitle")}
              </h2>
              <p className="text-white/75 text-lg max-w-md mx-auto mb-8 text-pretty leading-relaxed">
                {t("pricing.ctaSubtitle")}
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-base font-semibold text-purple-700 hover:bg-white/90 transition-all duration-200 shadow-lg"
              >
                {t("pricing.ctaButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}