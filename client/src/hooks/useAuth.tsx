import { createContext, useContext, ReactNode, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

interface ServerUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "admin" | "user";
  currentLevel: number;
  totalPoints: number;
  studyStreak: number;
  isAdmin: boolean;
  isPaidUser: boolean;
  isOwner: boolean;
  adminGranted?: boolean;
  accessExpiry?: string | null;
  openaiTokensUsed?: number;
  username?: string | null;
  mustChangePassword?: boolean;
  avatarUrl?: string | null;
  headline?: string | null;
}

interface User extends ServerUser {
  username: string;
  displayName: string;
  initials: string;
  mustChangePassword?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isImpersonating: boolean;
  refetch: () => void;
  forceRefreshAuth: () => Promise<{ user: User }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeUser = (user: ServerUser): User => {
  const fallbackFromEmail = user.email?.split("@")[0] || "Student";
  const baseName = (user.name && user.name.trim().length > 0 ? user.name : user.username) || fallbackFromEmail;
  const cleanName = baseName.trim();
  const username = user.username && user.username.trim().length > 0 ? user.username : cleanName;
  const normalizedRole = user.role === "user" ? "student" : user.role;

  const initials =
    cleanName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || cleanName.slice(0, 2).toUpperCase() || "ST";

  return {
    ...user,
    role: normalizedRole,
    username,
    displayName: cleanName || fallbackFromEmail,
    initials,
    avatarUrl: user.avatarUrl ?? null,
    headline: user.headline ?? null,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery<{ user: ServerUser; isImpersonating: boolean } | null, Error, { user: User; isImpersonating: boolean } | null>({
    queryKey: ["/api/auth/me"],
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    queryFn: getQueryFn({ on401: "returnNull" }),
    select: (result) => {
      if (!result) return null;
      return {
        user: normalizeUser(result.user),
        isImpersonating: result.isImpersonating || false
      };
    },
  });

  const user = data?.user ?? null;
  const isImpersonating = data?.isImpersonating ?? false;
  const isAuthenticated = !!user;

  const forceRefreshAuth = useCallback(async (): Promise<{ user: User }> => {
    queryClient.removeQueries({ queryKey: ["/api/auth/me"] });

    const response = await fetch("/api/auth/me", { credentials: "include" });
    if (!response.ok) {
      throw new Error("Failed to refresh authentication");
    }
    const freshData = await response.json() as { user: ServerUser };

    queryClient.setQueryData(["/api/auth/me"], freshData);

    return { user: normalizeUser(freshData.user) };
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isImpersonating, refetch, forceRefreshAuth }}>
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
