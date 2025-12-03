import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Sparkles, Zap, Star, Lock } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

interface LootCrateProps {
  rarity: "common" | "rare" | "epic" | "legendary";
  isLocked?: boolean;
  onOpen: () => void;
  children?: React.ReactNode;
}

const rarityConfig = {
  common: {
    color: "from-gray-400 to-gray-500",
    borderColor: "border-gray-400",
    glowColor: "shadow-gray-400/50",
    label: "Common",
    stars: 1,
  },
  rare: {
    color: "from-blue-400 to-blue-600",
    borderColor: "border-blue-400",
    glowColor: "shadow-blue-400/50",
    label: "Rare",
    stars: 2,
  },
  epic: {
    color: "from-purple-400 to-purple-600",
    borderColor: "border-purple-400",
    glowColor: "shadow-purple-400/50",
    label: "Epic",
    stars: 3,
  },
  legendary: {
    color: "from-yellow-400 to-orange-500",
    borderColor: "border-yellow-400",
    glowColor: "shadow-yellow-400/50",
    label: "Legendary",
    stars: 4,
  },
};

export function LootCrate({ rarity, isLocked = false, onOpen, children }: LootCrateProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const config = rarityConfig[rarity];

  const handleOpen = () => {
    if (isLocked || isOpened) return;

    setIsOpening(true);

    // Epic opening animation with confetti
    const colors = rarity === "legendary" 
      ? ["#fbbf24", "#f59e0b", "#ef4444"]
      : rarity === "epic"
      ? ["#a855f7", "#ec4899", "#3b82f6"]
      : rarity === "rare"
      ? ["#3b82f6", "#60a5fa", "#93c5fd"]
      : ["#9ca3af", "#d1d5db", "#e5e7eb"];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      setIsOpened(true);
      setIsOpening(false);
      onOpen();
    }, 1000);
  };

  return (
    <div className="relative" data-testid={`loot-crate-${rarity}`}>
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="crate"
            initial={{ scale: 1 }}
            animate={isOpening ? {
              scale: [1, 1.1, 0.9, 1.2, 0],
              rotate: [0, -5, 5, -5, 0],
            } : {
              scale: 1,
              y: [0, -10, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={isOpening ? {
              duration: 1,
              times: [0, 0.2, 0.5, 0.8, 1],
            } : {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Card 
              className={`glass-panel border-4 ${config.borderColor} ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-2xl'} ${config.glowColor} transition-all`}
              onClick={handleOpen}
            >
              <CardContent className="p-8 text-center space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className={`mx-auto w-24 h-24 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center relative`}
                >
                  {isLocked ? (
                    <Lock className="h-12 w-12 text-white" />
                  ) : (
                    <Package className="h-12 w-12 text-white" />
                  )}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl"
                  />
                </motion.div>

                <div>
                  <Badge className={`bg-gradient-to-r ${config.color} text-white border-none mb-2`}>
                    <Sparkles className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(config.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>

                {!isLocked && (
                  <Button 
                    className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 text-white border-none`}
                    size="lg"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Open Crate
                  </Button>
                )}

                {isLocked && (
                  <p className="text-sm text-muted-foreground">
                    Complete previous challenges to unlock
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
