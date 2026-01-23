
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trees, CheckCircle2, XCircle, Brain, Recycle, Sun } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter27() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What percentage of energy is transferred from one trophic level to the next?",
      options: ["1%", "10%", "50%", "90%"],
      correctAnswer: "B",
      explanation: "According to the 10% law of energy transfer, only about 10% of energy is transferred from one trophic level to the next. The rest is lost as heat."
    },
    {
      id: 2,
      question: "Primary productivity is the rate of production of:",
      options: [
        "Organic matter by consumers",
        "Organic matter by producers",
        "Energy by decomposers",
        "Nutrients by bacteria"
      ],
      correctAnswer: "B",
      explanation: "Primary productivity is the rate at which producers (autotrophs) produce organic matter through photosynthesis or chemosynthesis."
    },
    {
      id: 3,
      question: "The reservoir of phosphorus in the phosphorus cycle is:",
      options: ["Atmosphere", "Rocks and sediments", "Ocean water", "Living organisms"],
      correctAnswer: "B",
      explanation: "Unlike carbon and nitrogen, phosphorus does not have an atmospheric reservoir. Its main reservoir is rocks and sediments."
    },
    {
      id: 4,
      question: "Decomposition is slowest in:",
      options: [
        "Warm and moist conditions",
        "Cold and dry conditions",
        "Tropical rainforests",
        "Grasslands"
      ],
      correctAnswer: "B",
      explanation: "Decomposition requires warmth and moisture. It is slowest in cold and dry conditions where microbial activity is minimal."
    },
    {
      id: 5,
      question: "Which of the following is a gaseous cycle?",
      options: ["Phosphorus cycle", "Sulfur cycle", "Nitrogen cycle", "Both B and C"],
      correctAnswer: "D",
      explanation: "Both sulfur and nitrogen cycles are gaseous cycles with significant atmospheric reservoirs. Phosphorus cycle is sedimentary."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Trees className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Ecosystem</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding ecosystem structure, energy flow, and nutrient cycling
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
              <p>Understand ecosystem components and structure</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn about energy flow and food chains</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Study nutrient cycling in ecosystems</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Explore ecological pyramids and productivity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="structure" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="energy">Energy Flow</TabsTrigger>
          <TabsTrigger value="cycles">Nutrient Cycles</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Ecosystem Structure */}
        <TabsContent value="structure" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Components of Ecosystem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Abiotic Components</h3>
                  <div className="space-y-3 text-sm text-blue-800">
                    <div>
                      <p className="font-semibold">Physical Factors:</p>
                      <p>• Temperature, light, water, soil</p>
                    </div>
                    <div>
                      <p className="font-semibold">Inorganic Substances:</p>
                      <p>• Carbon, nitrogen, oxygen, phosphorus</p>
                    </div>
                    <div>
                      <p className="font-semibold">Organic Compounds:</p>
                      <p>• Proteins, carbohydrates, lipids, humic substances</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Biotic Components</h3>
                  <div className="space-y-3 text-sm text-green-800">
                    <div>
                      <p className="font-semibold">Producers (Autotrophs):</p>
                      <p>• Plants, algae, photosynthetic bacteria</p>
                    </div>
                    <div>
                      <p className="font-semibold">Consumers (Heterotrophs):</p>
                      <p>• Herbivores, carnivores, omnivores</p>
                    </div>
                    <div>
                      <p className="font-semibold">Decomposers (Saprotrophs):</p>
                      <p>• Bacteria, fungi, detritivores</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Food Chains and Food Webs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Types of Food Chains</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-white rounded border border-amber-200">
                    <p className="font-semibold text-amber-900 mb-2">Grazing Food Chain</p>
                    <p className="text-amber-800">Grass → Grasshopper → Frog → Snake → Hawk</p>
                    <p className="text-amber-700 mt-2">Starts with producers (living plant material)</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-amber-200">
                    <p className="font-semibold text-amber-900 mb-2">Detritus Food Chain</p>
                    <p className="text-amber-800">Dead organic matter → Detritivores → Carnivores</p>
                    <p className="text-amber-700 mt-2">Starts with dead organic matter</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Trophic Levels</h4>
                <div className="space-y-2 text-sm text-purple-800">
                  <p>• T₁: Producers (1st trophic level)</p>
                  <p>• T₂: Primary consumers/Herbivores (2nd trophic level)</p>
                  <p>• T₃: Secondary consumers/Primary carnivores (3rd trophic level)</p>
                  <p>• T₄: Tertiary consumers/Secondary carnivores (4th trophic level)</p>
                  <p>• T₅: Top carnivores (5th trophic level)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Energy Flow */}
        <TabsContent value="energy" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-6 w-6" />
                Energy Flow in Ecosystem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-900 mb-4">10% Law (Lindeman's Law)</h3>
                <div className="space-y-3 text-sm text-yellow-800">
                  <p className="font-semibold">Only 10% of energy is transferred from one trophic level to the next</p>
                  <div className="p-3 bg-white rounded border border-yellow-200 space-y-1">
                    <p>• Producers: 10,000 kcal (100%)</p>
                    <p>• Primary consumers: 1,000 kcal (10%)</p>
                    <p>• Secondary consumers: 100 kcal (1%)</p>
                    <p>• Tertiary consumers: 10 kcal (0.1%)</p>
                  </div>
                  <p className="text-yellow-700 mt-2">Remaining 90% is lost as heat, respiration, and undigested material</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Primary Productivity</h4>
                  <div className="text-sm text-green-800 space-y-2">
                    <p><strong>GPP (Gross Primary Productivity):</strong></p>
                    <p>• Total organic matter produced by photosynthesis</p>
                    <p className="mt-2"><strong>NPP (Net Primary Productivity):</strong></p>
                    <p>• GPP - Respiration losses</p>
                    <p>• Available to herbivores</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Secondary Productivity</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>• Rate of organic matter formation by consumers</p>
                    <p>• Depends on primary productivity</p>
                    <p>• Lower than primary productivity</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Ecological Pyramids</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Pyramid of Numbers</h4>
                  <p className="text-sm text-red-800">Number of organisms at each trophic level</p>
                  <p className="text-sm text-red-700 mt-2">Can be upright, inverted, or spindle-shaped</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Pyramid of Biomass</h4>
                  <p className="text-sm text-orange-800">Total dry weight of organisms at each level</p>
                  <p className="text-sm text-orange-700 mt-2">Usually upright (can be inverted in aquatic)</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Pyramid of Energy</h4>
                  <p className="text-sm text-yellow-800">Energy content at each trophic level</p>
                  <p className="text-sm text-yellow-700 mt-2">Always upright</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nutrient Cycles */}
        <TabsContent value="cycles" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-6 w-6" />
                Biogeochemical Cycles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Carbon Cycle</h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <div>
                    <p className="font-semibold">Carbon Fixation:</p>
                    <p>• Photosynthesis: CO₂ → Organic compounds</p>
                    <p>• Chemosynthesis by bacteria</p>
                  </div>
                  <div>
                    <p className="font-semibold">Carbon Release:</p>
                    <p>• Respiration by all organisms</p>
                    <p>• Decomposition of organic matter</p>
                    <p>• Combustion of fossil fuels</p>
                  </div>
                  <div>
                    <p className="font-semibold">Reservoirs:</p>
                    <p>• Atmosphere (CO₂), oceans, rocks, fossil fuels</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Nitrogen Cycle</h3>
                <div className="space-y-3 text-sm text-green-800">
                  <div>
                    <p className="font-semibold">Nitrogen Fixation:</p>
                    <p>• Biological: Rhizobium, Azotobacter, Cyanobacteria</p>
                    <p>• Physical: Lightning, industrial processes</p>
                  </div>
                  <div>
                    <p className="font-semibold">Ammonification:</p>
                    <p>• Decomposition of organic nitrogen → NH₃</p>
                  </div>
                  <div>
                    <p className="font-semibold">Nitrification:</p>
                    <p>• NH₃ → NO₂⁻ (Nitrosomonas)</p>
                    <p>• NO₂⁻ → NO₃⁻ (Nitrobacter)</p>
                  </div>
                  <div>
                    <p className="font-semibold">Denitrification:</p>
                    <p>• NO₃⁻ → N₂ (Pseudomonas, Thiobacillus)</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Phosphorus Cycle</h3>
                <div className="space-y-3 text-sm text-purple-800">
                  <p>• No atmospheric phase (sedimentary cycle)</p>
                  <p>• Reservoir: Rocks and sediments</p>
                  <p>• Weathering releases phosphate (PO₄³⁻)</p>
                  <p>• Absorbed by plants from soil</p>
                  <p>• Passed through food chain</p>
                  <p>• Returns to soil through decomposition</p>
                  <p>• Eventually returns to sediments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Decomposition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Steps of Decomposition</h4>
                <div className="space-y-2 text-sm text-amber-800">
                  <p><strong>1. Fragmentation:</strong> Breaking down of detritus into smaller particles</p>
                  <p><strong>2. Leaching:</strong> Water-soluble nutrients percolate into soil</p>
                  <p><strong>3. Catabolism:</strong> Enzymatic degradation by bacteria and fungi</p>
                  <p><strong>4. Humification:</strong> Formation of dark-colored humus</p>
                  <p><strong>5. Mineralization:</strong> Humus degradation releasing inorganic nutrients</p>
                </div>
              </div>

              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <h4 className="font-semibold text-teal-900 mb-2">Factors Affecting Decomposition</h4>
                <div className="text-sm text-teal-800 space-y-1">
                  <p>• Temperature: Higher temperature increases rate</p>
                  <p>• Moisture: Adequate water is essential</p>
                  <p>• Oxygen: Aerobic decomposition is faster</p>
                  <p>• Chemical composition: High lignin/chitin slows decomposition</p>
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
                  <h3 className="font-semibold text-lg">Q{index + 1}. {q.question}</h3>
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
