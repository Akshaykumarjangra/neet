import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type EllinghamLine = {
  id: string;
  label: string;
  color: string;
  intercept: number;
  slope: number;
};

const lines: EllinghamLine[] = [
  { id: "al2o3", label: "Al2O3", color: "#2563eb", intercept: -900, slope: 0.15 },
  { id: "feo", label: "FeO", color: "#f97316", intercept: -340, slope: 0.12 },
  { id: "zno", label: "ZnO", color: "#22c55e", intercept: -380, slope: 0.14 },
  { id: "co", label: "2C + O2 -> 2CO", color: "#a855f7", intercept: -120, slope: -0.02 },
];

export default function EllinghamDiagram() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [temperature, setTemperature] = useState([1200]);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 720;
    const height = 320;
    const margin = { top: 24, right: 24, bottom: 40, left: 60 };
    const tempMin = 300;
    const tempMax = 2000;

    const tempRange = d3.range(tempMin, tempMax + 1, 50);
    const series = lines.map((line) => ({
      line,
      points: tempRange.map((t) => ({
        x: t,
        y: line.intercept + line.slope * t,
      })),
    }));

    const yValues = series.flatMap((s) => s.points.map((p) => p.y));
    const yMin = (d3.min(yValues) ?? -1000) - 50;
    const yMax = (d3.max(yValues) ?? 0) + 50;

    const xScale = d3
      .scaleLinear()
      .domain([tempMin, tempMax])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(6));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(6));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", 12)
      .text("Temperature (K)");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", 12)
      .text("Delta G (kJ/mol of O2)");

    const lineGenerator = d3
      .line<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    series.forEach(({ line, points }) => {
      svg
        .append("path")
        .datum(points)
        .attr("fill", "none")
        .attr("stroke", line.color)
        .attr("stroke-width", 2.5)
        .attr("d", lineGenerator);
    });

    const selectedTemp = temperature[0];

    svg
      .append("line")
      .attr("x1", xScale(selectedTemp))
      .attr("x2", xScale(selectedTemp))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "#94a3b8")
      .attr("stroke-dasharray", "4 4");

    series.forEach(({ line }) => {
      const value = line.intercept + line.slope * selectedTemp;
      svg
        .append("circle")
        .attr("cx", xScale(selectedTemp))
        .attr("cy", yScale(value))
        .attr("r", 4)
        .attr("fill", line.color)
        .attr("stroke", "#0f172a")
        .attr("stroke-width", 1);
    });

    const legend = svg.append("g").attr("transform", `translate(${width - 230}, ${margin.top})`);
    series.forEach(({ line }, idx) => {
      const row = legend.append("g").attr("transform", `translate(0, ${idx * 18})`);
      row
        .append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", line.color);
      row
        .append("text")
        .attr("x", 18)
        .attr("y", 10)
        .attr("fill", "#e2e8f0")
        .attr("font-size", 11)
        .text(line.label);
    });
  }, [temperature]);

  const selectedTemp = temperature[0];
  const values = lines.map((line) => ({
    label: line.label,
    value: line.intercept + line.slope * selectedTemp,
    color: line.color,
  }));
  const lowest = values.reduce((min, current) =>
    current.value < min.value ? current : min
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Ellingham Diagram Explorer</span>
          <Badge variant="outline">Chemistry - Metallurgy</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare oxide stability across temperature using a simplified Ellingham diagram.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full overflow-x-auto">
          <svg
            ref={svgRef}
            width={720}
            height={320}
            className="w-full min-w-[720px] rounded-lg border bg-slate-950"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Temperature: {selectedTemp} K
          </label>
          <Slider
            value={temperature}
            min={300}
            max={2000}
            step={50}
            onValueChange={(val) => {
              setTemperature(val);
              setAnnouncement(`Temperature set to ${val[0]} kelvin`);
            }}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2 text-sm">
          {values.map((line) => (
            <div key={line.label} className="flex items-center gap-3 rounded border p-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: line.color }}
              />
              <div className="flex-1">
                <div className="font-semibold">{line.label}</div>
                <div className="text-muted-foreground">
                  Delta G: {line.value.toFixed(0)} kJ/mol
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 text-sm">
          <p className="font-semibold">Most stable oxide at {selectedTemp} K</p>
          <p className="text-muted-foreground">
            {lowest.label} (lowest delta G)
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
