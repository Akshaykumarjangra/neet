
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, BookOpen, Award, AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const yearWiseAnalysis = [
  {
    year: "2024",
    totalQuestions: 45,
    distribution: {
      physical: 16,
      inorganic: 12,
      organic: 17
    },
    difficulty: {
      easy: 15,
      medium: 20,
      hard: 10
    },
    topTopics: [
      "Chemical Kinetics (4 questions)",
      "Coordination Chemistry (4 questions)",
      "Aldehydes & Ketones (3 questions)",
      "Electrochemistry (3 questions)",
      "p-Block Elements (3 questions)"
    ]
  },
  {
    year: "2023",
    totalQuestions: 45,
    distribution: {
      physical: 15,
      inorganic: 14,
      organic: 16
    },
    difficulty: {
      easy: 14,
      medium: 22,
      hard: 9
    },
    topTopics: [
      "Chemical Bonding (4 questions)",
      "GOC (4 questions)",
      "Thermodynamics (3 questions)",
      "Transition Elements (3 questions)",
      "Alcohols & Phenols (3 questions)"
    ]
  },
  {
    year: "2022",
    totalQuestions: 45,
    distribution: {
      physical: 17,
      inorganic: 13,
      organic: 15
    },
    difficulty: {
      easy: 16,
      medium: 19,
      hard: 10
    },
    topTopics: [
      "Equilibrium (5 questions)",
      "Hydrocarbons (4 questions)",
      "s-Block Elements (3 questions)",
      "Solutions (3 questions)",
      "Biomolecules (3 questions)"
    ]
  }
];

const highYieldPYQs = [
  {
    topic: "Chemical Kinetics",
    question: "For a first order reaction, the time required for 99% completion is twice the time required for 90% completion. True or False?",
    year: "2024",
    answer: "True",
    explanation: `
For first order reaction: t = (2.303/k) log([A]₀/[A])

For 99% completion: [A] = 0.01[A]₀
t₉₉ = (2.303/k) log(100) = (2.303/k) × 2

For 90% completion: [A] = 0.1[A]₀
t₉₀ = (2.303/k) log(10) = (2.303/k) × 1

Therefore, t₉₉ = 2 × t₉₀ ✓
    `,
    keyPoint: "For first order: t₉₉ = 2 × t₉₀ (universal for all first order reactions)"
  },
  {
    topic: "Coordination Chemistry",
    question: "Which of the following complexes is diamagnetic? [Fe(CN)₆]³⁻ or [Fe(H₂O)₆]³⁺",
    year: "2024",
    answer: "[Fe(CN)₆]³⁻",
    explanation: `
Fe³⁺: 3d⁵ configuration

[Fe(CN)₆]³⁻: CN⁻ is strong field ligand
→ Pairing occurs: t₂g⁶ e_g⁰
→ All electrons paired → Diamagnetic ✓

[Fe(H₂O)₆]³⁺: H₂O is weak field ligand
→ No pairing: t₂g³ e_g²
→ 5 unpaired electrons → Paramagnetic
    `,
    keyPoint: "Strong field ligands cause pairing (low spin), weak field don't (high spin)"
  },
  {
    topic: "Aldehydes & Ketones",
    question: "Which gives positive iodoform test: CH₃COCH₃, CH₃CHO, or C₆H₅CHO?",
    year: "2023",
    answer: "CH₃COCH₃ and CH₃CHO",
    explanation: `
Iodoform test: Requires CH₃CO- or CH₃CH(OH)- group

CH₃COCH₃ (acetone): Has CH₃CO- → Positive ✓
CH₃CHO (acetaldehyde): Has CH₃CO- → Positive ✓
C₆H₅CHO (benzaldehyde): No CH₃CO- → Negative

Yellow precipitate of CHI₃ forms with positive test.
    `,
    keyPoint: "Only methyl ketones or compounds with CH₃CH(OH)- give iodoform test"
  },
  {
    topic: "Electrochemistry",
    question: "Calculate E_cell for Zn|Zn²⁺(0.1M)||Cu²⁺(0.01M)|Cu. Given: E°_cell = 1.10 V",
    year: "2023",
    answer: "1.07 V",
    explanation: `
Nernst Equation: E = E° - (0.059/n) log Q

Reaction: Zn + Cu²⁺ → Zn²⁺ + Cu
n = 2 electrons transferred

Q = [Zn²⁺]/[Cu²⁺] = 0.1/0.01 = 10

E_cell = 1.10 - (0.059/2) log 10
E_cell = 1.10 - (0.059/2) × 1
E_cell = 1.10 - 0.0295
E_cell = 1.07 V ✓
    `,
    keyPoint: "Nernst equation: E = E° - (0.059/n) log Q at 25°C"
  },
  {
    topic: "Chemical Bonding",
    question: "Which has maximum bond angle: NH₃, H₂O, CH₄, or BF₃?",
    year: "2022",
    answer: "BF₃",
    explanation: `
Bond angles:
BF₃: sp² hybridization, trigonal planar → 120° ✓
CH₄: sp³ hybridization, tetrahedral → 109.5°
NH₃: sp³ with 1 lone pair → 107°
H₂O: sp³ with 2 lone pairs → 104.5°

Lone pairs compress bond angles more than bonding pairs.
    `,
    keyPoint: "Bond angle: sp (180°) > sp² (120°) > sp³ (109.5°); lone pairs decrease angle"
  }
];

