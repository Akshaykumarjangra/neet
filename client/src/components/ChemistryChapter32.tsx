
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timer, Trophy, AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const mockTestQuestions = [
  { id: 1, question: "Avogadro's number is:", options: ["6.022 × 10²²", "6.022 × 10²³", "6.022 × 10²⁴", "6.022 × 10²⁵"], correctAnswer: 1, topic: "Mole Concept" },
  { id: 2, question: "Electronic configuration of Cr (Z=24):", options: ["[Ar] 3d⁴ 4s²", "[Ar] 3d⁵ 4s¹", "[Ar] 3d⁶ 4s⁰", "[Ar] 4s² 3d⁴"], correctAnswer: 1, topic: "Atomic Structure" },
  { id: 3, question: "Most electronegative element:", options: ["Cl", "F", "O", "N"], correctAnswer: 1, topic: "Periodic Table" },
  { id: 4, question: "Shape of PCl₅:", options: ["Square pyramidal", "Trigonal bipyramidal", "Octahedral", "Tetrahedral"], correctAnswer: 1, topic: "Chemical Bonding" },
  { id: 5, question: "Ideal gas equation:", options: ["PV = RT", "PV = nRT", "P = nRT/V", "V = nRT/P"], correctAnswer: 1, topic: "Gaseous State" },
  { id: 6, question: "For exothermic reaction, ΔH is:", options: ["Positive", "Negative", "Zero", "Infinity"], correctAnswer: 1, topic: "Thermodynamics" },
  { id: 7, question: "pH of 0.01M HCl:", options: ["1", "2", "3", "4"], correctAnswer: 1, topic: "Equilibrium" },
  { id: 8, question: "Oxidation number of S in H₂SO₄:", options: ["+4", "+6", "-2", "+8"], correctAnswer: 1, topic: "Redox" },
  { id: 9, question: "Molality is moles per:", options: ["L solution", "kg solvent", "L solvent", "kg solution"], correctAnswer: 1, topic: "Solutions" },
  { id: 10, question: "E°cell > 0 indicates:", options: ["Non-spontaneous", "Spontaneous", "Equilibrium", "Reverse reaction"], correctAnswer: 1, topic: "Electrochemistry" },
  { id: 11, question: "Unit of rate constant for first order:", options: ["mol L⁻¹ s⁻¹", "s⁻¹", "L mol⁻¹ s⁻¹", "L² mol⁻² s⁻¹"], correctAnswer: 1, topic: "Kinetics" },
  { id: 12, question: "Adsorption is:", options: ["Endothermic", "Exothermic", "Neutral", "Depends"], correctAnswer: 1, topic: "Surface Chemistry" },
  { id: 13, question: "Heavy water is:", options: ["H₂O₂", "D₂O", "T₂O", "HDO"], correctAnswer: 1, topic: "Hydrogen" },
  { id: 14, question: "Caustic soda is:", options: ["Na₂CO₃", "NaHCO₃", "NaOH", "Ca(OH)₂"], correctAnswer: 2, topic: "s-Block" },
  { id: 15, question: "Inert pair effect is maximum in:", options: ["Group 13", "Group 14", "Group 15", "Group 16"], correctAnswer: 0, topic: "p-Block" },
  { id: 16, question: "Lanthanoid contraction is due to:", options: ["d-electrons", "f-electrons", "p-electrons", "s-electrons"], correctAnswer: 1, topic: "f-Block" },
  { id: 17, question: "IUPAC name of K₃[Fe(CN)₆]:", options: ["Potassium hexacyanoferrate(III)", "Potassium ferricyanide", "Both A and B", "None"], correctAnswer: 0, topic: "Coordination" },
  { id: 18, question: "Most stable carbocation:", options: ["CH₃⁺", "1°", "2°", "3°"], correctAnswer: 3, topic: "Organic GOC" },
  { id: 19, question: "Benzene undergoes:", options: ["Addition", "Substitution", "Both", "Neither"], correctAnswer: 1, topic: "Hydrocarbons" },
  { id: 20, question: "Best leaving group:", options: ["F⁻", "Cl⁻", "Br⁻", "I⁻"], correctAnswer: 3, topic: "Haloalkanes" },
  { id: 21, question: "Lucas test fastest with:", options: ["1° alcohol", "2° alcohol", "3° alcohol", "Phenol"], correctAnswer: 2, topic: "Alcohols" },
  { id: 22, question: "Fehling's test positive for:", options: ["Aldehydes only", "Ketones only", "Both", "Neither"], correctAnswer: 0, topic: "Aldehydes" },
  { id: 23, question: "Carbylamine test for:", options: ["1° amine", "2° amine", "3° amine", "All"], correctAnswer: 0, topic: "Amines" },
  { id: 24, question: "Non-reducing sugar:", options: ["Glucose", "Fructose", "Maltose", "Sucrose"], correctAnswer: 3, topic: "Biomolecules" },
  { id: 25, question: "Bakelite is:", options: ["Addition polymer", "Condensation polymer", "Both", "Neither"], correctAnswer: 1, topic: "Polymers" },
  { id: 26, question: "Aspirin is:", options: ["Analgesic", "Antipyretic", "Both", "Antibiotic"], correctAnswer: 2, topic: "Everyday Chemistry" },
  { id: 27, question: "Greenhouse gas:", options: ["N₂", "O₂", "CO₂", "Ar"], correctAnswer: 2, topic: "Environmental" },
  { id: 28, question: "If Kp > Kc, then Δn is:", options: ["Positive", "Negative", "Zero", "Can't say"], correctAnswer: 0, topic: "Equilibrium" },
  { id: 29, question: "SN2 reaction is:", options: ["Unimolecular", "Bimolecular", "Termolecular", "Zero-order"], correctAnswer: 1, topic: "Organic" },
  { id: 30, question: "Tollen's reagent is:", options: ["Fehling's solution", "Ammoniacal AgNO₃", "K₂Cr₂O₇", "KMnO₄"], correctAnswer: 1, topic: "Aldehydes" },
  { id: 31, question: "Chromyl chloride test for:", options: ["Cl⁻", "Br⁻", "I⁻", "SO₄²⁻"], correctAnswer: 0, topic: "Qualitative" },
  { id: 32, question: "Brown ring test for:", options: ["NO₃⁻", "NO₂⁻", "SO₄²⁻", "Cl⁻"], correctAnswer: 0, topic: "Qualitative" },
  { id: 33, question: "Entropy of universe is:", options: ["Increasing", "Decreasing", "Constant", "Zero"], correctAnswer: 0, topic: "Thermodynamics" },
  { id: 34, question: "Colligative property depends on:", options: ["Nature of solute", "Number of particles", "Both", "Neither"], correctAnswer: 1, topic: "Solutions" },
  { id: 35, question: "IUPAC name of CH₃COCH₃:", options: ["Acetone", "Propanone", "Dimethyl ketone", "2-propanone"], correctAnswer: 1, topic: "Aldehydes" },
  { id: 36, question: "Nylon-6,6 is:", options: ["Polyamide", "Polyester", "Polyethylene", "Polystyrene"], correctAnswer: 0, topic: "Polymers" },
  { id: 37, question: "Order of reaction can be:", options: ["Whole number only", "Fraction only", "Zero/whole/fraction", "Integer only"], correctAnswer: 2, topic: "Kinetics" },
  { id: 38, question: "Standard hydrogen electrode potential:", options: ["+1 V", "0 V", "-1 V", "+2 V"], correctAnswer: 1, topic: "Electrochemistry" },
  { id: 39, question: "Lanthanoids show oxidation state:", options: ["+2", "+3", "+4", "All"], correctAnswer: 3, topic: "f-Block" },
  { id: 40, question: "Victor Meyer test distinguishes:", options: ["1°,2°,3° alcohols", "Aldehydes & ketones", "Alkanes & alkenes", "Esters & ethers"], correctAnswer: 0, topic: "Alcohols" },
  { id: 41, question: "Ozone layer in:", options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], correctAnswer: 1, topic: "Environmental" },
  { id: 42, question: "CFCs destroy:", options: ["CO₂", "O₃", "N₂", "CH₄"], correctAnswer: 1, topic: "Environmental" },
  { id: 43, question: "Peptide bond between:", options: ["-COOH & -NH₂", "-OH & -H", "-CHO & -OH", "-COOH & -OH"], correctAnswer: 0, topic: "Biomolecules" },
  { id: 44, question: "Biodegradable polymer:", options: ["Polythene", "PVC", "PHBV", "Teflon"], correctAnswer: 2, topic: "Polymers" },
  { id: 45, question: "Freon-12 is:", options: ["CCl₄", "CFCl₃", "CF₂Cl₂", "CHCl₃"], correctAnswer: 2, topic: "Haloalkanes" }
];

