"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";

// ─── CartDrawer ───────────────────────────────────────────────────────
// Slide-in cart sidebar with item list, qty controls, and checkout CTA.

const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WC_API_URL?.replace(
  /\/wp-json\/wc\/v3$/,
  ""
) ?? "#";

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQty,
    totalItems,
    subtotal,
  } = useCart();

  const checkoutUrl = `${WOOCOMMERCE_URL}/checkout`;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-void/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-void border-l border-bone/10 z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as any }}
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ash">
              <div>
                <h2
                  className="text-bone font-mono font-bold text-2xl tracking-tighter"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  SYSTEM_CART_
                </h2>
                <p
                  className="text-mist text-[10px] tracking-[0.4em] font-mono mt-0.5"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
                </p>
              </div>
              <button
                onClick={closeDrawer}
                className="w-9 h-9 border border-ash hover:border-bone flex items-center justify-center text-mist hover:text-bone transition-all duration-200"
                aria-label="Close cart"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-48 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-12 h-12 border border-ash flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mist">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                    </div>
                    <p
                      className="text-mist text-[10px] tracking-[0.4em] font-mono text-center"
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      YOUR CART IS EMPTY
                    </p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.variationId}-${item.size}`}
                      className="flex gap-4 py-4 border-b border-ash/40"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, paddingBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 bg-charcoal border border-ash/40 shrink-0">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-bone font-mono font-bold text-sm leading-tight truncate"
                          style={{ fontFamily: "var(--font-space-mono)" }}
                        >
                          {item.name}
                        </h3>
                        <div className="flex gap-3 mt-1">
                          <span
                            className="text-mist text-[9px] tracking-[0.3em] font-mono"
                            style={{ fontFamily: "var(--font-space-mono)" }}
                          >
                            SIZE: {item.size}
                          </span>
                          {item.color && (
                            <span
                              className="text-mist text-[9px] tracking-[0.3em] font-mono"
                              style={{ fontFamily: "var(--font-space-mono)" }}
                            >
                              {item.color}
                            </span>
                          )}
                        </div>

                        {/* Qty + Price Row */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Qty Controls */}
                          <div className="flex items-center border border-ash">
                            <button
                              onClick={() => updateQty(item.productId, item.variationId, item.size, item.qty - 1)}
                              className="w-7 h-7 text-mist hover:text-bone hover:bg-ash transition-all duration-200 flex items-center justify-center text-xs"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span
                              className="w-8 text-center text-bone text-xs font-mono"
                              style={{ fontFamily: "var(--font-space-mono)" }}
                            >
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.productId, item.variationId, item.size, item.qty + 1)}
                              className="w-7 h-7 text-mist hover:text-bone hover:bg-ash transition-all duration-200 flex items-center justify-center text-xs"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Item Total */}
                          <p
                            className="text-bone text-sm font-mono"
                            style={{ fontFamily: "var(--font-space-mono)" }}
                          >
                            ${(parseFloat(item.price) * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.productId, item.variationId, item.size)}
                        className="text-ash hover:text-blood transition-colors duration-200 self-start mt-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
                        </svg>
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer — Subtotal + Checkout */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-bone/10 bg-void">
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-mist text-[10px] tracking-[0.4em] font-mono"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    SUBTOTAL
                  </span>
                  <span
                    className="text-bone text-xl font-mono font-bold"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <a
                  href={checkoutUrl}
                  className="block w-full py-4 bg-digital hover:bg-digitalDark text-bone text-center text-xs tracking-[0.4em] font-mono transition-all duration-300 group relative overflow-hidden"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                  id="cart-checkout-btn"
                >
                  <span className="relative z-10">CONFIRM_TRANSACTION →</span>
                  <span className="absolute inset-0 bg-bone/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </a>

                <p
                  className="text-ash text-[9px] tracking-[0.3em] font-mono text-center mt-3"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  TAXES CALCULATED AT CHECKOUT
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
