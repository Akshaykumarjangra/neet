import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisualizationTab } from "@/components/VisualizationTab";
import { BookOpen, Lightbulb, Calculator, Radio, CheckCircle, XCircle , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter13Topics: Topic[] = [
  {
    id: "periodic-motion",
    title: "Periodic Motion and Oscillations",
    description: "Motion that repeats itself after a fixed interval of time.",
    keyPoints: [
      "Periodic motion: repeats after time period T",
      "Oscillatory motion: to-and-fro motion about mean position",
      "Frequency: f = 1/T (number of oscillations per second)",
      "Angular frequency: ω = 2πf = 2π/T"
    ],
    examples: [
      "Pendulum swinging back and forth",
      "Mass-spring system oscillating",
      "Earth rotating around sun (periodic but not oscillatory)",
      "Tuning fork vibration"
    ],
    formulas: [
      "f = 1/T",
      "ω = 2πf = 2π/T",
      "T = time period",
      "Unit: Hz (hertz) = s⁻¹"
    ]
  },
  {
    id: "shm",
    title: "Simple Harmonic Motion (SHM)",
    description: "Special type of oscillatory motion where restoring force is proportional to displacement.",
    keyPoints: [
      "Restoring force: F = -kx (proportional to displacement)",
      "Acceleration: a = -ω²x",
      "Displacement: x = A sin(ωt + φ)",
      "SHM is sinusoidal in nature"
    ],
    examples: [
      "Mass attached to spring oscillating horizontally",
      "Simple pendulum for small angles",
      "Loaded spring hanging vertically",
      "Torsional pendulum"
    ],
    formulas: [
      "x = A sin(ωt + φ)",
      "v = Aω cos(ωt + φ)",
      "a = -Aω² sin(ωt + φ) = -ω²x",
      "F = -kx = -mω²x"
    ]
  },
  {
    id: "shm-energy",
    title: "Energy in SHM",
    description: "Potential and kinetic energy variations in simple harmonic motion.",
    keyPoints: [
      "Total energy remains constant (conservative system)",
      "KE = (1/2)mω²(A² - x²)",
      "PE = (1/2)mω²x²",
      "Total E = (1/2)mω²A² = constant"
    ],
    examples: [
      "At mean position: KE maximum, PE zero",
      "At extreme position: KE zero, PE maximum",
      "Energy oscillates between KE and PE",
      "Average KE = Average PE = E/2"
    ],
    formulas: [
      "KE = (1/2)mv² = (1/2)mω²(A² - x²)",
      "PE = (1/2)kx² = (1/2)mω²x²",
      "Total E = KE + PE = (1/2)mω²A²",
      "E ∝ A² (energy proportional to square of amplitude)"
    ]
  },
  {
    id: "spring-pendulum",
    title: "Spring and Pendulum Systems",
    description: "Common examples of SHM with their time periods.",
    keyPoints: [
      "Spring: T = 2π√(m/k) where k is spring constant",
      "Simple pendulum: T = 2π√(L/g) for small angles",
      "Both are independent of amplitude (for SHM)",
      "Pendulum period depends on length and gravity"
    ],
    examples: [
      "Soft spring oscillates slower (smaller k)",
      "Longer pendulum has longer period",
      "Moon pendulum slower (g_moon < g_earth)",
      "Spring in series/parallel combinations"
    ],
    formulas: [
      "Spring: T = 2π√(m/k), ω = √(k/m)",
      "Pendulum: T = 2π√(L/g), ω = √(g/L)",
      "Springs in series: 1/k = 1/k₁ + 1/k₂",
      "Springs in parallel: k = k₁ + k₂"
    ]
  },
  {
    id: "damped-forced",
    title: "Damped and Forced Oscillations",
    description: "Oscillations with energy loss and external driving force.",
    keyPoints: [
      "Damped oscillation: amplitude decreases due to friction/resistance",
      "Forced oscillation: external periodic force maintains oscillation",
      "Resonance: maximum amplitude when driving frequency = natural frequency",
      "Quality factor Q = ω₀/Δω measures sharpness of resonance"
    ],
    examples: [
      "Pendulum in air gradually stops (damping)",
      "Car suspension system (damped)",
      "Pushing a swing at natural frequency (resonance)",
      "Tuning radio to specific frequency"
    ],
    formulas: [
      "Damped: x = A₀e^(-bt/2m)cos(ωt)",
      "ω_damped = √(ω₀² - b²/4m²)",
      "Resonance at ω = ω₀",
      "Q = Energy stored / Energy dissipated per cycle"
    ]
  },
  {
    id: "wave-motion",
    title: "Wave Motion",
    description: "Propagation of disturbance through a medium carrying energy.",
    keyPoints: [
      "Wave transfers energy without transferring matter",
      "Transverse: vibration perpendicular to wave direction",
      "Longitudinal: vibration parallel to wave direction",
      "Wave equation: v = fλ"
    ],
    examples: [
      "Light waves (transverse electromagnetic)",
      "Sound waves (longitudinal)",
      "Water waves (combination)",
      "Waves on string (transverse)"
    ],
    formulas: [
      "v = fλ",
      "y = A sin(kx - ωt)",
      "k = 2π/λ (wave number)",
      "Speed in string: v = √(T/μ)"
    ]
  },
  {
    id: "sound-waves",
    title: "Sound Waves",
    description: "Longitudinal mechanical waves that require medium for propagation.",
    keyPoints: [
      "Sound needs material medium (no sound in vacuum)",
      "Speed depends on medium properties",
      "Intensity ∝ (Amplitude)²",
      "Audible range: 20 Hz to 20,000 Hz for humans"
    ],
    examples: [
      "Speaking creates compressions and rarefactions",
      "Sound faster in solids than liquids than gases",
      "Echo formation due to reflection",
      "Ultrasound used in medical imaging"
    ],
    formulas: [
      "Speed in gas: v = √(γRT/M)",
      "Speed in solid: v = √(E/ρ)",
      "Intensity: I = P/A",
      "Decibel: β = 10 log₁₀(I/I₀)"
    ]
  },
  {
    id: "doppler-effect",
    title: "Doppler Effect",
    description: "Apparent change in frequency when source or observer is in motion.",
    keyPoints: [
      "Frequency increases when source approaches observer",
      "Frequency decreases when source recedes from observer",
      "Depends on relative motion of source and observer",
      "Used in radar, medical diagnosis, astronomy"
    ],
    examples: [
      "Ambulance siren pitch change as it passes",
      "Train whistle frequency change",
      "Red shift in astronomy (galaxies moving away)",
      "Blood flow measurement using ultrasound"
    ],
    formulas: [
      "f' = f(v ± v₀)/(v ∓ vₛ)",
      "Upper signs: approach",
      "Lower signs: recede",
      "v = sound speed, v₀ = observer speed, vₛ = source speed"
    ]
  }
];



export function PhysicsChapter13() {
  // Fetch questions from database for Oscillations (topicId: 23)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '23'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=23');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
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
        <Radio className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 13: Oscillations and Waves</h1>
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
            <Radio className="h-4 w-4 mr-2" />
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
                  <li>Periodic and oscillatory motion</li>
                  <li>Simple harmonic motion (SHM) and its characteristics</li>
                  <li>Energy in SHM and its conservation</li>
                  <li>Spring-mass and pendulum systems</li>
                  <li>Damped and forced oscillations, resonance</li>
                  <li>Wave motion and types of waves</li>
                  <li>Sound waves and their properties</li>
                  <li>Doppler effect and its applications</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• x = A sin(ωt + φ)</p>
                    <p>• T_spring = 2π√(m/k)</p>
                    <p>• T_pendulum = 2π√(L/g)</p>
                    <p>• v = fλ</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing ω with 2πf</p>
                    <p>• Wrong sign in restoring force</p>
                    <p>• Forgetting phase constant φ</p>
                    <p>• Mixing up transverse and longitudinal waves</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter13Topics.map((topic, index) => (
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
            chapterId="physics-13"
            visualizations={['simple-pendulum-phase', 'standing-wave', 'motion-graphs']}
            layout="grid"
            title="Interactive Wave and Oscillation Visualizations"
            description="Explore SHM, pendulum motion, and wave phenomena through interactive simulations"
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
