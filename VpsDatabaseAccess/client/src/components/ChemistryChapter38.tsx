
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Zap, FileText, TestTubes, Atom } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formulaSheets = {
  physical: [
    {
      topic: "Mole Concept",
      formulas: [
        "Moles (n) = mass/molar mass = N/Nₐ = V/22.4 (at STP)",
        "Molarity (M) = moles/volume(L)",
        "Molality (m) = moles/mass of solvent(kg)",
        "% by mass = (mass of solute/mass of solution) × 100",
        "Mole fraction (χ) = moles of component/total moles"
      ]
    },
    {
      topic: "Thermodynamics",
      formulas: [
        "ΔU = q + w",
        "ΔH = ΔU + PΔV = ΔU + ΔnRT",
        "ΔG = ΔH - TΔS",
        "ΔG° = -RT ln K = -2.303 RT log K",
        "ΔG < 0: spontaneous; ΔG > 0: non-spontaneous; ΔG = 0: equilibrium"
      ]
    },
    {
      topic: "Equilibrium",
      formulas: [
        "Kc = [products]/[reactants] (powers = stoichiometric coefficients)",
        "Kp = Kc(RT)^Δn",
        "pH = -log[H⁺]; pOH = -log[OH⁻]; pH + pOH = 14",
        "Ka × Kb = Kw = 10⁻¹⁴ at 25°C",
        "Henderson-Hasselbalch: pH = pKa + log([salt]/[acid])"
      ]
    },
    {
      topic: "Electrochemistry",
      formulas: [
        "E°cell = E°cathode - E°anode",
        "ΔG° = -nFE°cell",
        "Nernst: E = E° - (0.059/n)log Q",
        "Conductivity: κ = 1/ρ; Λm = κ × 1000/M",
        "Q = It; W = ZIt (Z = equivalent weight/96500)"
      ]
    },
    {
      topic: "Kinetics",
      formulas: [
        "Rate = k[A]ᵐ[B]ⁿ (m, n are orders)",
        "Zero order: [A] = [A]₀ - kt; t₁/₂ = [A]₀/2k",
        "First order: ln[A] = ln[A]₀ - kt; t₁/₂ = 0.693/k",
        "Second order: 1/[A] = 1/[A]₀ + kt; t₁/₂ = 1/k[A]₀",
        "Arrhenius: k = Ae^(-Ea/RT) or log(k₂/k₁) = (Ea/2.303R)(1/T₁ - 1/T₂)"
      ]
    },
    {
      topic: "Solutions",
      formulas: [
        "Raoult's Law: P = P°χsolvent",
        "ΔTb = Kb × m × i; ΔTf = Kf × m × i",
        "Π = CRT (van't Hoff)",
        "van't Hoff factor: i = observed value/calculated value",
        "Relative lowering: (P° - P)/P° = χsolute"
      ]
    }
  ],
  inorganic: [
    {
      topic: "Periodic Trends",
      points: [
        "Atomic radius: decreases → across period, increases ↓ down group",
        "Ionic radius: Cation < Atom < Anion; increases down group",
        "Ionization Energy: increases → across period, decreases ↓ down group",
        "Electron Gain Enthalpy: becomes more -ve → across period",
        "Electronegativity: F > O > N > Cl (most to least)",
        "Metallic character: increases ↓ down group, decreases → across period"
      ]
    },
    {
      topic: "s-Block Elements",
      points: [
        "Alkali metals: ns¹, highly reactive, +1 oxidation state",
        "Alkaline earth: ns², less reactive than alkali, +2 oxidation state",
        "Diagonal relationship: Li-Mg, Be-Al",
        "Solubility: Li₂CO₃, MgCO₃ less soluble; CaCO₃, BaCO₃ more soluble",
        "Flame colors: Li (crimson), Na (yellow), K (violet), Ca (brick red), Sr (crimson), Ba (apple green)"
      ]
    },
    {
      topic: "p-Block Elements",
      points: [
        "Group 13: Boron is non-metal, others are metals",
        "Group 14: C, Si (non-metals); Ge (metalloid); Sn, Pb (metals)",
        "Group 15: N, P (non-metals); As, Sb (metalloids); Bi (metal)",
        "Group 16: O, S, Se (non-metals); Te (metalloid); Po (metal)",
        "Group 17 (Halogens): F, Cl, Br, I - highly reactive non-metals",
        "Group 18 (Noble gases): He, Ne, Ar, Kr, Xe, Rn - inert"
      ]
    },
    {
      topic: "d-Block & Coordination",
      points: [
        "Oxidation states: variable, Mn shows +2 to +7",
        "Coordination number: usually 4 or 6",
        "Geometry: 4 (square planar/tetrahedral), 6 (octahedral)",
        "EAN rule: Effective Atomic Number = Z - oxidation state + 2 × CN",
        "Crystal field: Δ₀ (octahedral) > Δt (tetrahedral)",
        "Magnetic: High spin (weak field), Low spin (strong field)"
      ]
    }
  ],
  organic: [
    {
      topic: "Nomenclature Priority",
      points: [
        "COOH > SO₃H > COOR > COCl > CONH₂ > CHO > C=O > OH > NH₂ > C≡C > C=C > C-C",
        "Prefix: Number of carbons: meth(1), eth(2), prop(3), but(4), pent(5), hex(6)",
        "Substituents: alphabetical order (ethyl before methyl)",
        "Numbering: lowest locant to functional group, then multiple bonds, then substituents"
      ]
    },
    {
      topic: "Important Name Reactions",
      reactions: [
        "Wurtz: R-X + 2Na → R-R (alkane synthesis)",
        "Friedel-Crafts Alkylation: C₆H₆ + R-X + AlCl₃ → C₆H₅-R",
        "Friedel-Crafts Acylation: C₆H₆ + RCOCl + AlCl₃ → C₆H₅-COR",
        "Reimer-Tiemann: Phenol + CHCl₃ + NaOH → salicylaldehyde",
        "Kolbe's: Phenol + CO₂ + NaOH → salicylic acid",
        "Cannizzaro: 2RCHO + NaOH → RCH₂OH + RCOONa",
        "Aldol condensation: 2CH₃CHO + dil. NaOH → CH₃CH=CHCHO",
        "Hell-Volhard-Zelinsky: RCOOH + Cl₂/Br₂ + P → α-halo acid",
        "Hoffmann Bromamide: RCONH₂ + Br₂ + 4NaOH → R-NH₂",
        "Gabriel Phthalimide: for 1° amine synthesis"
      ]
    },
    {
      topic: "Distinguishing Tests",
      tests: [
        "Tollen's: Aldehyde gives silver mirror (not ketone)",
        "Fehling's: Aldehyde gives red ppt (not ketone)",
        "Lucas: 1° (no reaction), 2° (5-10 min), 3° (immediate turbidity)",
        "Iodoform: CH₃CO- or CH₃CH(OH)- gives yellow ppt",
        "Carbylamine: 1° amine gives foul smell (CHCl₃ + KOH)",
        "Bromine water: Phenol → white ppt (2,4,6-tribromophenol)",
        "NaHCO₃: Carboxylic acid gives CO₂ (not phenol)",
        "FeCl₃: Phenol gives violet color"
      ]
    },
    {
      topic: "Reaction Mechanisms",
      points: [
        "SN1: 3° > 2° > 1°; carbocation intermediate; racemization",
        "SN2: 1° > 2° > 3°; single step; inversion (Walden)",
        "E1: 3° > 2° > 1°; carbocation; Zaitsev product (more substituted alkene)",
        "E2: anti-elimination; Zaitsev product",
        "Electrophilic addition: follows Markovnikov's rule",
        "Electrophilic aromatic substitution: ortho/para (activating), meta (deactivating)"
      ]
    }
  ]
};

