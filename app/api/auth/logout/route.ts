import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

export async function POST() {
  const store = await cookies();
  // Overwrite with an immediately-expiring cookie using the same attributes so
  // it clears reliably (incl. any configured domain).
  store.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  return NextResponse.json({ message: "Logged out" });
}
