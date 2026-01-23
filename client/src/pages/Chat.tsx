import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare, Loader2, AlertCircle, Send } from "lucide-react";

interface Thread {
  id: number;
  subject: string;
  studentId: string;
  mentorId: string | null;
  latestMessage: {
    content: string;
    createdAt: string;
    isFlagged: boolean;
    senderId: string;
  } | null;
  isResolved: boolean;
}

interface MessageResponse {
  message: {
    id: number;
    content: string;
    senderId: string;
    createdAt: string;
    isFlagged: boolean;
  };
  sender: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
}

export default function Chat() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [activeThread, setActiveThread] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const MESSAGE_LIMIT = 50;
  const MAX_MESSAGE_LENGTH = 500;

  const {
    data: threadsData = [],
    isLoading: threadsLoading,
    refetch: refetchThreads,
    status: threadsStatus,
  } = useQuery<Thread[]>({
    queryKey: ["/api/chat/threads"],
    queryFn: async () => {
      const payload = await apiRequest("GET", "/api/chat/threads");
      return payload.threads;
    },
    refetchInterval: 30000,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!activeThread && threadsData.length > 0) {
      setActiveThread(threadsData[0].id);
    }
  }, [threadsData, activeThread]);

  const { data: chatHealth } = useQuery({
    queryKey: ["/api/chat/health"],
    queryFn: async () => apiRequest("GET", "/api/chat/health"),
    staleTime: 60_000,
  });
  const chatEnabled = chatHealth?.status === "ok";

  const {
    data: messagesData = [],
    isFetching: messagesLoading,
    refetch: refetchMessages,
    status: messagesStatus,
  } = useQuery<MessageResponse[]>({
    queryKey: ["/api/chat/messages", activeThread, MESSAGE_LIMIT],
    queryFn: async () => {
      if (!activeThread) return [];
      const response = await apiRequest("GET", `/api/chat/threads/${activeThread}/messages?limit=${MESSAGE_LIMIT}`);
      return (response as { messages: MessageResponse[] }).messages ?? [];
    },
    enabled: Boolean(activeThread),
    placeholderData: [],
    staleTime: 15_000,
    select: (data) => [...data].reverse(), // display oldest -> newest
  });

  const createThreadMutation = useMutation({
    mutationFn: async (payload: { subject: string }) => {
      return apiRequest("POST", "/api/chat/threads", payload);
    },
    onSuccess: (thread: Thread) => {
      toast({ title: "Thread created", description: "Your chat room is ready" });
      refetchThreads();
      setSubject("");
      setActiveThread(thread.id);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create thread",
        description: error.message || "Try again",
        variant: "destructive",
      });
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (payload: { threadId: number; content: string }) => {
      return apiRequest("POST", `/api/chat/threads/${payload.threadId}/messages`, {
        content: payload.content,
      });
    },
    onSuccess: () => {
      toast({ title: "Message sent" });
      setMessageText("");
      refetchMessages();
      refetchThreads();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Try again",
        variant: "destructive",
      });
    },
  });

  const handleCreateThread = () => {
    if (!subject.trim()) {
      toast({
        title: "Subject required",
        description: "Please enter a topic for the chat thread",
        variant: "destructive",
      });
      return;
    }
    createThreadMutation.mutate({ subject: subject.trim() });
  };

  const handleSendMessage = () => {
    if (!activeThread || !messageText.trim()) return;
    sendMessageMutation.mutate({ threadId: activeThread, content: messageText.trim() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Mentor Chat
            {chatHealth?.status === "ok" && (
              <Badge variant="secondary" className="text-[10px]">
                {chatHealth.modelStatus ?? "online"}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Start private mentor-student conversations, share resources, and keep every reply moderated with automatic
            flagging.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create new thread</CardTitle>
                <CardDescription>
                  {chatEnabled
                    ? "Summarize the topic you want to discuss."
                    : "Chat is currently unavailable. Please check back later."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Subject (e.g., Thermodynamics doubt)"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  data-testid="input-new-thread"
                  maxLength={80}
                  disabled={!chatEnabled}
                />
                <Button
                  className="w-full gap-2"
                  onClick={handleCreateThread}
                  disabled={createThreadMutation.isPending || !chatEnabled}
                >
                  {createThreadMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {createThreadMutation.isPending ? "Creating..." : "Start thread"}
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Threads</CardTitle>
                <CardDescription>Pick a conversation to continue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {threadsLoading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, idx) => (
                      <Skeleton key={idx} className="h-12 w-full" />
                    ))}
                  </div>
                ) : threadsData.length === 0 ? (
                  <Card className="border-dashed text-center py-6">
                    <CardDescription>No threads yet. Start one to chat with mentors.</CardDescription>
                  </Card>
                ) : (
                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {threadsData.map((thread) => (
                      <button
                        key={thread.id}
                        onClick={() => setActiveThread(thread.id)}
                        className={`w-full text-left rounded-xl border px-3 py-2 transition ${
                          activeThread === thread.id
                            ? "border-primary bg-primary/10"
                            : "border-muted/30 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold">{thread.subject}</span>
                          {thread.latestMessage?.isFlagged && (
                            <Badge variant="destructive" className="text-[10px]">
                              Flagged
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {thread.latestMessage
                            ? `${thread.latestMessage.content.slice(0, 50)}`
                            : "No messages yet"}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  {activeThread ? "Messages are auto-moderated for policy keywords." : "Select a thread to view messages."}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {activeThread && (
                  <ScrollArea className="max-h-[60vh] space-y-3 pr-2">
                    {messagesLoading ? (
                      <div className="space-y-2">
                        {[...Array(3)].map((_, idx) => (
                          <Skeleton key={idx} className="h-12 w-full" />
                        ))}
                      </div>
                    ) : (
                      messagesData.map((item) => (
                        <div key={item.message.id} className="flex flex-col gap-1 rounded-xl border border-muted/30 p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{item.sender.name}</span>
                            <span className="text-[11px] text-muted-foreground">
                              {new Date(item.message.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm">{item.message.content}</p>
                          {item.message.isFlagged && (
                            <div className="flex items-center gap-1 text-amber-500 text-xs">
                              <AlertCircle className="h-3 w-3" />
                              Auto-flagged for moderation review.
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </ScrollArea>
                )}
                {!activeThread && (
                  <div className="flex flex-col items-center justify-center text-center gap-2 text-sm text-muted-foreground h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>Select a thread to start chatting.</p>
                  </div>
                )}
              </CardContent>
              {activeThread && (
                <CardFooter className="flex flex-col gap-3">
                  <Textarea
                    placeholder="Write a message"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    className="min-h-[90px]"
                    maxLength={MAX_MESSAGE_LENGTH}
                    disabled={!chatEnabled}
                  />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {messageText.length}/{MAX_MESSAGE_LENGTH} characters
                </span>
                {messagesLoading && <span>Refreshing…</span>}
              </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSendMessage}
                      disabled={
                        sendMessageMutation.isPending ||
                        !messageText.trim() ||
                        messageText.length > MAX_MESSAGE_LENGTH ||
                        !chatEnabled
                      }
                      className="gap-2"
                    >
                      {sendMessageMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Send
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
