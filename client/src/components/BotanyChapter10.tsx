
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wind, Zap, Flame, Droplet, Activity, TestTubes , Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const respirationOverview = {
  definition: "Process of oxidation of food materials (glucose) to release energy in the form of ATP, with the release of CO₂",
  equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (686 kcal or 38 ATP)",
  types: [
    {
      type: "Aerobic Respiration",
      description: "Respiration in presence of oxygen",
      location: "Mitochondria (mainly), Cytoplasm (glycolysis)",
      products: "38 ATP, 6CO₂, 6H₂O"
    },
    {
      type: "Anaerobic Respiration",
      description: "Respiration in absence of oxygen",
      location: "Cytoplasm",
      products: "2 ATP, Ethanol + CO₂ or Lactic acid"
    }
  ]
};

const glycolysis = {
  name: "Glycolysis (EMP Pathway)",
  fullForm: "Embden-Meyerhof-Parnas Pathway",
  location: "Cytoplasm",
  steps: [
    {
      phase: "Preparatory Phase (Energy Investment)",
      description: "Glucose is phosphorylated and converted to fructose-1,6-bisphosphate",
      steps: [
        "Glucose + ATP → Glucose-6-phosphate (Hexokinase)",
        "Glucose-6-phosphate → Fructose-6-phosphate",
        "Fructose-6-phosphate + ATP → Fructose-1,6-bisphosphate",
        "Fructose-1,6-bisphosphate → 2 molecules of G3P (3-carbon)"
      ],
      atp: "-2 ATP consumed"
    },
    {
      phase: "Payoff Phase (Energy Generation)",
      description: "G3P is oxidized to pyruvate with ATP and NADH production",
      steps: [
        "2 G3P + 2 NAD⁺ + 2 Pi → 2 1,3-bisphosphoglycerate + 2 NADH",
        "2 1,3-bisphosphoglycerate + 2 ADP → 2 3-phosphoglycerate + 2 ATP",
        "2 3-phosphoglycerate → 2 2-phosphoglycerate",
        "2 2-phosphoglycerate → 2 Phosphoenolpyruvate + 2 H₂O",
        "2 Phosphoenolpyruvate + 2 ADP → 2 Pyruvate + 2 ATP"
      ],
      atp: "+4 ATP produced"
    }
  ],
  netProducts: {
    atp: "Net 2 ATP (4 produced - 2 consumed)",
    nadh: "2 NADH",
    pyruvate: "2 Pyruvate (3-carbon)"
  }
};

const krebs = {
  name: "Krebs Cycle (TCA Cycle)",
  fullForm: "Tricarboxylic Acid Cycle / Citric Acid Cycle",
  location: "Mitochondrial matrix",
  steps: [
    {
      step: "Formation of Acetyl CoA",
      reaction: "Pyruvate + NAD⁺ + CoA → Acetyl CoA + CO₂ + NADH",
      enzyme: "Pyruvate dehydrogenase complex",
      description: "Link reaction between glycolysis and Krebs cycle"
    },
    {
      step: "Condensation",
      reaction: "Acetyl CoA (2C) + Oxaloacetic acid (4C) → Citric acid (6C) + CoA",
      enzyme: "Citrate synthase",
      description: "First step of the cycle"
    },
    {
      step: "Isomerization",
      reaction: "Citric acid → Isocitric acid",
      enzyme: "Aconitase",
      description: "Rearrangement of citric acid"
    },
    {
      step: "Oxidative Decarboxylation 1",
      reaction: "Isocitric acid + NAD⁺ → α-ketoglutaric acid (5C) + CO₂ + NADH",
      enzyme: "Isocitrate dehydrogenase",
      description: "First CO₂ release"
    },
    {
      step: "Oxidative Decarboxylation 2",
      reaction: "α-ketoglutaric acid + NAD⁺ + CoA → Succinyl CoA (4C) + CO₂ + NADH",
      enzyme: "α-ketoglutarate dehydrogenase",
      description: "Second CO₂ release"
    },
    {
      step: "Substrate-level Phosphorylation",
      reaction: "Succinyl CoA + GDP + Pi → Succinic acid + GTP + CoA",
      enzyme: "Succinyl CoA synthetase",
      description: "Direct ATP/GTP formation"
    },
    {
      step: "Dehydrogenation 1",
      reaction: "Succinic acid + FAD → Fumaric acid + FADH₂",
      enzyme: "Succinate dehydrogenase",
      description: "FAD reduction"
    },
    {
      step: "Hydration",
      reaction: "Fumaric acid + H₂O → Malic acid",
      enzyme: "Fumarase",
      description: "Water addition"
    },
    {
      step: "Dehydrogenation 2",
      reaction: "Malic acid + NAD⁺ → Oxaloacetic acid + NADH",
      enzyme: "Malate dehydrogenase",
      description: "Regeneration of OAA to continue cycle"
    }
  ],
  productsPerCycle: {
    nadh: "3 NADH",
    fadh2: "1 FADH₂",
    gtp: "1 GTP (= 1 ATP)",
    co2: "2 CO₂"
  },
  totalPerGlucose: {
    nadh: "6 NADH (3 × 2 pyruvate)",
    fadh2: "2 FADH₂",
    atp: "2 ATP",
    co2: "4 CO₂"
  }
};

