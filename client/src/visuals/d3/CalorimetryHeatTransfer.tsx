
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Flame, Snowflake, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function CalorimetryHeatTransfer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [temp1, setTemp1] = useState([80]); // Hot body temperature (°C)
  const [temp2, setTemp2] = useState([20]); // Cold body temperature (°C)
  const [mass1, setMass1] = useState([100]); // Hot body mass (g)
  const [mass2, setMass2] = useState([100]); // Cold body mass (g)
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number>();

  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 60, bottom: 60, left: 60 };

  // Specific heat of water (cal/g°C)
  const c = 1;

  // Calculate equilibrium temperature
  const equilibriumTemp = (mass1[0] * temp1[0] + mass2[0] * temp2[0]) / (mass1[0] + mass2[0]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("class", "text-lg font-semibold fill-current")
      .text("Heat Transfer Between Bodies");

    // Temperature scale
    const tempScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);

    const timeScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, innerWidth]);

    // Axes
    const xAxis = d3.axisBottom(timeScale).ticks(10);
    const yAxis = d3.axisLeft(tempScale).ticks(10);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 40)
      .attr("fill", "currentColor")
      .style("font-size", "14px")
      .text("Time (s)");

    g.append("g")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .attr("fill", "currentColor")
      .style("font-size", "14px")
      .text("Temperature (°C)");

    // Grid
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(d3.axisLeft(tempScale).tickSize(-innerWidth).tickFormat(() => ""));

    // Equilibrium line
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", tempScale(equilibriumTemp))
      .attr("y2", tempScale(equilibriumTemp))
      .attr("stroke", "#8b5cf6")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    g.append("text")
      .attr("x", innerWidth - 5)
      .attr("y", tempScale(equilibriumTemp) - 5)
      .attr("text-anchor", "end")
      .attr("fill", "#8b5cf6")
      .style("font-size", "12px")
      .text(`Equilibrium: ${equilibriumTemp.toFixed(1)}°C`);

    // Temperature paths
    g.append("path")
      .attr("class", "temp1-path")
      .attr("fill", "none")
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 3);

    g.append("path")
      .attr("class", "temp2-path")
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3);

    // Legend
    const legend = g.append("g").attr("transform", `translate(20, 20)`);

    legend
      .append("line")
      .attr("x1", 0)
      .attr("x2", 30)
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 3);

    legend
      .append("text")
      .attr("x", 35)
      .attr("y", 5)
      .attr("fill", "currentColor")
      .style("font-size", "12px")
      .text(`Hot body (${mass1[0]}g)`);

    legend
      .append("line")
      .attr("x1", 0)
      .attr("x2", 30)
      .attr("y1", 20)
      .attr("y2", 20)
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3);

    legend
      .append("text")
      .attr("x", 35)
      .attr("y", 25)
      .attr("fill", "currentColor")
      .style("font-size", "12px")
      .text(`Cold body (${mass2[0]}g)`);

    // Visual representation - containers
    const containerY = innerHeight + 80;
    const container1X = innerWidth * 0.25;
    const container2X = innerWidth * 0.75;

    // Hot container
    const hotContainer = svg
      .append("g")
      .attr("transform", `translate(${margin.left + container1X},${margin.top + containerY})`);

    hotContainer
      .append("rect")
      .attr("x", -40)
      .attr("y", -60)
      .attr("width", 80)
      .attr("height", 60)
      .attr("fill", "none")
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    hotContainer
      .append("rect")
      .attr("class", "hot-fill")
      .attr("x", -35)
      .attr("y", -55)
      .attr("width", 70)
      .attr("height", 50)
      .attr("fill", "#ef4444")
      .attr("opacity", 0.3);

    hotContainer
      .append("text")
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("class", "hot-temp-text")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(`${temp1[0]}°C`);

    // Cold container
    const coldContainer = svg
      .append("g")
      .attr("transform", `translate(${margin.left + container2X},${margin.top + containerY})`);

    coldContainer
      .append("rect")
      .attr("x", -40)
      .attr("y", -60)
      .attr("width", 80)
      .attr("height", 60)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    coldContainer
      .append("rect")
      .attr("class", "cold-fill")
      .attr("x", -35)
      .attr("y", -55)
      .attr("width", 70)
      .attr("height", 50)
      .attr("fill", "#3b82f6")
      .attr("opacity", 0.3);

    coldContainer
      .append("text")
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("class", "cold-temp-text")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(`${temp2[0]}°C`);

  }, [temp1, temp2, mass1, mass2, equilibriumTemp]);

  useEffect(() => {
    if (!isAnimating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const maxTime = 10;
    const k = 0.5; // Heat transfer rate constant

    const animate = () => {
      if (currentTime >= maxTime) {
        setIsAnimating(false);
        return;
      }

      const t = currentTime;
      
      // Exponential approach to equilibrium
      const T1 = equilibriumTemp + (temp1[0] - equilibriumTemp) * Math.exp(-k * t);
      const T2 = equilibriumTemp + (temp2[0] - equilibriumTemp) * Math.exp(-k * t);

      // Generate data points
      const data1: [number, number][] = [];
      const data2: [number, number][] = [];

      for (let time = 0; time <= t; time += 0.1) {
        const temp1Val = equilibriumTemp + (temp1[0] - equilibriumTemp) * Math.exp(-k * time);
        const temp2Val = equilibriumTemp + (temp2[0] - equilibriumTemp) * Math.exp(-k * time);
        data1.push([time, temp1Val]);
        data2.push([time, temp2Val]);
      }

      const svg = d3.select(svgRef.current);
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const tempScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);
      const timeScale = d3.scaleLinear().domain([0, 10]).range([0, innerWidth]);

      const line = d3
        .line<[number, number]>()
        .x(d => timeScale(d[0]))
        .y(d => tempScale(d[1]))
        .curve(d3.curveMonotoneX);

      svg.select(".temp1-path").attr("d", line(data1));
      svg.select(".temp2-path").attr("d", line(data2));

      // Update container visuals
      const hotOpacity = 0.3 + 0.5 * (T1 / 100);
      const coldOpacity = 0.3 + 0.5 * (T2 / 100);

      svg.select(".hot-fill").attr("opacity", hotOpacity);
      svg.select(".cold-fill").attr("opacity", coldOpacity);
      svg.select(".hot-temp-text").text(`${T1.toFixed(1)}°C`);
      svg.select(".cold-temp-text").text(`${T2.toFixed(1)}°C`);

      setCurrentTime(prev => prev + 0.05);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, currentTime, temp1, temp2, equilibriumTemp]);

  const handleReset = () => {
    setCurrentTime(0);
    setIsAnimating(false);
    setAnnouncement("Reset simulation");
  };

  const toggleAnimation = () => {
    if (currentTime >= 10) {
      setCurrentTime(0);
    }
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Paused" : "Started animation");
  };

  // Calculate heat transferred
  const heatTransferred = mass1[0] * c * Math.abs(temp1[0] - equilibriumTemp);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Calorimetry - Heat Transfer
          </span>
          <Badge variant="outline">Physics - Thermodynamics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize heat exchange between two bodies
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} width={width} height={height + 100} className="border rounded-lg" />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Flame className="h-4 w-4 text-red-500" />
              Hot Body
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Temperature: {temp1[0]}°C
              </label>
              <Slider
                value={temp1}
                onValueChange={(val) => {
                  setTemp1(val);
                  setCurrentTime(0);
                  setAnnouncement(`Hot body temperature set to ${val[0]}°C`);
                }}
                min={30}
                max={100}
                step={1}
                disabled={isAnimating}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Mass: {mass1[0]}g
              </label>
              <Slider
                value={mass1}
                onValueChange={(val) => {
                  setMass1(val);
                  setCurrentTime(0);
                  setAnnouncement(`Hot body mass set to ${val[0]}g`);
                }}
                min={50}
                max={200}
                step={10}
                disabled={isAnimating}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Snowflake className="h-4 w-4 text-blue-500" />
              Cold Body
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Temperature: {temp2[0]}°C
              </label>
              <Slider
                value={temp2}
                onValueChange={(val) => {
                  setTemp2(val);
                  setCurrentTime(0);
                  setAnnouncement(`Cold body temperature set to ${val[0]}°C`);
                }}
                min={0}
                max={40}
                step={1}
                disabled={isAnimating}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Mass: {mass2[0]}g
              </label>
              <Slider
                value={mass2}
                onValueChange={(val) => {
                  setMass2(val);
                  setCurrentTime(0);
                  setAnnouncement(`Cold body mass set to ${val[0]}g`);
                }}
                min={50}
                max={200}
                step={10}
                disabled={isAnimating}
              />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg space-y-2">
          <p className="font-semibold">Calculations:</p>
          <ul className="text-sm space-y-1 text-muted-foreground font-mono">
            <li>• Equilibrium Temperature: {equilibriumTemp.toFixed(2)}°C</li>
            <li>• Heat Lost by Hot Body: {heatTransferred.toFixed(2)} cal</li>
            <li>• Heat Gained by Cold Body: {heatTransferred.toFixed(2)} cal</li>
            <li>• Heat lost = Heat gained (Conservation of Energy)</li>
          </ul>
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
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Formulas:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Heat transferred: Q = mcΔT</li>
            <li>• Heat lost = Heat gained</li>
            <li>• m₁c₁(T₁ - T) = m₂c₂(T - T₂)</li>
            <li>• Final temperature: T = (m₁T₁ + m₂T₂)/(m₁ + m₂)</li>
            <li>• Specific heat: c = Q/(mΔT)</li>
            <li>• 1 cal = 4.186 J</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
