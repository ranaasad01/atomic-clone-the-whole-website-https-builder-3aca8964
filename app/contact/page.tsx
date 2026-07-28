"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, User, AtSign, Send, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Support",
    value: "support@hotcode.ai",
    description: "We reply within 24 hours",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: MessageSquare,
    label: "Live Chat",
    value: "Available in the app",
    description: "Mon–Fri, 9am–6pm UTC",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Mail,
    label: "Business Inquiries",
    value: "hello@hotcode.ai",
    description: "Partnerships and enterprise",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com/hotcode-ai", handle: "@hotcode-ai" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/hotcodeai", handle: "@hotcodeai" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/hotcode-ai", handle: "HotCode AI" },
];

const SUBJECTS = [
  "General Question",
  "Technical Support",
  "Billing & Credits",
  "Feature Request",
  "Partnership / Enterprise",
  "Bug Report",
  "Other",
];

export default function ContactPage() {
  const t = useTranslations();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length < 20) errs.message = "Message must be at least 20 characters.";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Hero / Split Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 border-b border-black/5">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-violet-400/20"
              style={{
                width: 4,
                height: 4,
                top: `${10 + (i * 37) % 80}%`,
                left: `${5 + (i * 53) % 90}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-start">
          {/* Left: headline + contact info cards */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-violet-200 text-violet-600 text-xs font-medium mb-6 shadow-sm">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {t("contact.badge")}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
                {t("contact.hero.title")}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                {t("contact.hero.subtitle")}
              </p>
            </Reveal>

            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.08}>
                  <div className="flex items-start gap-4 bg-white rounded-2xl border border-black/5 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-300">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-12px_rgba(0,0,0,0.12)] p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <span className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-500" aria-hidden="true" />
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{t("contact.form.successTitle")}</h2>
                  <p className="text-gray-500 text-sm max-w-xs">{t("contact.form.successBody")}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors duration-200"
                  >
                    {t("contact.form.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{t("contact.form.heading")}</h2>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.form.nameLabel")} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t("contact.form.namePlaceholder")}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.form.emailLabel")} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t("contact.form.emailPlaceholder")}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.form.subjectLabel")}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 hover:border-gray-300"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t("contact.form.messageLabel")} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.messagePlaceholder")}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 resize-none ${errors.message ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-[0_4px_14px_rgba(124,58,237,0.35)]"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        {t("contact.form.submitting")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social Links Section */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("contact.social.heading")}</h2>
            <p className="text-gray-500">{t("contact.social.subtext")}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {SOCIAL_LINKS.map((link, i) => (
              <Reveal key={link.label} delay={i * 0.08}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex flex-col items-center gap-3 bg-white rounded-2xl border border-black/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 group"
                  aria-label={`Visit our ${link.label} page`}
                >
                  <span className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center group-hover:bg-violet-100 transition-colors duration-200">
                    <link.icon className="w-6 h-6 text-violet-600" aria-hidden="true" />
                  </span>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 text-sm">{link.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{link.handle}</p>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Response time / trust strip */}
      <Reveal>
        <section className="border-t border-black/5 bg-gradient-to-r from-violet-600 to-indigo-600">
          <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-3 gap-8 text-center text-white">
            {[
              { value: "< 24h", label: t("contact.trust.responseTime") },
              { value: "99%", label: t("contact.trust.satisfaction") },
              { value: "10K+", label: t("contact.trust.usersHelped") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold tracking-tight mb-1">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  );
}