
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Divide, Activity, Clock, AlertCircle, CheckCircle2 , Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
const cellCyclePhases = [
  {
    phase: "G1 Phase (Gap 1)",
    duration: "~11 hours",
    events: [
      "Cell grows in size",
      "Synthesis of enzymes for DNA replication",
      "Accumulation of energy in form of ATP",
      "Organelles are duplicated",
      "mRNA and proteins synthesized"
    ],
    checkpoint: "G1 checkpoint - checks cell size, nutrients, growth factors, DNA damage"
  },
  {
    phase: "S Phase (Synthesis)",
    duration: "~8 hours",
    events: [
      "DNA replication occurs",
      "Amount of DNA doubles (2n → 4n)",
      "Chromosome number remains same",
      "Histone proteins synthesized",
      "Centriole duplication begins"
    ],
    checkpoint: "S checkpoint - ensures proper DNA replication"
  },
  {
    phase: "G2 Phase (Gap 2)",
    duration: "~4 hours",
    events: [
      "Cell continues to grow",
      "Proteins required for mitosis synthesized",
      "Centriole duplication completes",
      "Energy stores increased",
      "Cell prepares for division"
    ],
    checkpoint: "G2 checkpoint - checks DNA replication completion and damage"
  },
  {
    phase: "M Phase (Mitosis)",
    duration: "~1 hour",
    events: [
      "Nuclear division (karyokinesis)",
      "Cytoplasmic division (cytokinesis)",
      "Two daughter cells formed",
      "Shortest phase of cell cycle"
    ],
    checkpoint: "M checkpoint (Spindle checkpoint) - ensures proper chromosome attachment"
  }
];

const mitosisStages = [
  {
    stage: "Prophase",
    duration: "Longest phase",
    events: [
      "Chromatin condenses into chromosomes",
      "Each chromosome has 2 sister chromatids joined at centromere",
      "Centrioles move to opposite poles",
      "Spindle fibers start forming",
      "Nuclear membrane starts breaking down",
      "Nucleolus disappears"
    ],
    visualization: "🧬 Chromosomes condense and become visible"
  },
  {
    stage: "Metaphase",
    duration: "Short phase",
    events: [
      "Chromosomes align at equatorial plate (metaphase plate)",
      "Spindle fibers attach to kinetochores",
      "Nuclear envelope completely disappears",
      "Chromosomes are most condensed",
      "Best stage to study chromosome morphology"
    ],
    visualization: "⚖️ Chromosomes line up at cell center"
  },
  {
    stage: "Anaphase",
    duration: "Shortest phase",
    events: [
      "Centromeres split",
      "Sister chromatids separate",
      "Chromatids move to opposite poles",
      "Spindle fibers shorten",
      "Cell elongates",
      "Each pole receives equal number of chromosomes"
    ],
    visualization: "⬅️➡️ Chromatids pulled to opposite poles"
  },
  {
    stage: "Telophase",
    duration: "Reverse of prophase",
    events: [
      "Chromosomes reach opposite poles",
      "Chromosomes decondense",
      "Nuclear envelope reforms around each set",
      "Nucleolus reappears",
      "Spindle fibers disappear",
      "Cytokinesis begins"
    ],
    visualization: "🔄 Two nuclei form, cell prepares to divide"
  }
];

const meiosisStages = {
  meiosis1: [
    {
      stage: "Prophase I",
      substages: "Leptotene → Zygotene → Pachytene → Diplotene → Diakinesis",
      keyEvents: [
        "Leptotene: Chromosomes condense, become visible",
        "Zygotene: Homologous chromosomes pair (synapsis), form bivalents",
        "Pachytene: Crossing over occurs, genetic recombination",
        "Diplotene: Homologous chromosomes start separating, chiasmata visible",
        "Diakinesis: Chromosomes fully condensed, nuclear envelope breaks"
      ],
      importance: "Crossing over provides genetic variation"
    },
    {
      stage: "Metaphase I",
      keyEvents: [
        "Bivalents align at equatorial plate",
        "Spindle fibers attach to centromeres",
        "Each chromosome pair faces opposite poles"
      ]
    },
    {
      stage: "Anaphase I",
      keyEvents: [
        "Homologous chromosomes separate",
        "Sister chromatids remain attached at centromere",
        "Reduction in chromosome number (diploid → haploid)"
      ]
    },
    {
      stage: "Telophase I & Cytokinesis I",
      keyEvents: [
        "Two haploid cells formed",
        "Each cell has half the chromosome number",
        "Nuclear envelope may reform briefly",
        "Cells enter Meiosis II (after brief interkinesis)"
      ]
    }
  ],
  meiosis2: [
    {
      stage: "Prophase II",
      keyEvents: [
        "Chromosomes condense again",
        "Nuclear envelope breaks down",
        "Spindle apparatus forms"
      ]
    },
    {
      stage: "Metaphase II",
      keyEvents: [
        "Chromosomes align at equator",
        "Spindle fibers attach to centromeres"
      ]
    },
    {
      stage: "Anaphase II",
      keyEvents: [
        "Centromeres split",
        "Sister chromatids separate",
        "Move to opposite poles"
      ]
    },
    {
      stage: "Telophase II & Cytokinesis II",
      keyEvents: [
        "Four haploid cells formed",
        "Nuclear envelope reforms",
        "Chromosomes decondense",
        "Cells differentiate into gametes"
      ]
    }
  ]
};

