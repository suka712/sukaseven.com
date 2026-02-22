"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CollapsibleSection = "left" | "right";

interface GridLayoutProps {
  uptime: React.ReactNode;
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
  uptime,
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

  const [leftWidth, setLeftWidth] = useState(270);
  const isResizing = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const newWidth = e.clientX - 8;
      setLeftWidth(Math.max(200, Math.min(450, newWidth)));
    };

    const handleMouseUp = () => {
      if (!isResizing.current) return;
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const leftCol = leftCollapsed ? "36px" : `${leftWidth}px`;
  const rightCol = rightCollapsed ? "36px" : "280px";

  // 3-row, 3-col grid. Left sidebar spans all 3 rows.
  // Rows: top(auto) | middle(1fr) | bottom(auto)
  // Cols: left | center(1fr) | right
  return (
    <div
      className="h-screen w-screen overflow-hidden bg-background p-2 grid gap-2"
      style={{
        gridTemplateColumns: `${leftCol} 1fr ${rightCol}`,
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      {/* Left Sidebar — spans all 3 rows */}
      {leftCollapsed ? (
        <div className="row-span-3">
          <CollapsedBar
            section="left"
            label="Explorer"
            onExpand={() => onToggleSection("left")}
          />
        </div>
      ) : (
        <div className="row-span-3 relative flex flex-col gap-2 min-h-0">
          <div className="shrink-0">
            {uptime}
          </div>
          <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card min-h-0">
            {leftFileTree}
          </div>
          <div className="shrink-0 overflow-hidden rounded-xl border border-border bg-card">
            {leftListening}
          </div>
          <div className="shrink-0 overflow-hidden rounded-xl border border-border bg-card">
            {leftLinks}
          </div>
          <div className="h-60 shrink-0 overflow-hidden rounded-xl border border-border bg-card">
            {healthPanel}
          </div>
          {/* Resize handle overlaid on the right edge */}
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 -right-1.5 w-3 h-full cursor-col-resize flex items-center justify-center group z-10"
          >
            <div className="w-0.5 h-8 rounded-full bg-transparent group-hover:bg-muted-foreground transition-colors" />
          </div>
        </div>
      )}

      {/* Top Bar: Tabs + Last Active (row 1, cols 2-3) */}
      <div className="h-11 flex gap-2 col-span-2">
        <div className="w-full">{tabs}</div>
        <div>{lastActive}</div>
      </div>

      {/* Central Panel (row 2, col 2) */}
      <div className="min-h-0 overflow-hidden rounded-xl border border-border bg-card">
        {central}
      </div>

      {/* Right Sidebar (row 2, col 3) */}
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

      {/* Bottom Bar (row 3, cols 2-3) */}
      <div className="flex gap-2 h-60 col-span-2">
        <div className="w-1/3 shrink-0 overflow-hidden rounded-xl border border-border bg-card">
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
