"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Zap, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { navLinks, brand } from "@/lib/data";

export default function Navbar() {
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"EN" | "中文">("EN");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--surface)]/95 backdrop-blur-md shadow-[0_1px_0_0_var(--border)] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg"
            >
              <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(124,58,237,0.35)] group-hover:shadow-[0_4px_16px_rgba(124,58,237,0.45)] transition-shadow duration-300">
                <Zap className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-[var(--foreground)] text-base tracking-tight">
                {brand.shortName}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.key}
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                      isActive
                        ? "bg-[var(--soft)] text-[var(--primary)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--soft)]/60"
                    }`}
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="hidden md:flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={() =>
                  setLang((prev) => (prev === "EN" ? "中文" : "EN"))
                }
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--soft)]/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>{lang}</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setIsDark((prev) => !prev)}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--soft)]/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4" aria-hidden="true" />
                )}
              </button>

              {/* Sign In */}
              <Link
                href="/signin"
                className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                {t("nav.signIn")}
              </Link>

              {/* Start Building CTA */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[var(--accent)] shadow-[0_2px_12px_rgba(124,58,237,0.35)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.45)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                >
                  {t("nav.startBuilding")}
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--soft)]/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-[var(--surface)]/98 backdrop-blur-md border-b border-[var(--border)] shadow-lg md:hidden"
          >
            <nav
              className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.key}
                    href={getLinkHref(link.href)}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setMobileOpen(false);
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--soft)] text-[var(--primary)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--soft)]/60"
                    }`}
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                );
              })}
              <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--soft)]/60 transition-all duration-200"
                >
                  {t("nav.signIn")}
                </Link>
                <Link
                  href="/generate"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[var(--accent)] text-center transition-all duration-200"
                >
                  {t("nav.startBuilding")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}