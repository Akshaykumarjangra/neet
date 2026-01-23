import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FileText, 
  BookOpen, 
  ClipboardList, 
  Layers, 
  Plus, 
  Pencil, 
  Trash2, 
  Upload, 
  ArrowLeft,
  Eye,
  EyeOff,
  FolderOpen,
  Calendar,
  Users,
  Search
} from "lucide-react";

interface Topic {
  id: number;
  subject: string;
  classLevel: string;
  topicName: string;
  ncertChapter: string | null;
  questionCount: number;
}

interface Question {
  id: number;
  topicId: number;
  questionText: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  solutionDetail: string;
  difficultyLevel: number;
  sourceType: string;
  topicName?: string;
  subject?: string;
}

interface MockTest {
  id: number;
  testType: string;
  title: string;
  questionsList: number[];
  durationMinutes: number;
  subject: string | null;
  passingPercentage: number | null;
  instructions: string | null;
  isPublished: boolean;
  questionsCount: number;
}

interface MockExamPaper {
  id: number;
  title: string;
  description?: string | null;
  durationMinutes: number;
  totalMarks: number;
  instructions?: string | null;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  attemptsAllowed: number;
  status: string;
  startsAt?: string | null;
  endsAt?: string | null;
  sectionCount?: number;
  totalQuestions?: number;
}

interface MockExamAssignment {
  id: number;
  paperId: number;
  userId?: string | null;
  organizationId?: number | null;
  classSection?: string | null;
  assignedAt?: string | null;
}

interface Organization {
  id: number;
  name: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface FlashcardDeck {
  id: number;
  name: string;
  subject: string | null;
  topicId: number | null;
  description: string | null;
  topicName?: string;
  cardCount: number;
}

interface Flashcard {
  id: number;
  deckId: number;
  front: string;
  back: string;
  order: number;
}

const SUBJECTS = ["Physics", "Chemistry", "Biology", "Botany", "Zoology"];
const CLASS_LEVELS = ["11", "12"];
const DIFFICULTY_OPTIONS = [
  { value: "1", label: "Easy" },
  { value: "2", label: "Medium" },
  { value: "3", label: "Hard" },
];

export default function AdminContentManager() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(searchString);
  const initialTab = searchParams.get("tab") || "questions";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const tabParam = params.get("tab");
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchString]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLocation(`/admin/content?tab=${value}`, { replace: true });
  };

  if (!user || !user.isAdmin) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="gradient-mesh-bg p-6">
        <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/admin")}
            data-testid="button-back-admin"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Hub
          </Button>
        </div>
        
        <div className="flex items-center gap-3 mb-8">
          <Layers className="h-10 w-10 text-purple-500" />
          <h1 className="text-4xl font-bold">Content Manager</h1>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-auto" data-testid="tabs-content-manager">
            <TabsTrigger value="questions" className="py-3" data-testid="tab-questions">
              <FileText className="h-4 w-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="topics" className="py-3" data-testid="tab-topics">
              <BookOpen className="h-4 w-4 mr-2" />
              Topics
            </TabsTrigger>
            <TabsTrigger value="mock-tests" className="py-3" data-testid="tab-mock-tests">
              <ClipboardList className="h-4 w-4 mr-2" />
              Mock Tests
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="py-3" data-testid="tab-flashcards">
              <Layers className="h-4 w-4 mr-2" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="chapters" className="py-3" data-testid="tab-chapters">
              <FolderOpen className="h-4 w-4 mr-2" />
              Chapters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            <QuestionsManager />
          </TabsContent>
          
          <TabsContent value="topics">
            <TopicsManager />
          </TabsContent>
          
          <TabsContent value="mock-tests">
            <MockTestsBuilder />
          </TabsContent>
          
          <TabsContent value="flashcards">
            <FlashcardsCreator />
          </TabsContent>

          <TabsContent value="chapters">
            <ChapterContentManager />
          </TabsContent>
        </Tabs>
        </div>
      </main>
    </div>
  );
}