const commonMistakes = [
  {
    topic: "Mole Concept",
    mistake: "Confusing molarity and molality",
    correct: "Molarity = mol/L (volume), Molality = mol/kg (mass)",
    tip: "Remember: Molality uses mass (both start with 'm')"
  },
  {
    topic: "Thermodynamics",
    mistake: "Wrong sign in ΔG = ΔH - TΔS",
    correct: "It's minus sign, not plus",
    tip: "At high T, entropy term dominates (becomes more important)"
  },
  {
    topic: "Equilibrium",
    mistake: "Using total volume instead of liters in molarity",
    correct: "M = moles/volume(L), not volume(mL)",
    tip: "Always convert mL to L: divide by 1000"
  },
  {
    topic: "Organic Chemistry",
    mistake: "Forgetting geometrical isomerism in cyclic compounds",
    correct: "Cis-trans isomerism exists in rings too",
    tip: "Substituents on same side = cis, opposite = trans"
  },
  {
    topic: "Periodic Trends",
    mistake: "Exceptions in IE and EA trends",
    correct: "N > O (IE), N < O (EA) due to half-filled stability",
    tip: "Remember: half-filled and fully-filled are more stable"
  }
];

const trendAnalysis = {
  increasingTopics: [
    "Chemical Kinetics (increasing 5% yearly)",
    "Coordination Chemistry (increasing 4% yearly)",
    "Environmental Chemistry (new focus area)"
  ],
  decreasingTopics: [
    "Mole Concept basics (decreasing 3% yearly)",
    "Simple ionic equilibrium (decreasing 2% yearly)"
  ],
  consistentTopics: [
    "Thermodynamics (stable ~12-14%)",
    "Electrochemistry (stable ~10-12%)",
    "GOC (stable ~15-17%)"
  ]
};

