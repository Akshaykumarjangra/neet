
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TestTubes, BookOpen, Brain, CheckCircle2, XCircle, Lightbulb , Loader2 } from "lucide-react";

export function BotanyChapter2() {
  // Fetch questions from database for Plant Physiology (topicId: 8)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '8'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=8');
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
      question: "Who proposed the Five Kingdom classification?",
      options: ["Linnaeus", "Whittaker", "Haeckel", "Copeland"],
      correctAnswer: 1,
      explanation: "R.H. Whittaker (1969) proposed the Five Kingdom classification based on cell structure, mode of nutrition, and body organization."
    },
    {
      id: 2,
      question: "Kingdom Monera includes:",
      options: ["Algae", "Fungi", "Bacteria and Cyanobacteria", "Protozoans"],
      correctAnswer: 2,
      explanation: "Kingdom Monera includes all prokaryotic organisms such as bacteria and blue-green algae (cyanobacteria)."
    },
    {
      id: 3,
      question: "Viruses are not included in the Five Kingdom classification because:",
      options: [
        "They are too small",
        "They lack cellular organization",
        "They reproduce only sexually",
        "They are extinct"
      ],
      correctAnswer: 1,
      explanation: "Viruses are not considered living organisms as they lack cellular organization and can only replicate inside a host cell."
    },
    {
      id: 4,
      question: "Bacteria reproduce mainly by:",
      options: ["Budding", "Binary fission", "Fragmentation", "Spore formation"],
      correctAnswer: 1,
      explanation: "Bacteria primarily reproduce asexually by binary fission, where one cell divides into two identical daughter cells."
    },
    {
      id: 5,
      question: "The term 'protista' was coined by:",
      options: ["Whittaker", "Ernst Haeckel", "Linnaeus", "Aristotle"],
      correctAnswer: 1,
      explanation: "Ernst Haeckel (1866) coined the term 'Protista' for unicellular eukaryotic organisms."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <TestTubes className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Biological Classification</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding the classification systems, kingdoms of life, and evolutionary relationships
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
              <p>Master the Five Kingdom classification system</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Understand characteristics of each kingdom</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn about viruses, viroids, and lichens</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Study bacterial classification and structure</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="kingdoms">Five Kingdoms</TabsTrigger>
          <TabsTrigger value="bacteria">Bacteria & Viruses</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Key Concepts */}
        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Evolution of Classification Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Two Kingdom (Linnaeus)</h4>
                  <p className="text-sm text-blue-800">Plantae and Animalia</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Three Kingdom (Haeckel, 1866)</h4>
                  <p className="text-sm text-green-800">Plantae, Animalia, and Protista</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Four Kingdom (Copeland, 1956)</h4>
                  <p className="text-sm text-purple-800">Monera, Protista, Plantae, Animalia</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Five Kingdom (Whittaker, 1969)</h4>
                  <p className="text-sm text-amber-800">Monera, Protista, Fungi, Plantae, Animalia</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Basis of Five Kingdom Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Cell Structure</h4>
                  <p className="text-sm text-green-800">Prokaryotic vs Eukaryotic</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Body Organization</h4>
                  <p className="text-sm text-blue-800">Unicellular vs Multicellular</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-semibold text-purple-900 mb-2">Mode of Nutrition</h4>
                  <p className="text-sm text-purple-800">Autotrophic vs Heterotrophic</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Five Kingdoms */}
        <TabsContent value="kingdoms" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Detailed Kingdom Characteristics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4">1. Kingdom Monera</h3>
                <div className="space-y-2 text-sm text-purple-800">
                  <p>✓ Prokaryotic, unicellular organisms</p>
                  <p>✓ No true nucleus or membrane-bound organelles</p>
                  <p>✓ Cell wall present (peptidoglycan in bacteria)</p>
                  <p>✓ Examples: Bacteria, Cyanobacteria (blue-green algae)</p>
                  <p>✓ Nutrition: Autotrophic or Heterotrophic</p>
                </div>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">2. Kingdom Protista</h3>
                <div className="space-y-2 text-sm text-green-800">
                  <p>✓ Eukaryotic, mostly unicellular</p>
                  <p>✓ True nucleus and membrane-bound organelles</p>
                  <p>✓ Examples: Amoeba, Paramecium, Euglena, Diatoms</p>
                  <p>✓ Nutrition: Autotrophic (algae) or Heterotrophic (protozoans)</p>
                  <p>✓ Link between plants and animals</p>
                </div>
              </div>

              <div className="p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4">3. Kingdom Fungi</h3>
                <div className="space-y-2 text-sm text-amber-800">
                  <p>✓ Eukaryotic, mostly multicellular</p>
                  <p>✓ Heterotrophic (saprophytic, parasitic, or symbiotic)</p>
                  <p>✓ Cell wall made of chitin</p>
                  <p>✓ Examples: Mushrooms, Yeast, Penicillium</p>
                  <p>✓ Body made of hyphae (mycelium)</p>
                </div>
              </div>

              <div className="p-6 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">4. Kingdom Plantae</h3>
                <div className="space-y-2 text-sm text-emerald-800">
                  <p>✓ Eukaryotic, multicellular</p>
                  <p>✓ Autotrophic (photosynthesis)</p>
                  <p>✓ Cell wall made of cellulose</p>
                  <p>✓ Examples: All plants (algae to angiosperms)</p>
                  <p>✓ Chlorophyll present</p>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">5. Kingdom Animalia</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>✓ Eukaryotic, multicellular</p>
                  <p>✓ Heterotrophic (holozoic)</p>
                  <p>✓ No cell wall</p>
                  <p>✓ Examples: All animals (sponges to mammals)</p>
                  <p>✓ Most are motile</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bacteria & Viruses */}
        <TabsContent value="bacteria" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Bacterial Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">By Shape</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Cocci (spherical) - <em>Staphylococcus</em></li>
                    <li>• Bacilli (rod-shaped) - <em>E. coli</em></li>
                    <li>• Spirilla (spiral) - <em>Spirillum</em></li>
                    <li>• Vibrio (comma-shaped) - <em>Vibrio cholerae</em></li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">By Nutrition</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Autotrophic (self-feeding)</li>
                    <li>• Heterotrophic (depend on others)</li>
                    <li>• Saprophytic (dead organic matter)</li>
                    <li>• Parasitic (living hosts)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Viruses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-900 mb-3">Characteristics</h4>
                <ul className="text-sm text-red-800 space-y-2">
                  <li>✓ Non-cellular, obligate intracellular parasites</li>
                  <li>✓ Contain either DNA or RNA (never both)</li>
                  <li>✓ Protein coat called capsid</li>
                  <li>✓ Can crystallize outside host</li>
                  <li>✓ Discovered by Dmitri Ivanovsky (TMV)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Lichens - Symbiotic Association</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-900 mb-3">
                  Lichens are composite organisms formed by symbiotic association between:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-white rounded">
                    <strong>Algae (Phycobiont):</strong> Provides food through photosynthesis
                  </div>
                  <div className="p-3 bg-white rounded">
                    <strong>Fungi (Mycobiont):</strong> Provides shelter and absorbs minerals
                  </div>
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
