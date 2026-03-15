"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CollapsibleSection = "left" | "right";

interface GridLayoutProps {
  osStats: React.ReactNode;
  tabs: React.ReactNode;
  lastActive: React.ReactNode;
  leftFileTree: React.ReactNode;
  leftDiff: React.ReactNode;
  leftListening: React.ReactNode;
  leftLinks: React.ReactNode;
  central: React.ReactNode;
  rightLogin: React.ReactNode;
  rightTaskBoard: React.ReactNode;
  rightWeather: React.ReactNode;
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
      className="w-9 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card cursor-pointer hover:bg-accent/30 transition-colors"
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
  leftDiff,
  leftListening,
  leftLinks,
  central,
  rightLogin,
  rightTaskBoard,
  rightWeather,
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
  const [viewportWidth, setViewportWidth] = useState(1440);
  const isResizing = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Track viewport width for responsive behavior
  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
        setLeftWidth(Math.max(180, Math.min(450, newWidth)));
      }

      // Cursor ambient glow on background
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.setProperty("--cursor-x", `${e.clientX}px`);
        cursorGlowRef.current.style.setProperty("--cursor-y", `${e.clientY}px`);
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

  const isMobile = viewportWidth < 640;

  // On mobile, collapse sidebar columns to 0px so the central panel fills the width.
  // On larger screens, clamp the right sidebar so it shrinks gracefully on smaller laptops.
  const leftCol = isMobile ? "0px" : leftCollapsed ? "36px" : `${leftWidth}px`;
  const rightCol = isMobile ? "0px" : rightCollapsed ? "36px" : "clamp(220px, 19vw, 280px)";

  // Bottom bar height: shorter on small viewports
  const bottomBarHeight = viewportWidth >= 1024 ? "h-60" : viewportWidth >= 640 ? "h-52" : "h-44";

  // Left health panel height: proportional to bottom bar
  const healthPanelHeight = viewportWidth >= 1024 ? "h-60" : viewportWidth >= 640 ? "h-52" : "h-44";

  return (
    <>
    <div className="ambient-blobs"><span /><span /></div>
    <div className="vignette" />
    <div className="cursor-glow" ref={cursorGlowRef} />
    <div
      ref={rootRef}
      className="relative z-2 h-full w-full overflow-hidden p-2 grid gap-3"
      style={{
        gridTemplateColumns: `${leftCol} 1fr ${rightCol}`,
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      {/* Left Sidebar — spans all 3 rows. Hidden on mobile via 0px column. */}
      {leftCollapsed ? (
        <div className={`row-span-3 ${isMobile ? "invisible" : ""}`}>
          <CollapsedBar
            section="left"
            label="Explorer"
            onExpand={() => onToggleSection("left")}
          />
        </div>
      ) : (
        <div className="row-span-3 relative flex flex-col gap-3 min-h-0">
          <div>
            {wakatime}
          </div>
          <div className="glow-border card-enter flex-1 rounded-xl bg-card min-h-0 duration-200 shrink-0" style={{ animationDelay: "1000ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{leftFileTree}</div>
          </div>
          <div className="glow-border card-enter rounded-xl bg-card duration-200" style={{ animationDelay: "1800ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{leftDiff}</div>
          </div>
          <div className="glow-border card-enter rounded-xl bg-card duration-200" style={{ animationDelay: "2600ms" }}>
            <div className="overflow-hidden rounded-xl">{leftListening}</div>
          </div>
          <div className="glow-border card-enter rounded-xl bg-card duration-200" style={{ animationDelay: "3000ms" }}>
            <div className="overflow-hidden rounded-xl">{leftLinks}</div>
          </div>
          <div className={`glow-border card-enter rounded-xl bg-card duration-200 ${healthPanelHeight}`} style={{ animationDelay: "4000ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{healthPanel}</div>
          </div>
          {/* Resize handle overlaid on the right edge */}
          <div
            onMouseDown={handleMouseDown}
            className="absolute -right-3 w-3 h-full cursor-col-resize flex items-center justify-center group z-10"
          >
            <div className="w-0.5 h-14 rounded-full bg-transparent group-hover:bg-accent transition-colors" />
          </div>
        </div>
      )}

      {/* Top Bar: Tabs + Last Active (row 1, cols 2-3) */}
      <div className="h-11 flex gap-4 col-span-2">
        <div className="w-full">{tabs}</div>
        <div className="hidden sm:block">{lastActive}</div>
      </div>

      {/* Central Panel (row 2, col 2) */}
      <div className="glow-border card-enter min-h-0 rounded-xl bg-card" style={{ animationDelay: "5000ms" }}>
        <div className="overflow-hidden h-full rounded-xl">{central}</div>
      </div>

      {/* Right Sidebar (row 2, col 3). Hidden on mobile via 0px column. */}
      {rightCollapsed ? (
        <div className={isMobile ? "invisible" : ""}>
          <CollapsedBar
            section="right"
            label="Sidebar"
            onExpand={() => onToggleSection("right")}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3 min-h-0 overflow-hidden">
          <div className="glow-border card-enter shrink-0 rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "1000ms" }}>
            <div className="overflow-hidden rounded-xl">{rightLogin}</div>
          </div>
          <div className="glow-border card-enter flex-1 min-h-0 rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "2000ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{rightTaskBoard}</div>
          </div>
          <div className="glow-border card-enter shrink-0 rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "3000ms" }}>
            <div className="overflow-hidden rounded-xl">{rightWeather}</div>
          </div>
          <div className="glow-border card-enter shrink-0 rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "4000ms" }}>
            <div className="overflow-hidden rounded-xl">{rightPing}</div>
          </div>
        </div>
      )}

      {/* Bottom Bar (row 3, cols 2-3) */}
      <div className={`flex gap-3 col-span-2 ${bottomBarHeight}`}>
        <div className="glow-border card-enter w-1/3 rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "1000ms" }}>
          <div className="overflow-hidden h-full rounded-xl">{navTerminal}</div>
        </div>
        <div className="glow-border card-enter flex-1 rounded-xl bg-card transition-all duration-200" style={{ animationDelay: "2000ms" }}>
          <div className="overflow-hidden h-full rounded-xl">{statsTerminal}</div>
        </div>
        {viewportWidth >= 1024 && (
          <div className="glow-border card-enter w-70 shrink-0 rounded-xl bg-card relative transition-all duration-200" style={{ animationDelay: "3000ms" }}>
            <div className="overflow-hidden h-full rounded-xl">{bottomGuide}</div>
          </div>
        )}
      </div>
    </div>
    <div className="noise-overlay" />
    </>
  );
};
