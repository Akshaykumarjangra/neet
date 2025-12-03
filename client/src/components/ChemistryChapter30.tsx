
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, TrendingUp, Clock, CheckCircle2, AlertCircle , Loader2 } from "lucide-react";

export function ChemistryChapter30() {
  // Fetch questions from database for Chemistry in Everyday Life (topicId: 64)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '64'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=64');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-8 w-8 text-orange-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 30: Final Revision & Exam Strategy</h1>
          <p className="text-muted-foreground">Master Plan for NEET Chemistry Success</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="strategy">
            <Target className="h-4 w-4 mr-2" />
            Strategy
          </TabsTrigger>
          <TabsTrigger value="formula">
            <TrendingUp className="h-4 w-4 mr-2" />
            Formulas
          </TabsTrigger>
          <TabsTrigger value="tips">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Pro Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete Chemistry Syllabus Map</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Physical Chemistry (40%)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>✓ Mole Concept & Stoichiometry</p>
                    <p>✓ Atomic Structure & Periodicity</p>
                    <p>✓ Chemical Bonding</p>
                    <p>✓ States of Matter</p>
                    <p>✓ Thermodynamics</p>
                    <p>✓ Equilibrium (Chemical + Ionic)</p>
                    <p>✓ Redox & Electrochemistry</p>
                    <p>✓ Solutions</p>
                    <p>✓ Chemical Kinetics</p>
                    <p>✓ Surface Chemistry</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Inorganic Chemistry (25%)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>✓ Classification & Periodicity</p>
                    <p>✓ Hydrogen</p>
                    <p>✓ s-Block Elements</p>
                    <p>✓ p-Block Elements (13-18)</p>
                    <p>✓ d & f-Block Elements</p>
                    <p>✓ Coordination Compounds</p>
                    <p>✓ Qualitative Analysis</p>
                    <p>✓ Environmental Chemistry</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Organic Chemistry (35%)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p>✓ GOC (Basics, Isomerism, Mechanisms)</p>
                    <p>✓ Hydrocarbons (Alkanes-Aromatics)</p>
                    <p>✓ Haloalkanes & Haloarenes</p>
                    <p>✓ Alcohols, Phenols, Ethers</p>
                    <p>✓ Aldehydes, Ketones, Acids</p>
                    <p>✓ Amines & Nitrogen Compounds</p>
                    <p>✓ Biomolecules</p>
                    <p>✓ Polymers</p>
                    <p>✓ Chemistry in Everyday Life</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Last 30 Days Revision Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Week 1 (Days 1-7): Physical Chemistry</h4>
                    <p className="text-muted-foreground">
                      Day 1-2: Mole concept, Atomic structure<br/>
                      Day 3-4: Bonding, States of matter<br/>
                      Day 5-6: Thermodynamics, Equilibrium<br/>
                      Day 7: Solutions, Kinetics
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Week 2 (Days 8-14): Inorganic Chemistry</h4>
                    <p className="text-muted-foreground">
                      Day 8-9: Periodicity, s & p block<br/>
                      Day 10-11: d & f block, Coordination<br/>
                      Day 12-13: Qualitative analysis<br/>
                      Day 14: Environmental chemistry
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Week 3 (Days 15-21): Organic Chemistry</h4>
                    <p className="text-muted-foreground">
                      Day 15-16: GOC, Hydrocarbons<br/>
                      Day 17-18: Haloalkanes, Alcohols, Phenols<br/>
                      Day 19-20: Aldehydes, Ketones, Acids<br/>
                      Day 21: Amines, Biomolecules
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Week 4 (Days 22-30): Mock Tests & Revision</h4>
                    <p className="text-muted-foreground">
                      Day 22-25: Full syllabus revision<br/>
                      Day 26-28: 3 Full Mock Tests (180 min each)<br/>
                      Day 29: Error analysis & weak topics<br/>
                      Day 30: Formula revision, light reading
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Day Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Management (60 min for 45 questions)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                    <span><strong>Inorganic Factual (12-15 Q)</strong> - Do FIRST</span>
                    <Badge>10-12 min</Badge>
                  </div>
                  <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded">
                    <span><strong>Organic Reactions (15-18 Q)</strong> - Do SECOND</span>
                    <Badge>20-25 min</Badge>
                  </div>
                  <div className="flex justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                    <span><strong>Physical Numerical (15-18 Q)</strong> - Do THIRD</span>
                    <Badge>20-25 min</Badge>
                  </div>
                  <div className="flex justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                    <span><strong>Review & Guesses</strong></span>
                    <Badge>3-5 min</Badge>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      DO's
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>✅ Start with easiest topics (Inorganic facts)</p>
                    <p>✅ Read questions twice for numerical</p>
                    <p>✅ Eliminate obviously wrong options</p>
                    <p>✅ Check units in numerical problems</p>
                    <p>✅ Mark difficult questions for review</p>
                    <p>✅ Keep periodic table handy mentally</p>
                    <p>✅ Verify sign conventions (ΔH, ΔG, E°)</p>
                    <p>✅ Use POE (Process of Elimination)</p>
                  </CardContent>
                </Card>

                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      DON'Ts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>❌ Don't spend {'>'} 2 min on ANY question</p>
                    <p>❌ Don't attempt if completely unknown</p>
                    <p>❌ Don't confuse similar named reactions</p>
                    <p>❌ Don't forget exceptions (Cr, Cu config)</p>
                    <p>❌ Don't mix up cis/trans, ortho/meta/para</p>
                    <p>❌ Don't calculate if options differ widely</p>
                    <p>❌ Don't second-guess too much</p>
                    <p>❌ Don't panic if others finish early</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardHeader>
                  <CardTitle>Topic-wise Approach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold">Numerical Problems:</h4>
                    <p className="text-muted-foreground">
                      • First check what's asked (molarity/normality/mass/volume)<br/>
                      • Write down given data<br/>
                      • Identify formula needed<br/>
                      • Estimate answer before calculation<br/>
                      • Use approximations when possible
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Organic Reactions:</h4>
                    <p className="text-muted-foreground">
                      • Identify functional group first<br/>
                      • Think of major product (not minor)<br/>
                      • Consider reaction conditions (acidic/basic, temp)<br/>
                      • Remember exceptions and rearrangements
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Inorganic Factual:</h4>
                    <p className="text-muted-foreground">
                      • Quick recall questions - don't overthink<br/>
                      • Trust your first instinct<br/>
                      • Use periodic trends to verify
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formula" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Essential Formulas Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mole Concept</CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-sm space-y-2">
                    <p>Moles = Mass / Molar mass</p>
                    <p>Moles = Volume(L) / 22.4 (at STP)</p>
                    <p>Molarity = Moles / Volume(L)</p>
                    <p>Molality = Moles / Mass(kg)</p>
                    <p>% by mass = (Mass solute / Mass solution) × 100</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Thermodynamics</CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-sm space-y-2">
                    <p>ΔH = ΔU + PΔV = ΔU + ΔnRT</p>
                    <p>ΔG = ΔH - TΔS</p>
                    <p>ΔG° = -RTlnK = -2.303RTlogK</p>
                    <p>K = e^(-ΔG°/RT)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Equilibrium</CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-sm space-y-2">
                    <p>Kc = [Products] / [Reactants]</p>
                    <p>Kp = Kc(RT)^Δn</p>
                    <p>pH = -log[H⁺]</p>
                    <p>pOH = -log[OH⁻]</p>
                    <p>pH + pOH = 14</p>
                    <p>Kw = [H⁺][OH⁻] = 10⁻¹⁴</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Kinetics</CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-sm space-y-2">
                    <p>t₁/₂ = 0.693/k (1st order)</p>
                    <p>k = Ae^(-Ea/RT)</p>
                    <p>log(k₂/k₁) = (Ea/2.303R)(1/T₁ - 1/T₂)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Solutions</CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-sm space-y-2">
                    <p>ΔTb = Kb × m × i</p>
                    <p>ΔTf = Kf × m × i</p>
                    <p>π = CRT (osmotic pressure)</p>
                    <p>Raoult's law: P = P°X</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Electrochemistry</CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-sm space-y-2">
                    <p>E°cell = E°cathode - E°anode</p>
                    <p>ΔG° = -nFE°</p>
                    <p>Nernst: E = E° - (0.059/n)logQ</p>
                    <p>Λm = κ × 1000 / M</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expert Tips for 170+ in Chemistry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Memory Techniques</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p><strong>Mnemonics:</strong></p>
                    <p>"Please Send Cats Dogs Zebras For Great Health In New York"</p>
                    <p className="text-muted-foreground text-xs">(p, s, c, d, z, f, g, h, i, n, y - block elements)</p>
                    <p className="mt-3"><strong>Flash Cards:</strong></p>
                    <p className="text-muted-foreground">Make for: Named reactions, color of compounds, exceptions</p>
                    <p className="mt-3"><strong>Association:</strong></p>
                    <p className="text-muted-foreground">Link concepts to real-life examples</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Common Mistakes to Avoid</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>⚠️ Confusing N and M in titrations</p>
                    <p>⚠️ Wrong electron configuration (Cr, Cu exceptions)</p>
                    <p>⚠️ Sign errors in thermodynamics</p>
                    <p>⚠️ Mixing up SN1 and SN2 mechanisms</p>
                    <p>⚠️ Forgetting to check IUPAC naming rules</p>
                    <p>⚠️ Not considering stereochemistry</p>
                    <p>⚠️ Calculation errors in pH problems</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle>High-Yield Topics (Must Master)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <h4 className="font-semibold mb-1 text-purple-600 dark:text-purple-400">Physical</h4>
                      <p>• Mole concept calculations</p>
                      <p>• Equilibrium (K calculations)</p>
                      <p>• Thermodynamics (ΔG, spontaneity)</p>
                      <p>• Electrochemistry (Nernst equation)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-blue-600 dark:text-blue-400">Inorganic</h4>
                      <p>• p-Block (preparation, properties)</p>
                      <p>• Coordination compounds (IUPAC, isomerism)</p>
                      <p>• Periodic trends</p>
                      <p>• Qualitative analysis</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-green-600 dark:text-green-400">Organic</h4>
                      <p>• GOC (resonance, hyperconjugation)</p>
                      <p>• Name reactions (30+ reactions)</p>
                      <p>• Functional group conversions</p>
                      <p>• Isomerism</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Final Week Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Revise all important formulas and equations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Practice 3-4 full-length mock tests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Review all wrong answers from previous tests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Make quick notes of exceptions and special cases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Revise NCERT line by line (especially inorganic)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Sleep well the night before exam</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
