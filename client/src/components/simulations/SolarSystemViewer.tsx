import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function SolarSystemViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Animation refs
  const planetsRef = useRef<any[]>([]);
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
    scene.background = new THREE.Color(0x050510);

    const width = mountRef.current.clientWidth;
    const height = 500;
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 40, 60);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 2, 300);
    scene.add(pointLight);

    // Create Sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planet data (distance, size, color, speed)
    const planetData = [
      { name: "Mercury", d: 8, s: 0.5, c: 0xa8a8a8, sp: 0.04 },
      { name: "Venus", d: 12, s: 0.9, c: 0xe0c080, sp: 0.015 },
      { name: "Earth", d: 17, s: 1, c: 0x2288ff, sp: 0.01 },
      { name: "Mars", d: 22, s: 0.6, c: 0xff5522, sp: 0.008 },
      { name: "Jupiter", d: 32, s: 2.5, c: 0xddaa77, sp: 0.002 },
      { name: "Saturn", d: 42, s: 2, c: 0xead6b8, sp: 0.0009 },
    ];

    planetsRef.current = planetData.map(data => {
      // Orbit path
      const orbitGeom = new THREE.RingGeometry(data.d - 0.05, data.d + 0.05, 64);
      const orbitMat = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
      const orbit = new THREE.Mesh(orbitGeom, orbitMat);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      // Planet mesh
      const geom = new THREE.SphereGeometry(data.s, 32, 32);
      const mat = new THREE.MeshStandardMaterial({ color: data.c, roughness: 0.7 });
      const mesh = new THREE.Mesh(geom, mat);
      
      const pivot = new THREE.Object3D();
      pivot.add(mesh);
      mesh.position.x = data.d;
      scene.add(pivot);
      
      return { pivot, mesh, speed: data.sp };
    });

    // Add Saturn's ring
    const saturn = planetsRef.current[5].mesh;
    const ringGeom = new THREE.RingGeometry(2.5, 4, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc9b291, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2 + 0.2;
    saturn.add(ring);

    // Add stars
    const starsGeom = new THREE.BufferGeometry();
    const starsArray = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) {
      starsArray[i] = (Math.random() - 0.5) * 400;
    }
    starsGeom.setAttribute('position', new THREE.BufferAttribute(starsArray, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const stars = new THREE.Points(starsGeom, starsMat);
    scene.add(stars);

    // Animation Loop
    const animate = () => {
      if (isPlayingRef.current) {
        planetsRef.current.forEach(p => {
          p.pivot.rotation.y += p.speed * speedRef.current;
          p.mesh.rotation.y += 0.01 * speedRef.current; // Self rotation
        });
        sun.rotation.y += 0.005 * speedRef.current;
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
          3D Solar System
          <Badge variant="outline">Physics - Gravitation</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Interactive 3D visualization of planetary orbits. Drag to rotate, scroll to zoom.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          ref={mountRef} 
          className="w-full rounded-lg overflow-hidden border cursor-move"
          style={{ height: "500px" }}
        />
        
        <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex gap-2">
            <Button onClick={() => setIsPlaying(!isPlaying)} variant="default">
              {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button onClick={() => {
              setSpeed([1]);
              planetsRef.current.forEach(p => p.pivot.rotation.y = 0);
            }} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
          
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-medium flex justify-between">
              <span>Simulation Speed</span>
              <Badge variant="secondary">{speed[0]}x</Badge>
            </label>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              min={0.1}
              max={10}
              step={0.1}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
