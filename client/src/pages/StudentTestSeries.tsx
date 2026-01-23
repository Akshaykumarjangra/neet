import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Layers, ChevronRight, Calendar } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { trackEvent } from "@/lib/telemetry";

interface TestSeries {
    id: number;
    title: string;
    description: string | null;
    isPublished: boolean;
    startsAt?: string | null;
    endsAt?: string | null;
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-800 p-4 rounded mb-4 flex items-center justify-between">
            <span>{message}</span>
            <Button variant="outline" onClick={onRetry}>Retry</Button>
        </div>
    );
}

export default function StudentTestSeries() {
    const [, setLocation] = useLocation();
    const { isAuthenticated } = useAuth();
    const { data: seriesList = [], isLoading, isError, refetch } = useQuery<TestSeries[]>({
        queryKey: ["/api/mock-exams/series"],
        queryFn: async () => {
            const res = await apiRequest("GET", "/api/mock-exams/series");
            if (Array.isArray(res?.data)) return res.data as TestSeries[];
            if (res?.data?.data && Array.isArray(res.data.data)) return res.data.data as TestSeries[];
            return [];
        },
    });

    useEffect(() => {
        trackEvent("test_series_view");
    }, []);

    const handleCardClick = (id: number) => {
        if (!isAuthenticated) {
            setLocation("/login");
            return;
        }
        trackEvent("test_series_start", { seriesId: id });
        setLocation(`/mock-tests?seriesId=${id}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick(id);
        }
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background">
                <Header activeSubject="Test Series" userPoints={2450} userLevel={12} studyStreak={7} />
                <main className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Test Series</h1>
                        <p className="text-muted-foreground">
                            Comprehensive test packages curated for your NEET preparation.
                        </p>
                    </div>
                    {isError && (
                        <ErrorBanner
                            message="Failed to load test series. Please try again."
                            onRetry={() => refetch()}
                        />
                    )}
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="animate-pulse">
                                    <CardHeader className="h-24 bg-muted/50" />
                                    <CardContent className="h-32" />
                                </Card>
                            ))}
                        </div>
                    ) : seriesList.length === 0 ? (
                        <div className="text-center py-16">
                            <Layers className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold">No Active Series</h3>
                            <p className="text-muted-foreground">Check back later for new test series.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {seriesList.map((series) => (
                                <Card
                                    key={series.id}
                                    className="group hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Open test series ${series.title}`}
                                    onClick={() => handleCardClick(series.id)}
                                    onKeyDown={(e) => handleKeyDown(e, series.id)}
                                >
                                    <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant={series.isPublished ? "default" : "outline"} className="text-xs uppercase tracking-wider">
                                                {series.isPublished ? "Published" : "Draft"}
                                            </Badge>
                                            <Layers className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <CardTitle className="line-clamp-1">{series.title}</CardTitle>
                                        <CardDescription className="line-clamp-2 min-h-[40px]">
                                            {series.description || "No description available."}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {series.startsAt
                                                        ? `Starts ${new Date(series.startsAt).toLocaleDateString()}`
                                                        : "Available now"}
                                                </span>
                                            </div>
                                            <Button variant="ghost" className="p-0 hover:bg-transparent group-hover:text-primary">
                                                View Papers <ChevronRight className="ml-1 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </ThemeProvider>
    );
}
