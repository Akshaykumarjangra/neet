import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";
import { CheckCircle2, UserCheck, Calendar, AlertTriangle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NEETEligibilityCriteria() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="NEET 2026 Eligibility Criteria | Age Limit & Qualification"
        description="Check the official NEET 2026 eligibility criteria, age limit, minimum marks required in 12th, and number of attempts allowed."
        keywords="NEET eligibility 2026, NEET age limit, NEET qualification, NTA NEET rules"
        url="https://neet.zeropage.in/neet-eligibility-criteria"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Latest NTA Guidelines
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
              NEET 2026 <span className="text-primary italic">ELIGIBILITY</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Before starting your preparation, ensure you meet all the criteria set by NTA. Check age limits, academic requirements, and attempt caps.
            </p>
          </div>
          <UserCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Age Limit", desc: "17+ Years", icon: Calendar },
            { title: "Max Attempts", desc: "No Limit", icon: CheckCircle2 },
            { title: "Core Subjects", desc: "PCB + English", icon: BookOpen },
            { title: "Min Marks", desc: "50% (UR), 40% (OBC/SC/ST)", icon: Target },
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
          <Card className="border-border/50">
            <CardHeader className="bg-muted/50">
              <CardTitle className="italic">Detailed Academic Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-4 items-start p-4 bg-background rounded-xl border">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold">Passed or Appearing</h4>
                  <p className="text-sm text-muted-foreground">Candidates must have passed 10+2 or equivalent with Physics, Chemistry, Biology/Biotechnology, and English as core subjects.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 bg-background rounded-xl border">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold">Open School Candidates</h4>
                  <p className="text-sm text-muted-foreground">Students from NIOS or state open schools are currently eligible, subject to pending Supreme Court orders.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 bg-background rounded-xl border">
                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                <div>
                  <h4 className="font-bold">Additional Biology</h4>
                  <p className="text-sm text-muted-foreground">Biology as an additional subject is also accepted as per recent NMC guidelines.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center py-12 space-y-6">
          <h3 className="text-2xl font-black italic">Eligible? Start your preparation now!</h3>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg font-black italic">
            Join ZERO AI Free
          </Button>
        </section>
      </main>
    </div>
  );
}
