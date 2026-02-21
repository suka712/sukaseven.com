"use client";

import { useState, useRef, useEffect } from "react";
import { TerminalLine } from "./TerminalLine";
import { fileTree } from "@/lib/mock-data";
import type { FileNode } from "@/types/portfolio";

interface HistoryEntry {
  prompt: string;
  content: string;
}

interface NavigationTerminalProps {
  onFileSelect: (path: string) => void;
  onPing: () => void;
}

const HELP_TEXT = `available commands:
  help          show this message
  ls [path]     list directory contents
  cat <file>    view file content
  cd <dir>      change directory
  whoami        who am i
  open <name>   open project in new tab
  ping          ping khiem's phone
  clear         clear terminal`;

const WHOAMI_TEXT = `visitor@sukaseven.com
welcome to the war room. look around.`;

function findNode(tree: FileNode[], path: string): FileNode | null {
  for (const node of tree) {
    if (node.path === path) return node;
    if (node.children) {
      const found = findNode(node.children, path);
      if (found) return found;
    }
  }
  return null;
}

function listDir(tree: FileNode[], path: string): string {
  if (!path) {
    return tree.map((n) => n.name + (n.type === "folder" ? "/" : "")).join("  ");
  }
  const node = findNode(tree, path);
  if (!node) return `ls: ${path}: no such directory`;
  if (node.type === "file") return node.name;
  if (!node.children) return "";
  return node.children
    .map((n) => n.name + (n.type === "folder" ? "/" : ""))
    .join("  ");
}

const projectUrls: Record<string, string> = {
  katanaid: "https://katanaid.com",
  caphne: "https://caphne.co",
  anyu: "https://anyu.sukaseven.com",
  hasaki: "https://github.com/suka712/hasaki-go",
  tldraw: "https://tldraw.sukaseven.com",
};

export function NavigationTerminal({ onFileSelect, onPing }: NavigationTerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { prompt: "$", content: 'type "help" for available commands' },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const addOutput = (content: string, prompt = "") => {
    setHistory((h) => [...h, { prompt, content }]);
  };

  const processCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCmdHistory((h) => [...h, trimmed]);
    setCmdHistoryIdx(-1);
    setHistory((h) => [...h, { prompt: "$", content: trimmed }]);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd) {
      case "help":
        addOutput(HELP_TEXT);
        break;

      case "ls": {
        const target = arg
          ? cwd
            ? `${cwd}/${arg}`
            : arg
          : cwd;
        addOutput(listDir(fileTree, target));
        break;
      }

      case "cat": {
        if (!arg) {
          addOutput("cat: missing operand");
          break;
        }
        const filePath = cwd ? `${cwd}/${arg}` : arg;
        const node = findNode(fileTree, filePath);
        if (!node) {
          addOutput(`cat: ${arg}: no such file`);
        } else if (node.type === "folder") {
          addOutput(`cat: ${arg}: is a directory`);
        } else {
          onFileSelect(filePath);
          addOutput(`opening ${arg} in central panel...`);
        }
        break;
      }

      case "cd": {
        if (!arg || arg === "~" || arg === "/") {
          setCwd("");
          addOutput("");
          break;
        }
        if (arg === "..") {
          setCwd((c) => c.split("/").slice(0, -1).join("/"));
          addOutput("");
          break;
        }
        const targetPath = cwd ? `${cwd}/${arg}` : arg;
        const dirNode = findNode(fileTree, targetPath);
        if (!dirNode) {
          addOutput(`cd: ${arg}: no such directory`);
        } else if (dirNode.type !== "folder") {
          addOutput(`cd: ${arg}: not a directory`);
        } else {
          setCwd(targetPath);
          addOutput("");
        }
        break;
      }

      case "whoami":
        addOutput(WHOAMI_TEXT);
        break;

      case "open": {
        if (!arg) {
          addOutput("open: specify a project name");
          break;
        }
        const url = projectUrls[arg];
        if (url) {
          window.open(url, "_blank");
          addOutput(`opening ${arg}...`);
        } else {
          addOutput(`open: ${arg}: unknown project`);
        }
        break;
      }

      case "ping":
        onPing();
        addOutput("pinging khiem's phone...");
        break;

      case "clear":
        setHistory([]);
        break;

      default:
        addOutput(`command not found: ${cmd}. try "help"`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx =
        cmdHistoryIdx === -1
          ? cmdHistory.length - 1
          : Math.max(0, cmdHistoryIdx - 1);
      setCmdHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIdx === -1) return;
      const newIdx = cmdHistoryIdx + 1;
      if (newIdx >= cmdHistory.length) {
        setCmdHistoryIdx(-1);
        setInput("");
      } else {
        setCmdHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    }
  };

  const promptText = cwd ? `${cwd} $` : "$";

  return (
    <div
      className="flex flex-col h-full bg-background font-mono cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
        Terminal
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {history.map((entry, i) => (
          <TerminalLine
            key={i}
            prompt={entry.prompt}
            content={entry.content}
          />
        ))}
        <div className="flex gap-2 text-xs">
          <span className="text-emerald-500 shrink-0">{promptText}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-foreground outline-none caret-emerald-500"
            spellCheck={false}
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
