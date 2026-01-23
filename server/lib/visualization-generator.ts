// Import chapter visualizations mapping
// Note: This is a client-side file, so we'll define a simplified version here
// or use a shared location. For now, we'll use a local mapping.

interface ChapterVisualizationMapping {
  chapterId: string;
  subject: 'physics' | 'chemistry' | 'biology';
  visualizations: string[];
  layout?: 'grid' | 'tabs' | 'accordion';
}

// Simplified mapping - in production, this should be shared or imported from a shared location
const chapterVisualizations: ChapterVisualizationMapping[] = [
  // Physics chapters
  { chapterId: 'physics-01', subject: 'physics', visualizations: ['vernier-caliper', 'screw-gauge'] },
  { chapterId: 'physics-02', subject: 'physics', visualizations: ['motion-graphs', 'position-velocity-graph'] },
  { chapterId: 'physics-03', subject: 'physics', visualizations: ['projectile-motion'] },
  { chapterId: 'physics-04', subject: 'physics', visualizations: ['block-on-ramp', 'collision-lab'] },
  { chapterId: 'physics-05', subject: 'physics', visualizations: ['spring-energy-bar', 'collision-lab'] },
  { chapterId: 'physics-06', subject: 'physics', visualizations: ['angular-momentum', 'torque-wrench'] },
  { chapterId: 'physics-07', subject: 'physics', visualizations: ['planetary-orbit'] },
  { chapterId: 'physics-08', subject: 'physics', visualizations: ['planetary-orbit', 'angular-momentum'] },
  { chapterId: 'physics-09', subject: 'physics', visualizations: ['stress-strain-curve', 'venturi-tube'] },
  { chapterId: 'physics-10', subject: 'physics', visualizations: ['carnot-cycle', 'calorimetry'] },
  { chapterId: 'physics-11', subject: 'physics', visualizations: ['photoelectric-effect', 'compton-effect', 'atomic-spectrum'] },
  { chapterId: 'physics-12', subject: 'physics', visualizations: ['gas-molecules', 'avogadro-jar'] },
  { chapterId: 'physics-13', subject: 'physics', visualizations: ['simple-pendulum-phase', 'standing-wave', 'resonance-tube'] },
  { chapterId: 'physics-14', subject: 'physics', visualizations: ['electric-field-3d', 'parallel-plate-capacitor'] },
  { chapterId: 'physics-15', subject: 'physics', visualizations: ['parallel-plate-capacitor', 'electric-field-3d'] },
  { chapterId: 'physics-16', subject: 'physics', visualizations: ['wheatstone-circuit', 'metre-bridge', 'ac-circuit'] },
  { chapterId: 'physics-17', subject: 'physics', visualizations: ['magnetic-field-lines', 'faraday-induction', 'transformer-3d'] },
  { chapterId: 'physics-18', subject: 'physics', visualizations: ['magnetic-field-lines', 'hysteresis-curve'] },
  { chapterId: 'physics-19', subject: 'physics', visualizations: ['faraday-induction', 'transformer-3d', 'ac-circuit'] },
  { chapterId: 'physics-20', subject: 'physics', visualizations: ['ray-optics', 'lens-maker-formula', 'compound-microscope'] },
  { chapterId: 'physics-21', subject: 'physics', visualizations: ['ac-circuit', 'transformer-3d'] },
  { chapterId: 'physics-22', subject: 'physics', visualizations: ['em-wave', 'polarization-light'] },
  { chapterId: 'physics-23', subject: 'physics', visualizations: ['photoelectric-effect', 'compton-effect'] },
  { chapterId: 'physics-24', subject: 'physics', visualizations: ['pn-junction', 'logic-gates'] },
  // Chemistry chapters
  { chapterId: 'chemistry-01', subject: 'chemistry', visualizations: ['avogadro-jar'] },
  { chapterId: 'chemistry-02', subject: 'chemistry', visualizations: ['atomic-spectrum'] },
  { chapterId: 'chemistry-04', subject: 'chemistry', visualizations: ['molecular-orbital', 'crystal-lattice'] },
  { chapterId: 'chemistry-05', subject: 'chemistry', visualizations: ['gas-molecules'] },
  { chapterId: 'chemistry-06', subject: 'chemistry', visualizations: ['carnot-cycle', 'calorimetry'] },
  { chapterId: 'chemistry-07', subject: 'chemistry', visualizations: ['ph-curve'] },
  { chapterId: 'chemistry-17', subject: 'chemistry', visualizations: ['crystal-lattice'] },
  { chapterId: 'chemistry-18', subject: 'chemistry', visualizations: ['molecular-orbital'] },
  { chapterId: 'chemistry-19', subject: 'chemistry', visualizations: ['molecular-orbital'] },
  // Biology/Botany/Zoology chapters
  { chapterId: 'biology-01', subject: 'biology', visualizations: ['cell-structure', 'mitosis-meiosis'] }, // Cell: The Unit of Life
  { chapterId: 'biology-02', subject: 'biology', visualizations: ['mitosis-meiosis'] }, // Cell Cycle and Cell Division
  { chapterId: 'biology-03', subject: 'biology', visualizations: ['plant-cell'] }, // The Living World
  { chapterId: 'biology-04', subject: 'biology', visualizations: ['plant-kingdom'] }, // Biological Classification
  { chapterId: 'biology-05', subject: 'biology', visualizations: ['morphology-flowering-plants'] }, // Morphology of Flowering Plants
  { chapterId: 'biology-06', subject: 'biology', visualizations: ['anatomy-flowering-plants'] }, // Anatomy of Flowering Plants
  { chapterId: 'biology-07', subject: 'biology', visualizations: ['animal-tissues'] }, // Structural Organisation in Animals
  { chapterId: 'biology-08', subject: 'biology', visualizations: ['cell-structure'] }, // Cell: The Unit of Life (Repeat if needed)
  { chapterId: 'biology-09', subject: 'biology', visualizations: ['biomolecules'] }, // Biomolecules
  { chapterId: 'biology-10', subject: 'biology', visualizations: ['mitosis-meiosis'] }, // Cell Cycle
  { chapterId: 'biology-11', subject: 'biology', visualizations: ['transport-in-plants'] }, // Transport in Plants
  { chapterId: 'biology-12', subject: 'biology', visualizations: ['mineral-nutrition'] }, // Mineral Nutrition
  { chapterId: 'biology-13', subject: 'biology', visualizations: ['photosynthesis'] }, // Photosynthesis in Higher Plants
  { chapterId: 'biology-14', subject: 'biology', visualizations: ['respiration'] }, // Respiration in Plants
  { chapterId: 'biology-15', subject: 'biology', visualizations: ['plant-growth'] }, // Plant Growth and Development
  { chapterId: 'biology-16', subject: 'biology', visualizations: ['digestion'] }, // Digestion and Absorption
  { chapterId: 'biology-17', subject: 'biology', visualizations: ['respiration'] }, // Breathing and Exchange of Gases
  { chapterId: 'biology-18', subject: 'biology', visualizations: ['heart-circulation'] }, // Body Fluids and Circulation
  { chapterId: 'biology-19', subject: 'biology', visualizations: ['kidney-function'] }, // Excretory Products
  { chapterId: 'biology-20', subject: 'biology', visualizations: ['muscle-contraction'] }, // Locomotion and Movement
  { chapterId: 'biology-21', subject: 'biology', visualizations: ['neuron-impulse'] }, // Neural Control
  { chapterId: 'biology-22', subject: 'biology', visualizations: ['hormone-action'] }, // Chemical Coordination
];

