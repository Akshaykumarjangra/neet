
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Radio, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function EMWave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [frequency, setFrequency] = useState([2]);
  const [amplitude, setAmplitude] = useState([1]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);

  const wavelength = 10 / frequency[0];
  const period = 1 / frequency[0];

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(15, 10, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Propagation direction (x-axis)
    const arrowHelper = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-10, 0, 0),
      20,
      0xffffff,
      2,
      1
    );
    scene.add(arrowHelper);

    // Electric field (E) - oscillates in y direction (blue)
    const eFieldPoints: THREE.Vector3[] = [];
    const numPoints = 100;
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * 20 - 10;
      eFieldPoints.push(new THREE.Vector3(x, 0, 0));
    }
    const eFieldGeometry = new THREE.BufferGeometry().setFromPoints(eFieldPoints);
    const eFieldMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 });
    const eFieldLine = new THREE.Line(eFieldGeometry, eFieldMaterial);
    scene.add(eFieldLine);

    // Magnetic field (B) - oscillates in z direction (red)
    const bFieldPoints: THREE.Vector3[] = [];
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * 20 - 10;
      bFieldPoints.push(new THREE.Vector3(x, 0, 0));
    }
    const bFieldGeometry = new THREE.BufferGeometry().setFromPoints(bFieldPoints);
    const bFieldMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
    const bFieldLine = new THREE.Line(bFieldGeometry, bFieldMaterial);
    scene.add(bFieldLine);

    // E-field vectors
    const eVectors: THREE.ArrowHelper[] = [];
    for (let i = 0; i < 20; i++) {
      const x = (i / 20) * 20 - 10;
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(x, 0, 0),
        1,
        0x00ffff,
        0.3,
        0.2
      );
      eVectors.push(arrow);
      scene.add(arrow);
    }

    // B-field vectors
    const bVectors: THREE.ArrowHelper[] = [];
    for (let i = 0; i < 20; i++) {
      const x = (i / 20) * 20 - 10;
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(x, 0, 0),
        1,
        0xff0000,
        0.3,
        0.2
      );
      bVectors.push(arrow);
      scene.add(arrow);
    }

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

    createLabel('E (Electric)', new THREE.Vector3(-10, 3, 0), 0x00ffff);
    createLabel('B (Magnetic)', new THREE.Vector3(-10, 0, 3), 0xff0000);
    createLabel('Propagation →', new THREE.Vector3(0, -2, 0), 0xffffff);

    // Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x222222);
    gridHelper.position.y = -3;
    scene.add(gridHelper);

    // Animation
    let time = 0;
    const animate = () => {
      if (isAnimating) {
        time += 0.02 * frequency[0];
      }

      // Update E-field curve
      const ePositions = eFieldGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < numPoints; i++) {
        const x = (i / numPoints) * 20 - 10;
        const k = (2 * Math.PI) / wavelength;
        const omega = 2 * Math.PI * frequency[0];
        const y = amplitude[0] * Math.sin(k * x - omega * time);
        ePositions[i * 3 + 1] = y;
      }
      eFieldGeometry.attributes.position.needsUpdate = true;

      // Update B-field curve
      const bPositions = bFieldGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < numPoints; i++) {
        const x = (i / numPoints) * 20 - 10;
        const k = (2 * Math.PI) / wavelength;
        const omega = 2 * Math.PI * frequency[0];
        const z = amplitude[0] * Math.sin(k * x - omega * time);
        bPositions[i * 3 + 2] = z;
      }
      bFieldGeometry.attributes.position.needsUpdate = true;

      // Update E-field vectors
      eVectors.forEach((arrow, i) => {
        const x = (i / 20) * 20 - 10;
        const k = (2 * Math.PI) / wavelength;
        const omega = 2 * Math.PI * frequency[0];
        const y = amplitude[0] * Math.sin(k * x - omega * time);
        arrow.setDirection(new THREE.Vector3(0, y > 0 ? 1 : -1, 0));
        arrow.setLength(Math.abs(y), 0.3, 0.2);
      });

      // Update B-field vectors
      bVectors.forEach((arrow, i) => {
        const x = (i / 20) * 20 - 10;
        const k = (2 * Math.PI) / wavelength;
        const omega = 2 * Math.PI * frequency[0];
        const z = amplitude[0] * Math.sin(k * x - omega * time);
        arrow.setDirection(new THREE.Vector3(0, 0, z > 0 ? 1 : -1));
        arrow.setLength(Math.abs(z), 0.3, 0.2);
      });

      controls.update();
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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [frequency, amplitude, isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  const reset = () => {
    setFrequency([2]);
    setAmplitude([1]);
    setIsAnimating(true);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            3D Electromagnetic Wave
          </span>
          <Badge variant="outline">Physics - EM Waves</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize E and B field oscillations perpendicular to propagation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-[400px] border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Frequency (f): {frequency[0]} Hz
            </label>
            <Slider
              value={frequency}
              onValueChange={(val) => {
                setFrequency(val);
                setAnnouncement(`Frequency: ${val[0]} Hz, wavelength: ${(10/val[0]).toFixed(2)} m`);
              }}
              min={1}
              max={5}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Amplitude (A): {amplitude[0]} units
            </label>
            <Slider
              value={amplitude}
              onValueChange={(val) => {
                setAmplitude(val);
                setAnnouncement(`Amplitude: ${val[0]} units`);
              }}
              min={0.5}
              max={2}
              step={0.1}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-cyan-600">Wavelength (λ)</p>
            <p className="font-mono">{wavelength.toFixed(2)} m</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">Period (T)</p>
            <p className="font-mono">{period.toFixed(2)} s</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">Speed (c)</p>
            <p className="font-mono">3×10⁸ m/s</p>
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
          <p className="font-semibold">NEET Key Points - EM Waves:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• E ⊥ B ⊥ propagation direction</li>
            <li>• c = 1/√(μ₀ε₀) = 3×10⁸ m/s</li>
            <li>• c = fλ (wave equation)</li>
            <li>• E/B = c (field ratio)</li>
            <li>• Energy density: u = ½ε₀E² + B²/(2μ₀)</li>
            <li>• Intensity: I = ½ε₀cE₀²</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">EM Spectrum:</h4>
          <div className="grid gap-2 text-sm bg-muted p-3 rounded">
            <p>• <strong>Radio:</strong> λ &gt; 0.1 m (f &lt; 3 GHz)</p>
            <p>• <strong>Microwave:</strong> 1 mm - 0.1 m</p>
            <p>• <strong>Infrared:</strong> 700 nm - 1 mm</p>
            <p>• <strong>Visible:</strong> 400-700 nm (VIBGYOR)</p>
            <p>• <strong>UV:</strong> 10-400 nm</p>
            <p>• <strong>X-rays:</strong> 0.01-10 nm</p>
            <p>• <strong>Gamma:</strong> λ &lt; 0.01 nm</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
