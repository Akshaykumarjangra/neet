
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { Target, BookOpen, TrendingUp, Clock, Plus, Trash2 } from "lucide-react";

interface SubjectConfig {
  subject: string;
  count: number;
  easy: number;
  medium: number;
  hard: number;
}

export default function QuestionnaireBuilder() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [testName, setTestName] = useState("Custom NEET Test");
  const [timeLimit, setTimeLimit] = useState(180);
  const [testType, setTestType] = useState<"full" | "pyq" | "topic" | "adaptive">("full");
  
  const [subjects, setSubjects] = useState<SubjectConfig[]>([
    { subject: "Physics", count: 45, easy: 20, medium: 50, hard: 30 },
    { subject: "Chemistry", count: 45, easy: 20, medium: 50, hard: 30 },
    { subject: "Botany", count: 45, easy: 20, medium: 50, hard: 30 },
    { subject: "Zoology", count: 45, easy: 20, medium: 50, hard: 30 },
  ]);

  const [pyqYears, setPyqYears] = useState<number[]>([2024, 2023, 2022, 2021, 2020]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [questionsPerTopic, setQuestionsPerTopic] = useState(10);

  const { data: topics } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const response = await fetch("/api/topics");
      if (!response.ok) throw new Error("Failed to fetch topics");
      return response.json();
    },
  });

  const updateSubject = (index: number, field: keyof SubjectConfig, value: number) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
  };

  const updateDifficultyDistribution = (index: number, easy: number, medium: number, hard: number) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], easy, medium, hard };
    setSubjects(updated);
  };

  const generateTest = async () => {
    try {
      let endpoint = "/api/mock-tests/generate";
      let body: any = {};

      if (testType === "full") {
        body = {
          testType: "Custom Full Test",
          customConfig: {
            name: testName,
            subjects: subjects.map(s => ({
              subject: s.subject,
              count: s.count,
              difficultyDistribution: {
                easy: s.easy / 100,
                medium: s.medium / 100,
                hard: s.hard / 100,
              },
            })),
            timeLimit,
          },
        };
      } else if (testType === "pyq") {
        endpoint = "/api/questionnaires/pyq";
        body = { years: pyqYears };
      } else if (testType === "topic") {
        endpoint = "/api/questionnaires/topic-practice";
        body = {
          topicIds: selectedTopics,
          questionsPerTopic,
          progressiveDifficulty: true,
        };
      } else if (testType === "adaptive") {
        if (!user?.id) {
          throw new Error("User not authenticated");
        }
        endpoint = "/api/questionnaires/adaptive";
        body = {
          userId: user.id,
          totalQuestions: subjects.reduce((sum, s) => sum + s.count, 0),
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const test = await response.json();
      setLocation(`/mock-test/${test.id}`);
    } catch (error) {
      console.error("Error generating test:", error);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header activeSubject="Build Test" userPoints={2450} userLevel={12} studyStreak={7} />
        
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Build Your Questionnaire</h1>
            <p className="text-muted-foreground">Create customized tests tailored to your preparation needs</p>
          </div>

          <Tabs value={testType} onValueChange={(v) => setTestType(v as any)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="full">
                <Target className="h-4 w-4 mr-2" />
                Full Test
              </TabsTrigger>
              <TabsTrigger value="pyq">
                <BookOpen className="h-4 w-4 mr-2" />
                PYQ Practice
              </TabsTrigger>
              <TabsTrigger value="topic">
                <BookOpen className="h-4 w-4 mr-2" />
                Topic-wise
              </TabsTrigger>
              <TabsTrigger value="adaptive">
                <TrendingUp className="h-4 w-4 mr-2" />
                Adaptive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="full" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <Label>Test Name</Label>
                      <Input
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        placeholder="Enter test name"
                      />
                    </div>
                    <div>
                      <Label>Time Limit (minutes)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[timeLimit]}
                          onValueChange={(v) => setTimeLimit(v[0])}
                          min={30}
                          max={240}
                          step={15}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-16 text-right">{timeLimit} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Subject Distribution</h3>
                    {subjects.map((subject, index) => (
                      <Card key={subject.subject}>
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{subject.subject}</h4>
                            <Badge variant="outline">{subject.count} questions</Badge>
                          </div>
                          
                          <div>
                            <Label>Number of Questions</Label>
                            <Slider
                              value={[subject.count]}
                              onValueChange={(v) => updateSubject(index, "count", v[0])}
                              min={0}
                              max={90}
                              step={5}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Difficulty Distribution</Label>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <Label className="text-xs text-green-600">Easy ({subject.easy}%)</Label>
                                <Slider
                                  value={[subject.easy]}
                                  onValueChange={(v) => {
                                    const newEasy = v[0];
                                    const remaining = 100 - newEasy;
                                    const mediumRatio = subject.medium / (subject.medium + subject.hard);
                                    updateDifficultyDistribution(
                                      index,
                                      newEasy,
                                      Math.round(remaining * mediumRatio),
                                      Math.round(remaining * (1 - mediumRatio))
                                    );
                                  }}
                                  min={0}
                                  max={100}
                                  step={10}
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-yellow-600">Medium ({subject.medium}%)</Label>
                                <Slider
                                  value={[subject.medium]}
                                  onValueChange={(v) => {
                                    const newMedium = v[0];
                                    const remaining = 100 - newMedium;
                                    const easyRatio = subject.easy / (subject.easy + subject.hard);
                                    updateDifficultyDistribution(
                                      index,
                                      Math.round(remaining * easyRatio),
                                      newMedium,
                                      Math.round(remaining * (1 - easyRatio))
                                    );
                                  }}
                                  min={0}
                                  max={100}
                                  step={10}
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-red-600">Hard ({subject.hard}%)</Label>
                                <Slider
                                  value={[subject.hard]}
                                  onValueChange={(v) => {
                                    const newHard = v[0];
                                    const remaining = 100 - newHard;
                                    const easyRatio = subject.easy / (subject.easy + subject.medium);
                                    updateDifficultyDistribution(
                                      index,
                                      Math.round(remaining * easyRatio),
                                      Math.round(remaining * (1 - easyRatio)),
                                      newHard
                                    );
                                  }}
                                  min={0}
                                  max={100}
                                  step={10}
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pyq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Previous Year Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Select Years</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year) => (
                        <Badge
                          key={year}
                          variant={pyqYears.includes(year) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            setPyqYears(
                              pyqYears.includes(year)
                                ? pyqYears.filter((y) => y !== year)
                                : [...pyqYears, year].sort((a, b) => b - a)
                            );
                          }}
                        >
                          {year}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Selected: {pyqYears.length} years
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Topic-wise Practice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Questions per Topic</Label>
                    <Slider
                      value={[questionsPerTopic]}
                      onValueChange={(v) => setQuestionsPerTopic(v[0])}
                      min={5}
                      max={50}
                      step={5}
                    />
                    <p className="text-sm text-muted-foreground mt-1">{questionsPerTopic} questions</p>
                  </div>

                  <div>
                    <Label>Select Topics</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2 max-h-96 overflow-y-auto">
                      {topics?.map((topic: any) => (
                        <Badge
                          key={topic.id}
                          variant={selectedTopics.includes(topic.id) ? "default" : "outline"}
                          className="cursor-pointer justify-start p-2 h-auto"
                          onClick={() => {
                            setSelectedTopics(
                              selectedTopics.includes(topic.id)
                                ? selectedTopics.filter((id) => id !== topic.id)
                                : [...selectedTopics, topic.id]
                            );
                          }}
                        >
                          <div className="text-left">
                            <div className="text-xs font-normal">{topic.subject}</div>
                            <div className="font-medium">{topic.topicName}</div>
                          </div>
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {selectedTopics.length} topics
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="adaptive" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adaptive Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This will generate a personalized test based on your performance history,
                    focusing 70% on weak areas and 30% on strong areas for balanced improvement.
                  </p>
                  <div className="mt-4">
                    <Label>Total Questions</Label>
                    <Slider
                      value={[subjects.reduce((sum, s) => sum + s.count, 0)]}
                      onValueChange={(v) => {
                        const perSubject = Math.floor(v[0] / 4);
                        setSubjects(subjects.map(s => ({ ...s, count: perSubject })));
                      }}
                      min={20}
                      max={180}
                      step={10}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {subjects.reduce((sum, s) => sum + s.count, 0)} questions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {testType === "full" && `Total: ${subjects.reduce((sum, s) => sum + s.count, 0)} questions`}
                      {testType === "pyq" && `${pyqYears.length} years selected`}
                      {testType === "topic" && `${selectedTopics.length} topics × ${questionsPerTopic} questions`}
                      {testType === "adaptive" && `${subjects.reduce((sum, s) => sum + s.count, 0)} adaptive questions`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Time: {timeLimit} minutes
                    </p>
                  </div>
                </div>
                <Button size="lg" onClick={generateTest}>
                  <Target className="h-4 w-4 mr-2" />
                  Generate Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  );
}
