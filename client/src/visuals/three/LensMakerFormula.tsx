
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Eye, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function LensMakerFormula() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [refractiveIndex, setRefractiveIndex] = useState([1.5]);
  const [radius1, setRadius1] = useState([20]);
  const [radius2, setRadius2] = useState([-20]);
  const [lensType, setLensType] = useState<"convex" | "concave">("convex");
  const [announcement, setAnnouncement] = useState("");

  const n = refractiveIndex[0];
  const R1 = radius1[0];
  const R2 = radius2[0];
  
  // Lens Maker's Formula: 1/f = (n-1)[1/R1 - 1/R2]
  const focalLength = 1 / ((n - 1) * (1 / R1 - 1 / R2));
  const power = 100 / focalLength; // in Diopters (assuming cm)

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(0, 0, 80);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(50, 50, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(-50, -50, 50);
    scene.add(pointLight2);

    // Create lens
    const createLens = () => {
      const lensGroup = new THREE.Group();

      // Determine if convex or concave based on radii
      const isConvex = R1 > 0 && R2 < 0;
      
      // Lens geometry
      const lensHeight = 30;
      const lensWidth = 2;
      
      // Create lens using two spherical segments
      const segments = 64;
      
      // Material for lens
      const lensMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.6,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 2,
        side: THREE.DoubleSide,
      });

      // First surface (left)
      const geometry1 = new THREE.SphereGeometry(
        Math.abs(R1),
        segments,
        segments,
        0,
        Math.PI / 8
      );
      const surface1 = new THREE.Mesh(geometry1, lensMaterial);
      surface1.position.x = -lensWidth / 2;
      if (R1 < 0) surface1.rotation.y = Math.PI;
      lensGroup.add(surface1);

      // Second surface (right)
      const geometry2 = new THREE.SphereGeometry(
        Math.abs(R2),
        segments,
        segments,
        0,
        Math.PI / 8
      );
      const surface2 = new THREE.Mesh(geometry2, lensMaterial);
      surface2.position.x = lensWidth / 2;
      if (R2 > 0) surface2.rotation.y = Math.PI;
      lensGroup.add(surface2);

      // Center disc
      const discGeometry = new THREE.CylinderGeometry(
        lensHeight / 2,
        lensHeight / 2,
        lensWidth,
        32
      );
      const disc = new THREE.Mesh(discGeometry, lensMaterial);
      disc.rotation.z = Math.PI / 2;
      lensGroup.add(disc);

      return lensGroup;
    };

    const lens = createLens();
    scene.add(lens);

    // Principal axis
    const axisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-60, 0, 0),
      new THREE.Vector3(60, 0, 0),
    ]);
    const axisMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const axis = new THREE.Line(axisGeometry, axisMaterial);
    scene.add(axis);

    // Focal points
    const focalPointGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const focalPointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    if (Math.abs(focalLength) < 100) {
      const focalPoint1 = new THREE.Mesh(focalPointGeometry, focalPointMaterial);
      focalPoint1.position.set(focalLength, 0, 0);
      scene.add(focalPoint1);

      const focalPoint2 = new THREE.Mesh(focalPointGeometry, focalPointMaterial);
      focalPoint2.position.set(-focalLength, 0, 0);
      scene.add(focalPoint2);

      // F labels
      const createTextSprite = (text: string) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = 64;
        canvas.height = 64;
        context.fillStyle = "#ff0000";
        context.font = "bold 48px Arial";
        context.textAlign = "center";
        context.fillText(text, 32, 48);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(5, 5, 1);
        return sprite;
      };

      const fLabel1 = createTextSprite("F");
      fLabel1.position.set(focalLength, -3, 0);
      scene.add(fLabel1);

      const fLabel2 = createTextSprite("F");
      fLabel2.position.set(-focalLength, -3, 0);
      scene.add(fLabel2);
    }

    // Light rays
    const drawRay = (start: THREE.Vector3, direction: THREE.Vector3, color: number) => {
      const rayLength = 100;
      const end = start.clone().add(direction.clone().multiplyScalar(rayLength));
      const rayGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      const rayMaterial = new THREE.LineBasicMaterial({ color });
      const ray = new THREE.Line(rayGeometry, rayMaterial);
      scene.add(ray);
      return ray;
    };

    // Parallel ray
    const parallelStart = new THREE.Vector3(-50, 10, 0);
    const parallelDir = new THREE.Vector3(1, 0, 0);
    drawRay(parallelStart, parallelDir, 0xffff00);

    // Ray through center
    const centerStart = new THREE.Vector3(-50, 10, 0);
    const centerDir = new THREE.Vector3(1, -0.2, 0).normalize();
    drawRay(centerStart, centerDir, 0x00ff00);

    // Grid helper
    const gridHelper = new THREE.GridHelper(100, 20, 0x444444, 0x222222);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -10;
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      lens.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [refractiveIndex, radius1, radius2]);

  const reset = () => {
    setRefractiveIndex([1.5]);
    setRadius1([20]);
    setRadius2([-20]);
    setAnnouncement("Reset to default values");
  };

  const switchToConvex = () => {
    setRadius1([20]);
    setRadius2([-20]);
    setLensType("convex");
    setAnnouncement("Switched to convex lens");
  };

  const switchToConcave = () => {
    setRadius1([-20]);
    setRadius2([20]);
    setLensType("concave");
    setAnnouncement("Switched to concave lens");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-500" />
            Lens Maker's Formula - 3D Visualization
          </span>
          <Badge variant="outline">Physics - Ray Optics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive 3D lens with focal length calculation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={containerRef}
          className="w-full h-[400px] border rounded-lg bg-slate-900"
        />

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Refractive Index (n): {refractiveIndex[0].toFixed(2)}
            </label>
            <Slider
              value={refractiveIndex}
              onValueChange={(val) => {
                setRefractiveIndex(val);
                setAnnouncement(`Refractive index: ${val[0].toFixed(2)}`);
              }}
              min={1.2}
              max={2.0}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Radius R₁: {radius1[0]} cm
            </label>
            <Slider
              value={radius1}
              onValueChange={(val) => {
                setRadius1(val);
                setAnnouncement(`Radius R1: ${val[0]} cm`);
              }}
              min={-50}
              max={50}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Radius R₂: {radius2[0]} cm
            </label>
            <Slider
              value={radius2}
              onValueChange={(val) => {
                setRadius2(val);
                setAnnouncement(`Radius R2: ${val[0]} cm`);
              }}
              min={-50}
              max={50}
              step={5}
            />
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Focal Length (f)</p>
            <p className="text-2xl font-bold text-blue-600">
              {focalLength.toFixed(2)} cm
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Power (P)</p>
            <p className="text-2xl font-bold text-green-600">
              {power.toFixed(2)} D
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={switchToConvex} variant={lensType === "convex" ? "default" : "outline"} className="flex-1">
            Convex Lens
          </Button>
          <Button onClick={switchToConcave} variant={lensType === "concave" ? "default" : "outline"} className="flex-1">
            Concave Lens
          </Button>
          <Button onClick={reset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Lens Maker's Formula:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• 1/f = (n-1)[1/R₁ - 1/R₂]</li>
            <li>• f = focal length</li>
            <li>• n = refractive index of lens material</li>
            <li>• R₁, R₂ = radii of curvature</li>
            <li>• Power P = 1/f (in meters) = 100/f (in cm)</li>
            <li>• Convex: f {'>'} 0 (converging)</li>
            <li>• Concave: f {'<'} 0 (diverging)</li>
            <li>• Sign convention: distances measured from lens center</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded space-y-1 text-sm">
            <p className="font-semibold">Convex Lens (R₁ {'>'} 0, R₂ {'<'} 0):</p>
            <p className="text-muted-foreground">• f is positive</p>
            <p className="text-muted-foreground">• Converging lens</p>
            <p className="text-muted-foreground">• Forms real/virtual images</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded space-y-1 text-sm">
            <p className="font-semibold">Concave Lens (R₁ {'<'} 0, R₂ {'>'} 0):</p>
            <p className="text-muted-foreground">• f is negative</p>
            <p className="text-muted-foreground">• Diverging lens</p>
            <p className="text-muted-foreground">• Forms virtual images only</p>
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
