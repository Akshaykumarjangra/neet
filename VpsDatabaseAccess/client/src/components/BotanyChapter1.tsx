
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TestTubes, BookOpen, Brain, CheckCircle2, XCircle, Lightbulb , Loader2 } from "lucide-react";

export function BotanyChapter1() {
  // Fetch questions from database for Cell Structure and Function (topicId: 7)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '7'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=7');
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
      question: "Which is the largest phylum in the animal kingdom?",
      options: ["Chordata", "Arthropoda", "Mollusca", "Echinodermata"],
      correctAnswer: 1,
      explanation: "Arthropoda is the largest phylum, containing over 80% of all known animal species including insects, arachnids, and crustaceans."
    },
    {
      id: 2,
      question: "The term 'species' was coined by:",
      options: ["Linnaeus", "John Ray", "Aristotle", "Theophrastus"],
      correctAnswer: 1,
      explanation: "John Ray (1627-1705) introduced the concept of species in biological nomenclature, though Linnaeus later popularized the binomial nomenclature system."
    },
    {
      id: 3,
      question: "ICZN stands for:",
      options: [
        "International Code of Zoological Nomenclature",
        "Indian Council of Zoological Names",
        "International Committee of Zoological Nomenclature",
        "International Code of Zonal Nomenclature"
      ],
      correctAnswer: 0,
      explanation: "ICZN (International Code of Zoological Nomenclature) provides the rules for naming animals to ensure stability and universality in zoological nomenclature."
    },
    {
      id: 4,
      question: "Taxonomic categories arranged in descending order:",
      options: [
        "Kingdom → Phylum → Class → Order → Family → Genus → Species",
        "Kingdom → Class → Phylum → Order → Family → Genus → Species",
        "Kingdom → Phylum → Order → Class → Family → Genus → Species",
        "Species → Genus → Family → Order → Class → Phylum → Kingdom"
      ],
      correctAnswer: 0,
      explanation: "The correct taxonomic hierarchy from broadest to most specific is: Kingdom, Phylum (Division in plants), Class, Order, Family, Genus, Species."
    },
    {
      id: 5,
      question: "Binomial nomenclature consists of:",
      options: [
        "Family name and Genus name",
        "Genus name and Species epithet",
        "Order name and Family name",
        "Species name and Variety name"
      ],
      correctAnswer: 1,
      explanation: "Binomial nomenclature uses two names: the Genus name (capitalized) followed by the species epithet (lowercase), both italicized or underlined."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="h-10 w-10" />
            <h1 className="text-4xl font-bold">The Living World</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Explore the diversity of life, classification systems, and the fundamental concepts of taxonomy
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
              <p>Understand what defines living organisms</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn biodiversity and its importance</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master taxonomic categories and hierarchy</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Understand binomial nomenclature system</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="classification">Classification</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Key Concepts */}
        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                Characteristics of Living Organisms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">1. Growth</h4>
                  <p className="text-sm text-green-800">Increase in mass and number of cells</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">2. Reproduction</h4>
                  <p className="text-sm text-green-800">Producing offspring (sexual or asexual)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">3. Metabolism</h4>
                  <p className="text-sm text-green-800">Chemical reactions in the body (anabolism + catabolism)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">4. Cellular Organization</h4>
                  <p className="text-sm text-green-800">Made up of one or more cells</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">5. Consciousness</h4>
                  <p className="text-sm text-green-800">Ability to sense and respond to environment</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">6. Adaptation</h4>
                  <p className="text-sm text-green-800">Evolving features to survive in environment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Biodiversity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p>Biodiversity refers to the variety of life on Earth at all levels:</p>
                <ul className="space-y-2">
                  <li><strong>Genetic Diversity:</strong> Variation in genes within a species</li>
                  <li><strong>Species Diversity:</strong> Variety of species in an ecosystem</li>
                  <li><strong>Ecosystem Diversity:</strong> Variety of ecosystems in a region</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">📊 Global Biodiversity Stats:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• ~1.7 million species described</li>
                  <li>• ~8.7 million estimated total species</li>
                  <li>• Insects make up ~70% of known species</li>
                  <li>• India: 8% of global biodiversity (megadiverse country)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Nomenclature Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Binomial Nomenclature (Linnaeus)</h4>
                <div className="space-y-2 text-sm text-amber-800">
                  <p>✓ Two-word naming system: <em>Genus species</em></p>
                  <p>✓ Genus name capitalized, species epithet lowercase</p>
                  <p>✓ Both italicized (or underlined when handwritten)</p>
                  <p>✓ Example: <em>Homo sapiens</em>, <em>Mangifera indica</em></p>
                  <p>✓ Author's name can be abbreviated after: <em>Mangifera indica</em> L. (Linnaeus)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Classification */}
        <TabsContent value="classification" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Taxonomic Hierarchy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Kingdom", example: "Plantae", color: "bg-purple-100 text-purple-900" },
                  { name: "Division/Phylum", example: "Angiospermae", color: "bg-blue-100 text-blue-900" },
                  { name: "Class", example: "Dicotyledonae", color: "bg-green-100 text-green-900" },
                  { name: "Order", example: "Sapindales", color: "bg-yellow-100 text-yellow-900" },
                  { name: "Family", example: "Anacardiaceae", color: "bg-orange-100 text-orange-900" },
                  { name: "Genus", example: "Mangifera", color: "bg-red-100 text-red-900" },
                  { name: "Species", example: "indica", color: "bg-pink-100 text-pink-900" },
                ].map((level, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`flex-1 p-3 rounded-lg ${level.color} font-semibold`}>
                      {level.name}
                    </div>
                    <div className="flex-1 p-3 bg-gray-100 rounded-lg">
                      <em>{level.example}</em>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Example:</strong> Mango tree = <em>Mangifera indica</em> L.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Five Kingdom Classification (Whittaker, 1969)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Monera</h4>
                  <p className="text-sm text-purple-800">Prokaryotic, unicellular (bacteria, blue-green algae)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Protista</h4>
                  <p className="text-sm text-green-800">Eukaryotic, unicellular (algae, protozoans)</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Fungi</h4>
                  <p className="text-sm text-amber-800">Heterotrophic, saprophytic (mushrooms, yeast)</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">Plantae</h4>
                  <p className="text-sm text-emerald-800">Autotrophic, multicellular (all plants)</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Animalia</h4>
                  <p className="text-sm text-blue-800">Heterotrophic, multicellular (all animals)</p>
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
                Classification Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                <h4 className="font-semibold text-green-900 mb-3">Mango Tree (<em>Mangifera indica</em>)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong>Kingdom:</strong> Plantae</p>
                  <p><strong>Division:</strong> Angiospermae</p>
                  <p><strong>Class:</strong> Dicotyledonae</p>
                  <p><strong>Order:</strong> Sapindales</p>
                  <p><strong>Family:</strong> Anacardiaceae</p>
                  <p><strong>Genus:</strong> Mangifera</p>
                  <p className="col-span-2"><strong>Species:</strong> indica</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-semibold text-blue-900 mb-3">Human (<em>Homo sapiens</em>)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong>Kingdom:</strong> Animalia</p>
                  <p><strong>Phylum:</strong> Chordata</p>
                  <p><strong>Class:</strong> Mammalia</p>
                  <p><strong>Order:</strong> Primates</p>
                  <p><strong>Family:</strong> Hominidae</p>
                  <p><strong>Genus:</strong> Homo</p>
                  <p className="col-span-2"><strong>Species:</strong> sapiens</p>
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
