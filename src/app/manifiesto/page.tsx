"use client";

import { Activity, AlertTriangle, Cpu, Zap, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Manifiesto() {
  return (
    <div className="min-h-screen pt-40 pb-24 px-6 md:px-12 max-w-5xl mx-auto font-mono text-bone transition-colors duration-500">
      
      {/* HEADER DE ARCHIVO */}
      <div className="border-2 border-current p-6 mb-12 tech-shadow bg-void">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-ash pb-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
              MANIFIESTO<span className="text-magenta">.EXE</span>
            </h1>
            <p className="text-[10px] md:text-xs text-mist">&gt; ESTADO: CLASIFICADO // NIVEL_DE_ACCESO: RADICAL</p>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-magenta animate-pulse"></div>
            <div className="w-3 h-3 bg-digital"></div>
            <div className="w-3 h-3 bg-lime"></div>
          </div>
        </div>

        {/* CONTENIDO DEL MANIFIESTO */}
        <div className="space-y-12 text-sm md:text-lg leading-relaxed">
          
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="border-l-4 border-magenta pl-6"
          >
            <h2 className="text-magenta font-black mb-4 uppercase flex items-center gap-2">
              <Zap size={20} /> Sector 01: El Error como Origen
            </h2>
            <p>
              Nacimos en la intersección del ruido analógico y el bit perfecto. NinetyWear no es una marca; es un **bug en el sistema de producción masiva**. Mientras el mundo persigue una limpieza estéril y algoritmos de perfección, nosotros celebramos el glitch, la saturación y el fallo del servidor. Porque en el error es donde reside la verdadera identidad.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-l-4 border-digital pl-6"
          >
            <h2 className="text-digital font-black mb-4 uppercase flex items-center gap-2">
              <Cpu size={20} /> Sector 02: Armadura para la Sobrecarga
            </h2>
            <p>
              Vivimos en un estado de **AUDIO TRAUMA** constante. Una frecuencia de 140BPM que nunca se detiene. Diseñamos nuestras prendas como interfaces tácticas para el día a día: ropa resistente a la mirada del algoritmo y fiel al espíritu de los que siempre están en problemas (**AIT**). Tu ropa es tu cortafuegos.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-l-4 border-lime pl-6"
          >
            <h2 className="text-lime font-black mb-4 uppercase flex items-center gap-2">
              <Radio size={20} /> Sector 03: Nostalgia Radical
            </h2>
            <p>
              Miramos a los 90 no por nostalgia vacía, sino por su promesa de libertad digital. Un tiempo donde podíamos "perdernos" en la red. NinetyWear recupera los fragmentos de esa era —el retrogaming, la estética industrial, la cultura rave— y los inyecta en el presente como un suero de **SEROTONIN_DEPLETED**. 
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-magenta text-white p-6 tech-shadow"
          >
            <h2 className="font-black mb-4 uppercase flex items-center gap-2 text-black">
              <AlertTriangle size={20} /> Sector FINAL: YOU_DIED.EXE
            </h2>
            <p className="font-bold">
              Al final, todos somos archivos temporales. La pregunta es: ¿vas a ser una copia perfecta o un fragmento de código que el sistema no puede ignorar? Únete al colapso. Bienvenido a NinetyWear.
            </p>
            <div className="mt-8 pt-4 border-t border-black/30 flex justify-between items-end">
              <div className="font-mono text-[10px]">
                <p>NINETYWEAR_OS_CONFIRMED</p>
                <p>LIMA_PE // 2026</p>
              </div>
              <Activity className="animate-pulse" />
            </div>
          </motion.section>

        </div>
      </div>

      {/* FOOTER DEL MANIFIESTO */}
      <div className="flex justify-center gap-8">
        <Link href="/shop" className="text-xs font-bold border-b-2 border-magenta hover:text-magenta transition-colors">
          [ NAVEGAR_TIENDA ]
        </Link>
        <Link href="/" className="text-xs font-bold border-b-2 border-digital hover:text-digital transition-colors">
          [ VOLVER_INICIO ]
        </Link>
      </div>

    </div>
  );
}