interface ChapterInfo {
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterTitle: string;
  keyConcepts: Array<{
    title: string;
    description: string;
    formula?: string;
  }>;
}

// Map visualization names to types
const visualizationTypeMap: Record<string, string> = {
  // Physics
  'motion-graphs': 'wave',
  'position-velocity-graph': 'wave',
  'projectile-motion': 'projectile',
  'block-on-ramp': 'default',
  'collision-lab': 'default',
  'spring-energy-bar': 'wave',
  'angular-momentum': 'default',
  'torque-wrench': 'default',
  'planetary-orbit': 'default',
  'stress-strain-curve': 'wave',
  'venturi-tube': 'default',
  'carnot-cycle': 'wave',
  'calorimetry': 'default',
  'photoelectric-effect': 'atom',
  'compton-effect': 'atom',
  'atomic-spectrum': 'atom',
  'helical-motion': 'default',
  'em-wave': 'wave',
  'doppler-effect': 'wave',
  'interference-pattern': 'wave',
  'polarization-light': 'wave',
  'xray-diffraction': 'wave',
  'nuclear-fission': 'atom',
  'gas-molecules': 'molecule',
  'avogadro-jar': 'default',
  'simple-pendulum-phase': 'pendulum',
  'standing-wave': 'wave',
  'resonance-tube': 'default',
  'electric-field-3d': 'circuit',
  'parallel-plate-capacitor': 'circuit',
  'wheatstone-circuit': 'circuit',
  'metre-bridge': 'circuit',
  'ac-circuit': 'circuit',
  'magnetic-field-lines': 'circuit',
  'faraday-induction': 'circuit',
  'transformer-3d': 'circuit',
  'hysteresis-curve': 'wave',
  'ray-optics': 'wave',
  'lens-maker-formula': 'wave',
  'compound-microscope': 'default',
  'pn-junction': 'circuit',
  'logic-gates': 'circuit',
  'vernier-caliper': 'default',
  'screw-gauge': 'default',

  // Chemistry
  'molecular-structure': 'molecule',
  'periodic-table': 'default',
  'reaction-mechanism': 'molecule',
  'equilibrium-graph': 'wave',
  'titration-curve': 'wave',
  'orbital-diagram': 'atom',
  'hybridization': 'atom',
  'reaction-energy': 'wave',
  'ph-scale': 'wave',
  'buffer-solution': 'molecule',
  'electrochemistry-cell': 'circuit',
  'organic-reaction': 'molecule',
  'stereochemistry': 'molecule',
  'biomolecules': 'molecule',

  // Biology
  'cell-structure': 'cell',
  'organ-system': 'organ',
  'dna-structure': 'molecule',
  'protein-synthesis': 'molecule',
  'photosynthesis': 'cell',
  'respiration': 'cell',
  'mitosis-meiosis': 'cell',
  'ecosystem': 'default',
  'food-chain': 'default',
  'genetics-punnett': 'default',
  'plant-cell': 'cell',
  'plant-kingdom': 'default',
  'morphology-flowering-plants': 'organ',
  'anatomy-flowering-plants': 'cell',
  'animal-tissues': 'cell',
  'transport-in-plants': 'cell',
  'mineral-nutrition': 'molecule',
  'plant-growth': 'default',
  'digestion': 'organ',
  'heart-circulation': 'organ',
  'kidney-function': 'organ',
  'muscle-contraction': 'molecule',
  'neuron-impulse': 'cell',
  'hormone-action': 'molecule',
};

