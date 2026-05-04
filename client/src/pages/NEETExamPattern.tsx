import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";
import { FileText, Clock, FileQuestion, HelpCircle, Target } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function NEETExamPattern() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="NEET 2026 Exam Pattern | Marks Distribution & Scheme"
        description="Complete guide on NEET exam pattern 2026. Understand the marking scheme, sections (A & B), total duration, and subject-wise weightage."
        keywords="NEET exam pattern, NEET marking scheme, NEET sections, NEET negative marking"
        url="https://neet.zeroai.org.in/neet-exam-pattern"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Exam Structure 2026
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
              NEET EXAM <span className="text-primary italic">PATTERN</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master the paper format to maximize your score. Learn how Section A and Section B work, and how to avoid negative marking.
            </p>
          </div>
          <FileText className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Duration", desc: "3 Hours 20 Mins", icon: Clock },
            { title: "Total Marks", desc: "720", icon: Target },
            { title: "Total Questions", desc: "200 (Attempt 180)", icon: FileQuestion },
            { title: "Marking", desc: "+4 / -1", icon: HelpCircle },
          ].map((item, i) => (
            <Card key={i} className="border-none bg-muted/30">
              <CardContent className="pt-6">
                <item.icon className="text-primary w-6 h-6 mb-3" />
                <p className="text-xl font-black italic">{item.desc}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{item.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="space-y-6">
          <Card>
            <CardHeader className="bg-muted/50">
              <CardTitle className="italic">Subject-wise Question Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Section A (Compulsory)</TableHead>
                    <TableHead>Section B (Optional)</TableHead>
                    <TableHead>Total Marks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {['Physics', 'Chemistry', 'Botany', 'Zoology'].map((subject) => (
                    <TableRow key={subject}>
                      <TableCell className="font-bold italic">{subject}</TableCell>
                      <TableCell>35 Questions</TableCell>
                      <TableCell>15 (Attempt any 10)</TableCell>
                      <TableCell className="text-primary font-bold">180</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section className="text-center py-12 space-y-6">
          <h3 className="text-2xl font-black italic">Familiarize yourself with the pattern!</h3>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg font-black italic">
            Attempt NTA Pattern Mock Test
          </Button>
        </section>
      </main>
    </div>
  );
}
