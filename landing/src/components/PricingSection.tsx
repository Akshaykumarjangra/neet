"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Trophy, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Foundation",
        price: "0",
        description: "Perfect for students starting their NEET journey.",
        features: [
            "Access to 5,000+ Practice Questions",
            "Chapter-wise Basic Notes",
            "Daily Goal Tracking",
            "Public Community Access",
        ],
        cta: "Start for Free",
        popular: false,
        icon: Zap,
        color: "text-zinc-500",
    },
    {
        name: "Pro Mentor",
        price: "999",
        description: "The most popular choice for serious aspirants.",
        features: [
            "50,000+ Advanced Question Bank",
            "Full Mock Test Series (Trend Mode)",
            "Daily 1:1 Topper Mentorship (Chat)",
            "Advanced AI Predictive Analytics",
            "All 3D Biology & Physics Visuals",
        ],
        cta: "Go Pro Now",
        popular: true,
        icon: Sparkles,
        color: "text-indigo-600",
        badge: "Most Popular",
    },
    {
        name: "Elite Topper",
        price: "2499",
        description: "Ultimate personalized coaching for top 100 ranks.",
        features: [
            "Everything in Pro Mentor",
            "Weekly Video Calls with AIR <100 Mentors",
            "Personalized Weekly Study Roadmap",
            "Hardcopy Formula Cheat-sheets",
            "Priority Doubt Resolution (<30m)",
        ],
        cta: "Join Elite",
        popular: false,
        icon: Trophy,
        color: "text-amber-500",
    }
];

export function PricingSection() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
                <Card
                    key={plan.name}
                    className={cn(
                        "relative flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden",
                        plan.popular ? "border-indigo-600/50 shadow-xl ring-2 ring-indigo-600/10 scale-105 z-10" : "border-zinc-200 dark:border-zinc-800"
                    )}
                >
                    {plan.popular && (
                        <div className="absolute top-0 right-0">
                            <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest shadow-lg">
                                {plan.badge}
                            </div>
                        </div>
                    )}

                    <CardHeader className="p-8 pb-4">
                        <div className={cn("h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6", plan.color)}>
                            <plan.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-4xl font-extrabold tracking-tight">₹{plan.price}</span>
                            <span className="text-zinc-500 dark:text-zinc-400 font-medium">/month</span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{plan.description}</p>
                    </CardHeader>

                    <CardContent className="p-8 pt-4 flex-1">
                        <div className="space-y-4">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-4 w-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                        <Check className="h-2.5 w-2.5 text-emerald-600" />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>

                    <CardFooter className="p-8 pt-4">
                        <Button
                            asChild
                            size="lg"
                            variant={plan.popular ? "default" : "outline"}
                            className={cn(
                                "w-full h-12 text-sm font-bold rounded-xl",
                                plan.popular ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30" : ""
                            )}
                        >
                            <a href={`http://localhost:5002/signup?plan=${plan.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                {plan.cta}
                            </a>
                        </Button>
                    </CardFooter>

                    <div className="px-8 pb-6 flex items-center justify-center gap-1.5 opacity-50">
                        <ShieldCheck className="h-3 w-3 text-zinc-400" />
                        <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Secure Payment</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}
