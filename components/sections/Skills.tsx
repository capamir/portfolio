"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

import {
  FaServer,
  FaDesktop,
  FaDatabase,
  FaTools,
  FaTerminal,
} from "react-icons/fa";

import Card3D from "@/components/3d/Card3D";
import { GlassCard } from "@/components/ui/GlassCard";
import SkillPillItem from "@/components/ui/SkillPillItem";

type Skill = { name: string; experience?: string };

type Highlight = {
  icon: string;
  title: string;
  desc: string;
};

type CategoryKey = "backend" | "frontend" | "database" | "tools";

type Category = {
  key: CategoryKey;
  label: string;
  title: string;
  color: string; // hex
  icon: React.ReactNode;
  skills: Skill[];
  highlights: Highlight[];
  intro: string; // italic short intro shown in terminal
};

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

const CURRENTLY_LEARNING = "GO, Pentest, Testing";

const CATEGORIES: Record<CategoryKey, Category> = {
  backend: {
    key: "backend",
    label: "Backend",
    title: "Backend Core",
    color: "#9333EA",
    icon: <FaServer className="h-4 w-4" />,
    intro:
      "Backend-first development with predictable APIs and production reliability.",
    skills: [
      { name: "Python", experience: "2+ years" },
      { name: "Django / DRF", experience: "2+ years" },
      { name: "FastAPI", experience: "1+ year" },
      { name: "Celery", experience: "1 year" },
      { name: "RESTful APIs", experience: "2 years" },
      { name: "Async Programming", experience: "1 year" },
    ],
    highlights: [
      {
        icon: "⚡",
        title: "Fast Turnaround",
        desc: "Ship features in days, not weeks.",
      },
      {
        icon: "🔗",
        title: "API & Integrations",
        desc: "Clean contracts, robust integrations.",
      },
      {
        icon: "🧱",
        title: "Clean Architecture",
        desc: "Maintainable, documented, production-ready.",
      },
      {
        icon: "🛡️",
        title: "Reliability",
        desc: "Edge-cases handled, debugging-friendly.",
      },
    ],
  },

  frontend: {
    key: "frontend",
    label: "Frontend",
    title: "Frontend Delivery",
    color: "#06B6D4",
    icon: <FaDesktop className="h-4 w-4" />,
    intro:
      "Design-accurate UI delivery with motion polish and responsive layouts.",
    skills: [
      { name: "Next.js", experience: "1+ year" },
      { name: "React", experience: "1+ year" },
      { name: "TypeScript", experience: "1 year" },
      { name: "Tailwind", experience: "1+ year" },
      { name: "UI from Figma", experience: "1+ year" },
      { name: "Motion polish", experience: "1 year" },
    ],
    highlights: [
      {
        icon: "🎯",
        title: "Design-Accurate UI",
        desc: "Pixel-consistent implementation from Figma.",
      },
      {
        icon: "⚙️",
        title: "Component Systems",
        desc: "Reusable, scalable UI primitives.",
      },
      {
        icon: "🚀",
        title: "Performance",
        desc: "Smooth interactions and responsive layouts.",
      },
      {
        icon: "🧩",
        title: "DX Focus",
        desc: "Clean structure for fast iteration.",
      },
    ],
  },

  database: {
    key: "database",
    label: "Database",
    title: "Databases",
    color: "#22C55E",
    icon: <FaDatabase className="h-4 w-4" />,
    intro: "Practical data modeling with performance and correctness in mind.",
    skills: [
      { name: "PostgreSQL", experience: "2 years" },
      { name: "Schema Design", experience: "2 years" },
      { name: "Indexes & Query Tuning", experience: "1.5 years" },
      { name: "Redis", experience: "1 year" },
      { name: "Transactions", experience: "2 years" },
      { name: "Data Integrity Patterns", experience: "2 years" },
    ],
    highlights: [
      {
        icon: "🧠",
        title: "Solid Modeling",
        desc: "Constraints, relations, integrity first.",
      },
      {
        icon: "📈",
        title: "Performance",
        desc: "Indexes, query tuning, practical optimization.",
      },
      {
        icon: "🧾",
        title: "Migrations",
        desc: "Safe schema evolution and stable deploys.",
      },
      {
        icon: "🧊",
        title: "Caching",
        desc: "Redis patterns for speed and scale.",
      },
    ],
  },

  tools: {
    key: "tools",
    label: "Tools",
    title: "Tools & Workflow",
    color: "#F59E0B",
    icon: <FaTools className="h-4 w-4" />,
    intro:
      "A workflow built around fast iteration and practical maintainability.",
    skills: [
      { name: "Git (branching/PRs)", experience: "2+ years" },
      { name: "Debugging & Profiling", experience: "2 years" },
      { name: "Testing mindset", experience: "1 year" },
      { name: "API docs (Swagger)", experience: "1.5 years" },
      { name: "Communication & delivery", experience: "2 years" },
    ],
    highlights: [
      {
        icon: "🧰",
        title: "Developer Workflow",
        desc: "Fast feedback loops and clean commits.",
      },
      {
        icon: "🧪",
        title: "Testing Mindset",
        desc: "Confidence in changes and refactors.",
      },
      {
        icon: "🧭",
        title: "Documentation",
        desc: "Clear docs and maintainable codebases.",
      },
      {
        icon: "🔍",
        title: "Bug Hunting",
        desc: "Logs, traces, practical debugging.",
      },
    ],
  },
};

