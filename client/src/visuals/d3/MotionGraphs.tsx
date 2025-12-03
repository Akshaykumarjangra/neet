
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function MotionGraphs() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [velocity, setVelocity] = useState([5]); // m/s
  const [acceleration, setAcceleration] = useState([2]); // m/s²
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);

  const maxTime = 10; // seconds
  const v0 = velocity[0];
  const a = acceleration[0];

  // Generate data points
  const generateData = () => {
    const points = [];
    for (let t = 0; t <= maxTime; t += 0.1) {
      const s = v0 * t + 0.5 * a * t * t; // s = v₀t + ½at²
      const v = v0 + a * t; // v = v₀ + at
      points.push({ time: t, position: s, velocity: v });
    }
    return points;
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = generateData();

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, maxTime])
      .range([0, chartWidth]);

    const yScalePosition = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.position) || 100])
      .range([chartHeight, 0]);

    const yScaleVelocity = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.velocity) || 50])
      .range([chartHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxisLeft = d3.axisLeft(yScalePosition);
    const yAxisRight = d3.axisRight(yScaleVelocity);

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(xAxis)
      .append("text")
      .attr("x", chartWidth / 2)
      .attr("y", 40)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text("Time (s)");

    g.append("g")
      .call(yAxisLeft)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", -chartHeight / 2)
      .attr("fill", "#3b82f6")
      .attr("text-anchor", "middle")
      .text("Position (m)");

    g.append("g")
      .attr("transform", `translate(${chartWidth},0)`)
      .call(yAxisRight)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 45)
      .attr("x", -chartHeight / 2)
      .attr("fill", "#10b981")
      .attr("text-anchor", "middle")
      .text("Velocity (m/s)");

    // Grid
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(yScalePosition).tickSize(-chartWidth).tickFormat(() => ""));

    // Line generators
    const linePosition = d3
      .line<{ time: number; position: number; velocity: number }>()
      .x((d) => xScale(d.time))
      .y((d) => yScalePosition(d.position))
      .curve(d3.curveMonotoneX);

    const lineVelocity = d3
      .line<{ time: number; position: number; velocity: number }>()
      .x((d) => xScale(d.time))
      .y((d) => yScaleVelocity(d.velocity))
      .curve(d3.curveLinear);

    // Position curve
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3)
      .attr("d", linePosition);

    // Velocity curve
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#10b981")
      .attr("stroke-width", 3)
      .attr("d", lineVelocity);

    // Current position marker
    const marker = g.append("g").attr("class", "marker");

    marker
      .append("line")
      .attr("y1", 0)
      .attr("y2", chartHeight)
      .attr("stroke", "#f59e0b")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    marker
      .append("circle")
      .attr("r", 5)
      .attr("fill", "#3b82f6");

    marker
      .append("circle")
      .attr("r", 5)
      .attr("fill", "#10b981");

    // Animation
    const animate = () => {
      if (isAnimating && currentTime < maxTime) {
        const newTime = currentTime + 0.05;
        setCurrentTime(newTime);

        const currentData = data.find((d) => Math.abs(d.time - newTime) < 0.05);
        if (currentData) {
          marker.attr("transform", `translate(${xScale(currentData.time)},0)`);
          marker.select("circle:nth-child(2)").attr("cy", yScalePosition(currentData.position));
          marker.select("circle:nth-child(3)").attr("cy", yScaleVelocity(currentData.velocity));
        }
      } else if (currentTime >= maxTime) {
        setIsAnimating(false);
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [velocity, acceleration, isAnimating, currentTime, v0, a, maxTime]);

  const toggleAnimation = () => {
    if (currentTime >= maxTime) {
      setCurrentTime(0);
    }
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation started");
  };

  const reset = () => {
    setCurrentTime(0);
    setIsAnimating(false);
    setVelocity([5]);
    setAcceleration([2]);
    setAnnouncement("Reset to default values");
  };

  const currentPosition = v0 * currentTime + 0.5 * a * currentTime * currentTime;
  const currentVelocity = v0 + a * currentTime;
  const slope = currentVelocity; // slope of s-t graph = velocity

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Motion Graphs (s-t and v-t)
          </span>
          <Badge variant="outline">Physics - Kinematics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive position-time and velocity-time graphs
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full overflow-x-auto">
          <svg ref={svgRef} className="w-full" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Initial Velocity (v₀): {velocity[0]} m/s
            </label>
            <Slider
              value={velocity}
              onValueChange={(val) => {
                setVelocity(val);
                setCurrentTime(0);
                setIsAnimating(false);
                setAnnouncement(`Initial velocity: ${val[0]} m/s`);
              }}
              min={0}
              max={20}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Acceleration (a): {acceleration[0]} m/s²
            </label>
            <Slider
              value={acceleration}
              onValueChange={(val) => {
                setAcceleration(val);
                setCurrentTime(0);
                setIsAnimating(false);
                setAnnouncement(`Acceleration: ${val[0]} m/s²`);
              }}
              min={-5}
              max={10}
              step={0.5}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-blue-600">Position</p>
            <p className="font-mono text-2xl">{currentPosition.toFixed(2)} m</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">Velocity</p>
            <p className="font-mono text-2xl">{currentVelocity.toFixed(2)} m/s</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">Time</p>
            <p className="font-mono text-2xl">{currentTime.toFixed(2)} s</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">Current Analysis:</p>
          <p className="font-mono text-blue-600">Slope of s-t graph = velocity = {slope.toFixed(2)} m/s</p>
          <p className="font-mono text-green-600">Slope of v-t graph = acceleration = {a.toFixed(2)} m/s²</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={toggleAnimation} className="flex-1">
            {isAnimating ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Play
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Motion Graphs:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• s = v₀t + ½at² (position-time equation)</li>
            <li>• v = v₀ + at (velocity-time equation)</li>
            <li>• Slope of s-t graph = instantaneous velocity</li>
            <li>• Slope of v-t graph = acceleration</li>
            <li>• Area under v-t graph = displacement</li>
            <li>• Curved s-t graph → non-zero acceleration</li>
            <li>• Straight v-t graph → constant acceleration</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
