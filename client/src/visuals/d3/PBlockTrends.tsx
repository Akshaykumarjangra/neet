import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type TrendPoint = {
  symbol: string;
  period: number;
  radius: number;
  ionization: number;
};

const groupData: Record<string, TrendPoint[]> = {
  "Group 15": [
    { symbol: "N", period: 2, radius: 65, ionization: 1402 },
    { symbol: "P", period: 3, radius: 100, ionization: 1012 },
    { symbol: "As", period: 4, radius: 115, ionization: 947 },
    { symbol: "Sb", period: 5, radius: 145, ionization: 834 },
    { symbol: "Bi", period: 6, radius: 155, ionization: 703 },
  ],
  "Group 16": [
    { symbol: "O", period: 2, radius: 60, ionization: 1314 },
    { symbol: "S", period: 3, radius: 100, ionization: 1000 },
    { symbol: "Se", period: 4, radius: 115, ionization: 941 },
    { symbol: "Te", period: 5, radius: 140, ionization: 869 },
    { symbol: "Po", period: 6, radius: 167, ionization: 812 },
  ],
  "Group 17": [
    { symbol: "F", period: 2, radius: 50, ionization: 1681 },
    { symbol: "Cl", period: 3, radius: 79, ionization: 1251 },
    { symbol: "Br", period: 4, radius: 94, ionization: 1140 },
    { symbol: "I", period: 5, radius: 115, ionization: 1008 },
    { symbol: "At", period: 6, radius: 140, ionization: 920 },
  ],
  "Group 18": [
    { symbol: "He", period: 1, radius: 31, ionization: 2372 },
    { symbol: "Ne", period: 2, radius: 38, ionization: 2080 },
    { symbol: "Ar", period: 3, radius: 71, ionization: 1521 },
    { symbol: "Kr", period: 4, radius: 88, ionization: 1351 },
    { symbol: "Xe", period: 5, radius: 108, ionization: 1170 },
    { symbol: "Rn", period: 6, radius: 120, ionization: 1037 },
  ],
};

const propertyOptions = [
  { key: "radius", label: "Atomic Radius (pm)" },
  { key: "ionization", label: "First Ionization Energy (kJ/mol)" },
];

export default function PBlockTrends() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedGroup, setSelectedGroup] = useState("Group 15");
  const [selectedProperty, setSelectedProperty] = useState("radius");
  const [announcement, setAnnouncement] = useState("");

  const data = useMemo(() => groupData[selectedGroup], [selectedGroup]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 720;
    const height = 320;
    const margin = { top: 24, right: 24, bottom: 40, left: 60 };

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.period) as [number, number])
      .range([margin.left, width - margin.right]);

    const yValues = data.map((d) => d[selectedProperty as keyof TrendPoint] as number);
    const yMin = (d3.min(yValues) ?? 0) * 0.9;
    const yMax = (d3.max(yValues) ?? 1) * 1.1;
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(data.length).tickFormat(d3.format("d")));

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
      .text("Period");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", 12)
      .text(propertyOptions.find((opt) => opt.key === selectedProperty)?.label ?? "");

    const line = d3
      .line<TrendPoint>()
      .x((d) => xScale(d.period))
      .y((d) => yScale(d[selectedProperty as keyof TrendPoint] as number));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#38bdf8")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.period))
      .attr("cy", (d) => yScale(d[selectedProperty as keyof TrendPoint] as number))
      .attr("r", 4)
      .attr("fill", "#38bdf8");

    svg
      .selectAll("text.labels")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(d.period))
      .attr("y", (d) => yScale(d[selectedProperty as keyof TrendPoint] as number) - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#e2e8f0")
      .attr("font-size", 11)
      .text((d) => d.symbol);
  }, [data, selectedProperty]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>p-Block Trends Explorer</span>
          <Badge variant="outline">Chemistry - p-Block</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare atomic radius and ionization energy down groups 15 to 18.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Group</label>
            <Select
              value={selectedGroup}
              onValueChange={(value) => {
                setSelectedGroup(value);
                setAnnouncement(`Group set to ${value}`);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(groupData).map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Property</label>
            <Select
              value={selectedProperty}
              onValueChange={(value) => {
                setSelectedProperty(value);
                const label = propertyOptions.find((opt) => opt.key === value)?.label ?? value;
                setAnnouncement(`Property set to ${label}`);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {propertyOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            ref={svgRef}
            width={720}
            height={320}
            className="w-full min-w-[720px] rounded-lg border bg-slate-950"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-3 text-sm">
          {data.map((entry) => (
            <div key={entry.symbol} className="rounded border p-3">
              <div className="font-semibold">{entry.symbol}</div>
              <div className="text-muted-foreground">
                Radius: {entry.radius} pm
              </div>
              <div className="text-muted-foreground">
                Ionization: {entry.ionization} kJ/mol
              </div>
            </div>
          ))}
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
