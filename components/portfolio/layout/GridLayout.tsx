"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type CollapsibleSection = "left" | "right";

interface GridLayoutProps {
  tabs: React.ReactNode;
  lastActive: React.ReactNode;
  leftFileTree: React.ReactNode;
  leftListening: React.ReactNode;
  leftLinks: React.ReactNode;
  central: React.ReactNode;
  rightLogin: React.ReactNode;
  rightTaskBoard: React.ReactNode;
  rightPing: React.ReactNode;
  navTerminal: React.ReactNode;
  healthPanel: React.ReactNode;
  statsTerminal: React.ReactNode;
  bottomGuide: React.ReactNode;
  collapsedSections: Set<CollapsibleSection>;
  onToggleSection: (section: CollapsibleSection) => void;
  bottomGuideCollapsed: boolean;
  onToggleBottomGuide: () => void;
}

function CollapsedBar({
  section,
  label,
  onExpand,
}: {
  section: "left" | "right";
  label: string;
  onExpand: () => void;
}) {
  const isLeft = section === "left";

  return (
    <div
      onClick={onExpand}
      className="w-9 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card cursor-pointer hover:bg-accent/30 transition-colors"
    >
      {isLeft ? (
        <ChevronRight className="size-3 text-muted-foreground" />
      ) : (
        <ChevronLeft className="size-3 text-muted-foreground" />
      )}
      <span
        className="text-xs text-muted-foreground uppercase tracking-wider font-semibold"
        style={{ writingMode: "vertical-rl" }}
      >
        {label}
      </span>
    </div>
  );
}

export const GridLayout = ({
  tabs,
  lastActive,
  leftFileTree,
  leftListening,
  leftLinks,
  central,
  rightLogin,
  rightTaskBoard,
  rightPing,
  navTerminal,
  healthPanel,
  statsTerminal,
  bottomGuide,
  collapsedSections,
  onToggleSection,
  bottomGuideCollapsed,
  onToggleBottomGuide,
}: GridLayoutProps) => {
  const leftCollapsed = collapsedSections.has("left");
  const rightCollapsed = collapsedSections.has("right");

  const leftCol = leftCollapsed ? "36px" : "270px";
  const rightCol = rightCollapsed ? "36px" : "280px";

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background p-2 gap-2">
      {/* Top Bar: Tabs + Last Active */}
      <div className="shrink-0 flex gap-2">
        <div className="w-full">{tabs}</div>
        <div>{lastActive}</div>
      </div>

      {/* Main Grid */}
      <div
        className="flex-1 grid gap-2 min-h-0 transition-all duration-200"
        style={{ gridTemplateColumns: `${leftCol} 1fr ${rightCol}` }}
      >
        {/* Left Sidebar */}
        {leftCollapsed ? (
          <CollapsedBar
            section="left"
            label="Explorer"
            onExpand={() => onToggleSection("left")}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card">
              {leftFileTree}
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {leftListening}
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {leftLinks}
            </div>
          </div>
        )}

        {/* Central Panel */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-border bg-card">
          {central}
        </div>

        {/* Right Sidebar */}
        {rightCollapsed ? (
          <CollapsedBar
            section="right"
            label="Sidebar"
            onExpand={() => onToggleSection("right")}
          />
        ) : (
          <div className="flex flex-col gap-2 min-h-0">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {rightLogin}
            </div>
            <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card">
              {rightTaskBoard}
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {rightPing}
            </div>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="flex gap-2 max-h-3/12">
        <div className="w-67.5 shrink-0 overflow-hidden rounded-xl border border-border bg-card">
          {healthPanel}
        </div>
        <div className="w-1/4 shrink-0 overflow-hidden rounded-xl border border-border bg-card">
          {navTerminal}
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card">
          {statsTerminal}
        </div>
        {bottomGuideCollapsed ? (
          <div
            onClick={onToggleBottomGuide}
            className="w-9 shrink-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card cursor-pointer hover:bg-accent/30 transition-colors"
          >
            <ChevronLeft className="size-3 text-muted-foreground" />
            <span
              className="text-xs text-muted-foreground uppercase tracking-wider font-semibold"
              style={{ writingMode: "vertical-rl" }}
            >
              Guide
            </span>
          </div>
        ) : (
          <div className="w-72 shrink-0 overflow-hidden rounded-xl border border-border bg-card relative">
            <button
              onClick={onToggleBottomGuide}
              className="absolute top-1 right-1 text-muted-foreground hover:text-foreground transition-colors p-0.5"
            >
              <ChevronRight className="size-3" />
            </button>
            {bottomGuide}
          </div>
        )}
      </div>
    </div>
  );
};
