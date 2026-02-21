import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ContentData, ContentFrontmatter } from "@/types/content";

const contentDir = path.join(process.cwd(), "content");

export function getContentBySlug(slug: string): ContentData | null {
  // Try direct path first (e.g., "projects/katanaid")
  const possiblePaths = [
    path.join(contentDir, `${slug}.mdx`),
    path.join(contentDir, `${slug}.md`),
    path.join(contentDir, `${slug}/index.mdx`),
    path.join(contentDir, `${slug}/index.md`),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        frontmatter: data as ContentFrontmatter,
        content,
        slug,
      };
    }
  }

  return null;
}

export function getDefaultContent(): ContentData | null {
  return getContentBySlug("index");
}

export function getAllContentInCategory(category: string): ContentData[] {
  const categoryDir = path.join(contentDir, category);
  if (!fs.existsSync(categoryDir)) return [];

  const files = fs.readdirSync(categoryDir).filter(
    (f) => f.endsWith(".mdx") || f.endsWith(".md")
  );

  return files
    .map((file) => {
      const slug = `${category}/${file.replace(/\.mdx?$/, "")}`;
      return getContentBySlug(slug);
    })
    .filter((c): c is ContentData => c !== null);
}
