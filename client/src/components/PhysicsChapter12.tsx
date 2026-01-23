import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisualizationTab } from "@/components/VisualizationTab";
import { BookOpen, Lightbulb, Calculator, TrendingUp, CheckCircle, XCircle , Loader2 } from "lucide-react";

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
    id: "kinetic-theory-basics",
    title: "Kinetic Theory of Gases - Basic Postulates",
    description: "Fundamental assumptions about molecular behavior in gases.",
    keyPoints: [
      "Gases consist of large number of identical molecules",
      "Molecules are in continuous random motion",
      "Collisions are perfectly elastic",
      "No intermolecular forces except during collisions",
      "Volume of molecules negligible compared to container"
    ],
    examples: [
      "Air molecules moving randomly at room temperature",
      "Gas pressure due to molecular collisions",
      "Brownian motion of particles"
    ],
    formulas: [
      "Number density: n = N/V",
      "Average spacing >> molecular size"
    ]
  },
  {
    id: "pressure-kinetic",
    title: "Pressure and Kinetic Energy",
    description: "Relating macroscopic pressure to microscopic molecular motion.",
    keyPoints: [
      "Pressure arises from momentum transfer during collisions",
      "P = (1/3)ρ⟨v²⟩ where ⟨v²⟩ is mean square velocity",
      "Pressure proportional to average kinetic energy",
      "Temperature is measure of average kinetic energy"
    ],
    examples: [
      "Inflated balloon: molecules hitting walls create pressure",
      "Heating increases molecular speed and pressure",
      "Vacuum has no pressure (no molecules)"
    ],
    formulas: [
      "P = (1/3)ρ⟨v²⟩",
      "P = (1/3)nm⟨v²⟩",
      "KE_avg = (3/2)kT"
    ]
  },
  {
    id: "molecular-speeds",
    title: "Molecular Speeds",
    description: "Different ways to characterize the speeds of gas molecules.",
    keyPoints: [
      "RMS speed: v_rms = √⟨v²⟩ = √(3RT/M)",
      "Average speed: v_avg = √(8RT/πM)",
      "Most probable speed: v_mp = √(2RT/M)",
      "Relation: v_rms > v_avg > v_mp"
    ],
    examples: [
      "Lighter molecules move faster at same temperature",
      "Hydrogen diffuses faster than oxygen",
      "Temperature increase speeds up all molecules"
    ],
    formulas: [
      "v_rms = √(3RT/M) = √(3kT/m)",
      "v_avg = √(8RT/πM)",
      "v_mp = √(2RT/M)",
      "v_rms : v_avg : v_mp = √3 : √(8/π) : √2"
    ]
  },
  {
    id: "ideal-gas-equation",
    title: "Ideal Gas Equation",
    description: "Relationship between pressure, volume, and temperature for ideal gases.",
    keyPoints: [
      "PV = nRT (ideal gas equation)",
      "R = 8.314 J/(mol·K) is universal gas constant",
      "Can also write as PV = NkT where k is Boltzmann constant",
      "Combines Boyle's, Charles's, and Avogadro's laws"
    ],
    examples: [
      "At STP: 1 mole gas occupies 22.4 L",
      "Doubling temperature doubles pressure at constant volume",
      "Balloon expands when heated"
    ],
    formulas: [
      "PV = nRT",
      "PV = NkT",
      "R = NAk (NA = Avogadro's number)",
      "k = 1.38 × 10⁻²³ J/K"
    ]
  },
  {
    id: "degrees-of-freedom",
    title: "Degrees of Freedom",
    description: "Independent ways a molecule can possess energy.",
    keyPoints: [
      "Monoatomic: f = 3 (translational only)",
      "Diatomic: f = 5 (3 translational + 2 rotational)",
      "Polyatomic: f = 6 (3 translational + 3 rotational)",
      "Energy per degree of freedom: (1/2)kT"
    ],
    examples: [
      "Helium (monoatomic): 3 degrees",
      "Nitrogen (diatomic): 5 degrees",
      "Methane (polyatomic): 6 degrees"
    ],
    formulas: [
      "Energy per molecule: E = (f/2)kT",
      "Molar energy: U = (f/2)RT",
      "Cᵥ = (f/2)R",
      "Cₚ = ((f+2)/2)R"
    ]
  },
  {
    id: "specific-heats",
    title: "Specific Heat Capacities",
    description: "Heat capacity at constant volume and constant pressure.",
    keyPoints: [
      "Cᵥ: heat capacity at constant volume",
      "Cₚ: heat capacity at constant pressure",
      "Mayer's relation: Cₚ - Cᵥ = R",
      "γ = Cₚ/Cᵥ (adiabatic index)"
    ],
    examples: [
      "Monoatomic: γ = 5/3 = 1.67",
      "Diatomic: γ = 7/5 = 1.40",
      "Polyatomic: γ = 4/3 = 1.33"
    ],
    formulas: [
      "Cₚ - Cᵥ = R",
      "γ = Cₚ/Cᵥ = 1 + 2/f",
      "Monoatomic: Cᵥ = (3/2)R, Cₚ = (5/2)R",
      "Diatomic: Cᵥ = (5/2)R, Cₚ = (7/2)R"
    ]
  },
  {
    id: "mean-free-path",
    title: "Mean Free Path",
    description: "Average distance traveled by a molecule between collisions.",
    keyPoints: [
      "λ = average distance between successive collisions",
      "Inversely proportional to pressure",
      "Inversely proportional to molecular size",
      "λ = kT/(√2πd²P)"
    ],
    examples: [
      "At atmospheric pressure: λ ≈ 68 nm for air",
      "In vacuum, mean free path is very large",
      "Higher pressure reduces mean free path"
    ],
    formulas: [
      "λ = 1/(√2πnd²)",
      "λ = kT/(√2πd²P)",
      "d = molecular diameter",
      "n = number density"
    ]
  }
];



