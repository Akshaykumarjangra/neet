
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Zap, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function ParallelPlateCapacitor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const animationFrameRef = useRef<number>();

  const [separation, setSeparation] = useState([3]);
  const [voltage, setVoltage] = useState([5]);
  const [announcement, setAnnouncement] = useState("");

  // Calculate capacitance and electric field
  const area = 4; // plate area in arbitrary units
  const epsilon0 = 8.85e-12;
  const d = separation[0];
  const V = voltage[0];
  const E = V / d; // Electric field
  const C = (epsilon0 * area) / d; // Capacitance (simplified)

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
    camera.position.set(8, 6, 8);
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
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

    // Clear previous plates and field lines
    const objectsToRemove = sceneRef.current.children.filter(
      (obj) => obj.userData.isPlate || obj.userData.isFieldLine || obj.userData.isLabel
    );
    objectsToRemove.forEach((obj) => sceneRef.current?.remove(obj));

    const plateWidth = 4;
    const plateHeight = 4;
    const plateThickness = 0.1;

    // Create positive plate (red)
    const positivePlateGeometry = new THREE.BoxGeometry(plateWidth, plateHeight, plateThickness);
    const positivePlateMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.7,
    });
    const positivePlate = new THREE.Mesh(positivePlateGeometry, positivePlateMaterial);
    positivePlate.position.set(0, 0, -separation[0] / 2);
    positivePlate.userData.isPlate = true;
    sceneRef.current.add(positivePlate);

    // Create negative plate (blue)
    const negativePlateGeometry = new THREE.BoxGeometry(plateWidth, plateHeight, plateThickness);
    const negativePlateMaterial = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.7,
    });
    const negativePlate = new THREE.Mesh(negativePlateGeometry, negativePlateMaterial);
    negativePlate.position.set(0, 0, separation[0] / 2);
    negativePlate.userData.isPlate = true;
    sceneRef.current.add(negativePlate);

    // Add + and - labels
    const createLabel = (text: string, color: number, position: THREE.Vector3) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.width = 128;
      canvas.height = 128;
      context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      context.font = "bold 100px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(position);
      sprite.scale.set(1, 1, 1);
      sprite.userData.isLabel = true;
      sceneRef.current?.add(sprite);
    };

    createLabel("+", 0xff0000, new THREE.Vector3(0, 2.5, -separation[0] / 2));
    createLabel("-", 0x0000ff, new THREE.Vector3(0, 2.5, separation[0] / 2));

    // Create electric field lines
    const numLines = 12;
    const spacing = plateWidth / (numLines + 1);

    for (let i = 1; i <= numLines; i++) {
      for (let j = 1; j <= numLines; j++) {
        const x = -plateWidth / 2 + i * spacing;
        const y = -plateHeight / 2 + j * spacing;

        const startPoint = new THREE.Vector3(x, y, -separation[0] / 2 + plateThickness / 2);
        const endPoint = new THREE.Vector3(x, y, separation[0] / 2 - plateThickness / 2);

        const points = [startPoint, endPoint];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x00ff00,
          opacity: 0.6,
          transparent: true,
        });
        const line = new THREE.Line(geometry, material);
        line.userData.isFieldLine = true;
        sceneRef.current.add(line);

        // Add arrow at the end
        const arrowDir = new THREE.Vector3(0, 0, 1);
        const arrowHelper = new THREE.ArrowHelper(
          arrowDir,
          endPoint.clone().sub(new THREE.Vector3(0, 0, 0.2)),
          0.3,
          0x00ff00,
          0.2,
          0.15
        );
        arrowHelper.userData.isFieldLine = true;
        sceneRef.current.add(arrowHelper);
      }
    }
  }, [separation]);

  const reset = () => {
    setSeparation([3]);
    setVoltage([5]);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Parallel Plate Capacitor
          </span>
          <Badge variant="outline">Physics - Capacitors</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize electric field between parallel plates
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={containerRef}
          className="w-full h-[500px] border rounded-lg bg-background"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Plate Separation: {separation[0].toFixed(1)} units
          </label>
          <Slider
            value={separation}
            onValueChange={(val) => {
              setSeparation(val);
              setAnnouncement(`Plate separation: ${val[0].toFixed(1)} units`);
            }}
            min={1}
            max={6}
            step={0.5}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Voltage: {voltage[0]} V
          </label>
          <Slider
            value={voltage}
            onValueChange={(val) => {
              setVoltage(val);
              setAnnouncement(`Voltage: ${val[0]} V`);
            }}
            min={1}
            max={10}
            step={1}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
          <div>
            <p className="text-sm font-semibold">Electric Field (E)</p>
            <p className="text-lg font-mono">{E.toFixed(2)} V/unit</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Capacitance (C)</p>
            <p className="text-lg font-mono">{(C * 1e12).toFixed(2)} pF</p>
          </div>
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Electric field between plates: E = V/d</li>
            <li>• Field is uniform between the plates</li>
            <li>• Capacitance: C = ε₀A/d</li>
            <li>• Increasing separation decreases capacitance</li>
            <li>• Charge stored: Q = CV</li>
            <li>• Energy stored: U = ½CV²</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Important Formulas:</h4>
          <div className="grid gap-2 text-sm font-mono bg-muted p-3 rounded">
            <p>C = ε₀A/d (air/vacuum)</p>
            <p>C = Kε₀A/d (with dielectric)</p>
            <p>E = V/d = σ/ε₀</p>
            <p>Q = CV</p>
            <p>U = ½CV² = ½QV = Q²/(2C)</p>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm font-semibold mb-2">Tip:</p>
          <p className="text-sm text-muted-foreground">
            Red plate is positive (+), blue plate is negative (-). Green arrows show the direction of the electric field (from + to -).
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
