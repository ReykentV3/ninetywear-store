import { wcFetch } from "./client";

/**
 * ─── WooCommerce / WordPress JWT Auth ────────────────────────────────
 * Handles user authentication via the JWT Authentication plugin.
 */

export interface AuthResponse {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

/** 
 * Authenticates a user and returns a JWT token.
 * Endpoint: /wp-json/jwt-auth/v1/token
 */
export async function login(username: string, password: string): Promise<AuthResponse> {
  // Note: jwt-auth doesn't use the standard wc/v3 prefix, so we use a custom path
  const isBrowser = typeof window !== "undefined";
  const url = isBrowser ? "/api/woocommerce/jwt-auth/v1/token" : "jwt-auth/v1/token";
  
  // We don't use wcFetch here because it appends consumer keys which might conflict 
  // with the JWT plugin's own logic (though usually they are separate).
  // But our proxy handles it.
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "LOGIN_FAILED");
  }

  return res.json();
}

/**
 * Validates a JWT token.
 */
export async function validateToken(token: string): Promise<boolean> {
  const isBrowser = typeof window !== "undefined";
  const url = isBrowser ? "/api/woocommerce/jwt-auth/v1/token/validate" : "jwt-auth/v1/token/validate";

  const res = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return res.ok;
}
