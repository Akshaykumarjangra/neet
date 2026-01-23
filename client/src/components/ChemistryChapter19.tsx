
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, TestTubes , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter19Topics: Topic[] = [
  {
    id: "alkanes",
    title: "Alkanes - Preparation and Properties",
    description: "Saturated hydrocarbons with single bonds only.",
    keyPoints: [
      "General formula: CₙH₂ₙ₊₂",
      "sp³ hybridization, tetrahedral geometry",
      "Preparation: Wurtz reaction (R-X + 2Na → R-R)",
      "Kolbe's electrolysis: 2RCOO⁻ → R-R + 2CO₂ + 2e⁻",
      "Reduction: R-X + Zn/HCl → R-H",
      "Reactions: halogenation (free radical), combustion, cracking",
      "Unreactive towards acids, bases, oxidizing agents (except combustion)"
    ],
    examples: [
      "Wurtz: 2CH₃Cl + 2Na → C₂H₆ + 2NaCl",
      "Halogenation: CH₄ + Cl₂ (sunlight) → CH₃Cl + HCl",
      "Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O"
    ],
    formulas: [
      "CₙH₂ₙ₊₂ (alkanes)",
      "Free radical: initiation → propagation → termination"
    ]
  },
  {
    id: "alkenes",
    title: "Alkenes - Preparation and Reactions",
    description: "Unsaturated hydrocarbons with C=C double bond.",
    keyPoints: [
      "General formula: CₙH₂ₙ",
      "sp² hybridization, planar geometry around C=C",
      "Preparation: dehydrohalogenation (R-CH₂-CH₂X + KOH(alc) → R-CH=CH₂)",
      "Dehydration of alcohols: R-CH₂-CH₂OH (H₂SO₄, heat) → R-CH=CH₂",
      "Reactions: addition (HX, X₂, H₂O, H₂), polymerization, oxidation",
      "Markovnikov's rule: H adds to C with more H atoms",
      "Anti-Markovnikov (peroxide effect): H adds to C with less H"
    ],
    examples: [
      "C₂H₅Br + KOH(alc) → C₂H₄ + KBr + H₂O",
      "CH₂=CH₂ + HBr → CH₃-CH₂Br (Markovnikov)",
      "CH₂=CH₂ + KMnO₄ → CH₂(OH)-CH₂(OH) (dihydroxylation)"
    ],
    formulas: [
      "CₙH₂ₙ (alkenes)",
      "Ozonolysis: R-CH=CH-R' + O₃ → RCHO + R'CHO"
    ]
  },
  {
    id: "alkynes",
    title: "Alkynes - Preparation and Reactions",
    description: "Unsaturated hydrocarbons with C≡C triple bond.",
    keyPoints: [
      "General formula: CₙH₂ₙ₋₂",
      "sp hybridization, linear geometry",
      "Preparation: dehydrohalogenation of vicinal dihalides",
      "Calcium carbide method: CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂",
      "Acidic nature: terminal H (RC≡CH + NaNH₂ → RC≡CNa)",
      "Addition reactions: HX, X₂, H₂O (Hg²⁺/H₂SO₄)",
      "Polymerization, oxidation reactions"
    ],
    examples: [
      "CaC₂ + 2H₂O → HC≡CH + Ca(OH)₂",
      "HC≡CH + HBr → CH₂=CHBr (vinyl bromide)",
      "HC≡CH + H₂O (Hg²⁺/H₂SO₄) → CH₃CHO"
    ],
    formulas: [
      "CₙH₂ₙ₋₂ (alkynes)",
      "Hydration: RC≡CH + H₂O → RCOCH₃ (keto form)"
    ]
  },
  {
    id: "aromatic",
    title: "Aromatic Hydrocarbons - Benzene",
    description: "Cyclic conjugated systems following Hückel's rule.",
    keyPoints: [
      "Hückel's rule: (4n+2)π electrons for aromaticity",
      "Benzene: C₆H₆, planar, hexagonal, all C-C bonds equal length",
      "Resonance stabilization (resonance energy = 152 kJ/mol)",
      "Electrophilic substitution: nitration, sulphonation, halogenation, Friedel-Crafts",
      "Directive influence: -OH, -NH₂ (ortho/para), -NO₂, -COOH (meta)",
      "Addition reactions under specific conditions (hydrogenation)",
      "Combustion with sooty flame"
    ],
    examples: [
      "C₆H₆ + HNO₃ (conc H₂SO₄) → C₆H₅NO₂ + H₂O",
      "C₆H₆ + Cl₂ (FeCl₃) → C₆H₅Cl + HCl",
      "C₆H₆ + 3H₂ (Ni, heat) → C₆H₁₂ (cyclohexane)"
    ],
    formulas: [
      "Benzene: C₆H₆",
      "π electron count = 6 (satisfies 4n+2, n=1)"
    ]
  },
  {
    id: "reactions",
    title: "Important Reactions and Mechanisms",
    description: "Key reaction mechanisms in hydrocarbons.",
    keyPoints: [
      "Free radical halogenation: initiation, propagation, termination",
      "Markovnikov addition: carbocation stability determines product",
      "Anti-Markovnikov (peroxide effect): free radical mechanism",
      "Ozonolysis: cleaves C=C to form carbonyl compounds",
      "Electrophilic aromatic substitution: formation of σ-complex",
      "Saytzeff rule: elimination gives more substituted alkene",
      "Baeyer's test: alkenes decolorize KMnO₄"
    ],
    examples: [
      "CH₃-CH=CH₂ + HBr → CH₃-CHBr-CH₃ (Markovnikov)",
      "CH₃-CH=CH₂ + HBr (peroxide) → CH₃-CH₂-CH₂Br",
      "Benzene + NO₂⁺ → C₆H₅NO₂ (via σ-complex)"
    ]
  },
  {
    id: "petroleum",
    title: "Petroleum and Coal",
    description: "Natural sources of hydrocarbons and their processing.",
    keyPoints: [
      "Petroleum: mixture of hydrocarbons (C₁ to C₄₀)",
      "Fractional distillation: separates based on boiling points",
      "Cracking: breaks large molecules into smaller ones",
      "Reforming: converts alkanes to aromatics",
      "Octane number: measure of fuel quality",
      "Coal: carbonization produces coal gas, coal tar, coke",
      "Coal tar: source of benzene, toluene, naphthalene, phenol"
    ],
    examples: [
      "Petroleum fractions: LPG, petrol, kerosene, diesel",
      "Thermal cracking: C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆",
      "Coal tar distillation yields aromatic compounds"
    ]
  }
];



