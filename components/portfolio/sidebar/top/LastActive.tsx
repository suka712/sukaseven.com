"use client";

import { formatDistanceToNow } from "date-fns";
import { getMockStats } from "@/lib/mock-data";

export const LastActive = () => {
  const stats = getMockStats();
  const timeAgo = formatDistanceToNow(new Date(stats.lastPushedAt), {
    addSuffix: true,
  });

  return (
    <div className="flex rounded-xl border border-border bg-card items-center gap-3 px-4 py-3 overflow-hidden">
      <span className="size-2 shrink-0 rounded-full bg-blue-500 animate-pulse" />
      <div className="text-sm text-foreground whitespace-nowrap">{timeAgo}</div>
      <div className="text-xs text-muted-foreground whitespace-nowrap">
        pushed to {stats.lastPushedRepo}: {"Add migration for preferences"}
      </div>
    </div>
  );
}
