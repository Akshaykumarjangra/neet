
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dna, CheckCircle2, XCircle, Brain, Lightbulb, BookOpen , Loader2 } from "lucide-react";

export function BotanyChapter17() {
  // Fetch questions from database for Evolution (topicId: 81)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '81'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=81');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Who proposed the theory of 'Inheritance of Acquired Characters'?",
      options: ["Darwin", "Lamarck", "Hugo de Vries", "Weismann"],
      correctAnswer: 1,
      explanation: "Jean-Baptiste Lamarck proposed the theory of inheritance of acquired characters (Lamarckism), suggesting that organisms can pass on traits acquired during their lifetime to offspring."
    },
    {
      id: 2,
      question: "Darwin's theory of natural selection is based on:",
      options: [
        "Survival of the fittest",
        "Inheritance of acquired characters",
        "Mutation theory",
        "Germplasm theory"
      ],
      correctAnswer: 0,
      explanation: "Darwin's theory emphasizes 'survival of the fittest' - individuals with favorable variations survive and reproduce, passing these traits to offspring through natural selection."
    },
    {
      id: 3,
      question: "The process by which new species arise is called:",
      options: ["Evolution", "Speciation", "Natural selection", "Adaptation"],
      correctAnswer: 1,
      explanation: "Speciation is the evolutionary process by which populations evolve to become distinct species, often through geographic isolation or reproductive isolation."
    },
    {
      id: 4,
      question: "Which of the following is an example of vestigial organ in humans?",
      options: ["Appendix", "Heart", "Liver", "Kidney"],
      correctAnswer: 0,
      explanation: "The appendix is a vestigial organ in humans - a structure that has lost most or all of its ancestral function through evolution but remains present."
    },
    {
      id: 5,
      question: "Analogous organs provide evidence for:",
      options: [
        "Divergent evolution",
        "Convergent evolution",
        "Parallel evolution",
        "Coevolution"
      ],
      correctAnswer: 1,
      explanation: "Analogous organs (similar function, different origin) like wings of birds and insects provide evidence for convergent evolution - unrelated organisms evolving similar features independently."
    },
    {
      id: 6,
      question: "The first life on Earth appeared approximately:",
      options: ["3.8 billion years ago", "1 billion years ago", "500 million years ago", "100 million years ago"],
      correctAnswer: 0,
      explanation: "The first life on Earth appeared approximately 3.8 billion years ago, likely in the form of simple prokaryotic cells in the primordial ocean."
    },
    {
      id: 7,
      question: "Hardy-Weinberg equilibrium is maintained when:",
      options: [
        "Mutations occur frequently",
        "Natural selection is acting",
        "No evolution is occurring",
        "Migration is happening"
      ],
      correctAnswer: 2,
      explanation: "Hardy-Weinberg equilibrium occurs when no evolution is happening - allele frequencies remain constant across generations in the absence of evolutionary forces."
    },
    {
      id: 8,
      question: "Industrial melanism in peppered moths is an example of:",
      options: [
        "Artificial selection",
        "Natural selection",
        "Sexual selection",
        "Genetic drift"
      ],
      correctAnswer: 1,
      explanation: "Industrial melanism in peppered moths demonstrates natural selection - dark moths had better survival in polluted areas due to better camouflage against predators."
    }
  ];

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
    setShowExplanations({ ...showExplanations, [questionId]: false });
  };

  const handleCheckAnswer = (questionId: number) => {
    setShowExplanations({ ...showExplanations, [questionId]: true });
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setQuizComplete(true);
    const allExplanations: { [key: number]: boolean } = {};
    questions.forEach((q) => {
      allExplanations[q.id] = true;
    });
    setShowExplanations(allExplanations);
  };

  const progressPercentage = (Object.keys(selectedAnswers).length / questions.length) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 gradient-mesh-bg min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Dna className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Evolution</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Explore the mechanisms of evolution, theories of origin of life, and evidence for evolutionary processes
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Understand theories of origin of life</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Learn mechanisms of evolution</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Master evidence for evolution</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Understand speciation processes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="theories">Theories</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Key Concepts */}
        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                Origin of Life
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">1. Chemical Evolution</h4>
                  <p className="text-sm text-purple-800">Formation of organic molecules from inorganic compounds</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">2. Oparin-Haldane Theory</h4>
                  <p className="text-sm text-purple-800">Life originated from pre-existing non-living matter</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">3. Miller-Urey Experiment</h4>
                  <p className="text-sm text-purple-800">Demonstrated synthesis of amino acids from simple gases</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">4. RNA World Hypothesis</h4>
                  <p className="text-sm text-purple-800">RNA was the first genetic material and catalyst</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Mechanisms of Evolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Natural Selection</h4>
                  <p className="text-sm text-blue-800">Differential survival and reproduction based on fitness</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Genetic Drift</h4>
                  <p className="text-sm text-green-800">Random changes in allele frequencies, especially in small populations</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                  <h4 className="font-semibold text-amber-900 mb-2">Gene Flow (Migration)</h4>
                  <p className="text-sm text-amber-800">Movement of genes between populations</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                  <h4 className="font-semibold text-red-900 mb-2">Mutation</h4>
                  <p className="text-sm text-red-800">Source of new genetic variation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Types of Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Directional Selection</h4>
                  <p className="text-sm text-purple-800">Favors one extreme phenotype</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">Stabilizing Selection</h4>
                  <p className="text-sm text-indigo-800">Favors intermediate phenotypes</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Disruptive Selection</h4>
                  <p className="text-sm text-blue-800">Favors both extreme phenotypes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theories */}
        <TabsContent value="theories" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Evolutionary Theories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                <h4 className="font-semibold text-amber-900 mb-3">Lamarckism (1809)</h4>
                <ul className="text-sm text-amber-800 space-y-2">
                  <li>• Use and disuse of organs</li>
                  <li>• Inheritance of acquired characters</li>
                  <li>• Example: Giraffe's long neck from stretching</li>
                  <li>• <strong>Status:</strong> Disproved by Weismann's experiment</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                <h4 className="font-semibold text-green-900 mb-3">Darwinism (1859)</h4>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• Natural selection and survival of the fittest</li>
                  <li>• Overproduction and struggle for existence</li>
                  <li>• Variations and inheritance</li>
                  <li>• <strong>Book:</strong> "On the Origin of Species"</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-semibold text-blue-900 mb-3">Mutation Theory (Hugo de Vries, 1901)</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Sudden, large variations called mutations</li>
                  <li>• Mutations are random and directionless</li>
                  <li>• Studied evening primrose (<em>Oenothera lamarckiana</em>)</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                <h4 className="font-semibold text-purple-900 mb-3">Neo-Darwinism (Modern Synthetic Theory)</h4>
                <ul className="text-sm text-purple-800 space-y-2">
                  <li>• Combines Darwin's theory with genetics</li>
                  <li>• Natural selection + Mutation + Genetic drift + Gene flow</li>
                  <li>• Population is the unit of evolution</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Hardy-Weinberg Principle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Equation: p² + 2pq + q² = 1</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>• p = frequency of dominant allele</p>
                  <p>• q = frequency of recessive allele</p>
                  <p>• p² = frequency of homozygous dominant</p>
                  <p>• 2pq = frequency of heterozygous</p>
                  <p>• q² = frequency of homozygous recessive</p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-3">Conditions for Equilibrium:</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>✓ Large population size (no genetic drift)</li>
                  <li>✓ Random mating</li>
                  <li>✓ No mutations</li>
                  <li>✓ No gene flow (migration)</li>
                  <li>✓ No natural selection</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evidence */}
        <TabsContent value="evidence" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Evidence for Evolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                <h4 className="font-semibold text-green-900 mb-3">1. Paleontological Evidence (Fossils)</h4>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• Fossils show gradual changes over time</li>
                  <li>• Example: <em>Archaeopteryx</em> (connecting link between reptiles and birds)</li>
                  <li>• Dating methods: Carbon-14, Potassium-Argon</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-semibold text-blue-900 mb-3">2. Comparative Anatomy</h4>
                <div className="space-y-3 text-sm text-blue-800">
                  <div>
                    <strong>Homologous Organs:</strong> Same origin, different function
                    <p className="ml-4">Example: Forelimbs of humans, whales, bats, birds</p>
                    <p className="ml-4">Evidence for: Divergent evolution</p>
                  </div>
                  <div>
                    <strong>Analogous Organs:</strong> Different origin, same function
                    <p className="ml-4">Example: Wings of birds and insects</p>
                    <p className="ml-4">Evidence for: Convergent evolution</p>
                  </div>
                  <div>
                    <strong>Vestigial Organs:</strong> Reduced or non-functional
                    <p className="ml-4">Example: Human appendix, wisdom teeth, coccyx</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                <h4 className="font-semibold text-purple-900 mb-3">3. Embryological Evidence</h4>
                <p className="text-sm text-purple-800">Embryos of vertebrates show similar developmental stages (von Baer's law)</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                <h4 className="font-semibold text-amber-900 mb-3">4. Molecular Evidence</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• DNA and protein similarities</li>
                  <li>• Cytochrome-c comparisons</li>
                  <li>• Molecular clock</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                <h4 className="font-semibold text-red-900 mb-3">5. Biogeographical Evidence</h4>
                <p className="text-sm text-red-800">Distribution of species across continents (e.g., marsupials in Australia)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Examples of Evolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Industrial Melanism (Peppered Moths)</h4>
                <p className="text-sm text-gray-700">
                  In polluted areas, dark moths increased due to better camouflage. Classic example of natural selection in action.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Antibiotic Resistance</h4>
                <p className="text-sm text-gray-700">
                  Bacteria evolve resistance to antibiotics through mutation and selection.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Darwin's Finches</h4>
                <p className="text-sm text-gray-700">
                  Galapagos finches with different beak shapes adapted to different food sources.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Practice Quiz */}
        <TabsContent value="quiz" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Practice Questions</CardTitle>
                <Badge variant="secondary">
                  {Object.keys(selectedAnswers).length}/{questions.length} Answered
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={progressPercentage} className="mb-4" />

              {questions.map((q, index) => (
                <div key={q.id} className="p-6 bg-muted/50 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Q{index + 1}. {q.questionText}</h3>
                  <div className="space-y-2">
                    {q.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(q.id, idx)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          selectedAnswers[q.id] === idx
                            ? showExplanations[q.id]
                              ? String.fromCharCode(65 + idx) === q.correctAnswer
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-primary bg-primary/5"
                            : "border-muted hover:border-muted-foreground/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {showExplanations[q.id] && String.fromCharCode(65 + idx) === q.correctAnswer && (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          )}
                          {showExplanations[q.id] && selectedAnswers[q.id] === idx && idx !== q.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span>{typeof option === "string" ? option : option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {selectedAnswers[q.id] !== undefined && !showExplanations[q.id] && (
                    <Button onClick={() => handleCheckAnswer(q.id)} className="w-full">
                      Check Answer
                    </Button>
                  )}

                  {showExplanations[q.id] && (
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-sm text-blue-900">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {Object.keys(selectedAnswers).length === questions.length && !quizComplete && (
                <Button onClick={handleSubmitQuiz} className="w-full" size="lg">
                  Submit Quiz
                </Button>
              )}

              {quizComplete && (
                <Card className="border-2 border-primary glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-center">Quiz Complete! 🎉</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <p className="text-3xl font-bold text-primary">{score}/{questions.length}</p>
                      <p className="text-muted-foreground">
                        {score === questions.length ? "Perfect Score!" : score >= questions.length * 0.7 ? "Great Job!" : "Keep Practicing!"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
