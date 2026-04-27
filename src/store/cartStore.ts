import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/services/woocommerce/types";
import { addToStoreCart, removeFromStoreCart, updateStoreCartItem } from "@/services/woocommerce/cart";

// ─── Cart Store ─────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, variationId: number | null, size: string) => void;
  updateQty: (productId: number, variationId: number | null, size: string, qty: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  // Computed
  getTotalItems: () => number;
  getSubtotal: () => number;
  checkoutPayload: () => WCCheckoutPayload;
}

/** Shape expected by WooCommerce checkout endpoint */
interface WCCheckoutPayload {
  line_items: Array<{
    product_id: number;
    variation_id: number | null;
    quantity: number;
    /** Printify variant ID for order routing */
    meta_data?: Array<{ key: string; value: string }>;
  }>;
}

function itemKey(productId: number, variationId: number | null, size: string) {
  return `${productId}-${variationId ?? "simple"}-${size}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: async (newItem: CartItem) => {
        // 1. Local Update (Optimistic)
        set((state) => {
          const key = itemKey(newItem.productId, newItem.variationId, newItem.size);
          const existing = state.items.find(
            (i) => itemKey(i.productId, i.variationId, i.size) === key
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.productId, i.variationId, i.size) === key
                  ? { ...i, qty: i.qty + newItem.qty }
                  : i
              ),
              isDrawerOpen: true,
            };
          }

          return {
            items: [...state.items, newItem],
            isDrawerOpen: true,
          };
        });

        // 2. Sync with WooCommerce Store API
        try {
          const cart = await addToStoreCart(newItem.productId, newItem.qty, newItem.variationId || undefined);
          // Update local items with the real keys from WooCommerce
          if (cart && cart.items) {
             set((state) => ({
               items: state.items.map(localItem => {
                 const serverItem = cart.items.find(si => si.id === localItem.productId);
                 return serverItem ? { ...localItem, cartKey: serverItem.key } : localItem;
               })
             }));
          }
        } catch (error) {
          console.error("Failed to sync cart item to WooCommerce:", error);
        }
      },

      removeItem: async (productId, variationId, size) => {
        const item = get().items.find(i => itemKey(i.productId, i.variationId, i.size) === itemKey(productId, variationId, size));
        const keyToDelete = item?.cartKey;

        // Local Update
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.variationId, i.size) !== itemKey(productId, variationId, size)
          ),
        }));

        // Sync Remove
        if (keyToDelete) {
          try {
            await removeFromStoreCart(keyToDelete);
          } catch (error) {
            console.error("Failed to remove item from WooCommerce cart:", error);
          }
        }
      },

      updateQty: async (productId, variationId, size, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, variationId, size);
          return;
        }

        const item = get().items.find(i => itemKey(i.productId, i.variationId, i.size) === itemKey(productId, variationId, size));
        const keyToUpdate = item?.cartKey;

        // Local Update
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.productId, i.variationId, i.size) === itemKey(productId, variationId, size)
              ? { ...i, qty }
              : i
          ),
        }));

        // Sync Update
        if (keyToUpdate) {
          try {
            await updateStoreCartItem(keyToUpdate, qty);
          } catch (error) {
            console.error("Failed to update item in WooCommerce cart:", error);
          }
        }
      },

      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.qty, 0),

      getSubtotal: () =>
        get().items.reduce(
          (sum, item) => sum + parseFloat(item.price) * item.qty,
          0
        ),

      checkoutPayload: (): WCCheckoutPayload => ({
        line_items: get().items.map((item) => ({
          product_id: item.productId,
          variation_id: item.variationId,
          quantity: item.qty,
          ...(item.printifyVariantId && {
            meta_data: [
              { key: "_printify_variant_id", value: item.printifyVariantId },
            ],
          }),
        })),
      }),
    }),
    {
      name: "ninetywear-cart", // localStorage key
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : ({} as Storage)
      ),
      // Only persist items array, not UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
