import { useAuth } from "@/hooks/useAuth";
import { Redirect, useLocation } from "wouter";
import { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (user.mustChangePassword && location !== "/profile") {
    return <Redirect to="/profile" />;
  }

  return <>{children}</>;
}
