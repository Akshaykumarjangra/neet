
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, CheckCircle2, XCircle, Brain, Lightbulb, AlertTriangle, Wind , Loader2 } from "lucide-react";

export function BotanyChapter25() {
  // Fetch questions from database for Biodiversity and Conservation (topicId: 89)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '89'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=89');
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
      question: "Which of the following is a biodegradable pollutant?",
      options: ["DDT", "Sewage", "Mercury", "Plastic"],
      correctAnswer: 1,
      explanation: "Sewage is a biodegradable pollutant that can be decomposed by microorganisms, while DDT, mercury, and plastic are non-biodegradable."
    },
    {
      id: 2,
      question: "The main cause of ozone depletion in the stratosphere is:",
      options: ["Carbon dioxide", "Chlorofluorocarbons (CFCs)", "Methane", "Nitrous oxide"],
      correctAnswer: 1,
      explanation: "CFCs release chlorine atoms in the stratosphere which catalyze the breakdown of ozone (O₃) into oxygen (O₂)."
    },
    {
      id: 3,
      question: "The thickness of ozone layer is measured in:",
      options: ["Angstrom units", "Dobson units", "Nanometers", "Micrometers"],
      correctAnswer: 1,
      explanation: "Dobson unit (DU) is the standard unit for measuring the total amount of ozone in a vertical column of air."
    },
    {
      id: 4,
      question: "Eutrophication leads to:",
      options: [
        "Increase in oxygen level",
        "Decrease in dissolved oxygen",
        "Increase in fish population",
        "Decrease in algal bloom"
      ],
      correctAnswer: 1,
      explanation: "Eutrophication causes excessive algal growth, which depletes dissolved oxygen when algae die and decompose, leading to fish deaths."
    },
    {
      id: 5,
      question: "The Montreal Protocol aims to control:",
      options: [
        "Global warming",
        "Ozone depletion",
        "Acid rain",
        "Water pollution"
      ],
      correctAnswer: 1,
      explanation: "The Montreal Protocol (1987) is an international treaty designed to protect the ozone layer by phasing out production of ozone-depleting substances."
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
            <AlertTriangle className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Environmental Issues</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding pollution, conservation, and environmental protection
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
              <p>Understand types and effects of pollution</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn about ozone depletion and greenhouse effect</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Study waste management and recycling</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Explore conservation strategies</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pollution" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pollution">Pollution</TabsTrigger>
          <TabsTrigger value="ozone">Ozone & Climate</TabsTrigger>
          <TabsTrigger value="waste">Waste Management</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Pollution */}
        <TabsContent value="pollution" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Types of Pollution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <Wind className="h-6 w-6" />
                  Air Pollution
                </h3>
                <div className="space-y-3 text-sm text-red-800">
                  <div>
                    <strong>Primary Pollutants:</strong>
                    <p>• CO, NO₂, SO₂, particulate matter, hydrocarbons</p>
                  </div>
                  <div>
                    <strong>Secondary Pollutants:</strong>
                    <p>• Ozone (O₃), PAN (Peroxyacetyl nitrate)</p>
                  </div>
                  <div>
                    <strong>Effects:</strong>
                    <p>• Respiratory diseases, acid rain, smog formation</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Droplets className="h-6 w-6" />
                  Water Pollution
                </h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <div>
                    <strong>Sources:</strong>
                    <p>• Industrial effluents, domestic sewage, agricultural runoff</p>
                  </div>
                  <div>
                    <strong>Pollutants:</strong>
                    <p>• Heavy metals, pesticides, fertilizers, pathogens</p>
                  </div>
                  <div>
                    <strong>Effects:</strong>
                    <p>• Eutrophication, biomagnification, waterborne diseases</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Soil Pollution</h3>
                <div className="space-y-2 text-sm text-amber-800">
                  <p>• Pesticides and insecticides (DDT, BHC)</p>
                  <p>• Industrial waste and heavy metals</p>
                  <p>• Plastic waste and non-biodegradable materials</p>
                  <p>• Effects: Reduced soil fertility, food chain contamination</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Biomagnification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="mb-4 text-sm">
                  Increase in concentration of toxic substances at successive trophic levels in a food chain.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Example: DDT accumulation</strong></p>
                  <div className="pl-4 space-y-1">
                    <p>• Water: 0.003 ppm</p>
                    <p>• Zooplankton: 0.04 ppm</p>
                    <p>• Small fish: 0.5 ppm</p>
                    <p>• Large fish: 2 ppm</p>
                    <p>• Birds (fish-eating): 25 ppm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ozone & Climate */}
        <TabsContent value="ozone" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Ozone Layer Depletion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold mb-3">Ozone Formation and Location</h4>
                <div className="space-y-2 text-sm">
                  <p>• Located in stratosphere (15-50 km altitude)</p>
                  <p>• Formation: O₂ + UV → 2O; O + O₂ → O₃</p>
                  <p>• Protects Earth from harmful UV radiation</p>
                  <p>• Measured in Dobson Units (DU)</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold mb-3">Ozone Depleting Substances</h4>
                <div className="space-y-2 text-sm">
                  <p>• <strong>CFCs</strong> (Chlorofluorocarbons): refrigerants, aerosols</p>
                  <p>• <strong>Halons:</strong> fire extinguishers</p>
                  <p>• <strong>Carbon tetrachloride:</strong> industrial solvent</p>
                  <p>• <strong>Mechanism:</strong> CFCl₃ → CFCl₂ + Cl; Cl + O₃ → ClO + O₂</p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold mb-3">Effects of Ozone Depletion</h4>
                <div className="space-y-2 text-sm">
                  <p>• Increased UV-B radiation reaching Earth</p>
                  <p>• Skin cancer and cataracts in humans</p>
                  <p>• Immune system suppression</p>
                  <p>• Damage to marine ecosystems (phytoplankton)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Greenhouse Effect and Global Warming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-3">Greenhouse Gases</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p><strong>CO₂ (60%):</strong> Fossil fuel combustion</p>
                    <p><strong>CH₄ (20%):</strong> Agriculture, livestock</p>
                  </div>
                  <div>
                    <p><strong>CFCs (14%):</strong> Industrial processes</p>
                    <p><strong>N₂O (6%):</strong> Fertilizers, combustion</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold mb-3">Effects of Global Warming</h4>
                <div className="space-y-2 text-sm">
                  <p>• Rising global temperatures</p>
                  <p>• Melting of polar ice caps and glaciers</p>
                  <p>• Sea level rise</p>
                  <p>• Changes in precipitation patterns</p>
                  <p>• Extreme weather events</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Waste Management */}
        <TabsContent value="waste" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Solid Waste Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">3 R's</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <p>• <strong>Reduce:</strong> Minimize waste generation</p>
                    <p>• <strong>Reuse:</strong> Use items multiple times</p>
                    <p>• <strong>Recycle:</strong> Convert waste to new products</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Composting</h4>
                  <p className="text-sm text-blue-800">
                    Biodegradation of organic waste by microorganisms into nutrient-rich compost
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-semibold text-purple-900 mb-2">Landfills</h4>
                  <p className="text-sm text-purple-800">
                    Controlled disposal of waste in designated areas with proper lining
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>E-Waste Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-900 mb-3">
                  Electronic waste contains hazardous materials like lead, mercury, and cadmium.
                </p>
                <div className="space-y-2 text-sm text-red-800">
                  <p>• Proper collection and segregation</p>
                  <p>• Dismantling and recovery of valuable materials</p>
                  <p>• Safe disposal of hazardous components</p>
                  <p>• Recycling of metals and plastics</p>
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
