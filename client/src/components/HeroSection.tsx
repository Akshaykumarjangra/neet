import { Button } from "@/components/ui/button";
import { ArrowRight, Play, BookOpen, Target } from "lucide-react";
import heroImage from "@assets/generated_images/NEET_hero_banner_illustration_c5f7ea18.png";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onTakeMockTest?: () => void;
}

export function HeroSection({
  onGetStarted = () => console.log("Get Started clicked"),
  onTakeMockTest = () => console.log("Take Mock Test clicked"),
}: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden aurora-glow">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
      <img
        src={heroImage}
        alt="NEET Preparation"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 container mx-auto px-4 py-24 md:py-32 max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight float-gentle">
            Master NEET with
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Interactive Learning</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
            Experience 3D visualizations, comprehensive question banks, and personalized study paths. Track your progress with advanced analytics and achieve your NEET goals.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              onClick={onGetStarted}
              data-testid="button-get-started"
            >
              <BookOpen className="h-5 w-5" />
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background/10 backdrop-blur-md border-white/20 text-white hover:bg-background/20 gap-2"
              onClick={onTakeMockTest}
              data-testid="button-mock-test"
            >
              <Target className="h-5 w-5" />
              Take Mock Test
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-gray-200">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100+</div>
              <div className="text-sm text-gray-200">Mock Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-gray-200">3D Models</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