function getChapterId(subject: string, classLevel: string, chapterNumber: number): string {
  const subjectLower = subject.toLowerCase();
  // Handle special cases like Botany/Zoology which map to biology
  if (subjectLower.includes('botany') || subjectLower.includes('zoology')) {
    return `biology-${String(chapterNumber).padStart(2, '0')}`;
  }
  return `${subjectLower}-${String(chapterNumber).padStart(2, '0')}`;
}

function getVisualizationType(vizName: string): string {
  return visualizationTypeMap[vizName] || 'default';
}

function generateVisualizationTitle(vizName: string, chapterTitle: string): string {
  const titleMap: Record<string, string> = {
    'motion-graphs': 'Motion Graphs',
    'position-velocity-graph': 'Position-Velocity Graph',
    'projectile-motion': 'Projectile Motion Simulation',
    'electric-field-3d': '3D Electric Field Visualization',
    'molecular-structure': 'Molecular Structure',
    'cell-structure': 'Cell Structure',
    'organ-system': 'Organ System',
    'wave': 'Wave Visualization',
    'circuit': 'Circuit Diagram',
    'atom': 'Atomic Model',
    'molecule': 'Molecular Model',
    'cell': 'Cell Model',
    'organ': 'Organ Model',
  };

  return titleMap[vizName] || `${vizName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Visualization`;
}

