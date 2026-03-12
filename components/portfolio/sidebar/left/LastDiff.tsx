"use client";

import { useEffect, useState } from "react";
import { formatTimeAgo } from "@/utils/format";
import { PanelHeader, CollapsibleContent } from "../../layout/PanelHeader";

interface LastDiffData {
  repo: string;
  sha: string;
  timestamp: string;
  file: {
    name: string;
    fullPath: string;
    additions: number;
    deletions: number;
    patch: string;
  };
}

export function LastDiff() {
  const [data, setData] = useState<LastDiffData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.lastDiff) setData(d.lastDiff); })
      .catch(() => null)
      .finally(() => setLoaded(true));
  }, []);

  const title = data
    ? <span className="flex items-center gap-2">
        Last Diff
        <span className="font-mono normal-case tracking-normal text-muted-foreground/50">
          {data.file.name}
        </span>
      </span>
    : "Last Diff";

  return (
    <div className="p-4 h-full flex flex-col min-h-0">
      <PanelHeader
        title={title}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <CollapsibleContent collapsed={collapsed}>
        {!loaded ? (
          <div className="mt-2 text-xs text-muted-foreground/50 font-mono animate-pulse-quick">
            fetching...
          </div>
        ) : !data ? (
          <div className="mt-2 text-xs text-muted-foreground/40 font-mono">no diff available</div>
        ) : (
          <div className="mt-2 flex flex-col min-h-0">
            {/* Stats row */}
            <div className="flex items-center gap-2 font-mono text-xs mb-1.5">
              <span className="text-emerald-400">+{data.file.additions}</span>
              <span className="text-destructive/70">-{data.file.deletions}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground truncate">{data.file.fullPath}</span>
              <span className="text-muted-foreground ml-auto shrink-0">{data.sha}</span>
            </div>

            {/* Diff lines */}
            <div className="overflow-y-auto scrollbar-panel font-mono text-[10px] leading-relaxed max-h-28">
              {data.file.patch.split("\n").map((line, i) => {
                if (line.startsWith("@@"))
                  return <div key={i} className="text-accent/50 bg-accent/5 px-1 py-px truncate">{line}</div>;
                if (line.startsWith("+"))
                  return <div key={i} className="text-emerald-400/80 bg-emerald-900/10 px-1 truncate whitespace-pre">{line}</div>;
                if (line.startsWith("-"))
                  return <div key={i} className="text-destructive/70 bg-destructive/5 px-1 truncate whitespace-pre">{line}</div>;
                return <div key={i} className="text-muted-foreground/40 px-1 truncate whitespace-pre">{line}</div>;
              })}
            </div>

            {/* Footer */}
            <div className="pt-1.5 mt-1 border-t border-border/40 text-xs font-mono text-muted-foreground">
              {formatTimeAgo(new Date(data.timestamp))}
            </div>
          </div>
        )}
      </CollapsibleContent>
    </div>
  );
}
