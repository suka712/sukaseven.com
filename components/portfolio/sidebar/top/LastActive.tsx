"use client";

import { formatDistanceToNow } from "date-fns";
import { getMockStats } from "@/lib/mock-data";

export function LastActive() {
  const stats = getMockStats();
  const timeAgo = formatDistanceToNow(new Date(stats.lastPushedAt), {
    addSuffix: true,
  });

  return (
    <div className="flex justify-center items-center gap-3 px-4 py-3">
      <span className="size-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
      <div className="text-sm text-foreground whitespace-nowrap">{timeAgo}</div>
      <div className="text-xs text-muted-foreground whitespace-nowrap">
        contributed to {stats.lastPushedRepo}
      </div>
    </div>
  );
}
