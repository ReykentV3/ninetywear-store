"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RevealMask from "@/components/ui/RevealMask";

const TESTIMONIALS = [
  {
    id: 1,
    name: "@CYBER_NOMAD",
    text: "La calidad de la tela es de otro mundo. El print digital no se desgasta con nada. Imprescindible.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "@PROTO_TYPE_90",
    text: "Diseño brutalista puro. Me encanta cómo se siente el peso del hoodie. Entrega súper rápida.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "@MATRIX_CORE",
    text: "El estilo retro-tech que buscaba. Finalmente una marca que entiende el balance entre lo vintage y lo moderno.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600",
  },
];

export default function SocialProofSection() {
  return (
    <section className="bg-void py-32 md:py-48 border-t border-bone/20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <RevealMask direction="left">
          <p className="text-digital text-[10px] tracking-[0.6em] font-mono mb-12">
            [ USER_LOGS // FEEDBACK ]
          </p>
        </RevealMask>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={t.id}
              className="bg-void p-8 border border-bone/20 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-2 border-digital/30 group-hover:border-digital transition-colors">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <p className="text-mist text-sm font-mono leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <p className="text-bone font-mono font-bold text-xs tracking-widest">
                {t.name}
              </p>
              
              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-digital/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
