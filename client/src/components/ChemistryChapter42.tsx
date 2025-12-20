import { useEffect, useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import {
  getDifficultyLabel,
  getPrimaryTopicLabel,
  normalizeLegacyQuestions,
} from "@/lib/questionUtils";

const MARKS_PER_QUESTION = 4;

const legacyMockTestQuestions = [
  {
    id: 1,
    topic: "Mole Concept",
    question: "What is the mass of 0.5 moles of H2SO4? (H=1, S=32, O=16)",
    options: ["49 g", "98 g", "147 g", "196 g"],
    correctAnswer: 0,
    solution: "Molar mass of H2SO4 is 98 g/mol, so mass = 0.5 * 98 = 49 g.",
    difficulty: "Easy",
  },
  {
    id: 2,
    topic: "Periodic Table",
    question: "Which element has the highest first ionization energy?",
    options: ["F", "Ne", "O", "N"],
    correctAnswer: 1,
    solution: "Neon has the highest ionization energy thanks to its complete shell.",
    difficulty: "Medium",
  },
  {
    id: 3,
    topic: "Chemical Bonding",
    question: "The shape of XeF4 is:",
    options: ["Tetrahedral", "Square planar", "Octahedral", "Square pyramidal"],
    correctAnswer: 1,
    solution: "Xe uses sp3d2 hybridisation with four bonds and two lone pairs, giving square planar shape.",
    difficulty: "Medium",
  },
  {
    id: 4,
    topic: "Thermodynamics",
    question: "For N2 + 3H2 -> 2NH3, Delta H = -92 kJ. What is Delta H for NH3 -> 1/2 N2 + 3/2 H2?",
    options: ["+46 kJ", "-46 kJ", "+92 kJ", "-92 kJ"],
    correctAnswer: 0,
    solution: "Reverse and divide the reaction by two, so Delta H = -( -92) / 2 = +46 kJ.",
    difficulty: "Medium",
  },
  {
    id: 5,
    topic: "Equilibrium",
    question:
      "For 2SO2 + O2 -> 2SO3, Kp = 1.7 x 10^24 at 300 K. What happens to Kp if temperature increases?",
    options: ["Kp increases", "Kp decreases", "Kp remains same", "Cannot predict"],
    correctAnswer: 1,
    solution:
      "Forward reaction is exothermic, so increasing temperature favours the reverse direction and Kp decreases.",
    difficulty: "Hard",
  },
  {
    id: 6,
    topic: "Redox",
    question: "In 2Fe3+ + Sn2+ -> 2Fe2+ + Sn4+, the oxidising agent is:",
    options: ["Fe3+", "Sn2+", "Fe2+", "Sn4+"],
    correctAnswer: 0,
    solution: "Fe3+ gets reduced to Fe2+, therefore it acts as the oxidising agent.",
    difficulty: "Easy",
  },
  {
    id: 7,
    topic: "Solutions",
    question: "A 0.1 M solution of K3[Fe(CN)6] (i = 5) will have a freezing point that is:",
    options: ["Higher than pure water", "Lower than pure water", "Same as pure water", "Cannot determine"],
    correctAnswer: 1,
    solution: "Colligative properties depend on particle count; i = 5 gives a large freezing point depression.",
    difficulty: "Medium",
  },
  {
    id: 8,
    topic: "Electrochemistry",
    question: "How many Faradays are required to deposit 1 mole of Al from Al3+?",
    options: ["1 F", "2 F", "3 F", "4 F"],
    correctAnswer: 2,
    solution: "Al3+ + 3e- -> Al, so three moles of electrons (3 F) are needed per mole.",
    difficulty: "Easy",
  },
  {
    id: 9,
    topic: "s-block",
    question: "Which element is commonly used in photoelectric cells?",
    options: ["Na", "K", "Cs", "Li"],
    correctAnswer: 2,
    solution: "Cesium has a very low ionization energy, so it readily emits electrons under light.",
    difficulty: "Medium",
  },
  {
    id: 10,
    topic: "p-block",
    question: "Which noble gas does NOT form compounds?",
    options: ["He", "Xe", "Kr", "Rn"],
    correctAnswer: 0,
    solution: "Helium has the highest ionization energy and does not form stable compounds.",
    difficulty: "Easy",
  },
  {
    id: 11,
    topic: "d-block",
    question: "What is the magnetic moment of [Fe(CN)6]4-?",
    options: ["0 BM", "2.83 BM", "4.90 BM", "5.92 BM"],
    correctAnswer: 0,
    solution: "CN- is a strong-field ligand producing a low-spin Fe2+ complex with all electrons paired.",
    difficulty: "Hard",
  },
  {
    id: 12,
    topic: "Coordination",
    question: "The IUPAC name of [Co(NH3)6]Cl3 is:",
    options: [
      "Hexaamminecobalt(III) chloride",
      "Hexaaminecobaltic chloride",
      "Cobalt hexaammine chloride",
      "Tris(hexaammine)cobalt chloride",
    ],
    correctAnswer: 0,
    solution: "It is a cationic complex; name first, then chloride: hexaamminecobalt(III) chloride.",
    difficulty: "Medium",
  },
  {
    id: 13,
    topic: "GOC",
    question: "Which carbocation is most stable?",
    options: ["CH3+", "(CH3)2CH+", "(CH3)3C+", "C6H5CH2+"],
    correctAnswer: 3,
    solution: "The benzyl carbocation (C6H5CH2+) is resonance stabilised by the aromatic ring.",
    difficulty: "Medium",
  },
  {
    id: 14,
    topic: "Hydrocarbons",
    question: "Ozonolysis of which alkene gives only acetone?",
    options: ["Propene", "2,3-Dimethyl-2-butene", "2-Butene", "1-Butene"],
    correctAnswer: 1,
    solution: "2,3-Dimethyl-2-butene cleaves to two molecules of acetone.",
    difficulty: "Hard",
  },
  {
    id: 15,
    topic: "Alcohols",
    question: "Which alcohol gives immediate turbidity with Lucas reagent?",
    options: ["1-Butanol", "2-Butanol", "2-Methyl-2-propanol", "Methanol"],
    correctAnswer: 2,
    solution: "Tertiary alcohols react instantly in the Lucas test; 2-methyl-2-propanol is tertiary.",
    difficulty: "Easy",
  },
];

const fallbackMockTestQuestions = normalizeLegacyQuestions(
  legacyMockTestQuestions.map((question) => ({
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
    solution: question.solution,
    topic: question.topic,
    difficulty: question.difficulty,
  })),
  {
    sourceType: "chemistry_ch42_fallback",
    defaultDifficulty: 2,
    topicId: 2110,
  },
);

export function ChemistryChapter42() {
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", "topicId", "2110"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/questions?topicId=2110", {
          credentials: 'include',
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch questions");
        }
        const data = await response.json();
        // Handle both array and object response formats
        if (Array.isArray(data)) {
          return data;
        } else if (data && typeof data === 'object' && Array.isArray(data.questions)) {
          return data.questions;
        }
        return [];
      } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const practiceQuestions = dbQuestions?.length ? dbQuestions : fallbackMockTestQuestions;
  const totalQuestions = practiceQuestions.length;
  const maxMarks = totalQuestions * MARKS_PER_QUESTION;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showSolution, setShowSolution] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60);

  useEffect(() => {
    if (totalQuestions === 0) return;
    if (currentQuestion >= totalQuestions) {
      setCurrentQuestion(totalQuestions - 1);
    }
  }, [currentQuestion, totalQuestions]);

  useEffect(() => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowSolution(false);
    setTestCompleted(false);
    setTimeRemaining(45 * 60);
  }, [practiceQuestions]);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    setShowSolution(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowSolution(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setShowSolution(false);
    }
  };

  const submitTest = () => {
    setTestCompleted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    practiceQuestions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    const totalMarks = correct * MARKS_PER_QUESTION;
    return { correct, totalMarks, attempted: Object.keys(userAnswers).length };
  };

  const getPerformanceAnalysis = () => {
    const topicWise: Record<string, { correct: number; total: number }> = {};
    practiceQuestions.forEach((question) => {
      const topic = getPrimaryTopicLabel(question);
      if (!topicWise[topic]) {
        topicWise[topic] = { correct: 0, total: 0 };
      }
      topicWise[topic].total++;
      if (userAnswers[question.id] === question.correctAnswer) {
        topicWise[topic].correct++;
      }
    });
    return topicWise;
  };

  if (totalQuestions === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>No questions available yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We will add the final mock test questions soon. Please check back later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = practiceQuestions[Math.min(currentQuestion, totalQuestions - 1)];
  const progress = totalQuestions ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;
  const topicLabel = getPrimaryTopicLabel(currentQ);
  const difficultyLabel = getDifficultyLabel(currentQ.difficultyLevel);
  const correctOption = currentQ.options.find((option) => option.id === currentQ.correctAnswer);

  if (testCompleted) {
    const { correct, totalMarks, attempted } = calculateScore();
    const percentage = maxMarks ? (totalMarks / maxMarks) * 100 : 0;
    const topicAnalysis = getPerformanceAnalysis();

    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <h1 className="text-4xl font-bold">Test Completed</h1>
            <p className="text-muted-foreground">Here is your performance analysis</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {totalMarks}/{maxMarks}
              </p>
              <p className="text-muted-foreground">{percentage.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {correct}/{attempted}
              </p>
              <p className="text-muted-foreground">
                {attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : 0}% correct
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-600 dark:text-purple-400">Attempted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {attempted}/{totalQuestions}
              </p>
              <p className="text-muted-foreground">
                {((attempted / totalQuestions) * 100).toFixed(0)}% coverage
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              Topic-wise Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(topicAnalysis).map(([topic, data]) => (
              <Card key={topic} className="bg-blue-500/5">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{topic}</span>
                    <Badge variant={data.correct === data.total ? "default" : "secondary"}>
                      {data.correct}/{data.total}
                    </Badge>
                  </div>
                  <Progress value={(data.correct / data.total) * 100} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {percentage >= 80 && (
              <p className="text-green-600 dark:text-green-400">Outstanding work! Keep up the momentum.</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-blue-600 dark:text-blue-400">
                Good effort! Revisit weaker topics to push your score higher.
              </p>
            )}
            {percentage < 60 && (
              <p className="text-orange-600 dark:text-orange-400">
                Keep practicing. Focus on fundamentals and try another mock soon.
              </p>
            )}
            <p>Review every incorrect answer and understand the reasoning.</p>
            <p>Target topics where you scored less than half marks.</p>
            <p>Attempt timed mocks regularly to boost accuracy and speed.</p>
          </CardContent>
        </Card>

        <Button
          onClick={() => {
            setTestCompleted(false);
            setCurrentQuestion(0);
            setUserAnswers({});
            setShowSolution(false);
            setTimeRemaining(45 * 60);
          }}
          className="w-full"
        >
          Retake Test
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 42: Final Mock Test</h1>
          <p className="text-muted-foreground">
            {totalQuestions} questions - {maxMarks} marks - 45 minutes
          </p>
          {questionsLoading && (
            <p className="text-xs text-muted-foreground mt-1">Loading the latest questions...</p>
          )}
        </div>
      </div>

      <Card className="border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">
                Time: {Math.floor(timeRemaining / 60)}:
                {(timeRemaining % 60).toString().padStart(2, "0")}
              </span>
            </div>
            <Badge variant="outline">
              Question {currentQuestion + 1}/{totalQuestions}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              Q{currentQuestion + 1}. {currentQ.questionText}
            </CardTitle>
            <div className="flex gap-2">
              <Badge>{topicLabel}</Badge>
              <Badge variant="secondary">{MARKS_PER_QUESTION} marks</Badge>
              <Badge variant="outline">{difficultyLabel}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {currentQ.options.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all ${
                  userAnswers[currentQ.id] === option.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "hover:border-blue-500/50"
                }`}
                onClick={() => handleAnswerSelect(currentQ.id, option.id)}
              >
                <CardContent className="pt-4 flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${
                      userAnswers[currentQ.id] === option.id
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-muted"
                    }`}
                  >
                    {option.id}.
                  </div>
                  <span>{option.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {showSolution && (
            <Card
              className={`${
                userAnswers[currentQ.id] === currentQ.correctAnswer
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-red-500/10 border-red-500/20"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {userAnswers[currentQ.id] === currentQ.correctAnswer ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-green-600 dark:text-green-400">Correct!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <span className="text-red-600 dark:text-red-400">Incorrect</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Correct Answer: </strong>
                  {correctOption ? `${correctOption.id}. ${correctOption.text}` : "Unavailable"}
                </p>
                <p className="text-sm">
                  <strong>Solution: </strong>
                  {currentQ.solutionDetail}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1">
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSolution((prev) => !prev)}
              className="flex-1"
              disabled={userAnswers[currentQ.id] === undefined}
            >
              {showSolution ? "Hide Solution" : "Show Solution"}
            </Button>
            {currentQuestion < totalQuestions - 1 ? (
              <Button onClick={nextQuestion} className="flex-1">
                Next
              </Button>
            ) : (
              <Button onClick={submitTest} className="flex-1">
                Submit Test
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {practiceQuestions.map((question, idx) => (
              <Button
                key={question.id}
                variant={currentQuestion === idx ? "default" : "outline"}
                onClick={() => {
                  setCurrentQuestion(idx);
                  setShowSolution(false);
                }}
                className={`h-12 ${userAnswers[question.id] ? "bg-green-500/20" : ""}`}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

