
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Thermometer, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function BimetallicStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const animationFrameRef = useRef<number>();
  const stripGroupRef = useRef<THREE.Group>();
  const metal1Ref = useRef<THREE.Mesh>();
  const metal2Ref = useRef<THREE.Mesh>();

  const [temperature, setTemperature] = useState([20]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  
  const targetTempRef = useRef(20);
  const currentTempRef = useRef(20);

  // Material properties
  const ALPHA_BRASS = 19e-6; // Brass expansion coefficient (per °C)
  const ALPHA_STEEL = 12e-6; // Steel expansion coefficient (per °C)
  const STRIP_LENGTH = 5;
  const STRIP_WIDTH = 0.4;
  const STRIP_THICKNESS = 0.1;

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(6, 4, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create base/support
    const baseGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(-STRIP_LENGTH / 2, -0.15, 0);
    base.castShadow = true;
    scene.add(base);

    // Create bimetallic strip group
    const stripGroup = new THREE.Group();
    stripGroupRef.current = stripGroup;
    scene.add(stripGroup);

    // Create brass layer (top, higher expansion)
    const brassGeometry = new THREE.BoxGeometry(
      STRIP_LENGTH,
      STRIP_THICKNESS / 2,
      STRIP_WIDTH
    );
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.7,
      roughness: 0.3
    });
    const brass = new THREE.Mesh(brassGeometry, brassMaterial);
    brass.position.y = STRIP_THICKNESS / 4;
    brass.castShadow = true;
    metal1Ref.current = brass;
    stripGroup.add(brass);

    // Create steel layer (bottom, lower expansion)
    const steelGeometry = new THREE.BoxGeometry(
      STRIP_LENGTH,
      STRIP_THICKNESS / 2,
      STRIP_WIDTH
    );
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.8,
      roughness: 0.2
    });
    const steel = new THREE.Mesh(steelGeometry, steelMaterial);
    steel.position.y = -STRIP_THICKNESS / 4;
    steel.castShadow = true;
    metal2Ref.current = steel;
    stripGroup.add(steel);

    // Add labels
    const createLabel = (text: string, color: number, position: THREE.Vector3) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      context.font = 'bold 32px Arial';
      context.fillText(text, 10, 40);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(1.5, 0.4, 1);
      scene.add(sprite);
    };

    createLabel('Brass (α = 19×10⁻⁶/°C)', 0xffd700, new THREE.Vector3(0, 1, 0));
    createLabel('Steel (α = 12×10⁻⁶/°C)', 0x888888, new THREE.Vector3(0, -0.8, 0));

    // Add temperature indicator
    const tempIndicator = new THREE.Group();
    const thermGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 16);
    const thermMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const therm = new THREE.Mesh(thermGeometry, thermMaterial);
    tempIndicator.add(therm);
    tempIndicator.position.set(3, 0, 0);
    scene.add(tempIndicator);

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0xcccccc, 0xeeeeee);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (isAnimating) {
        // Smoothly interpolate temperature
        const diff = targetTempRef.current - currentTempRef.current;
        currentTempRef.current += diff * 0.05;
        
        updateStripBend(currentTempRef.current);
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
    targetTempRef.current = temperature[0];
  }, [temperature]);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        updateStripBend(currentTempRef.current);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const updateStripBend = (temp: number) => {
    if (!stripGroupRef.current) return;

    const deltaT = temp - 20; // Reference temperature is 20°C
    
    // Calculate differential expansion
    const deltaAlpha = ALPHA_BRASS - ALPHA_STEEL;
    
    // Curvature calculation (simplified)
    // For small angles: curvature ≈ (Δα × ΔT × d) / L²
    const d = STRIP_THICKNESS;
    const curvature = (deltaAlpha * deltaT * d) / (STRIP_LENGTH * STRIP_LENGTH);
    
    // Bend the strip by creating a curved shape
    const segments = 20;
    const angle = curvature * STRIP_LENGTH * 100; // Amplified for visibility
    
    // Clear previous meshes
    stripGroupRef.current.clear();

    // Create curved brass layer
    const brassPoints: THREE.Vector3[] = [];
    const steelPoints: THREE.Vector3[] = [];
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = (t - 0.5) * STRIP_LENGTH;
      const y = angle * Math.sin(t * Math.PI) * 0.5;
      
      brassPoints.push(new THREE.Vector3(x, y + STRIP_THICKNESS / 4, 0));
      steelPoints.push(new THREE.Vector3(x, y - STRIP_THICKNESS / 4, 0));
    }

    // Create curved geometry using segments
    for (let i = 0; i < segments; i++) {
      // Brass segment
      const brassSegGeom = new THREE.BoxGeometry(
        STRIP_LENGTH / segments,
        STRIP_THICKNESS / 2,
        STRIP_WIDTH
      );
      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.7,
        roughness: 0.3
      });
      const brassSegment = new THREE.Mesh(brassSegGeom, brassMat);
      brassSegment.position.copy(brassPoints[i]);
      const rotZ = Math.atan2(
        brassPoints[i + 1].y - brassPoints[i].y,
        brassPoints[i + 1].x - brassPoints[i].x
      );
      brassSegment.rotation.z = rotZ;
      stripGroupRef.current.add(brassSegment);

      // Steel segment
      const steelSegGeom = new THREE.BoxGeometry(
        STRIP_LENGTH / segments,
        STRIP_THICKNESS / 2,
        STRIP_WIDTH
      );
      const steelMat = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.8,
        roughness: 0.2
      });
      const steelSegment = new THREE.Mesh(steelSegGeom, steelMat);
      steelSegment.position.copy(steelPoints[i]);
      steelSegment.rotation.z = rotZ;
      stripGroupRef.current.add(steelSegment);
    }
  };

  const handleReset = () => {
    setTemperature([20]);
    setIsAnimating(false);
    targetTempRef.current = 20;
    currentTempRef.current = 20;
    updateStripBend(20);
    setAnnouncement("Strip reset to room temperature");
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
            <Thermometer className="h-5 w-5" />
            Bimetallic Strip - Thermal Expansion
          </span>
          <Badge variant="outline">Physics - Thermal Properties</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize differential thermal expansion in a bimetallic strip
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Temperature: {temperature[0]}°C
            </label>
            <Slider
              value={temperature}
              onValueChange={(val) => {
                setTemperature(val);
                setAnnouncement(`Temperature set to ${val[0]}°C`);
              }}
              min={-20}
              max={150}
              step={5}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-20°C</span>
              <span>Room Temp (20°C)</span>
              <span>150°C</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2">
          <p className="font-semibold">How It Works:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>🟡 <strong>Brass</strong> (top): Higher expansion coefficient (19×10⁻⁶/°C)</li>
            <li>⚪ <strong>Steel</strong> (bottom): Lower expansion coefficient (12×10⁻⁶/°C)</li>
            <li>🔥 When heated: Brass expands more → strip bends downward</li>
            <li>❄️ When cooled: Brass contracts more → strip bends upward</li>
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
                Animate
              </>
            )}
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Thermal Expansion:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Linear expansion: ΔL = L₀ α ΔT</li>
            <li>• α = coefficient of linear expansion</li>
            <li>• Different materials expand differently</li>
            <li>• Bimetallic strip bends toward metal with lower α when heated</li>
            <li>• Applications: Thermostats, fire alarms, thermometers</li>
            <li>• Radius of curvature: R = d/(Δα × ΔT)</li>
            <li>• Brass α ≈ 19×10⁻⁶/°C, Steel α ≈ 12×10⁻⁶/°C</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
