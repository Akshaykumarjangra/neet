import { useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { explainTopic } from "@/lib/explainClient";
import type { ExplainCard, ExplainLanguage, ExplainMode } from "@shared/explain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Languages, Loader2, ShieldAlert } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  cards?: ExplainCard[];
  usedModel?: string;
  guardrailReason?: string;
  declined?: boolean;
  usageTokens?: number;
};

const quickPrompts = [
  "Define photosynthesis in simple terms",
  "Explain Newton's second law with an example",
  "How does electric current flow in a circuit?",
  "Balance the equation for combustion of methane",
];

import { Paywall } from "@/components/Paywall";

export default function Explain() {
  const [language, setLanguage] = useState<ExplainLanguage>("en");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ExplainMode>("default");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [errorText, setErrorText] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const explainMutation = useMutation({
    mutationFn: explainTopic,
    onSuccess: (data) => {
      setErrorText(null);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer,
          cards: data.cards,
          usedModel: data.usedModel,
          guardrailReason: data.guardrailReason,
          declined: data.declined,
          usageTokens: data.usage?.tokens,
        },
      ]);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    },
    onError: (error: Error) => {
      setErrorText(error.message || "Failed to get explanation");
    },
  });

  const handleSend = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    if (trimmed.length > 600) {
      setErrorText("Please keep the question under 600 characters.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: trimmed },
    ]);

    explainMutation.mutate({ query: trimmed, language, mode });
    setQuery("");
  };

  const handleDeepDive = (content: string) => {
    setMode("deep");
    explainMutation.mutate({ query: content, language, mode: "deep" });
  };

  const introText = useMemo(
    () =>
      language === "hi"
        ? "किसी भी टॉपिक, कीवर्ड, या सूत्र पर सरल शब्दों में समझाइए। हिंदी/English में पूछें।"
        : "Ask any topic, keyword, or formula. Get simple explanations with examples in English or Hindi.",
    [language],
  );

  return (
    <div className="container mx-auto max-w-5xl p-6 space-y-6">
      <Paywall
        variant="fullpage"
        feature="AI Concept Explainer"
        description="Ask any topic or formula and get instant, simplified explanations in English or Hindi powered by our advanced AI models."
      >
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Explainer Chatbot
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">Explain anything with clarity</h1>
            <p className="text-muted-foreground mt-2">{introText}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              {language === "hi" ? "हिंदी" : "English"}
            </Badge>
            <Button
              variant="secondary"
              onClick={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))}
            >
              Switch to {language === "en" ? "Hindi" : "English"}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ask a question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant={mode === "default" ? "default" : "outline"} className="cursor-pointer" onClick={() => setMode("default")}>
                Concise (mini model)
              </Badge>
              <Badge variant={mode === "deep" ? "default" : "outline"} className="cursor-pointer" onClick={() => setMode("deep")}>
                Deep dive (4o)
              </Badge>
              <Badge variant="outline">NEET-only</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Explain the Doppler effect in simple words"
                rows={3}
              />
              <div className="flex flex-col gap-2">
                <Button onClick={handleSend} disabled={explainMutation.isPending}>
                  {explainMutation.isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking...
                    </span>
                  ) : (
                    "Send"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setMessages([
                      {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        content:
                          "Try asking me to explain any concept, show a formula, or give a step-by-step breakdown.",
                      },
                    ])
                  }
                >
                  Clear
                </Button>
              </div>
            </div>

            {errorText && (
              <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                <ShieldAlert className="h-4 w-4 mt-0.5" />
                <div>{errorText}</div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <Button key={prompt} size="sm" variant="outline" onClick={() => setQuery(prompt)}>
                  {prompt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className="max-h-[480px] overflow-y-auto rounded-lg border p-4 space-y-4 bg-muted/30"
              ref={scrollRef}
            >
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Your answers will appear here. Ask something to begin.
                </p>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg border p-3 ${msg.role === "user" ? "bg-primary/5" : "bg-background"
                    }`}
                >
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                    {msg.role === "user" ? "You" : "Explainer"}
                  </div>
                  <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                  {msg.usedModel && msg.role === "assistant" && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Model: {msg.usedModel}
                      {msg.usageTokens ? ` · Tokens: ${msg.usageTokens}` : ""}
                      {msg.guardrailReason ? ` · Guardrail: ${msg.guardrailReason}` : ""}
                      {msg.declined ? " · Declined" : ""}
                    </div>
                  )}
                  {msg.cards && msg.cards.length > 0 && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {msg.cards.map((card, idx) => (
                        <div key={idx} className="rounded-md border bg-muted/40 p-3">
                          {card.title && <div className="font-semibold text-sm mb-1">{card.title}</div>}
                          {card.formulaLatex && (
                            <div className="font-mono text-sm bg-background rounded p-2 mb-2">
                              {card.formulaLatex}
                            </div>
                          )}
                          {card.bullets && (
                            <ul className="list-disc list-inside text-sm space-y-1">
                              {card.bullets.map((bullet, bulletIdx) => (
                                <li key={bulletIdx}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                          {card.imageUrl && (
                            <img
                              src={card.imageUrl}
                              alt={card.title || "Explanation visual"}
                              className="mt-2 rounded border object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.role === "assistant" && (
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeepDive(msg.content)}
                        disabled={msg.declined}
                      >
                        Deep dive
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>1) Type a topic, keyword, or formula. 2) Choose English or Hindi. 3) Get a concise answer with quick notes or formulas. 4) Use Deep Dive for more detail.</p>
            <p className="text-xs">This is an early preview with stubbed answers; hook it to your preferred model when ready.</p>
          </CardContent>
        </Card>
      </Paywall>
    </div>
  );
}
