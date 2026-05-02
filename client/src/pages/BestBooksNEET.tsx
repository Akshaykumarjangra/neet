import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/Seo";
import { BookOpen, Star, Target, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const booksData = {
  physics: [
    { title: "Concepts of Physics (Vol 1 & 2)", author: "H.C. Verma", priority: "Must Have", rating: 5, description: "Essential for building strong foundational concepts and numerical problem-solving skills." },
    { title: "Objective Physics", author: "DC Pandey", priority: "Highly Recommended", rating: 4.5, description: "Great for chapter-wise objective questions and previous year papers." },
    { title: "Fundamentals of Physics", author: "Halliday, Resnick, & Walker", priority: "Optional", rating: 4, description: "Good for deep theoretical understanding, but often exceeds NEET level." }
  ],
  chemistry: [
    { title: "NCERT Chemistry Textbooks (Class 11 & 12)", author: "NCERT", priority: "Must Have", rating: 5, description: "The bible for inorganic chemistry. Direct questions are often asked." },
    { title: "Physical Chemistry", author: "O.P. Tandon", priority: "Highly Recommended", rating: 4.5, description: "Excellent for physical chemistry numericals and advanced concepts." },
    { title: "Organic Chemistry", author: "Morrison & Boyd", priority: "Optional", rating: 4, description: "Detailed organic mechanisms, useful for understanding complex reactions." }
  ],
  biology: [
    { title: "NCERT Biology Textbooks (Class 11 & 12)", author: "NCERT", priority: "Must Have", rating: 5, description: "90% of the biology paper comes directly from these lines." },
    { title: "Objective Biology", author: "Dinesh", priority: "Highly Recommended", rating: 4.5, description: "Extensive question bank for thorough practice." },
    { title: "Trueman's Elementary Biology", author: "Trueman", priority: "Optional", rating: 4, description: "Good for detailed reading and understanding complex human physiology." }
  ]
};

export default function BestBooksNEET() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="Best Books for NEET 2026 Preparation | Subject-wise List"
        description="Discover the top recommended books for NEET Physics, Chemistry, and Biology. Expert-curated list to score 700+ in NEET 2026."
        keywords="best books for NEET, NEET physics books, NEET chemistry books, NCERT biology NEET"
        url="https://neet.zeropage.in/best-books-neet"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              Expert Curated List 2026
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter">
              BUILD YOUR <span className="text-primary italic">NEET LIBRARY</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stop hoarding unnecessary study material. Here is the definitive, topper-recommended list of books you actually need to crack NEET 2026.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="rounded-xl italic font-bold h-14 px-8 shadow-xl shadow-primary/20">
                Start Reading Online
              </Button>
            </div>
          </div>
          <BookOpen className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
        </section>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Core Foundation", value: "NCERT", icon: Star, color: "text-blue-500" },
            { label: "Target Score", value: "700+", icon: Target, color: "text-red-500" },
            { label: "Topper Approval", value: "98%", icon: CheckCircle2, color: "text-green-500" },
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

        {/* Subject Books */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black italic tracking-tight">Subject-wise Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(booksData).map(([subject, books]) => (
              <Card key={subject} className="overflow-hidden border-border/50">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="capitalize italic flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    {subject}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {books.map((book, index) => (
                    <div key={index} className="space-y-3 p-4 rounded-xl bg-background border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold italic text-lg leading-tight">{book.title}</h4>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        <Badge variant={book.priority === "Must Have" ? "destructive" : "secondary"}>
                          {book.priority}
                        </Badge>
                      </div>
                      <p className="text-sm">{book.description}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12 space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black italic">Tired of reading heavy books?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto italic">
            Experience our AI-powered interactive learning platform. All concepts simplified with 3D visualizations and instant doubt resolution.
          </p>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg font-black italic">
            Try AI Learning Free
          </Button>
        </section>
      </main>
    </div>
  );
}
