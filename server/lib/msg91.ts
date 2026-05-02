import fetch from "node-fetch";

const AUTH_KEY = process.env.MSG91_AUTH_KEY;
const SENDER_ID = process.env.MSG91_SENDER_ID || "ZEROAI";

export async function sendSMS(phone: string, message: string) {
  if (!AUTH_KEY) {
    console.warn("[MSG91] AUTH_KEY missing, skipping SMS to", phone);
    return;
  }

  try {
    const response = await fetch("https://api.msg91.com/api/v5/otp?template_id=" + process.env.MSG91_OTP_TEMPLATE_ID + "&mobile=" + phone + "&authkey=" + AUTH_KEY, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("[MSG91] SMS failed:", error);
    throw error;
  }
}

export async function sendOTP(phone: string) {
  if (!AUTH_KEY) {
    console.warn("[MSG91] AUTH_KEY missing, skipping OTP to", phone);
    return { success: true, mock: true }; // Allow dev testing
  }

  const templateId = process.env.MSG91_OTP_TEMPLATE_ID;
  if (!templateId) {
    throw new Error("MSG91_OTP_TEMPLATE_ID missing");
  }

  const url = `https://api.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${phone}&authkey=${AUTH_KEY}`;
  
  try {
    const response = await fetch(url, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("[MSG91] OTP send failed:", error);
    throw error;
  }
}

export async function verifyOTP(phone: string, otp: string) {
  if (!AUTH_KEY) {
    console.warn("[MSG91] AUTH_KEY missing, skipping verification for", phone);
    return { type: "success" }; // Allow dev testing
  }

  const url = `https://api.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${phone}&authkey=${AUTH_KEY}`;
  
  try {
    const response = await fetch(url, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("[MSG91] OTP verification failed:", error);
    throw error;
  }
}
