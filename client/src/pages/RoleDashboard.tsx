import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import GameLobbyDashboard from "@/pages/GameLobbyDashboard";

export default function RoleDashboard() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading || !user) return;
    // Admins can now view the student dashboard (GameLobbyDashboard)
    // Only mentors have a forced separate dashboard
    if (user.role === "mentor") {
      setLocation("/mentor-dashboard");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Only block render for mentors as they are being redirected
  if (user.role === "mentor") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Redirecting to mentor dashboard...
      </div>
    );
  }

  return <GameLobbyDashboard />;
}
