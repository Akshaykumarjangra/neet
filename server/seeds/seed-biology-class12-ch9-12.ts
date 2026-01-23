import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyClass12Part3() {
  console.log('Seeding Biology Class 12 Chapters 9-12...');

  const chapters = [
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 9,
      chapterTitle: 'Strategies for Enhancement in Food Production',
      introduction: `Food production improves through plant breeding, animal husbandry, and modern biotechnologies.`,
      detailedNotes: `# Strategies for Enhancement in Food Production

## Plant Breeding
- Objectives: higher yield, quality, disease resistance.
- Steps: collection of germplasm, selection, hybridization, testing.
- Biofortification improves nutritional content.

## Animal Husbandry
- Cattle, poultry, and fisheries management.
- Breed selection for milk, meat, egg quality.
- Disease control and balanced feed are essential.

## Single Cell Protein (SCP)
- Microbes used as protein rich food.
- Examples: Spirulina, yeast, bacteria.

## Tissue Culture
- Micropropagation produces disease free plants.
- Somatic hybridization via protoplast fusion.
`,
      keyConcepts: [
        {
          title: 'Plant Breeding Pipeline',
          description: 'Selection, hybridization, testing, and release of new varieties.',
        },
        {
          title: 'Biofortification',
          description: 'Improving nutritional quality of crops.',
        },
        {
          title: 'Animal Husbandry',
          description: 'Scientific management for better productivity.',
        },
        {
          title: 'Single Cell Protein',
          description: 'Microbial protein as an alternative nutrition source.',
        },
      ],
      formulas: [
        'F1 hybrid -> heterosis (hybrid vigor)',
      ],
      importantTopics: [
        'Hybridization and selection',
        'Biofortified crops',
        'Dairy, poultry, and fisheries management',
        'Tissue culture and micropropagation',
      ],
      learningObjectives: [
        'Describe plant breeding steps',
        'Explain advantages of animal husbandry',
        'Summarize SCP and tissue culture benefits',
      ],
      prerequisites: [
        'Basic genetics',
        'Plant anatomy overview',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 9',
      visualizationsData: [
        {
          type: 'flowchart',
          title: 'Plant Breeding Steps',
          description: 'Germplasm -> selection -> hybridization -> testing.',
        },
        {
          type: 'table',
          title: 'Animal Husbandry Snapshot',
          description: 'Key traits for dairy, poultry, and fisheries.',
        },
        {
          type: 'comparison',
          title: 'Conventional vs Biofortified Crops',
          description: 'Yield and nutritional improvements side by side.',
        },
      ],
      difficultyLevel: 2,
      estimatedStudyMinutes: 210,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 10,
      chapterTitle: 'Microbes in Human Welfare',
      introduction: `Microbes are essential for food, medicines, industrial products, and environmental management.`,
      detailedNotes: `# Microbes in Human Welfare

## Household Products
- Curd: Lactobacillus converts milk to curd.
- Bread and cakes: yeast for fermentation.

## Industrial Products
- Antibiotics: penicillin, streptomycin.
- Organic acids: citric acid, lactic acid.
- Alcohols: ethanol production by yeast.

## Sewage Treatment
- Primary treatment removes solids.
- Secondary treatment uses microbes to reduce BOD.

## Biogas and Biofertilizers
- Methanogens produce biogas from waste.
- Rhizobium and cyanobacteria fix nitrogen.

## Biocontrol
- Bacillus thuringiensis and Trichoderma as biocontrol agents.
`,
      keyConcepts: [
        {
          title: 'Fermentation',
          description: 'Microbes convert sugars into acids, alcohols, and gases.',
        },
        {
          title: 'Antibiotics',
          description: 'Microbial products that inhibit pathogens.',
        },
        {
          title: 'Sewage Treatment',
          description: 'Microbial degradation lowers BOD.',
        },
        {
          title: 'Biofertilizers',
          description: 'Microbes enrich soil fertility naturally.',
        },
      ],
      formulas: [
        'C6H12O6 -> 2 C2H5OH + 2 CO2',
      ],
      importantTopics: [
        'Microbes in food industry',
        'Antibiotics and industrial products',
        'Sewage treatment steps',
        'Biogas and biofertilizers',
        'Biocontrol agents',
      ],
      learningObjectives: [
        'List major microbial products',
        'Explain sewage treatment stages',
        'Describe biogas and biofertilizer roles',
      ],
      prerequisites: [
        'Basic microbiology',
        'Metabolism basics',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 10',
      visualizationsData: [
        {
          type: 'flowchart',
          title: 'Sewage Treatment',
          description: 'Primary, secondary, and sludge processing stages.',
        },
        {
          type: 'diagram',
          title: 'Biogas Plant',
          description: 'Digester, gas collection, and slurry outlet.',
        },
        {
          type: 'table',
          title: 'Microbes and Products',
          description: 'Key organisms and their products.',
        },
        {
          type: 'comparison',
          title: 'Biocontrol vs Chemical Control',
          description: 'Benefits and limitations in agriculture.',
        },
      ],
      difficultyLevel: 2,
      estimatedStudyMinutes: 220,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 11,
      chapterTitle: 'Biotechnology: Principles and Processes',
      introduction: `Biotechnology combines genetic engineering and bioprocessing to create useful products.`,
      detailedNotes: `# Biotechnology: Principles and Processes

## Recombinant DNA Technology
- Restriction enzymes cut DNA at specific sites.
- DNA ligase joins DNA fragments.
- Vectors carry foreign DNA into host cells.

## Cloning and Selection
- Selectable markers identify transformed cells.
- Transformation introduces recombinant DNA.

## PCR and Gel Electrophoresis
- PCR amplifies DNA using cycles of temperature.
- Gel electrophoresis separates DNA fragments by size.

## Bioreactors and Downstream Processing
- Bioreactors provide optimal growth conditions.
- Downstream processing purifies the product.
`,
      keyConcepts: [
        {
          title: 'Restriction Enzymes',
          description: 'Cut DNA at palindromic sequences.',
        },
        {
          title: 'Cloning Vectors',
          description: 'Plasmids and viruses carry foreign DNA.',
        },
        {
          title: 'PCR',
          description: 'Amplifies DNA using denaturation, annealing, extension.',
        },
        {
          title: 'Bioreactors',
          description: 'Large scale production under controlled conditions.',
        },
      ],
      formulas: [
        'PCR cycle = denaturation + annealing + extension',
      ],
      importantTopics: [
        'Restriction enzymes and ligase',
        'Vectors and selectable markers',
        'PCR steps and applications',
        'Bioreactor components',
      ],
      learningObjectives: [
        'Explain rDNA steps',
        'Outline PCR and gel electrophoresis',
        'Describe bioreactor role in biotechnology',
      ],
      prerequisites: [
        'DNA and protein basics',
        'Cell structure and enzymes',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 11',
      visualizationsData: [
        {
          type: 'flowchart',
          title: 'Recombinant DNA Steps',
          description: 'Isolation -> cutting -> ligation -> transformation.',
        },
        {
          type: 'diagram',
          title: 'PCR Cycle',
          description: 'Thermal cycling and amplification phases.',
        },
        {
          type: 'diagram',
          title: 'Plasmid Vector',
          description: 'Origin, marker, and cloning site layout.',
        },
        {
          type: 'diagram',
          title: 'Stirred Tank Bioreactor',
          description: 'Impeller, inlet, sensors, and outlet.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 240,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 12,
      chapterTitle: 'Biotechnology and Its Applications',
      introduction: `Applications of biotechnology include GM crops, medical products, diagnostics, and environmental cleanup.`,
      detailedNotes: `# Biotechnology and Its Applications

## GM Crops
- Bt cotton resists insect pests.
- Golden rice enriched with vitamin A.

## Medical Applications
- Insulin production using recombinant DNA.
- Gene therapy for inherited disorders.

## Molecular Diagnosis
- PCR and ELISA detect pathogens early.
- DNA probes identify genetic defects.

## Bioremediation
- Microbes clean pollutants and oil spills.
`,
      keyConcepts: [
        {
          title: 'GM Crops',
          description: 'Transgenic plants with better yield and resistance.',
        },
        {
          title: 'Recombinant Insulin',
          description: 'Produced by engineered bacteria or yeast.',
        },
        {
          title: 'Gene Therapy',
          description: 'Corrects defective genes by introducing normal copies.',
        },
        {
          title: 'Molecular Diagnosis',
          description: 'PCR and ELISA for early detection.',
        },
      ],
      formulas: [
        'Recombinant DNA -> transgenic organism',
      ],
      importantTopics: [
        'Bt cotton and pest resistance',
        'Insulin production steps',
        'PCR and ELISA in diagnosis',
        'Bioremediation examples',
      ],
      learningObjectives: [
        'Explain GM crop benefits',
        'Describe medical and diagnostic uses',
        'Summarize environmental applications',
      ],
      prerequisites: [
        'Recombinant DNA basics',
        'PCR concept',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 12',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Bt Toxin Action',
          description: 'Insect gut activation and cell lysis.',
        },
        {
          type: 'flowchart',
          title: 'Recombinant Insulin Production',
          description: 'Gene cloning, expression, and purification.',
        },
        {
          type: 'comparison',
          title: 'GM vs Conventional Crops',
          description: 'Yield, pest resistance, and input costs.',
        },
        {
          type: 'table',
          title: 'Molecular Diagnostics',
          description: 'PCR, ELISA, and DNA probe use cases.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 230,
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

  console.log('Biology Class 12 chapters 9-12 seeding completed!');
}

seedBiologyClass12Part3().catch(console.error);
