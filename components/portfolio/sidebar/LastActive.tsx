"use client";

import { formatDistanceToNow } from "date-fns";
import { getMockStats } from "@/lib/mock-data";

export function LastActive() {
  const stats = getMockStats();
  const timeAgo = formatDistanceToNow(new Date(stats.lastPushedAt), {
    addSuffix: true,
  });

  return (
    <div className="border-b border-border p-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Last Active
      </div>
      <div className="text-sm text-foreground">{timeAgo}</div>
      <div className="text-xs text-muted-foreground mt-0.5">
        pushed to {stats.lastPushedRepo}
      </div>
    </div>
  );
}
