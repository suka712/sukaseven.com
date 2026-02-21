"use client";

import { FileTree } from "./FileTree";

interface LeftSidebarProps {
  onFileSelect: (path: string) => void;
  activePath: string | null;
}

export const LeftFileTree = ({ onFileSelect, activePath }: LeftSidebarProps) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Explorer
      </div>
      <FileTree onFileSelect={onFileSelect} activePath={activePath} />
    </div>
  );
}
