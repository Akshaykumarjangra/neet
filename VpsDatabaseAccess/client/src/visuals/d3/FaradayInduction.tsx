
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Zap, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function FaradayInduction() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [magnetSpeed, setMagnetSpeed] = useState([3]);
  const [coilTurns, setCoilTurns] = useState([5]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [magnetPosition, setMagnetPosition] = useState(0);
  const [emf, setEmf] = useState(0);
  const animationRef = useRef<number | null>(null);

  const width = 800;
  const height = 500;
  const margin = { top: 40, right: 60, bottom: 60, left: 60 };

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
      .text("Faraday's Law - Electromagnetic Induction");

    // Draw coil
    const coilCenterX = innerWidth / 2;
    const coilCenterY = innerHeight / 2;
    const coilWidth = 150;
    const coilHeight = 200;

    // Coil windings
    const coilGroup = g.append("g").attr("class", "coil-group");

    for (let i = 0; i < coilTurns[0]; i++) {
      const offset = (i - coilTurns[0] / 2) * 8;
      
      // Left side
      coilGroup
        .append("path")
        .attr("d", `M ${coilCenterX - coilWidth / 2 + offset} ${coilCenterY - coilHeight / 2}
                    Q ${coilCenterX - coilWidth / 2 - 20 + offset} ${coilCenterY}
                    ${coilCenterX - coilWidth / 2 + offset} ${coilCenterY + coilHeight / 2}`)
        .attr("fill", "none")
        .attr("stroke", "#f59e0b")
        .attr("stroke-width", 3);

      // Right side
      coilGroup
        .append("path")
        .attr("d", `M ${coilCenterX + coilWidth / 2 + offset} ${coilCenterY - coilHeight / 2}
                    Q ${coilCenterX + coilWidth / 2 + 20 + offset} ${coilCenterY}
                    ${coilCenterX + coilWidth / 2 + offset} ${coilCenterY + coilHeight / 2}`)
        .attr("fill", "none")
        .attr("stroke", "#f59e0b")
        .attr("stroke-width", 3);
    }

    // Coil terminals
    coilGroup
      .append("circle")
      .attr("cx", coilCenterX - coilWidth / 2 - 30)
      .attr("cy", coilCenterY + coilHeight / 2 + 20)
      .attr("r", 5)
      .attr("fill", "#dc2626");

    coilGroup
      .append("circle")
      .attr("cx", coilCenterX + coilWidth / 2 + 30)
      .attr("cy", coilCenterY + coilHeight / 2 + 20)
      .attr("r", 5)
      .attr("fill", "#dc2626");

    // Wire to galvanometer
    coilGroup
      .append("line")
      .attr("x1", coilCenterX - coilWidth / 2 - 30)
      .attr("y1", coilCenterY + coilHeight / 2 + 20)
      .attr("x2", coilCenterX - coilWidth / 2 - 80)
      .attr("y2", coilCenterY + coilHeight / 2 + 60)
      .attr("stroke", "#64748b")
      .attr("stroke-width", 2);

    coilGroup
      .append("line")
      .attr("x1", coilCenterX + coilWidth / 2 + 30)
      .attr("y1", coilCenterY + coilHeight / 2 + 20)
      .attr("x2", coilCenterX + coilWidth / 2 + 80)
      .attr("y2", coilCenterY + coilHeight / 2 + 60)
      .attr("stroke", "#64748b")
      .attr("stroke-width", 2);

    // Galvanometer
    const galvanoX = coilCenterX;
    const galvanoY = coilCenterY + coilHeight / 2 + 80;

    g.append("circle")
      .attr("cx", galvanoX)
      .attr("cy", galvanoY)
      .attr("r", 30)
      .attr("fill", "none")
      .attr("stroke", "#64748b")
      .attr("stroke-width", 3);

    g.append("text")
      .attr("x", galvanoX)
      .attr("y", galvanoY - 40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .attr("fill", "currentColor")
      .text("Galvanometer");

    // Needle
    const needleGroup = g.append("g").attr("class", "needle-group");
    needleGroup
      .append("line")
      .attr("class", "galvano-needle")
      .attr("x1", galvanoX)
      .attr("y1", galvanoY)
      .attr("x2", galvanoX)
      .attr("y2", galvanoY - 25)
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 2);

    // Magnet
    const magnetGroup = g.append("g").attr("class", "magnet-group");
    
    const magnetWidth = 60;
    const magnetHeight = 100;
    const magnetX = coilCenterX - magnetWidth / 2;
    const magnetY = coilCenterY - magnetHeight / 2;

    // North pole (red)
    magnetGroup
      .append("rect")
      .attr("class", "magnet-north")
      .attr("x", magnetX)
      .attr("y", magnetY)
      .attr("width", magnetWidth)
      .attr("height", magnetHeight / 2)
      .attr("fill", "#ef4444")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    magnetGroup
      .append("text")
      .attr("class", "magnet-north-label")
      .attr("x", magnetX + magnetWidth / 2)
      .attr("y", magnetY + magnetHeight / 4)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .attr("fill", "white")
      .text("N");

    // South pole (blue)
    magnetGroup
      .append("rect")
      .attr("class", "magnet-south")
      .attr("x", magnetX)
      .attr("y", magnetY + magnetHeight / 2)
      .attr("width", magnetWidth)
      .attr("height", magnetHeight / 2)
      .attr("fill", "#3b82f6")
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    magnetGroup
      .append("text")
      .attr("class", "magnet-south-label")
      .attr("x", magnetX + magnetWidth / 2)
      .attr("y", magnetY + (3 * magnetHeight) / 4)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .attr("fill", "white")
      .text("S");

    // Magnetic field lines
    const fieldLinesGroup = g.append("g").attr("class", "field-lines");

    const drawFieldLines = (x: number) => {
      fieldLinesGroup.selectAll("*").remove();
      
      for (let i = -2; i <= 2; i++) {
        const offsetY = i * 30;
        fieldLinesGroup
          .append("path")
          .attr("d", `M ${x - 80} ${coilCenterY + offsetY}
                     Q ${x - 40} ${coilCenterY + offsetY + 20}
                     ${x} ${coilCenterY + offsetY}
                     Q ${x + 40} ${coilCenterY + offsetY - 20}
                     ${x + 80} ${coilCenterY + offsetY}`)
          .attr("fill", "none")
          .attr("stroke", "#10b981")
          .attr("stroke-width", 1.5)
          .attr("stroke-dasharray", "5,5")
          .attr("opacity", 0.6);

        // Arrow
        fieldLinesGroup
          .append("polygon")
          .attr("points", `${x + 70},${coilCenterY + offsetY - 3} ${x + 80},${coilCenterY + offsetY} ${x + 70},${coilCenterY + offsetY + 3}`)
          .attr("fill", "#10b981");
      }
    };

    drawFieldLines(coilCenterX);

    // EMF display
    const emfDisplay = g.append("g").attr("class", "emf-display");
    emfDisplay
      .append("rect")
      .attr("x", innerWidth - 120)
      .attr("y", 20)
      .attr("width", 100)
      .attr("height", 60)
      .attr("fill", "#1e293b")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("rx", 5);

    emfDisplay
      .append("text")
      .attr("x", innerWidth - 70)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .attr("fill", "#64748b")
      .text("Induced EMF");

    emfDisplay
      .append("text")
      .attr("class", "emf-value")
      .attr("x", innerWidth - 70)
      .attr("y", 65)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .attr("fill", "#3b82f6")
      .text("0.00 V");

  }, [coilTurns, magnetSpeed]);

  useEffect(() => {
    if (!isAnimating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let time = magnetPosition;
    const amplitude = 150;
    const period = 60 / magnetSpeed[0];

    const animate = () => {
      const svg = d3.select(svgRef.current);
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const coilCenterX = innerWidth / 2;
      const coilCenterY = innerHeight / 2;

      // Calculate magnet position (oscillating)
      const offset = amplitude * Math.sin((2 * Math.PI * time) / period);
      const velocity = (2 * Math.PI * amplitude / period) * Math.cos((2 * Math.PI * time) / period);
      
      // Move magnet
      svg.select(".magnet-group")
        .attr("transform", `translate(${offset}, 0)`);

      // Update field lines
      svg.select(".field-lines").selectAll("*").remove();
      const fieldLinesGroup = svg.select(".field-lines");
      
      const magnetX = coilCenterX + offset;
      for (let i = -2; i <= 2; i++) {
        const offsetY = i * 30;
        fieldLinesGroup
          .append("path")
          .attr("d", `M ${magnetX - 80} ${coilCenterY + offsetY}
                     Q ${magnetX - 40} ${coilCenterY + offsetY + 20}
                     ${magnetX} ${coilCenterY + offsetY}
                     Q ${magnetX + 40} ${coilCenterY + offsetY - 20}
                     ${magnetX + 80} ${coilCenterY + offsetY}`)
          .attr("fill", "none")
          .attr("stroke", "#10b981")
          .attr("stroke-width", 1.5)
          .attr("stroke-dasharray", "5,5")
          .attr("opacity", 0.6);

        fieldLinesGroup
          .append("polygon")
          .attr("points", `${magnetX + 70},${coilCenterY + offsetY - 3} ${magnetX + 80},${coilCenterY + offsetY} ${magnetX + 70},${coilCenterY + offsetY + 3}`)
          .attr("fill", "#10b981");
      }

      // Calculate induced EMF (proportional to velocity and number of turns)
      const calculatedEmf = coilTurns[0] * velocity / 100;
      setEmf(calculatedEmf);

      // Update EMF display
      svg.select(".emf-value")
        .text(`${calculatedEmf.toFixed(2)} V`);

      // Rotate galvanometer needle
      const needleAngle = Math.max(-60, Math.min(60, calculatedEmf * 10));
      svg.select(".galvano-needle")
        .attr("transform", `rotate(${needleAngle}, ${innerWidth / 2}, ${innerHeight / 2 + 230})`);

      time += 1;
      setMagnetPosition(time);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, magnetSpeed, coilTurns, magnetPosition]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  const reset = () => {
    setMagnetSpeed([3]);
    setCoilTurns([5]);
    setMagnetPosition(0);
    setEmf(0);
    setIsAnimating(true);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Faraday's Law of Electromagnetic Induction
          </span>
          <Badge variant="outline">Physics - EMI</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Moving magnet through coil induces EMF
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg ref={svgRef} width={width} height={height} className="border rounded-lg bg-background" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Magnet Speed: {magnetSpeed[0]}
            </label>
            <Slider
              value={magnetSpeed}
              onValueChange={(val) => {
                setMagnetSpeed(val);
                setAnnouncement(`Magnet speed: ${val[0]}`);
              }}
              min={1}
              max={10}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Number of Turns: {coilTurns[0]}
            </label>
            <Slider
              value={coilTurns}
              onValueChange={(val) => {
                setCoilTurns(val);
                setAnnouncement(`Coil turns: ${val[0]}`);
              }}
              min={1}
              max={10}
              step={1}
            />
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current EMF</p>
            <p className="text-2xl font-bold text-blue-600">{emf.toFixed(2)} V</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Possible EMF</p>
            <p className="text-2xl font-bold text-green-600">
              {(coilTurns[0] * magnetSpeed[0] * 0.5).toFixed(2)} V
            </p>
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
          <p className="font-semibold">NEET Key Points - Faraday's Law:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• ε = -N(dΦ/dt) (Faraday's Law)</li>
            <li>• ε = induced EMF (volts)</li>
            <li>• N = number of turns in coil</li>
            <li>• dΦ/dt = rate of change of magnetic flux</li>
            <li>• Negative sign: Lenz's Law (opposes change)</li>
            <li>• EMF ∝ velocity of magnet</li>
            <li>• EMF ∝ number of turns</li>
            <li>• Φ = B·A·cos(θ)</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">Applications:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Electric generators (AC/DC)</li>
            <li>• Transformers</li>
            <li>• Induction motors</li>
            <li>• Metal detectors</li>
            <li>• Wireless charging</li>
            <li>• Electromagnetic braking</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
