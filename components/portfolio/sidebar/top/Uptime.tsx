"use client";

import { useEffect, useState } from "react";

interface Machine {
  label: string;
  startSeconds: number;
}

const machines: Machine[] = [
  { label: "Arch Linux", startSeconds: 14 * 3600 + 32 * 60 + 12 },
  { label: "MacOS", startSeconds: 124 * 3600 + 12 * 60 + 33 },
];

function formatUptime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}h${String(m).padStart(2, "0")}m${String(s).padStart(2, "0")}s`;
}

export function Uptime() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shrink-0">
      {machines.map((m) => (
        <div key={m.label} className="flex items-center gap-1.5 text-sm font-mono whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-muted-foreground">{m.label}</span>
          <span className="text-foreground">{formatUptime(m.startSeconds + elapsed)}</span>
        </div>
      ))}
    </div>
  );
}
