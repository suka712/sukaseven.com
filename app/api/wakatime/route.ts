import { NextResponse } from "next/server";

function formatDuration(seconds: number): string {
  if (seconds < 60) return "< 1 min";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "no api key" }, { status: 500 });
  }

  const today = new Date().toISOString().split("T")[0];
  const encoded = Buffer.from(apiKey).toString("base64");

  try {
    const res = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`,
      {
        headers: { Authorization: `Basic ${encoded}` },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: res.status });
    }

    const data = await res.json();
    const summary = data.data?.[0];

    if (!summary) {
      return NextResponse.json({ error: "no data" }, { status: 404 });
    }

    const totalSeconds: number = summary.grand_total?.total_seconds ?? 0;

    const languages: { name: string; percent: number; total_seconds: number }[] =
      summary.languages ?? [];
    const topLang = [...languages].sort((a, b) => b.total_seconds - a.total_seconds)[0] ?? null;

    const operatingSystems: { name: string; total_seconds: number }[] =
      summary.operating_systems ?? [];
    const os = operatingSystems
      .filter((o) => o.total_seconds > 0)
      .sort((a, b) => b.total_seconds - a.total_seconds)
      .map((o) => ({ name: o.name, text: formatDuration(o.total_seconds) }));

    return NextResponse.json({
      total_seconds: totalSeconds,
      text: formatDuration(totalSeconds),
      top_language: topLang
        ? { name: topLang.name, percent: Math.round(topLang.percent) }
        : null,
      os,
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}
