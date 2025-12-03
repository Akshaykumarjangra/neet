
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Waves, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function PolarizationLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [polarizer1Angle, setPolarizer1Angle] = useState([0]);
  const [polarizer2Angle, setPolarizer2Angle] = useState([45]);
  const [useSecondPolarizer, setUseSecondPolarizer] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  const width = 800;
  const height = 500;

  // Malus's Law: I = I₀ cos²(θ)
  const angle1Rad = (polarizer1Angle[0] * Math.PI) / 180;
  const angle2Rad = (polarizer2Angle[0] * Math.PI) / 180;
  const intensity1 = Math.cos(angle1Rad) ** 2;
  const intensity2 = useSecondPolarizer 
    ? intensity1 * Math.cos(angle2Rad - angle1Rad) ** 2 
    : intensity1;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      if (isAnimating) {
        phaseRef.current += 0.05;
      }

      const centerY = height / 2;
      const waveAmplitude = 40;

      // Draw unpolarized light source
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(50, centerY, 15, 0, Math.PI * 2);
      ctx.fill();

      // Draw unpolarized light waves (multiple orientations)
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const startX = 80;
        const endX = 200;

        ctx.strokeStyle = `rgba(251, 191, 36, ${0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = startX; x < endX; x += 2) {
          const phase = ((x - startX) / 20) * Math.PI * 2 + phaseRef.current;
          const offset = Math.sin(phase) * waveAmplitude * 0.5;
          const y = centerY + offset * Math.cos(angle);
          const z = offset * Math.sin(angle);

          if (x === startX) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // First polarizer
      const pol1X = 220;
      drawPolarizer(ctx, pol1X, centerY, polarizer1Angle[0], "#3b82f6");

      // Label
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px sans-serif";
      ctx.fillText(`P₁: ${polarizer1Angle[0]}°`, pol1X - 20, centerY - 100);

      // Polarized light after first polarizer
      const pol1EndX = useSecondPolarizer ? 450 : 700;
      ctx.strokeStyle = `rgba(59, 130, 246, ${intensity1})`;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = pol1X + 40; x < pol1EndX; x += 2) {
        const phase = ((x - pol1X) / 20) * Math.PI * 2 + phaseRef.current;
        const offset = Math.sin(phase) * waveAmplitude * Math.sqrt(intensity1);
        const y = centerY + offset * Math.cos(angle1Rad);

        if (x === pol1X + 40) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Second polarizer (optional)
      if (useSecondPolarizer) {
        const pol2X = 480;
        drawPolarizer(ctx, pol2X, centerY, polarizer2Angle[0], "#10b981");

        ctx.fillStyle = "#ffffff";
        ctx.fillText(`P₂: ${polarizer2Angle[0]}°`, pol2X - 20, centerY - 100);

        // Light after second polarizer
        ctx.strokeStyle = `rgba(16, 185, 129, ${intensity2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        const finalAngle = angle2Rad;
        for (let x = pol2X + 40; x < 700; x += 2) {
          const phase = ((x - pol2X) / 20) * Math.PI * 2 + phaseRef.current;
          const offset = Math.sin(phase) * waveAmplitude * Math.sqrt(intensity2);
          const y = centerY + offset * Math.cos(finalAngle);

          if (x === pol2X + 40) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Screen showing final intensity
      const screenX = 720;
      ctx.fillStyle = "#333";
      ctx.fillRect(screenX, centerY - 80, 30, 160);

      // Display intensity on screen
      const screenBrightness = Math.floor(intensity2 * 255);
      ctx.fillStyle = `rgb(${screenBrightness}, ${screenBrightness}, ${screenBrightness})`;
      ctx.fillRect(screenX + 5, centerY - 75, 20, 150);

      // Intensity label
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px sans-serif";
      ctx.fillText(`${(intensity2 * 100).toFixed(1)}%`, screenX - 10, centerY + 100);

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
  }, [polarizer1Angle, polarizer2Angle, useSecondPolarizer, isAnimating, intensity1, intensity2]);

  const drawPolarizer = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number,
    color: string
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);

    // Polarizer plate
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(-5, -80, 10, 160);
    ctx.globalAlpha = 1;

    // Polarizer lines
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (let i = -70; i <= 70; i += 10) {
      ctx.beginPath();
      ctx.moveTo(-15, i);
      ctx.lineTo(15, i);
      ctx.stroke();
    }

    // Polarization direction arrow
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -90);
    ctx.lineTo(0, -60);
    ctx.stroke();

    // Arrow head
    ctx.beginPath();
    ctx.moveTo(-5, -65);
    ctx.lineTo(0, -60);
    ctx.lineTo(5, -65);
    ctx.stroke();

    ctx.restore();
  };

  const handleReset = () => {
    setPolarizer1Angle([0]);
    setPolarizer2Angle([45]);
    setUseSecondPolarizer(true);
    phaseRef.current = 0;
    setAnnouncement("Reset to default values");
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  const toggleSecondPolarizer = () => {
    setUseSecondPolarizer(!useSecondPolarizer);
    setAnnouncement(useSecondPolarizer ? "Second polarizer removed" : "Second polarizer added");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-blue-500" />
            Polarization of Light - Malus's Law
          </span>
          <Badge variant="outline">Physics - Wave Optics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize light polarization and intensity through polarizers
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full border rounded-lg"
        />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              First Polarizer (P₁): {polarizer1Angle[0]}°
            </label>
            <Slider
              value={polarizer1Angle}
              onValueChange={(val) => {
                setPolarizer1Angle(val);
                setAnnouncement(`First polarizer angle: ${val[0]} degrees`);
              }}
              min={0}
              max={180}
              step={5}
            />
          </div>

          {useSecondPolarizer && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Second Polarizer (P₂): {polarizer2Angle[0]}°
              </label>
              <Slider
                value={polarizer2Angle}
                onValueChange={(val) => {
                  setPolarizer2Angle(val);
                  setAnnouncement(`Second polarizer angle: ${val[0]} degrees`);
                }}
                min={0}
                max={180}
                step={5}
              />
            </div>
          )}
        </div>

        <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">After P₁</p>
            <p className="text-2xl font-bold text-blue-600">
              {(intensity1 * 100).toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Final Intensity</p>
            <p className="text-2xl font-bold text-green-600">
              {(intensity2 * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={toggleAnimation} variant="outline" className="flex-1">
            {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isAnimating ? "Pause" : "Play"}
          </Button>
          <Button onClick={toggleSecondPolarizer} variant="outline" className="flex-1">
            {useSecondPolarizer ? "Remove P₂" : "Add P₂"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Polarization:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Malus's Law: I = I₀ cos²θ</li>
            <li>• θ = angle between polarizer axes</li>
            <li>• Unpolarized → First polarizer: I = I₀/2</li>
            <li>• Cross polarizers (90°): I = 0 (complete blocking)</li>
            <li>• Parallel polarizers (0°): I = I₀ (maximum transmission)</li>
            <li>• Brewster's angle: tan θ_B = n₂/n₁</li>
            <li>• Polarization proves transverse nature of light</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">Applications:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Polaroid sunglasses (reduce glare)</li>
            <li>• LCD displays</li>
            <li>• 3D movie glasses</li>
            <li>• Photography filters</li>
            <li>• Stress analysis in materials</li>
            <li>• Optical instruments</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
