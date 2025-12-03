
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Atom, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";
import { isWebGLAvailable, WebGLUnavailable } from "@/visuals/shared/WebGLCheck";

export default function AtomicSpectrum() {
  // Check WebGL availability first
  if (!isWebGLAvailable()) {
    return <WebGLUnavailable title="Atomic Spectrum Visualization" />;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [energyLevel, setEnergyLevel] = useState([3]); // n = 3 to n = 2 transition
  const [isAnimating, setIsAnimating] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);

  const n = energyLevel[0];
  const wavelength = 1 / (1.097e7 * (1/4 - 1/(n*n))); // Balmer series (n -> 2)
  const wavelengthNm = wavelength * 1e9;
  
  // Color based on wavelength (visible spectrum approximation)
  const getColor = (wl: number) => {
    if (wl < 400) return 0x8b00ff; // Violet
    if (wl < 450) return 0x0000ff; // Blue
    if (wl < 500) return 0x00ffff; // Cyan
    if (wl < 570) return 0x00ff00; // Green
    if (wl < 590) return 0xffff00; // Yellow
    if (wl < 620) return 0xff8800; // Orange
    return 0xff0000; // Red
  };

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        50,
        containerRef.current.clientWidth / 400,
        0.1,
        1000
      );
      camera.position.set(0, 0, 15);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, 400);
      containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Nucleus
    const nucleusGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const nucleusMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    // Energy levels
    const levels = [2, 3, 4, 5, 6];
    levels.forEach((level) => {
      const radius = level * 1.5;
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, p.y, 0))
      );
      const material = new THREE.LineBasicMaterial({
        color: level === 2 || level === n ? 0xffffff : 0x444444,
        transparent: true,
        opacity: level === 2 || level === n ? 1 : 0.3
      });
      const orbit = new THREE.Line(geometry, material);
      scene.add(orbit);

      // Label
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'white';
      ctx.font = '32px Arial';
      ctx.fillText(`n=${level}`, 10, 40);
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(radius + 1, 0, 0);
      sprite.scale.set(1, 1, 1);
      scene.add(sprite);
    });

    // Electron
    const electronGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const electronMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const electron = new THREE.Mesh(electronGeometry, electronMaterial);
    electron.position.set(n * 1.5, 0, 0);
    scene.add(electron);

    // Photon emission
    const photonColor = getColor(wavelengthNm);
    const photonGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const photonMaterial = new THREE.MeshBasicMaterial({ 
      color: photonColor,
      transparent: true,
      opacity: 0
    });
    const photon = new THREE.Mesh(photonGeometry, photonMaterial);
    scene.add(photon);

    // Wave representation
    const wavePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 100; i++) {
      const x = (i / 100) * 10 - 5;
      const y = 0;
      wavePoints.push(new THREE.Vector3(x, y, 0));
    }
    const waveGeometry = new THREE.BufferGeometry().setFromPoints(wavePoints);
    const waveMaterial = new THREE.LineBasicMaterial({ 
      color: photonColor,
      transparent: true,
      opacity: 0
    });
    const wave = new THREE.Line(waveGeometry, waveMaterial);
    wave.position.y = -6;
    scene.add(wave);

    // Animation
    let time = 0;
    let transitionPhase = 0;
    const animate = () => {
      if (isAnimating) {
        time += 0.02;
        transitionPhase = Math.min(transitionPhase + 0.01, 1);

        // Electron transition
        const currentRadius = n * 1.5 - (n - 2) * 1.5 * transitionPhase;
        const angle = time * 2;
        electron.position.x = currentRadius * Math.cos(angle);
        electron.position.y = currentRadius * Math.sin(angle);

        // Photon emission
        if (transitionPhase > 0.5) {
          photonMaterial.opacity = Math.min(1, (transitionPhase - 0.5) * 2);
          photon.position.y = (transitionPhase - 0.5) * 10;
        }

        // Wave visualization
        if (transitionPhase > 0.5) {
          waveMaterial.opacity = Math.min(1, (transitionPhase - 0.5) * 2);
          const newWavePoints: THREE.Vector3[] = [];
          for (let i = 0; i < 100; i++) {
            const x = (i / 100) * 10 - 5;
            const y = Math.sin((i / 100) * 2 * Math.PI * 5 - time * 10) * 0.5;
            newWavePoints.push(new THREE.Vector3(x, y, 0));
          }
          waveGeometry.setFromPoints(newWavePoints);
        }
      } else {
        transitionPhase = 0;
        photonMaterial.opacity = 0;
        waveMaterial.opacity = 0;
        const angle = time * 2;
        electron.position.x = n * 1.5 * Math.cos(angle);
        electron.position.y = n * 1.5 * Math.sin(angle);
      }

      controls.update();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

      const handleResize = () => {
        if (!containerRef.current || !renderer) return;
        camera.aspect = containerRef.current.clientWidth / 400;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, 400);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (renderer) {
          renderer.dispose();
          if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
          }
        }
      };
    } catch (error) {
      console.error('Failed to initialize AtomicSpectrum Three.js scene:', error);
      if (renderer && containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      return () => {};
    }
  }, [energyLevel, isAnimating, n, wavelengthNm]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Transition paused" : "Electron transition started");
  };

  const reset = () => {
    setEnergyLevel([3]);
    setIsAnimating(false);
    setAnnouncement("Reset to n=3 transition");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Atom className="h-5 w-5" />
            Atomic Spectrum (Hydrogen)
          </span>
          <Badge variant="outline">Physics - Atoms</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize electron transitions and photon emission
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-[400px] border rounded-lg overflow-hidden" />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Initial Energy Level (n): {energyLevel[0]} → 2
          </label>
          <Slider
            value={energyLevel}
            onValueChange={(val) => {
              setEnergyLevel(val);
              setAnnouncement(`Transition from n=${val[0]} to n=2`);
            }}
            min={3}
            max={6}
            step={1}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-blue-600">Wavelength</p>
            <p className="font-mono">{wavelengthNm.toFixed(1)} nm</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">Series</p>
            <p className="font-mono">Balmer (visible)</p>
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
                Start Transition
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Atomic Spectra:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Rydberg formula: 1/λ = R(1/n₁² - 1/n₂²)</li>
            <li>• R = 1.097 × 10⁷ m⁻¹ (Rydberg constant)</li>
            <li>• Balmer series: n₁ = 2 (visible light)</li>
            <li>• Lyman series: n₁ = 1 (UV)</li>
            <li>• Paschen series: n₁ = 3 (IR)</li>
            <li>• Energy: E = -13.6/n² eV</li>
            <li>• ΔE = hc/λ (photon energy)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
