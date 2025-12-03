
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Volume2, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function ResonanceTube() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [frequency, setFrequency] = useState([512]);
  const [waterLevel, setWaterLevel] = useState([25]);
  const [announcement, setAnnouncement] = useState("");

  const speedOfSound = 343; // m/s at 20°C
  const wavelength = speedOfSound / frequency[0];
  const wavelengthCm = wavelength * 100;

  const firstResonance = wavelengthCm / 4;
  const secondResonance = (3 * wavelengthCm) / 4;
  const thirdResonance = (5 * wavelengthCm) / 4;

  const isResonating = Math.abs(waterLevel[0] - firstResonance) < 2 ||
                       Math.abs(waterLevel[0] - secondResonance) < 2 ||
                       Math.abs(waterLevel[0] - thirdResonance) < 2;

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 500;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Tube
    svg.append("rect")
      .attr("x", 150)
      .attr("y", 50)
      .attr("width", 100)
      .attr("height", 400)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 4);

    // Water
    const waterHeight = (waterLevel[0] / 100) * 400;
    svg.append("rect")
      .attr("x", 150)
      .attr("y", 450 - waterHeight)
      .attr("width", 100)
      .attr("height", waterHeight)
      .attr("fill", "#60a5fa")
      .attr("opacity", 0.6);

    // Air column
    const airHeight = 400 - waterHeight;
    svg.append("text")
      .attr("x", 270)
      .attr("y", 250)
      .attr("text-anchor", "start")
      .style("font-size", "16px")
      .attr("fill", "currentColor")
      .text(`L = ${airHeight.toFixed(1)} cm`);

    // Tuning fork
    svg.append("line")
      .attr("x1", 200)
      .attr("y1", 30)
      .attr("x2", 200)
      .attr("y2", 50)
      .attr("stroke", "#000")
      .attr("stroke-width", 3);

    svg.append("path")
      .attr("d", "M 180,30 Q 180,10 200,10 Q 220,10 220,30")
      .attr("fill", "none")
      .attr("stroke", isResonating ? "#10b981" : "#666")
      .attr("stroke-width", 3);

    // Sound waves
    if (isResonating) {
      for (let i = 0; i < 5; i++) {
        svg.append("circle")
          .attr("cx", 200)
          .attr("cy", 30)
          .attr("r", i * 15 + 10)
          .attr("fill", "none")
          .attr("stroke", "#10b981")
          .attr("stroke-width", 2)
          .attr("opacity", 1 - i * 0.2);
      }
    }

    // Standing wave pattern
    const numPoints = 50;
    const points: [number, number][] = [];
    for (let i = 0; i <= numPoints; i++) {
      const y = 50 + (i / numPoints) * airHeight;
      const amplitude = isResonating ? 30 : 10;
      const x = 200 + amplitude * Math.sin((i / numPoints) * Math.PI * 2 * (airHeight / wavelengthCm));
      points.push([x, y]);
    }

    const line = d3.line();
    svg.append("path")
      .datum(points)
      .attr("fill", "none")
      .attr("stroke", isResonating ? "#10b981" : "#999")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Resonance markers
    [firstResonance, secondResonance, thirdResonance].forEach((res, i) => {
      if (res < 100) {
        const y = 450 - (res / 100) * 400;
        svg.append("line")
          .attr("x1", 250)
          .attr("y1", y)
          .attr("x2", 350)
          .attr("y2", y)
          .attr("stroke", "#ef4444")
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "5,5");

        svg.append("text")
          .attr("x", 360)
          .attr("y", y + 5)
          .style("font-size", "12px")
          .attr("fill", "#ef4444")
          .text(`${i + 1}st resonance: ${res.toFixed(1)} cm`);
      }
    });

  }, [frequency, waterLevel, wavelengthCm, firstResonance, secondResonance, thirdResonance, isResonating]);

  const reset = () => {
    setFrequency([512]);
    setWaterLevel([25]);
    setAnnouncement("Reset to default");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Resonance Tube
          </span>
          <Badge variant="outline">Physics - Waves</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Find speed of sound using resonance
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} className="w-full h-[500px] border rounded-lg bg-background" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Frequency: {frequency[0]} Hz
            </label>
            <Slider
              value={frequency}
              onValueChange={(val) => {
                setFrequency(val);
                setAnnouncement(`Frequency: ${val[0]} Hz`);
              }}
              min={256}
              max={1024}
              step={32}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Air Column Length: {waterLevel[0]} cm
            </label>
            <Slider
              value={waterLevel}
              onValueChange={(val) => {
                setWaterLevel(val);
                setAnnouncement(`Air column: ${val[0]} cm`);
              }}
              min={5}
              max={95}
              step={0.5}
            />
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isResonating ? 'bg-green-50 dark:bg-green-950/20' : 'bg-muted'}`}>
          <p className="font-semibold mb-2">
            {isResonating ? "🔊 RESONANCE DETECTED!" : "Adjust water level for resonance"}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Wavelength</p>
              <p className="font-mono">{wavelengthCm.toFixed(2)} cm</p>
            </div>
            <div>
              <p className="text-muted-foreground">Speed of Sound</p>
              <p className="font-mono">{speedOfSound} m/s</p>
            </div>
          </div>
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Resonance Tube:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• 1st resonance: L₁ = λ/4</li>
            <li>• 2nd resonance: L₂ = 3λ/4</li>
            <li>• λ = 2(L₂ - L₁)</li>
            <li>• v = fλ (speed of sound)</li>
            <li>• End correction: e = (L₂ - 3L₁)/2</li>
            <li>• Antinode at open end, node at closed end</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
