import { Router, raw } from "express";
import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
import { nanoid } from "nanoid";
import { db } from "./db";
import {
  subscriptionPlans,
  userSubscriptions,
  paymentTransactions,
  adminSettings,
  webhookEvents,
  users,
} from "@shared/schema";
import { eq, and, inArray, desc } from "drizzle-orm";
import { requireAuthWithPasswordCheck } from "./auth";

const router = Router();

type UserSubscriptionInsert = typeof userSubscriptions.$inferInsert;
type PaymentTransactionInsert = typeof paymentTransactions.$inferInsert;
type UserInsert = typeof users.$inferInsert;
type WebhookEventInsert = typeof webhookEvents.$inferInsert;

type BillingInterval = "monthly" | "yearly" | "quarterly" | "one_time";
type PaymentProvider = "stripe" | "razorpay";

const PAYMENT_SETTING_KEYS = [
  "paymentProvider",
  "stripePublishableKey",
  "stripeSecretKey",
  "stripeWebhookSecret",
  "razorpayKeyId",
  "razorpayKeySecret",
  "razorpayWebhookSecret",
  "billingSuccessUrl",
  "billingCancelUrl",
] as const;

let stripeClient: Stripe | null = null;

const APP_BASE_URL =
  process.env.APP_BASE_URL ||
  process.env.CLIENT_BASE_URL ||
  "http://localhost:5173";

const normalizeValue = (value: any): string | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object" && "value" in value) {
    return value.value as string;
  }
  return String(value);
};

async function getPaymentSettings() {
  const rows = await db
    .select()
    .from(adminSettings)
    .where(inArray(adminSettings.key, PAYMENT_SETTING_KEYS as any));

  const settings: Record<string, string | undefined> = {};
  for (const row of rows) {
    settings[row.key] = normalizeValue(row.value);
  }

  return settings;
}

const getStripeClient = (secretKey?: string | null) => {
  const key = secretKey || process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  if (stripeClient && (stripeClient as any)._apiKey === key) {
    return stripeClient;
  }
  stripeClient = new Stripe(key, {
    apiVersion: "2024-06-20",
  });
  (stripeClient as any)._apiKey = key;
  return stripeClient;
};

const getRazorpayClient = (keyId?: string | null, keySecret?: string | null) => {
  const id = keyId || process.env.RAZORPAY_KEY_ID;
  const secret = keySecret || process.env.RAZORPAY_KEY_SECRET;
  if (!id || !secret) {
    return null;
  }
  return new Razorpay({
    key_id: id,
    key_secret: secret,
  });
};

const calculatePeriodEnd = (interval: BillingInterval, start: Date) => {
  const date = new Date(start);
  if (interval === "yearly") {
    date.setFullYear(date.getFullYear() + 1);
  } else if (interval === "quarterly") {
    date.setMonth(date.getMonth() + 3);
  } else {
    date.setMonth(date.getMonth() + 1);
  }
  return date;
};

async function markSubscriptionActive(
  subscriptionId: number,
  transactionId: string,
  options: {
    invoiceUrl?: string | null;
    stripePaymentIntentId?: string | null;
    stripeChargeId?: string | null;
    razorpayPaymentId?: string | null;
    razorpayOrderId?: string | null;
  }
) {
  try {
    await db.transaction(async (tx) => {
      const [existing] = await tx
        .select({
          billingInterval: userSubscriptions.billingInterval,
          userId: userSubscriptions.userId, // Fetch userId here to ensure consistency
        })
        .from(userSubscriptions)
        .where(eq(userSubscriptions.id, subscriptionId))
        .limit(1);

      if (!existing) {
        throw new Error(`Subscription ${subscriptionId} not found`);
      }

      const periodEnd = calculatePeriodEnd(
        existing.billingInterval || "monthly",
        new Date()
      );

      const [subscription] = await tx
        .update(userSubscriptions)
        .set({
          status: "active",
          startDate: new Date(),
          currentPeriodStart: new Date(),
          currentPeriodEnd: periodEnd,
          updatedAt: new Date(),
        } as Partial<UserSubscriptionInsert>)
        .where(eq(userSubscriptions.id, subscriptionId))
        .returning({
          id: userSubscriptions.id,
          userId: userSubscriptions.userId,
        });

      if (!subscription) return;

      await tx
        .update(paymentTransactions)
        .set({
          status: "paid",
          invoiceUrl: options.invoiceUrl || null,
          stripePaymentIntentId: options.stripePaymentIntentId || null,
          stripeChargeId: options.stripeChargeId || null,
          razorpayPaymentId: options.razorpayPaymentId || null,
          razorpayOrderId: options.razorpayOrderId || null,
          updatedAt: new Date(),
        } as Partial<PaymentTransactionInsert>)
        .where(eq(paymentTransactions.id, transactionId));

      await tx
        .update(users)
        .set({
          isPaidUser: true,
          paymentStatus: "paid",
          paidAt: new Date(),
          paymentProvider: options.razorpayPaymentId ? "razorpay" : "stripe",
          paymentId: options.razorpayPaymentId || options.stripePaymentIntentId
        } as Partial<UserInsert>)
        .where(eq(users.id, existing.userId));
    });
    console.log(`[Billing] Successfully activated subscription ${subscriptionId}`);
  } catch (error) {
    console.error(`[Billing] Failed to activate subscription ${subscriptionId}:`, error);
    // Determine if we should re-throw or just log. For robust flows, we likely want to alert admin/logs.
    throw error;
  }
}

