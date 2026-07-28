"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Code2, Zap, Globe, Download, Eye, ChevronRight, Search, FileText, Terminal, GitBranch, Settings, Star, ArrowRight, Check, AlertCircle, Info, Copy } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const DOC_SECTIONS = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    color: "text-violet-600",
    bg: "bg-violet-50",
    items: ["Introduction", "Quick Start", "Your First Website", "Credits & Billing"],
  },
  {
    id: "generating",
    label: "Generating Websites",
    icon: Globe,
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: ["Writing Prompts", "Design Dials", "Aesthetic Presets", "Multi-page Sites"],
  },
  {
    id: "exporting",
    label: "Export & Deploy",
    icon: Download,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    items: ["Download ZIP", "GitHub Export", "Vercel Deploy", "Custom Domains"],
  },
  {
    id: "api",
    label: "API Reference",
    icon: Code2,
    color: "text-orange-600",
    bg: "bg-orange-50",
    items: ["Authentication", "Generate Endpoint", "Status Endpoint", "Webhooks"],
  },
  {
    id: "examples",
    label: "Examples",
    icon: Star,
    color: "text-pink-600",
    bg: "bg-pink-50",
    items: ["Landing Pages", "Portfolios", "SaaS Dashboards", "E-commerce"],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    items: ["Common Errors", "Build Failures", "Preview Issues", "Contact Support"],
  },
];

const QUICK_LINKS = [
  { label: "Quick Start Guide", href: "#quick-start", icon: Zap, desc: "Get your first site live in under 2 minutes" },
  { label: "Writing Great Prompts", href: "#prompts", icon: FileText, desc: "Tips for describing your vision clearly" },
  { label: "API Reference", href: "/docs/api", icon: Terminal, desc: "Integrate Builder into your workflow" },
  { label: "Export to GitHub", href: "#export", icon: GitBranch, desc: "Push generated code to your repository" },
];

const CODE_EXAMPLE = `curl -X POST https://api.builder.hotcode.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A modern SaaS landing page for a project management tool",
    "aesthetic": "glass-futuristic",
    "pages": ["home", "pricing", "contact"]
  }'`;

const RESPONSE_EXAMPLE = `{
  "id": "gen_01HXYZ123ABC",
  "status": "completed",
  "preview_url": "https://preview.builder.hotcode.ai/gen_01HXYZ123ABC",
  "download_url": "https://cdn.builder.hotcode.ai/gen_01HXYZ123ABC/site.zip",
  "credits_used": 1,
  "created_at": "2024-01-15T10:30:00Z"
}`;

const STEPS = [
  {
    num: "01",
    title: "Get your API key",
    desc: "Sign in to your Builder account and navigate to Settings. Copy your API key from the API section.",
    color: "bg-violet-600",
  },
  {
    num: "02",
    title: "Write your prompt",
    desc: "Describe the website you want in plain English. Include the type, style, pages, and any specific requirements.",
    color: "bg-blue-600",
  },
  {
    num: "03",
    title: "Call the API",
    desc: "Send a POST request to our generate endpoint with your prompt and options. Receive a preview URL in seconds.",
    color: "bg-emerald-600",
  },
  {
    num: "04",
    title: "Download and deploy",
    desc: "Preview your site, make any edits, then download the ZIP or push directly to GitHub and deploy anywhere.",
    color: "bg-orange-600",
  },
];

