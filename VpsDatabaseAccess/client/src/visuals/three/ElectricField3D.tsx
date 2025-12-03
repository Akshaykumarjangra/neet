
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Zap, Plus, Minus, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

interface Charge {
  position: THREE.Vector3;
  magnitude: number; // positive or negative
  color: THREE.Color;
}

export default function ElectricField3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const animationFrameRef = useRef<number>();

  const [charges, setCharges] = useState<Charge[]>([
    { position: new THREE.Vector3(-3, 0, 0), magnitude: 1, color: new THREE.Color(0xff0000) },
    { position: new THREE.Vector3(3, 0, 0), magnitude: -1, color: new THREE.Color(0x0000ff) },
  ]);
  const [fieldDensity, setFieldDensity] = useState([8]);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 12);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear previous charges and field lines
    const objectsToRemove = sceneRef.current.children.filter(
      (obj) => obj.userData.isCharge || obj.userData.isFieldLine
    );
    objectsToRemove.forEach((obj) => sceneRef.current?.remove(obj));

    // Add charges
    charges.forEach((charge) => {
      const geometry = new THREE.SphereGeometry(0.4, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: charge.color });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(charge.position);
      sphere.userData.isCharge = true;
      sceneRef.current?.add(sphere);

      // Add charge label
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.width = 128;
      canvas.height = 128;
      context.fillStyle = charge.magnitude > 0 ? "#ff0000" : "#0000ff";
      context.font = "bold 80px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(charge.magnitude > 0 ? "+" : "-", 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(charge.position);
      sprite.position.y += 0.8;
      sprite.scale.set(0.8, 0.8, 1);
      sprite.userData.isCharge = true;
      sceneRef.current?.add(sprite);
    });

    // Generate field lines
    const numLines = fieldDensity[0];
    const angleStep = (2 * Math.PI) / numLines;

    charges.forEach((charge) => {
      for (let i = 0; i < numLines; i++) {
        const angle = i * angleStep;
        const startRadius = 0.5;
        const maxRadius = 10;
        const steps = 50;

        const points: THREE.Vector3[] = [];
        let currentPos = new THREE.Vector3(
          charge.position.x + startRadius * Math.cos(angle),
          charge.position.y,
          charge.position.z + startRadius * Math.sin(angle)
        );

        points.push(currentPos.clone());

        for (let step = 0; step < steps; step++) {
          const field = new THREE.Vector3(0, 0, 0);

          // Calculate field from all charges
          charges.forEach((otherCharge) => {
            const r = new THREE.Vector3().subVectors(currentPos, otherCharge.position);
            const distance = r.length();
            if (distance < 0.5) return; // Too close to charge

            const fieldMagnitude = otherCharge.magnitude / (distance * distance);
            const fieldDir = r.normalize();
            field.add(fieldDir.multiplyScalar(fieldMagnitude));
          });

          if (field.length() < 0.01) break;

          const stepSize = 0.2;
          currentPos.add(field.normalize().multiplyScalar(stepSize * (charge.magnitude > 0 ? 1 : -1)));

          if (currentPos.length() > maxRadius) break;
          points.push(currentPos.clone());
        }

        if (points.length > 1) {
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: charge.color,
            opacity: 0.6,
            transparent: true,
          });
          const line = new THREE.Line(geometry, material);
          line.userData.isFieldLine = true;
          sceneRef.current?.add(line);
        }
      }
    });
  }, [charges, fieldDensity]);

  const addPositiveCharge = () => {
    const newCharge: Charge = {
      position: new THREE.Vector3(
        Math.random() * 6 - 3,
        0,
        Math.random() * 6 - 3
      ),
      magnitude: 1,
      color: new THREE.Color(0xff0000),
    };
    setCharges([...charges, newCharge]);
    setAnnouncement("Added positive charge");
  };

  const addNegativeCharge = () => {
    const newCharge: Charge = {
      position: new THREE.Vector3(
        Math.random() * 6 - 3,
        0,
        Math.random() * 6 - 3
      ),
      magnitude: -1,
      color: new THREE.Color(0x0000ff),
    };
    setCharges([...charges, newCharge]);
    setAnnouncement("Added negative charge");
  };

  const resetCharges = () => {
    setCharges([
      { position: new THREE.Vector3(-3, 0, 0), magnitude: 1, color: new THREE.Color(0xff0000) },
      { position: new THREE.Vector3(3, 0, 0), magnitude: -1, color: new THREE.Color(0x0000ff) },
    ]);
    setAnnouncement("Reset to default configuration");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            3D Electric Field Lines
          </span>
          <Badge variant="outline">Physics - Electrostatics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize electric field lines in 3D space
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={containerRef}
          className="w-full h-[500px] border rounded-lg bg-background"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Field Line Density: {fieldDensity[0]} lines per charge
          </label>
          <Slider
            value={fieldDensity}
            onValueChange={setFieldDensity}
            min={4}
            max={16}
            step={2}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={addPositiveCharge} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add + Charge
          </Button>
          <Button onClick={addNegativeCharge} variant="outline">
            <Minus className="mr-2 h-4 w-4" />
            Add - Charge
          </Button>
          <Button onClick={resetCharges} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Electric field lines originate from positive charges</li>
            <li>• Electric field lines terminate at negative charges</li>
            <li>• Field lines never cross each other</li>
            <li>• Density of lines indicates field strength</li>
            <li>• Tangent to field line gives direction of E-field</li>
            <li>• E = F/q = kQ/r² (point charge)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Important Formulas:</h4>
          <div className="grid gap-2 text-sm font-mono bg-muted p-3 rounded">
            <p>E = F/q (electric field definition)</p>
            <p>E = kQ/r² (point charge)</p>
            <p>E = σ/(2ε₀) (infinite sheet)</p>
            <p>Flux: φ = E·A (Gauss's law)</p>
            <p>k = 9 × 10⁹ N·m²/C²</p>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm font-semibold mb-2">Tip:</p>
          <p className="text-sm text-muted-foreground">
            Drag to rotate, scroll to zoom. Red spheres are positive charges (+), blue spheres are negative charges (-).
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
