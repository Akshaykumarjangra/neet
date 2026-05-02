import admin from "firebase-admin";

/**
 * Firebase Cloud Messaging Service
 * Handles multi-device push notifications for ZERO AI NEET.
 */

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
  : null;

if (serviceAccount && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("[FCM] Firebase Admin initialized successfully");
  } catch (error) {
    console.error("[FCM] Failed to initialize Firebase Admin:", error);
  }
} else if (!serviceAccount) {
    console.warn("[FCM] FIREBASE_SERVICE_ACCOUNT not found in environment. Push notifications will be logged only.");
}

export async function sendMulticastNotification(tokens: string[], title: string, body: string, data?: Record<string, string>) {
  if (!admin.apps.length || tokens.length === 0) {
    console.log(`[FCM-Mock] Would send to ${tokens.length} tokens: "${title}"`);
    return;
  }

  const message = {
    notification: { title, body },
    data: data || {},
    tokens: tokens,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`[FCM] Sent ${response.successCount} messages; ${response.failureCount} failed.`);
    
    if (response.failureCount > 0) {
      const failedTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
        }
      });
      // Logic could be added here to remove invalid tokens from the DB
      console.log(`[FCM] Failed tokens count: ${failedTokens.length}`);
    }
    
    return response;
  } catch (error) {
    console.error("[FCM] Error sending multicast message:", error);
    throw error;
  }
}
