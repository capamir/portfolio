"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollProgressProps {
  height?: number;
  showPercentage?: boolean;
}

export function ScrollProgress({
  height = 3,
  showPercentage = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Optional: keep a snapshot for percentage display without calling .get() in render
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setPercent(Math.round(v * 100));
    });
    return () => {
      unsub();
    };
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-30 origin-left bg-linear-to-r from-fuchsia-500 via-purple-500 to-cyan-400"
        style={{ scaleX, height }}
      />
      {showPercentage && (
        <div className="fixed right-3 top-2 z-30 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-mono text-slate-200">
          {percent}%
        </div>
      )}
    </>
  );
}
