"use client";

import { useState, useEffect } from "react";

export function MarqueeSection() {
  return (
    <div className="w-full bg-magenta py-3 overflow-hidden flex items-center text-black font-mono text-[10px] md:text-sm uppercase font-bold z-10 relative border-y-2 border-black">
      <div className="animate-marquee flex space-x-12 whitespace-nowrap">
        <span>[PELIGRO: AUDIO TRAUMA DETECTADO]</span>
        <span>AIT // ALWAYS IN TROUBLES</span>
        <span>CORE_SISTEM COMPROMETIDO</span>
        <span>NIVEL_SEROTONINA: 0%</span>
        <span>YOU_DIED.EXE EJECUTÁNDOSE</span>
        
        <span>[PELIGRO: AUDIO TRAUMA DETECTADO]</span>
        <span>AIT // ALWAYS IN TROUBLES</span>
        <span>CORE_SISTEM COMPROMETIDO</span>
        <span>NIVEL_SEROTONINA: 0%</span>
        <span>YOU_DIED.EXE EJECUTÁNDOSE</span>

        <span>[PELIGRO: AUDIO TRAUMA DETECTADO]</span>
        <span>AIT // ALWAYS IN TROUBLES</span>
        <span>CORE_SISTEM COMPROMETIDO</span>
        <span>NIVEL_SEROTONINA: 0%</span>
        <span>YOU_DIED.EXE EJECUTÁNDOSE</span>

        <span>[PELIGRO: AUDIO TRAUMA DETECTADO]</span>
        <span>AIT // ALWAYS IN TROUBLES</span>
        <span>CORE_SISTEM COMPROMETIDO</span>
        <span>NIVEL_SEROTONINA: 0%</span>
        <span>YOU_DIED.EXE EJECUTÁNDOSE</span>
      </div>
    </div>
  );
}

export function BreachCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 72,
    hours: 14,
    minutes: 59,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="w-full bg-void text-bone py-8 md:py-14 border-b-2 border-current flex flex-col items-center justify-center font-mono text-center px-4 overflow-hidden relative group transition-colors duration-500">
      <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none"></div>
      <span className="text-magenta text-[8px] md:text-[10px] mb-2 animate-pulse">&gt; CRIPTO_BREACH / PRÓXIMO_DROP EN:</span>
      <div className="text-4xl md:text-7xl font-black tracking-widest text-bone z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
        {format(timeLeft.days)}:{format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}
      </div>
      <span className="text-[8px] md:text-[10px] text-mist mt-3 z-10 w-full max-w-sm border-t border-current pt-2 opacity-50">
        PREPARA TUS RECURSOS. NO HABRÁ RESTOCK.
      </span>
    </div>
  );
}
