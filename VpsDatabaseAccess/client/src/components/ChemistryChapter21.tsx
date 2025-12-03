
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, TestTubes } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter21Topics: Topic[] = [
  {
    id: "alcohols",
    title: "Alcohols - Preparation and Properties",
    description: "Hydroxyl group (-OH) attached to saturated carbon.",
    keyPoints: [
      "Classification: primary (1°), secondary (2°), tertiary (3°)",
      "From alkenes: R-CH=CH₂ + H₂O/H⁺ → R-CH₂CH₂OH (Markovnikov)",
      "From carbonyl: R₂C=O + LiAlH₄ → R₂CHOH (reduction)",
      "From Grignard: R-MgX + H₂C=O → R-CH₂OH",
      "Acidity: water > alcohol (pKa ~15-16)",
      "Acidic strength: 1° > 2° > 3° (alkyl +I effect)",
      "Reactions: dehydration, oxidation, esterification"
    ],
    examples: [
      "CH₃CH₂OH: ethanol (1° alcohol)",
      "(CH₃)₂CHOH: propan-2-ol (2° alcohol)",
      "(CH₃)₃COH: 2-methylpropan-2-ol (3° alcohol)"
    ],
    formulas: [
      "General: R-OH",
      "Lucas test: ZnCl₂/HCl distinguishes 1°, 2°, 3°"
    ]
  },
  {
    id: "reactions-alcohols",
    title: "Reactions of Alcohols",
    description: "Key reactions including oxidation and substitution.",
    keyPoints: [
      "Oxidation: 1° → aldehyde → acid, 2° → ketone, 3° → no oxidation",
      "With Na: 2R-OH + 2Na → 2R-ONa + H₂",
      "Dehydration: R-OH (H₂SO₄, heat) → alkene + H₂O",
      "With HX: R-OH + HX → R-X (Lucas test)",
      "Esterification: R-OH + R'COOH → R'COOR + H₂O",
      "Victor Meyer test: distinguishes 1°, 2°, 3° alcohols",
      "Iodoform: alcohols with CH₃CH(OH)- give CHI₃"
    ],
    examples: [
      "C₂H₅OH + [O] → CH₃CHO → CH₃COOH",
      "(CH₃)₂CHOH + [O] → (CH₃)₂C=O",
      "C₂H₅OH + H₂SO₄ (443K) → C₂H₄ + H₂O"
    ]
  },
  {
    id: "phenols",
    title: "Phenols - Preparation and Properties",
    description: "Hydroxyl group directly attached to benzene ring.",
    keyPoints: [
      "More acidic than alcohols, less than carboxylic acids",
      "Acidity: phenol > water > alcohol",
      "From diazonium salt: C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH",
      "From chlorobenzene: C₆H₅Cl + NaOH (623K) → C₆H₅OH",
      "Resonance stabilizes phenoxide ion (C₆H₅O⁻)",
      "EWG increases acidity, EDG decreases acidity",
      "o,p-nitrophenol more acidic than phenol"
    ],
    examples: [
      "C₆H₅OH + NaOH → C₆H₅ONa + H₂O",
      "p-NO₂-C₆H₄OH more acidic than C₆H₅OH",
      "Phenol doesn't give Lucas test (no C-O cleavage)"
    ],
    formulas: [
      "General: Ar-OH",
      "pKa: phenol (~10) < carboxylic acid (~5)"
    ]
  },
  {
    id: "reactions-phenols",
    title: "Reactions of Phenols",
    description: "Electrophilic substitution and other reactions.",
    keyPoints: [
      "Highly activated benzene ring (−OH is o,p-directing, activating)",
      "Bromination: C₆H₅OH + 3Br₂ → 2,4,6-tribromophenol (white ppt)",
      "Nitration: C₆H₅OH + dil HNO₃ → o,p-nitrophenol",
      "Sulphonation: C₆H₅OH + H₂SO₄ → phenol sulfonic acid",
      "Kolbe reaction: C₆H₅ONa + CO₂ → salicylic acid",
      "Reimer-Tiemann: C₆H₅OH + CHCl₃/NaOH → salicylaldehyde",
      "Coupling: C₆H₅OH + C₆H₅N₂⁺Cl⁻ → p-hydroxyazobenzene (dye)"
    ],
    examples: [
      "Phenol + Br₂ water → 2,4,6-tribromophenol↓",
      "Phenol + CHCl₃/NaOH → o-hydroxybenzaldehyde",
      "Phenol reacts without catalyst (highly activated)"
    ]
  },
  {
    id: "ethers",
    title: "Ethers - Preparation and Reactions",
    description: "Oxygen atom bonded to two alkyl or aryl groups.",
    keyPoints: [
      "General formula: R-O-R' (symmetrical or mixed)",
      "Williamson synthesis: R-ONa + R'-X → R-O-R' + NaX",
      "Dehydration of alcohols: 2R-OH (H₂SO₄, 413K) → R-O-R",
      "Less reactive than alcohols (no acidic H)",
      "Cleavage with HI: R-O-R' + HI → R-I + R'-OH",
      "Cleavage order: HI > HBr > HCl",
      "Reaction with PCl₅: R-O-R' + PCl₅ → R-Cl + R'-Cl"
    ],
    examples: [
      "C₂H₅-O-C₂H₅: diethyl ether (ethoxyethane)",
      "CH₃-O-C₆H₅: methyl phenyl ether (anisole)",
      "C₂H₅ONa + CH₃Br → C₂H₅OCH₃ + NaBr"
    ],
    formulas: [
      "General: R-O-R' or Ar-O-Ar'",
      "Williamson: R-O⁻ + R'-X → R-O-R'"
    ]
  }
];

