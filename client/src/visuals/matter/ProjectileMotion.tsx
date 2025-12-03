
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw } from "lucide-react";

export default function ProjectileMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState([45]);
  const [velocity, setVelocity] = useState([20]);
  const [isRunning, setIsRunning] = useState(false);
  const [range, setRange] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const g = 9.8; // gravity

  useEffect(() => {
    // Draw initial state
    drawInitialState();
  }, [angle, velocity]);

  const drawInitialState = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();

    // Draw launcher
    const launchX = 50;
    const launchY = canvas.height - 50;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(launchX, launchY, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Draw angle indicator
    const theta = (angle[0] * Math.PI) / 180;
    const indicatorLength = 40;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(launchX, launchY);
    ctx.lineTo(launchX + indicatorLength * Math.cos(theta), launchY - indicatorLength * Math.sin(theta));
    ctx.stroke();

    // Draw arc for angle
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(launchX, launchY, 30, -theta, 0, false);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const launchProjectile = () => {
    if (!canvasRef.current) return;

    const v0 = velocity[0];
    const theta = (angle[0] * Math.PI) / 180;
    const vx = v0 * Math.cos(theta);
    const vy = v0 * Math.sin(theta);

    // Calculate theoretical values
    const calculatedRange = (v0 * v0 * Math.sin(2 * theta)) / g;
    const calculatedMaxHeight = (v0 * v0 * Math.sin(theta) * Math.sin(theta)) / (2 * g);
    
    setRange(calculatedRange);
    setMaxHeight(calculatedMaxHeight);

    // Reset time
    timeRef.current = 0;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 8; // pixels per meter
    const launchX = 50;
    const launchY = canvas.height - 50;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 50);
      ctx.lineTo(canvas.width, canvas.height - 50);
      ctx.stroke();

      const t = timeRef.current;

      // Calculate current position
      const x = vx * t;
      const y = vy * t - 0.5 * g * t * t;

      // Draw full trajectory path
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      for (let time = 0; time <= t; time += 0.05) {
        const pathX = vx * time;
        const pathY = vy * time - 0.5 * g * time * time;
        const canvasX = launchX + pathX * scale;
        const canvasY = launchY - pathY * scale;
        
        if (time === 0) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Continue animation if projectile is still in air
      if (y >= 0 && x <= calculatedRange + 1) {
        // Draw projectile
        const canvasX = launchX + x * scale;
        const canvasY = launchY - y * scale;

        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 8, 0, 2 * Math.PI);
        ctx.fill();

        // Draw velocity vector
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        const currentVx = vx;
        const currentVy = vy - g * t;
        const vectorScale = 3;
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(canvasX + currentVx * vectorScale, canvasY - currentVy * vectorScale);
        ctx.stroke();

        // Draw velocity components
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        // Horizontal component
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(canvasX + currentVx * vectorScale, canvasY);
        ctx.stroke();
        // Vertical component
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(canvasX, canvasY - currentVy * vectorScale);
        ctx.stroke();
        ctx.setLineDash([]);

        timeRef.current += 0.03;
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Final position
        const finalX = launchX + calculatedRange * scale;
        const finalY = launchY;
        
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(finalX, finalY, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        setIsRunning(false);
      }
    };

    setIsRunning(true);
    animate();
  };

  const reset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsRunning(false);
    timeRef.current = 0;
    drawInitialState();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Projectile Motion Simulator</span>
          <Badge variant="outline">Physics - Kinematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          width={700}
          height={400}
          className="w-full border rounded-lg bg-gradient-to-b from-sky-100 to-white dark:from-sky-950 dark:to-background"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Launch Angle: {angle[0]}°
            </label>
            <Slider
              value={angle}
              onValueChange={setAngle}
              min={0}
              max={90}
              step={1}
              disabled={isRunning}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Initial Velocity: {velocity[0]} m/s
            </label>
            <Slider
              value={velocity}
              onValueChange={setVelocity}
              min={5}
              max={40}
              step={1}
              disabled={isRunning}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={launchProjectile} disabled={isRunning}>
            <Play className="mr-2 h-4 w-4" />
            Launch
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Range</p>
            <p className="text-xl font-bold">{range.toFixed(2)} m</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Height</p>
            <p className="text-xl font-bold">{maxHeight.toFixed(2)} m</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
