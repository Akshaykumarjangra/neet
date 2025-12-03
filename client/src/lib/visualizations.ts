export interface Visualization {
  id: string;
  title: string;
  description: string;
  component: string;
  library: 'Three.js' | 'D3.js' | 'JSXGraph' | 'PixiJS' | 'Matter.js' | 'PhET' | 'Cytoscape.js';
  difficulty: '🟢' | '🟡' | '🔴';
  category: string;
}

export const visualizationRegistry: Record<string, Visualization[]> = {
  'physics-ch1': [
    {
      id: 'vernier-caliper',
      title: 'Vernier Caliper Simulator',
      description: 'Interactive vernier caliper with draggable jaws and real-time scale reading',
      component: 'VernierCaliper',
      library: 'JSXGraph',
      difficulty: '🟢',
      category: 'Measurement'
    },
    {
      id: 'screw-gauge',
      title: 'Screw Gauge Simulator',
      description: 'Interactive screw gauge with pitch and least count demonstration',
      component: 'ScrewGauge',
      library: 'JSXGraph',
      difficulty: '🟢',
      category: 'Measurement'
    }
  ],
  'physics-ch2': [
    {
      id: 'position-velocity-graph',
      title: 'Position-Velocity-Time Graph',
      description: 'Live graph drawer showing how slope of position gives velocity and slope of velocity gives acceleration',
      component: 'PositionVelocityGraph',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'Kinematics'
    }
  ],
  'physics-ch3': [
    {
      id: 'projectile-cannon',
      title: 'Projectile Motion Simulator',
      description: 'Interactive cannon to explore projectile motion - change angle and initial velocity to see range',
      component: 'ProjectileCannon',
      library: 'Matter.js',
      difficulty: '🟢',
      category: 'Projectile Motion'
    }
  ],
  'physics-ch4': [
    {
      id: 'block-on-ramp',
      title: 'Block on Ramp - Friction Simulator',
      description: 'Adjust friction coefficient (μ) slider to see when block slides down incline',
      component: 'BlockOnRamp',
      library: 'Matter.js',
      difficulty: '🟢',
      category: 'Forces'
    }
  ],
  'physics-ch5': [
    {
      id: 'spring-mass-energy',
      title: 'Spring-Mass Energy Bar Chart',
      description: 'Visualize kinetic and potential energy exchange in spring-mass system',
      component: 'SpringMassEnergy',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'Energy'
    }
  ],
  'physics-ch7': [
    {
      id: 'planetary-orbit',
      title: 'Planetary Orbit - Kepler\'s Laws',
      description: '3D visualization of planetary orbit demonstrating Kepler\'s 2nd law (equal areas in equal times)',
      component: 'PlanetaryOrbit',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Gravitation'
    }
  ],
  'physics-ch8': [
    {
      id: 'stress-strain-curve',
      title: 'Stress-Strain Curve',
      description: 'Interactive curve showing elastic limit, yield point, and breaking stress',
      component: 'StressStrainCurve',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'Mechanical Properties'
    }
  ],
  'physics-ch9': [
    {
      id: 'bernoulli-venturi',
      title: 'Bernoulli\'s Venturi Tube',
      description: 'Particle flow visualization where color intensity represents fluid speed',
      component: 'BernoulliVenturi',
      library: 'PixiJS',
      difficulty: '🟢',
      category: 'Fluid Mechanics'
    }
  ],
  'physics-ch11': [
    {
      id: 'carnot-cycle',
      title: 'Carnot Cycle P-V Diagram',
      description: 'Animated Carnot cycle showing isothermal and adiabatic processes, area = work done',
      component: 'CarnotCycle',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'Thermodynamics'
    }
  ],
  'physics-ch12': [
    {
      id: 'gas-molecules',
      title: 'Kinetic Theory - Gas Molecules',
      description: '500 bouncing molecules demonstrating relationship between temperature and RMS velocity',
      component: 'GasMolecules',
      library: 'PixiJS',
      difficulty: '🟢',
      category: 'Kinetic Theory'
    }
  ],
  'physics-ch13': [
    {
      id: 'pendulum-phase-space',
      title: 'Simple Pendulum Phase Space',
      description: 'Phase space diagram showing θ vs ω for simple harmonic motion',
      component: 'PendulumPhaseSpace',
      library: 'JSXGraph',
      difficulty: '🟢',
      category: 'Oscillations'
    }
  ],
  'physics-ch15': [
    {
      id: 'electric-field-lines',
      title: '3D Electric Field Lines',
      description: 'Place positive and negative charges in 3D space and see electric field lines',
      component: 'ElectricFieldLines',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Electrostatics'
    }
  ],
  'physics-20': [
    {
      id: 'ray-optics-mirror',
      title: 'Concave Mirror Ray Diagram',
      description: 'Interactive ray diagram showing image formation by concave mirror',
      component: 'RayOptics',
      library: 'JSXGraph',
      difficulty: '🟢',
      category: 'Ray Optics'
    },
    {
      id: 'convex-lens-drag',
      title: 'Convex Lens Ray Diagram',
      description: 'Drag object to see real-time image formation with ray tracing',
      component: 'ConvexLensDrag',
      library: 'JSXGraph',
      difficulty: '🟢',
      category: 'Ray Optics'
    },
    {
      id: 'interference-pattern',
      title: 'Young\'s Double Slit Interference',
      description: 'Interactive double slit showing interference pattern and fringe width',
      component: 'InterferencePattern',
      library: 'D3.js',
      difficulty: '🟡',
      category: 'Wave Optics'
    },
    {
      id: 'polarization-light',
      title: 'Polarization of Light',
      description: 'Visualize light polarization through polaroid filters',
      component: 'PolarizationLight',
      library: 'Three.js',
      difficulty: '🟡',
      category: 'Wave Optics'
    }
  ],
  'physics-21': [
    {
      id: 'ac-circuit',
      title: 'AC Circuit Simulator',
      description: 'Interactive LCR circuit with phasor diagrams and impedance calculation',
      component: 'ACCircuit',
      library: 'D3.js',
      difficulty: '🟡',
      category: 'AC Circuits'
    },
    {
      id: 'transformer-3d',
      title: 'Transformer 3D Model',
      description: '3D visualization of transformer showing primary and secondary coils',
      component: 'Transformer3D',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'AC Circuits'
    },
    {
      id: 'faraday-induction',
      title: 'Faraday\'s Law of Induction',
      description: 'Moving magnet through coil showing induced EMF',
      component: 'FaradayInduction',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Electromagnetic Induction'
    }
  ],
  'physics-22': [
    {
      id: 'em-wave-3d',
      title: 'Electromagnetic Wave 3D',
      description: '3D visualization of oscillating E and B fields perpendicular to each other',
      component: 'EMWave',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'EM Waves'
    },
    {
      id: 'em-spectrum',
      title: 'Electromagnetic Spectrum',
      description: 'Interactive spectrum showing wavelength, frequency, and energy relationships',
      component: 'EMSpectrum',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'EM Waves'
    },
    {
      id: 'doppler-effect',
      title: 'Doppler Effect Simulator',
      description: 'Visualize frequency change as source moves relative to observer',
      component: 'DopplerEffect',
      library: 'PixiJS',
      difficulty: '🟡',
      category: 'Wave Properties'
    }
  ],
  'physics-23': [
    {
      id: 'photoelectric-effect',
      title: 'Photoelectric Effect',
      description: 'Interactive simulation showing electron emission and stopping potential',
      component: 'PhotoelectricEffect',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'Dual Nature'
    },
    {
      id: 'compton-effect',
      title: 'Compton Effect',
      description: 'Visualize X-ray scattering and wavelength shift',
      component: 'ComptonEffect',
      library: 'D3.js',
      difficulty: '🟡',
      category: 'Dual Nature'
    },
    {
      id: 'matter-waves',
      title: 'de Broglie Matter Waves',
      description: 'Electron diffraction pattern demonstrating wave nature of matter',
      component: 'MatterWaves',
      library: 'PixiJS',
      difficulty: '🟡',
      category: 'Matter Waves'
    }
  ],
  'physics-ch24': [
    {
      id: 'photoelectric-effect',
      title: 'Photoelectric Effect Energy',
      description: 'Energy bar chart showing hν vs work function φ',
      component: 'PhotoelectricEffect',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'Dual Nature'
    }
  ],
  'physics-ch25': [
    {
      id: 'bohr-orbits',
      title: 'Bohr Atomic Model',
      description: '3D visualization of electron transitions and photon emission (n=3→2)',
      component: 'BohrOrbits',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Atoms'
    }
  ],
  'physics-ch26': [
    {
      id: 'radioactive-decay',
      title: 'Radioactive Decay Chain',
      description: 'Live N vs t graph demonstrating half-life and exponential decay',
      component: 'RadioactiveDecay',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'Nuclei'
    }
  ],
  'chemistry-ch2': [
    {
      id: 'orbital-shapes',
      title: '3D Atomic Orbital Shapes',
      description: 'Interactive 3D visualization of s, p, d orbitals with nodal surfaces',
      component: 'OrbitalShapes',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Atomic Structure'
    }
  ],
  'chemistry-ch4': [
    {
      id: 'hybridisation',
      title: 'Hybridisation 3D Models',
      description: '3D visualization of sp, sp², sp³ hybridisation showing real molecular geometry',
      component: 'Hybridisation',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Chemical Bonding'
    }
  ],
  'chemistry-ch6': [
    {
      id: 'enthalpy-ladder',
      title: 'Enthalpy Ladder Diagram',
      description: 'Energy ladder showing exothermic and endothermic reactions',
      component: 'EnthalpyLadder',
      library: 'D3.js',
      difficulty: '🟢',
      category: 'Thermochemistry'
    }
  ],
  'chemistry-ch13': [
    {
      id: 'flame-test',
      title: 'Flame Test Colors',
      description: 'Interactive flame test showing characteristic colors (Na yellow, K lilac)',
      component: 'FlameTest',
      library: 'PixiJS',
      difficulty: '🟢',
      category: 's-block Elements'
    }
  ],
  'chemistry-ch19': [
    {
      id: 'conformations',
      title: 'Ethane Conformations',
      description: '3D visualization of staggered and eclipsed conformations',
      component: 'Conformations',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Hydrocarbons'
    }
  ],
  'chemistry-ch25': [
    {
      id: 'protein-structure',
      title: 'Protein Secondary Structure',
      description: '3D α-helix and β-sheet with hydrogen bonds shown',
      component: 'ProteinStructure',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Biomolecules'
    }
  ],
  'biology-cell': [
    {
      id: 'organelle-tour',
      title: 'Cell Organelle 3D Tour',
      description: '3D tour of cell organelles - click to explore mitochondrion, nucleus, etc.',
      component: 'OrganelleTour',
      library: 'Three.js',
      difficulty: '🟢',
      category: 'Cell Biology'
    }
  ],
  'biology-genetics': [
    {
      id: 'punnett-square',
      title: 'Punnett Square Game',
      description: 'Interactive Punnett square for monohybrid and dihybrid crosses',
      component: 'PunnettSquare',
      library: 'React',
      difficulty: '🟢',
      category: 'Genetics'
    }
  ]
};

export function getChapterVisualizations(chapterId: string): { visualizations: Visualization[] } {
  return { visualizations: visualizationRegistry[chapterId] || [] };
}

export function getAllVisualizations(): Visualization[] {
  return Object.values(visualizationRegistry).flat();
}

export function getVisualizationsByLibrary(library: string): Visualization[] {
  return getAllVisualizations().filter(v => v.library === library);
}

export function getVisualizationById(vizId: string): Visualization | undefined {
  return getAllVisualizations().find(v => v.id === vizId);
}
