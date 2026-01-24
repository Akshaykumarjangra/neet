import { useMemo, useState } from "react";
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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["student", "mentor"]).default("student"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const redirectParam = useMemo(() => {
    if (typeof window === "undefined") return null;
    const value = new URLSearchParams(window.location.search).get("redirect");
    return value && value.startsWith("/") ? value : null;
  }, []);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: Omit<SignupForm, "confirmPassword">) => {
      return await apiRequest("POST", "/api/auth/signup", data);
    },
    onSuccess: async () => {
      // Invalidate auth cache to refetch user data
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Account created",
        description: "Welcome to NEET Prep! Let's start studying.",
      });

      const searchParams = new URLSearchParams(window.location.search);
      const plan = searchParams.get("plan");

      if (plan && plan !== "free") {
        setLocation(`/checkout?plan=${plan}`);
      } else if (redirectParam) {
        setLocation(redirectParam);
      } else {
        setLocation("/dashboard");
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "Failed to create account. Please try again.",
      });
    },
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...signupData } = data;
      await signupMutation.mutateAsync(signupData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Create your NEET Prep account to start learning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="input-name"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        placeholder="Create a password (min 8 characters)"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="input-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>I am a...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="student" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Student (Prepare for NEET)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mentor" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Mentor (Help students learn)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                data-testid="button-signup"
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </Form>
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
