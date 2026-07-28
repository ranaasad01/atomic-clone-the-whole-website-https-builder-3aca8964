"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Copy, Check, ChevronDown, ChevronRight, Zap, Lock, Globe, FileCode, ArrowRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const ENDPOINTS = [
  {
    method: "POST",
    path: "/api/v1/generate",
    description: "Generate a new website from a text prompt",
    badge: "Core",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    method: "GET",
    path: "/api/v1/projects",
    description: "List all projects in your account",
    badge: "Projects",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    method: "GET",
    path: "/api/v1/projects/:id",
    description: "Retrieve a single project by ID",
    badge: "Projects",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    method: "DELETE",
    path: "/api/v1/projects/:id",
    description: "Delete a project permanently",
    badge: "Projects",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    method: "GET",
    path: "/api/v1/credits",
    description: "Get current credit balance and usage",
    badge: "Account",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    method: "GET",
    path: "/api/v1/exports/:id",
    description: "Download the generated project as a ZIP archive",
    badge: "Export",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  POST: "bg-violet-100 text-violet-700 border border-violet-200",
  DELETE: "bg-red-100 text-red-700 border border-red-200",
  PATCH: "bg-amber-100 text-amber-700 border border-amber-200",
};

const CODE_EXAMPLES: Record<string, string> = {
  curl: `curl -X POST https://builder.hotcode.ai/api/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A modern SaaS landing page for a project management tool",
    "style": "minimal",
    "framework": "nextjs"
  }'`,
  javascript: `const response = await fetch(
  "https://builder.hotcode.ai/api/v1/generate",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "A modern SaaS landing page for a project management tool",
      style: "minimal",
      framework: "nextjs",
    }),
  }
);

const data = await response.json();
console.log(data.project.id);`,
  python: `import requests

response = requests.post(
    "https://builder.hotcode.ai/api/v1/generate",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "prompt": "A modern SaaS landing page for a project management tool",
        "style": "minimal",
        "framework": "nextjs",
    },
)

data = response.json()
print(data["project"]["id"])`,
};

const RESPONSE_EXAMPLE = `{
  "success": true,
  "project": {
    "id": "proj_a1b2c3d4e5f6",
    "status": "completed",
    "prompt": "A modern SaaS landing page...",
    "framework": "nextjs",
    "createdAt": "2024-01-15T10:30:00Z",
    "previewUrl": "https://preview.builder.hotcode.ai/proj_a1b2c3d4e5f6",
    "exportUrl": "https://builder.hotcode.ai/api/v1/exports/proj_a1b2c3d4e5f6"
  },
  "credits": {
    "used": 1,
    "remaining": 249
  }
}`;

