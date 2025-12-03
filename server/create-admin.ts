import { db } from "./db";
import { users } from "@shared/schema";
import bcrypt from "bcrypt";

async function createAdmin() {
  const adminEmail = "zero.ai.info@gmail.com";
  const adminPassword = "Tripti@gr@w@l";
  const adminUsername = "ZeroAI_Admin";
  
  // Hash password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  // Create admin user
  await db.insert(users).values({
    username: adminUsername,
    email: adminEmail,
    password: hashedPassword,
    isAdmin: true,
    isPaidUser: true,
    adminGranted: true,
    accessExpiry: null, // No expiry for admin
  });
  
  console.log("✅ Admin user created successfully!");
  console.log("   Email:", adminEmail);
  console.log("   Password: Tripti@gr@w@l");
}

createAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  });