const etc = {
  name: "Electron Transport Chain",
  location: "Inner mitochondrial membrane (cristae)",
  description: "Series of electron carriers that transfer electrons from NADH and FADH₂ to O₂",
  complexes: [
    {
      complex: "Complex I (NADH Dehydrogenase)",
      function: "Accepts electrons from NADH",
      protons: "Pumps 4 H⁺ into intermembrane space"
    },
    {
      complex: "Complex II (Succinate Dehydrogenase)",
      function: "Accepts electrons from FADH₂",
      protons: "No proton pumping"
    },
    {
      complex: "Complex III (Cytochrome bc₁)",
      function: "Transfers electrons via cytochrome c",
      protons: "Pumps 4 H⁺"
    },
    {
      complex: "Complex IV (Cytochrome c oxidase)",
      function: "Final transfer to O₂, forming H₂O",
      protons: "Pumps 2 H⁺"
    }
  ],
  chemiosmosis: [
    "Proton gradient created across inner membrane",
    "H⁺ concentration higher in intermembrane space",
    "ATP synthase (Complex V) uses gradient energy",
    "H⁺ flows back through ATP synthase",
    "ADP + Pi → ATP (oxidative phosphorylation)"
  ],
  atpYield: {
    nadh: "Each NADH → ~2.5 ATP",
    fadh2: "Each FADH₂ → ~1.5 ATP"
  }
};

const anaerobicRespiration = [
  {
    type: "Alcoholic Fermentation",
    organisms: "Yeast, some bacteria, plant roots (waterlogged)",
    equation: "Glucose → 2 Ethanol + 2 CO₂ + 2 ATP",
    steps: [
      "Glycolysis: Glucose → 2 Pyruvate + 2 ATP + 2 NADH",
      "Pyruvate → Acetaldehyde + CO₂ (decarboxylation)",
      "Acetaldehyde + NADH → Ethanol + NAD⁺"
    ],
    importance: "Beer, wine production; bread making"
  },
  {
    type: "Lactic Acid Fermentation",
    organisms: "Muscle cells (during intense exercise), lactic acid bacteria",
    equation: "Glucose → 2 Lactic acid + 2 ATP",
    steps: [
      "Glycolysis: Glucose → 2 Pyruvate + 2 ATP + 2 NADH",
      "Pyruvate + NADH → Lactic acid + NAD⁺"
    ],
    importance: "Curd, yogurt production; causes muscle fatigue"
  }
];

const respiratoryQuotient = {
  definition: "RQ = Volume of CO₂ released / Volume of O₂ consumed",
  values: [
    {
      substrate: "Carbohydrates",
      rq: "1.0",
      equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
      explanation: "Equal volumes of CO₂ released and O₂ consumed"
    },
    {
      substrate: "Fats",
      rq: "0.7",
      equation: "2C₅₇H₁₁₀O₆ + 163O₂ → 114CO₂ + 110H₂O",
      explanation: "More O₂ needed for complete oxidation"
    },
    {
      substrate: "Proteins",
      rq: "0.8-0.9",
      equation: "Complex, varies with amino acid composition",
      explanation: "Intermediate between carbs and fats"
    },
    {
      substrate: "Organic Acids",
      rq: "> 1.0",
      equation: "2C₂H₂O₄ (Oxalic acid) + O₂ → 4CO₂ + 2H₂O",
      explanation: "More CO₂ released than O₂ consumed"
    }
  ]
};

const amphibolicPathway = [
  "Respiration is both catabolic and anabolic",
  "Intermediates can be withdrawn for biosynthesis",
  "Acetyl CoA → Fatty acids, steroids",
  "α-ketoglutaric acid → Amino acids (glutamic acid)",
  "Oxaloacetic acid → Amino acids (aspartic acid)",
  "Also acts as anabolic pathway when intermediates are used for synthesis"
];

