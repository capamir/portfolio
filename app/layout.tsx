import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { PageBackground } from "@/components/effects/PageBackground";
import { CursorEffect } from "@/components/ui/CursorEffect";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amir Noruzi | Full‑Stack Web Developer",
  description:
    "Portfolio of Amir Noruzi – building fast, reliable, production‑ready web applications with Next.js, Go, Django, and modern tooling.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-black text-slate-100 antialiased overflow-x-hidden font-sans relative">
        {/* Background + cursor live behind everything */}
        <PageBackground />
        <CursorEffect />

        {/* Scroll-based helpers */}
        <ScrollProgress />
        <ScrollToTop />

        {/* Main layout shell */}
        <div className="flex min-h-screen flex-col relative z-10">
          <Header />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
        </div>

        {/* Mobile bottom nav (icons only, like Instagram) */}
        <MobileBottomNav />
      </body>
    </html>
  );
}
