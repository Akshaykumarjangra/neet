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
         try {
            const response = await fetch(`/api/questions?topicId=${topicId}`, {
               credentials: 'include',
            });
            
            if (!response.ok) {
               const errorData = await response.json().catch(() => ({}));
               throw new Error(errorData.error || `Failed to fetch questions: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Handle both array and object response formats
            let questions: Question[] = [];
            if (Array.isArray(data)) {
               questions = data;
            } else if (data && typeof data === 'object') {
               // Check for questions array in response object
               if (Array.isArray(data.questions)) {
                  questions = data.questions;
               } else {
                  // If no questions array, return empty array
                  questions = [];
               }
            }
            
            // Shuffle questions for variety
            return questions.sort(() => Math.random() - 0.5);
         } catch (error) {
            console.error('Error fetching chapter questions:', error);
            // Return empty array on error instead of throwing
            // This allows the component to handle the error state gracefully
            return [];
         }
      },
      enabled: !!topicId && topicId > 0,
      staleTime: 5 * 60 * 1000, // 5 minutes
   });
}
