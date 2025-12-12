"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  SiDjango,
  SiGit,
  SiGo,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiTailwindcss,
} from "react-icons/si";

import { GlassCard } from "@/components/ui/GlassCard";
import Card3D from "@/components/3d/Card3D";

type IconType = React.ComponentType<{ className?: string }>;

type TechItem = {
  name: string;
  icon: IconType;
};

type TerminalItem = {
  title: string;
  description: string;
  colorTitleClass: string;
  diamondClass: string;
};

const techStack: TechItem[] = [
  { name: "Python", icon: SiPython },
  { name: "Django + REST", icon: SiDjango },
  { name: "NextJS", icon: SiNextdotjs },
  { name: "Go", icon: SiGo },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Git", icon: SiGit },
];

function TypewriterText({
  text,
  enabled = true,
  startDelay = 0,
  speed = 16,
  className = "",
}: {
  text: string;
  enabled?: boolean;
  startDelay?: number;
  speed?: number;
  className?: string;
}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startId = setTimeout(() => {
      if (cancelled) return;

      let i = 0;
      intervalId = setInterval(() => {
        if (cancelled) return;

        i += 1;
        setOut(text.slice(0, i));

        if (i >= text.length && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, speed);
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, enabled, startDelay, speed]);

  const displayText = enabled ? out : text;

  return (
    <p className={className}>
      {displayText}
      {enabled && (
        <span className="opacity-0">{text.slice(displayText.length)}</span>
      )}
    </p>
  );
}

function AboutHeader({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2 text-center lg:text-left"
    >
      <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
        01. About
      </p>

      <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
        <span className="bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
          A bit about how and what Amir builds.
        </span>
      </h2>

      <p className="max-w-2xl text-sm sm:text-base text-slate-400 mx-auto lg:mx-0">
        Backend-first, but comfortable across the stack. Focused on shipping
        production-ready systems that are observable, maintainable, and fast.
      </p>
    </motion.div>
  );
}

function ProfileCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex justify-center lg:justify-start"
    >
      <Card3D intensity={8}>
        <GlassCard className="relative flex flex-col items-center gap-5 bg-black/40 px-6 py-6 sm:px-7 sm:py-7">
          {/* Avatar */}
          <div className="relative h-36 w-36 sm:h-44 sm:w-44 mx-auto rounded-full bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-400 p-[2px] animate-gradient">
            <div className="h-full w-full rounded-full bg-slate-950/90 overflow-hidden">
              <Image
                src="/profile.png"
                alt="Amir Noruzi"
                width={144}
                height={144}
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
          </div>

          <div className="text-center space-y-1.5">
            <p className="text-sm font-mono uppercase tracking-[0.18em] text-cyan-300">
              Amir Noruzi
            </p>
            <p className="text-base font-semibold text-slate-50">
              Full-stack Web Developer
            </p>
            <p className="text-xs text-slate-400">
              Focused on fast, reliable products with real-world constraints.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 w-full text-xs text-slate-300">
            <div className="rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                Experience
              </p>
              <p className="font-mono text-sm text-sky-300">2+ years</p>
            </div>

            <div className="rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                Location
              </p>
              <p className="font-mono text-sm text-slate-200">
                Remote · UTC+3:30
              </p>
            </div>

            <div className="rounded-lg border border-slate-700/60 bg-slate-900/60 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                Strength
              </p>
              <p className="font-mono text-sm text-emerald-300">
                Backend & APIs
              </p>
            </div>

            <div className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[11px] font-mono text-emerald-200">
                Available for work
              </p>
            </div>
          </div>
        </GlassCard>
      </Card3D>
    </motion.div>
  );
}

function TerminalChrome() {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <p className="text-xs font-mono text-slate-400">terminal — about.md</p>
      <p className="text-[10px] font-mono text-slate-600">bash</p>
    </div>
  );
}

function TerminalBullet({
  item,
  index,
  inView,
  baseDelayMs,
}: {
  item: TerminalItem;
  index: number;
  inView: boolean;
  baseDelayMs: number;
}) {
  return (
    <div className="flex gap-3">
      <span className={`mt-1 text-lg ${item.diamondClass}`}>◆</span>
      <div className="space-y-1">
        <p className={`font-semibold ${item.colorTitleClass}`}>{item.title}</p>

        <TypewriterText
          enabled={inView}
          text={item.description}
          startDelay={baseDelayMs + index * 650}
          speed={14}
          className="text-gray-400 text-sm leading-relaxed italic whitespace-pre-line"
        />
      </div>
    </div>
  );
}

