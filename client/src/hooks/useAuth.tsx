import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "admin";
  currentLevel: number;
  totalPoints: number;
  studyStreak: number;
  isAdmin: boolean;
  isPaidUser: boolean;
  isOwner: boolean;
  adminGranted: boolean;
  accessExpiry: string | null;
  openaiTokensUsed: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery<{ user: User } | null>({
    queryKey: ["/api/auth/me"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const user = data?.user ?? null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
