import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Info } from "lucide-react";

interface TrajectoryPoint {
  x: number;
  y: number;
  t: number;
}

export default function ProjectileMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const trajectoryRef = useRef<TrajectoryPoint[]>([]);

  const [angle, setAngle] = useState([45]);
  const [velocity, setVelocity] = useState([25]);
  const [gravity, setGravity] = useState([9.8]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [range, setRange] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [flightTime, setFlightTime] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const timeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  const g = gravity[0];
  const v0 = velocity[0];
  const theta = (angle[0] * Math.PI) / 180;

  const calculateTrajectory = useCallback(() => {
    const vx = v0 * Math.cos(theta);
    const vy = v0 * Math.sin(theta);
    const totalTime = (2 * vy) / g;
    const calculatedRange = vx * totalTime;
    const calculatedMaxHeight = (vy * vy) / (2 * g);

    setRange(calculatedRange);
    setMaxHeight(calculatedMaxHeight);
    setFlightTime(totalTime);

    return { vx, vy, totalTime, calculatedRange, calculatedMaxHeight };
  }, [v0, theta, g]);

  const drawCanvas = useCallback(
    (time: number = 0) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const groundY = height - 60;
      const launchX = 60;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#0ea5e9");
      gradient.addColorStop(0.6, "#7dd3fc");
      gradient.addColorStop(1, "#bae6fd");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#22c55e";
      ctx.fillRect(0, groundY, width, height - groundY);

      ctx.strokeStyle = "#15803d";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      ctx.fillStyle = "#374151";
      ctx.beginPath();
      ctx.moveTo(launchX - 15, groundY);
      ctx.lineTo(launchX + 15, groundY);
      ctx.lineTo(launchX, groundY - 20);
      ctx.closePath();
      ctx.fill();

      const indicatorLength = 50;
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(launchX, groundY - 10);
      ctx.lineTo(
        launchX + indicatorLength * Math.cos(theta),
        groundY - 10 - indicatorLength * Math.sin(theta)
      );
      ctx.stroke();

      ctx.beginPath();
      const arrowX = launchX + indicatorLength * Math.cos(theta);
      const arrowY = groundY - 10 - indicatorLength * Math.sin(theta);
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX - 10 * Math.cos(theta - 0.3),
        arrowY + 10 * Math.sin(theta - 0.3)
      );
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX - 10 * Math.cos(theta + 0.3),
        arrowY + 10 * Math.sin(theta + 0.3)
      );
      ctx.stroke();

      const { vx, vy, totalTime, calculatedRange } = calculateTrajectory();
      const scale = Math.min((width - 100) / calculatedRange, (groundY - 100) / maxHeight) * 0.8;

      if (isPlaying || trajectoryRef.current.length > 0) {
        ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        for (let t = 0; t <= totalTime; t += 0.02) {
          const x = vx * t;
          const y = vy * t - 0.5 * g * t * t;
          const canvasX = launchX + x * scale;
          const canvasY = groundY - y * scale;
          if (t === 0) {
            ctx.moveTo(canvasX, canvasY);
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (time > 0) {
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let t = 0; t <= time; t += 0.02) {
          const x = vx * t;
          const y = vy * t - 0.5 * g * t * t;
          if (y < 0) break;
          const canvasX = launchX + x * scale;
          const canvasY = groundY - y * scale;
          if (t === 0) {
            ctx.moveTo(canvasX, canvasY);
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        }
        ctx.stroke();

        const x = vx * time;
        const y = Math.max(0, vy * time - 0.5 * g * time * time);
        const canvasX = launchX + x * scale;
        const canvasY = groundY - y * scale;

        const currentVy = vy - g * time;

        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(canvasX + vx * 2, canvasY);
        ctx.stroke();

        ctx.strokeStyle = "#22c55e";
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(canvasX, canvasY - currentVy * 2);
        ctx.stroke();

        const shadowGradient = ctx.createRadialGradient(
          canvasX + 5,
          groundY + 5,
          0,
          canvasX + 5,
          groundY + 5,
          15
        );
        shadowGradient.addColorStop(0, "rgba(0,0,0,0.3)");
        shadowGradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = shadowGradient;
        ctx.beginPath();
        ctx.ellipse(canvasX + 5, groundY + 5, 15, 5, 0, 0, 2 * Math.PI);
        ctx.fill();

        const ballGradient = ctx.createRadialGradient(
          canvasX - 4,
          canvasY - 4,
          0,
          canvasX,
          canvasY,
          12
        );
        ballGradient.addColorStop(0, "#60a5fa");
        ballGradient.addColorStop(0.5, "#3b82f6");
        ballGradient.addColorStop(1, "#1d4ed8");
        ctx.fillStyle = ballGradient;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 12, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.beginPath();
        ctx.arc(canvasX - 4, canvasY - 4, 4, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`θ = ${angle[0]}°`, launchX + 55, groundY - 5);
      ctx.fillText(`v₀ = ${velocity[0]} m/s`, launchX + 55, groundY + 12);
    },
    [angle, velocity, theta, g, maxHeight, isPlaying, calculateTrajectory]
  );

  useEffect(() => {
    calculateTrajectory();
    drawCanvas();
  }, [angle, velocity, gravity, calculateTrajectory, drawCanvas]);

  const startAnimation = useCallback(() => {
    if (!canvasRef.current) return;

    const { vx, vy, totalTime } = calculateTrajectory();
    trajectoryRef.current = [];
    timeRef.current = isPaused ? pausedTimeRef.current : 0;
    setIsPaused(false);
    setIsPlaying(true);

    const animate = () => {
      const t = timeRef.current;

      if (t <= totalTime) {
        const x = vx * t;
        const y = vy * t - 0.5 * g * t * t;
        if (y >= 0) {
          trajectoryRef.current.push({ x, y, t });
        }
        setCurrentTime(t);
        drawCanvas(t);
        timeRef.current += 0.02;
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        setCurrentTime(totalTime);
      }
    };

    animate();
  }, [calculateTrajectory, drawCanvas, g, isPaused]);

  const pauseAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    pausedTimeRef.current = timeRef.current;
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const resetAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    trajectoryRef.current = [];
    timeRef.current = 0;
    pausedTimeRef.current = 0;
    setCurrentTime(0);
    setIsPlaying(false);
    setIsPaused(false);
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full" data-testid="simulation-projectile-motion">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Projectile Motion Simulator
                <Badge variant="outline">Physics - Kinematics</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Visualize how objects move through the air under gravity
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInstructions(!showInstructions)}
              data-testid="button-toggle-instructions"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                How to use this simulation:
              </h4>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                <li>• Adjust the launch angle (0-90°) using the first slider</li>
                <li>• Set the initial velocity (5-50 m/s) with the second slider</li>
                <li>• Change gravity to simulate different planets</li>
                <li>• Press Play to launch the projectile and observe its trajectory</li>
                <li>• Use Pause to stop mid-flight and analyze the motion</li>
              </ul>
            </motion.div>
          )}

          <canvas
            ref={canvasRef}
            width={700}
            height={400}
            className="w-full border rounded-lg shadow-inner"
            data-testid="canvas-projectile"
          />

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                <span>Launch Angle</span>
                <Badge variant="secondary">{angle[0]}°</Badge>
              </label>
              <Slider
                value={angle}
                onValueChange={setAngle}
                min={0}
                max={90}
                step={1}
                disabled={isPlaying}
                data-testid="slider-angle"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                <span>Initial Velocity</span>
                <Badge variant="secondary">{velocity[0]} m/s</Badge>
              </label>
              <Slider
                value={velocity}
                onValueChange={setVelocity}
                min={5}
                max={50}
                step={1}
                disabled={isPlaying}
                data-testid="slider-velocity"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                <span>Gravity</span>
                <Badge variant="secondary">{gravity[0].toFixed(1)} m/s²</Badge>
              </label>
              <Slider
                value={gravity}
                onValueChange={setGravity}
                min={1}
                max={25}
                step={0.1}
                disabled={isPlaying}
                data-testid="slider-gravity"
              />
              <div className="flex gap-1 text-xs text-muted-foreground">
                <span className="cursor-pointer hover:text-foreground" onClick={() => !isPlaying && setGravity([1.62])}>Moon</span>
                <span>|</span>
                <span className="cursor-pointer hover:text-foreground" onClick={() => !isPlaying && setGravity([3.7])}>Mars</span>
                <span>|</span>
                <span className="cursor-pointer hover:text-foreground" onClick={() => !isPlaying && setGravity([9.8])}>Earth</span>
                <span>|</span>
                <span className="cursor-pointer hover:text-foreground" onClick={() => !isPlaying && setGravity([24.8])}>Jupiter</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {!isPlaying ? (
              <Button onClick={startAnimation} data-testid="button-play">
                <Play className="mr-2 h-4 w-4" />
                {isPaused ? "Resume" : "Play"}
              </Button>
            ) : (
              <Button onClick={pauseAnimation} variant="secondary" data-testid="button-pause">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            )}
            <Button onClick={resetAnimation} variant="outline" data-testid="button-reset">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Range</p>
              <p className="text-xl font-bold text-blue-600" data-testid="value-range">
                {range.toFixed(2)} m
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Max Height</p>
              <p className="text-xl font-bold text-green-600" data-testid="value-max-height">
                {maxHeight.toFixed(2)} m
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Flight Time</p>
              <p className="text-xl font-bold text-orange-600" data-testid="value-flight-time">
                {flightTime.toFixed(2)} s
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Current Time</p>
              <p className="text-xl font-bold text-purple-600" data-testid="value-current-time">
                {currentTime.toFixed(2)} s
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Key Formulas</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm font-mono">
              <p>Range: R = v₀²sin(2θ) / g</p>
              <p>Max Height: H = v₀²sin²(θ) / 2g</p>
              <p>Time of Flight: T = 2v₀sin(θ) / g</p>
              <p>Max Range at θ = 45°</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
