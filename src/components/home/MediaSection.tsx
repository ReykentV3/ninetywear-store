"use client";

import { motion } from "framer-motion";
import RevealMask from "@/components/ui/RevealMask";

export default function MediaSection() {
  return (
    <section className="bg-void py-20 md:py-32 relative">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="relative aspect-video md:aspect-[21/9] bg-charcoal border border-ash/40 overflow-hidden group">
          {/* Simulated Video Placeholder */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=2000"
              alt="Brand Visual"
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000"
            />
          </div>

          {/* HUD Overlays */}
          <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start z-20">
            <div className="flex flex-col gap-1">
              <span className="text-digital text-[9px] font-mono tracking-[0.4em] animate-pulse">● REC_STREAM_01</span>
              <span className="text-mist text-[8px] font-mono tracking-[0.3em]">FPS: 60.00 // LATENCY: 12ms</span>
            </div>
            <div className="text-mist text-[8px] font-mono tracking-[0.3em] flex flex-col items-end gap-1">
              <span>90S_PROTO_DATA</span>
              <span>ENC: H.264 // BR: 12.4Mbps</span>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div 
              className="text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-bone font-mono font-bold text-[8vw] md:text-[6vw] leading-none tracking-tighter mix-blend-difference">
                DIGITAL_STYLE
                <br />
                FOR_REAL_SOULS
              </h2>
            </motion.div>
          </div>

          {/* Decorative Borders */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-digital/50" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-digital/50" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-digital/50" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-digital/50" />

          {/* Scanline Effect Overlay */}
          <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-20" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-mist text-xs font-mono leading-relaxed tracking-wider max-w-sm">
                [SYSTEM_INFO]: Nuestra producción bajo demanda garantiza que cada pieza sea única. No hay excedentes, solo diseño puro inyectado directamente en tu armario. 
            </p>
            <div className="flex justify-end gap-12">
                <div className="text-right">
                    <p className="text-white font-mono font-bold text-3xl">100%</p>
                    <p className="text-digital text-[9px] tracking-[0.4em] font-mono">RECYCLED_COTTON</p>
                </div>
                <div className="text-right">
                    <p className="text-white font-mono font-bold text-3xl">0.0</p>
                    <p className="text-digital text-[9px] tracking-[0.4em] font-mono">CARBON_WASTE</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
