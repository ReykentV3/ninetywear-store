"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/services/woocommerce/auth";
import { useRouter } from "next/navigation";
import { Activity, ShieldKeyhole, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await login(username, password);
      setUser({
        token: data.token,
        email: data.user_email,
        name: data.user_display_name
      });
      router.push("/shop");
    } catch (err: any) {
      setError(err.message || "FALLO_DE_AUTENTICACIÓN");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex items-center justify-center bg-void font-mono text-bone">
      <div className="w-full max-w-md border-4 border-bone p-8 md:p-12 tech-shadow relative overflow-hidden">
        {/* Background Glitch Decoration */}
        <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
          <ShieldKeyhole size={120} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-magenta mb-6 text-[10px] tracking-[0.4em] uppercase">
            <Activity size={14} className="animate-pulse" /> SECURITY_GATEWAY_v4.1
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 leading-none">
            LOG<span className="text-outline-secondary">IN</span>
          </h1>

          {error && (
            <div className="bg-magenta/10 border border-magenta p-4 mb-8 flex gap-3 items-center text-magenta text-xs uppercase font-bold animate-in fade-in slide-in-from-top-2">
              <AlertTriangle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-mist">ID_USUARIO / EMAIL</label>
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu identidad..."
                className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-mist">PASS_PHRASE</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-20"
              />
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-bone text-void font-black py-5 uppercase tracking-[0.4em] text-xs hover:bg-magenta hover:text-white transition-all disabled:opacity-30 group relative overflow-hidden"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin mx-auto" />
              ) : (
                "ACCEDER_AL_NÚCLEO →"
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-bone/10 flex flex-col gap-4 text-center">
            <p className="text-[10px] text-mist uppercase tracking-widest">
              ¿Aún no tienes acceso?
            </p>
            <Link 
              href="/register" 
              className="text-xs font-bold text-digital hover:text-magenta transition-colors underline underline-offset-4"
            >
              CREAR_NUEVA_CUENTA.sys
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-outline-secondary {
          color: transparent;
          -webkit-text-stroke: 1.5px currentColor;
        }
      `}</style>
    </div>
  );
}
