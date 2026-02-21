import { NextRequest, NextResponse } from "next/server";
import { getContentBySlug, getDefaultContent } from "@/lib/content";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  const content = slug ? getContentBySlug(slug) : getDefaultContent();

  if (!content) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(content);
}
