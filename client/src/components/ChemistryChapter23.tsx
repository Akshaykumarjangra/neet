
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, TestTubes, Zap, Atom , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter23Topics: Topic[] = [
  {
    id: "classification-nomenclature",
    title: "Classification and Nomenclature",
    description: "Types of amines and systematic naming conventions.",
    keyPoints: [
      "Amines: Derivatives of ammonia (NH₃) with H replaced by alkyl/aryl",
      "Primary (1°): R-NH₂ (one alkyl group)",
      "Secondary (2°): R₂NH (two alkyl groups)",
      "Tertiary (3°): R₃N (three alkyl groups)",
      "Aliphatic amines: Alkyl groups attached to N",
      "Aromatic amines: Aryl groups attached to N (aniline)",
      "IUPAC: Replace 'e' of alkane with 'amine'",
      "Common names: Methylamine, Dimethylamine, Trimethylamine"
    ],
    examples: [
      "CH₃NH₂: Methanamine (methylamine) - 1°",
      "(CH₃)₂NH: N-Methylmethanamine (dimethylamine) - 2°",
      "(CH₃)₃N: N,N-Dimethylmethanamine (trimethylamine) - 3°",
      "C₆H₅NH₂: Benzenamine (aniline) - aromatic 1°",
      "C₂H₅NH₂: Ethanamine (ethylamine) - 1°",
      "CH₃-NH-C₂H₅: N-Methylethanamine - 2°"
    ]
  },
  {
    id: "preparation",
    title: "Preparation of Amines",
    description: "Various methods to synthesize primary, secondary, and tertiary amines.",
    keyPoints: [
      "Reduction of nitro compounds: R-NO₂ + 6[H] → R-NH₂",
      "Reduction of nitriles: R-CN + 4[H] → R-CH₂-NH₂",
      "Ammonolysis of alkyl halides: R-X + NH₃ → R-NH₂ (mixture)",
      "Gabriel phthalimide synthesis: Gives pure 1° amine",
      "Hoffmann bromamide degradation: R-CONH₂ + Br₂/NaOH → R-NH₂",
      "Reduction of amides: R-CONH₂ + LiAlH₄ → R-CH₂-NH₂",
      "Reductive amination: R-CHO + NH₃ + H₂/Ni → R-CH₂-NH₂",
      "Aromatic: Reduction of nitrobenzene to aniline"
    ],
    examples: [
      "C₆H₅NO₂ + 6[H]/Sn-HCl → C₆H₅NH₂ (aniline)",
      "CH₃CN + 4[H]/LiAlH₄ → CH₃CH₂NH₂",
      "CH₃Br + NH₃ → CH₃NH₂ (+ 2° and 3° amines)",
      "CH₃CONH₂ + Br₂/NaOH → CH₃NH₂ (Hoffmann)",
      "Gabriel: C₆H₅CH₂Br → C₆H₅CH₂NH₂ (pure)"
    ],
    formulas: [
      "R-NO₂ + 3Sn + 7HCl → R-NH₃⁺Cl⁻ + 3SnCl₂ + 2H₂O",
      "R-CONH₂ + Br₂ + 4NaOH → R-NH₂ + Na₂CO₃ + 2NaBr + 2H₂O"
    ]
  },
  {
    id: "physical-properties",
    title: "Physical Properties",
    description: "Characteristics including boiling points, solubility, and odor.",
    keyPoints: [
      "Lower amines: Fishy smell, soluble in water (H-bonding)",
      "Aniline: Oily liquid, slightly soluble in water",
      "Boiling point: 1° > 2° > 3° (H-bonding decreases)",
      "1° and 2° can form H-bonds (have N-H bonds)",
      "3° cannot form H-bonds with each other (no N-H)",
      "Amines basic (electron pair on N)",
      "Solubility decreases with increasing molecular mass",
      "Aniline toxic, causes methemoglobinemia"
    ],
    examples: [
      "CH₃NH₂: BP 267 K, fishy odor, water soluble",
      "(CH₃)₂NH: BP 280 K, H-bonding reduced",
      "(CH₃)₃N: BP 276 K, no H-bonding between molecules",
      "C₆H₅NH₂: BP 457 K, oily liquid, toxic"
    ]
  },
  {
    id: "basicity",
    title: "Basicity of Amines",
    description: "Comparing basic strength of different amines and factors affecting basicity.",
    keyPoints: [
      "Amines act as Lewis bases (donate electron pair)",
      "Aliphatic amines > NH₃ > Aromatic amines (basicity)",
      "Electron-donating groups (+I) increase basicity",
      "Electron-withdrawing groups (-I, -R) decrease basicity",
      "In aromatic amines: Lone pair delocalized into ring",
      "Order: (C₂H₅)₂NH > C₂H₅NH₂ > NH₃ > C₆H₅NH₂",
      "p-Nitroaniline < aniline < p-methylaniline (basicity)",
      "Kb: Dissociation constant (higher Kb = stronger base)"
    ],
    examples: [
      "(CH₃)₂NH: Most basic (2° aliphatic, +I effect)",
      "CH₃NH₂: More basic than NH₃ (+I effect)",
      "C₆H₅NH₂: Less basic (lone pair in resonance)",
      "C₆H₅NHCH₃: More basic than aniline",
      "p-NO₂-C₆H₄-NH₂: Least basic (-R, -I effect)"
    ],
    formulas: [
      "R-NH₂ + H⁺ ⇌ R-NH₃⁺",
      "Kb = [R-NH₃⁺][OH⁻]/[R-NH₂]",
      "pKb = -log₁₀Kb"
    ]
  },
  {
    id: "chemical-reactions-1",
    title: "Chemical Reactions - Alkylation & Acylation",
    description: "Reactions with alkyl halides and acyl chlorides.",
    keyPoints: [
      "Alkylation: R-NH₂ + R'-X → R-NH-R' (mixture of products)",
      "Acylation: R-NH₂ + R'-COCl → R-NH-CO-R' (pure product)",
      "Acylation by acetyl chloride or acetic anhydride",
      "Benzoylation: R-NH₂ + C₆H₅COCl → R-NH-CO-C₆H₅",
      "Acylation reduces basicity (protects amino group)",
      "Schotten-Baumann reaction: Acylation in presence of base",
      "N-substituted amides formed",
      "Hinsberg test uses benzenesulfonyl chloride"
    ],
    examples: [
      "CH₃NH₂ + CH₃COCl → CH₃-NH-CO-CH₃ (N-methylacetamide)",
      "C₆H₅NH₂ + (CH₃CO)₂O → C₆H₅-NH-CO-CH₃ (acetanilide)",
      "Aniline + C₆H₅COCl/NaOH → C₆H₅-NH-CO-C₆H₅ (benzanilide)"
    ],
    formulas: [
      "R-NH₂ + R'-COCl → R-NH-CO-R' + HCl",
      "C₆H₅NH₂ + (CH₃CO)₂O → C₆H₅NHCOCH₃ + CH₃COOH"
    ]
  },
  {
    id: "chemical-reactions-2",
    title: "Chemical Reactions - Carbylamine & Coupling",
    description: "Characteristic tests and reactions of amines.",
    keyPoints: [
      "Carbylamine test: 1° amine + CHCl₃ + KOH → isocyanide (foul smell)",
      "Only 1° amines give carbylamine test",
      "Diazotization: Ar-NH₂ + NaNO₂/HCl (0-5°C) → Ar-N₂⁺Cl⁻",
      "Diazonium salts stable only at low temperature",
      "Coupling reaction: Ar-N₂⁺ + Ar'-OH → Ar-N=N-Ar' (azo dye)",
      "Sandmeyer reaction: Ar-N₂⁺ + CuCl → Ar-Cl",
      "Gattermann reaction: Ar-N₂⁺ + Cu/HCl → Ar-Cl",
      "Balz-Schiemann: Ar-N₂⁺BF₄⁻ → Ar-F"
    ],
    examples: [
      "C₆H₅NH₂ + CHCl₃ + KOH → C₆H₅NC (foul smell)",
      "C₆H₅NH₂ + NaNO₂ + HCl → C₆H₅N₂⁺Cl⁻ (benzene diazonium)",
      "C₆H₅N₂⁺Cl⁻ + C₆H₅OH → C₆H₅-N=N-C₆H₅-OH (orange dye)",
      "C₆H₅N₂⁺ + CuBr/HBr → C₆H₅Br (Sandmeyer)"
    ],
    formulas: [
      "R-NH₂ + CHCl₃ + 3KOH → R-NC + 3KCl + 3H₂O",
      "Ar-NH₂ + NaNO₂ + 2HCl → Ar-N₂⁺Cl⁻ + NaCl + 2H₂O"
    ]
  },
  {
    id: "aromatic-amines",
    title: "Reactions of Aromatic Amines",
    description: "Electrophilic substitution reactions specific to aniline.",
    keyPoints: [
      "Aniline highly reactive towards electrophilic substitution",
      "-NH₂ is activating and ortho/para directing",
      "Bromination: C₆H₅NH₂ + 3Br₂ → 2,4,6-tribromaniline (white ppt)",
      "Nitration: Direct nitration gives meta-nitroaniline (unwanted)",
      "Protection by acetylation before nitration",
      "Sulphonation: Forms sulphanilic acid (para product)",
      "Friedel-Crafts fails with aniline (forms salt)",
      "Aniline oxidized easily (use mild conditions)"
    ],
    examples: [
      "C₆H₅NH₂ + 3Br₂(aq) → C₆H₂Br₃NH₂ (2,4,6-tribromoaniline)",
      "Acetanilide + HNO₃/H₂SO₄ → p-NO₂-acetanilide → p-nitroaniline",
      "C₆H₅NH₂ + H₂SO₄ → C₆H₄(NH₂)SO₃H (sulphanilic acid)",
      "C₆H₅NH₂ + AlCl₃ → [C₆H₅NH₃⁺]Cl⁻ (salt, no reaction)"
    ]
  },
  {
    id: "distinction-tests",
    title: "Distinction Between Amines",
    description: "Chemical tests to differentiate 1°, 2°, and 3° amines.",
    keyPoints: [
      "Hinsberg test: Uses benzenesulfonyl chloride (C₆H₅SO₂Cl)",
      "1° amine: Soluble in alkali (forms N-substituted sulfonamide)",
      "2° amine: Insoluble in alkali (forms N,N-disubstituted)",
      "3° amine: No reaction with Hinsberg reagent",
      "Carbylamine test: Only 1° amines give foul-smelling isocyanide",
      "Nitrous acid test: Different products with 1°, 2°, 3°",
      "1° + HNO₂: Forms diazonium salt (N₂ gas evolved)",
      "2° + HNO₂: Forms N-nitrosamine (yellow oil)",
      "3° + HNO₂: Forms nitrite salt (soluble)"
    ],
    examples: [
      "1°: R-NH₂ + C₆H₅SO₂Cl + NaOH → soluble",
      "2°: R₂NH + C₆H₅SO₂Cl → insoluble oil",
      "3°: R₃N + C₆H₅SO₂Cl → no reaction",
      "Aliphatic 1° + HNO₂ → ROH + N₂↑",
      "Aromatic 1° + HNO₂ → Ar-N₂⁺ (diazonium)"
    ]
  }
];



