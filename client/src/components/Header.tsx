import { Moon, Sun, Trophy, Flame, Home, Menu, LogOut, User, GraduationCap, Users, Play, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "./ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { queryClient } from "@/lib/queryClient";

interface HeaderProps {
  activeSubject?: string;
  onSubjectChange?: (subject: string) => void;
  userPoints?: number;
  userLevel?: number;
  studyStreak?: number;
}

export function Header({
  activeSubject = "Physics",
  onSubjectChange = () => { },
  userPoints = 2450,
  userLevel = 12,
  studyStreak = 7,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const [location, setLocation] = useLocation();
  const subjects = ["Physics", "Chemistry", "Biology"];

  const handleSubjectClick = (subject: string) => {
    console.log(`${subject} clicked`);
    onSubjectChange(subject);
    setLocation(`/${subject.toLowerCase()}`);
  };

  const handleHomeClick = () => {
    console.log('Home clicked');
    setLocation('/');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setLocation('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/20 bg-background/95 backdrop-blur-sm shadow-lg">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleHomeClick}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            NP
          </div>
          <h1 className="hidden sm:block text-lg font-bold">NEET Prep</h1>
        </div>

        <nav className="hidden md:flex flex-1 items-center gap-1 ml-6">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={activeSubject === subject ? "default" : "ghost"}
              size="sm"
              onClick={() => handleSubjectClick(subject)}
              data-testid={`button-subject-${subject.toLowerCase()}`}
              className="[&>*]:!border-b-0 after:!hidden before:!hidden"
              style={{ borderBottom: 'none !important' }}
            >
              {subject}
            </Button>
          ))}
          <div className="h-4 w-px bg-border mx-2" />
          <Button
            variant={location === '/community' ? "default" : "ghost"}
            size="sm"
            onClick={() => setLocation('/community')}
            data-testid="button-community"
            className="[&>*]:!border-b-0 after:!hidden before:!hidden"
            style={{ borderBottom: 'none !important' }}
          >
            <Users className="h-4 w-4 mr-1.5" />
            Community
          </Button>
          <Button
            variant={location === '/simulations' ? "default" : "ghost"}
            size="sm"
            onClick={() => setLocation('/simulations')}
            data-testid="button-simulations"
            className="[&>*]:!border-b-0 after:!hidden before:!hidden"
            style={{ borderBottom: 'none !important' }}
          >
            <Play className="h-4 w-4 mr-1.5" />
            Simulations
          </Button>
          {user?.isAdmin && (
            <>
              <div className="h-4 w-px bg-border mx-2" />
              <Button
                variant={location.startsWith('/admin') ? "default" : "ghost"}
                size="sm"
                onClick={() => setLocation('/admin')}
                data-testid="button-admin"
                className="[&>*]:!border-b-0 after:!hidden before:!hidden"
                style={{ borderBottom: 'none !important' }}
              >
                <Shield className="h-4 w-4 mr-1.5" />
                Admin
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {subjects.map((subject) => (
                <DropdownMenuItem
                  key={subject}
                  onClick={() => handleSubjectClick(subject)}
                  className={activeSubject === subject ? "bg-accent" : ""}
                  data-testid={`menu-mobile-${subject.toLowerCase()}`}
                >
                  {subject}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => setLocation('/community')}
                className={location === '/community' ? "bg-accent" : ""}
                data-testid="menu-mobile-community"
              >
                <Users className="h-4 w-4 mr-2" />
                Community
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLocation('/simulations')}
                className={location === '/simulations' ? "bg-accent" : ""}
                data-testid="menu-mobile-simulations"
              >
                <Play className="h-4 w-4 mr-2" />
                Simulations
              </DropdownMenuItem>
              {user?.isAdmin && (
                <DropdownMenuItem
                  onClick={() => setLocation('/admin')}
                  className={location.startsWith('/admin') ? "bg-accent" : ""}
                  data-testid="menu-mobile-admin"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer" onClick={() => setLocation('/practice')}>
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold" data-testid="text-streak">{studyStreak}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer" onClick={() => setLocation('/practice')}>
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-semibold" data-testid="text-points">{userPoints.toLocaleString()}</span>
            </div>

            <Badge variant="secondary" className="px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity" data-testid="badge-level" onClick={() => setLocation('/practice')}>
              Level {userLevel}
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="hover:bg-accent"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity" data-testid="avatar-user">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.username?.slice(0, 2).toUpperCase() || "AB"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLocation('/profile')} data-testid="menu-profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation('/mentor-dashboard')} data-testid="menu-mentor-dashboard">
                <GraduationCap className="mr-2 h-4 w-4" />
                Mentor Dashboard
              </DropdownMenuItem>
              {user?.isAdmin && (
                <DropdownMenuItem onClick={() => setLocation('/admin')} data-testid="menu-admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Hub
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
