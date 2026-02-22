import type { Tab, FileNode, StatsData, RoadmapTask, GuestbookEntry } from "@/types/portfolio";

export const tabs: Tab[] = [
  { label: "sukaseven", url: "/", isActive: true, isExternal: false },
  { label: "katanaid", url: "https://katanaid.com", isExternal: true },
  { label: "caphne", url: "https://caphne.co", isExternal: true },
  { label: "anyu", url: "https://anyu.sukaseven.com", isExternal: true },
  {
    label: "hasaki",
    url: "https://github.com/suka712/hasaki-go",
    isExternal: true,
  },
  {
    label: "tldraw",
    url: "https://tldraw.sukaseven.com",
    isExternal: true,
  },
];

export const fileTree: FileNode[] = [
  {
    name: "projects",
    path: "projects",
    type: "folder",
    children: [
      {
        name: "caphne",
        path: "projects/caphne",
        type: "file",
        status: "live",
        displayExtension: ".co",
      },
      {
        name: "katanaid",
        path: "projects/katanaid",
        type: "file",
        status: "live",
        displayExtension: ".com",
      },
    ],
  },
  {
    name: "tools",
    path: "tools",
    type: "folder",
    children: [
      {
        name: "anyu-s3",
        path: "tools/anyu-s3",
        type: "file",
        status: "live",
        displayExtension: ".ts",
      },
      {
        name: "tldraw",
        path: "tools/tldraw",
        type: "file",
        status: "wip",
        displayExtension: ".md",
      },
      {
        name: "hasaki-go",
        path: "tools/hasaki-go",
        type: "file",
        status: "live",
        displayExtension: ".go",
      },
    ],
  },
  {
    name: "experience",
    path: "experience",
    type: "folder",
    children: [
      {
        name: "phuquocdevs-internship",
        path: "experience/phuquocdevs-internship",
        type: "file",
        status: "archived",
        displayExtension: ".md",
      },
    ],
  },
];

export function getMockStats(): StatsData {
  const now = new Date();
  return {
    commitStreak: 14,
    lastPushedRepo: "katanaid",
    lastPushedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    recentCommits: [
      {
        repo: "katanaid",
        message: "fix: resolve auth token refresh race condition",
        timestamp: new Date(
          now.getTime() - 2 * 60 * 60 * 1000
        ).toISOString(),
        sha: "a1b2c3d",
      },
      {
        repo: "caphne",
        message: "feat: add real-time collaboration cursors",
        timestamp: new Date(
          now.getTime() - 5 * 60 * 60 * 1000
        ).toISOString(),
        sha: "e4f5g6h",
      },
      {
        repo: "sukaseven.com",
        message: "chore: update portfolio layout grid",
        timestamp: new Date(
          now.getTime() - 8 * 60 * 60 * 1000
        ).toISOString(),
        sha: "i7j8k9l",
      },
      {
        repo: "hasaki-go",
        message: "refactor: migrate to slog structured logging",
        timestamp: new Date(
          now.getTime() - 24 * 60 * 60 * 1000
        ).toISOString(),
        sha: "m0n1o2p",
      },
    ],
    services: [
      { name: "katanaid.com", url: "https://katanaid.com", status: "up", latency: 42 },
      { name: "caphne.co", url: "https://caphne.co", status: "up", latency: 38 },
      { name: "anyu.sukaseven.com", url: "https://anyu.sukaseven.com", status: "up", latency: 55 },
      { name: "tldraw.sukaseven.com", url: "https://tldraw.sukaseven.com", status: "down" },
    ],
    openPRs: 3,
    openIssues: 7,
  };
}

export const roadmapTasks: RoadmapTask[] = [
  { project: "katanaid", task: "OAuth2 PKCE flow", status: "in-progress" },
  { project: "caphne", task: "Real-time cursor sync", status: "done" },
  { project: "sukaseven", task: "Portfolio v2 layout", status: "in-progress" },
  { project: "hasaki-go", task: "WebSocket reconnect", status: "todo" },
  { project: "katanaid", task: "Rate limiter middleware", status: "done" },
  { project: "anyu-s3", task: "Presigned URL expiry config", status: "todo" },
  { project: "caphne", task: "Export to PDF", status: "todo" },
];

export const guestbookEntries: GuestbookEntry[] = [
  { name: "alex@dev.io", message: "clean portfolio, love the terminal vibe", timestamp: "2025-02-20T14:30:00Z" },
  { name: "jenny", message: "the ping phone feature is hilarious", timestamp: "2025-02-18T09:15:00Z" },
  { name: "kai.m", message: "sick layout. what stack is this?", timestamp: "2025-02-15T22:45:00Z" },
];