export function ChemistryChapter23() {
  // Fetch questions from database for Coordination Compounds (topicId: 57)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '57'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=57');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(([qId, answerId]) => {
    const question = practiceQuestions.find(q => q.id === Number(qId));
    return question && answerId === question.correctAnswer;
  }).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Atom className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 23: Amines</h1>
          <p className="text-muted-foreground">Class XII Chemistry - NEET Syllabus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="visualization">
            <TestTubes className="h-4 w-4 mr-2" />
            Tests & Reactions
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Zap className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Classification: Primary, secondary, and tertiary amines</li>
                  <li>Preparation methods including Gabriel synthesis and Hoffmann degradation</li>
                  <li>Physical properties and basicity trends</li>
                  <li>Chemical reactions: Alkylation, acylation, diazotization</li>
                  <li>Distinction tests: Carbylamine, Hinsberg, nitrous acid</li>
                  <li>Aromatic amines and electrophilic substitution</li>
                  <li>Diazonium salts and coupling reactions</li>
                  <li>Industrial importance and applications</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Reactions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Carbylamine test (1° only)</p>
                    <p>• Hinsberg test (distinguish)</p>
                    <p>• Hoffmann degradation</p>
                    <p>• Diazotization & coupling</p>
                    <p>• Sandmeyer reaction</p>
                    <p>• Gabriel synthesis</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Basicity Order</Badge>
                    <CardTitle className="text-lg">Remember</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Aliphatic {'>'} NH₃ {'>'} Aromatic</p>
                    <p>• (C₂H₅)₂NH {'>'} C₂H₅NH₂</p>
                    <p>• +I increases basicity</p>
                    <p>• -R, -I decreases basicity</p>
                    <p>• p-CH₃ {'>'} aniline {'>'} p-NO₂</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter23Topics.map((topic, index) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <Card>
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-start gap-3 text-left">
                      <Badge variant="outline" className="mt-1">
                        {index + 1}
                      </Badge>
                      <div>
                        <h3 className="text-lg font-semibold">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CardContent className="space-y-6 pt-4">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Key Concepts
                        </h4>
                        <ul className="space-y-2">
                          {topic.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-purple-500 mt-1">•</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {topic.formulas && topic.formulas.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Important Formulas
                          </h4>
                          <div className="space-y-2">
                            {topic.formulas.map((formula, i) => (
                              <p key={i} className="font-mono text-sm bg-background p-2 rounded">
                                {formula}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-3">Examples</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                              <p className="text-sm font-mono">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distinction Tests for Amines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Primary (1°) Amine</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <p className="font-semibold mb-1">Carbylamine Test</p>
                      <p className="font-mono text-xs">✓ Foul smell (isocyanide)</p>
                      <Badge className="mt-2">Positive</Badge>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                      <p className="font-semibold mb-1">Hinsberg Test</p>
                      <p className="font-mono text-xs">✓ Alkali soluble</p>
                      <Badge variant="secondary" className="mt-2">Soluble</Badge>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <p className="font-semibold mb-1">HNO₂ Test</p>
                      <p className="font-mono text-xs">Aliphatic: N₂↑, Aromatic: N₂⁺</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Secondary (2°) Amine</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="font-semibold mb-1">Carbylamine Test</p>
                      <p className="font-mono text-xs">✗ No reaction</p>
                      <Badge variant="destructive" className="mt-2">Negative</Badge>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <p className="font-semibold mb-1">Hinsberg Test</p>
                      <p className="font-mono text-xs">✓ Alkali insoluble</p>
                      <Badge variant="outline" className="mt-2">Insoluble</Badge>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <p className="font-semibold mb-1">HNO₂ Test</p>
                      <p className="font-mono text-xs">Yellow oil (N-nitrosamine)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Tertiary (3°) Amine</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="font-semibold mb-1">Carbylamine Test</p>
                      <p className="font-mono text-xs">✗ No reaction</p>
                      <Badge variant="destructive" className="mt-2">Negative</Badge>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="font-semibold mb-1">Hinsberg Test</p>
                      <p className="font-mono text-xs">✗ No reaction</p>
                      <Badge variant="destructive" className="mt-2">No Reaction</Badge>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <p className="font-semibold mb-1">HNO₂ Test</p>
                      <p className="font-mono text-xs">Soluble nitrite salt</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>Diazonium Salt Reactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Sandmeyer (CuX)</p>
                      <p className="font-mono text-xs mt-1">Ar-N₂⁺ + CuCl → Ar-Cl</p>
                      <p className="font-mono text-xs">Ar-N₂⁺ + CuBr → Ar-Br</p>
                      <p className="font-mono text-xs">Ar-N₂⁺ + CuCN → Ar-CN</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Gattermann (Cu/HX)</p>
                      <p className="font-mono text-xs mt-1">Ar-N₂⁺ + Cu/HCl → Ar-Cl</p>
                      <p className="font-mono text-xs">Ar-N₂⁺ + Cu/HBr → Ar-Br</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Balz-Schiemann</p>
                      <p className="font-mono text-xs mt-1">Ar-N₂⁺BF₄⁻ + Δ → Ar-F</p>
                      <Badge variant="outline" className="mt-1">For Fluorine</Badge>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Coupling Reaction</p>
                      <p className="font-mono text-xs mt-1">Ar-N₂⁺ + Ar'-OH → Azo dye</p>
                      <Badge variant="outline" className="mt-1">pH 8-10</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          {questionsLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
                <span>Loading questions from database...</span>
              </CardContent>
            </Card>
          ) : practiceQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <p>No questions available for this chapter yet.</p>
              </CardContent>
            </Card>
          ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Practice Questions</CardTitle>
                {showSolutions && (
                  <Badge variant={score >= 12 ? "default" : score >= 8 ? "secondary" : "destructive"}>
                    Score: {score}/{practiceQuestions.length}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {practiceQuestions.map((q, index) => (
                <Card key={q.id} className="border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}</Badge>
                        <p className="font-medium">Q{index + 1}. {q.questionText}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {q.options.map((option, index) => {
                        const optionId = typeof option === "string" ? String(index) : option.id;
                        const optionText = typeof option === "string" ? option : option.text;

                        return (
                        <Button
                          key={index}
                          variant={
                            showSolutions
                              ? optionId === q.correctAnswer
                                ? "default"
                                : userAnswers[q.id] === optionId
                                ? "destructive"
                                : "outline"
                              : userAnswers[q.id] === optionId
                              ? "secondary"
                              : "outline"
                          }
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => !showSolutions && handleAnswerSelect(q.id, optionId)}
                          disabled={showSolutions}
                        >
                          <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                          {optionText}
                        </Button>
                        );
                      })}
                    </div>
                    {showSolutions && (
                      <div className="bg-muted p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Solution:</p>
                        <p className="text-sm">{q.solutionDetail}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-3">
                {!showSolutions ? (
                  <Button 
                    onClick={checkAnswers} 
                    className="flex-1"
                    disabled={Object.keys(userAnswers).length === 0}
                  >
                    Check Answers
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" className="flex-1">
                    Try Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        
          )}</TabsContent>
      </Tabs>
    </div>
  );
}
