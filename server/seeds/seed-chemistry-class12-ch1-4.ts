import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryClass12Part1() {
  console.log('Seeding Chemistry Class 12 Chapters 1-4...');

  const chapters = [
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 1,
      chapterTitle: 'The Solid State',
      introduction: `Solids have fixed shape and volume with particles arranged in ordered patterns. This chapter covers crystalline vs amorphous solids, unit cells, packing efficiency, defects, and electrical and magnetic properties.`,
      detailedNotes: `# The Solid State

## Classification of Solids

- Crystalline: long-range order, sharp melting point, anisotropic.
- Amorphous: short-range order, softens over a range, isotropic.

## Unit Cell and Packing

- Unit cell is the smallest repeating unit of a crystal lattice.
- Simple cubic (sc): Z = 1, coordination number 6.
- Body centered cubic (bcc): Z = 2, coordination number 8.
- Face centered cubic (fcc): Z = 4, coordination number 12.
- Packing efficiency: sc 52.4%, bcc 68%, fcc 74%.

## Relations in Cubic Cells

- sc: a = 2r
- bcc: a = 4r / sqrt(3)
- fcc: a = 2 sqrt(2) r
- Density: rho = (Z * M) / (a^3 * N_A)

## Types of Crystalline Solids

- Ionic: hard, brittle, high melting, conduct when molten.
- Covalent network: very hard, high melting, poor conductor.
- Molecular: soft, low melting, non-conducting.
- Metallic: malleable, ductile, good conductor.

## Defects

- Schottky: pair of cation and anion missing, density decreases.
- Frenkel: ion shifts to interstitial, density unchanged.
- F-center: anion vacancy with trapped electron (color centers).

## Magnetic Properties

- Diamagnetic: weakly repelled, no unpaired electrons.
- Paramagnetic: weakly attracted, unpaired electrons.
- Ferromagnetic: strongly attracted, domains align.
`,
      keyConcepts: [
        {
          title: 'Unit Cell Packing',
          description: 'Number of atoms and packing efficiency differ across sc, bcc, and fcc lattices.',
          formula: 'Packing: sc 52.4%, bcc 68%, fcc 74%',
        },
        {
          title: 'Density of Crystal',
          description: 'Crystal density depends on unit cell mass and volume.',
          formula: 'rho = (Z * M) / (a^3 * N_A)',
        },
        {
          title: 'Radius and Edge Length',
          description: 'Edge length relates to atomic radius for cubic cells.',
          formula: 'sc: a = 2r; bcc: a = 4r / sqrt(3); fcc: a = 2 sqrt(2) r',
        },
      ],
      formulas: [
        'rho = (Z * M) / (a^3 * N_A)',
        'sc: a = 2r',
        'bcc: a = 4r / sqrt(3)',
        'fcc: a = 2 sqrt(2) r',
      ],
      importantTopics: [
        'Unit cell and packing efficiency',
        'Cubic lattices and coordination number',
        'Crystal defects and color centers',
        'Magnetic behavior of solids',
      ],
      learningObjectives: [
        'Differentiate crystalline and amorphous solids',
        'Compute density from unit cell data',
        'Relate lattice parameters to atomic radius',
      ],
      prerequisites: [
        'Basic structure of matter',
        'Moles and molar mass',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 1',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Crystal Lattice',
          description: 'Explore common crystal lattice structures.',
          config: {
            visualizationName: 'crystal-lattice',
          },
        },
        {
          type: 'comparison',
          title: 'Crystalline vs Amorphous',
          description: 'Compare order, melting behavior, and properties.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 240,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 2,
      chapterTitle: 'Solutions',
      introduction: `Solutions are homogeneous mixtures with composition-dependent properties. This chapter covers concentration terms, Henry and Raoult laws, colligative properties, and osmotic pressure.`,
      detailedNotes: `# Solutions

## Concentration Terms

- Molarity (M) = moles of solute per liter of solution.
- Molality (m) = moles of solute per kg of solvent.
- Mole fraction: X_A = n_A / (n_A + n_B).

## Henry and Raoult Laws

- Henry law: P = K_H X (gas solubility).
- Raoult law: P_A = P_A0 X_A (ideal solutions).

## Colligative Properties

- Relative lowering of vapor pressure: delta P / P0 = X_solute.
- Boiling point elevation: delta Tb = Kb m.
- Freezing point depression: delta Tf = Kf m.
- Osmotic pressure: pi = C R T.
- van't Hoff factor: i accounts for dissociation or association.

## Ideal vs Non-Ideal

- Ideal solutions obey Raoult law; delta H_mix = 0.
- Positive deviation: A-B interactions weaker than A-A and B-B.
- Negative deviation: A-B interactions stronger.
`,
      keyConcepts: [
        {
          title: 'Raoult Law',
          description: 'Vapor pressure of a component depends on mole fraction.',
          formula: 'P_A = P_A0 X_A',
        },
        {
          title: 'Osmotic Pressure',
          description: 'Pressure required to stop osmosis.',
          formula: 'pi = C R T',
        },
        {
          title: 'Boiling Point Elevation',
          description: 'Boiling point increases with solute concentration.',
          formula: 'delta Tb = Kb m',
        },
        {
          title: 'Freezing Point Depression',
          description: 'Freezing point decreases with solute concentration.',
          formula: 'delta Tf = Kf m',
        },
      ],
      formulas: [
        'X_A = n_A / (n_A + n_B)',
        'P_A = P_A0 X_A',
        'delta P / P0 = X_solute',
        'delta Tb = Kb m',
        'delta Tf = Kf m',
        'pi = C R T',
      ],
      importantTopics: [
        'Concentration terms',
        'Raoult law and vapor pressure',
        'Colligative properties',
        'Osmosis and osmotic pressure',
      ],
      learningObjectives: [
        'Calculate molarity, molality, and mole fraction',
        'Apply Raoult and Henry laws',
        'Use colligative property formulas with van\'t Hoff factor',
      ],
      prerequisites: [
        'Moles and stoichiometry',
        'Gas laws basics',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 2',
      visualizationsData: [
        {
          type: 'concept',
          title: 'pH Curve',
          description: 'Use the titration curve to relate concentration to pH.',
          config: {
            visualizationName: 'ph-curve',
          },
        },
        {
          type: 'graph',
          title: 'Colligative Properties vs Concentration',
          description: 'Graph how delta Tb and delta Tf change with molality.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 260,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 3,
      chapterTitle: 'Electrochemistry',
      introduction: `Electrochemistry connects redox reactions with electrical energy. It covers galvanic cells, electrode potentials, the Nernst equation, electrolysis, Faraday laws, and corrosion.`,
      detailedNotes: `# Electrochemistry

## Conductance in Electrolytes

- Conductance G = 1 / R.
- Conductivity kappa = G * l / A.
- Molar conductivity: Lambda_m = kappa / C.

## Galvanic and Electrolytic Cells

- Galvanic: spontaneous, E_cell > 0.
- Electrolytic: non-spontaneous, E_cell < 0.
- E_cell = E_cathode - E_anode.

## Nernst Equation

- E = E0 - (0.059 / n) log Q at 25 C.
- At equilibrium: E = 0, E0 = (0.059 / n) log K.

## Thermodynamics

- delta G = -n F E.
- When E > 0, delta G < 0 (spontaneous).

## Electrolysis and Faraday Laws

- Mass deposited: m = (M I t) / (n F).
- Charge: Q = I t.

## Corrosion

- Iron rusts via anodic and cathodic reactions.
- Prevention: painting, galvanizing, sacrificial anode.
`,
      keyConcepts: [
        {
          title: 'Cell EMF',
          description: 'Cell potential equals cathode minus anode potential.',
          formula: 'E_cell = E_cathode - E_anode',
        },
        {
          title: 'Nernst Equation',
          description: 'Potential depends on concentration of species.',
          formula: 'E = E0 - (0.059 / n) log Q',
        },
        {
          title: 'Gibbs Energy',
          description: 'Electrical work relates to Gibbs free energy.',
          formula: 'delta G = -n F E',
        },
        {
          title: 'Faraday Law',
          description: 'Mass deposited depends on charge passed.',
          formula: 'm = (M I t) / (n F)',
        },
      ],
      formulas: [
        'G = 1 / R',
        'kappa = G * l / A',
        'Lambda_m = kappa / C',
        'E_cell = E_cathode - E_anode',
        'E = E0 - (0.059 / n) log Q',
        'delta G = -n F E',
        'm = (M I t) / (n F)',
      ],
      importantTopics: [
        'Galvanic and electrolytic cells',
        'Electrode potentials and EMF',
        'Nernst equation',
        'Electrolysis and Faraday laws',
        'Corrosion and prevention',
      ],
      learningObjectives: [
        'Compute cell potential and direction of reaction',
        'Apply the Nernst equation to concentration changes',
        'Use Faraday laws for electrolysis calculations',
      ],
      prerequisites: [
        'Redox reactions',
        'Logarithms',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 3',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Galvanic Cell Layout',
          description: 'Diagram of anode, cathode, and salt bridge.',
        },
        {
          type: 'table',
          title: 'Standard Electrode Potentials',
          description: 'Table of common electrode potentials for quick reference.',
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 300,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 4,
      chapterTitle: 'Chemical Kinetics',
      introduction: `Chemical kinetics explains how fast reactions occur and what controls reaction rate. It covers rate laws, order, integrated rate equations, Arrhenius equation, and catalysis.`,
      detailedNotes: `# Chemical Kinetics

## Rate and Rate Law

- Rate = change in concentration per unit time.
- Rate law: Rate = k [A]^x [B]^y.
- Order = x + y; determined experimentally.

## Integrated Rate Equations

- Zero order: [A] = [A]0 - k t; t1/2 = [A]0 / (2k).
- First order: ln[A] = ln[A]0 - k t; t1/2 = 0.693 / k.
- Second order: 1/[A] = 1/[A]0 + k t; t1/2 = 1 / (k [A]0).

## Temperature Dependence

- Arrhenius equation: k = A e^(-Ea / (R T)).
- Plot ln k vs 1/T gives slope = -Ea / R.

## Catalysis

- Catalyst lowers activation energy and increases rate.
- Enzymes are highly specific biological catalysts.
`,
      keyConcepts: [
        {
          title: 'Rate Law',
          description: 'Rate depends on concentration powers determined by experiment.',
          formula: 'Rate = k [A]^x [B]^y',
        },
        {
          title: 'First Order Half Life',
          description: 'Half life for a first order reaction is constant.',
          formula: 't1/2 = 0.693 / k',
        },
        {
          title: 'Arrhenius Equation',
          description: 'Temperature dependence of the rate constant.',
          formula: 'k = A e^(-Ea / (R T))',
        },
      ],
      formulas: [
        'Rate = k [A]^x [B]^y',
        'Zero order: [A] = [A]0 - k t',
        'First order: ln[A] = ln[A]0 - k t',
        'Second order: 1/[A] = 1/[A]0 + k t',
        't1/2 (first order) = 0.693 / k',
        'k = A e^(-Ea / (R T))',
      ],
      importantTopics: [
        'Rate law and order',
        'Integrated rate equations',
        'Half life relations',
        'Arrhenius equation',
        'Catalysis and enzymes',
      ],
      learningObjectives: [
        'Determine order from rate data',
        'Use integrated rate equations to solve problems',
        'Explain temperature effects on reaction rates',
      ],
      prerequisites: [
        'Logarithms',
        'Basic algebra',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 4',
      visualizationsData: [
        {
          type: 'graph',
          title: 'Concentration vs Time',
          description: 'Compare zero, first, and second order decay curves.',
        },
        {
          type: 'flowchart',
          title: 'Reaction Mechanism Steps',
          description: 'Flowchart of elementary steps and intermediates.',
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 280,
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

  console.log('Chemistry Class 12 chapters 1-4 seeding completed!');
}

seedChemistryClass12Part1().catch(console.error);
