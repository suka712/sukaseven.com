"use client";

import { useState } from "react";
import type { FileNode } from "@/types/portfolio";
import { ChevronRight, ChevronDown, FileText, Folder } from "lucide-react";
import { getFileIcons } from "@/utils/format";
import { FaRegFolder } from "react-icons/fa";

const statusColors = {
  live: "bg-accent",
  wip: "bg-emerald-400",
  archived: "bg-zinc-500",
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
        className={`flex w-full items-center gap-1 py-0.5 pr-2 text-sm text-left hover:bg-accent/50 transition-colors ${
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
          <FaRegFolder className="size-4 shrink-0 text-zinc-400" />
        ) : (
          getFileIcons(node.displayExtension)
        )}

        <span className="truncate min-w-0 flex-1">
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
