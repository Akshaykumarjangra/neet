import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function H2OMolecule() {
   const containerRef = useRef<HTMLDivElement>(null);
   const sceneRef = useRef<THREE.Scene | null>(null);
   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
   const moleculeRef = useRef<THREE.Group | null>(null);

   useEffect(() => {
      if (!containerRef.current) return;

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
         75,
         containerRef.current.clientWidth / containerRef.current.clientHeight,
         0.1,
         1000
      );
      camera.position.z = 5;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.shadowMap.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // Create molecule group
      const molecule = new THREE.Group();
      moleculeRef.current = molecule;
      scene.add(molecule);

      // Oxygen atom (center) - Red
      const oxygenGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const oxygenMaterial = new THREE.MeshStandardMaterial({
         color: 0xff0000,
         metalness: 0.3,
         roughness: 0.4
      });
      const oxygen = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
      oxygen.castShadow = true;
      oxygen.receiveShadow = true;
      molecule.add(oxygen);

      // Hydrogen atom 1 (left) - White
      const hydrogenGeometry = new THREE.SphereGeometry(0.4, 32, 32);
      const hydrogenMaterial = new THREE.MeshStandardMaterial({
         color: 0xffffff,
         metalness: 0.3,
         roughness: 0.4
      });
      const hydrogen1 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
      hydrogen1.position.set(-1.2, 0.7, 0);
      hydrogen1.castShadow = true;
      hydrogen1.receiveShadow = true;
      molecule.add(hydrogen1);

      // Hydrogen atom 2 (right) - White
      const hydrogen2 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
      hydrogen2.position.set(-1.2, -0.7, 0);
      hydrogen2.castShadow = true;
      hydrogen2.receiveShadow = true;
      molecule.add(hydrogen2);

      // Create bonds (cylinders)
      const bondMaterial = new THREE.MeshStandardMaterial({
         color: 0x888888,
         metalness: 0.5,
         roughness: 0.3
      });

      // Bond 1 (O-H left)
      const bond1Geometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 16);
      const bond1 = new THREE.Mesh(bond1Geometry, bondMaterial);
      bond1.position.set(-0.6, 0.35, 0);
      bond1.rotation.z = Math.PI / 2.5;
      bond1.castShadow = true;
      molecule.add(bond1);

      // Bond 2 (O-H right)
      const bond2 = new THREE.Mesh(bond1Geometry, bondMaterial);
      bond2.position.set(-0.6, -0.35, 0);
      bond2.rotation.z = -Math.PI / 2.5;
      bond2.castShadow = true;
      molecule.add(bond2);

      // Add labels
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
         ctx.fillStyle = '#000000';
         ctx.font = 'bold 48px Arial';
         ctx.textAlign = 'center';
         ctx.textBaseline = 'middle';
         ctx.fillText('H₂O', 128, 128);
      }
      const texture = new THREE.CanvasTexture(canvas);
      const labelGeometry = new THREE.PlaneGeometry(2, 2);
      const labelMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.position.z = 3;
      scene.add(label);

      // Animation loop
      let animationId: number;
      const animate = () => {
         animationId = requestAnimationFrame(animate);

         // Rotate molecule
         if (molecule) {
            molecule.rotation.x += 0.005;
            molecule.rotation.y += 0.008;
         }

         renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      const handleResize = () => {
         if (!containerRef.current) return;
         const width = containerRef.current.clientWidth;
         const height = containerRef.current.clientHeight;
         camera.aspect = width / height;
         camera.updateProjectionMatrix();
         renderer.setSize(width, height);
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
         window.removeEventListener('resize', handleResize);
         cancelAnimationFrame(animationId);
         if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
         }
         renderer.dispose();
      };
   }, []);

   return (
      <div className="w-full">
         <div
            ref={containerRef}
            style={{
               width: '100%',
               height: '500px',
               borderRadius: '8px',
               overflow: 'hidden',
               background: '#f0f0f0'
            }}
         />
         <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
               <span className="font-semibold text-foreground">💡 Tip:</span> This is a water molecule (H₂O) showing the covalent bonds between one oxygen atom (red) and two hydrogen atoms (white). The molecule rotates continuously to help you visualize its 3D structure.
            </p>
         </div>
      </div>
   );
}
