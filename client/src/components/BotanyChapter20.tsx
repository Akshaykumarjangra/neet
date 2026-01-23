import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, CheckCircle2, XCircle, Brain, Lightbulb, TreePine, AlertTriangle , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter20() {
  // Fetch questions from database for Microbes in Human Welfare (topicId: 84)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '84'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=84');
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
      question: "Which country has the maximum biodiversity?",
      options: ["India", "Brazil", "China", "USA"],
      correctAnswer: "B",
      explanation: "Brazil has the maximum biodiversity in the world due to the Amazon rainforest, which hosts about 20% of the world's species."
    },
    {
      id: 2,
      question: "The term 'biodiversity' was coined by:",
      options: ["E.O. Wilson", "Walter G. Rosen", "Norman Myers", "Robert May"],
      correctAnswer: "B",
      explanation: "Walter G. Rosen coined the term 'biodiversity' in 1985, though it was popularized by E.O. Wilson."
    },
    {
      id: 3,
      question: "Which is NOT a megadiverse country?",
      options: ["India", "Brazil", "Australia", "Canada"],
      correctAnswer: "D",
      explanation: "Canada is not among the 17 megadiverse countries. India, Brazil, and Australia are megadiverse nations."
    },
    {
      id: 4,
      question: "Biodiversity hotspots cover what percentage of Earth's land surface?",
      options: ["25%", "15%", "2%", "10%"],
      correctAnswer: "C",
      explanation: "Biodiversity hotspots cover less than 2% of Earth's land surface but contain more than 50% of the world's plant species."
    },
    {
      id: 5,
      question: "Ex-situ conservation includes:",
      options: ["National parks", "Biosphere reserves", "Seed banks", "Wildlife sanctuaries"],
      correctAnswer: "C",
      explanation: "Ex-situ conservation means conservation outside natural habitats. Seed banks, botanical gardens, and zoos are examples."
    },
    {
      id: 6,
      question: "The 'Evil Quartet' causing biodiversity loss includes all EXCEPT:",
      options: ["Habitat loss", "Over-exploitation", "Climate change", "Alien species invasion"],
      correctAnswer: "C",
      explanation: "The Evil Quartet includes: habitat loss, over-exploitation, alien species invasion, and co-extinction. Climate change is a separate major threat."
    },
    {
      id: 7,
      question: "IUCN Red List categorizes species based on:",
      options: ["Economic value", "Extinction risk", "Population size", "Distribution area"],
      correctAnswer: "B",
      explanation: "The IUCN Red List categorizes species based on their extinction risk: Extinct, Endangered, Vulnerable, Near Threatened, Least Concern."
    },
    {
      id: 8,
      question: "India has how many biodiversity hotspots?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "C",
      explanation: "India has 4 biodiversity hotspots: Western Ghats, Eastern Himalayas, Indo-Burma region, and Sundaland (Nicobar Islands)."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Biodiversity and Conservation</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding Earth's biological diversity and strategies for its conservation
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
              <p>Understand types and levels of biodiversity</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn about biodiversity patterns and hotspots</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master causes of biodiversity loss</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Explore conservation strategies</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="types" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="types">Types</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Types of Biodiversity */}
        <TabsContent value="types" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Levels of Biodiversity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-3">1. Genetic Diversity</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>• Variation in genes within species</li>
                    <li>• Example: Different varieties of rice</li>
                    <li>• Enables adaptation to environment</li>
                    <li>• Base for evolution</li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">2. Species Diversity</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Variety of species in an area</li>
                    <li>• Measured by species richness</li>
                    <li>• Most commonly studied level</li>
                    <li>• Example: Amazon rainforest</li>
                  </ul>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">3. Ecological Diversity</h3>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>• Variety of ecosystems</li>
                    <li>• Different habitats and communities</li>
                    <li>• Example: Forests, grasslands, wetlands</li>
                    <li>• Includes ecosystem processes</li>
                  </ul>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Global Biodiversity Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Total described species</span>
                        <Badge variant="secondary">~1.7 million</Badge>
                      </div>
                      <Progress value={17} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Estimated 10-100 million total species exist</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-100 rounded">
                        <p className="font-semibold text-green-900">Plants: ~320,000 species</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded">
                        <p className="font-semibold text-blue-900">Animals: ~7.8 million species</p>
                      </div>
                      <div className="p-3 bg-amber-100 rounded">
                        <p className="font-semibold text-amber-900">Insects: ~1 million described</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded">
                        <p className="font-semibold text-purple-900">Fungi: ~150,000 species</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Importance of Biodiversity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">🌾 Economic Value</h4>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    <li>• Food, medicines, timber</li>
                    <li>• Industrial products</li>
                    <li>• Tourism and recreation</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <h4 className="font-semibold text-cyan-900 mb-2">🌍 Ecological Services</h4>
                  <ul className="text-sm text-cyan-800 space-y-1">
                    <li>• Oxygen production</li>
                    <li>• Climate regulation</li>
                    <li>• Nutrient cycling</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">🧬 Scientific Value</h4>
                  <ul className="text-sm text-indigo-800 space-y-1">
                    <li>• Understanding evolution</li>
                    <li>• Genetic resources</li>
                    <li>• Biomedical research</li>
                  </ul>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <h4 className="font-semibold text-rose-900 mb-2">🎨 Aesthetic Value</h4>
                  <ul className="text-sm text-rose-800 space-y-1">
                    <li>• Cultural significance</li>
                    <li>• Spiritual values</li>
                    <li>• Recreation and inspiration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patterns and Hotspots */}
        <TabsContent value="patterns" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Biodiversity Distribution Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-green-900 mb-4">Latitudinal Gradient</h3>
                <div className="space-y-2 text-sm text-green-800">
                  <p>• <strong>Pattern:</strong> Biodiversity increases from poles to equator</p>
                  <p>• <strong>Reasons:</strong></p>
                  <ul className="ml-6 space-y-1">
                    <li>- More solar energy in tropics</li>
                    <li>- Stable climate over evolutionary time</li>
                    <li>- Greater habitat diversity</li>
                  </ul>
                  <p className="mt-3 font-semibold">Example: Colombia has more bird species than all of North America!</p>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Species-Area Relationship</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p className="font-mono">log S = log C + Z log A</p>
                  <ul className="ml-4 space-y-1 mt-2">
                    <li>• S = Species richness</li>
                    <li>• A = Area</li>
                    <li>• Z = Regression coefficient (0.1 to 0.2)</li>
                    <li>• C = Y-intercept constant</li>
                  </ul>
                  <p className="mt-3"><strong>On a log scale, the relationship is linear</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="h-6 w-6 text-red-600" />
                Biodiversity Hotspots
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Criteria for Hotspots (Norman Myers):</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>1. Must have ≥1,500 endemic vascular plant species</li>
                  <li>2. Must have lost ≥70% of original habitat</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Global Statistics</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Total: 36 biodiversity hotspots</li>
                    <li>• Cover: &lt;2% of Earth's land</li>
                    <li>• Contain: {'>'}50% of plant species</li>
                    <li>• Support: 43% of vertebrates</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">India's Hotspots</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>1. Western Ghats and Sri Lanka</li>
                    <li>2. Indo-Burma (Northeast India)</li>
                    <li>3. Himalayas (Eastern Himalayas)</li>
                    <li>4. Sundaland (Nicobar Islands)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Megadiverse Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  "Brazil", "Colombia", "China", "Indonesia", "Mexico",
                  "South Africa", "India", "Australia", "Madagascar",
                  "Peru", "Malaysia", "Philippines", "Ecuador",
                  "Venezuela", "Democratic Republic of Congo", "USA", "Papua New Guinea"
                ].map((country, idx) => (
                  <div key={idx} className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg text-center font-semibold text-green-900">
                    {country}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                These 17 countries harbor 70% of Earth's biodiversity
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threats and Conservation */}
        <TabsContent value="threats" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                The Evil Quartet - Major Threats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                  <h3 className="text-xl font-bold text-red-900 mb-3">1. Habitat Loss & Fragmentation</h3>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li>• <strong>Main cause</strong> of biodiversity loss</li>
                    <li>• Tropical rainforests most affected</li>
                    <li>• Amazon: Size of 14 football fields lost per minute</li>
                    <li>• Results in smaller, isolated populations</li>
                  </ul>
                </div>

                <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <h3 className="text-xl font-bold text-orange-900 mb-3">2. Over-exploitation</h3>
                  <ul className="text-sm text-orange-800 space-y-2">
                    <li>• Excessive hunting and harvesting</li>
                    <li>• Example: Steller's sea cow (extinct 1768)</li>
                    <li>• Passenger pigeon: Millions → Extinct (1914)</li>
                    <li>• Illegal wildlife trade worth billions</li>
                  </ul>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">3. Alien Species Invasion</h3>
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>• Introduced species outcompete natives</li>
                    <li>• Example: Nile perch in Lake Victoria</li>
                    <li>• Water hyacinth clogging water bodies</li>
                    <li>• No natural predators in new habitat</li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">4. Co-extinction</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Extinction of one species causes another</li>
                    <li>• Host-specific parasites lose habitat</li>
                    <li>• Example: Plant extinction → pollinator loss</li>
                    <li>• Breaks ecological relationships</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Conservation Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-300">
                  <h3 className="text-xl font-bold text-green-900 mb-4">In-situ Conservation</h3>
                  <p className="text-sm text-green-800 mb-3">Conservation in natural habitats</p>

                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold mb-1">National Parks</h4>
                      <p className="text-xs text-muted-foreground">Complete protection, no human activities</p>
                      <p className="text-xs mt-1">Example: Jim Corbett (India's first)</p>
                    </div>

                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold mb-1">Wildlife Sanctuaries</h4>
                      <p className="text-xs text-muted-foreground">Limited human activities allowed</p>
                      <p className="text-xs mt-1">Example: Bharatpur Bird Sanctuary</p>
                    </div>

                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold mb-1">Biosphere Reserves</h4>
                      <p className="text-xs text-muted-foreground">Multi-use areas with core, buffer, transition zones</p>
                      <p className="text-xs mt-1">Example: Nilgiri Biosphere Reserve</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Ex-situ Conservation</h3>
                  <p className="text-sm text-blue-800 mb-3">Conservation outside natural habitats</p>

                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold mb-1">Seed Banks</h4>
                      <p className="text-xs text-muted-foreground">Preserve plant genetic diversity</p>
                      <p className="text-xs mt-1">Example: Svalbard Global Seed Vault</p>
                    </div>

                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold mb-1">Botanical Gardens</h4>
                      <p className="text-xs text-muted-foreground">Living plant collections</p>
                      <p className="text-xs mt-1">Example: Indian Botanical Garden, Kolkata</p>
                    </div>

                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold mb-1">Zoos & Aquaria</h4>
                      <p className="text-xs text-muted-foreground">Captive breeding programs</p>
                      <p className="text-xs mt-1">Example: Delhi Zoo, Alipore Zoo</p>
                    </div>

                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold mb-1">Cryopreservation</h4>
                      <p className="text-xs text-muted-foreground">Freeze gametes, embryos at -196°C</p>
                      <p className="text-xs mt-1">Long-term genetic storage</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>International Conventions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-3 bg-indigo-50 rounded">
                      <p className="font-semibold text-indigo-900">CITES (1973)</p>
                      <p className="text-xs text-indigo-800">Convention on International Trade in Endangered Species</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <p className="font-semibold text-purple-900">CBD (1992)</p>
                      <p className="text-xs text-purple-800">Convention on Biological Diversity - Earth Summit, Rio</p>
                    </div>
                    <div className="p-3 bg-pink-50 rounded">
                      <p className="font-semibold text-pink-900">Ramsar Convention (1971)</p>
                      <p className="text-xs text-pink-800">Conservation of wetlands</p>
                    </div>
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
