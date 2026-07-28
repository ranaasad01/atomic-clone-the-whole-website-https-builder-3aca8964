"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Code2, Globe, Download, CheckCircle, ArrowRight, Tag, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import Link from "next/link";

interface ChangelogEntry {
  version: string;
  date: string;
  tag: "major" | "minor" | "patch" | "beta";
  title: string;
  description: string;
  changes: {
    type: "added" | "improved" | "fixed" | "removed";
    text: string;
  }[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: "2.4.0",
    date: "January 28, 2026",
    tag: "major",
    title: "Multi-page generation and GitHub export",
    description: "Builder now generates complete multi-page websites in a single prompt. Export directly to a GitHub repository with one click.",
    changes: [
      { type: "added", text: "Multi-page website generation from a single prompt" },
      { type: "added", text: "GitHub repository export with automatic commit messages" },
      { type: "added", text: "Page-level routing with Next.js App Router structure" },
      { type: "added", text: "Shared layout components across generated pages" },
      { type: "improved", text: "AI prompt understanding for complex site structures" },
      { type: "improved", text: "Code output quality for TypeScript strict mode compliance" },
      { type: "fixed", text: "Occasional hydration mismatch in generated server components" },
    ],
  },
  {
    version: "2.3.2",
    date: "January 14, 2026",
    tag: "patch",
    title: "Performance improvements and bug fixes",
    description: "A focused patch release addressing generation speed, preview reliability, and several edge-case bugs reported by the community.",
    changes: [
      { type: "improved", text: "Generation speed reduced by an average of 18% across all tiers" },
      { type: "improved", text: "Live preview iframe loads 40% faster on first render" },
      { type: "fixed", text: "ZIP export occasionally missing Tailwind config file" },
      { type: "fixed", text: "Dark mode toggle not persisting across page refreshes in preview" },
      { type: "fixed", text: "Mobile layout breaking on generated sites with sticky navbars" },
    ],
  },
  {
    version: "2.3.0",
    date: "December 19, 2025",
    tag: "minor",
    title: "API access and internationalization support",
    description: "Builder and Pro tier users can now access the generation API programmatically. Generated sites also support i18n out of the box.",
    changes: [
      { type: "added", text: "REST API for programmatic site generation (Builder and Pro tiers)" },
      { type: "added", text: "API key management in the Settings dashboard" },
      { type: "added", text: "Internationalization scaffolding with next-intl in generated sites" },
      { type: "added", text: "Rate limiting and usage analytics in the API dashboard" },
      { type: "improved", text: "Settings page redesigned with grouped form sections" },
      { type: "fixed", text: "API keys not invalidating immediately after deletion" },
    ],
  },
  {
    version: "2.2.0",
    date: "November 30, 2025",
    tag: "minor",
    title: "Custom domain deployment and Vercel integration",
    description: "Pro tier users can now deploy generated sites directly to Vercel and connect a custom domain without leaving Builder.",
    changes: [
      { type: "added", text: "One-click deploy to Vercel from the project dashboard" },
      { type: "added", text: "Custom domain configuration for Pro tier projects" },
      { type: "added", text: "Deployment status tracking with live build logs" },
      { type: "improved", text: "Project dashboard redesigned with cleaner card layout" },
      { type: "improved", text: "Generated sites now include vercel.json with optimal settings" },
      { type: "fixed", text: "Environment variable handling in deployed projects" },
    ],
  },
  {
    version: "2.1.0",
    date: "November 8, 2025",
    tag: "minor",
    title: "Image generation and Unsplash integration",
    description: "Builder now automatically sources relevant images from Unsplash and embeds them into generated sites, making every output visually complete.",
    changes: [
      { type: "added", text: "Automatic Unsplash image sourcing based on site content" },
      { type: "added", text: "Image optimization with next/image in all generated sites" },
      { type: "added", text: "Alt text generation for accessibility compliance" },
      { type: "improved", text: "Hero sections now include high-quality background imagery" },
      { type: "fixed", text: "Images occasionally not loading in live preview on slow connections" },
    ],
  },
  {
    version: "2.0.0",
    date: "October 15, 2025",
    tag: "major",
    title: "Builder 2.0 — complete platform rewrite",
    description: "A ground-up rebuild of the Builder platform. Faster generation, a new live preview engine, and a redesigned UI that makes the entire workflow feel instant.",
    changes: [
      { type: "added", text: "New live preview engine with hot-reload on every generation" },
      { type: "added", text: "Redesigned generation UI with real-time streaming output" },
      { type: "added", text: "Project history with version snapshots and rollback" },
      { type: "added", text: "Framer Motion animations included in all generated sites" },
      { type: "added", text: "GPT-4o upgrade for significantly better code quality" },
      { type: "improved", text: "Average generation time reduced from 90s to under 60s" },
      { type: "improved", text: "Tailwind CSS v3 output with consistent design tokens" },
      { type: "removed", text: "Legacy v1 generation engine (deprecated since v1.8)" },
    ],
  },
  {
    version: "1.9.1",
    date: "September 22, 2025",
    tag: "patch",
    title: "Credit system and billing fixes",
    description: "Fixes for credit deduction edge cases and billing portal issues reported after the v1.9.0 rollout.",
    changes: [
      { type: "fixed", text: "Credits occasionally deducted twice on generation timeout" },
      { type: "fixed", text: "Billing portal not loading for users in certain regions" },
      { type: "fixed", text: "Credit balance not refreshing after purchase without page reload" },
      { type: "improved", text: "Credit transaction history now shows generation IDs" },
    ],
  },
  {
    version: "1.9.0",
    date: "September 5, 2025",
    tag: "beta",
    title: "Beta: component editing and style overrides",
    description: "Early access to in-browser component editing. Select any element in the preview and override its styles without touching code.",
    changes: [
      { type: "added", text: "Visual component selector in the live preview panel" },
      { type: "added", text: "Tailwind class override editor for selected elements" },
      { type: "added", text: "Style changes persist across re-generations" },
      { type: "improved", text: "Preview panel split-view with code and visual side by side" },
    ],
  },
];

