"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/** Small helper (kept local so file is standalone). */
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

/* ------------------------- Demo Data (Career) ------------------------- */
type CareerItem = {
  year: string;
  duration: string;
  title: string;
  company: string;
  logo?: string | null;
  location?: string | null;
  link?: string | null;
  linkLabel?: string | null;
  summary: string;
  highlights: string[];
  tech: string[];
};

const CAREER_COLOR = "#06B6D4"; // cyan
const EDU_COLOR = "#9333EA"; // purple

const careerData: CareerItem[] = [
  {
    year: "2025",
    duration: "2025 – Present",
    title: "Frontend Developer",
    company: "Dekamond",
    logo: null, // add if you have an asset
    location: "Remote • Tehran", // or Remote if that's accurate
    link: null, // add company/product link if allowed
    summary:
      "Built and maintained production UI in React/Next.js by converting Figma designs into clean, reusable components and fixing frontend issues.",
    highlights: [
      "Converted Figma designs into React and Next.js screens with responsive, design-accurate UI.",
      "Reviewed existing codebase and fixed UI bugs, runtime errors, and edge-case rendering issues.",
      "Worked with GitLab using feature branches; delivered isolated changes for fast review and conflict-free merges.",
      "Consistently shipped tasks before estimates while keeping code clean and maintainable.",
    ],
    tech: ["React", "Next.js", "TypeScript", "GitLab", "Figma", "axios", "scss", "JWt-auth"],
  },
  {
    year: "2024",
    duration: "4 months • Finished May 2024",
    title: "Junior Frontend Developer (React Track)",
    company: "Quera",
    logo: null,
    location: "Remote • Tehran",
    link: "https://quera.org/certificate/beiLZ1Fo/",
    linkLabel: "Certificate",
    summary:
      "Completed an intensive React track focused on core React patterns, state management, and TypeScript.",
    highlights: [
      "Learned React fundamentals, component design, hooks, and rendering patterns.",
      "Practiced global state management and app structure using TypeScript.",
      "Worked with common ecosystem tools such as Zustand and React Hook Form.",
      "Built small projects and exercises using modern React packages and best practices.",
    ],
    tech: ["React", "Next.js", "TypeScript", "axios", "zod" ,"Zustand", "React Hook Form", "react-router-dom", "mui", "react-query"],
  },
];

/* ------------------------ Education Data (Same as friend) ------------------------ */
type EducationItem = {
  year: string;
  title: string;
  institution: string;
  branch: string;
  status: "In Progress" | "Graduated";
  focus: string;
  thesis?: string;
};

const educationData: EducationItem[] = [
  {
    year: "2025 –",
    title: "M.Sc. Computer Networks Engineering",
    institution: "Islamic Azad University",
    branch: "Science and Research Branch",
    status: "In Progress",
    focus:
      "Network security and distributed systems (with interest in AI-assisted observability)",
  },

  {
    year: "2020 – 2024",
    title: "B.Sc. Computer Science",
    institution: "University of Guilan",
    branch: "Iran",
    status: "Graduated",
    focus: "Algorithms, Data Structures, Software Engineering",
    thesis: "Particle Swarm Optimization algorithms research",
  },
];

/* ------------------------- UI Bits ------------------------- */
function TechPill({ t }: { t: string }) {
  return (
    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/4 border border-white/10 text-slate-300">
      {t}
    </span>
  );
}

