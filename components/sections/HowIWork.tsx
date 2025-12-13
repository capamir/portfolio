"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const COLOR = "#06B6D4"; // cyan

function TerminalChrome({ title, rightHint }: { title: string; rightHint?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <p className="text-xs font-mono text-slate-400">{title}</p>
      {rightHint ? <p className="text-[10px] font-mono text-slate-600">{rightHint}</p> : <div />}
    </div>
  );
}

type Category = {
  emoji: string;
  title: string;
  badge: string;
  badgeColor: string;
  items: string[];
};

const categories: Category[] = [
  {
    emoji: "🎯",
    title: "Domain Modeling & Architecture",
    badge: "Core Practice",
    badgeColor: "#10B981", // green
    items: [
      "Design data models from real-world entities and edge cases first",
      "Define clear boundaries and constraints to keep complexity manageable",
      "Plan for growth: schemas that scale as product requirements evolve",
    ],
  },
  {
    emoji: "🔐",
    title: "Auth & API Design",
    badge: "Core Practice",
    badgeColor: "#10B981",
    items: [
      "Choose the right auth flow: JWT for stateless, sessions for control, OTP for security",
      "Define API contracts early with predictable pagination, filtering, and errors",
      "Implement RBAC and permission checks at the endpoint level for security",
    ],
  },
  {
    emoji: "🎨",
    title: "Figma → Production UI",
    badge: "Active Focus",
    badgeColor: "#06B6D4", // cyan
    items: [
      "Convert Figma designs into pixel-perfect, responsive React/Next.js UI",
      "Use Tailwind, MUI, or Chakra to speed delivery without sacrificing quality",
      "Add animations and micro-interactions with Framer Motion for premium UX",
    ],
  },
  {
    emoji: "⚙️",
    title: "Business Logic & Clean Code",
    badge: "Core Practice",
    badgeColor: "#10B981",
    items: [
      "Implement complex workflows in composable, testable units",
      "Refactor early and often to avoid technical debt",
      "Write readable code with clear naming and minimal clever abstractions",
    ],
  },
  {
    emoji: "🐛",
    title: "Debug, Review & Improve",
    badge: "Active Focus",
    badgeColor: "#06B6D4",
    items: [
      "Review code systematically: readability, edge cases, performance impact",
      "Fix bugs by root cause analysis, not just symptoms",
      "Enhance existing features in small safe iterations to avoid regressions",
    ],
  },
  {
    emoji: "✅",
    title: "Testing & Git Discipline",
    badge: "Core Practice",
    badgeColor: "#10B981",
    items: [
      "Write meaningful tests for critical paths and edge cases",
      "Use feature branches and atomic commits for clean Git history",
      "Keep releases predictable with CI checks and lightweight QA",
    ],
  },
  {
    emoji: "🤖",
    title: "AI-Assisted Development",
    badge: "Active Focus",
    badgeColor: "#06B6D4",
    items: [
      "Use AI (Claude, Cursor, etc.) for boilerplate, exploration, and faster iteration",
      "Always verify AI output with tests, logs, and manual review",
      "Treat AI as a speed tool, not a replacement for engineering judgment",
    ],
  },
];

export default function HowIWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="how-i-work"
      ref={sectionRef}
      className="w-full py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute top-10 right-10 h-72 w-72 blur-3xl opacity-15"
        style={{ background: COLOR }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500 mb-2">
            Methodology
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50">
            How I{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
              work
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            A pragmatic workflow for building full-stack products: model first, ship fast, verify hard.
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/70"
          style={{ boxShadow: `0 0 40px ${hexToRgba(COLOR, 0.08)}` }}
        >
          <TerminalChrome title="terminal • methodology.md" rightHint="$ cat workflow" />

          <div className="p-6 sm:p-8 font-mono">
            {/* Command prompt */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <span className="text-slate-600">➜</span>
              <span className="text-cyan-400">amir</span>
              <span className="text-slate-600">in</span>
              <span className="text-slate-300">/work</span>
            </div>

            <div className="space-y-8 mt-6">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: 0.12 + i * 0.06 }}
                  className="space-y-3"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={cat.title}>
                      {cat.emoji}
                    </span>
                    <h3 className="text-slate-50 font-semibold">{cat.title}</h3>
                    <span
                      className="ml-auto px-3 py-1 rounded-full text-xs font-mono border"
                      style={{
                        color: cat.badgeColor,
                        background: hexToRgba(cat.badgeColor, 0.12),
                        borderColor: hexToRgba(cat.badgeColor, 0.28),
                      }}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="pl-9 space-y-2">
                    {cat.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        transition={{ duration: 0.3, delay: 0.15 + i * 0.06 + j * 0.03 }}
                        className="flex gap-3 text-slate-300 leading-relaxed"
                      >
                        <span className="text-cyan-400 shrink-0">→</span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer tags */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-500 mb-3">Tech tags:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Django",
                  "React",
                  "Next.js",
                  "PostgreSQL",
                  "JWT",
                  "Tailwind",
                  "Framer Motion",
                  "Git",
                  "AI Tools",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-xs font-mono border bg-white/2 text-slate-300"
                    style={{ borderColor: hexToRgba(COLOR, 0.16) }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
