
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Activity } from "lucide-react";
import { usePrefersReducedMotion } from "@/visuals/hooks/usePrefersMotion";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function SimplePendulumPhase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [isRunning, setIsRunning] = useState(false);
  const [length, setLength] = useState([1.0]); // meters
  const [initialAngle, setInitialAngle] = useState([30]); // degrees
  const [damping, setDamping] = useState([0.02]);
  const [announcement, setAnnouncement] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();

  // Physics state
  const stateRef = useRef({
    theta: (30 * Math.PI) / 180, // current angle in radians
    omega: 0, // angular velocity
    time: 0,
    phaseHistory: [] as Array<{ theta: number; omega: number }>,
  });

  const g = 9.8; // m/s²
  const canvasWidth = 400;
  const canvasHeight = 400;
  const phaseWidth = 400;
  const phaseHeight = 300;

  useEffect(() => {
    resetSimulation();
  }, [length, initialAngle, damping]);

  useEffect(() => {
    if (!isRunning || prefersReducedMotion) return;

    const animate = () => {
      const dt = 0.016; // ~60fps
      const state = stateRef.current;
      const L = length[0];
      const b = damping[0];

      // Simple harmonic motion with damping: d²θ/dt² = -(g/L)sin(θ) - b(dθ/dt)
      const alpha = -(g / L) * Math.sin(state.theta) - b * state.omega;
      
      state.omega += alpha * dt;
      state.theta += state.omega * dt;
      state.time += dt;

      // Store phase space trajectory
      if (state.phaseHistory.length > 500) {
        state.phaseHistory.shift();
      }
      state.phaseHistory.push({ theta: state.theta, omega: state.omega });

      drawPendulum();
      drawPhaseSpace();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, length, damping, prefersReducedMotion]);

  const resetSimulation = () => {
    const state = stateRef.current;
    state.theta = (initialAngle[0] * Math.PI) / 180;
    state.omega = 0;
    state.time = 0;
    state.phaseHistory = [];
    
    drawPendulum();
    drawPhaseSpace();
    
    setAnnouncement(`Reset: L=${length[0]}m, θ₀=${initialAngle[0]}°`);
  };

  const drawPendulum = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;
    const centerX = canvasWidth / 2;
    const centerY = 50;
    const scale = 150; // pixels per meter

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw ceiling
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvasWidth, centerY);
    ctx.stroke();

    // Calculate pendulum bob position
    const bobX = centerX + scale * length[0] * Math.sin(state.theta);
    const bobY = centerY + scale * length[0] * Math.cos(state.theta);

    // Draw string
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Draw pivot point
    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Draw bob
    ctx.fillStyle = "#10b981";
    ctx.strokeStyle = "#059669";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Draw angle arc
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, state.theta);
    ctx.stroke();

    // Draw angle text
    ctx.fillStyle = "#f59e0b";
    ctx.font = "14px monospace";
    const angleDeg = ((state.theta * 180) / Math.PI).toFixed(1);
    ctx.fillText(`θ = ${angleDeg}°`, centerX + 50, centerY + 20);

    // Draw angular velocity text
    ctx.fillStyle = "#3b82f6";
    const omegaText = state.omega.toFixed(2);
    ctx.fillText(`ω = ${omegaText} rad/s`, centerX + 50, centerY + 40);
  };

  const drawPhaseSpace = () => {
    const canvas = phaseCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, phaseWidth, phaseHeight);

    // Draw axes
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;
    const centerX = phaseWidth / 2;
    const centerY = phaseHeight / 2;

    // Horizontal axis (θ)
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(phaseWidth, centerY);
    ctx.stroke();

    // Vertical axis (ω)
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, phaseHeight);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#888";
    ctx.font = "12px monospace";
    ctx.fillText("θ", phaseWidth - 20, centerY - 5);
    ctx.fillText("ω", centerX + 5, 15);

    // Scale factors
    const thetaScale = phaseWidth / (2 * Math.PI);
    const omegaScale = phaseHeight / 10;

    // Draw phase trajectory
    if (state.phaseHistory.length > 1) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.beginPath();

      const first = state.phaseHistory[0];
      ctx.moveTo(
        centerX + first.theta * thetaScale,
        centerY - first.omega * omegaScale
      );

      for (let i = 1; i < state.phaseHistory.length; i++) {
        const point = state.phaseHistory[i];
        ctx.lineTo(
          centerX + point.theta * thetaScale,
          centerY - point.omega * omegaScale
        );
      }

      ctx.stroke();
    }

    // Draw current point
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(
      centerX + state.theta * thetaScale,
      centerY - state.omega * omegaScale,
      5,
      0,
      2 * Math.PI
    );
    ctx.fill();
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
    setAnnouncement(isRunning ? "Simulation paused" : "Simulation started");
  };

  const period = 2 * Math.PI * Math.sqrt(length[0] / g);
  const frequency = 1 / period;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Simple Pendulum - Phase Space
          </span>
          <Badge variant="outline">Physics - Oscillations</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize pendulum motion in phase space (θ vs ω)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Pendulum Motion</h4>
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              className="w-full border rounded-lg bg-background"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Phase Space (θ vs ω)</h4>
            <canvas
              ref={phaseCanvasRef}
              width={phaseWidth}
              height={phaseHeight}
              className="w-full border rounded-lg bg-background"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Length: {length[0].toFixed(1)} m
            </label>
            <Slider
              value={length}
              onValueChange={setLength}
              min={0.5}
              max={2.0}
              step={0.1}
              disabled={isRunning}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Initial Angle: {initialAngle[0]}°
            </label>
            <Slider
              value={initialAngle}
              onValueChange={setInitialAngle}
              min={5}
              max={90}
              step={5}
              disabled={isRunning}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Damping: {damping[0].toFixed(2)}
            </label>
            <Slider
              value={damping}
              onValueChange={setDamping}
              min={0}
              max={0.1}
              step={0.01}
              disabled={isRunning}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={toggleSimulation}>
            {isRunning ? (
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
          <Button onClick={resetSimulation} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Time Period</p>
            <p className="text-2xl font-bold text-primary">
              {period.toFixed(2)} s
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Frequency</p>
            <p className="text-2xl font-bold text-green-600">
              {frequency.toFixed(2)} Hz
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Simple Harmonic Motion (SHM) for small angles (θ &lt; 15°)</li>
            <li>• Restoring torque: τ = -mgL sin(θ) ≈ -mgLθ (for small θ)</li>
            <li>• Period: T = 2π√(L/g) - independent of mass!</li>
            <li>• Phase space: closed ellipse for undamped SHM</li>
            <li>• Damping causes spiral trajectory toward center</li>
            <li>• Energy: E = ½mL²ω² + mgL(1 - cos θ)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Important Formulas:</h4>
          <div className="grid gap-2 text-sm font-mono bg-muted p-3 rounded">
            <p>T = 2π√(L/g)</p>
            <p>f = 1/T = (1/2π)√(g/L)</p>
            <p>ω = √(g/L) (angular frequency)</p>
            <p>θ(t) = θ₀ cos(ωt + φ)</p>
            <p>E = ½mL²ω² + mgL(1 - cos θ)</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
