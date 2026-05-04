import { Target, Users, Zap, Award, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/components/Seo";

export default function About() {
  const stats = [
    { label: "Students", value: "50,000+" },
    { label: "Questions", value: "200,000+" },
    { label: "AI Explanations", value: "1M+" },
    { label: "Mentors", value: "500+" }
  ];

  return (
    <>
      <Seo
        title="About ZeroPage | AI-Powered NEET Preparation Platform"
        description="Learn about ZeroPage's mission to revolutionize NEET preparation with AI tutoring, interactive simulations, and personalized learning paths."
        keywords={["about zeropage", "neet preparation platform", "ai neet coaching"]}
        url="https://neet.zeroai.org.in/about"
      />
      <div className="min-h-screen bg-background pb-16">
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden bg-primary/5">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter italic mb-6">
            Democratizing <span className="text-primary">Excellence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic leading-relaxed">
            We are building the future of medical entrance preparation. 
            By combining cognitive science with generative AI, we ensure 
            every student has a personal tutor at their fingertips.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-xl bg-background/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary italic">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
            <Target className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold italic tracking-tight">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed text-lg italic">
            To provide high-quality, AI-powered educational tools that make NEET 
            preparation personalized, efficient, and accessible to students from 
            every corner of the country, regardless of their background.
          </p>
        </div>
        <div className="space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
            <Globe className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold italic tracking-tight">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed text-lg italic">
            To become India's primary platform for competitive exam readiness, 
            setting a new global standard for how AI can empower human 
            learning and achievement.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-6 py-16 bg-muted/30 rounded-[3rem]">
        <h2 className="text-4xl font-bold text-center italic mb-16">The ZERO Way</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Zap, title: "Speed to Clarity", desc: "No student should stay stuck. Our AI explains complex concepts in seconds." },
            { icon: Users, title: "Community First", desc: "We are more than a tool; we are a support system of mentors and peers." },
            { icon: Heart, title: "Obsessive Quality", desc: "Every question and explanation is vetted for accuracy and relevance." }
          ].map((v, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-full bg-background shadow-lg w-16 h-16 flex items-center justify-center text-primary">
                <v.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold italic">{v.title}</h3>
              <p className="text-muted-foreground italic text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
