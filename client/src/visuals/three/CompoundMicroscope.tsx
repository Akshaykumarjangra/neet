
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Eye, RotateCcw } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

export default function CompoundMicroscope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [objectiveFL, setObjectiveFL] = useState([2]);
  const [eyepieceFL, setEyepieceFL] = useState([5]);
  const [tubeLength, setTubeLength] = useState([20]);
  const [announcement, setAnnouncement] = useState("");

  const fo = objectiveFL[0];
  const fe = eyepieceFL[0];
  const L = tubeLength[0];

  // Calculate magnification: M = (L/fo) × (D/fe) where D = 25 cm
  const D = 25;
  const mo = L / fo;
  const me = D / fe;
  const totalMagnification = mo * me;

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(0, 10, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Optical axis
    const axisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(L + 5, 0, 0),
    ]);
    const axisMaterial = new THREE.LineDashedMaterial({
      color: 0x999999,
      dashSize: 0.5,
      gapSize: 0.3,
    });
    const axis = new THREE.Line(axisGeometry, axisMaterial);
    axis.computeLineDistances();
    scene.add(axis);

    // Objective lens
    const objectiveLens = createLens(fo, 0x3b82f6);
    objectiveLens.position.x = 0;
    scene.add(objectiveLens);

    // Eyepiece lens
    const eyepieceLens = createLens(fe, 0x10b981);
    eyepieceLens.position.x = L;
    scene.add(eyepieceLens);

    // Object (specimen)
    const objectGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-fo - 2, 0, 0),
      new THREE.Vector3(-fo - 2, 1, 0),
    ]);
    const objectMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 3 });
    const object = new THREE.Line(objectGeometry, objectMaterial);
    scene.add(object);

    // Arrow for object
    const arrowGeometry = new THREE.ConeGeometry(0.2, 0.4, 8);
    const arrowMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const objectArrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
    objectArrow.position.set(-fo - 2, 1.2, 0);
    objectArrow.rotation.z = Math.PI;
    scene.add(objectArrow);

    // Tube
    const tubeGeometry = new THREE.CylinderGeometry(1.5, 1.5, L, 32);
    const tubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.3,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tube.rotation.z = Math.PI / 2;
    tube.position.x = L / 2;
    scene.add(tube);

    // Labels
    createLabel(scene, "Objective", new THREE.Vector3(0, -3, 0), 0x3b82f6);
    createLabel(scene, "Eyepiece", new THREE.Vector3(L, -3, 0), 0x10b981);
    createLabel(scene, "Object", new THREE.Vector3(-fo - 2, -2, 0), 0xff0000);

    // Grid
    const gridHelper = new THREE.GridHelper(40, 40, 0xcccccc, 0xeeeeee);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [objectiveFL, eyepieceFL, tubeLength, fo, fe, L]);

  function createLens(focalLength: number, color: number): THREE.Group {
    const group = new THREE.Group();
    
    const lensGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 32);
    const lensMaterial = new THREE.MeshPhongMaterial({
      color,
      transparent: true,
      opacity: 0.5,
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.rotation.z = Math.PI / 2;
    group.add(lens);

    // Focal points
    const focalGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const focalMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    
    const focal1 = new THREE.Mesh(focalGeometry, focalMaterial);
    focal1.position.x = focalLength;
    group.add(focal1);
    
    const focal2 = new THREE.Mesh(focalGeometry, focalMaterial);
    focal2.position.x = -focalLength;
    group.add(focal2);

    return group;
  }

  function createLabel(scene: THREE.Scene, text: string, position: THREE.Vector3, color: number) {
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
  }

  const reset = () => {
    setObjectiveFL([2]);
    setEyepieceFL([5]);
    setTubeLength([20]);
    setAnnouncement("Reset to default values");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Compound Microscope
          </span>
          <Badge variant="outline">Physics - Ray Optics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust focal lengths and tube length to see magnification changes
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="w-full h-[400px] border rounded-lg overflow-hidden" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Objective Focal Length (f₀): {objectiveFL[0]} cm
            </label>
            <Slider
              value={objectiveFL}
              onValueChange={(val) => {
                setObjectiveFL(val);
                setAnnouncement(`Objective focal length: ${val[0]} cm`);
              }}
              min={1}
              max={5}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Eyepiece Focal Length (fₑ): {eyepieceFL[0]} cm
            </label>
            <Slider
              value={eyepieceFL}
              onValueChange={(val) => {
                setEyepieceFL(val);
                setAnnouncement(`Eyepiece focal length: ${val[0]} cm`);
              }}
              min={2}
              max={10}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Tube Length (L): {tubeLength[0]} cm
            </label>
            <Slider
              value={tubeLength}
              onValueChange={(val) => {
                setTubeLength(val);
                setAnnouncement(`Tube length: ${val[0]} cm`);
              }}
              min={10}
              max={30}
              step={1}
            />
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Objective Magnification</p>
            <p className="text-2xl font-bold text-blue-600">{mo.toFixed(1)}×</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Magnification</p>
            <p className="text-2xl font-bold text-green-600">{totalMagnification.toFixed(1)}×</p>
          </div>
        </div>

        <Button onClick={reset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Compound Microscope:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• m = mₒ × mₑ (total magnification)</li>
            <li>• mₒ = L/fₒ (objective magnification)</li>
            <li>• mₑ = D/fₑ (eyepiece magnification, D = 25 cm)</li>
            <li>• Object placed just beyond fₒ of objective</li>
            <li>• Image by objective acts as object for eyepiece</li>
            <li>• Final image: inverted, virtual, magnified</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
