
import { db } from "../db";
import { subscriptionPlans } from "@shared/schema";

async function seedPlans() {
  console.log("Seeding subscription plans...");

  try {
    const plans = [
      {
        name: "Premium",
        slug: "premium",
        description: "Full access to all features",
        planType: "premium",
        priceMonthly: 49900, // ₹499
        priceYearly: 499900, // ₹4999
        currency: "INR",
        features: [
          "Unlimited questions",
          "All chapters",
          "Advanced analytics",
          "Mentor support"
        ],
        isActive: true,
        isPopular: true
      },
      {
        name: "Quarterly Starter",
        slug: "quarterly-starter",
        description: "Best value for 3 months",
        planType: "premium",
        priceMonthly: 99900, // ₹999 - Treat as a special monthly plan acting as quarterly bundle for now or just high value monthly
        // Note: The backend logic currently forces monthly/yearly. 
        // Generically seeding this to avoid UI errors if it looks for it.
        // Ideally backend logic for 'quarterly' interval should be added.
        priceYearly: null,
        currency: "INR",
        features: [
            "50,000+ questions", 
            "All chapters", 
            "Unlimited mock tests"
        ],
        isActive: true, 
        isPopular: false
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
