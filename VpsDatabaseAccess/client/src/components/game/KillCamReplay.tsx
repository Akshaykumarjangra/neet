import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, X, Lightbulb, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface KillCamReplayProps {
  isVisible: boolean;
  isCorrect: boolean;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  solutionSteps?: string[];
  onClose: () => void;
  onNextQuestion?: () => void;
}

export function KillCamReplay({
  isVisible,
  isCorrect,
  question,
  userAnswer,
  correctAnswer,
  explanation,
  solutionSteps = [],
  onClose,
  onNextQuestion,
}: KillCamReplayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);

  useEffect(() => {
    if (isVisible && solutionSteps.length > 0 && !showAllSteps) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= solutionSteps.length - 1) {
            setShowAllSteps(true);
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 800);

      return () => clearInterval(timer);
    }
  }, [isVisible, solutionSteps.length, showAllSteps]);

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
      setShowAllSteps(solutionSteps.length === 0);
    }
  }, [isVisible, solutionSteps.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          data-testid="kill-cam-overlay"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="glass-panel border-2 shadow-2xl" data-testid="kill-cam-card">
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {isCorrect ? (
                      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-500">
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-2xl">
                        {isCorrect ? "Excellent!" : "Kill-Cam Replay"}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isCorrect ? "Perfect answer! Here's why you nailed it" : "Let's break down the correct approach"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full"
                    data-testid="button-close-killcam"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Question Recap */}
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Question</p>
                  <p className="text-base">{question}</p>
                </div>

                {/* Answer Comparison */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-emerald-500 bg-emerald-500/10' : 'border-red-500 bg-red-500/10'}`}>
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      {isCorrect ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-red-500" />}
                      Your Answer
                    </p>
                    <p className="text-lg font-bold">{userAnswer}</p>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-emerald-500 bg-emerald-500/10">
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Correct Answer
                    </p>
                    <p className="text-lg font-bold">{correctAnswer}</p>
                  </div>
                </div>

                {/* Solution Steps (Animated Replay) */}
                {solutionSteps.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <h3 className="font-bold text-lg">Step-by-Step Solution</h3>
                      <Badge variant="outline" className="ml-auto">
                        Replaying ({Math.min(currentStep + 1, solutionSteps.length)} / {solutionSteps.length})
                      </Badge>
                    </div>

                    {solutionSteps.map((step, index) => (
                      <AnimatePresence key={index}>
                        {(showAllSteps || index <= currentStep) && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500"
                            data-testid={`solution-step-${index}`}
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <p className="flex-1 pt-1">{step}</p>
                            {index === currentStep && !showAllSteps && (
                              <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <ArrowRight className="h-5 w-5 text-purple-500" />
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                )}

                {/* Final Explanation */}
                {showAllSteps && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500"
                  >
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-cyan-500" />
                      Key Concept
                    </p>
                    <p className="text-muted-foreground">{explanation}</p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                {showAllSteps && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 pt-4"
                  >
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                      data-testid="button-review-again"
                    >
                      Review Again
                    </Button>
                    {onNextQuestion && (
                      <Button
                        onClick={onNextQuestion}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"
                        data-testid="button-next-question"
                      >
                        Next Question
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
