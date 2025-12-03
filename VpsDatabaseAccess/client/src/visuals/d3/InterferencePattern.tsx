
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Waves, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function InterferencePattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wavelength, setWavelength] = useState([500]);
  const [slitSeparation, setSlitSeparation] = useState([0.5]);
  const [screenDistance, setScreenDistance] = useState([1.0]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  const width = 800;
  const height = 400;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Convert parameters to proper units
      const lambda = wavelength[0] * 1e-9; // nm to m
      const d = slitSeparation[0] * 1e-3; // mm to m
      const D = screenDistance[0]; // m

      // Draw slits
      const slitY = height / 2;
      const slitX = 100;
      
      ctx.fillStyle = "#333";
      ctx.fillRect(slitX - 2, 0, 4, slitY - 30);
      ctx.fillRect(slitX - 2, slitY + 30, 4, height - slitY - 30);

      // Draw slit openings
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(slitX - 2, slitY - 30, 4, 5);
      ctx.fillRect(slitX - 2, slitY + 25, 4, 5);

      // Draw waves from slits (animated)
      if (isAnimating) {
        phaseRef.current += 0.05;
      }

      // Draw wave patterns from both slits
      for (let i = 0; i < 5; i++) {
        const radius = (i * 30 + phaseRef.current * 10) % 150;
        
        // Wave from slit 1
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 - radius / 500})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(slitX, slitY - 27, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Wave from slit 2
        ctx.beginPath();
        ctx.arc(slitX, slitY + 27, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw screen
      const screenX = width - 100;
      ctx.fillStyle = "#666";
      ctx.fillRect(screenX, 0, 4, height);

      // Calculate and draw interference pattern on screen
      const numPoints = 200;
      for (let i = 0; i < numPoints; i++) {
        const y = (i / numPoints) * height;
        const screenY = y - height / 2;
        
        // Path difference
        const pathDiff = (d * screenY) / D;
        
        // Phase difference
        const phaseDiff = (2 * Math.PI * pathDiff) / lambda;
        
        // Intensity (I = 4I₀cos²(φ/2))
        const intensity = Math.pow(Math.cos(phaseDiff / 2), 2);
        
        // Draw intensity
        const brightness = Math.floor(intensity * 255);
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${255})`;
        ctx.fillRect(screenX - 30, y, 25, height / numPoints + 1);
      }

      // Draw labels
      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.fillText("Double Slit", slitX - 30, 20);
      ctx.fillText("Screen", screenX - 20, 20);

      // Calculate fringe width
      const fringeWidth = (lambda * D) / d;
      ctx.fillText(`Fringe width: ${(fringeWidth * 1000).toFixed(2)} mm`, 10, height - 10);

      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [wavelength, slitSeparation, screenDistance, isAnimating]);

  const handleReset = () => {
    setWavelength([500]);
    setSlitSeparation([0.5]);
    setScreenDistance([1.0]);
    phaseRef.current = 0;
    setAnnouncement("Reset to default values");
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Waves className="h-5 w-5" />
            Young's Double Slit Interference
          </span>
          <Badge variant="outline">Physics - Wave Optics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize interference pattern from coherent light sources
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full border rounded-lg bg-slate-900"
        />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Wavelength (λ): {wavelength[0]} nm
            </label>
            <Slider
              value={wavelength}
              onValueChange={(val) => {
                setWavelength(val);
                setAnnouncement(`Wavelength: ${val[0]} nanometers`);
              }}
              min={400}
              max={700}
              step={10}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Slit Separation (d): {slitSeparation[0].toFixed(2)} mm
            </label>
            <Slider
              value={slitSeparation}
              onValueChange={(val) => {
                setSlitSeparation(val);
                setAnnouncement(`Slit separation: ${val[0].toFixed(2)} millimeters`);
              }}
              min={0.1}
              max={2.0}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Screen Distance (D): {screenDistance[0].toFixed(1)} m
            </label>
            <Slider
              value={screenDistance}
              onValueChange={(val) => {
                setScreenDistance(val);
                setAnnouncement(`Screen distance: ${val[0].toFixed(1)} meters`);
              }}
              min={0.5}
              max={3.0}
              step={0.1}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={toggleAnimation} variant="outline" className="flex-1">
            {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isAnimating ? "Pause" : "Play"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">Key Concepts:</p>
          <ul className="space-y-1 ml-4">
            <li>• Constructive interference: Path difference = nλ</li>
            <li>• Destructive interference: Path difference = (n + ½)λ</li>
            <li>• Fringe width: β = λD/d</li>
            <li>• Intensity: I = 4I₀cos²(φ/2)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