const neetQuestions = [
  {
    question: "The net ATP gain from complete oxidation of one glucose molecule in aerobic respiration is:",
    options: [
      "A) 2 ATP",
      "B) 36-38 ATP",
      "C) 4 ATP",
      "D) 686 kcal"
    ],
    correct: "B",
    explanation: "Complete aerobic respiration yields 36-38 ATP molecules. The variation depends on the shuttle system used to transport NADH from cytoplasm to mitochondria."
  },
  {
    question: "Which step of respiration occurs in the cytoplasm?",
    options: [
      "A) Krebs cycle",
      "B) Electron transport chain",
      "C) Glycolysis",
      "D) Oxidative phosphorylation"
    ],
    correct: "C",
    explanation: "Glycolysis is the only step that occurs in the cytoplasm. All other steps (Krebs cycle, ETC, oxidative phosphorylation) occur in mitochondria."
  },
  {
    question: "The respiratory quotient (RQ) for fats is:",
    options: [
      "A) 1.0",
      "B) 0.7",
      "C) 0.8",
      "D) > 1.0"
    ],
    correct: "B",
    explanation: "RQ for fats is 0.7 because fats require more oxygen for complete oxidation relative to the CO₂ produced. Carbohydrates have RQ = 1.0, proteins have RQ = 0.8-0.9."
  },
  {
    question: "In Krebs cycle, substrate-level phosphorylation occurs during conversion of:",
    options: [
      "A) Citric acid to isocitric acid",
      "B) Succinyl CoA to succinic acid",
      "C) Fumaric acid to malic acid",
      "D) Malic acid to oxaloacetic acid"
    ],
    correct: "B",
    explanation: "Substrate-level phosphorylation in Krebs cycle occurs when succinyl CoA is converted to succinic acid, producing GTP (equivalent to ATP)."
  }
];

