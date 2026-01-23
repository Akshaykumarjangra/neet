import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VernierCaliper from "@/visuals/jsx/VernierCaliper";
import { BookOpen, Lightbulb, Calculator, Atom , Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter1Topics: Topic[] = [
  {
    id: "physical-world",
    title: "Physical World",
    description: "Physics is the study of nature and natural phenomena. It deals with matter, energy, space, and time.",
    keyPoints: [
      "Physics is the fundamental science that explains natural phenomena",
      "Scientific method: Observation → Hypothesis → Experimentation → Theory",
      "Physics has broad scope: from subatomic particles to the universe",
      "Fundamental forces: Gravitational, Electromagnetic, Strong Nuclear, Weak Nuclear"
    ],
    examples: [
      "Newton's apple falling - gravity demonstration",
      "Lightning - electromagnetic phenomenon",
      "Radioactive decay - nuclear forces"
    ]
  },
  {
    id: "physical-quantities",
    title: "Physical Quantities and Measurements",
    description: "Physical quantities are properties that can be measured. They are classified as fundamental and derived quantities.",
    keyPoints: [
      "Fundamental quantities: Length, Mass, Time, Electric Current, Temperature, Amount of Substance, Luminous Intensity",
      "Derived quantities: Area, Volume, Density, Speed, Acceleration, Force, etc.",
      "SI Units (International System of Units) - standard measurement system",
      "Dimensional analysis helps check equation validity"
    ],
    examples: [
      "Length: meter (m), Mass: kilogram (kg), Time: second (s)",
      "Speed = Distance/Time (derived from fundamental quantities)",
      "Density = Mass/Volume (kg/m³)"
    ],
    formulas: [
      "Speed = Distance / Time",
      "Density = Mass / Volume",
      "Force = Mass × Acceleration"
    ]
  },
  {
    id: "si-units",
    title: "SI Units and Dimensional Analysis",
    description: "The International System of Units provides a standard for measurements worldwide.",
    keyPoints: [
      "7 Base SI Units: m, kg, s, A, K, mol, cd",
      "Prefixes: nano (10⁻⁹), micro (10⁻⁶), milli (10⁻³), kilo (10³), mega (10⁶)",
      "Dimensional formula: expression showing powers of fundamental quantities",
      "Principle of homogeneity: terms in an equation must have same dimensions"
    ],
    examples: [
      "[Length] = L, [Mass] = M, [Time] = T",
      "[Velocity] = LT⁻¹, [Acceleration] = LT⁻²",
      "[Force] = MLT⁻², [Energy] = ML²T⁻²"
    ],
    formulas: [
      "[Area] = L²",
      "[Volume] = L³",
      "[Density] = ML⁻³",
      "[Pressure] = ML⁻¹T⁻²"
    ]
  },
  {
    id: "measurement-instruments",
    title: "Measurement Instruments",
    description: "Precision instruments are used to measure physical quantities accurately.",
    keyPoints: [
      "Vernier Caliper: Measures length up to 0.01 cm accuracy",
      "Screw Gauge/Micrometer: Measures thickness up to 0.001 cm accuracy",
      "Least Count = (1 Main Scale Division) / (Number of divisions on Vernier)",
      "Zero error must be accounted for in measurements"
    ],
    examples: [
      "Vernier Caliper: Measuring diameter of a ball bearing",
      "Screw Gauge: Measuring wire thickness",
      "Reading = Main Scale Reading + (Vernier Coincidence × Least Count)"
    ],
    formulas: [
      "Least Count (Vernier) = 1 MSD / Number of VSD",
      "Least Count (Screw Gauge) = Pitch / Number of circular divisions",
      "Actual Reading = Observed Reading ± Zero Error"
    ]
  },
  {
    id: "errors-accuracy",
    title: "Errors and Significant Figures",
    description: "Understanding errors in measurement and expressing results with proper precision.",
    keyPoints: [
      "Systematic errors: Consistent errors (instrumental, personal)",
      "Random errors: Unpredictable fluctuations",
      "Absolute error: |True value - Measured value|",
      "Significant figures: Reliable digits in a measurement"
    ],
    examples: [
      "Measuring 2.54 cm has 3 significant figures",
      "0.00456 has 3 significant figures (leading zeros don't count)",
      "250 has 2 significant figures (unless specified as 250.)"
    ],
    formulas: [
      "Relative Error = Absolute Error / True Value",
      "Percentage Error = (Relative Error) × 100%",
      "Mean Absolute Error = Σ|Δx| / n"
    ]
  }
];

export function PhysicsChapter1() {
  // Fetch questions from database for Physical World and Measurement (topicId: 13)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '13'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=13');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="container mx-auto p-6 space-y-6"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Atom className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 1: Physical World and Measurement</h1>
          <p className="text-muted-foreground">Class XI Physics - NEET Syllabus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="visualization">
            <Calculator className="h-4 w-4 mr-2" />
            3D Models
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Chapter Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Understanding the scope and nature of Physics</li>
                    <li>Physical quantities and their classification</li>
                    <li>SI Units and dimensional analysis</li>
                    <li>Measurement instruments (Vernier Caliper, Screw Gauge)</li>
                    <li>Error analysis and significant figures</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
                    <Card className="border-primary/20">
                      <CardHeader>
                        <Badge className="w-fit mb-2">NEET Important</Badge>
                        <CardTitle className="text-lg">Key Formulas</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>• Least Count = 1 MSD / n (Vernier)</p>
                        <p>• Least Count = Pitch / Divisions (Screw Gauge)</p>
                        <p>• % Error = (Absolute Error / True Value) × 100</p>
                        <p>• [Force] = [M L T⁻²]</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
                    <Card className="border-secondary/20">
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">Practice</Badge>
                        <CardTitle className="text-lg">Common Mistakes</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>• Forgetting to account for zero error</p>
                        <p>• Incorrect significant figures in calculations</p>
                        <p>• Mixing up dimensional formulas</p>
                        <p>• Not using proper unit conversions</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter1Topics.map((topic, index) => (
              <motion.div key={topic.id} variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: index * 0.1 }}>
                <AccordionItem value={topic.id}>
                  <Card>
                    <AccordionTrigger className="px-6 hover:no-underline">
                      <div className="flex items-start gap-3 text-left">
                        <Badge variant="outline" className="mt-1">
                          {index + 1}
                        </Badge>
                        <div>
                          <h3 className="text-lg font-semibold">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CardContent className="space-y-6 pt-4">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Key Concepts
                          </h4>
                          <ul className="space-y-2">
                            {topic.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {topic.formulas && topic.formulas.length > 0 && (
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Calculator className="h-4 w-4" />
                              Important Formulas
                            </h4>
                            <div className="space-y-2">
                              {topic.formulas.map((formula, i) => (
                                <p key={i} className="font-mono text-sm bg-background p-2 rounded">
                                  {formula}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="font-semibold mb-3">Examples</h4>
                          <div className="space-y-2">
                            {topic.examples.map((example, i) => (
                              <div key={i} className="bg-secondary/10 p-3 rounded-lg">
                                <p className="text-sm">{example}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          Practice Questions on {topic.title}
                        </Button>
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Interactive 3D Visualizations</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Explore measurement concepts through interactive 3D models
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <VernierCaliper />

                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">How to Use Vernier Caliper</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p><strong>Step 1:</strong> Place object between jaws</p>
                        <p><strong>Step 2:</strong> Note main scale reading (MSR)</p>
                        <p><strong>Step 3:</strong> Find vernier coincidence (VC)</p>
                        <p><strong>Step 4:</strong> Reading = MSR + (VC × LC)</p>
                        <p className="text-primary font-semibold mt-3">LC = 0.01 cm (typically)</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
                    <Card className="border-secondary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">Common Applications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>• Measuring external diameter of cylinders</p>
                        <p>• Measuring internal diameter of hollow objects</p>
                        <p>• Measuring depth of containers</p>
                        <p>• Measuring thickness of flat objects</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Measurement Precision Comparison</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-background rounded">
                      <span>Meter Scale</span>
                      <Badge variant="outline">0.1 cm</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded">
                      <span>Vernier Caliper</span>
                      <Badge>0.01 cm</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background rounded">
                      <span>Screw Gauge</span>
                      <Badge variant="secondary">0.001 cm</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
