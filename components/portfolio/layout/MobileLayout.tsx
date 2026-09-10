"use client";

import { Home, FolderOpen, Activity, LayoutGrid } from "lucide-react";

export type MobileTab = "home" | "browse" | "feed" | "info";

interface MobileLayoutProps {
  tabs: React.ReactNode;
  central: React.ReactNode;
  leftFileTree: React.ReactNode;
  leftListening: React.ReactNode;
  leftLinks: React.ReactNode;
  leftDiff: React.ReactNode;
  rightLogin: React.ReactNode;
  rightTaskBoard: React.ReactNode;
  rightWeather: React.ReactNode;
  rightPing: React.ReactNode;
  healthPanel: React.ReactNode;
  statsTerminal: React.ReactNode;
  osStats: React.ReactNode;
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

const NAV_ITEMS: {
  id: MobileTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "browse", label: "Browse", icon: FolderOpen },
  { id: "feed", label: "Feed", icon: Activity },
  { id: "info", label: "Info", icon: LayoutGrid },
];

export function MobileLayout({
  tabs,
  central,
  leftFileTree,
  leftListening,
  leftLinks,
  leftDiff,
  rightLogin,
  rightTaskBoard,
  rightWeather,
  rightPing,
  healthPanel,
  statsTerminal,
  osStats,
  activeTab,
  onTabChange,
}: MobileLayoutProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="glow-border flex-1 rounded-xl panel-surface min-h-0">
            <div className="overflow-hidden h-full rounded-xl">{central}</div>
          </div>
        );

      case "browse":
        return (
          <div className="flex flex-col gap-2 flex-1 min-h-0">
            <div className="glow-border flex-1 rounded-xl panel-surface min-h-0">
              <div className="overflow-hidden h-full rounded-xl">
                {leftFileTree}
              </div>
            </div>
            <div className="glow-border rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden rounded-xl">{leftLinks}</div>
            </div>
          </div>
        );

      case "feed":
        return (
          <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto scrollbar-panel mobile-scroll-container">
            <div className="glow-border rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden rounded-xl">{leftListening}</div>
            </div>
            <div className="glow-border min-h-64 rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden h-full rounded-xl">
                {rightTaskBoard}
              </div>
            </div>
            <div className="glow-border rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden rounded-xl">{leftDiff}</div>
            </div>
          </div>
        );

      case "info":
        return (
          <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto scrollbar-panel mobile-scroll-container">
            {/* OS stats at top */}
            <div className="shrink-0">{osStats}</div>
            <div className="glow-border rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden rounded-xl">{rightWeather}</div>
            </div>
            <div className="glow-border min-h-52 rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden h-full rounded-xl">
                {healthPanel}
              </div>
            </div>
            <div className="glow-border min-h-52 rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden h-full rounded-xl">
                {statsTerminal}
              </div>
            </div>
            <div className="glow-border rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden rounded-xl">{rightLogin}</div>
            </div>
            <div className="glow-border rounded-xl panel-surface shrink-0">
              <div className="overflow-hidden rounded-xl">{rightPing}</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full p-2 gap-2">
      {/* Top bar: scrollable tabs */}
      <div className="shrink-0">
        <div className="min-w-0 overflow-x-auto">{tabs}</div>
      </div>

      {/* Content area */}
      <div className="flex-1 min-h-0 flex flex-col">{renderContent()}</div>

      {/* Bottom navigation */}
      <nav className="shrink-0 glow-border rounded-xl panel-surface mobile-bottom-nav">
        <div className="flex items-center justify-around py-1.5 mobile-nav-safe-area">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === id
                  ? "text-accent"
                  : "text-muted-foreground active:text-foreground"
              }`}
            >
              <Icon
                className={`size-5 transition-transform ${
                  activeTab === id ? "scale-110" : ""
                }`}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {label}
              </span>
              {activeTab === id && (
                <div className="absolute -bottom-0.5 w-4 h-0.5 rounded-full bg-accent" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
