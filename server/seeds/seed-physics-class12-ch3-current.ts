import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedPhysicsClass12Chapter3() {
  console.log('Seeding Physics Class 12 Chapter 3: Current Electricity...');

  const chapter = {
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 3,
    chapterTitle: 'Current Electricity',
    introduction: `This chapter introduces electric current, drift of charge carriers, Ohm's law, resistivity, electrical circuits, Kirchhoff's laws, and measuring devices like Wheatstone bridge and potentiometer.`,
    detailedNotes: `# Current Electricity

## Electric Current

- Current is rate of flow of charge: I = dQ/dt.
- Conventional current flows from higher to lower potential.

## Drift Velocity

- Charge carriers drift under electric field.
- I = n e A v_d.

## Ohm's Law and Resistance

- V = I R for ohmic conductors.
- Resistance: R = rho L / A.
- Resistivity depends on material and temperature.

## Power and Energy

- P = V I = I^2 R = V^2 / R.

## Kirchhoff's Laws

- Junction rule: sum I_in = sum I_out.
- Loop rule: algebraic sum of potential changes is zero.

## Cells and Internal Resistance

- Terminal voltage: V = E - I r.

## Wheatstone Bridge and Potentiometer

- Bridge balance: P/Q = R/S.
- Potentiometer measures emf without drawing current.
`,
    keyConcepts: [
      {
        title: "Ohm's Law",
        description: 'Current is proportional to potential difference for ohmic conductors.',
        formula: 'V = I R',
      },
      {
        title: 'Resistivity',
        description: 'Resistance depends on length, area, and material.',
        formula: 'R = rho L / A',
      },
      {
        title: 'Drift Velocity',
        description: 'Microscopic model of current in conductors.',
        formula: 'I = n e A v_d',
      },
      {
        title: 'Electrical Power',
        description: 'Rate of electrical energy transfer.',
        formula: 'P = V I = I^2 R = V^2 / R',
      },
      {
        title: "Kirchhoff's Laws",
        description: 'Conservation of charge and energy in circuits.',
        formula: 'sum I = 0, sum V = 0',
      },
    ],
    formulas: [
      'I = dQ/dt',
      'I = n e A v_d',
      'V = I R',
      'R = rho L / A',
      'P = V I = I^2 R = V^2 / R',
      'V = E - I r',
      'P/Q = R/S (bridge balance)',
      'series: R_eq = R1 + R2 + ...',
      'parallel: 1/R_eq = 1/R1 + 1/R2 + ...',
    ],
    importantTopics: [
      'Current and drift velocity',
      "Ohm's law and resistivity",
      'Series and parallel circuits',
      "Kirchhoff's laws",
      'Cells and internal resistance',
      'Wheatstone bridge and potentiometer',
    ],
    learningObjectives: [
      'Compute current and drift velocity',
      "Apply Ohm's law to circuit problems",
      "Use Kirchhoff's laws in complex circuits",
      'Analyze internal resistance effects',
      'Solve Wheatstone bridge balance problems',
    ],
    prerequisites: [
      'Basic algebra',
      'Electric field and potential basics',
    ],
    ncertChapterRef: 'Class 12 Physics - Chapter 3',
    visualizationsData: [
      {
        type: 'concept',
        title: 'Wheatstone Bridge',
        description: 'Balance conditions and resistance measurement.',
        config: {
          visualizationName: 'wheatstone-circuit',
        },
      },
      {
        type: 'concept',
        title: 'Meter Bridge',
        description: 'Practical bridge for resistance comparison.',
        config: {
          visualizationName: 'metre-bridge',
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

  console.log('Seeded Physics Class 12 Chapter 3');
}

seedPhysicsClass12Chapter3().catch(console.error);
