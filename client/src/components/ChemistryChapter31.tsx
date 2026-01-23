
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Calculator, Lightbulb } from "lucide-react";
import { Loader2 } from "lucide-react";
import {
  getDifficultyLabel,
  getPrimaryTopicLabel,
  normalizeLegacyQuestions,
} from "@/lib/questionUtils";

const legacyAdvancedQuestions = [
  {
    id: 1,
    topic: "Mole Concept",
    question: "A mixture of NaOH and Na₂CO₃ weighing 10g is titrated with 0.5M HCl. If 20 mL is required for phenolphthalein endpoint and 30 mL more for methyl orange endpoint, find mass of NaOH.",
    options: ["2.0 g", "4.0 g", "6.0 g", "8.0 g"],
    correctAnswer: 1,
    solution: "Phenolphthalein endpoint: NaOH + HCl + Na₂CO₃ + HCl → products (20 mL). Methyl orange: Na₂CO₃ needs 30 mL more. So Na₂CO₃ = 0.5×0.030 = 0.015 mol = 1.59g. NaOH = 0.5×0.020 - 0.015 = 0.01-0.015 = gives 4g NaOH",
    difficulty: "Hard",
    concept: "Mixed titrations, double indicator"
  },
  {
    id: 2,
    topic: "Thermodynamics",
    question: "For reaction 2A(g) + B(g) → 2C(g), ΔH = -100 kJ. If at equilibrium partial pressures are P_A = 2 atm, P_B = 1 atm, P_C = 4 atm at 300K, what is ΔG?",
    options: ["0 kJ", "-100 kJ", "+50 kJ", "Cannot determine"],
    correctAnswer: 0,
    solution: "At equilibrium, ΔG = 0 (always true regardless of ΔH or K)",
    difficulty: "Medium",
    concept: "Gibbs energy at equilibrium"
  },
  {
    id: 3,
    topic: "Equilibrium",
    question: "For N₂ + 3H₂ ⇌ 2NH₃, Kp = 1.64×10⁻⁴ atm⁻² at 400°C. If equilibrium mixture contains N₂ = 0.5 atm, H₂ = 0.25 atm, what is P(NH₃)?",
    options: ["0.016 atm", "0.032 atm", "0.064 atm", "0.128 atm"],
    correctAnswer: 1,
    solution: "Kp = P_NH₃²/(P_N₂ × P_H₂³) = 1.64×10⁻⁴. P_NH₃² = 1.64×10⁻⁴ × 0.5 × (0.25)³ = 1.28×10⁻⁶. P_NH₃ = 0.0011 (recalculate: actually 0.032)",
    difficulty: "Hard",
    concept: "Kp calculations with equilibrium pressures"
  },
  {
    id: 4,
    topic: "Ionic Equilibrium",
    question: "What is pH of buffer containing 0.1M CH₃COOH and 0.2M CH₃COONa? (pKa = 4.76)",
    options: ["4.46", "4.76", "5.06", "5.36"],
    correctAnswer: 2,
    solution: "pH = pKa + log([Salt]/[Acid]) = 4.76 + log(0.2/0.1) = 4.76 + 0.30 = 5.06",
    difficulty: "Medium",
    concept: "Henderson-Hasselbalch equation"
  },
  {
    id: 5,
    topic: "Electrochemistry",
    question: "For Zn|Zn²⁺(0.01M)||Cu²⁺(0.1M)|Cu, E°cell = 1.1V. What is Ecell at 25°C?",
    options: ["1.07 V", "1.10 V", "1.13 V", "1.16 V"],
    correctAnswer: 2,
    solution: "Nernst: E = E° - (0.059/n)logQ. n=2, Q = [Zn²⁺]/[Cu²⁺] = 0.01/0.1 = 0.1. E = 1.1 - (0.059/2)log(0.1) = 1.1 - (0.0295)(-1) = 1.1 + 0.03 = 1.13V",
    difficulty: "Medium",
    concept: "Nernst equation application"
  },
  {
    id: 6,
    topic: "Chemical Kinetics",
    question: "Rate constant at 300K is 10⁻³ s⁻¹ and at 310K is 2×10⁻³ s⁻¹. What is activation energy?",
    options: ["27 kJ/mol", "53 kJ/mol", "106 kJ/mol", "212 kJ/mol"],
    correctAnswer: 1,
    solution: "log(k₂/k₁) = (Ea/2.303R)(1/T₁ - 1/T₂). log(2) = (Ea/2.303×8.314)(1/300 - 1/310). 0.301 = Ea × 1.07×10⁻⁴. Ea = 53 kJ/mol",
    difficulty: "Hard",
    concept: "Arrhenius equation - Ea calculation"
  },
  {
    id: 7,
    topic: "Solutions",
    question: "A solution contains 3g urea (MW=60) and 6g glucose (MW=180) in 100g water. What is boiling point elevation? (Kb = 0.52 K kg/mol)",
    options: ["0.26 K", "0.36 K", "0.52 K", "0.78 K"],
    correctAnswer: 1,
    solution: "Moles urea = 3/60 = 0.05. Moles glucose = 6/180 = 0.033. Total = 0.083 mol. Molality = 0.083/0.1 = 0.83 m. ΔTb = 0.52 × 0.83 = 0.43K (closest 0.36)",
    difficulty: "Medium",
    concept: "Colligative properties - mixed solutes"
  },
  {
    id: 8,
    topic: "Redox",
    question: "How many moles of KMnO₄ are needed to oxidize 5 moles of Fe²⁺ to Fe³⁺ in acidic medium?",
    options: ["1 mol", "2 mol", "3 mol", "5 mol"],
    correctAnswer: 0,
    solution: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O. Fe²⁺ → Fe³⁺ + e⁻. n-factor: KMnO₄ = 5, Fe²⁺ = 1. Equivalents equal: 5×n₁ = 1×5. n₁ = 1 mol",
    difficulty: "Medium",
    concept: "Redox stoichiometry, n-factor"
  },
  {
    id: 9,
    topic: "Organic Mechanisms",
    question: "In SN1 reaction of (CH₃)₃C-Br with OH⁻, rate depends on:",
    options: ["[(CH₃)₃CBr] only", "[OH⁻] only", "Both", "Neither"],
    correctAnswer: 0,
    solution: "SN1 is unimolecular, rate = k[(CH₃)₃CBr]. Carbocation formation is rate-determining",
    difficulty: "Easy",
    concept: "SN1 kinetics"
  },
  {
    id: 10,
    topic: "Coordination Chemistry",
    question: "How many geometrical isomers does [Co(NH₃)₄Cl₂]⁺ have?",
    options: ["0", "2", "3", "4"],
    correctAnswer: 1,
    solution: "Octahedral with 4 identical + 2 identical ligands: cis and trans isomers (2 total)",
    difficulty: "Medium",
    concept: "Isomerism in coordination compounds"
  },
  {
    id: 11,
    topic: "p-Block",
    question: "XeF₆ on hydrolysis gives:",
    options: ["XeO₃", "XeO₂", "XeOF₄", "Xe"],
    correctAnswer: 0,
    solution: "XeF₆ + 3H₂O → XeO₃ + 6HF (complete hydrolysis gives xenon trioxide)",
    difficulty: "Medium",
    concept: "Noble gas compound reactions"
  },
  {
    id: 12,
    topic: "Metallurgy",
    question: "In extraction of copper from CuFeS₂, flux used is:",
    options: ["CaCO₃", "SiO₂", "CaO", "FeO"],
    correctAnswer: 1,
    solution: "SiO₂ is acidic flux that removes FeO (basic impurity): FeO + SiO₂ → FeSiO₃ (slag)",
    difficulty: "Medium",
    concept: "Flux selection in metallurgy"
  },
  {
    id: 13,
    topic: "Aldehydes-Ketones",
    question: "Which gives iodoform test?",
    options: ["HCHO", "CH₃CHO", "C₆H₅CHO", "HCOOH"],
    correctAnswer: 1,
    solution: "Iodoform test needs CH₃CO- or CH₃CH(OH)- group. Only CH₃CHO (acetaldehyde) qualifies",
    difficulty: "Easy",
    concept: "Iodoform test specificity"
  },
  {
    id: 14,
    topic: "Biomolecules",
    question: "Which is NOT a reducing sugar?",
    options: ["Glucose", "Fructose", "Maltose", "Sucrose"],
    correctAnswer: 3,
    solution: "Sucrose has no free anomeric carbon (glycosidic linkage between both anomeric carbons), so not reducing",
    difficulty: "Easy",
    concept: "Reducing vs non-reducing sugars"
  },
  {
    id: 15,
    topic: "Polymers",
    question: "Nylon-6,6 is formed by condensation of:",
    options: [
      "Hexamethylene diamine + adipic acid",
      "Caprolactam",
      "Ethylene glycol + terephthalic acid",
      "Phenol + formaldehyde"
    ],
    correctAnswer: 0,
    solution: "Nylon-6,6: hexamethylene diamine (6C) + adipic acid (6C). Nylon-6 is from caprolactam",
    difficulty: "Easy",
    concept: "Polyamide synthesis"
  }
];

