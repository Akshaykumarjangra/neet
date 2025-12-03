
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Play, Pause, Box } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function BlockOnRamp() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const blockRef = useRef<Matter.Body | null>(null);
  
  const [angle, setAngle] = useState([30]); // degrees
  const [friction, setFriction] = useState([0.3]); // coefficient of friction μ
  const [mass, setMass] = useState([5]); // kg
  const [isRunning, setIsRunning] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  
  const g = 9.8; // m/s²

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }
    });
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 500,
        wireframes: false,
        background: '#f8fafc'
      }
    });
    renderRef.current = render;

    setupScene();

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      setupScene();
    }
  }, [angle, friction, mass]);

  const setupScene = () => {
    if (!engineRef.current) return;

    // Clear existing bodies
    Matter.Composite.clear(engineRef.current.world, false);

    const theta = (angle[0] * Math.PI) / 180;
    const mu = friction[0];

    // Ground (base)
    const ground = Matter.Bodies.rectangle(400, 480, 810, 40, {
      isStatic: true,
      render: { fillStyle: '#64748b' }
    });

    // Ramp
    const rampWidth = 600;
    const rampHeight = 20;
    const rampX = 400;
    const rampY = 400;

    const ramp = Matter.Bodies.rectangle(rampX, rampY, rampWidth, rampHeight, {
      isStatic: true,
      angle: -theta,
      render: { fillStyle: '#94a3b8' },
      friction: mu,
      frictionStatic: mu
    });

    // Block
    const blockSize = 40;
    const blockX = rampX - rampWidth / 2 + 100;
    const blockY = rampY - 100;

    const block = Matter.Bodies.rectangle(blockX, blockY, blockSize, blockSize, {
      mass: mass[0],
      friction: mu,
      frictionStatic: mu,
      frictionAir: 0.001,
      render: { 
        fillStyle: '#3b82f6',
        strokeStyle: '#1e40af',
        lineWidth: 2
      }
    });
    blockRef.current = block;

    // Add all bodies to world
    Matter.Composite.add(engineRef.current.world, [ground, ramp, block]);

    // Stop the block initially
    Matter.Body.setVelocity(block, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(block, 0);
  };

  const toggleSimulation = () => {
    if (!blockRef.current || !engineRef.current) return;

    if (isRunning) {
      // Pause - freeze the block
      Matter.Body.setVelocity(blockRef.current, { x: 0, y: 0 });
      Matter.Body.setStatic(blockRef.current, true);
      setIsRunning(false);
      setAnnouncement("Simulation paused");
    } else {
      // Start - unfreeze the block
      Matter.Body.setStatic(blockRef.current, false);
      setIsRunning(true);
      setAnnouncement("Simulation started");
    }
  };

  const resetSimulation = () => {
    setupScene();
    setIsRunning(false);
    setAnnouncement("Simulation reset");
  };

  // Calculate forces
  const theta = (angle[0] * Math.PI) / 180;
  const mu = friction[0];
  const m = mass[0];
  
  const normalForce = m * g * Math.cos(theta);
  const frictionForce = mu * normalForce;
  const componentParallel = m * g * Math.sin(theta);
  const netForce = componentParallel - frictionForce;
  const acceleration = netForce / m;
  
  const willSlide = componentParallel > frictionForce;
  const criticalAngle = Math.atan(mu) * (180 / Math.PI);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Box className="h-5 w-5" />
            Block on Ramp - Friction Simulator
          </span>
          <Badge variant="outline">Physics - Laws of Motion</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust angle and friction coefficient to see if the block slides
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={sceneRef} className="w-full border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Ramp Angle (θ): {angle[0]}°
            </label>
            <Slider
              value={angle}
              onValueChange={(val) => {
                setAngle(val);
                setIsRunning(false);
                setAnnouncement(`Angle set to ${val[0]} degrees`);
              }}
              min={0}
              max={60}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Coefficient of Friction (μ): {friction[0].toFixed(2)}
            </label>
            <Slider
              value={friction}
              onValueChange={(val) => {
                setFriction(val);
                setIsRunning(false);
                setAnnouncement(`Friction coefficient set to ${val[0].toFixed(2)}`);
              }}
              min={0}
              max={1}
              step={0.05}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Block Mass: {mass[0]} kg
            </label>
            <Slider
              value={mass}
              onValueChange={(val) => {
                setMass(val);
                setIsRunning(false);
                setAnnouncement(`Mass set to ${val[0]} kg`);
              }}
              min={1}
              max={20}
              step={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-blue-600">Normal Force</p>
            <p className="font-mono text-xl">{normalForce.toFixed(2)} N</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">Friction Force</p>
            <p className="font-mono text-xl">{frictionForce.toFixed(2)} N</p>
          </div>
          <div>
            <p className="font-semibold text-purple-600">Parallel Component</p>
            <p className="font-mono text-xl">{componentParallel.toFixed(2)} N</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">Net Force</p>
            <p className="font-mono text-xl">{netForce.toFixed(2)} N</p>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${willSlide ? 'bg-red-50 dark:bg-red-950/20' : 'bg-green-50 dark:bg-green-950/20'}`}>
          <p className="font-semibold mb-2">
            {willSlide ? '🔴 Block Will Slide' : '🟢 Block Will Not Slide'}
          </p>
          <p className="text-sm">
            {willSlide 
              ? `Component down ramp (${componentParallel.toFixed(2)} N) > Friction force (${frictionForce.toFixed(2)} N)`
              : `Friction force (${frictionForce.toFixed(2)} N) ≥ Component down ramp (${componentParallel.toFixed(2)} N)`
            }
          </p>
          <p className="text-sm mt-2">
            Acceleration: {acceleration.toFixed(2)} m/s²
          </p>
          <p className="text-sm mt-2">
            Critical angle for sliding: {criticalAngle.toFixed(1)}° (when θ = tan⁻¹(μ))
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={toggleSimulation} className="flex-1">
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

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Friction on Incline:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Normal force: N = mg cos θ</li>
            <li>• Friction force: f = μN = μmg cos θ</li>
            <li>• Component parallel to ramp: F∥ = mg sin θ</li>
            <li>• For equilibrium: mg sin θ ≤ μmg cos θ</li>
            <li>• Critical angle: θ_c = tan⁻¹(μ)</li>
            <li>• Net force: F_net = mg sin θ - μmg cos θ</li>
            <li>• Acceleration: a = g(sin θ - μ cos θ)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
