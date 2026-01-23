import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type Mechanism = "SN1" | "SN2";

export default function SN1SN2Profile() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [mechanism, setMechanism] = useState<Mechanism>("SN2");
  const [leavingGroup, setLeavingGroup] = useState([3]);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 720;
    const height = 320;
    const margin = { top: 24, right: 24, bottom: 40, left: 60 };

    const baseEnergy = 10;
    const barrier = 60 - leavingGroup[0] * 8;

    const points =
      mechanism === "SN2"
        ? [
            { x: 0, y: baseEnergy },
            { x: 0.5, y: baseEnergy + barrier },
            { x: 1, y: baseEnergy },
          ]
        : [
            { x: 0, y: baseEnergy },
            { x: 0.3, y: baseEnergy + barrier * 1.1 },
            { x: 0.55, y: baseEnergy + barrier * 0.4 },
            { x: 0.8, y: baseEnergy + barrier * 0.8 },
            { x: 1, y: baseEnergy },
          ];

    const xScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([margin.left, width - margin.right]);

    const yMax = Math.max(...points.map((p) => p.y)) + 10;
    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5));

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
      .text("Reaction coordinate");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", 12)
      .text("Relative energy");

    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveBasis);

    svg
      .append("path")
      .datum(points)
      .attr("fill", "none")
      .attr("stroke", "#38bdf8")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    svg
      .append("text")
      .attr("x", xScale(0))
      .attr("y", yScale(baseEnergy) - 8)
      .attr("text-anchor", "start")
      .attr("fill", "#e2e8f0")
      .attr("font-size", 11)
      .text("Reactants");

    svg
      .append("text")
      .attr("x", xScale(1))
      .attr("y", yScale(baseEnergy) - 8)
      .attr("text-anchor", "end")
      .attr("fill", "#e2e8f0")
      .attr("font-size", 11)
      .text("Products");

    if (mechanism === "SN1") {
      svg
        .append("text")
        .attr("x", xScale(0.55))
        .attr("y", yScale(baseEnergy + barrier * 0.4) - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "#e2e8f0")
        .attr("font-size", 11)
        .text("Carbocation intermediate");
    }
  }, [mechanism, leavingGroup]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>SN1 vs SN2 Energy Profile</span>
          <Badge variant="outline">Chemistry - Haloalkanes</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare one step and two step substitution pathways.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mechanism</label>
            <Select
              value={mechanism}
              onValueChange={(value) => {
                setMechanism(value as Mechanism);
                setAnnouncement(`Mechanism set to ${value}`);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SN1">SN1 (two step)</SelectItem>
                <SelectItem value="SN2">SN2 (one step)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Leaving group strength: {leavingGroup[0]} / 5
            </label>
            <Slider
              value={leavingGroup}
              min={1}
              max={5}
              step={1}
              onValueChange={(val) => {
                setLeavingGroup(val);
                setAnnouncement(`Leaving group strength set to ${val[0]}`);
              }}
            />
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

        <div className="rounded-lg border bg-muted/20 p-4 text-sm space-y-1">
          <p className="font-semibold">NEET Tips</p>
          <p className="text-muted-foreground">
            SN1 is favored by tertiary substrates and polar protic solvents.
          </p>
          <p className="text-muted-foreground">
            SN2 is favored by primary substrates and strong nucleophiles.
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
