#!/usr/bin/env tsx
/**
 * Unified CLI Runner — Phase 0.2
 * Replaces 30+ scattered check/find/tmp scripts with a single entry point.
 * 
 * Usage: npx tsx scripts/cli.ts <command> [options]
 * 
 * Commands:
 *   db:check         Check database connectivity and table counts
 *   db:stats         Show database statistics
 *   db:indexes       List all indexes
 *   questions:count  Count questions by subject
 *   questions:find   Search questions by text
 *   users:list       List users
 *   chapters:list    List chapters by subject
 *   papers:list      List past year papers
 *   health           Check app health
 *   marketing:run    Trigger marketing swarm
 */

import 'dotenv/config';

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  // Dynamic imports to avoid loading everything upfront
  switch (command) {
    case 'db:check': {
      const { db } = await import('../server/db');
      const { sql } = await import('drizzle-orm');
      try {
        const result = await db.execute(sql`SELECT NOW() as time, current_database() as db`);
        console.log('✅ Database connected:', result.rows[0]);
        
        const tables = await db.execute(sql`
          SELECT relname as tablename, n_live_tup as row_count 
          FROM pg_stat_user_tables 
          ORDER BY n_live_tup DESC
        `);
        console.log('\n📊 Table row counts:');
        for (const row of tables.rows) {
          console.log(`  ${(row as any).tablename}: ${(row as any).row_count} rows`);
        }
      } catch (e: any) {
        console.error('❌ Database error:', e.message);
      }
      break;
    }

    case 'db:stats': {
      const { db } = await import('../server/db');
      const { sql } = await import('drizzle-orm');
      const size = await db.execute(sql`SELECT pg_size_pretty(pg_database_size(current_database())) as size`);
      console.log('📦 Database size:', (size.rows[0] as any).size);
      
      const connections = await db.execute(sql`SELECT count(*) as count FROM pg_stat_activity`);
      console.log('🔗 Active connections:', (connections.rows[0] as any).count);
      break;
    }

    case 'db:indexes': {
      const { db } = await import('../server/db');
      const { sql } = await import('drizzle-orm');
      const indexes = await db.execute(sql`
        SELECT indexname, tablename, indexdef 
        FROM pg_indexes 
        WHERE schemaname = 'public' 
        ORDER BY tablename, indexname
      `);
      console.log(`\n🗂️ ${indexes.rows.length} indexes:\n`);
      for (const idx of indexes.rows) {
        console.log(`  [${(idx as any).tablename}] ${(idx as any).indexname}`);
      }
      break;
    }

    case 'questions:count': {
      const { db } = await import('../server/db');
      const { questions, contentTopics } = await import('../shared/schema');
      const { eq, sql } = await import('drizzle-orm');
      
      const counts = await db.select({
        subject: contentTopics.subject,
        count: sql<number>`count(*)`,
      }).from(questions)
        .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
        .groupBy(contentTopics.subject);
      
      console.log('\n📝 Questions by subject:');
      let total = 0;
      for (const row of counts) {
        console.log(`  ${row.subject}: ${row.count}`);
        total += Number(row.count);
      }
      console.log(`  TOTAL: ${total}`);
      break;
    }

    case 'users:list': {
      const { db } = await import('../server/db');
      const { users } = await import('../shared/schema');
      const { desc } = await import('drizzle-orm');
      const limit = parseInt(args[0]) || 10;
      
      const userList = await db.select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        isPaidUser: users.isPaidUser,
        createdAt: users.createdAt,
      }).from(users).orderBy(desc(users.createdAt)).limit(limit);
      
      console.log(`\n👥 Last ${limit} users:\n`);
      console.table(userList);
      break;
    }

    case 'chapters:list': {
      const { db } = await import('../server/db');
      const { chapterContent } = await import('../shared/schema');
      const { eq } = await import('drizzle-orm');
      const subject = args[0];
      
      let query = db.select({
        id: chapterContent.id,
        subject: chapterContent.subject,
        classLevel: chapterContent.classLevel,
        chapterNumber: chapterContent.chapterNumber,
        title: chapterContent.chapterTitle,
        status: chapterContent.status,
      }).from(chapterContent);
      
      if (subject) {
        query = query.where(eq(chapterContent.subject, subject)) as any;
      }
      
      const chapters = await query;
      console.log(`\n📚 ${chapters.length} chapters${subject ? ` (${subject})` : ''}:\n`);
      console.table(chapters);
      break;
    }

    case 'health': {
      try {
        const port = process.env.PORT || 5001;
        const resp = await fetch(`http://localhost:${port}/api/health`);
        console.log('🏥 Health:', await resp.json());
      } catch (e: any) {
        console.error('❌ App not running:', e.message);
      }
      break;
    }

    case 'marketing:run': {
      const url = process.env.MARKETING_SWARM_URL || 'http://localhost:8001';
      try {
        const resp = await fetch(`${url}/run`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ website_url: 'https://neet.zeroai.org.in', industry: 'NEET Preparation / EdTech' }) });
        console.log('🚀 Marketing run:', await resp.json());
      } catch (e: any) {
        console.error('❌ Marketing swarm error:', e.message);
      }
      break;
    }

    default:
      console.log(`
🔧 ZERO AI NEET CLI

Usage: npx tsx scripts/cli.ts <command> [options]

Commands:
  db:check           Check database connectivity
  db:stats           Database size and connections
  db:indexes         List all database indexes
  questions:count    Count questions by subject
  users:list [n]     List last N users (default 10)
  chapters:list [s]  List chapters (optionally by subject)
  health             Check app health endpoint
  marketing:run      Trigger marketing swarm
      `);
  }

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
