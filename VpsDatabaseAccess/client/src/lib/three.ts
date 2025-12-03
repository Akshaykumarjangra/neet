
import * as THREE from 'three';

// Default camera settings
export const DEFAULT_CAMERA_CONFIG = {
  position: new THREE.Vector3(0, 0, 8),
  fov: 50,
  near: 0.1,
  far: 1000,
};

// Default lighting setup
export function createDefaultLights() {
  const lights = [];
  
  // Ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  lights.push(ambientLight);
  
  // Directional light for shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  lights.push(directionalLight);
  
  // Point light for highlights
  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(-10, -10, -10);
  lights.push(pointLight);
  
  return lights;
}

// Material presets for different subjects
export const MATERIAL_PRESETS = {
  physics: {
    metallic: new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.7,
      roughness: 0.3,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      metalness: 0,
      roughness: 0,
      transmission: 0.9,
      thickness: 0.5,
    }),
  },
  chemistry: {
    atom: new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.5,
      roughness: 0.4,
    }),
    molecule: new THREE.MeshPhongMaterial({
      color: 0xa78bfa,
      shininess: 100,
    }),
  },
  biology: {
    cell: new THREE.MeshLambertMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.8,
    }),
    membrane: new THREE.MeshPhysicalMaterial({
      color: 0x34d399,
      metalness: 0,
      roughness: 0.5,
      transmission: 0.5,
    }),
  },
};

// Helper to create glow effect
export function createGlowMaterial(color: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(color) },
      viewVector: { value: new THREE.Vector3() },
    },
    vertexShader: `
      uniform vec3 viewVector;
      varying float intensity;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec3 normal = normalize(normalMatrix * normal);
        vec3 view = normalize(viewVector - (modelViewMatrix * vec4(position, 1.0)).xyz);
        intensity = pow(0.7 - dot(normal, view), 2.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying float intensity;
      void main() {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4(glow, 1.0);
      }
    `,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
}
