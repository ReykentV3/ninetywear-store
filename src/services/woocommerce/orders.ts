import { wcFetch } from "./client";

export interface WCOrderPayload {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  line_items: Array<{
    product_id: number;
    variation_id?: number;
    quantity: number;
  }>;
}

export async function createOrder(data: WCOrderPayload) {
  const isBrowser = typeof window !== "undefined";
  
  const url = isBrowser ? "/api/woocommerce/orders" : "orders";
  
  const res = await fetch(isBrowser ? url : `/api/woocommerce/orders`, { // wait, if not browser we use client logic
     // ... actually wcFetch handles this better
  });
  
  // Let's just use wcFetch but it doesn't support POST yet in my update.
  // I'll update wcFetch to support POST or just use a custom fetch here.
}

// Actually let's just update the proxy to handle POST and use it.
