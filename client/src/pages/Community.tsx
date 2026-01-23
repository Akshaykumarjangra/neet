import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import { Paywall } from "@/components/Paywall";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Search, 
  Plus, 
  ArrowUp, 
  ArrowDown,
  Filter,
  MessageCircle,
  Pin,
  ChevronLeft,
  Send,
  Check,
  X,
  Users,
  TrendingUp,
  HelpCircle
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatDistanceToNow } from "date-fns";

interface Author {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface Discussion {
  id: number;
  title: string;
  content: string;
  isPinned: boolean;
  isResolved: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  chapterId: number | null;
  topicId: number | null;
  userId: string;
  author: Author;
  voteCount: number;
  replyCount: number;
  hasAcceptedAnswer: boolean;
}

interface Reply {
  id: number;
  content: string;
  isAcceptedAnswer: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  author: Author;
  voteCount: number;
  userVote: "up" | "down" | null;
}

interface DiscussionDetail extends Discussion {
  userVote: "up" | "down" | null;
  replies: Reply[];
  chapter: {
    id: number;
    chapterTitle: string;
    subject: string;
    classLevel: string;
    chapterNumber: number;
  } | null;
  topic: {
    id: number;
    topicName: string;
    subject: string;
  } | null;
}

interface Announcement {
  id: number;
  title: string;
  message: string;
  audience: "all" | "premium";
  actionLabel?: string;
  actionUrl?: string;
  bannerColor: string;
  isPinned: boolean;
}

interface AnnouncementResponse {
  announcements: Announcement[];
  isPremium: boolean;
}

interface DiscussionsResponse {
  discussions: Discussion[];
  total: number;
  limit: number;
  offset: number;
  requiresPremium?: boolean;
}

interface ChapterOption {
  id: number;
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterTitle: string;
}

function DiscussionCard({ discussion, onClick }: { discussion: Discussion; onClick: () => void }) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary"
      onClick={onClick}
      data-testid={`card-discussion-${discussion.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {discussion.isPinned && (
                <Badge variant="secondary" className="text-xs">
                  <Pin className="h-3 w-3 mr-1" />
                  Pinned
                </Badge>
              )}
              {discussion.isResolved ? (
                <Badge variant="default" className="bg-green-500 text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Resolved
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  Open
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg line-clamp-2">{discussion.title}</CardTitle>
          </div>
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className={`flex items-center gap-1 font-semibold ${discussion.voteCount > 0 ? 'text-green-600' : discussion.voteCount < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
              {discussion.voteCount > 0 ? <ArrowUp className="h-4 w-4" /> : discussion.voteCount < 0 ? <ArrowDown className="h-4 w-4" /> : null}
              {discussion.voteCount}
            </div>
            <span className="text-xs text-muted-foreground">votes</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {discussion.content}
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-5 w-5">
              <AvatarImage src={discussion.author.avatarUrl || undefined} />
              <AvatarFallback className="text-[10px]">
                {discussion.author.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{discussion.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {discussion.replyCount} {discussion.replyCount === 1 ? 'reply' : 'replies'}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {discussion.viewCount}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function DiscussionDetail({ 
  discussionId, 
  onBack 
}: { 
  discussionId: number; 
  onBack: () => void;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [replyContent, setReplyContent] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const { data: discussion, isLoading, refetch } = useQuery<DiscussionDetail>({
    queryKey: [`/api/discussions/${discussionId}`],
    refetchInterval: 30000,
  });

  const voteMutation = useMutation({
    mutationFn: async ({ type, voteType }: { type: "discussion" | "reply"; voteType: "up" | "down"; replyId?: number }) => {
      if (type === "discussion") {
        return apiRequest("POST", `/api/discussions/${discussionId}/vote`, { voteType });
      } else {
        return apiRequest("POST", `/api/replies/${type === "reply" ? arguments[0].replyId : discussionId}/vote`, { voteType });
      }
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to vote",
        variant: "destructive",
      });
    },
  });

  const replyVoteMutation = useMutation({
    mutationFn: async ({ replyId, voteType }: { replyId: number; voteType: "up" | "down" }) => {
      return apiRequest("POST", `/api/replies/${replyId}/vote`, { voteType });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to vote",
        variant: "destructive",
      });
    },
  });

  const addReplyMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", `/api/discussions/${discussionId}/replies`, { content });
    },
    onSuccess: () => {
      setReplyContent("");
      refetch();
      toast({
        title: "Reply added",
        description: "Your reply has been posted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add reply",
        variant: "destructive",
      });
    },
  });

  const acceptAnswerMutation = useMutation({
    mutationFn: async (replyId: number) => {
      return apiRequest("PUT", `/api/replies/${replyId}/accept`, {});
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Answer accepted",
        description: "The answer has been marked as accepted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to accept answer",
        variant: "destructive",
      });
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async (isResolved: boolean) => {
      return apiRequest("POST", `/api/discussions/${discussionId}/resolve`, { isResolved });
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Discussion updated",
        description: discussion?.isResolved ? "Discussion marked as open" : "Discussion marked as resolved",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} data-testid="button-back-to-list">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to discussions
        </Button>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Discussion not found</p>
        <Button variant="link" onClick={onBack}>Back to discussions</Button>
      </div>
    );
  }

  const isAuthor = user?.id === discussion.userId;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Button variant="ghost" onClick={onBack} data-testid="button-back-to-list">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to discussions
      </Button>

      <Card data-testid="card-discussion-detail">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {discussion.isPinned && (
                  <Badge variant="secondary">
                    <Pin className="h-3 w-3 mr-1" />
                    Pinned
                  </Badge>
                )}
                {discussion.isResolved ? (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Resolved
                  </Badge>
                ) : (
                  <Badge variant="outline">Open</Badge>
                )}
                {discussion.chapter && (
                  <Badge variant="outline">
                    {discussion.chapter.subject} - Ch. {discussion.chapter.chapterNumber}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl" data-testid="text-discussion-title">
                {discussion.title}
              </CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={discussion.author.avatarUrl || undefined} />
                    <AvatarFallback>
                      {discussion.author.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{discussion.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {discussion.viewCount} views
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => voteMutation.mutate({ type: "discussion", voteType: "up" })}
                className={discussion.userVote === "up" ? "text-green-600 bg-green-50" : ""}
                disabled={!user}
                data-testid="button-upvote-discussion"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
              <span className={`font-bold text-lg ${discussion.voteCount > 0 ? 'text-green-600' : discussion.voteCount < 0 ? 'text-red-600' : ''}`}>
                {discussion.voteCount}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => voteMutation.mutate({ type: "discussion", voteType: "down" })}
                className={discussion.userVote === "down" ? "text-red-600 bg-red-50" : ""}
                disabled={!user}
                data-testid="button-downvote-discussion"
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none" data-testid="text-discussion-content">
            {discussion.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
        {isAuthor && (
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => resolveMutation.mutate(!discussion.isResolved)}
              data-testid="button-toggle-resolved"
            >
              {discussion.isResolved ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Mark as Open
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Resolved
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {discussion.replies.length} {discussion.replies.length === 1 ? 'Reply' : 'Replies'}
        </h3>

        {discussion.replies.map((reply) => (
          <Card 
            key={reply.id} 
            className={reply.isAcceptedAnswer ? "border-green-500 border-2" : ""}
            data-testid={`card-reply-${reply.id}`}
          >
            <CardContent className="pt-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${reply.userVote === "up" ? "text-green-600 bg-green-50" : ""}`}
                    onClick={() => replyVoteMutation.mutate({ replyId: reply.id, voteType: "up" })}
                    disabled={!user}
                    data-testid={`button-upvote-reply-${reply.id}`}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <span className={`font-semibold ${reply.voteCount > 0 ? 'text-green-600' : reply.voteCount < 0 ? 'text-red-600' : ''}`}>
                    {reply.voteCount}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${reply.userVote === "down" ? "text-red-600 bg-red-50" : ""}`}
                    onClick={() => replyVoteMutation.mutate({ replyId: reply.id, voteType: "down" })}
                    disabled={!user}
                    data-testid={`button-downvote-reply-${reply.id}`}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={reply.author.avatarUrl || undefined} />
                        <AvatarFallback>
                          {reply.author.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{reply.author.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                      </span>
                      {reply.isAcceptedAnswer && (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Accepted Answer
                        </Badge>
                      )}
                    </div>
                    {isAuthor && !reply.isAcceptedAnswer && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => acceptAnswerMutation.mutate(reply.id)}
                        data-testid={`button-accept-answer-${reply.id}`}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Accept Answer
                      </Button>
                    )}
                    {isAuthor && reply.isAcceptedAnswer && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => acceptAnswerMutation.mutate(reply.id)}
                        data-testid={`button-unaccept-answer-${reply.id}`}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Unaccept
                      </Button>
                    )}
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {reply.content.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {user ? (
          <Card data-testid="card-add-reply">
            <CardHeader>
              <CardTitle className="text-lg">Add a Reply</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                data-testid="input-reply-content"
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => addReplyMutation.mutate(replyContent)}
                disabled={!replyContent.trim() || addReplyMutation.isPending}
                data-testid="button-submit-reply"
              >
                <Send className="h-4 w-4 mr-2" />
                {addReplyMutation.isPending ? "Posting..." : "Post Reply"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="bg-muted/50">
            <CardContent className="py-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Sign in to join the discussion</p>
              <Link href="/login">
                <Button data-testid="button-login-to-reply">Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
}

export default function Community() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterResolved, setFilterResolved] = useState("all");
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    chapterId: "general",
  });

  const { data: announcementPayload, isLoading: announcementsLoading } = useQuery<AnnouncementResponse>({
    queryKey: ["/api/announcements"],
    queryFn: async () => {
      const response = await fetch("/api/announcements", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to load announcements");
      }
      return response.json();
    },
  });

  const { data: chaptersData } = useQuery<ChapterOption[]>({
    queryKey: ["/api/lms/library"],
  });

  const { data: discussionsData, isLoading, refetch } = useQuery<DiscussionsResponse>({
    queryKey: ["/api/discussions", { sortBy, resolved: filterResolved, chapterId: selectedChapter, search: searchQuery }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (sortBy === "votes") params.append("sortBy", "votes");
      else if (sortBy === "unanswered") params.append("sortBy", "unanswered");
      if (filterResolved === "resolved") params.append("resolved", "true");
      else if (filterResolved === "unresolved") params.append("resolved", "false");
      if (selectedChapter && selectedChapter !== "all") params.append("chapterId", selectedChapter);
      if (searchQuery) params.append("search", searchQuery);
      
      const response = await fetch(`/api/discussions?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch discussions");
      return response.json();
    },
    refetchInterval: 30000,
  });

  const announcements = announcementPayload?.announcements ?? [];
  const hasPremiumAccess = Boolean(user?.isPaidUser || user?.isOwner || announcementPayload?.isPremium);
  const showPremiumReminder = Boolean(discussionsData?.requiresPremium && !hasPremiumAccess);

  const createDiscussionMutation = useMutation({
    mutationFn: async (data: { title: string; content: string; chapterId?: number }) => {
      return apiRequest("POST", "/api/discussions", data);
    },
    onSuccess: (data) => {
      setIsCreateDialogOpen(false);
      setNewDiscussion({ title: "", content: "", chapterId: "general" });
      refetch();
      toast({
        title: "Discussion created",
        description: "Your discussion has been posted successfully.",
      });
      if (data?.id) {
        setSelectedDiscussionId(data.id);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create discussion",
        variant: "destructive",
      });
    },
  });

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }
    createDiscussionMutation.mutate({
      title: newDiscussion.title,
      content: newDiscussion.content,
      chapterId:
        newDiscussion.chapterId && newDiscussion.chapterId !== "general"
          ? parseInt(newDiscussion.chapterId, 10)
          : undefined,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedDiscussionId) {
        setSelectedDiscussionId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDiscussionId]);

  if (selectedDiscussionId) {
    return (
      <div className="min-h-screen bg-background">
        <QuickNavigationBar currentPath="/community" />
        <div className="container mx-auto p-6 max-w-4xl">
          <DiscussionDetail
            discussionId={selectedDiscussionId}
            onBack={() => setSelectedDiscussionId(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <QuickNavigationBar currentPath="/community" />
      <div className="container mx-auto p-6 space-y-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative glass-panel p-6 rounded-2xl">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-testid="text-community-title">
                    <Users className="inline h-10 w-10 mr-3 text-primary" />
                    Community Discussions
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Ask questions, share knowledge, and learn together with fellow NEET aspirants
                  </p>
                </div>
                {user ? (
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="gap-2" data-testid="button-new-discussion">
                        <Plus className="h-5 w-5" />
                        New Discussion
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Start a New Discussion</DialogTitle>
                        <DialogDescription>
                          Ask a question or start a discussion about any topic
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            placeholder="What's your question or topic?"
                            value={newDiscussion.title}
                            onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                            data-testid="input-new-discussion-title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="chapter">Related Chapter (Optional)</Label>
                          <Select
                            value={newDiscussion.chapterId}
                            onValueChange={(value) => setNewDiscussion({ ...newDiscussion, chapterId: value })}
                          >
                            <SelectTrigger data-testid="select-new-discussion-chapter">
                              <SelectValue placeholder="Select a chapter" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Discussion</SelectItem>
                              {chaptersData?.map((chapter) => (
                                <SelectItem key={chapter.id} value={chapter.id.toString()}>
                                  {chapter.subject} - Ch. {chapter.chapterNumber}: {chapter.chapterTitle}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            placeholder="Describe your question or topic in detail..."
                            value={newDiscussion.content}
                            onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                            rows={6}
                            data-testid="input-new-discussion-content"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleCreateDiscussion}
                          disabled={createDiscussionMutation.isPending}
                          data-testid="button-submit-new-discussion"
                        >
                          {createDiscussionMutation.isPending ? "Creating..." : "Create Discussion"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Link href="/login">
                    <Button size="lg" data-testid="button-login-to-post">
                      Sign In to Post
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {announcements.length > 0 && (
          <div className="space-y-3">
            {announcements.slice(0, 3).map((announcement) => {
              const colorClass =
                announcement.bannerColor === "primary"
                  ? "border-primary/30 bg-primary/5"
                  : announcement.bannerColor === "purple"
                  ? "border-purple-300/70 bg-purple-50"
                  : announcement.bannerColor === "pink"
                  ? "border-pink-300/70 bg-pink-50"
                  : "border-muted/30 bg-muted/5";

              return (
                <Card key={announcement.id} className={`border ${colorClass} shadow-sm`}>
                  <CardHeader className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-xl font-semibold">{announcement.title}</CardTitle>
                      <Badge variant="outline" className="text-xs uppercase">
                        {announcement.audience === "premium" ? "Premium" : "All"}
                      </Badge>
                    </div>
                    {announcement.isPinned && (
                      <Badge variant="secondary" className="text-xs">
                        Pinned
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="pt-1 pb-4 text-sm text-muted-foreground">
                    {announcement.message}
                  </CardContent>
                  {announcement.actionUrl && (
                    <CardFooter className="pt-0">
                      <Button asChild variant="ghost" className="gap-2">
                        <a href={announcement.actionUrl} target="_blank" rel="noreferrer">
                          {announcement.actionLabel || "Learn more"}
                        </a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {showPremiumReminder && (
          <div>
            <Paywall
              feature="Community Discussions"
              description="Full forums are reserved for Premium members."
              freeLimit="Guest previews only"
              variant="inline"
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-discussions"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48" data-testid="select-sort-by">
              <TrendingUp className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="votes">Most Votes</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterResolved} onValueChange={setFilterResolved}>
            <SelectTrigger className="w-full lg:w-48" data-testid="select-filter-resolved">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Discussions</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="unresolved">Unresolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedChapter} onValueChange={setSelectedChapter}>
            <SelectTrigger className="w-full lg:w-64" data-testid="select-filter-chapter">
              <SelectValue placeholder="All Chapters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chapters</SelectItem>
              {chaptersData?.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id.toString()}>
                  {chapter.subject} - Ch. {chapter.chapterNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        ) : discussionsData?.discussions.length === 0 ? (
          <Card className="py-16">
            <CardContent className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No discussions found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || filterResolved !== "all" || selectedChapter !== "all"
                  ? "Try adjusting your filters or search query"
                  : "Be the first to start a discussion!"}
              </p>
              {user && !searchQuery && (
                <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-start-first-discussion">
                  <Plus className="h-4 w-4 mr-2" />
                  Start a Discussion
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {discussionsData?.discussions.length} of {discussionsData?.total} discussions
              </p>
            </div>
            
            <AnimatePresence mode="popLayout">
              {discussionsData?.discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                >
                  <DiscussionCard
                    discussion={discussion}
                    onClick={() => setSelectedDiscussionId(discussion.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
