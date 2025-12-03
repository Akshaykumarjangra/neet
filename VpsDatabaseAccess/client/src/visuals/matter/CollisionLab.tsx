
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Zap, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function CollisionLab() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [mass1, setMass1] = useState([1]);
  const [mass2, setMass2] = useState([1]);
  const [velocity1, setVelocity1] = useState([5]);
  const [isElastic, setIsElastic] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;

    const engine = Engine.create();
    engineRef.current = engine;
    engine.gravity.y = 0;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 400,
        wireframes: false,
        background: '#f0f4f8'
      }
    });

    const ball1 = Bodies.circle(200, 200, 20 * Math.sqrt(mass1[0]), {
      restitution: isElastic ? 1 : 0.2,
      friction: 0,
      frictionAir: 0,
      render: { 
        fillStyle: '#3b82f6',
        strokeStyle: '#1e40af',
        lineWidth: 2
      }
    });

    const ball2 = Bodies.circle(500, 200, 20 * Math.sqrt(mass2[0]), {
      restitution: isElastic ? 1 : 0.2,
      friction: 0,
      frictionAir: 0,
      render: { 
        fillStyle: '#ef4444',
        strokeStyle: '#b91c1c',
        lineWidth: 2
      },
      isStatic: false
    });

    Matter.Body.setVelocity(ball1, { x: velocity1[0], y: 0 });

    const wallTop = Bodies.rectangle(400, 0, 800, 20, { isStatic: true });
    const wallBottom = Bodies.rectangle(400, 400, 800, 20, { isStatic: true });
    const wallLeft = Bodies.rectangle(0, 200, 20, 400, { isStatic: true });
    const wallRight = Bodies.rectangle(800, 200, 20, 400, { isStatic: true });

    World.add(engine.world, [ball1, ball2, wallTop, wallBottom, wallLeft, wallRight]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [mass1, mass2, velocity1, isElastic]);

  const reset = () => {
    setMass1([1]);
    setMass2([1]);
    setVelocity1([5]);
    setAnnouncement("Reset collision lab");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Collision Lab
          </span>
          <Badge variant="outline">Physics - Laws of Motion</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Elastic and inelastic collision simulation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={sceneRef} className="w-full border rounded-lg overflow-hidden" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Mass 1 (Blue): {mass1[0]} kg
            </label>
            <Slider
              value={mass1}
              onValueChange={(val) => {
                setMass1(val);
                setAnnouncement(`Mass 1: ${val[0]} kg`);
              }}
              min={0.5}
              max={3}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Mass 2 (Red): {mass2[0]} kg
            </label>
            <Slider
              value={mass2}
              onValueChange={(val) => {
                setMass2(val);
                setAnnouncement(`Mass 2: ${val[0]} kg`);
              }}
              min={0.5}
              max={3}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Velocity 1: {velocity1[0]} m/s
            </label>
            <Slider
              value={velocity1}
              onValueChange={(val) => {
                setVelocity1(val);
                setAnnouncement(`Velocity: ${val[0]} m/s`);
              }}
              min={1}
              max={10}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Collision Type</label>
            <Button
              variant={isElastic ? "default" : "outline"}
              onClick={() => {
                setIsElastic(!isElastic);
                setAnnouncement(isElastic ? "Inelastic collision" : "Elastic collision");
              }}
              className="w-full"
            >
              {isElastic ? "Elastic" : "Inelastic"}
            </Button>
          </div>
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Collisions:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Elastic: KE and momentum conserved</li>
            <li>• Inelastic: Only momentum conserved</li>
            <li>• Perfectly inelastic: objects stick together</li>
            <li>• e = (v₂ - v₁)/(u₁ - u₂) (coefficient of restitution)</li>
            <li>• e = 1 (elastic), 0 &lt; e &lt; 1 (inelastic), e = 0 (perfectly inelastic)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
