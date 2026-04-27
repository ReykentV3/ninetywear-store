import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import ProductGrid from "@/components/shop/ProductGrid";
import { MarqueeSection, BreachCountdown } from "@/components/home/SystemFeedback";
import { getFeaturedProducts, getProducts, getMockProducts } from "@/services/woocommerce/products";
import type { WCProduct } from "@/services/woocommerce/types";

export default async function Home() {
  let featuredProducts: WCProduct[] = [];
  
  try {
    // 1. Intentar traer destacados
    featuredProducts = await getFeaturedProducts(9);
    
    // 2. Si no hay destacados o la API devuelve vacío, traer los más recientes (Real Data)
    if (!featuredProducts || featuredProducts.length === 0) {
      const { products } = await getProducts({ per_page: 9 });
      featuredProducts = products;
    }
  } catch (error) {
    console.error("[NinetyWear] Error fetching real products:", error);
    // 3. Fallback a Mocks solo si la API falla físicamente
    featuredProducts = getMockProducts(9);
  }

  return (
    <>
      <HeroSection />
      
      <MarqueeSection />
      
      <BreachCountdown />

      <CategorySection />

      <ProductGrid 
        products={featuredProducts} 
      />
    </>
  );
}
