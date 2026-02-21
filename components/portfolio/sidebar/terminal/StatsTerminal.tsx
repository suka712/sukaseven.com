"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { getMockStats } from "@/lib/mock-data";
import type { StatsData } from "@/types/portfolio";

export function StatsTerminal() {
  const [stats, setStats] = useState<StatsData>(getMockStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getMockStats());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full font-mono">
      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Stats
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-xs">
        <div className="text-muted-foreground">
          streak: <span className="text-foreground">{stats.commitStreak} days</span>
        </div>
        <div className="text-muted-foreground">
          open PRs: <span className="text-foreground">{stats.openPRs}</span>
          {" | "}issues: <span className="text-foreground">{stats.openIssues}</span>
        </div>

        <div className="pt-1 text-muted-foreground">services:</div>
        {stats.services.map((svc) => (
          <div key={svc.name} className="flex items-center gap-2">
            <span
              className={`size-1.5 rounded-full ${
                svc.status === "up" ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            <span className="text-muted-foreground">{svc.name}</span>
            {svc.latency && (
              <span className="text-foreground">{svc.latency}ms</span>
            )}
          </div>
        ))}

        <div className="pt-1 text-muted-foreground">recent:</div>
        {stats.recentCommits.map((commit) => (
          <div key={commit.sha} className="text-muted-foreground">
            <span className="text-foreground/50">
              [{formatDistanceToNow(new Date(commit.timestamp), { addSuffix: false })}]
            </span>{" "}
            <span className="text-emerald-500">{commit.repo}</span>{" "}
            <span className="text-foreground">{commit.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
