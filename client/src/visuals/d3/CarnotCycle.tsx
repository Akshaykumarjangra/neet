
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw } from "lucide-react";
import { usePrefersReducedMotion } from "@/visuals/hooks/usePrefersMotion";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function CarnotCycle() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [T1, setT1] = useState([600]); // Hot reservoir (K)
  const [T2, setT2] = useState([300]); // Cold reservoir (K)
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationRef = useRef<number>();

  const width = 800;
  const height = 600;
  const margin = { top: 40, right: 60, bottom: 60, left: 80 };

  const phases = [
    { name: "Isothermal Expansion", color: "#ef4444", temp: "T₁" },
    { name: "Adiabatic Expansion", color: "#f59e0b", temp: "decreasing" },
    { name: "Isothermal Compression", color: "#3b82f6", temp: "T₂" },
    { name: "Adiabatic Compression", color: "#8b5cf6", temp: "increasing" },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Calculate Carnot cycle points
    const V1 = 1; // Initial volume
    const V2 = 3; // After isothermal expansion
    const V3 = 5; // After adiabatic expansion
    const V4 = 2; // After isothermal compression
    const gamma = 1.4; // Heat capacity ratio for ideal gas

    // Pressure calculations (simplified, P₁V₁ = nRT₁)
    const P1 = T1[0] / V1;
    const P2 = T1[0] / V2;
    const P3 = T2[0] / V3;
    const P4 = T2[0] / V4;

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, 6])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(P1, P4) * 1.2])
      .range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d => `${d}V₀`);
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${Number(d).toFixed(0)}`);

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
      .text("Volume (V)");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .style("fill", "#1e293b")
      .style("font-size", "14px")
      .text("Pressure (P)");

    // Generate curve points for each phase
    const generateIsotherm = (V_start: number, V_end: number, T: number, steps = 50) => {
      const points: [number, number][] = [];
      for (let i = 0; i <= steps; i++) {
        const V = V_start + (V_end - V_start) * (i / steps);
        const P = T / V;
        points.push([V, P]);
      }
      return points;
    };

    const generateAdiabatic = (V_start: number, P_start: number, V_end: number, steps = 50) => {
      const points: [number, number][] = [];
      const constant = P_start * Math.pow(V_start, gamma);
      for (let i = 0; i <= steps; i++) {
        const V = V_start + (V_end - V_start) * (i / steps);
        const P = constant / Math.pow(V, gamma);
        points.push([V, P]);
      }
      return points;
    };

    // Phase 1: Isothermal expansion at T1
    const phase1Points = generateIsotherm(V1, V2, T1[0]);
    // Phase 2: Adiabatic expansion
    const phase2Points = generateAdiabatic(V2, P2, V3);
    // Phase 3: Isothermal compression at T2
    const phase3Points = generateIsotherm(V3, V4, T2[0]);
    // Phase 4: Adiabatic compression
    const phase4Points = generateAdiabatic(V4, P4, V1);

    const allPhases = [phase1Points, phase2Points, phase3Points, phase4Points];

    // Draw complete cycle (faded)
    const line = d3
      .line<[number, number]>()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(d3.curveCardinal);

    allPhases.forEach((phasePoints, idx) => {
      g.append("path")
        .datum(phasePoints)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", phases[idx].color)
        .attr("stroke-width", 2)
        .attr("opacity", 0.3);
    });

    // Draw state points
    const statePoints = [
      { x: V1, y: P1, label: "1" },
      { x: V2, y: P2, label: "2" },
      { x: V3, y: P3, label: "3" },
      { x: V4, y: P4, label: "4" },
    ];

    statePoints.forEach(point => {
      g.append("circle")
        .attr("cx", xScale(point.x))
        .attr("cy", yScale(point.y))
        .attr("r", 5)
        .attr("fill", "#1e293b")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

      g.append("text")
        .attr("x", xScale(point.x) + 12)
        .attr("y", yScale(point.y) - 10)
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#1e293b")
        .text(point.label);
    });

    // Animated particle
    const particle = g
      .append("circle")
      .attr("r", 8)
      .attr("fill", "#10b981")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))");

    // Work area shading
    const allPoints = [...phase1Points, ...phase2Points, ...phase3Points, ...phase4Points];
    const areaPath = d3
      .area<[number, number]>()
      .x(d => xScale(d[0]))
      .y0(innerHeight)
      .y1(d => yScale(d[1]))
      .curve(d3.curveCardinal);

    g.append("path")
      .datum(allPoints)
      .attr("d", areaPath)
      .attr("fill", "#10b981")
      .attr("opacity", 0.1);

    // Animation
    let progress = 0;
    const animate = () => {
      if (!isAnimating) return;

      progress += 0.005;
      if (progress > 1) progress = 0;

      const totalPoints = allPhases.reduce((sum, phase) => sum + phase.length, 0);
      const currentIndex = Math.floor(progress * totalPoints);

      let cumulative = 0;
      let currentPhaseIdx = 0;
      let pointInPhase = 0;

      for (let i = 0; i < allPhases.length; i++) {
        if (currentIndex < cumulative + allPhases[i].length) {
          currentPhaseIdx = i;
          pointInPhase = currentIndex - cumulative;
          break;
        }
        cumulative += allPhases[i].length;
      }

      const point = allPhases[currentPhaseIdx][pointInPhase];
      if (point) {
        particle
          .attr("cx", xScale(point[0]))
          .attr("cy", yScale(point[1]))
          .attr("fill", phases[currentPhaseIdx].color);
      }

      if (currentPhaseIdx !== currentPhase) {
        setCurrentPhase(currentPhaseIdx);
        setAnnouncement(`Phase ${currentPhaseIdx + 1}: ${phases[currentPhaseIdx].name}`);
      }

      if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (isAnimating) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, T1, T2, currentPhase, prefersReducedMotion]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation started");
  };

  const reset = () => {
    setIsAnimating(false);
    setCurrentPhase(0);
    setAnnouncement("Animation reset");
  };

  const efficiency = ((T1[0] - T2[0]) / T1[0] * 100).toFixed(1);
  const workDone = ((T1[0] - T2[0]) * 8.314 * Math.log(3)).toFixed(1); // Simplified

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Carnot Cycle - p-V Diagram</span>
          <Badge variant="outline">Physics - Thermodynamics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Watch the most efficient heat engine cycle in action
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-auto border rounded-lg bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-background"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Hot Reservoir (T₁): {T1[0]} K
            </label>
            <Slider
              value={T1}
              onValueChange={setT1}
              min={400}
              max={800}
              step={50}
              disabled={isAnimating}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Cold Reservoir (T₂): {T2[0]} K
            </label>
            <Slider
              value={T2}
              onValueChange={setT2}
              min={200}
              max={400}
              step={50}
              disabled={isAnimating}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={toggleAnimation}>
            {isAnimating ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Current Phase</h4>
          <div className="flex items-center gap-3 p-3 bg-background rounded">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: phases[currentPhase].color }}
            />
            <div>
              <p className="font-semibold">{phases[currentPhase].name}</p>
              <p className="text-sm text-muted-foreground">
                Temperature: {phases[currentPhase].temp}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Efficiency (η)</p>
            <p className="text-2xl font-bold text-primary">{efficiency}%</p>
            <p className="text-xs text-muted-foreground mt-1">η = 1 - T₂/T₁</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Net Work</p>
            <p className="text-2xl font-bold text-green-600">{workDone} J</p>
            <p className="text-xs text-muted-foreground mt-1">Area enclosed by cycle</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <h4 className="font-semibold">The Four Processes:</h4>
          <div className="grid gap-2">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 bg-background rounded"
              >
                <div
                  className="w-3 h-3 rounded-full mt-0.5"
                  style={{ backgroundColor: phase.color }}
                />
                <div className="flex-1">
                  <p className="font-medium">{phase.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {idx === 0 && "Heat absorbed from hot reservoir: Q₁ = nRT₁ln(V₂/V₁)"}
                    {idx === 1 && "No heat exchange: Q = 0, T₁V₂^(γ-1) = T₂V₃^(γ-1)"}
                    {idx === 2 && "Heat rejected to cold reservoir: Q₂ = nRT₂ln(V₃/V₄)"}
                    {idx === 3 && "No heat exchange: Q = 0, T₂V₄^(γ-1) = T₁V₁^(γ-1)"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Carnot cycle is the most efficient reversible cycle</li>
            <li>• No real engine can be more efficient than Carnot engine</li>
            <li>• Efficiency depends only on temperatures of reservoirs</li>
            <li>• Net work = Area enclosed by p-V curve</li>
            <li>• COP of refrigerator: T₂/(T₁-T₂)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
