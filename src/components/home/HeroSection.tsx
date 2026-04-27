"use client";

import { AlertTriangle, Power } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <header className="relative pt-48 pb-16 md:pt-60 md:pb-32 px-4 md:px-8 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent transition-colors duration-500">
        
        {/* Terminal Text flotante (Background) */}
        <div className="absolute top-32 left-4 md:left-12 font-mono text-[10px] md:text-xs text-mist/30 z-0 opacity-50 hidden md:block">
            <p>Iniciando framework NINETYWEAR...</p>
            <p>Cargando módulos: AIT, AUDIO_TRAUMA, CORE_SISTEM...</p>
            <p>ADVERTENCIA: Nivel de SEROTONINA FATAL.</p>
            <p>Escaneando por THERMAL_ERROR... Encontrado.</p>
            <p className="text-magenta">&gt; YOU_DIED.EXE listo para ejecutarse.</p>
        </div>

        {/* CONTENIDO PRINCIPAL: DUALIDAD */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between z-10 gap-8">
            
            {/* Bloque Izquierdo: Texto Gigante */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-bone">
                
                {/* ALERTA DE SISTEMA REFORZADA */}
                <div className="bg-black text-white font-mono text-[10px] px-3 py-1.5 mb-6 flex items-center gap-2 border-2 border-lime tech-shadow">
                    <AlertTriangle size={14} className="text-lime" />
                    <span className="tracking-widest font-black">SYSTEM_OVERRIDE_ACTIVE</span>
                </div>
                
                {/* TEXTO ESTOICISMO / HEDONISMO INTERACTIVO ALTERNO */}
                <div className="relative mb-6 md:mb-10 w-full overflow-visible py-8 md:py-12 flex justify-start">
                    <h1 className="text-[12vw] md:text-[6rem] lg:text-[8rem] font-black uppercase leading-[0.75] tracking-tighter select-none w-auto inline-block relative">
                        <div className="relative inline-block w-full text-left">
                            
                            {/* PALABRA: ESTOICISMO */}
                            <span className="animate-orden-swap block text-outline relative z-10 transition-colors duration-500">
                                ESTOICISMO
                            </span>

                            {/* PALABRA: HEDONISMO GLITCH */}
                            <span className="animate-caos-swap absolute top-0 left-0 w-full h-full flex items-center justify-start">
                                <span className="cyber-caos-text relative z-20 text-bone" data-text="HEDONISMO">
                                    HEDONISMO
                                </span>
                            </span>
                        </div>
                    </h1>
                </div>

                <p className="font-mono text-xs md:text-sm text-mist mt-4 max-w-sm border-l-2 border-current pl-4 leading-relaxed uppercase font-bold">
                    [ CONTROL DE IMPULSOS VS BÚSQUEDA DE PLACER ] <br/>
                    DISEÑO FRAGMENTADO PARA OPERADORES DE LA RED.
                </p>
                <div className="mt-8 flex gap-4 w-full md:w-auto">
                    <Link href="/shop" className="bg-bone text-void px-8 py-4 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_#FF003C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2 flex-1 md:flex-none justify-center border-2 border-current">
                        <Power size={18} /> INICIAR
                    </Link>
                </div>
            </div>

            {/* Bloque Derecho: Imagen referencial Techwear */}
            <div className="w-full md:w-1/2 relative scanlines group mt-12 md:mt-0">
                <div className="absolute top-4 -right-4 w-full h-full bg-magenta border-2 border-black z-0 opacity-80 shadow-[0_0_20px_rgba(255,0,60,0.3)]"></div>
                
                <div className="relative z-10 border-2 border-current bg-void p-2 tech-shadow group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-bone mix-blend-difference">
                        <p>REC [●]</p>
                        <p>TGT: LOCKED</p>
                    </div>
                    <img 
                        src="https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=800" 
                        alt="Techwear Vibe" 
                        className="w-full h-[400px] md:h-[600px] object-cover object-top contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                    />
                    
                    <div className="absolute bottom-4 right-4 z-20 bg-void border border-current p-2 flex flex-col items-center rotate-3 translate-y-4 shadow-xl">
                        <div className="w-24 h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiPjxyZWN0IHdpZHRoPSIzIiBoZWlnaHQ9IjMwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHdpZHRoPSIyIiBoZWlnaHQ9IjMwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIzMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxNCIgd2lkdGg9IjQiIGhlaWdodD0iMzAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMjEiIHdpZHRoPSIyIiBoZWlnaHQ9IjMwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjI2IiB3aWR0aD0iMSIgaGVpZ2h0PSIzMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIyOSIgd2lkdGg9IzMiIGhlaWdodD0iMzAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMzUiIHdpZHRoPSI1IiBoZWlnaHQ9IjMwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQyIiB3aWR0aD0iMiIgaGVpZ2h0PSIzMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI0NyIgd2lkdGg9IjEiIGhlaWdodD0iMzAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNTEiIHdpZHRoPSI0IiBoZWlnaHQ9IjMwIiBmaWxsPSJibGFjayIvPjwvc3ZnPg==')] bg-repeat-x opacity-70 dark:invert"></div>
                        <span className="font-mono text-bone text-[8px] mt-1 font-bold">AESTHETIC_VERIFIED</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
