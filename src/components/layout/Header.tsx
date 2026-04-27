"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, Search, Moon, Sun, ChevronDown, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useCart } from '@/hooks/useCart';

const COLLECTIONS = [
  { name: 'AIT', slug: 'ait' },
  { name: 'AUDIO TRAUMA', slug: 'audio-trauma' },
  { name: 'CORE_SISTEM', slug: 'core-sistem' },
  { name: 'SEROTONIN_DEPLETED', slug: 'serotonin-depleted' },
  { name: 'THERMAL_ERROR', slug: 'thermal-error' },
  { name: 'YOU_DIED.EXE', slug: 'you-died' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items, openDrawer } = useCart();

  useEffect(() => {
    const savedMode = localStorage.getItem('ninetywear-theme');
    if (savedMode === 'dark') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      const now = new Date();
      setSystemTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} // ${now.getMilliseconds().toString().padStart(3, '0')}ms`);
    }, 47);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ninetywear-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ninetywear-theme', 'light');
    }
  }, [isDark]);

  return (
    <>
      {/* --- TOP SYSTEM BAR --- */}
      <div className="fixed top-0 w-full bg-black text-[#00F0FF] py-1 border-b border-[#333] flex justify-between items-center px-4 z-[100] font-mono text-[10px] md:text-xs uppercase">
        <div className="flex gap-4">
          <span className="animate-pulse">● SYS_ONLINE</span>
          <span className="hidden md:inline opacity-50">ID: NN-TY-WR-[{isDark ? 'DARK_MODE' : 'LIGHT_MODE'}]</span>
        </div>
        <div className="flex gap-4 opacity-70 items-center">
          <span>{systemTime}</span>
          <span className="hidden md:inline border-l border-[#00F0FF]/30 pl-4">MEM: 84% FULL</span>
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-6' : 'top-10'}`}>
        <div className={`mx-4 md:mx-8 transition-all duration-300 ${scrolled ? 'mt-0 py-3 md:py-4' : 'mt-4 py-3 md:py-4'} border-2 border-current tech-shadow flex justify-between items-center px-4 md:px-6 bg-void text-bone`}>
          
          <div className="flex-1 flex justify-start items-center">
            <button className="md:hidden hover:text-magenta transition-colors">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex space-x-8 font-bold tracking-tighter uppercase text-xs font-mono items-center">
              <Link href="/manifiesto" className={`glitch-hover inline-block ${pathname === '/manifiesto' ? 'text-magenta' : 'opacity-60 hover:opacity-100'}`}>/// MANIFIESTO</Link>
              
              {/* DROPDOWN TIENDA */}
              <div 
                className="relative h-full flex items-center group"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <Link href="/shop" className={`glitch-hover flex items-center gap-1 ${pathname.startsWith('/shop') ? 'text-digital' : 'opacity-60 hover:opacity-100'}`}>
                  /// TIENDA <ChevronDown size={14} className={`transition-transform duration-300 ${isShopOpen ? 'rotate-180' : ''}`} />
                </Link>

                {/* SUBMENU DESPLEGABLE */}
                <div className={`absolute top-full left-0 pt-4 transition-all duration-300 ${isShopOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  <div className="bg-void border-2 border-current tech-shadow p-2 min-w-[220px] backdrop-blur-md">
                    <div className="font-mono text-[8px] text-magenta mb-2 pb-1 border-b border-ash opacity-50">SISTEMA_DE_ARCHIVOS_v3</div>
                    {COLLECTIONS.map((col) => (
                      <Link 
                        key={col.slug}
                        href={`/shop?category=${col.slug}`}
                        className="flex items-center justify-between px-3 py-2 hover:bg-magenta hover:text-white transition-colors group/item"
                      >
                        <span className="text-[10px] font-bold">&gt; {col.name}</span>
                        <span className="text-[8px] opacity-0 group-hover/item:opacity-100">[ACCEDER]</span>
                      </Link>
                    ))}
                    <div className="mt-2 pt-1 border-t border-ash">
                      <Link href="/shop" className="block px-3 py-2 italic text-[9px] text-digital hover:underline font-bold">
                        VER_TODO_EL_CATÁLOGO...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/" className="flex-none text-2xl md:text-4xl font-black tracking-tighter uppercase cursor-pointer z-10 flex flex-col items-center px-2">
            <span className="leading-none flex items-center">
                <span>NINETY</span>
                <span className="logo-outline ml-1">WEAR</span>
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] mt-1 bg-bone text-void px-2 py-0.5 whitespace-nowrap">EST. 2026 // LIMA</span>
          </Link>

          <div className="flex-1 flex justify-end space-x-4 md:space-x-6 items-center z-10">
            {/* USER ACCOUNT */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4 border-r border-bone/20 pr-6 mr-2">
                <span className="text-[10px] font-bold text-digital">USR: {user?.name.toUpperCase()}</span>
                <button 
                  onClick={logout}
                  className="text-[8px] border border-magenta px-2 py-1 text-magenta hover:bg-magenta hover:text-white transition-all"
                >
                  [LOGOUT]
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-2 hover:text-magenta transition-colors group">
                <User size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">[ACCESO]</span>
              </Link>
            )}

            <button className="hover:text-magenta transition-colors" onClick={() => setIsDark(!isDark)} aria-label="Toggle Theme">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hidden md:block hover:text-magenta transition-colors">
              <Search size={20} />
            </button>
            <button 
              onClick={openDrawer}
              className="relative hover:text-digital transition-colors flex items-center justify-center bg-bone text-void w-10 h-10 border-2 border-current hover:bg-magenta hover:text-white group flex-shrink-0"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-magenta text-white text-[10px] font-mono font-bold px-1.5 py-0.5 border-2 border-void group-hover:scale-110 transition-transform">
                {items.length.toString().padStart(2, '0')}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
