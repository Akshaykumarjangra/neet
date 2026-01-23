
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

const chapter20Topics: Topic[] = [
  {
    id: "nomenclature",
    title: "Nomenclature and Classification",
    description: "Naming and types of haloalkanes and haloarenes.",
    keyPoints: [
      "Haloalkanes: halogen attached to sp³ carbon (R-X)",
      "Haloarenes: halogen attached to sp² carbon of benzene ring (Ar-X)",
      "Classification by number of halogen atoms: mono, di, tri, poly",
      "Classification by carbon: primary (1°), secondary (2°), tertiary (3°)",
      "Allylic halides: X attached to C next to C=C",
      "Benzylic halides: X attached to C next to benzene ring",
      "Vinyl halides: X attached to C=C carbon (sp²)"
    ],
    examples: [
      "CH₃Cl: chloromethane (methyl chloride)",
      "CH₃CH₂Br: bromoethane (ethyl bromide)",
      "C₆H₅Cl: chlorobenzene",
      "CH₂=CH-Cl: vinyl chloride",
      "C₆H₅CH₂Cl: benzyl chloride"
    ],
    formulas: [
      "General: R-X (haloalkane), Ar-X (haloarene)"
    ]
  },
  {
    id: "preparation",
    title: "Preparation Methods",
    description: "Methods to prepare haloalkanes and haloarenes.",
    keyPoints: [
      "From alcohols: R-OH + HX → R-X (with ZnCl₂)",
      "From alcohols: R-OH + PCl₅ → R-Cl + POCl₃ + HCl",
      "From alcohols: 3R-OH + PBr₃ → 3R-Br + H₃PO₃",
      "From alkenes: R-CH=CH₂ + HX → R-CH₂CH₂X",
      "Halogenation: R-H + X₂ (light) → R-X (free radical)",
      "Sandmeyer reaction: C₆H₅N₂⁺Cl⁻ + CuCl → C₆H₅Cl",
      "Hunsdiecker reaction: R-COOAg + Br₂ → R-Br + AgBr + CO₂"
    ],
    examples: [
      "CH₃OH + HCl (ZnCl₂) → CH₃Cl + H₂O",
      "C₂H₅OH + PCl₅ → C₂H₅Cl + POCl₃ + HCl",
      "CH₂=CH₂ + HBr → CH₃CH₂Br",
      "Benzene diazonium chloride + CuCl → chlorobenzene"
    ]
  },
  {
    id: "reactions",
    title: "Reactions of Haloalkanes",
    description: "Nucleophilic substitution and elimination reactions.",
    keyPoints: [
      "SN1: unimolecular, carbocation intermediate, 3° > 2° > 1°",
      "SN2: bimolecular, backside attack, 1° > 2° > 3°",
      "With KOH (aq): R-X + OH⁻ → R-OH (hydrolysis)",
      "With KOH (alc): R-X + KOH → alkene (elimination, E2)",
      "With KCN: R-X + CN⁻ → R-CN (nitrile)",
      "With AgNO₂: R-X + NO₂⁻ → R-NO₂ (nitroalkane)",
      "Wurtz reaction: 2R-X + 2Na → R-R + 2NaX"
    ],
    examples: [
      "CH₃Br + OH⁻ → CH₃OH + Br⁻",
      "C₂H₅Br + KOH(alc) → C₂H₄ + KBr + H₂O",
      "CH₃Br + KCN → CH₃CN + KBr",
      "2CH₃Cl + 2Na → C₂H₆ + 2NaCl"
    ]
  },
  {
    id: "haloarenes",
    title: "Reactions of Haloarenes",
    description: "Unique reactivity of halogen attached to benzene ring.",
    keyPoints: [
      "Less reactive than haloalkanes (C-X has partial double bond character)",
      "Resonance stabilization reduces reactivity",
      "SN reactions very difficult due to sp² carbon",
      "Electrophilic substitution: halogen is o,p-directing but deactivating",
      "Nitration: C₆H₅Cl + HNO₃ → o-/p-nitrochlorobenzene",
      "Friedel-Crafts alkylation doesn't work with haloarenes",
      "Nucleophilic substitution requires extreme conditions"
    ],
    examples: [
      "C₆H₅Cl + HNO₃/H₂SO₄ → p-ClC₆H₄NO₂",
      "C₆H₅Cl + Cl₂/FeCl₃ → p-C₆H₄Cl₂",
      "C₆H₅Cl + NaOH (623K, 300atm) → C₆H₅OH (phenol)"
    ]
  },
  {
    id: "polyhalogen",
    title: "Polyhalogen Compounds",
    description: "Important compounds with multiple halogen atoms.",
    keyPoints: [
      "Dichloromethane (CH₂Cl₂): solvent, paint remover",
      "Chloroform (CHCl₃): anesthetic (formerly), solvent",
      "Carbon tetrachloride (CCl₄): fire extinguisher, solvent",
      "Iodoform (CHI₃): antiseptic, iodoform test",
      "Freons (CCl₂F₂): refrigerants, ozone depleting",
      "DDT (p,p'-dichlorodiphenyltrichloroethane): insecticide",
      "Iodoform test: CH₃CO- + I₂/NaOH → CHI₃ (yellow ppt)"
    ],
    examples: [
      "CHCl₃ + sunlight/O₂ → COCl₂ (phosgene, poisonous)",
      "CH₃COCH₃ + I₂/NaOH → CHI₃↓ (positive iodoform test)",
      "CCl₄ is non-polar, immiscible with water"
    ]
  }
];



export function ChemistryChapter20() {
  // Fetch questions from database for General Principles of Metallurgy (topicId: 54)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '54'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=54');
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
          <h1 className="text-4xl font-bold">Chapter 20: Haloalkanes and Haloarenes</h1>
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
                  <li>Nomenclature and classification of haloalkanes and haloarenes</li>
                  <li>Methods of preparation from alcohols, alkenes, and aromatic compounds</li>
                  <li>SN1 and SN2 nucleophilic substitution mechanisms</li>
                  <li>Elimination reactions and Saytzeff's rule</li>
                  <li>Special reactions: Wurtz, Sandmeyer, Finkelstein</li>
                  <li>Polyhalogen compounds and their uses</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Reactions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• SN1: 3° {'>'} 2° {'>'} 1°</p>
                    <p>• SN2: 1° {'>'} 2° {'>'} 3°</p>
                    <p>• Haloarenes: very unreactive</p>
                    <p>• Iodoform test: CH₃CO- group</p>
                    <p>• Sandmeyer: diazonium to haloarene</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing SN1 and SN2 reactivity order</p>
                    <p>• Forgetting haloarene low reactivity</p>
                    <p>• Wrong products in elimination reactions</p>
                    <p>• Missing resonance in chlorobenzene</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter20Topics.map((topic, index) => (
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
                Explore haloalkane and haloarene structures
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ThreeDViewer
                title="Chloromethane (CH₃Cl) - Haloalkane"
                modelType="molecule"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">SN1 vs SN2</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">SN1 (Unimolecular)</p>
                      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 rounded">
                        <p className="text-xs">Two steps, carbocation intermediate</p>
                        <p className="text-xs">3° {'>'} 2° {'>'} 1°</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">SN2 (Bimolecular)</p>
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded">
                        <p className="text-xs">One step, backside attack</p>
                        <p className="text-xs">1° {'>'} 2° {'>'} 3°</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Important Tests</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                      <p className="font-semibold">Iodoform Test</p>
                      <p className="text-xs mt-1">CH₃CO- + I₂/NaOH → CHI₃↓</p>
                      <p className="text-xs">Yellow precipitate</p>
                    </div>
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
