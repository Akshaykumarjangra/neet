
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisualizationTab } from "@/components/VisualizationTab";
import { BookOpen, Lightbulb, Calculator, Zap , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter15Topics: Topic[] = [
  {
    id: "electric-potential",
    title: "Electric Potential and Potential Difference",
    description: "Electric potential is the work done per unit charge in bringing a test charge from infinity to a point in an electric field.",
    keyPoints: [
      "Electric potential V = W/q (scalar quantity)",
      "SI unit: Volt (V) = Joule/Coulomb",
      "Potential difference: V_AB = V_A - V_B = W_AB/q",
      "Potential due to point charge: V = kQ/r = Q/(4πε₀r)",
      "Potential is zero at infinity (reference point)",
      "Electric field E = -dV/dr (field points from high to low potential)"
    ],
    examples: [
      "Potential at distance r from charge Q: V = kQ/r",
      "Potential inside hollow sphere is constant and equals surface potential",
      "Equipotential surfaces are perpendicular to electric field lines"
    ],
    formulas: [
      "V = kQ/r = Q/(4πε₀r)",
      "V_AB = V_A - V_B",
      "E = -dV/dr",
      "W = q(V_B - V_A)",
      "V_total = V₁ + V₂ + V₃ + ... (superposition)"
    ]
  },
  {
    id: "potential-energy",
    title: "Electrostatic Potential Energy",
    description: "Potential energy of a system of charges is the work done in assembling the charges from infinity.",
    keyPoints: [
      "Potential energy of two charges: U = kq₁q₂/r",
      "U is positive for like charges, negative for unlike charges",
      "Energy stored in electric field: U = (1/2)ε₀E²×Volume",
      "Work-energy theorem: W_ext = ΔU + ΔKE",
      "Potential energy of system = sum of all pair interactions",
      "Energy density u = (1/2)ε₀E²"
    ],
    examples: [
      "PE of two point charges separated by distance r: U = kq₁q₂/r",
      "PE of charge in uniform field: U = qEd",
      "Three charges at vertices of triangle: U = k(q₁q₂/r₁₂ + q₂q₃/r₂₃ + q₃q₁/r₃₁)"
    ],
    formulas: [
      "U = kq₁q₂/r",
      "U = qV (potential energy = charge × potential)",
      "Energy density u = (1/2)ε₀E²",
      "Total energy U = Σ(kq_iq_j/r_ij) for all pairs"
    ]
  },
  {
    id: "equipotential-surfaces",
    title: "Equipotential Surfaces",
    description: "Surfaces where the electric potential is constant. No work is done in moving a charge along an equipotential surface.",
    keyPoints: [
      "All points on equipotential surface have same potential",
      "No work done in moving charge on equipotential surface (W = q×ΔV = 0)",
      "Electric field is perpendicular to equipotential surfaces",
      "For point charge: equipotential surfaces are concentric spheres",
      "For uniform field: equipotential surfaces are parallel planes",
      "Equipotential surfaces never intersect"
    ],
    examples: [
      "Around point charge: concentric spherical surfaces",
      "Between parallel plates: equally spaced parallel planes",
      "Surface of conductor is always equipotential"
    ],
    formulas: [
      "ΔV = 0 on equipotential surface",
      "E ⊥ equipotential surface",
      "E = -dV/dr (perpendicular direction)",
      "Spacing between surfaces ∝ 1/E"
    ]
  },
  {
    id: "capacitors",
    title: "Capacitors and Capacitance",
    description: "A capacitor is a device that stores electric charge and energy. Capacitance is the ability to store charge per unit potential difference.",
    keyPoints: [
      "Capacitance C = Q/V (unit: Farad, F)",
      "1 Farad = 1 Coulomb/Volt (very large unit)",
      "Parallel plate capacitor: C = ε₀A/d",
      "With dielectric (K): C = Kε₀A/d",
      "Capacitance depends on geometry, not on Q or V",
      "Energy stored: U = (1/2)QV = (1/2)CV² = Q²/(2C)"
    ],
    examples: [
      "Parallel plate capacitor with area A, separation d: C = ε₀A/d",
      "Spherical capacitor (radius R): C = 4πε₀R",
      "Cylindrical capacitor of length L: C = 2πε₀L/ln(b/a)"
    ],
    formulas: [
      "C = Q/V",
      "C = ε₀A/d (parallel plate)",
      "C = Kε₀A/d (with dielectric)",
      "U = (1/2)CV² = (1/2)QV = Q²/(2C)",
      "Energy density u = (1/2)ε₀E²"
    ]
  },
  {
    id: "capacitors-combination",
    title: "Combination of Capacitors",
    description: "Capacitors can be connected in series or parallel combinations to obtain desired capacitance.",
    keyPoints: [
      "Series: 1/C_eq = 1/C₁ + 1/C₂ + 1/C₃ + ...",
      "Parallel: C_eq = C₁ + C₂ + C₃ + ...",
      "Series: same charge Q on all, voltages add: V = V₁ + V₂ + V₃",
      "Parallel: same voltage V across all, charges add: Q = Q₁ + Q₂ + Q₃",
      "Series: C_eq < smallest capacitor",
      "Parallel: C_eq > largest capacitor"
    ],
    examples: [
      "Two capacitors in series: C_eq = C₁C₂/(C₁+C₂)",
      "Two identical capacitors in parallel: C_eq = 2C",
      "Mixed combinations: solve step by step"
    ],
    formulas: [
      "Series: 1/C_eq = Σ(1/C_i)",
      "Parallel: C_eq = ΣC_i",
      "Series: Q same, V_i = Q/C_i",
      "Parallel: V same, Q_i = C_iV",
      "Energy: U_total = Σ(1/2)C_iV_i²"
    ]
  },
  {
    id: "dielectrics",
    title: "Dielectrics and Polarization",
    description: "Dielectric materials increase capacitance when placed between capacitor plates due to polarization.",
    keyPoints: [
      "Dielectric constant K (relative permittivity): K = C_with/C_without",
      "K > 1 for all materials (K = 1 for vacuum)",
      "With dielectric: C = KC₀, E = E₀/K, V = V₀/K",
      "Charge Q remains constant (if battery disconnected)",
      "Dielectric strength: maximum E before breakdown",
      "Polarization reduces effective field inside dielectric"
    ],
    examples: [
      "Air: K ≈ 1, Paper: K ≈ 3.7, Glass: K ≈ 5-10, Water: K ≈ 80",
      "Inserting dielectric (battery connected): Q increases, V constant",
      "Inserting dielectric (battery disconnected): Q constant, V decreases"
    ],
    formulas: [
      "K = ε_r = C/C₀ = E₀/E",
      "C = Kε₀A/d",
      "E = E₀/K",
      "V = V₀/K (battery disconnected)",
      "U = U₀/K (battery disconnected)"
    ]
  }
];



export function PhysicsChapter15() {
  // Fetch questions from database for Electric Charges and Fields (topicId: 25)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '25'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=25');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
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
        <Zap className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 15: Electrostatic Potential and Capacitance</h1>
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
                  <li>Electric potential and potential difference</li>
                  <li>Relation between electric field and potential</li>
                  <li>Equipotential surfaces</li>
                  <li>Capacitors and capacitance</li>
                  <li>Combination of capacitors</li>
                  <li>Energy stored in capacitors</li>
                  <li>Effect of dielectrics</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2">Key Formulas</Badge>
                    <CardTitle className="text-lg">Potential</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• V = kQ/r</p>
                    <p>• V = W/q</p>
                    <p>• E = -dV/dr</p>
                    <p>• U = qV</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Capacitance</Badge>
                    <CardTitle className="text-lg">Capacitors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• C = Q/V</p>
                    <p>• C = ε₀A/d</p>
                    <p>• U = (1/2)CV²</p>
                    <p>• C = KC₀ (with dielectric)</p>
                  </CardContent>
                </Card>

                <Card className="border-accent/20">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">Combinations</Badge>
                    <CardTitle className="text-lg">Series/Parallel</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Series: 1/C = Σ(1/Cᵢ)</p>
                    <p>• Parallel: C = ΣCᵢ</p>
                    <p>• Series: Q same</p>
                    <p>• Parallel: V same</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter15Topics.map((topic, index) => (
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
            chapterId="physics-15"
            visualizations={['parallel-plate-capacitor', 'electric-field-3d']}
            layout="grid"
            title="Interactive Potential and Capacitance Visualizations"
            description="Explore electric potential, equipotential surfaces, and capacitors through interactive simulations"
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
                <Card key={q.id} className={`${showSolutions
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
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${showSolutions
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
