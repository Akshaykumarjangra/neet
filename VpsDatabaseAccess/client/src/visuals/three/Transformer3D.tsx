
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Zap, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function Transformer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [primaryTurns, setPrimaryTurns] = useState([20]);
  const [secondaryTurns, setSecondaryTurns] = useState([40]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);

  const turnsRatio = secondaryTurns[0] / primaryTurns[0];
  const voltageRatio = turnsRatio;
  const currentRatio = 1 / turnsRatio;

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4f8);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(8, 6, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Iron core
    const coreGeometry = new THREE.BoxGeometry(6, 4, 0.8);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.7,
      roughness: 0.3,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.castShadow = true;
    core.receiveShadow = true;
    scene.add(core);

    // Primary coil (left side - red)
    const primaryCoilGroup = new THREE.Group();
    const coilRadius = 0.8;
    const coilHeight = 3;
    const primaryWireGeometry = new THREE.TorusGeometry(coilRadius, 0.08, 16, 100);
    const primaryWireMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3333,
      metalness: 0.5,
      roughness: 0.4,
    });

    for (let i = 0; i < primaryTurns[0]; i++) {
      const wire = new THREE.Mesh(primaryWireGeometry, primaryWireMaterial);
      wire.rotation.x = Math.PI / 2;
      wire.position.y = -coilHeight / 2 + (i / primaryTurns[0]) * coilHeight;
      wire.position.x = -2;
      primaryCoilGroup.add(wire);
    }
    scene.add(primaryCoilGroup);

    // Secondary coil (right side - blue)
    const secondaryCoilGroup = new THREE.Group();
    const secondaryWireMaterial = new THREE.MeshStandardMaterial({
      color: 0x3333ff,
      metalness: 0.5,
      roughness: 0.4,
    });

    for (let i = 0; i < secondaryTurns[0]; i++) {
      const wire = new THREE.Mesh(primaryWireGeometry, secondaryWireMaterial);
      wire.rotation.x = Math.PI / 2;
      wire.position.y = -coilHeight / 2 + (i / secondaryTurns[0]) * coilHeight;
      wire.position.x = 2;
      secondaryCoilGroup.add(wire);
    }
    scene.add(secondaryCoilGroup);

    // Magnetic flux lines
    const fluxGroup = new THREE.Group();
    const fluxMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < 8; i++) {
      const points = [];
      const y = -1.5 + (i / 7) * 3;
      points.push(new THREE.Vector3(-2, y, 0));
      points.push(new THREE.Vector3(-1, y, 0));
      points.push(new THREE.Vector3(1, y, 0));
      points.push(new THREE.Vector3(2, y, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, fluxMaterial);
      fluxGroup.add(line);
    }
    scene.add(fluxGroup);

    // Terminals
    const terminalGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const terminalMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });

    // Primary terminals
    const primaryTop = new THREE.Mesh(terminalGeometry, terminalMaterial);
    primaryTop.position.set(-2, 2.5, 0);
    scene.add(primaryTop);

    const primaryBottom = new THREE.Mesh(terminalGeometry, terminalMaterial);
    primaryBottom.position.set(-2, -2.5, 0);
    scene.add(primaryBottom);

    // Secondary terminals
    const secondaryTop = new THREE.Mesh(terminalGeometry, terminalMaterial);
    secondaryTop.position.set(2, 2.5, 0);
    scene.add(secondaryTop);

    const secondaryBottom = new THREE.Mesh(terminalGeometry, terminalMaterial);
    secondaryBottom.position.set(2, -2.5, 0);
    scene.add(secondaryBottom);

    // Labels
    const createLabel = (text: string, position: THREE.Vector3, color: number) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      context.font = 'Bold 32px Arial';
      context.textAlign = 'center';
      context.fillText(text, 128, 40);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(position);
      sprite.scale.set(2, 0.5, 1);
      scene.add(sprite);
    };

    createLabel('PRIMARY', new THREE.Vector3(-2, -3.5, 0), 0xff3333);
    createLabel('SECONDARY', new THREE.Vector3(2, -3.5, 0), 0x3333ff);

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.05;

      if (isAnimating) {
        // Animate flux lines
        fluxGroup.children.forEach((line, index) => {
          const opacity = 0.3 + 0.3 * Math.sin(time + index * 0.3);
          (line as THREE.Line).material.opacity = opacity;
        });

        // Pulse primary coil
        primaryCoilGroup.children.forEach((wire, index) => {
          const scale = 1 + 0.05 * Math.sin(time * 2 + index * 0.1);
          wire.scale.set(scale, scale, scale);
        });

        // Pulse secondary coil
        secondaryCoilGroup.children.forEach((wire, index) => {
          const scale = 1 + 0.05 * Math.sin(time * 2 + index * 0.1 + Math.PI);
          wire.scale.set(scale, scale, scale);
        });
      }

      controls.update();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, 400);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [primaryTurns, secondaryTurns, isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  const reset = () => {
    setPrimaryTurns([20]);
    setSecondaryTurns([40]);
    setIsAnimating(false);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            3D Transformer Model
          </span>
          <Badge variant="outline">Physics - EMI & AC</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive transformer showing electromagnetic induction
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-[400px] border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Primary Turns (Np): {primaryTurns[0]}
            </label>
            <Slider
              value={primaryTurns}
              onValueChange={(val) => {
                setPrimaryTurns(val);
                setAnnouncement(`Primary turns: ${val[0]}`);
              }}
              min={10}
              max={50}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Secondary Turns (Ns): {secondaryTurns[0]}
            </label>
            <Slider
              value={secondaryTurns}
              onValueChange={(val) => {
                setSecondaryTurns(val);
                setAnnouncement(`Secondary turns: ${val[0]}`);
              }}
              min={10}
              max={100}
              step={5}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-blue-600">Turns Ratio</p>
            <p className="font-mono">{turnsRatio.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">Voltage Ratio</p>
            <p className="font-mono">{voltageRatio.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">Current Ratio</p>
            <p className="font-mono">{currentRatio.toFixed(2)}</p>
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
                Animate
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Formulas - Transformer:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Vs/Vp = Ns/Np (voltage ratio)</li>
            <li>• Ip/Is = Ns/Np (current ratio)</li>
            <li>• VpIp = VsIs (ideal transformer)</li>
            <li>• Efficiency η = (Output/Input) × 100%</li>
            <li>• Step-up: Ns &gt; Np, Vs &gt; Vp</li>
            <li>• Step-down: Ns &lt; Np, Vs &lt; Vp</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Transformer Types:</h4>
          <div className="grid gap-2 text-sm bg-muted p-3 rounded">
            <p>• <strong>Step-up:</strong> Increases voltage (Ns &gt; Np) - used in power transmission</p>
            <p>• <strong>Step-down:</strong> Decreases voltage (Ns &lt; Np) - used in power supplies</p>
            <p>• <strong>Isolation:</strong> Same voltage (Ns = Np) - electrical isolation</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
