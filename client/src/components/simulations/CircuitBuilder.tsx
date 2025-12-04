import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info, Zap, Lightbulb } from "lucide-react";

interface ElectronParticle {
  x: number;
  y: number;
  speed: number;
  pathIndex: number;
  pathProgress: number;
}

export default function CircuitBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const electronsRef = useRef<ElectronParticle[]>([]);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [voltage, setVoltage] = useState([9]);
  const [resistance, setResistance] = useState([100]);
  const [showInstructions, setShowInstructions] = useState(true);

  const current = isSwitchOn ? (voltage[0] / resistance[0]) * 1000 : 0;
  const power = isSwitchOn ? voltage[0] * (current / 1000) : 0;
  const bulbBrightness = Math.min(1, current / 100);

  const circuitPath = [
    { x: 100, y: 200 },
    { x: 100, y: 100 },
    { x: 300, y: 100 },
    { x: 300, y: 150 },
    { x: 300, y: 200 },
    { x: 500, y: 200 },
    { x: 500, y: 100 },
    { x: 600, y: 100 },
    { x: 600, y: 200 },
    { x: 600, y: 300 },
    { x: 300, y: 300 },
    { x: 100, y: 300 },
    { x: 100, y: 200 },
  ];

  const initElectrons = useCallback(() => {
    const electrons: ElectronParticle[] = [];
    for (let i = 0; i < 15; i++) {
      electrons.push({
        x: 0,
        y: 0,
        speed: 0.01 + Math.random() * 0.005,
        pathIndex: Math.floor(Math.random() * (circuitPath.length - 1)),
        pathProgress: Math.random(),
      });
    }
    electronsRef.current = electrons;
  }, []);

  const drawCircuit = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(circuitPath[0].x, circuitPath[0].y);
    for (let i = 1; i < circuitPath.length; i++) {
      if (i === 5 && !isSwitchOn) {
        ctx.lineTo(circuitPath[4].x + 30, circuitPath[4].y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(circuitPath[5].x - 30, circuitPath[5].y);
        ctx.lineTo(circuitPath[5].x, circuitPath[5].y);
      }
      ctx.lineTo(circuitPath[i].x, circuitPath[i].y);
    }
    ctx.stroke();

    const batteryX = 100;
    const batteryY = 200;
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(batteryX - 25, batteryY - 40, 50, 80);
    ctx.fillStyle = "#fef2f2";
    ctx.fillRect(batteryX - 20, batteryY - 35, 40, 70);
    
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 14px Inter";
    ctx.textAlign = "center";
    ctx.fillText("+", batteryX, batteryY - 50);
    ctx.fillText("-", batteryX, batteryY + 60);
    ctx.fillText(`${voltage[0]}V`, batteryX, batteryY + 5);

    const resistorX = 300;
    const resistorY = 150;
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(resistorX, resistorY - 20);
    for (let i = 0; i < 6; i++) {
      const direction = i % 2 === 0 ? 1 : -1;
      ctx.lineTo(resistorX + direction * 15, resistorY - 20 + (i + 1) * 8);
    }
    ctx.lineTo(resistorX, resistorY + 30);
    ctx.stroke();

    ctx.fillStyle = "#6366f1";
    ctx.font = "12px Inter";
    ctx.fillText(`${resistance[0]}Ω`, resistorX + 30, resistorY + 5);

    const switchX = 450;
    const switchY = 200;
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.arc(switchX - 30, switchY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(switchX + 30, switchY, 8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = isSwitchOn ? "#22c55e" : "#94a3b8";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(switchX - 30, switchY);
    if (isSwitchOn) {
      ctx.lineTo(switchX + 30, switchY);
    } else {
      ctx.lineTo(switchX + 10, switchY - 30);
    }
    ctx.stroke();

    ctx.fillStyle = "#475569";
    ctx.font = "12px Inter";
    ctx.fillText(isSwitchOn ? "ON" : "OFF", switchX, switchY + 30);

    const bulbX = 600;
    const bulbY = 150;
    
    if (isSwitchOn && bulbBrightness > 0) {
      const glowRadius = 40 + bulbBrightness * 30;
      const glowGradient = ctx.createRadialGradient(bulbX, bulbY, 0, bulbX, bulbY, glowRadius);
      glowGradient.addColorStop(0, `rgba(250, 204, 21, ${bulbBrightness * 0.8})`);
      glowGradient.addColorStop(0.5, `rgba(250, 204, 21, ${bulbBrightness * 0.4})`);
      glowGradient.addColorStop(1, "rgba(250, 204, 21, 0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, glowRadius, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bulbX, bulbY, 25, 0, 2 * Math.PI);
    ctx.stroke();

    const bulbGradient = ctx.createRadialGradient(bulbX - 5, bulbY - 5, 0, bulbX, bulbY, 25);
    if (isSwitchOn) {
      bulbGradient.addColorStop(0, `rgba(254, 249, 195, ${0.5 + bulbBrightness * 0.5})`);
      bulbGradient.addColorStop(1, `rgba(250, 204, 21, ${bulbBrightness})`);
    } else {
      bulbGradient.addColorStop(0, "#f1f5f9");
      bulbGradient.addColorStop(1, "#e2e8f0");
    }
    ctx.fillStyle = bulbGradient;
    ctx.beginPath();
    ctx.arc(bulbX, bulbY, 24, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bulbX - 8, bulbY + 5);
    ctx.quadraticCurveTo(bulbX, bulbY - 10, bulbX + 8, bulbY + 5);
    ctx.stroke();

    ctx.fillStyle = "#6b7280";
    ctx.fillRect(bulbX - 10, bulbY + 25, 20, 15);

    if (isSwitchOn) {
      const speedMultiplier = current / 50;
      electronsRef.current.forEach((electron) => {
        electron.pathProgress += electron.speed * speedMultiplier;
        if (electron.pathProgress >= 1) {
          electron.pathProgress = 0;
          electron.pathIndex = (electron.pathIndex + 1) % (circuitPath.length - 1);
        }

        const startPoint = circuitPath[electron.pathIndex];
        const endPoint = circuitPath[electron.pathIndex + 1];
        electron.x = startPoint.x + (endPoint.x - startPoint.x) * electron.pathProgress;
        electron.y = startPoint.y + (endPoint.y - startPoint.y) * electron.pathProgress;

        const electronGradient = ctx.createRadialGradient(
          electron.x,
          electron.y,
          0,
          electron.x,
          electron.y,
          6
        );
        electronGradient.addColorStop(0, "#3b82f6");
        electronGradient.addColorStop(0.5, "#60a5fa");
        electronGradient.addColorStop(1, "rgba(96, 165, 250, 0)");
        ctx.fillStyle = electronGradient;
        ctx.beginPath();
        ctx.arc(electron.x, electron.y, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "#1d4ed8";
        ctx.beginPath();
        ctx.arc(electron.x, electron.y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    ctx.fillStyle = "#374151";
    ctx.font = "12px Inter";
    ctx.textAlign = "left";
    ctx.fillText("Battery", 70, 270);
    ctx.fillText("Resistor", 265, 95);
    ctx.fillText("Switch", 420, 175);
    ctx.fillText("Bulb", 575, 210);
  }, [isSwitchOn, voltage, resistance, bulbBrightness, current]);

  useEffect(() => {
    initElectrons();
  }, [initElectrons]);

  useEffect(() => {
    const animate = () => {
      drawCircuit();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawCircuit]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full" data-testid="simulation-circuit-builder">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Simple Circuit Simulator
                <Badge variant="outline">Physics - Electricity</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Explore how current flows through a simple circuit
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
              className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800"
            >
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                How to use this simulation:
              </h4>
              <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                <li>• Toggle the switch to complete or break the circuit</li>
                <li>• Adjust voltage to see how it affects current</li>
                <li>• Change resistance to observe Ohm's Law in action</li>
                <li>• Watch the electrons (blue dots) flow when the circuit is complete</li>
                <li>• Notice how the bulb brightness changes with current</li>
              </ul>
            </motion.div>
          )}

          <canvas
            ref={canvasRef}
            width={700}
            height={400}
            className="w-full border rounded-lg shadow-inner"
            data-testid="canvas-circuit"
          />

          <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Switch
                id="circuit-switch"
                checked={isSwitchOn}
                onCheckedChange={setIsSwitchOn}
                data-testid="switch-circuit"
              />
              <Label htmlFor="circuit-switch" className="font-medium">
                Circuit Switch
              </Label>
            </div>
            <Badge variant={isSwitchOn ? "default" : "secondary"}>
              {isSwitchOn ? (
                <span className="flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" /> ON
                </span>
              ) : (
                "OFF"
              )}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                <span>Voltage (EMF)</span>
                <Badge variant="secondary">{voltage[0]} V</Badge>
              </label>
              <Slider
                value={voltage}
                onValueChange={setVoltage}
                min={1}
                max={24}
                step={1}
                data-testid="slider-voltage"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                <span>Resistance</span>
                <Badge variant="secondary">{resistance[0]} Ω</Badge>
              </label>
              <Slider
                value={resistance}
                onValueChange={setResistance}
                min={10}
                max={500}
                step={10}
                data-testid="slider-resistance"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 p-4 rounded-lg text-center border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-muted-foreground">Current</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="value-current">
                {current.toFixed(1)} mA
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/30 p-4 rounded-lg text-center border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-muted-foreground">Voltage</p>
              <p className="text-2xl font-bold text-yellow-600" data-testid="value-voltage">
                {voltage[0]} V
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 p-4 rounded-lg text-center border border-green-200 dark:border-green-800">
              <p className="text-sm text-muted-foreground">Power</p>
              <p className="text-2xl font-bold text-green-600" data-testid="value-power">
                {power.toFixed(2)} W
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Ohm's Law</h4>
            <div className="grid md:grid-cols-3 gap-4 text-center font-mono">
              <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                <p className="text-lg font-bold">V = I × R</p>
                <p className="text-xs text-muted-foreground">Voltage = Current × Resistance</p>
              </div>
              <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                <p className="text-lg font-bold">I = V / R</p>
                <p className="text-xs text-muted-foreground">Current = Voltage / Resistance</p>
              </div>
              <div className="bg-white/50 dark:bg-white/5 p-2 rounded">
                <p className="text-lg font-bold">P = V × I</p>
                <p className="text-xs text-muted-foreground">Power = Voltage × Current</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
