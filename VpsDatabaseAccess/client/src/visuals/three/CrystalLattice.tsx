
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import HindiToggle from '../shared/HindiToggle';
import A11yAnnouncer from '../shared/A11yAnnouncer';

type LatticeType = 'simple-cubic' | 'bcc' | 'fcc' | 'hcp';

export default function CrystalLattice() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [latticeType, setLatticeType] = useState<LatticeType>('simple-cubic');
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
    camera.position.set(4, 4, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, 400);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Lattice group
    const latticeGroup = new THREE.Group();
    scene.add(latticeGroup);

    const createLattice = (type: LatticeType) => {
      latticeGroup.clear();

      const atomGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const atomMaterial = new THREE.MeshPhongMaterial({ color: 0x3b82f6 });

      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });

      // Unit cell edges
      const points = [
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(2, 0, 0), new THREE.Vector3(2, 2, 0),
        new THREE.Vector3(2, 2, 0), new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 2, 0), new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 2), new THREE.Vector3(2, 0, 2),
        new THREE.Vector3(2, 0, 2), new THREE.Vector3(2, 2, 2),
        new THREE.Vector3(2, 2, 2), new THREE.Vector3(0, 2, 2),
        new THREE.Vector3(0, 2, 2), new THREE.Vector3(0, 0, 2),
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2),
        new THREE.Vector3(2, 0, 0), new THREE.Vector3(2, 0, 2),
        new THREE.Vector3(2, 2, 0), new THREE.Vector3(2, 2, 2),
        new THREE.Vector3(0, 2, 0), new THREE.Vector3(0, 2, 2)
      ];

      const edgesGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
      latticeGroup.add(edges);

      const addAtom = (x: number, y: number, z: number) => {
        const atom = new THREE.Mesh(atomGeometry, atomMaterial);
        atom.position.set(x, y, z);
        latticeGroup.add(atom);
      };

      switch (type) {
        case 'simple-cubic':
          // 8 corner atoms
          addAtom(0, 0, 0); addAtom(2, 0, 0); addAtom(2, 2, 0); addAtom(0, 2, 0);
          addAtom(0, 0, 2); addAtom(2, 0, 2); addAtom(2, 2, 2); addAtom(0, 2, 2);
          break;

        case 'bcc':
          // 8 corners + 1 body center
          addAtom(0, 0, 0); addAtom(2, 0, 0); addAtom(2, 2, 0); addAtom(0, 2, 0);
          addAtom(0, 0, 2); addAtom(2, 0, 2); addAtom(2, 2, 2); addAtom(0, 2, 2);
          addAtom(1, 1, 1); // body center
          break;

        case 'fcc':
          // 8 corners + 6 face centers
          addAtom(0, 0, 0); addAtom(2, 0, 0); addAtom(2, 2, 0); addAtom(0, 2, 0);
          addAtom(0, 0, 2); addAtom(2, 0, 2); addAtom(2, 2, 2); addAtom(0, 2, 2);
          addAtom(1, 1, 0); addAtom(1, 1, 2); // front and back faces
          addAtom(1, 0, 1); addAtom(1, 2, 1); // top and bottom faces
          addAtom(0, 1, 1); addAtom(2, 1, 1); // left and right faces
          break;

        case 'hcp':
          // Simplified HCP representation
          addAtom(0, 0, 0); addAtom(2, 0, 0); addAtom(1, 1.7, 0);
          addAtom(0.67, 0.58, 1.5); addAtom(1.33, 1.12, 1.5);
          addAtom(0, 0, 3); addAtom(2, 0, 3); addAtom(1, 1.7, 3);
          break;
      }

      // Center the lattice
      latticeGroup.position.set(-1, -1, -1);
    };

    createLattice(latticeType);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      latticeGroup.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [latticeType]);

  const handleLatticeChange = (value: string) => {
    setLatticeType(value as LatticeType);
    setAnnouncement(`Changed to ${value} crystal structure`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {hindi ? 'क्रिस्टल संरचना' : 'Crystal Lattice Structures'}
              <Badge variant="secondary">Three.js</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {hindi ? 'विभिन्न क्रिस्टल संरचनाएं' : 'Different Crystal Structures'}
            </p>
          </div>
          <HindiToggle enabled={hindi} onToggle={setHindi} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={mountRef} className="w-full rounded-lg overflow-hidden border" />

        <div className="space-y-2">
          <label className="text-sm font-medium">Crystal Structure</label>
          <Select value={latticeType} onValueChange={handleLatticeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple-cubic">Simple Cubic (SC)</SelectItem>
              <SelectItem value="bcc">Body-Centered Cubic (BCC)</SelectItem>
              <SelectItem value="fcc">Face-Centered Cubic (FCC)</SelectItem>
              <SelectItem value="hcp">Hexagonal Close-Packed (HCP)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-muted p-3 rounded">
            <p className="font-semibold">Coordination Number</p>
            <p className="text-2xl font-bold text-primary">
              {latticeType === 'simple-cubic' ? '6' : 
               latticeType === 'bcc' ? '8' : 
               latticeType === 'fcc' ? '12' : '12'}
            </p>
          </div>
          <div className="bg-muted p-3 rounded">
            <p className="font-semibold">Packing Efficiency</p>
            <p className="text-2xl font-bold text-green-600">
              {latticeType === 'simple-cubic' ? '52%' : 
               latticeType === 'bcc' ? '68%' : 
               latticeType === 'fcc' ? '74%' : '74%'}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Solid State:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• SC: Z = 1, CN = 6, Efficiency = 52.4%</li>
            <li>• BCC: Z = 2, CN = 8, Efficiency = 68%</li>
            <li>• FCC: Z = 4, CN = 12, Efficiency = 74%</li>
            <li>• HCP: Z = 6, CN = 12, Efficiency = 74%</li>
            <li>• Z = Number of atoms per unit cell</li>
            <li>• CN = Coordination Number</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
