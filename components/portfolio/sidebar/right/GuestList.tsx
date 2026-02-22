"use client";

import { useState } from "react";
import { guestbookEntries } from "@/lib/mock-data";
import { PanelHeader } from "../../layout/PanelHeader";

export function GuestList() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="p-4 flex flex-col">
      <PanelHeader
        title="Guestbook"
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      {!collapsed && (
        <div className="mt-2 flex flex-col gap-2 overflow-y-auto max-h-40">
          {guestbookEntries.map((entry, i) => (
            <div key={i} className="text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-foreground/80">
                  {entry.name}
                </span>
                <span className="text-muted-foreground/50 text-[10px]">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="text-muted-foreground mt-0.5">
                {entry.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
