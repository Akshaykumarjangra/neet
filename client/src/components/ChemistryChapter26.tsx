import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, TestTubes, Zap, Heart , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter26Topics: Topic[] = [
  {
    id: "drugs-medicines",
    title: "Drugs and Medicines",
    description: "Chemicals used for therapeutic purposes.",
    keyPoints: [
      "Drug: Chemical substance used for treatment/prevention of disease",
      "Medicine: Formulation containing drug + other ingredients",
      "Chemotherapy: Use of chemicals to treat diseases",
      "Classification by pharmacological effect: Analgesics, antibiotics, etc.",
      "Classification by molecular target: Enzymes, receptors, DNA",
      "Drug-receptor interaction: Lock and key mechanism",
      "Side effects: Unintended effects of drugs",
      "Drug abuse: Non-medical use causing dependence"
    ],
    examples: [
      "Analgesics: Pain relievers (aspirin, paracetamol)",
      "Antibiotics: Kill bacteria (penicillin, tetracycline)",
      "Antiseptics: Applied to living tissue (Dettol, tincture iodine)",
      "Disinfectants: Kill microbes on non-living surfaces (phenol)",
      "Antacids: Reduce stomach acidity"
    ]
  },
  {
    id: "analgesics",
    title: "Analgesics - Pain Killers",
    description: "Drugs that relieve pain without causing loss of consciousness.",
    keyPoints: [
      "Analgesics: Pain relieving drugs",
      "Non-narcotic analgesics: No addiction (aspirin, paracetamol)",
      "Narcotic analgesics: Addictive, affect CNS (morphine, codeine)",
      "Aspirin: Acetylsalicylic acid (anti-inflammatory, antipyretic)",
      "Paracetamol: Safer alternative to aspirin (less side effects)",
      "Ibuprofen: NSAID (non-steroidal anti-inflammatory drug)",
      "Morphine: Strongest painkiller, highly addictive",
      "Mechanism: Inhibit prostaglandin synthesis"
    ],
    examples: [
      "Aspirin: Headache, fever, inflammation",
      "Paracetamol (Acetaminophen): Fever, mild pain",
      "Ibuprofen: Arthritis, menstrual pain",
      "Morphine: Severe pain (post-surgery, cancer)",
      "Codeine: Moderate pain, cough suppressant"
    ],
    formulas: [
      "Aspirin: C₉H₈O₄",
      "Paracetamol: C₈H₉NO₂"
    ]
  },
  {
    id: "antibiotics",
    title: "Antibiotics",
    description: "Substances that kill or inhibit growth of microorganisms.",
    keyPoints: [
      "Antibiotics: Chemicals that kill/inhibit bacteria growth",
      "Bactericidal: Kill bacteria (penicillin)",
      "Bacteriostatic: Inhibit bacterial growth (tetracycline)",
      "Penicillin: First antibiotic, from Penicillium fungus",
      "Broad-spectrum: Effective against many bacteria (chloramphenicol)",
      "Narrow-spectrum: Effective against specific bacteria (penicillin G)",
      "Antibiotic resistance: Bacteria develop resistance over time",
      "Should not be used for viral infections"
    ],
    examples: [
      "Penicillin G: Gram-positive bacteria",
      "Ampicillin: Broad-spectrum penicillin",
      "Chloramphenicol: Typhoid fever",
      "Tetracycline: Acne, respiratory infections",
      "Streptomycin: Tuberculosis"
    ]
  },
  {
    id: "antiseptics-disinfectants",
    title: "Antiseptics and Disinfectants",
    description: "Chemicals that kill microorganisms on living and non-living surfaces.",
    keyPoints: [
      "Antiseptics: Applied to living tissue (skin, wounds)",
      "Disinfectants: Used on non-living surfaces (floors, instruments)",
      "Same chemical can be both (concentration dependent)",
      "Dettol: Chloroxylenol + terpineol (antiseptic)",
      "Phenol: 0.2% antiseptic, 1% disinfectant",
      "Tincture iodine: 2-3% iodine in alcohol (antiseptic)",
      "Bithional: Added to soaps (reduces bacterial count)",
      "Soframicin: Antibiotic cream (antiseptic)"
    ],
    examples: [
      "Dettol (Chloroxylenol): Wound cleaning",
      "Savlon (Cetrimide + Chlorhexidine): Skin antiseptic",
      "Tincture iodine: Cuts and wounds",
      "Phenol (Carbolic acid): Disinfectant for floors",
      "Bithional: Medicated soaps",
      "Hydrogen peroxide: Mild antiseptic"
    ]
  },
  {
    id: "antacids",
    title: "Antacids",
    description: "Substances that neutralize excess stomach acid.",
    keyPoints: [
      "Antacids: Neutralize excess HCl in stomach",
      "Hyperacidity: Excess acid production causes burning sensation",
      "Weak bases: NaHCO₃, Mg(OH)₂, Al(OH)₃",
      "Provide quick relief from acidity",
      "H₂ antagonists: Ranitidine, cimetidine (reduce acid production)",
      "Proton pump inhibitors: Omeprazole (block H⁺ pump)",
      "Metal hydroxides: Aluminum, magnesium hydroxide",
      "Should not be overused (may cause alkalosis)"
    ],
    examples: [
      "Sodium bicarbonate (NaHCO₃): Baking soda",
      "Milk of magnesia: Mg(OH)₂ suspension",
      "Aluminum hydroxide: Al(OH)₃ gel",
      "Ranitidine: Zantac (H₂ blocker)",
      "Omeprazole: Proton pump inhibitor"
    ],
    formulas: [
      "NaHCO₃ + HCl → NaCl + H₂O + CO₂",
      "Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O"
    ]
  },
  {
    id: "tranquilizers",
    title: "Tranquilizers",
    description: "Drugs used to treat mental diseases and anxiety.",
    keyPoints: [
      "Tranquilizers: Drugs for mental and emotional disorders",
      "Reduce anxiety, stress, tension without sedation",
      "Act on central nervous system (CNS)",
      "Barbiturates: Sleeping pills (sedatives)",
      "Benzodiazepines: Anti-anxiety drugs (diazepam)",
      "Equanil (Meprobamate): Minor tranquilizer",
      "Chlordiazepoxide: Anxiety, alcohol withdrawal",
      "Should be used only under medical supervision"
    ],
    examples: [
      "Diazepam (Valium): Anxiety, muscle relaxant",
      "Chlordiazepoxide (Librium): Anxiety disorders",
      "Equanil (Meprobamate): Stress, anxiety",
      "Barbituric acid derivatives: Sleeping pills",
      "Serotonin uptake inhibitors: Depression"
    ]
  },
  {
    id: "food-preservatives",
    title: "Food Preservatives",
    description: "Chemicals that prevent spoilage of food.",
    keyPoints: [
      "Preservatives: Prevent microbial growth in food",
      "Class I: Sugar, salt, vegetable oils (traditional)",
      "Class II: Chemical preservatives (benzoates, sulphites)",
      "Sodium benzoate (C₆H₅COONa): Jams, pickles",
      "Salts of sorbic acid: Cheese, baked goods",
      "Sulphur dioxide (SO₂): Wine, dried fruits",
      "Sodium metabisulphite: Prevents browning",
      "Safe concentration limits defined by food authorities"
    ],
    examples: [
      "Sodium benzoate: Soft drinks, fruit juices",
      "Potassium sorbate: Cheese, wine",
      "Sodium metabisulphite: Dried fruits, wine",
      "Vinegar (acetic acid): Pickles",
      "Sugar: High concentration preserves jams",
      "Salt: Meat, fish preservation"
    ]
  },
  {
    id: "artificial-sweeteners",
    title: "Artificial Sweetening Agents",
    description: "Chemical substances that provide sweetness without calories.",
    keyPoints: [
      "Artificial sweeteners: Sweeter than sugar, no calories",
      "Used by diabetics and for weight control",
      "Saccharin: 550 times sweeter than sugar",
      "Aspartame: 200 times sweeter (methyl ester of dipeptide)",
      "Sucralose: 600 times sweeter (from sucrose)",
      "Alitame: 2000 times sweeter",
      "Saccharin: Stable at cooking temperature",
      "Aspartame: Unstable at cooking temperature"
    ],
    examples: [
      "Saccharin: Soft drinks, low-calorie foods",
      "Aspartame (Equal, NutraSweet): Beverages, desserts",
      "Sucralose (Splenda): Baking, cooking",
      "Alitame: High-intensity sweetener",
      "Stevia: Natural sweetener"
    ],
    formulas: [
      "Saccharin: C₇H₅NO₃S",
      "Aspartame: C₁₄H₁₈N₂O₅"
    ]
  },
  {
    id: "soaps-detergents",
    title: "Soaps and Detergents",
    description: "Cleansing agents - soaps and synthetic detergents.",
    keyPoints: [
      "Soaps: Sodium/potassium salts of fatty acids",
      "Made by saponification of fats/oils",
      "Structure: Long hydrophobic tail + hydrophilic head",
      "Cleansing action: Micelle formation",
      "Ineffective in hard water (forms scum)",
      "Detergents: Synthetic cleaning agents",
      "Work in hard water (don't form scum)",
      "Types: Anionic, cationic, non-ionic"
    ],
    examples: [
      "Soap: C₁₇H₃₅COO⁻Na⁺ (sodium stearate)",
      "Anionic detergent: Sodium lauryl sulfate",
      "Cationic detergent: Cetyltrimethylammonium bromide",
      "Non-ionic detergent: Polyethylene glycol esters",
      "Toilet soaps: With perfumes and colors"
    ],
    formulas: [
      "Saponification: Fat + NaOH → Soap + Glycerol",
      "Soap structure: R-COO⁻Na⁺"
    ]
  }
];



