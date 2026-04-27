"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── RevealMask ──────────────────────────────────────────────────────
// Wraps children with a scroll-triggered clip-path reveal animation.

interface RevealMaskProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}

export default function RevealMask({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: RevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const clipStart =
    direction === "up"
      ? "inset(100% 0% 0% 0%)"
      : direction === "left"
      ? "inset(0% 100% 0% 0%)"
      : "inset(0% 0% 0% 100%)";

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{
          clipPath: isInView ? "inset(0% 0% 0% 0%)" : clipStart,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1] as any,
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
