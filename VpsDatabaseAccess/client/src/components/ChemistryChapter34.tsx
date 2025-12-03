
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Zap, AlertCircle, CheckCircle2, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const quickRevisionTopics = [
  {
    id: "physical",
    title: "Physical Chemistry Essentials",
    icon: "⚗️",
    keyPoints: [
      {
        topic: "Mole Concept",
        formulas: ["Moles = Mass/Molar Mass", "N = n × Nₐ", "V = n × 22.4 L (at STP)"],
        tips: "Always check units! Convert g to kg, mL to L as needed"
      },
      {
        topic: "Thermodynamics",
        formulas: ["ΔH = ΔU + PΔV", "ΔG = ΔH - TΔS", "ΔG < 0 → spontaneous"],
        tips: "Exothermic: ΔH < 0, Endothermic: ΔH > 0"
      },
      {
        topic: "Equilibrium",
        formulas: ["Kp = Kc(RT)^Δn", "pH = -log[H⁺]", "pOH = 14 - pH"],
        tips: "Le Chatelier: Add → shifts away, Remove → shifts toward"
      },
      {
        topic: "Electrochemistry",
        formulas: ["E = E° - (0.059/n)logQ", "ΔG = -nFE", "λₘ = κ/C"],
        tips: "E° > 0 = spontaneous, SHE = 0V by definition"
      },
      {
        topic: "Kinetics",
        formulas: ["t₁/₂ = 0.693/k (1st order)", "log(k₂/k₁) = Ea/2.303R × (1/T₁ - 1/T₂)"],
        tips: "Order can be zero, fraction, or integer - NOT from balanced equation!"
      }
    ]
  },
  {
    id: "inorganic",
    title: "Inorganic Chemistry Must-Know",
    icon: "🔬",
    keyPoints: [
      {
        topic: "Periodic Trends",
        formulas: ["IE₁ < IE₂ < IE₃", "Atomic size: Down ↑, Across →↓"],
        tips: "Electronegativity: F > O > N > Cl. Inert pair effect: Pb²⁺ > Pb⁴⁺"
      },
      {
        topic: "s-Block",
        formulas: ["Diagonal: Li-Mg, Be-Al", "Solubility: Hydroxides ↑, Sulfates ↓"],
        tips: "Flame colors: Li=Red, Na=Yellow, K=Violet, Ca=Brick red, Sr=Crimson, Ba=Green"
      },
      {
        topic: "p-Block",
        formulas: ["Acidic strength: HF < HCl < HBr < HI", "Basic strength: NH₃ > PH₃ > AsH₃"],
        tips: "Noble gases: He(0), Ne(0), Ar(0), but Xe forms compounds!"
      },
      {
        topic: "d-Block",
        formulas: ["Variable OS due to small (n-1)d - ns gap", "Color due to d-d transitions"],
        tips: "Lanthanoid contraction → Y³⁺ ≈ Ho³⁺ in size"
      },
      {
        topic: "Coordination",
        formulas: ["EAN = Z - oxidation state + 2×CN", "Crystal field: Δₒ > Δₜ"],
        tips: "Strong field: CO, CN⁻ (low spin). Weak: Cl⁻, F⁻ (high spin)"
      }
    ]
  },
  {
    id: "organic",
    title: "Organic Chemistry Key Points",
    icon: "🧪",
    keyPoints: [
      {
        topic: "GOC Fundamentals",
        formulas: ["Carbocation stability: 3° > 2° > 1° > CH₃⁺", "Carbanion: opposite order"],
        tips: "+I: -CH₃, -C₂H₅. -I: -NO₂, -CN, -COOH, -X. +M: -OH, -OR, -NH₂. -M: -NO₂, -CN, -COOH"
      },
      {
        topic: "Reaction Mechanisms",
        formulas: ["SN1: 3° > 2° > 1°", "SN2: opposite", "E2: requires anti-periplanar"],
        tips: "Markovnikov: H goes to H-rich carbon. Anti-Markovnikov with peroxide"
      },
      {
        topic: "Name Reactions",
        formulas: [
          "Wurtz: 2RX + 2Na → R-R",
          "Friedel-Crafts: C₆H₆ + RX/AlCl₃ → C₆H₅R",
          "Cannizzaro: 2HCHO + NaOH → CH₃OH + HCOONa"
        ],
        tips: "Aldol: needs α-H. Clemmensen: Zn-Hg/HCl (acidic). Wolff-Kishner: NH₂NH₂/KOH (basic)"
      },
      {
        topic: "Functional Group Tests",
        formulas: [
          "Iodoform: CH₃CO- or CH₃CH(OH)-",
          "Lucas: 3° > 2° > 1° alcohol",
          "Fehling's: Aldehydes only (not ketones)"
        ],
        tips: "Tollen's = ammoniacal AgNO₃ (silver mirror). 2,4-DNP = both aldehydes & ketones"
      },
      {
        topic: "Biomolecules",
        formulas: ["Amino acids: zwitter ion at pH=pI", "Peptide: -CO-NH- bond"],
        tips: "Reducing sugars: All monosaccharides, maltose, lactose. Non-reducing: Sucrose"
      }
    ]
  }
];

