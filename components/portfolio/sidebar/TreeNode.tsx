"use client";

import { useState } from "react";
import type { FileNode } from "@/types/portfolio";
import { ChevronRight, ChevronDown, FileText, Folder } from "lucide-react";

const statusColors = {
  live: "bg-emerald-500",
  wip: "bg-yellow-500",
  archived: "bg-zinc-600",
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
    if (isFolder) {
      setExpanded(!expanded);
    } else {
      onFileSelect(node.path);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`flex w-full items-center gap-1 py-0.5 pr-2 text-sm hover:bg-accent/50 transition-colors ${
          isActive ? "bg-accent/70 text-foreground" : "text-muted-foreground"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isFolder ? (
          expanded ? (
            <ChevronDown className="size-4 shrink-0" />
          ) : (
            <ChevronRight className="size-4 shrink-0" />
          )
        ) : (
          <span className="w-4" />
        )}

        {isFolder ? (
          <Folder className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <FileText className="size-4 shrink-0 text-muted-foreground" />
        )}

        <span className="truncate">
          {node.name}
          {node.displayExtension && (
            <span className="text-muted-foreground">{node.displayExtension}</span>
          )}
        </span>

        {node.status && (
          <span
            className={`ml-auto size-2 shrink-0 rounded-full ${statusColors[node.status]}`}
          />
        )}
      </button>

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
