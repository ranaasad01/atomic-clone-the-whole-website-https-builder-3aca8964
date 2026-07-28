# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
clone the whole website https://builder.hotcode.ai

## Goal
Build a pixel-perfect visual clone of builder.hotcode.ai — an AI website generator SaaS landing page — with all 5 pages (Home, Pricing, Examples, FAQ, Contact) using Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Project type
landing-page

## Design system — match this exactly
- Color tokens: `--background: #F5F3FF`, `--foreground: #1F2937`, `--muted: #6B7280`, `--primary: #7C3AED`, `--accent: #8B5CF6`, `--border: #DDD6FE`
- Fonts: Inter

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`contact`, `contactPage`, `cta`, `ctaBanner`, `examples`, `examplesCarousel`, `examplesPage`, `faq`, `faqPage`, `faqTeaser`, `features`, `footer`, `generate`, `hero`, `how`, `howItWorks`, `nav`, `pricing`, `pricingPage`, `settings`, `tutorial`, `video`, `videoTutorial`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
