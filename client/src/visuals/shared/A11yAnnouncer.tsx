
import { useEffect, useRef } from "react";

interface A11yAnnouncerProps {
  message: string;
  priority?: "polite" | "assertive";
}

export default function A11yAnnouncer({ message, priority = "polite" }: A11yAnnouncerProps) {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (liveRegionRef.current && message) {
      liveRegionRef.current.textContent = message;
    }
  }, [message]);

  return (
    <div
      ref={liveRegionRef}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    />
  );
}
