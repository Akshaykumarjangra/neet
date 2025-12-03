import { useQuery } from "@tanstack/react-query";
import type { Question } from "@shared/schema";

/**
 * Hook to fetch questions for a specific topic/chapter
 * @param topicId - The topic ID to fetch questions for
 * @returns Query result with questions array
 */
export function useChapterQuestions(topicId: number) {
   return useQuery<Question[]>({
      queryKey: ['/api/questions', 'topicId', topicId],
      queryFn: async () => {
         const response = await fetch(`/api/questions?topicId=${topicId}`);
         if (!response.ok) throw new Error('Failed to fetch questions');
         const data = await response.json();
         // Shuffle questions for variety
         return data.sort(() => Math.random() - 0.5);
      },
   });
}
