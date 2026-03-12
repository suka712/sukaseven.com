"use client";

import { useState } from "react";
import { PanelHeader, CollapsibleContent } from "../../layout/PanelHeader";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaTiktok } from "react-icons/fa6";
import type { IconType } from "react-icons";

const links: { label: string; icon: IconType; url: string }[] = [
  { label: "GitHub",   icon: FaGithub,     url: "https://github.com/suka712" },
  { label: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com/in/khiem712" },
  { label: "X",        icon: FaXTwitter,   url: "https://x.com/sukasvn" },
  { label: "TikTok",   icon: FaTiktok,     url: "https://tiktok.com/@secondkhiem" },
];

export const Links = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="p-4 flex flex-col">
      <PanelHeader
        title="Links"
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <CollapsibleContent collapsed={collapsed}>
        <div className="flex items-center justify-between mt-2 w-full">
          {links.map(({ label, icon: Icon, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </CollapsibleContent>
    </div>
  );
}
