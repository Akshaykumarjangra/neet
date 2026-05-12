// @ts-nocheck
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Seo } from "@/components/Seo";
import { getBreadcrumbSchema } from "@/config/seo";
import { FileText, CheckCircle2, AlertCircle, Info, Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const syllabusData = {
  biology: [
    { unit: "Diversity in Living World", chapters: 4, weightage: "14%", focus: "High" },
    { unit: "Structural Organization in Animals and Plants", chapters: 3, weightage: "5%", focus: "Medium" },
    { unit: "Cell Structure and Function", chapters: 3, weightage: "9%", focus: "High" },
    { unit: "Plant Physiology", chapters: 5, weightage: "6%", focus: "Medium" },
    { unit: "Human Physiology", chapters: 7, weightage: "20%", focus: "High" },
  ],
  physics: [
    { unit: "Physical World and Measurement", chapters: 1, weightage: "2%", focus: "Low" },
    { unit: "Kinematics", chapters: 2, weightage: "3%", focus: "Medium" },
    { unit: "Laws of Motion", chapters: 1, weightage: "3%", focus: "High" },
    { unit: "Work, Energy and Power", chapters: 1, weightage: "4%", focus: "High" },
    { unit: "Thermodynamics", chapters: 1, weightage: "9%", focus: "High" },
  ],
  chemistry: [
    { unit: "Some Basic Concepts of Chemistry", chapters: 1, weightage: "2%", focus: "Medium" },
    { unit: "Structure of Atom", chapters: 1, weightage: "3%", focus: "High" },
    { unit: "Chemical Bonding", chapters: 1, weightage: "5%", focus: "High" },
    { unit: "Equilibrium", chapters: 1, weightage: "6%", focus: "High" },
    { unit: "Organic Chemistry: Basic Principles", chapters: 1, weightage: "10%", focus: "High" },
  ]
};

export default function Syllabus() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="Official NEET 2026 Syllabus (NTA) | Subject-wise Breakdown"
        description="Get the latest, most accurate NEET 2026 syllabus as per NTA guidelines. Detailed breakdown of Biology, Physics, and Chemistry units with weightage analysis."
        keywords="NEET 2026 syllabus, NTA NEET syllabus pdf, biology syllabus NEET, physics syllabus NEET, chemistry chapters NEET"
        url="https://neet.zeroai.org.in/syllabus"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-4xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-bold uppercase tracking-widest border border-green-500/20">
            <CheckCircle2 className="w-3 h-3" /> Latest NTA Guidelines Verified
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
            NEET 2026 <span className="text-primary italic">OFFICIAL SYLLABUS</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
            Don't study harder, study smarter. Use our weightage-based breakdown to prioritize high-yield units.
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-2xl italic font-bold h-14 px-10 shadow-xl shadow-primary/20">
              <Download className="mr-2 w-5 h-5" /> Download Full PDF
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl italic font-bold h-14 px-10">
              Track My Progress
            </Button>
          </div>
        </section>

        {/* Syllabus Tabs */}
        <section className="max-w-5xl mx-auto">
          <Tabs defaultValue="biology" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted/50 p-1 rounded-2xl h-14 w-full max-w-md">
                <TabsTrigger value="biology" className="rounded-xl italic font-bold h-full flex-1">Biology</TabsTrigger>
                <TabsTrigger value="physics" className="rounded-xl italic font-bold h-full flex-1">Physics</TabsTrigger>
                <TabsTrigger value="chemistry" className="rounded-xl italic font-bold h-full flex-1">Chemistry</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(syllabusData).map(([subject, units]) => (
              <TabsContent key={subject} value={subject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {units.map((item, i) => (
                    <Card key={i} className="border-border/50 hover:border-primary/30 transition-all group overflow-hidden">
                      <div className={`h-1.5 w-full ${item.focus === 'High' ? 'bg-destructive' : item.focus === 'Medium' ? 'bg-amber-500' : 'bg-green-500'}`} />
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="text-[10px] uppercase tracking-widest">{item.focus} Priority</Badge>
                          <span className="text-lg font-black italic text-primary">{item.weightage}</span>
                        </div>
                        <CardTitle className="text-lg italic leading-snug pt-2 group-hover:text-primary transition-colors">
                          {item.unit}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                          <BookOpen className="w-4 h-4" />
                          {item.chapters} Chapters Included
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Disclaimer & Advisory */}
        <section className="max-w-3xl mx-auto">
          <div className="p-6 rounded-3xl bg-muted/30 border border-border/50 flex gap-6 items-start">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black italic">Aspirant Advisory</h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                This syllabus is based on the latest notification from the National Testing Agency (NTA). 
                We recommend starting with "High Priority" units first as they consistently contribute to over 60% of the total marks in NEET.
              </p>
            </div>
          </div>
        </section>

        {/* Integration Callout */}
        <section className="py-12 border-t border-border/50 text-center space-y-6">
          <h2 className="text-3xl font-black italic">Start Your Chapter-wise Prep</h2>
          <p className="text-muted-foreground italic max-w-xl mx-auto">
            Ready to dive in? Every topic listed above is mapped to our 50,000+ question bank and interactive flashcards.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg font-black italic">Get Started Free</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
