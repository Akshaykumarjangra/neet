import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Atom,
  Flame,
  Dna,
  Clock,
  Target,
  BookOpen,
  FileText,
  ClipboardCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Leaf,
  Bug,
} from "lucide-react";
import confetti from "canvas-confetti";

const PREFERENCES_KEY = "neet-user-preferences";

interface UserPreferences {
  subjects: string[];
  studyGoal: number;
  focusArea: string;
  onboardingCompleted: boolean;
  completedAt: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (preferences: UserPreferences) => void;
  userName?: string;
}

const subjects = [
  {
    id: "Physics",
    name: "Physics",
    icon: Atom,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500",
  },
  {
    id: "Chemistry",
    name: "Chemistry",
    icon: Flame,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500",
  },
  {
    id: "Botany",
    name: "Botany",
    icon: Leaf,
    color: "from-emerald-500 to-lime-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500",
  },
  {
    id: "Zoology",
    name: "Zoology",
    icon: Bug,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500",
  },
];

const studyGoals = [
  { id: 30, label: "30 mins", description: "Light study", icon: "🌱" },
  { id: 60, label: "1 hour", description: "Regular pace", icon: "📚" },
  { id: 120, label: "2 hours", description: "Focused study", icon: "🎯" },
  { id: 180, label: "3+ hours", description: "Intensive prep", icon: "🔥" },
];

const focusAreas = [
  {
    id: "weak-topics",
    name: "Weak Topics",
    description: "Focus on areas that need improvement",
    icon: Target,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "previous-year",
    name: "Previous Year Papers",
    description: "Practice with real NEET questions",
    icon: FileText,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "mock-tests",
    name: "Mock Tests",
    description: "Full-length exam simulations",
    icon: ClipboardCheck,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "balanced",
    name: "Balanced Approach",
    description: "Mix of all learning methods",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function OnboardingModal({
  isOpen,
  onClose,
  onComplete,
  userName = "Student",
}: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [studyGoal, setStudyGoal] = useState<number>(60);
  const [focusArea, setFocusArea] = useState<string>("balanced");

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    const preferences: UserPreferences = {
      subjects: selectedSubjects.length > 0 ? selectedSubjects : ["Physics", "Chemistry", "Botany", "Zoology"],
      studyGoal,
      focusArea,
      onboardingCompleted: true,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.4 },
      colors: ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"],
    });

    onComplete(preferences);
    onClose();
  };

  const handleSkip = () => {
    const defaultPreferences: UserPreferences = {
      subjects: ["Physics", "Chemistry", "Botany", "Zoology"],
      studyGoal: 60,
      focusArea: "balanced",
      onboardingCompleted: true,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
    onComplete(defaultPreferences);
    onClose();
  };

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((s) => s !== subjectId)
        : [...prev, subjectId]
    );
  };

  const canProceed = () => {
    if (step === 1) return selectedSubjects.length > 0;
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="welcome"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6 text-center"
          >
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Welcome, {userName}! 🎉
              </h2>
              <p className="text-muted-foreground mt-3 text-lg">
                Let's personalize your NEET preparation journey
              </p>
            </div>
            <div className="grid gap-3 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-500">1</span>
                </div>
                <span className="text-sm">Choose your subjects</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-pink-500">2</span>
                </div>
                <span className="text-sm">Set your daily study goal</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-cyan-500">3</span>
                </div>
                <span className="text-sm">Pick your focus area</span>
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="subjects"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold">Select Your Subjects</h2>
              <p className="text-muted-foreground mt-2">
                Which subjects do you want to focus on?
              </p>
            </div>
            <div className="grid gap-4">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const isSelected = selectedSubjects.includes(subject.id);
                return (
                  <motion.div
                    key={subject.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all ${
                        isSelected
                          ? `${subject.bgColor} ${subject.borderColor} border-2`
                          : "border-2 border-transparent hover:border-muted"
                      }`}
                      onClick={() => toggleSubject(subject.id)}
                      data-testid={`subject-${subject.id.toLowerCase()}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center`}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{subject.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              NCERT Class 11 & 12
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-5 w-5 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            {selectedSubjects.length === 0 && (
              <p className="text-sm text-center text-muted-foreground">
                Select at least one subject to continue
              </p>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="study-goal"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold">Daily Study Goal</h2>
              <p className="text-muted-foreground mt-2">
                How much time can you dedicate each day?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {studyGoals.map((goal) => {
                const isSelected = studyGoal === goal.id;
                return (
                  <motion.div
                    key={goal.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all text-center ${
                        isSelected
                          ? "bg-primary/10 border-2 border-primary"
                          : "border-2 border-transparent hover:border-muted"
                      }`}
                      onClick={() => setStudyGoal(goal.id)}
                      data-testid={`goal-${goal.id}`}
                    >
                      <div className="text-3xl mb-2">{goal.icon}</div>
                      <h3 className="font-bold text-lg">{goal.label}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>You can change this anytime in settings</span>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="focus-area"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold">Choose Your Focus</h2>
              <p className="text-muted-foreground mt-2">
                What's your primary preparation strategy?
              </p>
            </div>
            <div className="grid gap-3">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                const isSelected = focusArea === area.id;
                return (
                  <motion.div
                    key={area.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/10 border-2 border-primary"
                          : "border-2 border-transparent hover:border-muted"
                      }`}
                      onClick={() => setFocusArea(area.id)}
                      data-testid={`focus-${area.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{area.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {area.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[500px] p-0 gap-0 overflow-hidden"
        data-testid="onboarding-modal"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i <= step
                      ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
                      : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-skip-onboarding"
            >
              Skip
            </Button>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            {renderStep()}
          </AnimatePresence>
        </div>

        <div className="border-t p-4 bg-muted/30 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0}
            className="gap-2"
            data-testid="button-back"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {step < totalSteps - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              data-testid="button-next"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90"
              data-testid="button-complete-onboarding"
            >
              <Sparkles className="h-4 w-4" />
              Start Learning
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      } catch (e) {
        setPreferences(null);
      }
    }
  }, []);

  const isNewUser = !preferences?.onboardingCompleted;

  const triggerOnboarding = () => setShowOnboarding(true);
  const closeOnboarding = () => setShowOnboarding(false);

  const updatePreferences = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(newPrefs));
  };

  return {
    showOnboarding,
    setShowOnboarding,
    isNewUser,
    preferences,
    triggerOnboarding,
    closeOnboarding,
    updatePreferences,
  };
}

export function getStoredPreferences(): UserPreferences | null {
  const stored = localStorage.getItem(PREFERENCES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}
