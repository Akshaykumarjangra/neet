import OpenAI from "openai";
const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export interface OpenAIArgs {
  model: string;
  system?: string;
  prompt: string;
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
}

export async function callOpenAI(a: OpenAIArgs): Promise<{ text: string; json?: unknown; usage?: any }> {
  if (!client) throw new Error("OPENAI_API_KEY missing");
  const messages: any[] = [];
  if (a.system) messages.push({ role: "system", content: a.system });
  messages.push({ role: "user", content: a.prompt });
  const r = await client.chat.completions.create({
    model: a.model,
    messages,
    temperature: a.temperature ?? 0.4,
    max_tokens: a.maxTokens ?? 4096,
    ...(a.json ? { response_format: { type: "json_object" } as any } : {}),
  });
  const text = r.choices[0]?.message?.content ?? "";
  let json: unknown;
  if (a.json) { try { json = JSON.parse(text); } catch {} }
  return { text, json, usage: r.usage };
}
