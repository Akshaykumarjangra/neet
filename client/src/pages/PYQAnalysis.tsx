// @ts-nocheck
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Seo } from "@/components/Seo";
import { getBreadcrumbSchema } from "@/config/seo";
import { History, Target, TrendingUp, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const weightageData = {
  biology: [
    { topic: "Human Physiology", questions: 12, weightage: 13, priority: "High" },
    { topic: "Genetics & Evolution", questions: 10, weightage: 11, priority: "High" },
    { topic: "Cell Structure", questions: 8, weightage: 9, priority: "Medium" },
    { topic: "Ecology", questions: 7, weightage: 8, priority: "Medium" },
  ],
  physics: [
    { topic: "Mechanics", questions: 14, weightage: 15, priority: "High" },
    { topic: "Electrodynamics", questions: 12, weightage: 13, priority: "High" },
    { topic: "Optics", questions: 6, weightage: 7, priority: "Medium" },
    { topic: "Modern Physics", questions: 8, weightage: 9, priority: "High" },
  ],
  chemistry: [
    { topic: "Organic Chemistry", questions: 15, weightage: 16, priority: "High" },
    { topic: "Chemical Bonding", questions: 6, weightage: 7, priority: "Medium" },
    { topic: "Equilibrium", questions: 5, weightage: 6, priority: "Medium" },
    { topic: "Coordination Compounds", questions: 4, weightage: 5, priority: "High" },
  ]
};

export default function PYQAnalysis() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="NEET PYQ Analysis (2010-2024) | Chapter-wise Weightage"
        description="Deep dive into 15 years of NEET Previous Year Questions (PYQ). Discover high-yield topics, subject-wise weightage, and trend analysis for NEET 2026."
        keywords="NEET PYQ analysis, chapter-wise weightage NEET, biology weightage NEET, physics important topics, NEET chemistry trends"
        url="https://neet.zeroai.org.in/pyq-analysis"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              15-Year Trend Analysis (2010-2024)
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
              MASTER THE <span className="text-primary italic">NEET PATTERN</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We analyzed over 2,700 questions from the last 15 years to identify the exact topics that repeat every year. Stop guessing, start targeting.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="rounded-xl italic font-bold h-14 px-8 shadow-xl shadow-primary/20">
                Explore Topic-wise PYQs
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl italic font-bold h-14 px-8">
                Download PDF Report
              </Button>
            </div>
          </div>
          <History className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
        </section>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Questions Analyzed", value: "2,700+", icon: History, color: "text-blue-500" },
            { label: "High Yield Topics", value: "42", icon: Target, color: "text-red-500" },
            { label: "Repeat Question Rate", value: "18%", icon: TrendingUp, color: "text-green-500" },
            { label: "NTA Pattern Stability", value: "92%", icon: CheckCircle2, color: "text-primary" },
          ].map((item, i) => (
            <Card key={i} className="border-none bg-muted/30">
              <CardContent className="pt-6">
                <item.icon className={item.color + " w-5 h-5 mb-3"} />
                <p className="text-2xl font-black italic">{item.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subject Analysis Tabs/Sections */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black italic tracking-tight">Subject-wise Weightage</h2>
            <div className="hidden md:flex gap-2">
              <Badge variant="outline">Biology</Badge>
              <Badge variant="outline">Physics</Badge>
              <Badge variant="outline">Chemistry</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(weightageData).map(([subject, topics]) => (
              <Card key={subject} className="overflow-hidden border-border/50">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="capitalize italic">{subject}</CardTitle>
                  <CardDescription>Topic distribution based on 2024 paper</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {topics.map((topic) => (
                    <div key={topic.topic} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold italic">
                        <span>{topic.topic}</span>
                        <span className="text-primary">{topic.weightage}%</span>
                      </div>
                      <Progress value={topic.weightage * 5} className="h-2" />
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                          {topic.questions} Questions
                        </span>
                        <Badge variant={topic.priority === "High" ? "destructive" : "secondary"} className="text-[9px] h-4">
                          {topic.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trend Analysis Table */}
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                NTA Trend Analysis (Last 3 Years)
              </CardTitle>
              <CardDescription>How the difficulty and distribution shifted under NTA</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Area</TableHead>
                    <TableHead>2022 Style</TableHead>
                    <TableHead>2023 Style</TableHead>
                    <TableHead>2024 Prediction Match</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold italic">Physics Mechanics</TableCell>
                    <TableCell>Calculative</TableCell>
                    <TableCell>Formula Based</TableCell>
                    <TableCell className="text-green-500 font-bold">95% Accurate</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold italic">Organic Chemistry</TableCell>
                    <TableCell>Named Reactions</TableCell>
                    <TableCell>Sequence Based</TableCell>
                    <TableCell className="text-green-500 font-bold">88% Accurate</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold italic">Human Physiology</TableCell>
                    <TableCell>Direct NCERT</TableCell>
                    <TableCell>Multi-statement</TableCell>
                    <TableCell className="text-green-500 font-bold">92% Accurate</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12 space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-destructive/10 text-destructive mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black italic">Ready to practice these PYQs?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto italic">
            Don't just read the analysis. Solve the actual questions in our adaptive practice mode with AI-powered hints.
          </p>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg font-black italic">
            Start PYQ Practice Now
          </Button>
        </section>
      </main>
    </div>
  );
}
