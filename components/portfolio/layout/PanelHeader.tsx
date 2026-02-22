"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface PanelHeaderProps {
  title: React.ReactNode;
  collapsed: boolean;
  onToggle: () => void;
}

export function PanelHeader({ title, collapsed, onToggle }: PanelHeaderProps) {
  return (
    <div
      className="flex items-center justify-between cursor-pointer select-none"
      onClick={onToggle}
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <button
        className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
        tabIndex={-1}
      >
        {collapsed ? (
          <ChevronDown className="size-3" />
        ) : (
          <ChevronUp className="size-3" />
        )}
      </button>
    </div>
  );
}
