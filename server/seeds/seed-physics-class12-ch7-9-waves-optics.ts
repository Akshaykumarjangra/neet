import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedPhysicsClass12WavesOptics() {
  console.log('Seeding Physics Class 12 Chapters 7-9: AC, EM Waves, and Ray Optics...');

  const chapters = [
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 7,
      chapterTitle: 'Alternating Current',
      introduction: 'Alternating current varies sinusoidally with time. This chapter covers AC emf and current, RMS values, reactance, impedance in LCR circuits, resonance, power factor, and basic transformer ideas.',
      detailedNotes: `# Alternating Current

## AC Voltage and Current

- AC voltage: v = V0 sin(omega t).
- AC current: i = I0 sin(omega t + phi).

## RMS Values

- V_rms = V0 / sqrt(2).
- I_rms = I0 / sqrt(2).

## Reactance and Impedance

- Inductive reactance: X_L = omega L.
- Capacitive reactance: X_C = 1 / (omega C).
- Impedance: Z = sqrt(R^2 + (X_L - X_C)^2).

## Resonance

- In series LCR, resonance when X_L = X_C.
- Resonant frequency: omega0 = 1 / sqrt(L C).

## Power in AC

- Average power: P = V_rms I_rms cos phi.
- cos phi is the power factor.

## Transformer (idea)

- Works on mutual induction with alternating current.
`,
      keyConcepts: [
        {
          title: 'RMS Values',
          description: 'Effective values of AC voltage and current.',
          formula: 'V_rms = V0 / sqrt(2), I_rms = I0 / sqrt(2)',
        },
        {
          title: 'Reactance',
          description: 'Opposition offered by L and C to AC.',
          formula: 'X_L = omega L, X_C = 1 / (omega C)',
        },
        {
          title: 'Impedance',
          description: 'Total opposition in LCR circuits.',
          formula: 'Z = sqrt(R^2 + (X_L - X_C)^2)',
        },
        {
          title: 'Resonance',
          description: 'Circuit is purely resistive at resonance.',
          formula: 'omega0 = 1 / sqrt(L C)',
        },
        {
          title: 'Average Power',
          description: 'Depends on power factor cos phi.',
          formula: 'P = V_rms I_rms cos phi',
        },
      ],
      formulas: [
        'v = V0 sin(omega t)',
        'i = I0 sin(omega t + phi)',
        'V_rms = V0 / sqrt(2)',
        'I_rms = I0 / sqrt(2)',
        'X_L = omega L',
        'X_C = 1 / (omega C)',
        'Z = sqrt(R^2 + (X_L - X_C)^2)',
        'omega0 = 1 / sqrt(L C)',
        'P = V_rms I_rms cos phi',
      ],
      importantTopics: [
        'AC waveforms',
        'RMS values',
        'Reactance and impedance',
        'Series LCR resonance',
        'Power factor',
      ],
      learningObjectives: [
        'Compute RMS values for sinusoidal AC',
        'Analyze LCR circuits and resonance',
        'Determine impedance and phase angle',
        'Calculate average power in AC circuits',
      ],
      prerequisites: [
        'Current electricity basics',
        'Trigonometric functions',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 7',
      visualizationsData: [
        {
          type: 'concept',
          title: 'AC Circuit Phasors',
          description: 'Visualize phase relations and impedance.',
          config: {
            visualizationName: 'ac-circuit',
          },
        },
        {
          type: 'concept',
          title: 'Transformer Basics',
          description: 'Mutual induction and turns ratio.',
          config: {
            visualizationName: 'transformer-3d',
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
      chapterNumber: 8,
      chapterTitle: 'Electromagnetic Waves',
      introduction: 'Electromagnetic waves are transverse waves of electric and magnetic fields that propagate without a medium. This chapter covers wave properties, speed of light, energy transport, and the electromagnetic spectrum.',
      detailedNotes: `# Electromagnetic Waves

## Nature of EM Waves

- EM waves are transverse: E and B are perpendicular to each other and to direction of propagation.
- Do not require a material medium.

## Speed of EM Waves

- Speed in vacuum: c = 1 / sqrt(mu0 epsilon0).
- Relation: E0 / B0 = c.

## Energy Transport

- Poynting vector: S = (1/mu0) (E x B).
- Intensity is average magnitude of S.

## Electromagnetic Spectrum

- Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.
- Wavelength decreases and frequency increases across the spectrum.
`,
      keyConcepts: [
        {
          title: 'Wave Speed',
          description: 'Speed of EM waves in vacuum from constants.',
          formula: 'c = 1 / sqrt(mu0 epsilon0)',
        },
        {
          title: 'Field Relation',
          description: 'Electric and magnetic fields are linked in EM waves.',
          formula: 'E0 / B0 = c',
        },
        {
          title: 'Poynting Vector',
          description: 'Energy flow per unit area per unit time.',
          formula: 'S = (1/mu0) (E x B)',
        },
        {
          title: 'Transverse Nature',
          description: 'E and B are perpendicular to each other and direction of travel.',
          formula: 'E perpendicular to B and direction of travel',
        },
        {
          title: 'Spectrum Order',
          description: 'Wavelength decreases from radio to gamma rays.',
          formula: 'c = lambda f',
        },
      ],
      formulas: [
        'c = 1 / sqrt(mu0 epsilon0)',
        'E0 / B0 = c',
        'S = (1/mu0) (E x B)',
        'c = lambda f',
      ],
      importantTopics: [
        'Transverse nature of EM waves',
        'Speed of light from constants',
        'Energy transport and Poynting vector',
        'Electromagnetic spectrum',
      ],
      learningObjectives: [
        'Relate E and B fields in EM waves',
        'Compute speed from mu0 and epsilon0',
        'Explain energy flow using Poynting vector',
        'Identify regions of the EM spectrum',
      ],
      prerequisites: [
        'Basic wave properties',
        'Electric and magnetic fields',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 8',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Electromagnetic Wave',
          description: 'Visualize oscillating E and B fields.',
          config: {
            visualizationName: 'em-wave',
          },
        },
        {
          type: 'concept',
          title: 'Polarization',
          description: 'Understand polarization of EM waves.',
          config: {
            visualizationName: 'polarization-light',
          },
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 240,
      status: 'published' as const,
    },
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 9,
      chapterTitle: 'Ray Optics and Optical Instruments',
      introduction: 'Ray optics studies reflection and refraction of light using ray diagrams. This chapter covers mirrors, lenses, total internal reflection, and optical instruments like microscopes and telescopes.',
      detailedNotes: `# Ray Optics and Optical Instruments

## Reflection and Refraction

- Law of reflection: angle of incidence equals angle of reflection.
- Snell's law: n1 sin i = n2 sin r.

## Mirrors and Lenses

- Mirror formula: 1/f = 1/v + 1/u.
- Lens formula: 1/f = 1/v - 1/u.
- Magnification: m = v/u.

## Total Internal Reflection

- Occurs when light goes from denser to rarer medium and i > i_c.
- Critical angle: sin i_c = n2 / n1.

## Optical Instruments

- Compound microscope and astronomical telescope use lenses to magnify images.
`,
      keyConcepts: [
        {
          title: "Snell's Law",
          description: 'Relates angles of incidence and refraction.',
          formula: 'n1 sin i = n2 sin r',
        },
        {
          title: 'Mirror Formula',
          description: 'Image formation by spherical mirrors.',
          formula: '1/f = 1/v + 1/u',
        },
        {
          title: 'Lens Formula',
          description: 'Image formation by thin lenses.',
          formula: '1/f = 1/v - 1/u',
        },
        {
          title: 'Magnification',
          description: 'Size ratio of image to object.',
          formula: 'm = v/u',
        },
        {
          title: 'Total Internal Reflection',
          description: 'Light reflects fully at an interface beyond critical angle.',
          formula: 'sin i_c = n2 / n1',
        },
      ],
      formulas: [
        'n1 sin i = n2 sin r',
        '1/f = 1/v + 1/u',
        '1/f = 1/v - 1/u',
        'm = v/u',
        'sin i_c = n2 / n1',
      ],
      importantTopics: [
        'Reflection and refraction laws',
        'Image formation by mirrors and lenses',
        'Total internal reflection',
        'Optical instruments',
      ],
      learningObjectives: [
        'Use ray diagrams to locate images',
        'Apply lens and mirror formulas',
        'Determine conditions for total internal reflection',
        'Explain working of microscope and telescope',
      ],
      prerequisites: [
        'Basic geometry and trigonometry',
        'Wave basics',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 9',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Ray Optics',
          description: 'Trace rays through mirrors and lenses.',
          config: {
            visualizationName: 'ray-optics',
          },
        },
        {
          type: 'concept',
          title: 'Lens Maker Formula',
          description: 'Explore how curvature affects focal length.',
          config: {
            visualizationName: 'lens-maker-formula',
          },
        },
        {
          type: 'concept',
          title: 'Compound Microscope',
          description: 'Visualize image formation in microscopes.',
          config: {
            visualizationName: 'compound-microscope',
          },
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 360,
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

  console.log('Physics Class 12 chapters 7-9 seeding completed!');
}

seedPhysicsClass12WavesOptics().catch(console.error);
