// @ts-nocheck
import { Router, type Request, type Response, type NextFunction } from "express";
import { z } from "zod";
import { db } from "./db";
import {
  users,
  mentors,
  mentorAvailability,
  mentorBookings,
  mentorReviews,
  contentAssets,
  mentorPayouts,
} from "@shared/schema";
import { eq, and, desc, sql, inArray, gte, lte, sum } from "drizzle-orm";
import { requireAuthWithPasswordCheck, requireOwner, requireActiveSubscription } from "./auth";
import { getCompletionDeltas, hasOverlappingBooking, isWithinAvailability, validateBookingWindow } from "./mentor-booking-utils";

const router = Router();

// ============ ROLE-BASED MIDDLEWARE ============

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

const RECOMMENDATION_CACHE_TTL_MS = 5 * 60 * 1000;
let mentorRecommendationCache: { expiresAt: number; payload: any } | null = null;

const clearMentorRecommendationCache = () => {
  mentorRecommendationCache = null;
};

const buildBookingTimeline = (booking: { status: string; createdAt: Date; updatedAt?: Date | null }) => {
  const timeline = [
    { label: "Requested", status: "requested", at: booking.createdAt },
  ];

  if (booking.status === "confirmed" || booking.status === "completed") {
    timeline.push({ label: "Confirmed", status: "confirmed", at: booking.updatedAt || booking.createdAt });
  }

  if (booking.status === "completed") {
    timeline.push({ label: "Completed", status: "completed", at: booking.updatedAt || booking.createdAt });
  }

  if (booking.status === "cancelled") {
    timeline.push({ label: "Cancelled", status: "cancelled", at: booking.updatedAt || booking.createdAt });
  }

  return timeline;
};

const logBookingNotification = (
  direction: "mentor" | "student",
  action: "requested" | "confirmed" | "cancelled" | "completed",
  details: Record<string, any>
) => {
  console.log(`[Booking Notification] ${action.toUpperCase()} -> ${direction}`, details);
};

function requireRole(...roles: Array<"student" | "mentor" | "admin">) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    try {
      const [user] = await db
        .select({ role: users.role, isAdmin: users.isAdmin })
        .from(users)
        .where(eq(users.id, req.session.userId))
        .limit(1);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const normalizedRole = user.role === "user" ? "student" : user.role;
      const hasRole = roles.includes(normalizedRole as "student" | "mentor" | "admin");
      const isAdminRequested = roles.includes("admin") && user.isAdmin;

      if (!hasRole && !isAdminRequested) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      next();
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

// ============ VALIDATION SCHEMAS ============

const applyMentorSchema = z.object({
  bio: z.string().min(50).max(2000).optional(),
  subjects: z.array(z.string()).min(1),
  topics: z.array(z.string()).optional(),
  hourlyRate: z.number().int().min(0).optional(),
  experienceYears: z.number().int().min(0).max(50).optional(),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.number().optional(),
  })).optional(),
  languages: z.array(z.string()).optional(),
});

const quickRegisterSchema = z.object({
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  hourlyRate: z.number().int().min(0).max(20000).optional(),
  experienceYears: z.number().int().min(0).max(50).optional(),
  languages: z.array(z.string()).min(1).optional(),
});

const updateMentorProfileSchema = z.object({
  bio: z.string().min(50).max(2000).optional(),
  subjects: z.array(z.string()).optional(),
  topics: z.array(z.string()).optional(),
  hourlyRate: z.number().int().min(0).optional(),
  experienceYears: z.number().int().min(0).max(50).optional(),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.number().optional(),
  })).optional(),
  languages: z.array(z.string()).optional(),
  calendarTimezone: z.string().optional(),
  isAvailable: z.boolean().optional(),
});

const availabilitySchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  isRecurring: z.boolean().optional(),
  specificDate: z.string().datetime().optional(),
});

const createBookingSchema = z.object({
  mentorId: z.number().int(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  notes: z.string().max(1000).optional(),
});

const updateBookingStatusSchema = z.object({
  status: z.enum(["confirmed", "cancelled"]),
  cancellationReason: z.string().max(500).optional(),
  meetingLink: z.string().url().optional(),
});

const completeBookingSchema = z.object({
  paymentStatus: z.enum(["paid", "pending"]).optional(),
});

const submitReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
  isAnonymous: z.boolean().optional(),
});

const verifyMentorSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().max(500).optional(),
});

const createContentAssetSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  type: z.enum(["video", "pdf", "image", "handwritten_note"]),
  url: z.string().url().max(1000),
  thumbnailUrl: z.string().url().max(1000).optional(),
  durationSeconds: z.number().int().min(0).optional(),
  pageCount: z.number().int().min(1).optional(),
  chapterContentId: z.number().int().optional(),
});

const updateContentAssetSchema = createContentAssetSchema.partial();

const requestPayoutSchema = z.object({
  amountCents: z.number().int().min(100).optional(),
});

// ============ PUBLIC ENDPOINTS ============

