// @ts-nocheck
import { Router } from "express";
import { z } from "zod";
import { db } from "./db";
import { users, userProfiles } from "../shared/schema";
import { getCurrentUser, requireAuth } from "./auth";
import { eq } from "drizzle-orm";

const router = Router();

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  headline: z
    .string()
    .max(200, "Headline must be under 200 characters")
    .optional()
    .or(z.literal("")),
  avatarUrl: z
    .union([z.string().trim().url("Avatar must be a valid URL").max(500), z.literal("")])
    .optional()
    .or(z.literal(null)),
  bio: z
    .string()
    .max(1000, "Bio must be under 1000 characters")
    .optional()
    .or(z.literal("")),
  school: z
    .string()
    .max(200, "School must be under 200 characters")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .max(100, "City must be under 100 characters")
    .optional()
    .or(z.literal("")),
  state: z
    .string()
    .max(100, "State must be under 100 characters")
    .optional()
    .or(z.literal("")),
  preferences: z.record(z.any()).optional(),
});

router.get("/", requireAuth, async (req, res) => {
  const userId = getCurrentUser(req);

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        headline: users.headline,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const [profile] = await db
      .select({
        preferences: userProfiles.preferences,
        avatarUrl: userProfiles.avatarUrl,
        bio: userProfiles.bio,
        school: userProfiles.school,
        city: userProfiles.city,
        state: userProfiles.state,
      })
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .limit(1);

    res.json({
      profile: {
        name: user.name,
        headline: user.headline ?? "",
        avatarUrl: profile?.avatarUrl ?? user.avatarUrl ?? null,
        bio: profile?.bio ?? "",
        school: profile?.school ?? "",
        city: profile?.city ?? "",
        state: profile?.state ?? "",
        preferences: profile?.preferences ?? {},
      },
    });
  } catch (error) {
    console.error("[profile] fetch failed", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  const userId = getCurrentUser(req);

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const parsed = profileSchema.parse(req.body);

    const normalizedName = parsed.name.trim();
    const normalizedHeadline = (parsed.headline ?? "").trim();
    const normalizedAvatar = parsed.avatarUrl && parsed.avatarUrl !== "" ? parsed.avatarUrl : null;
    const normalizedBio = (parsed.bio ?? "").trim();
    const normalizedSchool = (parsed.school ?? "").trim();
    const normalizedCity = (parsed.city ?? "").trim();
    const normalizedState = (parsed.state ?? "").trim();
    const preferences = parsed.preferences ?? {};

    const userUpdate = {
      name: normalizedName,
      headline: normalizedHeadline || null,
      avatarUrl: normalizedAvatar,
    } satisfies Partial<typeof users.$inferInsert>;

    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set(userUpdate)
        .where(eq(users.id, userId));

      const [existingProfile] = await tx
        .select({ id: userProfiles.id })
        .from(userProfiles)
        .where(eq(userProfiles.userId, userId))
        .limit(1);

      if (existingProfile) {
        const profileUpdate = {
          displayName: normalizedName,
          avatarUrl: normalizedAvatar,
          bio: normalizedBio || null,
          school: normalizedSchool || null,
          city: normalizedCity || null,
          state: normalizedState || null,
          preferences,
          updatedAt: new Date(),
        } satisfies Partial<typeof userProfiles.$inferInsert>;

        await tx
          .update(userProfiles)
          .set(profileUpdate)
          .where(eq(userProfiles.id, existingProfile.id));
      } else {
        await tx.insert(userProfiles).values({
          userId,
          displayName: normalizedName,
          avatarUrl: normalizedAvatar,
          bio: normalizedBio || null,
          school: normalizedSchool || null,
          city: normalizedCity || null,
          state: normalizedState || null,
          preferences,
        } satisfies typeof userProfiles.$inferInsert);
      }
    });

    res.json({
      profile: {
        name: normalizedName,
        headline: normalizedHeadline,
        avatarUrl: normalizedAvatar,
        bio: normalizedBio,
        school: normalizedSchool,
        city: normalizedCity,
        state: normalizedState,
        preferences,
      },
    });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return res.status(400).json({ error: error.errors?.[0]?.message || "Invalid profile data" });
    }

    console.error("[profile] update failed", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
