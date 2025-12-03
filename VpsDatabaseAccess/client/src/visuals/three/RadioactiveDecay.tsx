
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { RadioTower, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function RadioactiveDecay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [halfLife, setHalfLife] = useState([5]); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [remainingNuclei, setRemainingNuclei] = useState(100);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const N0 = 100;
  const lambda = Math.LN2 / halfLife[0];
  const theoreticalN = N0 * Math.exp(-lambda * currentTime);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.appendChild(renderer.domElement);

    // Create nuclei grid
    const nuclei: THREE.Mesh[] = [];
    const spacing = 2.5;
    const gridSize = 10;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const geometry = new THREE.SphereGeometry(0.4, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const nucleus = new THREE.Mesh(geometry, material);
        nucleus.position.set(
          (i - gridSize / 2) * spacing,
          (j - gridSize / 2) * spacing,
          0
        );
        nucleus.userData.active = true;
        scene.add(nucleus);
        nuclei.push(nucleus);
      }
    }

    // Decay particles
    const particles: THREE.Mesh[] = [];

    const animate = () => {
      if (isRunning) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setCurrentTime(elapsed);

        // Calculate how many should remain
        const shouldRemain = Math.round(N0 * Math.exp(-lambda * elapsed));
        
        // Decay nuclei if needed
        const activeNuclei = nuclei.filter(n => n.userData.active);
        if (activeNuclei.length > shouldRemain) {
          const toDecay = activeNuclei.length - shouldRemain;
          for (let i = 0; i < toDecay; i++) {
            const randomIndex = Math.floor(Math.random() * activeNuclei.length);
            const nucleus = activeNuclei[randomIndex];
            if (nucleus.userData.active) {
              nucleus.userData.active = false;
              (nucleus.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);

              // Create decay particle
              const particleGeom = new THREE.SphereGeometry(0.15, 8, 8);
              const particleMat = new THREE.MeshBasicMaterial({ 
                color: 0xffff00,
                transparent: true,
                opacity: 1
              });
              const particle = new THREE.Mesh(particleGeom, particleMat);
              particle.position.copy(nucleus.position);
              particle.userData.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                (Math.random() - 0.5) * 0.2,
                0
              );
              scene.add(particle);
              particles.push(particle);
            }
          }
        }

        setRemainingNuclei(activeNuclei.filter(n => n.userData.active).length);

        // Update particles
        particles.forEach((particle, index) => {
          particle.position.add(particle.userData.velocity);
          (particle.material as THREE.MeshBasicMaterial).opacity -= 0.01;
          if ((particle.material as THREE.MeshBasicMaterial).opacity <= 0) {
            scene.remove(particle);
            particles.splice(index, 1);
          }
        });
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, 400);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [isRunning, halfLife, lambda, N0, currentTime]);

  const toggleSimulation = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - currentTime * 1000;
      setAnnouncement("Decay simulation started");
    } else {
      setAnnouncement("Decay simulation paused");
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setRemainingNuclei(100);
    setHalfLife([5]);
    setAnnouncement("Simulation reset");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <RadioTower className="h-5 w-5" />
            Radioactive Decay Simulation
          </span>
          <Badge variant="outline">Physics - Nuclei</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize exponential decay of radioactive nuclei
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-[400px] border rounded-lg overflow-hidden" />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Half-life: {halfLife[0]} seconds
          </label>
          <Slider
            value={halfLife}
            onValueChange={(val) => {
              setHalfLife(val);
              setAnnouncement(`Half-life set to ${val[0]} seconds`);
            }}
            min={2}
            max={10}
            step={0.5}
            disabled={isRunning}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-green-600">Remaining</p>
            <p className="font-mono text-2xl">{remainingNuclei}</p>
          </div>
          <div>
            <p className="font-semibold text-blue-600">Time Elapsed</p>
            <p className="font-mono text-2xl">{currentTime.toFixed(1)}s</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">Half-lives</p>
            <p className="font-mono text-2xl">{(currentTime / halfLife[0]).toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">Theoretical: {theoreticalN.toFixed(1)} nuclei</p>
          <p className="text-muted-foreground font-mono">
            N(t) = N₀ × e^(-λt) = {N0} × e^(-{lambda.toFixed(3)} × {currentTime.toFixed(1)})
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
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Radioactive Decay:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• N(t) = N₀e^(-λt)</li>
            <li>• Half-life: T₁/₂ = ln(2)/λ = 0.693/λ</li>
            <li>• Mean life: τ = 1/λ</li>
            <li>• Activity: A = λN</li>
            <li>• A(t) = A₀e^(-λt)</li>
            <li>• After n half-lives: N = N₀/(2^n)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
