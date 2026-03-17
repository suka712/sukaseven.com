"use client";

import { FileTree } from "./FileTree";

interface LeftSidebarProps {
  onFileSelect: (path: string) => void;
  activePath: string | null;
}

export const Explorer = ({ onFileSelect, activePath }: LeftSidebarProps) => {
  return (
    <div className="flex flex-col h-full pr-3 pb-2">
      <div className="px-4 pt-4 pb-1 shrink-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Explorer
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-panel pb-3 pl-3">
        <FileTree onFileSelect={onFileSelect} activePath={activePath} />
      </div>
    </div>
  );
};
