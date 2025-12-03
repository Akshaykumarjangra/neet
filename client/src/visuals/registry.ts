import { lazy, ComponentType } from 'react';

export interface VisualizationConfig {
  component: ComponentType<any>;
  title?: string;
  description?: string;
  category?: 'physics' | 'chemistry' | 'biology';
}

const lazyLoad = (importFn: () => Promise<{ default: ComponentType<any> }>) => 
  lazy(importFn);

export const visualizationRegistry: Record<string, VisualizationConfig> = {
  // D3.js Visualizations (17)
  'ac-circuit': {
    component: lazyLoad(() => import('./d3/ACCircuit')),
    title: 'AC Circuit Phasor Diagram',
    description: 'Interactive visualization of AC circuit behavior with phasor diagrams',
    category: 'physics'
  },
  'calorimetry': {
    component: lazyLoad(() => import('./d3/CalorimetryHeatTransfer')),
    title: 'Calorimetry & Heat Transfer',
    description: 'Energy transfer and heat exchange visualization',
    category: 'physics'
  },
  'carnot-cycle': {
    component: lazyLoad(() => import('./d3/CarnotCycle')),
    title: 'Carnot Cycle P-V Diagram',
    description: 'Interactive P-V diagram for thermodynamic processes',
    category: 'physics'
  },
  'compton-effect': {
    component: lazyLoad(() => import('./d3/ComptonEffect')),
    title: 'Compton Effect',
    description: 'Photon-electron scattering visualization',
    category: 'physics'
  },
  'doppler-effect': {
    component: lazyLoad(() => import('./d3/DopplerEffect')),
    title: 'Doppler Effect',
    description: 'Wave frequency shift due to relative motion',
    category: 'physics'
  },
  'faraday-induction': {
    component: lazyLoad(() => import('./d3/FaradayInduction')),
    title: 'Faraday\'s Electromagnetic Induction',
    description: 'Interactive demonstration of electromagnetic induction',
    category: 'physics'
  },
  'hysteresis-curve': {
    component: lazyLoad(() => import('./d3/HysteresisCurve')),
    title: 'Magnetic Hysteresis Curve',
    description: 'B-H curve for magnetic materials',
    category: 'physics'
  },
  'interference-pattern': {
    component: lazyLoad(() => import('./d3/InterferencePattern')),
    title: 'Wave Interference Pattern',
    description: 'Double-slit interference visualization',
    category: 'physics'
  },
  'logic-gates': {
    component: lazyLoad(() => import('./d3/LogicGates')),
    title: 'Digital Logic Gates',
    description: 'Interactive logic gate simulator',
    category: 'physics'
  },
  'motion-graphs': {
    component: lazyLoad(() => import('./d3/MotionGraphs')),
    title: 'Motion Graphs',
    description: 'Position, velocity, and acceleration graphs',
    category: 'physics'
  },
  'photoelectric-effect': {
    component: lazyLoad(() => import('./d3/PhotoelectricEffect')),
    title: 'Photoelectric Effect',
    description: 'Electron emission by light visualization',
    category: 'physics'
  },
  'polarization-light': {
    component: lazyLoad(() => import('./d3/PolarizationLight')),
    title: 'Light Polarization',
    description: 'Polarization of electromagnetic waves',
    category: 'physics'
  },
  'position-velocity-graph': {
    component: lazyLoad(() => import('./d3/PositionVelocityGraph')),
    title: 'Position-Velocity Graph',
    description: 'Interactive kinematic graphs',
    category: 'physics'
  },
  'resonance-tube': {
    component: lazyLoad(() => import('./d3/ResonanceTube')),
    title: 'Resonance Tube',
    description: 'Standing waves in air columns',
    category: 'physics'
  },
  'spring-energy-bar': {
    component: lazyLoad(() => import('./d3/SpringEnergyBar')),
    title: 'Spring Energy Bar Chart',
    description: 'Energy transformation in spring systems',
    category: 'physics'
  },
  'stress-strain-curve': {
    component: lazyLoad(() => import('./d3/StressStrainCurve')),
    title: 'Stress-Strain Curve',
    description: 'Material property visualization',
    category: 'physics'
  },
  'ph-curve': {
    component: lazyLoad(() => import('./d3/PHCurve')),
    title: 'pH Titration Curve',
    description: 'Acid-base titration visualization',
    category: 'chemistry'
  },

  // Three.js Visualizations (20)
  'angular-momentum': {
    component: lazyLoad(() => import('./three/AngularMomentum')),
    title: 'Angular Momentum',
    description: '3D visualization of rotational motion',
    category: 'physics'
  },
  'atomic-spectrum': {
    component: lazyLoad(() => import('./three/AtomicSpectrum')),
    title: 'Atomic Emission Spectrum',
    description: 'Electron transitions and spectral lines',
    category: 'physics'
  },
  'bimetallic-strip': {
    component: lazyLoad(() => import('./three/BimetallicStrip')),
    title: 'Bimetallic Strip',
    description: 'Thermal expansion visualization',
    category: 'physics'
  },
  'compound-microscope': {
    component: lazyLoad(() => import('./three/CompoundMicroscope')),
    title: 'Compound Microscope',
    description: '3D optical instrument visualization',
    category: 'physics'
  },
  'electric-field-3d': {
    component: lazyLoad(() => import('./three/ElectricField3D')),
    title: 'Electric Field Lines 3D',
    description: 'Interactive 3D electric field visualization',
    category: 'physics'
  },
  'em-wave': {
    component: lazyLoad(() => import('./three/EMWave')),
    title: 'Electromagnetic Wave',
    description: '3D EM wave propagation',
    category: 'physics'
  },
  'helical-motion': {
    component: lazyLoad(() => import('./three/HelicalMotion')),
    title: 'Helical Motion',
    description: 'Charged particle in magnetic field',
    category: 'physics'
  },
  'lens-maker-formula': {
    component: lazyLoad(() => import('./three/LensMakerFormula')),
    title: 'Lens Maker Formula',
    description: 'Lens properties and ray tracing',
    category: 'physics'
  },
  'magnetic-field-lines': {
    component: lazyLoad(() => import('./three/MagneticFieldLines')),
    title: 'Magnetic Field Lines',
    description: '3D magnetic field visualization',
    category: 'physics'
  },
  'nuclear-fission': {
    component: lazyLoad(() => import('./three/NuclearFission')),
    title: 'Nuclear Fission',
    description: 'Atomic nucleus splitting visualization',
    category: 'chemistry'
  },
  'parallel-plate-capacitor': {
    component: lazyLoad(() => import('./three/ParallelPlateCapacitor')),
    title: 'Parallel Plate Capacitor',
    description: '3D capacitor field visualization',
    category: 'physics'
  },
  'planetary-orbit': {
    component: lazyLoad(() => import('./three/PlanetaryOrbit')),
    title: 'Planetary Orbit',
    description: 'Kepler\'s laws and orbital mechanics',
    category: 'physics'
  },
  'pn-junction': {
    component: lazyLoad(() => import('./three/PNJunction')),
    title: 'PN Junction Diode',
    description: 'Semiconductor junction visualization',
    category: 'physics'
  },
  'radioactive-decay': {
    component: lazyLoad(() => import('./three/RadioactiveDecay')),
    title: 'Radioactive Decay',
    description: 'Nuclear decay visualization',
    category: 'chemistry'
  },
  'ray-optics': {
    component: lazyLoad(() => import('./three/RayOptics')),
    title: 'Ray Optics',
    description: 'Light ray propagation and refraction',
    category: 'physics'
  },
  'torque-wrench': {
    component: lazyLoad(() => import('./three/TorqueWrench')),
    title: 'Torque and Rotational Dynamics',
    description: 'Force and lever arm visualization',
    category: 'physics'
  },
  'transformer-3d': {
    component: lazyLoad(() => import('./three/Transformer3D')),
    title: 'Transformer 3D',
    description: 'Electromagnetic transformer visualization',
    category: 'physics'
  },
  'xray-diffraction': {
    component: lazyLoad(() => import('./three/XRayDiffraction')),
    title: 'X-Ray Diffraction',
    description: 'Bragg\'s law and crystal diffraction',
    category: 'physics'
  },
  'molecular-orbital': {
    component: lazyLoad(() => import('./three/MolecularOrbital')),
    title: 'Molecular Orbital Theory',
    description: 'Bonding and antibonding orbitals',
    category: 'chemistry'
  },
  'crystal-lattice': {
    component: lazyLoad(() => import('./three/CrystalLattice')),
    title: 'Crystal Lattice Structures',
    description: 'SC, BCC, FCC, and HCP crystal structures',
    category: 'chemistry'
  },

  // PixiJS Visualizations (3)
  'avogadro-jar': {
    component: lazyLoad(() => import('./pixi/AvogadroJar')),
    title: 'Avogadro Jar',
    description: 'Molar volume and gas laws',
    category: 'chemistry'
  },
  'gas-molecules': {
    component: lazyLoad(() => import('./pixi/GasMolecules')),
    title: 'Gas Molecules Simulator',
    description: 'Kinetic theory of gases visualization',
    category: 'physics'
  },
  'venturi-tube': {
    component: lazyLoad(() => import('./pixi/VenturiTube')),
    title: 'Venturi Tube',
    description: 'Bernoulli\'s principle demonstration',
    category: 'physics'
  },

  // Matter.js Physics Visualizations (3)
  'block-on-ramp': {
    component: lazyLoad(() => import('./matter/BlockOnRamp')),
    title: 'Block on Ramp',
    description: 'Inclined plane physics simulation',
    category: 'physics'
  },
  'collision-lab': {
    component: lazyLoad(() => import('./matter/CollisionLab')),
    title: 'Collision Lab',
    description: 'Elastic and inelastic collisions',
    category: 'physics'
  },
  'projectile-motion': {
    component: lazyLoad(() => import('./matter/ProjectileMotion')),
    title: 'Projectile Motion',
    description: 'Trajectory and kinematics simulation',
    category: 'physics'
  },

  // JSXGraph Visualizations (3)
  'screw-gauge': {
    component: lazyLoad(() => import('./jsx/ScrewGauge')),
    title: 'Screw Gauge Simulator',
    description: 'Micrometer measurement tool',
    category: 'physics'
  },
  'simple-pendulum-phase': {
    component: lazyLoad(() => import('./jsx/SimplePendulumPhase')),
    title: 'Simple Pendulum Phase Space',
    description: 'Pendulum motion phase diagram',
    category: 'physics'
  },
  'vernier-caliper': {
    component: lazyLoad(() => import('./jsx/VernierCaliper')),
    title: 'Vernier Caliper Simulator',
    description: 'Precision measurement tool',
    category: 'physics'
  },

  // PhET Integrations (3)
  'metre-bridge': {
    component: lazyLoad(() => import('./phet/MetreBridge')),
    title: 'Metre Bridge',
    description: 'Wheatstone bridge for resistance measurement',
    category: 'physics'
  },
  'standing-wave': {
    component: lazyLoad(() => import('./phet/StandingWave')),
    title: 'Standing Wave',
    description: 'Wave interference and resonance',
    category: 'physics'
  },
  'wheatstone-circuit': {
    component: lazyLoad(() => import('./phet/WheatstoneCircuit')),
    title: 'Wheatstone Circuit',
    description: 'Bridge circuit for resistance measurement',
    category: 'physics'
  },
};

export type VisualizationKey = keyof typeof visualizationRegistry;

export function getVisualization(key: string): VisualizationConfig | null {
  return visualizationRegistry[key] || null;
}

export function getVisualizationsByCategory(category: 'physics' | 'chemistry' | 'biology'): Array<[string, VisualizationConfig]> {
  return Object.entries(visualizationRegistry).filter(([_, config]) => config.category === category);
}
