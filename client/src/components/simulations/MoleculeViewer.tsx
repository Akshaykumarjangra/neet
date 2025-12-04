import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface AtomData {
  element: string;
  color: number;
  radius: number;
  position: [number, number, number];
}

interface BondData {
  from: number;
  to: number;
  order: number;
}

interface MoleculeData {
  name: string;
  formula: string;
  atoms: AtomData[];
  bonds: BondData[];
  bondAngles?: string[];
  bondLengths?: string[];
  description: string;
}

const molecules: Record<string, MoleculeData> = {
  H2O: {
    name: "Water",
    formula: "H₂O",
    atoms: [
      { element: "O", color: 0xff0000, radius: 0.6, position: [0, 0, 0] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [-0.96, 0.55, 0] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [0.96, 0.55, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
    ],
    bondAngles: ["H-O-H: 104.5°"],
    bondLengths: ["O-H: 0.96 Å"],
    description: "Water molecule with bent structure due to lone pairs",
  },
  CO2: {
    name: "Carbon Dioxide",
    formula: "CO₂",
    atoms: [
      { element: "C", color: 0x333333, radius: 0.5, position: [0, 0, 0] },
      { element: "O", color: 0xff0000, radius: 0.6, position: [-1.2, 0, 0] },
      { element: "O", color: 0xff0000, radius: 0.6, position: [1.2, 0, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
    ],
    bondAngles: ["O-C-O: 180°"],
    bondLengths: ["C=O: 1.16 Å"],
    description: "Linear molecule with double bonds",
  },
  CH4: {
    name: "Methane",
    formula: "CH₄",
    atoms: [
      { element: "C", color: 0x333333, radius: 0.5, position: [0, 0, 0] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [0.63, 0.63, 0.63] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [-0.63, -0.63, 0.63] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [-0.63, 0.63, -0.63] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [0.63, -0.63, -0.63] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
    bondAngles: ["H-C-H: 109.5°"],
    bondLengths: ["C-H: 1.09 Å"],
    description: "Tetrahedral geometry - sp³ hybridization",
  },
  NH3: {
    name: "Ammonia",
    formula: "NH₃",
    atoms: [
      { element: "N", color: 0x3050f8, radius: 0.55, position: [0, 0.3, 0] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [0.94, -0.25, 0] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [-0.47, -0.25, 0.82] },
      { element: "H", color: 0xffffff, radius: 0.35, position: [-0.47, -0.25, -0.82] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
    ],
    bondAngles: ["H-N-H: 107°"],
    bondLengths: ["N-H: 1.01 Å"],
    description: "Trigonal pyramidal geometry with one lone pair",
  },
  C6H12O6: {
    name: "Glucose",
    formula: "C₆H₁₂O₆",
    atoms: [
      { element: "C", color: 0x333333, radius: 0.4, position: [0, 0, 0] },
      { element: "C", color: 0x333333, radius: 0.4, position: [1.2, 0.5, 0] },
      { element: "C", color: 0x333333, radius: 0.4, position: [2.4, 0, 0] },
      { element: "C", color: 0x333333, radius: 0.4, position: [3.6, 0.5, 0] },
      { element: "C", color: 0x333333, radius: 0.4, position: [4.8, 0, 0] },
      { element: "C", color: 0x333333, radius: 0.4, position: [6.0, 0.5, 0] },
      { element: "O", color: 0xff0000, radius: 0.45, position: [-0.5, -0.8, 0] },
      { element: "O", color: 0xff0000, radius: 0.45, position: [1.2, 1.5, 0] },
      { element: "O", color: 0xff0000, radius: 0.45, position: [2.4, -1, 0] },
      { element: "O", color: 0xff0000, radius: 0.45, position: [3.6, 1.5, 0] },
      { element: "O", color: 0xff0000, radius: 0.45, position: [4.8, -1, 0] },
      { element: "O", color: 0xff0000, radius: 0.45, position: [6.5, 1.3, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 4, to: 5, order: 1 },
      { from: 0, to: 6, order: 2 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 4, to: 10, order: 1 },
      { from: 5, to: 11, order: 1 },
    ],
    bondAngles: ["C-C-C: ~109°"],
    bondLengths: ["C-C: 1.54 Å", "C-O: 1.43 Å", "C=O: 1.23 Å"],
    description: "Simple sugar (monosaccharide) - open chain form",
  },
};

const elementInfo: Record<string, { name: string; atomicNumber: number; mass: number }> = {
  H: { name: "Hydrogen", atomicNumber: 1, mass: 1.008 },
  C: { name: "Carbon", atomicNumber: 6, mass: 12.011 },
  N: { name: "Nitrogen", atomicNumber: 7, mass: 14.007 },
  O: { name: "Oxygen", atomicNumber: 8, mass: 15.999 },
};

export default function MoleculeViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number>();

  const [selectedMolecule, setSelectedMolecule] = useState<string>("H2O");
  const [showLabels, setShowLabels] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [hoveredAtom, setHoveredAtom] = useState<string | null>(null);
  const [zoom, setZoom] = useState(5);

  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const createMolecule = useCallback((moleculeKey: string) => {
    if (!sceneRef.current || !moleculeGroupRef.current) return;

    while (moleculeGroupRef.current.children.length > 0) {
      moleculeGroupRef.current.remove(moleculeGroupRef.current.children[0]);
    }

    const moleculeData = molecules[moleculeKey];
    const group = moleculeGroupRef.current;

    moleculeData.atoms.forEach((atom, index) => {
      const geometry = new THREE.SphereGeometry(atom.radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: atom.color,
        shininess: 100,
        specular: 0x444444,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(...atom.position);
      sphere.userData = { element: atom.element, index };
      group.add(sphere);

      if (showLabels) {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "rgba(0,0,0,0.7)";
          ctx.beginPath();
          ctx.arc(32, 32, 28, 0, 2 * Math.PI);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 32px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(atom.element, 32, 32);
        }
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(atom.position[0], atom.position[1] + atom.radius + 0.3, atom.position[2]);
        sprite.scale.set(0.5, 0.5, 1);
        group.add(sprite);
      }
    });

    moleculeData.bonds.forEach((bond) => {
      const startAtom = moleculeData.atoms[bond.from];
      const endAtom = moleculeData.atoms[bond.to];
      const start = new THREE.Vector3(...startAtom.position);
      const end = new THREE.Vector3(...endAtom.position);
      const direction = new THREE.Vector3().subVectors(end, start);
      const length = direction.length();

      const bondRadius = 0.08;
      const bondGeometry = new THREE.CylinderGeometry(bondRadius, bondRadius, length, 8);
      const bondMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, shininess: 50 });

      if (bond.order === 2) {
        const offset = 0.1;
        [-1, 1].forEach((dir) => {
          const cylinder = new THREE.Mesh(bondGeometry, bondMaterial);
          cylinder.position.copy(start).add(direction.clone().multiplyScalar(0.5));
          cylinder.position.x += dir * offset;
          cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
          group.add(cylinder);
        });
      } else {
        const cylinder = new THREE.Mesh(bondGeometry, bondMaterial);
        cylinder.position.copy(start).add(direction.clone().multiplyScalar(0.5));
        cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
        group.add(cylinder);
      }
    });

    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.sub(center);
  }, [showLabels]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = zoom;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    const moleculeGroup = new THREE.Group();
    moleculeGroupRef.current = moleculeGroup;
    scene.add(moleculeGroup);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (autoRotate && moleculeGroupRef.current) {
        moleculeGroupRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !moleculeGroupRef.current) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      moleculeGroupRef.current.rotation.y += deltaX * 0.01;
      moleculeGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const newZoom = Math.max(2, Math.min(15, cameraRef.current.position.z + e.deltaY * 0.01));
      cameraRef.current.position.z = newZoom;
      setZoom(newZoom);
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("mouseleave", handleMouseUp);
    renderer.domElement.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("mouseleave", handleMouseUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    createMolecule(selectedMolecule);
  }, [selectedMolecule, showLabels, createMolecule]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoom;
    }
  }, [zoom]);

  const resetView = useCallback(() => {
    if (moleculeGroupRef.current) {
      moleculeGroupRef.current.rotation.set(0, 0, 0);
    }
    setZoom(5);
  }, []);

  const currentMolecule = molecules[selectedMolecule];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full" data-testid="simulation-molecule-viewer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                3D Molecule Viewer
                <Badge variant="outline">Chemistry - Molecular Structure</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Explore molecular structures in 3D
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInstructions(!showInstructions)}
              data-testid="button-toggle-instructions"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
            >
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                How to use this viewer:
              </h4>
              <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                <li>• Select a molecule from the dropdown menu</li>
                <li>• Click and drag to rotate the molecule manually</li>
                <li>• Use mouse wheel or zoom buttons to zoom in/out</li>
                <li>• Toggle auto-rotation on/off for continuous spinning</li>
                <li>• Show/hide atom labels for clearer visualization</li>
              </ul>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedMolecule} onValueChange={setSelectedMolecule}>
                <SelectTrigger data-testid="select-molecule">
                  <SelectValue placeholder="Select molecule" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(molecules).map(([key, mol]) => (
                    <SelectItem key={key} value={key}>
                      {mol.name} ({mol.formula})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="auto-rotate"
                  checked={autoRotate}
                  onCheckedChange={setAutoRotate}
                  data-testid="switch-auto-rotate"
                />
                <Label htmlFor="auto-rotate" className="text-sm">Auto Rotate</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="show-labels"
                  checked={showLabels}
                  onCheckedChange={setShowLabels}
                  data-testid="switch-show-labels"
                />
                <Label htmlFor="show-labels" className="text-sm">Labels</Label>
              </div>
            </div>
          </div>

          <div
            ref={containerRef}
            className="w-full h-[400px] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
            data-testid="container-3d-viewer"
          />

          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom((z) => Math.min(15, z + 1))}
              data-testid="button-zoom-out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetView}
              data-testid="button-reset-view"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom((z) => Math.max(2, z - 1))}
              data-testid="button-zoom-in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{currentMolecule.name}</h4>
              <p className="text-2xl font-mono mb-2">{currentMolecule.formula}</p>
              <p className="text-sm text-muted-foreground">{currentMolecule.description}</p>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              {currentMolecule.bondAngles && currentMolecule.bondAngles.length > 0 && (
                <div>
                  <p className="text-sm font-medium">Bond Angles:</p>
                  <ul className="text-sm text-muted-foreground">
                    {currentMolecule.bondAngles.map((angle, i) => (
                      <li key={i}>{angle}</li>
                    ))}
                  </ul>
                </div>
              )}
              {currentMolecule.bondLengths && currentMolecule.bondLengths.length > 0 && (
                <div>
                  <p className="text-sm font-medium">Bond Lengths:</p>
                  <ul className="text-sm text-muted-foreground">
                    {currentMolecule.bondLengths.map((length, i) => (
                      <li key={i}>{length}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Element Legend</h4>
            <div className="flex flex-wrap gap-4">
              {Object.entries(elementInfo).map(([symbol, info]) => (
                <div
                  key={symbol}
                  className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-3 py-1 rounded-full"
                >
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{
                      backgroundColor:
                        symbol === "H"
                          ? "#ffffff"
                          : symbol === "C"
                          ? "#333333"
                          : symbol === "N"
                          ? "#3050f8"
                          : "#ff0000",
                    }}
                  />
                  <span className="text-sm font-medium">{symbol}</span>
                  <span className="text-xs text-muted-foreground">{info.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
