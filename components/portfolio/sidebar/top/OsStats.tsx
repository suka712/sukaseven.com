"use client";

import { useEffect, useState } from "react";

interface WakatimeData {
  os: { name: string; text: string }[];
}

const OS_LABELS: Record<string, string> = {
  Linux: "Arch Linux",
  Mac: "MacOS",
};

export function OsStats() {
  const [data, setData] = useState<WakatimeData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/wakatime")
      .then((r) => r.json())
      .then((d) => {
        if (d.error || !d.os?.length) setError(true);
        else setData(d);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div className="glow-border flex flex-col gap-2 rounded-xl bg-card px-4 py-3 shrink-0 overflow-hidden font-mono text-sm">
      {error ? (
        <span className="text-destructive/70 text-xs">wakatime module errored out</span>
      ) : !data ? (
        <span className="text-muted-foreground text-xs">loading...</span>
      ) : (
        <div className="flex items-center gap-3">
          {data.os.map((o) => (
            <div key={o.name} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="size-2 rounded-full bg-accent shrink-0 animate-pulse-quick shadow-[0_0_6px_theme(--color-accent)]" />
              <span className="text-muted-foreground">{OS_LABELS[o.name] ?? o.name}</span>
              <span className="text-foreground">{o.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
