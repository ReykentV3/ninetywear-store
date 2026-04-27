"use client";

import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const firstNames = ['Zack', 'David', 'Andrea', 'Kaia', 'Renzo', 'Cyber', 'Ghost', 'Neon', 'Matias', 'Sara', 'V', 'Kael', 'Luna', 'Nova', 'Rox', 'Zero', 'Aiden', 'Mia', 'Cruz', 'Raven', 'Leo', 'Max', 'Sam', 'Joi', 'Ken', 'B.', 'X.', 'Lana', 'K.', 'Ryo'];
const lastNames = ['M.', 'G.', 'S.', 'H.', 'R.', '_99', '_X', 'Corp', 'Null', 'T.', 'V.', 'K.', 'L.', 'N.', 'R.', 'Z.', 'A.', 'M.', 'C.', 'W.', 'Net', 'Sys', '.exe', '.bat', '00'];

export default function FloatingFeedback() {
  const [fakeSale, setFakeSale] = useState<any>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const { items } = useCartStore();

  // --- Terminal Logs Logic ---
  useEffect(() => {
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      const newLog = `> INJECTING_PAYLOAD: ADD_TO_CART [${lastItem.name.toUpperCase()}]... [OK]`;
      setTerminalLogs(prev => [...prev, newLog]);
      const timeout = setTimeout(() => {
        setTerminalLogs(prev => prev.slice(1));
      }, 3500);
      return () => clearTimeout(timeout);
    }
  }, [items.length]);

  // --- Fake Sales Logic ---
  useEffect(() => {
    let timeoutId: any;

    const executeSaleAndQueueNext = () => {
      // Hide after 6 seconds
      setTimeout(() => setFakeSale(null), 6000);

      // Wait random time between 7s and 21s
      const nextTime = Math.floor(Math.random() * (21000 - 7000 + 1)) + 7000;
      timeoutId = setTimeout(() => {
        const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        
        setFakeSale({ 
          user: randomName, 
          product: "PRENDA_SISTEMA_NN", 
          img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=200", 
          time: new Date().toLocaleTimeString('en-US', { hour12: false }) 
        });
        executeSaleAndQueueNext();
      }, nextTime);
    };

    const initialTime = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
    timeoutId = setTimeout(() => {
      const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
      setFakeSale({ 
        user: randomName, 
        product: "SISTEMA_CORE_V.2", 
        img: "https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=200", 
        time: new Date().toLocaleTimeString('en-US', { hour12: false }) 
      });
      executeSaleAndQueueNext();
    }, initialTime);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {/* Terminal Logs Popup */}
      {terminalLogs.length > 0 && (
        <div className="fixed bottom-4 left-4 z-[100] w-72 md:w-80 bg-black/95 border-l-4 border-y border-r border-digital border-r-ash border-y-ash p-4 text-lime font-mono text-[10px] md:text-xs pointer-events-none flex flex-col gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          {terminalLogs.map((log, i) => (
            <p key={i} className="animate-pulse">{log}</p>
          ))}
          <div className="w-full h-1 bg-digital/20 mt-1 overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-digital animate-marquee w-full"></div>
          </div>
        </div>
      )}

      {/* Fake Sale Popup */}
      {fakeSale && (
        <div className="fixed bottom-4 left-4 md:bottom-8 md:right-8 lg:left-8 lg:right-auto z-[110] w-[280px] md:w-[320px] bg-white border-[3px] border-black p-3 text-black flex gap-3 shadow-[8px_8px_0_0_#000] group cursor-default">
          <div className="absolute top-0 right-0 bg-black text-digital text-[8px] font-mono px-2 py-0.5 tracking-widest uppercase z-10">
            SYS_LOG // {fakeSale.time}
          </div>
          
          <div className="w-16 h-16 bg-ash/10 flex-shrink-0 border border-black relative overflow-hidden">
            <img src={fakeSale.img} alt="Sold" className="w-full h-full object-cover grayscale opacity-90" />
            <div className="absolute inset-0 bg-black/5 scanlines pointer-events-none"></div>
          </div>
          
          <div className="flex flex-col flex-1 justify-center relative pt-2">
            <p className="font-bold text-xs uppercase mb-0.5 line-clamp-1">{fakeSale.product}</p>
            <p className="font-mono text-[9px] md:text-[10px] text-ash leading-tight">
              <span className="text-magenta font-bold">[{fakeSale.user}]</span><br/>
              acaba de adquirir esta armadura.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
