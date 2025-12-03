
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Atom, RotateCcw, Play, Zap } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

interface Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  type: 'neutron' | 'proton' | 'fragment' | 'product-neutron';
}

export default function NuclearFission() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const nucleusRef = useRef<THREE.Group>();

  const [isFissioning, setIsFissioning] = useState(false);
  const [energyReleased, setEnergyReleased] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [step, setStep] = useState<'initial' | 'neutron-approach' | 'fission' | 'products'>('initial');

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / 400,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 400);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create U-235 nucleus
    createNucleus();

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();

      // Update particles
      particlesRef.current.forEach((particle) => {
        particle.mesh.position.add(particle.velocity);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      camera.aspect = width / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(width, 400);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const createNucleus = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear existing nucleus
    if (nucleusRef.current) {
      scene.remove(nucleusRef.current);
    }

    const nucleus = new THREE.Group();
    nucleusRef.current = nucleus;

    // U-235: 92 protons, 143 neutrons
    const protons = 92;
    const neutrons = 143;
    const nucleonRadius = 0.15;

    // Create protons (red)
    for (let i = 0; i < protons; i++) {
      const geometry = new THREE.SphereGeometry(nucleonRadius, 16, 16);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xff3333,
        emissive: 0x330000,
        shininess: 30
      });
      const proton = new THREE.Mesh(geometry, material);
      
      // Arrange in sphere
      const phi = Math.acos(-1 + (2 * i) / protons);
      const theta = Math.sqrt(protons * Math.PI) * phi;
      const r = 2;
      
      proton.position.set(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
      
      nucleus.add(proton);
      particlesRef.current.push({
        mesh: proton,
        velocity: new THREE.Vector3(0, 0, 0),
        type: 'proton'
      });
    }

    // Create neutrons (blue)
    for (let i = 0; i < neutrons; i++) {
      const geometry = new THREE.SphereGeometry(nucleonRadius, 16, 16);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x3333ff,
        emissive: 0x000033,
        shininess: 30
      });
      const neutron = new THREE.Mesh(geometry, material);
      
      const phi = Math.acos(-1 + (2 * i) / neutrons);
      const theta = Math.sqrt(neutrons * Math.PI) * phi;
      const r = 2;
      
      neutron.position.set(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
      
      nucleus.add(neutron);
      particlesRef.current.push({
        mesh: neutron,
        velocity: new THREE.Vector3(0, 0, 0),
        type: 'neutron'
      });
    }

    scene.add(nucleus);
  };

  const triggerFission = () => {
    const scene = sceneRef.current;
    if (!scene || isFissioning) return;

    setIsFissioning(true);
    setStep('neutron-approach');
    setAnnouncement("Neutron approaching U-235 nucleus");

    // Create incoming neutron
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00,
      emissive: 0x003300
    });
    const incomingNeutron = new THREE.Mesh(geometry, material);
    incomingNeutron.position.set(-10, 0, 0);
    scene.add(incomingNeutron);

    // Animate neutron approach
    let position = -10;
    const approachInterval = setInterval(() => {
      position += 0.2;
      incomingNeutron.position.x = position;

      if (position >= -2) {
        clearInterval(approachInterval);
        scene.remove(incomingNeutron);
        
        // Trigger fission after brief delay
        setTimeout(() => {
          performFission();
        }, 300);
      }
    }, 20);
  };

  const performFission = () => {
    setStep('fission');
    setAnnouncement("Nuclear fission occurring - nucleus splitting");

    const nucleus = nucleusRef.current;
    if (!nucleus) return;

    // Split particles into two groups (fission fragments)
    const halfPoint = Math.floor(particlesRef.current.length / 2);
    
    particlesRef.current.forEach((particle, index) => {
      if (index < halfPoint) {
        // Fragment 1 moves left
        particle.velocity.set(
          -0.05 - Math.random() * 0.03,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04
        );
      } else {
        // Fragment 2 moves right
        particle.velocity.set(
          0.05 + Math.random() * 0.03,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04
        );
      }
      particle.type = 'fragment';
    });

    // Release additional neutrons (2-3)
    const scene = sceneRef.current;
    if (!scene) return;

    const numNeutrons = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numNeutrons; i++) {
      const geometry = new THREE.SphereGeometry(0.2, 16, 16);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5
      });
      const neutron = new THREE.Mesh(geometry, material);
      neutron.position.set(0, 0, 0);
      scene.add(neutron);

      const angle = (i / numNeutrons) * Math.PI * 2;
      particlesRef.current.push({
        mesh: neutron,
        velocity: new THREE.Vector3(
          Math.cos(angle) * 0.08,
          Math.sin(angle) * 0.08,
          (Math.random() - 0.5) * 0.04
        ),
        type: 'product-neutron'
      });
    }

    // Calculate energy released (approximately 200 MeV for U-235)
    setEnergyReleased(200);
    setStep('products');

    setTimeout(() => {
      setAnnouncement(`Fission complete. Released ${numNeutrons} neutrons and ~200 MeV energy`);
    }, 500);
  };

  const handleReset = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove all particles
    particlesRef.current.forEach(particle => {
      scene.remove(particle.mesh);
    });
    particlesRef.current = [];

    // Recreate nucleus
    createNucleus();

    setIsFissioning(false);
    setEnergyReleased(0);
    setStep('initial');
    setAnnouncement("Reset to U-235 nucleus");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Atom className="h-5 w-5" />
            Nuclear Fission of U-235
          </span>
          <Badge variant="outline">Physics - Nuclei</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          3D visualization of nuclear fission chain reaction
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={containerRef}
          className="w-full h-[400px] border rounded-lg bg-background"
        />

        <div className="flex gap-2">
          <Button 
            onClick={triggerFission} 
            disabled={isFissioning}
            className="flex-1"
          >
            <Zap className="h-4 w-4 mr-2" />
            Trigger Fission
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium">Status</p>
            <p className="text-lg font-bold capitalize">{step.replace('-', ' ')}</p>
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium">Energy Released</p>
            <p className="text-lg font-bold">{energyReleased} MeV</p>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">Nuclear Fission Process:</p>
          <ul className="space-y-1 ml-4">
            <li>• ₀¹n + ₉₂²³⁵U → ₉₂²³⁶U* (excited state)</li>
            <li>• ₉₂²³⁶U* → fragments + 2-3 neutrons + ~200 MeV</li>
            <li>• Red spheres = Protons (92)</li>
            <li>• Blue spheres = Neutrons (143)</li>
            <li>• Green spheres = Free neutrons</li>
            <li>• Chain reaction possible with released neutrons</li>
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
