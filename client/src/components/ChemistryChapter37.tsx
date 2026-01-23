
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, Brain, Target, CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const numericalCategories = [
  {
    id: "mole-stoich",
    title: "Mole Concept & Stoichiometry",
    difficulty: "High",
    problems: [
      {
        question: "12g of Mg (atomic mass 24) will produce how many moles of H₂ when reacted with excess HCl?",
        options: [
          "0.25 mol",
          "0.5 mol",
          "1 mol",
          "2 mol"
        ],
        correct: 1,
        solution: `
Step 1: Calculate moles of Mg
Moles of Mg = mass/atomic mass = 12/24 = 0.5 mol

Step 2: Write balanced equation
Mg + 2HCl → MgCl₂ + H₂

Step 3: Use stoichiometry
From equation: 1 mol Mg produces 1 mol H₂
Therefore: 0.5 mol Mg produces 0.5 mol H₂

Answer: 0.5 mol
        `,
        keyPoint: "Always balance the equation first, then use mole ratios"
      },
      {
        question: "What volume of 0.1M H₂SO₄ is required to neutralize 50mL of 0.2M NaOH?",
        options: [
          "25 mL",
          "50 mL",
          "100 mL",
          "200 mL"
        ],
        correct: 1,
        solution: `
Step 1: Write balanced equation
H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O

Step 2: Calculate moles of NaOH
Moles = M × V(L) = 0.2 × 0.05 = 0.01 mol

Step 3: Use stoichiometry
1 mol H₂SO₄ neutralizes 2 mol NaOH
So, 0.01 mol NaOH needs 0.005 mol H₂SO₄

Step 4: Calculate volume
V = moles/M = 0.005/0.1 = 0.05 L = 50 mL

Answer: 50 mL
        `,
        keyPoint: "Remember: n₁M₁V₁ = n₂M₂V₂, where n is the stoichiometric coefficient"
      }
    ]
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics Calculations",
    difficulty: "High",
    problems: [
      {
        question: "Calculate ΔH for: C(s) + O₂(g) → CO₂(g), given: C(s) + ½O₂(g) → CO(g), ΔH = -110 kJ and CO(g) + ½O₂(g) → CO₂(g), ΔH = -283 kJ",
        options: [
          "-173 kJ",
          "-393 kJ",
          "-503 kJ",
          "-676 kJ"
        ],
        correct: 1,
        solution: `
Using Hess's Law:

Equation 1: C(s) + ½O₂(g) → CO(g)        ΔH₁ = -110 kJ
Equation 2: CO(g) + ½O₂(g) → CO₂(g)      ΔH₂ = -283 kJ

Add both equations:
C(s) + ½O₂(g) + CO(g) + ½O₂(g) → CO(g) + CO₂(g)

Simplify (CO cancels):
C(s) + O₂(g) → CO₂(g)

ΔH = ΔH₁ + ΔH₂ = -110 + (-283) = -393 kJ

Answer: -393 kJ
        `,
        keyPoint: "Hess's Law: Total ΔH is sum of individual steps, regardless of path"
      },
      {
        question: "For a reaction, ΔH = -92 kJ and ΔS = -200 J/K. At what temperature will the reaction become non-spontaneous?",
        options: [
          "Below 460 K",
          "Above 460 K",
          "Below 184 K",
          "Above 184 K"
        ],
        correct: 1,
        solution: `
Step 1: Use Gibbs free energy equation
ΔG = ΔH - TΔS

Step 2: At equilibrium (boundary of spontaneity)
ΔG = 0
0 = ΔH - TΔS
TΔS = ΔH

Step 3: Calculate T
Convert ΔS to kJ: -200 J/K = -0.2 kJ/K
T = ΔH/ΔS = -92/(-0.2) = 460 K

Step 4: Interpret
Since ΔH < 0 and ΔS < 0:
- At low T: ΔH dominates → spontaneous
- At high T: TΔS dominates → non-spontaneous
Therefore, non-spontaneous above 460 K

Answer: Above 460 K
        `,
        keyPoint: "For ΔH < 0, ΔS < 0: spontaneous at low T, non-spontaneous at high T"
      }
    ]
  },
  {
    id: "equilibrium",
    title: "Chemical Equilibrium",
    difficulty: "Very High",
    problems: [
      {
        question: "For N₂ + 3H₂ ⇌ 2NH₃, Kc = 0.5 at 400°C. If equilibrium concentrations are [N₂] = 0.2 M, [H₂] = 0.3 M, what is [NH₃]?",
        options: [
          "0.06 M",
          "0.12 M",
          "0.18 M",
          "0.24 M"
        ],
        correct: 0,
        solution: `
Step 1: Write Kc expression
Kc = [NH₃]²/([N₂][H₂]³)

Step 2: Substitute values
0.5 = [NH₃]²/(0.2 × 0.3³)
0.5 = [NH₃]²/(0.2 × 0.027)
0.5 = [NH₃]²/0.0054

Step 3: Solve for [NH₃]
[NH₃]² = 0.5 × 0.0054 = 0.0027
[NH₃] = √0.0027 ≈ 0.06 M

Answer: 0.06 M
        `,
        keyPoint: "Powers in Kc expression match stoichiometric coefficients"
      },
      {
        question: "Calculate pH of 0.01 M HCl solution.",
        options: [
          "1",
          "2",
          "12",
          "13"
        ],
        correct: 1,
        solution: `
Step 1: Recognize HCl is strong acid
HCl → H⁺ + Cl⁻ (complete ionization)

Step 2: Find [H⁺]
[H⁺] = [HCl] = 0.01 M = 10⁻² M

Step 3: Calculate pH
pH = -log[H⁺] = -log(10⁻²) = 2

Answer: 2
        `,
        keyPoint: "For strong acids/bases, complete ionization means [H⁺] = [acid] or [OH⁻] = [base]"
      }
    ]
  },
  {
    id: "electrochemistry",
    title: "Electrochemistry Numericals",
    difficulty: "Very High",
    problems: [
      {
        question: "Calculate E°cell for Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), given E°Zn²⁺/Zn = -0.76 V, E°Cu²⁺/Cu = +0.34 V",
        options: [
          "0.42 V",
          "1.10 V",
          "-0.42 V",
          "-1.10 V"
        ],
        correct: 1,
        solution: `
Step 1: Identify oxidation and reduction
Oxidation: Zn → Zn²⁺ + 2e⁻ (at anode)
Reduction: Cu²⁺ + 2e⁻ → Cu (at cathode)

Step 2: Apply formula
E°cell = E°cathode - E°anode
E°cell = E°Cu²⁺/Cu - E°Zn²⁺/Zn
E°cell = 0.34 - (-0.76)
E°cell = 0.34 + 0.76 = 1.10 V

Answer: 1.10 V
        `,
        keyPoint: "E°cell = E°cathode - E°anode, always positive for spontaneous cell"
      },
      {
        question: "How many Faradays are required to deposit 1 mole of Al from Al³⁺?",
        options: [
          "1 F",
          "2 F",
          "3 F",
          "6 F"
        ],
        correct: 2,
        solution: `
Step 1: Write reduction equation
Al³⁺ + 3e⁻ → Al

Step 2: Identify electrons needed
3 electrons required per Al atom

Step 3: Calculate Faradays
1 Faraday = 1 mole of electrons
For 1 mole Al: 3 moles of electrons = 3 F

Answer: 3 F
        `,
        keyPoint: "Number of Faradays = n × moles of substance, where n is charge on ion"
      }
    ]
  }
];

