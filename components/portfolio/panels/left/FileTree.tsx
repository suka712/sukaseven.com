"use client";

import { fileTree } from "@/content/explorerLinks";
import { TreeNode } from "./TreeNode";

interface FileTreeProps {
  onFileSelect: (path: string) => void;
  activePath: string | null;
}

export function FileTree({ onFileSelect, activePath }: FileTreeProps) {
  return (
    <div className="py-2">
      {fileTree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          depth={0}
          onFileSelect={onFileSelect}
          activePath={activePath}
        />
      ))}
    </div>
  );
}
