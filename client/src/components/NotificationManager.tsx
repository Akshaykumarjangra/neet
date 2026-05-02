import { useState, useEffect } from "react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NotificationManager() {
  const { permission, requestPermission } = usePushNotifications();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt if permission is default (not yet asked)
    if (permission === "default") {
      const timer = setTimeout(() => setShowPrompt(true), 5000); // Wait 5s before asking
      return () => clearTimeout(timer);
    }
  }, [permission]);

  if (permission === "granted") return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
        >
          <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="p-2 bg-primary/10 rounded-full h-fit">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="font-bold italic text-sm">Stay on Track!</p>
                    <button 
                      onClick={() => setShowPrompt(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    Enable push notifications for study reminders, mock test results, and mentor updates.
                  </p>
                  <div className="pt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      className="h-8 text-xs font-bold italic rounded-lg"
                      onClick={async () => {
                        await requestPermission();
                        setShowPrompt(false);
                      }}
                    >
                      Enable Now
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs font-bold italic rounded-lg"
                      onClick={() => setShowPrompt(false)}
                    >
                      Maybe Later
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