const ERROR_CODES = [
  {
    code: "401",
    title: "Unauthorized",
    description: "Missing or invalid API key. Check your Authorization header.",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    code: "402",
    title: "Insufficient Credits",
    description: "Your account does not have enough credits to complete this request.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    code: "422",
    title: "Validation Error",
    description: "The request body is missing required fields or contains invalid values.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    code: "429",
    title: "Rate Limited",
    description: "Too many requests. Wait before retrying. Limit: 60 requests per minute.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    code: "500",
    title: "Server Error",
    description: "An unexpected error occurred on our end. Retry with exponential backoff.",
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
];

const SIDEBAR_SECTIONS = [
  { label: "Overview", href: "#overview" },
  { label: "Authentication", href: "#authentication" },
  { label: "Quick Start", href: "#quickstart" },
  { label: "Endpoints", href: "#endpoints" },
  { label: "Generate Website", href: "#generate" },
  { label: "Projects", href: "#projects" },
  { label: "Credits", href: "#credits" },
  { label: "Error Codes", href: "#errors" },
  { label: "Rate Limits", href: "#rate-limits" },
  { label: "SDKs", href: "#sdks" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200"
      aria-label="Copy code"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="bg-gray-950 p-5 overflow-x-auto text-sm leading-relaxed">
        <code className="text-gray-200 font-mono">{code}</code>
      </pre>
    </div>
  );
}

function LanguageTabs({ examples }: { examples: Record<string, string> }) {
  const [active, setActive] = useState("curl");
  const langs = Object.keys(examples);

  return (
    <div>
      <div className="flex gap-1 mb-0 border-b border-gray-200">
        {langs.map((lang) => (
          <button
            key={lang}
            onClick={() => setActive(lang)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
              active === lang
                ? "bg-gray-950 text-white border border-b-0 border-gray-800"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>
      <CodeBlock code={examples[active]} language={active} />
    </div>
  );
}

export default function DocsApiPage() {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-6">
                <Link
                  href="/docs"
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                  Back to Docs
                </Link>
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2">
                API Reference
              </p>
              <nav className="space-y-0.5">
                {SIDEBAR_SECTIONS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveSection(item.href.replace("#", ""))}
                    className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      activeSection === item.href.replace("#", "")
                        ? "bg-[var(--soft)] text-[var(--primary)] font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 p-3 rounded-xl bg-violet-50 border border-violet-100">
                <p className="text-xs font-semibold text-violet-800 mb-1">Need help?</p>
                <p className="text-xs text-violet-600 mb-2">
                  Our team is ready to assist with integration questions.
                </p>
                <Link
                  href="/contact"
                  className="text-xs font-medium text-violet-700 hover:text-violet-900 flex items-center gap-1"
                >
                  Contact support <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 max-w-3xl">
            {/* Page header */}
            <Reveal>
              <div id="overview" className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold border border-violet-200">
                    <Terminal className="h-3.5 w-3.5" />
                    REST API
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    <CheckCircle className="h-3.5 w-3.5" />
                    v1 Stable
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
                  API Reference
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The Builder API lets you generate production-ready websites programmatically. Integrate AI-powered website generation directly into your own tools, workflows, and applications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700">
                    <Globe className="h-4 w-4 text-gray-400" />
                    Base URL: <code className="font-mono text-violet-700 ml-1">https://builder.hotcode.ai/api/v1</code>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700">
                    <FileCode className="h-4 w-4 text-gray-400" />
                    Format: <span className="font-medium ml-1">JSON</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Authentication */}
            <Reveal delay={0.05}>
              <section id="authentication" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-violet-600" />
                  Authentication
                </h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  All API requests must include your API key in the{" "}
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 text-violet-700 font-mono text-sm">
                    Authorization
                  </code>{" "}
                  header using the Bearer scheme. You can find your API key in your{" "}
                  <Link href="/settings" className="text-violet-600 hover:text-violet-800 underline underline-offset-2">
                    account settings
                  </Link>
                  .
                </p>
                <CodeBlock
                  language="http"
                  code={`Authorization: Bearer YOUR_API_KEY`}
                />
                <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    Keep your API key secret. Never expose it in client-side code or public repositories. Rotate it immediately from Settings if it is ever compromised.
                  </p>
                </div>
              </section>
            </Reveal>

            {/* Quick Start */}
            <Reveal delay={0.08}>
              <section id="quickstart" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Start</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Generate your first website in under a minute. Send a POST request with your prompt and receive a fully built Next.js project.
                </p>
                <LanguageTabs examples={CODE_EXAMPLES} />
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Response</p>
                  <CodeBlock code={RESPONSE_EXAMPLE} language="json" />
                </div>
              </section>
            </Reveal>

            {/* Endpoints overview */}
            <Reveal delay={0.1}>
              <section id="endpoints" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Endpoints</h2>
                <p className="text-gray-600 mb-5">
                  All endpoints are relative to the base URL{" "}
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 text-violet-700 font-mono text-sm">
                    https://builder.hotcode.ai/api/v1
                  </code>
                  .
                </p>
                <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
                  {ENDPOINTS.map((ep, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold font-mono min-w-[52px] text-center ${
                          METHOD_COLORS[ep.method] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {ep.method}
                      </span>
                      <code className="text-sm font-mono text-gray-800 flex-1">{ep.path}</code>
                      <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-medium ${ep.badgeColor}`}>
                        {ep.badge}
                      </span>
                      <span className="text-sm text-gray-500 hidden md:block">{ep.description}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Generate endpoint detail */}
            <Reveal delay={0.1}>
              <section id="generate" className="mb-12 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-violet-100 text-violet-700 border border-violet-200">
                    POST
                  </span>
                  <code className="text-base font-mono text-gray-800">/generate</code>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Website</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Submit a plain-English prompt and receive a fully generated Next.js website. Each successful generation consumes one credit from your balance.
                </p>

                <h3 className="text-base font-semibold text-gray-800 mb-3">Request Body</h3>
                <div className="rounded-xl border border-gray-200 overflow-hidden mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Parameter</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Type</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Required</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {[
                        { param: "prompt", type: "string", required: true, desc: "Plain-English description of the website to generate. Max 2000 characters." },
                        { param: "style", type: "string", required: false, desc: 'Visual style preset. One of: "minimal", "bold", "elegant", "playful". Defaults to "minimal".' },
                        { param: "framework", type: "string", required: false, desc: 'Output framework. Currently only "nextjs" is supported.' },
                        { param: "colorScheme", type: "string", required: false, desc: 'Preferred color scheme: "light", "dark", or "auto". Defaults to "light".' },
                        { param: "pages", type: "string[]", required: false, desc: 'List of page names to generate, e.g. ["home", "about", "pricing"].' },
                      ].map((row) => (
                        <tr key={row.param}>
                          <td className="px-4 py-3">
                            <code className="font-mono text-violet-700">{row.param}</code>
                          </td>
                          <td className="px-4 py-3 text-gray-500 font-mono text-xs">{row.type}</td>
                          <td className="px-4 py-3">
                            {row.required ? (
                              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">required</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">optional</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="text-base font-semibold text-gray-800 mb-3">Response Fields</h3>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Field</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Type</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {[
                        { field: "project.id", type: "string", desc: "Unique project identifier, prefixed with proj_." },
                        { field: "project.status", type: "string", desc: '"completed", "processing", or "failed".' },
                        { field: "project.previewUrl", type: "string", desc: "Hosted preview URL, available immediately after generation." },
                        { field: "project.exportUrl", type: "string", desc: "URL to download the full source code as a ZIP archive." },
                        { field: "credits.used", type: "number", desc: "Credits consumed by this request (always 1 for a successful generation)." },
                        { field: "credits.remaining", type: "number", desc: "Credits remaining in your account after this request." },
                      ].map((row) => (
                        <tr key={row.field}>
                          <td className="px-4 py-3">
                            <code className="font-mono text-violet-700 text-xs">{row.field}</code>
                          </td>
                          <td className="px-4 py-3 text-gray-500 font-mono text-xs">{row.type}</td>
                          <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </Reveal>

            {/* Projects */}
            <Reveal delay={0.08}>
              <section id="projects" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Projects are the core resource in the Builder API. Each generation creates a project that you can retrieve, preview, export, or delete.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      method: "GET",
                      path: "/projects",
                      title: "List Projects",
                      desc: "Returns a paginated list of all projects in your account, sorted by creation date descending.",
                      params: [
                        { name: "limit", desc: "Number of results per page (1–100, default 20)." },
                        { name: "offset", desc: "Pagination offset. Default 0." },
                        { name: "status", desc: 'Filter by status: "completed", "processing", or "failed".' },
                      ],
                    },
                    {
                      method: "GET",
                      path: "/projects/:id",
                      title: "Get Project",
                      desc: "Retrieve a single project by its ID. Returns the full project object including preview and export URLs.",
                      params: [
                        { name: "id", desc: "The project ID (e.g. proj_a1b2c3d4e5f6)." },
                      ],
                    },
                    {
                      method: "DELETE",
                      path: "/projects/:id",
                      title: "Delete Project",
                      desc: "Permanently deletes a project and all associated files. This action cannot be undone.",
                      params: [
                        { name: "id", desc: "The project ID to delete." },
                      ],
                    },
                  ].map((ep) => (
                    <div key={ep.path} className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${METHOD_COLORS[ep.method]}`}>
                          {ep.method}
                        </span>
                        <code className="font-mono text-sm text-gray-800">{ep.path}</code>
                        <span className="ml-auto text-sm font-semibold text-gray-700">{ep.title}</span>
                      </div>
                      <div className="px-5 py-4">
                        <p className="text-sm text-gray-600 mb-3">{ep.desc}</p>
                        {ep.params.length > 0 && (
                          <div className="space-y-1.5">
                            {ep.params.map((p) => (
                              <div key={p.name} className="flex gap-3 text-sm">
                                <code className="font-mono text-violet-700 min-w-[80px]">{p.name}</code>
                                <span className="text-gray-500">{p.desc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Credits */}
            <Reveal delay={0.08}>
              <section id="credits" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Credits</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Check your current credit balance and usage history. Each website generation costs one credit.
                </p>
                <div className="rounded-xl border border-gray-200 overflow-hidden bg-white mb-5">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${METHOD_COLORS["GET"]}`}>
                      GET
                    </span>
                    <code className="font-mono text-sm text-gray-800">/credits</code>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-600 mb-4">Returns your current balance and a summary of recent usage.</p>
                    <CodeBlock
                      language="json"
                      code={`{
  "balance": 249,
  "used_this_month": 51,
  "plan": "builder",
  "resets_at": null
}`}
                    />
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Error Codes */}
            <Reveal delay={0.08}>
              <section id="errors" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Codes</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  The API uses standard HTTP status codes. All error responses include a JSON body with a machine-readable{" "}
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 text-violet-700 font-mono text-sm">code</code> and a human-readable{" "}
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 text-violet-700 font-mono text-sm">message</code>.
                </p>
                <div className="space-y-3 mb-6">
                  {ERROR_CODES.map((err) => (
                    <div
                      key={err.code}
                      className={`flex items-start gap-4 p-4 rounded-xl border ${err.bg} ${err.border}`}
                    >
                      <span className={`text-lg font-bold font-mono ${err.color} min-w-[40px]`}>{err.code}</span>
                      <div>
                        <p className={`font-semibold text-sm ${err.color}`}>{err.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{err.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <CodeBlock
                  language="json"
                  code={`{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "Your account does not have enough credits to complete this request.",
    "status": 402
  }
}`}
                />
              </section>
            </Reveal>

            {/* Rate Limits */}
            <Reveal delay={0.08}>
              <section id="rate-limits" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-violet-600" />
                  Rate Limits
                </h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  To ensure fair usage and platform stability, the API enforces rate limits per API key. Limits reset on a rolling 60-second window.
                </p>
                <div className="rounded-xl border border-gray-200 overflow-hidden mb-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Endpoint</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Limit</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Window</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {[
                        { endpoint: "POST /generate", limit: "10 requests", window: "60 seconds" },
                        { endpoint: "GET /projects", limit: "60 requests", window: "60 seconds" },
                        { endpoint: "GET /credits", limit: "60 requests", window: "60 seconds" },
                        { endpoint: "All other endpoints", limit: "120 requests", window: "60 seconds" },
                      ].map((row) => (
                        <tr key={row.endpoint}>
                          <td className="px-4 py-3">
                            <code className="font-mono text-violet-700 text-xs">{row.endpoint}</code>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-800">{row.limit}</td>
                          <td className="px-4 py-3 text-gray-500">{row.window}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600">
                  Rate limit headers are included in every response:{" "}
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 text-violet-700 font-mono text-xs">X-RateLimit-Limit</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 text-violet-700 font-mono text-xs">X-RateLimit-Remaining</code>, and{" "}
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 text-violet-700 font-mono text-xs">X-RateLimit-Reset</code>.
                </p>
              </section>
            </Reveal>

            {/* SDKs */}
            <Reveal delay={0.08}>
              <section id="sdks" className="mb-16 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-violet-600" />
                  SDKs and Libraries
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Official SDKs are coming soon. In the meantime, the REST API works with any HTTP client. Below are minimal wrappers to get you started quickly.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      lang: "JavaScript / TypeScript",
                      status: "Coming soon",
                      statusColor: "bg-amber-100 text-amber-700",
                      icon: "🟨",
                      desc: "A typed npm package with full IntelliSense support.",
                    },
                    {
                      lang: "Python",
                      status: "Coming soon",
                      statusColor: "bg-amber-100 text-amber-700",
                      icon: "🐍",
                      desc: "A pip-installable package with async support via httpx.",
                    },
                    {
                      lang: "Go",
                      status: "Planned",
                      statusColor: "bg-gray-100 text-gray-600",
                      icon: "🐹",
                      desc: "A Go module with idiomatic error handling.",
                    },
                    {
                      lang: "PHP",
                      status: "Planned",
                      statusColor: "bg-gray-100 text-gray-600",
                      icon: "🐘",
                      desc: "A Composer package compatible with Laravel and Symfony.",
                    },
                  ].map((sdk) => (
                    <div
                      key={sdk.lang}
                      className="p-5 rounded-xl border border-gray-200 bg-white hover:border-violet-200 hover:shadow-[0_4px_16px_rgba(109,40,217,0.06)] transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{sdk.icon}</span>
                          <span className="font-semibold text-gray-800 text-sm">{sdk.lang}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sdk.statusColor}`}>
                          {sdk.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{sdk.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">
                  <AlertCircle className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-violet-800">
                    Want to be notified when an SDK for your language ships?{" "}
                    <Link href="/contact" className="font-semibold underline underline-offset-2 hover:text-violet-900">
                      Let us know
                    </Link>{" "}
                    and we will prioritize accordingly.
                  </p>
                </div>
              </section>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.08}>
              <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 p-8 text-center text-white shadow-[0_8px_32px_rgba(109,40,217,0.25)]">
                <h2 className="text-2xl font-bold mb-2">Ready to integrate?</h2>
                <p className="text-violet-200 mb-6 text-sm">
                  Get your API key from Settings and start generating websites programmatically in minutes.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/settings"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-colors"
                  >
                    Get API Key <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/generate"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
                  >
                    Try the Builder
                  </Link>
                </div>
              </div>
            </Reveal>
          </main>
        </div>
      </div>
    </div>
  );
}