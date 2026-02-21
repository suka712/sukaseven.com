"use client";

import { Music } from "lucide-react";

export function ListeningTo() {
  return (
    <div className="p-3 h-full">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Listening To
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-lg bg-accent/30 shrink-0">
          <Music className="size-4 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <div className="text-sm text-foreground truncate">Not playing</div>
          <div className="text-xs text-muted-foreground truncate">—</div>
        </div>
      </div>
    </div>
  );
}
