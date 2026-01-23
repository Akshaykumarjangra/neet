import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type LanthanoidEntry = {
  symbol: string;
  name: string;
  atomicNumber: number;
  radius: number;
};

const lanthanoids: LanthanoidEntry[] = [
  { symbol: "La", name: "Lanthanum", atomicNumber: 57, radius: 187 },
  { symbol: "Ce", name: "Cerium", atomicNumber: 58, radius: 182 },
  { symbol: "Pr", name: "Praseodymium", atomicNumber: 59, radius: 182 },
  { symbol: "Nd", name: "Neodymium", atomicNumber: 60, radius: 181 },
  { symbol: "Pm", name: "Promethium", atomicNumber: 61, radius: 181 },
  { symbol: "Sm", name: "Samarium", atomicNumber: 62, radius: 180 },
  { symbol: "Eu", name: "Europium", atomicNumber: 63, radius: 180 },
  { symbol: "Gd", name: "Gadolinium", atomicNumber: 64, radius: 180 },
  { symbol: "Tb", name: "Terbium", atomicNumber: 65, radius: 177 },
  { symbol: "Dy", name: "Dysprosium", atomicNumber: 66, radius: 178 },
  { symbol: "Ho", name: "Holmium", atomicNumber: 67, radius: 176 },
  { symbol: "Er", name: "Erbium", atomicNumber: 68, radius: 176 },
  { symbol: "Tm", name: "Thulium", atomicNumber: 69, radius: 175 },
  { symbol: "Yb", name: "Ytterbium", atomicNumber: 70, radius: 174 },
  { symbol: "Lu", name: "Lutetium", atomicNumber: 71, radius: 174 },
];

export default function LanthanoidContraction() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState("La");
  const [announcement, setAnnouncement] = useState("");

  const selected = useMemo(
    () => lanthanoids.find((entry) => entry.symbol === selectedSymbol) ?? lanthanoids[0],
    [selectedSymbol]
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 720;
    const height = 320;
    const margin = { top: 24, right: 24, bottom: 40, left: 60 };

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(lanthanoids, (d) => d.atomicNumber) as [number, number])
      .range([margin.left, width - margin.right]);

    const yMin = (d3.min(lanthanoids, (d) => d.radius) ?? 170) - 3;
    const yMax = (d3.max(lanthanoids, (d) => d.radius) ?? 190) + 3;
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.format("d")));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", 12)
      .text("Atomic number");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", 12)
      .text("Atomic radius (pm, approximate)");

    const line = d3
      .line<LanthanoidEntry>()
      .x((d) => xScale(d.atomicNumber))
      .y((d) => yScale(d.radius));

    svg
      .append("path")
      .datum(lanthanoids)
      .attr("fill", "none")
      .attr("stroke", "#38bdf8")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    svg
      .selectAll("circle")
      .data(lanthanoids)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.atomicNumber))
      .attr("cy", (d) => yScale(d.radius))
      .attr("r", (d) => (d.symbol === selectedSymbol ? 6 : 4))
      .attr("fill", (d) => (d.symbol === selectedSymbol ? "#22c55e" : "#38bdf8"))
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 1);

    const highlight = lanthanoids.find((entry) => entry.symbol === selectedSymbol);
    if (highlight) {
      svg
        .append("text")
        .attr("x", xScale(highlight.atomicNumber))
        .attr("y", yScale(highlight.radius) - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "#e2e8f0")
        .attr("font-size", 11)
        .text(highlight.symbol);
    }
  }, [selectedSymbol]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Lanthanoid Contraction</span>
          <Badge variant="outline">Chemistry - d/f Block</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Atomic radius decreases across the lanthanoid series (approximate values).
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Highlight element</label>
          <Select
            value={selectedSymbol}
            onValueChange={(value) => {
              setSelectedSymbol(value);
              setAnnouncement(`Selected ${value}`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {lanthanoids.map((entry) => (
                <SelectItem key={entry.symbol} value={entry.symbol}>
                  {entry.symbol} - {entry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            ref={svgRef}
            width={720}
            height={320}
            className="w-full min-w-[720px] rounded-lg border bg-slate-950"
          />
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 text-sm">
          <p className="font-semibold">
            {selected.symbol} ({selected.name})
          </p>
          <p className="text-muted-foreground">
            Atomic radius: {selected.radius} pm (approximate)
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
