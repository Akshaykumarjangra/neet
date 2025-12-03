import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Clock, Target, Trophy, FileQuestion, AlertCircle, RefreshCw, ClipboardList } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface MockTest {
  id: number;
  testType: string;
  title: string;
  questionsList: number[];
  durationMinutes: number;
  subject: string | null;
}

export default function MockTests() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: tests, isLoading, error, refetch } = useQuery<MockTest[]>({
    queryKey: ['/api/mock-tests'],
  });

  const startMutation = useMutation({
    mutationFn: async (testId: number) => {
      return apiRequest('POST', `/api/mock-tests/${testId}/start`);
    },
    onSuccess: (response: any, testId) => {
      setLocation(`/mock-test/${testId}`);
    },
    onError: (error: any) => {
      console.error("Failed to start mock test:", error);
      toast({
        title: "Error",
        description: "Failed to start test. Please try again.",
        variant: "destructive",
      });
    },
  });

  const startTest = async (testId: number) => {
    startMutation.mutate(testId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <Card className="max-w-lg mx-auto">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Unable to Load Tests</h3>
              <p className="text-muted-foreground">
                We couldn't load the mock tests right now. Please check your connection and try again.
              </p>
              <Button onClick={() => refetch()} className="gap-2" data-testid="button-retry-tests">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
          <div className="mt-12 pt-8 border-t">
            <QuickNavigationBar currentPath="/mock-tests" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mock Tests</h1>
          <p className="text-muted-foreground">
            Test your knowledge with full-length NEET mock tests
          </p>
        </div>

        {!tests || tests.length === 0 ? (
          <Card className="glass-panel">
            <CardContent className="py-16 text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                <ClipboardList className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">No Mock Tests Available Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're preparing comprehensive NEET mock tests for you. Check back soon to test your knowledge with full-length practice exams.
              </p>
              <div className="flex gap-3 justify-center pt-4">
                <Button onClick={() => setLocation('/practice')} variant="outline" data-testid="button-practice-instead">
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Practice Questions
                </Button>
                <Button onClick={() => setLocation('/')} data-testid="button-return-dashboard">
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {tests.map((test) => (
              <Card key={test.id} data-testid={`card-test-${test.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{test.title}</CardTitle>
                    {test.subject && (
                      <Badge variant="outline">{test.subject}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {test.questionsList.length} Questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {test.durationMinutes} minutes
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">XP Reward</p>
                    <p className="text-xs text-muted-foreground">
                      Earn up to {Math.floor(test.questionsList.length * 10)} XP based on your score
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => startTest(test.id)}
                    data-testid={`button-start-test-${test.id}`}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Start Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Navigation */}
        <div className="mt-12 pt-8 border-t">
          <QuickNavigationBar currentPath="/mock-tests" />
        </div>
      </main>
    </div>
  );
}
