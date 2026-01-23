"use client";

import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, ShieldCheck, Zap, Target, BookOpen, Quote, Star, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Adaptive Practice Engine",
        desc: "Our AI model learns your cognitive patterns. It identifies whether you struggle with conceptual clarity or speed, and generates personalized practice sets.",
        icon: Brain,
        category: "AI Technology",
        color: "indigo"
    },
    {
        title: "10-Year Trend Analytics",
        desc: "Why study everything when you can study what matters? Our engine weights questions based on real NTA exam patterns from the last decade.",
        icon: Target,
        category: "Data Science",
        color: "purple"
    },
    {
        title: "3D Biology Visualizer",
        desc: "Don't just read about anatomy. Rotate, zoom, and explore complex biological systems with our interactive 3D models.",
        icon: Sparkles,
        category: "Interactive Learning",
        color: "emerald"
    },
    {
        title: "Topper-Led Mentorship",
        desc: "Connect 1:1 with students who have actually cracked the top 100 ranks. Get their personal strategy roadmaps and doubt clearance.",
        icon: Star,
        category: "Community",
        color: "amber"
    }
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans selection:bg-indigo-500/30">
            <nav className="border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="h-4 w-4 text-zinc-400 group-hover:text-indigo-600 transition-colors" />
                        <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">NEET Prep</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/pricing">
                            <Button size="sm" variant="ghost">Pricing</Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="sm" className="rounded-xl">Join Free</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="py-20 overflow-hidden">
                <section className="container mx-auto px-4 mb-32 relative">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[140px] -mr-96 -mt-96" />

                    <div className="max-w-4xl">
                        <Badge variant="outline" className="mb-6 border-indigo-200 text-indigo-600 dark:text-indigo-400">Deep Dive into Features</Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white mb-8 leading-tight">
                            Science-Backed <br />
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent italic">NEET Preparation</span>
                        </h1>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-12">
                            We combined the latest research in cognitive psychology with proprietary AI algorithms
                            to create a learning ecosystem that doesn&apos;t just teach, but transforms how you think.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="p-10 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                            >
                                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-8 transition-colors transform group-hover:rotate-6",
                                    f.color === "indigo" ? "bg-indigo-500/10 text-indigo-600" :
                                        f.color === "purple" ? "bg-purple-500/10 text-purple-600" :
                                            f.color === "emerald" ? "bg-emerald-500/10 text-emerald-600" :
                                                "bg-amber-500/10 text-amber-600"
                                )}>
                                    <f.icon className="h-7 w-7" />
                                </div>
                                <Badge variant="secondary" className="mb-4">{f.category}</Badge>
                                <h3 className="text-2xl font-bold mb-4 dark:text-white">{f.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm lg:text-base">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-zinc-900 text-white py-32 relative">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                                    Real-Time <span className="text-indigo-500">Analytics</span> <br />
                                    That Actually Predict
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        "Accuracy by Topic (Sub-chapter level)",
                                        "Attempt Speed vs. Precision Mapping",
                                        "Predictive Scoreboard based on batch averages",
                                        "Customized Goal Calibration"
                                    ].map((p, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <Zap className="h-3 w-3 text-indigo-400" />
                                            </div>
                                            <span className="font-medium text-zinc-300">{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-video rounded-3xl bg-indigo-600 p-8 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-800 opacity-50" />
                                    <div className="relative z-10 h-full flex flex-col justify-end">
                                        <div className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Live Insight</div>
                                        <div className="text-2xl font-bold mb-4 italic">&quot;92% Correlation with real NEET results in 2024&quot;</div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-white/20" />
                                            <div className="text-xs font-medium">NEET Analytics Laboratory</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12">The NP Edge</h2>
                        <div className="max-w-4xl mx-auto p-12 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <div className="grid sm:grid-cols-3 gap-12">
                                <div>
                                    <div className="text-4xl font-black text-indigo-600 mb-2">40%</div>
                                    <div className="text-sm font-bold text-zinc-500 uppercase">Faster Recall</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-purple-600 mb-2">1.5M</div>
                                    <div className="text-sm font-bold text-zinc-500 uppercase">Data Points</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-emerald-600 mb-2">24/7</div>
                                    <div className="text-sm font-bold text-zinc-500 uppercase">AI Mentorship</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20">
                            <Link href="/signup">
                                <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl group">
                                    Experience it Now
                                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-zinc-500 font-medium">
                        &copy; 2026 NP: Built for the toppers of tomorrow.
                    </p>
                </div>
            </footer>
        </div>
    );
}
