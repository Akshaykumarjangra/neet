import { createContext, useContext, ReactNode, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  mustChangePassword?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
  forceRefreshAuth: () => Promise<{ user: User }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery<{ user: User } | null>({
    queryKey: ["/api/auth/me"],
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const user = data?.user ?? null;
  const isAuthenticated = !!user;

  const forceRefreshAuth = useCallback(async (): Promise<{ user: User }> => {
    queryClient.removeQueries({ queryKey: ["/api/auth/me"] });
    
    const response = await fetch("/api/auth/me", { credentials: "include" });
    if (!response.ok) {
      throw new Error("Failed to refresh authentication");
    }
    const freshData = await response.json() as { user: User };
    
    queryClient.setQueryData(["/api/auth/me"], freshData);
    
    return freshData;
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, refetch, forceRefreshAuth }}>
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
