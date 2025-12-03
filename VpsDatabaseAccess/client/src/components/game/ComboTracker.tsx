import { motion, AnimatePresence } from "framer-motion";
import { Zap, Flame, Star } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface ComboTrackerProps {
  currentCombo: number;
  maxCombo: number;
  onComboMilestone?: (combo: number) => void;
}

export function ComboTracker({ currentCombo, maxCombo, onComboMilestone }: ComboTrackerProps) {
  const [previousCombo, setPreviousCombo] = useState(currentCombo);
  const [showMilestone, setShowMilestone] = useState(false);

  useEffect(() => {
    if (currentCombo > previousCombo) {
      // Check for milestone combos (5, 10, 15, 20, etc.)
      if (currentCombo > 0 && currentCombo % 5 === 0) {
        setShowMilestone(true);
        onComboMilestone?.(currentCombo);
        
        // Epic confetti for milestone
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.4 },
          colors: ["#f59e0b", "#ef4444", "#ec4899"],
        });

        setTimeout(() => setShowMilestone(false), 2000);
      }
    }
    setPreviousCombo(currentCombo);
  }, [currentCombo, previousCombo, onComboMilestone]);

  const getComboColor = () => {
    if (currentCombo >= 20) return "from-red-500 via-orange-500 to-yellow-500";
    if (currentCombo >= 15) return "from-purple-500 via-pink-500 to-red-500";
    if (currentCombo >= 10) return "from-blue-500 via-purple-500 to-pink-500";
    if (currentCombo >= 5) return "from-cyan-500 via-blue-500 to-purple-500";
    return "from-gray-400 to-gray-500";
  };

  const getComboLabel = () => {
    if (currentCombo >= 20) return "LEGENDARY!";
    if (currentCombo >= 15) return "UNSTOPPABLE!";
    if (currentCombo >= 10) return "ON FIRE!";
    if (currentCombo >= 5) return "HEATING UP!";
    return "COMBO";
  };

  if (currentCombo === 0) return null;

  return (
    <>
      <motion.div
        initial={{ scale: 0, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: -50 }}
        className="fixed top-24 right-8 z-40"
        data-testid="combo-tracker"
      >
        <motion.div
          animate={{
            scale: currentCombo > previousCombo ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`relative p-4 rounded-xl bg-gradient-to-r ${getComboColor()} shadow-2xl`}
        >
          {/* Pulse Effect */}
          <motion.div
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getComboColor()}`}
          />

          <div className="relative flex items-center gap-3">
            <div className="flex flex-col items-center">
              {currentCombo >= 10 ? (
                <Flame className="h-8 w-8 text-white" />
              ) : currentCombo >= 5 ? (
                <Zap className="h-8 w-8 text-white" />
              ) : (
                <Star className="h-6 w-6 text-white" />
              )}
            </div>

            <div className="text-white">
              <p className="text-xs font-semibold uppercase tracking-wide">
                {getComboLabel()}
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold">{currentCombo}x</p>
                <p className="text-sm opacity-80">Combo</p>
              </div>
              <p className="text-xs opacity-80">
                Best: {maxCombo}x
              </p>
            </div>
          </div>

          {/* Particle Effects */}
          {currentCombo >= 5 && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-20, -60],
                    x: [0, (i - 1) * 20],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-white"
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Milestone Popup */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            data-testid="combo-milestone"
          >
            <div className={`px-8 py-6 rounded-2xl bg-gradient-to-r ${getComboColor()} shadow-2xl`}>
              <div className="flex items-center gap-4">
                <Flame className="h-12 w-12 text-white" />
                <div className="text-white">
                  <p className="text-lg font-semibold uppercase tracking-wide">
                    {currentCombo}x COMBO!
                  </p>
                  <p className="text-3xl font-bold">MILESTONE!</p>
                </div>
                <Flame className="h-12 w-12 text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
