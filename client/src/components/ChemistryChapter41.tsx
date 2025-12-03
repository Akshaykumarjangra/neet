
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap, BookOpen, Lightbulb, Target, TestTubes } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const rapidFireTopics = [
  {
    category: "Physical Chemistry - Formulas",
    items: [
      { concept: "Mole Concept", formula: "n = m/M = V(L) × M = N/Nₐ", tip: "Remember: Nₐ = 6.022 × 10²³" },
      { concept: "Molarity", formula: "M = moles/V(L)", tip: "Volume in LITERS!" },
      { concept: "Molality", formula: "m = moles/mass(kg)", tip: "Mass in KILOGRAMS!" },
      { concept: "Ideal Gas", formula: "PV = nRT", tip: "R = 0.0821 L·atm/mol·K or 8.314 J/mol·K" },
      { concept: "Graham's Law", formula: "r₁/r₂ = √(M₂/M₁)", tip: "Lighter gas diffuses faster" },
      { concept: "ΔH Calculation", formula: "ΔH = ΣH(products) - ΣH(reactants)", tip: "Negative = exothermic" },
      { concept: "Gibbs Energy", formula: "ΔG = ΔH - TΔS", tip: "ΔG < 0 = spontaneous" },
      { concept: "Equilibrium Constant", formula: "Kc = [C]^c[D]^d / [A]^a[B]^b", tip: "Products/Reactants" },
      { concept: "pH", formula: "pH = -log[H⁺]", tip: "pH + pOH = 14" },
      { concept: "Henderson-Hasselbalch", formula: "pH = pKa + log([Salt]/[Acid])", tip: "For buffer solutions" },
      { concept: "Nernst Equation", formula: "E = E° - (0.059/n)logQ", tip: "At 25°C" },
      { concept: "Rate Law", formula: "rate = k[A]^m[B]^n", tip: "m,n found experimentally" },
      { concept: "Arrhenius Equation", formula: "k = Ae^(-Ea/RT)", tip: "Temperature dependence" },
      { concept: "Raoult's Law", formula: "P = P°X", tip: "Vapor pressure lowering" },
      { concept: "Elevation in BP", formula: "ΔTb = Kb × m × i", tip: "Kb is molal elevation constant" }
    ]
  },
  {
    category: "Inorganic Chemistry - Key Facts",
    items: [
      { concept: "IE Trend", formula: "Increases → across period, ↑ up group", tip: "Exception: N > O, Mg > Al" },
      { concept: "EA Trend", formula: "Increases → across period", tip: "Noble gases have EA ≈ 0" },
      { concept: "Atomic Size", formula: "Decreases → across period, ↑ down group", tip: "Opposite to IE" },
      { concept: "Metallic Character", formula: "Decreases → across period, ↑ down group", tip: "Metals on left" },
      { concept: "s-block Flame Test", formula: "Li-Red, Na-Yellow, K-Violet, Ca-Brick red", tip: "MEMORIZE colors!" },
      { concept: "p-block Acidity", formula: "NH₃ < H₂O < HF (across period)", tip: "Electronegativity ↑" },
      { concept: "p-block Basicity", formula: "NH₃ > PH₃ > AsH₃ (down group)", tip: "Size ↑, basicity ↓" },
      { concept: "Noble Gas Compounds", formula: "Only Xe and Kr form compounds", tip: "XeF₂, XeF₄, XeF₆" },
      { concept: "d-block Colors", formula: "d¹-d⁹ are colored, d⁰ and d¹⁰ colorless", tip: "Due to d-d transition" },
      { concept: "Lanthanide Contraction", formula: "La³⁺ > ... > Lu³⁺ (size decreases)", tip: "Poor shielding by 4f" },
      { concept: "Chromyl Chloride Test", formula: "CrO₂Cl₂ (red vapors)", tip: "Confirms Cl⁻ with Cr₂O₇²⁻" },
      { concept: "Brown Ring Test", formula: "[Fe(H₂O)₅NO]²⁺ brown complex", tip: "Confirms NO₃⁻" },
      { concept: "Coordination Number", formula: "CN = 2,4,6 most common", tip: "Shape depends on CN" },
      { concept: "Crystal Field Splitting", formula: "Δₒ (octahedral) > Δₜ (tetrahedral)", tip: "Strong field = large Δ" },
      { concept: "Metallurgy", formula: "Roasting (O₂), Calcination (no O₂)", tip: "Both involve heating" }
    ]
  },
  {
    category: "Organic Chemistry - Reactions",
    items: [
      { concept: "Markovnikov's Rule", formula: "H adds to C with more H", tip: "Anti-M: peroxide effect" },
      { concept: "Saytzeff's Rule", formula: "More substituted alkene forms", tip: "E1, E2 eliminations" },
      { concept: "SN1 Mechanism", formula: "3° > 2° > 1° reactivity", tip: "Carbocation intermediate" },
      { concept: "SN2 Mechanism", formula: "1° > 2° > 3° reactivity", tip: "Single step, inversion" },
      { concept: "Lucas Test", formula: "3° instant, 2° 5min, 1° no reaction", tip: "Distinguishes alcohols" },
      { concept: "Iodoform Test", formula: "CH₃CO- or CH₃CH(OH)- required", tip: "Yellow CHI₃ ppt" },
      { concept: "Fehling's Test", formula: "Aldehydes give red ppt (Cu₂O)", tip: "Ketones don't react" },
      { concept: "Tollen's Test", formula: "Aldehydes give silver mirror", tip: "Reducing sugars positive" },
      { concept: "Carbylamine Reaction", formula: "1° amines + CHCl₃ + KOH", tip: "Foul smell isocyanide" },
      { concept: "Coupling Reaction", formula: "ArN₂⁺ + ArOH → Azo dye", tip: "Orange-red colors" },
      { concept: "Hell-Volhard-Zelinsky", formula: "RCH₂COOH → RCHBrCOOH", tip: "α-halogenation" },
      { concept: "Cannizzaro Reaction", formula: "2ArCHO → ArCH₂OH + ArCOO⁻", tip: "No α-H aldehyde" },
      { concept: "Aldol Condensation", formula: "2CH₃CHO → CH₃CH(OH)CH₂CHO", tip: "Requires α-H" },
      { concept: "Hoffmann Degradation", formula: "RCONH₂ → RNH₂", tip: "Loses one carbon" },
      { concept: "Gabriel Synthesis", formula: "Phthalimide → 1° amine", tip: "Pure 1° amine" }
    ]
  },
  {
    category: "Mnemonics & Memory Tricks",
    items: [
      { concept: "Periodic Table Groups", formula: "HHeLiBeBCNOFNe...", tip: "Happy Henry Lives Beside Boron..." },
      { concept: "s-block Reactivity", formula: "Cs > Rb > K > Na > Li", tip: "Bigger = more reactive" },
      { concept: "Halogen Reactivity", formula: "F > Cl > Br > I", tip: "Smaller = more reactive" },
      { concept: "Noble Gases", formula: "He Ne Ar Kr Xe Rn", tip: "Heavy Never Argues, Keeps Xylo(phone) Running" },
      { concept: "Functional Groups", formula: "Acid > Ester > Amide > Aldehyde > Ketone > Alcohol", tip: "Priority order" },
      { concept: "Oxoacids Basicity", formula: "H₃PO₂(1) < H₃PO₃(2) < H₃PO₄(3)", tip: "Count OH groups" },
      { concept: "Amino Acids", formula: "GAVLIMFWPSTCYNQDEKRH", tip: "Alphabetical by size" },
      { concept: "Vitamins Fat Soluble", formula: "ADEK", tip: "A Day Every Kid (fat-soluble)" },
      { concept: "Vitamins Water Soluble", formula: "B complex + C", tip: "Rest are water-soluble" },
      { concept: "Essential Amino Acids", formula: "PVT TIM HALL", tip: "Phe Val Thr Try Ile Met His Arg Leu Lys" },
      { concept: "Monosaccharides", formula: "Glucose, Fructose, Galactose", tip: "Sweet trio" },
      { concept: "Enzyme Classes", formula: "OTHRILL", tip: "Oxidoreductase, Transferase, Hydrolase, Isomerase, Ligase, Lyase" },
      { concept: "DNA Bases", formula: "Purines: AG, Pyrimidines: CTU", tip: "Pure As Gold, CUT" },
      { concept: "Transition Metals", formula: "Sc Ti V Cr Mn Fe Co Ni Cu Zn", tip: "Scandium To Zinc" },
      { concept: "Lanthanides Start", formula: "La Ce Pr Nd Pm Sm", tip: "La Casa Presente Necesita Promesas Similares" }
    ]
  }
];

