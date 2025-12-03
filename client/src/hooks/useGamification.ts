
import { useState, useEffect } from 'react';

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

const POINTS_PER_LEVEL = 1000;
const STORAGE_KEY = 'neet-gamification';

export function useGamification() {
  const [gamification, setGamification] = useState<GamificationData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      points: 0,
      level: 1,
      streak: 0,
      lastActivity: new Date().toISOString().split('T')[0],
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gamification));
  }, [gamification]);

  const addPoints = (points: number, isCorrect: boolean = true) => {
    setGamification(prev => {
      const newPoints = prev.points + points;
      const oldLevel = prev.level;
      const newLevel = Math.floor(newPoints / POINTS_PER_LEVEL) + 1;
      
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
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = new Date(gamification.lastActivity);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

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
  };

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
