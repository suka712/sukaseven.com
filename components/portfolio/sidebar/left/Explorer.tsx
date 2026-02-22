"use client";

import { FileTree } from "./FileTree";

interface LeftSidebarProps {
  onFileSelect: (path: string) => void;
  activePath: string | null;
}

export const Explorer = ({ onFileSelect, activePath }: LeftSidebarProps) => {
  return (
    <div className="flex p-4 flex-col h-full overflow-y-auto">
      <div className="text-xs pb-1 font-semibold uppercase tracking-wider text-muted-foreground">
        Explorer
      </div>
      <FileTree onFileSelect={onFileSelect} activePath={activePath} />
    </div>
  );
};
