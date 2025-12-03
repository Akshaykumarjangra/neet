
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Eye, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function RayOptics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [lensType, setLensType] = useState<"convex" | "concave">("convex");
  const [focalLength, setFocalLength] = useState([5]);
  const [objectDistance, setObjectDistance] = useState([10]);
  const [announcement, setAnnouncement] = useState("");

  const f = focalLength[0];
  const u = -objectDistance[0]; // Object distance is negative in sign convention
  const v = (f * u) / (u - f); // Lens formula: 1/f = 1/v - 1/u
  const magnification = v / u;
  const imageHeight = magnification * 2; // Object height assumed as 2 units

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
    camera.position.set(0, 10, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Principal axis
    const axisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-15, 0, 0),
      new THREE.Vector3(15, 0, 0),
    ]);
    const axisMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });
    const axis = new THREE.Line(axisGeometry, axisMaterial);
    scene.add(axis);

    // Lens at origin
    const lensGeometry = new THREE.PlaneGeometry(0.2, 8);
    const lensMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    scene.add(lens);

    // Focal points
    const focalPointGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const focalPointMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const focalPoint1 = new THREE.Mesh(focalPointGeometry, focalPointMaterial);
    focalPoint1.position.set(f, 0, 0);
    scene.add(focalPoint1);
    const focalPoint2 = new THREE.Mesh(focalPointGeometry, focalPointMaterial);
    focalPoint2.position.set(-f, 0, 0);
    scene.add(focalPoint2);

    // Object (arrow)
    const objectGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(u, 0, 0),
      new THREE.Vector3(u, 2, 0),
    ]);
    const objectMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 3 });
    const object = new THREE.Line(objectGeometry, objectMaterial);
    scene.add(object);

    // Arrow tip for object
    const arrowGeometry = new THREE.ConeGeometry(0.3, 0.5, 8);
    const arrowMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const objectArrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
    objectArrow.position.set(u, 2.25, 0);
    objectArrow.rotation.z = Math.PI;
    scene.add(objectArrow);

    // Image (if real)
    if (v !== Infinity && !isNaN(v)) {
      const imageGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(v, 0, 0),
        new THREE.Vector3(v, imageHeight, 0),
      ]);
      const imageColor = imageHeight > 0 ? 0xff00ff : 0x00ff00;
      const imageMaterial = new THREE.LineBasicMaterial({
        color: imageColor,
        linewidth: 3,
      });
      const image = new THREE.Line(imageGeometry, imageMaterial);
      scene.add(image);

      const imageArrow = new THREE.Mesh(arrowGeometry, new THREE.MeshPhongMaterial({ color: imageColor }));
      imageArrow.position.set(v, imageHeight > 0 ? imageHeight + 0.25 : imageHeight - 0.25, 0);
      imageArrow.rotation.z = imageHeight > 0 ? Math.PI : 0;
      scene.add(imageArrow);
    }

    // Ray 1: Parallel to axis, passes through focal point
    const ray1Points = [];
    ray1Points.push(new THREE.Vector3(u, 2, 0));
    ray1Points.push(new THREE.Vector3(0, 2, 0));
    if (lensType === "convex") {
      ray1Points.push(new THREE.Vector3(15, 2 - (15 / f) * 2, 0));
    } else {
      ray1Points.push(new THREE.Vector3(15, 2 + (15 / f) * 2, 0));
    }
    const ray1Geometry = new THREE.BufferGeometry().setFromPoints(ray1Points);
    const ray1Material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const ray1 = new THREE.Line(ray1Geometry, ray1Material);
    scene.add(ray1);

    // Ray 2: Through optical center (straight)
    const ray2Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(u, 2, 0),
      new THREE.Vector3(15, 2 * (15 / u), 0),
    ]);
    const ray2Material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const ray2 = new THREE.Line(ray2Geometry, ray2Material);
    scene.add(ray2);

    // Ray 3: Through focal point, emerges parallel
    const ray3Points = [];
    ray3Points.push(new THREE.Vector3(u, 2, 0));
    if (lensType === "convex") {
      ray3Points.push(new THREE.Vector3(-f, 0, 0));
    } else {
      ray3Points.push(new THREE.Vector3(f, 0, 0));
    }
    ray3Points.push(new THREE.Vector3(0, 2 * (f / u), 0));
    ray3Points.push(new THREE.Vector3(15, 2 * (f / u), 0));
    const ray3Geometry = new THREE.BufferGeometry().setFromPoints(ray3Points);
    const ray3Material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const ray3 = new THREE.Line(ray3Geometry, ray3Material);
    scene.add(ray3);

    // Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x222222);
    gridHelper.position.y = -4;
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
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
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [lensType, focalLength, objectDistance, f, u, v, imageHeight]);

  const reset = () => {
    setLensType("convex");
    setFocalLength([5]);
    setObjectDistance([10]);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Ray Optics - Lens
          </span>
          <Badge variant="outline">Physics - Ray Optics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualize image formation by convex and concave lenses
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-[400px] border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={lensType === "convex" ? "default" : "outline"}
              onClick={() => {
                setLensType("convex");
                setAnnouncement("Switched to convex lens");
              }}
              className="flex-1"
            >
              Convex Lens
            </Button>
            <Button
              variant={lensType === "concave" ? "default" : "outline"}
              onClick={() => {
                setLensType("concave");
                setAnnouncement("Switched to concave lens");
              }}
              className="flex-1"
            >
              Concave Lens
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Focal Length (f): {focalLength[0]} cm</label>
            <Slider
              value={focalLength}
              onValueChange={(val) => {
                setFocalLength(val);
                setAnnouncement(`Focal length: ${val[0]} cm`);
              }}
              min={3}
              max={10}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Object Distance (u): {objectDistance[0]} cm
            </label>
            <Slider
              value={objectDistance}
              onValueChange={(val) => {
                setObjectDistance(val);
                setAnnouncement(`Object distance: ${val[0]} cm`);
              }}
              min={3}
              max={20}
              step={0.5}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
          <div>
            <p className="font-semibold text-blue-600">Image Distance (v)</p>
            <p className="font-mono">{isFinite(v) ? v.toFixed(2) : "∞"} cm</p>
          </div>
          <div>
            <p className="font-semibold text-green-600">Magnification (m)</p>
            <p className="font-mono">{isFinite(magnification) ? magnification.toFixed(2) : "∞"}</p>
          </div>
          <div>
            <p className="font-semibold text-orange-600">Image Nature</p>
            <p className="font-mono">
              {v > 0 ? "Real, Inverted" : "Virtual, Erect"}
            </p>
          </div>
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Lenses:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Lens formula: 1/f = 1/v - 1/u</li>
            <li>• Magnification: m = v/u = h'/h</li>
            <li>• Power: P = 1/f (in meters), unit: Diopter (D)</li>
            <li>• Convex: f &gt; 0, Concave: f &lt; 0</li>
            <li>• Real image: v &gt; 0, Virtual: v &lt; 0</li>
            <li>• Combined lenses: P = P₁ + P₂</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
