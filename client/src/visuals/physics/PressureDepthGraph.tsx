import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

type PressureDepthGraphProps = {
  title?: string;
  description?: string;
  initialDensity?: number;
  gravity?: number;
  maxDepth?: number;
};

const DEFAULT_DENSITY = 1000;
const DEFAULT_GRAVITY = 9.8;
const DEFAULT_MAX_DEPTH = 100;

export default function PressureDepthGraph({
  title,
  description,
  initialDensity = DEFAULT_DENSITY,
  gravity = DEFAULT_GRAVITY,
  maxDepth = DEFAULT_MAX_DEPTH,
}: PressureDepthGraphProps) {
  const [depthValue, setDepthValue] = useState([20]);
  const [densityValue, setDensityValue] = useState([initialDensity]);

  const depth = depthValue[0] ?? 0;
  const density = densityValue[0] ?? initialDensity;
  const pressure = density * gravity * depth;
  const pressureKpa = pressure / 1000;

  const chart = useMemo(() => {
    const width = 360;
    const height = 200;
    const padding = 28;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxPressure = density * gravity * maxDepth;

    const points = Array.from({ length: 11 }, (_, idx) => {
      const h = (idx / 10) * maxDepth;
      const p = density * gravity * h;
      const x = padding + (h / maxDepth) * chartWidth;
      const y = padding + (1 - p / maxPressure) * chartHeight;
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
      maxPressure,
    };
  }, [density, gravity, maxDepth]);

  const currentX = chart.padding + (depth / maxDepth) * chart.chartWidth;
  const currentY =
    chart.padding + (1 - pressure / chart.maxPressure) * chart.chartHeight;

  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="rounded-xl border bg-muted/10 p-4 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Depth
            </div>
            <div className="text-2xl font-semibold">{depth} m</div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Pressure (gauge)
            </div>
            <div className="text-2xl font-semibold">
              {pressureKpa.toFixed(1)} kPa
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Depth (m)
          </div>
          <Slider
            value={depthValue}
            min={0}
            max={maxDepth}
            step={1}
            onValueChange={setDepthValue}
          />
        </div>

        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Density (kg/m^3)
          </div>
          <Slider
            value={densityValue}
            min={800}
            max={1300}
            step={10}
            onValueChange={setDensityValue}
          />
        </div>

        <div className="rounded-lg border bg-background p-3">
          <svg
            viewBox={`0 0 ${chart.width} ${chart.height}`}
            className="w-full h-48"
            role="img"
            aria-label="Pressure versus depth graph"
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
            <text
              x={chart.padding}
              y={chart.height - 6}
              className="text-[10px] fill-muted-foreground"
            >
              Depth (m)
            </text>
            <text
              x={12}
              y={chart.padding - 10}
              className="text-[10px] fill-muted-foreground"
            >
              Pressure (kPa)
            </text>
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">Hydrostatics</Badge>
          <span>P = rho g h</span>
        </div>
      </div>
    </div>
  );
}