async function markSubscriptionFailed(
  subscriptionId: number,
  transactionId: string,
  reason: string
) {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(userSubscriptions)
        .set({
          status: "cancelled", // or 'unpaid' if we want to allow retry? but 'cancelled' fails the flow safely.
          cancelledAt: new Date(),
          cancellationReason: reason,
          updatedAt: new Date(),
        } as Partial<UserSubscriptionInsert>)
        .where(eq(userSubscriptions.id, subscriptionId));

      await tx
        .update(paymentTransactions)
        .set({
          status: "failed",
          failureMessage: reason,
          updatedAt: new Date(),
        } as Partial<PaymentTransactionInsert>)
        .where(eq(paymentTransactions.id, transactionId));
    });
    console.log(`[Billing] Marked subscription ${subscriptionId} as failed: ${reason}`);
  } catch (error) {
    console.error(`[Billing] Failed to mark subscription ${subscriptionId} as failed:`, error);
    throw error;
  }
}

router.post("/checkout", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session!.userId!;
    const { planId, billingInterval = "monthly", provider } = req.body as {
      planId: number;
      billingInterval?: BillingInterval;
      provider?: PaymentProvider;
    };

    if (!planId) {
      return res.status(400).json({ error: "Plan ID is required" });
    }

    const [plan] = await db
      .select()
      .from(subscriptionPlans)
      .where(eq(subscriptionPlans.id, planId))
      .limit(1);

    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    if (plan.planType === "organization") {
      return res.status(400).json({ error: "Organization plans require sales assistance" });
    }

    // 0. Logging
    console.log(`[Checkout] Initiating for user ${userId}, plan ${planId}, provider ${provider}`);

    // 1. Clear stale pending subscriptions FIRST to satisfy unique index and allow retries
    // This solves the issue where a user is blocked from retrying because of a "pending" status
    const cleared = await db
      .update(userSubscriptions)
      .set({ status: "cancelled", updatedAt: new Date() } as Partial<UserSubscriptionInsert>)
      .where(
        and(eq(userSubscriptions.userId, userId), eq(userSubscriptions.status, "pending"))
      );

    if (cleared.rowCount > 0) {
      console.log(`[Checkout] Cleared ${cleared.rowCount} stale pending subscriptions for user ${userId}`);
    }

    // 2. Now check for active subscriptions (active, trial, past_due, paused)
    // We exclude "pending" because we just cleared them (or they can be ignored for new checkout)
    const [activeSubscription] = await db
      .select()
      .from(userSubscriptions)
      .where(
        and(
          eq(userSubscriptions.userId, userId),
          inArray(userSubscriptions.status, ["active", "trial", "past_due", "paused"])
        )
      )
      .limit(1);

    if (activeSubscription) {
      console.warn(`[Checkout] User ${userId} already has active subscription: ${activeSubscription.status}`);
      return res.status(400).json({
        error: "ALREADY_SUBSCRIBED",
        message: "You already have an active subscription.",
      });
    }

    const interval: BillingInterval =
      billingInterval === "yearly" ? "yearly" :
        billingInterval === "quarterly" ? "quarterly" : "monthly";

    const amount = interval === "yearly"
      ? plan.priceYearly || plan.priceMonthly * 12
      : plan.priceMonthly;

    const settings = await getPaymentSettings();
    const chosenProvider: PaymentProvider =
      provider || (settings.paymentProvider as PaymentProvider) || "stripe";

    const [subscription] = await db
      .insert(userSubscriptions)
      .values({
        userId,
        planId: plan.id,
        status: "pending",
        billingInterval: interval,
        quantity: 1,
        startDate: new Date(),
        currentPeriodStart: null,
        currentPeriodEnd: null,
        autoRenew: true,
        updatedAt: new Date(),
      } as UserSubscriptionInsert)
      .returning();

    const [transaction] = await db
      .insert(paymentTransactions)
      .values({
        userId,
        subscriptionId: subscription.id,
        provider: chosenProvider,
        transactionId: nanoid(24),
        amount,
        currency: plan.currency || "INR",
        status: "pending",
        paymentMethod: chosenProvider,
        paymentProvider: chosenProvider,
        description: `${plan.name} (${interval})`,
      } as PaymentTransactionInsert)
      .returning();

    const [currentUser] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const successUrl =
      settings.billingSuccessUrl ||
      process.env.BILLING_SUCCESS_URL ||
      `${APP_BASE_URL}/billing-status?status=success`;
    const cancelUrl =
      settings.billingCancelUrl ||
      process.env.BILLING_CANCEL_URL ||
      `${APP_BASE_URL}/billing-status?status=cancelled`;

    if (chosenProvider === "razorpay") {
      const razorpay = getRazorpayClient(settings.razorpayKeyId, settings.razorpayKeySecret);
      if (!razorpay) {
        return res.status(400).json({ error: "Razorpay keys are not configured" });
      }

      const order = await razorpay.orders.create({
        amount,
        currency: plan.currency || "INR",
        receipt: `sub_${subscription.id}`,
        notes: {
          subscriptionId: subscription.id,
          transactionId: transaction.id,
          planName: plan.name,
        },
      });

      await db
        .update(paymentTransactions)
        .set({
          razorpayOrderId: order.id,
          paymentProvider: "razorpay",
          paymentMethod: "razorpay",
        } as Partial<PaymentTransactionInsert>)
        .where(eq(paymentTransactions.id, transaction.id));

      console.log(`[Checkout] Razorpay order created: ${order.id} for user ${userId}`);
      return res.json({
        provider: "razorpay",
        order,
        keyId: settings.razorpayKeyId || process.env.RAZORPAY_KEY_ID,
        subscriptionId: subscription.id,
        transactionId: transaction.id,
        amount,
        currency: plan.currency || "INR",
      });
    }

    console.log(`[Checkout] Setting up Stripe for user ${userId}`);
    const stripe = getStripeClient(settings.stripeSecretKey);
    if (!stripe) {
      return res.status(400).json({ error: "Stripe secret key is not configured" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: currentUser?.email || undefined,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price_data: {
            currency: (plan.currency || "INR").toLowerCase(),
            product_data: {
              name: plan.name,
              description: plan.description || undefined,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        subscriptionId: subscription.id.toString(),
        transactionId: transaction.id,
        billingInterval: interval,
      },
    });

    await db
      .update(paymentTransactions)
      .set({
        paymentProvider: "stripe",
        paymentMethod: "stripe",
      } as Partial<PaymentTransactionInsert>)
      .where(eq(paymentTransactions.id, transaction.id));

    console.log(`[Checkout] Stripe session created: ${session.id} for user ${userId}`);
    return res.json({
      provider: "stripe",
      sessionId: session.id,
      url: session.url,
      subscriptionId: subscription.id,
      transactionId: transaction.id,
      publishableKey: settings.stripePublishableKey || process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error: any) {
    console.error("[Checkout] Error in checkout process:", error);
    res.status(500).json({
      error: "CHECKOUT_ERROR",
      message: error.message || "Failed to create checkout session",
    });
  }
});

router.get("/status", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session!.userId!;
    const [subscription] = await db
      .select({
        id: userSubscriptions.id,
        status: userSubscriptions.status,
        billingInterval: userSubscriptions.billingInterval,
        currentPeriodEnd: userSubscriptions.currentPeriodEnd,
        currentPeriodStart: userSubscriptions.currentPeriodStart,
        autoRenew: userSubscriptions.autoRenew,
        planName: subscriptionPlans.name,
        planSlug: subscriptionPlans.slug,
        currency: subscriptionPlans.currency,
      })
      .from(userSubscriptions)
      .innerJoin(
        subscriptionPlans,
        eq(userSubscriptions.planId, subscriptionPlans.id)
      )
      .where(eq(userSubscriptions.userId, userId))
      .orderBy(desc(userSubscriptions.updatedAt))
      .limit(1);

    res.json({ subscription: subscription || null });
  } catch (error) {
    console.error("Status error:", error);
    res.status(500).json({ error: "Failed to fetch subscription status" });
  }
});