router.get("/mentors", async (req: Request, res: Response) => {
  try {
    const { subject, minRating, maxRate } = req.query;

    let query = db
      .select({
        id: mentors.id,
        userId: mentors.userId,
        bio: mentors.bio,
        subjects: mentors.subjects,
        topics: mentors.topics,
        hourlyRate: mentors.hourlyRate,
        experienceYears: mentors.experienceYears,
        education: mentors.education,
        languages: mentors.languages,
        avgRating: mentors.avgRating,
        reviewCount: mentors.reviewCount,
        totalSessionsCompleted: mentors.totalSessionsCompleted,
        isAvailable: mentors.isAvailable,
        verificationStatus: mentors.verificationStatus,
        userName: users.name,
        userAvatar: users.avatarUrl,
        userHeadline: users.headline,
      })
      .from(mentors)
      .innerJoin(users, eq(mentors.userId, users.id))
      .where(eq(mentors.verificationStatus, "approved"));

    const results = await query.orderBy(desc(mentors.avgRating));

    let filteredResults = results;
    if (subject) {
      filteredResults = filteredResults.filter((m) =>
        (m.subjects as string[]).includes(subject as string)
      );
    }
    if (minRating) {
      const minRatingNum = parseFloat(minRating as string);
      filteredResults = filteredResults.filter((m) => (m.avgRating || 0) >= minRatingNum);
    }
    if (maxRate) {
      const maxRateNum = parseInt(maxRate as string);
      filteredResults = filteredResults.filter((m) => m.hourlyRate <= maxRateNum);
    }

    res.json(filteredResults);
  } catch (error: any) {
    console.error("List mentors error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/mentors/recommendations", async (_req: Request, res: Response) => {
  try {
    if (mentorRecommendationCache && mentorRecommendationCache.expiresAt > Date.now()) {
      return res.json(mentorRecommendationCache.payload);
    }

    const mentorsList = await db
      .select({
        id: mentors.id,
        userId: mentors.userId,
        bio: mentors.bio,
        subjects: mentors.subjects,
        topics: mentors.topics,
        hourlyRate: mentors.hourlyRate,
        experienceYears: mentors.experienceYears,
        education: mentors.education,
        languages: mentors.languages,
        avgRating: mentors.avgRating,
        reviewCount: mentors.reviewCount,
        totalSessionsCompleted: mentors.totalSessionsCompleted,
        isAvailable: mentors.isAvailable,
        verificationStatus: mentors.verificationStatus,
        userName: users.name,
        userAvatar: users.avatarUrl,
        userHeadline: users.headline,
      })
      .from(mentors)
      .innerJoin(users, eq(mentors.userId, users.id))
      .where(eq(mentors.verificationStatus, "approved"));

    const topRated = [...mentorsList]
      .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0))
      .slice(0, 6);

    const trendingBySessions = [...mentorsList]
      .sort((a, b) => (b.totalSessionsCompleted || 0) - (a.totalSessionsCompleted || 0))
      .slice(0, 6);

    const subjectCounts = mentorsList.reduce((acc, mentor) => {
      (mentor.subjects as string[]).forEach((subj) => {
        acc[subj] = (acc[subj] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const trendingSubjects = Object.entries(subjectCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([subject, count]) => ({ subject, count }));

    const payload = {
      topRated,
      trending: trendingBySessions,
      trendingSubjects,
    };

    mentorRecommendationCache = {
      payload,
      expiresAt: Date.now() + RECOMMENDATION_CACHE_TTL_MS,
    };

    res.json(payload);
  } catch (error: any) {
    console.error("Mentor recommendations error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/mentors/recommendations/by-subject/:subject", async (req: Request, res: Response) => {
  try {
    const { subject } = req.params;
    if (!subject) {
      return res.status(400).json({ error: "Subject parameter is required" });
    }

    const mentorsList = await db
      .select({
        id: mentors.id,
        userId: mentors.userId,
        bio: mentors.bio,
        subjects: mentors.subjects,
        topics: mentors.topics,
        hourlyRate: mentors.hourlyRate,
        experienceYears: mentors.experienceYears,
        education: mentors.education,
        languages: mentors.languages,
        avgRating: mentors.avgRating,
        reviewCount: mentors.reviewCount,
        totalSessionsCompleted: mentors.totalSessionsCompleted,
        isAvailable: mentors.isAvailable,
        verificationStatus: mentors.verificationStatus,
        userName: users.name,
        userAvatar: users.avatarUrl,
        userHeadline: users.headline,
      })
      .from(mentors)
      .innerJoin(users, eq(mentors.userId, users.id))
      .where(eq(mentors.verificationStatus, "approved"));

    const subjectMentors = mentorsList.filter((m) =>
      (m.subjects as string[]).some((s) => s.toLowerCase() === subject.toLowerCase())
    );

    const sorted = [...subjectMentors]
      .sort((a, b) => {
        const ratingDiff = (b.avgRating || 0) - (a.avgRating || 0);
        if (Math.abs(ratingDiff) > 0.1) return ratingDiff;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      })
      .slice(0, 10);

    res.json(sorted);
  } catch (error: any) {
    console.error("Subject-based mentor recommendations error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/mentors/:id(\\d+)", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mentorId = parseInt(req.params.id);

    if (Number.isNaN(mentorId)) {
      return next();
    }

    const [mentor] = await db
      .select({
        id: mentors.id,
        userId: mentors.userId,
        bio: mentors.bio,
        subjects: mentors.subjects,
        topics: mentors.topics,
        hourlyRate: mentors.hourlyRate,
        experienceYears: mentors.experienceYears,
        education: mentors.education,
        languages: mentors.languages,
        calendarTimezone: mentors.calendarTimezone,
        avgRating: mentors.avgRating,
        reviewCount: mentors.reviewCount,
        totalSessionsCompleted: mentors.totalSessionsCompleted,
        isAvailable: mentors.isAvailable,
        createdAt: mentors.createdAt,
        userName: users.name,
        userAvatar: users.avatarUrl,
        userHeadline: users.headline,
      })
      .from(mentors)
      .innerJoin(users, eq(mentors.userId, users.id))
      .where(
        and(
          eq(mentors.id, mentorId),
          eq(mentors.verificationStatus, "approved")
        )
      )
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    const reviews = await db
      .select({
        id: mentorReviews.id,
        rating: mentorReviews.rating,
        comment: mentorReviews.comment,
        isAnonymous: mentorReviews.isAnonymous,
        createdAt: mentorReviews.createdAt,
        studentName: users.name,
        studentAvatar: users.avatarUrl,
      })
      .from(mentorReviews)
      .leftJoin(users, eq(mentorReviews.studentId, users.id))
      .where(eq(mentorReviews.mentorId, mentorId))
      .orderBy(desc(mentorReviews.createdAt))
      .limit(20);

    const sanitizedReviews = reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      studentName: r.isAnonymous ? "Anonymous" : r.studentName,
      studentAvatar: r.isAnonymous ? null : r.studentAvatar,
    }));

    res.json({
      ...mentor,
      reviews: sanitizedReviews,
    });
  } catch (error: any) {
    console.error("Get mentor error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/bookings/:id/cancel", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const bookingId = parseInt(req.params.id);

    if (isNaN(bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const [booking] = await db
      .select()
      .from(mentorBookings)
      .where(eq(mentorBookings.id, bookingId))
      .limit(1);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if user is the student who made the booking
    if (booking.studentId !== userId) {
      return res.status(403).json({ error: "You can only cancel your own bookings" });
    }

    // Only allow cancelling requested or confirmed bookings
    if (booking.status !== "requested" && booking.status !== "confirmed") {
      return res.status(400).json({ error: "Only requested or confirmed bookings can be cancelled" });
    }

    // Don't allow cancelling past bookings
    if (new Date(booking.startAt) < new Date()) {
      return res.status(400).json({ error: "Cannot cancel past bookings" });
    }

    const [updatedBooking] = await db
      .update(mentorBookings)
      .set({
        status: "cancelled",
        updatedAt: new Date(),
      })
      .where(eq(mentorBookings.id, bookingId))
      .returning();

    logBookingNotification("mentor", "cancelled", {
      bookingId,
      studentId: booking.studentId,
      mentorId: booking.mentorId,
      startAt: booking.startAt,
    });

    res.json({
      ...updatedBooking,
      timeline: buildBookingTimeline({
        status: updatedBooking.status,
        createdAt: updatedBooking.createdAt,
        updatedAt: updatedBooking.updatedAt,
      }),
    });
  } catch (error: any) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/mentors/:id/availability", async (req: Request, res: Response) => {
  try {
    const mentorId = parseInt(req.params.id);

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(
        and(
          eq(mentors.id, mentorId),
          eq(mentors.verificationStatus, "approved")
        )
      )
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    const availability = await db
      .select()
      .from(mentorAvailability)
      .where(eq(mentorAvailability.mentorId, mentorId))
      .orderBy(mentorAvailability.dayOfWeek, mentorAvailability.startTime);

    const bookings = await db
      .select({
        id: mentorBookings.id,
        startAt: mentorBookings.startAt,
        endAt: mentorBookings.endAt,
        status: mentorBookings.status,
      })
      .from(mentorBookings)
      .where(
        and(
          eq(mentorBookings.mentorId, mentorId),
          inArray(mentorBookings.status, ["requested", "confirmed"])
        )
      );

    res.json({
      slots: availability,
      bookedSlots: bookings.map((b) => ({
        id: b.id,
        startAt: b.startAt,
        endAt: b.endAt,
        status: b.status,
      })),
    });
  } catch (error: any) {
    console.error("Get availability error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============ AUTHENTICATED ENDPOINTS ============

router.post("/mentors/apply", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const validatedData = applyMentorSchema.parse(req.body);

    const [existingMentor] = await db
      .select()
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (existingMentor) {
      return res.status(400).json({
        error: "You already have a mentor application",
        status: existingMentor.verificationStatus,
      });
    }

    const [newMentor] = await db
      .insert(mentors)
      .values({
        userId,
        bio: validatedData.bio,
        subjects: validatedData.subjects,
        topics: validatedData.topics || [],
        hourlyRate: validatedData.hourlyRate || 0,
        experienceYears: validatedData.experienceYears || 0,
        education: validatedData.education || [],
        languages: validatedData.languages || ["English"],
        verificationStatus: "pending",
      })
      .returning();

    clearMentorRecommendationCache();

    res.status(201).json({
      message: "Mentor application submitted successfully",
      mentor: newMentor,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Apply mentor error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/mentors/register", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const validated = quickRegisterSchema.parse(req.body);

    const [existingMentor] = await db.select().from(mentors).where(eq(mentors.userId, userId)).limit(1);
    if (existingMentor) {
      return res.status(400).json({ error: "You already have a mentor profile", status: existingMentor.verificationStatus });
    }

    // SECURITY FIX: Do not auto-upgrade role. Must be approved by admin first.
    // await db.update(users).set({ role: sql`CASE WHEN role = 'admin' THEN role ELSE 'mentor' END` }).where(eq(users.id, userId));

    const [newMentor] = await db
      .insert(mentors)
      .values({
        userId,
        bio: validated.bio,
        subjects: validated.subjects,
        topics: [],
        hourlyRate: validated.hourlyRate ?? 0,
        experienceYears: validated.experienceYears ?? 0,
        education: [],
        languages: validated.languages ?? ["English"],
        verificationStatus: "pending",
      })
      .returning();

    clearMentorRecommendationCache();

    return res.status(201).json({ message: "Mentor registration submitted", mentor: newMentor });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Quick mentor register error:", error);
    return res.status(500).json({ error: "Failed to register as mentor" });
  }
});

router.get("/mentors/status", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    const [mentor] = await db
      .select({
        id: mentors.id,
        verificationStatus: mentors.verificationStatus,
        createdAt: mentors.createdAt,
        bio: mentors.bio,
        subjects: mentors.subjects,
        topics: mentors.topics,
        hourlyRate: mentors.hourlyRate,
        experienceYears: mentors.experienceYears,
        education: mentors.education,
        languages: mentors.languages,
        avgRating: mentors.avgRating,
        reviewCount: mentors.reviewCount,
        totalSessionsCompleted: mentors.totalSessionsCompleted,
        totalEarningsCents: mentors.totalEarningsCents,
        isAvailable: mentors.isAvailable,
      })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.json({ status: "not_applied", mentor: null });
    }

    if (mentor.verificationStatus === "approved") {
      const availability = await db
        .select()
        .from(mentorAvailability)
        .where(eq(mentorAvailability.mentorId, mentor.id));

      const recentBookings = await db
        .select({
          id: mentorBookings.id,
          startAt: mentorBookings.startAt,
          endAt: mentorBookings.endAt,
          status: mentorBookings.status,
          priceCents: mentorBookings.priceCents,
          studentName: users.name,
        })
        .from(mentorBookings)
        .leftJoin(users, eq(mentorBookings.studentId, users.id))
        .where(eq(mentorBookings.mentorId, mentor.id))
        .orderBy(desc(mentorBookings.createdAt))
        .limit(10);

      return res.json({
        status: "approved",
        mentor: {
          ...mentor,
          availability,
          recentBookings,
        },
      });
    }

    res.json({
      status: mentor.verificationStatus,
      mentor,
    });
  } catch (error: any) {
    console.error("Get mentor status error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/mentors/my-profile", requireAuth, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    const [mentor] = await db
      .select()
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const availability = await db
      .select()
      .from(mentorAvailability)
      .where(eq(mentorAvailability.mentorId, mentor.id));

    const recentBookings = await db
      .select({
        id: mentorBookings.id,
        startAt: mentorBookings.startAt,
        endAt: mentorBookings.endAt,
        status: mentorBookings.status,
        priceCents: mentorBookings.priceCents,
        studentName: users.name,
      })
      .from(mentorBookings)
      .leftJoin(users, eq(mentorBookings.studentId, users.id))
      .where(eq(mentorBookings.mentorId, mentor.id))
      .orderBy(desc(mentorBookings.createdAt))
      .limit(10);

    res.json({
      ...mentor,
      availability,
      recentBookings,
    });
  } catch (error: any) {
    console.error("Get my profile error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/mentors/my-profile", requireAuth, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const validatedData = updateMentorProfileSchema.parse(req.body);

    const [existingMentor] = await db
      .select()
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!existingMentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const updateData: any = { updatedAt: new Date() };
    if (validatedData.bio !== undefined) updateData.bio = validatedData.bio;
    if (validatedData.subjects !== undefined) updateData.subjects = validatedData.subjects;
    if (validatedData.topics !== undefined) updateData.topics = validatedData.topics;
    if (validatedData.hourlyRate !== undefined) updateData.hourlyRate = validatedData.hourlyRate;
    if (validatedData.experienceYears !== undefined) updateData.experienceYears = validatedData.experienceYears;
    if (validatedData.education !== undefined) updateData.education = validatedData.education;
    if (validatedData.languages !== undefined) updateData.languages = validatedData.languages;
    if (validatedData.calendarTimezone !== undefined) updateData.calendarTimezone = validatedData.calendarTimezone;
    if (validatedData.isAvailable !== undefined) updateData.isAvailable = validatedData.isAvailable;

    const [updatedMentor] = await db
      .update(mentors)
      .set(updateData)
      .where(eq(mentors.userId, userId))
      .returning();

    clearMentorRecommendationCache();

    res.json(updatedMentor);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Update profile error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/mentors/availability", requireAuth, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const validatedData = availabilitySchema.parse(req.body);

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const [newAvailability] = await db
      .insert(mentorAvailability)
      .values({
        mentorId: mentor.id,
        dayOfWeek: validatedData.dayOfWeek,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        isRecurring: validatedData.isRecurring ?? true,
        specificDate: validatedData.specificDate ? new Date(validatedData.specificDate) : null,
      })
      .returning();

    res.status(201).json(newAvailability);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Set availability error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/mentors/availability/:id", requireAuth, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const availabilityId = parseInt(req.params.id);

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const [deleted] = await db
      .delete(mentorAvailability)
      .where(
        and(
          eq(mentorAvailability.id, availabilityId),
          eq(mentorAvailability.mentorId, mentor.id)
        )
      )
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Availability slot not found" });
    }

    res.json({ message: "Availability slot deleted successfully" });
  } catch (error: any) {
    console.error("Delete availability error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============ BOOKING ENDPOINTS ============

router.post("/bookings", requireAuth, requireActiveSubscription(), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const validatedData = createBookingSchema.parse(req.body);

    const [mentor] = await db
      .select({
        id: mentors.id,
        hourlyRate: mentors.hourlyRate,
        isAvailable: mentors.isAvailable,
        verificationStatus: mentors.verificationStatus,
      })
      .from(mentors)
      .where(eq(mentors.id, validatedData.mentorId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    if (mentor.verificationStatus !== "approved") {
      return res.status(400).json({ error: "Mentor is not verified" });
    }

    if (!mentor.isAvailable) {
      return res.status(400).json({ error: "Mentor is not currently available" });
    }

    const startAt = new Date(validatedData.startAt);
    const endAt = new Date(validatedData.endAt);
    const windowCheck = validateBookingWindow(startAt, endAt);
    if (!windowCheck.ok) {
      return res.status(400).json({ error: windowCheck.error });
    }

    const availability = await db
      .select()
      .from(mentorAvailability)
      .where(eq(mentorAvailability.mentorId, mentor.id));

    if (!availability.length) {
      return res.status(400).json({ error: "Mentor has no availability set" });
    }

    if (!isWithinAvailability(startAt, endAt, availability)) {
      return res.status(400).json({ error: "Requested time is outside mentor availability" });
    }

    const dayStart = new Date(startAt);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(startAt);
    dayEnd.setHours(23, 59, 59, 999);

    const existingBookings = await db
      .select({
        startAt: mentorBookings.startAt,
        endAt: mentorBookings.endAt,
      })
      .from(mentorBookings)
      .where(
        and(
          eq(mentorBookings.mentorId, mentor.id),
          inArray(mentorBookings.status, ["requested", "confirmed"]),
          lte(mentorBookings.startAt, dayEnd),
          gte(mentorBookings.endAt, dayStart)
        )
      );

    if (hasOverlappingBooking(startAt, endAt, existingBookings)) {
      return res.status(400).json({ error: "Time slot is already booked" });
    }
    const durationHours = windowCheck.durationMs / (1000 * 60 * 60);
    const priceCents = Math.round((mentor.hourlyRate || 0) * durationHours);

    const [newBooking] = await db
      .insert(mentorBookings)
      .values({
        mentorId: validatedData.mentorId,
        studentId: userId,
        startAt,
        endAt,
        priceCents,
        notes: validatedData.notes,
        status: "requested",
        paymentStatus: "pending",
      })
      .returning();

    const [mentorUser] = await db
      .select({ email: users.email, name: users.name })
      .from(mentors)
      .innerJoin(users, eq(mentors.userId, users.id))
      .where(eq(mentors.id, validatedData.mentorId))
      .limit(1);

    logBookingNotification("mentor", "requested", {
      bookingId: newBooking.id,
      mentorId: validatedData.mentorId,
      mentorEmail: mentorUser?.email,
      studentId: userId,
      startAt: validatedData.startAt,
    });

    res.status(201).json({
      ...newBooking,
      timeline: buildBookingTimeline({ status: newBooking.status, createdAt: newBooking.createdAt, updatedAt: newBooking.updatedAt }),
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Create booking error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/bookings", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const { role, status } = req.query;

    const [user] = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    let bookings;

    if (user?.role === "mentor" || role === "mentor") {
      const [mentor] = await db
        .select({ id: mentors.id })
        .from(mentors)
        .where(eq(mentors.userId, userId))
        .limit(1);

      if (!mentor) {
        return res.json([]);
      }

      bookings = await db
        .select({
          id: mentorBookings.id,
          startAt: mentorBookings.startAt,
          endAt: mentorBookings.endAt,
          status: mentorBookings.status,
          priceCents: mentorBookings.priceCents,
          paymentStatus: mentorBookings.paymentStatus,
          meetingLink: mentorBookings.meetingLink,
          notes: mentorBookings.notes,
          createdAt: mentorBookings.createdAt,
          updatedAt: mentorBookings.updatedAt,
          studentId: mentorBookings.studentId,
          studentName: users.name,
          studentAvatar: users.avatarUrl,
        })
        .from(mentorBookings)
        .leftJoin(users, eq(mentorBookings.studentId, users.id))
        .where(eq(mentorBookings.mentorId, mentor.id))
        .orderBy(desc(mentorBookings.createdAt));
    } else {
      bookings = await db
        .select({
          id: mentorBookings.id,
          mentorId: mentorBookings.mentorId,
          startAt: mentorBookings.startAt,
          endAt: mentorBookings.endAt,
          status: mentorBookings.status,
          priceCents: mentorBookings.priceCents,
          paymentStatus: mentorBookings.paymentStatus,
          meetingLink: mentorBookings.meetingLink,
          notes: mentorBookings.notes,
          createdAt: mentorBookings.createdAt,
          updatedAt: mentorBookings.updatedAt,
          mentorName: users.name,
          mentorAvatar: users.avatarUrl,
        })
        .from(mentorBookings)
        .innerJoin(mentors, eq(mentorBookings.mentorId, mentors.id))
        .leftJoin(users, eq(mentors.userId, users.id))
        .where(eq(mentorBookings.studentId, userId))
        .orderBy(desc(mentorBookings.createdAt));
    }

    if (status) {
      bookings = bookings.filter((b) => b.status === status);
    }

    bookings = bookings.map((b) => ({
      ...b,
      timeline: buildBookingTimeline({
        status: b.status,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      }),
    }));

    res.json(bookings);
  } catch (error: any) {
    console.error("List bookings error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/bookings/:id/status", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const bookingId = parseInt(req.params.id);
    const validatedData = updateBookingStatusSchema.parse(req.body);

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(403).json({ error: "Only mentors can update booking status" });
    }

    const [booking] = await db
      .select()
      .from(mentorBookings)
      .where(
        and(
          eq(mentorBookings.id, bookingId),
          eq(mentorBookings.mentorId, mentor.id)
        )
      )
      .limit(1);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const isConfirmedUpdate = booking.status === "confirmed" && validatedData.status === "confirmed";
    if (!isConfirmedUpdate && booking.status !== "requested") {
      return res.status(400).json({ error: "Only requested bookings can be updated" });
    }

    const updateData: any = {
      status: validatedData.status,
      updatedAt: new Date(),
    };

    if (validatedData.status === "confirmed" && validatedData.meetingLink) {
      updateData.meetingLink = validatedData.meetingLink;
    }

    if (validatedData.status === "cancelled" && validatedData.cancellationReason) {
      updateData.cancellationReason = validatedData.cancellationReason;
    }

    const [updatedBooking] = await db
      .update(mentorBookings)
      .set(updateData)
      .where(eq(mentorBookings.id, bookingId))
      .returning();

    logBookingNotification("student", validatedData.status, {
      bookingId,
      studentId: booking.studentId,
      mentorId: mentor.id,
      startAt: booking.startAt,
      meetingLink: validatedData.meetingLink,
    });

    res.json({
      ...updatedBooking,
      timeline: buildBookingTimeline({ status: updatedBooking.status, createdAt: updatedBooking.createdAt, updatedAt: updatedBooking.updatedAt }),
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Update booking status error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/bookings/:id/complete", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const bookingId = parseInt(req.params.id);
    const validatedData = completeBookingSchema.parse(req.body ?? {});

    if (isNaN(bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(403).json({ error: "Only mentors can complete bookings" });
    }

    const [booking] = await db
      .select()
      .from(mentorBookings)
      .where(
        and(
          eq(mentorBookings.id, bookingId),
          eq(mentorBookings.mentorId, mentor.id)
        )
      )
      .limit(1);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ error: "Cancelled bookings cannot be completed" });
    }

    if (new Date(booking.endAt) > new Date()) {
      return res.status(400).json({ error: "Cannot complete a booking before it ends" });
    }

    const nextPaymentStatus = validatedData.paymentStatus ?? "paid";
    const { sessionIncrement, earningsIncrement } = getCompletionDeltas({
      currentStatus: booking.status,
      currentPaymentStatus: booking.paymentStatus,
      nextPaymentStatus,
      priceCents: booking.priceCents,
    });

    let updatedBooking: any;
    await db.transaction(async (tx: any) => {
      [updatedBooking] = await tx
        .update(mentorBookings)
        .set({
          status: "completed",
          paymentStatus: nextPaymentStatus,
          updatedAt: new Date(),
        })
        .where(eq(mentorBookings.id, bookingId))
        .returning();

      if (sessionIncrement || earningsIncrement) {
        const updatePayload: any = {};
        if (sessionIncrement) {
          updatePayload.totalSessionsCompleted = sql`${mentors.totalSessionsCompleted} + ${sessionIncrement}`;
        }
        if (earningsIncrement) {
          updatePayload.totalEarningsCents = sql`${mentors.totalEarningsCents} + ${earningsIncrement}`;
        }
        await tx.update(mentors).set(updatePayload).where(eq(mentors.id, mentor.id));
      }
    });

    logBookingNotification("student", "completed", {
      bookingId,
      studentId: booking.studentId,
      mentorId: mentor.id,
      startAt: booking.startAt,
      paymentStatus: nextPaymentStatus,
    });

    res.json({
      ...updatedBooking,
      timeline: buildBookingTimeline({ status: updatedBooking.status, createdAt: updatedBooking.createdAt, updatedAt: updatedBooking.updatedAt }),
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Complete booking error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/bookings/:id/review", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const bookingId = parseInt(req.params.id);
    const validatedData = submitReviewSchema.parse(req.body);

    const [booking] = await db
      .select()
      .from(mentorBookings)
      .where(
        and(
          eq(mentorBookings.id, bookingId),
          eq(mentorBookings.studentId, userId)
        )
      )
      .limit(1);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status !== "completed" && booking.status !== "confirmed") {
      return res.status(400).json({ error: "Can only review completed or confirmed sessions" });
    }

    const [existingReview] = await db
      .select()
      .from(mentorReviews)
      .where(eq(mentorReviews.bookingId, bookingId))
      .limit(1);

    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this session" });
    }

    const [newReview] = await db
      .insert(mentorReviews)
      .values({
        mentorId: booking.mentorId,
        studentId: userId,
        bookingId,
        rating: validatedData.rating,
        comment: validatedData.comment,
        isAnonymous: validatedData.isAnonymous ?? false,
      })
      .returning();

    const allReviews = await db
      .select({ rating: mentorReviews.rating })
      .from(mentorReviews)
      .where(eq(mentorReviews.mentorId, booking.mentorId));

    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await db
      .update(mentors)
      .set({
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: allReviews.length,
      })
      .where(eq(mentors.id, booking.mentorId));

    clearMentorRecommendationCache();

    res.status(201).json(newReview);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Submit review error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============ ADMIN ENDPOINTS ============

router.get("/admin/mentors/pending", requireOwner, async (req: Request, res: Response) => {
  try {
    const pendingMentors = await db
      .select({
        id: mentors.id,
        userId: mentors.userId,
        bio: mentors.bio,
        subjects: mentors.subjects,
        topics: mentors.topics,
        hourlyRate: mentors.hourlyRate,
        experienceYears: mentors.experienceYears,
        education: mentors.education,
        languages: mentors.languages,
        verificationDocuments: mentors.verificationDocuments,
        createdAt: mentors.createdAt,
        userName: users.name,
        userEmail: users.email,
        userAvatar: users.avatarUrl,
      })
      .from(mentors)
      .innerJoin(users, eq(mentors.userId, users.id))
      .where(eq(mentors.verificationStatus, "pending"))
      .orderBy(mentors.createdAt);

    res.json(pendingMentors);
  } catch (error: any) {
    console.error("List pending mentors error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/admin/mentors/:id/verify", requireOwner, async (req: Request, res: Response) => {
  try {
    const mentorId = parseInt(req.params.id);
    const validatedData = verifyMentorSchema.parse(req.body);

    const [mentor] = await db
      .select()
      .from(mentors)
      .where(eq(mentors.id, mentorId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    if (mentor.verificationStatus !== "pending") {
      return res.status(400).json({ error: "Mentor has already been reviewed" });
    }

    const [updatedMentor] = await db
      .update(mentors)
      .set({
        verificationStatus: validatedData.status,
        updatedAt: new Date(),
      })
      .where(eq(mentors.id, mentorId))
      .returning();

    if (validatedData.status === "approved") {
      await db
        .update(users)
        .set({ role: "mentor" })
        .where(eq(users.id, mentor.userId));
    }

    clearMentorRecommendationCache();

    res.json({
      message: `Mentor application ${validatedData.status}`,
      mentor: updatedMentor,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Verify mentor error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============ CONTENT MANAGEMENT ENDPOINTS ============

router.get("/mentors/my-content", requireAuthWithPasswordCheck, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const { type } = req.query;

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    let query = db
      .select({
        id: contentAssets.id,
        type: contentAssets.type,
        title: contentAssets.title,
        description: contentAssets.description,
        url: contentAssets.url,
        thumbnailUrl: contentAssets.thumbnailUrl,
        durationSeconds: contentAssets.durationSeconds,
        pageCount: contentAssets.pageCount,
        fileSizeBytes: contentAssets.fileSizeBytes,
        isPublic: contentAssets.isPublic,
        viewCount: contentAssets.viewCount,
        createdAt: contentAssets.createdAt,
        updatedAt: contentAssets.updatedAt,
      })
      .from(contentAssets)
      .where(eq(contentAssets.mentorId, mentor.id))
      .orderBy(desc(contentAssets.createdAt));

    const results = await query;

    let filteredResults = results;
    if (type && ["video", "pdf", "image", "handwritten_note"].includes(type as string)) {
      filteredResults = results.filter((c) => c.type === type);
    }

    res.json(filteredResults);
  } catch (error: any) {
    console.error("List mentor content error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/mentors/my-content", requireAuthWithPasswordCheck, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const validatedData = createContentAssetSchema.parse(req.body);

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const [newContent] = await db
      .insert(contentAssets)
      .values({
        mentorId: mentor.id,
        type: validatedData.type,
        title: validatedData.title,
        description: validatedData.description,
        url: validatedData.url,
        thumbnailUrl: validatedData.thumbnailUrl,
        durationSeconds: validatedData.durationSeconds,
        pageCount: validatedData.pageCount,
        chapterContentId: validatedData.chapterContentId || null,
      })
      .returning();

    res.status(201).json(newContent);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Create content error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/mentors/my-content/:id", requireAuthWithPasswordCheck, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const contentId = parseInt(req.params.id);
    const validatedData = updateContentAssetSchema.parse(req.body);

    if (isNaN(contentId)) {
      return res.status(400).json({ error: "Invalid content ID" });
    }

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const [existingContent] = await db
      .select()
      .from(contentAssets)
      .where(
        and(
          eq(contentAssets.id, contentId),
          eq(contentAssets.mentorId, mentor.id)
        )
      )
      .limit(1);

    if (!existingContent) {
      return res.status(404).json({ error: "Content not found or you don't have permission to update it" });
    }

    const updateData: any = { updatedAt: new Date() };
    if (validatedData.title !== undefined) updateData.title = validatedData.title;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.type !== undefined) updateData.type = validatedData.type;
    if (validatedData.url !== undefined) updateData.url = validatedData.url;
    if (validatedData.thumbnailUrl !== undefined) updateData.thumbnailUrl = validatedData.thumbnailUrl;
    if (validatedData.durationSeconds !== undefined) updateData.durationSeconds = validatedData.durationSeconds;
    if (validatedData.pageCount !== undefined) updateData.pageCount = validatedData.pageCount;
    if (validatedData.chapterContentId !== undefined) updateData.chapterContentId = validatedData.chapterContentId;

    const [updatedContent] = await db
      .update(contentAssets)
      .set(updateData)
      .where(eq(contentAssets.id, contentId))
      .returning();

    res.json(updatedContent);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Update content error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/mentors/my-content/:id", requireAuthWithPasswordCheck, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const contentId = parseInt(req.params.id);

    if (isNaN(contentId)) {
      return res.status(400).json({ error: "Invalid content ID" });
    }

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const [deleted] = await db
      .delete(contentAssets)
      .where(
        and(
          eq(contentAssets.id, contentId),
          eq(contentAssets.mentorId, mentor.id)
        )
      )
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Content not found or you don't have permission to delete it" });
    }

    res.json({ message: "Content deleted successfully" });
  } catch (error: any) {
    console.error("Delete content error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============ EARNINGS & PAYOUT ENDPOINTS ============

router.get("/mentors/my-earnings", requireAuthWithPasswordCheck, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    const [mentor] = await db
      .select({
        id: mentors.id,
        totalEarningsCents: mentors.totalEarningsCents,
      })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const paidPayoutsResult = await db
      .select({ total: sum(mentorPayouts.amountCents) })
      .from(mentorPayouts)
      .where(
        and(
          eq(mentorPayouts.mentorId, mentor.id),
          eq(mentorPayouts.status, "paid")
        )
      );

    const pendingPayoutsResult = await db
      .select({ total: sum(mentorPayouts.amountCents) })
      .from(mentorPayouts)
      .where(
        and(
          eq(mentorPayouts.mentorId, mentor.id),
          eq(mentorPayouts.status, "pending")
        )
      );

    const paidPayouts = Number(paidPayoutsResult[0]?.total) || 0;
    const pendingPayouts = Number(pendingPayoutsResult[0]?.total) || 0;
    const availableForPayout = mentor.totalEarningsCents - paidPayouts - pendingPayouts;

    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    const thisMonthBookings = await db
      .select({ total: sum(mentorBookings.priceCents) })
      .from(mentorBookings)
      .where(
        and(
          eq(mentorBookings.mentorId, mentor.id),
          eq(mentorBookings.status, "completed"),
          eq(mentorBookings.paymentStatus, "paid"),
          gte(mentorBookings.endAt, thisMonthStart)
        )
      );

    const lastMonthBookings = await db
      .select({ total: sum(mentorBookings.priceCents) })
      .from(mentorBookings)
      .where(
        and(
          eq(mentorBookings.mentorId, mentor.id),
          eq(mentorBookings.status, "completed"),
          eq(mentorBookings.paymentStatus, "paid"),
          gte(mentorBookings.endAt, lastMonthStart),
          lte(mentorBookings.endAt, lastMonthEnd)
        )
      );

    const thisMonthEarnings = Number(thisMonthBookings[0]?.total) || 0;
    const lastMonthEarnings = Number(lastMonthBookings[0]?.total) || 0;

    res.json({
      totalEarningsCents: mentor.totalEarningsCents,
      paidPayoutsCents: paidPayouts,
      pendingPayoutsCents: pendingPayouts,
      availableForPayoutCents: Math.max(0, availableForPayout),
      thisMonthEarningsCents: thisMonthEarnings,
      lastMonthEarningsCents: lastMonthEarnings,
    });
  } catch (error: any) {
    console.error("Get earnings error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/mentors/my-payouts", requireAuthWithPasswordCheck, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;

    const [mentor] = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const payouts = await db
      .select({
        id: mentorPayouts.id,
        amountCents: mentorPayouts.amountCents,
        status: mentorPayouts.status,
        periodStart: mentorPayouts.periodStart,
        periodEnd: mentorPayouts.periodEnd,
        initiatedAt: mentorPayouts.initiatedAt,
        paidAt: mentorPayouts.paidAt,
        failureReason: mentorPayouts.failureReason,
        createdAt: mentorPayouts.createdAt,
      })
      .from(mentorPayouts)
      .where(eq(mentorPayouts.mentorId, mentor.id))
      .orderBy(desc(mentorPayouts.createdAt));

    res.json(payouts);
  } catch (error: any) {
    console.error("Get payouts error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/mentors/my-payouts/request", requireAuthWithPasswordCheck, requireRole("mentor"), async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId!;
    const validatedData = requestPayoutSchema.parse(req.body);

    const [mentor] = await db
      .select({
        id: mentors.id,
        totalEarningsCents: mentors.totalEarningsCents,
      })
      .from(mentors)
      .where(eq(mentors.userId, userId))
      .limit(1);

    if (!mentor) {
      return res.status(404).json({ error: "Mentor profile not found" });
    }

    const paidPayoutsResult = await db
      .select({ total: sum(mentorPayouts.amountCents) })
      .from(mentorPayouts)
      .where(
        and(
          eq(mentorPayouts.mentorId, mentor.id),
          eq(mentorPayouts.status, "paid")
        )
      );

    const pendingPayoutsResult = await db
      .select({ total: sum(mentorPayouts.amountCents) })
      .from(mentorPayouts)
      .where(
        and(
          eq(mentorPayouts.mentorId, mentor.id),
          eq(mentorPayouts.status, "pending")
        )
      );

    const paidPayouts = Number(paidPayoutsResult[0]?.total) || 0;
    const pendingPayouts = Number(pendingPayoutsResult[0]?.total) || 0;
    const availableForPayout = mentor.totalEarningsCents - paidPayouts - pendingPayouts;

    if (availableForPayout <= 0) {
      return res.status(400).json({ error: "No funds available for payout" });
    }

    const requestedAmount = validatedData.amountCents || availableForPayout;

    if (requestedAmount > availableForPayout) {
      return res.status(400).json({
        error: "Requested amount exceeds available balance",
        availableForPayoutCents: availableForPayout,
      });
    }

    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = now;

    const [newPayout] = await db
      .insert(mentorPayouts)
      .values({
        mentorId: mentor.id,
        amountCents: requestedAmount,
        status: "pending",
        periodStart,
        periodEnd,
        initiatedAt: now,
      })
      .returning();

    res.status(201).json({
      message: "Payout request submitted successfully",
      payout: newPayout,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Request payout error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
