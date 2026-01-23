import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen, CheckCircle2, FlaskConical, Microscope } from "lucide-react";
import { ChapterQuiz } from "./ChapterQuiz";

export function ZoologyChapter32() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 gradient-mesh-bg min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Zoology Chapter 32</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Dive into the fascinating world of animal biology, physiology, and complex organ systems.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5" />
              <p>Explore fundamental anatomical structures</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5" />
              <p>Understand complex physiological processes</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5" />
              <p>Analyze evolutionary adaptations in animalia</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5" />
              <p>Master taxonomic and functional diversity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="labs">Interactive Lab</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-indigo-600" />
                Chapter Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                In this chapter, we explore the intricate details of animal biology. Zoology provides us with 
                a deep understanding of how organisms function, survive, and interact with their environment.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mt-4">
                <h4 className="font-semibold text-indigo-900 mb-2">?? Core Study Perspective:</h4>
                <p className="text-sm text-indigo-800">
                  Focus on the correlation between structure and function. Every anatomical feature has an 
                  evolutionary purpose tailored for survival.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Fundamental Concepts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Morphological Diversity</h4>
                  <p className="text-sm text-blue-800">The wide range of body forms and sizes in the animal kingdom.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Homeostasis</h4>
                  <p className="text-sm text-purple-800">Regulatory mechanisms that maintain internal stability.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle bg-indigo-900 text-white border-none overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FlaskConical className="h-6 w-6" />
                Virtual Lab Simulation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6 relative z-10">
              <div className="h-40 w-40 rounded-full border-4 border-dashed border-white/30 flex items-center justify-center animate-spin-slow">
                <Microscope className="h-16 w-16 opacity-50" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Interactive Model Loading...</h3>
                <p className="text-blue-100/70 max-w-sm">
                  We are preparing a 3D visualization of relevant biological systems for this chapter.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <ChapterQuiz 
            topicId={100 + 32} 
            subject="Zoology" 
            chapterTitle="Chapter 32" 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
