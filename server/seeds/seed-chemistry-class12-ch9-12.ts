import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryClass12Part3() {
  console.log('Seeding Chemistry Class 12 Chapters 9-12...');

  const chapters = [
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 9,
      chapterTitle: 'Coordination Compounds',
      introduction: `Coordination compounds contain a central metal ion bonded to ligands through coordinate bonds. This chapter covers nomenclature, isomerism, bonding theories, magnetic behavior, stability, and applications.`,
      detailedNotes: `# Coordination Compounds

## Basics and Ligands

- Central metal ion accepts lone pairs from ligands.
- Coordination number is the number of donor atoms attached.
- Ligands can be monodentate, bidentate, or polydentate.
- Ambidentate ligands can bind through different atoms (NO2-, SCN-).

## Nomenclature (IUPAC)

- Name cation first, then anion.
- Ligand names: chloro, cyano, aqua, ammine, oxalato.
- Metal name ends with -ate when complex is anion (ferrate, cuprate).
- Oxidation state in Roman numerals.

## Isomerism

- Structural: ionization, linkage, coordination, hydrate.
- Stereoisomerism: geometrical (cis/trans), optical (chiral complexes).

## Bonding

- VBT: sp3 (tetrahedral), dsp2 (square planar), d2sp3 (octahedral).
- CFT: d orbital splitting in octahedral or tetrahedral fields.
- Strong field ligands give low spin, weak field ligands give high spin.

## Stability

- Formation constant Kf indicates complex stability.
- Chelate effect: multidentate ligands form more stable complexes.

## Applications

- Biological: hemoglobin, chlorophyll, vitamin B12.
- Analytical: EDTA titration.
- Metallurgy: cyanide complexes for Au and Ag extraction.
`,
      keyConcepts: [
        {
          title: 'Coordination Number',
          description: 'Number of ligand donor atoms attached to the metal.',
        },
        {
          title: 'Isomerism',
          description: 'Coordination compounds show structural and stereoisomerism.',
        },
        {
          title: 'Crystal Field Splitting',
          description: 'Ligand field splits d orbitals into different energy levels.',
          formula: 'CFSE = (-0.4 n_t2g + 0.6 n_eg) delta_o',
        },
        {
          title: 'Magnetic Moment',
          description: 'Depends on number of unpaired electrons.',
          formula: 'mu = sqrt(n(n+2)) BM',
        },
        {
          title: 'Chelate Effect',
          description: 'Polydentate ligands stabilize complexes more than monodentate ligands.',
        },
      ],
      formulas: [
        'CFSE = (-0.4 n_t2g + 0.6 n_eg) delta_o',
        'mu = sqrt(n(n+2)) BM',
        'K_f = [ML_n] / ([M][L]^n)',
        'delta G = -RT ln K_f',
      ],
      importantTopics: [
        'Werner theory basics',
        'IUPAC naming rules',
        'Isomerism types',
        'VBT vs CFT',
        'Spectrochemical series',
        'Chelate effect',
      ],
      learningObjectives: [
        'Name coordination compounds with correct IUPAC rules',
        'Identify isomerism for given complexes',
        'Predict geometry and spin state using ligand field ideas',
      ],
      prerequisites: [
        'Chemical bonding basics',
        'Periodic table trends',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 9',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Octahedral vs Tetrahedral Splitting',
          description: 'Visualize d orbital splitting patterns.',
        },
        {
          type: 'concept',
          title: 'Crystal Field Splitting',
          description: 'Compare d orbital energies across geometries.',
          config: {
            visualizationName: 'crystal-field-splitting',
          },
        },
        {
          type: 'comparison',
          title: 'Cis vs Trans Isomerism',
          description: 'Compare geometrical isomers for square planar complexes.',
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 320,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 10,
      chapterTitle: 'Haloalkanes and Haloarenes',
      introduction: `Haloalkanes and haloarenes contain carbon-halogen bonds. This chapter explains preparation, reactions (SN1, SN2, E2), reactivity trends, and environmental impacts of halogenated compounds.`,
      detailedNotes: `# Haloalkanes and Haloarenes

## Classification

- Haloalkanes: halogen on sp3 carbon.
- Haloarenes: halogen on aromatic ring.
- Primary, secondary, tertiary based on carbon attached to halogen.

## Preparation

- From alcohols: R-OH + HX -> R-X + H2O.
- From alkenes: addition of HX (Markovnikov rule).
- Halogen exchange and radical halogenation.

## Substitution Reactions

- SN1: two-step, carbocation intermediate, 3 deg > 2 deg > 1 deg.
- SN2: one-step, backside attack, 1 deg > 2 deg > 3 deg.
- Good leaving group increases rate.

## Elimination Reactions

- E2 produces alkenes in strong base.
- Saytzeff rule: more substituted alkene major.

## Haloarenes

- C-X bond is stronger; SN reactions are slower.
- Electrophilic substitution gives ortho and para products.

## Environmental Notes

- CFCs deplete ozone; DDT is persistent and bioaccumulates.
`,
      keyConcepts: [
        {
          title: 'SN1 vs SN2',
          description: 'SN1 forms carbocations, SN2 is concerted.',
        },
        {
          title: 'Carbocation Stability',
          description: '3 deg > 2 deg > 1 deg affects SN1 rates.',
        },
        {
          title: 'Leaving Group',
          description: 'Better leaving groups increase substitution rate.',
        },
        {
          title: 'Saytzeff Rule',
          description: 'More substituted alkene dominates in E2.',
        },
      ],
      formulas: [
        'Rate_SN1 = k [R-X]',
        'Rate_SN2 = k [R-X][Nu-]',
      ],
      importantTopics: [
        'Preparation of haloalkanes and haloarenes',
        'SN1 and SN2 mechanisms',
        'E2 elimination',
        'Reactivity and leaving group effects',
        'Polyhalogen compounds and environmental impact',
      ],
      learningObjectives: [
        'Distinguish SN1 and SN2 conditions',
        'Predict substitution vs elimination products',
        'Explain reactivity trends across substrates',
      ],
      prerequisites: [
        'Basic organic mechanisms',
        'Alkenes and alcohols',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 10',
      visualizationsData: [
        {
          type: 'concept',
          title: 'SN1 vs SN2 Energy Profile',
          description: 'Compare reaction coordinate diagrams.',
          config: {
            visualizationName: 'sn1-sn2-profile',
          },
        },
        {
          type: 'comparison',
          title: 'SN1 vs SN2 Conditions',
          description: 'Solvent, substrate, and nucleophile differences.',
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 300,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 11,
      chapterTitle: 'Alcohols, Phenols and Ethers',
      introduction: `Alcohols, phenols, and ethers are oxygen containing organic compounds. This chapter covers preparation methods, properties, key reactions, and acidity trends.`,
      detailedNotes: `# Alcohols, Phenols and Ethers

## Alcohols

- Classified as primary, secondary, or tertiary.
- Prepared by hydration, reduction, or substitution.
- Oxidation: 1 deg to aldehyde/acid, 2 deg to ketone, 3 deg resistant.
- Dehydration forms alkenes (acidic conditions).

## Phenols

- Phenols are more acidic than alcohols due to resonance stabilization.
- Undergo electrophilic substitution at ortho and para positions.
- Tests: bromine water (white ppt), FeCl3 (violet complex).

## Ethers

- Prepared by Williamson synthesis.
- Less reactive, but cleave with HI or HBr at high temperature.
`,
      keyConcepts: [
        {
          title: 'Oxidation Behavior',
          description: '1 deg and 2 deg alcohols oxidize easily; 3 deg do not.',
        },
        {
          title: 'Phenol Acidity',
          description: 'Phenoxide is stabilized by resonance.',
        },
        {
          title: 'Williamson Synthesis',
          description: 'Ethers formed by alkoxide substitution on alkyl halides.',
          formula: 'R-O- + R-X -> R-O-R',
        },
      ],
      formulas: [
        'R-OH + R-COOH -> R-COOR + H2O',
        'R-OH -> alkene + H2O (acid, heat)',
        'R-O- + R-X -> R-O-R',
      ],
      importantTopics: [
        'Classification of alcohols',
        'Oxidation and dehydration',
        'Phenol acidity and reactions',
        'Ether preparation and cleavage',
      ],
      learningObjectives: [
        'Identify oxidation products for different alcohols',
        'Explain acidity trends for phenols',
        'Apply Williamson synthesis rules',
      ],
      prerequisites: [
        'Functional groups',
        'Basic organic reactions',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 11',
      visualizationsData: [
        {
          type: 'comparison',
          title: 'Alcohol Oxidation Outcomes',
          description: 'Compare products from 1 deg, 2 deg, and 3 deg alcohols.',
        },
        {
          type: 'flowchart',
          title: 'Preparation Routes',
          description: 'Hydration, reduction, substitution, and Williamson synthesis.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 280,
      status: 'published' as const,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 12,
      chapterTitle: 'Aldehydes, Ketones and Carboxylic Acids',
      introduction: `Carbonyl compounds include aldehydes, ketones, and carboxylic acids. This chapter focuses on preparation, nucleophilic addition reactions, oxidation, and acidity trends.`,
      detailedNotes: `# Aldehydes, Ketones and Carboxylic Acids

## Carbonyl Group

- C=O group is polar and reactive toward nucleophiles.
- Aldehydes are more reactive than ketones.

## Aldehydes and Ketones

- Prepared by oxidation of alcohols and Friedel Crafts acylation.
- Undergo nucleophilic addition (HCN, NaHSO3, Grignard).
- Aldol condensation forms beta hydroxy carbonyl compounds.

## Carboxylic Acids

- More acidic than alcohols due to resonance stabilized carboxylate.
- Prepared by oxidation of 1 deg alcohols or hydrolysis of nitriles.
- Form salts, esters, acid chlorides, and amides.
`,
      keyConcepts: [
        {
          title: 'Carbonyl Reactivity',
          description: 'Aldehydes are more reactive than ketones.',
        },
        {
          title: 'Aldol Condensation',
          description: 'Alpha hydrogen enables condensation under base.',
        },
        {
          title: 'Carboxylic Acid Acidity',
          description: 'Resonance stabilizes the conjugate base.',
        },
      ],
      formulas: [
        'RCHO + [O] -> RCOOH',
        'RCOOH + NaHCO3 -> RCOONa + CO2 + H2O',
        'RCOOH + ROH -> RCOOR + H2O',
      ],
      importantTopics: [
        'Nucleophilic addition mechanisms',
        'Aldol and Cannizzaro reactions',
        'Carboxylic acid preparations and derivatives',
        'Acidity and substitution effects',
      ],
      learningObjectives: [
        'Predict products of carbonyl reactions',
        'Explain aldehyde vs ketone reactivity',
        'Apply acidity trends in carboxylic acids',
      ],
      prerequisites: [
        'Functional groups',
        'Basic reaction mechanisms',
      ],
      ncertChapterRef: 'Class 12 Chemistry - Chapter 12',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Nucleophilic Addition',
          description: 'Visualize attack on the carbonyl carbon.',
        },
        {
          type: 'concept',
          title: 'Carbonyl Reaction Map',
          description: 'Explore oxidation, reduction, and condensation pathways.',
          config: {
            visualizationName: 'carbonyl-reaction-map',
          },
        },
        {
          type: 'flowchart',
          title: 'Carbonyl Reaction Summary',
          description: 'Summary of major reactions for aldehydes and ketones.',
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 320,
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

  console.log('Chemistry Class 12 chapters 9-12 seeding completed!');
}

seedChemistryClass12Part3().catch(console.error);
