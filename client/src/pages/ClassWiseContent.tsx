
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { BookOpen, Search, GraduationCap, Atom, TestTubes, Dna, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Chapter {
  id: number;
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterTitle: string;
  introduction: string;
  difficultyLevel: number;
  estimatedStudyMinutes: number;
  status: string;
}

export default function ClassWiseContent() {
  const [, setLocation] = useLocation();
  const [selectedClass, setSelectedClass] = useState<"11" | "12">("11");
  const [selectedSubject, setSelectedSubject] = useState<"Physics" | "Chemistry" | "Biology">("Physics");
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const { data: chapters, isLoading } = useQuery<Chapter[]>({
    queryKey: ['/api/lms/library'],
  });

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Physics":
        return <Atom className="h-5 w-5" />;
      case "Chemistry":
        return <TestTubes className="h-5 w-5" />;
      case "Biology":
        return <Dna className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "from-blue-500 to-blue-600";
      case "Chemistry":
        return "from-purple-500 to-purple-600";
      case "Biology":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getDifficultyColor = (level: number) => {
    if (level <= 2) return "text-green-600 bg-green-50";
    if (level <= 3) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getDifficultyLabel = (level: number) => {
    if (level <= 2) return "Easy";
    if (level <= 3) return "Medium";
    return "Hard";
  };

  const filteredChapters = chapters
    ?.filter(ch => ch.classLevel === selectedClass && ch.subject === selectedSubject)
    ?.filter(ch => 
      searchQuery === "" || 
      ch.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.introduction.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.sort((a, b) => a.chapterNumber - b.chapterNumber) || [];

  const class11Subjects = ["Physics", "Chemistry", "Biology"];
  const class12Subjects = ["Physics", "Chemistry", "Biology"];

  const getChapterCount = (classLevel: string, subject: string) => {
    return chapters?.filter(ch => ch.classLevel === classLevel && ch.subject === subject).length || 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Complete NEET Syllabus
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Comprehensive chapter-wise content for Class 11 and 12 - Physics, Chemistry & Biology
          </p>
        </motion.div>

        {/* Class Selector */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <Button
              variant={selectedClass === "11" ? "default" : "outline"}
              className="h-20 text-lg"
              onClick={() => setSelectedClass("11")}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">Class 11</div>
                <div className="text-xs opacity-80">Foundation Year</div>
              </div>
            </Button>
            <Button
              variant={selectedClass === "12" ? "default" : "outline"}
              className="h-20 text-lg"
              onClick={() => setSelectedClass("12")}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">Class 12</div>
                <div className="text-xs opacity-80">Advanced Year</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Subject Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {(selectedClass === "11" ? class11Subjects : class12Subjects).map((subject) => (
            <Card
              key={subject}
              className={`cursor-pointer transition-all ${
                selectedSubject === subject ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedSubject(subject as any)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getSubjectIcon(subject)}
                    <CardTitle className="text-lg">{subject}</CardTitle>
                  </div>
                  {selectedSubject === subject && (
                    <Badge>Selected</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {getChapterCount(selectedClass, subject)}
                  </span>
                  <span className="text-sm text-muted-foreground">Chapters</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${selectedSubject} chapters...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chapters List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {getSubjectIcon(selectedSubject)}
              Class {selectedClass} - {selectedSubject}
            </h2>
            <Badge variant="outline">
              {filteredChapters.length} Chapter{filteredChapters.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {isLoading ? (
            <div className="grid gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredChapters.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No chapters found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search query" : "Chapters coming soon!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid gap-4">
                {filteredChapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                  >
                    <Card className="hover:shadow-lg transition-all cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">
                                Chapter {chapter.chapterNumber}
                              </Badge>
                              <Badge className={getDifficultyColor(chapter.difficultyLevel)}>
                                {getDifficultyLabel(chapter.difficultyLevel)}
                              </Badge>
                              {chapter.status === 'published' && (
                                <Badge variant="secondary">Published</Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {chapter.chapterTitle}
                            </CardTitle>
                          </div>
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${getSubjectColor(chapter.subject)}`}>
                            {getSubjectIcon(chapter.subject)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {chapter.introduction}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              ~{chapter.estimatedStudyMinutes} min
                            </span>
                          </div>
                          <Button
                            onClick={() => setLocation(`/chapter/${chapter.subject}/${chapter.classLevel}/${chapter.chapterNumber}`)}
                            className="group-hover:gap-2 transition-all"
                          >
                            Study Now
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        {/* Summary Stats */}
        {!isLoading && filteredChapters.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardContent className="py-6">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {filteredChapters.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Chapters</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {filteredChapters.filter(ch => ch.difficultyLevel <= 2).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Easy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {filteredChapters.filter(ch => ch.difficultyLevel === 3).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Medium</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    {filteredChapters.filter(ch => ch.difficultyLevel >= 4).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Hard</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