export function PhysicsChapter12() {
  // Fetch questions from database for Kinetic Theory (topicId: 22)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '22'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=22');
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

  const score = Object.entries(userAnswers).filter(
    ([qId, answer]) => {
      const question = practiceQuestions.find(q => q.id === parseInt(qId));
      return question && answer === question.correctAnswer;
    }
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-cyan-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 12: Kinetic Theory of Gases</h1>
          <p className="text-muted-foreground">Class XII Physics - NEET Syllabus</p>
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
            <Calculator className="h-4 w-4 mr-2" />
            Visualizations
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <TrendingUp className="h-4 w-4 mr-2" />
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
                  <li>Kinetic theory postulates and molecular behavior</li>
                  <li>Relation between pressure and molecular motion</li>
                  <li>Different types of molecular speeds</li>
                  <li>Ideal gas equation from kinetic theory</li>
                  <li>Degrees of freedom and energy distribution</li>
                  <li>Specific heat capacities of gases</li>
                  <li>Mean free path and collision frequency</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-cyan-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-cyan-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• v_rms = √(3RT/M)</p>
                    <p>• PV = nRT</p>
                    <p>• γ = Cₚ/Cᵥ = 1 + 2/f</p>
                    <p>• KE_avg = (3/2)kT</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Using g/mol instead of kg/mol for M</p>
                    <p>• Confusing v_rms, v_avg, and v_mp</p>
                    <p>• Wrong degrees of freedom for molecules</p>
                    <p>• Not converting temperature to Kelvin</p>
                  </CardContent>
                </Card>
              </div>
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
                              <span className="text-cyan-500 mt-1">•</span>
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
                            <div key={i} className="bg-secondary/10 p-3 rounded-lg">
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
          <VisualizationTab
            chapterId="physics-12"
            visualizations={['gas-molecules', 'avogadro-jar', 'carnot-cycle']}
            layout="grid"
            title="Kinetic Theory Visualizations"
            description="Explore gas molecules and Avogadro's principle through interactive simulations"
          />
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
              <CardTitle>Practice Questions</CardTitle>
              {showSolutions && (
                <p className="text-sm text-muted-foreground">
                  Score: {score}/{practiceQuestions.length}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {practiceQuestions.map((q, index) => (
                <Card key={q.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold">Q{index + 1}. {q.questionText}</h4>
                      <Badge variant="outline">{q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}</Badge>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((option, idx) => (
                        <Button
                          key={idx}
                          variant={userAnswers[q.id] === String.fromCharCode(65 + idx) ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => handleAnswerSelect(q.id, String.fromCharCode(65 + idx))}
                          disabled={showSolutions}
                        >
                          {showSolutions && String.fromCharCode(65 + idx) === q.correctAnswer && (
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          )}
                          {showSolutions && userAnswers[q.id] === String.fromCharCode(65 + idx) && String.fromCharCode(65 + idx) !== q.correctAnswer && (
                            <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          )}
                          {typeof option === "string" ? option : option.text}
                        </Button>
                      ))}
                    </div>

                    {showSolutions && (
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-semibold mb-1">Solution:</p>
                        <p className="text-sm">{q.solutionDetail}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              <div className="flex gap-4">
                {!showSolutions ? (
                  <Button onClick={checkAnswers} className="w-full">
                    Check Answers
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" className="w-full">
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
