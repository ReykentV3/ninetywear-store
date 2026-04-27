// ─── WooCommerce API Base Client ───────────────────────────────────
// Uses server-side env vars (no NEXT_PUBLIC prefix) for secret security.

const WC_API_URL = process.env.NEXT_PUBLIC_WC_API_URL ?? "";
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY ?? "";
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET ?? "";

if (!WC_API_URL && process.env.NODE_ENV === "production") {
  console.warn("[NinetyWear] NEXT_PUBLIC_WC_API_URL is not set.");
}

/**
 * Builds an authenticated WooCommerce REST API URL.
 * Appends consumer_key + consumer_secret as query params (Basic Auth alternative).
 */
export function buildWCUrl(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {}
): string {
  const url = new URL(`${WC_API_URL}/${endpoint.replace(/^\//, "")}`);
  url.searchParams.set("consumer_key", WC_CONSUMER_KEY);
  url.searchParams.set("consumer_secret", WC_CONSUMER_SECRET);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Generic fetch wrapper for WooCommerce REST API.
 * Handles both Server (direct) and Client (via proxy) requests.
 */
export async function wcFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {},
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    revalidate?: number;
  } = {}
): Promise<T> {
  const { method = "GET", body, revalidate = 60 } = options;
  const isBrowser = typeof window !== "undefined";
  
  let url: string;
  
  if (isBrowser) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.set(key, String(value));
    });
    const qs = searchParams.toString();
    url = `/api/woocommerce/${endpoint.replace(/^\//, "")}${qs ? `?${qs}` : ""}`;
  } else {
    url = buildWCUrl(endpoint, params);
  }

  const res = await fetch(url, {
    method,
    ...(isBrowser ? {} : { next: { revalidate } }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `[WooCommerce API] ${res.status} ${res.statusText} — ${endpoint}\n${errorBody}`
    );
  }

  return res.json() as Promise<T>;
}

/** Returns total page count from WC response headers */
export async function wcFetchWithMeta<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<{ data: T; totalPages: number; total: number }> {
  const isBrowser = typeof window !== "undefined";
  let url: string;

  if (isBrowser) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.set(key, String(value));
    });
    const qs = searchParams.toString();
    url = `/api/woocommerce/${endpoint.replace(/^\//, "")}${qs ? `?${qs}` : ""}`;
  } else {
    url = buildWCUrl(endpoint, params);
  }

  const res = await fetch(url, {
    ...(isBrowser ? {} : { next: { revalidate: 60 } }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`[WooCommerce API] ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as T;
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);
  const total = parseInt(res.headers.get("X-WP-Total") ?? "0", 10);

  return { data, totalPages, total };
}
