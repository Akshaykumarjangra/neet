
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TreePine, CheckCircle2, XCircle, Brain, Lightbulb, Recycle, TrendingUp , Loader2 } from "lucide-react";

export function BotanyChapter22() {
  // Fetch questions from database for Biotechnology and its Applications (topicId: 86)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '86'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=86');
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
      question: "Which of the following is the correct sequence of energy flow in an ecosystem?",
      options: [
        "Producers → Decomposers → Consumers",
        "Producers → Consumers → Decomposers",
        "Decomposers → Producers → Consumers",
        "Consumers → Producers → Decomposers"
      ],
      correctAnswer: 1,
      explanation: "Energy flows from producers (autotrophs) to consumers (herbivores and carnivores) and finally to decomposers, which break down dead organic matter."
    },
    {
      id: 2,
      question: "The percentage of energy transferred from one trophic level to the next is approximately:",
      options: ["1%", "10%", "50%", "90%"],
      correctAnswer: 1,
      explanation: "According to the 10% law (Lindeman's law), only about 10% of energy is transferred from one trophic level to the next. The remaining 90% is lost as heat during respiration and other metabolic processes."
    },
    {
      id: 3,
      question: "Which pyramid can never be inverted in a natural ecosystem?",
      options: [
        "Pyramid of numbers",
        "Pyramid of biomass",
        "Pyramid of energy",
        "All can be inverted"
      ],
      correctAnswer: 2,
      explanation: "The pyramid of energy is always upright and can never be inverted because energy decreases at each trophic level due to the 10% law. Some energy is always lost as heat."
    },
    {
      id: 4,
      question: "The primary productivity of an ecosystem is measured in terms of:",
      options: [
        "Number of organisms",
        "Biomass per unit area per unit time",
        "Energy captured per unit area per unit time",
        "Both B and C"
      ],
      correctAnswer: 3,
      explanation: "Primary productivity can be measured as biomass produced per unit area per unit time or as energy captured per unit area per unit time. Both are valid measurements."
    },
    {
      id: 5,
      question: "Which of the following ecosystems has the highest net primary productivity?",
      options: [
        "Desert",
        "Tropical rainforest",
        "Grassland",
        "Temperate forest"
      ],
      correctAnswer: 1,
      explanation: "Tropical rainforests have the highest net primary productivity among terrestrial ecosystems due to abundant sunlight, high temperature, and high rainfall throughout the year."
    },
    {
      id: 6,
      question: "Detritus food chain begins with:",
      options: [
        "Living plants",
        "Dead organic matter",
        "Herbivores",
        "Carnivores"
      ],
      correctAnswer: 1,
      explanation: "The detritus food chain begins with dead organic matter (detritus) which is consumed by detritivores and decomposers, unlike the grazing food chain which starts with living plants."
    },
    {
      id: 7,
      question: "The nutrient cycling in an ecosystem is also called:",
      options: [
        "Biogeochemical cycling",
        "Energy flow",
        "Food web",
        "Succession"
      ],
      correctAnswer: 0,
      explanation: "Nutrient cycling is called biogeochemical cycling because it involves the movement of nutrients through biotic (living) and abiotic (geological and chemical) components of the ecosystem."
    },
    {
      id: 8,
      question: "In a pond ecosystem, which represents the pioneer community?",
      options: [
        "Phytoplankton",
        "Rooted submerged plants",
        "Rooted floating plants",
        "Marsh plants"
      ],
      correctAnswer: 0,
      explanation: "In aquatic succession (hydrarch succession), phytoplankton are the pioneer species that colonize the water body first, followed by rooted submerged plants, floating plants, and finally marsh vegetation."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <TreePine className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Ecosystem</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding ecosystem structure, function, energy flow, and nutrient cycling
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
              <p>Understand ecosystem structure and components</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master energy flow and ecological pyramids</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn nutrient cycling processes</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Explore ecological succession</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="structure" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="energy">Energy Flow</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="cycles">Nutrient Cycles</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Ecosystem Structure */}
        <TabsContent value="structure" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Ecosystem Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">🌱 Biotic Components</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">1. Producers (Autotrophs)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Manufacture organic food from inorganic substances</li>
                        <li>• Use photosynthesis or chemosynthesis</li>
                        <li>• Examples: Plants, algae, cyanobacteria</li>
                        <li>• Form the base of food chain</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">2. Consumers (Heterotrophs)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• <strong>Primary (Herbivores):</strong> Eat plants (deer, rabbit, insects)</li>
                        <li>• <strong>Secondary (Carnivores):</strong> Eat herbivores (snakes, frogs)</li>
                        <li>• <strong>Tertiary:</strong> Eat other carnivores (hawks, lions)</li>
                        <li>• <strong>Omnivores:</strong> Eat both plants & animals (humans, bears)</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">3. Decomposers</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Break down dead organic matter</li>
                        <li>• Release nutrients back to environment</li>
                        <li>• Examples: Bacteria, fungi</li>
                        <li>• Essential for nutrient recycling</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">🌍 Abiotic Components</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Physical Factors</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Temperature</li>
                        <li>• Light</li>
                        <li>• Water</li>
                        <li>• Soil</li>
                        <li>• Atmosphere</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Inorganic Substances</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Carbon (C)</li>
                        <li>• Nitrogen (N)</li>
                        <li>• Phosphorus (P)</li>
                        <li>• Sulfur (S)</li>
                        <li>• Water (H₂O)</li>
                        <li>• Oxygen (O₂)</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Organic Compounds</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Carbohydrates</li>
                        <li>• Proteins</li>
                        <li>• Lipids</li>
                        <li>• Humus (in soil)</li>
                      </ul>
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
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="text-lg font-bold text-green-900 mb-3">Grazing Food Chain</h4>
                  <p className="text-sm text-green-800 mb-3">Starts with living plants (producers)</p>
                  <div className="p-3 bg-white rounded font-mono text-xs">
                    Grass → Grasshopper → Frog → Snake → Hawk
                  </div>
                  <ul className="text-sm text-green-700 mt-3 space-y-1">
                    <li>• More common in terrestrial ecosystems</li>
                    <li>• Energy from sunlight</li>
                    <li>• Larger biomass at producer level</li>
                  </ul>
                </div>

                <div className="p-6 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                  <h4 className="text-lg font-bold text-amber-900 mb-3">Detritus Food Chain</h4>
                  <p className="text-sm text-amber-800 mb-3">Starts with dead organic matter</p>
                  <div className="p-3 bg-white rounded font-mono text-xs">
                    Dead leaves → Earthworm → Bird → Snake
                  </div>
                  <ul className="text-sm text-amber-700 mt-3 space-y-1">
                    <li>• More common in aquatic ecosystems</li>
                    <li>• Energy from dead organic matter</li>
                    <li>• Decomposers play key role</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                <h4 className="text-lg font-bold text-purple-900 mb-3">Food Web</h4>
                <p className="text-sm text-purple-800 mb-3">
                  Interconnected food chains forming a complex network. More realistic representation of energy flow in nature.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded">
                    <p className="font-semibold text-sm mb-1">Advantages:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• More stable than single food chain</li>
                      <li>• Alternative food sources available</li>
                      <li>• Better energy distribution</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <p className="font-semibold text-sm mb-1">Characteristics:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• One species may occupy multiple trophic levels</li>
                      <li>• Complex interactions</li>
                      <li>• More biodiversity = more stability</li>
                    </ul>
                  </div>
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
                <TrendingUp className="h-6 w-6 text-orange-600" />
                Energy Flow in Ecosystem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-orange-900 mb-4">Lindeman's 10% Law</h3>
                <p className="text-orange-800 mb-4">
                  Only about 10% of energy is transferred from one trophic level to the next. The remaining 90% is lost as heat during respiration, movement, and other metabolic processes.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-40 bg-green-500 p-3 rounded text-white font-bold text-center">
                      Producers<br/>10,000 J
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="w-40 bg-blue-500 p-3 rounded text-white font-bold text-center">
                      Primary<br/>1,000 J
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-48">
                    <span className="text-2xl">→</span>
                    <div className="w-40 bg-purple-500 p-3 rounded text-white font-bold text-center">
                      Secondary<br/>100 J
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="w-40 bg-red-500 p-3 rounded text-white font-bold text-center">
                      Tertiary<br/>10 J
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">Characteristics</h4>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>✓ Unidirectional (one-way flow)</li>
                    <li>✓ Decreases at each level</li>
                    <li>✓ Cannot be recycled</li>
                    <li>✓ Sun is the ultimate source</li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Energy Losses</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Respiration (heat)</li>
                    <li>• Movement & locomotion</li>
                    <li>• Excretion & egestion</li>
                    <li>• Not all biomass consumed</li>
                  </ul>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Implications</h4>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>• Limited food chain length</li>
                    <li>• Fewer top predators</li>
                    <li>• Large producer base needed</li>
                    <li>• Energy efficiency matters</li>
                  </ul>
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
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                  <h4 className="text-lg font-bold text-green-900 mb-3">Pyramid of Numbers</h4>
                  <p className="text-sm text-green-800 mb-3">Number of individuals at each trophic level</p>
                  <div className="space-y-2">
                    <Badge>Upright in Grassland</Badge>
                    <p className="text-xs">Grass (many) → Herbivores (fewer) → Carnivores (fewest)</p>
                    <Badge variant="outline">Inverted in Tree</Badge>
                    <p className="text-xs">1 Tree → Many insects → Few birds</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Pyramid of Biomass</h4>
                  <p className="text-sm text-blue-800 mb-3">Total dry weight at each level</p>
                  <div className="space-y-2">
                    <Badge>Upright in Terrestrial</Badge>
                    <p className="text-xs">Large plant biomass → Smaller animal biomass</p>
                    <Badge variant="outline">Inverted in Aquatic</Badge>
                    <p className="text-xs">Small phytoplankton → Larger zooplankton</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-300">
                  <h4 className="text-lg font-bold text-orange-900 mb-3">Pyramid of Energy</h4>
                  <p className="text-sm text-orange-800 mb-3">Energy flow at each level</p>
                  <div className="space-y-2">
                    <Badge>Always Upright</Badge>
                    <p className="text-xs">Cannot be inverted due to 10% law</p>
                    <p className="text-xs">Energy decreases at each level</p>
                    <p className="text-xs">Most accurate representation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Productivity */}
        <TabsContent value="productivity" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Ecosystem Productivity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Primary Productivity</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Gross Primary Productivity (GPP)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Total rate of photosynthesis</li>
                        <li>• Total organic matter produced</li>
                        <li>• Includes plant's own respiration</li>
                        <li>• Measured in g/m²/year or kcal/m²/year</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Net Primary Productivity (NPP)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• GPP minus plant respiration (R)</li>
                        <li>• <strong>NPP = GPP - R</strong></li>
                        <li>• Available to herbivores</li>
                        <li>• Actually stored as biomass</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">Secondary Productivity</h3>
                  <p className="text-sm text-purple-800 mb-4">
                    Rate of formation of new organic matter by consumers (heterotrophs)
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Depends on:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                        <li>• Primary productivity</li>
                        <li>• Food available</li>
                        <li>• Efficiency of consumers</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Lower than primary productivity</p>
                      <p className="text-xs text-muted-foreground">Due to energy loss at each trophic level</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>Productivity of Different Ecosystems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded">
                      <span className="font-semibold">🌳 Tropical Rainforest</span>
                      <Badge className="bg-green-600">Highest (2200 g/m²/yr)</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded">
                      <span className="font-semibold">🌾 Temperate Forest</span>
                      <Badge className="bg-blue-600">High (1200 g/m²/yr)</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded">
                      <span className="font-semibold">🌊 Ocean</span>
                      <Badge className="bg-cyan-600">Medium (125 g/m²/yr)</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded">
                      <span className="font-semibold">🏜️ Desert</span>
                      <Badge className="bg-orange-600">Low (90 g/m²/yr)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nutrient Cycles */}
        <TabsContent value="cycles" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-6 w-6 text-green-600" />
                Biogeochemical Cycles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">💨 Gaseous Cycles</h3>
                  <p className="text-sm text-blue-800 mb-4">Reservoir in atmosphere or hydrosphere</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Carbon Cycle</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Atmosphere: CO₂ (0.03-0.04%)</li>
                        <li>• Photosynthesis fixes CO₂</li>
                        <li>• Respiration releases CO₂</li>
                        <li>• Decomposition releases CO₂</li>
                        <li>• Fossil fuels store carbon</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-cyan-800 mb-2">Nitrogen Cycle</h4>
                      <ul className="text-sm text-cyan-700 space-y-1">
                        <li>• Atmosphere: N₂ (78%)</li>
                        <li>• <strong>Nitrogen fixation:</strong> N₂ → NH₃ (bacteria)</li>
                        <li>• <strong>Nitrification:</strong> NH₃ → NO₂⁻ → NO₃⁻</li>
                        <li>• <strong>Assimilation:</strong> Plants absorb nitrates</li>
                        <li>• <strong>Denitrification:</strong> NO₃⁻ → N₂ (back to air)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-300">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">🪨 Sedimentary Cycles</h3>
                  <p className="text-sm text-orange-800 mb-4">Reservoir in Earth's crust (rocks/sediments)</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Phosphorus Cycle</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• No atmospheric reservoir</li>
                        <li>• Rocks → Weathering → Soil</li>
                        <li>• Plants absorb phosphate (PO₄³⁻)</li>
                        <li>• Animals get P from food</li>
                        <li>• Decomposition returns P to soil</li>
                        <li>• Slow cycle (millions of years)</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Sulfur Cycle</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Rocks contain sulfur minerals</li>
                        <li>• Plants absorb sulfate (SO₄²⁻)</li>
                        <li>• Decomposition releases H₂S</li>
                        <li>• Bacteria oxidize H₂S → SO₄²⁻</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>Key Microorganisms in Nutrient Cycling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Nitrogen Fixers</h5>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Rhizobium:</strong> In legume root nodules</li>
                        <li>• <strong>Azotobacter:</strong> Free-living in soil</li>
                        <li>• <strong>Cyanobacteria:</strong> Aquatic environments</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Nitrifying Bacteria</h5>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Nitrosomonas:</strong> NH₃ → NO₂⁻</li>
                        <li>• <strong>Nitrobacter:</strong> NO₂⁻ → NO₃⁻</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Denitrifying Bacteria</h5>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Pseudomonas:</strong> NO₃⁻ → N₂</li>
                        <li>• <strong>Thiobacillus:</strong> Anaerobic conditions</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Decomposers</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Bacteria and fungi</li>
                        <li>• Break down organic matter</li>
                        <li>• Release nutrients</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Ecological Succession</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                <h4 className="text-lg font-bold text-purple-900 mb-3">What is Succession?</h4>
                <p className="text-sm text-purple-800">
                  Gradual and sequential change in species composition of a community over time, leading to a stable climax community.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">Primary Succession</h4>
                  <p className="text-sm text-green-800 mb-3">On bare rock/lifeless area</p>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-white rounded">1. Pioneer species: Lichens</div>
                    <div className="p-2 bg-white rounded">2. Mosses</div>
                    <div className="p-2 bg-white rounded">3. Grasses & herbs</div>
                    <div className="p-2 bg-white rounded">4. Shrubs</div>
                    <div className="p-2 bg-white rounded">5. Trees (Climax forest)</div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Secondary Succession</h4>
                  <p className="text-sm text-blue-800 mb-3">On previously inhabited area (after fire, flood)</p>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-white rounded">1. Grasses (fast)</div>
                    <div className="p-2 bg-white rounded">2. Herbs & shrubs</div>
                    <div className="p-2 bg-white rounded">3. Pioneer trees</div>
                    <div className="p-2 bg-white rounded">4. Climax community</div>
                    <p className="text-xs text-blue-700 mt-2">⚡ Faster than primary succession</p>
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
