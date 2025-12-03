import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, CheckCircle2, XCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SolutionPanelProps {
  isCorrect: boolean;
  correctAnswer: string;
  userAnswer: string;
  explanation: string;
  steps?: string[];
  relatedTopics?: string[];
}

export function SolutionPanel({
  isCorrect,
  correctAnswer,
  userAnswer,
  explanation,
  steps = [],
  relatedTopics = [],
}: SolutionPanelProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mt-4" data-testid="solution-panel">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Solution
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              data-testid="button-toggle-solution"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Correct!
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-600 border-red-500">
                      <XCircle className="w-3 h-3 mr-1" />
                      Incorrect
                    </Badge>
                  )}
                </div>

                <div className="grid gap-3">
                  {!isCorrect && userAnswer && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                    >
                      <p className="text-sm text-red-600 font-medium">Your Answer: {userAnswer}</p>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                  >
                    <p className="text-sm text-green-600 font-medium">Correct Answer: {correctAnswer}</p>
                  </motion.div>
                </div>

                {explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <p className="font-medium text-sm">Explanation</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {explanation}
                    </p>
                  </motion.div>
                )}

                {steps && steps.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 bg-muted/50 rounded-lg"
                  >
                    <p className="font-medium text-sm mb-3">Step-by-Step Solution:</p>
                    <ol className="space-y-2">
                      {steps.map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex gap-3 text-sm text-muted-foreground"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed pt-0.5">{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                )}

                {relatedTopics && relatedTopics.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4 border-t"
                  >
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Related Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {relatedTopics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
