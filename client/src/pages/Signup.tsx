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
import { SignupForm } from "@/components/auth/SignupForm";

export default function Signup() {
  const [, setLocation] = useLocation();
  const redirectParam = useMemo(() => {
    if (typeof window === "undefined") return null;
    const value = new URLSearchParams(window.location.search).get("redirect");
    return value && value.startsWith("/") ? value : null;
  }, []);

  const handleSuccess = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const plan = searchParams.get("plan");

    if (plan && plan !== "free") {
      setLocation(`/checkout?plan=${plan}`);
    } else if (redirectParam) {
      setLocation(redirectParam);
    } else {
      setLocation("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-md shadow-lg border-primary/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Create your NEET Prep account to start learning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm onSuccess={handleSuccess} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={redirectParam ? `/login?redirect=${encodeURIComponent(redirectParam)}` : "/login"}>
              <a data-testid="link-login" className="text-primary hover:underline font-medium">
                Log in
              </a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
