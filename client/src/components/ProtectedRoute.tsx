import { useAuth } from "@/hooks/useAuth";
import { Redirect, useLocation } from "wouter";
import { ReactNode } from "react";
import { AuthModal } from "./AuthModal";

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
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
        <AuthModal
          isOpen={true}
          onClose={() => { }}
          title="Login to Continue"
          description="You need to be logged in to access this feature."
        />
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Protected Content</h2>
          <p className="text-muted-foreground">Please use the login popup to continue.</p>
        </div>
      </div>
    );
  }

  if (user.mustChangePassword && location !== "/profile") {
    return <Redirect to="/profile" />;
  }

  return <>{children}</>;
}
