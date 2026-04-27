"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CollectionsCTA() {
  return (
    <section className="bg-void py-40 md:py-64 relative overflow-hidden border-t border-ash/20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
        >
          <h2 className="text-bone font-mono font-bold text-[10vw] md:text-[8vw] leading-none tracking-tighter mb-12">
            EXPLORE_THE_
            <br />
            <span className="text-digital">COLLECTIONS_</span>
          </h2>
          
          <Link
            href="/shop"
            className="inline-block px-12 py-6 bg-digital hover:bg-digitalDark text-bone font-mono text-sm tracking-[0.5em] font-bold transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10">INITIALIZE_FULL_CATALOGUE</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </Link>
        </motion.div>
      </div>

      {/* Atmospheric decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-digital h-full" />
            ))}
        </div>
      </div>
    </section>
  );
}
