import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Builder by HotCode — AI Website Generator",
  description:
    "Describe what you want. Our GPT-4o-powered engine writes the code, designs the layout, and deploys a production-ready site in seconds.",
  openGraph: {
    title: "Builder by HotCode — AI Website Generator",
    description:
      "Turn any idea into a production-ready Next.js website in under 60 seconds. Powered by GPT-4o.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}