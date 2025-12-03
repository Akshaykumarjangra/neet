
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CloudRain, CheckCircle2, XCircle, Brain, Lightbulb, AlertTriangle, Recycle , Loader2 } from "lucide-react";

export function BotanyChapter23() {
  // Fetch questions from database for Organisms and Populations (topicId: 87)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '87'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=87');
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
      question: "Which of the following is a greenhouse gas?",
      options: [
        "Oxygen",
        "Nitrogen",
        "Carbon dioxide",
        "Argon"
      ],
      correctAnswer: 2,
      explanation: "Carbon dioxide (CO₂) is a major greenhouse gas that traps heat in the atmosphere, contributing to global warming. Other greenhouse gases include methane, nitrous oxide, and water vapor."
    },
    {
      id: 2,
      question: "Ozone layer depletion is primarily caused by:",
      options: [
        "Carbon dioxide",
        "Chlorofluorocarbons (CFCs)",
        "Sulfur dioxide",
        "Carbon monoxide"
      ],
      correctAnswer: 1,
      explanation: "Chlorofluorocarbons (CFCs) are the primary cause of ozone layer depletion. When CFCs reach the stratosphere, UV radiation breaks them down, releasing chlorine atoms that catalytically destroy ozone molecules."
    },
    {
      id: 3,
      question: "Biochemical Oxygen Demand (BOD) is a measure of:",
      options: [
        "Air pollution",
        "Water pollution",
        "Soil pollution",
        "Noise pollution"
      ],
      correctAnswer: 1,
      explanation: "BOD measures the amount of dissolved oxygen needed by aerobic organisms to decompose organic matter in water. High BOD indicates high organic pollution and low water quality."
    },
    {
      id: 4,
      question: "Which pollutant is responsible for acid rain?",
      options: [
        "CO₂ and O₂",
        "SO₂ and NO₂",
        "CH₄ and N₂",
        "O₃ and Cl₂"
      ],
      correctAnswer: 1,
      explanation: "Sulfur dioxide (SO₂) and nitrogen oxides (NO₂) react with water in the atmosphere to form sulfuric acid and nitric acid, causing acid rain with pH less than 5.6."
    },
    {
      id: 5,
      question: "Eutrophication is caused by excessive:",
      options: [
        "Organic matter",
        "Nutrients (N and P)",
        "Heavy metals",
        "Pesticides"
      ],
      correctAnswer: 1,
      explanation: "Eutrophication is nutrient enrichment of water bodies, primarily by nitrogen and phosphorus from agricultural runoff and sewage. This leads to excessive algal growth (algal bloom) and oxygen depletion."
    },
    {
      id: 6,
      question: "The Montreal Protocol is related to:",
      options: [
        "Climate change",
        "Ozone layer protection",
        "Biodiversity conservation",
        "Nuclear weapons"
      ],
      correctAnswer: 1,
      explanation: "The Montreal Protocol (1987) is an international treaty to phase out substances that deplete the ozone layer, particularly CFCs. It is considered one of the most successful environmental agreements."
    },
    {
      id: 7,
      question: "Which disease is caused by biomagnification of mercury?",
      options: [
        "Black lung disease",
        "Minamata disease",
        "Blue baby syndrome",
        "Itai-itai disease"
      ],
      correctAnswer: 1,
      explanation: "Minamata disease is caused by mercury poisoning through biomagnification in the food chain. It was first discovered in Minamata, Japan, where people consumed fish contaminated with methylmercury."
    },
    {
      id: 8,
      question: "Electrostatic precipitator is used to remove:",
      options: [
        "Gaseous pollutants",
        "Particulate matter",
        "Radioactive waste",
        "Biological pollutants"
      ],
      correctAnswer: 1,
      explanation: "Electrostatic precipitators use electrical charge to remove particulate matter (dust, smoke) from industrial exhaust. Particles are charged and collected on oppositely charged plates, achieving over 99% efficiency."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Environmental Issues</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding pollution, global warming, ozone depletion, and environmental conservation
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-orange-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <p>Understand different types of pollution and their effects</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <p>Learn about greenhouse effect and global warming</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <p>Master ozone layer depletion mechanisms</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <p>Explore solutions and conservation strategies</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pollution" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pollution">Pollution</TabsTrigger>
          <TabsTrigger value="warming">Global Warming</TabsTrigger>
          <TabsTrigger value="ozone">Ozone Layer</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Pollution */}
        <TabsContent value="pollution" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Types of Pollution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border-2 border-gray-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">💨 Air Pollution</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Primary Pollutants</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>CO:</strong> Incomplete combustion, binds to hemoglobin</li>
                        <li>• <strong>SO₂:</strong> Coal burning, causes acid rain</li>
                        <li>• <strong>NO₂:</strong> Vehicle emissions, respiratory irritant</li>
                        <li>• <strong>Particulates:</strong> Dust, smoke, respiratory diseases</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Secondary Pollutants</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• <strong>Ground-level O₃:</strong> Photochemical smog</li>
                        <li>• <strong>Peroxyacetyl nitrate (PAN):</strong> Eye irritation</li>
                        <li>• <strong>H₂SO₄ & HNO₃:</strong> Acid rain components</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Effects</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Respiratory diseases (asthma, bronchitis)</li>
                        <li>• Reduced visibility (smog)</li>
                        <li>• Damage to plants and buildings</li>
                        <li>• Contributes to global warming</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">💧 Water Pollution</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Sources</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• <strong>Domestic sewage:</strong> Organic matter, pathogens</li>
                        <li>• <strong>Industrial effluents:</strong> Heavy metals, chemicals</li>
                        <li>• <strong>Agricultural runoff:</strong> Pesticides, fertilizers</li>
                        <li>• <strong>Thermal pollution:</strong> Hot water from industries</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Indicators</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• <strong>BOD:</strong> Biological Oxygen Demand (clean water: &lt;5 ppm)</li>
                        <li>• <strong>COD:</strong> Chemical Oxygen Demand</li>
                        <li>• <strong>pH:</strong> Should be 6.5-8.5</li>
                        <li>• <strong>Dissolved O₂:</strong> {'>'}6 ppm for aquatic life</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Eutrophication</h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Nutrient enrichment → Algal bloom → Oxygen depletion → Fish death
                      </p>
                      <Badge className="bg-purple-600">Red tides: Toxic algal blooms</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-300">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">🏜️ Soil Pollution</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">Causes</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Pesticides and herbicides</li>
                        <li>• Industrial waste dumping</li>
                        <li>• Plastic and non-biodegradable waste</li>
                        <li>• Heavy metal contamination</li>
                        <li>• Acid rain</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Effects</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Reduced soil fertility</li>
                        <li>• Bioaccumulation in food chain</li>
                        <li>• Loss of soil organisms</li>
                        <li>• Groundwater contamination</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">🔊 Noise Pollution</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Sources & Levels</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Normal conversation: 60 dB</li>
                        <li>• Busy traffic: 80-90 dB</li>
                        <li>• Rock concert: 110-120 dB</li>
                        <li>• Jet engine: 140 dB (pain threshold)</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Effects</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Hearing loss (prolonged {'>'}85 dB)</li>
                        <li>• Sleep disturbance</li>
                        <li>• Cardiovascular problems</li>
                        <li>• Psychological stress</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Biomagnification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
                <h4 className="text-lg font-bold text-red-900 mb-3">Concept</h4>
                <p className="text-sm text-red-800 mb-4">
                  Progressive increase in concentration of non-biodegradable substances in organisms at successive trophic levels
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-green-200 p-2 rounded text-xs font-semibold text-center">
                      Water: 0.02 ppm
                    </div>
                    <span className="text-lg">→</span>
                    <div className="w-32 bg-green-300 p-2 rounded text-xs font-semibold text-center">
                      Algae: 5 ppm
                    </div>
                    <span className="text-lg">→</span>
                    <div className="w-32 bg-yellow-300 p-2 rounded text-xs font-semibold text-center">
                      Fish: 10 ppm
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-40">
                    <span className="text-lg">→</span>
                    <div className="w-32 bg-orange-400 p-2 rounded text-xs font-semibold text-center">
                      Birds: 25 ppm
                    </div>
                    <span className="text-lg">→</span>
                    <div className="w-32 bg-red-500 p-2 rounded text-xs font-semibold text-white text-center">
                      Humans: 100+ ppm
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded">
                    <p className="font-semibold text-sm mb-1">Examples:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• DDT (pesticide)</li>
                      <li>• Mercury (Minamata disease)</li>
                      <li>• Cadmium (Itai-itai disease)</li>
                      <li>• Lead</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <p className="font-semibold text-sm mb-1">Characteristics:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Non-biodegradable</li>
                      <li>• Fat-soluble</li>
                      <li>• Persistent in environment</li>
                      <li>• Toxic effects increase</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Global Warming */}
        <TabsContent value="warming" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-6 w-6 text-orange-600" />
                Greenhouse Effect & Global Warming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-300">
                <h3 className="text-xl font-bold text-orange-900 mb-4">Greenhouse Effect</h3>
                <p className="text-orange-800 mb-4">
                  Natural process where certain gases in Earth's atmosphere trap heat, keeping the planet warm enough to sustain life. However, excessive greenhouse gases lead to global warming.
                </p>
                <div className="p-4 bg-white rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ol className="text-sm space-y-1">
                    <li>1. Sun's radiation reaches Earth</li>
                    <li>2. Earth's surface absorbs and re-emits as infrared (heat)</li>
                    <li>3. Greenhouse gases trap this heat</li>
                    <li>4. Temperature increases</li>
                  </ol>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Major Greenhouse Gases</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">CO₂ (65% contribution)</p>
                      <p className="text-xs text-muted-foreground">Fossil fuel burning, deforestation</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">CH₄ - Methane (20%)</p>
                      <p className="text-xs text-muted-foreground">Rice paddies, cattle, landfills</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">N₂O - Nitrous oxide (6%)</p>
                      <p className="text-xs text-muted-foreground">Fertilizers, industrial processes</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">CFCs (8%)</p>
                      <p className="text-xs text-muted-foreground">Refrigerants, aerosols</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                  <h4 className="text-lg font-bold text-red-900 mb-3">Effects of Global Warming</h4>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Sea level rise:</strong> Melting glaciers & thermal expansion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Extreme weather:</strong> More hurricanes, droughts, floods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Ecosystem disruption:</strong> Species extinction, habitat loss</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Agriculture impact:</strong> Crop failures, food insecurity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Ocean acidification:</strong> CO₂ dissolves in seawater</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ozone Layer */}
        <TabsContent value="ozone" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Ozone Layer Depletion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Ozone Layer Basics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Location & Function</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Located in stratosphere (15-35 km altitude)</li>
                      <li>• Contains O₃ (ozone molecules)</li>
                      <li>• Absorbs 97-99% of harmful UV-B radiation</li>
                      <li>• Protects life on Earth</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Formation</h4>
                    <p className="text-sm text-blue-700 mb-2">UV radiation splits oxygen:</p>
                    <div className="text-xs font-mono bg-blue-100 p-2 rounded space-y-1">
                      <p>O₂ + UV → O + O</p>
                      <p>O + O₂ → O₃ (ozone)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                  <h4 className="text-lg font-bold text-red-900 mb-3">Ozone Depletion Mechanism</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm mb-2">CFCs Break Down:</p>
                      <p className="text-xs font-mono bg-red-100 p-2 rounded">
                        CFCl₃ + UV → CFCl₂ + Cl
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm mb-2">Chlorine Destroys Ozone:</p>
                      <p className="text-xs font-mono bg-red-100 p-2 rounded space-y-1">
                        Cl + O₃ → ClO + O₂<br/>
                        ClO + O → Cl + O₂
                      </p>
                      <p className="text-xs text-red-700 mt-2">
                        One Cl atom can destroy 100,000 O₃ molecules!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-3">Effects of UV Radiation</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">On Humans:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Skin cancer (melanoma)</li>
                        <li>• Cataracts (eye damage)</li>
                        <li>• Immune system suppression</li>
                        <li>• Premature aging</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">On Environment:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Reduced plant growth</li>
                        <li>• Damage to phytoplankton</li>
                        <li>• Ecosystem disruption</li>
                        <li>• Material degradation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-purple-50 border-2 border-purple-200 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>Ozone Hole</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Location:</strong> Primarily over Antarctica</li>
                    <li>• <strong>Season:</strong> Appears in Southern Hemisphere spring (Sept-Nov)</li>
                    <li>• <strong>Size:</strong> Can be larger than North America</li>
                    <li>• <strong>Cause:</strong> Unique polar stratospheric clouds enhance CFC breakdown</li>
                    <li>• <strong>Status:</strong> Slowly recovering due to Montreal Protocol</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Solutions */}
        <TabsContent value="solutions" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-6 w-6 text-green-600" />
                Solutions & Conservation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">Pollution Control</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Air Pollution:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Catalytic converters in vehicles</li>
                        <li>• Electrostatic precipitators in industries</li>
                        <li>• Scrubbers to remove SO₂</li>
                        <li>• Use of cleaner fuels (CNG, electric)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Water Pollution:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Sewage treatment plants</li>
                        <li>• Integrated waste water treatment</li>
                        <li>• Phytoremediation (plants remove pollutants)</li>
                        <li>• Proper industrial waste disposal</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Sustainable Practices</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm flex items-center gap-2">
                        <Recycle className="h-4 w-4" />
                        3 R's Approach
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                        <li>• <strong>Reduce:</strong> Minimize waste generation</li>
                        <li>• <strong>Reuse:</strong> Use items multiple times</li>
                        <li>• <strong>Recycle:</strong> Process waste into new products</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Renewable Energy:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Solar power</li>
                        <li>• Wind energy</li>
                        <li>• Hydroelectric power</li>
                        <li>• Biofuels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>International Agreements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Montreal Protocol (1987)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Phase out ozone-depleting substances</li>
                        <li>• Ban CFCs, halons</li>
                        <li>• Most successful environmental treaty</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Kyoto Protocol (1997)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Reduce greenhouse gas emissions</li>
                        <li>• Carbon credits system</li>
                        <li>• Binding targets for developed nations</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Paris Agreement (2015)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Limit global warming to 1.5-2°C</li>
                        <li>• Nationally determined contributions</li>
                        <li>• Climate finance for developing nations</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Convention on Biological Diversity</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Conserve biodiversity</li>
                        <li>• Sustainable use of resources</li>
                        <li>• Fair sharing of benefits</li>
                      </ul>
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