const mitosisMeiosisComparison = [
  {
    feature: "Occurrence",
    mitosis: "Somatic cells",
    meiosis: "Germ cells (reproductive organs)"
  },
  {
    feature: "Number of divisions",
    mitosis: "One division",
    meiosis: "Two divisions (Meiosis I & II)"
  },
  {
    feature: "Daughter cells",
    mitosis: "2 diploid cells",
    meiosis: "4 haploid cells"
  },
  {
    feature: "Chromosome number",
    mitosis: "Remains same (2n → 2n)",
    meiosis: "Reduced to half (2n → n)"
  },
  {
    feature: "Crossing over",
    mitosis: "Does not occur",
    meiosis: "Occurs in Prophase I"
  },
  {
    feature: "Genetic variation",
    mitosis: "No genetic variation",
    meiosis: "High genetic variation"
  },
  {
    feature: "Purpose",
    mitosis: "Growth, repair, asexual reproduction",
    meiosis: "Sexual reproduction, gamete formation"
  }
];

const significancePoints = [
  {
    category: "Mitosis Significance",
    points: [
      "Growth and development of multicellular organisms",
      "Replacement of dead and damaged cells",
      "Wound healing and tissue repair",
      "Asexual reproduction in organisms",
      "Maintains chromosome number across generations",
      "Genetic stability - daughter cells identical to parent"
    ]
  },
  {
    category: "Meiosis Significance",
    points: [
      "Formation of gametes (sex cells)",
      "Maintains chromosome number in species",
      "Introduces genetic variation through crossing over",
      "Random assortment of chromosomes",
      "Essential for sexual reproduction",
      "Evolutionary significance - source of variation for natural selection"
    ]
  }
];

const neetQuestions = [
  {
    question: "During which phase of the cell cycle does DNA replication occur?",
    options: ["A) G1 phase", "B) S phase", "C) G2 phase", "D) M phase"],
    correct: "B",
    explanation: "DNA replication occurs during S (Synthesis) phase. The amount of DNA doubles from 2n to 4n, though chromosome number remains the same."
  },
  {
    question: "Crossing over occurs during which stage of meiosis?",
    options: [
      "A) Leptotene of Prophase I",
      "B) Pachytene of Prophase I",
      "C) Metaphase I",
      "D) Anaphase I"
    ],
    correct: "B",
    explanation: "Crossing over occurs during Pachytene stage of Prophase I. This is when homologous chromosomes exchange genetic material, creating genetic variation."
  },
  {
    question: "The number of chromosomes at the end of Meiosis I is:",
    options: [
      "A) Same as parent cell",
      "B) Double of parent cell",
      "C) Half of parent cell",
      "D) Four times parent cell"
    ],
    correct: "C",
    explanation: "Meiosis I is reductional division. It reduces chromosome number from diploid (2n) to haploid (n), which is half the parent cell number."
  }
];

