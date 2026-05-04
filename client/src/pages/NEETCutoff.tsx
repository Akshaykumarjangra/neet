import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Seo } from "@/components/Seo";
import { getBreadcrumbSchema } from "@/config/seo";
import { TrendingUp, Award, Users, MapPin, ChevronRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const cutoffData = [
  { category: "General (UR)", cutoff2024: "164-720", cutoff2023: "137-720", trend: "Increasing" },
  { category: "OBC", cutoff2024: "129-163", cutoff2023: "107-136", trend: "Increasing" },
  { category: "SC", cutoff2024: "105-128", cutoff2023: "107-136", trend: "Increasing" },
  { category: "ST", cutoff2024: "105-128", cutoff2023: "107-136", trend: "Stable" },
];

const collegeCutoffs = [
  { college: "AIIMS New Delhi", score: "710+", rank: "1-50" },
  { college: "MAMC Delhi", score: "705+", rank: "50-100" },
  { college: "VMMC Delhi", score: "700+", rank: "100-200" },
  { college: "KGMU Lucknow", score: "685+", rank: "500-1000" },
];

export default function NEETCutoff() {
  return (
    <div className="min-h-screen bg-background">
      <Seo 
        title="NEET 2026 Cutoff Analysis & Trends | ZERO AI NEET"
        description="Comprehensive analysis of NEET cutoff trends (2023-2025). Predict your chances for AIIMS and top medical colleges with our AI-powered rank predictor."
        keywords="NEET cutoff 2026, NEET 2024 cutoff, AIIMS Delhi cutoff, NEET qualifying marks, medical college ranks"
        url="https://neet.zeroai.org.in/neet-cutoff"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-8">
          <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5">
            Updated for 2026 Aspirants
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            NEET Cutoff Analysis & <span className="text-primary">2026 Predictions</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Understand the shifting trends in NEET qualifying marks and college-wise opening/closing ranks.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full shadow-lg hover:shadow-primary/20 transition-all">
              Predict My Rank <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Download Full Report
            </Button>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/10 bg-primary/5">
            <CardContent className="pt-6 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Aspirants 2024</p>
                <p className="text-2xl font-bold">24.06 Lakhs</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-500/10 bg-green-500/5">
            <CardContent className="pt-6 flex items-center space-x-4">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Qualifying Mark</p>
                <p className="text-2xl font-bold">164 (UR)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/10 bg-blue-500/5">
            <CardContent className="pt-6 flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg. Score Rise</p>
                <p className="text-2xl font-bold">+15.4%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Category-wise Qualifying Cutoff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>2024 Cutoff</TableHead>
                      <TableHead>2023 Cutoff</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cutoffData.map((row) => (
                      <TableRow key={row.category}>
                        <TableCell className="font-medium">{row.category}</TableCell>
                        <TableCell>{row.cutoff2024}</TableCell>
                        <TableCell>{row.cutoff2023}</TableCell>
                        <TableCell>
                          <Badge variant={row.trend === "Increasing" ? "destructive" : "secondary"}>
                            {row.trend}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Top Medical Colleges: Expected Ranks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collegeCutoffs.map((item) => (
                    <div key={item.college} className="p-4 border rounded-lg hover:border-primary/30 transition-colors">
                      <p className="font-semibold">{item.college}</p>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-muted-foreground">Expected Score:</span>
                        <span className="font-bold text-primary">{item.score}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Closing Rank:</span>
                        <span className="font-bold">{item.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>AI Rank Predictor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-primary-foreground/80">
                  Input your mock test scores to get a real-time prediction of your AIQ (All India Quota) rank.
                </p>
                <Button variant="secondary" className="w-full font-bold">
                  Start Prediction
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Factors Influencing Cutoff</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Total number of registered candidates",
                    "Difficulty level of the question paper",
                    "Seat availability in government colleges",
                    "Implementation of reservation quotas",
                    "Previous year's performance trends"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
