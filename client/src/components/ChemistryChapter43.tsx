
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Brain, Target, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const speedStrategies = [
  {
    category: "Time Management",
    strategies: [
      {
        title: "3-Pass Strategy",
        description: "Optimize your question-solving sequence",
        steps: [
          "Pass 1 (20 min): Solve all EASY questions you know instantly",
          "Pass 2 (15 min): Solve MEDIUM questions with quick calculations",
          "Pass 3 (10 min): Attempt HARD questions or unsure ones",
          "Reserve 0 min: Mark for review, trust your first instinct"
        ],
        impact: "Maximize score by securing easy marks first"
      },
      {
        title: "1-Minute Rule",
        description: "Don't spend more than 1 minute on any question in first pass",
        steps: [
          "If you can't solve in 60 seconds, mark for review",
          "Move to next question immediately",
          "Don't get stuck on difficult questions early",
          "Return only if time permits"
        ],
        impact: "Prevents time wastage on difficult questions"
      },
      {
        title: "Section Timing",
        description: "Allocate time per section strategically",
        steps: [
          "Physics: 12-13 minutes (harder, leave buffer)",
          "Chemistry: 10-11 minutes (fastest section)",
          "Biology: 12-13 minutes (reading heavy)",
          "Buffer: 5-7 minutes for review"
        ],
        impact: "Balanced approach ensures no section is rushed"
      }
    ]
  },
  {
    category: "Question Selection",
    strategies: [
      {
        title: "Cherry Picking",
        description: "Identify and solve high-confidence questions first",
        steps: [
          "Scan all 15 questions in a section quickly (30 seconds)",
          "Identify 8-10 questions you're 100% confident about",
          "Solve these first to build momentum and secure marks",
          "Then tackle remaining questions strategically"
        ],
        impact: "Guarantees minimum score and reduces exam stress"
      },
      {
        title: "Difficulty Recognition",
        description: "Quickly identify question difficulty level",
        steps: [
          "Easy: Direct formula application, one-step problems",
          "Medium: Multi-step, concept combination, moderate calculation",
          "Hard: Complex calculations, tricky concepts, lengthy",
          "Skip hard questions in Pass 1, return if time permits"
        ],
        impact: "Efficient time allocation based on difficulty"
      },
      {
        title: "Elimination Technique",
        description: "Use smart guessing when needed",
        steps: [
          "Eliminate 2 obviously wrong options immediately",
          "Between remaining 2, use logic or educated guess",
          "Mark for review if completely clueless",
          "Attempt if you can eliminate even 1 option"
        ],
        impact: "Increases chances from 25% to 50% on guesses"
      }
    ]
  },
  {
    category: "Calculation Speed",
    strategies: [
      {
        title: "Approximation Mastery",
        description: "Use approximations to save calculation time",
        steps: [
          "Round numbers to nearest significant figures",
          "Use √2 ≈ 1.4, √3 ≈ 1.7, π ≈ 3.14",
          "Cancel common factors before multiplying",
          "Use scientific notation for large/small numbers"
        ],
        impact: "Reduces calculation time by 30-40%"
      },
      {
        title: "Mental Math Tricks",
        description: "Fast calculation without calculator",
        steps: [
          "Multiply by 5: Multiply by 10, then divide by 2",
          "Multiply by 25: Multiply by 100, then divide by 4",
          "Squaring numbers ending in 5: (n×(n+1)) followed by 25",
          "Percentage: Convert to fraction for quick calculation"
        ],
        impact: "Solve numerical problems 2x faster"
      },
      {
        title: "Unit Cancellation",
        description: "Skip unit conversion calculations when possible",
        steps: [
          "Check if answer choices have different units",
          "If same units, solve in given units directly",
          "If different, convert only at the end",
          "Use dimensional analysis to verify answer"
        ],
        impact: "Saves 20-30 seconds per numerical problem"
      }
    ]
  }
];

const commonMistakes = [
  {
    mistake: "Reading the full question",
    fix: "Read question stem first, then options. Often options give hints about what's being asked.",
    timeWasted: "10-15 sec per question"
  },
  {
    mistake: "Overthinking easy questions",
    fix: "Trust your first instinct on easy questions. Don't second-guess yourself.",
    timeWasted: "30-60 sec per question"
  },
  {
    mistake: "Not using rough work space efficiently",
    fix: "Organize rough work by question number. Use abbreviations and symbols.",
    timeWasted: "Accumulated 2-3 minutes"
  },
  {
    mistake: "Marking too many for review",
    fix: "Mark maximum 10-12 questions. More than that means you won't have time to review.",
    timeWasted: "Causes panic in final minutes"
  },
  {
    mistake: "Changing correct answers",
    fix: "Change answer ONLY if you're 100% sure you made a mistake. First instinct is usually correct.",
    timeWasted: "Loses sure-shot marks"
  }
];

