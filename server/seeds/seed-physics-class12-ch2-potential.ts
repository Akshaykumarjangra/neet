import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedPhysicsClass12Chapter2() {
  console.log('Seeding Physics Class 12 Chapter 2: Electrostatic Potential and Capacitance...');

  const chapter = {
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 2,
    chapterTitle: 'Electrostatic Potential and Capacitance',
    introduction: 'Electrostatic potential gives an energy-based description of electric fields. This chapter covers potential and potential difference, relation between field and potential, equipotential surfaces, capacitors, combinations of capacitors, dielectrics, and energy stored in electric fields.',
    detailedNotes: `# Electrostatic Potential and Capacitance

## Electrostatic Potential

- Potential at a point is work done per unit positive charge in bringing it from infinity.
- For a point charge: V = k q / r.
- Potential is a scalar and follows superposition.

## Relation Between E and V

- Electric field points from higher to lower potential.
- In one dimension: E = -dV/dr.
- In general: E = -grad V.

## Equipotential Surfaces

- No work is done moving a charge along an equipotential surface.
- Electric field is perpendicular to equipotential surfaces.

## Capacitance

- Capacitance C = Q / V.
- Parallel plate capacitor: C = epsilon0 A / d.
- With dielectric: C = k * epsilon0 A / d.

## Energy Stored

- Energy in capacitor: U = 0.5 C V^2 = Q^2/(2C) = 0.5 Q V.
`,
    keyConcepts: [
      {
        title: 'Potential of Point Charge',
        description: 'Potential is work per unit charge; scalar addition applies.',
        formula: 'V = k q / r',
      },
      {
        title: 'Field-Potential Relation',
        description: 'Electric field is the negative gradient of potential.',
        formula: 'E = -dV/dr',
      },
      {
        title: 'Capacitance',
        description: 'Ability of a system to store charge.',
        formula: 'C = Q / V',
      },
      {
        title: 'Parallel Plate Capacitor',
        description: 'Capacitance depends on area and plate separation.',
        formula: 'C = epsilon0 A / d',
      },
      {
        title: 'Energy Stored',
        description: 'Electric field stores energy in a capacitor.',
        formula: 'U = 0.5 C V^2',
      },
    ],
    formulas: [
      'V = k q / r',
      'V = - integral E * dl',
      'E = -dV/dr',
      'C = Q / V',
      'C_parallel = C1 + C2 + ...',
      '1/C_series = 1/C1 + 1/C2 + ...',
      'C = epsilon0 A / d',
      'C_dielectric = k * epsilon0 A / d',
      'U = 0.5 C V^2 = Q^2/(2C) = 0.5 Q V',
    ],
    importantTopics: [
      'Electrostatic potential and potential difference',
      'Equipotential surfaces',
      'Relation between E and V',
      'Capacitance and capacitor combinations',
      'Energy stored in electric fields',
    ],
    learningObjectives: [
      'Compute potential for simple charge distributions',
      'Relate electric field to potential',
      'Analyze capacitors in series and parallel',
      'Evaluate energy stored in capacitors',
      'Understand dielectric effects on capacitance',
    ],
    prerequisites: [
      'Electric field basics',
      'Algebra and calculus basics',
    ],
    ncertChapterRef: 'Class 12 Physics - Chapter 2',
    visualizationsData: [
      {
        type: 'concept',
        title: 'Parallel Plate Capacitor',
        description: 'Observe field distribution and capacitance factors.',
        config: {
          visualizationName: 'parallel-plate-capacitor',
        },
      },
      {
        type: 'concept',
        title: 'Electric Field and Potential',
        description: 'Connect field strength to potential change with distance.',
        config: {
          visualizationName: 'electric-field-3d',
        },
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: 'published' as const,
  };

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

  console.log('Seeded Physics Class 12 Chapter 2');
}

seedPhysicsClass12Chapter2().catch(console.error);
