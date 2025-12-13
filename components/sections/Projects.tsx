"use client";

import React, { useMemo, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

type ProjectLink = { label: string; href?: string; disabled?: boolean };

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string[];
  tech: string[];
  features: string[];
  color: string; // hex
  links: ProjectLink[];
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

function ProjectMockMedia({
  color,
  title,
  subtitle,
}: {
  color: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div
        className="absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl opacity-25"
        style={{ background: color }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.55))]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
            preview
          </p>
          <h4 className="mt-2 text-xl font-semibold text-slate-50">{title}</h4>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-cyan-400">$</span>
            <span>demo</span>
            <span className="text-slate-600">›</span>
            <span className="text-slate-300">coming_soon</span>
          </div>
          <div className="mt-2 text-slate-400">
            Placeholder media (swap with screenshots/video later).
          </div>
        </div>
      </div>
    </div>
  );
}

function HoverRow({
  children,
  color,
  className = "",
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className={[
        "relative rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 transition-colors",
        "will-change-transform",
        className,
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200"
        style={{ boxShadow: `0 0 0 1px ${color}55, 0 0 26px ${color}22` }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

type ToggleChipProps = {
  mode: "FEATURES" | "INFO";
  color: string;
  reduceMotion: boolean;
  onToggle: () => void;
  className?: string;
};

function ToggleChip({
  mode,
  color,
  reduceMotion,
  onToggle,
  className = "",
}: ToggleChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={[
        "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-mono tracking-[0.18em]",
        "bg-white/3 text-slate-200 hover:bg-white/6 transition-colors",
        className,
      ].join(" ")}
      style={{
        borderColor: hexToRgba(color, 0.28),
        boxShadow: `0 0 0 1px ${hexToRgba(color, 0.18)}, 0 0 18px ${hexToRgba(
          color,
          0.1
        )}`,
      }}
      animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.span
        aria-hidden
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
        animate={reduceMotion ? undefined : { scale: [1, 1.55, 1] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
      />
      <span style={{ color }}>{mode}</span>
    </motion.button>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [showFeatures, setShowFeatures] = useState(false);

  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });

  const leftVariants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : -42,
      scale: reduceMotion ? 1 : 0.985,
    },
    show: { opacity: 1, x: 0, scale: 1 },
  };

  const rightVariants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 42,
      scale: reduceMotion ? 1 : 0.985,
    },
    show: { opacity: 1, x: 0, scale: 1 },
  };

  return (
    <div ref={ref} className="relative">
      <div
        className="pointer-events-none absolute -inset-6 opacity-25 blur-3xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${project.color}, transparent 55%)`,
        }}
      />

      <div className="relative rounded-3xl border border-white/10 bg-black/30 p-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT: image + tech stacks */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ duration: 0.55, delay: 0.05 + index * 0.05 }}
            className="flex flex-col gap-4"
          >
            {/* fixed image */}
            <div className="h-80 lg:h-[380px]">
              <ProjectMockMedia
                color={project.color}
                title={project.title}
                subtitle={project.subtitle}
              />
            </div>

            {/* Tech stack under image */}
            <div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <HoverRow
                    key={t}
                    color={project.color}
                    className="px-3 py-1.5"
                  >
                    <span className="text-xs font-mono text-slate-200">
                      {t}
                    </span>
                  </HoverRow>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: info + toggle + features */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ duration: 0.55, delay: 0.12 + index * 0.05 }}
            className="flex flex-col"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
                  Project {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-50">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {project.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                {project.links.map((l) => {
                  const isDisabled = l.disabled || !l.href || l.href === "#";
                  return (
                    <a
                      key={l.label}
                      href={isDisabled ? undefined : l.href}
                      target={isDisabled ? undefined : "_blank"}
                      rel={isDisabled ? undefined : "noreferrer"}
                      className={[
                        "px-3 py-2 rounded-xl text-xs font-mono border transition-all",
                        isDisabled
                          ? "cursor-not-allowed opacity-50 border-white/10 bg-white/3 text-slate-400"
                          : "border-white/10 bg-white/3 text-slate-200 hover:bg-white/6",
                      ].join(" ")}
                      style={
                        isDisabled
                          ? undefined
                          : {
                              borderColor: hexToRgba(project.color, 0.25),
                              boxShadow: `0 0 14px ${hexToRgba(
                                project.color,
                                0.1
                              )}`,
                            }
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        {l.label === "GitHub" ? (
                          <FaGithub />
                        ) : (
                          <FaExternalLinkAlt />
                        )}
                        {l.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* When features are open, show INFO toggle under header (button moved to top) */}
            <AnimatePresence initial={false}>
              {showFeatures ? (
                <motion.div
                  key="top-toggle"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4"
                >
                  <ToggleChip
                    mode="INFO"
                    color={project.color}
                    reduceMotion={!!reduceMotion}
                    onToggle={() => setShowFeatures((v) => !v)}
                    className="w-full justify-center"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Container that swaps: overview collapses, features slides up */}
            <div className="relative mt-4 flex-1 min-h-80">
              <AnimatePresence mode="wait" initial={false}>
                {!showFeatures ? (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35 }}
                    className="h-full"
                  >
                    <p className="text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-5 space-y-2">
                      {project.impact.slice(0, 2).map((line) => (
                        <div
                          key={line}
                          className="flex items-start gap-2 text-sm text-slate-400"
                        >
                          <span
                            className="mt-1 h-1.5 w-1.5 rounded-full"
                            style={{ background: project.color }}
                          />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom FEATURES button (only text + pulse) */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <ToggleChip
                        mode="FEATURES"
                        color={project.color}
                        reduceMotion={!!reduceMotion}
                        onToggle={() => setShowFeatures((v) => !v)}
                        className="w-full justify-center"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 42 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 42 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    {/* Features list comes from bottom */}
                    <div className="h-full rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-5 flex flex-col">
                      <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
                        Key features
                      </p>

                      <div className="mt-4 space-y-3 overflow-auto pr-1">
                        {project.features.map((f) => (
                          <HoverRow
                            key={f}
                            color={project.color}
                            className="px-4 py-3"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-mono text-slate-200">
                                {f}
                              </span>
                              <span className="text-xs font-mono text-slate-500 italic">
                                Hover
                              </span>
                            </div>
                          </HoverRow>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const projects = useMemo<Project[]>(
    () => [
      {
        id: "p1",
        title: "ShopCore",
        subtitle: "E-commerce + inventory with admin tooling",
        description:
          "A full-stack e-commerce system with inventory tracking, cart/checkout flows, and an admin dashboard optimized for operational workflows.",
        impact: [
          "Designed database schema for products, variants, and stock movements.",
          "Built REST APIs with consistent pagination, filtering, and auth.",
          "Focused on reliability: edge cases, validation, and predictable errors.",
        ],
        tech: ["Django", "DRF", "PostgreSQL", "Redis", "Docker", "Next.js"],
        features: [
          "Inventory movements",
          "Cart & checkout",
          "Role-based admin",
          "Search & filtering",
        ],
        color: "#9333EA",
        links: [
          { label: "GitHub", href: "#", disabled: true },
          { label: "Live", href: "#", disabled: true },
        ],
      },
      {
        id: "p2",
        title: "SyncGate",
        subtitle: "Go services + event-driven integrations",
        description:
          "A Go-based backend service layer built for integrations: background jobs, idempotent workflows, and clean service boundaries for future scale.",
        impact: [
          "Implemented job processing patterns (retries, backoff, idempotency).",
          "Built integration-ready APIs and structured logging for debugging.",
          "Kept the codebase modular to support future microservice splits.",
        ],
        tech: ["Go", "PostgreSQL", "Redis", "Docker", "REST", "OpenAPI"],
        features: [
          "Idempotent workflows",
          "Retry & backoff",
          "Service boundaries",
          "Structured logging",
        ],
        color: "#06B6D4",
        links: [
          { label: "GitHub", href: "#", disabled: true },
          { label: "Live", href: "#", disabled: true },
        ],
      },
    ],
    []
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24"
    >
      {/* background glows */}
      <div className="pointer-events-none absolute top-10 left-10 h-64 w-64 rounded-full blur-3xl opacity-15 bg-fuchsia-500" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full blur-3xl opacity-15 bg-cyan-500" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
            02. Projects
          </p>

          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50">
            Selected{" "}
            <span className="bg-linear-to-r from-fuchsia-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Two placeholder projects for now—swap the content with your real
            repos/screenshots when ready.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="space-y-8">
          {projects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
