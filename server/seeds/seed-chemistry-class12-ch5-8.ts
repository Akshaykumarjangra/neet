import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryClass12Part2() {
  console.log('Seeding Chemistry Class 12 Chapters 5-8...');

  const chapters = [
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 5,
      chapterTitle: 'Surface Chemistry',
      introduction: `Surface chemistry studies adsorption, catalysis, and colloids. It explains how molecules interact at surfaces and why surface area, temperature, and pressure affect adsorption.`,
      detailedNotes: `# Surface Chemistry

## Adsorption Basics

- Adsorption: accumulation of a substance at a surface.
- Absorption: distribution throughout the bulk.
- Adsorbent: surface; adsorbate: substance adsorbed.

## Types of Adsorption

- Physisorption: weak forces, low heat, reversible, multilayer.
- Chemisorption: chemical bonds, high heat, often irreversible, monolayer.

## Adsorption Isotherms

- Freundlich: x/m = k P^(1/n); log(x/m) = log k + (1/n) log P.
- Langmuir: monolayer model, finite sites.

## Catalysis

- Homogeneous: catalyst and reactants in same phase.
- Heterogeneous: different phases; adsorption on catalyst surface.
- Enzymes: biological catalysts with high specificity.

## Colloids

- Dispersed phase in dispersion medium (1 to 1000 nm).
- Lyophilic (stable) vs lyophobic (unstable).
- Tyndall effect and Brownian motion are characteristic.
- Coagulation by electrolytes; higher charge ions are more effective.
`,
      keyConcepts: [
        {
          title: 'Adsorption',
          description: 'Surface accumulation differs from bulk absorption.',
        },
        {
          title: 'Freundlich Isotherm',
          description: 'Empirical relation between adsorption and pressure.',
          formula: 'x/m = k P^(1/n)',
        },
        {
          title: 'Langmuir Isotherm',
          description: 'Monolayer adsorption on finite sites.',
          formula: 'theta = (b P) / (1 + b P)',
        },
        {
          title: 'Tyndall Effect',
          description: 'Scattering of light by colloidal particles.',
        },
      ],
      formulas: [
        'x/m = k P^(1/n)',
        'log(x/m) = log k + (1/n) log P',
        'theta = (b P) / (1 + b P)',
      ],
      importantTopics: [
        'Physisorption vs chemisorption',
        'Adsorption isotherms',
        'Catalysis and enzymes',
        'Colloids and their properties',
      ],
      learningObjectives: [
        'Differentiate adsorption and absorption',
        'Interpret Freundlich and Langmuir isotherms',
        'Explain catalytic activity and enzyme specificity',
        'Describe properties of colloids',
      ],
      prerequisites: [
        'Intermolecular forces',
        'Basic concentration terms',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 5',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Adsorption Isotherms',
          description: 'Interact with Freundlich and Langmuir curves.',
          config: {
            visualizationName: 'adsorption-isotherm',
          },
        },
        {
          type: 'concept',
          title: 'Colloid Type Explorer',
          description: 'Classify colloids by dispersed phase and medium.',
          config: {
            visualizationName: 'colloid-classifier',
          },
        },
        {
          type: 'table',
          title: 'Colloid Types',
          description: 'Quick reference for sol, gel, emulsion, and aerosol.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 220,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 6,
      chapterTitle: 'General Principles and Processes of Isolation of Elements',
      introduction: `Metallurgy explains how metals are extracted and refined. This chapter covers ore concentration, roasting, calcination, reduction, and refining methods with key examples.`,
      detailedNotes: `# Isolation of Elements

## Ores and Gangue

- Ores contain metal compounds; gangue is the unwanted material.
- Concentration removes gangue before extraction.

## Concentration Methods

- Gravity separation for dense ores.
- Froth flotation for sulfide ores.
- Magnetic separation for magnetic ores.
- Leaching for selective dissolution (bauxite in NaOH).

## Extraction Steps

- Calcination: heating in limited air (carbonates).
- Roasting: heating in excess air (sulfides).
- Smelting: reduction with carbon or CO.
- Self reduction for some sulfides (Cu2S + Cu2O -> Cu).

## Thermodynamics

- Ellingham diagram shows stability of oxides.
- Reduction is feasible when delta G is negative.

## Refining

- Electrolytic refining for Cu, Ag, Au.
- Zone refining for Si, Ge.
- Distillation for low boiling metals.
`,
      keyConcepts: [
        {
          title: 'Roasting vs Calcination',
          description: 'Roasting is in excess air; calcination is in limited air.',
        },
        {
          title: 'Ellingham Diagram',
          description: 'Lower lines indicate more stable oxides.',
        },
        {
          title: 'Electrolytic Refining',
          description: 'Impure anode, pure cathode, anode mud collects impurities.',
        },
      ],
      formulas: [
        'ZnCO3 -> ZnO + CO2',
        '2 ZnS + 3 O2 -> 2 ZnO + 2 SO2',
        'ZnO + C -> Zn + CO',
      ],
      importantTopics: [
        'Ore concentration methods',
        'Roasting, calcination, smelting',
        'Ellingham diagram interpretation',
        'Refining techniques',
      ],
      learningObjectives: [
        'Select suitable concentration methods for ores',
        'Explain extraction steps for common metals',
        'Use Ellingham diagram logic qualitatively',
      ],
      prerequisites: [
        'Redox reactions',
        'Basic thermodynamics',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 6',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Ellingham Diagram',
          description: 'Compare oxide stability vs temperature.',
          config: {
            visualizationName: 'ellingham-diagram',
          },
        },
        {
          type: 'flowchart',
          title: 'Metallurgy Flow',
          description: 'Ore -> concentration -> extraction -> refining.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 240,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 7,
      chapterTitle: 'The p-Block Elements',
      introduction: `p-Block elements show diverse properties across Groups 13 to 18. This chapter focuses on trends, important compounds, and applications of Groups 15 to 18.`,
      detailedNotes: `# The p-Block Elements

## Group Trends

- Metallic character increases down the group.
- Electronegativity decreases down the group.
- Oxidation states vary due to inert pair effect.

## Group 15 (N, P, As, Sb, Bi)

- Nitrogen forms stable N2 with a strong triple bond.
- Phosphorus has white, red, and black allotropes.
- Ammonia is basic and forms hydrogen bonds.
- Oxoacids of phosphorus include H3PO4.

## Group 16 (O, S, Se, Te)

- Oxygen forms O2 and ozone O3.
- Sulfur allotropes include rhombic and monoclinic.
- Sulfuric acid is widely used industrially.

## Group 17 (Halogens)

- High reactivity; F2 is the strongest oxidizing agent.
- HX acidity: HF < HCl < HBr < HI.
- Interhalogen compounds form with odd numbers of halogens.

## Group 18 (Noble Gases)

- Low reactivity; Xe forms compounds under special conditions.
- Uses include inert atmospheres and lighting.
`,
      keyConcepts: [
        {
          title: 'Inert Pair Effect',
          description: 'Lower oxidation states become more stable down the group.',
        },
        {
          title: 'Halogen Reactivity',
          description: 'Reactivity decreases down the group.',
        },
        {
          title: 'Oxoacids',
          description: 'Acid strength increases with oxidation state.',
        },
      ],
      formulas: [
        'HF < HCl < HBr < HI (acid strength)',
        'HClO4 > HClO3 > HClO2 > HClO (acid strength)',
      ],
      importantTopics: [
        'Group trends and inert pair effect',
        'Key compounds of N, P, S, and halogens',
        'Noble gas reactivity and uses',
      ],
      learningObjectives: [
        'Compare reactivity trends across groups',
        'Identify important oxoacids and their strengths',
        'Explain applications of p-block elements',
      ],
      prerequisites: [
        'Periodic table trends',
        'Chemical bonding',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 7',
      visualizationsData: [
        {
          type: 'concept',
          title: 'p-Block Trends Explorer',
          description: 'Compare atomic radius and ionization energy.',
          config: {
            visualizationName: 'pblock-trends',
          },
        },
        {
          type: 'table',
          title: 'Halogen Acids Strength',
          description: 'Order of acidity for HF, HCl, HBr, HI.',
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 320,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 8,
      chapterTitle: 'The d- and f-Block Elements',
      introduction: `Transition and inner-transition elements show variable oxidation states, colored ions, and catalytic activity. This chapter highlights their electronic configurations, properties, and key compounds.`,
      detailedNotes: `# The d- and f-Block Elements

## d-Block (Transition Elements)

- General configuration: (n-1)d and ns electrons.
- Variable oxidation states due to similar energies of d and s orbitals.
- Colored ions arise from d-d transitions.
- Many are catalysts and form complexes.

## Important Compounds

- Potassium dichromate is a strong oxidizer.
- Potassium permanganate is a strong oxidizer in acidic medium.

## f-Block (Lanthanoids and Actinoids)

- Lanthanoid contraction: gradual decrease in size across the series.
- Most lanthanoids show +3 oxidation state.
- Actinoids show multiple oxidation states and are radioactive.
`,
      keyConcepts: [
        {
          title: 'Variable Oxidation States',
          description: 'd-block elements show multiple oxidation states.',
        },
        {
          title: 'Lanthanoid Contraction',
          description: 'Poor shielding by 4f electrons reduces atomic size.',
        },
        {
          title: 'Magnetic Properties',
          description: 'Unpaired d or f electrons cause paramagnetism.',
          formula: 'mu = sqrt(n(n+2)) BM',
        },
      ],
      formulas: [
        'mu = sqrt(n(n+2)) BM',
      ],
      importantTopics: [
        'd-block electronic configuration',
        'Colored ions and complex formation',
        'KMnO4 and K2Cr2O7 properties',
        'Lanthanoid contraction',
      ],
      learningObjectives: [
        'Explain variable oxidation states in transition metals',
        'Interpret lanthanoid contraction and its effects',
        'Identify uses of key d-block compounds',
      ],
      prerequisites: [
        'Electronic configuration',
        'Periodic trends',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 8',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Transition Oxidation Map',
          description: 'Explore common oxidation states of 3d metals.',
          config: {
            visualizationName: 'transition-oxidation-map',
          },
        },
        {
          type: 'concept',
          title: 'Lanthanoid Contraction',
          description: 'View atomic radius trend across lanthanoids.',
          config: {
            visualizationName: 'lanthanoid-contraction',
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

  console.log('Chemistry Class 12 chapters 5-8 seeding completed!');
}

seedChemistryClass12Part2().catch(console.error);
