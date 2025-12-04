import { Router, Request, Response } from "express";
import { db } from "./db";
import { questions, contentTopics, formulas, keypoints } from "@shared/schema";
import { sql, ilike, or, eq, and } from "drizzle-orm";

const router = Router();

interface SearchResult {
  type: "question" | "topic" | "formula" | "keypoint";
  id: number;
  title: string;
  snippet: string;
  subject: string;
  relevanceScore: number;
  metadata?: Record<string, any>;
}

function createSnippet(text: string, query: string, maxLength: number = 150): string {
  if (!text) return "";
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const queryIndex = lowerText.indexOf(lowerQuery);
  
  if (queryIndex === -1) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }
  
  const start = Math.max(0, queryIndex - 40);
  const end = Math.min(text.length, queryIndex + query.length + 80);
  let snippet = text.substring(start, end);
  
  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";
  
  return snippet;
}

function calculateRelevance(text: string, query: string): number {
  if (!text || !query) return 0;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  if (lowerText === lowerQuery) return 100;
  if (lowerText.startsWith(lowerQuery)) return 90;
  
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 0);
  let matchCount = 0;
  for (const word of queryWords) {
    if (lowerText.includes(word)) matchCount++;
  }
  
  const wordMatchScore = (matchCount / queryWords.length) * 70;
  const positionBonus = lowerText.indexOf(lowerQuery) === 0 ? 20 : 0;
  
  return Math.round(wordMatchScore + positionBonus);
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const { q, type = "all", subject, limit = "20" } = req.query;
    
    if (!q || typeof q !== "string" || q.trim().length < 2) {
      return res.json({ 
        results: [], 
        total: 0,
        message: "Search query must be at least 2 characters" 
      });
    }
    
    const searchQuery = q.trim();
    const searchPattern = `%${searchQuery}%`;
    const maxResults = Math.min(parseInt(limit as string) || 20, 100);
    const searchType = type as string;
    
    const results: SearchResult[] = [];
    
    if (searchType === "all" || searchType === "questions") {
      const questionColumns = {
        id: questions.id,
        questionText: questions.questionText,
        solutionDetail: questions.solutionDetail,
        topicId: questions.topicId,
        difficultyLevel: questions.difficultyLevel,
        topicSubject: contentTopics.subject,
        topicName: contentTopics.topicName,
      };
      
      let questionQuery = db
        .select(questionColumns)
        .from(questions)
        .leftJoin(contentTopics, eq(questions.topicId, contentTopics.id))
        .where(
          or(
            ilike(questions.questionText, searchPattern),
            ilike(questions.solutionDetail, searchPattern)
          )
        )
        .limit(searchType === "all" ? Math.ceil(maxResults / 4) : maxResults);
      
      if (subject && typeof subject === "string") {
        questionQuery = db
          .select(questionColumns)
          .from(questions)
          .leftJoin(contentTopics, eq(questions.topicId, contentTopics.id))
          .where(
            and(
              eq(contentTopics.subject, subject),
              or(
                ilike(questions.questionText, searchPattern),
                ilike(questions.solutionDetail, searchPattern)
              )
            )
          )
          .limit(searchType === "all" ? Math.ceil(maxResults / 4) : maxResults);
      }
      
      const questionResults = await questionQuery;
      
      for (const row of questionResults) {
        const relevance = calculateRelevance(row.questionText + " " + (row.solutionDetail || ""), searchQuery);
        
        results.push({
          type: "question",
          id: row.id,
          title: row.questionText.length > 100 ? row.questionText.substring(0, 100) + "..." : row.questionText,
          snippet: createSnippet(row.solutionDetail || row.questionText, searchQuery),
          subject: row.topicSubject || "Unknown",
          relevanceScore: relevance,
          metadata: {
            topicId: row.topicId,
            topicName: row.topicName,
            difficulty: row.difficultyLevel,
          },
        });
      }
    }
    
    if (searchType === "all" || searchType === "topics") {
      const topicColumns = {
        id: contentTopics.id,
        topicName: contentTopics.topicName,
        subject: contentTopics.subject,
        classLevel: contentTopics.classLevel,
        ncertChapter: contentTopics.ncertChapter,
      };
      
      let topicQuery = db
        .select(topicColumns)
        .from(contentTopics)
        .where(
          or(
            ilike(contentTopics.topicName, searchPattern),
            ilike(contentTopics.ncertChapter, searchPattern)
          )
        )
        .limit(searchType === "all" ? Math.ceil(maxResults / 4) : maxResults);
      
      if (subject && typeof subject === "string") {
        topicQuery = db
          .select(topicColumns)
          .from(contentTopics)
          .where(
            and(
              eq(contentTopics.subject, subject),
              or(
                ilike(contentTopics.topicName, searchPattern),
                ilike(contentTopics.ncertChapter, searchPattern)
              )
            )
          )
          .limit(searchType === "all" ? Math.ceil(maxResults / 4) : maxResults);
      }
      
      const topicResults = await topicQuery;
      
      for (const t of topicResults) {
        const relevance = calculateRelevance(t.topicName, searchQuery);
        
        results.push({
          type: "topic",
          id: t.id,
          title: t.topicName,
          snippet: t.ncertChapter || `${t.subject} - Class ${t.classLevel}`,
          subject: t.subject,
          relevanceScore: relevance,
          metadata: {
            classLevel: t.classLevel,
            ncertChapter: t.ncertChapter,
          },
        });
      }
    }
    
    if (searchType === "all" || searchType === "formulas") {
      const formulaColumns = {
        id: formulas.id,
        name: formulas.name,
        latexFormula: formulas.latexFormula,
        plainFormula: formulas.plainFormula,
        subject: formulas.subject,
        unit: formulas.unit,
        isHighYield: formulas.isHighYield,
      };
      
      let formulaQuery = db
        .select(formulaColumns)
        .from(formulas)
        .where(
          or(
            ilike(formulas.name, searchPattern),
            ilike(formulas.latexFormula, searchPattern),
            ilike(formulas.plainFormula, searchPattern)
          )
        )
        .limit(searchType === "all" ? Math.ceil(maxResults / 4) : maxResults);
      
      if (subject && typeof subject === "string") {
        formulaQuery = db
          .select(formulaColumns)
          .from(formulas)
          .where(
            and(
              eq(formulas.subject, subject),
              or(
                ilike(formulas.name, searchPattern),
                ilike(formulas.latexFormula, searchPattern),
                ilike(formulas.plainFormula, searchPattern)
              )
            )
          )
          .limit(searchType === "all" ? Math.ceil(maxResults / 4) : maxResults);
      }
      
      const formulaResults = await formulaQuery;
      
      for (const f of formulaResults) {
        const relevance = calculateRelevance(f.name + " " + (f.plainFormula || ""), searchQuery);
        
        results.push({
          type: "formula",
          id: f.id,
          title: f.name,
          snippet: f.plainFormula || f.latexFormula,
          subject: f.subject,
          relevanceScore: relevance,
          metadata: {
            latexFormula: f.latexFormula,
            unit: f.unit,
            isHighYield: f.isHighYield,
          },
        });
      }
    }
    
    if (searchType === "all" || searchType === "keypoints") {
      const keypointColumns = {
        id: keypoints.id,
        title: keypoints.title,
        content: keypoints.content,
        subject: keypoints.subject,
        category: keypoints.category,
        isHighYield: keypoints.isHighYield,
        neetFrequency: keypoints.neetFrequency,
      };
      
      let keypointQuery = db
        .select(keypointColumns)
        .from(keypoints)
        .where(
          or(
            ilike(keypoints.title, searchPattern),
            ilike(keypoints.content, searchPattern)
          )
        )
        .limit(searchType === "all" ? Math.ceil(maxResults / 4) : maxResults);
      
      if (subject && typeof subject === "string") {
        keypointQuery = db
          .select(keypointColumns)
          .from(keypoints)
          .where(
            and(
              eq(keypoints.subject, subject),
              or(
                ilike(keypoints.title, searchPattern),
                ilike(keypoints.content, searchPattern)
              )
            )
          )
          .limit(searchType === "all" ? Math.ceil(maxResults / 4) : maxResults);
      }
      
      const keypointResults = await keypointQuery;
      
      for (const k of keypointResults) {
        const relevance = calculateRelevance(k.title + " " + k.content, searchQuery);
        
        results.push({
          type: "keypoint",
          id: k.id,
          title: k.title,
          snippet: createSnippet(k.content, searchQuery),
          subject: k.subject,
          relevanceScore: relevance,
          metadata: {
            category: k.category,
            isHighYield: k.isHighYield,
            neetFrequency: k.neetFrequency,
          },
        });
      }
    }
    
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    const finalResults = results.slice(0, maxResults);
    
    res.json({
      results: finalResults,
      total: finalResults.length,
      query: searchQuery,
      filters: {
        type: searchType,
        subject: subject || null,
        limit: maxResults,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search failed", message: (error as Error).message });
  }
});

router.get("/suggestions", async (req: Request, res: Response) => {
  try {
    const suggestions = [
      "Newton's laws of motion",
      "Photosynthesis",
      "Organic chemistry reactions",
      "Human digestive system",
      "Electromagnetic induction",
      "Cell structure",
      "Chemical bonding",
      "Genetics and inheritance",
      "Thermodynamics",
      "Plant anatomy",
    ];
    
    res.json({ suggestions });
  } catch (error) {
    console.error("Suggestions error:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

export default router;
