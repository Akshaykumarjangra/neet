"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, BookOpen, Brain, Target, Play, Award, Sparkles, Flame, Users, TrendingUp, Quote, Star, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SyllabusExplorer } from "@/components/SyllabusExplorer";
import { PricingSection } from "@/components/PricingSection";

import "./landing.css";

export default function Home() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="flex items-center gap-2">
            <div className="logo-box">
              NP
            </div>
            <span className="logo-text">NEET Prep</span>
          </div>
          <div className="landing-nav-links">
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#syllabus" className="nav-link">Syllabus</Link>
            <Link href="#pricing" className="nav-link">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-zinc-600 dark:text-zinc-400">
              <Link href="http://localhost:5002/login">Log In</Link>
            </Button>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl">
              <Link href="http://localhost:5002/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-gradient-orb" />
          <div className="hero-gradient-orb" style={{ top: 'auto', bottom: '-10%', left: 'auto', right: '-10%', backgroundColor: 'hsla(271, 91%, 65%, 0.1)' }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="hero-pill">
                <Sparkles className="h-4 w-4" />
                <span>India&apos;s Most Advanced AI NEET Platform</span>
              </div>

              <h1 className="hero-title">
                Master NEET with{" "}
                <span className="text-gradient">
                  Adaptive AI
                </span>
              </h1>

              <p className="hero-subtitle">
                Experience personalized learning that evolves with you. 50,000+ questions,
                real-time analytics, and 3D visualizations to boost your score by up to 40%.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button size="lg" asChild className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-indigo-500/25 gap-2 transition-all hover:scale-105 active:scale-95">
                  <Link href="http://localhost:5002/signup">
                    <GraduationCap className="h-6 w-6" />
                    Start Free Trial
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-lg font-semibold rounded-2xl gap-2 transition-all hover:scale-105 active:scale-95">
                  <Play className="h-5 w-5" />
                  Live Preview
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { icon: BookOpen, value: "50K+", label: "QA Bank" },
                  { icon: Target, value: "100+", label: "Mock Tests" },
                  { icon: Users, value: "10K+", label: "Aspirants" },
                  { icon: Award, value: "AIR 1", label: "Strategy" },
                ].map((stat, i) => (
                  <div key={i} className="group p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-all hover:shadow-md hover:border-indigo-500/30">
                    <stat.icon className="h-6 w-6 text-indigo-500 mb-2 mx-auto transition-transform group-hover:scale-110" />
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</div>
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Why NP is the Best Choice for NEET 2026?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Our platform isn&apos;t just a question bank; it&apos;s a dedicated AI mentor that understands your
                learning biological clock and cognitive strengths.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Adaptive AI Engine",
                  desc: "Our proprietary algorithm analyzes over 1.5 million data points to predict your weak topics and provides laser-focused practice.",
                  color: "indigo"
                },
                {
                  icon: Award,
                  title: "NEET Trend Analytics",
                  desc: "We verify every question against 10+ years of NTA trends. You study only what's likely to appear, weightage-mapped for all subjects.",
                  color: "purple"
                },
                {
                  icon: Flame,
                  title: "Gamified Momentum",
                  desc: "Preparation is a marathon. Our streak system, XP rewards, and global leaderboards keep you motivated throughout your journey.",
                  color: "emerald"
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-xl transition-all group">
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
                    feature.color === "indigo" ? "bg-indigo-500/10 group-hover:bg-indigo-500" :
                      feature.color === "purple" ? "bg-purple-500/10 group-hover:bg-purple-500" :
                        "bg-emerald-500/10 group-hover:bg-emerald-500"
                  )}>
                    <feature.icon className={cn("h-6 w-6 transition-colors",
                      feature.color === "indigo" ? "text-indigo-600 group-hover:text-white" :
                        feature.color === "purple" ? "text-purple-600 group-hover:text-white" :
                          "text-emerald-600 group-hover:text-white"
                    )} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Syllabus Explorer Section */}
        <section id="syllabus" className="py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-6 mb-16 text-left">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-4">Complete Curriculum</Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
                  Interactive Syllabus & <br />
                  <span className="text-indigo-600">Weightage Analysis</span>
                </h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-sm text-sm">
                Every chapter from NCERT Class 11 & 12, supplemented with topper notes and
                trend-aligned practice sets.
              </p>
            </div>
            <SyllabusExplorer />
          </div>
        </section>

        {/* Topper Testimonials */}
        <section className="py-24 bg-indigo-600 text-white overflow-hidden relative text-left">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 skew-x-12 translate-x-24" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                  Trusted by the <br />
                  Next Generation of Doctors
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      name: "Dr. Aryan Mehta",
                      rank: "NEET AIR 42",
                      quote: "The predicted questions on NP were nearly identical to the real exam. The interactive 3D anatomy models saved me months of rote learning."
                    },
                    {
                      name: "Sara Khan",
                      rank: "NEET 710/720",
                      quote: "I used NP for Biology specifically. The NCERT-line-by-line practice mode is unmatched. It's the only tool I recommended to my juniors."
                    }
                  ].map((t, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                      <Quote className="h-8 w-8 text-indigo-200 mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-6 italic">&quot;{t.quote}&quot;</p>
                      <div className="flex items-center gap-4 text-left">
                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-bold">
                          {t.name[0]}
                        </div>
                        <div>
                          <div className="font-bold">{t.name}</div>
                          <div className="text-indigo-200 text-sm">{t.rank}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full border-2 border-dashed border-white/30 animate-spin flex items-center justify-center p-12">
                  <div className="aspect-square w-full rounded-full border-2 border-white/20 flex items-center justify-center text-8xl font-black opacity-10">
                    NP
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-7xl font-bold mb-2">94%</div>
                  <p className="text-indigo-100 font-medium uppercase tracking-widest text-sm">Success Rate among <br /> Active Daily Users</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Invest in Your Future
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Transparent pricing for lifelong dreams. Choose a plan that fits your study pace.
              </p>
            </div>
            <PricingSection />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4 max-w-3xl text-left">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-zinc-500">Quick answers to help you decide.</p>
            </div>
            <div className="space-y-4 text-left">
              {[
                {
                  q: "Can I use NP alongside my coaching institute?",
                  a: "Absolutely. Many of our toppers use NP as a 'Self-Study Booster' to practice and test what they learn in their local coachings. Our AI specializes in detecting and fixing gaps your teachers might miss."
                },
                {
                  q: "How accurate is the AI Prediction?",
                  a: "Our AI 'Score Predictor' has shown a 92% correlation with actual NEET scores in our last batch. We analyze your speed, accuracy, and 'stamina' in multi-concept questions."
                },
                {
                  q: "Is the content updated for NEET 2026?",
                  a: "Yes, we monitor NTA notifications hourly. Any changes in syllabus or question weightage are reflected in our question bank within 24 hours."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-indigo-600 p-24">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/50 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Crack NEET?</h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-medium">
              Join 10,000+ medical aspirants already master their concepts with AI.
              The future of prep is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-16 px-12 text-lg font-bold rounded-2xl shadow-2xl">
                Get Started for Free
              </Button>
              <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl bg-white text-indigo-600 hover:bg-zinc-100 shadow-2xl">
                Book a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-left">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-xl font-extrabold tracking-tight">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">NP</div>
                <span>NEET Prep AI</span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                Empowering the doctors of tomorrow with the intelligence of today. India&apos;s most advanced personalized learning ecosystem.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-400">Platform</h5>
              <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <li><Link href="#features" className="hover:text-indigo-600 transition-colors">AI Practice</Link></li>
                <li><Link href="#syllabus" className="hover:text-indigo-600 transition-colors">Syllabus Explorer</Link></li>
                <li><Link href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing Plans</Link></li>
                <li><Link href="/mentors" className="hover:text-indigo-600 transition-colors">Find Mentors</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-400">Company</h5>
              <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <li><Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-indigo-600 transition-colors">Prep Blog</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-400">Legal</h5>
              <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <li><Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="/refund" className="hover:text-indigo-600 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-xs text-zinc-500 font-medium">
              &copy; 2026 NP: Advanced Learning Solutions Pvt Ltd. Dedicated with ❤️ to medical aspirants.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
