import { QueryClient, QueryFunction, MutationCache, QueryCache } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const DEFAULT_TIMEOUT_MS = 30_000;

const UNSAFE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
let csrfTokenCache: string | null = null;
let csrfTokenInflight: Promise<string | null> | null = null;

export async function fetchCsrfToken(): Promise<string | null> {
  if (csrfTokenCache) return csrfTokenCache;
  if (csrfTokenInflight) return csrfTokenInflight;
  csrfTokenInflight = (async () => {
    try {
      const res = await fetch("/api/csrf-token", { credentials: "include" });
      if (!res.ok) return null;
      const data = await res.json();
      csrfTokenCache = typeof data?.csrfToken === "string" ? data.csrfToken : null;
      return csrfTokenCache;
    } catch {
      return null;
    } finally {
      csrfTokenInflight = null;
    }
  })();
  return csrfTokenInflight;
}

export function clearCsrfToken() {
  csrfTokenCache = null;
}

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const method = (init.method || "GET").toUpperCase();
    const headers = new Headers(init.headers || {});
    if (UNSAFE_METHODS.has(method)) {
      const token = await fetchCsrfToken();
      if (token && !headers.has("x-csrf-token")) {
        headers.set("x-csrf-token", token);
      }
    }
    let res = await fetch(input, {
      credentials: "include",
      ...init,
      headers,
      signal: controller.signal,
    });
    // If token expired/rotated (e.g. after re-login), retry once.
    if (res.status === 403 && UNSAFE_METHODS.has(method)) {
      const cloned = res.clone();
      let body = "";
      try { body = await cloned.text(); } catch { /* ignore */ }
      if (body.includes("CSRF")) {
        clearCsrfToken();
        const token = await fetchCsrfToken();
        if (token) {
          headers.set("x-csrf-token", token);
          res = await fetch(input, {
            credentials: "include",
            ...init,
            headers,
            signal: controller.signal,
          });
        }
      }
    }
    return res;
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
    onError: (error: unknown, query) => {
      // Only show toast if we haven't suppressed it in meta
      if (query?.meta?.errorMessage !== false) {
        const message = error instanceof Error ? error.message : "Something went wrong";
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
    onError: (error: unknown, _variables, _context, mutation) => {
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
      retry: (failureCount, error: unknown) => {
        const message = error instanceof Error ? error.message : "";
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