const quickRevisionPoints = [
  {
    topic: "Physical Chemistry",
    mustKnow: [
      "All colligative property formulas",
      "Electrochemistry: Nernst equation, Faraday's laws",
      "Thermodynamics: First law, Hess law, Gibbs energy",
      "Equilibrium: Kp, Kc relationship, Le Chatelier",
      "Chemical kinetics: Order, molecularity, Arrhenius"
    ]
  },
  {
    topic: "Inorganic Chemistry",
    mustKnow: [
      "All periodic trends + exceptions",
      "s-block: Diagonal relationship, flame tests",
      "p-block: Hydrides, oxides, halides trends",
      "d-block: Electronic config, magnetic properties",
      "Coordination: Nomenclature, VBT, CFT basics"
    ]
  },
  {
    topic: "Organic Chemistry",
    mustKnow: [
      "All named reactions (minimum 25)",
      "Reaction mechanisms: SN1, SN2, E1, E2",
      "Distinguishing tests for all functional groups",
      "Isomerism: All types with examples",
      "Biomolecules: Structures and functions"
    ]
  }
];

export function ChemistryChapter41() {
  const [selectedCategory, setSelectedCategory] = useState(rapidFireTopics[0].category);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 41: Rapid Fire Revision Capsules</h1>
          <p className="text-muted-foreground">Quick recall for last-minute revision</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-2xl">⚡ Speed Revision Mode Activated!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg">This chapter contains:</p>
          <div className="grid md:grid-cols-2 gap-3">
            <Badge variant="secondary" className="p-3 text-sm justify-start">
              ✓ 60+ Essential formulas and facts
            </Badge>
            <Badge variant="secondary" className="p-3 text-sm justify-start">
              ✓ Memory tricks and mnemonics
            </Badge>
            <Badge variant="secondary" className="p-3 text-sm justify-start">
              ✓ High-yield rapid fire points
            </Badge>
            <Badge variant="secondary" className="p-3 text-sm justify-start">
              ✓ Pattern recognition tips
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rapid-fire" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rapid-fire">
            <Zap className="h-4 w-4 mr-2" />
            Rapid Fire
          </TabsTrigger>
          <TabsTrigger value="must-know">
            <Target className="h-4 w-4 mr-2" />
            Must Know
          </TabsTrigger>
          <TabsTrigger value="patterns">
            <Lightbulb className="h-4 w-4 mr-2" />
            Patterns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rapid-fire" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {rapidFireTopics.map((category) => (
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
                  <TestTubes className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold">{category.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle>{selectedCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rapidFireTopics
                  .find((cat) => cat.category === selectedCategory)
                  ?.items.map((item, idx) => (
                    <Card key={idx} className="bg-blue-500/5">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                              {item.concept}
                            </h4>
                            <p className="font-mono text-sm bg-background/50 p-2 rounded mb-2">
                              {item.formula}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Lightbulb className="h-4 w-4 text-yellow-500" />
                              {item.tip}
                            </p>
                          </div>
                          <Badge variant="outline">{idx + 1}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="must-know" className="space-y-6">
          {quickRevisionPoints.map((section, idx) => (
            <Card key={idx} className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600 dark:text-purple-400">
                  {section.topic}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {section.mustKnow.map((point, pIdx) => (
                  <Card key={pIdx} className="bg-purple-500/10">
                    <CardContent className="pt-4 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                        {pIdx + 1}
                      </div>
                      <p className="text-sm font-medium">{point}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="trends">
              <AccordionTrigger className="text-xl font-semibold">
                Periodic Trends Patterns
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-4">
                  <Card className="bg-green-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Across Period (Left → Right):</p>
                      <p className="text-sm">↑ Ionization Energy, ↑ Electronegativity, ↓ Atomic Size, ↓ Metallic Character</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Down Group (Top → Bottom):</p>
                      <p className="text-sm">↓ Ionization Energy, ↓ Electronegativity, ↑ Atomic Size, ↑ Metallic Character</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Key Exceptions:</p>
                      <p className="text-sm">IE: N {'>'} O, Mg {'>'} Al (half-filled/fully-filled stability)</p>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="organic-patterns">
              <AccordionTrigger className="text-xl font-semibold">
                Organic Reaction Patterns
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-4">
                  <Card className="bg-purple-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Oxidation States Pattern:</p>
                      <p className="text-sm">Alcohol → Aldehyde/Ketone → Carboxylic Acid</p>
                      <p className="text-sm text-muted-foreground">1° alcohol → aldehyde → acid; 2° alcohol → ketone (stop)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-pink-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Reactivity Pattern (SN reactions):</p>
                      <p className="text-sm">SN1: 3° {'>'} 2° {'>'} 1° (carbocation stability)</p>
                      <p className="text-sm">SN2: 1° {'>'} 2° {'>'} 3° (steric hindrance)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Basicity Pattern (Amines):</p>
                      <p className="text-sm">Aliphatic: 2° {'>'} 1° {'>'} 3° (inductive + steric)</p>
                      <p className="text-sm">Aromatic: Aniline derivatives (electron-withdrawing ↓ basicity)</p>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="numerical-patterns">
              <AccordionTrigger className="text-xl font-semibold">
                Numerical Problem Patterns
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-4">
                  <Card className="bg-teal-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Mole Concept Steps:</p>
                      <p className="text-sm">1. Convert given to moles (n = m/M or PV/RT)</p>
                      <p className="text-sm">2. Use stoichiometry (mole ratio)</p>
                      <p className="text-sm">3. Convert to required quantity</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-indigo-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Thermodynamics Pattern:</p>
                      <p className="text-sm">ΔH° = ΣH°(products) - ΣH°(reactants)</p>
                      <p className="text-sm">ΔG° = ΔH° - TΔS° (spontaneity check)</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-500/10">
                    <CardContent className="pt-4">
                      <p className="font-semibold mb-2">Electrochemistry Pattern:</p>
                      <p className="text-sm">E°cell = E°cathode - E°anode</p>
                      <p className="text-sm">Use Nernst: E = E° - (0.059/n)logQ at 25°C</p>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle>⚡ How to Use This Chapter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            <strong>Last 48 hours before exam:</strong> Revise all rapid fire points 2-3 times
          </p>
          <p className="text-sm">
            <strong>Last 24 hours:</strong> Focus on mnemonics and patterns only
          </p>
          <p className="text-sm">
            <strong>Last 6 hours:</strong> Quick glance at formulas, no new learning
          </p>
          <p className="text-sm">
            <strong>Morning of exam:</strong> Read mnemonics once, stay calm, trust preparation
          </p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-4">
            Remember: This is your revision aid, not replacement for understanding!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
