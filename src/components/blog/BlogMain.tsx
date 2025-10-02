import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/types/blog';
import { BlogPostList } from './BlogPostList';
import { BlogPostView } from './BlogPostView';

interface BlogMainProps {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  onSelectPost: (post: BlogPost | null) => void;
  isMobile?: boolean;
}

export function BlogMain({ posts, selectedPost, onSelectPost, isMobile = false }: BlogMainProps) {
  if (selectedPost) {
    return (
      <div className="h-full flex flex-col">
        {/* Header with back button */}
        <div className="border-b border-border p-8 pt-9 pl-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectPost(null)}
            className="hover:bg-secondary/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isMobile ? 'Back' : 'Back to Posts'}
          </Button>
        </div>

        {/* Post content */}
        <div className="flex-1 overflow-auto">
          <BlogPostView post={selectedPost} />
        </div>
      </div>
    );
  }

  // Show post list
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-6 whitespace-nowrap">
        <h1 className="text-xl font-bold text-foreground">
          Suka's Journal of super advanced tech
        </h1>
        <p className="text-blog-meta mt-1">
          Guides to building missles and such.
        </p>
      </div>

      {/* Posts list */}
      <div className="flex-1 overflow-auto">
        <BlogPostList posts={posts} onSelectPost={onSelectPost} />
      </div>
    </div>
  );
}