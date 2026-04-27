import ProductGrid from "@/components/shop/ProductGrid";
import RevealMask from "@/components/ui/RevealMask";
import { getProducts, getMockProducts } from "@/services/woocommerce/products";
import type { WCProduct } from "@/services/woocommerce/types";
import { Suspense } from "react";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    orderby?: string;
  }>;
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const category = params.category;
  const orderby = params.orderby as any;

  let products: WCProduct[] = [];
  let totalPages = 1;

  try {
    const result = await getProducts({
      page,
      per_page: 12,
      category,
      orderby,
    });
    products = result.products;
    totalPages = result.totalPages;
  } catch (error) {
    console.warn("WooCommerce API not connected, using mock data.");
    products = getMockProducts(12);
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Editorial Header */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <RevealMask direction="left">
          <p className="text-digital text-[10px] tracking-[0.6em] font-mono mb-6" style={{ fontFamily: "var(--font-space-mono)" }}>
            [ DATA_ARCHIVE / CATALOGUE ]
          </p>
        </RevealMask>
        <RevealMask delay={0.1}>
          <h1 className="text-bone font-mono font-bold text-6xl md:text-8xl tracking-tighter leading-[0.9]" style={{ fontFamily: "var(--font-space-mono)" }}>
            {category ? category.toUpperCase() : "ALL_PIECES"}
          </h1>
        </RevealMask>
      </div>

      {/* Grid */}
      <ProductGrid products={products} showTitle={false} />

      {/* Basic Pagination (Placeholder for brevity) */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pb-20">
          <div className="w-10 h-10 border border-ash flex items-center justify-center text-mist hover:border-bone hover:text-bone transition-all cursor-pointer">
            1
          </div>
          <div className="w-10 h-10 border border-ash flex items-center justify-center text-mist hover:border-bone hover:text-bone transition-all cursor-pointer">
            2
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <Suspense fallback={
      <div className="pt-32 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border border-ash border-t-digital animate-spin rounded-full mb-4" />
        <p className="font-mono text-[10px] tracking-[0.4em] text-mist" style={{ fontFamily: "var(--font-space-mono)" }}>
          LOADING_DATA_STREAM...
        </p>
      </div>
    }>
      <ShopContent searchParams={searchParams} />
    </Suspense>
  );
}
