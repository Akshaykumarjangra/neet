import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedPhysicsClass12Chapter1() {
  console.log('Seeding Physics Class 12 Chapter 1: Electric Charges and Fields...');

  const chapter = {
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 1,
    chapterTitle: 'Electric Charges and Fields',
    introduction: `Electric charges and the forces between them form the foundation of electrostatics. This chapter covers charge quantization and conservation, Coulomb's law, electric field and field lines, electric dipoles, and Gauss's law for symmetric charge distributions.`,
    detailedNotes: `# Electric Charges and Fields

## Electric Charge

- Two types: positive and negative.
- Quantization: q = n e, where e = 1.6e-19 C.
- Conservation: total charge in an isolated system remains constant.

## Coulomb's Law

- Force between point charges: F = k q1 q2 / r^2.
- k = 1 / (4 pi epsilon0).
- Direction is along the line joining the charges.

## Electric Field

- Electric field is force per unit test charge: E = F / q0.
- For a point charge: E = k q / r^2.
- Superposition applies to multiple charges.

## Electric Flux and Gauss's Law

- Electric flux: phi = E * A * cos theta.
- Gauss's law: integral E * dA = Q_enclosed / epsilon0.
- Applications: infinite line charge, infinite plane sheet, spherical shell.

## Electric Dipole

- Dipole moment: p = q * 2a (from negative to positive).
- Torque in uniform field: tau = p E sin theta.
- Potential energy: U = -p E cos theta.
`,
    keyConcepts: [
      {
        title: "Coulomb's Law",
        description: 'Electrostatic force between two point charges is inverse-square in distance.',
        formula: 'F = k q1 q2 / r^2',
      },
      {
        title: 'Electric Field',
        description: 'Field is force per unit test charge and follows superposition.',
        formula: 'E = k q / r^2',
      },
      {
        title: 'Electric Flux',
        description: 'Measures field crossing a surface.',
        formula: 'phi = E * A * cos theta',
      },
      {
        title: "Gauss's Law",
        description: 'Flux through a closed surface equals enclosed charge over epsilon0.',
        formula: 'integral E * dA = Q_enclosed / epsilon0',
      },
      {
        title: 'Electric Dipole',
        description: 'Pair of equal and opposite charges with dipole moment.',
        formula: 'p = q * 2a, tau = p E sin theta',
      },
    ],
    formulas: [
      'q = n e',
      'k = 1 / (4 pi epsilon0)',
      'F = k q1 q2 / r^2',
      'E = k q / r^2',
      'phi = E * A * cos theta',
      'integral E * dA = Q_enclosed / epsilon0',
      'p = q * 2a',
      'tau = p E sin theta',
      'E_line = lambda / (2 pi epsilon0 r)',
      'E_plane = sigma / (2 epsilon0)',
    ],
    importantTopics: [
      'Quantization and conservation of charge',
      "Coulomb's law and superposition",
      'Electric field and field lines',
      "Electric flux and Gauss's law",
      'Electric dipole and torque',
    ],
    learningObjectives: [
      "Apply Coulomb's law to compute forces",
      'Compute electric field from point charges',
      "Use Gauss's law for symmetric charge distributions",
      'Analyze dipole behavior in uniform fields',
      'Interpret electric flux and field lines',
    ],
    prerequisites: [
      'Basic algebra and trigonometry',
      'Vector concepts',
    ],
    ncertChapterRef: 'Class 12 Physics - Chapter 1',
    visualizationsData: [
      {
        type: 'concept',
        title: 'Electric Field Lines',
        description: 'Visualize field lines around point charges and dipoles.',
        config: {
          visualizationName: 'electric-field-3d',
        },
      },
      {
        type: 'concept',
        title: 'Uniform Field Between Plates',
        description: 'See nearly uniform fields between parallel plates.',
        config: {
          visualizationName: 'parallel-plate-capacitor',
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

  console.log('Seeded Physics Class 12 Chapter 1');
}

seedPhysicsClass12Chapter1().catch(console.error);
