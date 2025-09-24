import { Clock } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogHighlightsProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export function BlogHighlights({ posts, onSelectPost }: BlogHighlightsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">
          Recent Posts
        </h2>
        <p className="text-sm text-blog-meta mt-1">
          Latest updates
        </p>
      </div>

      {/* Highlights list */}
      <div className="flex-1 p-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-accent/30 cursor-pointer transition-all duration-200 group"
            >
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-blog-meta line-clamp-3 mb-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-xs text-blog-meta">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(post.date)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}