function generateVisualizationDescription(vizName: string, chapterTitle: string, subject: string): string {
  const descriptions: Record<string, string> = {
    'motion-graphs': 'Interactive graphs showing position, velocity, and acceleration over time',
    'projectile-motion': 'Simulate projectile motion with adjustable initial velocity and angle',
    'electric-field-3d': '3D visualization of electric field lines and potential',
    'molecular-structure': 'Interactive 3D model of molecular structure',
    'cell-structure': 'Detailed view of cell organelles and their functions',
    'wave': 'Visual representation of wave properties and behavior',
    'circuit': 'Interactive circuit diagram with current flow visualization',
    'atom': 'Atomic structure showing electrons, protons, and neutrons',
  };

  return descriptions[vizName] || `Interactive visualization related to ${chapterTitle}`;
}

export function generateVisualizationsForChapter(chapter: ChapterInfo): Array<{
  type: string;
  title: string;
  description: string;
  config?: Record<string, any>;
}> {
  const chapterId = getChapterId(chapter.subject, chapter.classLevel, chapter.chapterNumber);

  // Find mapping from chapterMappings
  const mapping = chapterVisualizations.find(
    m => m.chapterId === chapterId && m.subject.toLowerCase() === chapter.subject.toLowerCase()
  );

  const visualizations: Array<{
    type: string;
    title: string;
    description: string;
    config?: Record<string, any>;
  }> = [];

  if (mapping && mapping.visualizations.length > 0) {
    // Use mapped visualizations
    for (const vizName of mapping.visualizations) {
      const vizType = getVisualizationType(vizName);
      visualizations.push({
        type: vizType,
        title: generateVisualizationTitle(vizName, chapter.chapterTitle),
        description: generateVisualizationDescription(vizName, chapter.chapterTitle, chapter.subject),
        config: {
          visualizationName: vizName,
          subject: chapter.subject,
          chapterNumber: chapter.chapterNumber,
        },
      });
    }
  } else {
    // Generate default visualizations based on subject
    const defaultViz = getDefaultVisualizationForSubject(chapter.subject, chapter.chapterTitle);
    if (defaultViz) {
      visualizations.push(defaultViz);
    }
  }

  // Ensure at least one visualization is always returned
  if (visualizations.length === 0) {
    visualizations.push({
      type: 'default',
      title: `${chapter.chapterTitle} Visualization`,
      description: `Interactive visualization to help understand concepts in ${chapter.chapterTitle}`,
      config: { subject: chapter.subject, chapterNumber: chapter.chapterNumber },
    });
  }

  return visualizations;
}

function getDefaultVisualizationForSubject(
  subject: string,
  chapterTitle: string
): {
  type: string;
  title: string;
  description: string;
  config?: Record<string, any>;
} | null {
  const subjectLower = subject.toLowerCase();

  if (subjectLower.includes('physics')) {
    return {
      type: 'wave',
      title: 'Physics Concept Visualization',
      description: `Interactive visualization to help understand concepts in ${chapterTitle}`,
      config: { subject: 'physics' },
    };
  } else if (subjectLower.includes('chemistry')) {
    return {
      type: 'molecule',
      title: 'Chemical Structure Visualization',
      description: `Interactive molecular visualization for ${chapterTitle}`,
      config: { subject: 'chemistry' },
    };
  } else if (subjectLower.includes('biology') || subjectLower.includes('botany') || subjectLower.includes('zoology')) {
    return {
      type: 'cell',
      title: 'Biological Structure Visualization',
      description: `Interactive biological visualization for ${chapterTitle}`,
      config: { subject: 'biology' },
    };
  }

  // Default fallback for any other subject
  return {
    type: 'default',
    title: 'Chapter Visualization',
    description: `Interactive visualization to enhance understanding of ${chapterTitle}`,
    config: { subject },
  };
}

