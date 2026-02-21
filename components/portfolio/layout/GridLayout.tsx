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
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Top Tabs */}
      <div className="shrink-0">{tabs}</div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-[270px_1fr_280px] min-h-0">
        {/* Left Sidebar */}
        <div className="row-span-1 min-h-0 overflow-hidden">{leftSidebar}</div>

        {/* Central Panel */}
        <div className="row-span-1 min-h-0 overflow-hidden border-x border-border">
          {central}
        </div>

        {/* Right Sidebar */}
        <div className="row-span-1 min-h-0 overflow-hidden">{rightSidebar}</div>
      </div>

      <div className="flex-1 grid grid-cols-[0.3fr_0.7fr] max-h-3/12">
        {/* Navigation Terminal */}
        <div className="col-span-1 min-h-0 overflow-hidden border-t border-border">
          {navTerminal}
        </div>
        {/* Stats Terminal */}
        <div className="col-span-1 min-h-0 overflow-hidden border-t border-l border-border">
          {statsTerminal}
        </div>
      </div>
    </div>
  );
}
