/**
 * Chapter Visualization Enhancement Script
 * 
 * This script audits all published chapters and adds visualizations to chapters
 * that are missing them. It uses the visualization generator to create appropriate
 * visualizations based on chapter subject, content, and mappings.
 * 
 * Usage:
 *   npm run enhance-visualizations
 *   or
 *   npx tsx server/scripts/enhance-chapter-visualizations.ts
 * 
 * The script will:
 * 1. Query all published chapters from the database
 * 2. Identify chapters with missing or empty visualizationsData
 * 3. Generate appropriate visualizations for each missing chapter
 * 4. Update the database with the generated visualizations
 */

import 'dotenv/config';
import { db } from '../db';
import { chapterContent } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { generateVisualizationsForChapter } from '../lib/visualization-generator';

interface Chapter {
  id: number;
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterTitle: string;
  visualizationsData: Array<{
    type: string;
    title: string;
    description: string;
    config?: Record<string, any>;
  }>;
  keyConcepts: Array<{
    title: string;
    description: string;
    formula?: string;
  }>;
}

async function auditAndEnhanceChapters() {
  console.log('🔍 Starting chapter visualization audit...\n');

  try {
    // Fetch all published chapters
    const chapters = await db
      .select({
        id: chapterContent.id,
        subject: chapterContent.subject,
        classLevel: chapterContent.classLevel,
        chapterNumber: chapterContent.chapterNumber,
        chapterTitle: chapterContent.chapterTitle,
        visualizationsData: chapterContent.visualizationsData,
        keyConcepts: chapterContent.keyConcepts,
      })
      .from(chapterContent)
      .where(eq(chapterContent.status, 'published'));

    console.log(`📚 Found ${chapters.length} published chapters\n`);

    let missingCount = 0;
    let enhancedCount = 0;
    const missingChapters: Array<{ id: number; subject: string; chapterNumber: number; title: string }> = [];

    // Audit chapters
    for (const chapter of chapters) {
      const hasVisualizations = 
        chapter.visualizationsData && 
        Array.isArray(chapter.visualizationsData) && 
        chapter.visualizationsData.length > 0;

      if (!hasVisualizations) {
        missingCount++;
        missingChapters.push({
          id: chapter.id,
          subject: chapter.subject,
          chapterNumber: chapter.chapterNumber,
          title: chapter.chapterTitle,
        });
        console.log(`⚠️  Missing visualizations: ${chapter.subject} - Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`);
      }
    }

    console.log(`\n📊 Audit Summary:`);
    console.log(`   Total chapters: ${chapters.length}`);
    console.log(`   Chapters with visualizations: ${chapters.length - missingCount}`);
    console.log(`   Chapters missing visualizations: ${missingCount}\n`);

    if (missingCount === 0) {
      console.log('✅ All chapters have visualizations!');
      return;
    }

    // Enhance missing chapters
    console.log(`\n🔧 Enhancing ${missingCount} chapters with visualizations...\n`);

    for (const missingChapter of missingChapters) {
      try {
        const fullChapter = chapters.find(c => c.id === missingChapter.id);
        if (!fullChapter) {
          console.log(`⚠️  Could not find full chapter data for: ${missingChapter.subject} - Chapter ${missingChapter.chapterNumber}`);
          continue;
        }

        const visualizations = generateVisualizationsForChapter({
          subject: fullChapter.subject,
          classLevel: fullChapter.classLevel,
          chapterNumber: fullChapter.chapterNumber,
          chapterTitle: fullChapter.chapterTitle,
          keyConcepts: fullChapter.keyConcepts || [],
        });

        if (visualizations.length > 0) {
          await db
            .update(chapterContent)
            .set({
              visualizationsData: visualizations,
              updatedAt: new Date(),
            } as any)
            .where(eq(chapterContent.id, missingChapter.id));

          enhancedCount++;
          console.log(`✅ Enhanced: ${missingChapter.subject} - Chapter ${missingChapter.chapterNumber} (${visualizations.length} visualization${visualizations.length > 1 ? 's' : ''})`);
        } else {
          console.log(`⚠️  Could not generate visualizations for: ${missingChapter.subject} - Chapter ${missingChapter.chapterNumber}`);
        }
      } catch (error: any) {
        console.error(`❌ Error enhancing chapter ${missingChapter.id} (${missingChapter.subject} - Chapter ${missingChapter.chapterNumber}):`, error.message);
      }
    }

    console.log(`\n✨ Enhancement complete!`);
    console.log(`   Enhanced: ${enhancedCount} chapters`);
    console.log(`   Failed: ${missingCount - enhancedCount} chapters`);

  } catch (error: any) {
    console.error('❌ Error during audit:', error);
    throw error;
  }
}

// Run the audit
auditAndEnhanceChapters()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
