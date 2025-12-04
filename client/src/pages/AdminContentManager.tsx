import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
  FolderOpen
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
    <div className="min-h-screen gradient-mesh-bg p-6">
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
            <Table>
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
            <Table>
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
            <Table>
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
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const { data: topics = [], isLoading } = useQuery<Topic[]>({
    queryKey: ["/api/admin/topics"],
  });

  const filteredTopics = topics.filter(t => {
    if (selectedSubject && t.subject !== selectedSubject) return false;
    if (selectedClass && t.classLevel !== selectedClass) return false;
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
                <SelectItem value="">All Subjects</SelectItem>
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
                <SelectItem value="">All Classes</SelectItem>
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
