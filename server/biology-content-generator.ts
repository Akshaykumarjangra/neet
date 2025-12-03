import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

interface ChapterContent {
  title: string;
  description: string;
  learningObjectives: string[];
  concepts: ConceptSection[];
  practiceQuestions: PracticeQuestion[];
}

interface ConceptSection {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  visualizationHint?: string;
}

interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// NCERT Botany Chapter Topics (Class XI & XII)
const BOTANY_CHAPTERS = {
  1: "The Living World - Diversity and Classification of Plants",
  2: "Biological Classification - Plant Kingdom",
  3: "Plant Kingdom - Algae, Bryophytes, Pteridophytes",
  4: "Plant Kingdom - Gymnosperms and Angiosperms",
  5: "Morphology of Flowering Plants",
  6: "Anatomy of Flowering Plants",
  7: "Structural Organisation in Animals (Skip - Zoology)",
  8: "Cell - The Unit of Life",
  9: "Biomolecules",
  10: "Cell Cycle and Cell Division",
  11: "Transport in Plants",
  12: "Mineral Nutrition",
  13: "Photosynthesis in Higher Plants",
  14: "Respiration in Plants",
  15: "Plant Growth and Development",
  16: "Reproduction in Organisms",
  17: "Sexual Reproduction in Flowering Plants",
  18: "Human Reproduction (Skip - Zoology)",
  19: "Reproductive Health (Skip - Zoology)",
  20: "Principles of Inheritance and Variation",
  21: "Molecular Basis of Inheritance",
  22: "Evolution",
  23: "Human Health and Disease (Skip - Zoology)",
  24: "Strategies for Enhancement in Food Production",
  25: "Microbes in Human Welfare",
  26: "Biotechnology - Principles and Processes",
  27: "Biotechnology and its Applications",
  28: "Organisms and Populations",
  29: "Ecosystem",
  30: "Biodiversity and Conservation",
  31: "Environmental Issues",
};

// NCERT Zoology Chapter Topics (Class XI & XII)
const ZOOLOGY_CHAPTERS = {
  1: "The Living World - Animal Diversity",
  2: "Biological Classification - Animal Kingdom",
  3: "Structural Organisation in Animals",
  4: "Animal Tissues",
  5: "Morphology of Animals - Body Forms",
  6: "Anatomy of Animals - Organ Systems",
  7: "Digestion and Absorption",
  8: "Breathing and Exchange of Gases",
  9: "Body Fluids and Circulation",
  10: "Excretory Products and their Elimination",
  11: "Locomotion and Movement",
  12: "Neural Control and Coordination",
  13: "Chemical Coordination and Integration",
  14: "Human Reproduction",
  15: "Reproductive Health",
  16: "Principles of Inheritance and Variation",
  17: "Molecular Basis of Inheritance",
  18: "Evolution",
  19: "Human Health and Disease",
  20: "Strategies for Enhancement in Food Production",
  21: "Microbes in Human Welfare",
  22: "Biotechnology - Principles and Processes",
  23: "Biotechnology and its Applications",
  24: "Organisms and Populations",
  25: "Ecosystem",
  26: "Biodiversity and Conservation",
  27: "Environmental Issues",
};

export class BiologyContentGenerator {
  async generateChapterContent(
    subject: "Botany" | "Zoology",
    chapterNumber: number
  ): Promise<ChapterContent> {
    const chapterMap = subject === "Botany" ? BOTANY_CHAPTERS : ZOOLOGY_CHAPTERS;
    const chapterTopic = chapterMap[chapterNumber as keyof typeof chapterMap];

    if (!chapterTopic) {
      throw new Error(`Chapter ${chapterNumber} not found for ${subject}`);
    }

    const prompt = `You are an expert NEET Biology educator creating educational content for ${subject} Chapter ${chapterNumber}: "${chapterTopic}".

Generate comprehensive educational content in the following JSON format:

{
  "title": "Chapter title",
  "description": "2-sentence overview of the chapter",
  "learningObjectives": ["objective 1", "objective 2", "objective 3", "objective 4"],
  "concepts": [
    {
      "id": "concept-1",
      "title": "Main Concept Title",
      "description": "Detailed explanation (2-3 sentences)",
      "keyPoints": ["point 1", "point 2", "point 3", "point 4"],
      "examples": ["example 1", "example 2"],
      "visualizationHint": "Description of what visual aid would be helpful (e.g., '3D cell diagram', 'flower parts illustration')"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "question": "NEET-style question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation of correct answer"
    }
  ]
}

Requirements:
- Generate 4-6 concept sections
- Each concept should have 4-5 key points
- Include 2-3 examples per concept
- Generate 5 NEET-style practice questions
- Ensure ALL content is strictly about ${subject} (${subject === "Botany" ? "PLANTS ONLY - no animal content" : "ANIMALS ONLY - no plant content"})
- Questions should be NEET exam difficulty level
- Include proper biological terminology
- Make explanations clear and student-friendly

Return ONLY valid JSON, no additional text.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert NEET Biology content creator. You generate accurate, comprehensive educational content that strictly adheres to subject boundaries (Botany = plants only, Zoology = animals only).`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("No content generated");
      }

      const parsedContent = JSON.parse(content);
      return parsedContent;
    } catch (error) {
      console.error(`Error generating content for ${subject} Chapter ${chapterNumber}:`, error);
      throw error;
    }
  }

  async generateAllBotanyChapters(): Promise<Map<number, ChapterContent>> {
    const chapters = new Map<number, ChapterContent>();
    const botanyChapterNumbers = Object.keys(BOTANY_CHAPTERS)
      .map(Number)
      .filter((n) => !BOTANY_CHAPTERS[n as keyof typeof BOTANY_CHAPTERS].includes("Skip"));

    console.log(`\n🌿 Generating content for ${botanyChapterNumbers.length} Botany chapters...\n`);

    for (const chapterNum of botanyChapterNumbers) {
      try {
        console.log(`  📖 Generating Botany Chapter ${chapterNum}...`);
        const content = await this.generateChapterContent("Botany", chapterNum);
        chapters.set(chapterNum, content);
        console.log(`  ✓ Completed: ${content.title}`);
        
        // Rate limiting - wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`  ✗ Failed: Chapter ${chapterNum}`, error);
      }
    }

    return chapters;
  }

  async generateAllZoologyChapters(): Promise<Map<number, ChapterContent>> {
    const chapters = new Map<number, ChapterContent>();
    const zoologyChapterNumbers = Object.keys(ZOOLOGY_CHAPTERS).map(Number);

    console.log(`\n🦁 Generating content for ${zoologyChapterNumbers.length} Zoology chapters...\n`);

    for (const chapterNum of zoologyChapterNumbers) {
      try {
        console.log(`  📖 Generating Zoology Chapter ${chapterNum}...`);
        const content = await this.generateChapterContent("Zoology", chapterNum);
        chapters.set(chapterNum, content);
        console.log(`  ✓ Completed: ${content.title}`);
        
        // Rate limiting - wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`  ✗ Failed: Chapter ${chapterNum}`, error);
      }
    }

    return chapters;
  }
}

export const biologyContentGenerator = new BiologyContentGenerator();
