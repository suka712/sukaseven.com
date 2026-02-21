interface GridLayoutProps {
  tabs: React.ReactNode;
  lastActive: React.ReactNode;
  leftFileTree: React.ReactNode;
  leftLinks: React.ReactNode;
  central: React.ReactNode;
  rightListening: React.ReactNode;
  rightPing: React.ReactNode;
  rightLogin: React.ReactNode;
  navTerminal: React.ReactNode;
  healthPanel: React.ReactNode;
  statsTerminal: React.ReactNode;
}

export const GridLayout = ({
  tabs,
  lastActive,
  leftFileTree,
  leftLinks,
  central,
  rightListening,
  rightPing,
  rightLogin,
  navTerminal,
  healthPanel,
  statsTerminal,
}: GridLayoutProps) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background p-2 gap-2">
      {/* Top Bar: Tabs + Last Active */}
      <div className="shrink-0 flex gap-2">
        <div className="w-full">{tabs}</div>
        <div>{lastActive}</div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-[270px_1fr_280px] gap-2 min-h-0">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-2">
          <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card">
            {leftFileTree}
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {leftLinks}
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
          <div className="flex-2 overflow-hidden rounded-xl border border-border bg-card">
            {rightPing}
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {rightLogin}
          </div>
        </div>
      </div>

      {/* Bottom — 3 cards */}
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
      </div>
    </div>
  );
}
