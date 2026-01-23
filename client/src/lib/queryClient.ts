import { QueryClient, QueryFunction } from "@tanstack/react-query";

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
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes - garbage collection time for cache
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