router.post(
  "/razorpay/verify",
  requireAuthWithPasswordCheck,
  async (req, res) => {
    try {
      const {
        subscriptionId,
        transactionId,
        orderId,
        paymentId,
        signature,
      } = req.body;

      if (!subscriptionId || !transactionId || !orderId || !paymentId) {
        return res.status(400).json({ error: "Invalid verification payload" });
      }

      const settings = await getPaymentSettings();
      const secret =
        settings.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return res
          .status(400)
          .json({ error: "Razorpay key secret not configured" });
      }

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      if (expectedSignature !== signature) {
        await markSubscriptionFailed(
          subscriptionId,
          transactionId,
          "Invalid Razorpay signature"
        );
        return res.status(400).json({ error: "Signature verification failed" });
      }

      await markSubscriptionActive(subscriptionId, transactionId, {
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Razorpay verification error:", error);
      res.status(500).json({ error: "Failed to verify Razorpay payment" });
    }
  }
);

router.post(
  "/webhook/stripe",
  raw({ type: "application/json" }),
  async (req, res) => {
    const settings = await getPaymentSettings();
    const stripe = getStripeClient(settings.stripeSecretKey);
    const webhookSecret =
      settings.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripe || !webhookSecret) {
      return res.status(400).send("Stripe webhook not configured");
    }

    const signature = req.headers["stripe-signature"];
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature as string,
        webhookSecret
      );
    } catch (err: any) {
      console.error("Stripe webhook signature error:", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    await db
      .insert(webhookEvents)
      .values({
        provider: "stripe",
        eventId: event.id,
        eventType: event.type,
        payload: event as any,
        processed: true,
        processedAt: new Date(),
      } as WebhookEventInsert)
      .onConflictDoNothing({ target: webhookEvents.eventId });

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = parseInt(
          session.metadata?.subscriptionId || "0",
          10
        );
        const transactionId = session.metadata?.transactionId || "";

        if (subscriptionId && transactionId) {
          await markSubscriptionActive(subscriptionId, transactionId, {
            stripePaymentIntentId:
              (session.payment_intent as string) || null,
          });
        }
      } else if (
        event.type === "payment_intent.payment_failed" ||
        event.type === "checkout.session.expired"
      ) {
        const object = event.data.object as any;
        const subscriptionId = parseInt(object.metadata?.subscriptionId || "0");
        const transactionId = object.metadata?.transactionId || "";
        if (subscriptionId && transactionId) {
          await markSubscriptionFailed(
            subscriptionId,
            transactionId,
            "Stripe payment failed"
          );
        }
      }
    } catch (error) {
      console.error("Stripe webhook handler error:", error);
    }

    res.json({ received: true });
  }
);

