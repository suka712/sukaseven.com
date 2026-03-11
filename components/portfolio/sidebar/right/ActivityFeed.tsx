"use client";

import { useEffect, useState } from "react";
import { Code, GitCommit, Music2 } from "lucide-react";
import { formatTimeAgo } from "@/utils/format";

type CommitItem = {
  kind: "commit";
  repo: string;
  message: string;
  sha: string;
  timestamp: string;
};

type SpotifyItem = {
  kind: "spotify";
  track: string;
  artist: string;
  url: string;
  is_playing: boolean;
  timestamp: number;
};

type ActivityItem = CommitItem | SpotifyItem;

export const ActivityFeed = () => {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    Promise.all([
    fetch("/api/github").then((r) => (r.ok ? r.json() : null)),
      fetch(`${API_URL}/play`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([gh, spotify]) => {
        const result: ActivityItem[] = [];

        if (Array.isArray(gh?.recentCommits)) {
          for (const c of gh.recentCommits) {
            result.push({ kind: "commit", repo: c.repo, message: c.message, sha: c.sha, timestamp: c.timestamp });
          }
        }

        if (spotify?.track && spotify.track.trim() !== "") {
          result.push({
            kind: "spotify",
            track: spotify.track,
            artist: spotify.artist,
            url: spotify.url,
            is_playing: !!spotify.is_playing,
            timestamp: typeof spotify.timestamp === "number" ? spotify.timestamp : Date.now(),
          });
        }

        // Sort newest first — spotify timestamp may be ms or s, normalise
        result.sort((a, b) => {
          const ta = a.kind === "spotify"
            ? (a.timestamp > 1e12 ? a.timestamp : a.timestamp * 1000)
            : new Date(a.timestamp).getTime();
          const tb = b.kind === "spotify"
            ? (b.timestamp > 1e12 ? b.timestamp : b.timestamp * 1000)
            : new Date(b.timestamp).getTime();
          return tb - ta;
        });

        setItems(result);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 h-full flex flex-col min-h-0">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground shrink-0 pb-2">
        Activity
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-panel min-h-0">
        {loading ? (
          <span className="text-xs text-muted-foreground/50 animate-pulse-quick font-mono">
            fetching...
          </span>
        ) : items.length === 0 ? (
          <span className="text-xs text-muted-foreground/40 font-mono">no activity</span>
        ) : (
          <div className="relative pl-3 flex flex-col gap-3">

            <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />

            {items.map((item, i) => (
              <ActivityRow key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  if (item.kind === "commit") {
    return (
      <div className="flex gap-2 text-xs font-mono min-w-0">
        <div className="absolute left-1 mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <Code className="size-3 ml-1 mt-0.5 text-accent/60 shrink-0" />
            <span className="text-accent/70 shrink-0 max-w-20 truncate">{item.repo}</span>
            <span className="text-muted-foreground/30 shrink-0">·</span>
            <span className="text-muted-foreground/40 text-[10px] shrink-0 whitespace-nowrap">
              {formatTimeAgo(new Date(item.timestamp))}
            </span>
          </div>
          <p className="text-foreground/65 mt-0.5 leading-snug line-clamp-2 wrap-break-word">
            {item.message}
          </p>
        </div>
      </div>
    );
  }

  const tsMs = item.timestamp > 1e12 ? item.timestamp : item.timestamp * 1000;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-2 text-xs font-mono min-w-0 group"
    >
      <div className="absolute left-1 mt-1.5 size-1.5 rounded-full bg-emerald-500/70 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <Music2 className="size-3 ml-1 mt-0.5 text-emerald-400/60 shrink-0" />
          <span className="text-emerald-400/70 shrink-0">
            {item.is_playing ? "listening" : "played"}
          </span>
          <span className="text-muted-foreground/30 shrink-0">·</span>
          <span className="text-muted-foreground/40 text-[10px] shrink-0 whitespace-nowrap">
            {formatTimeAgo(new Date(tsMs))}
          </span>
        </div>
        <p className="text-foreground/65 mt-0.5 truncate group-hover:underline">{item.track}</p>
        <p className="text-muted-foreground/40 text-[10px] truncate">{item.artist}</p>
      </div>
    </a>
  );
}