export function ChemistryChapter26() {
  // Fetch questions from database for Aldehydes, Ketones and Carboxylic Acids (topicId: 60)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '60'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=60');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(
    ([qId, answer]) => {
      const question = practiceQuestions.find(q => q.id === parseInt(qId));
      return question && answer === question.correctAnswer;
    }
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 26: Chemistry in Everyday Life</h1>
          <p className="text-muted-foreground">Class XII Chemistry - NEET Syllabus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="visualization">
            <TestTubes className="h-4 w-4 mr-2" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Zap className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Drugs and medicines: Classification and uses</li>
                  <li>Analgesics: Pain killers (narcotic and non-narcotic)</li>
                  <li>Antibiotics: Bacterial infection treatment</li>
                  <li>Antiseptics and disinfectants</li>
                  <li>Antacids: Neutralizing stomach acid</li>
                  <li>Tranquilizers: Mental health treatment</li>
                  <li>Food preservatives and artificial sweeteners</li>
                  <li>Soaps and detergents: Cleansing agents</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Drugs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Aspirin, Paracetamol (Analgesics)</p>
                    <p>• Penicillin (Antibiotic)</p>
                    <p>• Ranitidine (Antacid)</p>
                    <p>• Aspartame (Sweetener)</p>
                    <p>• Sodium benzoate (Preservative)</p>
                    <p>• Equanil (Tranquilizer)</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Distinctions</Badge>
                    <CardTitle className="text-lg">Key Differences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Antiseptic vs Disinfectant</p>
                    <p>• Narcotic vs Non-narcotic</p>
                    <p>• Bactericidal vs Bacteriostatic</p>
                    <p>• Soap vs Detergent</p>
                    <p>• Natural vs Artificial sweeteners</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter26Topics.map((topic, index) => (
              <AccordionItem key={topic.id} value={topic.id}>
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
                              <span className="text-purple-500 mt-1">•</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {topic.formulas && topic.formulas.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Chemical Formulas
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
                        <h4 className="font-semibold mb-3">Examples & Uses</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                              <p className="text-sm font-mono">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Drug Classifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Analgesics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <p className="font-semibold mb-2">Non-Narcotic</p>
                      <p className="text-xs">• No addiction</p>
                      <p className="text-xs">• Aspirin, Paracetamol</p>
                      <Badge className="mt-2">Safe for mild pain</Badge>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="font-semibold mb-2">Narcotic</p>
                      <p className="text-xs">• Addictive, CNS effect</p>
                      <p className="text-xs">• Morphine, Codeine</p>
                      <Badge variant="destructive" className="mt-2">Severe pain only</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Antimicrobials</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                      <p className="font-semibold mb-2">Antiseptics</p>
                      <p className="text-xs">• Living tissue</p>
                      <p className="text-xs">• Dettol, Savlon</p>
                      <Badge variant="secondary" className="mt-2">0.2% phenol</Badge>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <p className="font-semibold mb-2">Disinfectants</p>
                      <p className="text-xs">• Non-living surfaces</p>
                      <p className="text-xs">• Floor cleaners</p>
                      <Badge variant="outline" className="mt-2">1% phenol</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>Common Drugs & Uses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Aspirin</p>
                      <p className="text-xs mt-1">Analgesic, antipyretic</p>
                      <p className="text-xs text-muted-foreground">Headache, fever, inflammation</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Paracetamol</p>
                      <p className="text-xs mt-1">Analgesic, safer alternative</p>
                      <p className="text-xs text-muted-foreground">Fever, mild pain</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Penicillin</p>
                      <p className="text-xs mt-1">First antibiotic</p>
                      <p className="text-xs text-muted-foreground">Bacterial infections</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Ranitidine</p>
                      <p className="text-xs mt-1">H₂ antagonist</p>
                      <p className="text-xs text-muted-foreground">Reduces stomach acid</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Equanil</p>
                      <p className="text-xs mt-1">Tranquilizer</p>
                      <p className="text-xs text-muted-foreground">Anxiety, stress</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Aspartame</p>
                      <p className="text-xs mt-1">Artificial sweetener</p>
                      <p className="text-xs text-muted-foreground">200× sweeter than sugar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Practice Questions</CardTitle>
                {showSolutions && (
                  <Badge variant={score >= 12 ? "default" : score >= 8 ? "secondary" : "destructive"}>
                    Score: {score}/{practiceQuestions.length}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {practiceQuestions.map((q, index) => (
                <Card key={q.id} className="border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}</Badge>
                        <p className="font-medium">Q{index + 1}. {q.questionText}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {q.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            showSolutions
                              ? index === q.correctAnswer
                                ? "default"
                                : userAnswers[q.id] === index
                                ? "destructive"
                                : "outline"
                              : userAnswers[q.id] === index
                              ? "secondary"
                              : "outline"
                          }
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => !showSolutions && handleAnswerSelect(q.id, index)}
                          disabled={showSolutions}
                        >
                          <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                          {typeof option === "string" ? option : option.text}
                        </Button>
                      ))}
                    </div>
                    {showSolutions && (
                      <div className="bg-muted p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Solution:</p>
                        <p className="text-sm">{q.solutionDetail}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-3">
                {!showSolutions ? (
                  <Button 
                    onClick={checkAnswers} 
                    className="flex-1"
                    disabled={Object.keys(userAnswers).length === 0}
                  >
                    Check Answers
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" className="flex-1">
                    Try Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        
          )}</TabsContent>
      </Tabs>
    </div>
  );
}