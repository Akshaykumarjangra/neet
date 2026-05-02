import { fetchChaptersWithoutVideos, closePool } from '../scripts/video-agent/db-ops';

async function check() {
  try {
    const chapters = await fetchChaptersWithoutVideos();
    console.log(`Chapters without videos: ${chapters.length}`);
    if (chapters.length > 0) {
      console.log('Sample chapter:', chapters[0].chapterTitle);
      console.log('keyConcepts type:', typeof chapters[0].keyConcepts);
      console.log('keyConcepts content:', JSON.stringify(chapters[0].keyConcepts, null, 2));
    }
  } catch (err) {
    console.error(err);
  } finally {
    await closePool();
  }
}

check();
