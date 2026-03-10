import { NextResponse } from "next/server";
import type { GitHubCommit } from "@/types/portfolio";

const USERNAME = "suka712";

interface RawEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
  };
  created_at: string;
}

function calculateStreak(events: RawEvent[]): number {
  const pushDays = new Set<string>();
  for (const e of events) {
    if (e.type === "PushEvent") {
      pushDays.add(e.created_at.slice(0, 10));
    }
  }

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const day = d.toISOString().slice(0, 10);
    if (pushDays.has(day)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

export async function GET() {
  try {
    const ghHeaders = { Accept: "application/vnd.github+json" };

    const [eventsRes, profileRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}/events?per_page=100`, {
        headers: ghHeaders,
        next: { revalidate: 60 },
      }),
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: ghHeaders,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, {
        headers: ghHeaders,
        next: { revalidate: 3600 },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!eventsRes.ok) {
      return NextResponse.json({ error: `GitHub API: ${eventsRes.status}` }, { status: 502 });
    }

    const [events, profile, repos, contribData]: [
      RawEvent[],
      Record<string, number>,
      Array<{ stargazers_count: number }>,
      { total?: Record<string, number> },
    ] = await Promise.all([
      eventsRes.json(),
      profileRes.ok ? profileRes.json() : {},
      reposRes.ok ? reposRes.json() : [],
      contribRes.ok ? contribRes.json() : {},
    ]);

    // Recent commits
    const recentCommits: GitHubCommit[] = [];
    for (const event of events) {
      if (event.type !== "PushEvent") continue;
      for (const commit of event.payload.commits ?? []) {
        if (recentCommits.length >= 5) break;
        recentCommits.push({
          repo: event.repo.name.split("/")[1],
          message: commit.message.split("\n")[0].slice(0, 80),
          timestamp: event.created_at,
          sha: commit.sha.slice(0, 7),
        });
      }
      if (recentCommits.length >= 5) break;
    }

    const lastPush = events.find((e) => e.type === "PushEvent");
    const currentYear = new Date().getFullYear().toString();

    return NextResponse.json({
      commitStreak: calculateStreak(events),
      lastPushedRepo: lastPush?.repo.name.split("/")[1] ?? "",
      lastPushedAt: lastPush?.created_at ?? new Date().toISOString(),
      recentCommits,
      followers: profile.followers ?? 0,
      publicRepos: profile.public_repos ?? 0,
      totalStars: Array.isArray(repos)
        ? repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)
        : 0,
      contributionsThisYear: contribData.total?.[currentYear] ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}
