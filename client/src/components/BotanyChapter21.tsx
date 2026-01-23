
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle2, XCircle, Brain, Lightbulb, TreePine, TrendingUp , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter21() {
  // Fetch questions from database for Biotechnology Principles and Processes (topicId: 85)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '85'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=85');
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
      question: "The interaction between two species where one is benefited and the other is harmed is:",
      options: ["Mutualism", "Parasitism", "Commensalism", "Competition"],
      correctAnswer: "B",
      explanation: "Parasitism is an interaction where one organism (parasite) benefits at the expense of another (host)."
    },
    {
      id: 2,
      question: "The population growth curve that shows carrying capacity is:",
      options: ["J-shaped", "S-shaped (Sigmoid)", "Linear", "Exponential"],
      correctAnswer: "B",
      explanation: "S-shaped or sigmoid growth curve shows logistic growth with carrying capacity (K), where growth slows as population approaches K."
    },
    {
      id: 3,
      question: "Which is NOT an ectoparasite?",
      options: ["Lice", "Ticks", "Tapeworm", "Mosquito"],
      correctAnswer: "C",
      explanation: "Tapeworm is an endoparasite that lives inside the host's intestine. Lice, ticks, and mosquitoes are ectoparasites."
    },
    {
      id: 4,
      question: "The formula for population density is:",
      options: ["N/S", "B+I/D+E", "dN/dt = rN", "Nt = N0e^rt"],
      correctAnswer: "A",
      explanation: "Population density = N/S, where N is population size and S is the area or volume occupied."
    },
    {
      id: 5,
      question: "Allen's Rule states that:",
      options: [
        "Mammals in colder climates have shorter ears",
        "Body size increases with latitude",
        "Organisms maintain constant body temperature",
        "Population grows exponentially"
      ],
      correctAnswer: "A",
      explanation: "Allen's Rule states that mammals in colder climates have shorter ears and limbs to minimize heat loss."
    },
    {
      id: 6,
      question: "Mycorrhizae represent which type of interaction?",
      options: ["Mutualism", "Parasitism", "Commensalism", "Amensalism"],
      correctAnswer: "A",
      explanation: "Mycorrhizae is a mutualistic association between fungi and plant roots where both benefit - fungi get food, plants get water and minerals."
    },
    {
      id: 7,
      question: "The maximum number of individuals that an environment can support is:",
      options: ["Biotic potential", "Carrying capacity", "Population density", "Natality"],
      correctAnswer: "B",
      explanation: "Carrying capacity (K) is the maximum population size that an environment can sustain indefinitely."
    },
    {
      id: 8,
      question: "Brood parasitism is shown by:",
      options: ["Cuckoo bird", "Plasmodium", "Cuscuta", "Orobanche"],
      correctAnswer: "A",
      explanation: "Cuckoo bird lays eggs in the nest of other birds (like crow), which is called brood parasitism."
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
            <Users className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Organisms and Populations</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding organism-environment interactions and population dynamics
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
              <p>Understand organism-environment interactions</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master population characteristics and growth</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn population interactions</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Explore adaptations to environment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="abiotic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="abiotic">Abiotic Factors</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="population">Population</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Abiotic Factors */}
        <TabsContent value="abiotic" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Major Abiotic Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">1. Temperature</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Most important ecological factor</li>
                    <li>• Average temperature: 15°C on land</li>
                    <li>• Affects kinetics of enzymes</li>
                    <li>• Thermal tolerance range varies</li>
                    <li>• <strong>Eurythermal:</strong> Wide temperature tolerance</li>
                    <li>• <strong>Stenothermal:</strong> Narrow temperature tolerance</li>
                  </ul>
                </div>

                <div className="p-6 bg-cyan-50 rounded-lg border-2 border-cyan-200">
                  <h3 className="text-xl font-bold text-cyan-900 mb-3">2. Water</h3>
                  <ul className="text-sm text-cyan-800 space-y-2">
                    <li>• Essential for all life forms</li>
                    <li>• Productivity correlates with rainfall</li>
                    <li>• <strong>Euryhaline:</strong> Wide salinity tolerance</li>
                    <li>• <strong>Stenohaline:</strong> Narrow salinity tolerance</li>
                    <li>• Desert plants have xerophytic adaptations</li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-3">3. Light</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>• Essential for photosynthesis</li>
                    <li>• Affects plant growth and flowering</li>
                    <li>• <strong>Photoperiod:</strong> Day length</li>
                    <li>• UV-B radiation harmful to organisms</li>
                    <li>• Spectral quality affects plants</li>
                  </ul>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">4. Soil</h3>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>• pH affects nutrient availability</li>
                    <li>• Texture determines water holding</li>
                    <li>• Composition varies by location</li>
                    <li>• Climate influences soil formation</li>
                    <li>• Weathering of rocks forms soil</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Responses to Abiotic Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">🔄 Regulate</h4>
                  <p className="text-sm text-orange-800 mb-2">Maintain homeostasis</p>
                  <ul className="text-xs text-orange-700 space-y-1">
                    <li>• Birds and mammals (homeotherms)</li>
                    <li>• Constant body temperature</li>
                    <li>• Energy expensive (99% heat loss)</li>
                    <li>• Example: Humans at 37°C</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">📊 Conform</h4>
                  <p className="text-sm text-amber-800 mb-2">Body changes with environment</p>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li>• Most animals (poikilotherms)</li>
                    <li>• Body temp = environmental temp</li>
                    <li>• Energy efficient</li>
                    <li>• Example: Lizards, fish</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">🏃 Migrate</h4>
                  <p className="text-sm text-red-800 mb-2">Move to favorable area</p>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• Temporary migration</li>
                    <li>• Birds migrate in winter</li>
                    <li>• Siberian cranes to Bharatpur</li>
                    <li>• Return when conditions improve</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">😴 Suspend (Dormancy)</h4>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-white rounded">
                    <p className="font-semibold text-sm mb-1">Hibernation (Winter)</p>
                    <p className="text-xs text-muted-foreground">Bears, some mammals sleep through winter</p>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <p className="font-semibold text-sm mb-1">Aestivation (Summer)</p>
                    <p className="text-xs text-muted-foreground">Snails, fish in hot/dry conditions</p>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <p className="font-semibold text-sm mb-1">Diapause (Insects)</p>
                    <p className="text-xs text-muted-foreground">Suspended development under unfavorable conditions</p>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <p className="font-semibold text-sm mb-1">Seeds/Spores</p>
                    <p className="text-xs text-muted-foreground">Plants survive as dormant structures</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Adaptations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-600">
                  <h4 className="font-semibold text-yellow-900 mb-2">🏔️ Altitude Sickness (High Altitude)</h4>
                  <div className="text-sm text-yellow-800 space-y-1">
                    <p>• Low atmospheric pressure at high altitude</p>
                    <p>• Less oxygen → nausea, fatigue, heart palpitations</p>
                    <p>• <strong>Body's adaptation:</strong> Increased RBC production, breathing rate, heart rate</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">🌵 Desert Adaptations</h4>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    <div>
                      <p className="font-semibold text-sm">Plants (Xerophytes):</p>
                      <ul className="text-xs text-blue-800 space-y-1 mt-1">
                        <li>• Thick cuticle, sunken stomata</li>
                        <li>• CAM photosynthesis</li>
                        <li>• Deep roots (Opuntia)</li>
                        <li>• Leaves modified to spines</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Animals:</p>
                      <ul className="text-xs text-blue-800 space-y-1 mt-1">
                        <li>• Kangaroo rat: no need to drink water</li>
                        <li>• Concentrated urine</li>
                        <li>• Nocturnal behavior</li>
                        <li>• Burrowing during day</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">❄️ Cold Climate Adaptations</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• <strong>Allen's Rule:</strong> Shorter ears and limbs in colder climates</li>
                    <li>• <strong>Bergmann's Rule:</strong> Larger body size in colder regions</li>
                    <li>• Thick fur, subcutaneous fat layer</li>
                    <li>• Example: Polar bears, Arctic fox</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Population Interactions */}
        <TabsContent value="interactions" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Types of Population Interactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-300">
                  <h3 className="text-xl font-bold text-green-900 mb-3">+ / + Mutualism</h3>
                  <p className="text-sm text-green-800 mb-3">Both species benefit</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Lichens</p>
                      <p className="text-xs text-muted-foreground">Algae + Fungi: Algae makes food, fungi provides shelter</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Mycorrhizae</p>
                      <p className="text-xs text-muted-foreground">Fungi + Plant roots: Exchange nutrients</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Plant-Pollinator</p>
                      <p className="text-xs text-muted-foreground">Flower provides nectar, insect pollinates</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-red-50 rounded-lg border-2 border-red-300">
                  <h3 className="text-xl font-bold text-red-900 mb-3">- / - Competition</h3>
                  <p className="text-sm text-red-800 mb-3">Both species are harmed</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Interspecific Competition</p>
                      <p className="text-xs text-muted-foreground">Between different species for same resource</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Competitive Exclusion</p>
                      <p className="text-xs text-muted-foreground">Gause's Principle: No two species can occupy same niche</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Resource Partitioning</p>
                      <p className="text-xs text-muted-foreground">MacArthur's warblers feed at different tree heights</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-300">
                  <h3 className="text-xl font-bold text-orange-900 mb-3">+ / - Predation</h3>
                  <p className="text-sm text-orange-800 mb-3">One benefits, other is harmed</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Prey Defenses</p>
                      <p className="text-xs text-muted-foreground">Camouflage, chemical defense, mimicry</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Monarch Butterfly</p>
                      <p className="text-xs text-muted-foreground">Highly distasteful to predators (feeds on toxic milkweed)</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Mimicry</p>
                      <p className="text-xs text-muted-foreground">Harmless species resembles harmful one</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">+ / - Parasitism</h3>
                  <p className="text-sm text-purple-800 mb-3">Parasite benefits, host is harmed</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Ectoparasites</p>
                      <p className="text-xs text-muted-foreground">Live on host surface: Lice, ticks, leeches</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Endoparasites</p>
                      <p className="text-xs text-muted-foreground">Live inside host: Tapeworm, Plasmodium, roundworm</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Brood Parasitism</p>
                      <p className="text-xs text-muted-foreground">Cuckoo lays eggs in crow's nest</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">+ / 0 Commensalism</h3>
                  <p className="text-sm text-blue-800 mb-3">One benefits, other unaffected</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Orchids on Trees</p>
                      <p className="text-xs text-muted-foreground">Orchid gets support, tree unaffected (epiphyte)</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Cattle Egret & Cattle</p>
                      <p className="text-xs text-muted-foreground">Egret eats insects disturbed by cattle</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Barnacles on Whales</p>
                      <p className="text-xs text-muted-foreground">Get free ride and food, whale unaffected</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">- / 0 Amensalism</h3>
                  <p className="text-sm text-gray-800 mb-3">One is harmed, other unaffected</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Antibiosis</p>
                      <p className="text-xs text-muted-foreground">Penicillium secretes penicillin, kills bacteria</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Allelopathy</p>
                      <p className="text-xs text-muted-foreground">Black walnut releases toxins inhibiting other plants</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Population Characteristics */}
        <TabsContent value="population" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Population Attributes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Population Density (N/S)</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Number of individuals per unit area</li>
                    <li>• N = Population size, S = Area</li>
                    <li>• Measured by quadrat method for plants</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Natality (Birth Rate)</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Number of births per 1000 individuals</li>
                    <li>• Increases population size</li>
                    <li>• Influenced by age structure</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Mortality (Death Rate)</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Number of deaths per 1000 individuals</li>
                    <li>• Decreases population size</li>
                    <li>• Varies with age and conditions</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Age Distribution</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Pre-reproductive (juveniles)</li>
                    <li>• Reproductive (adults)</li>
                    <li>• Post-reproductive (old)</li>
                  </ul>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Population Growth Models</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-600">
                    <h4 className="text-xl font-bold text-green-900 mb-3">Exponential Growth (J-shaped)</h4>
                    <div className="space-y-2 text-sm text-green-800">
                      <p className="font-mono">dN/dt = rN</p>
                      <ul className="ml-4 space-y-1">
                        <li>• Unlimited resources</li>
                        <li>• No environmental resistance</li>
                        <li>• r = intrinsic rate of natural increase</li>
                        <li>• Nt = N0 e^(rt)</li>
                        <li>• Example: Bacteria in culture medium</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-600">
                    <h4 className="text-xl font-bold text-blue-900 mb-3">Logistic Growth (S-shaped/Sigmoid)</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p className="font-mono">dN/dt = rN[(K-N)/K]</p>
                      <ul className="ml-4 space-y-1">
                        <li>• Limited resources</li>
                        <li>• K = Carrying capacity</li>
                        <li>• Growth slows as N approaches K</li>
                        <li>• More realistic model</li>
                        <li>• Example: Natural populations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h5 className="font-semibold text-orange-900 mb-2">Immigration (I)</h5>
                      <p className="text-sm text-orange-800">Individuals entering the population</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h5 className="font-semibold text-red-900 mb-2">Emigration (E)</h5>
                      <p className="text-sm text-red-800">Individuals leaving the population</p>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                    <h5 className="font-semibold text-indigo-900 mb-2">Population Change Formula:</h5>
                    <p className="font-mono text-center text-lg">Nt+1 = Nt + [(B + I) - (D + E)]</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Life History Variations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg border-2 border-pink-200">
                  <h4 className="text-xl font-bold text-pink-900 mb-3">Pacific Salmon Fish</h4>
                  <ul className="text-sm text-pink-800 space-y-2">
                    <li>• Breeds only once in lifetime (semelparous)</li>
                    <li>• Dies after spawning</li>
                    <li>• Produces thousands of eggs</li>
                    <li>• Example of big-bang reproduction</li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200">
                  <h4 className="text-xl font-bold text-amber-900 mb-3">Mammals</h4>
                  <ul className="text-sm text-amber-800 space-y-2">
                    <li>• Breed multiple times (iteroparous)</li>
                    <li>• Produce few offspring</li>
                    <li>• High parental care</li>
                    <li>• Better survival rate of young</li>
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