const solvingStrategies = [
  {
    strategy: "Unit Conversion First",
    description: "Always convert all quantities to SI or consistent units before calculation",
    example: "Convert mL to L, g to kg, °C to K, J to kJ"
  },
  {
    strategy: "Identify Given & Required",
    description: "List what's given and what you need to find",
    example: "Given: mass, M; Required: moles, volume"
  },
  {
    strategy: "Formula Selection",
    description: "Choose the right formula connecting given and required",
    example: "PV = nRT, M = mol/L, pH = -log[H⁺]"
  },
  {
    strategy: "Step-by-Step Calculation",
    description: "Break complex problems into smaller steps",
    example: "Find moles → use stoichiometry → calculate final quantity"
  },
  {
    strategy: "Significant Figures",
    description: "Final answer should match least precise measurement",
    example: "If given 2.5 (2 sf) and 3.456 (4 sf), answer should have 2 sf"
  }
];

export function ChemistryChapter37() {
  const [selectedCategory, setSelectedCategory] = useState(numericalCategories[0].id);
  const [showingSolution, setShowingSolution] = useState<number | null>(null);
  const [attemptedProblems, setAttemptedProblems] = useState<Set<string>>(new Set());

  const currentCategory = numericalCategories.find(c => c.id === selectedCategory)!;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 37: Advanced Numerical Problem Solving</h1>
          <p className="text-muted-foreground">Master high-difficulty numerical problems for NEET</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle>Problem Solving Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {solvingStrategies.map((item, idx) => (
              <Card key={idx} className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                    {idx + 1}. {item.strategy}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>{item.description}</p>
                  <p className="text-muted-foreground italic">Example: {item.example}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {numericalCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              <Badge variant="outline" className="mr-2">{category.difficulty}</Badge>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {numericalCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress in {category.title}</span>
                <span className="text-sm text-muted-foreground">
                  {Array.from(attemptedProblems).filter(p => p.startsWith(category.id)).length}/{category.problems.length}
                </span>
              </div>
              <Progress 
                value={(Array.from(attemptedProblems).filter(p => p.startsWith(category.id)).length / category.problems.length) * 100} 
              />
            </div>

            {category.problems.map((problem, idx) => (
              <Card key={idx} className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    Problem {idx + 1}
                    {attemptedProblems.has(`${category.id}-${idx}`) && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg font-medium">{problem.question}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {problem.options.map((option, oIdx) => (
                      <Button
                        key={oIdx}
                        variant={showingSolution === idx && oIdx === problem.correct ? "default" : "outline"}
                        className={`justify-start ${
                          showingSolution === idx && oIdx === problem.correct
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                        }`}
                        onClick={() => {
                          setShowingSolution(idx);
                          setAttemptedProblems(new Set([...attemptedProblems, `${category.id}-${idx}`]));
                        }}
                      >
                        {String.fromCharCode(65 + oIdx)}. {option}
                      </Button>
                    ))}
                  </div>

                  {showingSolution === idx && (
                    <Card className="bg-green-500/10 border-green-500/20 mt-4">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-600 dark:text-green-400">
                          ✓ Detailed Solution
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <pre className="whitespace-pre-wrap font-mono text-sm bg-background/50 p-4 rounded">
                          {problem.solution}
                        </pre>
                        <Card className="bg-blue-500/10 border-blue-500/20">
                          <CardContent className="pt-4">
                            <p className="text-sm flex items-start gap-2">
                              <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                              <span><strong>Key Point:</strong> {problem.keyPoint}</span>
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
        ))}
      </Tabs>

      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-yellow-500" />
            Practice Tips for Numerical Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Practice at least 50 numerical problems from each category</p>
          <p>✓ Time yourself: aim for 3-4 minutes per problem</p>
          <p>✓ Don't use calculator initially - build mental math skills</p>
          <p>✓ Review wrong answers thoroughly, understand the mistake</p>
          <p>✓ Keep a formula sheet handy for quick reference</p>
          <p className="text-yellow-600 dark:text-yellow-400 font-semibold mt-3">
            Numerical mastery can add 30-40 marks to your Chemistry score!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
