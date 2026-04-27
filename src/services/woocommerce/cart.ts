import { wcFetch } from "./client";

/**
 * ─── WooCommerce Store API (Cart) ────────────────────────────────────
 * Uses /wp-json/wc/store/v1/cart to sync the headless cart with the 
 * WordPress session. This allows the backend checkout to stay in sync.
 */

export interface StoreCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  price: string;
  images: { src: string }[];
  variation: { attribute: string; value: string }[];
}

export interface StoreCart {
  items: StoreCartItem[];
  totals: {
    total_price: string;
    total_items: number;
  };
}

/** Fetches the current cart from WooCommerce Store API */
export async function getStoreCart(): Promise<StoreCart> {
  return wcFetch<StoreCart>("wc/store/v1/cart", {}, { revalidate: 0 });
}

/** Adds an item to the WooCommerce Store API cart */
export async function addToStoreCart(productId: number, quantity: number, variationId?: number): Promise<StoreCart> {
  return wcFetch<StoreCart>("wc/store/v1/cart/add-item", {}, {
    method: "POST",
    body: {
      id: productId,
      quantity: String(quantity),
      ...(variationId && { variation_id: variationId })
    }
  });
}

/** Removes an item from the WooCommerce Store API cart */
export async function removeFromStoreCart(itemKey: string): Promise<StoreCart> {
  return wcFetch<StoreCart>(`wc/store/v1/cart/remove-item`, { key: itemKey }, {
    method: "POST"
  });
}

/** Updates the quantity of an item in the WooCommerce Store API cart */
export async function updateStoreCartItem(itemKey: string, quantity: number): Promise<StoreCart> {
  return wcFetch<StoreCart>(`wc/store/v1/cart/update-item`, { key: itemKey, quantity: String(quantity) }, {
    method: "POST"
  });
}
