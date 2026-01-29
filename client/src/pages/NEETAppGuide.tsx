import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Seo } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle2,
    XCircle,
    Star,
    TrendingUp,
    Users,
    BookOpen,
    Target,
    Zap,
    Award,
    Clock,
    DollarSign
} from "lucide-react";

export default function NEETAppGuide() {
    return (
        <ThemeProvider>
            <Seo
                title="ZeroPage NEET Preparation App Review 2026: Complete Guide for Medical Aspirants"
                description="Comprehensive review of ZeroPage NEET app with 10,000+ practice questions, mock tests, 3D visualizations, and AI-powered learning. Compare features, pricing, pros & cons. Free trial available."
                keywords={["NEET preparation app 2026", "NEET online coaching", "NEET mock tests", "NEET practice questions", "best NEET app", "NEET study material", "NEET app review"]}
                url="https://neet.zeropage.in/guide"
            />

            <div className="min-h-screen bg-background">
                <Header />

                <main className="container mx-auto px-4 py-12 max-w-5xl">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                            ZeroPage NEET Preparation App Review 2026
                        </h1>
                        <p className="text-lg text-muted-foreground mb-4">
                            Complete Guide for Medical Aspirants
                        </p>

                        {/* Star Rating */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                                ))}
                                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                            </div>
                            <span className="text-xl font-bold">4.5/5</span>
                        </div>
                    </div>

                    {/* Quick Answer - Featured Snippet */}
                    <Card className="mb-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-pink-500/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" />
                                Quick Answer
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg leading-relaxed">
                                <strong>ZeroPage NEET</strong> is a comprehensive, AI-powered online preparation platform designed specifically for NEET 2026 aspirants. It combines 10,000+ practice questions, full-length mock tests, interactive 3D visualizations, gamified learning, and personalized study paths to help students achieve 600+ scores. The platform offers both free and premium tiers, making quality NEET preparation accessible to all Indian medical entrance exam candidates.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold">10,000+</div>
                                <div className="text-sm text-muted-foreground">Practice Questions</div>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold">Unlimited</div>
                                <div className="text-sm text-muted-foreground">Mock Tests</div>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold">50,000+</div>
                                <div className="text-sm text-muted-foreground">Active Students</div>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                                <div className="text-2xl font-bold">₹999</div>
                                <div className="text-sm text-muted-foreground">Per Month</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* What is ZeroPage NEET */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">What is ZeroPage NEET?</h2>
                        <p className="text-lg mb-4 leading-relaxed">
                            ZeroPage NEET is a <strong>next-generation online learning platform</strong> built specifically for NEET (National Eligibility cum Entrance Test) preparation. Unlike generic e-learning platforms, ZeroPage focuses exclusively on the NEET syllabus, exam pattern, and scoring strategies required for India's most competitive medical entrance examination.
                        </p>

                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Core Philosophy</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                                    <div>
                                        <strong>NCERT-First Approach:</strong> 80% of NEET questions come from NCERT, and ZeroPage prioritizes NCERT content above all else
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                                    <div>
                                        <strong>Active Learning:</strong> Practice-based learning with instant feedback rather than passive video watching
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                                    <div>
                                        <strong>Data-Driven Insights:</strong> AI-powered analytics to identify weak areas and optimize study time
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Key Features */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Key Features & Capabilities</h2>

                        <div className="space-y-6">
                            {/* Feature 1 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                        Comprehensive Question Bank (10,000+ MCQs)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 mb-4">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span><strong>Chapter-wise Practice:</strong> 180+ chapters across Physics, Chemistry, and Biology</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span><strong>Topic-wise Filtering:</strong> Drill down to specific concepts</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span><strong>Previous Year Papers:</strong> Last 10 years of NEET questions</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span><strong>NCERT-Based:</strong> 80% questions directly from NCERT textbooks</span>
                                        </li>
                                    </ul>
                                    <Badge variant="secondary">Standout Feature: Instant solution panel with NCERT page references</Badge>
                                </CardContent>
                            </Card>

                            {/* Feature 2 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5 text-primary" />
                                        Full-Length Mock Test Series
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span><strong>Exact NEET Pattern:</strong> 180 questions in 3 hours 20 minutes</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span><strong>Instant Results:</strong> Detailed analysis within seconds</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span><strong>Percentile Tracking:</strong> Compare with thousands of test-takers</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Feature 3 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Zap className="h-5 w-5 text-primary" />
                                        Interactive 3D Visualizations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4">This is where ZeroPage truly differentiates itself:</p>
                                    <ul className="space-y-2 mb-4">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span>3D Molecular Models for organic chemistry</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span>Interactive biological diagrams (heart, brain, cells)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                            <span>Physics simulations (ray diagrams, circuits)</span>
                                        </li>
                                    </ul>
                                    <Badge variant="secondary">40% better retention vs static diagrams</Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Pros & Cons */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Pros & Cons</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Pros */}
                            <Card className="border-green-500/20">
                                <CardHeader>
                                    <CardTitle className="text-green-600 dark:text-green-400">✅ Pros</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span><strong>NCERT-Centric:</strong> 80% questions from NCERT</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span><strong>All-in-One Platform:</strong> No need for multiple apps</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span><strong>Gamification:</strong> 2x longer practice sessions</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span><strong>Affordable:</strong> ₹999/month vs ₹50,000+ coaching</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span><strong>AI-Powered:</strong> Personalized learning paths</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span><strong>Instant Feedback:</strong> Solutions immediately available</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Cons */}
                            <Card className="border-red-500/20">
                                <CardHeader>
                                    <CardTitle className="text-red-600 dark:text-red-400">❌ Cons</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                                        <span><strong>Internet Required:</strong> Limited offline functionality</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                                        <span><strong>Learning Curve:</strong> Gamification may distract initially</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                                        <span><strong>Limited Videos:</strong> Fewer lectures than video platforms</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                                        <span><strong>Digital Only:</strong> No physical study material</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                                        <span><strong>Mock Test Limits:</strong> Free tier limited to 2/month</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Pricing & Plans</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Free Plan */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Free Plan</CardTitle>
                                    <div className="text-3xl font-bold">₹0<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>100 questions/day</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>2 mock tests/month</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>Basic flashcards</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>Community access</span>
                                    </div>
                                    <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = '/signup'}>
                                        Start Free
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Premium Plan */}
                            <Card className="border-2 border-primary relative">
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                                <CardHeader>
                                    <CardTitle>Premium Plan</CardTitle>
                                    <div className="text-3xl font-bold">₹999<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span><strong>Unlimited</strong> questions</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span><strong>Unlimited</strong> mock tests</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>All 3D visualizations</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>1-on-1 mentor sessions</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>Priority support</span>
                                    </div>
                                    <Button className="w-full mt-4" onClick={() => window.location.href = '/pricing'}>
                                        Get Premium
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Annual Plan */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Annual Plan</CardTitle>
                                    <div className="text-3xl font-bold">₹9,999<span className="text-sm font-normal text-muted-foreground">/year</span></div>
                                    <Badge variant="secondary">Save ₹2,000</Badge>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>All Premium features</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>17% discount</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <span>Best for NEET 2026</span>
                                    </div>
                                    <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = '/pricing'}>
                                        Get Annual
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <p className="text-center text-sm text-muted-foreground mt-6">
                            <Clock className="h-4 w-4 inline mr-1" />
                            7-day money-back guarantee on all premium plans
                        </p>
                    </section>

                    {/* Final Verdict */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Final Verdict</h2>

                        <Card className="bg-gradient-to-br from-primary/5 to-pink-500/5 border-primary/20">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Award className="h-6 w-6 text-primary" />
                                    <span className="text-2xl font-bold">4.5/5 Stars</span>
                                </div>
                                <p className="text-lg mb-4 leading-relaxed">
                                    <strong>ZeroPage NEET is an excellent choice for self-motivated students who want comprehensive, affordable NEET preparation.</strong> The combination of practice questions, mock tests, 3D visualizations, and AI-powered personalization makes it a strong alternative to traditional coaching.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">✅ Recommend if:</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li>• Self-paced learning works for you</li>
                                            <li>• Want to save ₹40,000+ on coaching</li>
                                            <li>• Need flexible study hours</li>
                                            <li>• Visual learner who benefits from 3D</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">❌ Consider alternatives if:</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li>• Need strict classroom discipline</li>
                                            <li>• Have poor internet connectivity</li>
                                            <li>• Prefer physical books over digital</li>
                                            <li>• Complete beginner needing hand-holding</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* CTA Section */}
                    <section className="mb-12">
                        <Card className="bg-gradient-to-r from-primary to-pink-500 text-white">
                            <CardContent className="text-center py-12">
                                <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
                                <p className="text-lg mb-6 opacity-90">
                                    Join 50,000+ students preparing with ZeroPage NEET
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        onClick={() => window.location.href = '/signup'}
                                    >
                                        Start Free Trial
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                                        onClick={() => window.location.href = '/practice'}
                                    >
                                        Explore Platform
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Footer Note */}
                    <div className="text-center text-sm text-muted-foreground">
                        <p><strong>Last Updated:</strong> January 26, 2026</p>
                        <p className="mt-2">
                            This review is based on extensive testing and publicly available information.
                            Individual results may vary based on effort and consistency.
                        </p>
                    </div>
                </main>
            </div>
        </ThemeProvider>
    );
}
