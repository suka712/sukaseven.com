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
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events?per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API: ${res.status}` },
        { status: 502 }
      );
    }

    const events: RawEvent[] = await res.json();

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
    const lastPushedRepo = lastPush?.repo.name.split("/")[1] ?? "";
    const lastPushedAt = lastPush?.created_at ?? new Date().toISOString();
    const commitStreak = calculateStreak(events);

    return NextResponse.json({
      commitStreak,
      lastPushedRepo,
      lastPushedAt,
      recentCommits,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
