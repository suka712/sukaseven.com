export type FileNodeStatus = "live" | "wip" | "archived";

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  status?: FileNodeStatus;
  displayExtension?: string;
  children?: FileNode[];
}

export interface Tab {
  label: string;
  url: string;
  isActive?: boolean;
  isExternal?: boolean;
}

export interface GitHubCommit {
  repo: string;
  message: string;
  timestamp: string;
  sha: string;
}

export interface ServiceStatus {
  name: string;
  url: string;
  status: "up" | "down" | "unknown";
  latency?: number;
}

export interface StatsData {
  commitStreak: number;
  lastPushedRepo: string;
  lastPushedAt: string;
  recentCommits: GitHubCommit[];
  services: ServiceStatus[];
  openPRs: number;
  openIssues: number;
}

export interface HealthPing {
  name: string;
  isUp: boolean;
  latency: number;
}
