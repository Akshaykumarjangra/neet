
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Target, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

const mockTestQuestions = [
  {
    id: 1,
    topic: "Mole Concept",
    question: "What is the mass of 0.5 moles of H₂SO₄? (H=1, S=32, O=16)",
    options: ["49 g", "98 g", "147 g", "196 g"],
    correctAnswer: 0,
    solution: "Molar mass of H₂SO₄ = 2(1) + 32 + 4(16) = 98 g/mol. Mass = 0.5 × 98 = 49 g",
    difficulty: "Easy",
    marks: 4
  },
  {
    id: 2,
    topic: "Periodic Table",
    question: "Which element has the highest first ionization energy?",
    options: ["F", "Ne", "O", "N"],
    correctAnswer: 1,
    solution: "Ne has highest IE (noble gas, stable configuration). F has highest IE among reactive elements.",
    difficulty: "Medium",
    marks: 4
  },
  {
    id: 3,
    topic: "Chemical Bonding",
    question: "The shape of XeF₄ is:",
    options: ["Tetrahedral", "Square planar", "Octahedral", "Square pyramidal"],
    correctAnswer: 1,
    solution: "Xe: sp³d² hybridization, 4 bond pairs + 2 lone pairs = square planar shape",
    difficulty: "Medium",
    marks: 4
  },
  {
    id: 4,
    topic: "Thermodynamics",
    question: "For the reaction: N₂ + 3H₂ → 2NH₃, ΔH = -92 kJ. What is ΔH for NH₃ → ½N₂ + 3/2H₂?",
    options: ["+46 kJ", "-46 kJ", "+92 kJ", "-92 kJ"],
    correctAnswer: 0,
    solution: "Reverse reaction and divide by 2: ΔH = -(-92)/2 = +46 kJ",
    difficulty: "Medium",
    marks: 4
  },
  {
    id: 5,
    topic: "Equilibrium",
    question: "For reaction: 2SO₂ + O₂ ⇌ 2SO₃, Kp = 1.7 × 10¹² at 300K. What happens if we increase temperature?",
    options: ["Kp increases", "Kp decreases", "Kp remains same", "Cannot predict"],
    correctAnswer: 1,
    solution: "Forward reaction is exothermic (high Kp). Increase T favors backward reaction, Kp decreases.",
    difficulty: "Hard",
    marks: 4
  },
  {
    id: 6,
    topic: "Redox",
    question: "In the reaction: 2Fe³⁺ + Sn²⁺ → 2Fe²⁺ + Sn⁴⁺, the oxidizing agent is:",
    options: ["Fe³⁺", "Sn²⁺", "Fe²⁺", "Sn⁴⁺"],
    correctAnswer: 0,
    solution: "Fe³⁺ gets reduced to Fe²⁺ (gains electrons), so it's the oxidizing agent.",
    difficulty: "Easy",
    marks: 4
  },
  {
    id: 7,
    topic: "Solutions",
    question: "0.1 M solution of K₄[Fe(CN)₆] will have freezing point (van't Hoff factor i = 5):",
    options: ["Higher than pure water", "Lower than pure water", "Same as pure water", "Cannot determine"],
    correctAnswer: 1,
    solution: "Depression in freezing point: ΔTf = i·Kf·m. Since i = 5, significant depression occurs.",
    difficulty: "Medium",
    marks: 4
  },
  {
    id: 8,
    topic: "Electrochemistry",
    question: "How many Faradays are required to deposit 1 mole of Al from Al³⁺ solution?",
    options: ["1 F", "2 F", "3 F", "4 F"],
    correctAnswer: 2,
    solution: "Al³⁺ + 3e⁻ → Al. 3 moles of electrons = 3 Faradays per mole of Al",
    difficulty: "Easy",
    marks: 4
  },
  {
    id: 9,
    topic: "s-block",
    question: "Which compound is used in photoelectric cells?",
    options: ["NaCl", "KCl", "Cs", "Li"],
    correctAnswer: 2,
    solution: "Cs (caesium) has lowest ionization energy, easily emits electrons when light falls.",
    difficulty: "Medium",
    marks: 4
  },
  {
    id: 10,
    topic: "p-block",
    question: "Which noble gas does NOT form compounds?",
    options: ["He", "Xe", "Kr", "Rn"],
    correctAnswer: 0,
    solution: "He has highest ionization energy and smallest size, doesn't form compounds. Xe, Kr, Rn form fluorides.",
    difficulty: "Easy",
    marks: 4
  },
  {
    id: 11,
    topic: "d-block",
    question: "The magnetic moment of [Fe(CN)₆]⁴⁻ is:",
    options: ["0 BM", "2.83 BM", "4.90 BM", "5.92 BM"],
    correctAnswer: 0,
    solution: "Fe²⁺ (d⁶), CN⁻ is strong field → low spin → all paired → μ = 0 BM (diamagnetic)",
    difficulty: "Hard",
    marks: 4
  },
  {
    id: 12,
    topic: "Coordination",
    question: "IUPAC name of [Co(NH₃)₆]Cl₃ is:",
    options: [
      "Hexaamminecobalt(III) chloride",
      "Hexaaminecobaltic chloride",
      "Cobalt hexaammine chloride",
      "Tris(hexaammine)cobalt chloride"
    ],
    correctAnswer: 0,
    solution: "Cation: hexaamminecobalt(III), anion: chloride. Oxidation state: +3",
    difficulty: "Medium",
    marks: 4
  },
  {
    id: 13,
    topic: "GOC",
    question: "Which carbocation is most stable?",
    options: ["CH₃⁺", "(CH₃)₂CH⁺", "(CH₃)₃C⁺", "C₆H₅CH₂⁺"],
    correctAnswer: 3,
    solution: "Benzyl carbocation (C₆H₅CH₂⁺) - resonance stabilized by benzene ring, most stable.",
    difficulty: "Medium",
    marks: 4
  },
  {
    id: 14,
    topic: "Hydrocarbons",
    question: "Ozonolysis of an alkene gives only acetone. The alkene is:",
    options: ["Propene", "2,3-Dimethyl-2-butene", "2-Butene", "1-Butene"],
    correctAnswer: 1,
    solution: "(CH₃)₂C=C(CH₃)₂ + O₃ → 2(CH₃)₂CO (only acetone formed)",
    difficulty: "Hard",
    marks: 4
  },
  {
    id: 15,
    topic: "Alcohols",
    question: "Which alcohol gives immediate turbidity with Lucas reagent?",
    options: ["1-Butanol", "2-Butanol", "2-Methyl-2-propanol", "Methanol"],
    correctAnswer: 2,
    solution: "3° alcohols react immediately with Lucas reagent (ZnCl₂/HCl). 2-Methyl-2-propanol is 3°.",
    difficulty: "Easy",
    marks: 4
  }
];

