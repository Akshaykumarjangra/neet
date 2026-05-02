const HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";

export interface OllamaArgs {
  model: string;
  system?: string;
  prompt: string;
  json?: boolean;
  temperature?: number;
}

export async function callOllama(a: OllamaArgs): Promise<{ text: string; json?: unknown }> {
  const body: any = {
    model: a.model || process.env.OLLAMA_MODEL || "llama3.2:3b",
    prompt: a.prompt,
    stream: false,
    options: { 
      temperature: a.temperature ?? parseFloat(process.env.OLLAMA_TEMPERATURE || "0.2")
    },
  };
  if (a.system) body.system = a.system;
  if (a.json) body.format = "json";
  const r = await fetch(`${HOST}/api/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`ollama ${r.status}: ${await r.text()}`);
  const d = await r.json() as { response: string };
  const text = d.response ?? "";
  let json: unknown;
  if (a.json) { try { json = JSON.parse(text); } catch {} }
  return { text, json };
}
