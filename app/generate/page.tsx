"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles, ArrowRight, ChevronDown, X, Check, Clock, Star, Zap, Globe, FileCode, Download, Eye, AlertCircle, ChevronRight } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

// ─── Mock data ────────────────────────────────────────────────────────────────

const EXAMPLE_PROMPTS = [
  "A modern SaaS landing page for a project management tool with pricing and testimonials",
  "A personal portfolio for a UX designer with case studies and contact form",
  "An e-commerce storefront for handmade jewelry with product grid and cart",
  "A restaurant website with menu, reservations, and photo gallery",
  "A startup landing page for an AI writing assistant with feature highlights",
  "A blog platform for a travel writer with featured posts and newsletter signup",
];

const STYLE_OPTIONS = [
  { id: "minimal", label: "Minimal", description: "Clean, whitespace-forward" },
  { id: "bold", label: "Bold", description: "High contrast, strong type" },
  { id: "soft", label: "Soft", description: "Warm tones, rounded shapes" },
  { id: "dark", label: "Dark", description: "Dark mode, sleek surfaces" },
  { id: "playful", label: "Playful", description: "Colorful, energetic" },
  { id: "corporate", label: "Corporate", description: "Professional, trustworthy" },
];

const RECENT_GENERATIONS = [
  {
    id: "1",
    title: "Tesla Website Clone",
    prompt: "A Tesla-inspired automotive website with hero video and model showcase",
    status: "complete",
    time: "42s",
    ago: "2 hours ago",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c89954942691486384a8455af626410b.gif",
  },
  {
    id: "2",
    title: "Alex Chen Portfolio",
    prompt: "A developer portfolio with dark theme, projects grid, and contact form",
    status: "complete",
    time: "38s",
    ago: "5 hours ago",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ecff6824b9ef46358d0f608d726bdfeb.webp",
  },
  {
    id: "3",
    title: "Apple Store Concept",
    prompt: "An Apple-style product page for a new MacBook with specs and buy CTA",
    status: "complete",
    time: "51s",
    ago: "Yesterday",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0e58ec85f4194549bfc7432c71006163.jpg",
  },
];

const STATS = [
  { value: "10K+", label: "Sites Generated" },
  { value: "< 60s", label: "Avg Build Time" },
  { value: "100%", label: "Production Ready" },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const pulseRing: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: [1, 1.15, 1],
    opacity: [0.6, 0, 0.6],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PromptSuggestion({
  text,
  onClick,
}: {
  text: string;
  onClick: (t: string) => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(text)}
      className="text-left px-3 py-2 rounded-xl border border-black/8 bg-white hover:border-[var(--primary)]/30 hover:bg-[var(--soft)] transition-all duration-200 text-sm text-gray-600 hover:text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <span className="line-clamp-2">{text}</span>
    </motion.button>
  );
}

function StyleChip({
  option,
  selected,
  onClick,
}: {
  option: (typeof STYLE_OPTIONS)[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start px-4 py-3 rounded-xl border transition-all duration-200 text-left",
        selected
          ? "border-[var(--primary)] bg-[var(--soft)] shadow-[0_0_0_2px_var(--primary)/20]"
          : "border-black/8 bg-white hover:border-[var(--primary)]/30"
      )}
    >
      <span className={cn("text-sm font-semibold", selected ? "text-[var(--primary)]" : "text-gray-800")}>
        {option.label}
      </span>
      <span className="text-xs text-gray-500 mt-0.5">{option.description}</span>
      {selected && (
        <span className="mt-1.5 flex items-center gap-1 text-xs text-[var(--primary)] font-medium">
          <Check className="h-3 w-3" /> Selected
        </span>
      )}
    </motion.button>
  );
}

