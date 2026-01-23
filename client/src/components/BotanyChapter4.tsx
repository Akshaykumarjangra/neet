
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, CheckCircle2, XCircle, Brain , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter4() {
  // Fetch questions from database for Morphology of Flowering Plants (topicId: 68)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '68'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=68');
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
      question: "Tap root system is characteristic of:",
      options: ["Monocots", "Dicots", "Both monocots and dicots", "Neither monocots nor dicots"],
      correctAnswer: "B",
      explanation: "Dicots have a tap root system with a prominent primary root and lateral roots, while monocots have fibrous roots."
    },
    {
      id: 2,
      question: "Reticulate venation is found in:",
      options: ["Monocot leaves", "Dicot leaves", "All leaves", "Stem"],
      correctAnswer: "B",
      explanation: "Dicot leaves show reticulate (net-like) venation, while monocot leaves show parallel venation."
    },
    {
      id: 3,
      question: "A modified stem that grows horizontally below the soil is called:",
      options: ["Tuber", "Rhizome", "Bulb", "Corm"],
      correctAnswer: "B",
      explanation: "Rhizome is an underground stem that grows horizontally (e.g., ginger, turmeric). It has nodes, internodes, and scale leaves."
    },
    {
      id: 4,
      question: "In China rose, the type of aestivation is:",
      options: ["Valvate", "Twisted", "Imbricate", "Vexillary"],
      correctAnswer: "B",
      explanation: "China rose (Hibiscus) shows twisted aestivation where petals overlap each other in a regular direction."
    },
    {
      id: 5,
      question: "The floral formula ⚥ ♀ K₅ C₅ A∞ G₁ represents which family?",
      options: ["Solanaceae", "Fabaceae", "Rosaceae", "Liliaceae"],
      correctAnswer: "C",
      explanation: "This formula represents Rosaceae family. Features: bisexual, actinomorphic, 5 sepals, 5 petals, many stamens, 1 carpel."
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
      if (String.fromCharCode(65 + (selectedAnswers[q.id] ?? -1)) === q.correctAnswer) {
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Morphology of Flowering Plants</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Study the external features of roots, stems, leaves, and flowers
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-green-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Understand root and stem modifications</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn leaf morphology and venation patterns</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master flower parts and their arrangements</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Study floral formulas and diagrams</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="root" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="root">Root & Stem</TabsTrigger>
          <TabsTrigger value="leaf">Leaf</TabsTrigger>
          <TabsTrigger value="flower">Flower</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Root & Stem */}
        <TabsContent value="root" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Root Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Tap Root System (Dicots)</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Primary root persists</li>
                    <li>• Develops lateral roots</li>
                    <li>• Examples: Mustard, Pea, Mango</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Fibrous Root System (Monocots)</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Primary root short-lived</li>
                    <li>• Many roots of similar size</li>
                    <li>• Examples: Wheat, Rice, Maize</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-3">Modified Roots:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-purple-800">
                  <div>• <strong>Storage:</strong> Carrot, Radish, Turnip</div>
                  <div>• <strong>Support:</strong> Prop roots (Banyan)</div>
                  <div>• <strong>Breathing:</strong> Pneumatophores (Mangrove)</div>
                  <div>• <strong>Parasitic:</strong> Haustoria (Cuscuta)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Stem Modifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">Underground Stems:</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• <strong>Rhizome:</strong> Ginger, Turmeric</li>
                    <li>• <strong>Tuber:</strong> Potato</li>
                    <li>• <strong>Bulb:</strong> Onion, Garlic</li>
                    <li>• <strong>Corm:</strong> Colocasia</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Aerial Modifications:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• <strong>Tendrils:</strong> Grape vine, Passion flower</li>
                    <li>• <strong>Thorns:</strong> Bougainvillea, Citrus</li>
                    <li>• <strong>Phylloclade:</strong> Opuntia (flattened stem)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaf */}
        <TabsContent value="leaf" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Leaf Structure and Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Venation:</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <div className="p-2 bg-white rounded">
                      <strong>Reticulate:</strong> Net-like, found in dicots (Mango, Peepal)
                    </div>
                    <div className="p-2 bg-white rounded">
                      <strong>Parallel:</strong> Veins run parallel, found in monocots (Grass, Banana)
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Phyllotaxy:</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="p-2 bg-white rounded">
                      <strong>Alternate:</strong> One leaf per node (China rose, Mustard)
                    </div>
                    <div className="p-2 bg-white rounded">
                      <strong>Opposite:</strong> Two leaves per node (Guava, Calotropis)
                    </div>
                    <div className="p-2 bg-white rounded">
                      <strong>Whorled:</strong> More than two leaves per node (Nerium)
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-3">Leaf Modifications:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-purple-800">
                  <div>• <strong>Tendrils:</strong> Pea (for climbing)</div>
                  <div>• <strong>Spines:</strong> Cactus (reduce water loss)</div>
                  <div>• <strong>Pitcher:</strong> Nepenthes (insectivorous)</div>
                  <div>• <strong>Storage:</strong> Onion (fleshy scale leaves)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flower */}
        <TabsContent value="flower" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Flower Parts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                  <h4 className="font-semibold text-pink-900 mb-2">1. Calyx (Sepals)</h4>
                  <p className="text-sm text-pink-800">Protective outer whorl, usually green</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-semibold text-purple-900 mb-2">2. Corolla (Petals)</h4>
                  <p className="text-sm text-purple-800">Colorful, attracts pollinators</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                  <h4 className="font-semibold text-yellow-900 mb-2">3. Androecium (Stamens)</h4>
                  <p className="text-sm text-yellow-800">Male part: Filament + Anther</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                  <h4 className="font-semibold text-red-900 mb-2">4. Gynoecium (Carpels)</h4>
                  <p className="text-sm text-red-800">Female part: Stigma + Style + Ovary</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Aestivation (Arrangement of petals/sepals):</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-800">
                  <div>• <strong>Valvate:</strong> Edges touch, no overlap (Calotropis)</div>
                  <div>• <strong>Twisted:</strong> Regular overlapping (China rose)</div>
                  <div>• <strong>Imbricate:</strong> Irregular overlapping (Cassia)</div>
                  <div>• <strong>Vexillary:</strong> Pea family specific pattern</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Floral Formula Symbols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-50 rounded">⚥ - Bisexual flower</div>
                  <div className="p-2 bg-gray-50 rounded">♂ - Male flower</div>
                  <div className="p-2 bg-gray-50 rounded">♀ - Female flower</div>
                  <div className="p-2 bg-gray-50 rounded">⊕ - Actinomorphic (radial symmetry)</div>
                  <div className="p-2 bg-gray-50 rounded">% - Zygomorphic (bilateral symmetry)</div>
                  <div className="p-2 bg-gray-50 rounded">K - Calyx (sepals)</div>
                  <div className="p-2 bg-gray-50 rounded">C - Corolla (petals)</div>
                  <div className="p-2 bg-gray-50 rounded">A - Androecium (stamens)</div>
                  <div className="p-2 bg-gray-50 rounded">G - Gynoecium (carpels)</div>
                  <div className="p-2 bg-gray-50 rounded">∞ - Many/Numerous</div>
                </div>
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
                  <h3 className="font-semibold text-lg">Q{index + 1}. {getQuestionLabel(q)}</h3>
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
                          {showExplanations[q.id] && selectedAnswers[q.id] === idx && String.fromCharCode(65 + idx) !== q.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span>{getOptionLabel(option)}</span>
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
