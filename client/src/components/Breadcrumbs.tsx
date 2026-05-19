import { Link, useLocation } from "wouter";
import { ChevronRight, Home as HomeIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function Breadcrumbs() {
  const [location] = useLocation();
  const { user } = useAuth();
  
  if (location === "/" || location === "/login" || location === "/signup") {
    return null;
  }

  const pathnames = location.split("/").filter((x) => x);
  const homeLink = user ? "/dashboard" : "/";

  return (
    <div className="sticky top-0 z-40 w-full bg-background/50 backdrop-blur-xl border-b border-primary/10">
      <nav className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground italic overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Link href={homeLink} className="hover:text-primary transition-all flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-black transition-all">
            <HomeIcon className="h-3.5 w-3.5" />
          </div>
          <span className="font-bold tracking-tight">ZERO AI</span>
        </Link>
        
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <div key={to} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 opacity-30 text-primary" />
              {last ? (
                <span className="font-bold text-primary glow-text capitalize bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
                  {value.replace(/-/g, " ")}
                </span>
              ) : (
                <Link 
                  href={to} 
                  className="hover:text-primary transition-colors capitalize px-2 py-1 rounded-md hover:bg-primary/5"
                >
                  {value.replace(/-/g, " ")}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
