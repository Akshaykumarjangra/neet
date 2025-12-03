
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function PhotoelectricEffect() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [frequency, setFrequency] = useState([6]); // × 10¹⁴ Hz
  const [intensity, setIntensity] = useState([5]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);

  const h = 6.63e-34; // Planck's constant
  const workFunction = 2.0; // eV (typical for metals)
  const f0 = workFunction / (h * 1.6e-19) / 1e14; // Threshold frequency × 10¹⁴ Hz
  const f = frequency[0]; // × 10¹⁴ Hz
  const KEmax = h * f * 1e14 - workFunction * 1.6e-19; // Joules
  const KEmaxEV = KEmax / 1.6e-19; // eV
  const stoppingPotential = Math.max(0, KEmaxEV);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Left side: Metal surface with photons
    const metalG = g.append("g");

    // Metal surface
    metalG
      .append("rect")
      .attr("x", 0)
      .attr("y", plotHeight / 2 - 50)
      .attr("width", plotWidth * 0.4)
      .attr("height", 100)
      .attr("fill", "#888")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Photons (animated)
    const numPhotons = Math.floor(intensity[0]);
    const photons = d3.range(numPhotons).map((i) => ({
      x: -20 - Math.random() * 50,
      y: plotHeight / 2 - 40 + Math.random() * 80,
      speed: 2 + Math.random(),
    }));

    const photonGroup = metalG.selectAll(".photon").data(photons).enter().append("g");

    photonGroup
      .append("circle")
      .attr("class", "photon")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 3)
      .attr("fill", f >= f0 ? "#ffff00" : "#ff0000");

    // Electrons (if f >= f0)
    let electrons: any[] = [];
    if (f >= f0) {
      electrons = d3.range(Math.floor(intensity[0] / 2)).map((i) => ({
        x: plotWidth * 0.4,
        y: plotHeight / 2 - 30 + Math.random() * 60,
        vx: 1 + Math.random() * stoppingPotential / 2,
        vy: (Math.random() - 0.5) * 2,
      }));

      const electronGroup = metalG.selectAll(".electron").data(electrons).enter().append("g");

      electronGroup
        .append("circle")
        .attr("class", "electron")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 4)
        .attr("fill", "#00ffff");
    }

    // Right side: Graph of KE vs frequency
    const graphG = g
      .append("g")
      .attr("transform", `translate(${plotWidth * 0.6}, 0)`);

    const graphWidth = plotWidth * 0.35;
    const graphHeight = plotHeight * 0.8;

    const xScale = d3.scaleLinear().domain([0, 10]).range([0, graphWidth]);
    const yScale = d3.scaleLinear().domain([-2, 5]).range([graphHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    graphG
      .append("g")
      .attr("transform", `translate(0, ${graphHeight})`)
      .call(xAxis)
      .append("text")
      .attr("x", graphWidth / 2)
      .attr("y", 35)
      .attr("fill", "#fff")
      .style("font-size", "12px")
      .text("Frequency (×10¹⁴ Hz)");

    graphG
      .append("g")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -graphHeight / 2)
      .attr("y", -40)
      .attr("fill", "#fff")
      .style("font-size", "12px")
      .text("KE (eV)");

    // Line: KE = hf - φ
    const lineData = d3.range(0, 10.5, 0.1).map((freq) => ({
      f: freq,
      KE: freq >= f0 ? (freq - f0) * (h * 1e14 / 1.6e-19) : 0,
    }));

    const line = d3
      .line<any>()
      .x((d) => xScale(d.f))
      .y((d) => yScale(d.KE));

    graphG
      .append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", "#00ff00")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Current point
    graphG
      .append("circle")
      .attr("cx", xScale(f))
      .attr("cy", yScale(Math.max(0, KEmaxEV)))
      .attr("r", 5)
      .attr("fill", "#ff0000");

    // Threshold line
    graphG
      .append("line")
      .attr("x1", xScale(f0))
      .attr("x2", xScale(f0))
      .attr("y1", 0)
      .attr("y2", graphHeight)
      .attr("stroke", "#ff00ff")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    graphG
      .append("text")
      .attr("x", xScale(f0) + 5)
      .attr("y", 20)
      .attr("fill", "#ff00ff")
      .style("font-size", "12px")
      .text(`f₀ = ${f0.toFixed(1)}`);

    // Animation
    let time = 0;
    const animate = () => {
      if (isAnimating) {
        time += 1;

        // Move photons
        photonGroup.attr("transform", (d: any) => {
          d.x += d.speed;
          if (d.x > plotWidth * 0.4) d.x = -20 - Math.random() * 50;
          return `translate(${d.x}, ${d.y})`;
        });

        // Move electrons
        if (electrons.length > 0) {
          metalG.selectAll(".electron").attr("transform", (d: any) => {
            d.x += d.vx;
            d.y += d.vy;
            if (d.x > plotWidth * 0.5 || d.y < 0 || d.y > plotHeight) {
              d.x = plotWidth * 0.4;
              d.y = plotHeight / 2 - 30 + Math.random() * 60;
            }
            return `translate(${d.x}, ${d.y})`;
          });
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, intensity, isAnimating, f, f0, KEmaxEV, stoppingPotential]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  const reset = () => {
    setFrequency([6]);
    setIntensity([5]);
    setIsAnimating(true);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Photoelectric Effect
          </span>
          <Badge variant="outline">Physics - Dual Nature</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize photon-electron interaction and Einstein's equation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} className="w-full h-[400px] border rounded-lg bg-background" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Frequency (f): {frequency[0]} × 10¹⁴ Hz
            </label>
            <Slider
              value={frequency}
              onValueChange={(val) => {
                setFrequency(val);
                setAnnouncement(`Frequency: ${val[0]} times 10 to the 14 Hz`);
              }}
              min={2}
              max={10}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Intensity: {intensity[0]}</label>
            <Slider
              value={intensity}
              onValueChange={(val) => {
                setIntensity(val);
                setAnnouncement(`Intensity: ${val[0]}`);
              }}
              min={1}
              max={10}
              step={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-blue-600">KE_max</p>
            <p className="font-mono">{Math.max(0, KEmaxEV).toFixed(2)} eV</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">V₀</p>
            <p className="font-mono">{stoppingPotential.toFixed(2)} V</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">Status</p>
            <p className="font-mono">{f >= f0 ? "Emission" : "No emission"}</p>
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
          <p className="font-semibold">NEET Key Points - Photoelectric Effect:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Einstein's equation: KE_max = hf - φ</li>
            <li>• Stopping potential: eV₀ = KE_max</li>
            <li>• Threshold frequency: f₀ = φ/h</li>
            <li>• h = 6.63 × 10⁻³⁴ J·s (Planck's constant)</li>
            <li>• Intensity affects number of electrons, not KE</li>
            <li>• Frequency affects KE of electrons</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
