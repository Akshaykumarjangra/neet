import { Router } from "express";
import { z } from "zod";
import OpenAI from "openai";
import type { ExplainResponse, ExplainMode } from "@shared/explain";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

class SimpleLRUCache<K, V> {
  private max: number;
  private cache: Map<K, V>;

  constructor(max: number = 100) {
    this.max = max;
    this.cache = new Map();
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item) {
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.max) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}

const explanationCache = new SimpleLRUCache<string, ExplainResponse>(50);

const router = Router();

const explainSchema = z.object({
  query: z.string().min(3, "Please enter at least 3 characters"),
  language: z.union([z.literal("en"), z.literal("hi")]).default("en"),
  mode: z.union([z.literal("default"), z.literal("deep")]).default("default"),
});

const miniModel = process.env.OPENAI_MINI_MODEL || "gpt-4o-mini";
const fullModel = process.env.OPENAI_FULL_MODEL || "gpt-4o";
const MAX_DEEP_QUERY_LENGTH = 220;
const MAX_QUERY_LENGTH = 600;
const MAX_TOKENS_DEFAULT = 550;
const MAX_TOKENS_DEEP = 900;
const bannedTopics = [
  "stock",
  "crypto",
  "bitcoin",
  "movie",
  "politic",
  "election",
  "recipe",
  "travel",
  "vacation",
  "dating",
  "fashion",
  "celebrity",
  "song",
  "lyrics",
];

function isOffTopic(query: string): boolean {
  const lower = query.toLowerCase();
  return bannedTopics.some((word) => lower.includes(word));
}

router.post("/", async (req, res) => {
  const parsed = explainSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
    return res.status(503).json({ error: "Explainer model is not configured" });
  }

  const { query, language, mode } = parsed.data;
  const selectedMode: ExplainMode = mode || "default";
  const deepRequested = selectedMode === "deep";

  if (query.length > MAX_QUERY_LENGTH) {
    const decline: ExplainResponse = {
      answer:
        language === "hi"
          ? "यह प्रश्न बहुत बड़ा है। कृपया इसे छोटा और केंद्रित रखें।"
          : "This question is too long. Please keep it shorter and focused.",
      language,
      mode: selectedMode,
      declined: true,
      guardrailReason: "query_too_long",
      cards: [],
      sources: ["guardrail"],
      usedModel: miniModel,
    };
    return res.status(200).json(decline);
  }

  if (deepRequested && query.length > MAX_DEEP_QUERY_LENGTH) {
    const decline: ExplainResponse = {
      answer:
        language === "hi"
          ? "डीप मोड छोटे प्रश्नों के लिए है। कृपया इसे छोटा करें।"
          : "Deep mode is for short, focused questions. Please narrow it down.",
      language,
      mode: selectedMode,
      declined: true,
      guardrailReason: "deep_query_too_long",
      cards: [],
      sources: ["guardrail"],
      usedModel: miniModel,
    };
    return res.status(200).json(decline);
  }

  if (isOffTopic(query)) {
    const decline: ExplainResponse = {
      answer:
        language === "hi"
          ? "कृपया केवल NEET सिलेबस (फिजिक्स, केमिस्ट्री, बायोलॉजी) से प्रश्न पूछें।"
          : "Please ask NEET syllabus questions only (Physics, Chemistry, Biology).",
      language,
      mode: selectedMode,
      declined: true,
      guardrailReason: "off_topic",
      cards: [],
      sources: ["guardrail"],
      usedModel: miniModel,
    };
    return res.status(200).json(decline);
  }

  // Check cache
  const cacheKey = `${query}:${language}:${selectedMode}`;
  const cached = explanationCache.get(cacheKey);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached);
  }

  const model = deepRequested ? fullModel : miniModel;
  const maxTokens = deepRequested ? MAX_TOKENS_DEEP : MAX_TOKENS_DEFAULT;

  const systemPrompt = [
    "You are an explainer bot for the NEET exam (Physics, Chemistry, Biology).",
    "Reject or decline anything outside NEET syllabus (Physics, Chemistry, Biology).",
    "No medical advice, no diagnostics, no personal data, no URLs unless provided as safe placeholders.",
    "Use simple, exam-focused language. If language=hi, reply in Hindi; otherwise English.",
    "Keep answers concise; add formulas and 2-4 bullet notes when useful.",
    "If the query is vague or too long, ask for a narrower question instead of guessing.",
    "Never include links except optional 'imageUrl' placeholders like https://example.com/placeholder.png.",
  ].join("\n");

  const userPrompt = `${query}\nLanguage: ${language}\nMode: ${selectedMode}`;

  try {
    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      max_completion_tokens: maxTokens,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            "Return strict JSON with keys: answer (string), cards (array of {title?, bullets?, steps?, formulaLatex?, imageUrl?}), sources (array of strings).",
            "Keep strictly NEET-relevant. If off-topic, respond with { declined: true, guardrailReason: 'off_topic', answer: short polite refusal }.",
            "Query:",
            userPrompt,
          ].join("\n"),
        },
      ],
      temperature: deepRequested ? 0.8 : 0.5,
    });

    const content = completion.choices[0]?.message?.content || "{}";
    let parsedContent: ExplainResponse = {
      answer: "",
      language,
      mode: selectedMode,
      cards: [],
      sources: [],
    };

    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      parsedContent.answer = language === "hi"
        ? "मैं अभी उत्तर तैयार नहीं कर पाया, कृपया दोबारा कोशिश करें।"
        : "I could not format the answer. Please try again.";
      parsedContent.guardrailReason = "parse_error";
    }

    const response: ExplainResponse = {
      ...parsedContent,
      language,
      mode: selectedMode,
      usedModel: model,
      sources: parsedContent.sources?.length ? parsedContent.sources : ["openai"],
      usage: {
        tokens: completion.usage?.total_tokens,
        model,
      },
    };

    return res.json(response);
  } catch (error: any) {
    console.error("Explain route error:", error);
    return res.status(500).json({
      error: error?.message || "Failed to generate explanation",
    });
  }
});

export default router;
