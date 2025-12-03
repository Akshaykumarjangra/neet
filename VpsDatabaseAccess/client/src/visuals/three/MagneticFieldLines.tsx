
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Magnet, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function MagneticFieldLines() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [magnetStrength, setMagnetStrength] = useState([5]);
  const [fieldLineCount, setFieldLineCount] = useState([12]);
  const [magnetType, setMagnetType] = useState<"bar" | "solenoid">("bar");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(0, 15, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.4);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    if (magnetType === "bar") {
      // Create bar magnet
      const magnetLength = 8;
      const magnetWidth = 2;
      const magnetHeight = 2;

      // North pole (red)
      const northGeometry = new THREE.BoxGeometry(
        magnetLength / 2,
        magnetHeight,
        magnetWidth
      );
      const northMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xef4444,
        metalness: 0.5,
        roughness: 0.3,
      });
      const northPole = new THREE.Mesh(northGeometry, northMaterial);
      northPole.position.x = magnetLength / 4;
      scene.add(northPole);

      // South pole (blue)
      const southGeometry = new THREE.BoxGeometry(
        magnetLength / 2,
        magnetHeight,
        magnetWidth
      );
      const southMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x3b82f6,
        metalness: 0.5,
        roughness: 0.3,
      });
      const southPole = new THREE.Mesh(southGeometry, southMaterial);
      southPole.position.x = -magnetLength / 4;
      scene.add(southPole);

      // Labels
      const createTextSprite = (text: string, color: string = "#ffffff") => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = 128;
        canvas.height = 128;
        context.fillStyle = color;
        context.font = "bold 72px Arial";
        context.textAlign = "center";
        context.fillText(text, 64, 80);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(1.5, 1.5, 1);
        return sprite;
      };

      const nLabel = createTextSprite("N", "#ffffff");
      nLabel.position.set(magnetLength / 4, 0, 0);
      scene.add(nLabel);

      const sLabel = createTextSprite("S", "#ffffff");
      sLabel.position.set(-magnetLength / 4, 0, 0);
      scene.add(sLabel);

      // Draw magnetic field lines for bar magnet
      const drawFieldLine = (startAngle: number, loops: number) => {
        const points: THREE.Vector3[] = [];
        const steps = 100;
        const poleDistance = magnetLength / 2;

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          
          // Parametric curve from N to S pole
          const angle = startAngle + Math.PI * t;
          const r = poleDistance * (1 + 0.8 * Math.sin(angle)) * (1 + loops * t);
          
          const x = poleDistance * Math.cos(Math.PI * t);
          const y = r * Math.sin(startAngle);
          const z = r * Math.cos(startAngle);

          points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.7,
        });
        const line = new THREE.Line(geometry, material);
        scene.add(line);

        // Add arrow at midpoint
        const midIndex = Math.floor(steps / 2);
        const arrowPos = points[midIndex];
        const arrowDir = new THREE.Vector3()
          .subVectors(points[midIndex + 1], points[midIndex])
          .normalize();
        
        const arrow = new THREE.ArrowHelper(
          arrowDir,
          arrowPos,
          1,
          0x10b981,
          0.3,
          0.2
        );
        scene.add(arrow);
      };

      // Draw multiple field lines
      for (let i = 0; i < fieldLineCount[0]; i++) {
        const angle = (i * 2 * Math.PI) / fieldLineCount[0];
        drawFieldLine(angle, 0.3);
      }

    } else {
      // Create solenoid
      const coilRadius = 2;
      const coilLength = 10;
      const turns = 8;

      // Solenoid coils
      for (let i = 0; i < turns; i++) {
        const torusGeometry = new THREE.TorusGeometry(coilRadius, 0.2, 16, 32);
        const torusMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xf59e0b,
          metalness: 0.7,
          roughness: 0.2,
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.rotation.y = Math.PI / 2;
        torus.position.x = -coilLength / 2 + (i * coilLength) / (turns - 1);
        scene.add(torus);
      }

      // Field lines inside solenoid (uniform)
      for (let i = 0; i < 5; i++) {
        const y = -coilRadius + (i * 2 * coilRadius) / 4;
        for (let j = 0; j < 3; j++) {
          const z = -coilRadius + (j * 2 * coilRadius) / 2;
          
          const points = [
            new THREE.Vector3(-coilLength / 2 - 2, y, z),
            new THREE.Vector3(coilLength / 2 + 2, y, z),
          ];

          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: 0x10b981,
            transparent: true,
            opacity: 0.7,
          });
          const line = new THREE.Line(geometry, material);
          scene.add(line);

          // Arrow
          const arrow = new THREE.ArrowHelper(
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, y, z),
            1,
            0x10b981,
            0.3,
            0.2
          );
          scene.add(arrow);
        }
      }

      // External field lines (curved)
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        const points: THREE.Vector3[] = [];
        
        for (let t = 0; t <= 1; t += 0.05) {
          const x = coilLength / 2 + 2 - t * (coilLength + 4);
          const r = coilRadius + 3 * t;
          const y = r * Math.sin(angle);
          const z = r * Math.cos(angle);
          points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.5,
        });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      }
    }

    // Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x222222);
    gridHelper.position.y = -8;
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [magnetStrength, fieldLineCount, magnetType]);

  const reset = () => {
    setMagnetStrength([5]);
    setFieldLineCount([12]);
    setMagnetType("bar");
    setAnnouncement("Reset to default values");
  };

  const switchToBar = () => {
    setMagnetType("bar");
    setAnnouncement("Switched to bar magnet");
  };

  const switchToSolenoid = () => {
    setMagnetType("solenoid");
    setAnnouncement("Switched to solenoid");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Magnet className="h-5 w-5 text-red-500" />
            Magnetic Field Lines - 3D Visualization
          </span>
          <Badge variant="outline">Physics - Magnetism</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive 3D visualization of magnetic field patterns
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={containerRef}
          className="w-full h-[400px] border rounded-lg bg-slate-900"
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Magnet Strength: {magnetStrength[0]}
            </label>
            <Slider
              value={magnetStrength}
              onValueChange={(val) => {
                setMagnetStrength(val);
                setAnnouncement(`Magnet strength: ${val[0]}`);
              }}
              min={1}
              max={10}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Field Lines: {fieldLineCount[0]}
            </label>
            <Slider
              value={fieldLineCount}
              onValueChange={(val) => {
                setFieldLineCount(val);
                setAnnouncement(`Field lines: ${val[0]}`);
              }}
              min={6}
              max={20}
              step={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={switchToBar}
            variant={magnetType === "bar" ? "default" : "outline"}
            className="flex-1"
          >
            Bar Magnet
          </Button>
          <Button
            onClick={switchToSolenoid}
            variant={magnetType === "solenoid" ? "default" : "outline"}
            className="flex-1"
          >
            Solenoid
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Magnetic Fields:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Field lines: N → S (outside magnet)</li>
            <li>• Field lines: S → N (inside magnet)</li>
            <li>• Lines never intersect</li>
            <li>• Density ∝ field strength</li>
            <li>• Bar magnet: dipole field</li>
            <li>• Solenoid: uniform field inside</li>
            <li>• B = μ₀nI (solenoid)</li>
            <li>• Magnetic monopoles don't exist</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded space-y-1 text-sm">
            <p className="font-semibold">Bar Magnet Properties:</p>
            <p className="text-muted-foreground">• Two poles: N and S</p>
            <p className="text-muted-foreground">• Cannot be separated</p>
            <p className="text-muted-foreground">• Like poles repel</p>
            <p className="text-muted-foreground">• Unlike poles attract</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded space-y-1 text-sm">
            <p className="font-semibold">Solenoid Properties:</p>
            <p className="text-muted-foreground">• Uniform field inside</p>
            <p className="text-muted-foreground">• Acts like bar magnet</p>
            <p className="text-muted-foreground">• B ∝ current (I)</p>
            <p className="text-muted-foreground">• B ∝ turns per length (n)</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
