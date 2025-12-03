import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Zap, Lock } from "lucide-react";
import confetti from "canvas-confetti";

interface DropIntoChapterProps {
  subject: string;
  icon: React.ElementType;
  chapters: number;
  iconColor: string;
  isUnlocked?: boolean;
  onDrop: () => void;
}

export function DropIntoChapter({
  subject,
  icon: Icon,
  chapters,
  iconColor,
  isUnlocked = true,
  onDrop,
}: DropIntoChapterProps) {
  const handleDrop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isUnlocked) return;

    console.log(`Dropping into ${subject}`);

    // Epic confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#ec4899", "#3b82f6", "#10b981"],
    });

    // Navigate after short delay
    setTimeout(onDrop, 300);
  };

  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      data-testid={`drop-chapter-${subject.toLowerCase()}`}
      onClick={handleDrop}
      role="button"
      tabIndex={isUnlocked ? 0 : -1}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (isUnlocked && (e.key === 'Enter' || e.key === ' ')) {
          handleDrop(e as any);
        }
      }}
    >
      <Card
        className={`relative overflow-hidden transition-all ${isUnlocked
          ? "glass-panel glow-halo hover:shadow-2xl cursor-pointer"
          : "opacity-60 cursor-not-allowed"
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${iconColor}`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{subject}</h3>
              <p className="text-sm text-muted-foreground">{chapters} Chapters</p>
            </div>
            {!isUnlocked && (
              <div className="p-2 rounded-lg bg-muted">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>



          {!isUnlocked && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">Complete Prerequisites</span>
            </div>
          )}

          {isUnlocked && (
            <div className="mt-3 flex gap-2">
              <Badge variant="secondary" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Hot
              </Badge>
              <Badge variant="outline" className="text-xs">
                Active Players: {Math.floor(Math.random() * 500 + 100)}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
