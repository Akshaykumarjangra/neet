/**
 * Parent linking — varchar user IDs.
 */
import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { requireAuth } from "./auth";

const router = Router();

import { PARENT_LINK_TYPE, PARENT_LINK_EXPIRY, ParentLinkPayload, generateParentLinkToken, getParentLinkSecret } from "./parent-routes-utils";
export { PARENT_LINK_TYPE, PARENT_LINK_EXPIRY, ParentLinkPayload, generateParentLinkToken };

import { sendOTP, verifyOTP } from "./lib/msg91";

router.post("/link", requireAuth, async (req: any, res) => {
  const { parentPhone } = req.body;
  if (!parentPhone) return res.status(400).json({ error: "parentPhone required" });
  
  try {
    await sendOTP(parentPhone);
    
    await db.execute(sql`
      INSERT INTO parent_links (parent_phone, student_user_id, status)
      VALUES (${parentPhone}, ${req.user.id}, 'pending')
      ON CONFLICT (parent_phone, student_user_id) DO UPDATE SET status = 'pending'
    `);
    
    res.json({ ok: true, message: "OTP sent to parent" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to send OTP" });
  }
});

router.post("/verify", requireAuth, async (req: any, res) => {
  const { parentPhone, otp } = req.body;
  if (!parentPhone || !otp) return res.status(400).json({ error: "phone and otp required" });

  try {
    const result = await verifyOTP(parentPhone, otp);
    
    if (result.type === "success") {
      await db.execute(sql`
        UPDATE parent_links 
        SET status = 'verified', verified_at = now()
        WHERE parent_phone = ${parentPhone} AND student_user_id = ${req.user.id}
      `);
      
      const token = generateParentLinkToken(req.user.id);
      res.json({ ok: true, token });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Verification failed" });
  }
});

/**
 * Generates a signed JWT parent-link token for the authenticated student.
 * Token contains { studentId, type: 'parent-link' } and expires in 90 days.
 */
router.post("/link/token", requireAuth, async (req: any, res) => {
  try {
    const token = generateParentLinkToken(req.user.id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "failed to issue token" });
  }
});

router.get("/progress/:token", async (req, res) => {
  let studentId: string;
  try {
    const decoded = jwt.verify(req.params.token, getParentLinkSecret()) as
      | (ParentLinkPayload & { iat?: number; exp?: number })
      | string;
    if (typeof decoded === "string" || !decoded || decoded.type !== PARENT_LINK_TYPE || !decoded.studentId) {
      return res.status(401).json({ error: "invalid token" });
    }
    studentId = decoded.studentId;
  } catch {
    // jwt.verify throws on invalid signature, malformed, or expired tokens
    return res.status(401).json({ error: "invalid or expired token" });
  }

  const r = await db.execute(sql`
    SELECT u.name, u.study_streak,
      (SELECT count(*)::int FROM user_performance WHERE user_id = u.id AND attempt_date > now() - interval '7 days') AS week_attempts,
      (SELECT score FROM mock_exam_attempts WHERE user_id = u.id ORDER BY submitted_at DESC NULLS LAST LIMIT 1) AS last_mock
    FROM users u WHERE u.id = ${studentId}
  `);

  const progressData = (r as any).rows?.[0] ?? null;

  if (progressData) {
    // Fetch recent mentor sessions
    const sessions = await db.execute(sql`
      SELECT b.id, b.start_at, b.status, u.name as mentor_name
      FROM mentor_bookings b
      JOIN mentors m ON b.mentor_id = m.id
      JOIN users u ON m.user_id = u.id
      WHERE b.student_id = ${studentId}
      ORDER BY b.start_at DESC
      LIMIT 5
    `);

    // Fetch recent reviews given by the student
    const reviews = await db.execute(sql`
      SELECT r.id, r.rating, r.comment, r.created_at, u.name as mentor_name
      FROM mentor_reviews r
      JOIN mentors m ON r.mentor_id = m.id
      JOIN users u ON m.user_id = u.id
      WHERE r.student_id = ${studentId}
      ORDER BY r.created_at DESC
      LIMIT 3
    `);

    progressData.recent_sessions = (sessions as any).rows ?? [];
    progressData.recent_reviews = (reviews as any).rows ?? [];
  }

  res.json(progressData);
});

export default router;
