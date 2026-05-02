const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

export interface GeminiArgs {
  model: string;
  system?: string;
  prompt: string;
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
  images?: string[]; // URLs or base64 data: URIs
}

export async function callGemini(a: GeminiArgs): Promise<{ text: string; json?: unknown; usage?: any }> {
  if (!KEY) throw new Error("GEMINI_API_KEY missing");
  const parts: any[] = [{ text: a.prompt }];
  for (const img of a.images ?? []) {
    if (img.startsWith("data:")) {
      const [meta, data] = img.split(",");
      const mime = meta.match(/data:(.*?);base64/)?.[1] ?? "image/png";
      parts.push({ inline_data: { mime_type: mime, data } });
    } else {
      parts.push({ file_data: { file_uri: img } });
    }
  }
  const body: any = {
    contents: [{ role: "user", parts }],
    generationConfig: {
      temperature: a.temperature ?? 0.4,
      maxOutputTokens: a.maxTokens ?? 4096,
      ...(a.json ? { responseMimeType: "application/json" } : {}),
    },
  };
  if (a.system) body.systemInstruction = { parts: [{ text: a.system }] };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${a.model}:generateContent?key=${KEY}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`gemini ${r.status}: ${await r.text()}`);
  const d = await r.json() as any;
  const text: string = d.candidates?.[0]?.content?.parts?.map((p: any) => p.text ?? "").join("") ?? "";
  const usage = d.usageMetadata ? { in: d.usageMetadata.promptTokenCount, out: d.usageMetadata.candidatesTokenCount } : undefined;
  let json: unknown;
  if (a.json) { try { json = JSON.parse(text); } catch {} }
  return { text, json, usage };
}
