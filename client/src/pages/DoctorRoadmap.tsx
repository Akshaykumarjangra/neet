
import { Link } from "wouter";
import {
    Stethoscope,
    GraduationCap,
    BookOpen,
    HeartPulse,
    ArrowRight,
    Calendar,
    CheckCircle2,
    Map,
    Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";
import { SEO_PAGES } from "@/config/seo";
import { motion } from "framer-motion";

export default function DoctorRoadmap() {
    const seo = SEO_PAGES.doctorRoadmap;

    const milestones = [
        {
            year: "Class 11 - The Foundation",
            icon: <BookOpen className="h-6 w-6 text-blue-500" />,
            title: "Building the Base",
            desc: "Start strong with NCERT. Focus on conceptual clarity in Physics and Chemistry. Begin Biology memorization.",
            steps: ["Master NCERT Biology", "Understand Basic Math for Physics", "Join ZeroPage Practice Batches"]
        },
        {
            year: "Class 12 - The Application",
            icon: <Trophy className="h-6 w-6 text-yellow-500" />,
            title: "Board & NEET Balance",
            desc: "Integrate Class 12 syllabus with NEET prep. Start taking full-length mock tests.",
            steps: ["Complete Syllabus by December", "Solve PYQs (Previous Year Questions)", "Take Weekly Mock Tests"]
        },
        {
            year: "The Final Sprint",
            icon: <Calendar className="h-6 w-6 text-red-500" />,
            title: "Revision & Mock Tests",
            desc: "The last 3 months are crucial. Focus on speed, accuracy, and weak areas.",
            steps: ["Daily Mock Tests on ZeroPage", "Analyze Errors Rigorously", "Revise Formula Sheets Repetitively"]
        },
        {
            year: "Medical College (MBBS)",
            icon: <Stethoscope className="h-6 w-6 text-green-500" />,
            title: "The Dream Realized",
            desc: "Enter the gates of your dream medical college. The journey of a healer begins.",
            steps: ["Clear NEET with High Rank", "Counseling & Admission", "White Coat Ceremony"]
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans">
            <Seo 
                title={seo.title} 
                description={seo.description} 
                keywords={seo.keywords} 
            />

            {/* Emotional Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 z-0" />
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <Badge variant="secondary" className="mb-6 px-4 py-1 text-base">
                        Your Medical Journey Begins Here
                    </Badge>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2"
                    >
                        How to Become a Doctor
                    </motion.h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
                        From the first page of NCERT to the White Coat Ceremony. <br className="hidden md:block" />
                        A complete, step-by-step roadmap for Indian Medical Aspirants.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl hover:shadow-primary/30 transition-all">
                                Start My Journey
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href="#roadmap">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
                                View the Roadmap
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary mb-1">20 Lakhs+</div>
                            <div className="text-sm text-muted-foreground">NEET Aspirants</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary mb-1">1 Lakh+</div>
                            <div className="text-sm text-muted-foreground">MBBS Seats</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary mb-1">720/720</div>
                            <div className="text-sm text-muted-foreground">Target Score</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary mb-1">5+ Years</div>
                            <div className="text-sm text-muted-foreground">MBBS Course</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Roadmap */}
            <section id="roadmap" className="py-20 container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Map className="h-8 w-8 text-primary" />
                        The Path to AIIMS
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Success isn't accidental. It's engineered. Follow this proven timeline.
                    </p>
                </div>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                {milestone.icon}
                            </div>

                            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 hover:shadow-lg transition-shadow border-muted/60">
                                <div className="flex flex-col gap-2">
                                    <div className="font-bold text-primary text-sm uppercase tracking-wide">{milestone.year}</div>
                                    <h3 className="font-bold text-xl">{milestone.title}</h3>
                                    <p className="text-muted-foreground mb-4">{milestone.desc}</p>
                                    <ul className="space-y-2">
                                        {milestone.steps.map(step => (
                                            <li key={step} className="flex items-start gap-2 text-sm">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-primary-foreground text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <GraduationCap className="h-16 w-16 mx-auto mb-6 text-white/80" />
                    <h2 className="text-4xl font-bold mb-6">Your Dream Coat is Waiting</h2>
                    <p className="text-xl text-white/80 mb-10">
                        The journey to becoming a doctor is tough, but you don't have to walk it alone.
                        ZeroPage is your companion, mentor, and guide.
                    </p>
                    <Link href="/signup">
                        <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold shadow-xl">
                            Begin Preparation for Free
                        </Button>
                    </Link>
                    <p className="mt-6 text-sm text-white/60">
                        Join 10,000+ future doctors preparing on ZeroPage right now.
                    </p>
                </div>
            </section>
        </div>
    );
}
