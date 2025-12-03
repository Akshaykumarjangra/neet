import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Users,
  BookOpen,
  Target,
  Trophy,
  Play,
  ArrowRight,
  Sparkles,
  Flame,
  GraduationCap,
  Star,
  CheckCircle2,
  Zap,
  Clock,
  TrendingUp,
  Award,
  Atom,
  FlaskConical,
  Leaf,
  ChevronRight,
  Quote,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Adaptive question recommendations based on your performance and learning patterns",
    color: "from-purple-500 to-indigo-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Book 1-on-1 sessions with NEET toppers and experienced faculty",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: BookOpen,
    title: "50,000+ Questions",
    description: "Comprehensive question bank covering the entire NEET syllabus with detailed solutions",
    color: "from-green-500 to-emerald-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    icon: Target,
    title: "Mock Tests",
    description: "NEET pattern tests with real-time analytics and detailed performance reports",
    color: "from-orange-500 to-red-500",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn XP, maintain streaks, compete on leaderboards and unlock achievements",
    color: "from-yellow-500 to-amber-500",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
  },
  {
    icon: Play,
    title: "Video Lessons",
    description: "Chapter-wise video content with 3D visualizations and interactive simulations",
    color: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
];

const subjects = [
  {
    name: "Physics",
    icon: Atom,
    chapters: 23,
    totalChapters: 23,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
    borderColor: "border-blue-500/20",
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    chapters: 44,
    totalChapters: 44,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    iconColor: "text-purple-500",
    borderColor: "border-purple-500/20",
  },
  {
    name: "Biology",
    icon: Leaf,
    chapters: 38,
    totalChapters: 38,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    iconColor: "text-green-500",
    borderColor: "border-green-500/20",
  },
];

const stats = [
  { value: "10,000+", label: "Active Students", icon: Users },
  { value: "95%", label: "Success Rate", icon: TrendingUp },
  { value: "500+", label: "Expert Mentors", icon: GraduationCap },
  { value: "50,000+", label: "Practice Questions", icon: BookOpen },
];

const testimonials = [
  {
    name: "Priya Sharma",
    score: "NEET 2024 - AIR 156",
    avatar: "PS",
    content: "The AI-powered practice sessions helped me identify my weak areas. The mock tests were exactly like the real exam!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    score: "NEET 2024 - AIR 342",
    avatar: "RV",
    content: "The gamification kept me motivated throughout my preparation. Competing on leaderboards made studying fun!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    score: "NEET 2024 - AIR 89",
    avatar: "AP",
    content: "1-on-1 mentor sessions cleared all my doubts. The video lessons with 3D visualizations made concepts crystal clear.",
    rating: 5,
  },
];

function LiveStatsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const liveStats = [
    { label: "Students Online", value: "2,847", icon: Users, color: "text-emerald-500" },
    { label: "Questions Solved Today", value: "48,392", icon: Target, color: "text-blue-500" },
    { label: "Active Streaks", value: "1,256", icon: Flame, color: "text-orange-500" },
    { label: "Tests Completed", value: "892", icon: Trophy, color: "text-purple-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [liveStats.length]);

  const currentStat = liveStats[currentIndex];
  const Icon = currentStat.icon;

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2"
      data-testid="live-stats-ticker"
    >
      <div className={`p-1.5 rounded-full bg-background ${currentStat.color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-bold ${currentStat.color}`}>{currentStat.value}</span>
        <span className="text-muted-foreground text-sm">{currentStat.label}</span>
      </div>
      <div className="flex gap-1 ml-2">
        {liveStats.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all ${
              i === currentIndex ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              NP
            </div>
            <span className="font-bold text-xl hidden sm:block">NEET Prep</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/enroll" className="text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#syllabus" className="text-muted-foreground hover:text-foreground transition-colors">
              Syllabus
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button data-testid="button-signup-header">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 gradient-mesh-bg" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex justify-center mb-6">
                <LiveStatsTicker />
              </div>

              <Badge className="mb-6 px-4 py-1.5" variant="secondary" data-testid="badge-hero">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                India's Most Advanced NEET Prep Platform
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-headline">
                Crack NEET with{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-subheadline">
                Experience personalized learning with adaptive AI, expert mentors, 
                gamified progress tracking, and 50,000+ practice questions. 
                Join 10,000+ aspirants achieving their medical dreams.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/signup">
                  <Button size="lg" className="gap-2 text-base px-8" data-testid="button-start-learning">
                    <GraduationCap className="h-5 w-5" />
                    Start Learning Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/enroll">
                  <Button size="lg" variant="outline" className="gap-2 text-base px-8" data-testid="button-explore-content">
                    <BookOpen className="h-5 w-5" />
                    Explore Content
                  </Button>
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              >
                {[
                  { icon: BookOpen, value: "50K+", label: "Questions" },
                  { icon: Target, value: "100+", label: "Mock Tests" },
                  { icon: Play, value: "500+", label: "Video Lessons" },
                  { icon: Award, value: "3D", label: "Visualizations" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
                    data-testid={`stat-hero-${index}`}
                  >
                    <stat.icon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4" variant="outline" data-testid="badge-features">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-features-title">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform combines cutting-edge AI technology with proven 
                teaching methods to maximize your NEET preparation.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50" data-testid={`card-feature-${index}`}>
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                        <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="syllabus" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4" variant="outline" data-testid="badge-syllabus">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                Complete Syllabus
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-syllabus-title">
                Comprehensive{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
                  NEET Coverage
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete coverage of Class 11 and Class 12 syllabus as per the latest NTA guidelines. 
                Every chapter, every concept, every question type covered.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className={`h-full hover:shadow-lg transition-all duration-300 ${subject.borderColor} border-2`} data-testid={`card-subject-${subject.name.toLowerCase()}`}>
                    <CardHeader className="pb-4">
                      <div className={`w-14 h-14 rounded-2xl ${subject.bgColor} flex items-center justify-center mb-4`}>
                        <subject.icon className={`h-7 w-7 ${subject.iconColor}`} />
                      </div>
                      <CardTitle className="text-2xl flex items-center justify-between">
                        {subject.name}
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Chapters Available</span>
                        <span className="font-semibold">{subject.chapters}/{subject.totalChapters}</span>
                      </div>
                      <Progress value={(subject.chapters / subject.totalChapters) * 100} className="h-2" />
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary" className="text-xs">Class 11</Badge>
                        <Badge variant="secondary" className="text-xs">Class 12</Badge>
                        <Badge variant="secondary" className="text-xs">PYQs</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mt-10"
            >
              <Link href="/enroll">
                <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-syllabus">
                  View Complete Syllabus
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4" variant="outline" data-testid="badge-stats">
                <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                Our Impact
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-stats-title">
                Trusted by{" "}
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Thousands
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join the community of successful NEET aspirants who achieved their dreams with our platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border/50"
                  data-testid={`stat-impact-${index}`}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4" variant="outline" data-testid="badge-testimonials">
                <Star className="h-3.5 w-3.5 mr-1.5" />
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
                What Our{" "}
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Toppers Say
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real stories from students who cracked NEET with our platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300" data-testid={`card-testimonial-${index}`}>
                    <CardContent className="pt-6">
                      <Quote className="h-8 w-8 text-primary/30 mb-4" />
                      <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.score}</div>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <Badge className="mb-6" data-testid="badge-cta">
                <Flame className="h-3.5 w-3.5 mr-1.5" />
                Start Today
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-cta-title">
                Ready to Begin Your{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  NEET Journey?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of students already preparing for NEET with our AI-powered platform. 
                Start free today and see the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="gap-2 text-base px-10" data-testid="button-cta-signup">
                    <GraduationCap className="h-5 w-5" />
                    Create Free Account
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/enroll">
                  <Button size="lg" variant="outline" className="gap-2 text-base px-10" data-testid="button-cta-explore">
                    Learn More
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No credit card required • Free forever plan available
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                  NP
                </div>
                <span className="font-bold text-xl">NEET Prep</span>
              </div>
              <p className="text-sm text-muted-foreground">
                India's most advanced AI-powered platform for NEET preparation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Subjects</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/physics" className="hover:text-foreground transition-colors">Physics</Link></li>
                <li><Link href="/chemistry" className="hover:text-foreground transition-colors">Chemistry</Link></li>
                <li><Link href="/biology" className="hover:text-foreground transition-colors">Biology</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/mock-tests" className="hover:text-foreground transition-colors">Mock Tests</Link></li>
                <li><Link href="/flashcards" className="hover:text-foreground transition-colors">Flashcards</Link></li>
                <li><Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/signup" className="hover:text-foreground transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-foreground transition-colors">Log In</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} NEET Prep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
