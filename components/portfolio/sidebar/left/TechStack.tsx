"use client";

import { useState } from "react";
import { PanelHeader } from "../../layout/PanelHeader";

const techs = [
  "Next.js",
  "Go",
  "TypeScript",
  "Tailwind",
  "Postgres",
  "Redis",
  "Docker",
  "AWS",
];

export function TechStack() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="p-4">
      <PanelHeader
        title="Tech Stack"
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      {!collapsed && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {techs.map((t) => (
            <span
              key={t}
              className="rounded-md bg-accent/30 px-2 py-0.5 text-xs font-mono text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