const TAG_STYLES: Record<ChangelogEntry["tag"], { label: string; className: string }> = {
  major: { label: "Major", className: "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20" },
  minor: { label: "Minor", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  patch: { label: "Patch", className: "bg-slate-100 text-slate-600 border border-slate-200" },
  beta: { label: "Beta", className: "bg-orange-50 text-orange-700 border border-orange-200" },
};

const CHANGE_TYPE_STYLES: Record<ChangelogEntry["changes"][number]["type"], { label: string; icon: React.ReactNode; className: string }> = {
  added: {
    label: "Added",
    icon: <Sparkles className="h-3 w-3" />,
    className: "text-emerald-700 bg-emerald-50 border border-emerald-200",
  },
  improved: {
    label: "Improved",
    icon: <Zap className="h-3 w-3" />,
    className: "text-[var(--primary)] bg-[var(--soft)] border border-[var(--primary)]/20",
  },
  fixed: {
    label: "Fixed",
    icon: <CheckCircle className="h-3 w-3" />,
    className: "text-blue-700 bg-blue-50 border border-blue-200",
  },
  removed: {
    label: "Removed",
    icon: <Download className="h-3 w-3" />,
    className: "text-red-600 bg-red-50 border border-red-200",
  },
};

function ChangelogCard({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const tag = TAG_STYLES[entry.tag];

  return (
    <Reveal delay={index * 0.06}>
      <div className="relative flex gap-6 md:gap-10">
        {/* Timeline line */}
        <div className="hidden md:flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-[var(--primary)] mt-1.5 ring-4 ring-[var(--primary)]/10 flex-shrink-0" />
          <div className="w-px flex-1 bg-slate-200 mt-2" />
        </div>

        {/* Card */}
        <div className="flex-1 mb-8">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-inset"
              aria-expanded={expanded}
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-sm font-semibold text-slate-800">v{entry.version}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${tag.className}`}>
                    <Tag className="h-3 w-3" />
                    {tag.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {entry.date}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-slate-900 leading-snug">{entry.title}</h2>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{entry.description}</p>
              </div>
              <div className="flex-shrink-0 mt-1 text-slate-400">
                {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </button>

            {/* Changes list */}
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="border-t border-slate-100"
              >
                <ul className="px-6 py-4 space-y-2.5">
                  {entry.changes.map((change, i) => {
                    const style = CHANGE_TYPE_STYLES[change.type];
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 mt-0.5 ${style.className}`}>
                          {style.icon}
                          {style.label}
                        </span>
                        <span className="text-sm text-slate-700 leading-relaxed">{change.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#f8f8fc]">
      {/* Hero */}
      <Reveal>
        <section className="pt-20 pb-12 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--soft)] border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            What&apos;s new
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance mb-4">
            Changelog
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed text-pretty">
            Every update, improvement, and fix to Builder by HotCode. We ship fast and document everything.
          </p>
        </section>
      </Reveal>

      {/* Stats bar */}
      <Reveal delay={0.1}>
        <section className="pb-14 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Code2 className="h-5 w-5" />, value: "2.4.0", label: "Latest version" },
                { icon: <Zap className="h-5 w-5" />, value: "8", label: "Releases this year" },
                { icon: <CheckCircle className="h-5 w-5" />, value: "40+", label: "Improvements shipped" },
                { icon: <Globe className="h-5 w-5" />, value: "Weekly", label: "Release cadence" },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--soft)] text-[var(--primary)] mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Timeline */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {CHANGELOG.map((entry, i) => (
              <ChangelogCard key={entry.version} entry={entry} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-[var(--primary)] px-8 py-12 text-center shadow-[0_8px_40px_-8px_rgba(109,40,217,0.4)]">
              {/* Background dots */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Start for free
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  Ready to build?
                </h2>
                <p className="text-white/70 text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Start generating production-ready websites in seconds with AI.
                </p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[var(--primary)] font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}