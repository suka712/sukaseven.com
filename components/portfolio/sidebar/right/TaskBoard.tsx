"use client";

import { roadmapTasks } from "@/lib/mock-data";

const statusColor = {
  todo: "bg-muted-foreground",
  "in-progress": "bg-blue-500",
  done: "bg-emerald-500",
};

export function TaskBoard() {
  return (
    <div className="p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Roadmap
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        {roadmapTasks.map((t, i) => (
          <div key={i} className="flex items-start gap-2 text-xs font-mono">
            <span
              className={`mt-1 size-1.5 shrink-0 rounded-full ${statusColor[t.status]}`}
            />
            <span className="text-foreground/80">{t.project}</span>
            <span className="text-muted-foreground truncate">{t.task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
