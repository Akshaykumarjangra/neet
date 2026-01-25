
import { db } from "./db";
import { sql } from "drizzle-orm";

async function migrateGrowth() {
    console.log("Running manual migration for growth features...");

    try {
        // 1. Create Enum
        await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE lead_magnet_type AS ENUM ('pdf', 'video', 'test_series', 'cheatsheet', 'roadmap');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
        console.log("Enum created or already exists.");

        // 2. Create lead_magnets
        await db.execute(sql`
      CREATE TABLE IF NOT EXISTS lead_magnets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        type lead_magnet_type NOT NULL DEFAULT 'pdf',
        content_url VARCHAR(500) NOT NULL,
        thumbnail_url VARCHAR(500),
        call_to_action VARCHAR(100) DEFAULT 'Download Now',
        is_active BOOLEAN NOT NULL DEFAULT true,
        slug VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
        console.log("Table 'lead_magnets' created.");

        // 3. Create user_leads
        await db.execute(sql`
      CREATE TABLE IF NOT EXISTS user_leads (
        id SERIAL PRIMARY KEY,
        magnet_id INTEGER REFERENCES lead_magnets(id),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        name VARCHAR(100),
        user_id VARCHAR REFERENCES users(id),
        status VARCHAR(20) DEFAULT 'new',
        metadata JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
        console.log("Table 'user_leads' created.");

        // 4. Create upgrading_popups
        await db.execute(sql`
      CREATE TABLE IF NOT EXISTS upgrading_popups (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        cta_text VARCHAR(50) NOT NULL DEFAULT 'Upgrade Now',
        cta_link VARCHAR(500) NOT NULL DEFAULT '/pricing',
        image_url VARCHAR(500),
        trigger_type VARCHAR(50) NOT NULL DEFAULT 'timer',
        trigger_value JSONB,
        target_pages JSONB,
        is_active BOOLEAN NOT NULL DEFAULT true,
        display_priority INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
        console.log("Table 'upgrading_popups' created.");

        console.log("All tables created successfully.");
    } catch (error) {
        console.error("Migration error:", error);
    } finally {
        process.exit(0);
    }
}

migrateGrowth();
