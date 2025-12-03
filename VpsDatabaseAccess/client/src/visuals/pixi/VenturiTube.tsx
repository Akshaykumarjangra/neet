
import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Droplets, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function VenturiTube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application>();
  const particlesRef = useRef<PIXI.Graphics[]>([]);
  const animationFrameRef = useRef<number>();
  
  const [flowRate, setFlowRate] = useState([5]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new PIXI.Application();
    appRef.current = app;

    app.init({
      width: containerRef.current.clientWidth,
      height: 400,
      background: 0xf0f0f0,
      antialias: true,
      preference: 'webgl',
    }).then(() => {
      if (containerRef.current) {
        containerRef.current.appendChild(app.canvas);
      }

      // Draw venturi tube
      const tube = new PIXI.Graphics();
      
      // Wide inlet section
      tube.fill(0x2563eb);
      tube.rect(50, 150, 150, 100);
      
      // Narrow throat section
      tube.rect(200, 175, 100, 50);
      
      // Wide outlet section
      tube.rect(300, 150, 150, 100);
      
      // Transition sections (tapered)
      const transition1 = new PIXI.Graphics();
      transition1.fill(0x2563eb);
      transition1.moveTo(200, 150);
      transition1.lineTo(200, 250);
      transition1.lineTo(200, 225);
      transition1.lineTo(200, 175);
      transition1.closePath();
      
      const transition2 = new PIXI.Graphics();
      transition2.fill(0x2563eb);
      transition2.moveTo(300, 175);
      transition2.lineTo(300, 225);
      transition2.lineTo(300, 250);
      transition2.lineTo(300, 150);
      transition2.closePath();

      app.stage.addChild(tube);
      app.stage.addChild(transition1);
      app.stage.addChild(transition2);

      // Draw pressure gauges
      const drawGauge = (x: number, y: number, label: string) => {
        const gauge = new PIXI.Graphics();
        gauge.fill(0xffffff);
        gauge.rect(x - 20, y - 60, 40, 60);
        gauge.stroke({ width: 2, color: 0x000000 });
        
        const text = new PIXI.Text({
          text: label,
          style: {
            fontSize: 12,
            fill: 0x000000,
          }
        });
        text.x = x - 10;
        text.y = y - 80;
        
        app.stage.addChild(gauge);
        app.stage.addChild(text);
        return gauge;
      };

      drawGauge(125, 150, "P₁");
      drawGauge(250, 175, "P₂");
      drawGauge(375, 150, "P₃");

      // Create particles
      const numParticles = 50;
      for (let i = 0; i < numParticles; i++) {
        const particle = new PIXI.Graphics();
        particle.circle(0, 0, 3);
        particle.fill(0xffffff);
        
        // Random starting position
        particle.x = 50 + Math.random() * 20;
        particle.y = 150 + Math.random() * 100;
        
        // Store velocity
        (particle as any).vx = 0;
        (particle as any).vy = 0;
        
        app.stage.addChild(particle);
        particlesRef.current.push(particle);
      }

      // Labels
      const createLabel = (text: string, x: number, y: number) => {
        const label = new PIXI.Text({
          text,
          style: {
            fontSize: 14,
            fill: 0x000000,
            fontWeight: "bold",
          }
        });
        label.x = x;
        label.y = y;
        app.stage.addChild(label);
      };

      createLabel("Wide Section", 80, 260);
      createLabel("Throat (Narrow)", 210, 235);
      createLabel("Wide Section", 330, 260);
      createLabel("High P, Low v", 70, 280);
      createLabel("Low P, High v", 205, 255);
      createLabel("High P, Low v", 320, 280);

      // Bernoulli equation
      const equation = new PIXI.Text({
        text: "P + ½ρv² + ρgh = constant",
        style: {
          fontSize: 16,
          fill: 0x000000,
          fontWeight: "bold",
        }
      });
      equation.x = 150;
      equation.y = 20;
      app.stage.addChild(equation);

      // Animation loop
      const animate = () => {
        if (!isAnimating) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }

        particlesRef.current.forEach((particle) => {
          const p = particle as any;
          
          // Determine section and apply velocity
          if (p.x < 200) {
            // Wide inlet: slow speed
            p.vx = flowRate[0] * 0.8;
            const colorSpeed = Math.min(255, 100 + flowRate[0] * 10);
            particle.clear();
            particle.circle(0, 0, 3);
            particle.fill((colorSpeed << 16) | (colorSpeed << 8) | 255);
          } else if (p.x < 300) {
            // Narrow throat: high speed
            p.vx = flowRate[0] * 2;
            const colorSpeed = Math.min(255, 150 + flowRate[0] * 15);
            particle.clear();
            particle.circle(0, 0, 3);
            particle.fill((255 << 16) | (colorSpeed << 8) | colorSpeed);
            
            // Center particles in throat
            if (p.y < 185) p.y += 0.5;
            if (p.y > 215) p.y -= 0.5;
          } else {
            // Wide outlet: slow speed
            p.vx = flowRate[0] * 0.8;
            const colorSpeed = Math.min(255, 100 + flowRate[0] * 10);
            particle.clear();
            particle.circle(0, 0, 3);
            particle.fill((colorSpeed << 16) | (colorSpeed << 8) | 255);
          }

          // Update position
          p.x += p.vx;
          p.y += p.vy;

          // Reset particles that exit
          if (p.x > 450) {
            p.x = 50 + Math.random() * 20;
            p.y = 150 + Math.random() * 100;
          }

          // Keep particles within tube bounds
          if (p.x < 200) {
            p.y = Math.max(150, Math.min(250, p.y));
          } else if (p.x < 300) {
            p.y = Math.max(175, Math.min(225, p.y));
          } else {
            p.y = Math.max(150, Math.min(250, p.y));
          }
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      app.destroy(true, { children: true });
    };
  }, [isAnimating, flowRate]);

  const handleReset = () => {
    setFlowRate([5]);
    setIsAnimating(false);
    setAnnouncement("Simulation reset");
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation started");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Venturi Tube - Bernoulli's Principle
          </span>
          <Badge variant="outline">Physics - Fluids</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize pressure-velocity relationship in fluid flow
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full border rounded-lg overflow-hidden" style={{ height: 400 }} />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Flow Rate: {flowRate[0]} units/s
            </label>
            <Slider
              value={flowRate}
              onValueChange={(val) => {
                setFlowRate(val);
                setAnnouncement(`Flow rate set to ${val[0]} units per second`);
              }}
              min={1}
              max={10}
              step={1}
            />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2">
          <p className="font-semibold">Bernoulli's Principle:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>💧 <strong>Wide section</strong>: High pressure, low velocity (blue particles)</li>
            <li>🔴 <strong>Narrow throat</strong>: Low pressure, high velocity (red particles)</li>
            <li>📊 Particle color indicates speed (blue = slow, red = fast)</li>
            <li>⚖️ Total energy (P + ½ρv² + ρgh) remains constant</li>
          </ul>
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
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Bernoulli's Equation:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Bernoulli: P + ½ρv² + ρgh = constant</li>
            <li>• A₁v₁ = A₂v₂ (continuity equation)</li>
            <li>• In narrow section: Area ↓, velocity ↑, pressure ↓</li>
            <li>• In wide section: Area ↑, velocity ↓, pressure ↑</li>
            <li>• Applications: Venturi meter, atomizers, airplane wings</li>
            <li>• Dynamic pressure: ½ρv²</li>
            <li>• Static pressure: P</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