router.post(
  "/webhook/razorpay",
  raw({ type: "application/json" }),
  async (req, res) => {
    const settings = await getPaymentSettings();
    const webhookSecret =
      settings.razorpayWebhookSecret || process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return res.status(400).send("Razorpay webhook not configured");
    }

    const signature = req.headers["x-razorpay-signature"] as string;
    const body = req.body.toString();
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).send("Invalid signature");
    }

    const payload = JSON.parse(body);

    await db
      .insert(webhookEvents)
      .values({
        provider: "razorpay",
        eventId: payload.id,
        eventType: payload.event,
        payload,
        processed: true,
        processedAt: new Date(),
      } as WebhookEventInsert)
      .onConflictDoNothing({ target: webhookEvents.eventId });

    try {
      if (payload.event === "payment.captured") {
        const notes = payload.payload.payment.entity.notes || {};
        const subscriptionId = parseInt(notes.subscriptionId || "0");
        const transactionId = notes.transactionId || "";

        if (subscriptionId && transactionId) {
          await markSubscriptionActive(subscriptionId, transactionId, {
            razorpayPaymentId: payload.payload.payment.entity.id,
            razorpayOrderId: payload.payload.payment.entity.order_id,
          });
        }
      }
    } catch (error) {
      console.error("Razorpay webhook handler error:", error);
    }

    res.json({ received: true });
  }
);

export default router;
