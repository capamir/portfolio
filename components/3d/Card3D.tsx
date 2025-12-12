"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

// Simplified Card3D - no 3D transforms that cause blur with backdrop-blur
// Uses subtle scale and shadow instead for hover effect
export default function Card3D({ children, className = "" }: Card3DProps) {
  // Derive initial value from window (if available) without using an effect
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth < 1024;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile, just render children
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  // Desktop: subtle hover effect without 3D transforms (no blur issues)
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        scale: 1.01,
        y: -2,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
