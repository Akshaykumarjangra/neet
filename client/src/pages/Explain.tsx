import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Image as ImageIcon, Send, Loader2, AlertCircle, CheckCircle2, ChevronRight, UploadCloud, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SolutionStep = {
  stepNumber: number;
  title: string;
  explanation: string;
  formula?: string;
};

type AIResponse = {
  question: string;
  subject: string;
  topic: string;
  difficulty: string;
  steps: SolutionStep[];
  finalAnswer: string;
  conceptLinks?: { concept: string; chapterId?: number; chapterTitle?: string }[];
  commonMistakes?: string[];
  confidence: number;
};

export default function AiDoubtSolver() {
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<AIResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Image too large", description: "Please upload an image smaller than 5MB", variant: "destructive" });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSolve = async () => {
    if (!query.trim() && !selectedImage) {
      toast({ title: "Empty request", description: "Please enter a question or upload an image.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setSolution(null);

    try {
      let res;
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        if (query) formData.append("question", query);
        
        res = await fetch("/api/ai/solve-image", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/ai/solve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: query }),
        });
      }

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setSolution(data.solution);
      toast({ title: "Solution generated!", description: "AI successfully solved your doubt." });
    } catch (err: any) {
      toast({ title: "Failed to solve", description: err.message || "An error occurred", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 shadow-sm">
          <Sparkles className="h-4 w-4" />
          Zero AI Multimodal Tutor
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary">
          Instant Doubt Solver
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Stuck on a tricky NEET question? Upload a screenshot or type it below. Our multimodal AI tutor will provide a detailed, step-by-step breakdown.
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-2 shadow-xl bg-card/50 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/50">
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="font-medium animate-pulse text-primary">Analyzing question deeply...</p>
          </div>
        )}
        <CardContent className="p-6 space-y-4">
          <div className="relative group">
            <Textarea
              placeholder="E.g., What is the velocity of a particle if its kinetic energy is doubled?"
              className="min-h-[120px] resize-none text-base border-muted-foreground/20 focus-visible:ring-primary/50 rounded-xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative inline-block mt-4 group rounded-xl overflow-hidden border-2 border-primary/20">
              <img src={imagePreview} alt="Question preview" className="max-h-64 object-contain" />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageSelect}
              />
              <Button
                variant="outline"
                type="button"
                className="w-full sm:w-auto rounded-full border-dashed border-2 hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <UploadCloud className="h-4 w-4 mr-2" />
                {imagePreview ? "Change Image" : "Upload Screenshot"}
              </Button>
            </div>
            
            <Button 
              size="lg" 
              className="w-full sm:w-auto rounded-full shadow-lg shadow-primary/25 group transition-all duration-300 hover:scale-105"
              onClick={handleSolve}
              disabled={isLoading || (!query && !selectedImage)}
            >
              Solve Now
              <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Solution Section */}
      {solution && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default" className="text-sm px-3 py-1 bg-primary/90">
              {solution.subject}
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {solution.topic}
            </Badge>
            <Badge 
              variant="outline" 
              className={`text-sm px-3 py-1 border-2 ${
                solution.difficulty === 'Hard' ? 'border-red-500/50 text-red-500' : 
                solution.difficulty === 'Medium' ? 'border-yellow-500/50 text-yellow-600' : 
                'border-green-500/50 text-green-500'
              }`}
            >
              {solution.difficulty} Level
            </Badge>
            <div className="ml-auto text-sm text-muted-foreground flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
              {(solution.confidence * 100).toFixed(0)}% AI Confidence
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            {/* Main Steps */}
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-2xl font-bold border-b pb-2">Step-by-Step Breakdown</h3>
              <div className="space-y-6 mt-6">
                {solution.steps.map((step, idx) => (
                  <div key={idx} className="relative pl-8 border-l-2 border-primary/20 pb-4 last:border-0 last:pb-0">
                    <div className="absolute -left-[17px] top-0 bg-background border-2 border-primary text-primary h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                      {step.stepNumber}
                    </div>
                    <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{step.explanation}</p>
                      {step.formula && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg border font-mono text-sm overflow-x-auto text-primary/90 font-medium text-center">
                          {step.formula}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Answer */}
              <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl shadow-inner">
                <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Final Answer</h4>
                <p className="text-xl font-medium">{solution.finalAnswer}</p>
              </div>
            </div>

            {/* Sidebar Context */}
            <div className="md:col-span-4 space-y-6">
              {solution.commonMistakes && solution.commonMistakes.length > 0 && (
                <Card className="border-red-500/20 shadow-sm overflow-hidden">
                  <div className="bg-red-500/10 px-4 py-3 border-b border-red-500/20 flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h4 className="font-semibold text-red-700 dark:text-red-400">Common Mistakes</h4>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {solution.commonMistakes.map((mistake, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-0.5">•</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {solution.conceptLinks && solution.conceptLinks.length > 0 && (
                <Card className="shadow-sm">
                  <div className="bg-muted/30 px-4 py-3 border-b flex items-center">
                    <Sparkles className="h-4 w-4 text-primary mr-2" />
                    <h4 className="font-semibold">Related Concepts</h4>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {solution.conceptLinks.map((link, i) => (
                        <div key={i} className="p-4 flex items-center justify-between group cursor-pointer hover:bg-muted/20 transition-colors">
                          <div>
                            <p className="font-medium text-sm group-hover:text-primary transition-colors">{link.concept}</p>
                            {link.chapterTitle && (
                              <p className="text-xs text-muted-foreground mt-1">From: {link.chapterTitle}</p>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
