"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiTelegram } from "react-icons/si";

const BRAND = "AMIR.DEV";
const ACCENT = "#06B6D4"; // cyan

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Footer() {
  const year = new Date().getFullYear();

  // TODO: put your real links here
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/capamir",
      icon: FiGithub,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/capamir",
      icon: FiLinkedin,
    },
    { label: "Telegram", href: "https://t.me/capamir", icon: SiTelegram },
    { label: "Email", href: "mailto:amir583121@gmail.com", icon: FiMail },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative w-full border-t border-white/10 bg-slate-950/60">
      {/* Soft glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[520px] -translate-x-1/2 blur-3xl opacity-20"
        style={{ background: ACCENT }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">{">"}</span>
              <span className="font-mono tracking-[0.22em] text-slate-200">
                {BRAND}
                <span className="text-slate-500">_</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Full-stack developer focused on clean architecture, reliable APIs,
              and design-accurate UI.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-400">
                Available for projects
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
              Quick links
            </p>

            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl border border-white/10 bg-white/2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="font-mono text-xs text-slate-500 mr-2">
                    $
                  </span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials (icon-only) */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
              Connections
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/2 hover:bg-white/6 hover:border-cyan-500/30 transition-all"
                    style={{ boxShadow: `0 0 18px ${hexToRgba(ACCENT, 0.08)}` }}
                  >
                    <Icon className="text-2xl text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs font-mono text-slate-500">
            © {year} {BRAND}. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600/70" />
            <span>Built with Next.js + Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