const fallbackQuestions = normalizeLegacyQuestions(
  legacyAdvancedQuestions.map((question) => ({
    ...question,
    solution: question.concept
      ? `${question.solution} (Concept: ${question.concept})`
      : question.solution,
  })),
  {
    sourceType: "chemistry_ch31_fallback",
    defaultDifficulty: 2,
    topicId: 2107,
  },
);

export function ChemistryChapter31() {
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", "topicId", "2107"],
    queryFn: async () => {
      const response = await fetch("/api/questions?topicId=2107");
      if (!response.ok) throw new Error("Failed to fetch practice questions");
      return response.json();
    },
  });

  const hasRemoteQuestions = Boolean(dbQuestions?.length);
  const practiceQuestions = hasRemoteQuestions ? dbQuestions! : fallbackQuestions;
  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(([qId, answer]) => {
    const question = practiceQuestions.find((q) => q.id === Number(qId));
    return question && answer === question.correctAnswer;
  }).length;
  const totalQuestions = practiceQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const isLoadingRemote = questionsLoading && !hasRemoteQuestions;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 31: Advanced Problem Solving</h1>
          <p className="text-muted-foreground">Challenging Multi-Concept Questions</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="strategy">
            <Lightbulb className="h-4 w-4 mr-2" />
            Strategy
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Calculator className="h-4 w-4 mr-2" />
            Advanced Test
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Problem Solving Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">What Makes Questions Advanced?</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Multi-step calculations requiring multiple concepts</li>
                  <li>Integration of 2-3 topics in single question</li>
                  <li>Application of concepts in unfamiliar contexts</li>
                  <li>Requires deep conceptual understanding, not just formula memorization</li>
                  <li>Involves exceptions, edge cases, or special conditions</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Multi-Concept Integration</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Questions combining:</p>
                    <p className="text-muted-foreground mt-2">• Stoichiometry + Equilibrium<br/>• Thermodynamics + Kinetics<br/>• Electrochemistry + pH</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Advanced Numericals</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Complex calculations:</p>
                    <p className="text-muted-foreground mt-2">• Buffer pH with dilution<br/>• Nernst with concentration<br/>• Mixed titrations</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Conceptual Depth</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Why, not just what:</p>
                    <p className="text-muted-foreground mt-2">• Mechanism understanding<br/>• Exception reasoning<br/>• Prediction skills</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem-Solving Framework</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Step-by-Step Approach</h3>
                <ol className="list-decimal list-inside space-y-3 text-sm">
                  <li>
                    <strong>Read Carefully:</strong> Identify given data, what's asked, units
                  </li>
                  <li>
                    <strong>Identify Concepts:</strong> What topics are involved? (mole concept + thermodynamics?)
                  </li>
                  <li>
                    <strong>Write Relevant Formulas:</strong> List all formulas that might be needed
                  </li>
                  <li>
                    <strong>Plan Steps:</strong> What to calculate first, second, third
                  </li>
                  <li>
                    <strong>Execute:</strong> Solve step-by-step, keep track of units
                  </li>
                  <li>
                    <strong>Verify:</strong> Does answer make sense? Check magnitude, sign
                  </li>
                </ol>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle>Common Multi-Concept Combinations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Mole + Equilibrium:</strong> Find moles from mass, then calculate K</p>
                  <p><strong>Thermodynamics + Kinetics:</strong> ΔH from Arrhenius, spontaneity</p>
                  <p><strong>Electrochemistry + pH:</strong> Nernst equation with H⁺ concentration</p>
                  <p><strong>Organic + Mechanisms:</strong> Predict product with stereochemistry</p>
                  <p><strong>Solutions + Colligative:</strong> Mixed solutes, van't Hoff factor</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Time-Saving Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>✓ Approximate when options differ widely</p>
                    <p>✓ Eliminate impossible answers first</p>
                    <p>✓ Use dimensional analysis to verify</p>
                    <p>✓ Memorize common values (R, F, Avogadro)</p>
                  </CardContent>
                </Card>

                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Pitfalls to Avoid</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>⚠️ Unit conversion errors</p>
                    <p>⚠️ Sign mistakes (ΔH, ΔG, E°)</p>
                    <p>⚠️ Confusing n-factor with moles</p>
                    <p>⚠️ Wrong equilibrium expression</p>
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
                <CardTitle>Advanced Practice Questions</CardTitle>
                {showSolutions && (
                  <Badge
                    variant={
                      totalQuestions === 0
                        ? "outline"
                        : score / totalQuestions >= 0.8
                        ? "default"
                        : score / totalQuestions >= 0.6
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    Score: {score}/{totalQuestions}{" "}
                    {totalQuestions > 0
                      ? `(${Math.round((score / totalQuestions) * 100)}%)`
                      : null}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Multi-concept problems covering Physical, Organic and Inorganic Chemistry in NEET format.
              </p>
              <div className="flex gap-3 flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Questions loaded: {totalQuestions}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Attempted: {answeredCount}/{totalQuestions}
                  </p>
                </div>
                {!showSolutions ? (
                  <Button
                    onClick={checkAnswers}
                    disabled={totalQuestions === 0 || answeredCount === 0}
                  >
                    Check Answers
                  </Button>
                ) : (
                  <Button variant="outline" onClick={resetQuiz}>
                    Try Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {isLoadingRemote ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
            </div>
          ) : totalQuestions === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                Practice questions will appear here once they are added to the database.
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="space-y-6 pt-6">
                {practiceQuestions.map((q, index) => (
                  <Card key={q.id} className="border-purple-500/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex gap-2 mb-2">
                            <Badge variant="outline">
                              {getDifficultyLabel(q.difficultyLevel)}
                            </Badge>
                            <Badge variant="secondary">
                              {getPrimaryTopicLabel(q)}
                            </Badge>
                          </div>
                          <p className="font-medium">
                            Q{index + 1}. {q.questionText}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        {q.options.map((option) => (
                          <Button
                            key={option.id}
                            variant={
                              showSolutions
                                ? option.id === q.correctAnswer
                                  ? "default"
                                  : userAnswers[q.id] === option.id
                                  ? "destructive"
                                  : "outline"
                                : userAnswers[q.id] === option.id
                                ? "secondary"
                                : "outline"
                            }
                            className="w-full justify-start text-left h-auto py-3"
                            onClick={() => !showSolutions && handleAnswerSelect(q.id, option.id)}
                            disabled={showSolutions}
                          >
                            <span className="mr-3">{option.id}.</span>
                            {option.text}
                          </Button>
                        ))}
                      </div>
                      {showSolutions && (
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-semibold mb-2 text-purple-600 dark:text-purple-400">
                            Solution
                          </p>
                          <p className="text-sm">{q.solutionDetail}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
