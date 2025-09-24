import { Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogPostListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export function BlogPostList({ posts, onSelectPost }: BlogPostListProps) {
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
    <div className="p-6">
      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="cursor-pointer group"
          >
            <div className="border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-200">
              {/* Title */}
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-blog-meta leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-blog-meta">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(post.date)}
                </div>
                
                {post.author && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                )}
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    {post.tags.slice(0, 2).join(', ')}
                    {post.tags.length > 2 && ` +${post.tags.length - 2}`}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}