export function ChemistryChapter32() {
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (!showResults) {
      setUserAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    }
  };

  const submitTest = () => {
    setShowResults(true);
  };

  const score = Object.entries(userAnswers).filter(
    ([qId, answer]) => answer === mockTestQuestions[parseInt(qId) - 1].correctAnswer
  ).length;

  const percentage = Math.round((score / mockTestQuestions.length) * 100);
  const marks = score * 4; // 4 marks per question

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 32: Full-Length Mock Test</h1>
          <p className="text-muted-foreground">45 Questions | 180 Marks | 60 Minutes</p>
        </div>
      </div>

      {!testStarted ? (
        <Card>
          <CardHeader>
            <CardTitle>NEET Chemistry Mock Test Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Total Questions: 45 (All topics covered)
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Total Marks: 180 (4 marks each)
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Duration: 60 minutes (1 hour)
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Marking: +4 for correct, 0 for unattempted
              </p>
              <p className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Note: This is a practice test (no negative marking)
              </p>
            </div>

            <Button onClick={() => setTestStarted(true)} size="lg" className="w-full">
              Start Mock Test
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {!showResults && (
            <Card className="sticky top-0 z-10 bg-background/95 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5" />
                    <span className="font-semibold">
                      Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <Badge variant="outline">
                    Answered: {Object.keys(userAnswers).length}/45
                  </Badge>
                </div>
                <Progress value={(Object.keys(userAnswers).length / 45) * 100} />
              </CardContent>
            </Card>
          )}

          {showResults && (
            <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  Your Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold">{score}/45 ({percentage}%)</p>
                <p className="text-xl">Total Marks: {marks}/180</p>
                <div className="mt-4">
                  {percentage >= 80 && <p className="text-green-600 dark:text-green-400">🎉 Excellent! You're well-prepared!</p>}
                  {percentage >= 60 && percentage < 80 && <p className="text-yellow-600 dark:text-yellow-400">👍 Good effort! Review weak areas.</p>}
                  {percentage < 60 && <p className="text-red-600 dark:text-red-400">💪 Keep practicing! Focus on concepts.</p>}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockTestQuestions.map((q, index) => (
              <Card key={q.id} className="border-purple-500/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline">Q{q.id}</Badge>
                        <Badge variant="secondary">{q.topic}</Badge>
                      </div>
                      <p className="font-medium">{q.question}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {q.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showResults
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
                      onClick={() => handleAnswerSelect(q.id, index)}
                      disabled={showResults}
                    >
                      <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                      {typeof option === "string" ? option : option.text}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {!showResults && (
            <Card className="sticky bottom-0 bg-background/95 backdrop-blur">
              <CardContent className="pt-6">
                <Button 
                  onClick={submitTest} 
                  size="lg" 
                  className="w-full"
                  disabled={Object.keys(userAnswers).length === 0}
                >
                  Submit Test
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
