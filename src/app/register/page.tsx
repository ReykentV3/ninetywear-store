"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, UserPlus, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // For registration, we use the standard WP Users endpoint
      const res = await fetch("/api/woocommerce/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "REGISTRATION_FAILED");
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.message || "FALLO_DE_REGISTRO");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-40 flex items-center justify-center bg-void text-bone font-mono">
        <div className="border-4 border-lime p-12 text-center tech-shadow bg-void max-w-md">
          <CheckCircle size={64} className="mx-auto text-lime mb-6" />
          <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter">REGISTRO_EXITOSO</h2>
          <p className="text-xs text-mist uppercase tracking-widest mb-8">Tu identidad ha sido verificada. Redirigiendo al portal de acceso...</p>
          <div className="w-full bg-ash h-1">
             <div className="bg-lime h-full animate-[progress_3s_linear]" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex items-center justify-center bg-void font-mono text-bone">
      <div className="w-full max-w-md border-4 border-bone p-8 md:p-12 tech-shadow relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-digital mb-6 text-[10px] tracking-[0.4em] uppercase">
            <UserPlus size={14} /> NEW_USER_REGISTRATION
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 leading-none">
            REGIS<span className="text-outline-secondary">TER</span>
          </h1>

          {error && (
            <div className="bg-magenta/10 border border-magenta p-4 mb-8 flex gap-3 items-center text-magenta text-xs uppercase font-bold animate-in fade-in slide-in-from-top-2">
              <AlertTriangle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-mist">ID_USUARIO</label>
              <input 
                required
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Nombre de usuario..."
                className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-digital transition-all font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-mist">EMAIL_ADDRESS</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="usuario@dominio.com"
                className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-digital transition-all font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-mist">PASS_PHRASE</label>
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Mínimo 8 caracteres..."
                className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-digital transition-all font-bold"
              />
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-digital text-black font-black py-5 uppercase tracking-[0.4em] text-xs hover:bg-magenta hover:text-white transition-all disabled:opacity-30"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin mx-auto" />
              ) : (
                "CREAR_CUENTA_SISTEMA"
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-bone/10 text-center">
            <Link href="/login" className="text-xs font-bold text-bone opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest">
              &lt; VOLVER_AL_ACCESO
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-outline-secondary {
          color: transparent;
          -webkit-text-stroke: 1.5px currentColor;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