function QuestionsManager() {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [bulkJson, setBulkJson] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [formData, setFormData] = useState({
    topicId: "",
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    solutionDetail: "",
    difficultyLevel: "2",
    sourceType: "admin",
  });

  const { data: questionsData, isLoading: loadingQuestions } = useQuery<{
    questions: Question[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }>({
    queryKey: ["/api/admin/questions"],
  });

  const { data: topics = [] } = useQuery<Topic[]>({
    queryKey: ["/api/admin/topics"],
  });

  const filteredTopics = selectedSubject 
    ? topics.filter(t => t.subject === selectedSubject)
    : topics;

  const createQuestionMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/admin/questions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/questions"] });
      toast({ title: "Question created successfully" });
      setIsAddOpen(false);
      resetForm();
    },
    onError: () => toast({ title: "Failed to create question", variant: "destructive" }),
  });

  const updateQuestionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => 
      apiRequest("PUT", `/api/admin/questions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/questions"] });
      toast({ title: "Question updated successfully" });
      setIsEditOpen(false);
      setEditingQuestion(null);
    },
    onError: () => toast({ title: "Failed to update question", variant: "destructive" }),
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/admin/questions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/questions"] });
      toast({ title: "Question deleted successfully" });
    },
    onError: () => toast({ title: "Failed to delete question", variant: "destructive" }),
  });

  const bulkImportMutation = useMutation({
    mutationFn: async (questions: any[]) => 
      apiRequest("POST", "/api/admin/questions/bulk", { questions }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/questions"] });
      toast({ 
        title: "Bulk import completed",
        description: `Imported ${data.imported} questions, ${data.errors} errors`
      });
      setIsBulkOpen(false);
      setBulkJson("");
    },
    onError: () => toast({ title: "Failed to import questions", variant: "destructive" }),
  });

  const resetForm = () => {
    setFormData({
      topicId: "",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
      solutionDetail: "",
      difficultyLevel: "2",
      sourceType: "admin",
    });
    setSelectedSubject("");
  };

  const handleSubmit = () => {
    const questionData = {
      topicId: parseInt(formData.topicId),
      questionText: formData.questionText,
      options: [
        { id: "A", text: formData.optionA },
        { id: "B", text: formData.optionB },
        { id: "C", text: formData.optionC },
        { id: "D", text: formData.optionD },
      ],
      correctAnswer: formData.correctAnswer,
      solutionDetail: formData.solutionDetail,
      difficultyLevel: parseInt(formData.difficultyLevel),
      sourceType: formData.sourceType,
    };
    createQuestionMutation.mutate(questionData);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      topicId: question.topicId.toString(),
      questionText: question.questionText,
      optionA: question.options.find(o => o.id === "A")?.text || "",
      optionB: question.options.find(o => o.id === "B")?.text || "",
      optionC: question.options.find(o => o.id === "C")?.text || "",
      optionD: question.options.find(o => o.id === "D")?.text || "",
      correctAnswer: question.correctAnswer,
      solutionDetail: question.solutionDetail,
      difficultyLevel: question.difficultyLevel.toString(),
      sourceType: question.sourceType,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!editingQuestion) return;
    const questionData = {
      topicId: parseInt(formData.topicId),
      questionText: formData.questionText,
      options: [
        { id: "A", text: formData.optionA },
        { id: "B", text: formData.optionB },
        { id: "C", text: formData.optionC },
        { id: "D", text: formData.optionD },
      ],
      correctAnswer: formData.correctAnswer,
      solutionDetail: formData.solutionDetail,
      difficultyLevel: parseInt(formData.difficultyLevel),
      sourceType: formData.sourceType,
    };
    updateQuestionMutation.mutate({ id: editingQuestion.id, data: questionData });
  };

  const handleBulkImport = () => {
    try {
      const parsed = JSON.parse(bulkJson);
      if (!Array.isArray(parsed)) {
        toast({ title: "JSON must be an array of questions", variant: "destructive" });
        return;
      }
      bulkImportMutation.mutate(parsed);
    } catch (e) {
      toast({ title: "Invalid JSON format", variant: "destructive" });
    }
  };

  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1: return "Easy";
      case 2: return "Medium";
      case 3: return "Hard";
      default: return "Unknown";
    }
  };

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return "bg-green-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Questions Manager
            </CardTitle>
            <CardDescription>
              Manage all questions in the database
              {questionsData && ` (${questionsData.pagination.total} total)`}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog open={isBulkOpen} onOpenChange={setIsBulkOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" data-testid="button-bulk-import-questions">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Import
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Bulk Import Questions</DialogTitle>
                  <DialogDescription>
                    Paste JSON array of questions. Each question should have: topicId, questionText, options, correctAnswer, solutionDetail, difficultyLevel, sourceType
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  value={bulkJson}
                  onChange={(e) => setBulkJson(e.target.value)}
                  placeholder='[{"topicId": 1, "questionText": "...", ...}]'
                  rows={10}
                  className="font-mono text-sm"
                  data-testid="textarea-bulk-json"
                />
                <DialogFooter>
                  <Button
                    onClick={handleBulkImport}
                    disabled={bulkImportMutation.isPending}
                    data-testid="button-submit-bulk"
                  >
                    Import
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-question">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Question</DialogTitle>
                </DialogHeader>
                <QuestionForm
                  formData={formData}
                  setFormData={setFormData}
                  topics={filteredTopics}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  onSubmit={handleSubmit}
                  isPending={createQuestionMutation.isPending}
                  submitLabel="Create Question"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loadingQuestions ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !questionsData?.questions?.length ? (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No questions found. Add your first question!</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[860px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead className="w-24">Subject</TableHead>
                  <TableHead className="w-32">Topic</TableHead>
                  <TableHead className="w-24">Difficulty</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questionsData.questions.map((question) => (
                  <TableRow key={question.id} data-testid={`question-row-${question.id}`}>
                    <TableCell className="font-mono">{question.id}</TableCell>
                    <TableCell className="max-w-md">
                      <span className="line-clamp-2">{question.questionText}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{question.subject || "N/A"}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground line-clamp-1">
                        {question.topicName || `Topic ${question.topicId}`}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(question.difficultyLevel)}>
                        {getDifficultyLabel(question.difficultyLevel)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(question)}
                          data-testid={`button-edit-question-${question.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteQuestionMutation.mutate(question.id)}
                          data-testid={`button-delete-question-${question.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </ScrollArea>
        )}

        <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) { setEditingQuestion(null); resetForm(); }}}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Question</DialogTitle>
            </DialogHeader>
            <QuestionForm
              formData={formData}
              setFormData={setFormData}
              topics={filteredTopics}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              onSubmit={handleUpdate}
              isPending={updateQuestionMutation.isPending}
              submitLabel="Update Question"
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function QuestionForm({
  formData,
  setFormData,
  topics,
  selectedSubject,
  setSelectedSubject,
  onSubmit,
  isPending,
  submitLabel,
}: {
  formData: any;
  setFormData: (data: any) => void;
  topics: Topic[];
  selectedSubject: string;
  setSelectedSubject: (s: string) => void;
  onSubmit: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Subject</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger data-testid="select-subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Topic</Label>
          <Select 
            value={formData.topicId} 
            onValueChange={(v) => setFormData({ ...formData, topicId: v })}
          >
            <SelectTrigger data-testid="select-topic">
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t.id} value={t.id.toString()}>{t.topicName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Question Text</Label>
        <Textarea
          value={formData.questionText}
          onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
          placeholder="Enter the question text..."
          rows={3}
          data-testid="input-question-text"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Option A</Label>
          <Input
            value={formData.optionA}
            onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
            placeholder="Option A"
            data-testid="input-option-a"
          />
        </div>
        <div>
          <Label>Option B</Label>
          <Input
            value={formData.optionB}
            onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
            placeholder="Option B"
            data-testid="input-option-b"
          />
        </div>
        <div>
          <Label>Option C</Label>
          <Input
            value={formData.optionC}
            onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
            placeholder="Option C"
            data-testid="input-option-c"
          />
        </div>
        <div>
          <Label>Option D</Label>
          <Input
            value={formData.optionD}
            onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
            placeholder="Option D"
            data-testid="input-option-d"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Correct Answer</Label>
          <Select 
            value={formData.correctAnswer} 
            onValueChange={(v) => setFormData({ ...formData, correctAnswer: v })}
          >
            <SelectTrigger data-testid="select-correct-answer">
              <SelectValue placeholder="Select correct answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="D">D</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Difficulty</Label>
          <Select 
            value={formData.difficultyLevel} 
            onValueChange={(v) => setFormData({ ...formData, difficultyLevel: v })}
          >
            <SelectTrigger data-testid="select-difficulty">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Solution Detail</Label>
        <Textarea
          value={formData.solutionDetail}
          onChange={(e) => setFormData({ ...formData, solutionDetail: e.target.value })}
          placeholder="Enter the detailed solution..."
          rows={4}
          data-testid="input-solution"
        />
      </div>

      <DialogFooter>
        <Button onClick={onSubmit} disabled={isPending} data-testid="button-submit-question">
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  );
}

function TopicsManager() {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const [formData, setFormData] = useState({
    subject: "",
    classLevel: "",
    topicName: "",
    ncertChapter: "",
  });

  const { data: topics = [], isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/admin/topics"],
  });

  const createTopicMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/admin/topics", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/topics"] });
      toast({ title: "Topic created successfully" });
      setIsAddOpen(false);
      resetForm();
    },
    onError: () => toast({ title: "Failed to create topic", variant: "destructive" }),
  });

  const updateTopicMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => 
      apiRequest("PUT", `/api/admin/topics/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/topics"] });
      toast({ title: "Topic updated successfully" });
      setIsEditOpen(false);
      setEditingTopic(null);
    },
    onError: () => toast({ title: "Failed to update topic", variant: "destructive" }),
  });

  const deleteTopicMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/admin/topics/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/topics"] });
      toast({ title: "Topic deleted successfully" });
    },
    onError: () => toast({ title: "Failed to delete topic", variant: "destructive" }),
  });

  const resetForm = () => {
    setFormData({ subject: "", classLevel: "", topicName: "", ncertChapter: "" });
  };

  const handleSubmit = () => {
    createTopicMutation.mutate(formData);
  };

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setFormData({
      subject: topic.subject,
      classLevel: topic.classLevel,
      topicName: topic.topicName,
      ncertChapter: topic.ncertChapter || "",
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!editingTopic) return;
    updateTopicMutation.mutate({ id: editingTopic.id, data: formData });
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Topics Manager
            </CardTitle>
            <CardDescription>Organize questions by topic ({topics.length} topics)</CardDescription>
          </div>
          <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-topic">
                <Plus className="h-4 w-4 mr-2" />
                Add Topic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Topic</DialogTitle>
              </DialogHeader>
              <TopicForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isPending={createTopicMutation.isPending}
                submitLabel="Create Topic"
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !topics.length ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No topics found. Add your first topic!</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[860px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Topic Name</TableHead>
                  <TableHead className="w-24">Subject</TableHead>
                  <TableHead className="w-20">Class</TableHead>
                  <TableHead className="w-32">NCERT Chapter</TableHead>
                  <TableHead className="w-24">Questions</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topics.map((topic) => (
                  <TableRow key={topic.id} data-testid={`topic-row-${topic.id}`}>
                    <TableCell className="font-mono">{topic.id}</TableCell>
                    <TableCell>{topic.topicName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{topic.subject}</Badge>
                    </TableCell>
                    <TableCell>Class {topic.classLevel}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {topic.ncertChapter || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{topic.questionCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(topic)}
                          data-testid={`button-edit-topic-${topic.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTopicMutation.mutate(topic.id)}
                          data-testid={`button-delete-topic-${topic.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </div>
          </ScrollArea>
        )}

        <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) { setEditingTopic(null); resetForm(); }}}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Topic</DialogTitle>
            </DialogHeader>
            <TopicForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleUpdate}
              isPending={updateTopicMutation.isPending}
              submitLabel="Update Topic"
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function TopicForm({
  formData,
  setFormData,
  onSubmit,
  isPending,
  submitLabel,
}: {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Subject</Label>
          <Select 
            value={formData.subject} 
            onValueChange={(v) => setFormData({ ...formData, subject: v })}
          >
            <SelectTrigger data-testid="select-topic-subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Class Level</Label>
          <Select 
            value={formData.classLevel} 
            onValueChange={(v) => setFormData({ ...formData, classLevel: v })}
          >
            <SelectTrigger data-testid="select-class-level">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {CLASS_LEVELS.map((c) => (
                <SelectItem key={c} value={c}>Class {c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Topic Name</Label>
        <Input
          value={formData.topicName}
          onChange={(e) => setFormData({ ...formData, topicName: e.target.value })}
          placeholder="Enter topic name"
          data-testid="input-topic-name"
        />
      </div>

      <div>
        <Label>NCERT Chapter (Optional)</Label>
        <Input
          value={formData.ncertChapter}
          onChange={(e) => setFormData({ ...formData, ncertChapter: e.target.value })}
          placeholder="e.g., Chapter 1: Physical World"
          data-testid="input-ncert-chapter"
        />
      </div>

      <DialogFooter>
        <Button onClick={onSubmit} disabled={isPending} data-testid="button-submit-topic">
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  );
}

function MockTestsBuilder() {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<MockTest | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    testType: "practice",
    durationMinutes: "60",
    subject: "",
    passingPercentage: "40",
    instructions: "",
  });

  const { data: mockTests = [], isLoading } = useQuery<MockTest[]>({
    queryKey: ["/api/admin/mock-tests"],
  });

  const { data: questionsData } = useQuery<{
    questions: Question[];
    pagination: any;
  }>({
    queryKey: ["/api/admin/questions"],
  });

  const createTestMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/admin/mock-tests", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mock-tests"] });
      toast({ title: "Mock test created successfully" });
      setIsAddOpen(false);
      resetForm();
    },
    onError: () => toast({ title: "Failed to create mock test", variant: "destructive" }),
  });

  const updateTestMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => 
      apiRequest("PUT", `/api/admin/mock-tests/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mock-tests"] });
      toast({ title: "Mock test updated successfully" });
      setIsEditOpen(false);
      setEditingTest(null);
    },
    onError: () => toast({ title: "Failed to update mock test", variant: "destructive" }),
  });

  const deleteTestMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/admin/mock-tests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mock-tests"] });
      toast({ title: "Mock test deleted successfully" });
    },
    onError: () => toast({ title: "Failed to delete mock test", variant: "destructive" }),
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, isPublished }: { id: number; isPublished: boolean }) => 
      apiRequest("PUT", `/api/admin/mock-tests/${id}/publish`, { isPublished }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mock-tests"] });
      toast({ title: "Publish status updated" });
    },
    onError: () => toast({ title: "Failed to update status", variant: "destructive" }),
  });

  const resetForm = () => {
    setFormData({
      title: "",
      testType: "practice",
      durationMinutes: "60",
      subject: "",
      passingPercentage: "40",
      instructions: "",
    });
    setSelectedQuestions([]);
  };

  const handleSubmit = () => {
    if (selectedQuestions.length === 0) {
      toast({ title: "Please select at least one question", variant: "destructive" });
      return;
    }
    createTestMutation.mutate({
      ...formData,
      durationMinutes: parseInt(formData.durationMinutes),
      passingPercentage: parseInt(formData.passingPercentage),
      questionsList: selectedQuestions,
    });
  };

  const handleEdit = (test: MockTest) => {
    setEditingTest(test);
    setFormData({
      title: test.title,
      testType: test.testType,
      durationMinutes: test.durationMinutes.toString(),
      subject: test.subject || "",
      passingPercentage: test.passingPercentage?.toString() || "40",
      instructions: test.instructions || "",
    });
    setSelectedQuestions(test.questionsList || []);
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!editingTest) return;
    updateTestMutation.mutate({ 
      id: editingTest.id, 
      data: {
        ...formData,
        durationMinutes: parseInt(formData.durationMinutes),
        passingPercentage: parseInt(formData.passingPercentage),
        questionsList: selectedQuestions,
      }
    });
  };

  const toggleQuestion = (id: number) => {
    setSelectedQuestions(prev => 
      prev.includes(id) 
        ? prev.filter(q => q !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Mock Tests Builder
              </CardTitle>
              <CardDescription>
                Create and manage mock tests ({mockTests.length} total)
              </CardDescription>
            </div>
            <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button data-testid="button-create-test">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Mock Test</DialogTitle>
                </DialogHeader>
                <MockTestForm
                  formData={formData}
                  setFormData={setFormData}
                  selectedQuestions={selectedQuestions}
                  toggleQuestion={toggleQuestion}
                  questions={questionsData?.questions || []}
                  onSubmit={handleSubmit}
                  isPending={createTestMutation.isPending}
                  submitLabel="Create Test"
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : !mockTests.length ? (
            <div className="text-center py-12 text-muted-foreground">
              <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No mock tests found. Create your first test!</p>
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[820px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-24">Questions</TableHead>
                    <TableHead className="w-24">Duration</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTests.map((test) => (
                    <TableRow key={test.id} data-testid={`mock-test-row-${test.id}`}>
                      <TableCell className="font-mono">{test.id}</TableCell>
                      <TableCell>{test.title}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{test.questionsCount}</Badge>
                      </TableCell>
                      <TableCell>{test.durationMinutes} min</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={test.isPublished}
                            onCheckedChange={(checked) => 
                              togglePublishMutation.mutate({ id: test.id, isPublished: checked })
                            }
                            data-testid={`switch-publish-${test.id}`}
                          />
                          <span className="text-sm">
                            {test.isPublished ? (
                              <span className="flex items-center text-green-500">
                                <Eye className="h-3 w-3 mr-1" /> Live
                              </span>
                            ) : (
                              <span className="flex items-center text-muted-foreground">
                                <EyeOff className="h-3 w-3 mr-1" /> Draft
                              </span>
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(test)}
                            data-testid={`button-edit-test-${test.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTestMutation.mutate(test.id)}
                            data-testid={`button-delete-test-${test.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            </ScrollArea>
          )}

          <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) { setEditingTest(null); resetForm(); }}}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Mock Test</DialogTitle>
              </DialogHeader>
              <MockTestForm
                formData={formData}
                setFormData={setFormData}
                selectedQuestions={selectedQuestions}
                toggleQuestion={toggleQuestion}
                questions={questionsData?.questions || []}
                onSubmit={handleUpdate}
                isPending={updateTestMutation.isPending}
                submitLabel="Update Test"
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <MockExamAdminPanel />
    </div>
  );
}

function MockTestForm({
  formData,
  setFormData,
  selectedQuestions,
  toggleQuestion,
  questions,
  onSubmit,
  isPending,
  submitLabel,
}: {
  formData: any;
  setFormData: (data: any) => void;
  selectedQuestions: number[];
  toggleQuestion: (id: number) => void;
  questions: Question[];
  onSubmit: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Test Name</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter test name"
            data-testid="input-test-name"
          />
        </div>
        <div>
          <Label>Test Type</Label>
          <Select 
            value={formData.testType} 
            onValueChange={(v) => setFormData({ ...formData, testType: v })}
          >
            <SelectTrigger data-testid="select-test-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="practice">Practice</SelectItem>
              <SelectItem value="full_mock">Full Mock</SelectItem>
              <SelectItem value="chapter_test">Chapter Test</SelectItem>
              <SelectItem value="pyq">Previous Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Duration (minutes)</Label>
          <Input
            type="number"
            value={formData.durationMinutes}
            onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
            data-testid="input-duration"
          />
        </div>
        <div>
          <Label>Subject</Label>
          <Select 
            value={formData.subject} 
            onValueChange={(v) => setFormData({ ...formData, subject: v })}
          >
            <SelectTrigger data-testid="select-test-subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Subjects</SelectItem>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Passing %</Label>
          <Input
            type="number"
            value={formData.passingPercentage}
            onChange={(e) => setFormData({ ...formData, passingPercentage: e.target.value })}
            data-testid="input-passing-percentage"
          />
        </div>
      </div>

      <div>
        <Label>Instructions</Label>
        <Textarea
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          placeholder="Test instructions for students..."
          rows={3}
          data-testid="input-instructions"
        />
      </div>

      <div>
        <Label className="mb-2 block">
          Select Questions ({selectedQuestions.length} selected)
        </Label>
        <ScrollArea className="h-48 border rounded-md p-2">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`p-2 rounded cursor-pointer mb-1 ${
                selectedQuestions.includes(q.id) 
                  ? "bg-primary/20 border border-primary" 
                  : "hover:bg-muted"
              }`}
              onClick={() => toggleQuestion(q.id)}
              data-testid={`question-select-${q.id}`}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{q.subject || "N/A"}</Badge>
                <span className="text-sm line-clamp-1">{q.questionText}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <DialogFooter>
        <Button 
          onClick={onSubmit} 
          disabled={isPending}
          data-testid="button-submit-test"
        >
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  );
}

function MockExamAdminPanel() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [activePaper, setActivePaper] = useState<MockExamPaper | null>(null);
  const [clearExistingAssignments, setClearExistingAssignments] = useState(false);
  const [userIdsInput, setUserIdsInput] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [orgAssignments, setOrgAssignments] = useState<Array<{ organizationId: string; classSection: string }>>([
    { organizationId: "", classSection: "" },
  ]);
  const [bulkFormat, setBulkFormat] = useState("json");
  const [bulkContent, setBulkContent] = useState("");
  const [bulkDryRun, setBulkDryRun] = useState(true);
  const [bulkResult, setBulkResult] = useState<any>(null);

  const toDateTimeInput = (value?: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const pad = (num: number) => String(num).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const [scheduleForm, setScheduleForm] = useState({
    title: "",
    description: "",
    status: "draft",
    startsAt: "",
    endsAt: "",
    attemptsAllowed: "1",
    shuffleQuestions: true,
    shuffleOptions: true,
  });

  const { data: papersData, isLoading: isLoadingPapers } = useQuery<{ data: MockExamPaper[] }>({
    queryKey: ["/api/admin/mock-exams/papers", statusFilter, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== "all") params.set("status", statusFilter);
      if (searchQuery) params.set("q", searchQuery);
      const query = params.toString();
      return apiRequest("GET", `/api/admin/mock-exams/papers${query ? `?${query}` : ""}`);
    },
  });

  const papers = Array.isArray(papersData?.data) ? papersData.data : [];

  const { data: organizations = [] } = useQuery<Organization[]>({
    queryKey: ["/api/admin/organizations"],
    queryFn: async () => apiRequest("GET", "/api/admin/organizations"),
  });

  const { data: assignmentsData, refetch: refetchAssignments } = useQuery<{ data: MockExamAssignment[] }>({
    queryKey: ["/api/admin/mock-exams/papers", activePaper?.id, "assignments"],
    queryFn: async () => apiRequest("GET", `/api/admin/mock-exams/papers/${activePaper?.id}/assignments`),
    enabled: assignmentOpen && !!activePaper?.id,
  });

  const assignments = Array.isArray(assignmentsData?.data) ? assignmentsData.data : [];

  const { data: userSearchData } = useQuery<{ users: AdminUser[] }>({
    queryKey: ["/api/admin/users", userSearch],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("search", userSearch);
      params.set("limit", "10");
      return apiRequest("GET", `/api/admin/users?${params.toString()}`);
    },
    enabled: userSearch.length >= 2,
  });

  const userResults = Array.isArray(userSearchData?.users) ? userSearchData.users : [];

  const updatePaperMutation = useMutation({
    mutationFn: async (payload: any) => apiRequest("PATCH", `/api/admin/mock-exams/papers/${activePaper?.id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mock-exams/papers"] });
      toast({ title: "Paper updated successfully" });
      setScheduleOpen(false);
    },
    onError: () => toast({ title: "Failed to update paper", variant: "destructive" }),
  });

  const updateAssignmentsMutation = useMutation({
    mutationFn: async (payload: any) =>
      apiRequest("POST", `/api/admin/mock-exams/papers/${activePaper?.id}/assignments`, payload),
    onSuccess: () => {
      refetchAssignments();
      toast({ title: "Assignments updated" });
      setUserIdsInput("");
      setSelectedUserIds([]);
      setOrgAssignments([{ organizationId: "", classSection: "" }]);
      setClearExistingAssignments(false);
    },
    onError: () => toast({ title: "Failed to update assignments", variant: "destructive" }),
  });

  const deleteAssignmentsMutation = useMutation({
    mutationFn: async (assignmentIds?: number[]) =>
      apiRequest("DELETE", `/api/admin/mock-exams/papers/${activePaper?.id}/assignments`, { assignmentIds }),
    onSuccess: () => {
      refetchAssignments();
      toast({ title: "Assignments removed" });
    },
    onError: () => toast({ title: "Failed to remove assignments", variant: "destructive" }),
  });

  const bulkImportMutation = useMutation({
    mutationFn: async () => {
      if (!bulkContent.trim()) {
        throw new Error("Please provide import content.");
      }
      if (bulkFormat === "json") {
        const parsed = JSON.parse(bulkContent);
        if (!Array.isArray(parsed)) {
          throw new Error("JSON import expects an array of items.");
        }
        return apiRequest("POST", "/api/admin/mock-tests-v2/questions/bulk", {
          format: "json",
          dryRun: bulkDryRun,
          items: parsed,
        });
      }
      return apiRequest("POST", "/api/admin/mock-tests-v2/questions/bulk", {
        format: bulkFormat,
        dryRun: bulkDryRun,
        data: bulkContent,
      });
    },
    onSuccess: (data) => {
      setBulkResult(data);
      toast({ title: bulkDryRun ? "Dry run complete" : "Import completed" });
    },
    onError: (error: any) => {
      const message = error?.message || "Import failed";
      toast({ title: message, variant: "destructive" });
    },
  });

  const openSchedule = (paper: MockExamPaper) => {
    setActivePaper(paper);
    setScheduleForm({
      title: paper.title || "",
      description: paper.description || "",
      status: paper.status || "draft",
      startsAt: toDateTimeInput(paper.startsAt),
      endsAt: toDateTimeInput(paper.endsAt),
      attemptsAllowed: String(paper.attemptsAllowed ?? 1),
      shuffleQuestions: !!paper.shuffleQuestions,
      shuffleOptions: !!paper.shuffleOptions,
    });
    setScheduleOpen(true);
  };

  const openAssignments = (paper: MockExamPaper) => {
    setActivePaper(paper);
    setUserIdsInput("");
    setSelectedUserIds([]);
    setUserSearch("");
    setOrgAssignments([{ organizationId: "", classSection: "" }]);
    setClearExistingAssignments(false);
    setAssignmentOpen(true);
  };

  const handleScheduleSubmit = () => {
    if (!activePaper) return;
    const payload = {
      title: scheduleForm.title || undefined,
      description: scheduleForm.description,
      status: scheduleForm.status,
      startsAt: scheduleForm.startsAt ? new Date(scheduleForm.startsAt).toISOString() : null,
      endsAt: scheduleForm.endsAt ? new Date(scheduleForm.endsAt).toISOString() : null,
      attemptsAllowed: Number(scheduleForm.attemptsAllowed) || 1,
      shuffleQuestions: scheduleForm.shuffleQuestions,
      shuffleOptions: scheduleForm.shuffleOptions,
    };
    updatePaperMutation.mutate(payload);
  };

  const addUserIds = () => {
    const next = userIdsInput
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter(Boolean);
    if (!next.length) return;
    setSelectedUserIds((prev) => Array.from(new Set([...prev, ...next])));
    setUserIdsInput("");
  };

  const addUserId = (userId: string) => {
    setSelectedUserIds((prev) => (prev.includes(userId) ? prev : [...prev, userId]));
  };

  const removeUserId = (userId: string) => {
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
  };

  const updateOrgAssignment = (index: number, updates: Partial<{ organizationId: string; classSection: string }>) => {
    setOrgAssignments((prev) =>
      prev.map((row, idx) => (idx === index ? { ...row, ...updates } : row))
    );
  };

  const addOrgAssignmentRow = () => {
    setOrgAssignments((prev) => [...prev, { organizationId: "", classSection: "" }]);
  };

  const removeOrgAssignmentRow = (index: number) => {
    setOrgAssignments((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAssignmentsSubmit = () => {
    if (!activePaper) return;
    const organizationAssignments = orgAssignments
      .filter((row) => row.organizationId)
      .map((row) => ({
        organizationId: Number(row.organizationId),
        classSection: row.classSection ? row.classSection.trim() : null,
      }));

    if (!selectedUserIds.length && !organizationAssignments.length) {
      toast({ title: "Add at least one assignment", variant: "destructive" });
      return;
    }

    updateAssignmentsMutation.mutate({
      clearExisting: clearExistingAssignments,
      userIds: selectedUserIds.length ? selectedUserIds : undefined,
      organizationAssignments: organizationAssignments.length ? organizationAssignments : undefined,
    });
  };

  const formatWindow = (paper: MockExamPaper) => {
    if (!paper.startsAt && !paper.endsAt) return "No window";
    const start = paper.startsAt ? new Date(paper.startsAt).toLocaleString() : "Anytime";
    const end = paper.endsAt ? new Date(paper.endsAt).toLocaleString() : "No end";
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Mock Exams (V2) Scheduling & Assignments
              </CardTitle>
              <CardDescription>
                Manage mock exam papers, schedules, and assignments.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-mock-exam-status">
                  <SelectValue placeholder="Status filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search papers..."
                  className="pl-8 w-56"
                  data-testid="input-search-mock-exam"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingPapers ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : !papers.length ? (
            <div className="text-center py-10 text-muted-foreground">
              <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No mock exam papers found for this filter.</p>
            </div>
          ) : (
            <ScrollArea className="h-[420px]">
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead className="w-48">Window</TableHead>
                    <TableHead className="w-24">Attempts</TableHead>
                    <TableHead className="w-28">Questions</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {papers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-mono">{paper.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{paper.title}</div>
                        <div className="text-xs text-muted-foreground">{paper.description || "No description"}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{paper.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {formatWindow(paper)}
                      </TableCell>
                      <TableCell>{paper.attemptsAllowed ?? 1}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{paper.totalQuestions ?? 0}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openSchedule(paper)}
                            data-testid={`button-schedule-paper-${paper.id}`}
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openAssignments(paper)}
                            data-testid={`button-assign-paper-${paper.id}`}
                          >
                            <Users className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Mock Exam Question Import
          </CardTitle>
          <CardDescription>
            Bulk import mock exam questions (JSON, CSV, or TSV) for the V2 question bank.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <Label>Format</Label>
              <Select value={bulkFormat} onValueChange={setBulkFormat}>
                <SelectTrigger className="w-40" data-testid="select-mock-exam-import-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="tsv">TSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Switch
                checked={bulkDryRun}
                onCheckedChange={setBulkDryRun}
                data-testid="switch-mock-exam-import-dry-run"
              />
              <Label>Dry run</Label>
            </div>
          </div>

          <div>
            <Label>Bulk Content</Label>
            <Textarea
              value={bulkContent}
              onChange={(e) => setBulkContent(e.target.value)}
              placeholder={bulkFormat === "json" ? "Paste JSON array of questions..." : "Paste CSV/TSV content..."}
              rows={8}
              data-testid="textarea-mock-exam-import"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => bulkImportMutation.mutate()}
              disabled={bulkImportMutation.isPending}
              data-testid="button-run-mock-exam-import"
            >
              {bulkDryRun ? "Run Dry Run" : "Import Questions"}
            </Button>
            {bulkResult && (
              <Badge variant="secondary">
                Received: {bulkResult.received ?? 0} | Inserted: {bulkResult.inserted ?? bulkResult.toInsert ?? 0}
              </Badge>
            )}
          </div>

          {bulkResult?.errors?.length ? (
            <div className="text-sm text-red-500">
              {bulkResult.errors.length} error(s) detected. Review input and try again.
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={scheduleOpen} onOpenChange={(open) => { setScheduleOpen(open); if (!open) setActivePaper(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule & Settings</DialogTitle>
            <DialogDescription>
              Update paper status, schedule window, and attempt settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={scheduleForm.title}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
                  data-testid="input-mock-exam-title"
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={scheduleForm.status}
                  onValueChange={(value) => setScheduleForm({ ...scheduleForm, status: value })}
                >
                  <SelectTrigger data-testid="select-mock-exam-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={scheduleForm.description}
                onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                rows={3}
                data-testid="textarea-mock-exam-description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Starts At</Label>
                <Input
                  type="datetime-local"
                  value={scheduleForm.startsAt}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, startsAt: e.target.value })}
                  data-testid="input-mock-exam-starts"
                />
              </div>
              <div>
                <Label>Ends At</Label>
                <Input
                  type="datetime-local"
                  value={scheduleForm.endsAt}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, endsAt: e.target.value })}
                  data-testid="input-mock-exam-ends"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Attempts Allowed</Label>
                <Input
                  type="number"
                  value={scheduleForm.attemptsAllowed}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, attemptsAllowed: e.target.value })}
                  data-testid="input-mock-exam-attempts"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={scheduleForm.shuffleQuestions}
                  onCheckedChange={(value) => setScheduleForm({ ...scheduleForm, shuffleQuestions: value })}
                  data-testid="switch-mock-exam-shuffle-questions"
                />
                <Label>Shuffle questions</Label>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={scheduleForm.shuffleOptions}
                  onCheckedChange={(value) => setScheduleForm({ ...scheduleForm, shuffleOptions: value })}
                  data-testid="switch-mock-exam-shuffle-options"
                />
                <Label>Shuffle options</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleScheduleSubmit} disabled={updatePaperMutation.isPending}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={assignmentOpen} onOpenChange={(open) => { setAssignmentOpen(open); if (!open) setActivePaper(null); }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assignments for {activePaper?.title || "Mock Exam"}</DialogTitle>
            <DialogDescription>
              Assign this paper to specific users or organizations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label>User IDs</Label>
              <div className="flex gap-2">
                <Input
                  value={userIdsInput}
                  onChange={(e) => setUserIdsInput(e.target.value)}
                  placeholder="Paste user IDs (comma separated)"
                  data-testid="input-mock-exam-user-ids"
                />
                <Button variant="outline" onClick={addUserIds} data-testid="button-add-user-ids">
                  Add
                </Button>
              </div>
              {selectedUserIds.length ? (
                <div className="flex flex-wrap gap-2">
                  {selectedUserIds.map((userId) => (
                    <Badge key={userId} variant="secondary" className="gap-2">
                      {userId}
                      <button onClick={() => removeUserId(userId)} className="text-xs">
                        x
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="space-y-3">
              <Label>Find Users</Label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
                <Input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users by name or email"
                  className="pl-8"
                  data-testid="input-mock-exam-user-search"
                />
              </div>
              {userSearch.length >= 2 && (
                <div className="border rounded-md p-2 space-y-2 max-h-40 overflow-y-auto">
                  {!userResults.length ? (
                    <div className="text-sm text-muted-foreground">No users found.</div>
                  ) : (
                    userResults.map((user) => (
                      <div key={user.id} className="flex items-center justify-between text-sm">
                        <span>{user.name} ({user.email})</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addUserId(user.id)}
                          data-testid={`button-add-user-${user.id}`}
                        >
                          Add
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Organization Assignments</Label>
              {orgAssignments.map((row, index) => (
                <div key={`${row.organizationId}-${index}`} className="grid grid-cols-3 gap-3 items-end">
                  <div>
                    <Label>Organization</Label>
                    <Select
                      value={row.organizationId}
                      onValueChange={(value) => updateOrgAssignment(index, { organizationId: value })}
                    >
                      <SelectTrigger data-testid={`select-org-${index}`}>
                        <SelectValue placeholder="Select org" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizations.map((org) => (
                          <SelectItem key={org.id} value={String(org.id)}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Class Section (optional)</Label>
                    <Input
                      value={row.classSection}
                      onChange={(e) => updateOrgAssignment(index, { classSection: e.target.value })}
                      placeholder="e.g. A1"
                      data-testid={`input-class-section-${index}`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => removeOrgAssignmentRow(index)}
                      disabled={orgAssignments.length === 1}
                      data-testid={`button-remove-org-${index}`}
                    >
                      Remove
                    </Button>
                    {index === orgAssignments.length - 1 && (
                      <Button variant="outline" onClick={addOrgAssignmentRow} data-testid="button-add-org">
                        Add Row
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={clearExistingAssignments}
                onCheckedChange={setClearExistingAssignments}
                data-testid="switch-clear-assignments"
              />
              <Label>Clear existing assignments before adding</Label>
            </div>

            <div className="flex justify-between items-center">
              <Button onClick={handleAssignmentsSubmit} disabled={updateAssignmentsMutation.isPending}>
                Save Assignments
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteAssignmentsMutation.mutate(undefined)}
                disabled={!assignments.length}
                data-testid="button-clear-assignments"
              >
                Clear All
              </Button>
            </div>

            <div className="border-t pt-4">
              <Label>Existing Assignments</Label>
              {!assignments.length ? (
                <div className="text-sm text-muted-foreground mt-2">No assignments yet.</div>
              ) : (
                <div className="w-full overflow-x-auto">
                  <Table className="min-w-[900px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Class Section</TableHead>
                      <TableHead>Assigned At</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-mono">{assignment.id}</TableCell>
                        <TableCell className="text-xs">{assignment.userId || "-"}</TableCell>
                        <TableCell>{assignment.organizationId ?? "-"}</TableCell>
                        <TableCell>{assignment.classSection || "-"}</TableCell>
                        <TableCell className="text-xs">
                          {assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleString() : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteAssignmentsMutation.mutate([assignment.id])}
                            data-testid={`button-delete-assignment-${assignment.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FlashcardsCreator() {
  const { toast } = useToast();
  const [isAddDeckOpen, setIsAddDeckOpen] = useState(false);
  const [isEditDeckOpen, setIsEditDeckOpen] = useState(false);
  const [isAddCardsOpen, setIsAddCardsOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [editingDeck, setEditingDeck] = useState<FlashcardDeck | null>(null);
  const [bulkJson, setBulkJson] = useState("");

  const [deckFormData, setDeckFormData] = useState({
    name: "",
    subject: "",
    topicId: "",
    description: "",
  });

  const [cardFormData, setCardFormData] = useState({
    front: "",
    back: "",
  });

  const { data: decks = [], isLoading } = useQuery<FlashcardDeck[]>({
    queryKey: ["/api/admin/flashcard-decks"],
  });

  const { data: topics = [] } = useQuery<Topic[]>({
    queryKey: ["/api/admin/topics"],
  });

  const { data: deckCards = [], refetch: refetchCards } = useQuery<Flashcard[]>({
    queryKey: ["/api/admin/flashcard-decks", selectedDeck?.id, "cards"],
    enabled: !!selectedDeck,
    queryFn: async () => {
      if (!selectedDeck) return [];
      const res = await fetch(`/api/admin/flashcard-decks/${selectedDeck.id}/cards`, { credentials: "include" });
      return res.json();
    },
  });

  const createDeckMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/admin/flashcard-decks", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/flashcard-decks"] });
      toast({ title: "Deck created successfully" });
      setIsAddDeckOpen(false);
      resetDeckForm();
    },
    onError: () => toast({ title: "Failed to create deck", variant: "destructive" }),
  });

  const updateDeckMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => 
      apiRequest("PUT", `/api/admin/flashcard-decks/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/flashcard-decks"] });
      toast({ title: "Deck updated successfully" });
      setIsEditDeckOpen(false);
      setEditingDeck(null);
    },
    onError: () => toast({ title: "Failed to update deck", variant: "destructive" }),
  });

  const deleteDeckMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/admin/flashcard-decks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/flashcard-decks"] });
      toast({ title: "Deck deleted successfully" });
      if (selectedDeck) setSelectedDeck(null);
    },
    onError: () => toast({ title: "Failed to delete deck", variant: "destructive" }),
  });

  const addCardsMutation = useMutation({
    mutationFn: async ({ deckId, cards }: { deckId: number; cards: any[] }) => 
      apiRequest("POST", `/api/admin/flashcard-decks/${deckId}/cards`, { cards }),
    onSuccess: () => {
      refetchCards();
      queryClient.invalidateQueries({ queryKey: ["/api/admin/flashcard-decks"] });
      toast({ title: "Cards added successfully" });
      setCardFormData({ front: "", back: "" });
      setIsAddCardsOpen(false);
    },
    onError: () => toast({ title: "Failed to add cards", variant: "destructive" }),
  });

  const bulkImportCardsMutation = useMutation({
    mutationFn: async ({ deckId, cards }: { deckId: number; cards: any[] }) => 
      apiRequest("POST", `/api/admin/flashcard-decks/${deckId}/cards`, { cards }),
    onSuccess: (data: any) => {
      refetchCards();
      queryClient.invalidateQueries({ queryKey: ["/api/admin/flashcard-decks"] });
      toast({ 
        title: "Cards imported",
        description: `Imported ${data.imported} cards`
      });
      setIsBulkOpen(false);
      setBulkJson("");
    },
    onError: () => toast({ title: "Failed to import cards", variant: "destructive" }),
  });

  const deleteCardMutation = useMutation({
    mutationFn: async ({ deckId, cardId }: { deckId: number; cardId: number }) => 
      apiRequest("DELETE", `/api/admin/flashcard-decks/${deckId}/cards/${cardId}`),
    onSuccess: () => {
      refetchCards();
      queryClient.invalidateQueries({ queryKey: ["/api/admin/flashcard-decks"] });
      toast({ title: "Card deleted" });
    },
    onError: () => toast({ title: "Failed to delete card", variant: "destructive" }),
  });

  const resetDeckForm = () => {
    setDeckFormData({ name: "", subject: "", topicId: "", description: "" });
  };

  const handleCreateDeck = () => {
    createDeckMutation.mutate({
      ...deckFormData,
      topicId: deckFormData.topicId ? parseInt(deckFormData.topicId) : null,
    });
  };

  const handleEditDeck = (deck: FlashcardDeck) => {
    setEditingDeck(deck);
    setDeckFormData({
      name: deck.name,
      subject: deck.subject || "",
      topicId: deck.topicId?.toString() || "",
      description: deck.description || "",
    });
    setIsEditDeckOpen(true);
  };

  const handleUpdateDeck = () => {
    if (!editingDeck) return;
    updateDeckMutation.mutate({
      id: editingDeck.id,
      data: {
        ...deckFormData,
        topicId: deckFormData.topicId ? parseInt(deckFormData.topicId) : null,
      },
    });
  };

  const handleAddCard = () => {
    if (!selectedDeck) return;
    addCardsMutation.mutate({
      deckId: selectedDeck.id,
      cards: [cardFormData],
    });
  };

  const handleBulkImport = () => {
    if (!selectedDeck) return;
    try {
      const parsed = JSON.parse(bulkJson);
      if (!Array.isArray(parsed)) {
        toast({ title: "JSON must be an array of cards", variant: "destructive" });
        return;
      }
      bulkImportCardsMutation.mutate({ deckId: selectedDeck.id, cards: parsed });
    } catch (e) {
      toast({ title: "Invalid JSON format", variant: "destructive" });
    }
  };

  const filteredTopics = deckFormData.subject 
    ? topics.filter(t => t.subject === deckFormData.subject)
    : topics;

  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Flashcards Creator
            </CardTitle>
            <CardDescription>
              Create and manage flashcard decks ({decks.length} decks)
            </CardDescription>
          </div>
          <Dialog open={isAddDeckOpen} onOpenChange={(open) => { setIsAddDeckOpen(open); if (!open) resetDeckForm(); }}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-deck">
                <Plus className="h-4 w-4 mr-2" />
                Create Deck
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Flashcard Deck</DialogTitle>
              </DialogHeader>
              <FlashcardDeckForm
                formData={deckFormData}
                setFormData={setDeckFormData}
                topics={filteredTopics}
                onSubmit={handleCreateDeck}
                isPending={createDeckMutation.isPending}
                submitLabel="Create Deck"
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Decks</h3>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : !decks.length ? (
              <div className="text-center py-8 text-muted-foreground border rounded-lg">
                <Layers className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No decks found</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {decks.map((deck) => (
                    <div
                      key={deck.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedDeck?.id === deck.id 
                          ? "border-primary bg-primary/10" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedDeck(deck)}
                      data-testid={`deck-card-${deck.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{deck.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{deck.subject || "General"}</Badge>
                            <span className="text-xs text-muted-foreground">{deck.cardCount} cards</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); handleEditDeck(deck); }}
                            data-testid={`button-edit-deck-${deck.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); deleteDeckMutation.mutate(deck.id); }}
                            data-testid={`button-delete-deck-${deck.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">
                {selectedDeck ? `Cards in "${selectedDeck.name}"` : "Select a deck"}
              </h3>
              {selectedDeck && (
                <div className="flex gap-2">
                  <Dialog open={isBulkOpen} onOpenChange={setIsBulkOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" data-testid="button-bulk-import-cards">
                        <Upload className="h-4 w-4 mr-1" />
                        Bulk
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Bulk Import Cards</DialogTitle>
                        <DialogDescription>
                          Paste JSON array of cards with "front" and "back" fields
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea
                        value={bulkJson}
                        onChange={(e) => setBulkJson(e.target.value)}
                        placeholder='[{"front": "Question", "back": "Answer"}, ...]'
                        rows={8}
                        className="font-mono text-sm"
                        data-testid="textarea-bulk-cards"
                      />
                      <DialogFooter>
                        <Button
                          onClick={handleBulkImport}
                          disabled={bulkImportCardsMutation.isPending}
                          data-testid="button-submit-bulk-cards"
                        >
                          Import
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isAddCardsOpen} onOpenChange={setIsAddCardsOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" data-testid="button-add-card">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Card
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Card</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Front (Question)</Label>
                          <Textarea
                            value={cardFormData.front}
                            onChange={(e) => setCardFormData({ ...cardFormData, front: e.target.value })}
                            placeholder="Enter question..."
                            data-testid="input-card-front"
                          />
                        </div>
                        <div>
                          <Label>Back (Answer)</Label>
                          <Textarea
                            value={cardFormData.back}
                            onChange={(e) => setCardFormData({ ...cardFormData, back: e.target.value })}
                            placeholder="Enter answer..."
                            data-testid="input-card-back"
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleAddCard}
                            disabled={addCardsMutation.isPending}
                            data-testid="button-submit-card"
                          >
                            Add Card
                          </Button>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            {!selectedDeck ? (
              <div className="text-center py-8 text-muted-foreground border rounded-lg">
                <p>Select a deck to view cards</p>
              </div>
            ) : (
              <ScrollArea className="h-[350px] border rounded-lg p-2">
                {deckCards.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No cards in this deck</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {deckCards.map((card) => (
                      <div
                        key={card.id}
                        className="p-3 rounded-lg border hover:bg-muted/50"
                        data-testid={`card-item-${card.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{card.front}</p>
                            <p className="text-sm text-muted-foreground mt-1">{card.back}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteCardMutation.mutate({ deckId: selectedDeck.id, cardId: card.id })}
                            data-testid={`button-delete-card-${card.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            )}
          </div>
        </div>

        <Dialog open={isEditDeckOpen} onOpenChange={(open) => { setIsEditDeckOpen(open); if (!open) { setEditingDeck(null); resetDeckForm(); }}}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Flashcard Deck</DialogTitle>
            </DialogHeader>
            <FlashcardDeckForm
              formData={deckFormData}
              setFormData={setDeckFormData}
              topics={filteredTopics}
              onSubmit={handleUpdateDeck}
              isPending={updateDeckMutation.isPending}
              submitLabel="Update Deck"
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function FlashcardDeckForm({
  formData,
  setFormData,
  topics,
  onSubmit,
  isPending,
  submitLabel,
}: {
  formData: any;
  setFormData: (data: any) => void;
  topics: Topic[];
  onSubmit: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Deck Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter deck name"
          data-testid="input-deck-name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Subject</Label>
          <Select 
            value={formData.subject} 
            onValueChange={(v) => setFormData({ ...formData, subject: v, topicId: "" })}
          >
            <SelectTrigger data-testid="select-deck-subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Topic (Optional)</Label>
          <Select 
            value={formData.topicId} 
            onValueChange={(v) => setFormData({ ...formData, topicId: v })}
          >
            <SelectTrigger data-testid="select-deck-topic">
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t.id} value={t.id.toString()}>{t.topicName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Description (Optional)</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Deck description..."
          data-testid="input-deck-description"
        />
      </div>

      <DialogFooter>
        <Button 
          onClick={onSubmit} 
          disabled={isPending}
          data-testid="button-submit-deck"
        >
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  );
}

function ChapterContentManager() {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");

  const { data: topics = [], isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/admin/topics"],
  });

  const filteredTopics = topics.filter(t => {
    if (selectedSubject !== "all" && t.subject !== selectedSubject) return false;
    if (selectedClass !== "all" && t.classLevel !== selectedClass) return false;
    return true;
  });

  const subjectGroups = filteredTopics.reduce((acc, topic) => {
    const key = `${topic.subject} - Class ${topic.classLevel}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(topic);
    return acc;
  }, {} as Record<string, Topic[]>);

  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Chapter Content Manager
            </CardTitle>
            <CardDescription>
              Manage chapter-specific content and organize by subject ({topics.length} chapters)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="w-48">
            <Label>Filter by Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger data-testid="select-filter-subject">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Label>Filter by Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger data-testid="select-filter-class">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {CLASS_LEVELS.map((c) => (
                  <SelectItem key={c} value={c}>Class {c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : Object.keys(subjectGroups).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No chapters found matching the filters</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="space-y-6">
              {Object.entries(subjectGroups).map(([group, groupTopics]) => (
                <div key={group} data-testid={`chapter-group-${group.replace(/\s+/g, '-')}`}>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {group}
                    <Badge variant="secondary">{groupTopics.length} chapters</Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {groupTopics.map((topic) => (
                      <Card 
                        key={topic.id} 
                        className="hover:border-primary/50 transition-colors"
                        data-testid={`chapter-card-${topic.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{topic.topicName}</h4>
                              {topic.ncertChapter && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {topic.ncertChapter}
                                </p>
                              )}
                            </div>
                            <Badge variant="secondary">{topic.questionCount} Q</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="outline" className="text-xs">{topic.subject}</Badge>
                            <span className="text-xs text-muted-foreground">
                              Class {topic.classLevel}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
