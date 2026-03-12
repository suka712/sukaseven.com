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

function DiffPreview({ data }: { data: LastDiffData }) {
  const addedLines = data.file.patch
    .split("\n")
    .filter((l) => l.startsWith("+") && !l.startsWith("+++"))
    .map((l) => l.slice(1))
    .filter((l) => l.trim())
    .slice(0, 5);

  const total = data.file.additions + data.file.deletions;
  const greenCount = total > 0 ? Math.round((data.file.additions / total) * 5) : 0;
  const redCount = 5 - greenCount;

  return (
    <div className="mt-2 space-y-2.5">
      {/* Stats + ratio bar */}
      <div className="flex items-center gap-2 font-mono text-xs justify-between">
        <div className="flex gap-2">
          <div className="text-accent">+{data.file.additions}</div>
          <div className="text-destructive/60">-{data.file.deletions}</div>
        </div>
        <div className="flex gap-0.5 ml-1">
          {Array.from({ length: greenCount }).map((_, i) => (
            <div key={i} className={i === 0 ? "rounded-l-full h-1 w-4 bg-accent" : "h-1 w-4 bg-accent"} />
          ))}
          {Array.from({ length: redCount }).map((_, i) => (
            <div key={i} className={i === Array.from({ length: redCount }).length - 1 ? "rounded-r-full h-1 w-4 bg-destructive/35" : "h-1 w-4 bg-destructive/35"} />
          ))}
        </div>
      </div>

      {/* Added lines preview */}
      {addedLines.length > 0 && (
        <div className="space-y-1 font-mono text-[10px] text-muted-foreground/55 leading-relaxed">
          {addedLines.map((line, i) => (
            <div key={i} className="truncate">{line}</div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-[10px] font-mono text-muted-foreground/30 truncate">
        {data.file.fullPath} · {formatTimeAgo(new Date(data.timestamp))}
      </div>
    </div>
  );
}

export const LastDiff = () => {
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
    ? <span className="flex items-center gap-2 overflow-hidden truncate">
        Latest
        <span className="font-mono normal-case tracking-normal text-muted-foreground/50 truncate">
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
          <DiffPreview data={data} />
        )}
      </CollapsibleContent>
    </div>
  );
}
