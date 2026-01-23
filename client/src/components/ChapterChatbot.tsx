import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Copy,
  Check,
  Sparkles,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChapterChatbotProps {
  chapterId?: number;
  chapterTitle?: string;
  chapterSubject?: string;
  keyConcepts?: Array<{ title: string; description: string; formula?: string }>;
  formulas?: string[];
  isOpen: boolean;
  onToggle: () => void;
  layout?: 'floating' | 'sheet';
}

const MAX_MESSAGE_LENGTH = 1000;

const getQuickPrompts = (chapterTitle?: string): string[] => {
  const topic = chapterTitle || "this chapter";
  return [
    `What are the big ideas in ${topic}?`,
    "Summarize the must-know formulas",
    "Create a rapid revision guide for me",
    "How can I avoid common mistakes here?",
    "Give 2 exam-style questions with answers",
    "Explain like I'm new to this topic"
  ];
};

export function ChapterChatbot({
  chapterId,
  chapterTitle,
  chapterSubject,
  keyConcepts = [],
  formulas = [],
  isOpen,
  onToggle,
  layout = 'floating',
}: ChapterChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const { data: chatHealth } = useQuery({
    queryKey: ["/api/chapters/chat/health"],
    queryFn: async () => {
      try {
        return await apiRequest("GET", "/api/chapters/chat/health");
      } catch {
        return { configured: true, status: "unknown" };
      }
    },
    staleTime: 60_000,
  });

  const hasContext = Boolean(chapterId);
  const isChatConfigured = chatHealth?.configured !== false;
  const title = chapterTitle || 'Chapter assistant';
  const conceptTags = keyConcepts
    .map((item) => item?.title)
    .filter(Boolean)
    .slice(0, 3);
  const statusLabel = !isChatConfigured ? "AI offline" : hasContext ? "Live now" : "Loading context";
  const statusVariant = !isChatConfigured ? "destructive" : hasContext ? "default" : "outline";
  const statusDotClass = !isChatConfigured
    ? "bg-destructive"
    : hasContext
    ? "bg-emerald-500 animate-pulse"
    : "bg-amber-400";
  const isSheetLayout = layout === "sheet";
  const sheetToggleLabel = isOpen ? "Close assistant" : "Ask NEET AI";
  const sheetToggleHint = isOpen ? "Assistant open" : "Need help in this chapter?";

  useEffect(() => {
    if (isOpen && endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isOpen]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!chapterId) {
        throw new Error('Chapter context not ready yet. Please wait a moment.');
      }

      const response = await apiRequest('POST', `/api/chapters/${chapterId}/chat`, {
        message,
        chapterContext: {
          title: chapterTitle,
          subject: chapterSubject,
          keyConcepts: keyConcepts.slice(0, 10),
          formulas: formulas.slice(0, 10),
        },
      });
      return response as { answer: string };
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.answer,
          timestamp: new Date(),
        },
      ]);
    },
    onError: (error: any) => {
      console.error('Chatbot error:', error);

      let errorMessage = error?.message || error?.error || 'Failed to get response. Please try again.';
      if (typeof errorMessage === 'string' && errorMessage.includes(':')) {
        const parts = errorMessage.split(':');
        if (parts.length > 1) {
          errorMessage = parts.slice(1).join(':').trim();
        }
      }

      const isAuthError =
        error?.message?.includes('401') ||
        errorMessage.includes('401') ||
        errorMessage.toLowerCase().includes('authentication') ||
        errorMessage.toLowerCase().includes('not authenticated');

      const isConfigError =
        errorMessage.toLowerCase().includes('not configured') ||
        errorMessage.startsWith('503');

      if (isConfigError) {
        toast({
          title: 'AI assistant offline',
          description: 'Chapter chat is not configured yet. Please try again later.',
          variant: 'destructive',
          duration: 5000,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'The chapter assistant is offline right now. Please check back later.',
            timestamp: new Date(),
          },
        ]);
        return;
      }

      if (isAuthError) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to use the chapter assistant.',
          variant: 'destructive',
          duration: 5000,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'I need you to be logged in to help you with this chapter. Please log in and try again.',
            timestamp: new Date(),
          },
        ]);
      } else if (errorMessage.toLowerCase().includes('timeout')) {
        toast({
          title: 'Request timeout',
          description: 'The request took too long. Please try again.',
          variant: 'destructive',
          duration: 5000,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'I apologize, but the request timed out. Please try asking your question again.',
            timestamp: new Date(),
          },
        ]);
      } else {
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
          duration: 5000,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: `I encountered an error: ${errorMessage}. Please try asking your question again.`,
            timestamp: new Date(),
          },
        ]);
      }
    },
  });

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || chatMutation.isPending) return;

    if (!hasContext) {
      toast({
        title: 'Still loading the chapter',
        description: 'Once the chapter data is ready you can ask questions.',
        variant: 'destructive',
      });
      return;
    }

    if (!isChatConfigured) {
      toast({
        title: 'AI assistant not configured',
        description: 'Chapter chat is offline. Please try again later.',
        variant: 'destructive',
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: 'Login required',
        description: 'Sign in to chat about this chapter.',
        variant: 'destructive',
      });
      return;
    }

    if (trimmed.length < 3) {
      toast({
        title: 'Message too short',
        description: 'Please enter at least 3 characters.',
        variant: 'destructive',
      });
      return;
    }

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      toast({
        title: 'Message too long',
        description: `Your message is ${trimmed.length} characters. Please keep it under ${MAX_MESSAGE_LENGTH}.`,
        variant: 'destructive',
      });
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    chatMutation.mutate(trimmed);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleCopy = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: 'Copied!',
        description: 'Message copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy message to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    toast({
      title: 'Chat cleared',
      description: 'Message history has been cleared',
    });
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const renderChatCard = (containerClassName: string, cardWrapperClassName: string) => (
    <div className={containerClassName}>
      <div className={cardWrapperClassName}>
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-primary/25 via-fuchsia-400/15 to-sky-400/20 blur-3xl"
          aria-hidden
        />
        <Card
          className={cn(
            "overflow-hidden border border-white/10 bg-background/95 backdrop-blur-xl shadow-[0_24px_80px_-24px_rgba(0,0,0,0.6)]",
            isSheetLayout && "h-full flex flex-col"
          )}
        >
          <CardHeader className="pb-3 border-b bg-gradient-to-r from-background/80 via-background/70 to-background/80 shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-500 text-white shadow-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Chapter assistant
                  </p>
                  <CardTitle className="text-lg leading-tight">{title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {chapterSubject && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {chapterSubject}
                      </Badge>
                    )}
                    <Badge
                      variant={statusVariant}
                      className="text-xs flex items-center gap-1"
                    >
                      <span className={cn("h-2 w-2 rounded-full", statusDotClass)} />
                      {statusLabel}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {messages.length > 0 && (
                  <Button variant="ghost" size="icon" onClick={handleClearChat} title="Clear chat" className="rounded-full">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onToggle} title="Close assistant" className="rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {conceptTags.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Understands:</span>
                {conceptTags.map((concept) => (
                  <span
                    key={concept}
                    className="rounded-full border border-border/70 bg-background/70 px-3 py-1"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent
            className={cn(
              "space-y-4 pt-4",
              isSheetLayout && "flex flex-col flex-1 min-h-0 overflow-hidden"
            )}
          >
            <div className="flex flex-wrap gap-2 shrink-0">
              {getQuickPrompts(title).map((prompt, idx) => (
                <Button
                  key={idx}
                  variant="secondary"
                  size="sm"
                  className="rounded-full bg-muted/60 hover:bg-muted text-xs"
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={!isAuthenticated || chatMutation.isPending || !isChatConfigured}
                >
                  <Sparkles className="mr-1 h-3 w-3 text-primary" />
                  {prompt}
                </Button>
              ))}
            </div>
            {!isChatConfigured && (
              <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                AI assistant is not configured on the server. Set AI_INTEGRATIONS_OPENAI_API_KEY to enable chapter chat.
              </div>
            )}

            <div className="rounded-2xl border border-border/60 bg-muted/30 flex-1 min-h-0 overflow-hidden">
              <ScrollArea className={isSheetLayout ? "h-full" : "h-[360px] sm:h-[420px]"}>
                <div className="space-y-4 p-4 pr-3 pb-32 sm:pb-28">
                  {!isChatConfigured ? (
                    <div className="text-center py-10 space-y-4">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto opacity-60" />
                      <div>
                        <p className="text-sm font-semibold mb-1">Assistant offline</p>
                        <p className="text-sm text-muted-foreground">
                          The chapter chatbot is not configured yet. Please check back later.
                        </p>
                      </div>
                    </div>
                  ) : !isAuthenticated ? (
                    <div className="text-center py-10 space-y-4">
                      <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto opacity-60" />
                      <div>
                        <p className="text-sm font-semibold mb-1">Sign in to chat</p>
                        <p className="text-sm text-muted-foreground">
                          The assistant can explain concepts, formulas, and exam tricks tailored to this chapter.
                        </p>
                      </div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-60" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Ask me anything about this chapter.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          I understand the chapter context and can help explain concepts, formulas, and provide study tips.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            'flex flex-col gap-1',
                            message.role === 'user' ? 'items-end' : 'items-start'
                          )}
                        >
                          <div
                            className={cn(
                              'rounded-2xl px-4 py-3 max-w-[90%] shadow-sm backdrop-blur-sm',
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-primary/90 to-fuchsia-500/90 text-primary-foreground'
                                : 'bg-background/90 border border-border/60'
                            )}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground px-1">
                            <span>{formatTime(message.timestamp)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleCopy(message.id, message.content)}
                              title="Copy message"
                            >
                              {copiedId === message.id ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                      {chatMutation.isPending && (
                        <div className="flex items-start gap-2">
                          <div className="bg-background/90 border border-border/70 rounded-2xl px-3 py-2 flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
              </ScrollArea>
            </div>

            <div className="space-y-2 shrink-0">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={
                      !isChatConfigured
                        ? "AI assistant is offline..."
                        : isAuthenticated
                        ? "Ask about this chapter..."
                        : "Log in to ask questions..."
                    }
                    className="min-h-[80px] rounded-2xl border-border/60 bg-background/70 pr-12"
                    disabled={chatMutation.isPending || !isAuthenticated || !hasContext || !isChatConfigured}
                    maxLength={MAX_MESSAGE_LENGTH}
                  />
                  {input.length > 0 && (
                    <div className="absolute bottom-2 right-3 text-[11px] text-muted-foreground">
                      {input.length}/{MAX_MESSAGE_LENGTH}
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleSend}
                  disabled={
                    !isAuthenticated ||
                    !hasContext ||
                    !isChatConfigured ||
                    !input.trim() ||
                    chatMutation.isPending ||
                    input.trim().length < 3
                  }
                  size="icon"
                  className="h-[80px] w-14 sm:w-16 rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-lg"
                >
                  {chatMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1">
                <span>Press Enter to send, Shift+Enter for new line</span>
                {!hasContext && <span className="text-amber-500">Loading chapter context...</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (layout === 'sheet') {
    return (
      <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && onToggle()}>
        <SheetContent side="right" className="w-full sm:max-w-[560px] p-4 pt-8 z-[80]">
          {renderChatCard("w-full h-full", "relative w-full h-full")}
        </SheetContent>
      </Sheet>
      <div className="fixed left-3 sm:left-6 bottom-[calc(env(safe-area-inset-bottom,0)+16px)] z-[70]">
        <Button
          onClick={onToggle}
            className={cn(
              "group flex items-center gap-3 rounded-full px-4 sm:px-5 h-14 sm:h-12 shadow-[0_20px_60px_-24px_rgba(59,130,246,0.75)] transition-all",
              isOpen
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-gradient-to-r from-primary via-purple-500 to-sky-500 text-white hover:translate-y-[-1px]"
            )}
            size="lg"
            aria-label={sheetToggleLabel}
            aria-pressed={isOpen}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
            </span>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[11px] uppercase tracking-[0.08em] text-white/80">
                {sheetToggleHint}
              </span>
              <span className="text-sm font-semibold">{sheetToggleLabel}</span>
            </div>
            {!isOpen && <Sparkles className="h-5 w-5 hidden sm:block opacity-80" />}
          </Button>
        </div>
      </>
    );
  }

  if (!isOpen) {
    return (
      <div className="fixed right-3 sm:right-6 bottom-[calc(env(safe-area-inset-bottom,0)+16px)] z-[70]">
        <Button
          onClick={onToggle}
          className="group flex items-center gap-3 rounded-full px-4 sm:px-5 h-14 sm:h-12 shadow-[0_20px_60px_-24px_rgba(59,130,246,0.75)] bg-gradient-to-r from-primary via-purple-500 to-sky-500 text-white hover:translate-y-[-1px] transition-all"
          size="lg"
          aria-label="Open chapter assistant"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-[11px] uppercase tracking-[0.08em] text-white/80">
              Need help in this chapter?
            </span>
            <span className="text-sm font-semibold">Ask NEET AI</span>
          </div>
          <Sparkles className="h-5 w-5 hidden sm:block opacity-80" />
        </Button>
      </div>
    );
  }

  return renderChatCard(
    "fixed inset-x-3 sm:inset-auto sm:right-6 bottom-[calc(env(safe-area-inset-bottom,0)+16px)] z-[70]",
    "relative mx-auto sm:mx-0 w-full max-w-[540px]"
  );
}
