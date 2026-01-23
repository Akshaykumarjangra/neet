
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TreePine, CheckCircle2, XCircle, Brain, Droplet, Wind } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter32() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which ecosystem service involves purification of air and water?",
      options: ["Provisioning", "Regulating", "Cultural", "Supporting"],
      correctAnswer: "B",
      explanation: "Regulating services include air and water purification, climate regulation, disease control, and pollination - services that regulate environmental conditions."
    },
    {
      id: 2,
      question: "Gross Primary Productivity (GPP) is:",
      options: [
        "Rate of biomass production after respiration",
        "Total rate of photosynthesis",
        "Energy available to consumers",
        "Net energy stored in biomass"
      ],
      correctAnswer: "B",
      explanation: "GPP is the total rate of photosynthesis or total organic matter produced by plants, before any is used in respiration."
    },
    {
      id: 3,
      question: "The relationship GPP - R = NPP represents:",
      options: [
        "Gross Primary Productivity minus Respiration equals Net Primary Productivity",
        "Growth rate minus Respiration equals Nutrient Production",
        "Total production minus Recycling equals Net Production",
        "Green Production minus Resources equals New Production"
      ],
      correctAnswer: "A",
      explanation: "NPP (Net Primary Productivity) is the energy left after plants use some through respiration. It's the actual biomass stored and available to herbivores."
    },
    {
      id: 4,
      question: "Which of the following is a provisioning ecosystem service?",
      options: ["Pollination", "Climate regulation", "Food production", "Soil formation"],
      correctAnswer: "C",
      explanation: "Provisioning services are products obtained from ecosystems like food, fresh water, fuel, fiber, and medicinal resources."
    },
    {
      id: 5,
      question: "Carbon sequestration by forests is an example of:",
      options: ["Provisioning service", "Regulating service", "Cultural service", "Disservice"],
      correctAnswer: "B",
      explanation: "Carbon sequestration is a regulating service where forests absorb and store CO2, helping regulate atmospheric composition and climate."
    },
    {
      id: 6,
      question: "The 10% law of energy transfer states that:",
      options: [
        "Only 10% of energy is transferred to the next trophic level",
        "10% of organisms survive to reproduce",
        "10% of nutrients are recycled",
        "10% of biomass is consumed"
      ],
      correctAnswer: "A",
      explanation: "Lindeman's 10% law states that when energy is transferred from one trophic level to the next, only about 10% is stored as biomass; the rest is lost as heat through respiration."
    },
    {
      id: 7,
      question: "Which ecosystem typically has the highest Net Primary Productivity?",
      options: ["Desert", "Tropical rainforest", "Temperate grassland", "Tundra"],
      correctAnswer: "B",
      explanation: "Tropical rainforests have the highest NPP (2200 g/m²/year) due to high temperature, abundant rainfall, and year-round growing conditions."
    },
    {
      id: 8,
      question: "Aesthetic and recreational values of ecosystems are:",
      options: ["Provisioning services", "Regulating services", "Cultural services", "Supporting services"],
      correctAnswer: "C",
      explanation: "Cultural services are non-material benefits including recreation, spiritual values, aesthetic appreciation, and educational opportunities."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <TreePine className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Ecosystem Services and Functions</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding the benefits ecosystems provide to humanity
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
              <p>Understand types of ecosystem services</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn about primary productivity</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master energy flow in ecosystems</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Explore ecosystem valuation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Ecosystem Services</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="energy">Energy Flow</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Ecosystem Services */}
        <TabsContent value="services" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Classification of Ecosystem Services (MEA 2005)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">1. Provisioning Services</h3>
                  <p className="text-sm text-blue-800 mb-3">Products obtained from ecosystems</p>
                  
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Food</p>
                      <p className="text-xs mt-1">Crops, livestock, fisheries, wild foods</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Fresh Water</p>
                      <p className="text-xs mt-1">Drinking water, irrigation</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Fiber & Fuel</p>
                      <p className="text-xs mt-1">Timber, cotton, biomass fuels</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Biochemicals</p>
                      <p className="text-xs mt-1">Medicines, natural compounds</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">2. Regulating Services</h3>
                  <p className="text-sm text-green-800 mb-3">Benefits from ecosystem processes</p>
                  
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Climate Regulation</p>
                      <p className="text-xs mt-1">Carbon sequestration, temperature control</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Water Purification</p>
                      <p className="text-xs mt-1">Wetlands filter pollutants</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Pollination</p>
                      <p className="text-xs mt-1">Bees, butterflies, birds</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Disease Control</p>
                      <p className="text-xs mt-1">Regulation of pests and pathogens</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">3. Cultural Services</h3>
                  <p className="text-sm text-purple-800 mb-3">Non-material benefits</p>
                  
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Aesthetic Values</p>
                      <p className="text-xs mt-1">Natural beauty, scenic landscapes</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Recreation & Tourism</p>
                      <p className="text-xs mt-1">National parks, eco-tourism</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Spiritual & Religious</p>
                      <p className="text-xs mt-1">Sacred groves, pilgrimage sites</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Educational</p>
                      <p className="text-xs mt-1">Research, knowledge systems</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">4. Supporting Services</h3>
                  <p className="text-sm text-amber-800 mb-3">Services necessary for all others</p>
                  
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Soil Formation</p>
                      <p className="text-xs mt-1">Weathering, organic matter decomposition</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Nutrient Cycling</p>
                      <p className="text-xs mt-1">Carbon, nitrogen, phosphorus cycles</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Primary Production</p>
                      <p className="text-xs mt-1">Photosynthesis, biomass creation</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Habitat Provision</p>
                      <p className="text-xs mt-1">Living space for species</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-6 w-6 text-cyan-600" />
                    Examples of Ecosystem Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-cyan-900 mb-2">Forests</h4>
                      <ul className="text-xs text-cyan-800 space-y-1">
                        <li>• Timber and fuelwood</li>
                        <li>• Carbon sequestration</li>
                        <li>• Watershed protection</li>
                        <li>• Biodiversity habitat</li>
                        <li>• Recreation and tourism</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-900 mb-2">Wetlands</h4>
                      <ul className="text-xs text-indigo-800 space-y-1">
                        <li>• Water purification</li>
                        <li>• Flood control</li>
                        <li>• Fish breeding grounds</li>
                        <li>• Bird habitat</li>
                        <li>• Nutrient retention</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <h4 className="font-semibold text-teal-900 mb-2">Grasslands</h4>
                      <ul className="text-xs text-teal-800 space-y-1">
                        <li>• Livestock grazing</li>
                        <li>• Soil conservation</li>
                        <li>• Carbon storage</li>
                        <li>• Wildlife habitat</li>
                        <li>• Pollinator support</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Productivity */}
        <TabsContent value="productivity" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Primary Productivity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Key Concepts</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded">
                    <h4 className="font-semibold text-green-900 mb-2">Gross Primary Productivity (GPP)</h4>
                    <p className="text-sm text-green-800">
                      Total rate of photosynthesis or organic matter production by plants (including what they use in respiration)
                    </p>
                    <p className="text-xs mt-2 font-mono">GPP = Total organic matter produced</p>
                  </div>

                  <div className="p-4 bg-white rounded">
                    <h4 className="font-semibold text-green-900 mb-2">Net Primary Productivity (NPP)</h4>
                    <p className="text-sm text-green-800">
                      Rate of biomass accumulation after plants use some energy for respiration
                    </p>
                    <p className="text-xs mt-2 font-mono bg-green-100 p-2 rounded">NPP = GPP - R (Respiration)</p>
                    <p className="text-xs mt-2 text-green-700">This is the energy available to herbivores</p>
                  </div>

                  <div className="p-4 bg-white rounded">
                    <h4 className="font-semibold text-green-900 mb-2">Secondary Productivity</h4>
                    <p className="text-sm text-green-800">
                      Rate of biomass production by consumers (herbivores, carnivores)
                    </p>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>NPP of Different Ecosystems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded">
                      <span>Ecosystem Type</span>
                      <span>NPP (g/m²/year)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-green-50 rounded">
                      <span className="text-sm">Tropical Rainforest</span>
                      <span className="text-sm font-semibold text-green-700">2200</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-blue-50 rounded">
                      <span className="text-sm">Temperate Forest</span>
                      <span className="text-sm font-semibold text-blue-700">1200</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-emerald-50 rounded">
                      <span className="text-sm">Savanna</span>
                      <span className="text-sm font-semibold text-emerald-700">900</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-teal-50 rounded">
                      <span className="text-sm">Temperate Grassland</span>
                      <span className="text-sm font-semibold text-teal-700">600</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-cyan-50 rounded">
                      <span className="text-sm">Lakes and Streams</span>
                      <span className="text-sm font-semibold text-cyan-700">500</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-amber-50 rounded">
                      <span className="text-sm">Desert and Semi-arid</span>
                      <span className="text-sm font-semibold text-amber-700">90</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 rounded">
                      <span className="text-sm">Tundra and Alpine</span>
                      <span className="text-sm font-semibold text-slate-700">140</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-xs text-blue-900">
                      <strong>Note:</strong> Tropical rainforests have highest NPP due to favorable temperature, 
                      abundant rainfall, and year-round growing season.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Factors Affecting Primary Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-3">Climatic Factors</h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• <strong>Light:</strong> Intensity and duration</li>
                        <li>• <strong>Temperature:</strong> Affects enzyme activity</li>
                        <li>• <strong>Water:</strong> Essential for photosynthesis</li>
                        <li>• <strong>CO₂:</strong> Raw material for photosynthesis</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg">
                      <h4 className="font-semibold text-rose-900 mb-3">Edaphic Factors</h4>
                      <ul className="text-sm text-rose-800 space-y-1">
                        <li>• <strong>Nutrients:</strong> N, P, K availability</li>
                        <li>• <strong>Soil pH:</strong> Affects nutrient uptake</li>
                        <li>• <strong>Soil texture:</strong> Water retention</li>
                        <li>• <strong>Soil organisms:</strong> Decomposition</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Energy Flow */}
        <TabsContent value="energy" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-6 w-6 text-orange-600" />
                Energy Flow in Ecosystems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-900 mb-4">Lindeman's 10% Law</h3>
                <p className="text-sm text-orange-800 mb-4">
                  Only about 10% of energy is transferred from one trophic level to the next. 
                  The remaining 90% is lost as heat during respiration and other metabolic processes.
                </p>
                
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded border-l-4 border-green-500">
                    <p className="text-sm font-semibold">Producers (1000 units)</p>
                    <p className="text-xs text-gray-600">Capture solar energy through photosynthesis</p>
                  </div>
                  <div className="flex items-center justify-center text-orange-600">↓ 10%</div>
                  <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                    <p className="text-sm font-semibold">Primary Consumers (100 units)</p>
                    <p className="text-xs text-gray-600">Herbivores</p>
                  </div>
                  <div className="flex items-center justify-center text-orange-600">↓ 10%</div>
                  <div className="p-3 bg-white rounded border-l-4 border-purple-500">
                    <p className="text-sm font-semibold">Secondary Consumers (10 units)</p>
                    <p className="text-xs text-gray-600">Carnivores</p>
                  </div>
                  <div className="flex items-center justify-center text-orange-600">↓ 10%</div>
                  <div className="p-3 bg-white rounded border-l-4 border-red-500">
                    <p className="text-sm font-semibold">Tertiary Consumers (1 unit)</p>
                    <p className="text-xs text-gray-600">Top carnivores</p>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Energy Loss Mechanisms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">Respiration</h4>
                      <p className="text-sm text-red-800">
                        Largest energy loss - used for metabolism, movement, maintaining body temperature
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-2">Undigested Material</h4>
                      <p className="text-sm text-amber-800">
                        Not all consumed food is digested and absorbed (feces, egestion)
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Unconsumed Parts</h4>
                      <p className="text-sm text-yellow-800">
                        Roots, bones, shells not consumed by herbivores/carnivores
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Ecological Pyramids</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">1. Pyramid of Energy</h4>
                    <p className="text-sm text-green-800 mb-2">
                      Always upright - shows energy flow through trophic levels
                    </p>
                    <p className="text-xs text-green-700">
                      Example: Grassland (producers: 10,000 → herbivores: 1,000 → carnivores: 100 kcal/m²/year)
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">2. Pyramid of Biomass</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      Usually upright on land, can be inverted in aquatic ecosystems
                    </p>
                    <p className="text-xs text-blue-700">
                      Inverted example: Ocean (phytoplankton have lower biomass but high turnover rate)
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3">3. Pyramid of Numbers</h4>
                    <p className="text-sm text-purple-800 mb-2">
                      Can be upright, inverted, or spindle-shaped
                    </p>
                    <p className="text-xs text-purple-700">
                      Inverted example: Tree (1) → insects (1000) → birds (10)
                    </p>
                  </div>
                </CardContent>
              </Card>
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
