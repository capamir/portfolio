"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaCode,
  FaEnvelope,
} from "react-icons/fa";

const TABS = [
  { id: "home", label: "Home", href: "#home", icon: FaHome },
  { id: "about", label: "About", href: "#about", icon: FaUser },
  { id: "projects", label: "Projects", href: "#projects", icon: FaFolderOpen },
  { id: "skills", label: "Skills", href: "#skills", icon: FaCode },
  { id: "contact", label: "Contact", href: "#contact", icon: FaEnvelope },
];

export function MobileBottomNav() {
  const [active, setActive] = useState<string>("#home");

  // Scrollspy: track which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const tab of TABS) {
        const el = document.getElementById(tab.id);
        if (!el) continue;

        const { offsetTop, offsetHeight } = el;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActive(tab.href);
          return;
        }
      }

      // Near top -> Home
      if (window.scrollY < 160) {
        setActive("#home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-40 md:hidden
        border-t border-white/10
        bg-black/80 backdrop-blur-md
      "
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.href;

          return (
            <button
              key={tab.href}
              onClick={(e) => handleClick(e, tab.href)}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium text-slate-400"
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={
                    "h-5 w-5 transition-colors " +
                    (isActive ? "text-cyan-300" : "text-slate-400")
                  }
                />
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active-bg"
                    className="absolute -inset-3 rounded-full bg-cyan-400/10"
                  />
                )}
              </div>
              <span className={isActive ? "text-cyan-300" : "text-slate-400"}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
