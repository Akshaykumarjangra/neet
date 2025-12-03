
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Trophy, Zap , Loader2 } from "lucide-react";

const mixedQuestions = [
  {
    id: 1,
    chapter: "Mole Concept",
    question: "Number of atoms in 0.5 moles of C₆H₁₂O₆:",
    options: ["6.022 × 10²³", "12.044 × 10²³", "18.066 × 10²³", "1.2044 × 10²⁴"],
    correctAnswer: 3,
    solution: "1 molecule has 24 atoms. 0.5 mole = 0.5 × 6.022×10²³ × 24 = 1.2044×10²⁴ atoms",
    difficulty: "Hard"
  },
  {
    id: 2,
    chapter: "Atomic Structure",
    question: "Electronic configuration of Cu (Z=29) is:",
    options: ["[Ar] 3d⁹ 4s²", "[Ar] 3d¹⁰ 4s¹", "[Ar] 3d⁸ 4s³", "[Ar] 4s² 3d⁹"],
    correctAnswer: 1,
    solution: "Cu has exceptional configuration [Ar] 3d¹⁰ 4s¹ for extra stability",
    difficulty: "Easy"
  },
  {
    id: 3,
    chapter: "Periodic Table",
    question: "Element with highest electronegativity is:",
    options: ["F", "O", "N", "Cl"],
    correctAnswer: 0,
    solution: "Fluorine (F) has highest electronegativity (4.0)",
    difficulty: "Easy"
  },
  {
    id: 4,
    chapter: "Chemical Bonding",
    question: "Shape of NH₃ according to VSEPR:",
    options: ["Tetrahedral", "Trigonal planar", "Pyramidal", "Bent"],
    correctAnswer: 2,
    solution: "NH₃: 3 bp + 1 lp → Trigonal pyramidal (sp³ hybridization)",
    difficulty: "Easy"
  },
  {
    id: 5,
    chapter: "Gaseous State",
    question: "At STP, 1 mole of any gas occupies:",
    options: ["11.2 L", "22.4 L", "44.8 L", "5.6 L"],
    correctAnswer: 1,
    solution: "At STP, molar volume = 22.4 L for all gases",
    difficulty: "Easy"
  },
  {
    id: 6,
    chapter: "Thermodynamics",
    question: "For spontaneous process at constant T and P:",
    options: ["ΔG > 0", "ΔG < 0", "ΔG = 0", "ΔH < 0"],
    correctAnswer: 1,
    solution: "Spontaneous process: ΔG < 0 (Gibbs energy decreases)",
    difficulty: "Medium"
  },
  {
    id: 7,
    chapter: "Equilibrium",
    question: "If Kp = 0.04 atm at 400K for PCl₅ ⇌ PCl₃ + Cl₂, Kc is:",
    options: ["0.04 M", "1.2 × 10⁻³ M", "1.32 M", "0.0012 M"],
    correctAnswer: 1,
    solution: "Kp = Kc(RT)^Δn. Δn=1. Kc = Kp/(RT) = 0.04/(0.0821×400) = 1.22×10⁻³",
    difficulty: "Hard"
  },
  {
    id: 8,
    chapter: "Redox",
    question: "Oxidation number of Cr in K₂Cr₂O₇:",
    options: ["+4", "+5", "+6", "+7"],
    correctAnswer: 2,
    solution: "2(+1) + 2x + 7(-2) = 0 → x = +6",
    difficulty: "Easy"
  },
  {
    id: 9,
    chapter: "Solutions",
    question: "Molality of solution containing 5g NaOH in 450g water:",
    options: ["0.139 m", "0.278 m", "0.556 m", "1.11 m"],
    correctAnswer: 1,
    solution: "Moles NaOH = 5/40 = 0.125. Molality = 0.125/0.45 = 0.278 m",
    difficulty: "Medium"
  },
  {
    id: 10,
    chapter: "Electrochemistry",
    question: "For galvanic cell, which is true?",
    options: ["ΔG > 0, E° < 0", "ΔG < 0, E° > 0", "ΔG > 0, E° > 0", "ΔG = 0, E° = 0"],
    correctAnswer: 1,
    solution: "Galvanic cell: spontaneous, ΔG < 0, E°cell > 0",
    difficulty: "Medium"
  },
  {
    id: 11,
    chapter: "Chemical Kinetics",
    question: "Half-life of first order reaction is 30 min. Time for 87.5% completion:",
    options: ["60 min", "90 min", "120 min", "150 min"],
    correctAnswer: 1,
    solution: "87.5% = 100→50→25→12.5 (3 half-lives). 3×30 = 90 min",
    difficulty: "Medium"
  },
  {
    id: 12,
    chapter: "Surface Chemistry",
    question: "Which has highest adsorption?",
    options: ["Gases at low T", "Gases at high T", "Liquids at low T", "Solids"],
    correctAnswer: 0,
    solution: "Gases at low temperature have maximum adsorption (exothermic process)",
    difficulty: "Easy"
  },
  {
    id: 13,
    chapter: "s-Block",
    question: "Plaster of Paris is:",
    options: ["CaSO₄", "CaSO₄·H₂O", "CaSO₄·2H₂O", "CaSO₄·½H₂O"],
    correctAnswer: 3,
    solution: "Plaster of Paris: CaSO₄·½H₂O (hemihydrate)",
    difficulty: "Easy"
  },
  {
    id: 14,
    chapter: "p-Block",
    question: "Which noble gas doesn't form compounds?",
    options: ["He", "Ar", "Kr", "Xe"],
    correctAnswer: 0,
    solution: "Helium (He) doesn't form any compounds (smallest, stable)",
    difficulty: "Easy"
  },
  {
    id: 15,
    chapter: "d-Block",
    question: "Lanthanoid contraction is due to:",
    options: ["d-d transition", "Poor shielding of f-electrons", "Pairing energy", "Crystal field"],
    correctAnswer: 1,
    solution: "f-electrons have poor shielding → steady decrease in size",
    difficulty: "Medium"
  },
  {
    id: 16,
    chapter: "Coordination",
    question: "IUPAC name of [Co(NH₃)₆]Cl₃:",
    options: [
      "Hexaamminecobalt(III) chloride",
      "Hexamminecobalt(III) trichloride",
      "Cobalt hexammine chloride",
      "Trichlorohexaamminecobalt"
    ],
    correctAnswer: 0,
    solution: "Hexaamminecobalt(III) chloride ([Complex cation] anion)",
    difficulty: "Medium"
  },
  {
    id: 17,
    chapter: "Organic",
    question: "Carbocation stability order:",
    options: ["1° > 2° > 3°", "3° > 2° > 1°", "2° > 3° > 1°", "All equal"],
    correctAnswer: 1,
    solution: "3° carbocation most stable (hyperconjugation, +I effect)",
    difficulty: "Easy"
  },
  {
    id: 18,
    chapter: "Hydrocarbons",
    question: "Benzene doesn't undergo:",
    options: ["Substitution", "Addition", "Combustion", "Polymerization"],
    correctAnswer: 1,
    solution: "Benzene undergoes electrophilic substitution, not addition (aromaticity preserved)",
    difficulty: "Easy"
  },
  {
    id: 19,
    chapter: "Haloalkanes",
    question: "Best reagent for CH₃CH₂Br → CH₃CH₂OH:",
    options: ["NaOH(aq)", "KOH(alc)", "H₂O", "AgOH"],
    correctAnswer: 0,
    solution: "Aqueous NaOH gives alcohol. Alcoholic KOH gives alkene",
    difficulty: "Medium"
  },
  {
    id: 20,
    question: "Lucas test distinguishes:",
    options: ["1°, 2°, 3° alcohols", "Aldehydes and ketones", "Alcohols and phenols", "Ethers and esters"],
    correctAnswer: 0,
    solution: "Lucas test: 3° alcohol reacts fastest (immediate), 2° slow, 1° very slow",
    difficulty: "Easy"
  }
];

