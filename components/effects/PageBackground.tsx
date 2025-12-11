// components/effects/PageBackground.tsx
import type { FC, CSSProperties } from "react";

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

const GRID_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  opacity: 0.35,
  backgroundImage: `
    repeating-linear-gradient(
      to right,
      rgba(148, 163, 184, 0.16) 0px,
      rgba(148, 163, 184, 0.16) 1px,
      transparent 1px,
      transparent 52px
    ),
    repeating-linear-gradient(
      to bottom,
      rgba(148, 163, 184, 0.16) 0px,
      rgba(148, 163, 184, 0.16) 1px,
      transparent 1px,
      transparent 52px
    )
  `,
  backgroundSize: "52px 52px",
};

export const PageBackground: FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      {/* Full-screen grid */}
      <div style={GRID_STYLE} />

      {/* Optional glow/vignette */}
      <div className="absolute inset-0 bg-radial-at-t from-cyan-500/18 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-radial-at-b from-fuchsia-500/14 via-transparent to-transparent" />

      {/* Stars on top of grid */}
      <div className="absolute inset-0">
        {STARS.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-100/70 blur-[1px]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
