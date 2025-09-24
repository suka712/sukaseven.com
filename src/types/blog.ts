export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  date: string;
  author?: string;
  tags?: string[];
  slug: string;
}

export interface BlogConfig {
  githubRepo: string;
  githubOwner: string;
  postsPath: string;
}