import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "./useAuth";

export function usePushNotifications() {
  const { user } = useAuth();
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );

  const registerDevice = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check for existing subscription
      let subscription = await registration.pushManager.getSubscription();
      
      if (!subscription) {
        // Request permission if not already granted
        if (Notification.permission !== 'granted') {
          const status = await Notification.requestPermission();
          setPermission(status);
          if (status !== 'granted') return;
        }

        // We'd normally need a VAPID public key here
        // For now, we'll assume registration is handled or mocked
        // subscribe() would go here
      }

      // If we have a subscription (or a mock token for now)
      // Send it to the backend
      if (user) {
        // In a real app, you'd get the token from subscription.endpoint or FCM token
        // For this demo/setup, we'll use a placeholder or check if FCM is initialized
        const fcmToken = (window as any).fcmToken || "mock-token-" + user.id;
        
        await apiRequest("POST", "/api/notifications/register-device", {
          fcmToken,
          deviceType: "web"
        });
      }
    } catch (err) {
      console.warn("[Push] Failed to register device:", err);
    }
  };

  useEffect(() => {
    if (user && permission === "granted") {
      registerDevice();
    }
  }, [user, permission]);

  return { permission, requestPermission: registerDevice };
}
