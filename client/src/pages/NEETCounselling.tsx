import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";
import { Building2, Globe, FileCheck, ArrowRightLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NEETCounselling() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="NEET 2026 Counselling Process | MCC & State Quota"
        description="Understand the complete NEET counselling process. Learn about AIQ 15%, State Quota 85%, document verification, and seat allotment."
        keywords="NEET counselling, MCC counselling, NEET AIQ quota, NEET state quota counselling"
        url="https://neet.zeroai.org.in/neet-counselling"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Post-Exam Guidance
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
              NEET <span className="text-primary italic">COUNSELLING</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Securing a good rank is only half the battle. Understanding the counselling process is crucial to getting the college you deserve.
            </p>
          </div>
          <Building2 className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border/50">
            <CardHeader className="bg-muted/50">
              <CardTitle className="italic flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                All India Quota (15%)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">Conducted by Medical Counselling Committee (MCC) for 15% of government medical college seats across India, plus 100% seats in Deemed/Central Universities, AIIMS, and JIPMER.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-primary" /> 4 Rounds (Round 1, Round 2, Mop-up, Stray Vacancy)</li>
                <li className="flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-primary" /> Open to all qualified candidates globally</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="bg-muted/50">
              <CardTitle className="italic flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                State Quota (85%)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">Conducted by respective state medical councils for the remaining 85% of government seats and private medical colleges within the state.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-primary" /> Requires state domicile</li>
                <li className="flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-primary" /> Rules and reservation policies vary by state</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-6">
          <h2 className="text-3xl font-black italic tracking-tight">Important Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "NEET Admit Card",
              "NEET Result/Rank Letter",
              "Class 10 & 12 Certificate and Marksheet",
              "8 Passport Size Photographs",
              "Provisional Allotment Letter",
              "Identity Proof (Aadhar/PAN/Passport)",
              "Category Certificate (if applicable)",
              "Domicile Certificate (for State Quota)",
            ].map((doc, i) => (
              <div key={i} className="flex gap-3 items-center p-4 bg-background rounded-xl border border-border/50">
                <FileCheck className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center py-12 space-y-6">
          <h3 className="text-2xl font-black italic">Need help analyzing your chances?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto italic">Use our AI-powered rank predictor to see which colleges you can get based on your expected score.</p>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg font-black italic">
            Use Rank Predictor
          </Button>
        </section>
      </main>
    </div>
  );
}
