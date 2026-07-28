"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { X, ArrowRight, Sparkles, Search, ExternalLink } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const EXAMPLES = [
  {
    id: "1",
    title: "Tesla Landing Page",
    description: "A sleek, dark-themed automotive landing page with hero video, model showcase, and order CTA.",
    category: "E-commerce",
    prompt: "Build a Tesla-style landing page with a dark hero, car model cards, and a bold CTA.",
    gradient: "from-slate-900 via-slate-800 to-zinc-900",
    accentColor: "#E31937",
    tags: ["Dark", "Automotive", "Hero"],
    previewBg: "bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900",
    mockHeadline: "Drive the Future",
    mockSub: "Order yours today. Delivery in 2 weeks.",
    mockCta: "Order Now",
    mockCtaColor: "bg-red-600",
  },
  {
    id: "2",
    title: "Apple Store Clone",
    description: "Minimal product showcase with large imagery, clean typography, and smooth scroll animations.",
    category: "E-commerce",
    prompt: "Create an Apple-style product page with a hero, product grid, and minimal white design.",
    gradient: "from-white via-gray-50 to-gray-100",
    accentColor: "#0071E3",
    tags: ["Minimal", "Product", "White"],
    previewBg: "bg-gradient-to-br from-white via-gray-50 to-gray-100",
    mockHeadline: "Introducing the next generation",
    mockSub: "Designed to inspire. Built to last.",
    mockCta: "Shop Now",
    mockCtaColor: "bg-blue-600",
  },
  {
    id: "3",
    title: "Developer Portfolio",
    description: "A dark, modern portfolio for a full-stack developer with project cards, skills, and contact form.",
    category: "Portfolio",
    prompt: "Build a developer portfolio with a dark hero, project showcase, skills section, and contact form.",
    gradient: "from-gray-950 via-indigo-950 to-gray-900",
    accentColor: "#6366F1",
    tags: ["Dark", "Portfolio", "Developer"],
    previewBg: "bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900",
    mockHeadline: "Alex Chen",
    mockSub: "Full-Stack Developer. Building things that matter.",
    mockCta: "View My Work",
    mockCtaColor: "bg-indigo-600",
  },
  {
    id: "4",
    title: "SaaS Dashboard",
    description: "A clean analytics dashboard with stat cards, charts, and a sidebar navigation for a B2B SaaS product.",
    category: "SaaS",
    prompt: "Create a SaaS analytics dashboard with sidebar nav, KPI cards, and a revenue chart.",
    gradient: "from-slate-50 via-blue-50 to-indigo-50",
    accentColor: "#4F46E5",
    tags: ["Dashboard", "Analytics", "SaaS"],
    previewBg: "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
    mockHeadline: "Analytics Overview",
    mockSub: "Track your growth in real time.",
    mockCta: "View Dashboard",
    mockCtaColor: "bg-indigo-600",
  },
  {
    id: "5",
    title: "Restaurant Website",
    description: "A warm, inviting restaurant site with a full-bleed hero, menu section, and reservation form.",
    category: "Business",
    prompt: "Build a restaurant website with a hero image, menu grid, and online reservation form.",
    gradient: "from-amber-900 via-orange-800 to-red-900",
    accentColor: "#F59E0B",
    tags: ["Warm", "Food", "Booking"],
    previewBg: "bg-gradient-to-br from-amber-900 via-orange-800 to-red-900",
    mockHeadline: "Taste the Difference",
    mockSub: "Fresh ingredients. Unforgettable flavors.",
    mockCta: "Reserve a Table",
    mockCtaColor: "bg-amber-500",
  },
  {
    id: "6",
    title: "Startup Landing Page",
    description: "A vibrant, conversion-focused landing page with a bold hero, feature grid, pricing, and testimonials.",
    category: "SaaS",
    prompt: "Create a startup landing page with a purple gradient hero, feature cards, pricing table, and testimonials.",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    accentColor: "#8B5CF6",
    tags: ["Gradient", "Startup", "Conversion"],
    previewBg: "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700",
    mockHeadline: "Ship faster than ever",
    mockSub: "The all-in-one platform for modern teams.",
    mockCta: "Start Free Trial",
    mockCtaColor: "bg-white text-violet-700",
  },
  {
    id: "7",
    title: "Photography Portfolio",
    description: "A full-screen masonry gallery portfolio for a professional photographer with lightbox and contact.",
    category: "Portfolio",
    prompt: "Build a photography portfolio with a masonry gallery, lightbox viewer, and minimal dark design.",
    gradient: "from-zinc-950 via-zinc-900 to-neutral-900",
    accentColor: "#FAFAFA",
    tags: ["Dark", "Gallery", "Photography"],
    previewBg: "bg-gradient-to-br from-zinc-950 via-zinc-900 to-neutral-900",
    mockHeadline: "Moments Captured",
    mockSub: "Documentary and portrait photography.",
    mockCta: "View Gallery",
    mockCtaColor: "bg-white text-black",
  },
  {
    id: "8",
    title: "Agency Website",
    description: "A bold, editorial creative agency site with asymmetric layouts, large type, and case study cards.",
    category: "Business",
    prompt: "Create a creative agency website with bold typography, asymmetric grid, and case study showcase.",
    gradient: "from-yellow-400 via-orange-400 to-pink-500",
    accentColor: "#F97316",
    tags: ["Bold", "Agency", "Editorial"],
    previewBg: "bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500",
    mockHeadline: "We Build Bold",
    mockSub: "Strategy, design, and code for ambitious brands.",
    mockCta: "See Our Work",
    mockCtaColor: "bg-black text-white",
  },
  {
    id: "9",
    title: "Blog Platform",
    description: "A clean, readable blog with a featured post hero, article grid, category filters, and newsletter signup.",
    category: "Content",
    prompt: "Build a blog platform with a featured article hero, article grid, category tags, and newsletter CTA.",
    gradient: "from-stone-50 via-amber-50 to-orange-50",
    accentColor: "#D97706",
    tags: ["Blog", "Content", "Clean"],
    previewBg: "bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50",
    mockHeadline: "The Weekly Dispatch",
    mockSub: "Ideas, insights, and inspiration every week.",
    mockCta: "Read Latest",
    mockCtaColor: "bg-amber-600",
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(EXAMPLES.map((e) => e.category)))] as const;

