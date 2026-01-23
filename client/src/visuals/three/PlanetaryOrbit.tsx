
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Globe, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function PlanetaryOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const animationFrameRef = useRef<number>();
  const planetRef = useRef<THREE.Mesh>();
  const orbitLineRef = useRef<THREE.Line>();
  const sweepAreaRef = useRef<THREE.Mesh>();

  const [eccentricity, setEccentricity] = useState([0.5]);
  const [speed, setSpeed] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [showSweepArea, setShowSweepArea] = useState(true);
  
  const angleRef = useRef(0);
  const sweepPointsRef = useRef<THREE.Vector3[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000510);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / 500,
      0.1,
      1000
    );
    camera.position.set(0, 15, 0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 500);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffff00, 2, 100);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Create sun
    const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffff00
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create sun glow
    const glowGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Create planet
    const planetGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const planetMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4488ff,
      emissive: 0x112244
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planetRef.current = planet;
    scene.add(planet);

    // Create orbit path
    createOrbit(scene, eccentricity[0]);

    // Create sweep area
    const sweepGeometry = new THREE.BufferGeometry();
    const sweepMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const sweepMesh = new THREE.Mesh(sweepGeometry, sweepMaterial);
    sweepAreaRef.current = sweepMesh;
    scene.add(sweepMesh);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (isPlaying && planetRef.current) {
        updatePlanetPosition();
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      // Remove old orbit line
      const oldLine = sceneRef.current.children.find(
        child => child.type === 'Line' && child !== sweepAreaRef.current
      );
      if (oldLine) sceneRef.current.remove(oldLine);
      
      createOrbit(sceneRef.current, eccentricity[0]);
      resetOrbit();
    }
  }, [eccentricity]);

  const createOrbit = (scene: THREE.Scene, e: number) => {
    const points: THREE.Vector3[] = [];
    const a = 8; // Semi-major axis
    const b = a * Math.sqrt(1 - e * e); // Semi-minor axis
    const c = a * e; // Distance from center to focus

    for (let i = 0; i <= 360; i += 2) {
      const angle = (i * Math.PI) / 180;
      const x = -c + a * Math.cos(angle);
      const z = b * Math.sin(angle);
      points.push(new THREE.Vector3(x, 0, z));
    }

    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const orbitMaterial = new THREE.LineBasicMaterial({ 
      color: 0x888888,
      transparent: true,
      opacity: 0.5
    });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitLineRef.current = orbitLine;
    scene.add(orbitLine);
  };

  const updatePlanetPosition = () => {
    if (!planetRef.current) return;

    const e = eccentricity[0];
    const a = 8;
    const b = a * Math.sqrt(1 - e * e);
    const c = a * e;

    // Update angle based on speed (simulating Kepler's 2nd law)
    const r = getRadius(angleRef.current, a, e);
    const angularSpeed = (speed[0] * 0.02) / (r * r); // Area sweep constant
    angleRef.current += angularSpeed;

    // Calculate position
    const x = -c + a * Math.cos(angleRef.current);
    const z = b * Math.sin(angleRef.current);
    planetRef.current.position.set(x, 0, z);

    // Update sweep area
    if (showSweepArea) {
      updateSweepArea(x, z);
    }
  };

  const getRadius = (angle: number, a: number, e: number) => {
    // Distance from sun (focus) to planet
    return (a * (1 - e * e)) / (1 + e * Math.cos(angle));
  };

  const updateSweepArea = (x: number, z: number) => {
    if (!sweepAreaRef.current) return;

    const currentPoint = new THREE.Vector3(x, 0.01, z);
    sweepPointsRef.current.push(currentPoint);

    // Keep only recent points (for visual effect)
    if (sweepPointsRef.current.length > 30) {
      sweepPointsRef.current.shift();
    }

    // Create triangle fan from sun to swept points
    const vertices: number[] = [];
    sweepPointsRef.current.forEach(point => {
      vertices.push(0, 0.01, 0); // Sun position
      vertices.push(point.x, point.y, point.z);
    });

    if (vertices.length > 0) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      sweepAreaRef.current.geometry.dispose();
      sweepAreaRef.current.geometry = geometry;
    }
  };

  const resetOrbit = () => {
    angleRef.current = 0;
    sweepPointsRef.current = [];
    if (sweepAreaRef.current) {
      sweepAreaRef.current.geometry.dispose();
      sweepAreaRef.current.geometry = new THREE.BufferGeometry();
    }
    setAnnouncement("Orbit reset");
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    setAnnouncement(isPlaying ? "Animation paused" : "Animation started");
  };

  const handleReset = () => {
    setEccentricity([0.5]);
    setSpeed([1]);
    setIsPlaying(false);
    resetOrbit();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Planetary Orbit - Kepler's 2nd Law
          </span>
          <Badge variant="outline">Physics - Gravitation</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize elliptical orbits and equal area sweep in equal time
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Eccentricity (e): {eccentricity[0].toFixed(2)}
            </label>
            <Slider
              value={eccentricity}
              onValueChange={(val) => {
                setEccentricity(val);
                setAnnouncement(`Eccentricity set to ${val[0].toFixed(2)}`);
              }}
              min={0}
              max={0.9}
              step={0.05}
            />
            <p className="text-xs text-muted-foreground">
              e = 0: circle, e → 1: elongated ellipse
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Animation Speed: {speed[0].toFixed(1)}x
            </label>
            <Slider
              value={speed}
              onValueChange={(val) => {
                setSpeed(val);
                setAnnouncement(`Speed set to ${val[0].toFixed(1)}x`);
              }}
              min={0.2}
              max={3}
              step={0.1}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showSweep"
              checked={showSweepArea}
              onChange={(e) => {
                setShowSweepArea(e.target.checked);
                setAnnouncement(e.target.checked ? "Sweep area shown" : "Sweep area hidden");
              }}
              className="w-4 h-4"
            />
            <label htmlFor="showSweep" className="text-sm font-medium">
              Show Area Sweep (Kepler's 2nd Law)
            </label>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2">
          <p className="font-semibold">Visualization Guide:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>🟡 Yellow sphere: Sun (at focus)</li>
            <li>🔵 Blue sphere: Planet in orbit</li>
            <li>⚪ Gray ellipse: Orbital path</li>
            <li>🟢 Green area: Swept area (constant rate)</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button onClick={toggleAnimation} className="flex-1">
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Orbit
              </>
            )}
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Kepler's Laws:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• 1st Law: Planets move in elliptical orbits</li>
            <li>• Sun is at one focus of the ellipse</li>
            <li>• 2nd Law: Equal areas in equal times (ΔA/Δt = constant)</li>
            <li>• Planet moves faster near perihelion (closest)</li>
            <li>• Planet moves slower near aphelion (farthest)</li>
            <li>• Eccentricity: e = c/a (0 ≤ e &lt; 1)</li>
            <li>• Circle: e = 0, Ellipse: 0 &lt; e &lt; 1</li>
            <li>• Angular momentum is conserved: L = mvr</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
