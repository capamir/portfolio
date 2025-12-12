"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiPython,
  SiGit,
  SiGo,
} from "react-icons/si";
import { GlassCard } from "@/components/ui/GlassCard";
import Card3D from "@/components/3d/Card3D";

const techStack = [
  { name: "Python", icon: SiPython },
  { name: "Django", icon: SiDjango },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Go", icon: SiGo },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
];

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
      <div className="mx-auto flex max-w-6xl flex-col gap-10 ">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 text-center lg:text-left"
        >
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
            01. About
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
            A bit about how and what Amir builds.
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-slate-400 mx-auto lg:mx-0">
            Backend‑first, but comfortable across the stack. Focused on shipping
            production‑ready systems that are observable, maintainable, and
            fast.
          </p>
        </motion.div>

        {/* Main content: profile + terminal bio */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start">
          {/* Left: profile card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center lg:justify-start"
          >
            <Card3D>
              <GlassCard className="relative flex flex-col items-center gap-5 bg-black/40 px-6 py-6 sm:px-7 sm:py-7">
                {/* Avatar / placeholder */}
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-400 p-[2px] animate-gradient">
                  <div className="h-full w-full rounded-full bg-slate-950/90 flex items-center justify-center overflow-hidden">
                    {/* Replace src with your real photo when ready */}
                    <Image
                      src="/avatar-placeholder.png"
                      alt="Amir Noruzi"
                      width={144}
                      height={144}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center space-y-1.5">
                  <p className="text-sm font-mono uppercase tracking-[0.18em] text-cyan-300">
                    Amir Noruzi
                  </p>
                  <p className="text-base font-semibold text-slate-50">
                    Full‑stack Web Developer
                  </p>
                  <p className="text-xs text-slate-400">
                    Focused on fast, reliable products with real‑world
                    constraints.
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

          {/* Right: terminal-style about.md */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <GlassCard className="bg-[#020617]/80 border-slate-700/70 overflow-hidden">
              {/* Terminal chrome */}
              <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900/80 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <p className="text-xs font-mono text-slate-400">
                  terminal — about.md
                </p>
                <p className="text-[10px] font-mono text-slate-600">bash</p>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">

                {/* Output */}
                <div className="space-y-6 text-gray-300">
                  {/* Section title */}
                  <p className="text-xs tracking-[0.35em] text-purple-300 uppercase">
                    WHO I AM
                  </p>

                  {/* 1. Complex models */}
                  <div className="flex gap-3">
                    <span className="mt-1 text-pink-400 text-lg">◆</span>
                    <div className="space-y-1">
                      <p className="font-semibold text-pink-300">
                        Complex Systems & Models
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Design and implement complex domain models that stay
                        clean, predictable, and easy to extend as products grow.
                      </p>
                    </div>
                  </div>

                  {/* 2. Custom frontends from Figma */}
                  <div className="flex gap-3">
                    <span className="mt-1 text-cyan-400 text-lg">◆</span>
                    <div className="space-y-1">
                      <p className="font-semibold text-cyan-300">
                        Design‑Accurate Frontends
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Translate custom Figma concepts into pixel‑perfect,
                        performant React/Next.js interfaces, even when they go
                        beyond standard component libraries.
                      </p>
                    </div>
                  </div>

                  {/* 3. E‑commerce logic */}
                  <div className="flex gap-3">
                    <span className="mt-1 text-emerald-400 text-lg">◆</span>
                    <div className="space-y-1">
                      <p className="font-semibold text-emerald-300">
                        E‑commerce Business Flows
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Implement carts, checkout, payments, and inventory flows
                        with strong focus on edge cases, data integrity, and
                        maintainable backend logic.
                      </p>
                    </div>
                  </div>

                  {/* 4. Debugging & error solving */}
                  <div className="flex gap-3">
                    <span className="mt-1 text-yellow-300 text-lg">◆</span>
                    <div className="space-y-1">
                      <p className="font-semibold text-yellow-200">
                        Debugging & Reliability
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Track down hard bugs and performance issues using logs,
                        tests, and profiling instead of guesswork.
                      </p>
                    </div>
                  </div>

                  {/* 5. Converting ideas to code */}
                  <div className="flex gap-3">
                    <span className="mt-1 text-purple-300 text-lg">◆</span>
                    <div className="space-y-1">
                      <p className="font-semibold text-purple-200">
                        From Idea to Shipping Code
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Work with founders and teams to turn vague product ideas
                        into clear specs, pragmatic architecture, and
                        production‑ready features.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Core tools grid */}
        <motion.div
          ref={techGridRef}
          initial={{ opacity: 0, y: 16 }}
          animate={isTechGridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4"
        >
          <div className="mb-4 flex flex-col gap-1 text-center lg:text-left">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
              Core tools
            </p>
            <p className="text-sm text-slate-400">
              Technologies Amir uses most days.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isTechGridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-900/60 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs text-slate-200"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-800/80 text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[0.75rem]">{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
