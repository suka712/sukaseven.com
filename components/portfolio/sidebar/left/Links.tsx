"use client";

import { useState } from "react";
import { PanelHeader, CollapsibleContent } from "../../layout/PanelHeader";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaTiktok } from "react-icons/fa6";
import type { IconType } from "react-icons";

const links: { label: string; icon: IconType; url: string }[] = [
  { label: "GitHub",   icon: FaGithub,     url: "https://github.com/suka712" },
  { label: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com/in/username" },
  { label: "X",        icon: FaXTwitter,   url: "https://x.com/username" },
  { label: "TikTok",   icon: FaTiktok,     url: "https://tiktok.com/@username" },
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
      <CollapsibleContent collapsed={collapsed}>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {links.map(({ label, icon: Icon, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-lg py-3 text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
            >
              <Icon className="size-5" />
              <span className="text-xs font-mono">{label}</span>
            </a>
          ))}
        </div>
      </CollapsibleContent>
    </div>
  );
}
