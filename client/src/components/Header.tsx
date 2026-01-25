import { useState } from "react";
import { Moon, Sun, Trophy, Flame, Home, Menu, LogOut, User, GraduationCap, Users, Play, Shield, Search, ChartBar, MessageSquare, Bell, Layers, Check, Calendar, Crown } from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { queryClient } from "@/lib/queryClient";

interface HeaderProps {
  activeSubject?: string;
  onSubjectChange?: (subject: string) => void;
  userPoints?: number;
  userLevel?: number;
  studyStreak?: number;
}

import "./Header.css";

export function Header({
  activeSubject,
  onSubjectChange = () => { },
  userPoints = 2450,
  userLevel = 12,
  studyStreak = 7,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user, isImpersonating } = useAuth();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const [location, setLocation] = useLocation();
  const subjects = ["Physics", "Chemistry", "Botany", "Zoology"];
  const inferredSubject =
    subjects.find((subject) => location.startsWith(`/${subject.toLowerCase()}`)) ?? undefined;
  const resolvedSubject = activeSubject ?? inferredSubject ?? "Physics";
  const canAccessAdmin = Boolean(user?.isOwner || user?.isAdmin || user?.role === "admin");
  const navPublic = [
    { label: "Home", href: "/" },
    { label: "Chapters", href: "/preview/chapter" },
    { label: "Mock Tests", href: "/preview/mock-test" },
    { label: "Simulations", href: "/preview/simulations" },
    { label: "Pricing", href: "/pricing" },
    { label: "Mentors", href: "/mentors" },
    { label: "Community", href: "/community" },
  ];

  const handleProfileSwitch = (path: string) => {
    setLocation(path);
  };

  // Helper to check if current location matches a route pattern
  const isActiveRoute = (route: string) => {
    if (route === '/dashboard') {
      return location === '/' || location === '/dashboard' || location.startsWith('/dashboard');
    }
    return location === route || location.startsWith(route + '/');
  };

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
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      queryClient.setQueryData(["/api/auth/me"], null);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setLocation('/login');
    }
  };

  const handleStopImpersonation = async () => {
    try {
      await fetch("/api/admin/impersonate/stop", { method: "POST" });
      window.location.href = '/admin'; // Hard reload to clear state and return to admin
    } catch (error) {
      console.error("Failed to stop impersonation:", error);
    }
  };

  return (
    <header className="header">
      {isImpersonating && (
        <div className="impersonation-banner">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Viewing as {user?.displayName} ({user?.role})
          </span>
          <Button
            variant="secondary"
            size="sm"
            className="h-7 text-xs bg-white text-[var(--status-busy)] hover:bg-orange-50 border-0"
            onClick={handleStopImpersonation}
          >
            Exit View
          </Button>
        </div>
      )}
      <div className="header-container">
        <div className="logo-section" onClick={handleHomeClick}>
          <div className="logo-box">
            NP
          </div>
          <h1 className="logo-text hidden sm:block">NEET Prep</h1>
        </div>

        <nav className="hidden md:flex flex-1 items-center gap-1 ml-6">
          {user ? (
            <>
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={resolvedSubject === subject ? "default" : "ghost"}
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
              <Button
                variant={location === '/chat' ? "default" : "ghost"}
                size="sm"
                onClick={() => setLocation('/chat')}
                data-testid="button-chat"
                className="[&>*]:!border-b-0 after:!hidden before:!hidden"
                style={{ borderBottom: 'none !important' }}
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                Chat
              </Button>
              <Button
                variant={location === '/progress/analytics' ? "default" : "ghost"}
                size="sm"
                onClick={() => setLocation('/progress/analytics')}
                data-testid="button-analytics"
                className="[&>*]:!border-b-0 after:!hidden before:!hidden"
                style={{ borderBottom: 'none !important' }}
              >
                <ChartBar className="h-4 w-4 mr-1.5" />
                Analytics
              </Button>
              {canAccessAdmin && (
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
            </>
          ) : (
            navPublic.map((link) => (
              <Button
                key={link.href}
                variant={location === link.href ? "default" : "ghost"}
                size="sm"
                onClick={() => setLocation(link.href)}
                className="[&>*]:!border-b-0 after:!hidden before:!hidden"
                style={{ borderBottom: 'none !important' }}
              >
                {link.label}
              </Button>
            ))
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
              {user ? (
                <>
                  {subjects.map((subject) => (
                    <DropdownMenuItem
                      key={subject}
                      onClick={() => handleSubjectClick(subject)}
                      className={resolvedSubject === subject ? "bg-accent" : ""}
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
                  {canAccessAdmin && (
                    <DropdownMenuItem
                      onClick={() => setLocation('/admin')}
                      className={location.startsWith('/admin') ? "bg-accent" : ""}
                      data-testid="menu-mobile-admin"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </DropdownMenuItem>
                  )}
                </>
              ) : (
                navPublic.map((link) => (
                  <DropdownMenuItem
                    key={link.href}
                    onClick={() => setLocation(link.href)}
                    className={location === link.href ? "bg-accent" : ""}
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {user && (
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
              {user.isPaidUser && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-2 py-1 gap-1">
                  <Crown className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/search')}
            data-testid="button-search"
            className="hover:bg-accent"
          >
            <Search className="h-5 w-5" />
          </Button>

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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity" data-testid="avatar-user">
                  <AvatarImage src={user?.avatarUrl || ""} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.initials || "ST"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={user?.avatarUrl || ""} />
                    <AvatarFallback>{user?.initials || "ST"}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold leading-tight">{user?.displayName || "Student"}</div>
                    <div className="text-xs text-muted-foreground leading-tight">
                      {user?.headline?.trim() || "Add a headline"}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger data-testid="menu-switch-profile">
                    <Layers className="mr-2 h-4 w-4" />
                    Switch View
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => handleProfileSwitch('/dashboard')}
                      className={isActiveRoute('/dashboard') ? "bg-accent" : ""}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Student View
                      {isActiveRoute('/dashboard') && <Check className="h-4 w-4 ml-auto" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleProfileSwitch('/mentor-dashboard')}
                      className={isActiveRoute('/mentor-dashboard') ? "bg-accent" : ""}
                    >
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Mentor Dashboard
                      {isActiveRoute('/mentor-dashboard') && <Check className="h-4 w-4 ml-auto" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleProfileSwitch('/admin')}
                      disabled={!canAccessAdmin}
                      className={isActiveRoute('/admin') ? "bg-accent" : ""}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Hub
                      {isActiveRoute('/admin') && <Check className="h-4 w-4 ml-auto" />}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocation('/profile')} data-testid="menu-profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/my-bookings')} data-testid="menu-my-bookings">
                  <Calendar className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/mentor-dashboard')} data-testid="menu-mentor-dashboard">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Mentor Dashboard
                </DropdownMenuItem>
                {canAccessAdmin && (
                  <DropdownMenuItem onClick={() => setLocation('/admin')} data-testid="menu-admin">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Hub
                  </DropdownMenuItem>
                )}
                {canAccessAdmin && (
                  <DropdownMenuItem onClick={() => setLocation('/admin/lms-studio')} data-testid="menu-lms-studio">
                    <Layers className="mr-2 h-4 w-4" />
                    LMS Studio
                  </DropdownMenuItem>
                )}
                {canAccessAdmin && (
                  <DropdownMenuItem onClick={() => setLocation('/admin/mentor-automation')} data-testid="menu-mentor-automation">
                    <Trophy className="mr-2 h-4 w-4" />
                    Mentor Automations
                  </DropdownMenuItem>
                )}
                {canAccessAdmin && (
                  <DropdownMenuItem onClick={() => setLocation('/admin/announcements')} data-testid="menu-announcements">
                    <Bell className="mr-2 h-4 w-4" />
                    Announcements
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setLocation('/login')} data-testid="button-login">
                Log in
              </Button>
              <Button onClick={() => setLocation('/signup')} data-testid="button-start-free">
                Start free
              </Button>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
