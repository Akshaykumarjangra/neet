
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, TrendingUp , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter12Topics: Topic[] = [
  {
    id: "rate-of-reaction",
    title: "Rate of Reaction",
    description: "Understanding how fast reactions proceed and factors affecting them.",
    keyPoints: [
      "Rate = -Δ[Reactant]/Δt = +Δ[Product]/Δt",
      "Units: mol L⁻¹ s⁻¹ (concentration/time)",
      "Average rate: measured over time interval",
      "Instantaneous rate: rate at specific moment (slope of tangent)",
      "For aA + bB → cC + dD: Rate = -1/a(d[A]/dt) = -1/b(d[B]/dt) = +1/c(d[C]/dt)",
      "Factors: concentration, temperature, catalyst, surface area"
    ],
    examples: [
      "2HI → H₂ + I₂: Rate = -½(d[HI]/dt) = d[H₂]/dt",
      "Higher temperature → faster rate (molecules have more energy)",
      "Catalyst lowers activation energy → faster reaction",
      "Powdered reactant → larger surface area → faster reaction"
    ],
    formulas: [
      "Rate = -Δ[R]/Δt = +Δ[P]/Δt",
      "For aA → products: Rate = -1/a × d[A]/dt",
      "Arrhenius: k = Ae^(-Ea/RT)"
    ]
  },
  {
    id: "rate-law",
    title: "Rate Law and Order of Reaction",
    description: "Mathematical relationship between rate and concentration.",
    keyPoints: [
      "Rate law: Rate = k[A]^m[B]^n (k = rate constant)",
      "Order of reaction: m + n (sum of exponents)",
      "Order determined experimentally, NOT from stoichiometry",
      "Zero order: Rate = k (independent of concentration)",
      "First order: Rate = k[A] (directly proportional)",
      "Second order: Rate = k[A]² or k[A][B]"
    ],
    examples: [
      "NH₄NO₂ → N₂ + 2H₂O: First order, Rate = k[NH₄NO₂]",
      "2NO₂ → 2NO + O₂: Second order, Rate = k[NO₂]²",
      "H₂ + I₂ → 2HI: Rate = k[H₂][I₂] (second order overall)",
      "Zero order: decomposition on catalyst surface"
    ],
    formulas: [
      "Rate = k[A]^m[B]^n",
      "Order = m + n",
      "Units of k depend on order",
      "Zero order k: mol L⁻¹ s⁻¹",
      "First order k: s⁻¹",
      "Second order k: L mol⁻¹ s⁻¹"
    ]
  },
  {
    id: "integrated-rate",
    title: "Integrated Rate Equations",
    description: "Concentration-time relationships for different orders.",
    keyPoints: [
      "Zero order: [A] = [A]₀ - kt (linear plot [A] vs t)",
      "First order: ln[A] = ln[A]₀ - kt (linear plot ln[A] vs t)",
      "Second order: 1/[A] = 1/[A]₀ + kt (linear plot 1/[A] vs t)",
      "t₁/₂ (half-life): time for concentration to become half",
      "Zero order: t₁/₂ = [A]₀/2k (depends on initial concentration)",
      "First order: t₁/₂ = 0.693/k (independent of concentration)"
    ],
    examples: [
      "Radioactive decay: First order, t₁/₂ = 0.693/k",
      "If t₁/₂ constant → first order reaction",
      "If t₁/₂ increases with time → zero order",
      "¹⁴C dating uses first order kinetics, t₁/₂ = 5730 years"
    ],
    formulas: [
      "Zero: [A] = [A]₀ - kt, t₁/₂ = [A]₀/2k",
      "First: ln[A] = ln[A]₀ - kt, t₁/₂ = 0.693/k",
      "Second: 1/[A] = 1/[A]₀ + kt, t₁/₂ = 1/k[A]₀",
      "First order: log[A] = log[A]₀ - kt/2.303"
    ]
  },
  {
    id: "temperature-effect",
    title: "Temperature Dependence - Arrhenius Equation",
    description: "How temperature affects reaction rate.",
    keyPoints: [
      "Arrhenius equation: k = Ae^(-Ea/RT)",
      "A = frequency factor (pre-exponential factor)",
      "Ea = activation energy (minimum energy needed)",
      "Higher temperature → more molecules have Ea → faster rate",
      "Rule of thumb: rate doubles for every 10°C rise",
      "Log form: ln k = ln A - Ea/RT"
    ],
    examples: [
      "Food spoilage slower in refrigerator (lower T)",
      "Cooking faster at high temperature",
      "For reaction with Ea = 50 kJ/mol, k increases ~100 times from 25°C to 100°C",
      "Plot ln k vs 1/T gives straight line, slope = -Ea/R"
    ],
    formulas: [
      "k = Ae^(-Ea/RT)",
      "ln k = ln A - Ea/RT",
      "log k = log A - Ea/2.303RT",
      "ln(k₂/k₁) = Ea/R(1/T₁ - 1/T₂)"
    ]
  },
  {
    id: "collision-theory",
    title: "Collision Theory and Catalysis",
    description: "Molecular basis of reaction rates and role of catalysts.",
    keyPoints: [
      "Reactions occur when molecules collide with sufficient energy",
      "Effective collision: proper orientation + energy ≥ Ea",
      "Only small fraction of collisions lead to reaction",
      "Catalyst: increases rate without being consumed",
      "Catalyst lowers Ea, provides alternate pathway",
      "Homogeneous catalyst: same phase as reactants"
    ],
    examples: [
      "V₂O₅ catalyzes SO₂ + O₂ → SO₃ (Contact process)",
      "Fe catalyst in Haber process: N₂ + 3H₂ → 2NH₃",
      "Enzymes: biological catalysts (highly specific)",
      "Pt catalyst in automobile catalytic converter"
    ],
    formulas: [
      "Ea (uncatalyzed) > Ea (catalyzed)",
      "Rate increases but ΔH unchanged",
      "Catalyst recovered unchanged at end"
    ]
  }
];