function GenerationCard({ gen }: { gen: (typeof RECENT_GENERATIONS)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 32px -8px rgba(0,0,0,0.14)" }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-black/8 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)] group"
    >
      <div className="relative h-36 bg-gray-100 overflow-hidden">
        <img
          src={gen.image}
          alt={gen.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute bottom-2 right-2 flex items-center gap-1 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          <Check className="h-3 w-3" /> Done in {gen.time}
        </span>
      </div>
      <div className="p-4">
        <p className="font-semibold text-gray-900 text-sm">{gen.title}</p>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{gen.prompt}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">{gen.ago}</span>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[var(--primary)] transition-colors">
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[var(--primary)] transition-colors">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Generating animation overlay ─────────────────────────────────────────────

function GeneratingOverlay({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    "Analyzing your prompt...",
    "Designing layout structure...",
    "Writing Next.js components...",
    "Applying Tailwind styles...",
    "Optimizing for production...",
    "Finalizing your website...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return p + 1.4;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    const idx = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
    setStep(idx);
  }, [progress, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-6 max-w-sm w-full px-8">
        {/* Pulsing icon */}
        <div className="relative flex items-center justify-center">
          <motion.div
            variants={pulseRing}
            initial="hidden"
            animate="visible"
            className="absolute w-24 h-24 rounded-full bg-[var(--primary)]/20"
          />
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Building your website</h2>
          <p className="text-sm text-gray-500 mt-1">Powered by GPT-4o</p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{steps[step]}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--primary)] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          {steps.map((s, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 text-sm transition-all duration-300",
                i < step
                  ? "text-emerald-600"
                  : i === step
                  ? "text-[var(--primary)] font-medium"
                  : "text-gray-300"
              )}
            >
              {i < step ? (
                <Check className="h-4 w-4 flex-shrink-0" />
              ) : i === step ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 flex-shrink-0 border-2 border-[var(--primary)] border-t-transparent rounded-full"
                />
              ) : (
                <div className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-gray-200" />
              )}
              {s}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Result preview ────────────────────────────────────────────────────────────

function ResultPreview({ prompt, onReset }: { prompt: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Your website is ready!</h2>
          <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{prompt}</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
        >
          <X className="h-4 w-4" /> New generation
        </button>
      </div>

      {/* Mock preview frame */}
      <div className="rounded-2xl border border-black/8 overflow-hidden shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)]">
        {/* Browser chrome */}
        <div className="bg-gray-50 border-b border-black/8 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-lg border border-black/8 px-3 py-1 text-xs text-gray-400 font-mono">
            preview.builder.hotcode.ai/gen/abc123
          </div>
          <div className="flex gap-2">
            <button className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100 transition-colors">
              <Eye className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Preview content */}
        <div className="bg-gradient-to-br from-violet-50 via-white to-indigo-50 h-80 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, #7c3aed22 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6366f122 0%, transparent 50%)",
            }}
          />
          <div className="relative z-10 text-center px-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-black/8 rounded-full px-4 py-1.5 text-xs text-gray-600 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" /> AI Generated
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              Your Vision,<br />
              <span className="text-[var(--primary)]">Brought to Life</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Production-ready Next.js website generated from your prompt.
            </p>
            <div className="flex gap-3 justify-center mt-5">
              <div className="bg-[var(--primary)] text-white text-xs font-semibold px-4 py-2 rounded-lg">
                Get Started
              </div>
              <div className="bg-white border border-black/10 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg">
                Learn More
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[var(--primary)] text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-[0_4px_12px_rgba(109,40,217,0.3)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.4)] transition-all duration-200"
        >
          <Download className="h-4 w-4" /> Export ZIP
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-white border border-black/10 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:border-[var(--primary)]/30 transition-all duration-200"
        >
          <FileCode className="h-4 w-4" /> View Code
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-white border border-black/10 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:border-[var(--primary)]/30 transition-all duration-200"
        >
          <Globe className="h-4 w-4" /> Deploy
        </motion.button>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 mt-4 flex-wrap">
        {[
          { icon: Clock, label: "Build time", value: "47s" },
          { icon: FileCode, label: "Components", value: "12" },
          { icon: Zap, label: "Lighthouse score", value: "98" },
          { icon: Star, label: "TypeScript", value: "100%" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2 bg-white border border-black/8 rounded-xl px-3 py-2 text-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <stat.icon className="h-4 w-4 text-[var(--primary)]" />
            <span className="text-gray-500">{stat.label}:</span>
            <span className="font-semibold text-gray-900">{stat.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function GeneratePage() {
  const t = useTranslations();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("minimal");
  const [showStylePicker, setShowStylePicker] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = 500;

  function handlePromptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value.slice(0, MAX_CHARS);
    setPrompt(val);
    setCharCount(val.length);
  }

  function handleSuggestion(text: string) {
    setPrompt(text);
    setCharCount(text.length);
    textareaRef.current?.focus();
  }

  function handleGenerate() {
    if (!prompt.trim()) return;
    setSubmittedPrompt(prompt);
    setIsGenerating(true);
    setIsDone(false);
  }

  function handleDone() {
    setIsGenerating(false);
    setIsDone(true);
  }

  function handleReset() {
    setIsDone(false);
    setPrompt("");
    setCharCount(0);
    setSubmittedPrompt("");
  }

  const selectedStyleObj = STYLE_OPTIONS.find((s) => s.id === selectedStyle) ?? STYLE_OPTIONS[0];

  return (
    <>
      <AnimatePresence>
        {isGenerating && <GeneratingOverlay onDone={handleDone} />}
      </AnimatePresence>

      <main className="min-h-screen bg-[#f7f7fb] pt-8 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page header ── */}
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white border border-black/8 rounded-full px-4 py-1.5 text-sm text-gray-600 mb-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                {t("generate.badge")}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight text-balance">
                {t("generate.heading")}
                <span className="text-[var(--primary)]"> {t("generate.headingAccent")}</span>
              </h1>
              <p className="mt-3 text-gray-500 text-lg max-w-xl mx-auto leading-relaxed text-pretty">
                {t("generate.subheading")}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 mt-6 flex-wrap">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Main content ── */}
          {isDone ? (
            <Reveal>
              <ResultPreview prompt={submittedPrompt} onReset={handleReset} />
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left: prompt input */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <Reveal>
                  <div className="bg-white rounded-2xl border border-black/8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="px-5 pt-5 pb-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t("generate.promptLabel")}
                      </label>
                      <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={handlePromptChange}
                        placeholder={t("generate.promptPlaceholder")}
                        rows={6}
                        className="w-full resize-none text-gray-800 placeholder-gray-400 text-sm leading-relaxed focus:outline-none bg-transparent"
                      />
                    </div>
                    <div className="flex items-center justify-between px-5 py-3 border-t border-black/6 bg-gray-50/60">
                      <span className={cn("text-xs", charCount > MAX_CHARS * 0.9 ? "text-orange-500" : "text-gray-400")}>
                        {charCount}/{MAX_CHARS}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleGenerate}
                        disabled={!prompt.trim()}
                        className={cn(
                          "flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all duration-200",
                          prompt.trim()
                            ? "bg-[var(--primary)] text-white shadow-[0_4px_12px_rgba(109,40,217,0.3)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.4)]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        )}
                      >
                        <Sparkles className="h-4 w-4" />
                        {t("generate.cta")}
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </Reveal>

                {/* Style picker */}
                <Reveal delay={0.05}>
                  <div className="bg-white rounded-2xl border border-black/8 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                    <button
                      onClick={() => setShowStylePicker((v) => !v)}
                      className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-[var(--primary)]" />
                        {t("generate.styleLabel")}
                        <span className="font-normal text-gray-500">({selectedStyleObj.label})</span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gray-400 transition-transform duration-200",
                          showStylePicker && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {showStylePicker && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-black/6 pt-4">
                            {STYLE_OPTIONS.map((opt) => (
                              <StyleChip
                                key={opt.id}
                                option={opt}
                                selected={selectedStyle === opt.id}
                                onClick={() => setSelectedStyle(opt.id)}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>

                {/* Prompt suggestions */}
                <Reveal delay={0.1}>
                  <div className="bg-white rounded-2xl border border-black/8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5">
                    <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[var(--primary)]" />
                      {t("generate.suggestionsLabel")}
                    </p>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                      {EXAMPLE_PROMPTS.map((p, i) => (
                        <motion.div key={i} variants={itemVariants}>
                          <PromptSuggestion text={p} onClick={handleSuggestion} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </Reveal>
              </div>

              {/* Right: sidebar */}
              <div className="flex flex-col gap-5">

                {/* Credits */}
                <Reveal delay={0.08}>
                  <div className="bg-white rounded-2xl border border-black/8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {t("generate.creditsTitle")}
                    </p>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-extrabold text-gray-900">50</span>
                      <span className="text-gray-500 text-sm mb-1">{t("generate.creditsRemaining")}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: "100%" }} />
                    </div>
                    <p className="text-xs text-gray-400 mb-4">{t("generate.creditsNote")}</p>
                    <Link
                      href="/pricing"
                      className="flex items-center justify-center gap-1.5 w-full bg-[var(--soft)] text-[var(--primary)] font-semibold text-sm py-2.5 rounded-xl hover:bg-[var(--primary)] hover:text-white transition-all duration-200"
                    >
                      {t("generate.buyCredits")} <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>

                {/* Tips */}
                <Reveal delay={0.12}>
                  <div className="bg-white rounded-2xl border border-black/8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5" /> {t("generate.tipsTitle")}
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {(t.raw("generate.tips") as { text: string }[]).map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                          <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {tip.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {/* What you get */}
                <Reveal delay={0.16}>
                  <div className="bg-gradient-to-br from-[var(--primary)] to-violet-700 rounded-2xl p-5 text-white shadow-[0_4px_20px_rgba(109,40,217,0.25)]">
                    <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                      {t("generate.outputTitle")}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {(t.raw("generate.outputItems") as { label: string }[]).map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                          <Check className="h-4 w-4 text-white flex-shrink-0" />
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          )}

          {/* ── Recent generations ── */}
          {!isDone && (
            <Reveal>
              <div className="mt-12">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900">{t("generate.recentTitle")}</h2>
                  <Link
                    href="/examples"
                    className="flex items-center gap-1 text-sm text-[var(--primary)] font-medium hover:underline"
                  >
                    {t("generate.viewAll")} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {RECENT_GENERATIONS.map((gen, i) => (
                    <motion.div key={gen.id} variants={itemVariants}>
                      <GenerationCard gen={gen} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </Reveal>
          )}

          {/* ── How it works mini ── */}
          {!isDone && (
            <Reveal>
              <div className="mt-14 bg-white rounded-2xl border border-black/8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-8">
                <h2 className="text-xl font-bold text-gray-900 text-center mb-1">{t("generate.howTitle")}</h2>
                <p className="text-sm text-gray-500 text-center mb-8">{t("generate.howSub")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {(t.raw("generate.howSteps") as { num: string; title: string; desc: string; color: string }[]).map((step) => (
                    <div key={step.num} className="flex flex-col items-center text-center gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                          step.color
                        )}
                      >
                        {step.num}
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

        </div>
      </main>
    </>
  );
}