"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTelegramPlane,
  FaPaperPlane,
  FaDownload,
} from "react-icons/fa";

// --- Shared hero data model ---

const NAME = "Amir Noruzi";
const ROLE = "Full‑stack Web Developer";
const FOCUS = "Building fast & reliable products";
const EXPERIENCE = "2+ years";
const STACK = ["Next.js", "Go", "Django", "PostgreSQL"];
const CURRENT = "Shipping clean, production‑ready code";

const TITLE_SEQUENCE = [
  NAME,
  "a Python backend developer",
  "a React front‑end developer",
  "a Go developer",
  NAME,
];

interface Token {
  text: string;
  className?: string;
}

// JSON-like tokens for the right editor card (inspired by app 1)
const codeTokens: Token[] = [
  { text: "{\n", className: "text-slate-500" },

  // name
  { text: '  "name"', className: "pl-4 text-slate-400" },
  { text: ": ", className: "text-slate-300" },
  { text: `"${NAME}"`, className: "text-emerald-300" },
  { text: ",\n", className: "text-slate-500" },

  // role
  { text: '  "role"', className: "pl-4 text-slate-400" },
  { text: ": ", className: "text-slate-300" },
  { text: `"${ROLE}"`, className: "text-sky-300" },
  { text: ",\n", className: "text-slate-500" },

  // stack
  { text: '  "stack"', className: "pl-4 text-slate-400" },
  { text: ": ", className: "text-slate-300" },
  {
    text: `[${STACK.map(
      (item, i) => `"${item}"${i < STACK.length - 1 ? ", " : ""}`
    ).join("")}]`,
    className: "text-orange-300",
  },
  { text: ",\n", className: "text-slate-500" },

  // focus
  { text: '  "focus"', className: "pl-4 text-slate-400" },
  { text: ": ", className: "text-slate-300" },
  { text: `"${FOCUS}"`, className: "text-fuchsia-300" },
  { text: ",\n", className: "text-slate-500" },

  // currently
  { text: '  "currently"', className: "pl-4 text-slate-400" },
  { text: ": ", className: "text-slate-300" },
  { text: `"${CURRENT}"`, className: "text-cyan-300" },
  { text: "\n", className: "text-slate-500" },

  { text: "}", className: "text-slate-500" },
];

// --- Typewriter for tokens (right card) ---

function Typewriter({
  tokens,
  speed = 35,
}: {
  tokens: Token[];
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState<{ idx: number; char: number }>({
    idx: 0,
    char: 0,
  });

  useEffect(() => {
    if (displayed.idx >= tokens.length) return;

    const timeout = setTimeout(() => {
      let nextIdx = displayed.idx;
      let nextChar = displayed.char + 1;

      if (nextChar > tokens[nextIdx].text.length) {
        nextIdx++;
        nextChar = 0;
      }

      setDisplayed({ idx: nextIdx, char: nextChar });
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, tokens, speed]);

  return (
    <>
      {tokens.map((t, i) => {
        if (i < displayed.idx) {
          return (
            <span key={i} className={t.className}>
              {t.text}
            </span>
          );
        }

        if (i === displayed.idx) {
          return (
            <span key={i} className={t.className}>
              {t.text.slice(0, displayed.char)}
              <span className="animate-pulse text-cyan-300">▊</span>
            </span>
          );
        }

        return null;
      })}
    </>
  );
}

// --- Left side: intro / text / CTAs ---

function HeroIntro() {
  const [seqIndex, setSeqIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Type / delete logic for the dynamic part after "I'm "
  useEffect(() => {
    const full = TITLE_SEQUENCE[seqIndex];
    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && typed === full) {
      delay = 900;
    }

    if (isDeleting && typed === "") {
      delay = 400;
    }

    const timeout = setTimeout(() => {
      // Final state: stop when last phrase (NAME) is fully typed
      if (
        !isDeleting &&
        typed === full &&
        seqIndex === TITLE_SEQUENCE.length - 1
      ) {
        return;
      }

      if (!isDeleting) {
        if (typed.length < full.length) {
          setTyped(full.slice(0, typed.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (typed.length > 0) {
          setTyped(full.slice(0, typed.length - 1));
        } else {
          setIsDeleting(false);
          setSeqIndex((prev) => (prev + 1) % TITLE_SEQUENCE.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [typed, isDeleting, seqIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center lg:items-start text-center lg:text-left relative"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-3 text-xs font-mono uppercase tracking-[0.22em] text-slate-500"
      >
        00. Home
      </motion.div>

      {/* Heading with typewriter name/title */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-50"
      >
        <span className="block mb-1">Hello 👋</span>
        <span className="block">
          I&apos;m{" "}
          <span className="bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            {typed || "\u00A0"}
          </span>
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4 max-w-xl text-sm sm:text-base text-slate-300"
      >
        {FOCUS}. I ship production‑ready web apps with clean code, clear
        communication, and a focus on performance.
      </motion.p>

      {/* Badges – rounded pills with colors, larger text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4"
      >
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65, duration: 0.3 }}
          className="inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1.5 text-[0.8rem] font-mono text-sky-200"
        >
          {EXPERIENCE} in production
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 0.3 }}
          className="inline-flex items-center rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-[0.8rem] font-mono text-purple-200"
        >
          {ROLE}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.85, duration: 0.35 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-500/15 px-4 py-1.5 text-[0.8rem] font-mono text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for work
        </motion.span>
      </motion.div>

      {/* CTAs with icons */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
      >
        {/* Contact – animated gradient border */}
        <Link href="#contact">
          <motion.button
            whileHover={{
              y: -3,
              boxShadow:
                "0 0 14px rgba(147,51,234,0.6), 0 0 28px rgba(6,182,212,0.45)",
            }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex rounded-full p-px bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-400 animate-gradient"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-black/90 px-6 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-black">
              <FaPaperPlane className="h-4 w-4" />
              <span>Contact me</span>
            </span>
          </motion.button>
        </Link>

        {/* Get resume – solid background */}
        <Link href="/resume.pdf" target="_blank">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/15 px-6 py-2.5 text-sm font-semibold text-slate-50 hover:bg-cyan-500/25 transition-all"
          >
            <FaDownload className="h-4 w-4" />
            <span>Get resume</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.35 }}
        className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-slate-400"
      >
        <motion.a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="hover:text-cyan-400 transition-colors"
        >
          <FaGithub className="h-7 w-7" />
        </motion.a>
        <motion.a
          href="https://linkedin.com/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="hover:text-cyan-400 transition-colors"
        >
          <FaLinkedin className="h-7 w-7" />
        </motion.a>
        <motion.a
          href="https://t.me/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="hover:text-cyan-400 transition-colors"
        >
          <FaTelegramPlane className="h-7 w-7" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

// --- Right side: JSON editor card (auto-typing, floating) ---

function HeroJsonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Floating wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-xl border border-slate-700/70 bg-[#0b1220] shadow-2xl overflow-hidden">
          {/* Editor header */}
          <div className="flex items-center justify-between border-b border-slate-700 bg-[#020617]/80 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-xs font-mono text-slate-400">
              profile.json — amir.dev
            </span>
            <span className="text-[10px] font-mono text-slate-600">
              readonly
            </span>
          </div>

          {/* Code content */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-200">
            <pre className="whitespace-pre-wrap leading-relaxed">
              <Typewriter tokens={codeTokens} speed={35} />
            </pre>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Hero wrapper ---

export function Hero() {
  return (
    <section
      id="home"
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-10">
        <HeroIntro />
        <HeroJsonCard />
      </div>
    </section>
  );
}
