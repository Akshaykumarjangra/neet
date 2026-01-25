
import { db } from "../db";
import { subscriptionPlans } from "@shared/schema";

async function seedPlans() {
  console.log("Seeding subscription plans...");

  try {
    const plans = [
      {
        name: "Foundation",
        slug: "foundation",
        description: "Perfect for students starting their NEET journey",
        planType: "free",
        priceMonthly: 0,
        priceYearly: 0,
        currency: "INR",
        features: [
          "10 Questions/Day",
          "3 Chapters High-Yield Notes",
          "1 Mock Test/Month",
          "Basic Progress Tracking"
        ],
        isActive: true,
        isPopular: false,
        displayOrder: 0
      },
      {
        name: "Pro Mentor",
        slug: "pro-mentor",
        description: "50,000+ questions, all chapters, and 1:1 topper mentorship",
        planType: "premium",
        priceMonthly: 99900, // ₹999
        priceYearly: 999900, // ₹9999
        currency: "INR",
        features: [
          "50,000+ Advanced Questions",
          "All 96 Chapters",
          "1:1 Chat Mentorship",
          "Advanced Analytics",
          "All 3D Visuals"
        ],
        isActive: true,
        isPopular: true,
        displayOrder: 2
      },
      {
        name: "Elite Topper",
        slug: "elite-topper",
        description: "Ultimate personalized coaching for top ranks",
        planType: "premium",
        priceMonthly: 249900, // ₹2499
        priceYearly: 2499900, // ₹24999
        currency: "INR",
        features: [
          "Everything in Pro",
          "Weekly Video Calls",
          "Personalized Roadmap",
          "Priority Doubt Solving",
          "Custom Study Material"
        ],
        isActive: true,
        isPopular: false,
        displayOrder: 3
      },
      {
        name: "Quarterly Starter",
        slug: "quarterly-starter",
        description: "3 months of full access at the best price",
        planType: "premium",
        priceMonthly: 33300, // ₹333/mo effectively
        priceYearly: 100000,   // ₹1000 for 3 months? No, backend logic assumes yearly. 
        // We'll treat this specially or just as a budget monthly plan for now.
        currency: "INR",
        features: [
          "Full access for 3 months",
          "50,000+ questions",
          "All chapters"
        ],
        isActive: true,
        isPopular: false,
        displayOrder: 1
      }
    ];

    for (const plan of plans) {
      await db.insert(subscriptionPlans)
        .values(plan as any)
        .onConflictDoUpdate({
          target: subscriptionPlans.slug,
          set: plan
        });
      console.log(`Seeded plan: ${plan.name}`);
    }

    console.log("Plans seeded successfully");
  } catch (error) {
    console.error("Error seeding plans:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedPlans();