export function ChemistryChapter39() {
  const [selectedYear, setSelectedYear] = useState(yearWiseAnalysis[0]);
  const [showingSolution, setShowingSolution] = useState<number | null>(null);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-green-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 39: PYQ Analysis & Trends</h1>
          <p className="text-muted-foreground">Strategic insights from previous year NEET questions</p>
        </div>
      </div>

      <Tabs defaultValue="year-wise" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="year-wise">
            <Target className="h-4 w-4 mr-2" />
            Year-wise Analysis
          </TabsTrigger>
          <TabsTrigger value="high-yield">
            <Award className="h-4 w-4 mr-2" />
            High-Yield PYQs
          </TabsTrigger>
          <TabsTrigger value="mistakes">
            <AlertCircle className="h-4 w-4 mr-2" />
            Common Mistakes
          </TabsTrigger>
          <TabsTrigger value="trends">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="year-wise" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {yearWiseAnalysis.map((year) => (
              <Card
                key={year.year}
                className={`cursor-pointer transition-all ${
                  selectedYear.year === year.year
                    ? "border-blue-500 shadow-lg"
                    : "hover:border-blue-500/50"
                }`}
                onClick={() => setSelectedYear(year)}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{year.year}</CardTitle>
                  <Badge variant="secondary">{year.totalQuestions} Questions</Badge>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle>NEET {selectedYear.year} - Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Subject Distribution</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Physical Chemistry</span>
                      <Badge>{selectedYear.distribution.physical} questions</Badge>
                    </div>
                    <Progress value={(selectedYear.distribution.physical / 45) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Inorganic Chemistry</span>
                      <Badge variant="secondary">{selectedYear.distribution.inorganic} questions</Badge>
                    </div>
                    <Progress value={(selectedYear.distribution.inorganic / 45) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Organic Chemistry</span>
                      <Badge variant="outline">{selectedYear.distribution.organic} questions</Badge>
                    </div>
                    <Progress value={(selectedYear.distribution.organic / 45) * 100} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Difficulty Level</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Card className="bg-green-500/10 border-green-500/20">
                    <CardContent className="pt-4 text-center">
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {selectedYear.difficulty.easy}
                      </p>
                      <p className="text-sm text-muted-foreground">Easy</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-500/10 border-yellow-500/20">
                    <CardContent className="pt-4 text-center">
                      <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                        {selectedYear.difficulty.medium}
                      </p>
                      <p className="text-sm text-muted-foreground">Medium</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-500/10 border-red-500/20">
                    <CardContent className="pt-4 text-center">
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                        {selectedYear.difficulty.hard}
                      </p>
                      <p className="text-sm text-muted-foreground">Hard</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Most Asked Topics</h3>
                <div className="space-y-2">
                  {selectedYear.topTopics.map((topic, idx) => (
                    <Card key={idx} className="border-purple-500/20">
                      <CardContent className="pt-4 flex items-center gap-2">
                        <Badge variant="outline">{idx + 1}</Badge>
                        <span className="text-sm">{topic}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high-yield" className="space-y-6">
          {highYieldPYQs.map((pyq, idx) => (
            <Card key={idx} className="border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    {pyq.topic}
                  </CardTitle>
                  <Badge>NEET {pyq.year}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium">{pyq.question}</p>

                <Button
                  variant="outline"
                  onClick={() => setShowingSolution(showingSolution === idx ? null : idx)}
                >
                  {showingSolution === idx ? "Hide Solution" : "Show Answer & Solution"}
                </Button>

                {showingSolution === idx && (
                  <Card className="bg-green-500/10 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Answer: {pyq.answer}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <pre className="whitespace-pre-wrap font-mono text-sm bg-background/50 p-4 rounded">
                        {pyq.explanation}
                      </pre>
                      <Card className="bg-blue-500/10 border-blue-500/20">
                        <CardContent className="pt-4">
                          <p className="text-sm flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            <span><strong>Key Point:</strong> {pyq.keyPoint}</span>
                          </p>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mistakes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Mistakes to Avoid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {commonMistakes.map((item, idx) => (
                <Card key={idx} className="border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600 dark:text-orange-400">
                      {item.topic}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-600 dark:text-red-400">Mistake:</p>
                        <p className="text-sm">{item.mistake}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-600 dark:text-green-400">Correct:</p>
                        <p className="text-sm">{item.correct}</p>
                      </div>
                    </div>
                    <Card className="bg-blue-500/10 border-blue-500/20 mt-2">
                      <CardContent className="pt-3">
                        <p className="text-sm"><strong>Tip:</strong> {item.tip}</p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">Increasing Trend Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendAnalysis.increasingTopics.map((topic, idx) => (
                <Card key={idx} className="bg-green-500/10">
                  <CardContent className="pt-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-sm">{topic}</span>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400">Consistent Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendAnalysis.consistentTopics.map((topic, idx) => (
                <Card key={idx} className="bg-blue-500/10">
                  <CardContent className="pt-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">{topic}</span>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Decreasing Trend Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendAnalysis.decreasingTopics.map((topic, idx) => (
                <Card key={idx} className="bg-red-500/10">
                  <CardContent className="pt-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="text-sm">{topic}</span>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle>Strategy Based on PYQ Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Focus heavily on Chemical Kinetics and Coordination Chemistry (increasing trends)</p>
          <p>✓ Don't skip Thermodynamics and Electrochemistry (consistent high-weightage)</p>
          <p>✓ Practice minimum 200 PYQs from last 5 years</p>
          <p>✓ Identify your weak topics from mistake analysis</p>
          <p>✓ Solve at least 50 high-yield PYQs in the last 2 weeks</p>
          <p className="text-purple-600 dark:text-purple-400 font-semibold mt-3">
            PYQ analysis reveals: 70% questions are repeated concepts from last 10 years!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
