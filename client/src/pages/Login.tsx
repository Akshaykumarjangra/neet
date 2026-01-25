import { useMemo } from "react";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "wouter";
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  const [, setLocation] = useLocation();
  const redirectParam = useMemo(() => {
    if (typeof window === "undefined") return null;
    const value = new URLSearchParams(window.location.search).get("redirect");
    return value && value.startsWith("/") ? value : null;
  }, []);

  const handleSuccess = (user: any) => {
    if (redirectParam) {
      setLocation(redirectParam);
      return;
    }
    if (user?.mustChangePassword) {
      setLocation("/profile");
      return;
    }
    const isAdmin = Boolean(user?.isOwner || user?.isAdmin || user?.role === "admin");
    const destination = isAdmin ? "/admin" : user?.role === "mentor" ? "/mentor-dashboard" : "/dashboard";
    setLocation(destination);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg border-primary/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Log in to continue your NEET preparation journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSuccess={handleSuccess} />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground text-center w-full">
              Don't have an account?{" "}
              <Link
                href={redirectParam ? `/signup?redirect=${encodeURIComponent(redirectParam)}` : "/signup"}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