type Category = (typeof ALL_CATEGORIES)[number];

export default function ExamplesPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExample, setSelectedExample] = useState<(typeof EXAMPLES)[0] | null>(null);

  const filtered = useMemo(() => {
    return EXAMPLES.filter((ex) => {
      const matchesCategory = activeCategory === "All" || ex.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#F5F5FA]">
      {/* Hero Section */}
      <Reveal>
        <section className="relative pt-20 pb-12 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-violet-200/40 via-purple-100/20 to-transparent rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-white/80 text-violet-700 text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("examples.badge")}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 text-balance">
              {t("examples.headline")}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto text-pretty">
              {t("examples.subheadline")}
            </p>
          </div>
        </section>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.08}>
        <section className="px-4 pb-8 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium border transition-all duration-200",
                    activeCategory === cat
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-700"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("examples.searchPlaceholder")}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Gallery Grid */}
      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((example, i) => (
              <motion.div
                key={example.id}
                variants={scaleIn}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedExample(example)}
                className="group cursor-pointer rounded-2xl bg-white border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(109,40,217,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Preview Area */}
                <div className={cn("relative h-48 overflow-hidden", example.previewBg)}>
                  {/* Mock website preview */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div
                      className="text-lg font-bold mb-1 leading-tight"
                      style={{
                        color: example.gradient.includes("white") || example.gradient.includes("stone") || example.gradient.includes("amber-50") || example.gradient.includes("slate-50")
                          ? "#111"
                          : "#fff",
                      }}
                    >
                      {example.mockHeadline}
                    </div>
                    <div
                      className="text-xs mb-3 opacity-80"
                      style={{
                        color: example.gradient.includes("white") || example.gradient.includes("stone") || example.gradient.includes("amber-50") || example.gradient.includes("slate-50")
                          ? "#555"
                          : "#ddd",
                      }}
                    >
                      {example.mockSub}
                    </div>
                    <button
                      className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-semibold transition-transform",
                        example.mockCtaColor
                      )}
                      tabIndex={-1}
                    >
                      {example.mockCta}
                    </button>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("examples.preview")}
                    </div>
                  </div>
                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {example.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/30 text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Card Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{example.title}</h3>
                    <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                      {example.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{example.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Sparkles className="h-10 w-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p className="text-sm">{t("examples.noResults")}</p>
          </div>
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedExample && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedExample(null)}
            />
            {/* Modal Panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label={selectedExample.title}
            >
              <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Close */}
                <button
                  onClick={() => setSelectedExample(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                  aria-label={t("examples.close")}
                >
                  <X className="h-4 w-4 text-white" aria-hidden="true" />
                </button>

                {/* Preview */}
                <div className={cn("relative h-64 sm:h-80 flex flex-col items-center justify-center", selectedExample.previewBg)}>
                  <div className="text-center px-8">
                    <div
                      className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight"
                      style={{
                        color: selectedExample.gradient.includes("white") || selectedExample.gradient.includes("stone") || selectedExample.gradient.includes("amber-50") || selectedExample.gradient.includes("slate-50")
                          ? "#111"
                          : "#fff",
                      }}
                    >
                      {selectedExample.mockHeadline}
                    </div>
                    <div
                      className="text-sm mb-4 opacity-80"
                      style={{
                        color: selectedExample.gradient.includes("white") || selectedExample.gradient.includes("stone") || selectedExample.gradient.includes("amber-50") || selectedExample.gradient.includes("slate-50")
                          ? "#555"
                          : "#ddd",
                      }}
                    >
                      {selectedExample.mockSub}
                    </div>
                    <button
                      className={cn("px-6 py-2 rounded-full text-sm font-semibold", selectedExample.mockCtaColor)}
                      tabIndex={-1}
                    >
                      {selectedExample.mockCta}
                    </button>
                  </div>
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {selectedExample.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/30 text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-xl font-bold text-gray-900">{selectedExample.title}</h2>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                      {selectedExample.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{selectedExample.description}</p>

                  {/* Prompt */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{t("examples.promptLabel")}</p>
                    <p className="text-sm text-gray-700 italic leading-relaxed">&ldquo;{selectedExample.prompt}&rdquo;</p>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <Link
                      href="/generate"
                      className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark,#5b21b6)] text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
                    >
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      {t("examples.tryThis")}
                    </Link>
                    <button
                      onClick={() => setSelectedExample(null)}
                      className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-all duration-200"
                    >
                      {t("examples.close")}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA Banner */}
      <Reveal delay={0.1}>
        <section className="px-4 pb-20 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-14 text-center">
            {/* Stars decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[
                { top: "15%", left: "8%", size: 3 },
                { top: "25%", left: "20%", size: 2 },
                { top: "60%", left: "5%", size: 2 },
                { top: "75%", left: "15%", size: 3 },
                { top: "10%", right: "10%", size: 2 },
                { top: "40%", right: "6%", size: 3 },
                { top: "70%", right: "12%", size: 2 },
                { top: "85%", right: "25%", size: 2 },
              ].map((star, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/30"
                  style={{
                    top: star.top,
                    left: "left" in star ? star.left : undefined,
                    right: "right" in star ? star.right : undefined,
                    width: star.size,
                    height: star.size,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white/90 text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t("examples.ctaBadge")}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                {t("examples.ctaHeadline")}
              </h2>
              <p className="text-white/80 text-base mb-8 max-w-md mx-auto leading-relaxed">
                {t("examples.ctaSubheadline")}
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-3.5 rounded-xl hover:bg-violet-50 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              >
                {t("examples.ctaButton")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}