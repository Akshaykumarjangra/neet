import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sprout, CheckCircle2, XCircle, Brain, Lightbulb, TrendingUp } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter30() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which hormone is known as the 'stress hormone' in plants?",
      options: ["Auxin", "Gibberellin", "Abscisic acid", "Cytokinin"],
      correctAnswer: "C",
      explanation: "Abscisic acid (ABA) is called the stress hormone as it helps plants respond to stress conditions like drought by closing stomata and promoting seed dormancy."
    },
    {
      id: 2,
      question: "Auxin promotes cell elongation by:",
      options: [
        "Increasing cell wall rigidity",
        "Decreasing cell turgor pressure",
        "Increasing cell wall plasticity via acid growth theory",
        "Decreasing water uptake"
      ],
      correctAnswer: "C",
      explanation: "According to the acid growth theory, auxin increases cell wall plasticity by activating H+ pumps, which lowers pH and activates enzymes that loosen cell walls."
    },
    {
      id: 3,
      question: "Which plant hormone is responsible for breaking seed dormancy?",
      options: ["Abscisic acid", "Ethylene", "Gibberellin", "Auxin"],
      correctAnswer: "C",
      explanation: "Gibberellin breaks seed dormancy by stimulating the production of enzymes like α-amylase that mobilize food reserves during germination."
    },
    {
      id: 4,
      question: "Richmond-Lang effect is associated with:",
      options: ["Auxin", "Cytokinin", "Ethylene", "Gibberellin"],
      correctAnswer: "B",
      explanation: "Richmond-Lang effect demonstrates that cytokinins delay senescence. Leaves treated with cytokinin remain green longer than untreated leaves."
    },
    {
      id: 5,
      question: "Bolting in rosette plants is promoted by:",
      options: ["Auxin", "Gibberellin", "Cytokinin", "ABA"],
      correctAnswer: "B",
      explanation: "Gibberellin promotes bolting (rapid stem elongation) in rosette plants and long-day plants, enabling them to flower."
    },
    {
      id: 6,
      question: "Ethylene is used commercially to:",
      options: [
        "Promote root growth",
        "Delay fruit ripening",
        "Accelerate fruit ripening",
        "Induce seed dormancy"
      ],
      correctAnswer: "C",
      explanation: "Ethylene is the fruit ripening hormone. It's used commercially to ripen fruits like bananas and tomatoes during transport and storage."
    },
    {
      id: 7,
      question: "Apical dominance is maintained by:",
      options: ["High auxin in apical bud", "High cytokinin in lateral buds", "Low auxin in apical bud", "High ethylene production"],
      correctAnswer: "A",
      explanation: "High auxin concentration in the apical bud suppresses lateral bud growth, maintaining apical dominance. Removing the apical bud allows lateral buds to grow."
    },
    {
      id: 8,
      question: "The 'foolish seedling' disease in rice is caused by:",
      options: ["Excessive auxin", "Excessive gibberellin", "Fungal toxin producing gibberellin", "Lack of cytokinin"],
      correctAnswer: "C",
      explanation: "The fungus Gibberella fujikuroi produces excessive gibberellin, causing rice seedlings to grow abnormally tall and weak (bakanae disease)."
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
            <TrendingUp className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Plant Hormones and Growth Regulators</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding chemical messengers that control plant growth and development
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
              <p>Understand types and functions of plant hormones</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn mechanism of hormone action</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master hormone interactions and synergism</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Explore commercial applications</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="auxins" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="auxins">Auxins</TabsTrigger>
          <TabsTrigger value="gibberellins">Gibberellins</TabsTrigger>
          <TabsTrigger value="others">Other Hormones</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Auxins */}
        <TabsContent value="auxins" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Auxins (IAA - Indole-3-Acetic Acid)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Functions of Auxins</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>✓ <strong>Cell elongation</strong> - Promotes growth in stems</li>
                    <li>✓ <strong>Apical dominance</strong> - Suppresses lateral bud growth</li>
                    <li>✓ <strong>Root initiation</strong> - Promotes adventitious root formation</li>
                    <li>✓ <strong>Prevents abscission</strong> - Delays leaf and fruit fall</li>
                    <li>✓ <strong>Parthenocarpy</strong> - Seedless fruit formation</li>
                    <li>✓ <strong>Phototropism</strong> - Growth towards light</li>
                    <li>✓ <strong>Geotropism</strong> - Growth response to gravity</li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Discovery</h3>
                  <div className="space-y-3 text-sm text-blue-800">
                    <p><strong>Charles Darwin (1880):</strong> Observed phototropism in canary grass coleoptiles</p>
                    <p><strong>F.W. Went (1928):</strong> Isolated auxin from oat coleoptiles and demonstrated its diffusible nature</p>
                    <p><strong>Went's Experiment:</strong> Used agar blocks to show growth-promoting substance could diffuse</p>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded">
                    <p className="text-xs font-semibold">Avena Curvature Test</p>
                    <p className="text-xs mt-1">Used to bioassay auxin concentration by measuring coleoptile curvature</p>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Acid Growth Theory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                      <h4 className="font-semibold mb-2">Mechanism of Auxin Action:</h4>
                      <ol className="text-sm space-y-2 ml-4">
                        <li>1. Auxin activates H+-ATPase pumps in plasma membrane</li>
                        <li>2. H+ ions are pumped into cell wall, lowering pH to ~5</li>
                        <li>3. Acidic pH activates expansins (wall-loosening enzymes)</li>
                        <li>4. Cell wall becomes plastic and extensible</li>
                        <li>5. Turgor pressure causes cell elongation</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Synthetic Auxins - Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">2,4-D</h4>
                      <p className="text-sm text-purple-800">Herbicide (weedicide) - kills dicot weeds selectively</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-2">NAA</h4>
                      <p className="text-sm text-amber-800">Prevents fruit and leaf drop, rooting hormone</p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg">
                      <h4 className="font-semibold text-rose-900 mb-2">IBA</h4>
                      <p className="text-sm text-rose-800">Root initiation in stem cuttings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gibberellins */}
        <TabsContent value="gibberellins" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Gibberellins (GA3 - Gibberellic Acid)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-900 mb-2">Discovery</h4>
                <p className="text-sm text-orange-800">
                  Discovered by Japanese scientist E. Kurosawa (1926) while studying bakanae (foolish seedling) disease
                  of rice caused by fungus Gibberella fujikuroi.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Functions</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>✓ <strong>Stem elongation</strong> - Promotes internodal growth</li>
                    <li>✓ <strong>Bolting</strong> - Elongation in rosette plants</li>
                    <li>✓ <strong>Breaks seed dormancy</strong> - Promotes germination</li>
                    <li>✓ <strong>Induces flowering</strong> - In long-day plants</li>
                    <li>✓ <strong>Parthenocarpy</strong> - Seedless fruits</li>
                    <li>✓ <strong>α-amylase synthesis</strong> - Mobilizes food reserves</li>
                    <li>✓ <strong>Delays senescence</strong> - In leaves and fruits</li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Applications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Brewing Industry</h4>
                      <p className="text-xs mt-1">Speeds up malting process by promoting α-amylase production</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Sugarcane</h4>
                      <p className="text-xs mt-1">Increases stem length, resulting in higher sugar yield</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Grapes</h4>
                      <p className="text-xs mt-1">Elongates axis, produces larger seedless grapes</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Dwarf Plants</h4>
                      <p className="text-xs mt-1">Overcomes genetic dwarfism by promoting growth</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Mechanism in Seed Germination</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <ol className="text-sm space-y-2">
                      <li><strong>1.</strong> Gibberellin is produced in embryo during germination</li>
                      <li><strong>2.</strong> It diffuses to aleurone layer of endosperm</li>
                      <li><strong>3.</strong> Stimulates synthesis of hydrolytic enzymes (α-amylase, proteases)</li>
                      <li><strong>4.</strong> Enzymes break down stored starch → maltose → glucose</li>
                      <li><strong>5.</strong> Proteins → amino acids; Lipids → fatty acids</li>
                      <li><strong>6.</strong> Provides energy and building blocks for seedling growth</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Hormones */}
        <TabsContent value="others" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Cytokinins</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-cyan-50 rounded-lg border-2 border-cyan-200">
                  <h4 className="font-semibold text-cyan-900 mb-3">Discovery & Nature</h4>
                  <ul className="text-sm text-cyan-800 space-y-2">
                    <li>• Discovered by F. Skoog and C.O. Miller (1955)</li>
                    <li>• First isolated from coconut milk (zeatin)</li>
                    <li>• Synthetic: Kinetin, BAP (benzyl amino purine)</li>
                    <li>• Promote cell division (cytokinesis)</li>
                  </ul>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border-2 border-teal-200">
                  <h4 className="font-semibold text-teal-900 mb-3">Functions</h4>
                  <ul className="text-sm text-teal-800 space-y-2">
                    <li>✓ Promote cell division</li>
                    <li>✓ Delay senescence (Richmond-Lang effect)</li>
                    <li>✓ Break apical dominance</li>
                    <li>✓ Promote lateral bud growth</li>
                    <li>✓ Promote chloroplast development</li>
                    <li>✓ Overcome seed dormancy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Ethylene (C₂H₄)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <p className="text-sm text-orange-900">
                  <strong>Only gaseous plant hormone</strong> - Discovered by H.H. Cousins (1910)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Functions</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>✓ Fruit ripening (climacteric rise)</li>
                    <li>✓ Promotes senescence</li>
                    <li>✓ Promotes abscission</li>
                    <li>✓ Triple response in pea seedlings</li>
                    <li>✓ Breaking seed dormancy</li>
                    <li>✓ Root hair initiation</li>
                  </ul>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">Applications</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Artificial ripening of fruits</li>
                    <li>• Synchronize fruit set in pineapple</li>
                    <li>• Promote flowering in mango</li>
                    <li>• Ethephon: synthetic ethylene releaser</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Abscisic Acid (ABA) - Stress Hormone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Functions</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>✓ Closes stomata during drought (stress)</li>
                    <li>✓ Induces seed dormancy</li>
                    <li>✓ Inhibits seed germination</li>
                    <li>✓ Promotes leaf abscission</li>
                    <li>✓ Antagonistic to gibberellins</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Mechanism in Stomatal Closure</h4>
                  <ol className="text-sm text-indigo-800 space-y-1">
                    <li>1. ABA binds to receptors on guard cells</li>
                    <li>2. Increases Ca²⁺ concentration</li>
                    <li>3. K⁺ ions move out of guard cells</li>
                    <li>4. Water follows by osmosis</li>
                    <li>5. Guard cells become flaccid, stomata close</li>
                  </ol>
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
