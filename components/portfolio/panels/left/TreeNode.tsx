"use client";

import { useState } from "react";
import type { FileNode } from "@/types/portfolio";
import { ChevronRight } from "lucide-react";
import { getFileIcons } from "@/utils/format";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";

const statusDot: Record<string, string> = {
  live: "bg-accent live-dot",
  wip: "bg-emerald-400",
  archived: "bg-zinc-500/70",
};

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  onFileSelect: (path: string) => void;
  activePath: string | null;
}

export function TreeNode({ node, depth, onFileSelect, activePath }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const isFolder = node.type === "folder";
  const isActive = activePath === node.path;

  const handleClick = () => {
    if (isFolder) setExpanded((e) => !e);
    else onFileSelect(node.path);
  };

  return (
    <div>
      <div className="relative">
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r-full" />
        )}
        <button
          onClick={handleClick}
          className={`flex w-full items-center gap-1.5 py-1 pr-3 text-sm text-left transition-colors ${
            isActive
              ? "bg-accent/15 text-foreground"
              : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isFolder ? (
            <ChevronRight
              className={`size-3.5 shrink-0 text-muted-foreground/50 transition-transform duration-150 ${
                expanded ? "rotate-90" : ""
              }`}
            />
          ) : (
            <span className="w-3.5 shrink-0" />
          )}

          {isFolder ? (
            expanded
              ? <FaRegFolderOpen className="size-3.5 shrink-0 text-accent/60" />
              : <FaRegFolder className="size-3.5 shrink-0 text-zinc-400" />
          ) : (
            getFileIcons(node.displayExtension)
          )}

          <span className="truncate min-w-0 flex-1">
            {node.name}
            {node.displayExtension && (
              <span className={isActive ? "text-muted-foreground/60" : "text-muted-foreground/40"}>
                {node.displayExtension}
              </span>
            )}
          </span>

          {node.status && (
            <span className={`ml-auto size-1.5 shrink-0 rounded-full ${statusDot[node.status]}`} />
          )}
        </button>
      </div>

      {isFolder && expanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              activePath={activePath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