function CareerCard({ item, index }: { item: CareerItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      {/* Timeline node */}
      <div className="absolute -left-12 top-1">
        <div
          className="w-4 h-4 rounded-full border-2"
          style={{
            background: CAREER_COLOR,
            borderColor: CAREER_COLOR,
            boxShadow: `0 0 12px ${hexToRgba(CAREER_COLOR, 0.55)}`,
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        className={[
          "p-5 rounded-2xl border bg-black/35 cursor-pointer transition-colors",
          isExpanded
            ? "border-cyan-500/40"
            : "border-white/10 hover:border-cyan-500/30",
        ].join(" ")}
        onClick={() => setIsExpanded((v) => !v)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        style={{
          boxShadow: isExpanded
            ? `0 0 22px ${hexToRgba(CAREER_COLOR, 0.12)}`
            : undefined,
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {item.logo ? (
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
              <Image
                src={item.logo}
                alt={item.company}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div
              className="w-10 h-10 rounded-xl border shrink-0"
              style={{
                borderColor: hexToRgba(CAREER_COLOR, 0.25),
                background: hexToRgba(CAREER_COLOR, 0.08),
              }}
            />
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-slate-50 font-semibold">{item.title}</h4>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded ita"
                style={{
                  color: CAREER_COLOR,
                  background: hexToRgba(CAREER_COLOR, 0.12),
                  border: `1px solid ${hexToRgba(CAREER_COLOR, 0.22)}`,
                }}
              >
                {item.year}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-slate-400">{item.company}</p>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <span>🔗</span>
                  <span>{item.linkLabel || item.link}</span>
                </a>
              ) : null}
            </div>

            <p className="text-xs text-slate-600 font-mono mt-1 italic">
              {item.duration}
              {item.location ? ` • ${item.location}` : ""}
            </p>
          </div>
        </div>

        {/* Summary always visible */}
        <p className="text-sm text-slate-300/90 leading-relaxed">
          {item.summary}
        </p>

        {/* Expand CTA */}
        {!isExpanded ? (
          <motion.div
            className="mt-4 inline-flex items-center gap-2 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{ color: CAREER_COLOR }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: CAREER_COLOR }}
            />
            <span>View achievements</span>
            <motion.span
              aria-hidden
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.div>
        ) : null}

        {/* Expandable highlights */}
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              key="highlights"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/10">
                <p
                  className="text-xs font-mono mb-3 flex items-center gap-2"
                  style={{ color: CAREER_COLOR }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: CAREER_COLOR }}
                  />
                  Key achievements
                </p>

                <ul className="space-y-2">
                  {item.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="text-sm text-slate-300/90 leading-relaxed flex gap-2"
                    >
                      <span style={{ color: CAREER_COLOR }}>•</span>
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="mt-4 w-full py-2 text-xs text-slate-500 hover:text-cyan-300 font-mono transition-colors flex items-center justify-center gap-2"
                >
                  <span>Collapse</span>
                  <motion.span
                    aria-hidden
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ↑
                  </motion.span>
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Tech pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(isExpanded ? item.tech : item.tech.slice(0, 4)).map((t) => (
            <TechPill key={t} t={t} />
          ))}
          {!isExpanded && item.tech.length > 4 ? (
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/3 border border-white/10 text-slate-400">
              +{item.tech.length - 4}
            </span>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section id="experience" className="w-full py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase mb-2 block">
            Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Career{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
              & Education
            </span>
          </h2>
          <p className="text-slate-500 mt-3 font-mono text-sm">
            Click career cards to expand achievements.
          </p>
        </motion.div>

        {/* Dual column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Career */}
          <div className="relative">
            <motion.div
              className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-10 h-10 rounded-xl border flex items-center justify-center"
                style={{
                  borderColor: hexToRgba(CAREER_COLOR, 0.28),
                  background: hexToRgba(CAREER_COLOR, 0.1),
                }}
              >
                <span style={{ color: CAREER_COLOR }}>◆</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Career</h3>
                
              </div>
            </motion.div>

            {/* Vertical line */}
            <div
              className="absolute left-5 top-16 bottom-0 w-0.5"
              style={{
                background: `linear-gradient(to bottom, ${hexToRgba(
                  CAREER_COLOR,
                  0.55
                )}, ${hexToRgba(CAREER_COLOR, 0.18)}, transparent)`,
              }}
            />

            <div className="space-y-6 pl-12">
              {careerData.map((item, index) => (
                <CareerCard
                  key={item.year + item.title}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="relative">
            <motion.div
              className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-10 h-10 rounded-xl border flex items-center justify-center"
                style={{
                  borderColor: hexToRgba(EDU_COLOR, 0.28),
                  background: hexToRgba(EDU_COLOR, 0.1),
                }}
              >
                <span style={{ color: EDU_COLOR }}>◆</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Education</h3>
                <p className="text-slate-500 text-xs font-mono">
                  Academic background.
                </p>
              </div>
            </motion.div>

            {/* Vertical line */}
            <div
              className="absolute left-5 top-16 bottom-0 w-0.5"
              style={{
                background: `linear-gradient(to bottom, ${hexToRgba(
                  EDU_COLOR,
                  0.55
                )}, ${hexToRgba(EDU_COLOR, 0.18)}, transparent)`,
              }}
            />

            <div className="space-y-6 pl-12">
              {educationData.map((item, index) => (
                <motion.div
                  key={item.year + item.title}
                  className="relative"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* node */}
                  <div className="absolute -left-12 top-1">
                    <div
                      className={[
                        "w-4 h-4 rounded-full border-2",
                        item.status === "In Progress" ? "animate-pulse" : "",
                      ].join(" ")}
                      style={{
                        background: EDU_COLOR,
                        borderColor: EDU_COLOR,
                        boxShadow: `0 0 12px ${hexToRgba(EDU_COLOR, 0.55)}`,
                      }}
                    />
                  </div>

                  <div className="p-5 rounded-2xl border border-white/10 bg-black/35 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded border"
                        style={{
                          color:
                            item.status === "In Progress"
                              ? "#C084FC"
                              : "#86EFAC",
                          background:
                            item.status === "In Progress"
                              ? "rgba(147, 51, 234, 0.18)"
                              : "rgba(34, 197, 94, 0.12)",
                          borderColor:
                            item.status === "In Progress"
                              ? "rgba(147, 51, 234, 0.28)"
                              : "rgba(34, 197, 94, 0.22)",
                        }}
                      >
                        {item.status}
                      </span>

                      <span
                        className="text-xs font-mono"
                        style={{ color: EDU_COLOR }}
                      >
                        {item.year}
                      </span>
                    </div>

                    <h4 className="text-slate-50 font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-400 mt-1">
                      {item.institution}
                    </p>
                    <p className="text-xs text-slate-600 font-mono mt-1 italic">
                      {item.branch}
                    </p>

                    <div className="mt-3 text-xs text-slate-400 leading-relaxed space-y-1">
                      <div className="flex gap-2">
                        <span style={{ color: hexToRgba(EDU_COLOR, 0.55) }}>
                          •
                        </span>
                        <span>{item.focus}</span>
                      </div>
                      {item.thesis ? (
                        <div className="flex gap-2">
                          <span style={{ color: hexToRgba(EDU_COLOR, 0.55) }}>
                            •
                          </span>
                          <span>{item.thesis}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
