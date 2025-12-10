// components/effects/PageBackground.tsx
import type { FC } from "react";

type Star = {
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

const STARS: Star[] = Array.from({ length: 80 }).map((_, i) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.6 + 0.2,
  duration: Math.random() * 4 + 3 + i * 0.01,
  delay: Math.random() * 4,
}));

export const PageBackground: FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-black">
      {/* Nebula / galaxy glow */}
      <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-fuchsia-600/25 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-purple-700/25 blur-3xl" />

      {/* Starfield */}
      {STARS.map((star, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-white/90"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/70" />
    </div>
  );
};
