export type ExplainLanguage = "en" | "hi";
export type ExplainMode = "default" | "deep";

export interface ExplainRequest {
  query: string;
  language?: ExplainLanguage;
  mode?: ExplainMode;
}

export interface ExplainCard {
  title?: string;
  formulaLatex?: string;
  imageUrl?: string;
  bullets?: string[];
  steps?: string[];
}

export interface ExplainResponse {
  answer: string;
  language: ExplainLanguage;
  mode?: ExplainMode;
  cards?: ExplainCard[];
  sources?: string[];
  usedModel?: string;
  guardrailReason?: string;
  declined?: boolean;
  usage?: {
    tokens?: number;
    model?: string;
  };
}
