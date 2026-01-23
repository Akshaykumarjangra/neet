import type { ExplainRequest, ExplainResponse } from "@shared/explain";

export async function explainTopic(payload: ExplainRequest): Promise<ExplainResponse> {
  const response = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to get explanation");
  }

  return response.json();
}