export function ChemistryChapter28() {
  // Fetch questions from database for Biomolecules (topicId: 62)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '62'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=62');
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
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 28: Comprehensive Revision</h1>
          <p className="text-muted-foreground">Mixed Practice - All Chemistry Topics</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="strategy">
            <Target className="h-4 w-4 mr-2" />
            Strategy
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Zap className="h-4 w-4 mr-2" />
            Mixed Test
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete Chemistry Syllabus Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Physical Chemistry</CardTitle>
                    <Badge variant="outline">12 Chapters</Badge>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>• Mole Concept</p>
                    <p>• Atomic Structure</p>
                    <p>• Periodic Table</p>
                    <p>• Chemical Bonding</p>
                    <p>• Gaseous State</p>
                    <p>• Thermodynamics</p>
                    <p>• Equilibrium</p>
                    <p>• Redox Reactions</p>
                    <p>• Solutions</p>
                    <p>• Electrochemistry</p>
                    <p>• Chemical Kinetics</p>
                    <p>• Surface Chemistry</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Inorganic Chemistry</CardTitle>
                    <Badge variant="outline">5 Chapters</Badge>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>• Hydrogen</p>
                    <p>• s-Block Elements</p>
                    <p>• p-Block Elements</p>
                    <p>• d & f-Block Elements</p>
                    <p>• Coordination Compounds</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Organic Chemistry</CardTitle>
                    <Badge variant="outline">11 Chapters</Badge>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>• General Organic Chemistry</p>
                    <p>• Hydrocarbons</p>
                    <p>• Haloalkanes & Haloarenes</p>
                    <p>• Alcohols, Phenols, Ethers</p>
                    <p>• Aldehydes, Ketones, Acids</p>
                    <p>• Amines</p>
                    <p>• Biomolecules</p>
                    <p>• Polymers</p>
                    <p>• Chemistry in Everyday Life</p>
                    <p>• Environmental Chemistry</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    NEET Chemistry Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">High Weightage Topics (Focus 70% time):</h4>
                    <p className="text-muted-foreground">
                      • Organic Chemistry (35-40% of paper)<br/>
                      • Chemical Bonding & Equilibrium<br/>
                      • Coordination Compounds<br/>
                      • Electrochemistry & Kinetics
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Scoring Topics (Quick revision):</h4>
                    <p className="text-muted-foreground">
                      • Periodic Properties<br/>
                      • s & p Block Elements (factual)<br/>
                      • Environmental Chemistry
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>NEET Chemistry Exam Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Time Management (60 min for 45 questions)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
                    <span>Organic Chemistry (15-18 questions)</span>
                    <Badge>25 min</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                    <span>Physical Chemistry (15-18 questions)</span>
                    <Badge>20 min</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                    <span>Inorganic Chemistry (12-15 questions)</span>
                    <Badge>15 min</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Question Approach Order</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Start with <strong>Inorganic factual questions</strong> (quick & scoring)</li>
                  <li>Then <strong>Organic reaction mechanism</strong> (if well-prepared)</li>
                  <li>Next <strong>Physical numerical problems</strong> (time-consuming)</li>
                  <li>Leave <strong>lengthy calculations</strong> for last</li>
                  <li>Review marked questions in remaining time</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600 dark:text-red-400">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>❌ Not reading question completely</p>
                    <p>❌ Calculation errors in mole concept</p>
                    <p>❌ Confusing similar named reactions</p>
                    <p>❌ Wrong IUPAC nomenclature</p>
                    <p>❌ Forgetting exceptions (Cr, Cu config)</p>
                    <p>❌ Sign errors in thermodynamics</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400">Pro Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>✓ Memorize periodic table trends</p>
                    <p>✓ Practice named reactions daily</p>
                    <p>✓ Make formula sheets for each chapter</p>
                    <p>✓ Revise NCERT line by line</p>
                    <p>✓ Solve previous year papers</p>
                    <p>✓ Attempt mock tests regularly</p>
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
                <CardTitle>Mixed Practice Test - All Topics</CardTitle>
                {showSolutions && (
                  <Badge variant={score >= 16 ? "default" : score >= 12 ? "secondary" : "destructive"}>
                    Score: {score}/{mixedQuestions.length} ({Math.round(score/mixedQuestions.length*100)}%)
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {mixedQuestions.map((q, index) => (
                <Card key={q.id} className="border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                          <Badge variant="outline">{q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}</Badge>
                          <Badge variant="secondary">{q.chapter}</Badge>
                        </div>
                        <p className="font-medium">Q{index + 1}. {q.questionText}</p>
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

              {showSolutions && (
                <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Performance Analysis</h3>
                    <div className="space-y-2 text-sm">
                      <p>Total Score: {score}/20 ({Math.round(score/20*100)}%)</p>
                      <p>Expected NEET Score: ~{Math.round(score/20*180)} marks (out of 180)</p>
                      {score >= 16 && <p className="text-green-600 dark:text-green-400">🎉 Excellent! Keep up the great work!</p>}
                      {score >= 12 && score < 16 && <p className="text-yellow-600 dark:text-yellow-400">👍 Good effort! Review weak areas.</p>}
                      {score < 12 && <p className="text-red-600 dark:text-red-400">💪 Need more practice! Focus on concepts.</p>}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        
          )}</TabsContent>
      </Tabs>
    </div>
  );
}
