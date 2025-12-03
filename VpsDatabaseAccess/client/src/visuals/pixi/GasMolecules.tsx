
import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Thermometer } from "lucide-react";
import { usePrefersReducedMotion } from "@/visuals/hooks/usePrefersMotion";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

interface Molecule {
  sprite: PIXI.Graphics;
  vx: number;
  vy: number;
  mass: number;
}

export default function GasMolecules() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const moleculesRef = useRef<Molecule[]>([]);
  const [temperature, setTemperature] = useState([300]); // Kelvin
  const [numMolecules, setNumMolecules] = useState([100]);
  const [isRunning, setIsRunning] = useState(false);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [initError, setInitError] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const width = 800;
  const height = 600;
  const kB = 1.380649e-23; // Boltzmann constant
  const molecularMass = 4.65e-26; // kg (roughly nitrogen)

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    let mounted = true;
    let localApp: PIXI.Application | null = null;

    // Create PixiJS application (async in v8)
    (async () => {
      const app = new PIXI.Application();
      localApp = app;
      
      try {
        await app.init({
          width,
          height,
          background: 0x0a0a0a,
          antialias: true,
          preference: 'webgl',
        });

        if (!mounted || !containerRef.current) {
          app.destroy(true, { children: true });
          return;
        }

        containerRef.current.appendChild(app.canvas);
        appRef.current = app;

        // Create container walls
        const walls = new PIXI.Graphics();
        walls.lineStyle(3, 0x3b82f6, 1);
        walls.drawRect(10, 10, width - 20, height - 20);
        app.stage.addChild(walls);

        // Initialize molecules after app is ready
        initializeMolecules();
      } catch (error) {
        console.error('Failed to initialize PixiJS:', error);
        setInitError('WebGL is not available in this environment. Please try opening this page in a standard browser with WebGL support.');
        if (localApp) {
          localApp.destroy(true, { children: true });
        }
      }
    })();

    return () => {
      mounted = false;
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      } else if (localApp) {
        localApp.destroy(true, { children: true });
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isRunning || !appRef.current || prefersReducedMotion) return;

    const app = appRef.current;
    let animationId: number;

    const animate = () => {
      const molecules = moleculesRef.current;
      
      // Update positions
      molecules.forEach((mol) => {
        mol.sprite.x += mol.vx;
        mol.sprite.y += mol.vy;

        // Wall collisions with elastic bounce
        if (mol.sprite.x <= 15 || mol.sprite.x >= width - 15) {
          mol.vx *= -1;
          mol.sprite.x = Math.max(15, Math.min(width - 15, mol.sprite.x));
        }
        if (mol.sprite.y <= 15 || mol.sprite.y >= height - 15) {
          mol.vy *= -1;
          mol.sprite.y = Math.max(15, Math.min(height - 15, mol.sprite.y));
        }
      });

      // Check molecule-molecule collisions
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const mol1 = molecules[i];
          const mol2 = molecules[j];
          
          const dx = mol2.sprite.x - mol1.sprite.x;
          const dy = mol2.sprite.y - mol1.sprite.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 10) { // Collision radius
            // Elastic collision
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate velocities
            const vx1 = mol1.vx * cos + mol1.vy * sin;
            const vy1 = mol1.vy * cos - mol1.vx * sin;
            const vx2 = mol2.vx * cos + mol2.vy * sin;
            const vy2 = mol2.vy * cos - mol2.vx * sin;

            // Exchange velocities (simplified elastic collision)
            const temp = vx1;
            mol1.vx = vx2 * cos - vy1 * sin;
            mol1.vy = vy1 * cos + vx2 * sin;
            mol2.vx = temp * cos - vy2 * sin;
            mol2.vy = vy2 * cos + temp * sin;

            // Separate molecules
            const overlap = 10 - distance;
            mol1.sprite.x -= overlap * cos / 2;
            mol1.sprite.y -= overlap * sin / 2;
            mol2.sprite.x += overlap * cos / 2;
            mol2.sprite.y += overlap * sin / 2;
          }
        }
      }

      // Calculate average speed
      const totalSpeed = molecules.reduce((sum, mol) => {
        return sum + Math.sqrt(mol.vx * mol.vx + mol.vy * mol.vy);
      }, 0);
      setAvgSpeed(totalSpeed / molecules.length);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isRunning, prefersReducedMotion]);

  const initializeMolecules = () => {
    if (!appRef.current) return;

    const app = appRef.current;
    
    // Clear existing molecules
    moleculesRef.current.forEach(mol => app.stage.removeChild(mol.sprite));
    moleculesRef.current = [];

    // Calculate velocity from temperature
    // v_rms = sqrt(3kT/m)
    const speedScale = Math.sqrt((3 * kB * temperature[0]) / molecularMass) / 1000;

    for (let i = 0; i < numMolecules[0]; i++) {
      const molecule = new PIXI.Graphics();
      molecule.beginFill(0x10b981);
      molecule.drawCircle(0, 0, 4);
      molecule.endFill();

      molecule.x = 20 + Math.random() * (width - 40);
      molecule.y = 20 + Math.random() * (height - 40);

      // Random velocity based on temperature
      const angle = Math.random() * Math.PI * 2;
      const speed = speedScale * (0.5 + Math.random());
      
      app.stage.addChild(molecule);

      moleculesRef.current.push({
        sprite: molecule,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        mass: molecularMass,
      });
    }

    setAnnouncement(`Initialized ${numMolecules[0]} molecules at ${temperature[0]}K`);
  };

  const updateTemperature = (newTemp: number[]) => {
    setTemperature(newTemp);
    
    // Rescale velocities based on new temperature
    const speedRatio = Math.sqrt(newTemp[0] / temperature[0]);
    moleculesRef.current.forEach(mol => {
      mol.vx *= speedRatio;
      mol.vy *= speedRatio;
    });

    setAnnouncement(`Temperature set to ${newTemp[0]}K`);
  };

  const updateMoleculeCount = (newCount: number[]) => {
    setNumMolecules(newCount);
    initializeMolecules();
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
    setAnnouncement(isRunning ? "Simulation paused" : "Simulation started");
  };

  const reset = () => {
    setIsRunning(false);
    initializeMolecules();
    setAnnouncement("Simulation reset");
  };

  // Calculate theoretical v_rms
  const theoreticalVrms = Math.sqrt((3 * kB * temperature[0]) / molecularMass);
  const pressure = (numMolecules[0] * kB * temperature[0]) / ((width - 20) * (height - 20) * 1e-6);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Kinetic Theory - Gas Molecules
          </span>
          <Badge variant="outline">Physics - Kinetic Theory</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Watch how temperature affects molecular motion (v<sub>rms</sub> ∝ √T)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {initError ? (
          <div className="w-full border rounded-lg p-8 text-center bg-muted" style={{ maxWidth: width, height: height, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="space-y-2">
              <p className="text-sm text-destructive font-semibold">Visualization Unavailable</p>
              <p className="text-xs text-muted-foreground">{initError}</p>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full border rounded-lg overflow-hidden"
            style={{ maxWidth: width, height: height, margin: "0 auto" }}
          />
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Temperature: {temperature[0]} K
            </label>
            <Slider
              value={temperature}
              onValueChange={updateTemperature}
              min={100}
              max={600}
              step={50}
              disabled={isRunning}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Number of Molecules: {numMolecules[0]}
            </label>
            <Slider
              value={numMolecules}
              onValueChange={updateMoleculeCount}
              min={50}
              max={200}
              step={10}
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
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 bg-muted p-4 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Average Speed</p>
            <p className="text-2xl font-bold text-primary">
              {avgSpeed.toFixed(1)} px/frame
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">v<sub>rms</sub> (theoretical)</p>
            <p className="text-2xl font-bold text-green-600">
              {(theoreticalVrms / 1000).toFixed(0)} m/s
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pressure (approx)</p>
            <p className="text-2xl font-bold text-orange-600">
              {(pressure / 1000).toFixed(1)} kPa
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Kinetic Theory: Gas molecules in constant random motion</li>
            <li>• Temperature ∝ Average kinetic energy of molecules</li>
            <li>• v<sub>rms</sub> = √(3kT/m) where k = Boltzmann constant</li>
            <li>• Pressure due to molecular collisions with walls</li>
            <li>• PV = nRT (Ideal Gas Law)</li>
            <li>• At higher temperature, molecules move faster</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Important Formulas:</h4>
          <div className="grid gap-2 text-sm font-mono bg-muted p-3 rounded">
            <p>v<sub>rms</sub> = √(3RT/M) = √(3kT/m)</p>
            <p>KE<sub>avg</sub> = (3/2)kT</p>
            <p>PV = (1/3)Nmv<sub>rms</sub>²</p>
            <p>P = (1/3)ρv<sub>rms</sub>²</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
