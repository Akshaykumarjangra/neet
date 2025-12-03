
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisualizationTab } from "@/components/VisualizationTab";
import { BookOpen, Lightbulb, Calculator, Zap, CheckCircle, XCircle , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter14Topics: Topic[] = [
  {
    id: "electric-charge",
    title: "Electric Charge and Properties",
    description: "Fundamental property of matter causing electromagnetic interactions.",
    keyPoints: [
      "Two types: positive and negative charges",
      "Like charges repel, unlike charges attract",
      "Charge is quantized: Q = ne (e = 1.6 × 10⁻¹⁹ C)",
      "Charge is conserved in isolated systems",
      "SI unit: Coulomb (C)"
    ],
    examples: [
      "Rubbing glass rod with silk gives positive charge",
      "Rubbing ebonite rod with fur gives negative charge",
      "Lightning is discharge of accumulated charges",
      "Photocopying uses electrostatic attraction"
    ],
    formulas: [
      "Q = ne",
      "e = 1.6 × 10⁻¹⁹ C (elementary charge)",
      "Conservation: ΣQ_initial = ΣQ_final"
    ]
  },
  {
    id: "coulomb-law",
    title: "Coulomb's Law",
    description: "Force between two point charges is proportional to product of charges and inversely proportional to square of distance.",
    keyPoints: [
      "F = k(q₁q₂)/r² where k = 9 × 10⁹ Nm²/C²",
      "Also written as F = (1/4πε₀)(q₁q₂)/r²",
      "Force is along the line joining the charges",
      "Obeys superposition principle",
      "Vector addition for multiple charges"
    ],
    examples: [
      "Force between electron and proton in hydrogen atom",
      "Electrostatic force holds atoms together",
      "Force between charged spheres",
      "Equilibrium of three charges"
    ],
    formulas: [
      "F = k(q₁q₂)/r²",
      "k = 1/(4πε₀) = 9 × 10⁹ Nm²/C²",
      "ε₀ = 8.85 × 10⁻¹² C²/Nm² (permittivity)",
      "F_net = F₁ + F₂ + F₃ + ... (vector sum)"
    ]
  },
  {
    id: "electric-field",
    title: "Electric Field",
    description: "Region around a charge where electrostatic force is experienced.",
    keyPoints: [
      "Electric field E = F/q₀ (force per unit charge)",
      "E = kQ/r² for point charge",
      "Direction: away from positive, towards negative",
      "Field lines never cross each other",
      "Superposition applies to fields"
    ],
    examples: [
      "Field around a point charge",
      "Uniform field between parallel plates",
      "Field of dipole",
      "Field inside a conductor is zero"
    ],
    formulas: [
      "E = F/q₀",
      "E = kQ/r² (point charge)",
      "E = σ/(2ε₀) (infinite sheet)",
      "E = 0 (inside conductor)"
    ]
  },
  {
    id: "electric-dipole",
    title: "Electric Dipole",
    description: "System of two equal and opposite charges separated by a small distance.",
    keyPoints: [
      "Dipole moment: p = q × 2a (from -q to +q)",
      "Field on axial line: E = 2kp/r³",
      "Field on equatorial line: E = kp/r³",
      "Torque on dipole in field: τ = pE sinθ",
      "Potential energy: U = -pE cosθ"
    ],
    examples: [
      "Water molecule is a dipole",
      "HCl molecule has dipole moment",
      "Dipole in uniform electric field experiences torque",
      "Dipole antenna"
    ],
    formulas: [
      "p = q × 2a",
      "E_axial = 2kp/r³",
      "E_equatorial = kp/r³",
      "τ = p × E = pE sinθ",
      "U = -p·E = -pE cosθ"
    ]
  },
  {
    id: "gauss-law",
    title: "Gauss's Law",
    description: "Relates electric flux through a closed surface to enclosed charge.",
    keyPoints: [
      "Electric flux: Φ = E·A = EA cosθ",
      "Gauss's law: Φ = Q_enclosed/ε₀",
      "Useful for symmetric charge distributions",
      "Simplifies field calculations",
      "Valid for any closed surface"
    ],
    examples: [
      "Field due to uniformly charged sphere",
      "Field inside and outside conductor",
      "Infinite line charge",
      "Infinite charged plane"
    ],
    formulas: [
      "Φ = ∮E·dA = Q_enclosed/ε₀",
      "Sphere: E = kQ/r² (outside)",
      "Sphere: E = 0 (inside hollow)",
      "Line: E = λ/(2πε₀r)",
      "Plane: E = σ/(2ε₀)"
    ]
  },
  {
    id: "applications-gauss",
    title: "Applications of Gauss's Law",
    description: "Using Gauss's law to find electric fields in symmetric situations.",
    keyPoints: [
      "Spherical symmetry: uniformly charged sphere",
      "Cylindrical symmetry: infinite line charge",
      "Planar symmetry: infinite charged sheet",
      "Field inside conductor is always zero",
      "Charge resides on surface of conductor"
    ],
    examples: [
      "Charged conducting sphere",
      "Charged cylindrical conductor",
      "Two parallel charged plates (capacitor)",
      "Hollow charged sphere"
    ],
    formulas: [
      "Solid sphere (r > R): E = kQ/r²",
      "Solid sphere (r < R): E = kQr/R³",
      "Infinite cylinder: E = λ/(2πε₀r)",
      "Parallel plates: E = σ/ε₀"
    ]
  }
];



export function PhysicsChapter14() {
  // Fetch questions from database for Electrostatics (topicId: 3)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '3'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=3');
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
          <h1 className="text-4xl font-bold">Chapter 14: Electric Charges and Fields</h1>
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
                  <li>Properties of electric charge and quantization</li>
                  <li>Coulomb's law and electrostatic force</li>
                  <li>Electric field and field lines</li>
                  <li>Electric dipole and its properties</li>
                  <li>Gauss's law and applications</li>
                  <li>Electric field calculations using Gauss's law</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-yellow-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-yellow-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• F = kq₁q₂/r²</p>
                    <p>• E = F/q₀ = kQ/r²</p>
                    <p>• Φ = Q/ε₀ (Gauss's law)</p>
                    <p>• τ = pE sinθ (dipole)</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Forgetting vector nature of electric field</p>
                    <p>• Wrong sign in Coulomb's law</p>
                    <p>• Confusing k and ε₀</p>
                    <p>• Not using symmetry for Gauss's law</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter14Topics.map((topic, index) => (
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
                              <span className="text-yellow-500 mt-1">•</span>
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
            chapterId="physics-14"
            visualizations={['electric-field-3d', 'parallel-plate-capacitor', 'magnetic-field-lines']}
            layout="grid"
            title="Interactive Electric Field Visualizations"
            description="Explore electric charges, fields, and forces through interactive 3D simulations"
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
                          onClick={() => handleAnswerSelect(q.id, idx)}
                          disabled={showSolutions}
                        >
                          {showSolutions && String.fromCharCode(65 + idx) === q.correctAnswer && (
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          )}
                          {showSolutions && userAnswers[q.id] === String.fromCharCode(65 + idx) && idx !== q.correctAnswer && (
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
