import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import {
  Search as SearchIcon,
  HelpCircle,
  BookOpen,
  FlaskConical,
  Lightbulb,
  Clock,
  X,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SearchResult {
  type: "question" | "topic" | "formula" | "keypoint";
  id: number;
  title: string;
  snippet: string;
  subject: string;
  relevanceScore: number;
  metadata?: Record<string, any>;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  filters: {
    type: string;
    subject: string | null;
    limit: number;
  };
}

const RECENT_SEARCHES_KEY = "neetprep_recent_searches";
const MAX_RECENT_SEARCHES = 10;

function getRecentSearches(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  try {
    const recent = getRecentSearches();
    const updated = [query, ...recent.filter((s) => s !== query)].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
  }
}

function clearRecentSearches() {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
  }
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function highlightMatches(text: string, query: string): React.ReactNode {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

const typeConfig: Record<string, { icon: typeof SearchIcon; color: string; label: string; bgColor: string }> = {
  question: { 
    icon: HelpCircle, 
    color: "text-blue-500", 
    label: "Question",
    bgColor: "bg-blue-500/10 border-blue-500/20",
  },
  topic: { 
    icon: BookOpen, 
    color: "text-green-500", 
    label: "Topic",
    bgColor: "bg-green-500/10 border-green-500/20",
  },
  formula: { 
    icon: FlaskConical, 
    color: "text-purple-500", 
    label: "Formula",
    bgColor: "bg-purple-500/10 border-purple-500/20",
  },
  keypoint: { 
    icon: Lightbulb, 
    color: "text-amber-500", 
    label: "Keypoint",
    bgColor: "bg-amber-500/10 border-amber-500/20",
  },
};

const subjects = [
  { value: "all", label: "All Subjects" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Botany", label: "Botany" },
  { value: "Zoology", label: "Zoology" },
];

export default function Search() {
  const [, setLocation] = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const debouncedQuery = useDebounce(searchInput, 300);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const { data, isLoading, isFetching } = useQuery<SearchResponse>({
    queryKey: ["/api/search", debouncedQuery, activeType, selectedSubject],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        return { results: [], total: 0, query: "", filters: { type: "all", subject: null, limit: 20 } };
      }
      
      const params = new URLSearchParams();
      params.set("q", debouncedQuery);
      params.set("type", activeType);
      if (selectedSubject !== "all") {
        params.set("subject", selectedSubject);
      }
      params.set("limit", "20");
      
      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) throw new Error("Search failed");
      
      const data = await response.json();
      if (debouncedQuery.length >= 2) {
        saveRecentSearch(debouncedQuery);
        setRecentSearches(getRecentSearches());
      }
      return data;
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 30000,
  });

  const { data: suggestionsData } = useQuery<{ suggestions: string[] }>({
    queryKey: ["/api/search/suggestions"],
    staleTime: 300000,
  });

  const handleResultClick = useCallback((result: SearchResult) => {
    switch (result.type) {
      case "question":
        setLocation(`/practice?questionId=${result.id}`);
        break;
      case "topic":
        const metadata = result.metadata;
        if (metadata?.classLevel) {
          setLocation(`/chapter/${result.subject.toLowerCase()}/${metadata.classLevel}/1`);
        } else {
          setLocation(`/${result.subject.toLowerCase()}`);
        }
        break;
      case "formula":
      case "keypoint":
        setLocation(`/library?tab=formulas&id=${result.id}&type=${result.type}`);
        break;
      default:
        break;
    }
  }, [setLocation]);

  const handleRecentSearchClick = (query: string) => {
    setSearchInput(query);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
  };

  const showResults = debouncedQuery.length >= 2;
  const showSuggestions = !showResults && !isLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuickNavigationBar />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
              <SearchIcon className="h-8 w-8 text-primary" />
              Search
            </h1>
            <p className="text-muted-foreground">
              Search across questions, topics, formulas, and keypoints
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for topics, questions, formulas..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg rounded-xl shadow-sm"
                data-testid="input-search"
                autoFocus
              />
              {searchInput && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchInput("")}
                  data-testid="button-clear-search"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {isFetching && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Tabs value={activeType} onValueChange={setActiveType} className="w-full sm:w-auto">
                <TabsList className="grid grid-cols-5 w-full sm:w-auto">
                  <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                  <TabsTrigger value="questions" data-testid="tab-questions">Questions</TabsTrigger>
                  <TabsTrigger value="topics" data-testid="tab-topics">Topics</TabsTrigger>
                  <TabsTrigger value="formulas" data-testid="tab-formulas">Formulas</TabsTrigger>
                  <TabsTrigger value="keypoints" data-testid="tab-keypoints">Keypoints</TabsTrigger>
                </TabsList>
              </Tabs>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading && showResults && (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {showResults && !isLoading && data?.results && data.results.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{data.total} result{data.total !== 1 ? "s" : ""} for "{data.query}"</span>
              </div>
              
              <div className="space-y-3">
                {data.results.map((result) => {
                  const config = typeConfig[result.type];
                  const Icon = config.icon;
                  
                  return (
                    <Card
                      key={`${result.type}-${result.id}`}
                      className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group"
                      onClick={() => handleResultClick(result)}
                      data-testid={`result-${result.type}-${result.id}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${config.bgColor} border`}>
                            <Icon className={`h-5 w-5 ${config.color}`} />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                {highlightMatches(result.title, debouncedQuery)}
                              </h3>
                              <Badge variant="secondary" className={`shrink-0 ${config.color}`}>
                                {config.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {highlightMatches(result.snippet, debouncedQuery)}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                              <Badge variant="outline" className="text-xs font-normal">
                                {result.subject}
                              </Badge>
                              {result.metadata?.isHighYield && (
                                <Badge variant="outline" className="text-xs font-normal text-amber-500 border-amber-500/30">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  High Yield
                                </Badge>
                              )}
                              {result.metadata?.pyqYear && (
                                <Badge variant="outline" className="text-xs font-normal">
                                  PYQ {result.metadata.pyqYear}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {showResults && !isLoading && data?.results?.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <SearchIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">No results found</h3>
                <p className="text-muted-foreground">
                  No matches found for "{debouncedQuery}". Try different keywords or filters.
                </p>
              </div>
              {suggestionsData?.suggestions && (
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestionsData.suggestions.slice(0, 5).map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        data-testid={`suggestion-${suggestion}`}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {showSuggestions && (
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Recent Searches
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearRecent}
                      className="text-muted-foreground hover:text-foreground"
                      data-testid="button-clear-recent"
                    >
                      Clear all
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((query) => (
                      <Button
                        key={query}
                        variant="outline"
                        size="sm"
                        onClick={() => handleRecentSearchClick(query)}
                        className="gap-2"
                        data-testid={`recent-${query}`}
                      >
                        <Clock className="h-3 w-3" />
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {suggestionsData?.suggestions && (
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    Popular Searches
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {suggestionsData.suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="ghost"
                        className="justify-start h-auto py-3 px-4"
                        onClick={() => handleSuggestionClick(suggestion)}
                        data-testid={`popular-${suggestion}`}
                      >
                        <SearchIcon className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span className="truncate">{suggestion}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-muted/50 rounded-xl p-6 space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Search Tips
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use specific terms like "Newton's first law" for better results</li>
                  <li>• Filter by subject to narrow down your search</li>
                  <li>• Search for formulas using their names or symbols</li>
                  <li>• Look for high-yield topics to focus on important concepts</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