const practiceQuestions = [
  {
    id: 1,
    question: "Which alcohol gives fastest reaction with Lucas reagent?",
    options: ["1° alcohol", "2° alcohol", "3° alcohol", "All equal"],
    correctAnswer: 2,
    solution: "Lucas test: 3° > 2° > 1°. Tertiary alcohol reacts fastest (immediate turbidity)",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Phenol is more acidic than ethanol because:",
    options: [
      "Phenoxide ion is resonance stabilized",
      "Phenol has more OH groups",
      "Benzene ring is electron withdrawing",
      "Phenol is aromatic"
    ],
    correctAnswer: 0,
    solution: "Phenoxide ion (C₆H₅O⁻) is stabilized by resonance with benzene ring, making phenol more acidic",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "Oxidation of 2° alcohol gives:",
    options: ["Aldehyde", "Ketone", "Carboxylic acid", "No reaction"],
    correctAnswer: 1,
    solution: "Secondary alcohols oxidize to ketones. 1° → aldehyde → acid, 3° → no oxidation",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "Williamson synthesis is used to prepare:",
    options: ["Alcohols", "Phenols", "Ethers", "Aldehydes"],
    correctAnswer: 2,
    solution: "Williamson synthesis: R-ONa + R'-X → R-O-R' (ether)",
    difficulty: "Easy"
  },
  {
    id: 5,
    question: "Reaction of phenol with Br₂ water gives:",
    options: [
      "Bromobenzene",
      "o-bromophenol",
      "p-bromophenol",
      "2,4,6-tribromophenol"
    ],
    correctAnswer: 3,
    solution: "Phenol is highly activated. Br₂ water gives white precipitate of 2,4,6-tribromophenol",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "Kolbe reaction produces:",
    options: ["Phenol", "Salicylic acid", "Benzoic acid", "Benzaldehyde"],
    correctAnswer: 1,
    solution: "Kolbe reaction: C₆H₅ONa + CO₂ (pressure) → o-hydroxybenzoic acid (salicylic acid)",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "Which gives positive iodoform test?",
    options: ["CH₃CH₂OH", "CH₃CH(OH)CH₃", "(CH₃)₃COH", "C₆H₅OH"],
    correctAnswer: 1,
    solution: "Alcohols with CH₃CH(OH)- give iodoform. CH₃CH(OH)CH₃ is positive",
    difficulty: "Medium"
  },
  {
    id: 8,
    question: "Dehydration of ethanol at 443K gives:",
    options: ["Ethene", "Diethyl ether", "Acetaldehyde", "Acetic acid"],
    correctAnswer: 0,
    solution: "At high temp (443K), dehydration gives alkene. C₂H₅OH → C₂H₄ + H₂O",
    difficulty: "Easy"
  },
  {
    id: 9,
    question: "Most acidic is:",
    options: ["Phenol", "Ethanol", "o-nitrophenol", "Water"],
    correctAnswer: 2,
    solution: "EWG increases acidity. o-nitrophenol (−NO₂ is EWG) most acidic",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "Cleavage of ether with HI gives:",
    options: [
      "Alcohol only",
      "Alkyl halide only",
      "Alcohol + alkyl halide",
      "No reaction"
    ],
    correctAnswer: 2,
    solution: "R-O-R' + HI → R-I + R'-OH (alkyl halide + alcohol)",
    difficulty: "Easy"
  },
  {
    id: 11,
    question: "Reimer-Tiemann reaction produces:",
    options: ["Phenol", "Salicylaldehyde", "Salicylic acid", "Benzaldehyde"],
    correctAnswer: 1,
    solution: "Reimer-Tiemann: phenol + CHCl₃/NaOH → o-hydroxybenzaldehyde (salicylaldehyde)",
    difficulty: "Medium"
  },
  {
    id: 12,
    question: "Victor Meyer test distinguishes:",
    options: [
      "1°, 2°, 3° alcohols",
      "Alcohols and phenols",
      "Ethers and alcohols",
      "Aldehydes and ketones"
    ],
    correctAnswer: 0,
    solution: "Victor Meyer test distinguishes between 1°, 2°, and 3° alcohols by color",
    difficulty: "Easy"
  },
  {
    id: 13,
    question: "Tertiary alcohol on oxidation gives:",
    options: ["Aldehyde", "Ketone", "Acid", "No oxidation"],
    correctAnswer: 3,
    solution: "3° alcohols don't have H on C-OH carbon, cannot be oxidized easily",
    difficulty: "Easy"
  },
  {
    id: 14,
    question: "Anisole is:",
    options: ["CH₃-O-CH₃", "C₆H₅-O-CH₃", "C₆H₅-OH", "C₆H₅-O-C₆H₅"],
    correctAnswer: 1,
    solution: "Anisole is methyl phenyl ether: C₆H₅-O-CH₃ (methoxybenzene)",
    difficulty: "Easy"
  },
  {
    id: 15,
    question: "Phenol doesn't give:",
    options: [
      "Bromination",
      "Nitration",
      "Lucas test",
      "Coupling reaction"
    ],
    correctAnswer: 2,
    solution: "Phenol doesn't give Lucas test (no C-O cleavage). Ar-O bond is very strong",
    difficulty: "Medium"
  }
];

