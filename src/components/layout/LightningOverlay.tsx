"use client";

import { useEffect, useState, useRef } from "react";

interface Strike {
  id: number;
  points: string;
  x: number;
  width: number;
}

export default function LightningOverlay() {
  const [activeStrikes, setActiveStrikes] = useState<Strike[]>([]);
  const strikeIdCounter = useRef(0);

  const createStrike = () => {
    const id = strikeIdCounter.current++;
    const startX = Math.random() * 100;
    let points = `${startX},-5 `;
    let currentX = startX;
    const segments = 14; // More segments for more "jaggedness"
    
    for (let i = 1; i <= segments; i++) {
      currentX += (Math.random() - 0.5) * 18;
      const y = (i / segments) * 110;
      points += `${currentX},${y} `;
    }

    const newStrike = {
      id,
      points,
      x: startX,
      width: 0.1 + Math.random() * 0.3
    };

    setActiveStrikes(prev => [...prev, newStrike]);

    // Fast removal
    setTimeout(() => {
      setActiveStrikes(prev => prev.filter(s => s.id !== id));
    }, 600);
  };

  useEffect(() => {
    const trigger = () => {
      // Faster intervals: 500ms to 3s
      const nextStrike = 500 + Math.random() * 2500;
      createStrike();
      
      // Increased chance for multi-strikes
      if (Math.random() > 0.6) {
        setTimeout(createStrike, 150);
        if (Math.random() > 0.8) setTimeout(createStrike, 300);
      }

      timerId = setTimeout(trigger, nextStrike);
    };

    let timerId = setTimeout(trigger, 1500);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {activeStrikes.map((strike) => (
          <polyline
            key={strike.id}
            points={strike.points}
            fill="none"
            stroke="currentColor"
            strokeWidth={strike.width}
            className="lightning-strike"
            style={{ color: 'var(--text-color)' }}
          />
        ))}
      </svg>
      <style jsx>{`
        .lightning-strike {
          stroke-dasharray: 250;
          stroke-dashoffset: 250;
          animation: strike-draw 0.35s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          filter: drop-shadow(0 0 2px currentColor);
        }

        @keyframes strike-draw {
          0% { stroke-dashoffset: 250; opacity: 1; }
          30% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