const mindMaps = [
  {
    topic: "Chemical Bonding Overview",
    branches: [
      {
        name: "Ionic Bonding",
        sub: ["Metal + Non-metal", "Electron transfer", "High melting point", "Conducts in molten/aqueous"]
      },
      {
        name: "Covalent Bonding",
        sub: ["Non-metal + Non-metal", "Electron sharing", "Lewis structures", "VSEPR theory", "Hybridization"]
      },
      {
        name: "Metallic Bonding",
        sub: ["Metal atoms", "Sea of electrons", "Good conductors", "Malleable & ductile"]
      },
      {
        name: "Hydrogen Bonding",
        sub: ["F-H, O-H, N-H", "Intermolecular force", "Increases boiling point", "DNA structure"]
      }
    ]
  },
  {
    topic: "Organic Reactions Flow",
    branches: [
      {
        name: "Alkane → Alkyl Halide",
        sub: ["Free radical halogenation", "UV light", "Cl₂ or Br₂"]
      },
      {
        name: "Alkyl Halide → Alcohol",
        sub: ["SN reaction with OH⁻", "Aqueous KOH", "Williamson (R-O-R)"]
      },
      {
        name: "Alcohol → Aldehyde/Ketone",
        sub: ["1° ROH → RCHO (oxidation)", "2° ROH → RCOR (oxidation)", "3° ROH → no oxidation"]
      },
      {
        name: "Aldehyde → Carboxylic Acid",
        sub: ["Further oxidation", "KMnO₄ or K₂Cr₂O₇", "Tollen's/Fehling's test"]
      }
    ]
  }
];

