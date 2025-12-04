import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Shield, GraduationCap, Users } from "lucide-react";

const DEMO_ACCOUNTS = [
  {
    role: "Admin",
    email: "admin@demo.com",
    password: "demo123",
    icon: Shield,
    color: "bg-red-500 hover:bg-red-600",
    description: "Full access to manage users, content, and settings"
  },
  {
    role: "Student", 
    email: "student@demo.com",
    password: "demo123",
    icon: GraduationCap,
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Practice questions, view chapters, track progress"
  },
  {
    role: "Mentor",
    email: "mentor@demo.com", 
    password: "demo123",
    icon: Users,
    color: "bg-green-500 hover:bg-green-600",
    description: "Manage availability, sessions, and student bookings"
  }
];

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      return await apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: async () => {
      // Invalidate auth cache to refetch user data
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Login successful",
        description: "Welcome back to NEET Prep!",
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-1/2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Log in to continue your NEET preparation journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-email"
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-password"
                          type="password"
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  data-testid="button-login"
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground text-center w-full">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

        <Card className="w-full lg:w-1/2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold text-center">
              Quick Demo Access
            </CardTitle>
            <CardDescription className="text-center">
              Try the platform instantly with demo accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {DEMO_ACCOUNTS.map((account) => (
              <div
                key={account.role}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${account.color} text-white`}>
                    <account.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Login as {account.role}</h3>
                    <p className="text-xs text-muted-foreground">{account.description}</p>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-md p-3 space-y-1 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span data-testid={`demo-email-${account.role.toLowerCase()}`}>{account.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Password:</span>
                    <span data-testid={`demo-password-${account.role.toLowerCase()}`}>{account.password}</span>
                  </div>
                </div>
                
                <Button
                  data-testid={`button-demo-${account.role.toLowerCase()}`}
                  className={`w-full ${account.color} text-white`}
                  onClick={() => handleDemoLogin(account.email, account.password)}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : `Login as ${account.role}`}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
