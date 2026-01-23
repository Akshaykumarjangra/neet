import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryClass12Final() {
  console.log('Seeding Chemistry Class 12 Chapters 13-16...');

  const chapters = [
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 13,
      chapterTitle: 'Amines',
      introduction: `Amines are nitrogen containing organic compounds derived from ammonia. This chapter covers classification, preparation, basicity trends, reactions of amines, and diazonium salts.`,
      detailedNotes: `# Amines

## Classification and Nomenclature

- Primary: RNH2, Secondary: R2NH, Tertiary: R3N.
- Aliphatic vs aromatic (aniline = C6H5NH2).
- Use -amine suffix or amino prefix.

## Preparation

- Reduction of nitro compounds: R-NO2 -> R-NH2.
- Ammonolysis of haloalkanes gives mixtures of amines.
- Gabriel phthalimide gives pure primary amines.
- Hoffmann bromamide reduces carbon count by one.
- Reduction of nitriles gives primary amines.

## Basicity

- Aliphatic amines are more basic than NH3.
- Aromatic amines are less basic due to resonance.
- Electron donating groups increase basicity; withdrawing groups decrease it.

## Key Reactions

- Alkylation: amines form higher amines and quaternary salts.
- Acylation: gives amides, used for protection.
- Carbylamine test: primary amines give foul smelling isocyanides.
- Nitrous acid: primary aliphatic gives alcohol + N2; aromatic gives diazonium salt.

## Diazonium Salts

- Prepared at 0 to 5 C from aromatic primary amines.
- Useful for substitutions (Cl, Br, CN, OH, I, F) and azo coupling.
`,
      keyConcepts: [
        {
          title: 'Basicity Trend',
          description: 'Aliphatic amines are more basic than NH3; aromatic amines are weaker.',
        },
        {
          title: 'Carbylamine Test',
          description: 'Only primary amines give isocyanides with CHCl3 and base.',
        },
        {
          title: 'Diazotization',
          description: 'Aromatic primary amines form diazonium salts at low temperature.',
        },
        {
          title: 'Hoffmann Bromamide',
          description: 'Converts amide to amine with one less carbon atom.',
        },
      ],
      formulas: [
        'RCONH2 + Br2 + 4NaOH -> RNH2 + Na2CO3 + 2NaBr + 2H2O',
        'RNH2 + CHCl3 + 3KOH -> RNC + 3KCl + 3H2O',
        'C6H5NH2 + NaNO2 + 2HCl -> C6H5N2+Cl- + NaCl + 2H2O',
      ],
      importantTopics: [
        'Classification of amines',
        'Preparation methods',
        'Basicity trends',
        'Diazonium salt reactions',
        'Distinction tests',
      ],
      learningObjectives: [
        'Classify amines and name them correctly',
        'Predict basicity of amines with substituent effects',
        'Use diazonium chemistry for substitutions',
      ],
      prerequisites: [
        'Organic functional groups',
        'Reaction mechanisms basics',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 13',
      visualizationsData: [
        {
          type: 'flowchart',
          title: 'Diazonium Reaction Map',
          description: 'Track substitutions and coupling from diazonium salts.',
        },
        {
          type: 'concept',
          title: 'Amines Basicity Chart',
          description: 'Compare basicity trends for aliphatic and aromatic amines.',
          config: {
            visualizationName: 'amine-basicity-chart',
          },
        },
        {
          type: 'comparison',
          title: 'Basicity of Amines',
          description: 'Compare aliphatic vs aromatic amines and effects of groups.',
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 280,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 14,
      chapterTitle: 'Biomolecules',
      introduction: `Biomolecules include carbohydrates, proteins, nucleic acids, and vitamins. This chapter explains their classification, structure, and biological roles.`,
      detailedNotes: `# Biomolecules

## Carbohydrates

- Monosaccharides: glucose, fructose, ribose.
- Disaccharides: sucrose, maltose, lactose.
- Polysaccharides: starch, cellulose, glycogen.
- Reducing sugars: glucose, maltose, lactose.
- Non-reducing: sucrose.

## Proteins and Amino Acids

- Amino acids are zwitterions in water.
- Peptide bond links amino acids.
- Structures: primary, secondary, tertiary, quaternary.
- Denaturation disrupts structure and function.

## Enzymes

- Biological catalysts, highly specific.
- Activity depends on pH, temperature, and substrate concentration.

## Nucleic Acids

- DNA: double helix, A-T and G-C pairing.
- RNA: single strand, U instead of T.

## Vitamins

- Fat soluble: A, D, E, K.
- Water soluble: B complex, C.
`,
      keyConcepts: [
        {
          title: 'Reducing Sugars',
          description: 'Sugars with free anomeric carbon reduce Tollens or Fehling.',
        },
        {
          title: 'Peptide Bond',
          description: 'Amide linkage formed between amino acids.',
        },
        {
          title: 'Base Pairing',
          description: 'A-T and G-C pairing stabilizes DNA.',
        },
        {
          title: 'Vitamin Types',
          description: 'Fat soluble stored in body; water soluble need regular intake.',
        },
      ],
      formulas: [
        'General carbohydrate formula: Cx(H2O)y',
        'Peptide bond: -CO-NH-',
      ],
      importantTopics: [
        'Carbohydrate classification',
        'Protein structure levels',
        'Enzyme specificity',
        'DNA and RNA differences',
        'Vitamin deficiencies',
      ],
      learningObjectives: [
        'Classify carbohydrates and identify reducing sugars',
        'Explain protein structures and denaturation',
        'Describe DNA base pairing and RNA differences',
      ],
      prerequisites: [
        'Basic organic functional groups',
        'Biology fundamentals',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 14',
      visualizationsData: [
        {
          type: 'table',
          title: 'Carbohydrate Summary',
          description: 'Compare mono, di, and polysaccharides with examples.',
        },
        {
          type: 'concept',
          title: 'Biomolecule Map',
          description: 'Explore the four major biomolecule groups.',
          config: {
            visualizationName: 'biomolecule-map',
          },
        },
        {
          type: 'diagram',
          title: 'DNA Base Pairing',
          description: 'Visualize A-T and G-C hydrogen bonding.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 260,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 15,
      chapterTitle: 'Polymers',
      introduction: `Polymers are macromolecules formed from repeating monomer units. This chapter covers classification, polymerization mechanisms, key polymers, and biodegradable options.`,
      detailedNotes: `# Polymers

## Classification

- By source: natural, synthetic, semi-synthetic.
- By structure: linear, branched, cross-linked.
- By forces: elastomers, fibers, thermoplastics, thermosets.

## Polymerization

- Addition polymerization: no byproduct, chain growth.
- Condensation polymerization: small molecule byproduct.

## Important Polymers

- Polyethylene (LDPE, HDPE), PVC, polystyrene.
- Nylon 6,6, Nylon 6, terylene, Bakelite.
- Buna-S and Buna-N rubbers.

## Biodegradable Polymers

- PHBV and Nylon-2-Nylon-6.
`,
      keyConcepts: [
        {
          title: 'Degree of Polymerization',
          description: 'Number of repeating units in a polymer chain.',
        },
        {
          title: 'Addition vs Condensation',
          description: 'Addition has no byproduct; condensation releases small molecules.',
        },
        {
          title: 'Thermoplastic vs Thermoset',
          description: 'Thermoplastics can be remolded; thermosets cannot.',
        },
      ],
      formulas: [
        'n CH2=CH2 -> -(CH2-CH2)n-',
        'n HOOC-R-COOH + n H2N-R\'-NH2 -> polymer + 2n H2O',
      ],
      importantTopics: [
        'Polymer classifications',
        'Addition and condensation mechanisms',
        'Properties of common polymers',
        'Biodegradable polymers',
      ],
      learningObjectives: [
        'Differentiate polymer types by structure and properties',
        'Identify polymers from monomers',
        'Explain polymerization mechanisms',
      ],
      prerequisites: [
        'Organic functional groups',
        'Alkenes and acids',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 15',
      visualizationsData: [
        {
          type: 'flowchart',
          title: 'Polymerization Pathways',
          description: 'Addition vs condensation routes and examples.',
        },
        {
          type: 'concept',
          title: 'Polymer Classification Tree',
          description: 'Switch between source, structure, and polymerization views.',
          config: {
            visualizationName: 'polymer-classification-tree',
          },
        },
        {
          type: 'comparison',
          title: 'Thermoplastic vs Thermoset',
          description: 'Compare structure, properties, and examples.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 240,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 16,
      chapterTitle: 'Chemistry in Everyday Life',
      introduction: `Everyday chemistry covers drugs, food additives, and cleansing agents. This chapter focuses on therapeutic drugs, antiseptics, detergents, and artificial sweeteners.`,
      detailedNotes: `# Chemistry in Everyday Life

## Drugs

- Analgesics: aspirin, paracetamol, ibuprofen.
- Antibiotics: penicillin, tetracycline, streptomycin.
- Antacids: Mg(OH)2, Al(OH)3, NaHCO3.
- Antihistamines and tranquilizers act on CNS or receptors.

## Antiseptics and Disinfectants

- Antiseptics are safe on skin (iodine, chloroxylenol).
- Disinfectants are stronger for surfaces (phenol).

## Food Additives

- Preservatives: sodium benzoate, salt, sugar.
- Sweeteners: saccharin, aspartame, sucralose.
- Antioxidants: BHA, BHT.

## Soaps and Detergents

- Soap: sodium salts of fatty acids; form scum in hard water.
- Detergents: synthetic, effective in hard water.
`,
      keyConcepts: [
        {
          title: 'Selective Toxicity',
          description: 'Antibiotics target bacteria without harming the host.',
        },
        {
          title: 'Antiseptic vs Disinfectant',
          description: 'Antiseptics are mild for tissues; disinfectants are stronger.',
        },
        {
          title: 'Soaps vs Detergents',
          description: 'Detergents work in hard water, soaps form scum.',
        },
      ],
      formulas: [
        'Fat/oil + NaOH -> soap + glycerol',
        'RCOOH + NaOH -> RCOONa + H2O',
      ],
      importantTopics: [
        'Drug categories and examples',
        'Food preservatives and sweeteners',
        'Soap and detergent differences',
        'Antiseptics and disinfectants',
      ],
      learningObjectives: [
        'Classify drugs by therapeutic action',
        'Explain why detergents work in hard water',
        'Identify common food additives and their roles',
      ],
      prerequisites: [
        'Acids and bases',
        'Functional groups',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 16',
      visualizationsData: [
        {
          type: 'table',
          title: 'Drug Classes',
          description: 'Compare analgesics, antibiotics, antacids, and antihistamines.',
        },
        {
          type: 'concept',
          title: 'Everyday Chemistry Comparisons',
          description: 'Compare drugs, cleaning agents, and soaps vs detergents.',
          config: {
            visualizationName: 'everyday-chemistry-compare',
          },
        },
        {
          type: 'comparison',
          title: 'Soap vs Detergent',
          description: 'Compare structure, hard water behavior, and uses.',
        },
      ],
      difficultyLevel: 2,
      estimatedStudyMinutes: 200,
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

  console.log('Chemistry Class 12 chapters 13-16 seeding completed!');
}

seedChemistryClass12Final().catch(console.error);
