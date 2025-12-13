"use client";

import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  name: string;
  meta?: string;
  color?: string;
  delay?: number;
};

export default function SkillPillItem({
  name,
  meta,
  color = "#22D3EE",
  delay = 0,
}: Props) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay }}
    >
      <motion.div
        whileHover={
          reduceMotion
            ? undefined
            : {
                x: 10,
                scale: 1.015,
              }
        }
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className="rounded-xl border bg-white/3 px-4 py-3 will-change-transform"
        style={{
          borderColor: "rgba(255,255,255,0.10)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: color, boxShadow: `0 0 14px ${color}55` }}
            />
            <span className="text-sm font-mono text-slate-200 tracking-wide">{name}</span>
          </div>

          {meta ? <span className="text-xs font-mono text-slate-500">({meta})</span> : null}
        </div>

        {/* hover border + glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200"
          style={{ boxShadow: `0 0 0 1px ${color}55, 0 0 26px ${color}22` }}
        />
      </motion.div>
    </motion.div>
  );
}
