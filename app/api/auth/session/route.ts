import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, safeEqual } from "@/lib/auth";

export async function GET() {
  const { AUTH_EMAIL, AUTH_SESSION_TOKEN } = process.env;
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  if (!token || !AUTH_SESSION_TOKEN || !safeEqual(token, AUTH_SESSION_TOKEN)) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  return NextResponse.json({ email: AUTH_EMAIL ?? "" });
}
