"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CursorEffect = () => {
  // Derive initial mobile state from window if available (no effect needed)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth < 1024 || "ontouchstart" in window;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Update mobile state on resize (external event -> okay for setState)
  useEffect(() => {
    const detect = () =>
      setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);

    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  // Mouse listeners (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.dataset.interactive === "true" ||
        !!target.closest("[data-interactive='true']");

      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile, cursorX, cursorY, isVisible]);

  // Do not render on mobile
  if (isMobile) return null;

  const baseScale = isHovering ? 1.4 : 1;
  const clickScale = isClicking ? 0.8 : 1;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: baseScale * clickScale,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: (isHovering ? 1.8 : 1.2) * (isClicking ? 0.9 : 1),
          opacity: isVisible ? 0.5 : 0,
        }}
      />
    </>
  );
};
