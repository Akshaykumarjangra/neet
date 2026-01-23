
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Zap, Timer , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter11Topics: Topic[] = [
  {
    id: "rate-law",
    title: "Rate of Reaction and Rate Law",
    description: "Speed at which reactants convert to products.",
    keyPoints: [
      "Rate of reaction: Change in concentration per unit time",
      "Average rate: Δ[concentration]/Δt",
      "Instantaneous rate: d[concentration]/dt (at specific time)",
      "For aA + bB → cC + dD:",
      "Rate = -(1/a)d[A]/dt = -(1/b)d[B]/dt = (1/c)d[C]/dt = (1/d)d[D]/dt",
      "Rate law: Rate = k[A]ˣ[B]ʸ (experimental, not from stoichiometry)",
      "k: Rate constant (depends on temperature, not concentration)",
      "x, y: Order with respect to A and B (determined experimentally)",
      "Overall order = x + y + ..."
    ],
    examples: [
      "2N₂O₅ → 4NO₂ + O₂: Rate = -(1/2)d[N₂O₅]/dt = (1/4)d[NO₂]/dt",
      "For H₂ + I₂ → 2HI: Rate = k[H₂][I₂] (second order overall)",
      "For 2NO + O₂ → 2NO₂: Rate = k[NO]²[O₂] (third order)",
      "Zero order: Rate = k (constant, independent of concentration)"
    ],
    formulas: [
      "Rate = -(1/a)d[A]/dt",
      "Rate law: Rate = k[A]ˣ[B]ʸ",
      "Overall order = x + y + z + ...",
      "Units of k depend on overall order"
    ]
  },
  {
    id: "order-molecularity",
    title: "Order and Molecularity",
    description: "Concepts to characterize reaction mechanisms.",
    keyPoints: [
      "Order: Sum of powers in rate law (experimental)",
      "Can be 0, 1, 2, 3, or even fractional",
      "Zero order: Rate = k, units: mol L⁻¹ s⁻¹",
      "First order: Rate = k[A], units: s⁻¹",
      "Second order: Rate = k[A]², units: L mol⁻¹ s⁻¹",
      "Molecularity: Number of molecules in elementary step (theoretical)",
      "Unimolecular: 1 molecule (A → Products)",
      "Bimolecular: 2 molecules (A + B → Products)",
      "Termolecular: 3 molecules (rare, A + B + C → Products)",
      "Molecularity is always a positive integer, never zero or fractional"
    ],
    examples: [
      "NH₄NO₂ → N₂ + 2H₂O: Unimolecular (one molecule decomposes)",
      "2HI → H₂ + I₂: Bimolecular (two HI molecules collide)",
      "Order can be different from stoichiometry: 2N₂O₅ → 4NO₂ + O₂ is first order",
      "Fractional order: Some enzyme reactions show 0.5 or 1.5 order"
    ],
    formulas: [
      "Order: Determined from rate law experimentally",
      "Molecularity: From mechanism, always integer ≥ 1"
    ]
  },
  {
    id: "integrated-rate",
    title: "Integrated Rate Equations",
    description: "Mathematical relationships between concentration and time.",
    keyPoints: [
      "Zero order: [A] = [A]₀ - kt (linear plot: [A] vs t)",
      "t₁/₂ = [A]₀/(2k) (depends on initial concentration)",
      "First order: ln[A] = ln[A]₀ - kt (linear plot: ln[A] vs t)",
      "t₁/₂ = 0.693/k (independent of initial concentration)",
      "Second order: 1/[A] = 1/[A]₀ + kt (linear plot: 1/[A] vs t)",
      "t₁/₂ = 1/(k[A]₀) (inversely proportional to [A]₀)",
      "Half-life (t₁/₂): Time for concentration to reduce to half",
      "Used to determine order from experimental data"
    ],
    examples: [
      "If ln[A] vs t is linear → first order",
      "If 1/[A] vs t is linear → second order",
      "Radioactive decay: First order, t₁/₂ constant",
      "For k = 0.693 min⁻¹, t₁/₂ = 1 min (first order)"
    ],
    formulas: [
      "Zero: [A] = [A]₀ - kt, t₁/₂ = [A]₀/(2k)",
      "First: ln[A] = ln[A]₀ - kt, t₁/₂ = 0.693/k",
      "Second: 1/[A] = 1/[A]₀ + kt, t₁/₂ = 1/(k[A]₀)",
      "k (first order) = 2.303/t × log([A]₀/[A])"
    ]
  },
  {
    id: "arrhenius",
    title: "Arrhenius Equation",
    description: "Temperature dependence of rate constant.",
    keyPoints: [
      "Arrhenius equation: k = Ae⁻ᴱᵃ/ᴿᵀ",
      "A: Pre-exponential factor (frequency factor)",
      "Eₐ: Activation energy (minimum energy for reaction)",
      "R: Gas constant (8.314 J K⁻¹ mol⁻¹)",
      "T: Temperature in Kelvin",
      "Logarithmic form: ln k = ln A - Eₐ/(RT)",
      "Plot ln k vs 1/T gives slope = -Eₐ/R",
      "Higher temperature → higher k → faster reaction",
      "Lower Eₐ → faster reaction at same temperature",
      "For two temperatures: ln(k₂/k₁) = (Eₐ/R)(1/T₁ - 1/T₂)"
    ],
    examples: [
      "Most reactions double in rate for 10°C rise in temperature",
      "Catalysts lower Eₐ, increasing rate without changing ΔH",
      "If Eₐ = 50 kJ/mol, reaction faster than Eₐ = 100 kJ/mol",
      "Enzyme catalysis: Reduces Eₐ from ~100 to ~10 kJ/mol"
    ],
    formulas: [
      "k = Ae⁻ᴱᵃ/ᴿᵀ (Arrhenius equation)",
      "ln k = ln A - Eₐ/(RT)",
      "log k = log A - Eₐ/(2.303RT)",
      "ln(k₂/k₁) = (Eₐ/R)(1/T₁ - 1/T₂)"
    ]
  },
  {
    id: "collision-theory",
    title: "Collision Theory",
    description: "Molecular interpretation of reaction kinetics.",
    keyPoints: [
      "Reactions occur when molecules collide with sufficient energy",
      "Threshold energy: Minimum energy for effective collision",
      "Activation energy: Eₐ = Threshold energy - Average kinetic energy",
      "Not all collisions lead to reaction (steric factor)",
      "Proper orientation required for bond breaking and forming",
      "Rate ∝ (Number of collisions) × (Fraction with E ≥ Eₐ) × (Steric factor)",
      "Temperature increase → more molecules have E ≥ Eₐ",
      "Catalysts provide alternate pathway with lower Eₐ"
    ],
    examples: [
      "H₂ + I₂ → 2HI: H-H and I-I must approach correctly",
      "Gas phase reactions: Collision frequency ~10²⁸ - 10³⁴ L⁻¹ s⁻¹",
      "Catalytic converter: Lowers Eₐ for harmful gas oxidation",
      "Enzymes: Provide active site for proper substrate orientation"
    ],
    formulas: [
      "Eₐ = Threshold energy - Average KE",
      "Fraction with E ≥ Eₐ = e⁻ᴱᵃ/ᴿᵀ",
      "Rate = ZABe⁻ᴱᵃ/ᴿᵀ × p (p = steric factor)"
    ]
  },
  {
    id: "catalysis",
    title: "Catalysis",
    description: "Substances that increase reaction rate without being consumed.",
    keyPoints: [
      "Catalyst: Increases rate by lowering activation energy",
      "Catalyst not consumed, regenerated at end",
      "Doesn't change equilibrium position, only time to reach it",
      "Positive catalyst: Increases rate (most catalysts)",
      "Negative catalyst (inhibitor): Decreases rate",
      "Homogeneous catalysis: Catalyst and reactants in same phase",
      "Heterogeneous catalysis: Different phases (usually solid catalyst)",
      "Auto-catalysis: Product acts as catalyst",
      "Enzyme catalysis: Biological, highly specific"
    ],
    examples: [
      "Haber process: Fe catalyst for N₂ + 3H₂ → 2NH₃",
      "Contact process: V₂O₅ catalyst for 2SO₂ + O₂ → 2SO₃",
      "Hydrogenation: Ni catalyst for vegetable oil → margarine",
      "Enzyme catalase: 2H₂O₂ → 2H₂O + O₂ (very fast)",
      "Acid catalysis: H₂SO₄ for esterification",
      "Autocatalysis: Permanganate oxidation of oxalic acid (Mn²⁺ product catalyzes)"
    ],
    formulas: [
      "With catalyst: Lower Eₐ → higher k → faster rate",
      "Doesn't affect: ΔH, Keq, thermodynamics"
    ]
  }
];



