
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw } from "lucide-react";
import { usePrefersReducedMotion } from "@/visuals/hooks/usePrefersMotion";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function SpringEnergyBar() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [springConstant, setSpringConstant] = useState([100]);
  const [mass, setMass] = useState([1]);
  const [amplitude, setAmplitude] = useState([0.5]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [kineticEnergy, setKineticEnergy] = useState(0);
  const [potentialEnergy, setPotentialEnergy] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationRef = useRef<number>();

  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Spring visualization area
    const springGroup = g.append("g");
    
    // Wall
    springGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", innerHeight / 2 - 60)
      .attr("width", 10)
      .attr("height", 120)
      .attr("fill", "#475569");

    // Energy bar chart area
    const energyGroup = g.append("g").attr("transform", `translate(${innerWidth - 200}, 0)`);

    // Energy scale
    const k = springConstant[0];
    const A = amplitude[0];
    const totalEnergy = 0.5 * k * A * A;

    const yScale = d3
      .scaleLinear()
      .domain([0, totalEnergy * 1.2])
      .range([innerHeight - 50, 50]);

    // Y-axis for energy
    energyGroup
      .append("g")
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d.toFixed(1)}J`))
      .style("color", "#64748b");

    // Energy bars placeholders
    const kineticBar = energyGroup
      .append("rect")
      .attr("x", 20)
      .attr("y", yScale(0))
      .attr("width", 60)
      .attr("height", 0)
      .attr("fill", "#3b82f6");

    const potentialBar = energyGroup
      .append("rect")
      .attr("x", 100)
      .attr("y", yScale(0))
      .attr("width", 60)
      .attr("height", 0)
      .attr("fill", "#f59e0b");

    // Labels
    energyGroup
      .append("text")
      .attr("x", 50)
      .attr("y", innerHeight - 25)
      .attr("text-anchor", "middle")
      .style("fill", "#3b82f6")
      .style("font-size", "12px")
      .text("KE");

    energyGroup
      .append("text")
      .attr("x", 130)
      .attr("y", innerHeight - 25)
      .attr("text-anchor", "middle")
      .style("fill", "#f59e0b")
      .style("font-size", "12px")
      .text("PE");

    // Animation function
    let time = 0;
    const animate = () => {
      if (!isAnimating) return;

      time += 0.05;
      const omega = Math.sqrt(k / mass[0]);
      const x = A * Math.cos(omega * time);
      const v = -A * omega * Math.sin(omega * time);

      // Calculate energies
      const KE = 0.5 * mass[0] * v * v;
      const PE = 0.5 * k * x * x;

      setKineticEnergy(KE);
      setPotentialEnergy(PE);

      // Update spring visualization
      const springX = innerWidth / 3 + x * 200;
      
      // Draw spring
      springGroup.selectAll(".spring-line").remove();
      const numCoils = 10;
      const coilWidth = 15;
      const springLength = springX - 20;
      const segmentLength = springLength / numCoils;

      const springPath = d3.line<[number, number]>()
        .x(d => d[0])
        .y(d => d[1]);

      const points: [number, number][] = [[20, innerHeight / 2]];
      for (let i = 0; i < numCoils; i++) {
        points.push([
          20 + i * segmentLength + segmentLength / 2,
          innerHeight / 2 + (i % 2 === 0 ? -coilWidth : coilWidth),
        ]);
      }
      points.push([springX, innerHeight / 2]);

      springGroup
        .append("path")
        .datum(points)
        .attr("class", "spring-line")
        .attr("d", springPath)
        .attr("fill", "none")
        .attr("stroke", "#64748b")
        .attr("stroke-width", 3);

      // Mass block
      springGroup.selectAll(".mass-block").remove();
      springGroup
        .append("rect")
        .attr("class", "mass-block")
        .attr("x", springX - 20)
        .attr("y", innerHeight / 2 - 25)
        .attr("width", 40)
        .attr("height", 50)
        .attr("fill", "#10b981")
        .attr("rx", 4);

      // Update energy bars
      kineticBar
        .transition()
        .duration(50)
        .attr("y", yScale(KE))
        .attr("height", innerHeight - 50 - yScale(KE));

      potentialBar
        .transition()
        .duration(50)
        .attr("y", yScale(PE))
        .attr("height", innerHeight - 50 - yScale(PE));

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
  }, [isAnimating, springConstant, mass, amplitude, prefersReducedMotion]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation started");
  };

  const reset = () => {
    setIsAnimating(false);
    setKineticEnergy(0);
    const PE = 0.5 * springConstant[0] * amplitude[0] * amplitude[0];
    setPotentialEnergy(PE);
    setAnnouncement("Animation reset");
  };

  const totalEnergy = 0.5 * springConstant[0] * amplitude[0] * amplitude[0];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Spring-Mass Energy Exchange</span>
          <Badge variant="outline">Physics - Work, Energy & Power</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Watch kinetic and potential energy interchange in SHM
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-auto border rounded-lg bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-background"
        />

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Spring Constant (k): {springConstant[0]} N/m
            </label>
            <Slider
              value={springConstant}
              onValueChange={setSpringConstant}
              min={50}
              max={200}
              step={10}
              disabled={isAnimating}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Mass (m): {mass[0]} kg
            </label>
            <Slider
              value={mass}
              onValueChange={setMass}
              min={0.5}
              max={5}
              step={0.5}
              disabled={isAnimating}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Amplitude (A): {amplitude[0]} m
            </label>
            <Slider
              value={amplitude}
              onValueChange={setAmplitude}
              min={0.1}
              max={1}
              step={0.1}
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

        <div className="bg-muted p-4 rounded-lg grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Kinetic Energy</p>
            <p className="text-xl font-bold text-blue-600">{kineticEnergy.toFixed(2)} J</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Potential Energy</p>
            <p className="text-xl font-bold text-amber-600">{potentialEnergy.toFixed(2)} J</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Energy</p>
            <p className="text-xl font-bold text-primary">{totalEnergy.toFixed(2)} J</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-medium">Key Concepts:</p>
          <ul className="space-y-1">
            <li>• At maximum displacement: PE = maximum, KE = 0</li>
            <li>• At equilibrium position: KE = maximum, PE = 0</li>
            <li>• Total Energy E = ½kA² = constant</li>
            <li>• Energy oscillates between kinetic and potential forms</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
