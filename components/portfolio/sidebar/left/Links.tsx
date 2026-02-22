"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { PanelHeader } from "../../layout/PanelHeader";

const links = [
  { label: "github", url: "https://github.com/suka712" },
  { label: "katanaid", url: "https://katanaid.com" },
];

export function Links() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="p-4 flex flex-col">
      <PanelHeader
        title="Links"
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      {!collapsed && (
        <div className="flex gap-2 mt-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors group"
            >
              {link.label}
              <ExternalLink className="size-3 opacity-0 group-hover:opacity-50 transition-opacity" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
