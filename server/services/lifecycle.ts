/**
 * Lifecycle drip orchestrator (Phase 5/07).
 *
 * Channels: email (nodemailer), whatsapp (MSG91/Gupshup), push (FCM).
 * TODO: provide MSG91_AUTH_KEY, GUPSHUP_KEY, FCM_KEY, RESEND_KEY in env.
 */
import nodemailer from "nodemailer";
import { db } from "../db";
import { sql } from "drizzle-orm";
import { complete } from "../workforce";

type Event =
  | "user.signup" | "first.test.completed"  | "inactive.3d"
  | "streak.broken" | "mock.high_score" | "subscription.churn"
  | "parent.verify" | "booking.requested" | "booking.confirmed" | "booking.cancelled";

const TEMPLATES: Record<Event, { subject: string; body: string; channels: ("email" | "whatsapp" | "push")[] }> = {
  "user.signup":         { subject: "Welcome to your NEET journey, {{name}}", body: "Day 0. Take the diagnostic in 10 min.", channels: ["email", "whatsapp"] },
  "first.test.completed":{ subject: "Your first analysis is ready", body: "We mapped your weak topics. Here's your 7-day plan.", channels: ["email", "push"] },
  "inactive.3d":         { subject: "We saved your weak-topic pack", body: "3 days off. One quick win to break the slump.", channels: ["email", "whatsapp", "push"] },
  "streak.broken":       { subject: "Restore your {{streak}}-day streak", body: "You can recover with a 5-minute revision.", channels: ["push", "whatsapp"] },
  "mock.high_score":     { subject: "Score this high? Time to upgrade.", body: "Your trajectory shows top 5%. Pro unlocks 1:1 mentor.", channels: ["email", "push"] },
  "subscription.churn":  { subject: "60% off — come back", body: "We miss you. Code COMEBACK60.", channels: ["email", "whatsapp"] },
  "parent.verify":       { subject: "Verify Parent Link", body: "Your child has requested to link your phone. OTP: {{otp}}", channels: ["whatsapp"] },
  "booking.requested":   { subject: "New Booking Request", body: "You have a new booking request from {{student_name}} for {{date}} at {{time}}.", channels: ["email", "push"] },
  "booking.confirmed":   { subject: "Booking Confirmed!", body: "Your session with {{mentor_name}} on {{date}} at {{time}} has been confirmed.", channels: ["email", "push", "whatsapp"] },
  "booking.cancelled":   { subject: "Booking Cancelled", body: "The session on {{date}} at {{time}} has been cancelled.", channels: ["email", "push"] },
};

const transporter = process.env.SMTP_HOST ? nodemailer.createTransport({
  host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT ?? 587),
  auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
}) : null;

export async function fire(event: Event, userId: string, vars: Record<string, string> = {}) {
  const u = (await db.execute(sql`SELECT id, email, phone, name, tier FROM users WHERE id=${userId}`)) as any;
  const user = u.rows?.[0]; if (!user) return;
  const tpl = TEMPLATES[event];

  // Personalize via Gemini Flash
  const r = await complete({
    task: "social-post",
    prompt: `Personalize this email subject and 80-word body for ${user.name ?? "student"}: subject="${tpl.subject}", body="${tpl.body}". Variables: ${JSON.stringify(vars)}. Return JSON {subject, body}.`,
    json: true,
    maxTokens: 500,
  }).catch(() => ({ json: { subject: tpl.subject, body: tpl.body } } as any));
  const out = (r.json as any) ?? { subject: tpl.subject, body: tpl.body };

  for (const ch of tpl.channels) {
    try {
      if (ch === "email" && transporter && user.email) {
        await transporter.sendMail({ from: process.env.MAIL_FROM, to: user.email, subject: out.subject, text: out.body });
      } else if (ch === "whatsapp" && user.phone) {
        await sendWhatsApp(user.phone, out.body);
      } else if (ch === "push") {
        await sendPush(userId, out.subject, out.body);
      }
      await db.execute(sql`INSERT INTO lifecycle_sends (user_id, event, channel, sent_at) VALUES (${userId}, ${event}, ${ch}, now())`);
    } catch (e) {
      console.error(`[lifecycle] ${event}/${ch} failed:`, e);
    }
  }
}

export async function sendSMS(phone: string, text: string) {
  const key = process.env.MSG91_AUTH_KEY;
  if (!key) return;
  // Use MSG91 Send SMS API
  await fetch(`https://api.msg91.com/api/v5/flow/`, {
    method: "POST",
    headers: { authkey: key, "content-type": "application/json" },
    body: JSON.stringify({
      template_id: process.env.MSG91_SMS_TEMPLATE_ID,
      short_url: "1",
      recipients: [{ mobiles: phone, body: text }]
    }),
  });
}

async function sendWhatsApp(phone: string, text: string) {
  const key = process.env.MSG91_AUTH_KEY;
  if (!key) return;
  await fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/", {
    method: "POST",
    headers: { authkey: key, "content-type": "application/json" },
    body: JSON.stringify({ integrated_number: process.env.MSG91_WHATSAPP_NUMBER, content_type: "text", payload: { to: phone, type: "text", text: { body: text } } }),
  });
}

import { sendMulticastNotification } from "./fcm";

async function sendPush(userId: string, title: string, body: string) {
  // Fetch all registered device tokens for this user
  const devices = await db.execute(sql`SELECT fcm_token FROM user_devices WHERE user_id = ${userId}`);
  const tokens = (devices.rows ?? []).map((r: any) => r.fcm_token).filter(Boolean);

  if (tokens.length > 0) {
    try {
      await sendMulticastNotification(tokens, title, body);
      console.log(`[push] Sent to ${tokens.length} devices for user ${userId}: "${title}"`);
    } catch (err) {
      console.error(`[push] FCM send failed for user ${userId}:`, err);
    }
  }

  // Queue for persistence/history
  await db.execute(sql`INSERT INTO push_queue (user_id, title, body, status) VALUES (${userId}, ${title}, ${body}, ${tokens.length > 0 ? 'sent' : 'pending'})`);
}
