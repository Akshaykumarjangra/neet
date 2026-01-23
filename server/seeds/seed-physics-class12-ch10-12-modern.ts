import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedPhysicsClass12Modern() {
  console.log('Seeding Physics Class 12 Chapters 10-12: Wave Optics and Modern Physics...');

  const chapters = [
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 10,
      chapterTitle: 'Wave Optics',
      introduction: `Wave optics explains interference, diffraction, and polarization of light. This chapter covers Young's double slit experiment, fringe width, diffraction conditions, and polarization concepts.`,
      detailedNotes: `# Wave Optics

## Interference

- Superposition of waves produces maxima and minima.
- Young's double slit: bright and dark fringes on a screen.
- Fringe width: beta = lambda D / d.

## Diffraction

- Bending of light around obstacles.
- Single slit minima: a sin theta = m lambda (m = 1, 2, 3...).

## Polarization

- Light is transverse, so it can be polarized.
- Malus law: I = I0 cos^2 theta.
- Brewster law: tan i_p = n.
`,
      keyConcepts: [
        {
          title: 'Fringe Width',
          description: 'Spacing between adjacent bright fringes in YDSE.',
          formula: 'beta = lambda D / d',
        },
        {
          title: 'Path Difference',
          description: 'Interference depends on path difference between two waves.',
          formula: 'delta = d sin theta',
        },
        {
          title: 'Diffraction Minima',
          description: 'Condition for minima in single slit diffraction.',
          formula: 'a sin theta = m lambda',
        },
        {
          title: 'Malus Law',
          description: 'Intensity after polarization.',
          formula: 'I = I0 cos^2 theta',
        },
        {
          title: 'Brewster Law',
          description: 'Polarizing angle for reflected light.',
          formula: 'tan i_p = n',
        },
      ],
      formulas: [
        'beta = lambda D / d',
        'delta = d sin theta',
        'a sin theta = m lambda',
        'I = I0 cos^2 theta',
        'tan i_p = n',
      ],
      importantTopics: [
        "Young's double slit experiment",
        'Interference fringes',
        'Diffraction from single slit',
        'Polarization and Brewster angle',
      ],
      learningObjectives: [
        'Calculate fringe width and fringe positions',
        'Apply diffraction conditions',
        'Explain polarization and Malus law',
      ],
      prerequisites: [
        'Basic wave properties',
        'Trigonometry',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 10',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Interference Pattern',
          description: 'Visualize interference fringes from two sources.',
          config: {
            visualizationName: 'interference-pattern',
          },
        },
        {
          type: 'concept',
          title: 'Polarization',
          description: 'Explore plane polarization and Malus law.',
          config: {
            visualizationName: 'polarization-light',
          },
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 330,
      status: 'published' as const,
    },
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 11,
      chapterTitle: 'Dual Nature of Radiation and Matter',
      introduction: `This chapter establishes the particle nature of light and the wave nature of matter. It covers the photoelectric effect, Einstein's equation, de Broglie wavelength, and basic quantum ideas.`,
      detailedNotes: `# Dual Nature of Radiation and Matter

## Photoelectric Effect

- Light ejects electrons from metal surfaces.
- Threshold frequency f0 is required.
- Maximum kinetic energy: K_max = h f - phi.
- Stopping potential: e V_s = K_max.

## de Broglie Wavelength

- Matter has wave nature: lambda = h / p.
- For electrons: lambda = h / sqrt(2 m e V).

## Wave-Particle Duality

- Light shows particle behavior (photons).
- Matter shows wave behavior (electron diffraction).
`,
      keyConcepts: [
        {
          title: 'Photoelectric Equation',
          description: 'Energy balance for photoemission.',
          formula: 'K_max = h f - phi',
        },
        {
          title: 'Stopping Potential',
          description: 'Potential needed to stop photoelectrons.',
          formula: 'e V_s = K_max',
        },
        {
          title: 'de Broglie Wavelength',
          description: 'Wave nature of particles.',
          formula: 'lambda = h / p',
        },
        {
          title: 'Photon Energy',
          description: 'Energy of a photon depends on frequency.',
          formula: 'E = h f',
        },
        {
          title: 'Threshold Frequency',
          description: 'Minimum frequency required for emission.',
          formula: 'f0 = phi / h',
        },
      ],
      formulas: [
        'K_max = h f - phi',
        'e V_s = K_max',
        'E = h f',
        'lambda = h / p',
        'lambda = h / sqrt(2 m e V)',
      ],
      importantTopics: [
        'Photoelectric effect',
        'Einstein photoelectric equation',
        'de Broglie hypothesis',
        'Particle nature of light',
      ],
      learningObjectives: [
        'Explain photoelectric observations',
        'Compute kinetic energy of photoelectrons',
        'Calculate de Broglie wavelength',
      ],
      prerequisites: [
        'Basic modern physics terms',
        'Energy and momentum',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 11',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Photoelectric Effect',
          description: 'See electron emission as frequency changes.',
          config: {
            visualizationName: 'photoelectric-effect',
          },
        },
        {
          type: 'concept',
          title: 'Compton Effect',
          description: 'Photon scattering and wavelength shift.',
          config: {
            visualizationName: 'compton-effect',
          },
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 300,
      status: 'published' as const,
    },
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 12,
      chapterTitle: 'Atoms',
      introduction: `This chapter covers atomic structure models, Bohr's model of hydrogen, quantized energy levels, and atomic spectra. It explains how spectral lines arise from electronic transitions.`,
      detailedNotes: `# Atoms

## Bohr Model

- Electrons revolve in discrete orbits with quantized angular momentum.
- Angular momentum: m v r = n h / (2 pi).

## Energy Levels

- Energy of nth orbit: E_n = -13.6 Z^2 / n^2 eV.
- Radius: r_n = n^2 a0 / Z.

## Spectral Lines

- Transition between levels emits or absorbs photons.
- delta E = h f.
- Hydrogen spectrum: 1/lambda = R Z^2 (1/n1^2 - 1/n2^2).
`,
      keyConcepts: [
        {
          title: 'Bohr Quantization',
          description: 'Angular momentum is quantized in Bohr model.',
          formula: 'm v r = n h / (2 pi)',
        },
        {
          title: 'Energy Levels',
          description: 'Energy depends on principal quantum number.',
          formula: 'E_n = -13.6 Z^2 / n^2 eV',
        },
        {
          title: 'Orbit Radius',
          description: 'Radius of nth orbit in hydrogen-like atoms.',
          formula: 'r_n = n^2 a0 / Z',
        },
        {
          title: 'Spectral Lines',
          description: 'Photons emitted during transitions.',
          formula: 'delta E = h f',
        },
        {
          title: 'Rydberg Formula',
          description: 'Spectral series for hydrogen-like atoms.',
          formula: '1/lambda = R Z^2 (1/n1^2 - 1/n2^2)',
        },
      ],
      formulas: [
        'm v r = n h / (2 pi)',
        'E_n = -13.6 Z^2 / n^2 eV',
        'r_n = n^2 a0 / Z',
        'delta E = h f',
        '1/lambda = R Z^2 (1/n1^2 - 1/n2^2)',
      ],
      importantTopics: [
        'Bohr model and quantization',
        'Energy levels and spectral lines',
        'Hydrogen spectrum',
      ],
      learningObjectives: [
        'Use Bohr model to compute radii and energies',
        'Explain spectral line formation',
        'Apply Rydberg formula for wavelengths',
      ],
      prerequisites: [
        'Dual nature of radiation and matter',
        'Basic algebra',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 12',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Atomic Spectrum',
          description: 'See discrete spectral lines from transitions.',
          config: {
            visualizationName: 'atomic-spectrum',
          },
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 300,
      status: 'published' as const,
    },
  ];

  for (const chapter of chapters) {
    await db
      .insert(chapterContent)
      .values(chapter)
      .onConflictDoUpdate({
        target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
        set: {
          chapterTitle: chapter.chapterTitle,
          introduction: chapter.introduction,
          detailedNotes: chapter.detailedNotes,
          keyConcepts: chapter.keyConcepts,
          formulas: chapter.formulas,
          importantTopics: chapter.importantTopics,
          learningObjectives: chapter.learningObjectives,
          prerequisites: chapter.prerequisites,
          ncertChapterRef: chapter.ncertChapterRef,
          visualizationsData: chapter.visualizationsData,
          difficultyLevel: chapter.difficultyLevel,
          estimatedStudyMinutes: chapter.estimatedStudyMinutes,
          status: chapter.status,
          updatedAt: new Date(),
        },
      });

    console.log(`  Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle} upserted`);
  }

  console.log('Physics Class 12 chapters 10-12 seeding completed!');
}

seedPhysicsClass12Modern().catch(console.error);
