import type { ReactNode } from "react";
import { Bug, Leaf } from "lucide-react";

export type BiologySectionName = "Botany" | "Zoology";

const botanyKeywords = [
  "living world",
  "biological classification",
  "plant kingdom",
  "anatomy of flowering plants",
  "transport in plants",
  "morphology of flowering plants",
  "photosynthesis",
  "plant growth",
  "sexual reproduction in flowering plants",
  "ecosystem",
  "biodiversity",
  "conservation",
  "microbes",
  "biotechnology",
  "mineral nutrition",
  "respiration in plants",
  "organisms and populations",
  "environmental",
  "strategies for enhancement",
  "food production",
];

const zoologyKeywords = [
  "animal kingdom",
  "structural organisation in animals",
  "cell",
  "biomolecules",
  "digestion",
  "breathing",
  "body fluids",
  "circulation",
  "excretion",
  "locomotion",
  "movement",
  "neural",
  "human reproduction",
  "reproductive health",
  "evolution",
  "human health",
  "disease",
  "chemical coordination",
  "cell cycle",
  "cell division",
  "inheritance",
  "variation",
  "molecular basis",
];

const class12ZoologyChapters = new Set([3, 4, 7, 8, 10, 11, 12]);
const class12BotanyChapters = new Set([1, 2, 5, 6, 9, 13, 14, 15, 16]);

const normalizeClassLevel = (value?: string | number) => {
  if (value === undefined || value === null) return undefined;
  const raw = String(value).toLowerCase();
  if (raw.includes("12")) return "12";
  if (raw.includes("11")) return "11";
  return undefined;
};

export interface BiologySection {
  name: BiologySectionName;
  icon: ReactNode;
  color: string;
  keywords: string[];
}

export const biologySections: BiologySection[] = [
  {
    name: "Botany",
    icon: <Leaf className="h-5 w-5" />,
    color: "from-green-500 to-emerald-500",
    keywords: botanyKeywords,
  },
  {
    name: "Zoology",
    icon: <Bug className="h-5 w-5" />,
    color: "from-orange-500 to-amber-500",
    keywords: zoologyKeywords,
  },
];

export function categorizeBiologyChapter(
  chapterTitle: string,
  chapterNumber: number,
  classLevel?: string | number
): BiologySectionName {
  const normalizedClass = normalizeClassLevel(classLevel);
  if (normalizedClass === "12") {
    if (class12ZoologyChapters.has(chapterNumber)) return "Zoology";
    if (class12BotanyChapters.has(chapterNumber)) return "Botany";
  }

  const title = chapterTitle.toLowerCase();

  for (const keyword of botanyKeywords) {
    if (title.includes(keyword)) {
      return "Botany";
    }
  }

  for (const keyword of zoologyKeywords) {
    if (title.includes(keyword)) {
      return "Zoology";
    }
  }

  return chapterNumber % 2 === 0 ? "Zoology" : "Botany";
}