export function ChemistryChapter21() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(
    ([qId, answer]) => answer === practiceQuestions[parseInt(qId) - 1].correctAnswer
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TestTubes className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 21: Alcohols, Phenols and Ethers</h1>
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
          <TabsTrigger value="practice">
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
                  <li>Classification and nomenclature of alcohols, phenols, and ethers</li>
                  <li>Preparation methods from alkenes, carbonyl compounds, and Grignard reagents</li>
                  <li>Physical and chemical properties including acidity</li>
                  <li>Important reactions: oxidation, dehydration, substitution</li>
                  <li>Special reactions: Kolbe, Reimer-Tiemann, Williamson synthesis</li>
                  <li>Distinction tests: Lucas test, Victor Meyer test</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Acidity: phenol {'>'} water {'>'} alcohol</p>
                    <p>• Oxidation: 1° → acid, 2° → ketone, 3° → none</p>
                    <p>• Lucas: 3° {'>'} 2° {'>'} 1°</p>
                    <p>• Phenol + Br₂ → tribromophenol</p>
                    <p>• Williamson: R-O⁻ + R'-X → ether</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing alcohol and phenol acidity</p>
                    <p>• Wrong oxidation products</p>
                    <p>• Forgetting phenol's high reactivity</p>
                    <p>• Missing resonance stabilization</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter21Topics.map((topic, index) => (
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
                Explore alcohol, phenol, and ether structures
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ThreeDViewer
                title="Ethanol (C₂H₅OH) - Primary Alcohol"
                modelType="ethanol"
              />

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Alcohols</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-semibold">R-OH</p>
                    <div className="space-y-1 text-xs">
                      <p>• 1° → aldehyde → acid</p>
                      <p>• 2° → ketone</p>
                      <p>• 3° → no oxidation</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Phenols</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-semibold">Ar-OH</p>
                    <div className="space-y-1 text-xs">
                      <p>• More acidic than ROH</p>
                      <p>• Highly reactive ring</p>
                      <p>• Resonance stabilized</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Ethers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-semibold">R-O-R'</p>
                    <div className="space-y-1 text-xs">
                      <p>• Less reactive</p>
                      <p>• Cleaved by HI</p>
                      <p>• Williamson synthesis</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
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
                        <Badge variant="outline" className="mb-2">{q.difficulty}</Badge>
                        <p className="font-medium">Q{index + 1}. {q.question}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {q.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            showSolutions
                              ? index === q.correctAnswer
                                ? "default"
                                : userAnswers[q.id] === index
                                  ? "destructive"
                                  : "outline"
                              : userAnswers[q.id] === index
                                ? "secondary"
                                : "outline"
                          }
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => !showSolutions && handleAnswerSelect(q.id, index)}
                          disabled={showSolutions}
                        >
                          <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                          {typeof option === "string" ? option : option.text}
                        </Button>
                      ))}
                    </div>
                    {showSolutions && (
                      <div className="bg-muted p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Solution:</p>
                        <p className="text-sm">{q.solution}</p>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
