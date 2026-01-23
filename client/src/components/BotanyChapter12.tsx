
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flower, CheckCircle2, XCircle, Brain, Lightbulb, BookOpen , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter12() {
  // Fetch questions from database for Plant Growth and Development (topicId: 76)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '76'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=76');
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
      question: "In which part of the flower does microsporogenesis occur?",
      options: ["Ovary", "Anther", "Stigma", "Style"],
      correctAnswer: "B",
      explanation: "Microsporogenesis (formation of microspores/pollen grains) occurs in the anther, specifically within the pollen sacs (microsporangia)."
    },
    {
      id: 2,
      question: "The functional megaspore in angiosperms is:",
      options: ["First megaspore", "Second megaspore", "Third megaspore", "Fourth megaspore (chalazal)"],
      correctAnswer: "D",
      explanation: "In most angiosperms, the chalazal megaspore (fourth one, farthest from the micropyle) is functional and develops into the embryo sac, while the other three degenerate."
    },
    {
      id: 3,
      question: "Double fertilization in angiosperms results in the formation of:",
      options: [
        "Two embryos",
        "Embryo and endosperm",
        "Two endosperms",
        "Embryo and seed coat"
      ],
      correctAnswer: "B",
      explanation: "Double fertilization involves: (1) one male gamete fusing with egg to form zygote (embryo), and (2) another male gamete fusing with two polar nuclei to form primary endosperm nucleus (3n endosperm)."
    },
    {
      id: 4,
      question: "The mature embryo sac of angiosperms is typically:",
      options: ["4-nucleate", "6-nucleate", "7-nucleate", "8-nucleate"],
      correctAnswer: "C",
      explanation: "The mature embryo sac (female gametophyte) is 7-celled and 8-nucleate: 3 antipodal cells, 1 egg cell, 2 synergids, and 1 central cell with 2 polar nuclei."
    },
    {
      id: 5,
      question: "Filiform apparatus is present in:",
      options: ["Antipodal cells", "Synergids", "Egg cell", "Central cell"],
      correctAnswer: "B",
      explanation: "The filiform apparatus is a finger-like projection at the micropylar end of synergid cells that helps guide the pollen tube toward the egg cell."
    },
    {
      id: 6,
      question: "The outer covering of the ovule is called:",
      options: ["Nucellus", "Integument", "Chalaza", "Funicle"],
      correctAnswer: "B",
      explanation: "The integuments are the outer protective layers of the ovule. Most angiosperms have two integuments (bitegmic), which later develop into the seed coat."
    },
    {
      id: 7,
      question: "In a mature pollen grain, the vegetative cell is:",
      options: ["Smaller with dense cytoplasm", "Larger with abundant food reserve", "Absent", "Equal to generative cell"],
      correctAnswer: "B",
      explanation: "The vegetative cell is larger and has abundant food reserves and a large irregular nucleus. It forms the pollen tube during germination."
    },
    {
      id: 8,
      question: "Polyembryony is commonly observed in:",
      options: ["Mango", "Citrus", "Rice", "Wheat"],
      correctAnswer: "B",
      explanation: "Polyembryony (formation of multiple embryos in a single seed) is commonly observed in Citrus due to formation of nucellar embryos in addition to zygotic embryo."
    },
    {
      id: 9,
      question: "The phenomenon of development of fruit without fertilization is called:",
      options: ["Apomixis", "Parthenocarpy", "Parthenogenesis", "Apogamy"],
      correctAnswer: "B",
      explanation: "Parthenocarpy is the development of fruit without fertilization, resulting in seedless fruits. Examples: banana, pineapple, grapes."
    },
    {
      id: 10,
      question: "Perisperm is the remnant of:",
      options: ["Nucellus", "Integument", "Endosperm", "Embryo sac"],
      correctAnswer: "A",
      explanation: "Perisperm is the persistent nucellus in some seeds (e.g., black pepper, beet) that stores food. It's different from endosperm which develops after fertilization."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-rose-600 to-red-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Flower className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Sexual Reproduction in Flowering Plants</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Explore the fascinating mechanisms of flower structure, pollination, fertilization, and seed formation
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-pink-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-600 mt-0.5" />
              <p>Understand flower structure and sexual reproduction</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-600 mt-0.5" />
              <p>Learn microsporogenesis and megasporogenesis</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-600 mt-0.5" />
              <p>Master pollination and fertilization mechanisms</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-pink-600 mt-0.5" />
              <p>Understand seed and fruit development</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="processes">Processes</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Key Concepts */}
        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-pink-600" />
                Flower Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h4 className="font-semibold text-pink-900 mb-2">Male Parts (Androecium)</h4>
                  <ul className="text-sm text-pink-800 space-y-1">
                    <li>• Stamen = Filament + Anther</li>
                    <li>• Anther contains pollen sacs (microsporangia)</li>
                    <li>• Produces pollen grains (male gametophytes)</li>
                  </ul>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <h4 className="font-semibold text-rose-900 mb-2">Female Parts (Gynoecium)</h4>
                  <ul className="text-sm text-rose-800 space-y-1">
                    <li>• Carpel/Pistil = Stigma + Style + Ovary</li>
                    <li>• Ovary contains ovules</li>
                    <li>• Ovule contains embryo sac (female gametophyte)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Anther Structure (Transverse Section)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p className="mb-4">A typical anther is bilobed and tetrasporangiate (4 pollen sacs):</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Layers (outer to inner)</h4>
                    <ol className="text-sm text-purple-800 space-y-1 list-decimal list-inside">
                      <li>Epidermis</li>
                      <li>Endothecium (mechanical support)</li>
                      <li>Middle layers (2-3 layers, degenerate)</li>
                      <li>Tapetum (nourishes pollen grains)</li>
                    </ol>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2">Function</h4>
                    <ul className="text-sm text-indigo-800 space-y-1">
                      <li>• Tapetum: most important nutritive layer</li>
                      <li>• Provides enzymes and sporopollenin</li>
                      <li>• Endothecium helps in anther dehiscence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Embryo Sac Structure (7-celled, 8-nucleate)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Micropylar End (3 cells)</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• 1 Egg cell (female gamete)</li>
                    <li>• 2 Synergids (with filiform apparatus)</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Central Cell (1 large cell, 2 nuclei)</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• 2 Polar nuclei (fuse to form diploid secondary nucleus)</li>
                    <li>• Will form triploid endosperm after fertilization</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Chalazal End (3 cells)</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• 3 Antipodal cells (nutritive function)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processes */}
        <TabsContent value="processes" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Microsporogenesis (Pollen Formation)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { step: 1, title: "Microspore Mother Cell (MMC)", desc: "Diploid (2n) cells in pollen sac" },
                  { step: 2, title: "Meiosis I & II", desc: "MMC undergoes meiosis → 4 haploid microspores" },
                  { step: 3, title: "Microspore Tetrad", desc: "4 microspores arranged in tetrahedral fashion" },
                  { step: 4, title: "Separation", desc: "Microspores separate and develop thick wall" },
                  { step: 5, title: "Pollen Grain", desc: "Each microspore → pollen grain (male gametophyte)" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">{item.title}</h4>
                      <p className="text-sm text-blue-800">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Megasporogenesis (Embryo Sac Formation)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { step: 1, title: "Megaspore Mother Cell (MMC)", desc: "Single diploid (2n) cell in nucellus" },
                  { step: 2, title: "Meiosis", desc: "MMC undergoes meiosis → 4 haploid megaspores (linear)" },
                  { step: 3, title: "Degeneration", desc: "3 megaspores degenerate, 1 functional (chalazal)" },
                  { step: 4, title: "Mitosis (3 rounds)", desc: "Functional megaspore → 8 nuclei (3 mitotic divisions)" },
                  { step: 5, title: "Cell Wall Formation", desc: "7-celled, 8-nucleate embryo sac formed" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-900">{item.title}</h4>
                      <p className="text-sm text-purple-800">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Double Fertilization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Unique to Angiosperms</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border border-amber-300">
                    <p className="font-semibold text-amber-900">Syngamy (Fertilization 1)</p>
                    <p className="text-sm text-amber-800">Male gamete (n) + Egg (n) → Zygote (2n) → Embryo</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-amber-300">
                    <p className="font-semibold text-amber-900">Triple Fusion (Fertilization 2)</p>
                    <p className="text-sm text-amber-800">Male gamete (n) + 2 Polar nuclei (n+n) → Primary endosperm nucleus (3n) → Endosperm</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-semibold text-green-900 mb-2">Key Point:</p>
                <p className="text-sm text-green-800">
                  Since both male gametes participate in fertilization, the process is called double fertilization.
                  This ensures efficient use of male gametes and provides nutrition (endosperm) for developing embryo.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Post-Fertilization Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Seed Development</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Ovule → Seed</li>
                    <li>• Integuments → Seed coat (testa & tegmen)</li>
                    <li>• Zygote → Embryo</li>
                    <li>• Primary endosperm nucleus → Endosperm (3n)</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Fruit Development</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Ovary → Fruit (pericarp)</li>
                    <li>• Ovary wall → Fruit wall</li>
                    <li>• Other parts wither away</li>
                    <li>• Sometimes other parts also form fruit</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Examples */}
        <TabsContent value="examples" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Pollination Types & Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Self-Pollination (Autogamy)</h4>
                  <p className="text-sm text-blue-800 mb-2">Transfer of pollen from anther to stigma of same flower</p>
                  <p className="text-xs text-blue-700"><strong>Examples:</strong> Pea, Wheat, Rice, Sunflower</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Cross-Pollination (Allogamy)</h4>
                  <p className="text-sm text-green-800 mb-2">Transfer between flowers of different plants</p>
                  <p className="text-xs text-green-700"><strong>Examples:</strong> Maize, Papaya, Cucumber</p>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Agents of Pollination</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Wind (Anemophily)</p>
                    <p className="text-xs text-muted-foreground">Grass, Maize, Rice</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Insects (Entomophily)</p>
                    <p className="text-xs text-muted-foreground">Most flowers, Salvia</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Water (Hydrophily)</p>
                    <p className="text-xs text-muted-foreground">Vallisneria, Hydrilla</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Birds (Ornithophily)</p>
                    <p className="text-xs text-muted-foreground">Bombax, Bignonia</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Special Reproductive Mechanisms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Parthenocarpy</h4>
                <p className="text-sm text-yellow-800 mb-2">Development of fruit without fertilization (seedless fruits)</p>
                <p className="text-xs text-yellow-700"><strong>Examples:</strong> Banana, Pineapple, Seedless grapes</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">Apomixis</h4>
                <p className="text-sm text-orange-800 mb-2">Formation of seeds without fertilization (asexual reproduction)</p>
                <p className="text-xs text-orange-700"><strong>Examples:</strong> Citrus, Mango, Grasses</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Polyembryony</h4>
                <p className="text-sm text-red-800 mb-2">Occurrence of more than one embryo in a seed</p>
                <p className="text-xs text-red-700"><strong>Examples:</strong> Citrus, Opuntia, Mango</p>
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