export function BotanyChapter10() {
  // Fetch questions from database for Photosynthesis in Higher Plants (topicId: 74)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '74'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=74');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  return (
    <div className="container mx-auto p-6 space-y-6 gradient-mesh-bg min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Wind className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 10: Respiration in Plants</h1>
          <p className="text-muted-foreground">Energy release through cellular respiration</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
        <CardHeader>
          <CardTitle>Chapter Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>{respirationOverview.definition}</p>
          <Card className="bg-orange-500/10 border-orange-500/20 glass-panel glow-halo float-medium">
            <CardContent className="pt-4">
              <p className="font-mono text-center text-lg">
                {respirationOverview.equation}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Tabs defaultValue="types" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="types">
            <Activity className="h-4 w-4 mr-2" />
            Types
          </TabsTrigger>
          <TabsTrigger value="glycolysis">
            <Zap className="h-4 w-4 mr-2" />
            Glycolysis
          </TabsTrigger>
          <TabsTrigger value="krebs">
            <Flame className="h-4 w-4 mr-2" />
            Krebs Cycle
          </TabsTrigger>
          <TabsTrigger value="etc">
            <Wind className="h-4 w-4 mr-2" />
            ETC
          </TabsTrigger>
          <TabsTrigger value="anaerobic">
            <Droplet className="h-4 w-4 mr-2" />
            Anaerobic
          </TabsTrigger>
          <TabsTrigger value="practice">
            <TestTubes className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="types" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {respirationOverview.types.map((type, idx) => (
              <Card key={idx} className={idx === 0 ? "border-green-500/20" : "border-red-500/20"}>
                <CardHeader>
                  <CardTitle className={idx === 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    {type.type}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Badge variant="secondary">Location</Badge>
                    <p className="text-sm mt-2">{type.location}</p>
                  </div>
                  <div>
                    <Badge variant="secondary">Products</Badge>
                    <p className="text-sm mt-2">{type.products}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-purple-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Respiratory Quotient (RQ)</CardTitle>
              <p className="text-sm text-muted-foreground">{respiratoryQuotient.definition}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {respiratoryQuotient.values.map((item, idx) => (
                  <Card key={idx} className="bg-purple-500/10 border-purple-500/20">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{item.substrate}</h4>
                        <Badge className="bg-purple-500">RQ = {item.rq}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.equation}</p>
                      <p className="text-sm">{item.explanation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="glycolysis" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>{glycolysis.name}</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge>Full Form: {glycolysis.fullForm}</Badge>
                <Badge variant="secondary">Location: {glycolysis.location}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {glycolysis.steps.map((phase, idx) => (
                <Card key={idx} className={idx === 0 ? "border-red-500/20" : "border-green-500/20"}>
                  <CardHeader>
                    <CardTitle className={`text-lg ${idx === 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {phase.phase}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {phase.steps.map((step, sIdx) => (
                      <Card key={sIdx} className={`${idx === 0 ? "bg-red-500/10 border-red-500/20" : "bg-green-500/10 border-green-500/20"}`}>
                        <CardContent className="pt-3">
                          <p className="text-sm font-mono">{step}</p>
                        </CardContent>
                      </Card>
                    ))}
                    <Badge className={idx === 0 ? "bg-red-500" : "bg-green-500"}>{phase.atp}</Badge>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>Net Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• ATP: {glycolysis.netProducts.atp}</p>
                  <p className="text-sm">• NADH: {glycolysis.netProducts.nadh}</p>
                  <p className="text-sm">• Pyruvate: {glycolysis.netProducts.pyruvate}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="krebs" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>{krebs.name}</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge>{krebs.fullForm}</Badge>
                <Badge variant="secondary">Location: {krebs.location}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {krebs.steps.map((step, idx) => (
                <Card key={idx} className="border-orange-500/20">
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{idx + 1}</Badge>
                      <h4 className="font-semibold">{step.step}</h4>
                    </div>
                    <p className="text-sm font-mono bg-orange-500/10 p-2 rounded">{step.reaction}</p>
                    <p className="text-sm text-muted-foreground">Enzyme: {step.enzyme}</p>
                    <p className="text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-lg">Per Cycle (1 Acetyl CoA)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <p>• {krebs.productsPerCycle.nadh}</p>
                    <p>• {krebs.productsPerCycle.fadh2}</p>
                    <p>• {krebs.productsPerCycle.gtp}</p>
                    <p>• {krebs.productsPerCycle.co2}</p>
                  </CardContent>
                </Card>

                <Card className="bg-green-500/10 border-green-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-lg">Per Glucose (2 turns)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <p>• {krebs.totalPerGlucose.nadh}</p>
                    <p>• {krebs.totalPerGlucose.fadh2}</p>
                    <p>• {krebs.totalPerGlucose.atp}</p>
                    <p>• {krebs.totalPerGlucose.co2}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="etc" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>{etc.name}</CardTitle>
              <Badge variant="secondary">Location: {etc.location}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{etc.description}</p>

              <div className="space-y-3">
                <h4 className="font-semibold">Electron Transport Complexes:</h4>
                {etc.complexes.map((complex, idx) => (
                  <Card key={idx} className="bg-purple-500/10 border-purple-500/20">
                    <CardContent className="pt-4 space-y-2">
                      <h5 className="font-semibold text-purple-600 dark:text-purple-400">{complex.complex}</h5>
                      <p className="text-sm">Function: {complex.function}</p>
                      <p className="text-sm text-muted-foreground">{complex.protons}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Chemiosmotic Hypothesis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {etc.chemiosmosis.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-500">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border-green-500/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle className="text-lg">ATP Yield from Electron Carriers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• {etc.atpYield.nadh}</p>
                  <p>• {etc.atpYield.fadh2}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anaerobic" className="space-y-6">
          {anaerobicRespiration.map((type, idx) => (
            <Card key={idx} className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">{type.type}</CardTitle>
                <Badge variant="secondary">Organisms: {type.organisms}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-red-500/10 border-red-500/20 glass-panel glow-halo float-medium">
                  <CardContent className="pt-4">
                    <p className="font-mono text-center">{type.equation}</p>
                  </CardContent>
                </Card>

                <div>
                  <h4 className="font-semibold mb-2">Steps:</h4>
                  {type.steps.map((step, sIdx) => (
                    <Card key={sIdx} className="mb-2">
                      <CardContent className="pt-3">
                        <p className="text-sm">{step}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <Badge className="bg-green-500">Importance</Badge>
                  <p className="text-sm mt-2">{type.importance}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-orange-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Amphibolic Pathway</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {amphibolicPathway.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-orange-500">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          {questionsLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
                <span>Loading questions from database...</span>
              </CardContent>
            </Card>
          ) : practiceQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <p>No questions available for this chapter yet.</p>
              </CardContent>
            </Card>
          ) : (
          <Accordion type="single" collapsible className="w-full">
            {neetQuestions.map((q, idx) => (
              <AccordionItem key={idx} value={`question-${idx}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-start gap-3">
                    <Badge>{idx + 1}</Badge>
                    <span>{q.questionText}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    {q.options.map((option, oIdx) => (
                      <Card key={oIdx} className={option.startsWith(q.correct) ? "border-green-500/50 bg-green-500/10" : ""}>
                        <CardContent className="pt-4">
                          <p className="text-sm">{typeof option === "string" ? option : option.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
                    <CardContent className="pt-4">
                      <p className="text-sm"><strong>Explanation:</strong> {q.explanation}</p>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        
          )}</TabsContent>
      </Tabs>
    </div>
  );
}
