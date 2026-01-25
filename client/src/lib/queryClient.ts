import { QueryClient, QueryFunction, MutationCache, QueryCache } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const DEFAULT_TIMEOUT_MS = 30_000;

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { credentials: "include", ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
  options?: { timeoutMs?: number },
): Promise<any> {
  const res = await fetchWithTimeout(
    url,
    {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
    },
    options?.timeoutMs,
  );

  await throwIfResNotOk(res);

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  }

  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
      const res = await fetchWithTimeout(queryKey.join("/") as string);

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    };

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      // Only show toast if we haven't suppressed it in meta
      if (query?.meta?.errorMessage !== false) {
        const message = error?.message || "Something went wrong";
        if (message.startsWith("401") || message.startsWith("403")) return; // Handle auth errors silently or via redirect

        // Avoid spamming toasts for background refetches
        if (query.state.data !== undefined) return;

        toast({
          variant: "destructive",
          title: "Error",
          description: message,
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any, _variables, _context, mutation) => {
      // Only show toast if we haven't suppressed it in meta
      if (mutation?.meta?.errorMessage !== false) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error?.message || "Action failed",
        });
      }
    },
  }),
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error: any) => {
        const message = typeof error?.message === "string" ? error.message : "";
        const isClientError = message.startsWith("4");
        return failureCount < 2 && !isClientError;
      },
      retryDelay: (attempt) => 500 + Math.random() * 500 * attempt,
    },
    mutations: {
      retry: false,
    },
  },
});
