
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Database, Play, RefreshCw, Check } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function QuestionManagement() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch current status
  const { data: status, refetch } = useQuery({
    queryKey: ['/api/questions/generation-status'],
    refetchInterval: isGenerating ? 5000 : false, // Poll every 5s when generating
  });

  // Start generation mutation
  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/questions/generate-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    },
    onSuccess: () => {
      setIsGenerating(true);
    },
  });

  const handleGenerate = () => {
    if (confirm('This will generate 50,000+ questions in sets of 100. This process may take several minutes. Continue?')) {
      generateMutation.mutate();
    }
  };

  const totalQuestions = Number(status?.totalQuestions || 0);
  const progress = parseFloat(status?.progress || '0');
  const isComplete = totalQuestions >= 50000;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Question Bank Management</h1>
        <p className="text-muted-foreground">
          Generate and manage 50,000+ NEET practice questions organized in sets of 100
        </p>
      </div>

      <div className="grid gap-6">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Current Status
            </CardTitle>
            <CardDescription>
              Overview of your question bank
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">{totalQuestions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Question Sets</p>
                <p className="text-2xl font-bold">{status?.estimatedSets || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Topics</p>
                <p className="text-2xl font-bold">{status?.totalTopics || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={isComplete ? "default" : "secondary"} className="mt-1">
                  {isComplete ? <><Check className="h-3 w-3 mr-1" /> Complete</> : 'In Progress'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to 50,000 questions</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {50000 - totalQuestions > 0 
                  ? `${(50000 - totalQuestions).toLocaleString()} questions remaining`
                  : 'Target achieved! 🎉'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Generation Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Question Generation</CardTitle>
            <CardDescription>
              Generate 50,000+ questions across all NEET subjects and chapters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Generation Plan:</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Physics: 22 chapters (~5,000 questions)</li>
                <li>Chemistry: 44 chapters (~10,000 questions)</li>
                <li>Botany: 37 chapters (~12,500 questions)</li>
                <li>Zoology: 37 chapters (~12,500 questions)</li>
              </ul>
              <p className="text-sm font-semibold mt-2">
                Total: 500+ sets × 100 questions = 50,000+ questions
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Question Distribution (per set):</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <Badge variant="secondary">Easy</Badge>
                  <p className="mt-1">30 questions (30%)</p>
                </div>
                <div>
                  <Badge variant="secondary">Medium</Badge>
                  <p className="mt-1">50 questions (50%)</p>
                </div>
                <div>
                  <Badge variant="secondary">Hard</Badge>
                  <p className="mt-1">20 questions (20%)</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || generateMutation.isPending || isComplete}
                className="flex-1"
              >
                {generateMutation.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : isComplete ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Generation Complete
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Generation
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => refetch()}
                disabled={isGenerating}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {isGenerating && (
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg text-sm">
                ⏳ Generation in progress... This may take several minutes. You can refresh the page to check progress.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
