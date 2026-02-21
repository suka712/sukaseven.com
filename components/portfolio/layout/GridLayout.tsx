interface GridLayoutProps {
  tabs: React.ReactNode;
  lastActive: React.ReactNode;
  leftFileTree: React.ReactNode;
  leftHealthPanel: React.ReactNode;
  central: React.ReactNode;
  rightListening: React.ReactNode;
  rightPing: React.ReactNode;
  rightLinks: React.ReactNode;
  navTerminal: React.ReactNode;
  statsTerminal: React.ReactNode;
}

export const GridLayout = ({
  tabs,
  lastActive,
  leftFileTree,
  leftHealthPanel,
  central,
  rightListening,
  rightPing,
  rightLinks,
  navTerminal,
  statsTerminal,
}: GridLayoutProps) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background p-2 gap-2">
      {/* Top Bar: Tabs + Last Active */}
      <div className="shrink-0 flex gap-2">
        <div className="flex-1">{tabs}</div>
        <div className="shrink-0 rounded-xl border border-border bg-card">
          {lastActive}
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-[270px_1fr_280px] gap-2 min-h-0">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card h-full">
            {leftFileTree}
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {leftHealthPanel}
          </div>
        </div>

        {/* Central Panel */}
        <div className="min-h-0 overflow-hidden rounded-xl border border-border bg-card">
          {central}
        </div>

        {/* Right Sidebar — 3 separate cards */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card">
            {rightListening}
          </div>
          <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card">
            {rightPing}
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {rightLinks}
          </div>
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
