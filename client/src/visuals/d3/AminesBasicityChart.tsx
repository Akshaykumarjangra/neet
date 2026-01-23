import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type SeriesKey = "Aliphatic" | "Aromatic";

const basicitySeries: Record<SeriesKey, Array<{ label: string; value: number }>> = {
  Aliphatic: [
    { label: "2 deg", value: 90 },
    { label: "1 deg", value: 80 },
    { label: "3 deg", value: 70 },
    { label: "NH3", value: 60 },
  ],
  Aromatic: [
    { label: "p-OMe aniline", value: 45 },
    { label: "Aniline", value: 30 },
    { label: "p-NO2 aniline", value: 15 },
  ],
};

export default function AminesBasicityChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [series, setSeries] = useState<SeriesKey>("Aliphatic");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 720;
    const height = 320;
    const margin = { top: 24, right: 24, bottom: 40, left: 60 };
    const data = basicitySeries[series];

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.25);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

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
      .text("Amine type");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", 12)
      .text("Relative basicity (scaled)");

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.label) ?? 0)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(d.value))
      .attr("fill", "#38bdf8");

    svg
      .selectAll("text.value")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#e2e8f0")
      .attr("font-size", 11)
      .text((d) => d.value);
  }, [series]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Amines Basicity Chart</span>
          <Badge variant="outline">Chemistry - Amines</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Relative basicity trends in aqueous solution (scaled for comparison).
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Series</label>
          <Select
            value={series}
            onValueChange={(value) => {
              setSeries(value as SeriesKey);
              setAnnouncement(`Series set to ${value}`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aliphatic">Aliphatic amines</SelectItem>
              <SelectItem value="Aromatic">Aromatic amines</SelectItem>
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

        <div className="rounded-lg border bg-muted/20 p-4 text-sm space-y-1">
          <p className="font-semibold">Notes</p>
          <p className="text-muted-foreground">
            Aliphatic basicity depends on inductive effects and solvation.
          </p>
          <p className="text-muted-foreground">
            Aromatic amines are less basic due to resonance delocalization.
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
