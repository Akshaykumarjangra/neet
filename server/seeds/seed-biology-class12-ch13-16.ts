import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyClass12Part4() {
  console.log('Seeding Biology Class 12 Chapters 13-16...');

  const chapters = [
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 13,
      chapterTitle: 'Organisms and Populations',
      introduction: `Ecology starts with organisms and populations, their growth patterns, and interactions in the environment.`,
      detailedNotes: `# Organisms and Populations

## Population Attributes
- Density, birth rate, death rate, age distribution.
- Growth depends on resources and environment.

## Population Growth
- Exponential growth under unlimited resources.
- Logistic growth with carrying capacity.

## Population Interactions
- Predation, competition, mutualism, commensalism, parasitism.
- Interactions regulate population size.

## Adaptations
- Physiological, morphological, and behavioral adaptations.
`,
      keyConcepts: [
        {
          title: 'Population Density',
          description: 'Number of individuals per unit area or volume.',
        },
        {
          title: 'Growth Models',
          description: 'Exponential and logistic growth patterns.',
        },
        {
          title: 'Carrying Capacity',
          description: 'Maximum population the environment can sustain.',
        },
        {
          title: 'Species Interactions',
          description: 'Predation, competition, mutualism, parasitism.',
        },
      ],
      formulas: [
        'Exponential growth: dN/dt = rN',
        'Logistic growth: dN/dt = rN (1 - N/K)',
      ],
      importantTopics: [
        'Population attributes and density',
        'Exponential vs logistic growth',
        'Species interactions and examples',
        'Adaptations for survival',
      ],
      learningObjectives: [
        'Interpret population growth curves',
        'Explain key species interactions',
        'Relate adaptations to environment',
      ],
      prerequisites: [
        'Basic ecology terms',
        'Graphs and trends',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 13',
      visualizationsData: [
        {
          type: 'graph',
          title: 'Population Growth Curves',
          description: 'Exponential vs logistic growth shapes.',
        },
        {
          type: 'table',
          title: 'Species Interactions',
          description: 'Examples of mutualism, parasitism, and competition.',
        },
        {
          type: 'graph',
          title: 'Survivorship Curves',
          description: 'Type I, II, and III patterns.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 220,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 14,
      chapterTitle: 'Ecosystem',
      introduction: `Ecosystems describe energy flow, nutrient cycling, and productivity among living and nonliving components.`,
      detailedNotes: `# Ecosystem

## Ecosystem Structure
- Biotic and abiotic components.
- Producers, consumers, and decomposers.

## Productivity
- GPP is total photosynthesis.
- NPP = GPP - R (respiration).

## Decomposition
- Detritus broken down by microbes.
- Steps: fragmentation, leaching, catabolism, humification, mineralization.

## Energy Flow and Pyramids
- Energy decreases across trophic levels.
- Pyramids of number, biomass, and energy.

## Nutrient Cycles
- Carbon, nitrogen, and phosphorus cycles maintain balance.
`,
      keyConcepts: [
        {
          title: 'Energy Flow',
          description: 'Unidirectional flow across trophic levels.',
        },
        {
          title: 'Ecological Pyramids',
          description: 'Graphical representation of trophic structure.',
        },
        {
          title: 'Productivity',
          description: 'GPP and NPP measure ecosystem productivity.',
        },
        {
          title: 'Nutrient Cycling',
          description: 'Carbon and nitrogen cycles recycle matter.',
        },
      ],
      formulas: [
        'NPP = GPP - R',
      ],
      importantTopics: [
        'Ecosystem components',
        'Productivity and decomposition',
        'Energy flow and pyramids',
        'Biogeochemical cycles',
      ],
      learningObjectives: [
        'Describe ecosystem structure',
        'Calculate NPP from GPP',
        'Explain energy flow and cycles',
      ],
      prerequisites: [
        'Photosynthesis basics',
        'Food chain concepts',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 14',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Energy Flow Pyramid',
          description: 'Energy decreases from producers to top consumers.',
        },
        {
          type: 'flowchart',
          title: 'Decomposition Steps',
          description: 'Fragmentation to mineralization sequence.',
        },
        {
          type: 'diagram',
          title: 'Carbon Cycle',
          description: 'Flow of carbon through biotic and abiotic pools.',
        },
        {
          type: 'table',
          title: 'Trophic Levels',
          description: 'Producers to tertiary consumers.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 230,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 15,
      chapterTitle: 'Biodiversity and Conservation',
      introduction: `Biodiversity is the variety of life at genetic, species, and ecosystem levels and must be conserved.`,
      detailedNotes: `# Biodiversity and Conservation

## Levels of Biodiversity
- Genetic, species, and ecosystem diversity.
- India is a mega diverse country.

## Patterns of Biodiversity
- Latitudinal gradient: more diversity near equator.
- Species area relationship shows richness with area.

## Biodiversity Loss
- Habitat loss, overexploitation, alien species, co extinctions.

## Conservation Strategies
- In situ: national parks, biosphere reserves.
- Ex situ: botanical gardens, seed banks, zoos.
`,
      keyConcepts: [
        {
          title: 'Biodiversity Levels',
          description: 'Diversity at gene, species, and ecosystem scales.',
        },
        {
          title: 'Species Area Relationship',
          description: 'Species richness increases with area.',
        },
        {
          title: 'Threats to Biodiversity',
          description: 'Habitat loss and overexploitation are major threats.',
        },
        {
          title: 'Conservation',
          description: 'In situ and ex situ methods protect biodiversity.',
        },
      ],
      formulas: [
        'S = C A^z',
      ],
      importantTopics: [
        'Levels and patterns of biodiversity',
        'Hotspots and mega diversity',
        'Threats causing biodiversity loss',
        'In situ and ex situ conservation',
      ],
      learningObjectives: [
        'Explain biodiversity levels and patterns',
        'Identify major causes of biodiversity loss',
        'Compare conservation approaches',
      ],
      prerequisites: [
        'Ecology basics',
        'Food web concepts',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 15',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Biodiversity Hotspots',
          description: 'Regions with high endemism and threat.',
        },
        {
          type: 'graph',
          title: 'Species Area Relationship',
          description: 'Richness vs area on a log scale.',
        },
        {
          type: 'table',
          title: 'Threats to Biodiversity',
          description: 'Habitat loss, overuse, alien species, pollution.',
        },
        {
          type: 'comparison',
          title: 'In Situ vs Ex Situ Conservation',
          description: 'Protection in habitats vs outside habitats.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 220,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 16,
      chapterTitle: 'Environmental Issues',
      introduction: `Environmental issues include pollution, global warming, ozone depletion, and sustainable management.`,
      detailedNotes: `# Environmental Issues

## Air Pollution
- Primary pollutants: CO, SO2, NOx, particulate matter.
- Secondary pollutants form smog and acid rain.

## Water and Soil Pollution
- Eutrophication from excess nutrients.
- Biomagnification of toxic substances.

## Global Warming and Ozone
- Greenhouse gases raise global temperature.
- CFCs deplete ozone leading to UV damage.

## Solid Waste and E Waste
- Segregation, recycling, and safe disposal are essential.
- Reduce, reuse, recycle approach.
`,
      keyConcepts: [
        {
          title: 'Air Pollution',
          description: 'Pollutants cause smog, acid rain, and health issues.',
        },
        {
          title: 'Water Pollution',
          description: 'Eutrophication and biomagnification affect ecosystems.',
        },
        {
          title: 'Global Warming',
          description: 'Greenhouse gases trap heat in the atmosphere.',
        },
        {
          title: 'Ozone Depletion',
          description: 'CFCs release chlorine radicals that destroy ozone.',
        },
      ],
      formulas: [
        'CFCs -> Cl radicals -> ozone depletion',
      ],
      importantTopics: [
        'Major pollutants and sources',
        'Greenhouse effect and global warming',
        'Ozone depletion causes and effects',
        'Waste management strategies',
      ],
      learningObjectives: [
        'Identify key environmental pollutants',
        'Explain greenhouse effect and ozone depletion',
        'Describe waste management practices',
      ],
      prerequisites: [
        'Basic ecology and cycles',
        'Human impact on environment',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 16',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Greenhouse Effect',
          description: 'Trapped heat by greenhouse gases.',
        },
        {
          type: 'flowchart',
          title: 'Waste Management',
          description: 'Segregation, recycling, and disposal steps.',
        },
        {
          type: 'table',
          title: 'Pollutants and Sources',
          description: 'Major pollutants with common sources.',
        },
        {
          type: 'diagram',
          title: 'Ozone Depletion Cycle',
          description: 'CFC breakdown and ozone destruction.',
        },
      ],
      difficultyLevel: 2,
      estimatedStudyMinutes: 210,
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

  console.log('Biology Class 12 chapters 13-16 seeding completed!');
}

seedBiologyClass12Part4().catch(console.error);
