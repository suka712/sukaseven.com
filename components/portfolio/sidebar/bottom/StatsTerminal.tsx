"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import type { GitHubCommit, HealthPing } from "@/types/portfolio";

interface GitHubStats {
  commitStreak: number;
  lastPushedRepo: string;
  recentCommits: GitHubCommit[];
}

export function StatsTerminal() {
  const [github, setGithub] = useState<GitHubStats | null>(null);
  const [health, setHealth] = useState<HealthPing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/github").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/ping").then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([gh, hp]) => {
        setGithub(gh);
        setHealth(hp ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="text-xs uppercase font-semibold tracking-wider text-muted-foreground pb-2">
        Stats
      </div>
      <div className="flex-1 font-mono overflow-y-auto scrollbar-panel px-3 py-2 space-y-2 text-xs">
        {loading ? (
          <span className="text-muted-foreground animate-pulse-quick">
            fetching...
          </span>
        ) : (
          <>
            {github && (
              <div className="text-muted-foreground">
                streak:{" "}
                <span className="text-foreground">
                  {github.commitStreak} day{github.commitStreak !== 1 ? "s" : ""}
                </span>
                {github.lastPushedRepo && (
                  <>
                    {"  "}last:{" "}
                    <span className="text-emerald-400">
                      {github.lastPushedRepo}
                    </span>
                  </>
                )}
              </div>
            )}

            {health.length > 0 && (
              <>
                <div className="pt-1 text-muted-foreground">services:</div>
                {health.map((svc) => (
                  <div key={svc.name} className="flex items-center gap-2">
                    <span
                      className={`size-1.5 rounded-full shrink-0 ${
                        svc.isUp
                          ? "bg-emerald-500 shadow-[0_0_6px_theme(--color-emerald-500)]"
                          : "bg-red-500 shadow-[0_0_6px_theme(--color-red-500)]"
                      }`}
                    />
                    <span className="text-muted-foreground">{svc.name}</span>
                    {svc.isUp && svc.latency > 0 && (
                      <span className="text-foreground/60">{svc.latency}ms</span>
                    )}
                  </div>
                ))}
              </>
            )}

            {github?.recentCommits && github.recentCommits.length > 0 && (
              <>
                <div className="pt-1 text-muted-foreground">recent:</div>
                {github.recentCommits.map((commit) => (
                  <div key={commit.sha} className="text-muted-foreground leading-relaxed">
                    <span className="text-foreground/40">
                      [{formatDistanceToNow(new Date(commit.timestamp), { addSuffix: false })}]
                    </span>{" "}
                    <span className="text-emerald-400">{commit.repo}</span>{" "}
                    <span className="text-foreground/80">{commit.message}</span>
                  </div>
                ))}
              </>
            )}

            {!github && (
              <span className="text-destructive/60 text-xs">
                github stats unavailable
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
