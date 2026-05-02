import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Seo } from "@/components/Seo";
import { Search, MapPin, Award, Building2, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const collegeData = [
  { 
    name: "AIIMS New Delhi", 
    location: "New Delhi", 
    nirf: 1, 
    type: "Government", 
    cutoff: "710+", 
    seats: 132,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Maulana Azad Medical College (MAMC)", 
    location: "New Delhi", 
    nirf: 3, 
    type: "Government", 
    cutoff: "705+", 
    seats: 250,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Christian Medical College (CMC)", 
    location: "Vellore", 
    nirf: 2, 
    type: "Private", 
    cutoff: "690+", 
    seats: 100,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "JIPMER", 
    location: "Puducherry", 
    nirf: 5, 
    type: "Government", 
    cutoff: "700+", 
    seats: 150,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "King George's Medical University (KGMU)", 
    location: "Lucknow", 
    nirf: 10, 
    type: "Government", 
    cutoff: "685+", 
    seats: 250,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "AFMC Pune", 
    location: "Pune", 
    nirf: 4, 
    type: "Armed Forces", 
    cutoff: "670+", 
    seats: 150,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
  }
];

export default function MedicalColleges() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColleges = collegeData.filter(college => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo 
        title="Top Medical Colleges in India 2026 | Ranks, Cutoffs & Seats"
        description="Explore the best medical colleges for MBBS in India. Get detailed info on AIIMS, MAMC, JIPMER, and more with expected NEET cutoffs and NIRF rankings."
        keywords="best medical colleges India, MBBS colleges cutoff, AIIMS Delhi admission, top government medical colleges, NEET college predictor"
        url="https://neet.zeropage.in/medical-colleges"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="relative py-12 text-center space-y-6 max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full animate-pulse" />
          <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5 backdrop-blur-sm">
            NIRF 2025 Data Updated
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight italic">
            Top Medical <span className="text-primary glow-text">Colleges</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your roadmap to the white coat starts here. Compare top-tier institutions, 
            understand seat matrices, and target your dream college with precision.
          </p>
          
          <div className="max-w-2xl mx-auto pt-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                className="pl-12 h-14 bg-card/50 border-primary/20 rounded-2xl text-lg focus:ring-primary/20 transition-all shadow-xl"
                placeholder="Search by college name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Featured Colleges Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold italic flex items-center">
              <Award className="w-8 h-8 mr-3 text-primary" />
              Elite Tier Institutions
            </h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              View All <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.map((college, idx) => (
              <Card key={idx} className="group overflow-hidden border-primary/10 hover:border-primary/40 bg-card/50 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,227,253,0.1)]">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={college.image} 
                    alt={college.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary/90 text-black font-bold">
                    NIRF #{college.nirf}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold italic line-clamp-1">{college.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    {college.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Expected Cutoff</p>
                      <p className="font-bold text-primary">{college.cutoff}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Seats</p>
                      <p className="font-bold">{college.seats}</p>
                    </div>
                  </div>

                  <Button className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 transition-all rounded-xl">
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Detailed Seat Matrix Table */}
        <section className="space-y-8 bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold italic">Seat Matrix & Fee Structure</h2>
            <p className="text-muted-foreground">
              Deep dive into the numbers that matter. Government vs Private seat distributions and scholarship opportunities.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-xl">
            <Table>
              <TableHeader className="bg-primary/10">
                <TableRow>
                  <TableHead className="font-bold text-primary italic">College Name</TableHead>
                  <TableHead className="font-bold text-primary italic">Category</TableHead>
                  <TableHead className="font-bold text-primary italic">NIRF Rank</TableHead>
                  <TableHead className="font-bold text-primary italic text-right">Avg. Fee (Annual)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collegeData.map((row, i) => (
                  <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold">
                        {row.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-500" />
                        {row.nirf}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {row.type === "Government" ? "₹1,628 - ₹5,856" : "₹18.5L - ₹25L"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative overflow-hidden rounded-[3rem] p-12 bg-card border border-primary/20 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -z-10 rounded-full" />
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="space-y-6 flex-1 text-center md:text-left">
              <h2 className="text-4xl font-bold italic leading-tight">
                Not sure where <span className="text-primary">you fit in?</span>
              </h2>
              <p className="text-muted-foreground text-lg italic">
                Our AI engine analyzes your mock test trends to predict exactly which college
                you can secure based on real-time competition data.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full shadow-[0_0_20px_rgba(0,227,253,0.3)] px-10">
                  Start Prediction <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10">
                  Speak to Counselor
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <Building2 className="w-48 h-48 text-primary/40 relative" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
