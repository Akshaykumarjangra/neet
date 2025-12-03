
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import VisualLoader from '../shared/VisualLoader';
import HindiToggle from '../shared/HindiToggle';
import A11yAnnouncer from '../shared/A11yAnnouncer';

export default function PNJunction() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [bias, setBias] = useState([0]);
  const [showElectrons, setShowElectrons] = useState(true);
  const [showHoles, setShowHoles] = useState(true);
  const [hindi, setHindi] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4f8);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // P-type region (left)
    const pGeometry = new THREE.BoxGeometry(6, 4, 2);
    const pMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff6b6b, 
      transparent: true, 
      opacity: 0.3 
    });
    const pRegion = new THREE.Mesh(pGeometry, pMaterial);
    pRegion.position.set(-3, 0, 0);
    scene.add(pRegion);

    // N-type region (right)
    const nGeometry = new THREE.BoxGeometry(6, 4, 2);
    const nMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4dabf7, 
      transparent: true, 
      opacity: 0.3 
    });
    const nRegion = new THREE.Mesh(nGeometry, nMaterial);
    nRegion.position.set(3, 0, 0);
    scene.add(nRegion);

    // Depletion region
    const depletionWidth = 1.5 - Math.abs(bias[0]) * 0.3;
    const depletionGeometry = new THREE.BoxGeometry(depletionWidth, 4, 2);
    const depletionMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd43b, 
      transparent: true, 
      opacity: 0.5 
    });
    const depletionRegion = new THREE.Mesh(depletionGeometry, depletionMaterial);
    depletionRegion.position.set(0, 0, 0);

    // Holes (p-type)
    const holes: THREE.Mesh[] = [];
    if (showHoles) {
      for (let i = 0; i < 15; i++) {
        const holeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const holeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        hole.position.set(
          -5 + Math.random() * 4,
          -1.5 + Math.random() * 3,
          -0.5 + Math.random()
        );
        holes.push(hole);
        scene.add(hole);
      }
    }

    // Electrons (n-type)
    const electrons: THREE.Mesh[] = [];
    if (showElectrons) {
      for (let i = 0; i < 15; i++) {
        const electronGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const electronMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);
        electron.position.set(
          1 + Math.random() * 4,
          -1.5 + Math.random() * 3,
          -0.5 + Math.random()
        );
        electrons.push(electron);
        scene.add(electron);
      }
    }

    scene.add(depletionRegion);

    // Labels
    const loader = new FontLoader();
    
    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0xcccccc, 0xeeeeee);
    gridHelper.position.y = -2.5;
    scene.add(gridHelper);

    setLoading(false);

    const animate = () => {
      requestAnimationFrame(animate);

      // Update depletion width based on bias
      const newWidth = 1.5 - Math.abs(bias[0]) * 0.3;
      depletionRegion.scale.x = newWidth / 1.5;

      // Animate charge carriers based on bias
      holes.forEach((hole, i) => {
        if (bias[0] > 0) {
          hole.position.x += 0.02;
          if (hole.position.x > 0) hole.position.x = -5;
        } else if (bias[0] < 0) {
          hole.position.x -= 0.01;
          if (hole.position.x < -5) hole.position.x = -1;
        }
      });

      electrons.forEach((electron, i) => {
        if (bias[0] > 0) {
          electron.position.x -= 0.02;
          if (electron.position.x < 0) electron.position.x = 5;
        } else if (bias[0] < 0) {
          electron.position.x += 0.01;
          if (electron.position.x > 5) electron.position.x = 1;
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, [bias, showElectrons, showHoles]);

  const handleBiasChange = (value: number[]) => {
    setBias(value);
    const biasType = value[0] > 0 ? 'forward' : value[0] < 0 ? 'reverse' : 'zero';
    setAnnouncement(`Bias set to ${value[0].toFixed(1)}V (${biasType} bias)`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {hindi ? 'p-n जंक्शन' : 'p-n Junction'}
              <Badge variant="secondary">3D</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {hindi ? 'अवक्षय परत और बायस की कल्पना' : 'Depletion layer and bias visualization'}
            </p>
          </div>
          <HindiToggle isHindi={hindi} onToggle={() => setHindi(!hindi)} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && <VisualLoader />}
        <div ref={mountRef} className="w-full h-96 rounded-lg overflow-hidden border" />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {hindi ? 'बायस वोल्टेज: ' : 'Bias Voltage: '}
              {bias[0].toFixed(1)} V
              {bias[0] > 0 && ' (Forward)'}
              {bias[0] < 0 && ' (Reverse)'}
            </label>
            <Slider
              value={bias}
              onValueChange={handleBiasChange}
              min={-5}
              max={5}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={showElectrons ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowElectrons(!showElectrons)}
            >
              {hindi ? 'इलेक्ट्रॉन दिखाएं' : 'Show Electrons'}
            </Button>
            <Button
              variant={showHoles ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowHoles(!showHoles)}
            >
              {hindi ? 'होल दिखाएं' : 'Show Holes'}
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - p-n Junction:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Forward bias: V_barrier ↓, I ↑ (exponential)</li>
            <li>• Reverse bias: V_barrier ↑, I ≈ 0 (small leakage)</li>
            <li>• Depletion width: W ∝ √V_bias</li>
            <li>• Built-in potential: V₀ ≈ 0.7V (Si), 0.3V (Ge)</li>
            <li>• Breakdown: Zener or Avalanche</li>
            <li>• Diode equation: I = I₀(e^(qV/kT) - 1)</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
