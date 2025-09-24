import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { BlogSidebar } from './BlogSidebar';
import { BlogMain } from './BlogMain';
import { BlogHighlights } from './BlogHighlights';
import { BlogPost } from '@/types/blog';
import { useIsMobile } from '@/hooks/use-mobile';

interface BlogLayoutProps {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  onSelectPost: (post: BlogPost | null) => void;
}

export function BlogLayout({ posts, selectedPost, onSelectPost }: BlogLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarSize, setSidebarSize] = useState(20);
  const [highlightsSize, setHighlightsSize] = useState(25);

  // Mobile view - show only main content
  if (isMobile) {
    return (
      <div className="h-screen overflow-hidden">
        <BlogMain 
          posts={posts}
          selectedPost={selectedPost}
          onSelectPost={onSelectPost}
          isMobile={true}
        />
      </div>
    );
  }

  // Desktop three-panel layout
  return (
    <div className="h-screen overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        {/* Left Sidebar */}
        <ResizablePanel
          defaultSize={sidebarSize}
          minSize={15}
          maxSize={40}
          onResize={setSidebarSize}
          className="bg-panel-sidebar border-r border-border"
        >
          <BlogSidebar onSelectPost={onSelectPost} />
        </ResizablePanel>

        <ResizableHandle className="resize-handle w-1" />

        {/* Main Content */}
        <ResizablePanel
          defaultSize={100 - sidebarSize - highlightsSize}
          minSize={30}
          className="bg-panel-main"
        >
          <BlogMain 
            posts={posts}
            selectedPost={selectedPost}
            onSelectPost={onSelectPost}
          />
        </ResizablePanel>

        <ResizableHandle className="resize-handle w-1" />

        {/* Right Highlights */}
        <ResizablePanel
          defaultSize={highlightsSize}
          minSize={15}
          maxSize={40}
          onResize={setHighlightsSize}
          className="bg-panel-highlight border-l border-border"
        >
          <BlogHighlights 
            posts={posts.slice(0, 3)}
            onSelectPost={onSelectPost}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}