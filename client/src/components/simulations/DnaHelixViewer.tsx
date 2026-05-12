import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function DnaHelixViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Animation refs
  const dnaGroupRef = useRef<THREE.Group>();
  const requestRef = useRef<number>();
  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed[0]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    speedRef.current = speed[0];
  }, [isPlaying, speed]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Light slate background for biology

    const width = mountRef.current.clientWidth;
    const height = 500;
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 40);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // @ts-ignore
    controls.autoRotate = false; // We handle rotation manually

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(10, 20, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-10, -20, -20);
    scene.add(dirLight2);

    // Build DNA Double Helix
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);
    dnaGroupRef.current = dnaGroup;

    const basePairs = 40;
    const radius = 3;
    const heightStep = 1.2;
    const angleStep = 0.4; // Twist per base pair

    // Colors for bases (A-T, C-G)
    const baseColors = [
      { c1: 0xff4444, c2: 0x4444ff }, // A-T (Red-Blue)
      { c1: 0x44ff44, c2: 0xffff44 }, // C-G (Green-Yellow)
    ];

    const sphereGeom = new THREE.SphereGeometry(0.5, 32, 32);
    const cylinderGeom = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
    
    // Backbone materials
    const backboneMat1 = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.3, roughness: 0.4 });
    const backboneMat2 = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.3, roughness: 0.4 });

    for (let i = 0; i < basePairs; i++) {
      const y = (i - basePairs / 2) * heightStep;
      const angle = i * angleStep;

      // Strand 1 Backbone
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const node1 = new THREE.Mesh(sphereGeom, backboneMat1);
      node1.position.set(x1, y, z1);
      dnaGroup.add(node1);

      // Strand 2 Backbone
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      const node2 = new THREE.Mesh(sphereGeom, backboneMat2);
      node2.position.set(x2, y, z2);
      dnaGroup.add(node2);

      // Randomly pick A-T or C-G pair
      const pairType = Math.random() > 0.5 ? 0 : 1;
      const flip = Math.random() > 0.5; // A-T or T-A
      
      const matBase1 = new THREE.MeshStandardMaterial({ color: flip ? baseColors[pairType].c1 : baseColors[pairType].c2 });
      const matBase2 = new THREE.MeshStandardMaterial({ color: !flip ? baseColors[pairType].c1 : baseColors[pairType].c2 });

      // Connection cylinder base 1
      const link1 = new THREE.Mesh(cylinderGeom, matBase1);
      link1.scale.set(1, radius, 1);
      link1.position.set(x1 / 2, y, z1 / 2);
      link1.lookAt(x2, y, z2);
      link1.rotateX(Math.PI / 2);
      dnaGroup.add(link1);

      // Connection cylinder base 2
      const link2 = new THREE.Mesh(cylinderGeom, matBase2);
      link2.scale.set(1, radius, 1);
      link2.position.set(x2 / 2, y, z2 / 2);
      link2.lookAt(x1, y, z1);
      link2.rotateX(Math.PI / 2);
      dnaGroup.add(link2);
    }

    // Animation Loop
    const animate = () => {
      if (isPlayingRef.current && dnaGroupRef.current) {
        dnaGroupRef.current.rotation.y += 0.01 * speedRef.current;
      }
      
      controls.update();
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          3D DNA Double Helix
          <Badge variant="outline" className="text-orange-600 border-orange-300">Biology - Genetics</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Interactive 3D model of DNA. The red/blue and green/yellow rods represent the four nucleotide bases (Adenine-Thymine, Cytosine-Guanine).
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          ref={mountRef} 
          className="w-full rounded-lg overflow-hidden border cursor-move shadow-inner"
          style={{ height: "500px" }}
        />
        
        <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
          <div className="flex gap-2">
            <Button onClick={() => setIsPlaying(!isPlaying)} variant="default" className="bg-orange-600 hover:bg-orange-700">
              {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button onClick={() => {
              setSpeed([1]);
              if (dnaGroupRef.current) dnaGroupRef.current.rotation.y = 0;
            }} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
          
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-medium flex justify-between text-orange-900 dark:text-orange-200">
              <span>Rotation Speed</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">{speed[0]}x</Badge>
            </label>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              min={0.1}
              max={5}
              step={0.1}
              className="[&_[role=slider]]:bg-orange-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
