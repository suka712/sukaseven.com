import { BlogPost, BlogConfig } from '@/types/blog';

// Demo configuration - users can customize this
const config: BlogConfig = {
  githubOwner: 'suka712', // Replace with your GitHub username
  githubRepo: 'sukaseven.com', // Replace with your blog posts repo
  postsPath: 'posts' // Path to posts in the repo
};

// Extract frontmatter from markdown content
function parseFrontmatter(content: string): { metadata: any; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, content };
  }
  
  const frontmatter = match[1];
  const markdownContent = match[2];
  
  // Simple YAML parser for basic frontmatter
  const metadata: any = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  });
  
  return { metadata, content: markdownContent };
}

// Generate excerpt from content
function generateExcerpt(content: string, length = 150): string {
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .trim();
  
  return cleanContent.length > length 
    ? cleanContent.substring(0, length) + '...'
    : cleanContent;
}

// Fetch posts from GitHub API (or local storage for demo)
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // Try to fetch from GitHub first
    const response = await fetch(
      `https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/contents/${config.postsPath}`
    );
    
    if (response.ok) {
      const files = await response.json();
      const markdownFiles = files.filter((file: any) => file.name.endsWith('.md'));
      
      const posts = await Promise.all(
        markdownFiles.map(async (file: any) => {
          const contentResponse = await fetch(file.download_url);
          const content = await contentResponse.text();
          const { metadata, content: markdownContent } = parseFrontmatter(content);
          
          const slug = file.name.replace('.md', '');
          
          return {
            id: slug,
            slug,
            title: metadata.title || slug.replace(/-/g, ' '),
            content: markdownContent,
            excerpt: metadata.excerpt || generateExcerpt(markdownContent),
            date: metadata.date || new Date().toISOString().split('T')[0],
            author: metadata.author || 'Anonymous',
            tags: metadata.tags ? metadata.tags.split(',').map((tag: string) => tag.trim()) : []
          };
        })
      );
      
      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      throw new Error('GitHub fetch failed');
    }
  } catch (error) {
    console.warn('Failed to fetch from GitHub, using demo posts:', error);
    
    // Fallback to demo posts
    return getDemoPosts();
  }
}

// Demo posts for initial setup
function getDemoPosts(): BlogPost[] {
  return [
    {
      id: 'welcome-to-my-blog',
      slug: 'welcome-to-my-blog',
      title: 'Welcome to My Blog',
      content: `# Welcome to My Blog

This is my first blog post! I'm excited to share my thoughts and ideas with you.

## Getting Started

This blog is built with React and fetches content from GitHub. Here are some features:

- **Markdown support** with syntax highlighting
- **Responsive design** that works on all devices
- **Resizable panels** for a customizable reading experience
- **Clean, minimal design** focused on readability

## What's Next?

I plan to write about:
- Web development techniques
- Creative projects and drawings
- Technology trends
- Personal experiences

Stay tuned for more content!`,
      excerpt: 'Welcome to my new blog! This is my first post where I introduce the blog and share what\'s coming next.',
      date: '2024-01-15',
      author: 'Blog Author',
      tags: ['welcome', 'introduction']
    },
    {
      id: 'markdown-features',
      slug: 'markdown-features',
      title: 'Exploring Markdown Features',
      content: `# Markdown Features Demo

This post demonstrates various markdown features supported by this blog.

## Text Formatting

You can use **bold text**, *italic text*, and \`inline code\`.

## Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## Lists

### Unordered List
- First item
- Second item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Quotes

> "The best way to predict the future is to create it." - Peter Drucker

## Links

Check out [React](https://reactjs.org) for building user interfaces.

This blog supports all these features and more!`,
      excerpt: 'A comprehensive guide to the markdown features supported by this blog, including code blocks, lists, and formatting.',
      date: '2024-01-10',
      author: 'Blog Author',
      tags: ['markdown', 'tutorial', 'features']
    },
    {
      id: 'responsive-design',
      slug: 'responsive-design',
      title: 'Building Responsive Layouts',
      content: `# Building Responsive Layouts

Creating layouts that work well on all devices is crucial for modern web development.

## Key Principles

### Mobile-First Approach
Start designing for mobile devices and progressively enhance for larger screens.

### Flexible Grids
Use CSS Grid and Flexbox for flexible, responsive layouts.

### Responsive Typography
Scale text appropriately across different screen sizes.

## This Blog's Layout

This blog demonstrates responsive design with:
- Three-panel layout on desktop
- Single-column layout on mobile
- Resizable panels for user customization
- Optimized typography for readability

The layout automatically adapts to provide the best reading experience on any device.`,
      excerpt: 'Learn about responsive design principles and how this blog implements them for an optimal reading experience.',
      date: '2024-01-05',
      author: 'Blog Author',
      tags: ['design', 'responsive', 'css']
    }
  ];
}

export { config as blogConfig };