"use client";

import { useCartStore } from "@/store/cartStore";

// ─── Cart Hook ──────────────────────────────────────────────────────
// Re-exports the Zustand cart store as a clean, named hook.
// Use this in client components instead of importing useCartStore directly.

export function useCart() {
  const items = useCartStore((s) => s.items);
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const clearCart = useCartStore((s) => s.clearCart);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const checkoutPayload = useCartStore((s) => s.checkoutPayload);

  return {
    items,
    isDrawerOpen,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    totalItems: getTotalItems(),
    subtotal: getSubtotal(),
    checkoutPayload,
  };
}
