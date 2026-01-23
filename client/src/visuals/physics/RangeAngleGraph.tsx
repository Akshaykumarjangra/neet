import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

type RangeAngleGraphProps = {
  title?: string;
  description?: string;
  initialSpeed?: number;
  gravity?: number;
};

const DEFAULT_SPEED = 20;
const DEFAULT_GRAVITY = 9.8;

export default function RangeAngleGraph({
  title,
  description,
  initialSpeed = DEFAULT_SPEED,
  gravity = DEFAULT_GRAVITY,
}: RangeAngleGraphProps) {
  const [angleValue, setAngleValue] = useState([45]);
  const angle = angleValue[0] ?? 45;

  const radians = (2 * angle * Math.PI) / 180;
  const normalizedRange = Math.max(0, Math.sin(radians));
  const maxRange = (initialSpeed * initialSpeed) / gravity;
  const range = Math.max(0, maxRange * normalizedRange);

  const chart = useMemo(() => {
    const width = 360;
    const height = 200;
    const padding = 28;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = Array.from({ length: 91 }, (_, deg) => {
      const rad = (2 * deg * Math.PI) / 180;
      const yValue = Math.max(0, Math.sin(rad));
      const x = padding + (deg / 90) * chartWidth;
      const y = padding + (1 - yValue) * chartHeight;
      return { x, y };
    });

    const path = points
      .map((point, idx) => `${idx === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");

    return {
      width,
      height,
      padding,
      chartWidth,
      chartHeight,
      path,
    };
  }, []);

  const currentX = chart.padding + (angle / 90) * chart.chartWidth;
  const currentY = chart.padding + (1 - normalizedRange) * chart.chartHeight;

  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="rounded-xl border bg-muted/10 p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Launch Angle
            </div>
            <div className="text-2xl font-semibold">{angle} deg</div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Range (u = {initialSpeed} m/s, g = {gravity} m/s^2)
            </div>
            <div className="text-2xl font-semibold">{range.toFixed(2)} m</div>
          </div>
        </div>

        <Slider
          value={angleValue}
          min={0}
          max={90}
          step={1}
          onValueChange={setAngleValue}
        />

        <div className="rounded-lg border bg-background p-3">
          <svg
            viewBox={`0 0 ${chart.width} ${chart.height}`}
            className="w-full h-48"
            role="img"
            aria-label="Range versus launch angle graph"
          >
            <rect
              x={chart.padding}
              y={chart.padding}
              width={chart.chartWidth}
              height={chart.chartHeight}
              fill="transparent"
              stroke="currentColor"
              opacity="0.1"
            />
            <path
              d={chart.path}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.7"
            />
            <line
              x1={currentX}
              x2={currentX}
              y1={chart.padding}
              y2={chart.padding + chart.chartHeight}
              stroke="currentColor"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <circle cx={currentX} cy={currentY} r="5" fill="currentColor" />
            <text x={chart.padding} y={chart.height - 6} className="text-[10px] fill-muted-foreground">
              Angle (deg)
            </text>
            <text
              x={12}
              y={chart.padding - 10}
              className="text-[10px] fill-muted-foreground"
            >
              Normalized Range
            </text>
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">Projectile Motion</Badge>
          <span>R(theta) = (u^2 / g) * sin(2 theta)</span>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <div>Max range occurs at 45 deg.</div>
          <div>Complementary angles (theta, 90 - theta) give the same range.</div>
        </div>
      </div>
    </div>
  );
}
