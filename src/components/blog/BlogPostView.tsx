import { Calendar, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { BlogPost } from '@/types/blog';

interface BlogPostViewProps {
  post: BlogPost;
}

export function BlogPostView({ post }: BlogPostViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>
        
        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-blog-meta pb-6 border-b border-blog-divider">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(post.date)}
          </div>
          
          {post.author && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-accent rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Custom link styling
            a: ({ children, href, ...props }) => (
              <a
                href={href}
                {...props}
                className="text-blog-link hover:text-blog-link-hover underline-offset-4 hover:underline transition-colors"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            // Custom heading styling
            h1: ({ children, ...props }) => (
              <h1 {...props} className="text-2xl font-bold text-foreground mt-8 mb-4 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children, ...props }) => (
              <h2 {...props} className="text-xl font-semibold text-foreground mt-6 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children, ...props }) => (
              <h3 {...props} className="text-lg font-semibold text-foreground mt-5 mb-2">
                {children}
              </h3>
            ),
            // Custom paragraph spacing
            p: ({ children, ...props }) => (
              <p {...props} className="text-foreground leading-relaxed mb-4">
                {children}
              </p>
            ),
            // Custom list styling
            ul: ({ children, ...props }) => (
              <ul {...props} className="text-foreground space-y-1 mb-4 pl-6">
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol {...props} className="text-foreground space-y-1 mb-4 pl-6">
                {children}
              </ol>
            )
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}