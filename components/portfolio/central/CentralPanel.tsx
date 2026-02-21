"use client";

import { useEffect, useState } from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import type { ContentData } from "@/types/content";

interface CentralPanelProps {
  contentPath: string | null;
}

export function CentralPanel({ contentPath }: CentralPanelProps) {
  const [content, setContent] = useState<ContentData | null>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null
  );
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
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <span className="animate-pulse">loading...</span>
      </div>
    );
  }

  if (!content || !mdxSource) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        content not found
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      {content.frontmatter.title && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {content.frontmatter.title}
          </h1>
          {content.frontmatter.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {content.frontmatter.description}
            </p>
          )}
          {content.frontmatter.tech && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {content.frontmatter.tech.map((t) => (
                <span
                  key={t}
                  className="rounded bg-accent/50 px-2 py-0.5 text-xs text-accent-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {(content.frontmatter.url || content.frontmatter.github) && (
            <div className="mt-3 flex gap-3 text-xs">
              {content.frontmatter.url && (
                <a
                  href={content.frontmatter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  live site
                </a>
              )}
              {content.frontmatter.github && (
                <a
                  href={content.frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github
                </a>
              )}
            </div>
          )}
        </div>
      )}
      <div className="prose-custom">
        <MDXRemote {...mdxSource} />
      </div>
    </div>
  );
}
