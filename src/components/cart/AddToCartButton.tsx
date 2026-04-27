"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import type { CartItem } from "@/services/woocommerce/types";
import { useCart } from "@/hooks/useCart";

// ─── AddToCartButton ─────────────────────────────────────────────────
// Magnetic button that follows the cursor.
// States: idle → loading → success → idle

interface AddToCartButtonProps {
  item: Omit<CartItem, "qty">;
  disabled?: boolean;
  className?: string;
}

type ButtonState = "idle" | "loading" | "success";

const MAGNETIC_STRENGTH = 0.35;

export default function AddToCartButton({
  item,
  disabled = false,
  className = "",
}: AddToCartButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");
  const { addItem } = useCart();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * MAGNETIC_STRENGTH;
    const deltaY = (e.clientY - centerY) * MAGNETIC_STRENGTH;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = async () => {
    if (state !== "idle" || disabled) return;

    setState("loading");
    // Simulate async (real implementation: validate stock, check variant)
    await new Promise((resolve) => setTimeout(resolve, 800));

    addItem({ ...item, qty: 1 });
    setState("success");

    // Reset after success animation
    setTimeout(() => setState("idle"), 2000);
  };

  const labelMap: Record<ButtonState, string> = {
    idle: "ADD TO CART",
    loading: "ADDING...",
    success: "ADDED ✓",
  };

  return (
    <motion.button
      ref={buttonRef}
      id="add-to-cart-btn"
      style={{ x: springX, y: springY, fontFamily: "var(--font-space-mono)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled || state !== "idle"}
      aria-label={labelMap[state]}
      className={`
        relative group w-full py-4 md:py-5 overflow-hidden
        font-mono text-xs tracking-[0.4em] transition-all duration-300
        ${disabled ? "bg-ash text-mist cursor-not-allowed" : ""}
        ${state === "idle" ? "bg-bone text-void hover:bg-digital hover:text-bone cursor-pointer" : ""}
        ${state === "loading" ? "bg-ash text-mist" : ""}
        ${state === "success" ? "bg-digital text-bone" : ""}
        ${className}
      `}
      whileTap={state === "idle" && !disabled ? { scale: 0.98 } : {}}
    >
      {/* Slide-in background layer */}
      {state === "idle" && !disabled && (
        <span className="absolute inset-0 bg-digital translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      )}

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          className="relative z-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {state === "loading" && (
            <motion.span
              className="w-3 h-3 border border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
            />
          )}
          {state === "success" && (
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <path
                d="M2 7L5.5 10.5L12 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
          <span className="group-hover:text-bone transition-colors duration-300 relative z-10">
            {labelMap[state]}
          </span>
        </motion.span>
      </AnimatePresence>

      {/* Pulse ring on success */}
      {state === "success" && (
        <motion.span
          className="absolute inset-0 border border-digital"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.08, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}
