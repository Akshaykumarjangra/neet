import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyClass12Part2() {
  console.log('Seeding Biology Class 12 Chapters 5-8...');

  const chapters = [
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 5,
      chapterTitle: 'Principles of Inheritance and Variation',
      introduction: `This chapter builds the foundation of genetics with Mendel's laws, chromosomal theory, linkage, and causes of variation.`,
      detailedNotes: `# Principles of Inheritance and Variation

## Mendel and the Pea Plant
- True breeding lines and clear contrasting traits.
- Monohybrid cross gives 3:1 phenotypic ratio.
- Dihybrid cross gives 9:3:3:1 phenotypic ratio.

## Mendel's Laws
- Law of dominance: dominant allele expresses in hybrid.
- Law of segregation: alleles separate during gamete formation.
- Law of independent assortment: gene pairs assort independently.

## Chromosomal Theory
- Genes are located on chromosomes.
- Meiosis explains segregation and assortment.

## Linkage and Crossing Over
- Linked genes inherit together on same chromosome.
- Crossing over creates recombinants.
- Recombination frequency relates to gene distance.

## Sex Determination and Pedigree
- XY, ZW, and XO systems in different organisms.
- Pedigree analysis tracks inheritance patterns.

## Genetic Disorders and Mutation
- Mendelian disorders: sickle cell anemia, PKU, thalassemia.
- Chromosomal disorders: Down, Turner, Klinefelter.
- Mutation is the ultimate source of variation.
`,
      keyConcepts: [
        {
          title: 'Mendelian Inheritance',
          description: 'Dominance, segregation, and independent assortment explain basic ratios.',
        },
        {
          title: 'Linkage and Recombination',
          description: 'Genes on the same chromosome may co-inherit unless crossing over occurs.',
        },
        {
          title: 'Sex Determination',
          description: 'Different chromosome systems decide sex in different species.',
        },
        {
          title: 'Pedigree Analysis',
          description: 'Family tree analysis reveals inheritance patterns.',
        },
        {
          title: 'Genetic Disorders',
          description: 'Single gene and chromosomal disorders arise from mutations.',
        },
      ],
      formulas: [
        'Monohybrid phenotypic ratio = 3:1',
        'Monohybrid genotypic ratio = 1:2:1',
        'Dihybrid phenotypic ratio = 9:3:3:1',
        'Recombination frequency (%) = (recombinants / total) x 100',
      ],
      importantTopics: [
        'Mendelian ratios and test cross',
        'Chromosomal theory of inheritance',
        'Linkage, crossing over, and mapping',
        'Sex determination systems',
        'Mendelian and chromosomal disorders',
      ],
      learningObjectives: [
        'Apply Mendelian laws to genetic crosses',
        'Explain linkage and recombination',
        'Interpret basic pedigree patterns',
        'Differentiate Mendelian and chromosomal disorders',
      ],
      prerequisites: [
        'Basic cell division and meiosis',
        'Chromosome structure',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 5',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Monohybrid and Dihybrid Cross',
          description: 'Punnett squares that show classic Mendelian ratios.',
        },
        {
          type: 'graph',
          title: 'Recombination Frequency vs Distance',
          description: 'Higher distance leads to higher recombination.',
        },
        {
          type: 'table',
          title: 'Pedigree Symbols',
          description: 'Standard symbols used in pedigree charts.',
        },
        {
          type: 'comparison',
          title: 'Sex Determination Systems',
          description: 'XY vs ZW vs XO with key features.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 260,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 6,
      chapterTitle: 'Molecular Basis of Inheritance',
      introduction: `Molecular genetics explains DNA as the genetic material, its replication, gene expression, and regulation.`,
      detailedNotes: `# Molecular Basis of Inheritance

## DNA as Genetic Material
- Griffith and Avery showed transforming principle as DNA.
- Hershey and Chase confirmed DNA as genetic material.

## DNA Structure and Replication
- Double helix with complementary base pairing.
- Semiconservative replication using DNA polymerase.

## RNA and Central Dogma
- Transcription forms RNA from DNA.
- Translation reads codons to make proteins.
- Genetic code is triplet, degenerate, and universal.

## Gene Regulation
- Lac operon is a classic example in bacteria.
- Operon has promoter, operator, and structural genes.

## Human Genome and DNA Fingerprinting
- Genome projects map genes and noncoding regions.
- DNA fingerprinting uses VNTRs and gel patterns.
`,
      keyConcepts: [
        {
          title: 'DNA Structure',
          description: 'Double helix with complementary pairing and antiparallel strands.',
        },
        {
          title: 'Replication',
          description: 'Semiconservative copying of DNA before cell division.',
        },
        {
          title: 'Gene Expression',
          description: 'Transcription and translation produce proteins.',
        },
        {
          title: 'Genetic Code',
          description: 'Codons specify amino acids and stop signals.',
        },
        {
          title: 'Gene Regulation',
          description: 'Operons control when genes are expressed.',
        },
      ],
      formulas: [
        'Chargaff rule: A = T and G = C',
        '1 codon = 3 bases',
      ],
      importantTopics: [
        'DNA structure and replication enzymes',
        'Transcription and translation steps',
        'Genetic code properties',
        'Lac operon model',
        'DNA fingerprinting',
      ],
      learningObjectives: [
        'Explain DNA evidence as genetic material',
        'Describe replication, transcription, and translation',
        'Interpret genetic code features',
        'Summarize gene regulation with lac operon',
      ],
      prerequisites: [
        'Cell structure and nucleic acids',
        'Basic protein synthesis idea',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 6',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'DNA Double Helix',
          description: 'Base pairing and antiparallel strands.',
        },
        {
          type: 'flowchart',
          title: 'Central Dogma',
          description: 'DNA to RNA to protein steps.',
        },
        {
          type: 'diagram',
          title: 'Lac Operon',
          description: 'Operon parts and regulation with lactose.',
        },
        {
          type: 'table',
          title: 'Genetic Code Features',
          description: 'Triplet, degenerate, start and stop codons.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 250,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 7,
      chapterTitle: 'Evolution',
      introduction: `Evolution explains diversity through natural selection, speciation, and genetic change over time.`,
      detailedNotes: `# Evolution

## Origin of Life
- Chemical evolution led to first cells.
- RNA world hypothesis supports early self replicating molecules.

## Evidence of Evolution
- Fossils, homologous organs, and embryology.
- Molecular homology in DNA and proteins.

## Darwin and Natural Selection
- Variation, struggle, and survival of the fittest.
- Adaptive radiation explains diversification.

## Modern Synthesis
- Natural selection works on genetic variation.
- Genetic drift and gene flow change allele frequencies.

## Hardy-Weinberg Principle
- Allele frequency remains constant without evolutionary forces.
- Deviation indicates evolution.

## Speciation
- Allopatric and sympatric speciation.
`,
      keyConcepts: [
        {
          title: 'Natural Selection',
          description: 'Favorable traits increase in a population over time.',
        },
        {
          title: 'Evidence of Evolution',
          description: 'Fossils, homologous structures, and molecular data.',
        },
        {
          title: 'Hardy-Weinberg Principle',
          description: 'Allele frequency equilibrium in ideal conditions.',
        },
        {
          title: 'Speciation',
          description: 'Formation of new species by isolation and divergence.',
        },
        {
          title: 'Adaptive Radiation',
          description: 'Rapid diversification from a common ancestor.',
        },
      ],
      formulas: [
        'p^2 + 2pq + q^2 = 1',
        'p + q = 1',
      ],
      importantTopics: [
        'Darwinism and natural selection',
        'Evidence from fossils and homologous organs',
        'Hardy-Weinberg equilibrium',
        'Speciation mechanisms',
        'Adaptive radiation examples',
      ],
      learningObjectives: [
        'Explain natural selection with examples',
        'Use Hardy-Weinberg to track evolution',
        'Differentiate types of speciation',
      ],
      prerequisites: [
        'Genetics basics',
        'Mendelian inheritance',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 7',
      visualizationsData: [
        {
          type: 'graph',
          title: 'Hardy-Weinberg Equilibrium',
          description: 'Stable allele frequencies without forces of evolution.',
        },
        {
          type: 'diagram',
          title: 'Adaptive Radiation',
          description: 'Diversification of finches from a common ancestor.',
        },
        {
          type: 'comparison',
          title: 'Types of Selection',
          description: 'Stabilizing, directional, and disruptive selection.',
        },
        {
          type: 'flowchart',
          title: 'Speciation Steps',
          description: 'Isolation, divergence, and new species formation.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 240,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 8,
      chapterTitle: 'Human Health and Disease',
      introduction: `This chapter covers immunity, common diseases, vaccination, and the role of microbes in health.`,
      detailedNotes: `# Human Health and Disease

## Health and Immunity
- Health is physical, mental, and social well being.
- Immunity is innate or acquired.
- Antibodies neutralize antigens.

## Immune Responses
- Primary response is slow; secondary is fast.
- Vaccination builds memory cells.

## Common Diseases
- Bacterial: typhoid, pneumonia.
- Viral: AIDS, hepatitis, influenza.
- Protozoan: malaria.
- Fungal: ringworm.

## Cancer and Allergies
- Oncogenes and loss of control lead to cancer.
- Allergic response involves histamine.

## Drug and Alcohol Abuse
- Substance abuse affects brain and behavior.
`,
      keyConcepts: [
        {
          title: 'Innate vs Acquired Immunity',
          description: 'Innate is non specific; acquired is specific and memory based.',
        },
        {
          title: 'Antibodies',
          description: 'Y shaped proteins that bind antigens.',
        },
        {
          title: 'Vaccination',
          description: 'Exposure to antigen builds immunological memory.',
        },
        {
          title: 'Major Diseases',
          description: 'AIDS, malaria, typhoid, and pneumonia are high yield.',
        },
        {
          title: 'Cancer Biology',
          description: 'Uncontrolled cell division due to mutations.',
        },
      ],
      formulas: [
        'Antigen + antibody -> immune complex',
      ],
      importantTopics: [
        'Innate and acquired immunity',
        'Antibody structure and functions',
        'Vaccines and immunization',
        'Major infectious diseases',
        'Cancer and allergies',
      ],
      learningObjectives: [
        'Differentiate innate and acquired immunity',
        'Explain how vaccines work',
        'Identify major diseases and pathogens',
      ],
      prerequisites: [
        'Basic cell and tissue concepts',
        'Microorganisms overview',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 8',
      visualizationsData: [
        {
          type: 'flowchart',
          title: 'Immune Response',
          description: 'Antigen entry, antibody production, and memory cells.',
        },
        {
          type: 'diagram',
          title: 'Antibody Structure',
          description: 'Heavy and light chains with antigen binding sites.',
        },
        {
          type: 'table',
          title: 'Diseases and Pathogens',
          description: 'Common pathogens with examples and symptoms.',
        },
        {
          type: 'comparison',
          title: 'Vaccination vs Infection',
          description: 'How immune memory is built safely.',
        },
      ],
      difficultyLevel: 2,
      estimatedStudyMinutes: 220,
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

  console.log('Biology Class 12 chapters 5-8 seeding completed!');
}

seedBiologyClass12Part2().catch(console.error);
