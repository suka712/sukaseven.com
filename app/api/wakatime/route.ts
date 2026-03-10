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
  const headers = { Authorization: `Basic ${encoded}` };

  try {
    const [summaryRes, allTimeRes] = await Promise.all([
      fetch(
        `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`,
        { headers, next: { revalidate: 300 } }
      ),
      fetch(
        `https://wakatime.com/api/v1/users/current/stats/all_time`,
        { headers, next: { revalidate: 86400 } }
      ),
    ]);

    if (!summaryRes.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: summaryRes.status });
    }

    const summaryData = await summaryRes.json();
    const summary = summaryData.data?.[0];

    if (!summary) {
      return NextResponse.json({ error: "no data" }, { status: 404 });
    }

    const totalSeconds: number = summary.grand_total?.total_seconds ?? 0;

    const todayLangs: { name: string; percent: number; total_seconds: number }[] =
      summary.languages ?? [];
    const topLang = [...todayLangs].sort((a, b) => b.total_seconds - a.total_seconds)[0] ?? null;

    const operatingSystems: { name: string; total_seconds: number }[] =
      summary.operating_systems ?? [];
    const os = operatingSystems
      .filter((o) => o.total_seconds > 0)
      .sort((a, b) => b.total_seconds - a.total_seconds)
      .map((o) => ({ name: o.name, text: formatDuration(o.total_seconds) }));

    // Lifetime language stats
    let lifetimeLanguages: { name: string; percent: number; text: string }[] = [];
    if (allTimeRes.ok) {
      const allTimeData = await allTimeRes.json();
      const langs: { name: string; percent: number; total_seconds: number; text: string }[] =
        allTimeData.data?.languages ?? [];
      lifetimeLanguages = langs
        .filter((l) => l.percent >= 1)
        .sort((a, b) => b.total_seconds - a.total_seconds)
        .slice(0, 5)
        .map((l) => ({ name: l.name, percent: Math.round(l.percent), text: l.text }));
    }

    return NextResponse.json({
      total_seconds: totalSeconds,
      text: formatDuration(totalSeconds),
      top_language: topLang
        ? { name: topLang.name, percent: Math.round(topLang.percent) }
        : null,
      os,
      lifetimeLanguages,
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}
