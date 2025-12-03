
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, AlertTriangle, TrendingUp, XCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const errorCategories = [
  {
    id: "conceptual",
    title: "Conceptual Errors",
    icon: "🧠",
    errors: [
      {
        topic: "Mole Concept",
        mistake: "Confusing molarity (M) with molality (m)",
        why: "Both use 'M/m' notation but have different definitions",
        correct: "Molarity = mol/L (volume-based), Molality = mol/kg (mass-based)",
        example: "1 M solution ≠ 1 m solution. For 1 M NaCl: mol/L. For 1 m NaCl: mol/kg solvent"
      },
      {
        topic: "Atomic Structure",
        mistake: "Using Bohr model for multi-electron atoms",
        why: "Bohr model only works for hydrogen-like species",
        correct: "Use quantum mechanical model for multi-electron atoms",
        example: "He atom cannot be explained by Bohr model (electron-electron repulsion ignored)"
      },
      {
        topic: "Chemical Bonding",
        mistake: "Thinking all bonds are either 100% ionic or 100% covalent",
        why: "Most bonds have partial ionic and covalent character",
        correct: "Bonds exist on a spectrum based on electronegativity difference",
        example: "HCl is ~17% ionic, 83% covalent (not purely covalent)"
      },
      {
        topic: "Thermodynamics",
        mistake: "Confusing ΔH with ΔU",
        why: "Both represent energy change but under different conditions",
        correct: "ΔH = qₚ (constant pressure), ΔU = qᵥ (constant volume). ΔH = ΔU + PΔV",
        example: "For reactions with no gas change: ΔH ≈ ΔU. For gas changes: use ΔH = ΔU + ΔngRT"
      },
      {
        topic: "Chemical Kinetics",
        mistake: "Determining order from balanced equation",
        why: "Order is experimental, not theoretical",
        correct: "Order must be determined from rate law obtained experimentally",
        example: "H₂ + I₂ → 2HI is 2nd order (not 1st + 1st from equation alone)"
      }
    ]
  },
  {
    id: "calculation",
    title: "Calculation Errors",
    icon: "🔢",
    errors: [
      {
        topic: "Unit Conversion",
        mistake: "Forgetting to convert units before calculation",
        why: "Using inconsistent units gives wrong answer",
        correct: "Always convert to SI or consistent units first",
        example: "When calculating PV=nRT, ensure P in Pa (or atm), V in m³ (or L), T in K"
      },
      {
        topic: "Significant Figures",
        mistake: "Reporting more digits than measured",
        why: "Violates precision of measurement",
        correct: "Final answer should have same sig figs as least precise measurement",
        example: "2.5 × 3.456 = 8.64 (not 8.640), limited by 2.5 (2 sig figs)"
      },
      {
        topic: "Logarithms",
        mistake: "Confusing log and ln in pH and thermodynamics",
        why: "log = log₁₀, ln = logₑ give different values",
        correct: "pH uses log₁₀, Arrhenius uses ln (or 2.303 log₁₀)",
        example: "pH = -log[H⁺], not -ln[H⁺]. k = Ae^(-Ea/RT) uses natural log"
      },
      {
        topic: "Stoichiometry",
        mistake: "Not identifying limiting reagent",
        why: "Assuming all reactants are consumed completely",
        correct: "Calculate which reagent limits product formation",
        example: "2H₂ + O₂ → 2H₂O. If 3 mol H₂ + 1 mol O₂, H₂ is limiting (need 2 mol O₂)"
      },
      {
        topic: "Redox Reactions",
        mistake: "Incorrect n-factor calculation",
        why: "Counting total atoms instead of change per molecule",
        correct: "n-factor = total change in oxidation number per formula unit",
        example: "For KMnO₄ in acidic: Mn goes +7→+2, n=5 (not 1)"
      }
    ]
  },
  {
    id: "application",
    title: "Application Errors",
    icon: "⚗️",
    errors: [
      {
        topic: "Le Chatelier's Principle",
        mistake: "Applying to non-equilibrium systems",
        why: "Principle only applies at equilibrium",
        correct: "System must be at equilibrium before applying Le Chatelier",
        example: "Adding catalyst doesn't shift equilibrium (only increases rate to reach equilibrium)"
      },
      {
        topic: "Periodic Trends",
        mistake: "Ignoring exceptions in trends",
        why: "Trends have important exceptions",
        correct: "Know exceptions: O vs S (EA), N vs O (IE), noble gases",
        example: "IE: N (941) > O (1314)? No! O > N due to electron pairing in 2p"
      },
      {
        topic: "Organic Mechanisms",
        mistake: "Drawing wrong arrow direction",
        why: "Curved arrows show electron flow, not atom movement",
        correct: "Arrow goes from electron-rich to electron-poor",
        example: "In SN2: Nu⁻ → C (not C → Nu⁻)"
      },
      {
        topic: "Coordination Chemistry",
        mistake: "Confusing coordination number with oxidation state",
        why: "These are independent properties",
        correct: "CN = number of ligand attachments, OS = charge on metal",
        example: "[Fe(CN)₆]⁴⁻: CN=6, OS of Fe = +2 (not +6)"
      },
      {
        topic: "Electrochemistry",
        mistake: "Wrong sign in Nernst equation",
        why: "Confusing oxidation and reduction",
        correct: "E = E° - (0.059/n)log Q for reduction. Q = [products]/[reactants]",
        example: "For Zn²⁺ + 2e⁻ → Zn: Q = 1/[Zn²⁺], E decreases as [Zn²⁺] decreases"
      }
    ]
  }
];

