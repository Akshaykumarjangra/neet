import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

async function createDemoUser() {
  try {
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.username, 'demo-user'))
      .limit(1);

    if (existingUser.length > 0) {
      console.log("Demo user already exists");
      process.exit(0);
    }

    const result = await db.insert(users).values({
      username: 'demo-user',
      email: 'demo@neet.com',
      password: 'demo-password',
    }).returning();

    console.log("✅ Demo user created:", result);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating demo user:", error);
    process.exit(1);
  }
}

createDemoUser();