const quickTips = [
  "Exception to electron affinity: N < O due to compact 2p orbital in O",
  "Exception to ionization energy: N > O due to stable half-filled 2p in N",
  "Noble gases have highest IE in their period",
  "Acidic strength: HI > HBr > HCl > HF (bond strength)",
  "In aqueous: HF weakest (H-bonding), others strong acids",
  "Oxidizing power of halogens: F₂ > Cl₂ > Br₂ > I₂",
  "d⁰ and d¹⁰ configurations are colorless (no d-d transition)",
  "Anti-aromatic: 4n π electrons in planar cyclic system (very unstable)",
  "Aromatic: 4n+2 π electrons (Hückel's rule)",
  "Markovnikov: H goes to C with more H, halogen to C with less H",
  "Anti-Markovnikov: peroxide effect reverses the rule (only for HBr)",
  "Trans fats are more harmful than cis (higher melting point)"
];

export function ChemistryChapter38() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 38: Revision Mind Maps & Quick Reference</h1>
          <p className="text-muted-foreground">One-stop consolidated reference for rapid revision</p>
        </div>
      </div>

      <Tabs defaultValue="formulas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="formulas">
            <Zap className="h-4 w-4 mr-2" />
            Formula Sheets
          </TabsTrigger>
          <TabsTrigger value="mind-maps">
            <BookOpen className="h-4 w-4 mr-2" />
            Mind Maps
          </TabsTrigger>
          <TabsTrigger value="quick-tips">
            <Atom className="h-4 w-4 mr-2" />
            Quick Tips
          </TabsTrigger>
          <TabsTrigger value="mnemonics">
            <TestTubes className="h-4 w-4 mr-2" />
            Mnemonics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="formulas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                Physical Chemistry - Essential Formulas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {formulaSheets.physical.map((section, idx) => (
                  <AccordionItem key={idx} value={`physical-${idx}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {section.topic}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-4">
                        {section.formulas.map((formula, fIdx) => (
                          <Card key={fIdx} className="border-blue-500/20">
                            <CardContent className="pt-4">
                              <code className="text-sm bg-background/50 p-2 rounded block">
                                {formula}
                              </code>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="h-6 w-6 text-green-500" />
                Inorganic Chemistry - Key Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {formulaSheets.inorganic.map((section, idx) => (
                  <AccordionItem key={idx} value={`inorganic-${idx}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {section.topic}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-4">
                        {section.points.map((point, pIdx) => (
                          <Card key={pIdx} className="border-green-500/20">
                            <CardContent className="pt-4 text-sm">
                              • {point}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTubes className="h-6 w-6 text-purple-500" />
                Organic Chemistry - Reactions & Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {formulaSheets.organic.map((section, idx) => (
                  <AccordionItem key={idx} value={`organic-${idx}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {section.topic}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-4">
                        {(section.points || section.reactions || section.tests || []).map((item: string, iIdx: number) => (
                          <Card key={iIdx} className="border-purple-500/20">
                            <CardContent className="pt-4 text-sm">
                              • {item}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mind-maps" className="space-y-6">
          {mindMaps.map((map, idx) => (
            <Card key={idx} className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-2xl">{map.topic}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {map.branches.map((branch, bIdx) => (
                    <Card key={bIdx} className="bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-600 dark:text-purple-400">
                          {branch.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {branch.sub.map((item, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2">
                            <Badge variant="outline" className="mt-0.5">→</Badge>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="quick-tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>High-Yield Quick Tips & Exceptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {quickTips.map((tip, idx) => (
                  <Card key={idx} className="border-orange-500/20">
                    <CardContent className="pt-4 flex items-start gap-3">
                      <Badge variant="secondary">{idx + 1}</Badge>
                      <p className="text-sm">{tip}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mnemonics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Memory Aids & Mnemonics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">Electrochemical Series (Top 10)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm mb-2">
                    <strong>Please Send Lions, Cats, Monkeys And Zebras In Cages Made Of Strong Silver</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    K, Na, Ca, Mg, Al, Zn, Fe, H, Cu, Ag (increasing reduction potential)
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">Periodic Table Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm mb-2">
                    <strong>Happy Henry Lives Beside Boron Cottage, Near Our Friend Nelly Nancy's Mansion</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg (first 12 elements)
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">Organic Functional Group Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm mb-2">
                    <strong>Can Sam Cook Eggs And Kebabs On Hot Aluminium?</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    COOH, SO₃H, COOR, COCl, CONH₂, CHO, C=O, OH, NH₂ (decreasing priority)
                  </p>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">d-Block Elements (3d series)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm mb-2">
                    <strong>Science Teacher Vicky Craves Mangoes For Cookies, Nicely Cut, Zesty</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sc, Ti, V, Cr, Mn, Fe, Co, Ni, Cu, Zn
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle>How to Use This Chapter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Print/bookmark formula sheets for quick reference during practice</p>
          <p>✓ Review mind maps before each topic-wise test</p>
          <p>✓ Use mnemonics to memorize difficult sequences</p>
          <p>✓ Revise quick tips 2-3 days before exam</p>
          <p>✓ This chapter is designed for rapid last-minute revision</p>
          <p className="text-blue-600 dark:text-blue-400 font-semibold mt-3">
            Regular revision using this chapter can save 60+ minutes during exam!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
