import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";
import { Download, AlertCircle, FileText, CheckSquare, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NEETAdmitCard() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="NEET 2026 Admit Card | Download Link & Instructions"
        description="Get all details about NEET 2026 admit card release date, how to download from NTA website, and important exam day guidelines."
        keywords="NEET admit card, NEET hall ticket download, NTA NEET admit card 2026, NEET exam day instructions"
        url="https://neet.zeroai.org.in/neet-admit-card"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Exam Day Preparation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
              NEET <span className="text-primary italic">ADMIT CARD</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your ticket to the examination hall. Everything you need to know about downloading, verifying, and carrying your NEET Admit Card.
            </p>
          </div>
          <FileText className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none bg-muted/30">
            <CardContent className="pt-6">
              <Download className="text-blue-500 w-6 h-6 mb-3" />
              <p className="text-xl font-black italic">Release Date</p>
              <p className="text-sm text-muted-foreground mt-1">Expected 1st week of May 2026</p>
            </CardContent>
          </Card>
          <Card className="border-none bg-muted/30">
            <CardContent className="pt-6">
              <Printer className="text-purple-500 w-6 h-6 mb-3" />
              <p className="text-xl font-black italic">Print Format</p>
              <p className="text-sm text-muted-foreground mt-1">A4 Size, Colored Print recommended</p>
            </CardContent>
          </Card>
          <Card className="border-none bg-muted/30">
            <CardContent className="pt-6">
              <CheckSquare className="text-green-500 w-6 h-6 mb-3" />
              <p className="text-xl font-black italic">Proforma</p>
              <p className="text-sm text-muted-foreground mt-1">Must attach postcard size photo</p>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-6">
          <Card className="border-border/50">
            <CardHeader className="bg-muted/50">
              <CardTitle className="italic flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Details to Verify on Admit Card
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Candidate's Name",
                  "Father's Name",
                  "Date of Birth",
                  "Gender",
                  "Category",
                  "Application Number",
                  "Roll Number",
                  "Exam Centre Name & Address",
                  "Reporting Time",
                  "Gate Closing Time",
                  "Question Paper Medium",
                  "Candidate's Photograph & Signature",
                ].map((detail, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm p-2 border-b">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-lg flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>If you find any discrepancy in the details mentioned above, immediately contact the NTA helpline.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center py-12 space-y-6">
          <h3 className="text-2xl font-black italic">Is your prep exam-ready?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto italic">Don't wait for the admit card to test your preparation. Take our full-length mock tests designed on the exact NTA pattern.</p>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg font-black italic">
            Attempt Mock Test
          </Button>
        </section>
      </main>
    </div>
  );
}
