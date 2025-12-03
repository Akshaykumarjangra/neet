
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Magnet, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function HelicalMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const animationFrameRef = useRef<number>();
  const particleRef = useRef<THREE.Mesh>();
  const pathRef = useRef<THREE.Line>();

  const [vParallel, setVParallel] = useState([5]);
  const [vPerpendicular, setVPerpendicular] = useState([5]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const timeRef = useRef(0);
  const pathPointsRef = useRef<THREE.Vector3[]>([]);

  // Physics parameters
  const B = 1; // Magnetic field strength
  const q = 1; // Charge
  const m = 1; // Mass
  const omega = (q * B) / m; // Cyclotron frequency

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
    camera.position.set(15, 15, 15);
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

    // Magnetic field lines (parallel to z-axis)
    const arrowLength = 15;
    const arrowSpacing = 3;
    for (let x = -6; x <= 6; x += arrowSpacing) {
      for (let y = -6; y <= 6; y += arrowSpacing) {
        const dir = new THREE.Vector3(0, 0, 1);
        const origin = new THREE.Vector3(x, y, -arrowLength / 2);
        const arrow = new THREE.ArrowHelper(dir, origin, arrowLength, 0x00ffff, 1, 0.5);
        arrow.userData.isFieldLine = true;
        scene.add(arrow);
      }
    }

    // Create charged particle
    const particleGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.5,
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(0, 0, -arrowLength / 2);
    particle.userData.isParticle = true;
    scene.add(particle);
    particleRef.current = particle;

    // Create path line
    const pathGeometry = new THREE.BufferGeometry();
    const pathMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      linewidth: 2,
    });
    const path = new THREE.Line(pathGeometry, pathMaterial);
    path.userData.isPath = true;
    scene.add(path);
    pathRef.current = path;

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
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (!particleRef.current || !pathRef.current) return;

      const t = timeRef.current;
      const v_parallel = vParallel[0];
      const v_perp = vPerpendicular[0];
      const r = (m * v_perp) / (q * B); // Radius of circular motion

      // Helical motion equations
      const x = r * Math.cos(omega * t);
      const y = r * Math.sin(omega * t);
      const z = -7.5 + v_parallel * t;

      particleRef.current.position.set(x, y, z);

      // Update path
      pathPointsRef.current.push(new THREE.Vector3(x, y, z));
      if (pathPointsRef.current.length > 200) {
        pathPointsRef.current.shift();
      }

      const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPointsRef.current);
      pathRef.current.geometry.dispose();
      pathRef.current.geometry = pathGeometry;

      timeRef.current += 0.05;

      // Reset if particle goes too far
      if (z > 7.5) {
        timeRef.current = 0;
        pathPointsRef.current = [];
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, vParallel, vPerpendicular]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setAnnouncement(isPlaying ? "Paused" : "Playing");
  };

  const reset = () => {
    timeRef.current = 0;
    pathPointsRef.current = [];
    if (particleRef.current) {
      particleRef.current.position.set(0, 0, -7.5);
    }
    if (pathRef.current) {
      const pathGeometry = new THREE.BufferGeometry().setFromPoints([]);
      pathRef.current.geometry.dispose();
      pathRef.current.geometry = pathGeometry;
    }
    setIsPlaying(false);
    setVParallel([5]);
    setVPerpendicular([5]);
    setAnnouncement("Reset to default values");
  };

  const radius = (m * vPerpendicular[0]) / (q * B);
  const pitch = (2 * Math.PI * vParallel[0]) / omega;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Magnet className="h-5 w-5" />
            Helical Motion in Magnetic Field
          </span>
          <Badge variant="outline">Physics - Moving Charges</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Charged particle in uniform magnetic field
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={containerRef}
          className="w-full h-[500px] border rounded-lg bg-background"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Parallel Velocity (v∥): {vParallel[0].toFixed(1)} m/s
          </label>
          <Slider
            value={vParallel}
            onValueChange={(val) => {
              setVParallel(val);
              setAnnouncement(`Parallel velocity: ${val[0].toFixed(1)} m/s`);
            }}
            min={0}
            max={10}
            step={0.5}
            disabled={isPlaying}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Perpendicular Velocity (v⊥): {vPerpendicular[0].toFixed(1)} m/s
          </label>
          <Slider
            value={vPerpendicular}
            onValueChange={(val) => {
              setVPerpendicular(val);
              setAnnouncement(`Perpendicular velocity: ${val[0].toFixed(1)} m/s`);
            }}
            min={0}
            max={10}
            step={0.5}
            disabled={isPlaying}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
          <div>
            <p className="text-sm font-semibold">Radius (r)</p>
            <p className="text-lg font-mono">{radius.toFixed(2)} m</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Pitch (p)</p>
            <p className="text-lg font-mono">{pitch.toFixed(2)} m</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={togglePlay} className="flex-1">
            {isPlaying ? (
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
          <p className="font-semibold">NEET Key Points:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• v∥ component: straight line motion along B</li>
            <li>• v⊥ component: circular motion perpendicular to B</li>
            <li>• Combined motion: helix (spiral)</li>
            <li>• Radius: r = mv⊥/(qB)</li>
            <li>• Pitch: p = 2πmv∥/(qB)</li>
            <li>• Cyclotron frequency: ω = qB/m</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Important Formulas:</h4>
          <div className="grid gap-2 text-sm font-mono bg-muted p-3 rounded">
            <p>r = mv⊥/(qB)</p>
            <p>T = 2πm/(qB)</p>
            <p>ω = qB/m</p>
            <p>p = v∥T = 2πmv∥/(qB)</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
