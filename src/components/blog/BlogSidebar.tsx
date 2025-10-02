import { Home, User, Tags, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/blog";

interface BlogSidebarProps {
  onSelectPost: (post: BlogPost | null) => void;
}

export function BlogSidebar({ onSelectPost }: BlogSidebarProps) {
  const handleHomeClick = () => {
    onSelectPost(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-5 pt-6 border-b border-border whitespace-nowrap">
        <h1 className="text-xl font-semibold text-foreground">sukaseven</h1>
        <p className="text-sm text-blog-meta pb-3">Menu, links and things</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={handleHomeClick}
            className="w-full justify-start text-left hover:bg-secondary/50"
          >
            <Home className="mr-3 h-4 w-4" />
            Super
          </Button>

          <Button variant="ghost" className="w-full justify-start text-left hover:bg-secondary/50">
            <User className="mr-3 h-4 w-4" />
            Meta
          </Button>

          <Button variant="ghost" className="w-full justify-start text-left hover:bg-secondary/50">
            <Tags className="mr-3 h-4 w-4" />
            Tags
            {/* TODO: Implement tags */}
          </Button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-blog-meta">
          This entire thing is in{" "}
          <a href="https://github.com/suka712/sukaseven.com" target="_blank"
            className="text-blue-400 hover:text-blue-500">
            this Github
          </a>
          .
        </p>
      </div>
    </div>
  );
}
