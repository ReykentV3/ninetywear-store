"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import RevealMask from "@/components/ui/RevealMask";

export default function CartPage() {
  const { items, removeItem, updateQty, totalItems, subtotal } = useCart();

  return (
    <div className="pt-32 min-h-screen bg-void px-6 md:px-10 pb-20">
      <div className="max-w-screen-xl mx-auto">
        <RevealMask direction="left">
          <p className="text-blood text-[10px] tracking-[0.6em] font-mono mb-6" style={{ fontFamily: "var(--font-space-mono)" }}>
            CHECKOUT / REVIEW
          </p>
        </RevealMask>
        <RevealMask delay={0.1}>
          <h1 className="text-bone font-black text-6xl md:text-8xl tracking-tight mb-16 uppercase">
            CART
          </h1>
        </RevealMask>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="md:col-span-2 space-y-8">
            <AnimatePresence initial={false}>
              {items.length === 0 ? (
                <div className="py-20 text-center border-t border-ash/40">
                  <p className="text-mist font-mono text-xs tracking-widest uppercase">
                    YOUR CART IS EMPTY. <Link href="/shop" className="text-blood hover:underline ml-2">BROWSE THE ARCHIVE</Link>
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.variationId}-${item.size}`}
                    className="flex flex-col sm:flex-row gap-6 py-8 border-t border-ash/40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Image */}
                    <div className="relative w-full sm:w-40 aspect-[3/4] bg-charcoal border border-ash/40">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-bone font-black text-2xl uppercase">
                            {item.name}
                          </h2>
                          <button 
                            onClick={() => removeItem(item.productId, item.variationId, item.size)}
                            className="text-mist hover:text-blood transition-colors text-[10px] font-bold"
                          >
                            [ REMOVE ]
                          </button>
                        </div>
                        <div className="space-y-1 mb-6">
                          <p className="text-mist text-[10px] font-mono tracking-widest uppercase">
                            SIZE: {item.size}
                          </p>
                          {item.color && (
                            <p className="text-mist text-[10px] font-mono tracking-widest uppercase">
                              COLOR: {item.color}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-ash">
                          <button 
                            onClick={() => updateQty(item.productId, item.variationId, item.size, item.qty - 1)}
                            className="w-10 h-10 flex items-center justify-center text-mist hover:text-bone hover:bg-ash transition-all"
                          >
                            −
                          </button>
                          <span className="w-12 text-center text-bone font-mono text-sm">
                            {item.qty}
                          </span>
                          <button 
                            onClick={() => updateQty(item.productId, item.variationId, item.size, item.qty + 1)}
                            className="w-10 h-10 flex items-center justify-center text-mist hover:text-bone hover:bg-ash transition-all"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-bone font-mono text-xl font-bold tracking-tighter">
                          S/ {(parseFloat(item.price) * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="relative">
            <div className="sticky top-32 p-8 bg-void border-2 border-bone tech-shadow">
              <h3 className="text-bone font-black text-2xl mb-8 uppercase tracking-tighter">
                Summary
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-mist text-[10px] font-mono tracking-[0.3em]">
                  <span>SUBTOTAL</span>
                  <span className="text-bone text-sm">S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-mist text-[10px] font-mono tracking-[0.3em]">
                  <span>SHIPPING</span>
                  <span className="text-bone text-sm">CALCULATED AT CHECKOUT</span>
                </div>
              </div>

              <div className="h-px bg-ash mb-8" />

              <div className="flex justify-between mb-10">
                <span className="text-bone font-black text-xl uppercase tracking-tighter">Total</span>
                <span className="text-digital font-black text-3xl tracking-tighter">S/ {subtotal.toFixed(2)}</span>
              </div>

              <Link 
                href="/checkout"
                className="w-full py-5 bg-blood hover:bg-magenta text-bone font-mono text-xs font-black tracking-[0.4em] transition-all block text-center shadow-[0_0_15px_rgba(255,0,60,0.3)]"
              >
                PROCEED TO CHECKOUT
              </Link>
              
              <p className="text-mist text-[9px] font-mono tracking-widest text-center mt-6 uppercase leading-loose" style={{ fontFamily: "var(--font-space-mono)" }}>
                Tax included. Shipping calculated at checkout.
                <br />
                All orders are made to order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
