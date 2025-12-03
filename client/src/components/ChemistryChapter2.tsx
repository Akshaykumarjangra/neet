
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, TestTubes , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter2Topics: Topic[] = [
  {
    id: "atomic-number",
    title: "Atomic Number, Mass Number & Isotopes",
    description: "Understanding the fundamental properties that define atoms and their variants.",
    keyPoints: [
      "Atomic number (Z): Number of protons in nucleus",
      "Mass number (A): Total number of protons + neutrons",
      "Neutrons (n) = A - Z",
      "Isotopes: Same Z, different A (same element, different mass)",
      "Isobars: Same A, different Z (different elements)",
      "Isotones: Same number of neutrons (A - Z)",
      "All atoms of same element have same Z"
    ],
    examples: [
      "¹H, ²H (Deuterium), ³H (Tritium) - isotopes of hydrogen",
      "¹²C and ¹⁴C - carbon isotopes used in dating",
      "³⁵Cl and ³⁷Cl - chlorine has two main isotopes",
      "⁴⁰Ar and ⁴⁰Ca - isobars (both have mass 40)"
    ],
    formulas: [
      "Mass number (A) = Protons + Neutrons",
      "Neutrons = A - Z",
      "Atomic number (Z) = Number of protons = Number of electrons"
    ]
  },
  {
    id: "bohr-model",
    title: "Bohr's Model of Atom",
    description: "Bohr's quantum model explaining electron orbits and energy levels in hydrogen atom.",
    keyPoints: [
      "Electrons revolve in fixed circular orbits (stationary states)",
      "Each orbit has definite energy (quantized energy levels)",
      "Energy absorbed/emitted only when electron jumps between orbits",
      "Angular momentum is quantized: mvr = nh/2π",
      "Radius of nth orbit: rₙ = 0.529n² Å (for hydrogen)",
      "Energy of nth level: Eₙ = -13.6/n² eV (for hydrogen)",
      "Successfully explained hydrogen spectrum but failed for multi-electron atoms"
    ],
    examples: [
      "Ground state: n=1, E = -13.6 eV (most stable)",
      "First excited state: n=2, E = -3.4 eV",
      "Lyman series: transitions to n=1 (UV region)",
      "Balmer series: transitions to n=2 (visible region)",
      "Paschen series: transitions to n=3 (IR region)"
    ],
    formulas: [
      "rₙ = 0.529 × n²/Z Å (radius of nth orbit)",
      "Eₙ = -13.6 × Z²/n² eV (energy of nth level)",
      "ΔE = 13.6 × Z² × (1/n₁² - 1/n₂²) eV",
      "1/λ = R × Z² × (1/n₁² - 1/n₂²) (Rydberg equation)",
      "Angular momentum = nh/2π"
    ]
  },
  {
    id: "quantum-numbers",
    title: "Quantum Numbers",
    description: "Four quantum numbers that completely describe an electron in an atom.",
    keyPoints: [
      "Principal quantum number (n): Energy level, shell (1,2,3...)",
      "Azimuthal quantum number (l): Subshell shape (0 to n-1)",
      "Magnetic quantum number (m): Orbital orientation (-l to +l)",
      "Spin quantum number (s): Electron spin (+½ or -½)",
      "l=0→s, l=1→p, l=2→d, l=3→f subshells",
      "Maximum electrons in shell = 2n²",
      "Maximum electrons in subshell = 2(2l+1)"
    ],
    examples: [
      "n=1: only 1s orbital (2 electrons max)",
      "n=2: 2s, 2p orbitals (8 electrons max)",
      "n=3: 3s, 3p, 3d orbitals (18 electrons max)",
      "p subshell: l=1, m=-1,0,+1 (three orbitals, 6 electrons)",
      "d subshell: l=2, m=-2,-1,0,+1,+2 (five orbitals, 10 electrons)"
    ],
    formulas: [
      "Number of orbitals in subshell = 2l + 1",
      "Total orbitals in shell = n²",
      "Maximum electrons in shell = 2n²",
      "Maximum electrons in subshell = 2(2l+1)"
    ]
  },
  {
    id: "orbitals",
    title: "Shapes of Atomic Orbitals",
    description: "Three-dimensional regions where probability of finding electron is maximum.",
    keyPoints: [
      "s orbital: spherical shape, no directional character",
      "p orbital: dumbbell/figure-8 shape, three orientations (px, py, pz)",
      "d orbital: complex shapes, five orientations",
      "f orbital: even more complex, seven orientations",
      "Nodes: regions where probability of finding electron is zero",
      "Radial nodes = n - l - 1",
      "Angular nodes = l",
      "Total nodes = n - 1"
    ],
    examples: [
      "1s: one spherical orbital, no nodes",
      "2p: three dumbbell orbitals (px, py, pz), one nodal plane each",
      "3d: five orbitals (dxy, dyz, dxz, dx²-y², dz²)",
      "2s has one radial node (spherical shell)"
    ],
    formulas: [
      "Radial nodes = n - l - 1",
      "Angular nodes = l",
      "Total nodes = n - 1"
    ]
  },
  {
    id: "aufbau-pauli-hund",
    title: "Aufbau, Pauli & Hund's Rules",
    description: "Principles governing electron configuration in atoms.",
    keyPoints: [
      "Aufbau Principle: Electrons fill lowest energy orbitals first",
      "Order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p...",
      "Pauli Exclusion Principle: No two electrons can have same 4 quantum numbers",
      "Maximum 2 electrons per orbital with opposite spins",
      "Hund's Rule: Orbitals of same energy filled singly first",
      "Parallel spins preferred in half-filled/filled subshells",
      "Half-filled (d⁵, p³) and filled (d¹⁰, p⁶) are stable"
    ],
    examples: [
      "Carbon (Z=6): 1s² 2s² 2p²",
      "Nitrogen (Z=7): 1s² 2s² 2p³ (half-filled p, stable)",
      "Oxygen (Z=8): 1s² 2s² 2p⁴",
      "Chromium (Z=24): [Ar] 3d⁵ 4s¹ (not 3d⁴ 4s²)",
      "Copper (Z=29): [Ar] 3d¹⁰ 4s¹ (not 3d⁹ 4s²)"
    ],
    formulas: [
      "n + l rule: Lower n+l fills first",
      "If n+l same, lower n fills first"
    ]
  },
  {
    id: "electronic-configuration",
    title: "Electronic Configuration",
    description: "Arrangement of electrons in various orbitals of an atom.",
    keyPoints: [
      "Noble gas notation: Use previous noble gas + remaining electrons",
      "Valence electrons: Electrons in outermost shell",
      "Core electrons: All electrons except valence",
      "d-block: (n-1)d¹⁻¹⁰ ns¹⁻²",
      "f-block: (n-2)f¹⁻¹⁴ (n-1)d⁰⁻¹ ns²",
      "Cations: Remove electrons from outermost shell first",
      "Anions: Add electrons to outermost unfilled orbital"
    ],
    examples: [
      "Na (Z=11): 1s² 2s² 2p⁶ 3s¹ or [Ne] 3s¹",
      "Fe (Z=26): [Ar] 3d⁶ 4s²",
      "Fe²⁺: [Ar] 3d⁶ (loses 4s² first)",
      "Fe³⁺: [Ar] 3d⁵ (half-filled, stable)",
      "Cl⁻ (Z=17): [Ne] 3s² 3p⁶ or [Ar]"
    ]
  },
  {
    id: "photoelectric-effect",
    title: "Dual Nature & Photoelectric Effect",
    description: "Light exhibits both wave and particle nature, demonstrated by photoelectric effect.",
    keyPoints: [
      "Photoelectric effect: Emission of electrons when light hits metal surface",
      "Einstein's photoelectric equation: KE = hν - W₀",
      "Work function (W₀): Minimum energy to remove electron",
      "Threshold frequency (ν₀): Minimum frequency for photoelectric effect",
      "Kinetic energy of ejected electron depends on frequency, not intensity",
      "Number of electrons ejected depends on intensity",
      "de Broglie wavelength: λ = h/mv (wave nature of matter)"
    ],
    examples: [
      "Red light on sodium: no electrons (ν < ν₀)",
      "UV light on zinc: electrons ejected (ν > ν₀)",
      "Increasing intensity: more electrons, same KE",
      "Increasing frequency: same electrons, higher KE"
    ],
    formulas: [
      "E = hν (energy of photon)",
      "KE_max = hν - W₀",
      "W₀ = hν₀ (work function)",
      "λ = h/p = h/mv (de Broglie)",
      "c = νλ (wave equation)"
    ]
  },
  {
    id: "heisenberg",
    title: "Heisenberg's Uncertainty Principle",
    description: "Fundamental limit on precision of simultaneous measurements of position and momentum.",
    keyPoints: [
      "Cannot simultaneously measure position and momentum precisely",
      "Δx × Δp ≥ h/4π",
      "More precise position → less precise momentum (and vice versa)",
      "Explains why electrons don't fall into nucleus",
      "Fundamental principle, not due to measurement limitations",
      "Important for microscopic particles, negligible for macroscopic"
    ],
    examples: [
      "Electron in atom: precise orbit impossible (Bohr model limitation)",
      "Baseball: uncertainty negligible due to large mass",
      "Electron microscope: limited by wavelength of electrons"
    ],
    formulas: [
      "Δx × Δp ≥ h/4π",
      "Δx × mΔv ≥ h/4π"
    ]
  }
];



