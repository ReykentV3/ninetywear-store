"use client";

import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="system" className="bg-void pt-20 pb-8 border-t-[8px] border-magenta relative overflow-hidden transition-colors duration-500">
        {/* Background Massive Text */}
        <div className="absolute -left-[10%] top-10 text-[15vw] md:text-[20rem] font-black text-bone opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none leading-none tracking-tighter whitespace-nowrap z-0">
          FALLO_SISTEMA
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-bone">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 border-b border-ash pb-16">
                <div>
                    <div className="flex items-center gap-2 text-magenta mb-6">
                        <Cpu size={24} />
                        <span className="font-mono font-bold text-sm tracking-widest">NINETYWEAR_OS v3.2</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-outline transition-colors duration-500">
                        FIN_DE<br/>ARCHIVO<span className="text-digital -webkit-text-stroke-0">_</span>
                    </h2>
                    <p className="font-mono text-sm text-mist max-w-sm border-l-2 border-magenta pl-4 leading-relaxed">
                        No somos una marca, somos un bug en el sistema. Ropa diseñada para sobrevivir a la sobrecarga de información. Lima, PE.
                    </p>
                </div>

                <div className="bg-void border border-current p-6 md:p-8 font-mono text-sm tech-shadow">
                    <div className="flex justify-between items-center mb-6 border-b border-ash pb-3 text-xs text-mist">
                        <span>Terminal.exe</span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-ash/50 rounded-full"></div>
                            <div className="w-2 h-2 bg-ash/50 rounded-full"></div>
                            <div className="w-2 h-2 bg-magenta rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-digital mb-4">&gt; Estableciendo conexión cifrada...</p>
                    <p className="mb-6 opacity-70 font-bold uppercase tracking-tight">Ingresa tu correo para recibir parches de sistema y drops ocultos.</p>
                    <div className="flex border border-digital group">
                        <span className="bg-digital text-black px-3 py-3 font-bold group-focus-within:bg-magenta transition-colors">&gt;</span>
                        <input 
                            type="email" 
                            placeholder="USUARIO@MAIL.COM" 
                            className="w-full bg-transparent px-4 outline-none text-digital placeholder-ash uppercase font-bold" 
                        />
                        <button className="bg-digital text-black font-black px-6 hover:bg-white transition-colors uppercase">
                            [ENTER]
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-[10px] md:text-xs text-mist gap-6 uppercase">
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-bone transition-colors">[ INSTAGRAM ]</a>
                    <a href="#" className="hover:text-bone transition-colors">[ X_TWITTER ]</a>
                    <a href="#" className="hover:text-bone transition-colors">[ GITHUB ]</a>
                </div>
                
                <div className="flex flex-wrap gap-4 md:text-right w-full md:w-auto">
                    <a href="#" className="hover:text-magenta transition-colors w-full md:w-auto">&gt; CONDICIONES_USO.txt</a>
                    <a href="#" className="hover:text-magenta transition-colors w-full md:w-auto">&gt; POLÍTICA_PRIVACIDAD.log</a>
                    <p className="border-t border-ash md:border-0 pt-4 md:pt-0 text-bone font-bold w-full md:w-auto mt-4 md:mt-0">©2026 // SYSTEM TERMINATED.</p>
                </div>
            </div>
        </div>
    </footer>
  );
}