export function ChemistryChapter19() {
// Fetch questions from database for Hydrocarbons (topicId: 2103)
const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
  queryKey: ['/api/questions', 'topicId', '2103'],
  queryFn: async () => {
    const response = await fetch('/api/questions?topicId=2103');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
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
        <TestTubes className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 19: Hydrocarbons</h1>
          <p className="text-muted-foreground">Class XI Chemistry - NEET Syllabus</p>
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
            <Atom className="h-4 w-4 mr-2" />
            3D Models
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
                  <li>Alkanes: preparation, properties, and reactions</li>
                  <li>Alkenes: preparation, Markovnikov's rule, addition reactions</li>
                  <li>Alkynes: preparation, acidic nature, reactions</li>
                  <li>Aromatic hydrocarbons: benzene structure and reactions</li>
                  <li>Petroleum refining and coal products</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm font-mono">
                    <p>• Alkanes: CₙH₂ₙ₊₂</p>
                    <p>• Alkenes: CₙH₂ₙ</p>
                    <p>• Alkynes: CₙH₂ₙ₋₂</p>
                    <p>• Cycloalkanes: CₙH₂ₙ</p>
                    <p>• Benzene: C₆H₆ (6π e⁻)</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing Markovnikov and anti-Markovnikov</p>
                    <p>• Wrong numbering in IUPAC nomenclature</p>
                    <p>• Mixing up ortho/para and meta directors</p>
                    <p>• Forgetting Hückel's rule for aromaticity</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter19Topics.map((topic, index) => (
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
                              <p className="text-sm">{example}</p>
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
              <CardTitle>Interactive 3D Visualizations</CardTitle>
              <p className="text-sm text-muted-foreground">
                Explore hydrocarbon molecular structures
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ThreeDViewer
                title="Benzene (C₆H₆) - Aromatic Structure"
                modelType="molecule"
              />

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Alkanes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-semibold">sp³ Hybridization</p>
                    <p>• Tetrahedral geometry</p>
                    <p>• 109.5° bond angle</p>
                    <p>• Single bonds only</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Alkenes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-semibold">sp² Hybridization</p>
                    <p>• Planar at C=C</p>
                    <p>• 120° bond angle</p>
                    <p>• One π bond</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Alkynes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-semibold">sp Hybridization</p>
                    <p>• Linear geometry</p>
                    <p>• 180° bond angle</p>
                    <p>• Two π bonds</p>
                  </CardContent>
                </Card>
              </div>
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