export function ChemistryChapter42() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({});
  const [showSolution, setShowSolution] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes

  const handleAnswerSelect = (answerIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
    setShowSolution(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < mockTestQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowSolution(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowSolution(false);
    }
  };

  const submitTest = () => {
    setTestCompleted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    mockTestQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correct++;
        total += q.marks;
      }
    });
    return { correct, total, attempted: Object.keys(userAnswers).length };
  };

  const getPerformanceAnalysis = () => {
    const topicWise: {[key: string]: {correct: number, total: number}} = {};
    mockTestQuestions.forEach((q, idx) => {
      if (!topicWise[q.topic]) {
        topicWise[q.topic] = { correct: 0, total: 0 };
      }
      topicWise[q.topic].total++;
      if (userAnswers[idx] === q.correctAnswer) {
        topicWise[q.topic].correct++;
      }
    });
    return topicWise;
  };

  const currentQ = mockTestQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockTestQuestions.length) * 100;

  if (testCompleted) {
    const { correct, total, attempted } = calculateScore();
    const percentage = (total / (mockTestQuestions.length * 4)) * 100;
    const topicAnalysis = getPerformanceAnalysis();

    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <h1 className="text-4xl font-bold">Test Completed! 🎉</h1>
            <p className="text-muted-foreground">Here's your performance analysis</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{total}/60</p>
              <p className="text-muted-foreground">{percentage.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{correct}/{attempted}</p>
              <p className="text-muted-foreground">
                {attempted > 0 ? ((correct/attempted) * 100).toFixed(1) : 0}% correct
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-600 dark:text-purple-400">Attempted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{attempted}/15</p>
              <p className="text-muted-foreground">
                {((attempted/15) * 100).toFixed(0)}% coverage
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
                  <Progress value={(data.correct/data.total) * 100} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {percentage >= 80 && <p className="text-green-600 dark:text-green-400">🎉 Excellent! You're well prepared!</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-blue-600 dark:text-blue-400">👍 Good effort! Focus on weak topics.</p>}
            {percentage < 60 && <p className="text-orange-600 dark:text-orange-400">⚠️ Need more practice. Revise concepts thoroughly.</p>}
            <p className="text-sm">Review all incorrect answers and understand the solutions.</p>
            <p className="text-sm">Focus on topics where you scored less than 50%.</p>
            <p className="text-sm">Attempt more mock tests to improve speed and accuracy.</p>
          </CardContent>
        </Card>

        <Button onClick={() => {
          setTestCompleted(false);
          setCurrentQuestion(0);
          setUserAnswers({});
          setShowSolution(false);
        }} className="w-full">
          Review Solutions
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
          <p className="text-muted-foreground">15 questions - 60 marks - 45 minutes</p>
        </div>
      </div>

      <Card className="border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">
                Time: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <Badge variant="outline">
              Question {currentQuestion + 1}/{mockTestQuestions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              Q{currentQuestion + 1}. {currentQ.question}
            </CardTitle>
            <div className="flex gap-2">
              <Badge>{currentQ.topic}</Badge>
              <Badge variant="secondary">{currentQ.marks} marks</Badge>
              <Badge variant="outline">{currentQ.difficulty}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {currentQ.options.map((option, idx) => (
              <Card
                key={idx}
                className={`cursor-pointer transition-all ${
                  userAnswers[currentQuestion] === idx
                    ? "border-blue-500 bg-blue-500/10"
                    : "hover:border-blue-500/50"
                }`}
                onClick={() => handleAnswerSelect(idx)}
              >
                <CardContent className="pt-4 flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${
                    userAnswers[currentQuestion] === idx ? "border-blue-500 bg-blue-500 text-white" : "border-muted"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{typeof option === "string" ? option : option.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {showSolution && (
            <Card className={`${
              userAnswers[currentQuestion] === currentQ.correctAnswer
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {userAnswers[currentQuestion] === currentQ.correctAnswer ? (
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
                  {String.fromCharCode(65 + currentQ.correctAnswer)}. {currentQ.options[currentQ.correctAnswer]}
                </p>
                <p className="text-sm">
                  <strong>Solution: </strong>
                  {currentQ.solution}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSolution(!showSolution)}
              className="flex-1"
              disabled={userAnswers[currentQuestion] === undefined}
            >
              {showSolution ? "Hide Solution" : "Show Solution"}
            </Button>
            {currentQuestion < mockTestQuestions.length - 1 ? (
              <Button onClick={nextQuestion} className="flex-1">
                Next
              </Button>
            ) : (
              <Button onClick={submitTest} className="flex-1" variant="default">
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
            {mockTestQuestions.map((_, idx) => (
              <Button
                key={idx}
                variant={currentQuestion === idx ? "default" : "outline"}
                onClick={() => {
                  setCurrentQuestion(idx);
                  setShowSolution(false);
                }}
                className={`h-12 ${
                  userAnswers[idx] !== undefined ? "bg-green-500/20" : ""
                }`}
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