export function ChemistryChapter12() {
  // Fetch questions from database for Organic Chemistry - Basic Principles (topicId: 47)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '47'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=47');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({});
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

  const score = Object.entries(userAnswers).filter(
    ([qId, answer]) => {
      const question = practiceQuestions.find(q => q.id === parseInt(qId));
      return question && answer === question.correctAnswer;
    }
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-orange-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 12: Chemical Kinetics</h1>
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
          <TabsTrigger value="practice">
            <Calculator className="h-4 w-4 mr-2" />
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
                  <li>Rate of chemical reactions and factors affecting it</li>
                  <li>Rate law and order of reactions</li>
                  <li>Integrated rate equations for zero, first, and second order</li>
                  <li>Half-life and its significance</li>
                  <li>Temperature dependence and Arrhenius equation</li>
                  <li>Collision theory and catalysis</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-blue-500/20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">Order 0</Badge>
                    <CardTitle className="text-lg">Zero Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-mono">[A] = [A]₀ - kt</p>
                    <p className="font-mono">t₁/₂ = [A]₀/2k</p>
                    <p className="text-xs text-muted-foreground">Rate independent of [A]</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500">Order 1</Badge>
                    <CardTitle className="text-lg">First Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-mono">ln[A] = ln[A]₀ - kt</p>
                    <p className="font-mono">t₁/₂ = 0.693/k</p>
                    <p className="text-xs text-muted-foreground">Constant half-life</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">Order 2</Badge>
                    <CardTitle className="text-lg">Second Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-mono">1/[A] = 1/[A]₀ + kt</p>
                    <p className="font-mono">t₁/₂ = 1/k[A]₀</p>
                    <p className="text-xs text-muted-foreground">t₁/₂ ∝ 1/[A]₀</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    Arrhenius Equation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-mono text-lg">k = Ae^(-Ea/RT)</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-semibold">Higher Temperature</p>
                      <p className="text-xs text-muted-foreground">More molecules have E ≥ Ea → Faster rate</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Catalyst Effect</p>
                      <p className="text-xs text-muted-foreground">Lowers Ea → Increases k → Faster rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle className="text-lg">NEET Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ First order t₁/₂ is constant (independent of concentration)</p>
                  <p>✓ Units of k: Zero (mol L⁻¹ s⁻¹), First (s⁻¹), Second (L mol⁻¹ s⁻¹)</p>
                  <p>✓ Linear plot identifies order: [A] vs t (0), ln[A] vs t (1), 1/[A] vs t (2)</p>
                  <p>✓ Catalyst lowers Ea but doesn't change ΔH</p>
                  <p>✓ Rate typically doubles for every 10°C temperature rise</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter12Topics.map((topic, index) => (
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
                              <span className="text-primary mt-1">•</span>
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
                        <h4 className="font-semibold mb-3">Examples & Applications</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-secondary/10 p-3 rounded-lg border-l-4 border-primary">
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Practice Questions</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Test your understanding with NEET-level questions
                  </p>
                </div>
                {showSolutions && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{score}/{practiceQuestions.length}</p>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {practiceQuestions.map((q, index) => (
                <Card key={q.id} className={`${
                  showSolutions 
                    ? userAnswers[q.id] === q.correctAnswer 
                      ? 'border-green-500' 
                      : userAnswers[q.id] !== undefined 
                        ? 'border-red-500' 
                        : ''
                    : ''
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Q{index + 1}. {q.questionText}</CardTitle>
                      <Badge variant={
                        q.difficultyLevel === 1 ? 'secondary' : 
                        q.difficultyLevel === 2 ? 'default' : 
                        'destructive'
                      }>
                        {q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {q.options.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={() => !showSolutions && handleAnswerSelect(q.id, String.fromCharCode(65 + idx))}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            showSolutions
                              ? String.fromCharCode(65 + idx) === q.correctAnswer
                                ? 'bg-green-100 border-green-500 dark:bg-green-900/20'
                                : userAnswers[q.id] === String.fromCharCode(65 + idx)
                                  ? 'bg-red-100 border-red-500 dark:bg-red-900/20'
                                  : ''
                              : userAnswers[q.id] === String.fromCharCode(65 + idx)
                                ? 'bg-primary/10 border-primary'
                                : 'hover:bg-muted'
                          }`}
                        >
                          <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                          {typeof option === "string" ? option : option.text}
                        </div>
                      ))}
                    </div>

                    {showSolutions && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h5 className="font-semibold mb-2">Solution:</h5>
                        <p className="text-sm">{q.solutionDetail}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-3 pt-4">
                {!showSolutions ? (
                  <Button onClick={checkAnswers} className="flex-1" size="lg">
                    Submit Answers
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" className="flex-1" size="lg">
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
