import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Seo } from "@/components/SEO";
import { FAQSection, QuickAnswer, StatCard, HowToGuide } from "@/components/AEOComponents";
import { NEET_FAQ_DATABASE, NEET_STATISTICS, NEET_HOWTO_GUIDES, generateFAQSchema, getNEETExamEntity } from "@/config/aeo-geo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, TrendingUp, Calendar } from "lucide-react";

export default function NEETFAQPage() {
    // Combine all FAQs for schema
    const allFAQs = [
        ...NEET_FAQ_DATABASE.general,
        ...NEET_FAQ_DATABASE.preparation,
        ...NEET_FAQ_DATABASE.scoring,
        ...NEET_FAQ_DATABASE.strategy
    ];

    return (
        <ThemeProvider>
            <Seo
                title="NEET 2026 FAQ - Complete Guide to NEET Preparation | All Questions Answered"
                description="Get answers to all your NEET questions: exam pattern, preparation strategy, best books, scoring tips, cutoffs, and more. 20+ frequently asked questions with expert answers."
                keywords="NEET FAQ, NEET questions, NEET preparation guide, NEET exam pattern, NEET cutoff, NEET books, NEET strategy"
                url="https://neet.zeropage.in/neet-faq"
                structuredData={[
                    generateFAQSchema(allFAQs),
                    getNEETExamEntity()
                ]}
            />

            <div className="min-h-screen bg-background">
                <Header />

                <main className="container mx-auto px-4 py-12 max-w-6xl">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                            NEET 2026 - Complete FAQ Guide
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Everything you need to know about NEET preparation, exam pattern, scoring, and strategy.
                            Get expert answers to all your questions.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {NEET_STATISTICS.map((stat, index) => (
                            <StatCard
                                key={index}
                                stat={stat.value}
                                description={stat.description}
                                source={stat.source}
                                year={stat.year}
                            />
                        ))}
                    </div>

                    {/* Quick Answer - Most Important Question */}
                    <QuickAnswer
                        question="What is the most important thing for NEET preparation?"
                        answer="Master NCERT textbooks completely. 80% of NEET questions come directly from NCERT. Read NCERT 2-3 times, make notes, and solve all NCERT exercises before moving to reference books."
                        details="NCERT is the foundation of NEET. The National Testing Agency (NTA) designs questions primarily from NCERT syllabus. For Biology, NCERT is sufficient. For Physics and Chemistry, supplement NCERT with practice books for numerical problems. Always prioritize NCERT over any other resource."
                        source="NEET Analysis Reports & NTA Guidelines"
                    />

                    {/* FAQ Sections by Category */}
                    <Tabs defaultValue="general" className="mb-12">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                            <TabsTrigger value="general" className="gap-2">
                                <BookOpen className="h-4 w-4" />
                                General
                            </TabsTrigger>
                            <TabsTrigger value="preparation" className="gap-2">
                                <Target className="h-4 w-4" />
                                Preparation
                            </TabsTrigger>
                            <TabsTrigger value="scoring" className="gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Scoring
                            </TabsTrigger>
                            <TabsTrigger value="strategy" className="gap-2">
                                <Calendar className="h-4 w-4" />
                                Strategy
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="general">
                            <FAQSection
                                faqs={NEET_FAQ_DATABASE.general}
                                title="General NEET Questions"
                            />
                        </TabsContent>

                        <TabsContent value="preparation">
                            <FAQSection
                                faqs={NEET_FAQ_DATABASE.preparation}
                                title="NEET Preparation Questions"
                            />
                        </TabsContent>

                        <TabsContent value="scoring">
                            <FAQSection
                                faqs={NEET_FAQ_DATABASE.scoring}
                                title="NEET Scoring & Cutoff Questions"
                            />
                        </TabsContent>

                        <TabsContent value="strategy">
                            <FAQSection
                                faqs={NEET_FAQ_DATABASE.strategy}
                                title="NEET Strategy Questions"
                            />
                        </TabsContent>
                    </Tabs>

                    {/* How-To Guides */}
                    <div className="space-y-12 mb-12">
                        <Card className="premium-card">
                            <CardHeader>
                                <CardTitle className="text-2xl">Step-by-Step Preparation Guide</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <HowToGuide
                                    title={NEET_HOWTO_GUIDES.preparation.title}
                                    steps={NEET_HOWTO_GUIDES.preparation.steps}
                                    introduction="Follow this proven 7-step strategy to prepare effectively for NEET 2026 and achieve your target score."
                                />
                            </CardContent>
                        </Card>

                        <Card className="premium-card">
                            <CardHeader>
                                <CardTitle className="text-2xl">Mock Test Strategy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <HowToGuide
                                    title={NEET_HOWTO_GUIDES.mockTest.title}
                                    steps={NEET_HOWTO_GUIDES.mockTest.steps}
                                    introduction="Learn how to take mock tests effectively to maximize your NEET preparation and identify weak areas."
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Additional Resources */}
                    <Card className="bg-gradient-to-br from-primary/5 to-pink-500/5 border-primary/20">
                        <CardHeader>
                            <CardTitle>Need More Help?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-foreground">
                                Explore our comprehensive NEET preparation resources:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <a href="/practice" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                                    <h3 className="font-semibold mb-2">Practice Questions</h3>
                                    <p className="text-sm text-muted-foreground">10,000+ chapter-wise MCQs</p>
                                </a>
                                <a href="/mock-tests" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                                    <h3 className="font-semibold mb-2">Mock Tests</h3>
                                    <p className="text-sm text-muted-foreground">Full-length test series</p>
                                </a>
                                <a href="/library" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
                                    <h3 className="font-semibold mb-2">Study Material</h3>
                                    <p className="text-sm text-muted-foreground">Complete NCERT content</p>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </ThemeProvider>
    );
}
