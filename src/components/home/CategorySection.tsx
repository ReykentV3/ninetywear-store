"use client";

import { Skull } from 'lucide-react';
import Image from 'next/image';

const COLLECTIONS = [
  { 
    id: 'ait', 
    title: 'AIT', 
    subtitle: '(Always in troubles)', 
    desc: 'ERR_BEHAVIOR_NOT_FOUND. Rebeldía cruda y anarquía urbana.', 
    img: 'https://image.pollinations.ai/prompt/purple%20lilac%20urban%20aesthetic%20streetwear?width=800&height=800&nologo=true',
    imgPosition: 'object-center',
    style: 'md:col-span-6 md:row-span-1 bg-ash text-white border-r border-b border-black' 
  },
  { 
    id: 'audio', 
    title: 'AUDIO TRAUMA', 
    subtitle: 'FREQ: 140BPM+', 
    desc: 'Ondas destructivas. Estética rave y distorsión sónica.', 
    img: 'https://image.pollinations.ai/prompt/lil%20peep%20aesthetic%20portrait%20pink%20lighting?width=800&height=800&nologo=true', 
    imgPosition: 'object-center',
    style: 'md:col-span-6 md:row-span-1 bg-void text-lime border-b border-black' 
  },
  { 
    id: 'core', 
    title: 'CORE_SISTEM', 
    subtitle: 'v.2.0.44_STABLE', 
    desc: 'Techwear, interfaces y armadura urbana digital.', 
    img: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=800', 
    imgPosition: 'object-center',
    style: 'md:col-span-6 md:row-span-1 bg-digital text-black border-r border-b border-black' 
  },
  { 
    id: 'sero', 
    title: 'SEROTONIN_DEPLETED', 
    subtitle: 'BATT_LOW', 
    desc: 'Existencialismo en escala de grises. Emociones offline.', 
    img: 'https://image.pollinations.ai/prompt/scattered%20pills%20and%20medicines%20dark%20aesthetic%20monochrome?width=800&height=800&nologo=true',
    imgPosition: 'object-center',
    style: 'md:col-span-6 md:row-span-1 bg-white text-gray-500 border-b border-black grayscale' 
  },
  { 
    id: 'thermal', 
    title: 'THERMAL_ERROR', 
    subtitle: 'OVERHEATING_DETECTED', 
    desc: 'Infrarrojos, mapas de calor y saturación visual.', 
    img: 'https://image.pollinations.ai/prompt/nuclear%20explosion%20mushroom%20cloud%20thermal%20red%20orange?width=800&height=800&nologo=true', 
    imgPosition: 'object-center',
    style: 'md:col-span-6 md:row-span-1 bg-magenta text-white border-r border-b border-black' 
  },
  { 
    id: 'died', 
    title: 'YOU_DIED.EXE', 
    subtitle: 'FATAL_SYSTEM_CRASH', 
    desc: 'Estética 8-bits oscura, gore retro y game overs reales.', 
    img: 'https://image.pollinations.ai/prompt/dark%20souls%20bonfire%20knight%20dark%20fantasy%20aesthetic?width=800&height=800&nologo=true', 
    imgPosition: 'object-center',
    style: 'md:col-span-6 md:row-span-1 bg-charcoal text-magenta border-b border-black' 
  },
];

export default function CategorySection() {
  return (
    <section id="logs" className="py-24 md:py-32 px-4 md:px-8 border-t-2 border-bone bg-transparent relative transition-colors duration-500">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-current pb-4 text-bone">
            <div>
                <h2 className="font-mono text-xs text-mist mb-2">&gt; DIRECTORY /mnt/colecciones/</h2>
                <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                    Base_de_<span className="text-magenta">Datos</span>
                </h3>
            </div>
            <div className="mt-4 md:mt-0 font-mono text-xs text-right hidden md:block text-mist">
                <p>FILES: 06</p>
                <p>STATUS: CORRUPTO PERO UTILIZABLE</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] md:auto-rows-[320px] border-2 border-current bg-void gap-[2px] p-[2px]">
            {COLLECTIONS.map((col, index) => (
                <div key={col.id} className={`relative group cursor-pointer overflow-hidden ${col.style}`}>
                    <img 
                        src={col.img} 
                        alt={col.title} 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${col.imgPosition} opacity-60 group-hover:opacity-100 group-hover:scale-110`} 
                    />
                    
                    {col.id === 'thermal' && <div className="absolute inset-0 bg-magenta mix-blend-overlay"></div>}
                    {col.id === 'audio' && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen"></div>}
                    {col.id === 'core' && <div className="absolute inset-0 bg-digital/20"></div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent w-full h-full pointer-events-none z-10"></div>
                    
                    <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between z-20">
                        <div className="flex justify-between items-start font-mono text-[10px] md:text-xs font-bold uppercase w-full">
                            <span className="px-2 py-1 bg-black border border-white text-white">
                                FILE_0{index + 1}
                            </span>
                            <span className={`tracking-widest font-black ${col.id === 'died' ? 'text-magenta animate-pulse' : 'text-white'}`}>
                                {col.subtitle}
                            </span>
                        </div>

                        <div className={col.id === 'died' ? 'text-center w-full' : ''}>
                            {col.id === 'died' && (
                                <Skull size={48} className="mx-auto mb-4 text-magenta animate-bounce" />
                            )}
                            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] text-white">
                                {col.title}
                            </h3>
                            <p className="font-mono text-xs md:text-sm max-w-sm opacity-90 border-l-2 pl-2 border-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)] text-white">
                                {col.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}