function TerminalAbout({ inView }: { inView: boolean }) {
  const items: TerminalItem[] = useMemo(
    () => [
      {
        title: "Complex Systems & Models",
        description:
          "Design and implement complex domain models that stay clean, predictable,\nand easy to extend as products grow.",
        colorTitleClass: "text-pink-300",
        diamondClass: "text-pink-400",
      },
      {
        title: "Design-Accurate Frontends",
        description:
          "Translate custom Figma concepts into pixel-perfect, performant React/Next.js\ninterfaces, even when they go beyond standard component libraries.",
        colorTitleClass: "text-cyan-300",
        diamondClass: "text-cyan-400",
      },
      {
        title: "E-commerce Business Flows",
        description:
          "Implement carts, checkout, payments, and inventory flows with strong focus\non edge cases, data integrity, and maintainable backend logic.",
        colorTitleClass: "text-emerald-300",
        diamondClass: "text-emerald-400",
      },
      {
        title: "Debugging & Reliability",
        description:
          "Track down hard bugs and performance issues using logs, tests, and profiling\ninstead of guesswork.",
        colorTitleClass: "text-yellow-200",
        diamondClass: "text-yellow-300",
      },
      {
        title: "From Idea to Shipping Code",
        description:
          "Work with founders and teams to turn vague product ideas into clear specs,\npragmatic architecture, and production-ready features.",
        colorTitleClass: "text-purple-200",
        diamondClass: "text-purple-300",
      },
    ],
    []
  );

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-col"
      >
        <GlassCard className="bg-[#020617]/95 border-slate-800/80 overflow-hidden">
          <TerminalChrome />

          <div className="p-6 font-mono text-sm">
            <div className="space-y-6 text-gray-300">
              <p className="text-xs tracking-[0.35em] text-purple-300 uppercase">
                WHO I AM
              </p>

              {items.map((item, index) => (
                <TerminalBullet
                  key={item.title}
                  item={item}
                  index={index}
                  inView={inView}
                  baseDelayMs={250}
                />
              ))}

              <div className="mt-5 flex items-center gap-2 font-mono text-sm text-slate-400 border-2 p-2 border-cyan-100/50 rounded-lg">
                {/* prompt */}
                <span className="text-slate-600">›</span>
                <span className="text-cyan-400">about $</span>

                {/* block cursor */}
                <span
                  className=" inline-block h-4 w-2 rounded-[2px] bg-cyan-300/90 align-middle"
                  style={{ animation: "terminal-caret 1s steps(1) infinite" }}
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

function CoreToolCard({ tech }: { tech: TechItem }) {
  const Icon = tech.icon;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 380, damping: 25 }}
      className="group relative flex flex-col items-center justify-center rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-4 text-center hover:border-cyan-400/40 hover:bg-slate-900/80"
    >
      <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 text-slate-300 group-hover:text-cyan-300 group-hover:bg-slate-800">
        <Icon className="h-7 w-7" />
      </span>

      <span className="font-mono text-sm text-slate-200 group-hover:text-slate-50">
        {tech.name}
      </span>

      <span
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity group-hover:opacity-100"
        style={{ boxShadow: "0 0 30px rgba(34, 211, 238, 0.10)" }}
      />
    </motion.div>
  );
}

function CoreTools({ inView, techs }: { inView: boolean; techs: TechItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mt-4"
    >
      <div className="mb-10 text-center">
        <h3 className="text-3xl font-extrabold text-slate-50 tracking-tight">
          Core Tools
        </h3>

        <p className="mt-2 text-sm sm:text-base font-mono text-slate-400">
          <span className="text-cyan-400">›</span> Technologies I use daily
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {techs.map((tech) => (
          <CoreToolCard key={tech.name} tech={tech} />
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const techGridRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const isTechGridInView = useInView(techGridRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <AboutHeader inView={isInView} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start">
          <ProfileCard inView={isInView} />
          <TerminalAbout inView={isInView} />
        </div>

        <div ref={techGridRef}>
          <CoreTools inView={isTechGridInView} techs={techStack} />
        </div>
      </div>
    </section>
  );
}
