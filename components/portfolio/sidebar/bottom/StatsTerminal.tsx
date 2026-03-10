"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { getLanguageIcon } from "@/utils/format";

interface GitHubStats {
  lastPushedRepo: string;
}

interface WakaStats {
  lifetimeLanguages: { name: string; percent: number; text: string }[];
}

export function StatsTerminal() {
  const [github, setGithub] = useState<GitHubStats | null>(null);
  const [waka, setWaka] = useState<WakaStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/github").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/wakatime").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([gh, wk]) => {
        setGithub(gh);
        setWaka(wk);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between pb-2">
        <div className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
          Stats
        </div>
        {github?.lastPushedRepo && (
          <span className="text-xs font-mono text-muted-foreground/50">
            last contribution:{" "}
            <span className="text-emerald-400/70">{github.lastPushedRepo}</span>
          </span>
        )}
      </div>
      <div className="flex-1 font-mono overflow-y-auto scrollbar-panel px-3 py-2 space-y-3 text-xs">
        {loading ? (
          <span className="text-muted-foreground animate-pulse-quick">fetching...</span>
        ) : (
          <>
            <GitHubCalendar
              username="suka712"
              blockSize={10}
              blockMargin={3}
              fontSize={9}
              colorScheme="dark"
              theme={{
                dark: ["#1e2030", "#1e3a5f", "#1d5494", "#1d70c9", "#4d9ff5"],
              }}
            />

            {waka && waka.lifetimeLanguages.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                {waka.lifetimeLanguages.map((l) => (
                  <div key={l.name} className="flex items-center gap-1.5">
                    {getLanguageIcon(l.name)}
                    <span className="text-muted-foreground">{l.name}</span>
                    <span className="text-foreground/40">{l.percent}%</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
