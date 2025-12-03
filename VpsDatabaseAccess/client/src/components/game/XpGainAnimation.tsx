import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface XpGainAnimationProps {
  amount: number;
  trigger: boolean;
  onComplete?: () => void;
}

export function XpGainAnimation({ amount, trigger, onComplete }: XpGainAnimationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -100, scale: 1 }}
          exit={{ opacity: 0, y: -150, scale: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          data-testid="xp-gain-animation"
        >
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-2xl">
            <Star className="h-6 w-6 text-white fill-white" />
            <span className="text-2xl font-bold text-white">+{amount} XP</span>
            <Star className="h-6 w-6 text-white fill-white" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
