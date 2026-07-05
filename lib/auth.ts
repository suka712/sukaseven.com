import { timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "session_token";

// 24h, matching the previous PG-backed session lifetime.
export const SESSION_MAX_AGE = 60 * 60 * 24;

// Set COOKIE_DOMAIN=".sukaseven.com" in production to share the session across
// subdomains; leave it unset in local dev so the cookie stays host-only.
export function sessionCookieOptions(maxAge: number = SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined,
    maxAge,
  };
}

// Constant-time compare so the token/passcode check doesn't leak via timing.
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}
