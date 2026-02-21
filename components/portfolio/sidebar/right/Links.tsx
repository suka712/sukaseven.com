"use client";

import { ExternalLink } from "lucide-react";

const links = [
  { label: "github", url: "https://github.com/suka712" },
  { label: "katanaid", url: "https://katanaid.com" },
  { label: "caphne", url: "https://caphne.co" },
  { label: "anyu", url: "https://anyu.sukaseven.com" },
  { label: "tldraw", url: "https://tldraw.sukaseven.com" },
];

export function Links() {
  return (
    <div className="p-3 flex flex-col">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Links
      </div>
      <div className="flex flex-col gap-1">
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
    </div>
  );
}
