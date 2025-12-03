
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Zap, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function ACCircuit() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [resistance, setResistance] = useState([50]);
  const [inductance, setInductance] = useState([0.1]);
  const [capacitance, setCapacitance] = useState([100]);
  const [frequency, setFrequency] = useState([50]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);

  const R = resistance[0];
  const L = inductance[0];
  const C = capacitance[0] * 1e-6; // Convert μF to F
  const f = frequency[0];
  const omega = 2 * Math.PI * f;

  const XL = omega * L; // Inductive reactance
  const XC = 1 / (omega * C); // Capacitive reactance
  const X = XL - XC; // Net reactance
  const Z = Math.sqrt(R * R + X * X); // Impedance
  const phi = Math.atan2(X, R); // Phase angle
  const phiDeg = (phi * 180) / Math.PI;

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Phasor diagram (left side)
    const phasorG = g.append("g").attr("transform", `translate(${plotWidth * 0.25}, ${plotHeight / 2})`);
    const scale = Math.min(plotWidth, plotHeight) / 4;

    // Axes
    phasorG
      .append("line")
      .attr("x1", -scale)
      .attr("x2", scale)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#888")
      .attr("stroke-width", 1);

    phasorG
      .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", -scale)
      .attr("y2", scale)
      .attr("stroke", "#888")
      .attr("stroke-width", 1);

    // Voltage phasor (reference)
    const V = 100; // Reference voltage
    phasorG
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (V / Z) * scale)
      .attr("y2", 0)
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#arrowblue)");

    // Current phasor
    const currentScale = (V / Z) * scale;
    const currentGroup = phasorG.append("g");
    currentGroup
      .append("line")
      .attr("class", "current-phasor")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", currentScale * Math.cos(-phi))
      .attr("y2", currentScale * Math.sin(-phi))
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#arrowred)");

    // Phase angle arc
    if (Math.abs(phiDeg) > 1) {
      const arcRadius = scale * 0.3;
      const arc = d3
        .arc()
        .innerRadius(arcRadius)
        .outerRadius(arcRadius)
        .startAngle(phi > 0 ? 0 : -phi)
        .endAngle(phi > 0 ? -phi : 0);

      phasorG
        .append("path")
        .attr("d", arc as any)
        .attr("fill", "none")
        .attr("stroke", "#10b981")
        .attr("stroke-width", 2);

      phasorG
        .append("text")
        .attr("x", arcRadius * Math.cos(-phi / 2) * 1.3)
        .attr("y", arcRadius * Math.sin(-phi / 2) * 1.3)
        .attr("text-anchor", "middle")
        .attr("fill", "#10b981")
        .style("font-size", "14px")
        .text(`φ = ${phiDeg.toFixed(1)}°`);
    }

    // Labels
    phasorG
      .append("text")
      .attr("x", (V / Z) * scale / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("fill", "#3b82f6")
      .style("font-weight", "bold")
      .text("V");

    phasorG
      .append("text")
      .attr("x", currentScale * Math.cos(-phi) / 2)
      .attr("y", currentScale * Math.sin(-phi) / 2 + 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#ef4444")
      .style("font-weight", "bold")
      .text("I");

    // Waveforms (right side)
    const waveG = g.append("g").attr("transform", `translate(${plotWidth * 0.6}, ${plotHeight / 2})`);
    const waveWidth = plotWidth * 0.35;
    const waveHeight = plotHeight * 0.4;

    const xScale = d3.scaleLinear().domain([0, 2 * Math.PI]).range([0, waveWidth]);
    const yScale = d3.scaleLinear().domain([-1.5, 1.5]).range([waveHeight, -waveHeight]);

    // Voltage wave
    const voltageLine = d3
      .line<number>()
      .x((d) => xScale(d))
      .y((d) => yScale(Math.sin(d)));

    const voltageData = d3.range(0, 2 * Math.PI, 0.01);
    waveG
      .append("path")
      .datum(voltageData)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", voltageLine);

    // Current wave
    const currentLine = d3
      .line<number>()
      .x((d) => xScale(d))
      .y((d) => yScale(Math.sin(d + phi)));

    waveG
      .append("path")
      .datum(voltageData)
      .attr("fill", "none")
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 2)
      .attr("d", currentLine);

    // Axes for waveforms
    waveG
      .append("line")
      .attr("x1", 0)
      .attr("x2", waveWidth)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#888")
      .attr("stroke-width", 1);

    // Arrow markers
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowblue")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 8)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#3b82f6");

    svg
      .select("defs")
      .append("marker")
      .attr("id", "arrowred")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 8)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#ef4444");

    // Animation
    let time = 0;
    const animate = () => {
      if (isAnimating) {
        time += 0.02;
        currentGroup
          .select(".current-phasor")
          .attr("x2", currentScale * Math.cos(-phi + time * omega / 10))
          .attr("y2", currentScale * Math.sin(-phi + time * omega / 10));
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resistance, inductance, capacitance, frequency, isAnimating, phi, R, X, Z, XL, XC, omega]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  const reset = () => {
    setResistance([50]);
    setInductance([0.1]);
    setCapacitance([100]);
    setFrequency([50]);
    setIsAnimating(true);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AC Circuit Phasor Diagram
          </span>
          <Badge variant="outline">Physics - AC Circuits</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          RLC series circuit with phasor representation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} className="w-full h-[400px] border rounded-lg bg-background" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Resistance (R): {resistance[0]} Ω</label>
            <Slider
              value={resistance}
              onValueChange={(val) => {
                setResistance(val);
                setAnnouncement(`Resistance: ${val[0]} ohms`);
              }}
              min={10}
              max={100}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Inductance (L): {inductance[0]} H</label>
            <Slider
              value={inductance}
              onValueChange={(val) => {
                setInductance(val);
                setAnnouncement(`Inductance: ${val[0]} henry`);
              }}
              min={0.05}
              max={0.5}
              step={0.05}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Capacitance (C): {capacitance[0]} μF</label>
            <Slider
              value={capacitance}
              onValueChange={(val) => {
                setCapacitance(val);
                setAnnouncement(`Capacitance: ${val[0]} microfarads`);
              }}
              min={50}
              max={200}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Frequency (f): {frequency[0]} Hz</label>
            <Slider
              value={frequency}
              onValueChange={(val) => {
                setFrequency(val);
                setAnnouncement(`Frequency: ${val[0]} hertz`);
              }}
              min={25}
              max={100}
              step={5}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-blue-600">XL</p>
            <p className="font-mono">{XL.toFixed(2)} Ω</p>
          </div>
          <div>
            <p className="font-semibold text-red-600">XC</p>
            <p className="font-mono">{XC.toFixed(2)} Ω</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">Z</p>
            <p className="font-mono">{Z.toFixed(2)} Ω</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">φ</p>
            <p className="font-mono">{phiDeg.toFixed(1)}°</p>
          </div>
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
          <p className="font-semibold">NEET Formulas - AC Circuits:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• XL = ωL = 2πfL (inductive reactance)</li>
            <li>• XC = 1/(ωC) = 1/(2πfC) (capacitive)</li>
            <li>• Z = √(R² + (XL - XC)²) (impedance)</li>
            <li>• tan φ = (XL - XC)/R (phase angle)</li>
            <li>• Power factor: cos φ = R/Z</li>
            <li>• P = Vrms × Irms × cos φ</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
