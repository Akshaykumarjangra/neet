
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Zap, ArrowRightLeft , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter8Topics: Topic[] = [
  {
    id: "oxidation-reduction",
    title: "Oxidation and Reduction",
    description: "Oxidation is loss of electrons; Reduction is gain of electrons (OIL RIG).",
    keyPoints: [
      "Oxidation: Loss of electrons, increase in oxidation number",
      "Reduction: Gain of electrons, decrease in oxidation number",
      "Oxidizing agent: Gets reduced (accepts electrons)",
      "Reducing agent: Gets oxidized (donates electrons)",
      "Redox reactions involve simultaneous oxidation and reduction"
    ],
    examples: [
      "Zn + Cu²⁺ → Zn²⁺ + Cu (Zn oxidized, Cu²⁺ reduced)",
      "2Mg + O₂ → 2MgO (Mg oxidized, O₂ reduced)",
      "Fe²⁺ → Fe³⁺ + e⁻ (oxidation)",
      "Cl₂ + 2e⁻ → 2Cl⁻ (reduction)"
    ],
    formulas: [
      "Oxidation: M → M^n+ + ne⁻",
      "Reduction: X + ne⁻ → X^n-",
      "Redox: Oxidation + Reduction"
    ]
  },
  {
    id: "oxidation-number",
    title: "Oxidation Number Rules",
    description: "Rules to assign oxidation numbers to elements in compounds.",
    keyPoints: [
      "Oxidation number of free element = 0 (e.g., O₂, Cl₂, Na)",
      "Oxidation number of monatomic ion = charge (e.g., Na⁺ = +1, Cl⁻ = -1)",
      "H is usually +1 (except in metal hydrides: -1)",
      "O is usually -2 (except in peroxides: -1, in OF₂: +2)",
      "Sum of oxidation numbers = charge on species",
      "Fluorine is always -1 in compounds",
      "Alkali metals (Group 1) = +1, Alkaline earth metals (Group 2) = +2"
    ],
    examples: [
      "H₂SO₄: H = +1, S = +6, O = -2",
      "KMnO₄: K = +1, Mn = +7, O = -2",
      "Na₂O₂ (peroxide): Na = +1, O = -1",
      "NH₃: N = -3, H = +1",
      "Cr₂O₇²⁻: Cr = +6, O = -2"
    ],
    formulas: [
      "Sum in neutral molecule = 0",
      "Sum in polyatomic ion = charge on ion",
      "ΔOxidation number = number of electrons transferred"
    ]
  },
  {
    id: "balancing-redox",
    title: "Balancing Redox Reactions",
    description: "Methods to balance redox equations: Ion-electron method and Oxidation number method.",
    keyPoints: [
      "Ion-Electron (Half-reaction) Method: Write separate oxidation and reduction half-reactions",
      "Balance atoms other than O and H first",
      "Balance O by adding H₂O, then H by adding H⁺ (acidic) or OH⁻ (basic)",
      "Balance charge by adding electrons",
      "Multiply half-reactions to equalize electrons, then add",
      "Oxidation Number Method: Identify changes in oxidation numbers, balance electron transfer"
    ],
    examples: [
      "MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ (acidic)",
      "Cr₂O₇²⁻ + I⁻ → Cr³⁺ + I₂ (acidic)",
      "MnO₄⁻ + C₂O₄²⁻ → Mn²⁺ + CO₂ (acidic)"
    ],
    formulas: [
      "Oxidation: Fe²⁺ → Fe³⁺ + e⁻",
      "Reduction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O",
      "Overall: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O"
    ]
  },
  {
    id: "electrochemical-series",
    title: "Electrochemical Series",
    description: "Arrangement of elements/ions based on their standard reduction potentials.",
    keyPoints: [
      "Standard reduction potential (E°): measured at 25°C, 1M, 1 atm",
      "More positive E° = stronger oxidizing agent (easily reduced)",
      "More negative E° = stronger reducing agent (easily oxidized)",
      "Standard Hydrogen Electrode (SHE): E° = 0.00 V (reference)",
      "Metals above H in series displace H₂ from acids",
      "A metal can displace another metal below it in the series"
    ],
    examples: [
      "F₂/F⁻: E° = +2.87 V (strongest oxidizing agent)",
      "Li⁺/Li: E° = -3.05 V (strongest reducing agent)",
      "Cu²⁺/Cu: E° = +0.34 V",
      "Zn²⁺/Zn: E° = -0.76 V",
      "Zn can displace Cu from CuSO₄ solution"
    ],
    formulas: [
      "E°cell = E°cathode - E°anode",
      "Positive E°cell → spontaneous reaction",
      "ΔG° = -nFE°cell"
    ]
  },
  {
    id: "disproportionation",
    title: "Disproportionation Reactions",
    description: "Reactions where same element undergoes both oxidation and reduction.",
    keyPoints: [
      "Same element in one oxidation state converts to two different states",
      "Element acts as both oxidizing and reducing agent",
      "Common in elements with multiple oxidation states",
      "Opposite of comproportionation"
    ],
    examples: [
      "Cl₂ + 2OH⁻ → Cl⁻ + OCl⁻ + H₂O (Cl: 0 → -1 and +1)",
      "3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O (hot)",
      "2H₂O₂ → 2H₂O + O₂ (O: -1 → -2 and 0)",
      "P₄ + 3OH⁻ + 3H₂O → PH₃ + 3H₂PO₂⁻"
    ]
  },
  {
    id: "applications",
    title: "Applications of Redox Reactions",
    description: "Practical applications in batteries, corrosion, and extraction of metals.",
    keyPoints: [
      "Batteries: Convert chemical energy to electrical energy via redox",
      "Corrosion: Unwanted oxidation of metals (rusting of iron)",
      "Metallurgy: Extraction of metals from ores by reduction",
      "Electroplating: Coating metal surface using electrolysis",
      "Bleaching: Oxidation of colored compounds to colorless ones"
    ],
    examples: [
      "Rusting: 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃",
      "Extraction of Fe: Fe₂O₃ + 3CO → 2Fe + 3CO₂",
      "Electroplating of silver: Ag⁺ + e⁻ → Ag",
      "Bleaching by Cl₂: Cl₂ + H₂O → HCl + HOCl"
    ]
  }
];



