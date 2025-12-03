
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import HindiToggle from '../shared/HindiToggle';
import A11yAnnouncer from '../shared/A11yAnnouncer';

export default function MolecularOrbital() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [orbitalType, setOrbitalType] = useState<'bonding' | 'antibonding'>('bonding');
  const [isRotating, setIsRotating] = useState(true);
  const [hindi, setHindi] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, 400);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create nuclei
    const nucleusGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
    
    const nucleus1 = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus1.position.x = -1.5;
    scene.add(nucleus1);

    const nucleus2 = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus2.position.x = 1.5;
    scene.add(nucleus2);

    // Create molecular orbital
    const orbitalGroup = new THREE.Group();
    
    const createOrbital = (type: 'bonding' | 'antibonding') => {
      orbitalGroup.clear();
      
      if (type === 'bonding') {
        // Bonding orbital (sigma)
        const geometry = new THREE.TorusGeometry(1.2, 0.5, 16, 100);
        const material = new THREE.MeshPhongMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide
        });
        const orbital = new THREE.Mesh(geometry, material);
        orbital.rotation.y = Math.PI / 2;
        orbitalGroup.add(orbital);
      } else {
        // Antibonding orbital (sigma*)
        const geometry1 = new THREE.SphereGeometry(0.8, 32, 32);
        const material = new THREE.MeshPhongMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.6
        });
        
        const orbital1 = new THREE.Mesh(geometry1, material);
        orbital1.position.x = -1.5;
        orbitalGroup.add(orbital1);
        
        const orbital2 = new THREE.Mesh(geometry1.clone(), material);
        orbital2.position.x = 1.5;
        orbitalGroup.add(orbital2);

        // Node plane
        const planeGeometry = new THREE.PlaneGeometry(0.5, 3);
        const planeMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        });
        const nodePlane = new THREE.Mesh(planeGeometry, planeMaterial);
        nodePlane.rotation.y = Math.PI / 2;
        orbitalGroup.add(nodePlane);
      }
    };

    createOrbital(orbitalType);
    scene.add(orbitalGroup);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (isRotating) {
        orbitalGroup.rotation.y += 0.01;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Update orbital when type changes
    const updateOrbital = () => {
      createOrbital(orbitalType);
    };
    updateOrbital();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [orbitalType, isRotating]);

  const toggleOrbitalType = () => {
    const newType = orbitalType === 'bonding' ? 'antibonding' : 'bonding';
    setOrbitalType(newType);
    setAnnouncement(`Switched to ${newType} orbital`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {hindi ? 'आणविक कक्षक' : 'Molecular Orbitals'}
              <Badge variant="secondary">Three.js</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {hindi ? 'बंधन और प्रतिबंधन कक्षक' : 'Bonding and Antibonding Orbitals'}
            </p>
          </div>
          <HindiToggle enabled={hindi} onToggle={setHindi} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={mountRef} className="w-full rounded-lg overflow-hidden border" />

        <div className="flex gap-2">
          <Button onClick={toggleOrbitalType} variant="outline">
            {orbitalType === 'bonding' ? 'Show σ* (Antibonding)' : 'Show σ (Bonding)'}
          </Button>
          <Button onClick={() => setIsRotating(!isRotating)} variant="outline">
            {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Molecular Orbital Theory:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• σ (sigma) bonding: electron density between nuclei</li>
            <li>• σ* (sigma star) antibonding: node between nuclei</li>
            <li>• Bond Order = (Nb - Na)/2</li>
            <li>• Nb = electrons in bonding orbitals</li>
            <li>• Na = electrons in antibonding orbitals</li>
            <li>• Higher bond order = stronger bond</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
