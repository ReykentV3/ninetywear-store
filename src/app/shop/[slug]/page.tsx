import ProductDetail from "@/components/shop/ProductDetail";
import ProductGrid from "@/components/shop/ProductGrid";
import { getProductBySlug, getProductVariations, getFeaturedProducts, getMockProducts } from "@/services/woocommerce/products";
import type { WCProduct, WCVariation } from "@/services/woocommerce/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  
  let product: WCProduct | null = null;
  let variations: WCVariation[] = [];
  let relatedProducts: WCProduct[] = [];

  try {
    product = await getProductBySlug(slug);
    if (product) {
      variations = await getProductVariations(product.id);
    }
  } catch (error) {
    console.warn("WooCommerce API not connected, using mock data for detail.");
    product = getMockProducts(10).find(p => p.slug === slug) || null;
  }

  if (!product) {
    notFound();
  }

  // Get related products (featured as fallback)
  try {
    relatedProducts = await getFeaturedProducts(4);
  } catch (e) {
    relatedProducts = getMockProducts(4);
  }

  return (
    <div className="bg-void">
      <ProductDetail product={product} variations={variations} />
      
      {/* Related Products Section */}
      <div className="mt-20 border-t border-ash/40 pt-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 mb-10">
          <h2 className="text-bone font-serif text-3xl md:text-4xl" style={{ fontFamily: "var(--font-cormorant)" }}>
            Similar Frequencies
          </h2>
        </div>
        <ProductGrid products={relatedProducts} showTitle={false} />
      </div>
    </div>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={
      <div className="pt-40 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-2 border-ash border-t-blood animate-spin rounded-full mb-6" />
        <p className="font-mono text-[11px] tracking-[0.5em] text-mist" style={{ fontFamily: "var(--font-space-mono)" }}>
          ANALYZING PIECE...
        </p>
      </div>
    }>
      <ProductContent params={params} />
    </Suspense>
  );
}
