import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

async function createDemoUser() {
  try {
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, "demo@neet.com"))
      .limit(1);

    if (existingUser.length > 0) {
      console.log("Demo user already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash("demo-password", 10);

    const result = await db.insert(users).values({
      email: "demo@neet.com",
      name: "Demo User",
      passwordHash,
    }).returning();

    console.log("✅ Demo user created:", result);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating demo user:", error);
    process.exit(1);
  }
}

createDemoUser();
