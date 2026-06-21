import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Copy,
  Check,
  Sparkles,
  Trash2,
  ShieldCheck,
  RotateCcw,
  Bot,
  User,
  Zap,
  Star,
  History,
  MoreVertical,
  MessageSquare,
  BookOpen,
  Atom,
  FlaskConical,
  Dna
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { apiRequest, fetchCsrfToken } from '@/lib/queryClient';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const markdownRemarkPlugins = [remarkGfm, remarkMath];
const markdownRehypePlugins = [rehypeKatex];

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
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const storageKey = `chapter-chat-${chapterId}`;

  const { data: historyData } = useQuery({
    queryKey: ["/api/chapters", chapterId, "history"],
    queryFn: async () => {
      if (!chapterId) return [];
      try {
        return await apiRequest("GET", `/api/chapters/${chapterId}/history`);
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
        return [];
      }
    },
    enabled: !!chapterId && isOpen && isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (historyData && Array.isArray(historyData) && historyData.length > 0) {
      const formatted = historyData.map((m: any) => ({
        id: m.id.toString(),
        role: m.role,
        content: m.content,
        timestamp: new Date(m.createdAt),
      }));
      setMessages(formatted);
    }
  }, [historyData]);

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
  const isSheetLayout = layout === 'sheet';

  useEffect(() => {
    if (isOpen && endRef.current) {
      const timer = setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  const chatMutation = useMutation({
    mutationFn: async ({ message, history }: { message: string; history: Message[] }) => {
      if (!chapterId) {
        throw new Error('Chapter context not ready yet. Please wait a moment.');
      }

      const assistantId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        },
      ]);

      const response = await fetch(`/api/chapters/${chapterId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': (await fetchCsrfToken()) || "",
        },
        body: JSON.stringify({
          message,
          stream: true,
          chapterContext: {
            title: chapterTitle,
            subject: chapterSubject,
            keyConcepts: keyConcepts.slice(0, 10),
            formulas: formulas.slice(0, 10),
          },
          history: history.slice(-10).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is not readable');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: fullContent } : m
                  )
                );
              } else if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (e) {
              console.warn('Failed to parse SSE chunk:', e);
            }
          }
        }
      }

      return { answer: fullContent };
    },
    onSuccess: () => {
      setFailedMessage(null);
    },
    onError: (error: any) => {
      console.error('Chatbot error:', error);
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content) {
          return prev.slice(0, -1);
        }
        return prev;
      });

      const lastUserMsg = messages.filter(m => m.role === 'user').pop();
      if (lastUserMsg) setFailedMessage(lastUserMsg.content);

      let errorMessage = error?.message || 'Failed to get response. Please try again.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `I encountered an error: ${errorMessage}. Please try again.`,
          timestamp: new Date(),
        },
      ]);
    },
  });

  const handleSend = useCallback((directMessage?: string) => {
    const trimmed = (directMessage || input).trim();
    if (!trimmed || chatMutation.isPending) return;

    if (!hasContext) {
      toast({ title: 'Still loading the chapter', description: 'Once the chapter data is ready you can ask questions.', variant: 'destructive' });
      return;
    }
    if (!isChatConfigured) {
      toast({ title: 'AI assistant not configured', description: 'Chapter chat is offline. Please try again later.', variant: 'destructive' });
      return;
    }
    if (!isAuthenticated) {
      toast({ title: 'Login required', description: 'Sign in to chat about this chapter.', variant: 'destructive' });
      return;
    }
    if (trimmed.length < 3) {
      toast({ title: 'Message too short', description: 'Please enter at least 3 characters.', variant: 'destructive' });
      return;
    }
    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      toast({ title: 'Message too long', description: `Keep it under ${MAX_MESSAGE_LENGTH} characters.`, variant: 'destructive' });
      return;
    }

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: trimmed, timestamp: new Date() };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    chatMutation.mutate({ message: trimmed, history: messages });
  }, [input, chatMutation, hasContext, isChatConfigured, isAuthenticated, toast, messages]);

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  const handleRetry = () => {
    if (failedMessage) {
      setFailedMessage(null);
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && last.content.includes('error')) {
          return prev.slice(0, -1);
        }
        return prev;
      });
      chatMutation.mutate({ message: failedMessage, history: messages });
    }
  };

  const handleCopy = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
      toast({ title: 'Copied!', description: 'Message copied to clipboard' });
    } catch (error) {
      toast({ title: 'Failed to copy', description: 'Could not copy message to clipboard', variant: 'destructive' });
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setFailedMessage(null);
    toast({ title: 'Chat cleared', description: 'Message history has been cleared' });
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const renderSidebar = () => (
    <div className="hidden md:flex flex-col w-64 shrink-0 border-r border-border/40 bg-slate-950/10 dark:bg-black/20 p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-foreground/80">
          <History className="h-4.5 w-4.5 text-primary" />
          <span className="text-sm font-bold tracking-tight">Chat History</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-foreground/5">
          <MoreVertical className="h-4.5 w-4.5 text-muted-foreground" />
        </Button>
      </div>

      {/* History List */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left bg-primary/10 text-primary border border-primary/20 transition-all font-semibold text-xs">
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="truncate">Forces & Motion</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all text-xs font-semibold">
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="truncate">Thermodynamics</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all text-xs font-semibold">
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="truncate">Previous Chat</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all text-xs font-semibold">
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="truncate">Previous Chat</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all text-xs font-semibold">
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="truncate">Chat Utilities...</span>
        </button>
      </div>

      {/* Subject Categories */}
      <div className="space-y-3 pt-4 border-t border-border/40">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">Subject Categories</p>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all text-xs font-semibold">
            <BookOpen className="h-4 w-4" />
            <span>All Subjects</span>
          </button>
          <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left bg-primary/10 border border-primary/20 text-primary font-semibold text-xs">
            <Atom className="h-4 w-4" />
            <span>Physics</span>
          </button>
          <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all text-xs font-semibold">
            <FlaskConical className="h-4 w-4" />
            <span>Chemistry</span>
          </button>
          <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all text-xs font-semibold">
            <Dna className="h-4 w-4" />
            <span>Biology</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderChatCard = (containerClass: string, cardClass: string) => (
    <div className={containerClass}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cardClass}
      >
        <Card className="overflow-hidden border-border/40 shadow-[0_32px_128px_-32px_rgba(0,0,0,0.3)] backdrop-blur-3xl bg-background/95 dark:bg-slate-950/95 rounded-none sm:rounded-[2rem] flex flex-row h-full min-h-0">
          {renderSidebar()}
          
          <div className="flex-1 flex flex-col h-full min-h-0 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-sky-500/5 pointer-events-none" />
            <CardHeader className="relative border-b border-border/40 bg-background/20 backdrop-blur-md pb-6 pt-7">
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-primary to-sky-500 text-white shadow-[0_8px_32px_-8px_rgba(59,130,246,0.5)]"
                >
                  <Bot className="h-7 w-7" />
                </motion.div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/80">NEET AI EXPERT</p>
                    <div className="h-1 w-1 rounded-full bg-primary/40" />
                    <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                      <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
                      Pro
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {chapterSubject && (
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-primary/5 border-primary/20 text-primary px-2 py-0.5 rounded-md">
                        {chapterSubject}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 px-2 py-0.5 rounded-md", 
                        isChatConfigured ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/5 border-rose-500/20 text-rose-600"
                      )}
                    >
                      <motion.span 
                        animate={isChatConfigured ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={cn("h-1.5 w-1.5 rounded-full", isChatConfigured ? "bg-emerald-500" : "bg-rose-500")} 
                      />
                      {isChatConfigured ? "Live" : "Offline"}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {messages.length > 0 && (
                  <Button variant="ghost" size="icon" onClick={handleClearChat} title="Clear chat" className="rounded-full hover:bg-rose-500/10 hover:text-rose-500 transition-colors">
                    <Trash2 className="h-4.5 w-4.5" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onToggle} title="Close assistant" className="rounded-full hover:bg-background/80 transition-colors">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className={cn("p-0 flex flex-col flex-1 min-h-0 overflow-hidden", isSheetLayout ? "h-full" : "h-[75vh]")}>
            <div className="flex-1 min-h-0 relative overflow-hidden bg-slate-500/5">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {!isChatConfigured ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-6 max-w-sm mx-auto">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-20" />
                        <MessageCircle className="h-20 w-20 text-rose-500/60 mx-auto relative" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-bold tracking-tight">System on Maintenance</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          We're currently upgrading the AI engine for this chapter. Please check back in a moment for even smarter insights.
                        </p>
                      </div>
                    </motion.div>
                  ) : !isAuthenticated ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-6 max-w-sm mx-auto">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-primary blur-3xl opacity-20" />
                        <ShieldCheck className="h-20 w-20 text-primary/60 mx-auto relative" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-bold tracking-tight">Unlock AI Mentorship</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sign in to start your personalized NEET preparation with real-time concept explanation and exam-winning strategies.
                        </p>
                        <Button className="mt-4 rounded-full px-8 shadow-lg shadow-primary/20">Sign in to Start</Button>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <AnimatePresence initial={false}>
                        {messages.length === 0 && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 py-4">
                            <div className="text-center space-y-4">
                              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                <Sparkles className="h-3.5 w-3.5" />
                                Interactive AI Guide
                              </div>
                              <h2 className="text-2xl font-bold tracking-tight px-4">
                                How can I accelerate your <span className="text-primary italic">NEET prep</span> today?
                              </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-3 px-2">
                              {getQuickPrompts(title).map((prompt, idx) => (
                                <motion.button
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--primary), 0.1)" }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleQuickPrompt(prompt)}
                                  className="group flex items-start gap-3 p-4 text-left rounded-2xl border border-border/40 bg-background/40 backdrop-blur-sm hover:border-primary/30 transition-all shadow-sm"
                                >
                                  <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Star className="h-4 w-4" />
                                  </div>
                                  <span className="text-sm font-medium leading-snug">{prompt}</span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="space-y-8">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className={cn('flex gap-4 group', message.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
                          >
                            <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-md mt-1 transition-transform group-hover:scale-110', message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white')}>
                              {message.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </div>
                            <div className={cn('flex flex-col gap-2 max-w-[82%]', message.role === 'user' ? 'items-end' : 'items-start')}>
                              <div className={cn('relative rounded-[2rem] px-6 py-5 overflow-hidden', message.role === 'user' ? 'bg-slate-900/40 border border-slate-800/80 text-slate-100 rounded-tr-none shadow-md backdrop-blur-md' : 'bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-600 text-white rounded-tl-none shadow-[0_16px_48px_-8px_rgba(99,102,241,0.4)] border border-indigo-500/20')}>
                                {message.role === 'assistant' && <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />}
                                {message.role === 'assistant' ? (
                                  <div className="text-[15px] leading-relaxed prose prose-sm prose-invert max-w-none break-words [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:mb-4 [&_ol]:mb-4 [&_pre]:my-4 [&_pre]:bg-black/30 [&_pre]:p-4 [&_pre]:rounded-xl [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-white [&_strong]:text-white">
                                    <ReactMarkdown remarkPlugins={markdownRemarkPlugins} rehypePlugins={markdownRehypePlugins}>{message.content}</ReactMarkdown>
                                  </div>
                                ) : (
                                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words font-medium">{message.content}</p>
                                )}
                              </div>
                              <div className={cn('flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1 opacity-0 group-hover:opacity-100 transition-opacity', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                <span>{formatTime(message.timestamp)}</span>
                                <div className="h-1 w-1 rounded-full bg-border" />
                                <button className="hover:text-primary transition-colors flex items-center gap-1" onClick={() => handleCopy(message.id, message.content)}>
                                  {copiedId === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                  {copiedId === message.id ? 'Copied' : 'Copy'}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {chatMutation.isPending && (
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg mt-1"><Bot className="h-5 w-5" /></div>
                            <div className="bg-white dark:bg-slate-900 border border-border/40 rounded-[1.5rem] rounded-tl-none px-6 py-4 flex items-center gap-3 shadow-sm">
                              <div className="flex gap-1.5">
                                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                              </div>
                              <span className="text-[13px] font-semibold text-primary/60 tracking-tight">Synthesizing insight...</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </>
                  )}
                  <div ref={endRef} />
                </div>
              </ScrollArea>
            </div>

            <div className="p-6 pt-4 bg-background/40 backdrop-blur-md border-t border-border/40">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder={!isChatConfigured ? "Assistant currently offline..." : isAuthenticated ? "Message your expert AI mentor..." : "Sign in to begin mentorship..."}
                    className="min-h-[56px] max-h-[160px] rounded-2xl border-border/40 bg-background/80 dark:bg-slate-900/80 px-5 py-4 text-[15px] shadow-inner focus-visible:ring-primary/20 focus-visible:border-primary/40 resize-none transition-all scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    disabled={chatMutation.isPending || !isAuthenticated || !hasContext || !isChatConfigured}
                    maxLength={MAX_MESSAGE_LENGTH}
                  />
                  {input.length > 0 && (
                    <div className="absolute top-[-24px] right-2 text-[10px] font-bold text-muted-foreground/40 bg-background/80 px-2 py-0.5 rounded-full border border-border/20">{input.length} / {MAX_MESSAGE_LENGTH}</div>
                  )}
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleSend()}
                    disabled={!isAuthenticated || !hasContext || !isChatConfigured || !input.trim() || chatMutation.isPending || input.trim().length < 2}
                    size="icon"
                    className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-primary to-sky-500 text-white shadow-[0_8px_24px_-8px_rgba(59,130,246,0.5)] border-none shrink-0"
                  >
                    {chatMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </motion.div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 px-1">
                <div className="flex items-center gap-1.5"><Star className="h-3 w-3 fill-amber-500/20 text-amber-500" /><span>NEET-Tailored AI Engine</span></div>
                {!hasContext && <span className="text-amber-500 animate-pulse">Syncing context...</span>}
              </div>
            </div>
          </CardContent>
        </div>
        </Card>
      </motion.div>
    </div>
  );

  if (layout === 'sheet') {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={(open) => !open && onToggle()}>
          <SheetContent side="right" className="w-full sm:max-w-[960px] p-0 z-[80] border-l-0 bg-transparent shadow-none">
            <SheetTitle className="sr-only">Chatbot Menu</SheetTitle>
            <SheetDescription className="sr-only">AI assistant and chat interface</SheetDescription>
            {renderChatCard("w-full h-full p-0 sm:p-4", "w-full h-full")}
          </SheetContent>
        </Sheet>
        {createPortal(
          <div className="fixed left-3 sm:left-6 bottom-[calc(env(safe-area-inset-bottom,0)+16px)] z-[70] lg:hidden">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={onToggle}
                className={cn("group relative flex items-center gap-4 rounded-3xl px-6 h-16 shadow-[0_32px_64px_-16px_rgba(59,130,246,0.6)] transition-all overflow-hidden border-none", isOpen ? "bg-slate-950 text-white" : "bg-gradient-to-r from-indigo-600 via-primary to-sky-500 text-white")}
                size="lg"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner">{isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}</span>
                <div className="flex flex-col text-left leading-tight pr-2"><span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/70">NEET Expert</span><span className="text-base font-bold tracking-tight">{isOpen ? "Close Assistant" : "Ask AI Mentor"}</span></div>
                {!isOpen && <Sparkles className="h-5 w-5 opacity-80 animate-pulse" />}
              </Button>
            </motion.div>
          </div>,
          document.body
        )}
      </>
    );
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? renderChatCard("fixed inset-x-3 sm:inset-auto sm:right-8 bottom-[calc(env(safe-area-inset-bottom,0)+24px)] z-[70]", "relative mx-auto sm:mx-0 w-full max-w-[960px]") : (
        <div className="fixed right-3 sm:right-8 bottom-[calc(env(safe-area-inset-bottom,0)+24px)] z-[70]">
          <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={onToggle} className="group relative flex items-center gap-4 rounded-3xl px-6 h-16 shadow-[0_32px_64px_-16px_rgba(59,130,246,0.6)] bg-gradient-to-r from-indigo-600 via-primary to-sky-500 text-white border-none transition-all overflow-hidden" size="lg">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner"><MessageCircle className="h-6 w-6" /></span>
              <div className="flex flex-col text-left leading-tight pr-2"><span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/70">Concept Helper</span><span className="text-base font-bold tracking-tight">AI Revision Guide</span></div>
              <Sparkles className="h-5 w-5 opacity-80 animate-pulse" />
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
