
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function PositionVelocityGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [acceleration, setAcceleration] = useState([2]);
  const [initialVelocity, setInitialVelocity] = useState([0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const timeRef = useRef(0);
  const animationRef = useRef<number>();

  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 50, left: 60 };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([margin.left, width - margin.right]);

    const yScalePos = d3.scaleLinear()
      .domain([0, 200])
      .range([height - margin.bottom, margin.top]);

    const yScaleVel = d3.scaleLinear()
      .domain([0, 50])
      .range([height - margin.bottom, margin.top]);

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxisPos = d3.axisLeft(yScalePos);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "currentColor")
      .style("font-size", "14px")
      .text("Time (s)");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxisPos)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("fill", "currentColor")
      .style("font-size", "14px")
      .text("Position (m) / Velocity (m/s)");

    // Position line generator
    const positionLine = d3.line<[number, number]>()
      .x(d => xScale(d[0]))
      .y(d => yScalePos(d[1]));

    // Velocity line generator
    const velocityLine = d3.line<[number, number]>()
      .x(d => xScale(d[0]))
      .y(d => yScaleVel(d[1]));

    // Add position path
    svg.append("path")
      .attr("class", "position-line")
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2);

    // Add velocity path
    svg.append("path")
      .attr("class", "velocity-line")
      .attr("fill", "none")
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 2);

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 150}, 30)`);

    legend.append("line")
      .attr("x1", 0)
      .attr("x2", 30)
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2);

    legend.append("text")
      .attr("x", 35)
      .attr("y", 5)
      .attr("fill", "currentColor")
      .style("font-size", "12px")
      .text("Position (s = ut + ½at²)");

    legend.append("line")
      .attr("x1", 0)
      .attr("x2", 30)
      .attr("y1", 20)
      .attr("y2", 20)
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 2);

    legend.append("text")
      .attr("x", 35)
      .attr("y", 25)
      .attr("fill", "currentColor")
      .style("font-size", "12px")
      .text("Velocity (v = u + at)");

  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      if (timeRef.current > 10) {
        setIsAnimating(false);
        return;
      }

      const svg = d3.select(svgRef.current);
      const t = timeRef.current;
      const a = acceleration[0];
      const u = initialVelocity[0];

      // Generate data points
      const positionData: [number, number][] = [];
      const velocityData: [number, number][] = [];

      for (let time = 0; time <= t; time += 0.1) {
        const position = u * time + 0.5 * a * time * time;
        const velocity = u + a * time;
        positionData.push([time, position]);
        velocityData.push([time, velocity]);
      }

      const xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([margin.left, width - margin.right]);

      const yScalePos = d3.scaleLinear()
        .domain([0, 200])
        .range([height - margin.bottom, margin.top]);

      const yScaleVel = d3.scaleLinear()
        .domain([0, 50])
        .range([height - margin.bottom, margin.top]);

      const positionLine = d3.line<[number, number]>()
        .x(d => xScale(d[0]))
        .y(d => yScalePos(d[1]));

      const velocityLine = d3.line<[number, number]>()
        .x(d => xScale(d[0]))
        .y(d => yScaleVel(d[1]));

      svg.select(".position-line")
        .attr("d", positionLine(positionData));

      svg.select(".velocity-line")
        .attr("d", velocityLine(velocityData));

      timeRef.current += 0.1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, acceleration, initialVelocity]);

  const handleReset = () => {
    timeRef.current = 0;
    setIsAnimating(false);
    const svg = d3.select(svgRef.current);
    svg.select(".position-line").attr("d", null);
    svg.select(".velocity-line").attr("d", null);
    setAnnouncement("Graph reset");
  };

  const toggleAnimation = () => {
    if (!isAnimating && timeRef.current >= 10) {
      timeRef.current = 0;
    }
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation started");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Position-Velocity-Time Graphs
          </span>
          <Badge variant="outline">Physics - Kinematics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize motion with real-time graphing
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} width={width} height={height} className="border rounded-lg" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Acceleration: {acceleration[0]} m/s²
            </label>
            <Slider
              value={acceleration}
              onValueChange={(val) => {
                setAcceleration(val);
                setAnnouncement(`Acceleration set to ${val[0]} m/s²`);
              }}
              min={-5}
              max={5}
              step={0.5}
              disabled={isAnimating}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Initial Velocity: {initialVelocity[0]} m/s
            </label>
            <Slider
              value={initialVelocity}
              onValueChange={(val) => {
                setInitialVelocity(val);
                setAnnouncement(`Initial velocity set to ${val[0]} m/s`);
              }}
              min={0}
              max={10}
              step={0.5}
              disabled={isAnimating}
            />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2">
          <p className="font-semibold">Key Observations:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>📈 <strong>Blue line</strong>: Position vs time (parabolic for uniform acceleration)</li>
            <li>📊 <strong>Red line</strong>: Velocity vs time (linear for uniform acceleration)</li>
            <li>🔵 Slope of position-time = velocity</li>
            <li>🔴 Slope of velocity-time = acceleration</li>
          </ul>
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
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Formulas:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Position: s = ut + ½at²</li>
            <li>• Velocity: v = u + at</li>
            <li>• v² = u² + 2as</li>
            <li>• Average velocity = (u + v)/2</li>
            <li>• Slope of s-t graph = instantaneous velocity</li>
            <li>• Slope of v-t graph = acceleration</li>
            <li>• Area under v-t graph = displacement</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
