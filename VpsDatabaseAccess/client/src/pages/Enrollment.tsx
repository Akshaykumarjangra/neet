import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Trophy, Zap, BookOpen, Target, Award, Users, Atom, Dna, Brain, Rocket, Sparkles, Play, ChevronRight, Medal, Flame, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Enrollment() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });

  const features = [
    {
      icon: BookOpen,
      title: "98 NCERT Chapters",
      description: "Complete NEET syllabus coverage with detailed notes, concepts, formulas, and objectives",
      color: "from-purple-500 to-violet-600",
      demo: "/library"
    },
    {
      icon: Trophy,
      title: "61 Mock Tests",
      description: "Chapter-specific, topic-wise, and full-length NEET pattern tests with analytics",
      color: "from-pink-500 to-rose-600",
      demo: "/mock-tests"
    },
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "Sequential chapter unlock system with 4-component mastery tracking",
      color: "from-cyan-500 to-blue-600",
      demo: "/learning-path"
    },
    {
      icon: Zap,
      title: "Daily Challenges",
      description: "14 rotating challenge types with XP rewards and streak tracking",
      color: "from-amber-500 to-orange-600",
      demo: "/"
    },
    {
      icon: Award,
      title: "45 Achievements",
      description: "Unlock achievements across 10 categories with rarity-based XP rewards",
      color: "from-emerald-500 to-green-600",
      demo: "/achievements"
    },
    {
      icon: Users,
      title: "Live Leaderboards",
      description: "Compete with students nationwide with real-time rankings",
      color: "from-indigo-500 to-purple-600",
      demo: "/leaderboard"
    },
    {
      icon: Atom,
      title: "3D Visualizations",
      description: "Interactive Three.js models for atomic structure, waves, and molecular bonds",
      color: "from-violet-500 to-purple-600",
      demo: "/chapter/Physics/11/1"
    },
    {
      icon: Dna,
      title: "AI Study Assistant",
      description: "OpenAI-powered personalized recommendations and doubt solving",
      color: "from-fuchsia-500 to-pink-600",
      demo: "/practice"
    },
  ];

  const stats = [
    { label: "NCERT Chapters", value: "98", icon: BookOpen, color: "text-purple-600" },
    { label: "Mock Tests", value: "61", icon: Trophy, color: "text-pink-600" },
    { label: "Achievements", value: "45", icon: Medal, color: "text-cyan-600" },
    { label: "Daily Challenges", value: "14", icon: Flame, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Gradient Hero */}
      <div className="relative overflow-hidden gradient-mesh-bg">
        <div className="absolute inset-0 aurora-glow opacity-30" />
        
        <div className="container mx-auto px-4 py-20 relative z-10" ref={heroRef}>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={isHeroInView ? { scale: 1 } : {}}
              transition={prefersReducedMotion ? {} : { delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none text-sm px-6 py-2 shadow-lg">
                <Sparkles className="h-4 w-4 mr-2 inline" />
                ₹500/Year - Limited Time Offer
              </Badge>
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0 : 0.6 }}
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent"
            >
              Master NEET with
              <br />
              AI-Powered Learning
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Complete NEET preparation platform with <span className="font-semibold text-foreground">98 NCERT chapters</span>, 
              <span className="font-semibold text-foreground"> 61 mock tests</span>, adaptive learning paths, and 
              <span className="font-semibold text-foreground"> PUBG-style gamification</span>
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: prefersReducedMotion ? 0 : 0.7, duration: prefersReducedMotion ? 0 : 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 shadow-xl glow-halo group" data-testid="button-get-started">
                  <Rocket className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Get Started Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 glass-panel" data-testid="button-view-demo">
                <Play className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </motion.div>

            {/* Live Stats Counter */}
            <motion.div
              ref={statsRef}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: prefersReducedMotion ? 0 : 0.9, duration: prefersReducedMotion ? 0 : 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.9 + index * 0.1, duration: prefersReducedMotion ? 0 : 0.3 }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  className="glass-panel p-6 rounded-2xl hover-elevate"
                >
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Features Showcase */}
      <div className="container mx-auto px-4 py-20" ref={featuresRef}>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Ace NEET</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive learning meets competitive gaming in India's most advanced NEET prep platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: prefersReducedMotion ? 0 : 0.3 }}
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                data-testid={`feature-${index}`}
              >
                <Link href={feature.demo}>
                  <Card className={`h-full glass-panel hover-elevate active-elevate-2 transition-all cursor-pointer overflow-visible ${
                    hoveredFeature === index ? 'glow-halo ring-2 ring-primary/20' : ''
                  }`}>
                    <CardHeader className="pb-3">
                      <motion.div
                        animate={prefersReducedMotion ? {} : (hoveredFeature === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 })}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                        className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-4 shadow-lg`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl flex items-center justify-between">
                        {feature.title}
                        <ChevronRight className={`h-5 w-5 transition-transform ${
                          hoveredFeature === index ? 'translate-x-1' : ''
                        }`} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                      {hoveredFeature === index && (
                        <motion.div
                          initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                          className="mt-4 pt-4 border-t border-border/50"
                        >
                          <Badge variant="secondary" className="text-xs">
                            Click to explore →
                          </Badge>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing Card - Centered & Prominent */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={isFeaturesInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="glass-panel-strong shadow-2xl glow-halo-strong overflow-visible relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-none px-6 py-2 text-sm shadow-xl sparkle">
                Best Value
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-4 pt-8">
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
                transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 3 }}
                className="flex justify-center mb-6"
              >
                <div className="p-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-2xl">
                  <Star className="h-16 w-16 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-4xl font-bold mb-2">1 Year Full Access</CardTitle>
              <CardDescription className="text-lg">Everything you need to ace NEET 2025</CardDescription>
            </CardHeader>

            <CardContent className="text-center px-8 pb-8">
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹500
                </div>
                <span className="text-muted-foreground text-lg">per year</span>
                <div className="text-sm text-muted-foreground mt-2">
                  That's just <span className="font-semibold text-foreground">₹1.37/day</span>
                </div>
              </div>
              
              <div className="space-y-3 text-left mb-8 glass-panel p-6 rounded-xl">
                {[
                  "98 complete NCERT chapters with notes",
                  "61 comprehensive mock tests",
                  "AI-powered adaptive learning paths",
                  "3D visualizations for complex concepts",
                  "45 achievements & gamification system",
                  "Live leaderboards & competitions",
                  "Daily challenges with XP rewards",
                  "Library with bookmarks & notes"
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: prefersReducedMotion ? 0 : 1 + i * 0.1, duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="glass-panel p-6 rounded-xl mb-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                <p className="text-sm font-semibold mb-3 flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  Easy UPI Payment:
                </p>
                <div className="bg-background px-4 py-3 rounded-lg font-mono text-lg font-bold border-2 border-dashed border-purple-300 dark:border-purple-700">
                  zero.ai.info@paytm
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Send ₹500 and share screenshot with your email to get instant access
                </p>
              </div>

              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white text-lg py-6 shadow-xl group"
                  data-testid="button-enroll-now"
                >
                  <Rocket className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Enroll Now & Start Learning
                </Button>
              </Link>
              
              <p className="text-xs text-muted-foreground mt-4">
                * OpenAI API tokens charged separately based on usage
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Section */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: prefersReducedMotion ? 0 : 0.3 }}
          className="max-w-2xl mx-auto mt-16"
        >
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-primary" />
                For Educators & Institutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Bulk enrollment available for coaching institutes and schools. Admins can grant free access to students while managing OpenAI token usage separately.
              </p>
              <div className="flex gap-3">
                <Link href="/login">
                  <Button variant="outline" className="glass-panel" data-testid="button-admin-login">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="glass-panel" data-testid="button-educator-signup">
                    Educator Signup
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 py-16 overflow-hidden">
        <div className="absolute inset-0 aurora-glow opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your NEET Preparation?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already using AI-powered learning to ace their medical entrance exams
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-2xl" data-testid="button-footer-cta">
                Start Your Journey Today
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
