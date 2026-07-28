"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Zap } from 'lucide-react';
import { brand } from "@/lib/data";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const productLinks = t.raw("footer.productLinks") as { label: string; href: string }[];
  const resourceLinks = t.raw("footer.resourceLinks") as { label: string; href: string }[];
  const companyLinks = t.raw("footer.companyLinks") as { label: string; href: string }[];

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="md:col-span-1"
          >
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg w-fit"
            >
              <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(124,58,237,0.3)] group-hover:shadow-[0_4px_16px_rgba(124,58,237,0.4)] transition-shadow duration-300">
                <Zap className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-[var(--foreground)] text-base tracking-tight">
                {brand.shortName}
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-[220px]">
              {t("footer.tagline")}
            </p>
          </motion.div>

          {/* Product links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 tracking-wide">
              {t("footer.productHeading")}
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 tracking-wide">
              {t("footer.resourcesHeading")}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 tracking-wide">
              {t("footer.companyHeading")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-[var(--muted)]">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {t("footer.builtWith")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
