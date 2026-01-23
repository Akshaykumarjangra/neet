import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedPhysicsClass12Magnetism() {
  console.log('Seeding Physics Class 12 Chapters 4-6: Magnetism...');

  const chapters = [
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 4,
      chapterTitle: 'Moving Charges and Magnetism',
      introduction: `This chapter links electricity and magnetism through the magnetic effects of moving charges. It covers Lorentz force, motion of charged particles in magnetic fields, Biot-Savart law, Ampere's law, and force and torque on current-carrying conductors.`,
      detailedNotes: `# Moving Charges and Magnetism

## Magnetic Field and Lorentz Force

- Magnetic field is a vector field that acts on moving charges.
- Force on charge: F = q (v x B).
- Magnitude: F = q v B sin theta.

## Motion of Charged Particle

- Uniform B causes circular motion.
- Radius: r = m v / (q B).
- Period: T = 2 pi m / (q B).

## Biot-Savart Law and Ampere's Law

- Long straight wire: B = mu0 I / (2 pi r).
- Solenoid: B = mu0 n I (inside, nearly uniform).
- Ampere: integral B * dl = mu0 I_enclosed.

## Force on Current and Torque on Loop

- Force on conductor: F = I L B sin theta.
- Torque on loop: tau = N I A B sin theta.
`,
      keyConcepts: [
        {
          title: 'Lorentz Force',
          description: 'Magnetic force acts perpendicular to velocity and field.',
          formula: 'F = q (v x B)',
        },
        {
          title: 'Circular Motion in B',
          description: 'Uniform B produces circular motion of charged particles.',
          formula: 'r = m v / (q B), T = 2 pi m / (q B)',
        },
        {
          title: 'Magnetic Field of Long Wire',
          description: 'Field around a straight current-carrying wire.',
          formula: 'B = mu0 I / (2 pi r)',
        },
        {
          title: 'Force on Current',
          description: 'Current in a magnetic field experiences force.',
          formula: 'F = I L B sin theta',
        },
        {
          title: 'Torque on Loop',
          description: 'Current loop behaves like a magnetic dipole.',
          formula: 'tau = N I A B sin theta',
        },
      ],
      formulas: [
        'F = q (v x B)',
        'F = q v B sin theta',
        'r = m v / (q B)',
        'T = 2 pi m / (q B)',
        'B = mu0 I / (2 pi r)',
        'B = mu0 n I (solenoid)',
        'integral B * dl = mu0 I_enclosed',
        'F = I L B sin theta',
        'tau = N I A B sin theta',
      ],
      importantTopics: [
        'Lorentz force',
        'Motion of charges in magnetic field',
        'Biot-Savart and Ampere laws',
        'Magnetic field of solenoid and toroid',
        'Force and torque on current loops',
      ],
      learningObjectives: [
        'Compute magnetic force on moving charges',
        'Analyze circular motion in magnetic fields',
        'Find magnetic field for common current distributions',
        'Apply force and torque relations for current loops',
      ],
      prerequisites: [
        'Vectors and cross product',
        "Newton's laws of motion",
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 4',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Magnetic Field Lines',
          description: 'Explore magnetic field patterns around currents.',
          config: {
            visualizationName: 'magnetic-field-lines',
          },
        },
        {
          type: 'concept',
          title: 'Charged Particle Motion',
          description: 'Helical path of a charged particle in magnetic field.',
          config: {
            visualizationName: 'helical-motion',
          },
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 360,
      status: 'published' as const,
    },
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 5,
      chapterTitle: 'Magnetism and Matter',
      introduction: `This chapter explains magnetic dipoles, Earth's magnetic field, magnetization of materials, and classification of magnetic substances. It also introduces hysteresis and magnetic properties used in technology.`,
      detailedNotes: `# Magnetism and Matter

## Magnetic Dipole

- A current loop behaves like a magnetic dipole.
- Dipole moment: m = I A.
- Torque: tau = m B sin theta.

## Earth's Magnetic Field

- Defined by declination, inclination, and horizontal component.
- Earth behaves like a giant dipole.

## Magnetization and Materials

- Magnetization: M = magnetic moment per unit volume.
- B = mu0 (H + M).
- Susceptibility: chi = M / H.
- Relative permeability: mu_r = 1 + chi.

## Types of Magnetic Materials

- Diamagnetic: chi < 0 (weakly repelled).
- Paramagnetic: chi > 0 (weakly attracted).
- Ferromagnetic: large chi (strongly attracted).

## Hysteresis

- B-H curve shows lag of magnetization.
- Retentivity and coercivity describe magnetic memory.
`,
      keyConcepts: [
        {
          title: 'Magnetic Dipole Moment',
          description: 'Current loop behaves like a dipole in magnetic field.',
          formula: 'm = I A',
        },
        {
          title: 'Torque on Dipole',
          description: 'Dipole tends to align with magnetic field.',
          formula: 'tau = m B sin theta',
        },
        {
          title: 'Magnetization',
          description: 'Response of materials to magnetic field.',
          formula: 'B = mu0 (H + M)',
        },
        {
          title: 'Susceptibility',
          description: 'Material property describing magnetization.',
          formula: 'chi = M / H',
        },
        {
          title: 'Hysteresis',
          description: 'Magnetic memory in ferromagnets.',
          formula: 'retentivity and coercivity from B-H loop',
        },
      ],
      formulas: [
        'm = I A',
        'tau = m B sin theta',
        'B = mu0 (H + M)',
        'chi = M / H',
        'mu_r = 1 + chi',
      ],
      importantTopics: [
        'Magnetic dipole and torque',
        "Earth's magnetic field",
        'Magnetization and permeability',
        'Dia, para, and ferromagnetism',
        'Hysteresis and magnetic materials',
      ],
      learningObjectives: [
        'Compute torque on magnetic dipoles',
        "Interpret Earth's magnetic elements",
        'Differentiate magnetic materials',
        'Read hysteresis curves for applications',
      ],
      prerequisites: [
        'Magnetic field basics',
        'Vectors and trigonometry',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 5',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Magnetic Field Lines',
          description: 'Field patterns for dipoles and bar magnets.',
          config: {
            visualizationName: 'magnetic-field-lines',
          },
        },
        {
          type: 'concept',
          title: 'Hysteresis Curve',
          description: 'See retentivity and coercivity in ferromagnets.',
          config: {
            visualizationName: 'hysteresis-curve',
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
      chapterNumber: 6,
      chapterTitle: 'Electromagnetic Induction',
      introduction: `Electromagnetic induction explains how changing magnetic flux produces induced emf. This chapter covers Faraday's laws, Lenz's law, motional emf, inductance, energy stored in inductors, and practical applications like generators and transformers.`,
      detailedNotes: `# Electromagnetic Induction

## Faraday's Laws

- Induced emf equals rate of change of magnetic flux.
- Direction given by Lenz's law (opposes change).

## Magnetic Flux

- Flux: phi = B A cos theta.
- Induced emf: emf = - dphi/dt.

## Motional emf

- A conductor moving in B develops emf.
- emf = B L v (for perpendicular motion).

## Inductance

- Self inductance: emf = -L dI/dt.
- Mutual inductance: emf in secondary = -M dI/dt.

## Energy in Inductor

- Energy stored: U = 0.5 L I^2.

## Eddy Currents

- Induced currents in bulk conductors oppose changes in flux.
`,
      keyConcepts: [
        {
          title: "Faraday's Law",
          description: 'Induced emf is proportional to rate of change of flux.',
          formula: 'emf = -dphi/dt',
        },
        {
          title: 'Magnetic Flux',
          description: 'Flux depends on field, area, and orientation.',
          formula: 'phi = B A cos theta',
        },
        {
          title: 'Motional emf',
          description: 'Moving conductor cuts magnetic field lines.',
          formula: 'emf = B L v',
        },
        {
          title: 'Inductance',
          description: 'Opposes change in current through induced emf.',
          formula: 'emf = -L dI/dt',
        },
        {
          title: 'Energy in Inductor',
          description: 'Magnetic field stores energy in inductors.',
          formula: 'U = 0.5 L I^2',
        },
      ],
      formulas: [
        'phi = B A cos theta',
        'emf = -dphi/dt',
        'emf = B L v',
        'emf = -L dI/dt',
        'emf_secondary = -M dI/dt',
        'U = 0.5 L I^2',
      ],
      importantTopics: [
        "Faraday and Lenz laws",
        'Motional emf',
        'Self and mutual inductance',
        'Energy in inductors',
        'Eddy currents',
      ],
      learningObjectives: [
        'Compute induced emf from changing flux',
        "Apply Lenz's law for direction",
        'Solve problems involving inductance',
        'Explain eddy current applications',
      ],
      prerequisites: [
        'Magnetic field concepts',
        'Calculus basics for rate of change',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 6',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Faraday Induction',
          description: 'See emf induced by changing magnetic flux.',
          config: {
            visualizationName: 'faraday-induction',
          },
        },
        {
          type: 'concept',
          title: 'Transformer Basics',
          description: 'Visualize mutual induction in coils.',
          config: {
            visualizationName: 'transformer-3d',
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

  console.log('Physics Class 12 chapters 4-6 seeding completed!');
}

seedPhysicsClass12Magnetism().catch(console.error);
