"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  HTMLMotionProps,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "terminal" | "subtle";
  glow?: boolean;
  interactive?: boolean;
}

export const GlassCard = ({
  children,
  className = "",
  variant = "default",
  glow = false,
  interactive = false,
  ...motionProps
}: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values are always created (hooks must not be conditional)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // You can re‑enable 3D tilt later by using rotateX/rotateY in style
  const rotateX = useTransform(mouseYSpring, [0, 1], [2, -2]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-2, 2]);

  const gradientX = useTransform(mouseXSpring, [0, 1], [0, 100]);
  const gradientY = useTransform(mouseYSpring, [0, 1], [0, 100]);

  // Reflection gradient (hook called unconditionally)
  const reflectionGradient = useTransform(
    [gradientX, gradientY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(147, 51, 234, 0.22) 0%, transparent 55%)`
  );

  const variantStyles: Record<string, string> = {
    default: "bg-white/5 border-white/10",
    terminal:
      "bg-linear-to-b from-[#0f172a]/98 to-[#020617]/98 border-cyan-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.08)]",
    subtle: "bg-white/[0.02] border-white/5",
  };

  const glowClass = glow
    ? "shadow-[0_0_30px_rgba(147,51,234,0.15),0_0_60px_rgba(6,182,212,0.1)]"
    : "";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Keep rotations mild; disable by setting to 0 when not interactive
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
      }}
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-xl
        ${variantStyles[variant]}
        ${glowClass}
        ${className}
      `}
      {...motionProps}
    >
      {/* Dynamic reflection overlay */}
      {interactive && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: reflectionGradient }}
        />
      )}

      <div>{children}</div>
    </motion.div>
  );
};