function SkillsHeader({
  activeTab,
  setActiveTab,
  inView,
}: {
  activeTab: CategoryKey;
  setActiveTab: (k: CategoryKey) => void;
  inView: boolean;
}) {
  const tabs: CategoryKey[] = ["backend", "frontend", "database", "tools"];
  const current = CATEGORIES[activeTab];

  return (
    <div className="w-full max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="text-center mb-10"
      >
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
          03. Skills
        </p>

        <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">
          Technical{" "}
          <span className="bg-linear-to-r from-fuchsia-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Proficiency
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Switch tabs to explore different areas; each view shows a toolkit list
          and a terminal-style highlights panel.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="flex justify-center"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((t) => {
            const cat = CATEGORIES[t];
            const isActive = t === activeTab;

            return (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={[
                  "relative overflow-hidden rounded-2xl px-5 py-3",
                  "font-mono text-xs sm:text-sm tracking-[0.14em] uppercase",
                  "transition-all duration-300 border",
                  isActive
                    ? "text-slate-50"
                    : "text-slate-400 hover:text-slate-200",
                ].join(" ")}
                style={{
                  borderColor: isActive
                    ? hexToRgba(cat.color, 0.7)
                    : "rgba(148,163,184,0.15)",
                  background: isActive
                    ? hexToRgba(cat.color, 0.12)
                    : "rgba(255,255,255,0.03)",
                  boxShadow: isActive
                    ? `0 0 18px ${hexToRgba(cat.color, 0.22)}`
                    : "none",
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: hexToRgba(cat.color, 0.35),
                      background: hexToRgba(cat.color, 0.1),
                      color: hexToRgba(cat.color, 0.95),
                    }}
                  >
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </span>

                {isActive && (
                  <motion.span
                    layoutId="skills-active-underline"
                    className="absolute inset-x-6 -bottom-1 h-0.5 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${
                        cat.color
                      }, ${hexToRgba(cat.color, 0.35)})`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-72 blur-3xl opacity-20"
        style={{ background: current.color }}
      />
    </div>
  );
}

function SkillsLeftPanel({ category }: { category: Category }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`left-${category.key}`}
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -18 }}
        transition={{ duration: 0.35 }}
        className="skill-card"
      >
        <Card3D intensity={7}>
          <GlassCard
            variant="terminal"
            glow
            interactive
            // Make it “heavier” so it doesn't look smaller than the right panel
            className="p-6 sm:p-7 h-full min-h-[560px] flex flex-col"
          >
            <div className="flex items-start gap-3 mb-6 pb-4 border-b border-white/10">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: hexToRgba(category.color, 0.16),
                  color: category.color,
                }}
              >
                {category.icon}
              </div>

              <div>
                <h3 className="text-white font-semibold">{category.title}</h3>
                <p className="text-gray-500 text-xs font-mono">Skill Levels</p>
              </div>

              <div className="ml-auto">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {category.skills.map((s, i) => (
                <SkillPillItem
                  key={s.name}
                  name={s.name}
                  meta={s.experience}
                  color={category.color}
                  delay={i * 0.05}
                />
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: category.color,
                      boxShadow: `0 0 10px ${category.color}55`,
                    }}
                  />
                  Active toolkit
                </span>
                <span className="text-slate-300">
                  {category.skills.length} items
                </span>
              </div>

              {/* Small extra footer to balance height visually */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">
                    Focus
                  </p>
                  <p className="text-sm text-slate-200 font-mono">Production</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">
                    Style
                  </p>
                  <p className="text-sm text-slate-200 font-mono">
                    Clean + Fast
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </Card3D>
      </motion.div>
    </AnimatePresence>
  );
}

function TerminalChrome({
  title = "terminal — experience",
  rightHint = "try: neofetch",
}: {
  title?: string;
  rightHint?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
      </div>

      <p className="text-xs font-mono text-slate-400">{title}</p>
      <p className="text-[10px] font-mono text-slate-600">{rightHint}</p>
    </div>
  );
}

function SkillsRightTerminal({ category }: { category: Category }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`right-${category.key}`}
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.35 }}
        className="skill-card"
      >
        {/* floating terminal */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <GlassCard className="bg-[#020617]/95 border-slate-800/80 overflow-hidden h-full min-h-[560px]">
            <TerminalChrome />

            <div className="p-6 sm:p-7 font-mono">
              {/* Cleaner prompt: no "summary --xxx" */}
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <FaTerminal className="h-4 w-4 text-slate-600" />
                <span className="text-slate-500">{category.key}</span>
              </div>

              {/* Italic intro */}
              <p className="mt-4 text-slate-300 text-sm sm:text-base italic leading-relaxed">
                {category.intro}
              </p>

              <div className="mt-6">
                <p className="text-xs tracking-[0.35em] text-purple-300 uppercase">
                  WHAT I BRING
                </p>

                <div className="mt-4 space-y-3">
                  {category.highlights.map((h, idx) => (
                    <motion.div
                      key={h.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ x: 10, scale: 1.015 }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 26,
                        delay: 0.08 * idx,
                      }}
                      className="relative rounded-xl border bg-white/3 px-4 py-3 hover:bg-white/6 will-change-transform"
                      style={{
                        borderColor: "rgba(255,255,255,0.10)",
                        boxShadow: "none",
                      }}
                    >
                      {/* hover glow layer */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200"
                        style={{
                          boxShadow: `0 0 0 1px ${category.color}55, 0 0 26px ${category.color}22`,
                        }}
                      />
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-0.5 text-lg"
                          style={{ color: category.color }}
                        >
                          {h.icon}
                        </span>
                        <div>
                          <p className="text-slate-100 font-semibold">
                            {h.title}
                          </p>
                          <p className="text-slate-400 text-sm italic">
                            {h.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Keep currently learning (no extra tool duplication) */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-green-400">●</span>
                  <span className="text-slate-500">Currently learning:</span>
                  <span className="text-cyan-300">{CURRENTLY_LEARNING}</span>
                </div>

                
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [activeTab, setActiveTab] = useState<CategoryKey>("backend");
  const currentCategory = useMemo(() => CATEGORIES[activeTab], [activeTab]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
    >
      {/* decorative glows that follow active tab */}
      <div
        className="absolute top-16 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: currentCategory.color,
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute bottom-16 left-10 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "#06B6D4", transform: "translateZ(0)" }}
      />

      <SkillsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inView={inView}
      />

      <div className="w-full max-w-6xl mx-auto relative z-10 mt-10">
        {/* responsive: stack on mobile, two columns on lg */}
        {/* Slightly favor left width to balance visually */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <SkillsLeftPanel category={currentCategory} />
          <SkillsRightTerminal category={currentCategory} />
        </div>
      </div>
    </section>
  );
}
