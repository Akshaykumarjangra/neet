import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Clock, Target, Trophy } from "lucide-react";
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

  const { data: tests, isLoading } = useQuery<MockTest[]>({
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
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading mock tests...</p>
          </div>
        </div>
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
          <Card>
            <CardContent className="py-12 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Mock Tests Available</h3>
              <p className="text-muted-foreground mb-6">
                Mock tests will be added soon. Check back later!
              </p>
              <Button onClick={() => setLocation('/')} data-testid="button-return-dashboard">
                Return to Dashboard
              </Button>
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
