"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Activity, X, ShoppingCart, Loader2 } from "lucide-react";
import type { WCProduct, WCVariation } from "@/services/woocommerce/types";
import { useCartStore } from "@/store/cartStore";
import { getProductVariations } from "@/services/woocommerce/products";

export default function ProductGrid({ products, showTitle = true }: { products: WCProduct[], showTitle?: boolean }) {
  const [activeCategory, setActiveCategory] = useState('ALL_FILES - TODOS');
  
  const categories = ['ALL_FILES - TODOS', ...Array.from(new Set(products.map(p => p.categories?.[0]?.name?.toUpperCase() || 'TEES')))];
  
  const filteredProducts = products.filter(p => {
    if (activeCategory === 'ALL_FILES - TODOS') return true;
    return p.categories?.[0]?.name?.toUpperCase() === activeCategory;
  });

  return (
    <section id="logs" className="py-24 md:py-32 px-4 md:px-8 border-t-2 border-current bg-transparent relative transition-colors duration-500">
        <div className="max-w-7xl mx-auto relative z-10">
            {showTitle && (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                  <div className="text-bone">
                      <div className="font-mono text-[10px] md:text-xs text-magenta mb-2 flex items-center gap-2">
                          <Activity size={14} /> NEW_UPLOADS_DETECTED
                      </div>
                      <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                          Terminal <br className="md:hidden"/> Store
                      </h2>
                  </div>
              </div>
            )}

            {/* STORE FILTERS */}
            <div className="flex border-2 border-current mb-12 tech-shadow overflow-x-auto whitespace-nowrap bg-void text-bone">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`py-3 px-6 md:px-8 font-mono text-[10px] md:text-xs uppercase transition-colors flex-shrink-0 border-r-2 border-current ${activeCategory === cat ? 'bg-bone text-void font-bold' : 'hover:bg-magenta hover:text-white'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </section>
  );
}

function ProductCard({ product }: { product: WCProduct }) {
  const { addItem } = useCartStore();
  const [variations, setVariations] = useState<WCVariation[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isLoadingVariations, setIsLoadingVariations] = useState(false);
  const isSoldOut = product.stock_status === 'outofstock';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.type === 'variable') {
      setIsSelecting(true);
      if (variations.length === 0) {
        setIsLoadingVariations(true);
        try {
          const data = await getProductVariations(product.id);
          setVariations(data);
        } catch (err) {
          console.error("Error loading variations", err);
        } finally {
          setIsLoadingVariations(false);
        }
      }
    } else {
      addItem({
        productId: product.id,
        variationId: null,
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.images[0]?.src || '',
        size: 'N/A',
        color: 'N/A'
      });
    }
  };

  const selectVariation = (v: WCVariation) => {
    const size = v.attributes.find(a => a.name.toLowerCase() === 'size' || a.name.toLowerCase() === 'talla')?.option || 'N/A';
    const color = v.attributes.find(a => a.name.toLowerCase() === 'color')?.option || 'N/A';
    
    addItem({
      productId: product.id,
      variationId: v.id,
      name: product.name,
      price: v.price,
      qty: 1,
      image: v.image?.src || product.images[0]?.src || '',
      size,
      color
    });
    setIsSelecting(false);
  };

  return (
    <article className="group bg-void border-2 border-current tech-shadow flex flex-col h-full cursor-pointer transition-transform hover:-translate-y-2 relative text-bone">
        <div className="border-b-2 border-current p-2 flex justify-between items-center font-mono text-[8px] md:text-[10px] bg-ash/10 dark:bg-ash/50">
            <span>ID: {product.id}</span>
            <span className={isSoldOut ? 'line-through text-magenta' : 'text-digital'}>
                {isSoldOut ? 'SOLD_OUT' : 'DISPONIBLE'}
            </span>
        </div>
        
        <div className="relative h-80 md:h-96 border-b-2 border-current overflow-hidden bg-ash/5 dark:bg-ash/20 p-6 flex items-center justify-center scanlines">
            <Image 
                src={product.images[0]?.src || "/placeholder-product.png"} 
                alt={product.name}
                fill
                className={`object-contain p-8 transition-all duration-700 ${isSoldOut ? 'opacity-40 grayscale' : 'group-hover:scale-110'}`}
                sizes="(max-width: 768px) 100vw, 33vw"
            />
            
            {isSoldOut && (
                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                    <span className="bg-void text-magenta font-mono text-lg md:text-xl font-bold px-4 py-2 border-2 border-magenta transform -rotate-12 outline outline-bone">
                        SIN_MEMORIA
                    </span>
                </div>
            )}

            {/* VARIATION SELECTOR OVERLAY */}
            {isSelecting && (
              <div className="absolute inset-0 bg-void/95 z-40 flex flex-col p-4 animate-in fade-in zoom-in duration-200">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsSelecting(false); }}
                  className="absolute top-2 right-2 text-bone hover:text-magenta transition-colors"
                >
                  <X size={20} />
                </button>
                <span className="font-mono text-digital text-[9px] mb-4 uppercase tracking-[0.2em] border-b border-digital/30 pb-2">
                  &gt; IDENTIFICANDO_VARIANTES...
                </span>
                
                {isLoadingVariations ? (
                  <div className="flex-1 flex items-center justify-center">
                    <Loader2 size={32} className="animate-spin text-magenta" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 overflow-y-auto custom-scrollbar pr-1">
                    {variations.length > 0 ? (
                      variations.map(v => (
                        <button 
                          key={v.id}
                          onClick={(e) => { e.stopPropagation(); selectVariation(v); }}
                          className="bg-transparent border border-magenta dark:border-digital text-bone font-mono text-[9px] py-2 px-1 hover:bg-magenta hover:text-white transition-all uppercase font-bold"
                        >
                          {v.attributes.map(a => a.option).join(' / ')}
                        </button>
                      ))
                    ) : (
                      <p className="text-bone text-[10px] font-mono opacity-50">ERROR_NO_DATA</p>
                    )}
                  </div>
                )}
                <p className="mt-auto text-[8px] font-mono text-ash text-center pt-2">SYS_ID: {product.id}</p>
              </div>
            )}
        </div>
        
        <Link href={`/shop/${product.slug}`} className={`p-6 flex-grow flex flex-col justify-between ${isSoldOut ? 'opacity-50' : ''}`}>
            <div>
                <span className={`px-2 py-1 text-[10px] font-mono mb-3 inline-block font-bold border border-current ${isSoldOut ? 'text-magenta' : 'text-bone'}`}>
                    {product.categories?.[0]?.name?.toUpperCase() || 'CORE_SISTEM'}
                </span>
                <h3 
                    className="text-xl md:text-2xl font-black uppercase leading-tight mb-2 group-hover:text-digital transition-colors"
                    dangerouslySetInnerHTML={{ __html: product.name }}
                ></h3>
                <p className="font-mono text-[10px] text-gray-500 mb-6 uppercase">CLASE: {product.sku || 'NULL'}</p>
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-dashed border-ash/30">
                <span className={`font-mono font-bold text-xl ${isSoldOut ? 'line-through text-ash' : ''}`}>
                    S/ {parseFloat(product.price).toFixed(2)}
                </span>
                {!isSoldOut && (
                    <button 
                        onClick={handleAddToCart}
                        className="w-10 h-10 bg-bone text-void border-2 border-current hover:bg-magenta hover:text-white transition-all flex items-center justify-center font-bold text-xl"
                    >
                        {isLoadingVariations ? <Loader2 size={16} className="animate-spin" /> : '+'}
                    </button>
                )}
            </div>
        </Link>
    </article>
  );
}
