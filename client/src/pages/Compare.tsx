
import { useParams, Link } from "wouter";
import {
    Check,
    X,
    Shield,
    Zap,
    Trophy,
    Users,
    Target,
    BarChart,
    ArrowRight,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import { SEO_PAGES } from "@/config/seo";

interface CompetitorData {
    name: string;
    slug: string;
    color: string;
    seoKey: string;
    pricing: string;
    strengths: string[];
    weaknesses: string[];
}

const competitors: Record<string, CompetitorData> = {
    "physics-wallah": {
        name: "PhysicsWallah (PW)",
        slug: "physics-wallah",
        color: "bg-purple-600",
        seoKey: "comparePW",
        pricing: "₹4,000 - ₹10,000 / year",
        strengths: ["Low cost", "Charismatic teachers", "Huge community"],
        weaknesses: ["Crowded batches", "Less personalized", "Basic analytics"]
    },
    "allen": {
        name: "Allen Career Institute",
        slug: "allen",
        color: "bg-green-600",
        seoKey: "compareAllen",
        pricing: "₹1,00,000+ / year",
        strengths: ["Reputation", "Rigorous material", "Topper history"],
        weaknesses: ["Expensive", "High pressure", "Old-school methods"]
    },
    "aakash": {
        name: "Aakash Institute",
        slug: "aakash",
        color: "bg-blue-600",
        seoKey: "compareAakash",
        pricing: "₹1,00,000+ / year",
        strengths: ["Test series quality", "National reach", "Study material"],
        weaknesses: ["Very expensive", "Variable faculty quality", "Large batch sizes"]
    }
};

export default function Compare() {
    const params = useParams();
    const competitorSlug = params.competitor || "physics-wallah"; // Default or 404 handling logic
    const competitor = competitors[competitorSlug];

    if (!competitor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">Comparator not found</h1>
                <Link href="/"><Button className="mt-4">Go Home</Button></Link>
            </div>
        );
    }

    const seo = SEO_PAGES[competitor.seoKey] || SEO_PAGES.home;

    const comparisons = [
        {
            feature: "Cost Effective",
            zeropage: "✅ Free / Affordable Premium",
            competitor: competitor.pricing,
            icon: <Target className="h-5 w-5 text-green-500" />
        },
        {
            feature: "Analytics",
            zeropage: "Detailed AI Insights",
            competitor: "Basic Report Cards",
            icon: <BarChart className="h-5 w-5 text-blue-500" />
        },
        {
            feature: "Personalization",
            zeropage: "Adaptive Learning Path",
            competitor: "Standard Curriulum",
            icon: <Users className="h-5 w-5 text-purple-500" />
        },
        {
            feature: "Doubt Solving",
            zeropage: "Instant Community + Mentor",
            competitor: "Scheduled / Batch-wise",
            icon: <Zap className="h-5 w-5 text-yellow-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="keywords" content={seo.keywords.join(", ")} />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
                <div className="container mx-auto text-center max-w-4xl relative z-10">
                    <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/5">
                        Honest Comparison
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        ZeroPage <span className="text-muted-foreground">vs</span> <span className={competitor.slug === 'physics-wallah' ? 'text-purple-600' : competitor.slug === 'allen' ? 'text-green-600' : 'text-blue-600'}>{competitor.name}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Deciding between {competitor.name} and ZeroPage? Here is a breakdown to help you choose the best path for your NEET 2026 journey.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" className="h-12 px-8 text-lg shadow-lg hover:shadow-primary/25 transition-all">
                                Start Free Trial
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href="#comparison">
                            <Button variant="outline" size="lg" className="h-12">
                                View Detailed Comparison
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison" className="py-16 container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Competitor Card */}
                        <Card className="border-muted bg-muted/20 order-2 md:order-1">
                            <CardHeader className="text-center pb-2">
                                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${competitor.color} text-white font-bold text-xl`}>
                                    {competitor.name[0]}
                                </div>
                                <CardTitle>{competitor.name}</CardTitle>
                                <CardDescription>Traditional & Popular</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center font-bold text-lg mb-4">{competitor.pricing}</div>
                                <ul className="space-y-2">
                                    {competitor.strengths.map(s => (
                                        <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" /> {s}
                                        </li>
                                    ))}
                                    {competitor.weaknesses.map(w => (
                                        <li key={w} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <X className="h-4 w-4 mt-0.5 text-red-500 shrink-0" /> {w}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* VS Badge */}
                        <div className="flex items-center justify-center order-1 md:order-2 py-4 md:py-0">
                            <div className="bg-background border rounded-full p-4 shadow-sm font-bold text-xl text-muted-foreground">
                                VS
                            </div>
                        </div>

                        {/* ZeroPage Card */}
                        <Card className="border-primary/50 bg-primary/5 shadow-xl relative order-3">
                            <div className="absolute top-0 right-0 p-3">
                                <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                            </div>
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-primary text-primary-foreground font-bold text-xl">
                                    Z
                                </div>
                                <CardTitle>ZeroPage</CardTitle>
                                <CardDescription>Modern & Data-Driven</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center font-bold text-lg mb-4">Free / ₹99/mo</div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-sm">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                        <span className="font-medium">Advanced AI Analytics</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                        <span className="font-medium">Gamified Learning</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                        <span className="font-medium">Unlimited Mock Tests</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-sm">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                        <span className="font-medium">Active Community</span>
                                    </li>
                                </ul>
                                <Link href="/signup">
                                    <Button className="w-full mt-4">Get Started Free</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Feature Deep Dive */}
            <section className="py-16 bg-muted/10">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Switch to ZeroPage?</h2>

                    <div className="space-y-6">
                        {comparisons.map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center gap-6 bg-background p-6 rounded-lg border shadow-sm">
                                <div className="shrink-0 p-3 bg-muted rounded-full">
                                    {item.icon}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="font-semibold text-lg">{item.feature}</h3>
                                </div>
                                <div className="flex-1 text-center md:text-right">
                                    <span className="text-sm text-muted-foreground line-through block md:inline md:mr-4">{item.competitor}</span>
                                    <span className="font-bold text-primary">{item.zeropage}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Footer Text */}
            <section className="py-20 container mx-auto px-4 max-w-3xl text-center text-muted-foreground">
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Crack NEET 2026?</h3>
                <p className="mb-8">
                    You don't need to spend lakhs at {competitor.name} to become a doctor.
                    ZeroPage provides the same quality of questions, better analysis, and a supportive community
                    to guide you to your dream medical college.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <Link href="/library" className="hover:text-primary underline">Free NEET Notes</Link> •
                    <Link href="/mock-tests" className="hover:text-primary underline">NEET Mock Tests</Link> •
                    <Link href="/videos" className="hover:text-primary underline">Video Lectures</Link>
                </div>
            </section>
        </div>
    );
}
