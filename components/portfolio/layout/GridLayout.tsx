"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CollapsibleSection = "left" | "right";

interface GridLayoutProps {
  osStats: React.ReactNode;
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
  osStats: wakatime,
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
}: GridLayoutProps) => {
  const leftCollapsed = collapsedSections.has("left");
  const rightCollapsed = collapsedSections.has("right");

  const [leftWidth, setLeftWidth] = useState(270);
  const isResizing = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Resize logic
      if (isResizing.current) {
        const newWidth = e.clientX - 8;
        setLeftWidth(Math.max(200, Math.min(450, newWidth)));
      }

      // Border glow: set mouse position relative to each card
      const cards = rootRef.current?.querySelectorAll(".glow-border");
      if (!cards) return;
      const RADIUS = 300;
      for (const card of cards) {
        const el = card as HTMLElement;
        const rect = el.getBoundingClientRect();
        const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
        const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const opacity = Math.max(0, 1 - dist / RADIUS);
        el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
        el.style.setProperty("--glow-opacity", `${opacity}`);
      }
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
    <>
    <div className="ambient-blobs"><span /></div>
    <div className="vignette" />
    <div
      ref={rootRef}
      className="relative z-2 h-screen w-screen overflow-hidden p-2 grid gap-2"
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
            {wakatime}
          </div>
          <div className="glow-border card-enter flex-1 rounded-xl bg-card min-h-0 duration-200" style={{ animationDelay: "400ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{leftFileTree}</div>
          </div>
          <div className="glow-border card-enter shrink-0 rounded-xl bg-card duration-200" style={{ animationDelay: "800ms" }}>
            <div className="overflow-hidden rounded-xl">{leftListening}</div>
          </div>
          <div className="glow-border card-enter shrink-0 rounded-xl bg-card duration-200" style={{ animationDelay: "1200ms" }}>
            <div className="overflow-hidden rounded-xl">{leftLinks}</div>
          </div>
          <div className="glow-border card-enter h-60 shrink-0 rounded-xl bg-card duration-200" style={{ animationDelay: "1600ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{healthPanel}</div>
          </div>
          {/* Resize handle overlaid on the right edge */}
          <div
            onMouseDown={handleMouseDown}
            className="absolute -right-2.5 w-3 h-full cursor-col-resize flex items-center justify-center group z-10"
          >
            <div className="w-0.5 h-14 rounded-full bg-transparent group-hover:bg-accent transition-colors" />
          </div>
        </div>
      )}

      {/* Top Bar: Tabs + Last Active (row 1, cols 2-3) */}
      <div className="h-11 flex gap-2 col-span-2">
        <div className="w-full">{tabs}</div>
        <div>{lastActive}</div>
      </div>

      {/* Central Panel (row 2, col 2) */}
      <div className="glow-border card-enter min-h-0 rounded-xl bg-card" style={{ animationDelay: "2000ms" }}>
        <div className="overflow-hidden h-full rounded-xl">{central}</div>
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
          <div className="glow-border card-enter rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "400ms" }}>
            <div className="overflow-hidden rounded-xl">{rightLogin}</div>
          </div>
          <div className="glow-border card-enter flex-1 rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "800ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{rightTaskBoard}</div>
          </div>
          <div className="glow-border card-enter rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "1200ms" }}>
            <div className="overflow-hidden rounded-xl">{rightPing}</div>
          </div>
        </div>
      )}

      {/* Bottom Bar (row 3, cols 2-3) */}
      <div className="flex gap-2 h-60 col-span-2">
        <div className="glow-border card-enter w-1/3 shrink-0 rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "400ms" }}>
          <div className="overflow-hidden h-full rounded-xl">{navTerminal}</div>
        </div>
        <div className="glow-border card-enter w-full rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "800ms" }}>
          <div className="overflow-hidden h-full rounded-xl">{statsTerminal}</div>
        </div>
        <div className="glow-border card-enter w-70 shrink-0 rounded-xl bg-card relative transition-all duration-200" style={{ animationDelay: "1200ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{bottomGuide}</div>
          </div>
      </div>
    </div>
    <div className="noise-overlay" />
    </>
  );
};
