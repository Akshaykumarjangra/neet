import { useMemo, useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Zap, Award, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { normalizeLegacyQuestions } from "@/lib/questionUtils";

const topicTests = [
  {
    id: 1,
    topic: "Physical Chemistry - Part 1",
    subtopics: ["Mole Concept", "Atomic Structure", "Chemical Bonding"],
    questions: 15,
    duration: 20,
    difficulty: "Medium",
  },
  {
    id: 2,
    topic: "Physical Chemistry - Part 2",
    subtopics: ["Thermodynamics", "Equilibrium", "Kinetics"],
    questions: 15,
    duration: 20,
    difficulty: "Hard",
  },
  {
    id: 3,
    topic: "Inorganic Chemistry - Part 1",
    subtopics: ["Periodic Table", "s-Block", "p-Block"],
    questions: 15,
    duration: 20,
    difficulty: "Medium",
  },
  {
    id: 4,
    topic: "Inorganic Chemistry - Part 2",
    subtopics: ["d-Block", "f-Block", "Coordination"],
    questions: 15,
    duration: 20,
    difficulty: "Hard",
  },
  {
    id: 5,
    topic: "Organic Chemistry - Part 1",
    subtopics: ["GOC", "Hydrocarbons", "Haloalkanes"],
    questions: 15,
    duration: 20,
    difficulty: "Medium",
  },
  {
    id: 6,
    topic: "Organic Chemistry - Part 2",
    subtopics: ["Alcohols", "Aldehydes", "Carboxylic Acids"],
    questions: 15,
    duration: 20,
    difficulty: "Hard",
  },
];

const legacySampleQuestions = {
  1: [
    {
      q: "0.5 mol of H2SO4 contains how many oxygen atoms?",
      options: ["1.2 x 10^23", "2.4 x 10^23", "6.022 x 10^23", "3.011 x 10^23"],
      correct: 0,
    },
    { q: "Which ion has maximum unpaired electrons?", options: ["Fe2+", "Fe3+", "Ni2+", "Cu2+"], correct: 1 },
    { q: "Bond order of O2^- is:", options: ["1.5", "2.0", "2.5", "3.0"], correct: 2 },
  ],
  2: [
    { q: "For an endothermic reaction, delta H is:", options: ["Negative", "Positive", "Zero", "Variable"], correct: 1 },
    { q: "Kp = Kc when delta n equals:", options: ["-1", "0", "1", "2"], correct: 1 },
    {
      q: "Half-life of a first order reaction depends on:",
      options: ["Initial concentration", "Time", "Rate constant only", "Temperature only"],
      correct: 2,
    },
  ],
  3: [
    { q: "Diagonal relationship exists between:", options: ["Li-Mg", "Na-Ca", "K-Sr", "Rb-Ba"], correct: 0 },
    { q: "Which hydroxide is amphoteric?", options: ["NaOH", "Al(OH)3", "Ca(OH)2", "Mg(OH)2"], correct: 1 },
    { q: "Noble gas with highest boiling point:", options: ["He", "Ne", "Ar", "Xe"], correct: 3 },
  ],
  4: [
    {
      q: "Transition elements show variable oxidation states due to:",
      options: ["Large size", "Small (n-1)d and ns energy difference", "High ionization energy", "Low electronegativity"],
      correct: 1,
    },
    { q: "Lanthanoid contraction causes:", options: ["Size increase", "Size decrease", "No change", "Irregular variation"], correct: 1 },
    { q: "Coordination number of Ni in [Ni(CO)4]:", options: ["2", "4", "6", "8"], correct: 1 },
  ],
  5: [
    { q: "Most stable carbocation:", options: ["CH3+", "1°", "2°", "3°"], correct: 3 },
    {
      q: "Benzene most commonly undergoes:",
      options: ["Electrophilic addition", "Electrophilic substitution", "Nucleophilic addition", "Free radical addition"],
      correct: 1,
    },
    { q: "In an SN2 reaction, rate depends on:", options: ["[RX] only", "[Nu-] only", "Both [RX] and [Nu-]", "Neither"], correct: 2 },
  ],
  6: [
    { q: "Lucas test is fastest with:", options: ["1° alcohol", "2° alcohol", "3° alcohol", "Phenol"], correct: 2 },
    { q: "Fehling's test is positive for:", options: ["Aldehydes", "Ketones", "Both", "Neither"], correct: 0 },
    { q: "Strongest acid:", options: ["HCOOH", "CH3COOH", "CCl3COOH", "ClCH2COOH"], correct: 2 },
  ],
};

const FALLBACK_TOPIC_ID = 2109;

const fallbackQuestions = topicTests.flatMap((test) => {
  const legacyQuestions =
    (legacySampleQuestions[test.id as keyof typeof legacySampleQuestions] ?? []) as Array<{ q: string; options: string[]; correct: number }>;

  const normalized = normalizeLegacyQuestions(
    legacyQuestions.map((question) => ({
      question: question.q,
      options: question.options,
      correctAnswer: question.correct,
      solution: "Review the concept and try again.",
      topic: test.topic,
    })),
    {
      sourceType: "chemistry_ch33_fallback",
      defaultDifficulty: test.difficulty === "Hard" ? 3 : 2,
      topicId: FALLBACK_TOPIC_ID,
    },
  );

  return normalized.map((q, idx) => ({
    ...q,
    id: Number(`${test.id}${idx + 1}`),
    relatedTopics: [test.topic],
  }));
});

export function ChemistryChapter33() {
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", "topicId", "2109"],
    queryFn: async () => {
      const response = await fetch("/api/questions?topicId=2109");
      if (!response.ok) throw new Error("Failed to fetch topic-wise mastery questions");
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions && dbQuestions.length > 0 ? dbQuestions : fallbackQuestions;

  const questionsByTopic = useMemo(() => {
    const map: Record<string, Question[]> = {};
    practiceQuestions.forEach((question) => {
      const topicKey = question.relatedTopics?.[0] ?? "General Practice";
      if (!map[topicKey]) map[topicKey] = [];
      map[topicKey].push(question);
    });
    return map;
  }, [practiceQuestions]);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [completedTests, setCompletedTests] = useState<number[]>([]);

  const selectedTopic = selectedTest ? topicTests.find((test) => test.id === selectedTest)?.topic : undefined;

  const currentQuestions = selectedTopic ? questionsByTopic[selectedTopic] ?? [] : [];
  const score = currentQuestions.filter((question) => userAnswers[question.id] === question.correctAnswer).length;

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    if (!showResults) {
      setUserAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    }
  };

  const submitTest = () => {
    setShowResults(true);
    if (selectedTest && !completedTests.includes(selectedTest)) {
      setCompletedTests((prev) => [...prev, selectedTest]);
    }
  };

  const clearAttemptState = () => {
    setTestStarted(false);
    setUserAnswers({});
    setShowResults(false);
  };

  const resetTest = () => {
    clearAttemptState();
    setSelectedTest(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 33: Topic-Wise Mastery Tests</h1>
          <p className="text-muted-foreground">Targeted practice for each major topic area</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tests">
            <Zap className="h-4 w-4 mr-2" />
            Topic Tests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Topic-Wise Mastery Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Why Topic-Wise Tests...</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Focus on specific areas needing improvement</li>
                  <li>Build confidence in individual topics before full tests</li>
                  <li>Identify weak areas for targeted revision</li>
                  <li>Practice time management for specific topic clusters</li>
                  <li>Track progress across different chemistry domains</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Physical Chemistry</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="text-muted-foreground">Numerical heavy topics</p>
                    <p>- Mole Concept & Stoichiometry</p>
                    <p>- Thermodynamics & Energetics</p>
                    <p>- Equilibrium & Kinetics</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Inorganic Chemistry</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="text-muted-foreground">Fact-based learning</p>
                    <p>- Periodic Properties</p>
                    <p>- Main Group Elements</p>
                    <p>- Transition Metals</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Organic Chemistry</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p className="text-muted-foreground">Mechanism focused</p>
                    <p>- Reaction Mechanisms</p>
                    <p>- Functional Groups</p>
                    <p>- Named Reactions</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Tests Completed</span>
                      <Badge>{completedTests.length}/6</Badge>
                    </div>
                    <Progress value={(completedTests.length / 6) * 100} />
                    <p className="text-sm text-muted-foreground">
                      {completedTests.length === 6 ? "All topic tests completed!" : `${6 - completedTests.length} tests remaining`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-6">
          {!selectedTest ? (
            <div className="space-y-4">
              {questionsLoading && <p className="text-center text-sm text-muted-foreground">Syncing latest question sets...</p>}
              <div className="grid gap-4">
                {topicTests.map((test) => (
                  <Card
                    key={test.id}
                    className="cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => {
                      setSelectedTest(test.id);
                      clearAttemptState();
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{test.topic}</h3>
                            {completedTests.includes(test.id) && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{test.subtopics.join(" - ")}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline">{test.questions} Questions</Badge>
                            <Badge variant="outline">{test.duration} mins</Badge>
                            <Badge variant="secondary">{test.difficulty}</Badge>
                          </div>
                        </div>
                        <Award className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{topicTests[selectedTest - 1].topic}</CardTitle>
                    <p className="text-sm text-muted-foreground">{topicTests[selectedTest - 1].subtopics.join(" - ")}</p>
                  </div>
                  {showResults && (
                    <Badge
                      variant={
                        currentQuestions.length === 0
                          ? "outline"
                          : score / currentQuestions.length >= 0.7
                          ? "default"
                          : score / currentQuestions.length >= 0.4
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      Score: {score}/{currentQuestions.length}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {!testStarted ? (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-lg">Ready to start the test...</p>
                    <p className="text-sm text-muted-foreground">
                      {currentQuestions.length} questions - {topicTests[selectedTest - 1].duration} minutes
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => setTestStarted(true)} disabled={currentQuestions.length === 0}>
                        Start Test
                      </Button>
                      <Button variant="outline" onClick={resetTest}>
                        Back to Tests
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {currentQuestions.map((question, idx) => (
                      <Card key={question.id} className="border-blue-500/20">
                        <CardHeader>
                          <p className="font-medium">
                            Q{idx + 1}. {question.questionText}
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {question.options.map((option) => (
                            <Button
                              key={option.id}
                              variant={
                                showResults
                                  ? option.id === question.correctAnswer
                                    ? "default"
                                    : userAnswers[question.id] === option.id
                                    ? "destructive"
                                    : "outline"
                                  : userAnswers[question.id] === option.id
                                  ? "secondary"
                                  : "outline"
                              }
                              className="w-full justify-start text-left h-auto py-3"
                              onClick={() => handleAnswerSelect(question.id, option.id)}
                              disabled={showResults}
                            >
                              <span className="mr-3">{option.id}.</span>
                              {option.text}
                            </Button>
                          ))}
                        </CardContent>
                      </Card>
                    ))}

                    <div className="flex gap-3">
                      {!showResults ? (
                        <>
                          <Button onClick={submitTest} className="flex-1">
                            Submit Test
                          </Button>
                          <Button variant="outline" onClick={resetTest}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={resetTest} className="flex-1">
                            Try Another Test
                          </Button>
                          <Button variant="outline" onClick={resetTest}>
                            Back to Tests
                          </Button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ChemistryChapter33;
