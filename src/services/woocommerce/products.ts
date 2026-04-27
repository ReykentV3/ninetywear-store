import { wcFetch, wcFetchWithMeta } from "./client";
import type { WCProduct, WCVariation, GetProductsParams } from "./types";

// ─── Product Service Functions ──────────────────────────────────────

/**
 * Fetches a paginated list of published products.
 */
export async function getProducts(
  params: GetProductsParams = {}
): Promise<{ products: WCProduct[]; totalPages: number; total: number }> {
  const { orderby, ...rest } = params;

  // WooCommerce uses order + orderby separately for price-desc
  let wcOrderby: string = orderby ?? "date";
  let order: string = "desc";

  if (orderby === "price-desc") {
    wcOrderby = "price";
    order = "desc";
  } else if (orderby === "price") {
    wcOrderby = "price";
    order = "asc";
  }

  const { data, totalPages, total } = await wcFetchWithMeta<WCProduct[]>(
    "products",
    {
      status: "publish",
      per_page: params.per_page ?? 12,
      page: params.page ?? 1,
      orderby: wcOrderby,
      order,
      ...rest,
    }
  );

  return { products: data, totalPages, total };
}

/**
 * Fetches a single product by its slug.
 * Returns null if the product is not found.
 */
export async function getProductBySlug(
  slug: string
): Promise<WCProduct | null> {
  const products = await wcFetch<WCProduct[]>("products", {
    slug,
    status: "publish",
  });

  return products[0] ?? null;
}

/**
 * Fetches featured products (marked as featured in WooCommerce).
 */
export async function getFeaturedProducts(
  limit: number = 6
): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>("products", {
    featured: true,
    status: "publish",
    per_page: limit,
    orderby: "date",
    order: "desc",
  });
}

/**
 * Fetches all variations for a variable product.
 * Used in product detail page for variant/size selection.
 */
export async function getProductVariations(
  productId: number
): Promise<WCVariation[]> {
  return wcFetch<WCVariation[]>(`products/${productId}/variations`, {
    per_page: 100,
  });
}

/**
 * Extracts the Printify variant ID from WooCommerce variation meta_data.
 * The meta key depends on your Printify plugin version — update if needed.
 */
export function getPrintifyVariantId(
  variation: WCVariation
): string | null {
  const meta = variation.meta_data.find(
    (m) =>
      m.key === "_printify_variant_id" ||
      m.key === "printify_variant_id" ||
      m.key === "_wc_printify_variant_id"
  );
  return meta?.value ?? null;
}

/**
 * Returns mock/placeholder products for development when WC API is not configured.
 */
export function getMockProducts(count: number = 6): WCProduct[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: ["90S GRAPHIC TEE_01", "16-BIT HOODIE_SYS", "CYBER CARGO_V2", "PIXEL WAVE JACKET", "VAPORWAVE CREW", "PROTOCOL SHORTS"][i % 6],
    slug: ["90s-graphic-tee-01", "16-bit-hoodie-sys", "cyber-cargo-v2", "pixel-wave-jacket", "vaporwave-crew", "protocol-shorts"][i % 6],
    type: "variable" as const,
    status: "publish" as const,
    featured: i < 3,
    description: "<p>Premium 90s inspired streetwear. High-fidelity prints on heavyweight cotton. Designed for the digital era.</p>",
    short_description: "90s RETRO DATA // LIMITED DROP 001",
    sku: `NW-90-${i + 1}`,
    price: ["45", "85", "120", "150", "75", "55"][i % 6],
    regular_price: ["60", "95", "140", "180", "90", "70"][i % 6],
    sale_price: ["45", "85", "120", "150", "75", "55"][i % 6],
    on_sale: true,
    stock_status: "instock" as const,
    images: [
      {
        id: i * 2 + 1,
        src: `https://images.unsplash.com/photo-${["1521572163474-6864f9cf17ab", "1556821840-3a63f8cc47c6", "1607082348824-0a96f2a4b9da", "1551028719-00167b16eac5", "1523381235212-d73f4138fc4d", "1591195853828-11db59a44f6b"][i % 6]}?w=800&q=80`,
        alt: `Retro product ${i + 1}`,
        name: "main",
      },
      {
        id: i * 2 + 2,
        src: `https://images.unsplash.com/photo-${["1554568218-0f1715e72254", "1521572163474-6864f9cf17ab", "1523381235212-d73f4138fc4d", "1551028719-00167b16eac5", "1607082348824-0a96f2a4b9da", "1591195853828-11db59a44f6b"][i % 6]}?w=800&q=80`,
        alt: `Retro product ${i + 1} alt`,
        name: "alt",
      },
    ],
    attributes: [
      {
        id: 1,
        name: "Size",
        options: ["S", "M", "L", "XL", "XXL"],
        variation: true,
      },
      {
        id: 2,
        name: "Color",
        options: ["Cyber White", "Matrix Green", "Protocol Blue"],
        variation: true,
      },
    ],
    categories: [{ id: 1, name: ["TEES", "HOODIES", "PANTS", "JACKETS", "CREWS", "SHORTS"][i % 6], slug: "cat" }],
    tags: [],
    variations: [101, 102, 103],
    meta_data: [],
  }));
}
