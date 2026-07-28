"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { User, Bell, Lock, CreditCard, Globe, Moon, Sun, Check, AlertCircle, Mail, Code2 as Github, Trash2, Eye, EyeOff, ChevronRight, Sparkles } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Lock },
  { key: "billing", label: "Billing & Credits", icon: CreditCard },
  { key: "preferences", label: "Preferences", icon: Globe },
];

const CREDIT_HISTORY = [
  { id: "1", date: "Jan 15, 2025", description: "Starter Pack purchase", amount: "+100", type: "credit" },
  { id: "2", date: "Jan 14, 2025", description: "Website generation", amount: "-1", type: "debit" },
  { id: "3", date: "Jan 13, 2025", description: "Website generation", amount: "-1", type: "debit" },
  { id: "4", date: "Jan 10, 2025", description: "Free tier monthly reset", amount: "+50", type: "credit" },
  { id: "5", date: "Jan 8, 2025", description: "Website generation", amount: "-1", type: "debit" },
  { id: "6", date: "Jan 5, 2025", description: "Builder Pack purchase", amount: "+250", type: "credit" },
];

export default function SettingsPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [buildNotifs, setBuildNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);
  const [language, setLanguage] = useState("en");

  const [profile, setProfile] = useState({
    name: "Alex Chen",
    email: "alex@example.com",
    username: "alexchen",
    bio: "Building the future, one prompt at a time.",
    website: "https://alexchen.dev",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-8 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {t("settings.title")}
            </h1>
            <p className="mt-1 text-gray-500 text-sm">
              {t("settings.subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <Reveal className="md:w-56 shrink-0">
            <nav className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 text-left",
                      isActive
                        ? "bg-[var(--soft)] text-[var(--primary)] border-r-2 border-[var(--primary)]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {tab.label}
                    {isActive && (
                      <ChevronRight className="h-3 w-3 ml-auto" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </nav>
          </Reveal>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Reveal>
                <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{t("settings.profile.heading")}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{t("settings.profile.subheading")}</p>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-violet-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                      AC
                    </div>
                    <div>
                      <button className="text-sm font-medium text-[var(--primary)] hover:underline">
                        {t("settings.profile.changeAvatar")}
                      </button>
                      <p className="text-xs text-gray-400 mt-0.5">{t("settings.profile.avatarHint")}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                        {t("settings.profile.nameLabel")}
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                        {t("settings.profile.usernameLabel")}
                      </label>
                      <input
                        id="username"
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        {t("settings.profile.emailLabel")}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
                        <input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                          className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bio">
                        {t("settings.profile.bioLabel")}
                      </label>
                      <textarea
                        id="bio"
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all resize-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="website">
                        {t("settings.profile.websiteLabel")}
                      </label>
                      <input
                        id="website"
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Connected accounts */}
                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">{t("settings.profile.connectedAccounts")}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Github className="h-5 w-5 text-gray-700" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">GitHub</p>
                            <p className="text-xs text-gray-400">@alexchen</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {t("settings.profile.connected")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-700" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Google</p>
                            <p className="text-xs text-gray-400">{t("settings.profile.notConnected")}</p>
                          </div>
                        </div>
                        <button className="text-xs font-medium text-[var(--primary)] hover:underline">
                          {t("settings.profile.connect")}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                        saved
                          ? "bg-emerald-500 text-white"
                          : "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                      )}
                    >
                      {saved ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          {t("settings.saved")}
                        </>
                      ) : (
                        t("settings.saveChanges")
                      )}
                    </motion.button>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Reveal>
                <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{t("settings.notifications.heading")}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{t("settings.notifications.subheading")}</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        key: "email",
                        label: t("settings.notifications.emailLabel"),
                        desc: t("settings.notifications.emailDesc"),
                        value: emailNotifs,
                        set: setEmailNotifs,
                      },
                      {
                        key: "build",
                        label: t("settings.notifications.buildLabel"),
                        desc: t("settings.notifications.buildDesc"),
                        value: buildNotifs,
                        set: setBuildNotifs,
                      },
                      {
                        key: "marketing",
                        label: t("settings.notifications.marketingLabel"),
                        desc: t("settings.notifications.marketingDesc"),
                        value: marketingNotifs,
                        set: setMarketingNotifs,
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          role="switch"
                          aria-checked={item.value}
                          onClick={() => item.set((v: boolean) => !v)}
                          className={cn(
                            "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
                            item.value ? "bg-[var(--primary)]" : "bg-gray-200"
                          )}
                        >
                          <span
                            className={cn(
                              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-200",
                              item.value ? "translate-x-5" : "translate-x-0"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
                    <AlertCircle className="h-4 w-4 text-blue-500 shrink-0" aria-hidden="true" />
                    <p className="text-xs text-blue-700">{t("settings.notifications.hint")}</p>
                  </div>

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                        saved
                          ? "bg-emerald-500 text-white"
                          : "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                      )}
                    >
                      {saved ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          {t("settings.saved")}
                        </>
                      ) : (
                        t("settings.saveChanges")
                      )}
                    </motion.button>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <Reveal>
                <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{t("settings.security.heading")}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{t("settings.security.subheading")}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="current-password">
                        {t("settings.security.currentPassword")}
                      </label>
                      <div className="relative">
                        <input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          value={passwords.current}
                          onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="new-password">
                        {t("settings.security.newPassword")}
                      </label>
                      <div className="relative">
                        <input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={passwords.newPass}
                          onChange={(e) => setPasswords((p) => ({ ...p, newPass: e.target.value }))}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showNewPassword ? "Hide password" : "Show password"}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirm-password">
                        {t("settings.security.confirmPassword")}
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
                      />
                    </div>
                  </div>

                  {/* 2FA */}
                  <div className="border-t border-gray-100 pt-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{t("settings.security.twoFactor")}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{t("settings.security.twoFactorDesc")}</p>
                      </div>
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {t("settings.security.notEnabled")}
                      </span>
                    </div>
                    <button className="mt-3 text-sm font-medium text-[var(--primary)] hover:underline">
                      {t("settings.security.enable2FA")}
                    </button>
                  </div>

                  {/* Active sessions */}
                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">{t("settings.security.activeSessions")}</h3>
                    <div className="space-y-2">
                      {[
                        { device: "MacBook Pro — Chrome", location: "San Francisco, US", current: true },
                        { device: "iPhone 15 — Safari", location: "San Francisco, US", current: false },
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 bg-gray-50">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{session.device}</p>
                            <p className="text-xs text-gray-400">{session.location}</p>
                          </div>
                          {session.current ? (
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                              {t("settings.security.currentSession")}
                            </span>
                          ) : (
                            <button className="text-xs font-medium text-red-500 hover:underline">
                              {t("settings.security.revoke")}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                        saved
                          ? "bg-emerald-500 text-white"
                          : "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                      )}
                    >
                      {saved ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          {t("settings.saved")}
                        </>
                      ) : (
                        t("settings.security.updatePassword")
                      )}
                    </motion.button>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <Reveal>
                <div className="space-y-5">
                  {/* Credit balance */}
                  <div className="bg-gradient-to-br from-[var(--primary)] to-violet-600 rounded-2xl p-6 text-white shadow-[0_4px_24px_rgba(109,40,217,0.25)]">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-4 w-4 opacity-80" aria-hidden="true" />
                      <span className="text-sm font-medium opacity-80">{t("settings.billing.creditBalance")}</span>
                    </div>
                    <div className="text-5xl font-bold tracking-tight">147</div>
                    <p className="text-sm opacity-70 mt-1">{t("settings.billing.creditsRemaining")}</p>
                    <div className="mt-4 bg-white/10 rounded-xl px-4 py-2 inline-flex items-center gap-2">
                      <span className="text-xs font-medium">{t("settings.billing.currentPlan")}</span>
                      <span className="text-xs font-bold">Starter</span>
                    </div>
                  </div>

                  {/* Buy more credits */}
                  <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">{t("settings.billing.heading")}</h2>
                    <p className="text-sm text-gray-500 mb-4">{t("settings.billing.subheading")}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { credits: 100, price: "$10", color: "border-[var(--primary)] bg-[var(--soft)]", textColor: "text-[var(--primary)]" },
                        { credits: 250, price: "$23", color: "border-violet-200 bg-violet-50", textColor: "text-violet-600" },
                        { credits: 500, price: "$42", color: "border-orange-200 bg-orange-50", textColor: "text-orange-600" },
                        { credits: 1000, price: "$79", color: "border-emerald-200 bg-emerald-50", textColor: "text-emerald-600" },
                      ].map((pack) => (
                        <motion.button
                          key={pack.credits}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            "rounded-xl border-2 p-3 text-center transition-all duration-200",
                            pack.color
                          )}
                        >
                          <div className={cn("text-lg font-bold", pack.textColor)}>{pack.credits}</div>
                          <div className="text-xs text-gray-500">{t("settings.billing.credits")}</div>
                          <div className="text-sm font-semibold text-gray-800 mt-1">{pack.price}</div>
                        </motion.button>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 w-full bg-[var(--primary)] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[var(--primary)]/90 transition-all"
                    >
                      {t("settings.billing.buyCredits")}
                    </motion.button>
                  </div>

                  {/* Credit history */}
                  <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">{t("settings.billing.history")}</h3>
                    <div className="space-y-2">
                      {CREDIT_HISTORY.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.description}</p>
                            <p className="text-xs text-gray-400">{item.date}</p>
                          </div>
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              item.type === "credit" ? "text-emerald-600" : "text-gray-500"
                            )}
                          >
                            {item.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <Reveal>
                <div className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{t("settings.preferences.heading")}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{t("settings.preferences.subheading")}</p>
                  </div>

                  {/* Theme */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{t("settings.preferences.theme")}</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDarkMode(false)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all",
                          !darkMode
                            ? "border-[var(--primary)] bg-[var(--soft)] text-[var(--primary)]"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                      >
                        <Sun className="h-4 w-4" aria-hidden="true" />
                        {t("settings.preferences.light")}
                      </button>
                      <button
                        onClick={() => setDarkMode(true)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all",
                          darkMode
                            ? "border-[var(--primary)] bg-[var(--soft)] text-[var(--primary)]"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                      >
                        <Moon className="h-4 w-4" aria-hidden="true" />
                        {t("settings.preferences.dark")}
                      </button>
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="language">
                      {t("settings.preferences.language")}
                    </label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full sm:w-64 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all bg-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>

                  {/* Default output */}
                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{t("settings.preferences.defaultOutput")}</h3>
                    <div className="space-y-2">
                      {[
                        { id: "nextjs", label: "Next.js 14 + TypeScript", desc: "App Router, Tailwind CSS", checked: true },
                        { id: "react", label: "React + Vite", desc: "SPA, Tailwind CSS", checked: false },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <input
                            type="radio"
                            name="output"
                            defaultChecked={opt.checked}
                            className="accent-[var(--primary)]"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                            <p className="text-xs text-gray-400">{opt.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Danger zone */}
                  <div className="border-t border-red-100 pt-5">
                    <h3 className="text-sm font-semibold text-red-600 mb-1">{t("settings.preferences.dangerZone")}</h3>
                    <p className="text-xs text-gray-400 mb-3">{t("settings.preferences.dangerDesc")}</p>
                    <button className="flex items-center gap-2 text-sm font-medium text-red-500 border border-red-200 rounded-xl px-4 py-2 hover:bg-red-50 transition-colors">
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      {t("settings.preferences.deleteAccount")}
                    </button>
                  </div>

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                        saved
                          ? "bg-emerald-500 text-white"
                          : "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                      )}
                    >
                      {saved ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          {t("settings.saved")}
                        </>
                      ) : (
                        t("settings.saveChanges")
                      )}
                    </motion.button>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}