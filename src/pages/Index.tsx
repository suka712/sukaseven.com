import { useState, useEffect } from 'react';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { BlogPost } from '@/types/blog';
import { fetchBlogPosts } from '@/lib/blog';

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await fetchBlogPosts();
        setPosts(blogPosts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-blog-meta">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-destructive">Error</h1>
          <p className="text-blog-meta">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <BlogLayout
      posts={posts}
      selectedPost={selectedPost}
      onSelectPost={setSelectedPost}
    />
  );
};

export default Index;