const commonMistakes = [
  { mistake: "Confusing n-factor with moles in redox", fix: "n-factor = change in oxidation state × atoms changing" },
  { mistake: "Wrong sign in ΔH, ΔG calculations", fix: "Exothermic ΔH < 0, Spontaneous ΔG < 0" },
  { mistake: "Forgetting to convert units", fix: "Always: g→kg, mL→L, °C→K when needed" },
  { mistake: "Using stoichiometry for reaction order", fix: "Order is EXPERIMENTAL, not from equation!" },
  { mistake: "Mixing up Kp and Kc", fix: "Kp = Kc(RT)^Δn, Δn = products - reactants (gas phase)" },
  { mistake: "Carbocation vs Carbanion stability", fix: "Opposite trends! +I stabilizes carbocation, -I stabilizes carbanion" },
  { mistake: "SN1 vs SN2 confusion", fix: "SN1: 3° best, carbocation. SN2: 1° best, backside attack" },
  { mistake: "Forgetting exceptions in periodic trends", fix: "O vs S (EA), N vs P (IE), Be vs Mg" }
];

const lastMinuteTips = [
  "📝 Revise important named reactions and their conditions",
  "🔢 Practice mental calculation for mole concept problems",
  "📊 Review all important graphs (Maxwell-Boltzmann, Arrhenius, etc.)",
  "⚠️ Know exceptions to periodic trends (O, N, noble gases)",
  "🎨 Memorize color reactions and flame tests",
  "🧮 Remember common values: R=8.314, F=96500, Nₐ=6.022×10²³",
  "📐 Draw structures for common compounds (benzene, glucose, DNA bases)",
  "⚗️ Revise all coordination isomerism types",
  "🔬 Know all qualitative analysis tests (salt analysis)",
  "💡 Practice predicting major products in organic reactions"
];

export function ChemistryChapter34() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 34: Last-Minute Quick Revision</h1>
          <p className="text-muted-foreground">Essential formulas, concepts & tips for exam day</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="formulas">
            <Star className="h-4 w-4 mr-2" />
            Key Points
          </TabsTrigger>
          <TabsTrigger value="mistakes">
            <AlertCircle className="h-4 w-4 mr-2" />
            Avoid Mistakes
          </TabsTrigger>
          <TabsTrigger value="tips">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Exam Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Revision Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Last 24-48 Hours Before Exam</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        Do This
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>✓ Revise formula sheets (don't derive)</p>
                      <p>✓ Quick review of name reactions</p>
                      <p>✓ Go through previous year questions</p>
                      <p>✓ Revise exception cases</p>
                      <p>✓ Practice mental calculations</p>
                      <p>✓ Get adequate sleep (7-8 hours)</p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Avoid This
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>✗ Starting new topics</p>
                      <p>✗ Solving very difficult problems</p>
                      <p>✗ Comparing with peers</p>
                      <p>✗ Last-minute cramming at night</p>
                      <p>✗ Skipping meals or sleep</p>
                      <p>✗ Panicking about gaps</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardHeader>
                  <CardTitle>Exam Day Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>☑️ Have admit card, ID proof, pen, pencil ready</p>
                  <p>☑️ Light breakfast 2-3 hours before exam</p>
                  <p>☑️ Reach venue 30 minutes early</p>
                  <p>☑️ Quick 10-minute formula revision before entering</p>
                  <p>☑️ Stay calm, breathe deeply</p>
                  <p>☑️ Read instructions carefully before starting</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                {quickRevisionTopics.map((section) => (
                  <Card key={section.id} className="border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="text-2xl">{section.icon}</span>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="text-muted-foreground">
                        {section.keyPoints.length} essential topics covered
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formulas" className="space-y-6">
          {quickRevisionTopics.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{section.icon}</span>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {section.keyPoints.map((point, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{idx + 1}</Badge>
                          <span className="font-semibold">{point.topic}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-4">
                          <div>
                            <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                              Key Formulas:
                            </p>
                            <ul className="space-y-1">
                              {point.formulas.map((formula, fIdx) => (
                                <li key={fIdx} className="font-mono text-sm bg-muted p-2 rounded">
                                  {formula}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                              💡 Pro Tip:
                            </p>
                            <p className="text-sm">{point.tips}</p>
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

        <TabsContent value="mistakes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Mistakes to Avoid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {commonMistakes.map((item, idx) => (
                <Card key={idx} className="border-red-500/20">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-red-500" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="font-semibold text-red-600 dark:text-red-400">
                          ❌ Mistake #{idx + 1}: {item.mistake}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 bg-green-500/10 p-2 rounded">
                          ✅ Fix: {item.fix}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Last-Minute Success Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lastMinuteTips.map((tip, idx) => (
                <Card key={idx} className="border-green-500/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <p>{tip}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <CardHeader>
              <CardTitle>Time Management in Exam</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>⏱️ <strong>First 5 minutes:</strong> Read all instructions, scan question paper</p>
              <p>⏱️ <strong>Next 50 minutes:</strong> Attempt all questions you're confident about</p>
              <p>⏱️ <strong>Next 40 minutes:</strong> Tackle moderate difficulty questions</p>
              <p>⏱️ <strong>Last 15 minutes:</strong> Attempt difficult questions, review</p>
              <p className="text-orange-600 dark:text-orange-400 font-semibold">
                ⚠️ Don't get stuck on one question! Move on and return later if time permits.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Final Words of Encouragement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>🌟 You've prepared well - trust your preparation!</p>
              <p>💪 Stay calm and focused during the exam</p>
              <p>🎯 Every question you attempt is progress</p>
              <p>✨ Believe in yourself - you've got this!</p>
              <p className="text-lg font-bold text-center mt-4 text-purple-600 dark:text-purple-400">
                All the best for your NEET exam! 🎉
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
