"use client";

import Link from 'next/link';
import { PricingSection } from "@/components/PricingSection";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans selection:bg-indigo-500/30">
            <nav className="border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="h-4 w-4 text-zinc-400 group-hover:text-indigo-600 transition-colors" />
                        <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">NEET Prep</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/signup">
                            <Button size="sm" className="rounded-xl">Start Free Trial</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <Badge variant="secondary" className="mb-4">Flexible Plans</Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6">
                            Empower Your <span className="text-indigo-600 italic">Ambition</span>
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Choose the path that fits your preparation stage. From basic practice to elite 1:1 mentorship,
                            we have a roadmap for every future doctor.
                        </p>
                    </div>

                    <PricingSection />

                    <div className="mt-32 max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold dark:text-white">Why Invest in NP?</h2>
                                <div className="space-y-4">
                                    {[
                                        "Verified Question quality (NTA-aligned)",
                                        "Predictive AI that saves 10+ hours/week",
                                        "Zero-lag interactive 3D anatomy",
                                        "Direct access to top 1% NEET mentors"
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                                <h3 className="font-bold mb-4 text-xl">Institution Plan?</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                                    Running a coaching center or school? Get special bulk discounts and a custom dashboard to track
                                    your students&apos; progress.
                                </p>
                                <Button variant="outline" className="w-full gap-2 group">
                                    Contact Sales
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-zinc-500 font-medium">
                        &copy; 2026 NP: Advanced Learning Solutions. Secure transactions via Razorpay & Stripe.
                    </p>
                </div>
            </footer>
        </div>
    );
}
