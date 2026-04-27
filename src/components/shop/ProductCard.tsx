"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { WCProduct } from "@/services/woocommerce/types";

// ─── ProductCard ──────────────────────────────────────────────────────
// Asymmetric product card with:
// - Image swap on hover (second Unsplash image)
// - Floating size chips that appear on hover
// - Scroll-triggered reveal (handled by parent ProductGrid)

interface ProductCardProps {
  product: WCProduct;
  /** Controls layout variant for asymmetry */
  variant?: "tall" | "wide" | "normal";
  priority?: boolean;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductCard({
  product,
  variant = "normal",
  priority = false,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const primaryImage = product.images[0]?.src ?? "";
  const secondaryImage = product.images[1]?.src ?? primaryImage;

  const heightClass =
    variant === "tall"
      ? "aspect-[3/4] md:row-span-2"
      : variant === "wide"
      ? "aspect-[4/3]"
      : "aspect-[3/4]";

  const isOnSale = product.on_sale && product.sale_price;

  return (
    <article
      ref={cardRef}
      className={`group relative bg-carbon border border-ash/50 hover:border-ash transition-all duration-500 overflow-hidden cursor-pointer ${heightClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Product Image ── */}
      <Link href={`/shop/${product.slug}`} className="block relative w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {/* Primary Image */}
          <AnimatePresence initial={false} mode="wait">
            {!hovered ? (
              <motion.div
                key="primary"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {primaryImage && (
                  <Image
                    src={primaryImage}
                    alt={product.images[0]?.alt ?? product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={priority}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="secondary"
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {secondaryImage && (
                  <Image
                    src={secondaryImage}
                    alt={`${product.name} back`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dark overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-void/40 z-10"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Decorative corner accent */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-digital z-20" />
        </div>

        {/* ── Hover Size Chips ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 z-20 px-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              {SIZES.map((size, i) => (
                <motion.span
                  key={size}
                  className="px-2.5 py-1 bg-void/70 backdrop-blur-sm border border-ash/70 text-bone text-[9px] font-mono tracking-widest"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {size}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Product Info Bar ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-5 bg-gradient-to-t from-void via-void/80 to-transparent">
          {/* Tags */}
            <span
              className="inline-block text-digital text-[9px] tracking-[0.4em] font-mono mb-2"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              [ LIMITED_DROP ]
            </span>

          <div className="flex items-end justify-between gap-2">
            <h3
              className="text-bone font-mono font-bold text-lg md:text-xl leading-tight flex-1 min-w-0 tracking-tight"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              {isOnSale ? (
                <>
                  <p
                    className="text-mist line-through text-[10px] font-mono"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    ${product.regular_price}
                  </p>
                  <p
                    className="text-digital text-sm font-mono font-bold"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    ${product.sale_price}
                  </p>
                </>
              ) : (
                <p
                  className="text-bone text-sm font-mono"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  ${product.price}
                </p>
              )}
            </div>
          </div>

          {/* Quick Add ← slides up on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="mt-3 pt-3 border-t border-ash/40"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="block text-center text-[10px] tracking-[0.35em] font-mono text-bone/70 hover:text-digital transition-colors duration-200"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  VIEW_PRODUCT_DATA →
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stock Badge */}
        {product.stock_status === "outofstock" && (
          <div className="absolute top-4 right-4 z-30 px-2 py-1 bg-ash/80 backdrop-blur-sm">
            <span
              className="text-mist text-[9px] tracking-[0.3em] font-mono"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              SOLD OUT
            </span>
          </div>
        )}
      </Link>
    </article>
  );
}
