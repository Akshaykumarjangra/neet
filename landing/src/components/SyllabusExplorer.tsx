"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Atom, FlaskConical, Leaf, Bug, ChevronRight, Search, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
    {
        id: "physics",
        name: "Physics",
        icon: Atom,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        chapters: [
            { num: 1, title: "Physical World & Measurement", class: "11", time: 45, diff: "Easy" },
            { num: 2, title: "Kinematics", class: "11", time: 120, diff: "Medium" },
            { num: 3, title: "Laws of Motion", class: "11", time: 90, diff: "Hard" },
            { num: 15, title: "Ray Optics", class: "12", time: 150, diff: "Hard" },
            { num: 20, title: "Modern Physics", class: "12", time: 180, diff: "Medium" },
        ]
    },
    {
        id: "chemistry",
        name: "Chemistry",
        icon: FlaskConical,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        chapters: [
            { num: 1, title: "Some Basic Concepts of Chemistry", class: "11", time: 60, diff: "Easy" },
            { num: 4, title: "Chemical Bonding", class: "11", time: 140, diff: "Hard" },
            { num: 12, title: "Organic Chemistry: Basics", class: "11", time: 200, diff: "Hard" },
            { num: 30, title: "Chemical Kinetics", class: "12", time: 90, diff: "Medium" },
            { num: 40, title: "Biomolecules", class: "12", time: 60, diff: "Easy" },
        ]
    },
    {
        id: "biology",
        name: "Biology (Botany & Zoology)",
        icon: Leaf,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        chapters: [
            { num: 1, title: "The Living World", class: "11", time: 30, diff: "Easy" },
            { num: 8, title: "Cell: The Unit of Life", class: "11", time: 120, diff: "Medium" },
            { num: 16, title: "Digestion and Absorption", class: "11", time: 90, diff: "Medium" },
            { num: 25, title: "Molecular Basis of Inheritance", class: "12", time: 240, diff: "Hard" },
            { num: 35, title: "Ecology & Environment", class: "12", time: 150, diff: "Easy" },
        ]
    }
];

export function SyllabusExplorer() {
    const [activeSubject, setActiveSubject] = useState(subjects[0]);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredChapters = activeSubject.chapters.filter(ch =>
        ch.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Subject Selector */}
                <div className="lg:w-1/3 space-y-3">
                    {subjects.map((subject) => (
                        <button
                            key={subject.id}
                            onClick={() => { setActiveSubject(subject); setSearchQuery(""); }}
                            className={cn(
                                "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group",
                                activeSubject.id === subject.id
                                    ? cn("bg-white dark:bg-zinc-900 border-indigo-500/30 shadow-md ring-1 ring-indigo-500/10")
                                    : "bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900"
                            )}
                        >
                            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", subject.bg, subject.color)}>
                                <subject.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="font-bold text-zinc-900 dark:text-white">{subject.name}</div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400">View detailed syllabus and practice</div>
                            </div>
                        </button>
                    ))}

                    <div className="p-6 rounded-2xl bg-indigo-600 text-white mt-8 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
                        <h4 className="font-bold mb-2 relative z-10">All-Subject Pass</h4>
                        <p className="text-xs text-indigo-100 mb-4 relative z-10">Get instant access to all 160+ chapters with complete 3D visuals.</p>
                        <Button size="sm" variant="secondary" className="w-full relative z-10">Unlock All Content</Button>
                    </div>
                </div>

                {/* Chapter List */}
                <div className="lg:w-2/3 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder={`Search ${activeSubject.name} chapters...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-12 pr-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {filteredChapters.map((chapter) => (
                            <Card key={chapter.num} className="group hover:border-indigo-500/30 transition-all hover:shadow-lg">
                                <CardContent className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <Badge variant="outline" className="text-xs font-mono">CH {chapter.num}</Badge>
                                        <Badge variant={chapter.diff === "Hard" ? "destructive" : chapter.diff === "Easy" ? "secondary" : "default"} className="text-[10px]">
                                            {chapter.diff}
                                        </Badge>
                                    </div>
                                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4 line-clamp-2 min-h-[2.5rem] group-hover:text-indigo-600 transition-colors">
                                        {chapter.title}
                                    </h4>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-3 text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                                            <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> Class {chapter.class}</span>
                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {chapter.time} min</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center pt-8">
                        <Button variant="ghost" className="gap-2 text-indigo-600 hover:text-indigo-700">
                            Explore All 160+ Chapters in Our Catalog
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