export function BotanyChapter7() {
  // Fetch questions from database for Cell Cycle and Cell Division (topicId: 71)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '71'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=71');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  return (
    <div className="container mx-auto p-6 space-y-6 gradient-mesh-bg min-h-screen">
      <div className="flex items-center gap-3 mb-6 float-gentle">
        <RefreshCw className="h-8 w-8 text-green-500 animate-spin" style={{ animationDuration: '3s' }} />
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Chapter 7: Cell Cycle and Cell Division
          </h1>
          <p className="text-muted-foreground">Understanding mitosis, meiosis, and cell cycle regulation</p>
        </div>
      </div>

      <Card className="glass-panel glow-halo float-medium">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Chapter Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The cell cycle is an orderly sequence of events in which a cell grows, duplicates its genetic material,
            and divides into two daughter cells. Cell division is essential for growth, repair, and reproduction
            in all living organisms.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="cell-cycle" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="cell-cycle">
            <Clock className="h-4 w-4 mr-2" />
            Cell Cycle
          </TabsTrigger>
          <TabsTrigger value="mitosis">
            <Divide className="h-4 w-4 mr-2" />
            Mitosis
          </TabsTrigger>
          <TabsTrigger value="meiosis">
            <Activity className="h-4 w-4 mr-2" />
            Meiosis
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <AlertCircle className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cell-cycle" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Phases of Cell Cycle</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Cell cycle consists of Interphase (G1, S, G2) and M phase (Mitosis). Total duration: ~24 hours in human cells.
              </p>
              <div className="space-y-4">
                {cellCyclePhases.map((phase, idx) => (
                  <Card key={idx} className="border-blue-500/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                          {phase.phase}
                        </CardTitle>
                        <Badge variant="secondary">{phase.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2">Key Events:</h4>
                        <ul className="space-y-1">
                          {phase.events.map((event, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{event}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Card className="bg-orange-500/10 border-orange-500/20 glass-panel glow-halo float-medium">
                        <CardContent className="pt-4">
                          <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                            🎯 {phase.checkpoint}
                          </p>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>G0 Phase (Quiescent Stage)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                Cells that do not divide further exit G1 and enter G0 phase (metabolically active but non-dividing).
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Example: Nerve cells, heart muscle cells</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Some cells can re-enter cell cycle when stimulated (liver cells)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitosis" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Stages of Mitosis (Karyokinesis)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Mitosis is equational division producing two genetically identical diploid daughter cells.
              </p>
              <div className="space-y-4">
                {mitosisStages.map((stage, idx) => (
                  <Card key={idx} className="border-green-500/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-green-600 dark:text-green-400">
                          {stage.stage}
                        </CardTitle>
                        <Badge variant="outline">{stage.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-2xl text-center p-3 bg-green-500/10 rounded">
                        {stage.visualization}
                      </div>
                      <ul className="space-y-1">
                        {stage.events.map((event, eIdx) => (
                          <li key={eIdx} className="flex items-start gap-2 text-sm">
                            <span className="text-green-500 font-bold">•</span>
                            <span>{event}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Cytokinesis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">In Animal Cells:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Cleavage furrow forms (cell membrane pinches inward)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Contractile ring of actin and myosin contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Cell divides from periphery to center</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">In Plant Cells:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Cell plate forms at center (from vesicles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Cell plate grows outward to periphery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>New cell wall forms along cell plate</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meiosis" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Meiosis I (Reductional Division)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {meiosisStages.meiosis1.map((stage, idx) => (
                <Card key={idx} className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600 dark:text-purple-400">
                      {stage.stage}
                    </CardTitle>
                    {stage.substages && (
                      <p className="text-sm text-muted-foreground">{stage.substages}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {stage.keyEvents.map((event, eIdx) => (
                        <li key={eIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-purple-500 font-bold">•</span>
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                    {stage.importance && (
                      <Card className="bg-orange-500/10 border-orange-500/20 mt-3 glass-panel glow-halo float-medium">
                        <CardContent className="pt-3">
                          <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                            ⚡ {stage.importance}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Meiosis II (Equational Division)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Meiosis II is similar to mitosis. Sister chromatids separate, producing four haploid cells.
              </p>
              <div className="space-y-3">
                {meiosisStages.meiosis2.map((stage, idx) => (
                  <Card key={idx} className="border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                        {stage.stage}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {stage.keyEvents.map((event, eIdx) => (
                          <li key={eIdx} className="flex items-start gap-2 text-sm">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{event}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="glass-panel glow-halo float-slow">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-green-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mitosis vs Meiosis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left">Feature</th>
                      <th className="p-3 text-left bg-green-500/10">Mitosis</th>
                      <th className="p-3 text-left bg-purple-500/10">Meiosis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mitosisMeiosisComparison.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3 font-semibold">{row.feature}</td>
                        <td className="p-3 bg-green-500/5">{row.mitosis}</td>
                        <td className="p-3 bg-purple-500/5">{row.meiosis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {significancePoints.map((section, idx) => (
              <Card key={idx} className={`glass-panel glow-halo ${idx === 0 ? 'float-gentle border-green-500/20' : 'float-medium border-purple-500/20'}`}>
                <CardHeader>
                  <CardTitle className={idx === 0 ? "text-green-600 dark:text-green-400" : "text-purple-600 dark:text-purple-400"}>
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${idx === 0 ? 'text-green-500' : 'text-purple-500'}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
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
                    <span>{getQuestionLabel(q)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    {q.options.map((option, oIdx) => (
                      <Card key={oIdx} className={option.startsWith(q.correct) ? "border-green-500/50 bg-green-500/10" : ""}>
                        <CardContent className="pt-4">
                          <p className="text-sm">{getOptionLabel(option)}</p>
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
