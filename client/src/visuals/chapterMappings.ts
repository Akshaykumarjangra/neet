
export interface ChapterVisualizationMapping {
  chapterId: string;
  subject: 'physics' | 'chemistry' | 'biology';
  visualizations: string[];
  layout?: 'grid' | 'tabs' | 'accordion';
}

export const chapterVisualizations: ChapterVisualizationMapping[] = [
  // ===== PHYSICS CHAPTERS =====
  {
    chapterId: 'physics-01',
    subject: 'physics',
    visualizations: ['vernier-caliper', 'screw-gauge'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-02',
    subject: 'physics',
    visualizations: ['motion-graphs', 'position-velocity-graph'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-03',
    subject: 'physics',
    visualizations: ['projectile-motion'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-04',
    subject: 'physics',
    visualizations: ['block-on-ramp', 'collision-lab'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-05',
    subject: 'physics',
    visualizations: ['spring-energy-bar', 'collision-lab'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-06',
    subject: 'physics',
    visualizations: ['angular-momentum', 'torque-wrench'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-07',
    subject: 'physics',
    visualizations: ['planetary-orbit'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-08',
    subject: 'physics',
    visualizations: ['planetary-orbit', 'angular-momentum'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-09',
    subject: 'physics',
    visualizations: ['stress-strain-curve', 'venturi-tube'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-10',
    subject: 'physics',
    visualizations: ['carnot-cycle', 'calorimetry'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-11',
    subject: 'physics',
    visualizations: [
      'photoelectric-effect',
      'compton-effect',
      'atomic-spectrum',
      'helical-motion',
      'em-wave',
      'doppler-effect',
      'interference-pattern',
      'polarization-light',
      'xray-diffraction',
      'nuclear-fission'
    ],
    layout: 'tabs'
  },
  {
    chapterId: 'physics-12',
    subject: 'physics',
    visualizations: ['gas-molecules', 'avogadro-jar'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-13',
    subject: 'physics',
    visualizations: ['simple-pendulum-phase', 'standing-wave', 'resonance-tube', 'doppler-effect'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-14',
    subject: 'physics',
    visualizations: ['electric-field-3d', 'parallel-plate-capacitor'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-15',
    subject: 'physics',
    visualizations: ['parallel-plate-capacitor', 'electric-field-3d'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-16',
    subject: 'physics',
    visualizations: ['wheatstone-circuit', 'metre-bridge', 'ac-circuit'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-17',
    subject: 'physics',
    visualizations: ['magnetic-field-lines', 'faraday-induction', 'transformer-3d'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-18',
    subject: 'physics',
    visualizations: ['magnetic-field-lines', 'hysteresis-curve'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-19',
    subject: 'physics',
    visualizations: ['faraday-induction', 'transformer-3d', 'ac-circuit'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-20',
    subject: 'physics',
    visualizations: ['ray-optics', 'lens-maker-formula', 'compound-microscope', 'interference-pattern'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-21',
    subject: 'physics',
    visualizations: ['ac-circuit', 'transformer-3d'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-22',
    subject: 'physics',
    visualizations: ['em-wave', 'polarization-light'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-23',
    subject: 'physics',
    visualizations: ['photoelectric-effect', 'compton-effect'],
    layout: 'grid'
  },
  {
    chapterId: 'physics-24',
    subject: 'physics',
    visualizations: ['pn-junction', 'logic-gates'],
    layout: 'grid'
  },

  // ===== CHEMISTRY CHAPTERS =====
  {
    chapterId: 'chemistry-01',
    subject: 'chemistry',
    visualizations: ['avogadro-jar'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-02',
    subject: 'chemistry',
    visualizations: ['atomic-spectrum'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-03',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-04',
    subject: 'chemistry',
    visualizations: ['molecular-orbital', 'crystal-lattice'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-05',
    subject: 'chemistry',
    visualizations: ['gas-molecules'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-06',
    subject: 'chemistry',
    visualizations: ['carnot-cycle', 'calorimetry'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-07',
    subject: 'chemistry',
    visualizations: ['ph-curve'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-08',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-09',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-10',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-11',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-12',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-14',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-17',
    subject: 'chemistry',
    visualizations: ['crystal-lattice'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-18',
    subject: 'chemistry',
    visualizations: ['molecular-orbital'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-19',
    subject: 'chemistry',
    visualizations: ['molecular-orbital'],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-20',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-21',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },
  {
    chapterId: 'chemistry-22',
    subject: 'chemistry',
    visualizations: [],
    layout: 'grid'
  },

  // ===== BIOLOGY CHAPTERS (BOTANY & ZOOLOGY) =====
  // Botany Chapters
  {
    chapterId: 'botany-07',
    subject: 'biology',
    visualizations: [], // Future: cell-cycle-animation, mitosis-3d, meiosis-3d
    layout: 'grid'
  },
  {
    chapterId: 'botany-16',
    subject: 'biology',
    visualizations: [], // Future: dna-structure-3d, dna-replication, transcription-translation
    layout: 'grid'
  },
  {
    chapterId: 'botany-33',
    subject: 'biology',
    visualizations: [], // Future: photosynthesis-process, chloroplast-3d, light-dark-reactions
    layout: 'grid'
  },
  {
    chapterId: 'botany-34',
    subject: 'biology',
    visualizations: [], // Future: respiration-process, mitochondria-3d, krebs-cycle
    layout: 'grid'
  },

  // Zoology Chapters
  {
    chapterId: 'zoology-04',
    subject: 'biology',
    visualizations: [], // Future: digestive-system-3d, enzyme-action
    layout: 'grid'
  },
  {
    chapterId: 'zoology-17',
    subject: 'biology',
    visualizations: [], // Future: immune-system-3d, antibody-antigen
    layout: 'grid'
  },
];

export function getChapterVisualizations(chapterId: string): ChapterVisualizationMapping | null {
  return chapterVisualizations.find(mapping => mapping.chapterId === chapterId) || null;
}

export function getVisualizationsBySubject(subject: 'physics' | 'chemistry' | 'biology'): ChapterVisualizationMapping[] {
  return chapterVisualizations.filter(mapping => mapping.subject === subject);
}