const PROMPT_TIPS = [
  {
    tip: "Be specific about your industry",
    example: '"A landing page for a B2B SaaS project management tool targeting remote engineering teams"',
    good: true,
  },
  {
    tip: "Mention the aesthetic you want",
    example: '"Dark, modern, glass-futuristic design with a neon accent color"',
    good: true,
  },
  {
    tip: "List the pages you need",
    example: '"Include a home page, pricing page, and contact form"',
    good: true,
  },
  {
    tip: "Avoid vague descriptions",
    example: '"Make a nice website"',
    good: false,
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(key);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  const filteredSections = DOC_SECTIONS.filter(
    (s) =>
      searchQuery === "" ||
      s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.items.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-[#f8f8fc]">
      {/* Hero */}
      <Reveal>
        <section className="bg-gradient-to-b from-violet-50 via-[#f0eeff] to-[#f8f8fc] border-b border-violet-100 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-violet-200 rounded-full px-4 py-1.5 text-sm text-violet-700 font-medium mb-6 shadow-sm">
              <BookOpen className="w-4 h-4" />
              Documentation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Builder Docs
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
              Everything you need to generate, customize, and deploy AI-built websites. From quick start to full API reference.
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>
      </Reveal>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Reveal>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-4 sticky top-24">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2">Contents</p>
                <nav className="space-y-1">
                  {filteredSections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                          isActive
                            ? "bg-violet-50 text-violet-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? "bg-violet-100" : section.bg}`}>
                          <Icon className={`w-4 h-4 ${isActive ? "text-violet-600" : section.color}`} />
                        </span>
                        {section.label}
                        {isActive && <ChevronRight className="w-4 h-4 ml-auto text-violet-400" />}
                      </button>
                    );
                  })}
                </nav>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href="/docs/api"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-violet-600 font-medium hover:text-violet-800 transition-colors"
                  >
                    <Terminal className="w-4 h-4" />
                    Full API Reference
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </Link>
                  <Link
                    href="/changelog"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 font-medium hover:text-gray-800 transition-colors"
                  >
                    <GitBranch className="w-4 h-4" />
                    Changelog
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 font-medium hover:text-gray-800 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* Quick links */}
            <Reveal>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {QUICK_LINKS.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <motion.div key={link.label} variants={fadeInUp}>
                        <Link
                          href={link.href}
                          className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-violet-200 transition-all duration-200 group"
                        >
                          <span className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors">
                            <Icon className="w-5 h-5 text-violet-600" />
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm group-hover:text-violet-700 transition-colors">{link.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-0.5 group-hover:text-violet-400 transition-colors" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </Reveal>

            {/* Quick Start */}
            <Reveal id="quick-start">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-violet-600" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Quick Start</h2>
                    <p className="text-sm text-gray-500">From zero to live website in under 2 minutes</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {STEPS.map((step, i) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className={`w-9 h-9 rounded-full ${step.color} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                          {step.num}
                        </span>
                        {i < STEPS.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-2" />}
                      </div>
                      <div className="pb-6">
                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-3">
                  <Link
                    href="/generate"
                    className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Start Generating
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/docs/api"
                    className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    API Reference
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Writing Prompts */}
            <Reveal id="prompts">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Writing Great Prompts</h2>
                    <p className="text-sm text-gray-500">The quality of your prompt directly affects the output</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {PROMPT_TIPS.map((tip, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 p-4 rounded-xl border ${
                        tip.good
                          ? "bg-emerald-50 border-emerald-100"
                          : "bg-red-50 border-red-100"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${tip.good ? "bg-emerald-500" : "bg-red-400"}`}>
                        {tip.good ? (
                          <Check className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <span className="text-white text-xs font-bold">✕</span>
                        )}
                      </span>
                      <div>
                        <p className={`font-semibold text-sm mb-1 ${tip.good ? "text-emerald-800" : "text-red-800"}`}>
                          {tip.good ? "Do: " : "Avoid: "}{tip.tip}
                        </p>
                        <p className={`text-sm font-mono ${tip.good ? "text-emerald-700" : "text-red-700"}`}>
                          {tip.example}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Builder supports aesthetic presets like <strong>glass-futuristic</strong>, <strong>minimal-editorial</strong>, <strong>luxury-dark</strong>, and more. Mention one in your prompt for instant style direction.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* API Code Example */}
            <Reveal>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-orange-600" />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">API at a Glance</h2>
                    <p className="text-sm text-gray-500">Integrate Builder into any workflow with our REST API</p>
                  </div>
                  <Link
                    href="/docs/api"
                    className="ml-auto text-sm text-violet-600 font-medium hover:text-violet-800 transition-colors flex items-center gap-1"
                  >
                    Full reference <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Request</p>
                      <button
                        onClick={() => handleCopy(CODE_EXAMPLE, "request")}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        {copiedCode === "request" ? (
                          <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed font-mono">
                      {CODE_EXAMPLE}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Response</p>
                      <button
                        onClick={() => handleCopy(RESPONSE_EXAMPLE, "response")}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        {copiedCode === "response" ? (
                          <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-emerald-300 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed font-mono">
                      {RESPONSE_EXAMPLE}
                    </pre>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Base URL", value: "api.builder.hotcode.ai/v1", icon: Globe },
                    { label: "Auth", value: "Bearer token", icon: Settings },
                    { label: "Format", value: "JSON", icon: Code2 },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">{item.label}</p>
                          <p className="text-sm font-mono font-medium text-gray-800">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* All sections grid */}
            <Reveal>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Browse All Topics</h2>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filteredSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <motion.div key={section.id} variants={fadeInUp}>
                        <button
                          onClick={() => setActiveSection(section.id)}
                          className="w-full text-left p-5 bg-white rounded-xl border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-violet-200 transition-all duration-200 group"
                        >
                          <span className={`w-10 h-10 rounded-xl ${section.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                            <Icon className={`w-5 h-5 ${section.color}`} />
                          </span>
                          <h3 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-violet-700 transition-colors">{section.label}</h3>
                          <ul className="space-y-1">
                            {section.items.map((item) => (
                              <li key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                                <ChevronRight className="w-3 h-3 text-gray-300" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                    <Eye className="w-4 h-4" />
                    See it in action
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to start building?</h2>
                  <p className="text-violet-200 mb-6 max-w-md mx-auto">
                    Generate your first production-ready website in under 60 seconds. No credit card required.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/generate"
                      className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-colors"
                    >
                      Start Generating
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/examples"
                      className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors"
                    >
                      View Examples
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}