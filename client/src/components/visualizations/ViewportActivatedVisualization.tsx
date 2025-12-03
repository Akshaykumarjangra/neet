import { useEffect, useRef, useState } from "react";

interface ViewportActivatedVisualizationProps {
  children: React.ReactNode;
  threshold?: number;
  onActivate?: () => void;
}

export function ViewportActivatedVisualization({
  children,
  threshold = 0.3,
  onActivate,
}: ViewportActivatedVisualizationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          onActivate?.();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, onActivate, isVisible]);

  return (
    <div ref={ref} data-testid="viewport-visualization">
      {isVisible ? children : (
        <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
          <p className="text-muted-foreground text-sm">Scroll to view visualization</p>
        </div>
      )}
    </div>
  );
}

export default ViewportActivatedVisualization;
