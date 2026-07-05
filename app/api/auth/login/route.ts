import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, sessionCookieOptions, safeEqual } from "@/lib/auth";

export async function POST(req: Request) {
  const { AUTH_EMAIL, AUTH_PASSCODE, AUTH_SESSION_TOKEN } = process.env;
  if (!AUTH_EMAIL || !AUTH_PASSCODE || !AUTH_SESSION_TOKEN) {
    console.error("Auth env not configured");
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  let body: { email?: string; passcode?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const passcode = (body.passcode ?? "").trim();

  const emailOk = safeEqual(email, AUTH_EMAIL.trim().toLowerCase());
  const passcodeOk = safeEqual(passcode, AUTH_PASSCODE);
  if (!emailOk || !passcodeOk) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, AUTH_SESSION_TOKEN, sessionCookieOptions());

  return NextResponse.json({ email });
}
