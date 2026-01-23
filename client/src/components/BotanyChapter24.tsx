
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle2, XCircle, Brain, TrendingUp, Globe , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter24() {
  // Fetch questions from database for Ecosystem (topicId: 88)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '88'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=88');
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
      question: "The maximum number of individuals that a habitat can support is called:",
      options: [
        "Biotic potential",
        "Carrying capacity",
        "Population density",
        "Natality"
      ],
      correctAnswer: "B",
      explanation: "Carrying capacity (K) is the maximum population size that an environment can sustain indefinitely given the available resources like food, water, and shelter."
    },
    {
      id: 2,
      question: "Which growth pattern shows a sigmoid curve?",
      options: [
        "Exponential growth",
        "Logistic growth",
        "Zero growth",
        "Negative growth"
      ],
      correctAnswer: "B",
      explanation: "Logistic growth shows an S-shaped (sigmoid) curve with three phases: lag phase (slow growth), log phase (rapid growth), and stationary phase (growth levels off at carrying capacity)."
    },
    {
      id: 3,
      question: "Allen's rule states that:",
      options: [
        "Larger animals are found in colder climates",
        "Animals in colder climates have shorter extremities",
        "Migration occurs in response to temperature",
        "Body size decreases with altitude"
      ],
      correctAnswer: "B",
      explanation: "Allen's rule states that endothermic animals from colder climates have shorter limbs and appendages to minimize heat loss. For example, polar bears have small ears compared to elephants."
    },
    {
      id: 4,
      question: "Which of the following represents commensalism?",
      options: [
        "Bacteria in human intestine",
        "Orchid on mango tree",
        "Cuscuta on host plant",
        "Rhizobium in legume roots"
      ],
      correctAnswer: "B",
      explanation: "Orchids growing on mango trees represent commensalism - the orchid benefits by getting support and sunlight, while the mango tree is neither harmed nor benefited."
    },
    {
      id: 5,
      question: "Population with more young individuals indicates:",
      options: [
        "Declining population",
        "Stable population",
        "Expanding population",
        "Extinct population"
      ],
      correctAnswer: "C",
      explanation: "A population with a larger proportion of pre-reproductive individuals (pyramid-shaped age structure) indicates an expanding or growing population."
    },
    {
      id: 6,
      question: "Mycorrhizae represent which type of interaction?",
      options: [
        "Parasitism",
        "Commensalism",
        "Mutualism",
        "Competition"
      ],
      correctAnswer: "C",
      explanation: "Mycorrhizae represent mutualism between fungi and plant roots. Fungi help plants absorb water and minerals, while plants provide carbohydrates to fungi."
    },
    {
      id: 7,
      question: "The formula for exponential growth is:",
      options: [
        "dN/dt = rN",
        "dN/dt = rN(K-N)/K",
        "N = K",
        "r = b - d"
      ],
      correctAnswer: "A",
      explanation: "Exponential growth follows dN/dt = rN, where N is population size, t is time, and r is intrinsic rate of natural increase. This assumes unlimited resources."
    },
    {
      id: 8,
      question: "Gause's competitive exclusion principle states that:",
      options: [
        "Competition leads to extinction",
        "Two species competing for same resources cannot coexist",
        "Competition increases biodiversity",
        "Only one species can exist in a habitat"
      ],
      correctAnswer: "B",
      explanation: "Gause's competitive exclusion principle states that two species competing for exactly the same limiting resources cannot stably coexist. One will outcompete and exclude the other."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Organisms and Populations</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding population ecology, interactions, and adaptations
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-cyan-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-600 mt-0.5" />
              <p>Understand population characteristics and growth patterns</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-600 mt-0.5" />
              <p>Master different types of population interactions</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-600 mt-0.5" />
              <p>Learn about adaptations to different environments</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-600 mt-0.5" />
              <p>Explore ecological principles and theories</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="population" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="population">Population</TabsTrigger>
          <TabsTrigger value="growth">Growth Models</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="adaptations">Adaptations</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Population Characteristics */}
        <TabsContent value="population" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Population Attributes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Key Characteristics</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Population Density (N)</h4>
                      <p className="text-sm text-blue-700">Number of individuals per unit area</p>
                      <p className="text-xs text-muted-foreground mt-1">Example: 200 deer/km²</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Natality (Birth rate)</h4>
                      <p className="text-sm text-green-700">Number of births per 1000 individuals per year</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Mortality (Death rate)</h4>
                      <p className="text-sm text-red-700">Number of deaths per 1000 individuals per year</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Age Distribution</h4>
                      <p className="text-sm text-purple-700">Proportion of individuals in different age groups</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Age Pyramids</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">🔺 Expanding (Pyramid)</h4>
                      <div className="space-y-1">
                        <div className="h-6 bg-green-200 w-full rounded"></div>
                        <div className="h-6 bg-green-300 w-4/5 rounded"></div>
                        <div className="h-6 bg-green-400 w-3/5 rounded"></div>
                        <div className="h-6 bg-green-500 w-2/5 rounded"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">High birth rate, growing population</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-3">▬ Stable (Column)</h4>
                      <div className="space-y-1">
                        <div className="h-6 bg-blue-300 w-4/5 rounded"></div>
                        <div className="h-6 bg-blue-400 w-4/5 rounded"></div>
                        <div className="h-6 bg-blue-500 w-4/5 rounded"></div>
                        <div className="h-6 bg-blue-600 w-3/5 rounded"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Birth rate ≈ Death rate</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-3">🔻 Declining (Urn)</h4>
                      <div className="space-y-1">
                        <div className="h-6 bg-red-300 w-2/5 rounded"></div>
                        <div className="h-6 bg-red-400 w-3/5 rounded"></div>
                        <div className="h-6 bg-red-500 w-4/5 rounded"></div>
                        <div className="h-6 bg-red-600 w-full rounded"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Low birth rate, aging population</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Growth Models */}
        <TabsContent value="growth" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Population Growth Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Exponential Growth</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Formula</h4>
                      <p className="text-lg font-mono bg-green-100 p-3 rounded text-center">
                        dN/dt = rN
                      </p>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <p>• N = Population size</p>
                        <p>• r = Intrinsic rate of increase</p>
                        <p>• t = Time</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Characteristics</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• J-shaped curve</li>
                        <li>• Unlimited resources</li>
                        <li>• No environmental resistance</li>
                        <li>• Theoretical model</li>
                        <li>• r = b - d (birth - death)</li>
                      </ul>
                    </div>
                    <div className="h-40 bg-white rounded-lg p-4 flex items-end justify-center">
                      <div className="relative w-full h-full">
                        <svg viewBox="0 0 200 100" className="w-full h-full">
                          <path d="M 10 90 Q 50 80, 70 50 T 180 10" stroke="green" strokeWidth="3" fill="none"/>
                          <text x="100" y="20" fontSize="12" fill="green" textAnchor="middle">J-curve</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Logistic Growth</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Formula</h4>
                      <p className="text-lg font-mono bg-blue-100 p-3 rounded text-center">
                        dN/dt = rN(K-N)/K
                      </p>
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <p>• K = Carrying capacity</p>
                        <p>• (K-N)/K = Environmental resistance</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Three Phases</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• <strong>Lag:</strong> Slow initial growth</li>
                        <li>• <strong>Log/Exponential:</strong> Rapid growth</li>
                        <li>• <strong>Stationary:</strong> Levels off at K</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Characteristics</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• S-shaped (sigmoid) curve</li>
                        <li>• Limited resources</li>
                        <li>• Reaches carrying capacity</li>
                        <li>• Realistic model</li>
                      </ul>
                    </div>
                    <div className="h-40 bg-white rounded-lg p-4 flex items-end justify-center">
                      <div className="relative w-full h-full">
                        <svg viewBox="0 0 200 100" className="w-full h-full">
                          <path d="M 10 90 Q 50 85, 100 40 T 190 20" stroke="blue" strokeWidth="3" fill="none"/>
                          <line x1="10" y1="20" x2="190" y2="20" stroke="red" strokeWidth="2" strokeDasharray="5,5"/>
                          <text x="195" y="20" fontSize="10" fill="red">K</text>
                          <text x="100" y="50" fontSize="12" fill="blue" textAnchor="middle">S-curve</text>
                        </svg>
                      </div>
                    </div>
                  </div>
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
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                  <h3 className="text-xl font-bold text-green-900 mb-4">➕ Mutualism (+ +)</h3>
                  <p className="text-sm text-green-800 mb-4">Both species benefit</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Lichens</p>
                      <p className="text-xs text-muted-foreground">Algae + Fungi</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Mycorrhizae</p>
                      <p className="text-xs text-muted-foreground">Fungi + Plant roots</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Rhizobium-Legume</p>
                      <p className="text-xs text-muted-foreground">Nitrogen fixation</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Pollination</p>
                      <p className="text-xs text-muted-foreground">Bee-Flower relationship</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">➕➖ Commensalism (+ 0)</h3>
                  <p className="text-sm text-blue-800 mb-4">One benefits, other unaffected</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Epiphytes</p>
                      <p className="text-xs text-muted-foreground">Orchids on trees</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Barnacles on whale</p>
                      <p className="text-xs text-muted-foreground">Transport & feeding</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Cattle Egret-Grazing cattle</p>
                      <p className="text-xs text-muted-foreground">Birds feed on insects</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Clownfish-Sea anemone</p>
                      <p className="text-xs text-muted-foreground">Protection from predators</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-300">
                  <h3 className="text-xl font-bold text-red-900 mb-4">➕➖ Parasitism (+ -)</h3>
                  <p className="text-sm text-red-800 mb-4">Parasite benefits, host harmed</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Endoparasites</p>
                      <p className="text-xs text-muted-foreground">Tapeworm, roundworm (inside)</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Ectoparasites</p>
                      <p className="text-xs text-muted-foreground">Lice, ticks (outside)</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Cuscuta (Dodder)</p>
                      <p className="text-xs text-muted-foreground">Plant parasite</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Plasmodium (Malaria)</p>
                      <p className="text-xs text-muted-foreground">Blood parasite</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">➖➖ Competition (- -)</h3>
                  <p className="text-sm text-purple-800 mb-4">Both species harmed</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Interspecific Competition</p>
                      <p className="text-xs text-muted-foreground">Between different species</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Intraspecific Competition</p>
                      <p className="text-xs text-muted-foreground">Within same species</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Resource Competition</p>
                      <p className="text-xs text-muted-foreground">Food, water, space, light</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Competitive Exclusion</p>
                      <p className="text-xs text-muted-foreground">Gause's principle</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-300">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">➕➖ Predation (+ -)</h3>
                  <p className="text-sm text-amber-800 mb-4">Predator benefits, prey harmed</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">True Predators</p>
                      <p className="text-xs text-muted-foreground">Lion-Deer, Snake-Frog</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Herbivory</p>
                      <p className="text-xs text-muted-foreground">Cattle grazing on grass</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Defenses</p>
                      <p className="text-xs text-muted-foreground">Camouflage, mimicry, toxins</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Population Control</p>
                      <p className="text-xs text-muted-foreground">Maintains ecological balance</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border-2 border-teal-300">
                  <h3 className="text-xl font-bold text-teal-900 mb-4">⊙ Amensalism (- 0)</h3>
                  <p className="text-sm text-teal-800 mb-4">One harmed, other unaffected</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Antibiosis</p>
                      <p className="text-xs text-muted-foreground">Penicillium inhibits bacteria</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Allelopathy</p>
                      <p className="text-xs text-muted-foreground">Black walnut inhibits other plants</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="font-semibold text-sm">Trampling</p>
                      <p className="text-xs text-muted-foreground">Large animals on small plants</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Adaptations */}
        <TabsContent value="adaptations" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-green-600" />
                Adaptations to Environment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Temperature Adaptations</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Homeotherms (Warm-blooded)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Maintain constant body temperature</li>
                        <li>• Birds and mammals</li>
                        <li>• Higher metabolic rate</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Poikilotherms (Cold-blooded)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Body temperature varies</li>
                        <li>• Reptiles, amphibians, fish</li>
                        <li>• Behavioral thermoregulation</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Ecological Rules</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• <strong>Allen's rule:</strong> Shorter extremities in cold</li>
                        <li>• <strong>Bergmann's rule:</strong> Larger body in cold</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Water Adaptations</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Hydrophytes (Aquatic)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Aerenchyma for buoyancy</li>
                        <li>• Reduced cuticle</li>
                        <li>• Submerged/floating leaves</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">Xerophytes (Desert)</h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• Thick cuticle, sunken stomata</li>
                        <li>• CAM photosynthesis</li>
                        <li>• Succulent stems (cacti)</li>
                        <li>• Deep root systems</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Mesophytes (Moderate)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Moderate water requirements</li>
                        <li>• Broad leaves</li>
                        <li>• Most common plants</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>Survival Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Migration</h5>
                      <p className="text-sm text-muted-foreground">Moving to favorable conditions</p>
                      <p className="text-xs mt-1">Example: Birds in winter</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Hibernation</h5>
                      <p className="text-sm text-muted-foreground">Winter dormancy</p>
                      <p className="text-xs mt-1">Example: Bears, frogs</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Aestivation</h5>
                      <p className="text-sm text-muted-foreground">Summer dormancy</p>
                      <p className="text-xs mt-1">Example: Snails, lungfish</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Diapause</h5>
                      <p className="text-sm text-muted-foreground">Suspended development</p>
                      <p className="text-xs mt-1">Example: Insect eggs/larvae</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Conformers</h5>
                      <p className="text-sm text-muted-foreground">Adjust to environment</p>
                      <p className="text-xs mt-1">Example: Most invertebrates</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="font-semibold mb-2">Regulators</h5>
                      <p className="text-sm text-muted-foreground">Maintain homeostasis</p>
                      <p className="text-xs mt-1">Example: Mammals, birds</p>
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
