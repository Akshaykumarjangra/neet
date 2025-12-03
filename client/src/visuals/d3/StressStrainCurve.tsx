
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function StressStrainCurve() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentPoint, setCurrentPoint] = useState({ strain: 0, stress: 0 });
  const [phase, setPhase] = useState("Elastic");
  const [announcement, setAnnouncement] = useState("");

  const width = 700;
  const height = 500;
  const margin = { top: 40, right: 60, bottom: 60, left: 80 };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define stress-strain curve data points
    const data = [
      { strain: 0, stress: 0, phase: "Origin" },
      { strain: 0.002, stress: 200, phase: "Elastic" },
      { strain: 0.004, stress: 250, phase: "Yield Point" },
      { strain: 0.01, stress: 280, phase: "Plastic" },
      { strain: 0.15, stress: 400, phase: "Strain Hardening" },
      { strain: 0.25, stress: 450, phase: "Ultimate Strength" },
      { strain: 0.30, stress: 380, phase: "Necking" },
      { strain: 0.35, stress: 0, phase: "Fracture" },
    ];

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, 0.4])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 500])
      .range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d => `${(+d * 100).toFixed(0)}%`);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => `${d} MPa`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .style("color", "#64748b");

    g.append("g")
      .call(yAxis)
      .style("color", "#64748b");

    // Axis labels
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 45)
      .attr("text-anchor", "middle")
      .style("fill", "#1e293b")
      .style("font-size", "14px")
      .text("Strain (ε)");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .style("fill", "#1e293b")
      .style("font-size", "14px")
      .text("Stress (σ) - MPa");

    // Draw curve
    const line = d3
      .line<{ strain: number; stress: number }>()
      .x(d => xScale(d.strain))
      .y(d => yScale(d.stress))
      .curve(d3.curveCatmullRom);

    const path = g
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3);

    // Mark important points
    const markers = [
      { x: 0.002, y: 200, label: "Elastic Limit", color: "#10b981" },
      { x: 0.004, y: 250, label: "Yield Point", color: "#f59e0b" },
      { x: 0.25, y: 450, label: "Ultimate Strength", color: "#ef4444" },
      { x: 0.35, y: 0, label: "Fracture", color: "#8b5cf6" },
    ];

    markers.forEach(marker => {
      g.append("circle")
        .attr("cx", xScale(marker.x))
        .attr("cy", yScale(marker.y))
        .attr("r", 5)
        .attr("fill", marker.color);

      g.append("text")
        .attr("x", xScale(marker.x) + 10)
        .attr("y", yScale(marker.y) - 10)
        .style("font-size", "11px")
        .style("fill", marker.color)
        .text(marker.label);
    });

    // Interactive draggable point
    const dragPoint = g
      .append("circle")
      .attr("cx", 0)
      .attr("cy", innerHeight)
      .attr("r", 8)
      .attr("fill", "#3b82f6")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "grab");

    const drag = d3.drag<SVGCircleElement, unknown>()
      .on("start", function() {
        d3.select(this).style("cursor", "grabbing");
      })
      .on("drag", function(event) {
        const x = Math.max(0, Math.min(innerWidth, event.x));
        const strain = xScale.invert(x);
        
        // Find stress at this strain
        let stress = 0;
        let currentPhase = "Elastic";
        
        for (let i = 0; i < data.length - 1; i++) {
          if (strain >= data[i].strain && strain <= data[i + 1].strain) {
            const t = (strain - data[i].strain) / (data[i + 1].strain - data[i].strain);
            stress = data[i].stress + t * (data[i + 1].stress - data[i].stress);
            currentPhase = data[i].phase;
            break;
          }
        }

        d3.select(this)
          .attr("cx", x)
          .attr("cy", yScale(stress));

        setCurrentPoint({ strain, stress });
        setPhase(currentPhase);
        setAnnouncement(`Strain: ${(strain * 100).toFixed(2)}%, Stress: ${stress.toFixed(1)} MPa, Phase: ${currentPhase}`);
      })
      .on("end", function() {
        d3.select(this).style("cursor", "grab");
      });

    dragPoint.call(drag as any);

    // Regions
    const regions = [
      { x1: 0, x2: 0.002, color: "#10b981", label: "Elastic", opacity: 0.1 },
      { x1: 0.002, x2: 0.15, color: "#f59e0b", label: "Plastic", opacity: 0.1 },
      { x1: 0.15, x2: 0.35, color: "#ef4444", label: "Fracture Zone", opacity: 0.1 },
    ];

    regions.forEach(region => {
      g.append("rect")
        .attr("x", xScale(region.x1))
        .attr("y", 0)
        .attr("width", xScale(region.x2) - xScale(region.x1))
        .attr("height", innerHeight)
        .attr("fill", region.color)
        .attr("opacity", region.opacity);
    });

  }, []);

  const reset = () => {
    setCurrentPoint({ strain: 0, stress: 0 });
    setPhase("Origin");
    setAnnouncement("Reset to origin");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Stress-Strain Curve</span>
          <Badge variant="outline">Physics - Properties of Solids</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Drag the point to explore different phases of material deformation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-auto border rounded-lg bg-white dark:bg-slate-950"
        />

        <div className="bg-muted p-4 rounded-lg grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Strain (ε)</p>
            <p className="text-xl font-bold">{(currentPoint.strain * 100).toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stress (σ)</p>
            <p className="text-xl font-bold">{currentPoint.stress.toFixed(1)} MPa</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phase</p>
            <p className="text-xl font-bold text-primary">{phase}</p>
          </div>
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <div className="space-y-2 text-sm">
          <p className="font-medium">Material Properties:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• <strong>Young's Modulus:</strong> Slope of elastic region (E = σ/ε)</li>
            <li>• <strong>Yield Strength:</strong> Stress at yield point (~250 MPa)</li>
            <li>• <strong>Ultimate Strength:</strong> Maximum stress (~450 MPa)</li>
            <li>• <strong>Fracture Point:</strong> Where material breaks</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
