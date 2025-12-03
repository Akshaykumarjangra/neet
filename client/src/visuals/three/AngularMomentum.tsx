
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Play, Pause, Disc3 } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function AngularMomentum() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angularVelocity, setAngularVelocity] = useState([5]);
  const [mass, setMass] = useState([2]);
  const [radius, setRadius] = useState([3]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);

  // Calculate moment of inertia and angular momentum
  const I = mass[0] * radius[0] * radius[0]; // I = mr²
  const L = I * angularVelocity[0]; // L = Iω
  const rotationalKE = 0.5 * I * angularVelocity[0] * angularVelocity[0]; // KE = ½Iω²

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
    camera.position.set(10, 10, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create rotating disc/platform
    const discGeometry = new THREE.CylinderGeometry(radius[0], radius[0], 0.3, 32);
    const discMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      metalness: 0.3,
      roughness: 0.4,
    });
    const disc = new THREE.Mesh(discGeometry, discMaterial);
    scene.add(disc);

    // Add radial lines on disc for rotation visibility
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0.16, 0),
        new THREE.Vector3(
          radius[0] * Math.cos(angle),
          0.16,
          radius[0] * Math.sin(angle)
        ),
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      disc.add(line);
    }

    // Point mass at the edge
    const massGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const massMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xef4444,
      metalness: 0.5,
      roughness: 0.2,
    });
    const pointMass = new THREE.Mesh(massGeometry, massMaterial);
    pointMass.position.set(radius[0], 0, 0);
    disc.add(pointMass);

    // Rotation axis
    const axisGeometry = new THREE.CylinderGeometry(0.1, 0.1, 10, 16);
    const axisMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x64748b,
      metalness: 0.7,
      roughness: 0.3,
    });
    const axis = new THREE.Mesh(axisGeometry, axisMaterial);
    axis.position.y = 0;
    scene.add(axis);

    // Angular momentum vector
    const arrowLength = L / 5;
    const arrowDir = new THREE.Vector3(0, 1, 0);
    const arrowOrigin = new THREE.Vector3(0, 0, 0);
    const arrowColor = 0x10b981;
    const angularMomentumArrow = new THREE.ArrowHelper(
      arrowDir,
      arrowOrigin,
      arrowLength,
      arrowColor,
      0.5,
      0.3
    );
    scene.add(angularMomentumArrow);

    // Velocity vector at point mass
    const velocityArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(radius[0], 0, 0),
      2,
      0xfbbf24,
      0.3,
      0.2
    );
    disc.add(velocityArrow);

    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    // Labels
    const createTextSprite = (text: string, color: string = "#ffffff") => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.width = 256;
      canvas.height = 128;
      context.fillStyle = color;
      context.font = "bold 48px Arial";
      context.textAlign = "center";
      context.fillText(text, 128, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2, 1, 1);
      return sprite;
    };

    const lLabel = createTextSprite("L", "#10b981");
    lLabel.position.set(0, arrowLength + 1, 0);
    scene.add(lLabel);

    const vLabel = createTextSprite("v", "#fbbf24");
    vLabel.position.set(radius[0], 0.5, -2.5);
    disc.add(vLabel);

    // Animation
    let angle = 0;
    const animate = () => {
      if (isAnimating) {
        angle += angularVelocity[0] * 0.01;
        disc.rotation.y = angle;

        // Update velocity vector direction
        const velocityDir = new THREE.Vector3(
          -Math.sin(angle),
          0,
          -Math.cos(angle)
        );
        velocityArrow.setDirection(velocityDir);
      }

      controls.update();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [angularVelocity, mass, radius, isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  const reset = () => {
    setAngularVelocity([5]);
    setMass([2]);
    setRadius([3]);
    setIsAnimating(true);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Disc3 className="h-5 w-5 text-blue-500" />
            Angular Momentum - 3D Visualization
          </span>
          <Badge variant="outline">Physics - Rotational Motion</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive 3D model showing angular momentum and rotation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={containerRef}
          className="w-full h-[400px] border rounded-lg bg-slate-900"
        />

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Angular Velocity (ω): {angularVelocity[0]} rad/s
            </label>
            <Slider
              value={angularVelocity}
              onValueChange={(val) => {
                setAngularVelocity(val);
                setAnnouncement(`Angular velocity: ${val[0]} rad/s`);
              }}
              min={1}
              max={10}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Mass (m): {mass[0]} kg
            </label>
            <Slider
              value={mass}
              onValueChange={(val) => {
                setMass(val);
                setAnnouncement(`Mass: ${val[0]} kg`);
              }}
              min={1}
              max={5}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Radius (r): {radius[0]} m
            </label>
            <Slider
              value={radius}
              onValueChange={(val) => {
                setRadius(val);
                setAnnouncement(`Radius: ${val[0]} m`);
              }}
              min={1}
              max={5}
              step={0.5}
            />
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Moment of Inertia (I)</p>
            <p className="text-2xl font-bold text-blue-600">
              {I.toFixed(2)} kg·m²
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Angular Momentum (L)</p>
            <p className="text-2xl font-bold text-green-600">
              {L.toFixed(2)} kg·m²/s
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rotational KE</p>
            <p className="text-2xl font-bold text-amber-600">
              {rotationalKE.toFixed(2)} J
            </p>
          </div>
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
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Angular Momentum:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• L = Iω (Angular momentum)</li>
            <li>• I = mr² (Point mass)</li>
            <li>• I = ½MR² (Disc about center)</li>
            <li>• I = ⅖MR² (Solid sphere)</li>
            <li>• τ = dL/dt (Torque)</li>
            <li>• KE = ½Iω² (Rotational kinetic energy)</li>
            <li>• v = rω (Linear velocity)</li>
            <li>• Conservation: L₁ = L₂ (no external torque)</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded space-y-1 text-sm">
            <p className="font-semibold">Direction of L:</p>
            <p className="text-muted-foreground">• Right-hand rule</p>
            <p className="text-muted-foreground">• Fingers: rotation direction</p>
            <p className="text-muted-foreground">• Thumb: L direction</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded space-y-1 text-sm">
            <p className="font-semibold">Conservation Example:</p>
            <p className="text-muted-foreground">• Ice skater spinning</p>
            <p className="text-muted-foreground">• Arms in → I↓, ω↑</p>
            <p className="text-muted-foreground">• L = constant</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
