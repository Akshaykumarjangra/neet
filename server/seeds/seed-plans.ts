
import { db } from "../db";
import { subscriptionPlans } from "@shared/schema";
import { notInArray } from "drizzle-orm";

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
        priceMonthly: 33333, // ~₹333/month (Total ₹1000 for 3 months)
        priceYearly: 0,
        currency: "INR",
        billingInterval: "quarterly",
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

    // Deactivate old plans that are not in the current seed list
    // This ensures the UI only shows the relevant plans
    const newSlugs = plans.map(p => p.slug);

    // We keep 'organization' if it exists, as it might be useful,
    // but the seed plans above don't include it.
    // If the frontend expects 'organization' plan for the comparison table, we might need it.
    // However, the pricing page renders 'organization' column in features table,
    // but the cards are derived from API.

    // Let's NOT deactivate 'organization' if possible, or just add it to the seed.
    // The previous DB state had 'organization'.
    // I'll add 'Organization' to the seed to be safe.

    const organizationPlan = {
        name: "Organization",
        slug: "organization",
        description: "For schools, coaching centers & institutions",
        planType: "organization",
        priceMonthly: 0, // Contact sales
        priceYearly: 0,
        currency: "INR",
        features: [
          "Everything in Premium",
          "Bulk student licenses",
          "Teacher admin dashboard",
          "School-wide analytics",
          "Custom branding"
        ],
        isActive: true,
        isPopular: false,
        displayOrder: 4
    };

    await db.insert(subscriptionPlans)
        .values(organizationPlan as any)
        .onConflictDoUpdate({
            target: subscriptionPlans.slug,
            set: organizationPlan
        });
    console.log(`Seeded plan: ${organizationPlan.name}`);
    newSlugs.push("organization");

    await db.update(subscriptionPlans)
      .set({ isActive: false })
      .where(
        notInArray(subscriptionPlans.slug, newSlugs)
      );
    console.log("Deactivated obsolete plans.");

    console.log("Plans seeded successfully");
  } catch (error) {
    console.error("Error seeding plans:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedPlans();
