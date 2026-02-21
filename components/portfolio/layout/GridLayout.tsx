interface GridLayoutProps {
  tabs: React.ReactNode;
  leftSidebar: React.ReactNode;
  central: React.ReactNode;
  rightSidebar: React.ReactNode;
  navTerminal: React.ReactNode;
  statsTerminal: React.ReactNode;
}

export const GridLayout = ({
  tabs,
  leftSidebar,
  central,
  rightSidebar,
  navTerminal,
  statsTerminal,
}: GridLayoutProps) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background p-2 gap-2">
      {/* Top Tabs */}
      <div className="shrink-0">{tabs}</div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-[270px_1fr_280px] gap-2 min-h-0">
        {/* Left Sidebar */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-border bg-card">
          {leftSidebar}
        </div>

        {/* Central Panel */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-border bg-card">
          {central}
        </div>

        {/* Right Sidebar */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-border bg-card">
          {rightSidebar}
        </div>
      </div>

      {/* Terminals */}
      <div className="grid grid-cols-[0.3fr_0.7fr] gap-2 max-h-3/12">
        {/* Navigation Terminal */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-border bg-card">
          {navTerminal}
        </div>
        {/* Stats Terminal */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-border bg-card">
          {statsTerminal}
        </div>
      </div>
    </div>
  );
}
