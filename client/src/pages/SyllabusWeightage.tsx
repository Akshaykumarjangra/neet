import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";
import { PieChart, BarChart2, BookOpen, ChevronRight, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const weightageData = {
  Biology: [
    { topic: "Human Physiology", weightage: "20%", importance: "Critical", questions: 9 },
    { topic: "Genetics & Evolution", weightage: "18%", importance: "High", questions: 8 },
    { topic: "Cell Structure & Function", weightage: "12%", importance: "High", questions: 5 },
    { topic: "Plant Physiology", weightage: "10%", importance: "Medium", questions: 4 },
    { topic: "Reproduction", weightage: "9%", importance: "High", questions: 4 },
  ],
  Physics: [
    { topic: "Mechanics", weightage: "25%", importance: "Critical", questions: 12 },
    { topic: "Electrodynamics", weightage: "22%", importance: "High", questions: 10 },
    { topic: "Modern Physics", weightage: "15%", importance: "High", questions: 7 },
    { topic: "Optics", weightage: "10%", importance: "Medium", questions: 5 },
    { topic: "Thermodynamics", weightage: "8%", importance: "Medium", questions: 4 },
  ],
  Chemistry: [
    { topic: "Organic Chemistry", weightage: "34%", importance: "Critical", questions: 15 },
    { topic: "Physical Chemistry", weightage: "32%", importance: "High", questions: 14 },
    { topic: "Inorganic Chemistry", weightage: "34%", importance: "High", questions: 15 },
  ]
};

export default function SyllabusWeightage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo 
        title="NEET 2026 Syllabus Weightage | Chapter-wise Analysis"
        description="Master the NEET syllabus with our detailed chapter-wise weightage analysis. Identify high-yield topics in Biology, Physics, and Chemistry for top scores."
        keywords="NEET syllabus weightage, important chapters for NEET, biology weightage NEET, physics high yield topics"
        url="https://neet.zeroai.org.in/syllabus-weightage"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-8">
          <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5">
            Updated for 2026 Pattern
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight italic">
            Chapter <span className="text-primary glow-text">Weightage</span>
          </h1>
          <p className="text-xl text-muted-foreground italic leading-relaxed">
            Data-driven revision starts here. Focus your energy on high-yield chapters 
            that contribute the most to your 720 score target.
          </p>
        </section>

        {/* Dynamic Weightage Tabs */}
        <section className="space-y-12">
          <Tabs defaultValue="Biology" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-muted/50 p-1 rounded-2xl border border-primary/10 backdrop-blur-xl h-14">
                {Object.keys(weightageData).map((subject) => (
                  <TabsTrigger 
                    key={subject} 
                    value={subject}
                    className="px-8 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-black font-bold italic transition-all"
                  >
                    {subject}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(weightageData).map(([subject, topics]) => (
              <TabsContent key={subject} value={subject} className="animate-in fade-in zoom-in-95 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* List View */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-primary/10 bg-card/50 overflow-hidden">
                      <CardHeader className="border-b border-primary/5 bg-primary/5">
                        <CardTitle className="flex items-center text-xl italic">
                          <BarChart2 className="w-6 h-6 mr-3 text-primary" />
                          High-Yield Analysis: {subject}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="pl-6 italic">Topic / Unit</TableHead>
                              <TableHead className="italic">Weightage</TableHead>
                              <TableHead className="italic text-center">Avg. Qns</TableHead>
                              <TableHead className="italic text-right pr-6">Priority</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {topics.map((item, i) => (
                              <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                                <TableCell className="pl-6 font-bold italic">{item.topic}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-20 bg-muted rounded-full h-1.5 overflow-hidden">
                                      <div 
                                        className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(0,227,253,0.5)]" 
                                        style={{ width: item.weightage }}
                                      />
                                    </div>
                                    <span className="text-sm font-mono font-bold">{item.weightage}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center font-bold text-primary">{item.questions}</TableCell>
                                <TableCell className="text-right pr-6">
                                  <Badge 
                                    className={
                                      item.importance === "Critical" 
                                        ? "bg-red-500/20 text-red-400 border-red-500/40" 
                                        : item.importance === "High"
                                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                                          : "bg-blue-500/20 text-blue-400 border-blue-500/40"
                                    }
                                  >
                                    {item.importance}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                      <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <strong className="text-white">Pro Tip:</strong> These percentages are based on the aggregate analysis 
                        of the last 10 years of NTA question papers. Pattern shifts are possible; use this as a 
                        prioritization guide, not a reason to skip topics.
                      </p>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="space-y-6">
                    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-lg italic">Subject Strategy</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <TrendingUp className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-sm italic">Focus on {topics[0].topic}</p>
                            <p className="text-xs text-muted-foreground mt-1">This unit alone contributes {topics[0].weightage} of the subject marks.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-sm italic">NCERT Mastery</p>
                            <p className="text-xs text-muted-foreground mt-1">Direct questions from NCERT lines have increased by 15% in this subject.</p>
                          </div>
                        </div>
                        <Button className="w-full bg-primary text-black font-bold italic rounded-xl h-12 shadow-lg shadow-primary/20">
                          View Chapter Notes
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2rem] bg-card border border-primary/10 text-center space-y-4">
                      <PieChart className="w-12 h-12 text-primary mx-auto opacity-50" />
                      <h3 className="font-bold italic">Visual Breakdown</h3>
                      <p className="text-xs text-muted-foreground italic">
                        Want a visual concept map of how these topics interlink?
                      </p>
                      <Button variant="outline" className="w-full rounded-full border-primary/20 text-primary">
                        Open Concept Map
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Global Strategy Section */}
        <section className="bg-primary/5 p-12 rounded-[3rem] border border-primary/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          <div className="max-w-3xl space-y-6 relative z-10">
            <h2 className="text-4xl font-bold italic leading-tight">
              The <span className="text-primary">80/20 Rule</span> for NEET
            </h2>
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              In any competitive exam, roughly 80% of the questions come from 20% of the syllabus. 
              Our AI engine identifies that 20% based on current difficulty curves and past 
              year volatility.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full shadow-2xl">
                Get Personalized Roadmap <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full text-primary underline underline-offset-8">
                Download PDF Analysis
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
