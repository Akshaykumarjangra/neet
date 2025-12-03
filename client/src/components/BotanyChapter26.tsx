
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle2, XCircle, Brain, TrendingUp, BarChart3 , Loader2 } from "lucide-react";

export function BotanyChapter26() {
  // Fetch questions from database for Environmental Issues (topicId: 90)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '90'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=90');
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
      question: "Which of the following is an example of population?",
      options: [
        "All living organisms in a pond",
        "All mango trees in an orchard",
        "All plants and animals in a forest",
        "All biotic and abiotic components of a lake"
      ],
      correctAnswer: 1,
      explanation: "A population consists of individuals of the same species living in a defined geographical area at a given time."
    },
    {
      id: 2,
      question: "The formula for calculating population density is:",
      options: [
        "Total number of individuals / Area",
        "Birth rate - Death rate",
        "Immigration - Emigration",
        "Carrying capacity / Population size"
      ],
      correctAnswer: 0,
      explanation: "Population density = Number of individuals (N) / Area (or volume). It represents the number of individuals per unit area."
    },
    {
      id: 3,
      question: "In a population showing exponential growth, the growth curve is:",
      options: ["Linear", "J-shaped", "S-shaped", "Bell-shaped"],
      correctAnswer: 1,
      explanation: "Exponential growth produces a J-shaped curve when resources are unlimited, following the equation dN/dt = rN."
    },
    {
      id: 4,
      question: "Carrying capacity (K) refers to:",
      options: [
        "Maximum birth rate of a population",
        "Maximum population size that an environment can sustain",
        "Minimum population size for survival",
        "Rate of immigration"
      ],
      correctAnswer: 1,
      explanation: "Carrying capacity is the maximum population size that an environment can sustain indefinitely given available resources."
    },
    {
      id: 5,
      question: "Which interaction benefits both species involved?",
      options: ["Predation", "Parasitism", "Mutualism", "Competition"],
      correctAnswer: 2,
      explanation: "Mutualism is an interaction where both species benefit. Examples include pollination, lichens, and mycorrhizae."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 p-8 text-white">
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
            <Brain className="h-6 w-6 text-purple-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Understand population characteristics and dynamics</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Learn about population growth models</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Study organism adaptations to environment</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Explore population interactions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="characteristics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="characteristics">Population</TabsTrigger>
          <TabsTrigger value="growth">Growth Models</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Population Characteristics */}
        <TabsContent value="characteristics" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Population Attributes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Population Density (N)</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• Number of individuals per unit area</p>
                    <p>• Formula: N = Population / Area</p>
                    <p>• Can vary in space and time</p>
                    <p>• Measured by quadrat method for plants</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Natality (Birth Rate)</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <p>• Number of births per unit time</p>
                    <p>• Increases population size</p>
                    <p>• Affected by reproductive capacity</p>
                    <p>• Species-specific characteristic</p>
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                  <h4 className="font-semibold text-red-900 mb-2">Mortality (Death Rate)</h4>
                  <div className="text-sm text-red-800 space-y-1">
                    <p>• Number of deaths per unit time</p>
                    <p>• Decreases population size</p>
                    <p>• Affected by disease, predation, age</p>
                    <p>• Varies with environmental conditions</p>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-semibold text-purple-900 mb-2">Age Distribution</h4>
                  <div className="text-sm text-purple-800 space-y-1">
                    <p>• Pre-reproductive (young)</p>
                    <p>• Reproductive (adults)</p>
                    <p>• Post-reproductive (old)</p>
                    <p>• Determines population growth potential</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Environmental Adaptations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Types of Adaptations</h4>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-amber-800">Behavioral</p>
                    <p className="text-amber-700">• Migration</p>
                    <p className="text-amber-700">• Hibernation</p>
                    <p className="text-amber-700">• Aestivation</p>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800">Physiological</p>
                    <p className="text-amber-700">• Thermoregulation</p>
                    <p className="text-amber-700">• Osmoregulation</p>
                    <p className="text-amber-700">• Metabolic changes</p>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800">Morphological</p>
                    <p className="text-amber-700">• Body shape</p>
                    <p className="text-amber-700">• Size variations</p>
                    <p className="text-amber-700">• Protective structures</p>
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
                <TrendingUp className="h-6 w-6" />
                Population Growth Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Exponential Growth (J-shaped)</h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="p-3 bg-white rounded border border-blue-200">
                    <p className="font-semibold mb-2">Equation: dN/dt = rN</p>
                    <p>• N = Population size</p>
                    <p>• r = Intrinsic rate of natural increase</p>
                    <p>• t = Time</p>
                  </div>
                  <div>
                    <p className="font-semibold">Characteristics:</p>
                    <p>• Unlimited resources</p>
                    <p>• No environmental resistance</p>
                    <p>• Constant birth and death rates</p>
                    <p>• Produces J-shaped curve</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Logistic Growth (S-shaped)</h3>
                <div className="space-y-3 text-sm text-green-800">
                  <div className="p-3 bg-white rounded border border-green-200">
                    <p className="font-semibold mb-2">Equation: dN/dt = rN[(K-N)/K]</p>
                    <p>• K = Carrying capacity</p>
                    <p>• (K-N)/K = Environmental resistance</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phases:</p>
                    <p>1. Lag phase: Slow initial growth</p>
                    <p>2. Log phase: Rapid exponential growth</p>
                    <p>3. Deceleration phase: Growth slows</p>
                    <p>4. Asymptote: Reaches carrying capacity</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Life History Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">r-selected Species</h4>
                  <div className="text-sm text-purple-800 space-y-1">
                    <p>• High reproductive rate</p>
                    <p>• Small body size</p>
                    <p>• Short lifespan</p>
                    <p>• Little parental care</p>
                    <p>• Examples: Insects, rodents</p>
                  </div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-3">K-selected Species</h4>
                  <div className="text-sm text-indigo-800 space-y-1">
                    <p>• Low reproductive rate</p>
                    <p>• Large body size</p>
                    <p>• Long lifespan</p>
                    <p>• Extensive parental care</p>
                    <p>• Examples: Elephants, humans</p>
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
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Mutualism (+/+)</h4>
                  <p className="text-sm text-green-800 mb-2">Both species benefit</p>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Lichens (algae + fungi)</p>
                    <p>• Mycorrhizae (fungi + plant roots)</p>
                    <p>• Pollination (flower + insect)</p>
                    <p>• Nitrogen fixation (legumes + Rhizobium)</p>
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                  <h4 className="font-semibold text-red-900 mb-2">Predation (+/-)</h4>
                  <p className="text-sm text-red-800 mb-2">One species benefits, other is harmed</p>
                  <div className="text-sm text-red-700 space-y-1">
                    <p>• Predator captures and kills prey</p>
                    <p>• Controls prey population</p>
                    <p>• Examples: Lion-deer, snake-frog</p>
                    <p>• Prey defenses: camouflage, mimicry, toxins</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                  <h4 className="font-semibold text-orange-900 mb-2">Parasitism (+/-)</h4>
                  <p className="text-sm text-orange-800 mb-2">Parasite benefits, host is harmed</p>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Ectoparasites: Lice, ticks (external)</p>
                    <p>• Endoparasites: Tapeworms, Plasmodium (internal)</p>
                    <p>• Brood parasitism: Cuckoo bird</p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                  <h4 className="font-semibold text-yellow-900 mb-2">Competition (-/-)</h4>
                  <p className="text-sm text-yellow-800 mb-2">Both species are harmed</p>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>• Interspecific: Between different species</p>
                    <p>• Intraspecific: Within same species</p>
                    <p>• Resource partitioning reduces competition</p>
                    <p>• Competitive exclusion principle (Gause)</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Commensalism (+/0)</h4>
                  <p className="text-sm text-blue-800 mb-2">One benefits, other unaffected</p>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Orchids on trees (epiphytes)</p>
                    <p>• Barnacles on whales</p>
                    <p>• Cattle egret and grazing cattle</p>
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