const quickRecallTricks = [
  {
    topic: "Periodic Table Trends",
    trick: "PANIC for trend direction",
    explanation: "P-ower (IE), A-ttraction (EN), N-uclear charge - Increase across period; I-onic size, C-haracter - decrease",
    example: "Quick recall: IE increases left to right, decreases top to bottom"
  },
  {
    topic: "Organic Priority",
    trick: "ACID > All others",
    explanation: "Carboxylic Acid > Ester > Amide > Aldehyde > Ketone > Alcohol > Amine",
    example: "For naming, highest priority group becomes suffix"
  },
  {
    topic: "Strong Acids",
    trick: "HI helps (H)im",
    explanation: "HI > HBr > HCl > HF (acidity order of halogen acids)",
    example: "Larger halogen = stronger acid"
  },
  {
    topic: "Gibbs Energy",
    trick: "Negative G is GOOD",
    explanation: "ΔG < 0 = spontaneous (good to go), ΔG > 0 = non-spontaneous",
    example: "If ΔG = -ve, reaction proceeds forward spontaneously"
  },
  {
    topic: "Nernst Equation Direction",
    trick: "Q up, E down",
    explanation: "If Q increases, E decreases (inverse relationship)",
    example: "E = E° - (0.059/n)logQ"
  }
];

export function ChemistryChapter43() {
  const [selectedCategory, setSelectedCategory] = useState(speedStrategies[0].category);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 43: Ultimate Speed Strategies</h1>
          <p className="text-muted-foreground">Master time management and maximize your NEET score</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-2xl">⚡ The 45-Minute Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg">NEET Chemistry: 45 questions in 45 minutes = 1 minute per question</p>
          <p className="text-sm text-muted-foreground">
            But with smart strategies, you can solve easy questions in 20-30 seconds, leaving more time for difficult ones!
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <Badge variant="secondary" className="p-3 justify-center">
              <Clock className="h-4 w-4 mr-2" />
              Easy: 20-30 sec
            </Badge>
            <Badge variant="secondary" className="p-3 justify-center">
              <Brain className="h-4 w-4 mr-2" />
              Medium: 40-60 sec
            </Badge>
            <Badge variant="secondary" className="p-3 justify-center">
              <Target className="h-4 w-4 mr-2" />
              Hard: 60-90 sec
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strategies">
            <Zap className="h-4 w-4 mr-2" />
            Speed Strategies
          </TabsTrigger>
          <TabsTrigger value="mistakes">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Avoid Mistakes
          </TabsTrigger>
          <TabsTrigger value="tricks">
            <Brain className="h-4 w-4 mr-2" />
            Quick Recall
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {speedStrategies.map((category) => (
              <Card
                key={category.category}
                className={`cursor-pointer transition-all ${
                  selectedCategory === category.category
                    ? "border-blue-500 shadow-lg"
                    : "hover:border-blue-500/50"
                }`}
                onClick={() => setSelectedCategory(category.category)}
              >
                <CardContent className="pt-6 text-center">
                  <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-semibold">{category.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            {speedStrategies
              .find((cat) => cat.category === selectedCategory)
              ?.strategies.map((strategy, idx) => (
                <Card key={idx} className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      {strategy.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {strategy.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                    <Card className="bg-green-500/10 border-green-500/20">
                      <CardContent className="pt-4">
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          💡 Impact: {strategy.impact}
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="mistakes" className="space-y-4">
          <Card className="bg-red-500/10 border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Common Time-Wasting Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Avoiding these mistakes can save you 5-10 minutes in the exam - enough to attempt 5-10 more questions!
              </p>
            </CardContent>
          </Card>

          {commonMistakes.map((item, idx) => (
            <Card key={idx} className="border-orange-500/20">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      ✗
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-red-600 dark:text-red-400 mb-1">{item.mistake}</p>
                      <Badge variant="outline" className="text-xs">
                        Time Wasted: {item.timeWasted}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 ml-9">
                    <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">{item.fix}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tricks" className="space-y-4">
          {quickRecallTricks.map((trick, idx) => (
            <Card key={idx} className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-500" />
                  {trick.topic}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Badge className="mb-2">Memory Trick</Badge>
                  <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    "{trick.trick}"
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-1"><strong>Explanation:</strong></p>
                  <p className="text-sm">{trick.explanation}</p>
                </div>
                <Card className="bg-purple-500/10">
                  <CardContent className="pt-4">
                    <p className="text-sm"><strong>Example:</strong> {trick.example}</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle>🎯 Final Speed Strategy Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Use 3-pass strategy (Easy → Medium → Hard)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Apply 1-minute rule strictly</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Cherry-pick high-confidence questions first</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Use approximations for numerical problems</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Eliminate wrong options before guessing</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Trust first instinct, avoid changing answers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
