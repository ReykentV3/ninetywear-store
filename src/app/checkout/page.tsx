"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Activity, CheckCircle, CreditCard, ChevronRight, Loader2, ExternalLink } from "lucide-react";
import { wcFetch } from "@/services/woocommerce/client";

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = getSubtotal();
  const shipping = 15.00; // Mock shipping
  const total = subtotal + shipping;

  if (!isMounted) return null;

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-40 px-6 flex flex-col items-center justify-center text-center bg-void">
        <div className="border-4 border-lime p-12 max-w-2xl bg-void tech-shadow">
          <CheckCircle size={80} className="mx-auto text-lime mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-black text-bone uppercase tracking-tighter mb-4">ORDEN_GENERADA</h1>
          <p className="font-mono text-mist mb-8 uppercase tracking-widest text-sm">Tu pedido ha sido registrado en el núcleo. Para completar el pago de forma segura, accede a nuestra pasarela oficial.</p>
          
          {paymentUrl ? (
            <a 
              href={paymentUrl} 
              className="inline-flex items-center gap-3 bg-digital text-black font-black px-10 py-6 uppercase hover:bg-magenta hover:text-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              PROCEDER_AL_PAGO_SEGURO <ExternalLink size={20} />
            </a>
          ) : (
            <Link href="/shop" className="inline-block bg-lime text-black font-black px-10 py-4 uppercase hover:bg-white transition-colors">
              VOLVER_AL_CATÁLOGO
            </Link>
          )}
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const orderData = {
        payment_method: "cod", // Default placeholder
        payment_method_title: "Pago en Tienda / Redirección",
        set_paid: false,
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          country: "PE", // Default
          email: formData.email,
          phone: formData.phone
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          country: "PE"
        },
        line_items: items.map(item => ({
          product_id: item.productId,
          variation_id: item.variationId || 0,
          quantity: item.qty
        }))
      };

      const response = await wcFetch<any>("orders", {}, {
        method: "POST",
        body: orderData
      });

      if (response && response.id) {
        // En un entorno real, redirigiríamos al payment_url del gateway
        // Aquí construimos el link de pago estándar de WooCommerce
        const wcBase = process.env.NEXT_PUBLIC_WC_API_URL?.split('/wp-json')[0];
        const payUrl = `${wcBase}/checkout/order-pay/${response.id}/?key=${response.order_key}`;
        
        setPaymentUrl(payUrl);
        setIsSubmitting(false);
        setOrderComplete(true);
        clearCart();
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("ERROR_CON_SERVIDOR_WC: Por favor intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-void text-bone font-mono transition-colors duration-500 selection:bg-magenta selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER DE CHECKOUT */}
        <div className="mb-12 border-b border-ash/20 pb-8">
           <div className="flex items-center gap-4 text-magenta mb-2 uppercase text-[10px] tracking-[0.4em]">
             <Activity size={14} /> SYS_ORDER_PROCESSING_UNIT
           </div>
           <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
             CHECK<span className="text-outline-secondary">OUT</span>
           </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* COLUMNA IZQUIERDA: FACTURACIÓN */}
          <div className="lg:col-span-7 space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter border-l-4 border-magenta pl-6 mb-8">
                DATOS_DE_FACTURACIÓN
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-mist">NOMBRE_USR</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Escribe tu nombre..."
                    className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-30"
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-mist">APELLIDO_USR</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Escribe tu apellido..."
                    className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-30"
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-mist">DIRECCIÓN_ENVÍO</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Calle, número, departamento..."
                    className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-30"
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-mist">CIUDAD_DISTRICT</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Lima, CDMX, etc."
                    className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-30"
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-mist">CÓDIGO_POSTAL</label>
                  <input 
                    required
                    type="text" 
                    placeholder="00000"
                    className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-30"
                    onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-mist">EMAIL_CONTACT</label>
                  <input 
                    required
                    type="email" 
                    placeholder="usuario@dominio.com"
                    className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-30"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-mist">PHONE_UUID</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+51 000 000 000"
                    className="w-full bg-void border border-bone/20 text-digital p-4 outline-none focus:border-magenta transition-all font-bold placeholder:opacity-30"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* COLUMNA DERECHA: RESUMEN Y PAGO */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              
              {/* RESUMEN DE COMPRA */}
              <div className="bg-void border-2 border-bone/20 p-6 md:p-8 tech-shadow">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex justify-between items-center text-bone">
                  <span>RESUMEN_PEDIDO</span>
                  <span className="text-[10px] text-mist font-normal">ITEMS: {items.length}</span>
                </h3>
                
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variationId}-${item.size}`} className="flex gap-4 border-b border-ash/10 pb-4">
                      <div className="relative w-16 h-20 flex-shrink-0 bg-void border border-bone/20">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-75" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase leading-tight">{item.name}</p>
                        <p className="text-[9px] text-mist uppercase mt-1">SZ: {item.size} // QTY: {item.qty}</p>
                        <p className="text-xs text-digital mt-1">S/ {(parseFloat(item.price) * item.qty).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t-2 border-dashed border-bone/20">
                  <div className="flex justify-between text-xs tracking-widest text-mist">
                    <span>SUB_TOTAL:</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs tracking-widest text-mist">
                    <span>SHIPPING_LOG:</span>
                    <span>S/ {shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-end pt-4 mt-2 bg-void -mx-6 md:-mx-8 px-6 md:px-8 py-6 border-t-4 border-magenta">
                    <span className="text-sm font-black uppercase tracking-[0.2em]">TOTAL_FINAL:</span>
                    <span className="text-3xl font-black text-digital">S/ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* SECCIÓN DE PAGO (ESTILO CYBERPUNK) */}
              <div className="bg-void border-4 border-magenta p-6 md:p-8 tech-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <CreditCard size={100} />
                </div>
                
                <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-magenta animate-ping"></div> MÉTODO_DE_PAGO
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 bg-void p-4 border border-bone/20">
                    <input type="radio" checked readOnly className="accent-magenta w-4 h-4" />
                    <label className="text-xs font-bold uppercase tracking-widest">Pago con Tarjeta / PayPal</label>
                  </div>
                  <p className="text-[10px] text-mist leading-relaxed italic">
                    &gt; Serás redirigido a una infraestructura externa segura para completar la transacción. NINETYWEAR no almacena tus datos bancarios.
                  </p>
                </div>

                <button 
                  disabled={items.length === 0 || isSubmitting}
                  className="w-full bg-digital text-black font-black py-5 uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-magenta hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  {isSubmitting ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <>EJECUTAR_ORDEN <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>

            </div>
          </div>

        </form>
      </div>

      <style jsx>{`
        .text-outline-secondary {
          color: transparent;
          -webkit-text-stroke: 1.5px #FF003C;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--bg-color);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--text-color);
          opacity: 0.3;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FF003C;
        }
      `}</style>
    </div>
  );
}