export function ChemistryChapter11() {
  // Fetch questions from database for p-Block Elements (topicId: 55)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '55'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=55');
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
        <Timer className="h-8 w-8 text-green-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 11: Chemical Kinetics</h1>
          <p className="text-muted-foreground">Class XII Chemistry - NEET Syllabus</p>
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
                  <li>Rate of reaction and rate law</li>
                  <li>Order and molecularity of reactions</li>
                  <li>Integrated rate equations (zero, first, second order)</li>
                  <li>Half-life and its applications</li>
                  <li>Arrhenius equation and temperature dependence</li>
                  <li>Collision theory of reaction rates</li>
                  <li>Catalysis and its types</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-green-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Order:</strong> From rate law (experimental)</p>
                    <p><strong>Molecularity:</strong> From mechanism (always integer)</p>
                    <p><strong>First order t₁/₂:</strong> 0.693/k (constant)</p>
                    <p><strong>Arrhenius:</strong> k = Ae⁻ᴱᵃ/ᴿᵀ</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing order with molecularity</p>
                    <p>• Wrong units for rate constant</p>
                    <p>• Using stoichiometry for rate law instead of experiment</p>
                    <p>• Forgetting negative sign in integrated equations</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Formulas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-mono">
                  <p><strong>Zero order:</strong> [A] = [A]₀ - kt, t₁/₂ = [A]₀/(2k)</p>
                  <p><strong>First order:</strong> ln[A] = ln[A]₀ - kt, t₁/₂ = 0.693/k</p>
                  <p><strong>Second order:</strong> 1/[A] = 1/[A]₀ + kt, t₁/₂ = 1/(k[A]₀)</p>
                  <p><strong>Arrhenius:</strong> ln(k₂/k₁) = (Eₐ/R)(1/T₁ - 1/T₂)</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle>Half-Life Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <p className="font-semibold mb-1">Zero Order</p>
                        <p className="font-mono">t₁/₂ = [A]₀/(2k)</p>
                        <p className="text-xs text-muted-foreground mt-1">Depends on [A]₀</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <p className="font-semibold mb-1">First Order</p>
                        <p className="font-mono">t₁/₂ = 0.693/k</p>
                        <p className="text-xs text-muted-foreground mt-1">Independent of [A]₀</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <p className="font-semibold mb-1">Second Order</p>
                        <p className="font-mono">t₁/₂ = 1/(k[A]₀)</p>
                        <p className="text-xs text-muted-foreground mt-1">Inversely proportional</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter11Topics.map((topic, index) => (
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
                              <span className="text-green-500 mt-1">•</span>
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
                            <div key={i} className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
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
                <Card key={q.id} className="border-green-500/20">
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
                        <p className="font-semibold mb-2 text-green-600 dark:text-green-400">Solution:</p>
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
