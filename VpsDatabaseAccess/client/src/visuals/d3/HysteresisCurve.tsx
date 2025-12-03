
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Magnet, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function HysteresisCurve() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [maxH, setMaxH] = useState([100]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  // Hysteresis curve parameters
  const width = 600;
  const height = 500;
  const margin = { top: 40, right: 40, bottom: 60, left: 80 };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create main group
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([-maxH[0], maxH[0]])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([-80, 80])
      .range([chartHeight, 0]);

    // Generate hysteresis loop data
    const generateHysteresisData = () => {
      const data: Array<{ H: number; M: number }> = [];
      const steps = 100;
      const Hmax = maxH[0];
      const Msat = 70; // Saturation magnetization
      const Hc = 40; // Coercivity
      const Mr = 50; // Remanence

      // Upper branch (virgin curve to saturation)
      for (let i = 0; i <= steps / 4; i++) {
        const t = i / (steps / 4);
        const H = t * Hmax;
        const M = Msat * Math.tanh(H / 30);
        data.push({ H, M });
      }

      // Upper branch decreasing H
      for (let i = 0; i <= steps / 2; i++) {
        const t = i / (steps / 2);
        const H = Hmax * (1 - 2 * t);
        const M = Mr + (Msat - Mr) * Math.tanh((H - Hc) / 25);
        data.push({ H, M });
      }

      // Lower branch increasing H
      for (let i = 0; i <= steps / 2; i++) {
        const t = i / (steps / 2);
        const H = -Hmax * (1 - 2 * t);
        const M = -Mr - (Msat - Mr) * Math.tanh((-H - Hc) / 25);
        data.push({ H, M });
      }

      // Close the loop
      for (let i = 0; i <= steps / 4; i++) {
        const t = i / (steps / 4);
        const H = -Hmax + t * Hmax;
        const M = -Msat + (Mr + Msat) * Math.tanh((H + Hc) / 25);
        data.push({ H, M });
      }

      return data;
    };

    const hysteresisData = generateHysteresisData();

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(xAxis)
      .append("text")
      .attr("x", chartWidth / 2)
      .attr("y", 40)
      .attr("fill", "currentColor")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Magnetic Field (H) [A/m]");

    g.append("g")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -chartHeight / 2)
      .attr("y", -50)
      .attr("fill", "currentColor")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Magnetization (M) [A/m]");

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(yScale).tickSize(-chartWidth).tickFormat(() => ""));

    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).tickSize(-chartHeight).tickFormat(() => ""));

    // Center lines
    g.append("line")
      .attr("x1", 0)
      .attr("x2", chartWidth)
      .attr("y1", yScale(0))
      .attr("y2", yScale(0))
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.3);

    g.append("line")
      .attr("x1", xScale(0))
      .attr("x2", xScale(0))
      .attr("y1", 0)
      .attr("y2", chartHeight)
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.3);

    // Line generator
    const line = d3.line<{ H: number; M: number }>()
      .x(d => xScale(d.H))
      .y(d => yScale(d.M))
      .curve(d3.curveCardinal);

    // Draw hysteresis loop
    const path = g.append("path")
      .datum(hysteresisData)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Add direction arrows
    const arrowPoints = [
      { index: Math.floor(hysteresisData.length * 0.125), angle: 0 },
      { index: Math.floor(hysteresisData.length * 0.375), angle: 180 },
      { index: Math.floor(hysteresisData.length * 0.625), angle: 180 },
      { index: Math.floor(hysteresisData.length * 0.875), angle: 0 }
    ];

    arrowPoints.forEach(({ index, angle }) => {
      const point = hysteresisData[index];
      const nextPoint = hysteresisData[index + 1];
      if (point && nextPoint) {
        const dx = xScale(nextPoint.H) - xScale(point.H);
        const dy = yScale(nextPoint.M) - yScale(point.M);
        const arrowAngle = Math.atan2(dy, dx) * 180 / Math.PI;

        g.append("path")
          .attr("d", "M 0,-3 L 8,0 L 0,3 Z")
          .attr("fill", "#3b82f6")
          .attr("transform", `translate(${xScale(point.H)},${yScale(point.M)}) rotate(${arrowAngle})`);
      }
    });

    // Mark key points
    const keyPoints = [
      { H: 0, M: 50, label: "Mr (Remanence)", color: "#ef4444" },
      { H: -40, M: 0, label: "Hc (Coercivity)", color: "#10b981" },
      { H: maxH[0], M: 70, label: "Saturation", color: "#8b5cf6" }
    ];

    keyPoints.forEach(point => {
      g.append("circle")
        .attr("cx", xScale(point.H))
        .attr("cy", yScale(point.M))
        .attr("r", 5)
        .attr("fill", point.color);

      g.append("text")
        .attr("x", xScale(point.H) + 10)
        .attr("y", yScale(point.M) - 10)
        .attr("fill", point.color)
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text(point.label);
    });

    // Animated point
    const animatedPoint = g.append("circle")
      .attr("r", 6)
      .attr("fill", "#f59e0b")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("opacity", 0);

    // Update animated point position
    if (isPlaying && currentPoint < hysteresisData.length) {
      const point = hysteresisData[currentPoint];
      animatedPoint
        .attr("cx", xScale(point.H))
        .attr("cy", yScale(point.M))
        .style("opacity", 1);
    } else {
      animatedPoint.style("opacity", 0);
    }

  }, [maxH, currentPoint, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentPoint(prev => {
        const next = prev + 1;
        if (next >= 200) {
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!isPlaying && currentPoint >= 200) {
      setCurrentPoint(0);
    }
    setIsPlaying(!isPlaying);
    setAnnouncement(isPlaying ? "Paused animation" : "Playing animation");
  };

  const reset = () => {
    setCurrentPoint(0);
    setIsPlaying(false);
    setMaxH([100]);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Magnet className="h-5 w-5" />
            Hysteresis Curve (M vs H)
          </span>
          <Badge variant="outline">Physics - Magnetism & Matter</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Magnetic hysteresis loop showing remanence and coercivity
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="border rounded-lg bg-background"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Maximum Field (Hmax): {maxH[0]} A/m
          </label>
          <Slider
            value={maxH}
            onValueChange={(val) => {
              setMaxH(val);
              setCurrentPoint(0);
              setAnnouncement(`Maximum field: ${val[0]} A/m`);
            }}
            min={50}
            max={150}
            step={10}
            disabled={isPlaying}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={togglePlay} className="flex-1">
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {currentPoint > 0 && currentPoint < 200 ? "Resume" : "Play"}
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Hysteresis:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Remanence (Mr): Magnetization when H = 0</li>
            <li>• Coercivity (Hc): Field needed to reduce M to 0</li>
            <li>• Saturation: Maximum magnetization</li>
            <li>• Area of loop = Energy loss per cycle</li>
            <li>• Hard magnetic materials: Large loop area</li>
            <li>• Soft magnetic materials: Narrow loop</li>
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-red-500">Remanence (Mr)</p>
            <p>50 A/m</p>
          </div>
          <div>
            <p className="font-semibold text-green-500">Coercivity (Hc)</p>
            <p>40 A/m</p>
          </div>
          <div>
            <p className="font-semibold text-purple-500">Saturation</p>
            <p>70 A/m</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Applications:</h4>
          <div className="grid gap-2 text-sm bg-muted p-3 rounded">
            <p>• Hard magnets: Permanent magnets (large Hc)</p>
            <p>• Soft magnets: Transformer cores (small loop)</p>
            <p>• Magnetic recording: Data storage media</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
