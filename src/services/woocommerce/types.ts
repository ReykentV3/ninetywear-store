// ─── WooCommerce TypeScript Types ──────────────────────────────────

export interface WCImage {
  id: number;
  src: string;
  alt: string;
  name: string;
}

export interface WCAttribute {
  id: number;
  name: string;
  options: string[];
  variation: boolean;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WCTag {
  id: number;
  name: string;
  slug: string;
}

/** Printify metadata attached to each WooCommerce product via the plugin */
export interface PrintifyMeta {
  _printify_product_id?: string;
  _printify_blueprint_id?: string;
  [key: string]: string | undefined;
}

export interface WCVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  image: WCImage;
  attributes: Array<{ id: number; name: string; option: string }>;
  /** Printify-specific variant ID stored in meta_data */
  meta_data: Array<{ key: string; value: string }>;
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable";
  status: "publish" | "draft" | "pending";
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  images: WCImage[];
  attributes: WCAttribute[];
  categories: WCCategory[];
  tags: WCTag[];
  variations: number[];
  /** Raw meta — use getPrintifyVariantId() to extract Printify IDs */
  meta_data: Array<{ key: string; value: string }>;
}

/** Shape of data each cart item holds */
export interface CartItem {
  productId: number;
  variationId: number | null;
  /** Printify-specific variant ID from WooCommerce meta */
  printifyVariantId: string | null;
  name: string;
  price: string;
  image: string;
  size: string;
  color: string;
  qty: number;
  slug: string;
  /** WooCommerce Store API item key for sync */
  cartKey?: string;
}

/** Product list query parameters */
export interface GetProductsParams {
  page?: number;
  per_page?: number;
  category?: string;
  tag?: string;
  search?: string;
  orderby?: "date" | "popularity" | "rating" | "price" | "price-desc";
  featured?: boolean;
}
