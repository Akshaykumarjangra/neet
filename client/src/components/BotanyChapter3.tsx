
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, CheckCircle2, XCircle, Brain, Lightbulb , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter3() {
  // Fetch questions from database for Genetics (topicId: 9)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '9'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=9');
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
      question: "Bryophytes are called 'amphibians of plant kingdom' because:",
      options: [
        "They live both in water and on land",
        "They need water for sexual reproduction",
        "They have vascular tissue",
        "They are autotrophic"
      ],
      correctAnswer: "B",
      explanation: "Bryophytes require water for the motile male gametes (antherozoids) to swim and fertilize the egg, similar to how amphibians need water for reproduction."
    },
    {
      id: 2,
      question: "The dominant phase in the life cycle of bryophytes is:",
      options: [
        "Sporophyte",
        "Gametophyte",
        "Spore",
        "Zygote"
      ],
      correctAnswer: "B",
      explanation: "In bryophytes, the gametophyte is the main plant body that is photosynthetic and independent. The sporophyte is dependent on the gametophyte."
    },
    {
      id: 3,
      question: "Pteridophytes differ from bryophytes in having:",
      options: [
        "Archegonia",
        "Antheridia",
        "Vascular tissue",
        "Flagellated sperms"
      ],
      correctAnswer: "C",
      explanation: "Pteridophytes (ferns) have well-developed vascular tissue (xylem and phloem) while bryophytes lack true vascular tissue."
    },
    {
      id: 4,
      question: "Seeds in gymnosperms are called 'naked seeds' because:",
      options: [
        "They are not covered by fruit wall",
        "They have no seed coat",
        "They are very small",
        "They are exposed on leaves"
      ],
      correctAnswer: "A",
      explanation: "In gymnosperms, ovules and seeds are not enclosed in an ovary/fruit wall. They are borne on cone scales (naked)."
    },
    {
      id: 5,
      question: "Double fertilization is characteristic of:",
      options: [
        "Gymnosperms",
        "Angiosperms",
        "Pteridophytes",
        "Bryophytes"
      ],
      correctAnswer: "B",
      explanation: "Double fertilization (one sperm fuses with egg forming zygote, another fuses with polar nuclei forming endosperm) is unique to angiosperms."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Plant Kingdom</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Explore the diversity of plants from simple bryophytes to complex angiosperms
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
              <p>Understand classification of plant kingdom</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn about algae, bryophytes, and pteridophytes</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Compare gymnosperms and angiosperms</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master plant life cycles and alternation of generations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="algae" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="algae">Algae</TabsTrigger>
          <TabsTrigger value="bryophytes">Bryophytes & Pteridophytes</TabsTrigger>
          <TabsTrigger value="gymnosperms">Gymnosperms & Angiosperms</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Algae */}
        <TabsContent value="algae" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Algae - Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Chlorophyceae (Green Algae)</h4>
                  <p className="text-sm text-green-800 mb-2">Pigments: Chlorophyll a, b</p>
                  <p className="text-sm text-green-800 mb-2">Storage: Starch</p>
                  <p className="text-xs text-green-700">Examples: Chlamydomonas, Volvox, Ulothrix, Spirogyra</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Phaeophyceae (Brown Algae)</h4>
                  <p className="text-sm text-amber-800 mb-2">Pigments: Chlorophyll a, c + fucoxanthin</p>
                  <p className="text-sm text-amber-800 mb-2">Storage: Laminarin, mannitol</p>
                  <p className="text-xs text-amber-700">Examples: Ectocarpus, Dictyota, Laminaria, Sargassum</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Rhodophyceae (Red Algae)</h4>
                  <p className="text-sm text-red-800 mb-2">Pigments: Chlorophyll a, d + phycoerythrin</p>
                  <p className="text-sm text-red-800 mb-2">Storage: Floridean starch</p>
                  <p className="text-xs text-red-700">Examples: Polysiphonia, Porphyra, Gelidium</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Economic Importance of Algae:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Primary producers in aquatic ecosystems</li>
                  <li>• Source of agar (from Gelidium) used in microbiology</li>
                  <li>• Algin from brown algae used in ice cream, cosmetics</li>
                  <li>• Spirulina - protein-rich food supplement</li>
                  <li>• Chlorella - single cell protein (SCP)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bryophytes & Pteridophytes */}
        <TabsContent value="bryophytes" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Bryophytes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Characteristics:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Amphibians of plant kingdom</li>
                    <li>• No vascular tissue (xylem, phloem)</li>
                    <li>• Gametophyte is dominant phase</li>
                    <li>• Water needed for fertilization</li>
                    <li>• Sporophyte depends on gametophyte</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Classification:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-white rounded">
                      <strong>Hepaticopsida (Liverworts):</strong> Marchantia, Riccia
                    </div>
                    <div className="p-2 bg-white rounded">
                      <strong>Anthocerotopsida (Hornworts):</strong> Anthoceros
                    </div>
                    <div className="p-2 bg-white rounded">
                      <strong>Bryopsida (Mosses):</strong> Funaria, Sphagnum, Polytrichum
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Pteridophytes (Ferns)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3">Characteristics:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• First vascular plants (xylem + phloem)</li>
                    <li>• Sporophyte is dominant phase</li>
                    <li>• No seeds, reproduce by spores</li>
                    <li>• Water needed for fertilization</li>
                    <li>• Show heterospory in some species</li>
                  </ul>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-3">Examples:</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Psilopsida: Psilotum</li>
                    <li>• Lycopsida: Selaginella, Lycopodium</li>
                    <li>• Sphenopsida: Equisetum</li>
                    <li>• Pteropsida: Pteris, Adiantum, Dryopteris</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gymnosperms & Angiosperms */}
        <TabsContent value="gymnosperms" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Gymnosperms (Naked Seeds)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Characteristics:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Seeds not enclosed in fruit</li>
                    <li>• Ovules borne on cone scales</li>
                    <li>• No vessels in xylem (except Gnetum)</li>
                    <li>• Wind pollination (anemophily)</li>
                    <li>• Heterosporous</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Examples:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Cycas (living fossil)</li>
                    <li>• Pinus (pine tree)</li>
                    <li>• Cedrus (deodar)</li>
                    <li>• Ginkgo (maidenhair tree)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Angiosperms (Flowering Plants)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Key Features:</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Seeds enclosed in fruit (ovary wall)</li>
                  <li>• Presence of flowers</li>
                  <li>• Double fertilization</li>
                  <li>• Vessels in xylem</li>
                  <li>• Most advanced and dominant plants</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">Dicotyledons</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Two cotyledons in seed</li>
                    <li>• Reticulate venation</li>
                    <li>• Tap root system</li>
                    <li>• Pentamerous flowers</li>
                    <li>Examples: Pea, Mango, Rose</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Monocotyledons</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• One cotyledon in seed</li>
                    <li>• Parallel venation</li>
                    <li>• Fibrous root system</li>
                    <li>• Trimerous flowers</li>
                    <li>Examples: Wheat, Rice, Lily</li>
                  </ul>
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