export function ChemistryChapter2() {
  // Fetch questions from database for Chemical Bonding (topicId: 5)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '5'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=5');
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
        <Atom className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 2: Structure of Atom</h1>
          <p className="text-muted-foreground">Class XI Chemistry - NEET Syllabus</p>
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
                  <li>Atomic number, mass number, isotopes and isobars</li>
                  <li>Bohr's model of atom and its limitations</li>
                  <li>Quantum numbers and their significance</li>
                  <li>Shapes of s, p, d atomic orbitals</li>
                  <li>Aufbau principle, Pauli exclusion, Hund's rule</li>
                  <li>Electronic configuration of atoms</li>
                  <li>Photoelectric effect and de Broglie relation</li>
                  <li>Heisenberg's uncertainty principle</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm font-mono">
                    <p>• Eₙ = -13.6Z²/n² eV</p>
                    <p>• rₙ = 0.529n²/Z Å</p>
                    <p>• 1/λ = RZ²(1/n₁² - 1/n₂²)</p>
                    <p>• λ = h/mv (de Broglie)</p>
                    <p>• Δx·Δp ≥ h/4π</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing isotopes with isobars</p>
                    <p>• Wrong order of orbital filling</p>
                    <p>• Forgetting exceptions: Cr, Cu, Mo, Ag</p>
                    <p>• Violating Pauli or Hund's rules</p>
                    <p>• Using wrong formula for multi-electron atoms</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Constants
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 font-mono text-sm">
                  <p><strong>Rydberg constant (R):</strong> 1.097 × 10⁷ m⁻¹</p>
                  <p><strong>Planck's constant (h):</strong> 6.626 × 10⁻³⁴ J·s</p>
                  <p><strong>Speed of light (c):</strong> 3 × 10⁸ m/s</p>
                  <p><strong>Electron mass (mₑ):</strong> 9.109 × 10⁻³¹ kg</p>
                  <p><strong>1 eV:</strong> 1.602 × 10⁻¹⁹ J</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter2Topics.map((topic, index) => (
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
                Explore atomic structure and orbital shapes
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ThreeDViewer 
                title="Atomic Structure - Electron Orbitals" 
                modelType="atom"
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Bohr Model Energy Levels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-red-100 dark:bg-red-900/20 rounded">
                        <span className="font-semibold">n=1 (K)</span>
                        <span className="font-mono text-sm">-13.6 eV</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-orange-100 dark:bg-orange-900/20 rounded">
                        <span className="font-semibold">n=2 (L)</span>
                        <span className="font-mono text-sm">-3.4 eV</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded">
                        <span className="font-semibold">n=3 (M)</span>
                        <span className="font-mono text-sm">-1.51 eV</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-100 dark:bg-green-900/20 rounded">
                        <span className="font-semibold">n=4 (N)</span>
                        <span className="font-mono text-sm">-0.85 eV</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Orbital Filling Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm font-mono">
                    <p>1s → 2s → 2p → 3s → 3p</p>
                    <p>→ 4s → 3d → 4p → 5s</p>
                    <p>→ 4d → 5p → 6s → 4f</p>
                    <p>→ 5d → 6p → 7s → 5f → 6d</p>
                    <Badge className="mt-2">Remember: n+l rule</Badge>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardHeader>
                  <CardTitle>Quantum Numbers Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-1">n</p>
                      <p className="text-xs text-muted-foreground">Principal</p>
                      <p className="text-xs mt-2">Shell/Energy</p>
                      <Badge variant="outline" className="mt-2">1,2,3...</Badge>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-1">l</p>
                      <p className="text-xs text-muted-foreground">Azimuthal</p>
                      <p className="text-xs mt-2">Subshell/Shape</p>
                      <Badge variant="outline" className="mt-2">0 to n-1</Badge>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-1">m</p>
                      <p className="text-xs text-muted-foreground">Magnetic</p>
                      <p className="text-xs mt-2">Orientation</p>
                      <Badge variant="outline" className="mt-2">-l to +l</Badge>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-1">s</p>
                      <p className="text-xs text-muted-foreground">Spin</p>
                      <p className="text-xs mt-2">Rotation</p>
                      <Badge variant="outline" className="mt-2">±½</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
            </CardContent>
          </Card>
        
          )}</TabsContent>
      </Tabs>
    </div>
  );
}
