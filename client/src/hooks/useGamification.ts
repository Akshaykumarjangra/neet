
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from "@/hooks/useAuth";

interface GamificationData {
  points: number;
  level: number;
  streak: number;
  lastActivity: string;
  totalQuestionsAnswered: number;
  correctAnswers: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

const STORAGE_KEY = 'neet-gamification';

const XP_PER_LEVEL_UNIT = 100; // matches server: level n needs 100*n XP

const getTotalXpForLevel = (level: number) => {
  // Sum of arithmetic series: 100 * n(n+1)/2
  return XP_PER_LEVEL_UNIT * (level * (level + 1)) / 2;
};

const getLevelFromXp = (xp: number) => {
  let level = 1;
  while (xp >= getTotalXpForLevel(level + 1)) {
    level++;
  }
  return level;
};

export function useGamification() {
  const { user, refetch: refetchAuth } = useAuth();
  const [gamification, setGamification] = useState<GamificationData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      points: user?.totalPoints ?? 0,
      level: user?.currentLevel ?? 1,
      streak: user?.studyStreak ?? 0,
      lastActivity: new Date().toISOString().split('T')[0],
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
    };
  });

  // Keep local state in sync with authenticated user stats
  useEffect(() => {
    if (!user) return;
    setGamification(prev => ({
      ...prev,
      points: user.totalPoints ?? 0,
      level: user.currentLevel ?? getLevelFromXp(user.totalPoints ?? 0),
      streak: user.studyStreak ?? 0,
      lastActivity: prev.lastActivity || new Date().toISOString().split('T')[0],
    }));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gamification));
  }, [gamification]);

  const addPoints = useCallback(async (points: number, isCorrect: boolean = true) => {
    if (user?.id) {
      try {
        const res = await fetch("/api/gamification/award-xp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userId: user.id,
            amount: points,
            source: { type: "question", description: isCorrect ? "Question correct" : "Practice XP" },
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setGamification(prev => ({
            ...prev,
            points: data.newXp ?? prev.points + points,
            level: data.newLevel ?? getLevelFromXp((data.newXp ?? prev.points + points)),
            totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
            correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
          }));
          // refresh auth cache so UI badges stay current
          refetchAuth();
          return;
        }
      } catch (err) {
        console.warn("Failed to persist XP, falling back to local only", err);
      }
    }

    // Local fallback
    setGamification(prev => {
      const newPoints = prev.points + points;
      const oldLevel = prev.level;
      const newLevel = getLevelFromXp(newPoints);
      
      // Check for level up
      if (newLevel > oldLevel) {
        // Trigger level up notification
        setTimeout(() => {
          const event = new CustomEvent('levelUp', { detail: { level: newLevel } });
          window.dispatchEvent(event);
        }, 500);
      }

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      };
    });
  }, [user, refetchAuth]);

  const updateStreak = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = new Date(gamification.lastActivity);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (user?.id) {
      try {
        const res = await fetch("/api/gamification/update-streak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId: user.id }),
        });
        if (res.ok) {
          const data = await res.json();
          setGamification(prev => ({
            ...prev,
            streak: data.streak ?? prev.streak,
            lastActivity: today,
          }));
          refetchAuth();
          return;
        }
      } catch (err) {
        console.warn("Failed to persist streak, falling back to local only", err);
      }
    }

    setGamification(prev => {
      if (prev.lastActivity === today) {
        return prev;
      }
      
      if (prev.lastActivity === yesterdayStr) {
        return {
          ...prev,
          streak: prev.streak + 1,
          lastActivity: today,
        };
      }
      
      return {
        ...prev,
        streak: 1,
        lastActivity: today,
      };
    });
  }, [gamification.lastActivity, user, refetchAuth]);

  const resetStreak = () => {
    setGamification(prev => ({
      ...prev,
      streak: 0,
    }));
  };

  return {
    points: gamification.points,
    level: gamification.level,
    streak: gamification.streak,
    addPoints,
    updateStreak,
    resetStreak,
  };
}
