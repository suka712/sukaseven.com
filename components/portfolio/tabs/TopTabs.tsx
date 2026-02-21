"use client";

import { tabs } from "@/lib/mock-data";
import type { Tab } from "@/types/portfolio";

export function TopTabs() {
  return (
    <div className="flex items-center border-b border-border bg-card overflow-x-auto">
      {tabs.map((tab) => (
        <TabItem key={tab.label} tab={tab} />
      ))}
      <button className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        +
      </button>
    </div>
  );
}

function TabItem({ tab }: { tab: Tab }) {
  if (tab.isActive) {
    return (
      <div className="flex items-center gap-1.5 border-r border-border bg-background px-4 py-2 text-sm text-foreground">
        <span className="size-2 rounded-full bg-emerald-500" />
        {tab.label}
      </div>
    );
  }

  return (
    <a
      href={tab.url}
      target={tab.isExternal ? "_blank" : undefined}
      rel={tab.isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-1.5 border-r border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
    >
      {tab.label}
      {tab.isExternal && (
        <svg
          className="size-3 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </a>
  );
}
