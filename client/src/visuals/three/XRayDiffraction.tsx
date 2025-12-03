
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Atom, RotateCcw, Play, Pause } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function XRayDiffraction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [wavelength, setWavelength] = useState([1.54]); // Angstroms (Cu K-alpha)
  const [dSpacing, setDSpacing] = useState([2.82]); // Angstroms
  const [theta, setTheta] = useState([15]); // degrees
  const [isAnimating, setIsAnimating] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const animationRef = useRef<number | null>(null);

  const lambda = wavelength[0];
  const d = dSpacing[0];
  const thetaRad = (theta[0] * Math.PI) / 180;

  // Bragg's Law: nλ = 2d sinθ
  const n = 1; // First order
  const braggCondition = 2 * d * Math.sin(thetaRad);
  const isBraggSatisfied = Math.abs(braggCondition - n * lambda) < 0.1;
  const calculatedAngle = Math.asin((n * lambda) / (2 * d)) * (180 / Math.PI);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(0, 8, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Crystal lattice planes
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 5; i++) {
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.y = i * d * 0.5 - 4;
      plane.rotation.x = Math.PI / 2;
      scene.add(plane);

      // Atoms on planes
      for (let x = -4; x <= 4; x += 2) {
        for (let z = -4; z <= 4; z += 2) {
          const atomGeometry = new THREE.SphereGeometry(0.3, 16, 16);
          const atomMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
          const atom = new THREE.Mesh(atomGeometry, atomMaterial);
          atom.position.set(x, i * d * 0.5 - 4, z);
          scene.add(atom);
        }
      }
    }

    // Incident X-ray beam
    const incidentStart = new THREE.Vector3(-8, 5, 0);
    const incidentEnd = new THREE.Vector3(0, 5 - 8 * Math.tan(thetaRad), 0);
    const incidentGeometry = new THREE.BufferGeometry().setFromPoints([
      incidentStart,
      incidentEnd,
    ]);
    const incidentMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 3,
    });
    const incidentRay = new THREE.Line(incidentGeometry, incidentMaterial);
    scene.add(incidentRay);

    // Reflected/diffracted beam
    if (isBraggSatisfied) {
      const reflectedStart = incidentEnd;
      const reflectedEnd = new THREE.Vector3(8, 5 - 8 * Math.tan(thetaRad), 0);
      const reflectedGeometry = new THREE.BufferGeometry().setFromPoints([
        reflectedStart,
        reflectedEnd,
      ]);
      const reflectedMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
        linewidth: 3,
      });
      const reflectedRay = new THREE.Line(reflectedGeometry, reflectedMaterial);
      scene.add(reflectedRay);

      // Add glow effect for constructive interference
      const glowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.6,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(incidentEnd);
      scene.add(glow);
    }

    // Normal to the plane
    const normalGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 5 - 8 * Math.tan(thetaRad), 0),
      new THREE.Vector3(0, 5 - 8 * Math.tan(thetaRad) + 3, 0),
    ]);
    const normalMaterial = new THREE.LineDashedMaterial({
      color: 0xffffff,
      dashSize: 0.3,
      gapSize: 0.2,
    });
    const normal = new THREE.Line(normalGeometry, normalMaterial);
    normal.computeLineDistances();
    scene.add(normal);

    // Angle arc
    const arcCurve = new THREE.EllipseCurve(
      0,
      5 - 8 * Math.tan(thetaRad),
      1.5,
      1.5,
      Math.PI / 2 - thetaRad,
      Math.PI / 2,
      false,
      0
    );
    const arcPoints = arcCurve.getPoints(20);
    const arcGeometry = new THREE.BufferGeometry().setFromPoints(
      arcPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const arcMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const arc = new THREE.Line(arcGeometry, arcMaterial);
    scene.add(arc);

    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    // Animation
    let time = 0;
    const animate = () => {
      if (isAnimating) {
        time += 0.01;
        // Pulse the glow if Bragg condition is satisfied
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.material.transparent && obj.geometry.type === "SphereGeometry") {
            if (obj.material.color.getHex() === 0x00ff00) {
              obj.material.opacity = 0.4 + 0.2 * Math.sin(time * 5);
            }
          }
        });
      }
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [wavelength, dSpacing, theta, isAnimating, isBraggSatisfied, thetaRad, d]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    setAnnouncement(isAnimating ? "Animation paused" : "Animation playing");
  };

  const reset = () => {
    setWavelength([1.54]);
    setDSpacing([2.82]);
    setTheta([15]);
    setIsAnimating(false);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Atom className="h-5 w-5" />
            X-ray Diffraction (Bragg's Law)
          </span>
          <Badge variant="outline">Physics - Atoms</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize Bragg's law and crystal diffraction patterns
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-[400px] border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Wavelength (λ): {wavelength[0]} Å
            </label>
            <Slider
              value={wavelength}
              onValueChange={(val) => {
                setWavelength(val);
                setAnnouncement(`Wavelength: ${val[0]} Angstroms`);
              }}
              min={0.5}
              max={3}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              d-spacing: {dSpacing[0]} Å
            </label>
            <Slider
              value={dSpacing}
              onValueChange={(val) => {
                setDSpacing(val);
                setAnnouncement(`D-spacing: ${val[0]} Angstroms`);
              }}
              min={1}
              max={5}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Incident Angle (θ): {theta[0]}°
            </label>
            <Slider
              value={theta}
              onValueChange={(val) => {
                setTheta(val);
                setAnnouncement(`Incident angle: ${val[0]} degrees`);
              }}
              min={5}
              max={45}
              step={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-blue-600">nλ</p>
            <p className="font-mono">{(n * lambda).toFixed(2)} Å</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">2d sinθ</p>
            <p className="font-mono">{braggCondition.toFixed(2)} Å</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">Status</p>
            <p className="font-mono">
              {isBraggSatisfied ? "✓ Diffraction" : "✗ No diffraction"}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">Bragg Angle for Diffraction:</p>
          <p className="font-mono text-blue-600">
            θ = {isFinite(calculatedAngle) ? calculatedAngle.toFixed(2) : "N/A"}°
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
          <p className="font-semibold">NEET Key Points - X-ray Diffraction:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Bragg's Law: nλ = 2d sinθ</li>
            <li>• n = order of diffraction (1, 2, 3...)</li>
            <li>• λ = wavelength of X-rays</li>
            <li>• d = interplanar spacing in crystal</li>
            <li>• θ = angle of incidence (Bragg angle)</li>
            <li>• Constructive interference occurs when Bragg's law is satisfied</li>
            <li>• Used to determine crystal structure</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
