export interface ContentFrontmatter {
  title: string;
  description: string;
  status: "live" | "wip" | "archived";
  displayExtension?: string;
  url?: string;
  github?: string;
  tech?: string[];
}

export interface ContentData {
  frontmatter: ContentFrontmatter;
  content: string;
  slug: string;
}
