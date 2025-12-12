"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll to add background / blur
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Simple scrollspy based on section ids
  useEffect(() => {
    const handleSectionScroll = () => {
      const ids = ["about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const { offsetTop, offsetHeight } = el;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(`#${id}`);
          return;
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleSectionScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleSectionScroll);
  }, []);

  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const section = document.querySelector(href);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? "backdrop-blur-md bg-black/60 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / name with prompt-style > and blinking _ */}
        <Link href="#home" className="flex items-start gap-2">
          {/* prompt arrow */}
          <span className="text-xl md:text-lg font-mono text-slate-500">
            {">"}
          </span>

          {/* AMIR.DEV + blinking underscore */}
          <span className="text-2xl md:text-xl font-extrabold tracking-[0.25em] uppercase">
            <span className="bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              amir.dev
            </span>
            <span className="ml-1 inline-block align-middle text-cyan-300 animate-pulse pb-3">
              _
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-md sm:text-[0.8rem] md:text-[16px] font-semibold text-slate-300 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <motion.button
                key={link.href}
                onClick={handleNavClick(link.href)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer px-1 py-0.5 uppercase tracking-[0.18em]"
              >
                <span
                  className={
                    isActive
                      ? "text-cyan-300 font-bold transition-colors"
                      : "text-slate-200 hover:text-cyan-300 transition-colors"
                  }
                >
                  {link.name}
                </span>

                {isActive && (
                  <motion.span
                    layoutId="header-active-underline"
                    className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-fuchsia-500 to-cyan-400"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Socials – always visible */}
        <div className="flex items-center gap-3 text-slate-400">
          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="transition-colors hover:text-cyan-400"
          >
            <FaGithub className="h-5 w-5" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="transition-colors hover:text-cyan-400"
          >
            <FaLinkedin className="h-5 w-5" />
          </motion.a>
          <motion.a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="transition-colors hover:text-cyan-400"
          >
            <FaTelegramPlane className="h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </header>
  );
}
