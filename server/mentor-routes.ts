import { Router, type Request, type Response, type NextFunction } from "express";
import { z } from "zod";
import { db } from "./db";
import {
  users,
  mentors,
  mentorAvailability,
  mentorBookings,
  mentorReviews,
} from "@shared/schema";
import { eq, and, desc, sql, inArray } from "drizzle-orm";

const router = Router();

// ============ ROLE-BASED MIDDLEWARE ============

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

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

      const hasRole = roles.includes(user.role as "student" | "mentor" | "admin");
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

const submitReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
  isAnonymous: z.boolean().optional(),
});

const verifyMentorSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().max(500).optional(),
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

router.get("/mentors/:id", async (req: Request, res: Response) => {
  try {
    const mentorId = parseInt(req.params.id);

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

router.post("/bookings", requireAuth, async (req: Request, res: Response) => {
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
    const durationHours = (endAt.getTime() - startAt.getTime()) / (1000 * 60 * 60);
    const priceCents = Math.round(mentor.hourlyRate * durationHours);

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

    res.status(201).json(newBooking);
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

    if (booking.status !== "requested") {
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

    res.json(updatedBooking);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Update booking status error:", error);
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

router.get("/admin/mentors/pending", requireAuth, requireRole("admin"), async (req: Request, res: Response) => {
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

router.put("/admin/mentors/:id/verify", requireAuth, requireRole("admin"), async (req: Request, res: Response) => {
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

export default router;
