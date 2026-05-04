import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";
import { FileEdit, CreditCard, UploadCloud, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NEETApplicationForm() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="NEET 2026 Application Form | Registration Dates & Fees"
        description="Step-by-step guide to filling the NEET 2026 Application form. Check registration dates, fees, required documents, and correction window details."
        keywords="NEET application form 2026, NEET registration dates, NEET fee, NEET documents required"
        url="https://neet.zeroai.org.in/neet-application-form"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Registration Guide 2026
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
              NEET APPLICATION <span className="text-primary italic">FORM</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Don't let a small mistake ruin your chances. Follow this comprehensive guide to successfully register for NEET 2026.
            </p>
          </div>
          <FileEdit className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Start Date", desc: "Feb 2026 (Tentative)", icon: Calendar, color: "text-blue-500" },
            { title: "Mode", desc: "Online Only", icon: UploadCloud, color: "text-purple-500" },
            { title: "Base Fee", desc: "₹1700 (UR)", icon: CreditCard, color: "text-green-500" },
          ].map((item, i) => (
            <Card key={i} className="border-none bg-muted/30">
              <CardContent className="pt-6">
                <item.icon className={item.color + " w-6 h-6 mb-3"} />
                <p className="text-xl font-black italic">{item.desc}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{item.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="space-y-6">
          <Card className="border-border/50">
            <CardHeader className="bg-muted/50">
              <CardTitle className="italic flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Required Documents Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-xl border">
                  <h4 className="font-bold mb-1">Passport Size Photograph</h4>
                  <p className="text-sm text-muted-foreground">White background, with name and date. Size: 10KB to 200KB. Format: JPG.</p>
                </div>
                <div className="p-4 bg-background rounded-xl border">
                  <h4 className="font-bold mb-1">Postcard Size Photograph</h4>
                  <p className="text-sm text-muted-foreground">4"x6" size, white background. Size: 10KB to 200KB. Format: JPG.</p>
                </div>
                <div className="p-4 bg-background rounded-xl border">
                  <h4 className="font-bold mb-1">Signature</h4>
                  <p className="text-sm text-muted-foreground">Black pen on white paper. Size: 4KB to 30KB. Format: JPG.</p>
                </div>
                <div className="p-4 bg-background rounded-xl border">
                  <h4 className="font-bold mb-1">Left & Right Hand Fingers Impressions</h4>
                  <p className="text-sm text-muted-foreground">Blue/black ink on white paper. Size: 10KB to 200KB. Format: JPG.</p>
                </div>
                <div className="p-4 bg-background rounded-xl border">
                  <h4 className="font-bold mb-1">Category Certificate (if applicable)</h4>
                  <p className="text-sm text-muted-foreground">SC/ST/OBC/EWS certificate in PDF format. Size: 50KB to 300KB.</p>
                </div>
                <div className="p-4 bg-background rounded-xl border">
                  <h4 className="font-bold mb-1">Class 10 Passing Certificate</h4>
                  <p className="text-sm text-muted-foreground">Proof of date of birth in PDF format. Size: 50KB to 300KB.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center py-12 space-y-6">
          <h3 className="text-2xl font-black italic">Stay updated with NTA notifications</h3>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg font-black italic">
            Join Telegram Channel
          </Button>
        </section>
      </main>
    </div>
  );
}
