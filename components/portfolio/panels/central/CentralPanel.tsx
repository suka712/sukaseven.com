"use client";

import { useEffect, useState } from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ExternalLink, Github } from "lucide-react";
import type { ContentData } from "@/types/content";
import type { FileNodeStatus } from "@/types/portfolio";

interface CentralPanelProps {
  contentPath: string | null;
}

const statusConfig: Record<
  FileNodeStatus,
  { label: string; dot: string; text: string }
> = {
  live: {
    label: "live",
    dot: "bg-accent animate-pulse-quick shadow-[0_0_6px_theme(--color-accent)]",
    text: "text-accent",
  },
  wip: {
    label: "wip",
    dot: "bg-amber-400 animate-pulse-quick shadow-[0_0_6px_theme(--color-amber-400)]",
    text: "text-amber-400",
  },
  archived: {
    label: "archived",
    dot: "bg-zinc-500",
    text: "text-zinc-500",
  },
};

export function CentralPanel({ contentPath }: CentralPanelProps) {
  const [content, setContent] = useState<ContentData | null>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        const slug = contentPath || "";
        const url = slug
          ? `/api/content?slug=${encodeURIComponent(slug)}`
          : "/api/content";
        const res = await fetch(url);
        if (!res.ok) throw new Error("Not found");
        const data: ContentData = await res.json();
        setContent(data);
        const serialized = await serialize(data.content);
        setMdxSource(serialized);
      } catch {
        setContent(null);
        setMdxSource(null);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [contentPath]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground font-mono text-sm">
        <span className="animate-pulse-quick">loading...</span>
      </div>
    );
  }

  if (!content || !mdxSource) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground font-mono text-sm">
        content not found
      </div>
    );
  }

  const status = content.frontmatter.status
    ? statusConfig[content.frontmatter.status]
    : null;

  return (
    <div className="h-full overflow-y-auto scrollbar-panel p-6">
      {content.frontmatter.title && (
        <div className="mb-5">
          {/* Breadcrumb path */}
          {contentPath && (
            <div className="text-xs text-muted-foreground/60 font-mono mb-2 tracking-wide">
              ~/{contentPath}
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-foreground leading-tight">
                {content.frontmatter.title}
              </h1>
              {content.frontmatter.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {content.frontmatter.description}
                </p>
              )}
            </div>

            {/* Status badge */}
            {status && (
              <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                <span className={`size-1.5 rounded-full ${status.dot}`} />
                <span className={`text-xs font-mono ${status.text}`}>
                  {status.label}
                </span>
              </div>
            )}
          </div>

          {/* Tech tags */}
          {content.frontmatter.tech && content.frontmatter.tech.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {content.frontmatter.tech.map((t) => (
                <span
                  key={t}
                  className="rounded bg-accent/20 border border-accent/20 px-2 py-0.5 text-xs font-mono text-accent/80"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Link buttons */}
          {(content.frontmatter.url || content.frontmatter.github) && (
            <div className="mt-3 flex gap-2">
              {content.frontmatter.url && (
                <a
                  href={content.frontmatter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-accent/20 border border-accent/20 px-3 py-1.5 text-xs text-accent hover:bg-accent/30 transition-colors"
                >
                  <ExternalLink className="size-3" />
                  live site
                </a>
              )}
              {content.frontmatter.github && (
                <a
                  href={content.frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-muted border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  <Github className="size-3" />
                  github
                </a>
              )}
            </div>
          )}

          <hr className="mt-5 border-border" />
        </div>
      )}
      <div className="prose-custom">
        <MDXRemote {...mdxSource} />
      </div>
    </div>
  );
}