export function ChemistryChapter8() {
  // Fetch questions from database for Redox Reactions (topicId: 43)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '43'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=43');
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
        <ArrowRightLeft className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 8: Redox Reactions</h1>
          <p className="text-muted-foreground">Class XI Chemistry - NEET Syllabus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
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
                  <li>Oxidation and reduction concepts (electron transfer)</li>
                  <li>Oxidation number rules and calculations</li>
                  <li>Balancing redox reactions (ion-electron & oxidation number methods)</li>
                  <li>Electrochemical series and standard reduction potentials</li>
                  <li>Disproportionation reactions</li>
                  <li>Applications in batteries, corrosion, and metallurgy</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Mnemonics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>OIL RIG:</strong> Oxidation Is Loss, Reduction Is Gain (of electrons)</p>
                    <p><strong>LEO says GER:</strong> Lose Electrons = Oxidation, Gain Electrons = Reduction</p>
                    <p><strong>OILRIG:</strong> Oxidizing agent gets Reduced, Reducing agent gets Oxidized</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing oxidizing agent with substance being oxidized</p>
                    <p>• Wrong oxidation numbers for O in peroxides (-1, not -2)</p>
                    <p>• Not balancing charge in half-reactions</p>
                    <p>• Forgetting to multiply half-reactions to equalize electrons</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-orange-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Oxidation Number Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Free element:</strong> 0 (e.g., Na, O₂, Cl₂)</p>
                  <p><strong>Monatomic ion:</strong> = charge (e.g., Na⁺ = +1, Cl⁻ = -1)</p>
                  <p><strong>Hydrogen:</strong> +1 (except -1 in metal hydrides)</p>
                  <p><strong>Oxygen:</strong> -2 (except -1 in peroxides, +2 in OF₂)</p>
                  <p><strong>Fluorine:</strong> Always -1</p>
                  <p><strong>Sum rule:</strong> = 0 (neutral) or charge (ion)</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle>Electrochemical Series Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-mono">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Strongest Oxidizing Agents (High E°)</p>
                      <p>F₂ (+2.87 V)</p>
                      <p>MnO₄⁻ (+1.51 V)</p>
                      <p>Cl₂ (+1.36 V)</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Strongest Reducing Agents (Low E°)</p>
                      <p>Li (-3.05 V)</p>
                      <p>K (-2.93 V)</p>
                      <p>Na (-2.71 V)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter8Topics.map((topic, index) => (
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
                            Important Equations
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

          <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardHeader>
              <CardTitle>Balancing Redox Reactions - Step by Step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Ion-Electron Method (Acidic Medium)</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Write unbalanced half-reactions</li>
                  <li>Balance atoms other than O and H</li>
                  <li>Balance O by adding H₂O</li>
                  <li>Balance H by adding H⁺</li>
                  <li>Balance charge by adding e⁻</li>
                  <li>Multiply to equalize electrons</li>
                  <li>Add half-reactions and cancel common terms</li>
                </ol>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold mb-2">Example: MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺</p>
                <div className="space-y-1 text-sm font-mono">
                  <p>Oxidation: Fe²⁺ → Fe³⁺ + e⁻</p>
                  <p>Reduction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O</p>
                  <p className="text-purple-600">Multiply oxidation by 5:</p>
                  <p>5Fe²⁺ → 5Fe³⁺ + 5e⁻</p>
                  <p className="text-green-600">Add both:</p>
                  <p>MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O</p>
                </div>
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