const commonPitfalls = [
  {
    category: "Reading Questions",
    pitfalls: [
      "Not reading 'EXCEPT' or 'NOT' in question stem",
      "Misreading chemical formulas (NH₃ vs NH₄⁺)",
      "Ignoring state symbols (s, l, g, aq)",
      "Missing 'standard conditions' specification"
    ]
  },
  {
    category: "Time Management",
    pitfalls: [
      "Spending too long on one difficult question",
      "Not attempting easier questions first",
      "Forgetting to mark questions for review",
      "Running out of time for calculation-heavy questions"
    ]
  },
  {
    category: "Answer Selection",
    pitfalls: [
      "Choosing first answer that seems right (not checking all options)",
      "Changing correct answers on review",
      "Falling for 'close but wrong' distractors",
      "Not eliminating obviously wrong options first"
    ]
  }
];

export function ChemistryChapter35() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="h-8 w-8 text-orange-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 35: Error Analysis & Common Pitfalls</h1>
          <p className="text-muted-foreground">Learn from common mistakes to avoid them in your exam</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="errors">
            <XCircle className="h-4 w-4 mr-2" />
            Common Errors
          </TabsTrigger>
          <TabsTrigger value="pitfalls">
            <TrendingUp className="h-4 w-4 mr-2" />
            Exam Pitfalls
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Error Analysis Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      Conceptual Errors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="text-muted-foreground mb-2">Fundamental misunderstandings</p>
                    <p>• Confusing similar concepts</p>
                    <p>• Misapplying theories</p>
                    <p>• Ignoring conditions</p>
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      Impact: -4 marks per error
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Calculation Errors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="text-muted-foreground mb-2">Mathematical mistakes</p>
                    <p>• Unit conversion errors</p>
                    <p>• Significant figure mistakes</p>
                    <p>• Formula misapplication</p>
                    <p className="text-orange-600 dark:text-orange-400 mt-2">
                      Impact: -4 marks per error
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-yellow-500" />
                      Exam Strategy Errors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="text-muted-foreground mb-2">Poor test-taking approach</p>
                    <p>• Time mismanagement</p>
                    <p>• Not reading carefully</p>
                    <p>• Random guessing</p>
                    <p className="text-yellow-600 dark:text-yellow-400 mt-2">
                      Impact: 10-20 marks lost
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle>Error Prevention Strategy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                      Before Exam:
                    </p>
                    <p>✓ Review this chapter thoroughly</p>
                    <p>✓ Practice questions that test common error areas</p>
                    <p>✓ Make personal error log from mock tests</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      During Exam:
                    </p>
                    <p>✓ Read questions twice, especially 'NOT' and 'EXCEPT'</p>
                    <p>✓ Check units before calculating</p>
                    <p>✓ Review answers if time permits</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          {errorCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.errors.map((error, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{error.topic}</Badge>
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            ❌ {error.mistake}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-4">
                          <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                            <p className="font-semibold text-red-600 dark:text-red-400 mb-1">
                              Why this is wrong:
                            </p>
                            <p className="text-sm">{error.why}</p>
                          </div>
                          <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                            <p className="font-semibold text-green-600 dark:text-green-400 mb-1">
                              ✅ Correct approach:
                            </p>
                            <p className="text-sm">{error.correct}</p>
                          </div>
                          <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                              💡 Example:
                            </p>
                            <p className="text-sm font-mono">{error.example}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pitfalls" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Exam Pitfalls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {commonPitfalls.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    {section.category}
                  </h3>
                  <div className="grid gap-3">
                    {section.pitfalls.map((pitfall, pIdx) => (
                      <Card key={pIdx} className="border-orange-500/20">
                        <CardContent className="pt-4 flex items-start gap-3">
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{pitfall}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20 mt-6">
                <CardHeader>
                  <CardTitle>Self-Check Before Submitting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>☑️ Did I read the question completely?</p>
                  <p>☑️ Are my units consistent?</p>
                  <p>☑️ Did I check all answer options?</p>
                  <p>☑️ Does my answer make chemical sense?</p>
                  <p>☑️ Have I marked questions for review?</p>
                  <p className="text-green-600 dark:text-green-400 font-semibold mt-3">
                    Taking 30 seconds for this check can save 4 marks!
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
