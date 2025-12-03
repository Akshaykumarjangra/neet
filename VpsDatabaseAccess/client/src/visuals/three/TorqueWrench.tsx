
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Play, Pause, Wrench, Eye } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function TorqueWrench() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const wrenchRef = useRef<THREE.Group | null>(null);
  const forceArrowRef = useRef<THREE.ArrowHelper | null>(null);
  const torqueArrowRef = useRef<THREE.ArrowHelper | null>(null);
  const componentArrowsRef = useRef<THREE.Group | null>(null);
  const leverArmLineRef = useRef<THREE.Line | null>(null);
  const rotationPlaneRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const [force, setForce] = useState([50]); // Newtons
  const [angle, setAngle] = useState([90]); // degrees
  const [leverArm, setLeverArm] = useState([0.3]); // meters
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComponents, setShowComponents] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      50,
      800 / 500,
      0.1,
      1000
    );
    camera.position.set(1.5, 1.2, 1.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 500);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 0.5;
    controls.maxDistance = 5;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Grid helper
    const gridHelper = new THREE.GridHelper(2, 10, 0x888888, 0xcccccc);
    scene.add(gridHelper);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);

    // Create rotation plane indicator (semi-transparent disc)
    const planeGeometry = new THREE.CircleGeometry(0.5, 32);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const rotationPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    rotationPlane.rotation.x = Math.PI / 2;
    rotationPlaneRef.current = rotationPlane;
    scene.add(rotationPlane);

    // Create wrench group
    const wrenchGroup = new THREE.Group();
    wrenchRef.current = wrenchGroup;
    scene.add(wrenchGroup);

    // Create wrench handle (cylinder)
    const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, leverArm[0], 16);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x3b82f6 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.rotation.z = Math.PI / 2;
    wrenchGroup.add(handle);

    // Create bolt at origin
    const boltGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 6);
    const boltMaterial = new THREE.MeshPhongMaterial({ color: 0x64748b });
    const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
    wrenchGroup.add(bolt);

    // Create force arrow
    const forceDir = new THREE.Vector3(0, 1, 0);
    const forceOrigin = new THREE.Vector3(leverArm[0] / 2, 0, 0);
    const forceLength = force[0] / 100;
    const forceArrow = new THREE.ArrowHelper(
      forceDir,
      forceOrigin,
      forceLength,
      0xff0000,
      0.1,
      0.05
    );
    forceArrowRef.current = forceArrow;
    scene.add(forceArrow);

    // Create torque arrow (perpendicular to plane)
    const torqueDir = new THREE.Vector3(0, 0, 1);
    const torqueOrigin = new THREE.Vector3(0, 0, 0);
    const torqueLength = 0.3;
    const torqueArrow = new THREE.ArrowHelper(
      torqueDir,
      torqueOrigin,
      torqueLength,
      0x10b981,
      0.15,
      0.1
    );
    torqueArrowRef.current = torqueArrow;
    scene.add(torqueArrow);

    // Create component arrows group
    const componentGroup = new THREE.Group();
    componentArrowsRef.current = componentGroup;
    scene.add(componentGroup);

    // Create perpendicular distance line
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineDashedMaterial({
      color: 0x9333ea,
      dashSize: 0.02,
      gapSize: 0.01,
    });
    const leverArmLine = new THREE.Line(lineGeometry, lineMaterial);
    leverArmLineRef.current = leverArmLine;
    scene.add(leverArmLine);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (isAnimating && wrenchRef.current) {
        wrenchRef.current.rotation.z += 0.02;
      }

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    updateVisualization();
  }, [force, angle, leverArm, showComponents]);

  const updateVisualization = () => {
    if (!sceneRef.current || !wrenchRef.current || !forceArrowRef.current || !torqueArrowRef.current) return;

    // Update wrench handle length
    const handle = wrenchRef.current.children[0] as THREE.Mesh;
    const newGeometry = new THREE.CylinderGeometry(0.02, 0.02, leverArm[0], 16);
    handle.geometry.dispose();
    handle.geometry = newGeometry;

    // Calculate angles and positions
    const angleRad = (angle[0] * Math.PI) / 180;
    const forceApplicationPoint = new THREE.Vector3(leverArm[0] / 2, 0, 0);

    // Update force arrow
    const forceDir = new THREE.Vector3(
      Math.sin(angleRad),
      Math.cos(angleRad),
      0
    ).normalize();
    const forceLength = force[0] / 100;

    sceneRef.current.remove(forceArrowRef.current);
    const newForceArrow = new THREE.ArrowHelper(
      forceDir,
      forceApplicationPoint,
      forceLength,
      0xff0000,
      0.1,
      0.05
    );
    forceArrowRef.current = newForceArrow;
    sceneRef.current.add(newForceArrow);

    // Update component arrows (perpendicular and parallel)
    if (componentArrowsRef.current && showComponents) {
      componentArrowsRef.current.clear();

      // Perpendicular component (contributes to torque)
      const perpComponent = force[0] * Math.sin(angleRad);
      const perpDir = new THREE.Vector3(-Math.cos(angleRad), Math.sin(angleRad), 0).normalize();
      const perpLength = Math.abs(perpComponent) / 100;

      if (perpLength > 0.01) {
        const perpArrow = new THREE.ArrowHelper(
          perpDir,
          forceApplicationPoint,
          perpLength,
          0x9333ea,
          0.08,
          0.04
        );
        componentArrowsRef.current.add(perpArrow);
      }

      // Parallel component (does not contribute to torque)
      const parallelComponent = force[0] * Math.cos(angleRad);
      const parallelDir = new THREE.Vector3(Math.sin(angleRad), -Math.cos(angleRad), 0).normalize();
      const parallelLength = Math.abs(parallelComponent) / 100;

      if (parallelLength > 0.01) {
        const parallelArrow = new THREE.ArrowHelper(
          parallelDir,
          forceApplicationPoint,
          parallelLength,
          0xfbbf24,
          0.08,
          0.04
        );
        componentArrowsRef.current.add(parallelArrow);
      }

      // Draw perpendicular distance line from pivot to force line
      if (leverArmLineRef.current && Math.abs(Math.sin(angleRad)) > 0.01) {
        const perpDistance = leverArm[0] / 2 * Math.sin(angleRad);
        const perpPoint = new THREE.Vector3(0, perpDistance, 0);

        const points = [
          new THREE.Vector3(0, 0, 0),
          perpPoint,
        ];

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        leverArmLineRef.current.geometry.dispose();
        leverArmLineRef.current.geometry = lineGeometry;
        leverArmLineRef.current.computeLineDistances();
        leverArmLineRef.current.visible = true;
      }
    } else if (leverArmLineRef.current) {
      leverArmLineRef.current.visible = false;
    }

    // Calculate torque and update torque arrow
    const torqueMagnitude = leverArm[0] * force[0] * Math.sin(angleRad);
    const torqueLength = Math.abs(torqueMagnitude) / 100;
    const torqueDir = new THREE.Vector3(0, 0, torqueMagnitude > 0 ? 1 : -1);

    sceneRef.current.remove(torqueArrowRef.current);
    const newTorqueArrow = new THREE.ArrowHelper(
      torqueDir,
      new THREE.Vector3(0, 0, 0),
      torqueLength,
      0x10b981,
      0.15,
      0.1
    );
    torqueArrowRef.current = newTorqueArrow;
    sceneRef.current.add(newTorqueArrow);

    // Update rotation plane size based on lever arm
    if (rotationPlaneRef.current) {
      const scale = leverArm[0] * 2;
      rotationPlaneRef.current.scale.set(scale, scale, 1);
    }
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation started");
  };

  const resetVisualization = () => {
    setForce([50]);
    setAngle([90]);
    setLeverArm([0.3]);
    setIsAnimating(false);
    if (wrenchRef.current) {
      wrenchRef.current.rotation.z = 0;
    }
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(1.5, 1.2, 1.5);
      controlsRef.current.reset();
    }
    setAnnouncement("Visualization reset");
  };

  const toggleComponents = () => {
    setShowComponents(!showComponents);
    setAnnouncement(showComponents ? "Force components hidden" : "Force components shown");
  };

  // Calculate torque
  const angleRad = (angle[0] * Math.PI) / 180;
  const torque = leverArm[0] * force[0] * Math.sin(angleRad);
  const perpendicularComponent = force[0] * Math.sin(angleRad);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Torque Wrench - 3D Lever Arm Visualization
          </span>
          <Badge variant="outline">Physics - Rotational Motion</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize how torque depends on force, lever arm, and angle
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={mountRef} className="w-full border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Force (F): {force[0]} N
            </label>
            <Slider
              value={force}
              onValueChange={(val) => {
                setForce(val);
                setAnnouncement(`Force set to ${val[0]} Newtons`);
              }}
              min={10}
              max={200}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Angle (θ): {angle[0]}°
            </label>
            <Slider
              value={angle}
              onValueChange={(val) => {
                setAngle(val);
                setAnnouncement(`Angle set to ${val[0]} degrees`);
              }}
              min={0}
              max={180}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Lever Arm (r): {leverArm[0].toFixed(2)} m
            </label>
            <Slider
              value={leverArm}
              onValueChange={(val) => {
                setLeverArm(val);
                setAnnouncement(`Lever arm set to ${val[0].toFixed(2)} meters`);
              }}
              min={0.1}
              max={0.8}
              step={0.05}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-red-600">Applied Force</p>
            <p className="font-mono text-xl">{force[0]} N</p>
          </div>
          <div>
            <p className="font-semibold text-purple-600">Perpendicular Component</p>
            <p className="font-mono text-xl">{perpendicularComponent.toFixed(2)} N</p>
          </div>
          <div>
            <p className="font-semibold text-blue-600">Lever Arm</p>
            <p className="font-mono text-xl">{leverArm[0].toFixed(2)} m</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">Torque (τ)</p>
            <p className="font-mono text-xl">{torque.toFixed(2)} N⋅m</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2">
          <p className="font-semibold">Visualization Guide:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>🔴 Red arrow: Applied force vector (F)</li>
            <li>🟢 Green arrow: Torque direction (τ, into/out of page)</li>
            <li>🟣 Purple arrow: Perpendicular component (F⊥ = F sin θ)</li>
            <li>🟡 Yellow arrow: Parallel component (F∥ = F cos θ)</li>
            <li>🔵 Blue handle: Wrench (lever arm r)</li>
            <li>⚫ Gray cylinder: Bolt/pivot point</li>
            <li>💚 Green disc: Rotation plane</li>
            <li>🟣 Dashed line: Perpendicular distance (r⊥)</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Drag to rotate view • Scroll to zoom • Right-click to pan
          </p>
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
                Rotate
              </>
            )}
          </Button>
          <Button onClick={toggleComponents} variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            {showComponents ? "Hide" : "Show"}
          </Button>
          <Button onClick={resetVisualization} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Torque:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Torque: τ = r × F = rF sin θ</li>
            <li>• Maximum when θ = 90° (perpendicular)</li>
            <li>• Zero when θ = 0° or 180° (parallel)</li>
            <li>• Direction: Right-hand rule (⊥ to plane)</li>
            <li>• Units: N⋅m (Newton-meter)</li>
            <li>• Only F⊥ contributes: F⊥ = F sin θ</li>
            <li>• Longer lever arm → Greater torque</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
