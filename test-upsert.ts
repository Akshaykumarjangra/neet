import { db } from './server/db.js';
import { adminSettings } from './shared/schema.js';
import { sql } from 'drizzle-orm';

async function run() {
  const settings = {
    "test_key_1": "test_val_1",
    "test_key_2": "test_val_2"
  };

  const userId = null; // or some string

  const entriesToInsert = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updatedBy: userId,
  }));

  if (entriesToInsert.length > 0) {
    await db.insert(adminSettings)
      .values(entriesToInsert)
      .onConflictDoUpdate({
        target: adminSettings.key,
        set: {
          value: sql`EXCLUDED.value`,
          updatedBy: sql`EXCLUDED.updated_by`,
          updatedAt: new Date()
        }
      });
  }

  console.log("Upsert successful");
}

run().catch(console.error).finally(() => process.exit());
