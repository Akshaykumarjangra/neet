
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Radio, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function DopplerEffect() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [sourceSpeed, setSourceSpeed] = useState([0.3]); // fraction of sound speed
  const [soundSpeed, setSoundSpeed] = useState([340]); // m/s
  const [frequency, setFrequency] = useState([500]); // Hz
  const [isAnimating, setIsAnimating] = useState(false);
  const [time, setTime] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number>();

  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 60, bottom: 60, left: 60 };

  // Calculate wavelength and frequencies
  const wavelength = soundSpeed[0] / frequency[0];
  const sourceVelocity = sourceSpeed[0] * soundSpeed[0];
  
  // Doppler formulas
  const observedFreqAhead = frequency[0] * soundSpeed[0] / (soundSpeed[0] - sourceVelocity);
  const observedFreqBehind = frequency[0] * soundSpeed[0] / (soundSpeed[0] + sourceVelocity);
  const wavelengthAhead = soundSpeed[0] / observedFreqAhead;
  const wavelengthBehind = soundSpeed[0] / observedFreqBehind;

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
      .text("Doppler Effect - Moving Sound Source");

    // Scale for positioning
    const xScale = d3.scaleLinear().domain([-400, 400]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([-200, 200]).range([innerHeight, 0]);

    // Draw reference line
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", yScale(0))
      .attr("y2", yScale(0))
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1)
      .attr("opacity", 0.3);

    // Source position (starts at center)
    const sourceX = xScale(0);
    const sourceY = yScale(0);

    // Draw sound source
    g.append("circle")
      .attr("class", "sound-source")
      .attr("cx", sourceX)
      .attr("cy", sourceY)
      .attr("r", 15)
      .attr("fill", "#3b82f6")
      .attr("stroke", "#1e40af")
      .attr("stroke-width", 2);

    // Add speaker icon representation
    g.append("text")
      .attr("class", "source-icon")
      .attr("x", sourceX)
      .attr("y", sourceY)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "white")
      .style("font-size", "20px")
      .text("🔊");

    // Draw wave circles (will be animated)
    const wavesGroup = g.append("g").attr("class", "waves-group");

    // Observers
    const observer1X = xScale(-300);
    const observer2X = xScale(300);
    const observerY = yScale(0);

    // Observer ahead (left)
    const obs1 = g.append("g").attr("class", "observer-ahead");
    obs1.append("circle")
      .attr("cx", observer1X)
      .attr("cy", observerY)
      .attr("r", 12)
      .attr("fill", "#10b981")
      .attr("stroke", "#059669")
      .attr("stroke-width", 2);
    
    obs1.append("text")
      .attr("x", observer1X)
      .attr("y", observerY - 25)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .attr("fill", "currentColor")
      .text("Observer A");

    // Observer behind (right)
    const obs2 = g.append("g").attr("class", "observer-behind");
    obs2.append("circle")
      .attr("cx", observer2X)
      .attr("cy", observerY)
      .attr("r", 12)
      .attr("fill", "#f59e0b")
      .attr("stroke", "#d97706")
      .attr("stroke-width", 2);
    
    obs2.append("text")
      .attr("x", observer2X)
      .attr("y", observerY - 25)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .attr("fill", "currentColor")
      .text("Observer B");

    // Frequency displays
    g.append("text")
      .attr("class", "freq-ahead")
      .attr("x", observer1X)
      .attr("y", observerY + 35)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .attr("fill", "#10b981")
      .text(`${observedFreqAhead.toFixed(1)} Hz`);

    g.append("text")
      .attr("class", "freq-behind")
      .attr("x", observer2X)
      .attr("y", observerY + 35)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .attr("fill", "#f59e0b")
      .text(`${observedFreqBehind.toFixed(1)} Hz`);

    // Direction arrow
    if (sourceVelocity > 0) {
      g.append("line")
        .attr("x1", sourceX + 20)
        .attr("x2", sourceX + 60)
        .attr("y1", sourceY)
        .attr("y2", sourceY)
        .attr("stroke", "#3b82f6")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");

      g.append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("refX", 9)
        .attr("refY", 3)
        .attr("orient", "auto")
        .append("polygon")
        .attr("points", "0 0, 10 3, 0 6")
        .attr("fill", "#3b82f6");

      g.append("text")
        .attr("x", sourceX + 40)
        .attr("y", sourceY - 15)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .attr("fill", "#3b82f6")
        .text(`v = ${sourceVelocity.toFixed(0)} m/s`);
    }

  }, [sourceSpeed, soundSpeed, frequency, observedFreqAhead, observedFreqBehind, sourceVelocity]);

  useEffect(() => {
    if (!isAnimating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const maxWaves = 10;
    const waves: Array<{ time: number; x: number }> = [];
    let waveCounter = 0;

    const animate = () => {
      const svg = d3.select(svgRef.current);
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const xScale = d3.scaleLinear().domain([-400, 400]).range([0, innerWidth]);
      const yScale = d3.scaleLinear().domain([-200, 200]).range([innerHeight, 0]);

      const currentTime = time;
      const dt = 0.05;

      // Emit new wave every period
      if (currentTime % (1 / frequency[0]) < dt) {
        waves.push({
          time: currentTime,
          x: sourceVelocity * currentTime
        });
        waveCounter++;
        if (waves.length > maxWaves) {
          waves.shift();
        }
      }

      const wavesGroup = svg.select(".waves-group");
      wavesGroup.selectAll("*").remove();

      // Draw expanding circles from emission points
      waves.forEach((wave) => {
        const age = currentTime - wave.time;
        const radius = soundSpeed[0] * age;
        const centerX = wave.x;

        if (radius > 0 && radius < 500) {
          wavesGroup
            .append("circle")
            .attr("cx", xScale(centerX))
            .attr("cy", yScale(0))
            .attr("r", radius * (innerWidth / 800))
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 1.5)
            .attr("opacity", 0.6);
        }
      });

      // Update source position if moving
      const sourceX = xScale(sourceVelocity * currentTime);
      svg.select(".sound-source")
        .attr("cx", sourceX);
      
      svg.select(".source-icon")
        .attr("x", sourceX);

      setTime(prev => prev + dt);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, time, frequency, soundSpeed, sourceVelocity]);

  const handleReset = () => {
    setTime(0);
    setIsAnimating(false);
    setAnnouncement("Reset simulation");
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Paused" : "Started animation");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-blue-500" />
            Doppler Effect
          </span>
          <Badge variant="outline">Physics - Waves</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Observe frequency shift when source moves
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} width={width} height={height} className="border rounded-lg" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Source Speed: {(sourceSpeed[0] * 100).toFixed(0)}% of sound speed ({(sourceSpeed[0] * soundSpeed[0]).toFixed(0)} m/s)
            </label>
            <Slider
              value={sourceSpeed}
              onValueChange={(val) => {
                setSourceSpeed(val);
                setTime(0);
                setAnnouncement(`Source speed set to ${(val[0] * 100).toFixed(0)}% of sound speed`);
              }}
              min={0}
              max={0.8}
              step={0.05}
              disabled={isAnimating}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Source Frequency: {frequency[0]} Hz
            </label>
            <Slider
              value={frequency}
              onValueChange={(val) => {
                setFrequency(val);
                setTime(0);
                setAnnouncement(`Frequency set to ${val[0]} Hz`);
              }}
              min={200}
              max={1000}
              step={50}
              disabled={isAnimating}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Speed of Sound: {soundSpeed[0]} m/s
            </label>
            <Slider
              value={soundSpeed}
              onValueChange={(val) => {
                setSoundSpeed(val);
                setTime(0);
                setAnnouncement(`Speed of sound set to ${val[0]} m/s`);
              }}
              min={300}
              max={400}
              step={10}
              disabled={isAnimating}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Observer A (Ahead of Source)
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground font-mono">
              <li>• Observed frequency: {observedFreqAhead.toFixed(2)} Hz</li>
              <li>• Wavelength: {wavelengthAhead.toFixed(2)} m</li>
              <li>• Shift: {((observedFreqAhead - frequency[0]) / frequency[0] * 100).toFixed(1)}%</li>
              <li>• {observedFreqAhead > frequency[0] ? "Higher pitch (blue shift)" : "Same pitch"}</li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              Observer B (Behind Source)
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground font-mono">
              <li>• Observed frequency: {observedFreqBehind.toFixed(2)} Hz</li>
              <li>• Wavelength: {wavelengthBehind.toFixed(2)} m</li>
              <li>• Shift: {((observedFreqBehind - frequency[0]) / frequency[0] * 100).toFixed(1)}%</li>
              <li>• {observedFreqBehind < frequency[0] ? "Lower pitch (red shift)" : "Same pitch"}</li>
            </ul>
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
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Formulas:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Source moving toward observer: f' = f(v/(v - vₛ))</li>
            <li>• Source moving away: f' = f(v/(v + vₛ))</li>
            <li>• Observer moving toward source: f' = f((v + vₒ)/v)</li>
            <li>• General case: f' = f((v ± vₒ)/(v ∓ vₛ))</li>
            <li>• Wavelength: λ = v/f</li>
            <li>• When vₛ → v: frequency → ∞ (sonic boom)</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">Real-world Applications:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Ambulance siren pitch changes as it passes</li>
            <li>• Radar speed detection</li>
            <li>• Astronomy: Red shift & blue shift of stars</li>
            <li>• Medical: Doppler ultrasound for blood flow</li>
            <li>• Weather radar for storm tracking</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
