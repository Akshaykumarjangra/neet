import { Link } from "wouter";
import { Home, BookOpen, Trophy, Target, Library, Star } from "lucide-react";

interface QuickNavigationBarProps {
  currentPath: string;
}

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/explore", icon: BookOpen, label: "Learn" },
  { path: "/practice", icon: Target, label: "Practice" },
  { path: "/mock-tests", icon: Star, label: "Tests" },
  { path: "/library", icon: Library, label: "Library" },
  { path: "/achievements", icon: Trophy, label: "Rank" },
];

export function QuickNavigationBar({ currentPath }: QuickNavigationBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-inset-bottom" data-testid="quick-nav">
      <div className="flex justify-around items-center h-16 sm:h-14 max-w-lg mx-auto px-2 sm:px-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = currentPath === path;
          return (
            <Link key={path} href={path}>
              <button
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] sm:min-w-[44px] sm:min-h-[44px] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all touch-manipulation ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted/80"
                }`}
                data-testid={`nav-${label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs font-medium leading-tight">{label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
