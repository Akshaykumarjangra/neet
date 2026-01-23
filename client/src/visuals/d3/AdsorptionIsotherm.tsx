import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function AdsorptionIsotherm() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [kValue, setKValue] = useState([0.8]);
  const [nValue, setNValue] = useState([2.0]);
  const [bValue, setBValue] = useState([1.2]);
  const [showFreundlich, setShowFreundlich] = useState(true);
  const [showLangmuir, setShowLangmuir] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 720;
    const height = 320;
    const margin = { top: 24, right: 20, bottom: 40, left: 52 };

    const pressureValues = d3.range(0, 1.01, 0.02);
    const k = kValue[0];
    const n = nValue[0];
    const b = bValue[0];

    const freundlich = pressureValues.map((p) => ({
      x: p,
      y: k * Math.pow(p, 1 / n),
    }));
    const langmuir = pressureValues.map((p) => ({
      x: p,
      y: (b * p) / (1 + b * p),
    }));

    const yMaxCandidates = [];
    if (showFreundlich) {
      yMaxCandidates.push(d3.max(freundlich, (d) => d.y) ?? 0);
    }
    if (showLangmuir) {
      yMaxCandidates.push(d3.max(langmuir, (d) => d.y) ?? 0);
    }
    const yMax = Math.max(0.5, ...yMaxCandidates) * 1.15;

    const xScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([margin.left, width - margin.right]);

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
      .text("Pressure (normalized)");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 16)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", 12)
      .text("Amount adsorbed (x/m)");

    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    if (showFreundlich) {
      svg
        .append("path")
        .datum(freundlich)
        .attr("fill", "none")
        .attr("stroke", "#38bdf8")
        .attr("stroke-width", 2.5)
        .attr("d", line);
    }

    if (showLangmuir) {
      svg
        .append("path")
        .datum(langmuir)
        .attr("fill", "none")
        .attr("stroke", "#22c55e")
        .attr("stroke-width", 2.5)
        .attr("stroke-dasharray", "6 4")
        .attr("d", line);
    }

    const legend = svg.append("g").attr("transform", `translate(${width - 200}, ${margin.top})`);
    if (showFreundlich) {
      legend
        .append("line")
        .attr("x1", 0)
        .attr("x2", 24)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "#38bdf8")
        .attr("stroke-width", 2.5);
      legend
        .append("text")
        .attr("x", 32)
        .attr("y", 4)
        .attr("fill", "#e2e8f0")
        .attr("font-size", 12)
        .text("Freundlich");
    }
    if (showLangmuir) {
      const offset = showFreundlich ? 18 : 0;
      legend
        .append("line")
        .attr("x1", 0)
        .attr("x2", 24)
        .attr("y1", offset)
        .attr("y2", offset)
        .attr("stroke", "#22c55e")
        .attr("stroke-width", 2.5)
        .attr("stroke-dasharray", "6 4");
      legend
        .append("text")
        .attr("x", 32)
        .attr("y", offset + 4)
        .attr("fill", "#e2e8f0")
        .attr("font-size", 12)
        .text("Langmuir");
    }
  }, [kValue, nValue, bValue, showFreundlich, showLangmuir]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Adsorption Isotherms</span>
          <Badge variant="outline">Chemistry - Surface Chemistry</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare Freundlich and Langmuir adsorption curves as parameters change.
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

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Freundlich k: {kValue[0].toFixed(2)}
            </label>
            <Slider
              value={kValue}
              min={0.2}
              max={2.0}
              step={0.05}
              onValueChange={(val) => {
                setKValue(val);
                setAnnouncement(`Freundlich k set to ${val[0].toFixed(2)}`);
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Freundlich n: {nValue[0].toFixed(2)}
            </label>
            <Slider
              value={nValue}
              min={1.2}
              max={3.5}
              step={0.05}
              onValueChange={(val) => {
                setNValue(val);
                setAnnouncement(`Freundlich n set to ${val[0].toFixed(2)}`);
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Langmuir b: {bValue[0].toFixed(2)}
            </label>
            <Slider
              value={bValue}
              min={0.2}
              max={2.5}
              step={0.05}
              onValueChange={(val) => {
                setBValue(val);
                setAnnouncement(`Langmuir b set to ${val[0].toFixed(2)}`);
              }}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="freundlich-toggle"
                checked={showFreundlich}
                onCheckedChange={(checked) => {
                  setShowFreundlich(Boolean(checked));
                  setAnnouncement(
                    `Freundlich curve ${checked ? "enabled" : "disabled"}`
                  );
                }}
              />
              <label htmlFor="freundlich-toggle" className="text-sm">
                Show Freundlich curve
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="langmuir-toggle"
                checked={showLangmuir}
                onCheckedChange={(checked) => {
                  setShowLangmuir(Boolean(checked));
                  setAnnouncement(
                    `Langmuir curve ${checked ? "enabled" : "disabled"}`
                  );
                }}
              />
              <label htmlFor="langmuir-toggle" className="text-sm">
                Show Langmuir curve
              </label>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 border rounded-lg p-4 text-sm space-y-2">
          <p className="font-semibold">Key Notes</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>- Freundlich: x/m = k P^(1/n) describes heterogeneous surfaces.</li>
            <li>- Langmuir: monolayer adsorption with finite sites.</li>
            <li>- Compare how surface coverage changes with pressure.</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
