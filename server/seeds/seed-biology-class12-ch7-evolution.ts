import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter7() {
  console.log('Seeding Biology Class 12 Chapter 7: Evolution...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 7,
    chapterTitle: 'Evolution',
    introduction: `Evolution is the gradual change in the characteristics of species over successive generations, driven by natural selection, genetic drift, gene flow, and mutations. This chapter explores Darwin's theory of evolution, evidence supporting evolution from various scientific disciplines, mechanisms driving evolutionary change, origin of life on Earth, and human evolution from primate ancestors. Understanding evolution is crucial for NEET as it explains biodiversity, adaptation, speciation, and forms the unifying principle of biology connecting all life forms through common descent.`,

    detailedNotes: `
# Evolution

## Origin of Life

### Early Earth Conditions (4.6 billion years ago)

- High temperature from meteorite bombardment
- Reducing atmosphere: CH₄, NH₃, H₂, water vapors (**No free O₂**)
- Volcanic activity, lightning, UV radiation
- No ozone layer (formed later from O₂)

### Theory of Chemical Evolution

**Oparin-Haldane Hypothesis (1920s)**

**Steps**:
1. **Inorganic molecules** formed from primordial atmosphere
2. Simple **organic molecules** (amino acids, sugars) formed
3. Accumulation in "**primordial soup**" (oceans)
4. Formation of complex molecules (proteins, nucleic acids)
5. Self-replicating systems evolved
6. First primitive cells (protocells) formed

**Miller-Urey Experiment (1953)**

**Setup**: Simulated early Earth conditions
- Flask with CH₄, NH₃, H₂, water vapor
- Electric discharge (simulating lightning)
- Cooling condenser

**Results**:
- Produced **amino acids** (glycine, alanine)
- Sugars, organic acids, urea
- Proved organic molecules could form from inorganic precursors

**RNA World Hypothesis**
- RNA likely came before DNA
- RNA can both store information and catalyze reactions (**ribozymes**)
- First self-replicating molecule was probably RNA
- DNA evolved later for more stable storage

### First Life Forms

- Appeared **3.5 billion years ago**
- **Prokaryotes** (bacteria) were first organisms
- Fossil evidence: Stromatolites (layered rocks formed by cyanobacteria)
- Initially **anaerobic heterotrophs**
- Later, **photosynthetic organisms** evolved (cyanobacteria)
- Oxygen released by photosynthesis accumulated in atmosphere
- **Aerobic organisms** evolved to use oxygen

## Evidence for Evolution

### 1. Paleontological Evidence (Fossils)

**Fossils**: Preserved remains or impressions of organisms in rocks

**Types**:
- Petrification (minerals replace organic matter)
- Molds and casts
- Amber preservation
- Ice preservation

**Evidence**:
- Show **gradual changes** over time
- **Transitional forms**: *Archaeopteryx* (link between reptiles and birds - had feathers like birds, teeth and tail like reptiles)
- **Age determination**:
  - **Radiometric dating**: Using radioactive isotopes (C-14 for recent fossils, U-238 for older)
  - **Fossil record** shows progression from simple to complex

**Oldest fossils**: Stromatolites (3.5 billion years old)

### 2. Morphological Evidence

**A. Homologous Organs**
- **Similar structure**, different functions
- **Common ancestry**, divergent evolution
- Examples:
  - Forelimbs of humans, whales, bats, horses
  - Same basic bone pattern (humerus, radius, ulna, carpals, metacarpals, phalanges)
  - Adapted for different purposes (grasping, swimming, flying, running)

**B. Analogous Organs**
- **Different structure**, similar functions
- **Different ancestry**, convergent evolution
- Examples:
  - Wings of insects and birds
  - Eyes of octopus and mammals

**C. Vestigial Organs**
- Reduced or non-functional organs
- Were functional in ancestors
- Examples in humans:
  - Appendix (digestive function in herbivorous ancestors)
  - Coccyx (tail bone)
  - Wisdom teeth
  - Body hair
  - Ear muscles

### 3. Embryological Evidence

**von Baer's Law**: Early embryos of different vertebrates look similar

**Observations**:
- All vertebrate embryos have:
  - Gill slits
  - Tail
  - Similar body plan

**Recapitulation Theory** (Haeckel): "Ontogeny recapitulates phylogeny" - development mirrors evolution (now considered oversimplified)

### 4. Biochemical Evidence

- **DNA and proteins** show evolutionary relationships
- More similar DNA/proteins = closer evolutionary relationship
- **Cytochrome C** comparisons show evolutionary distances
- **Universal genetic code** (all organisms use same code)
- Same biomolecules: DNA, RNA, proteins, ATP
- **DNA hybridization** and sequencing reveal relationships

### 5. Biogeographical Evidence

- Distribution of species on Earth
- **Continental drift** explains similar species on different continents
- **Island species** resemble nearby mainland species but show unique adaptations
- Example: **Darwin's finches** on Galapagos Islands - 13 species evolved from common ancestor, different beak shapes for different food sources

## Darwin's Theory of Natural Selection

**Charles Darwin (1809-1882)**

**HMS Beagle Voyage (1831-1836)**:
- Galapagos Islands observations
- Fossils in South America

### Key Observations

1. **Galapagos Finches**:
   - 13 species on different islands
   - Different beak shapes adapted to different food sources
   - Evolved from common ancestor

2. **Fossils**: Extinct animals resembled living species

### Theory of Natural Selection (1859 - "On the Origin of Species")

**Principles**:

1. **Overproduction**: Organisms produce more offspring than can survive
2. **Variation**: Individuals in a population show variations (different traits)
3. **Struggle for Existence**: Competition for limited resources (food, space, mates)
4. **Survival of the Fittest**: Individuals with favorable variations survive and reproduce more successfully
5. **Inheritance of Variations**: Favorable traits passed to offspring
6. **Gradual Change**: Over many generations, favorable traits become more common → evolution

**Example**: **Peppered moth** (*Biston betularia*) in England
- Light-colored moths common before Industrial Revolution (camouflaged on light bark)
- Industrial pollution darkened tree bark
- Dark moths better camouflaged, survived predation
- Dark moths became more common (**industrial melanism**)
- After pollution control, light moths increased again

### Lamarck's Theory (Disproved)

**Jean-Baptiste Lamarck (1809)**:
- **Use and disuse** of organs
- **Inheritance of acquired characteristics**
- Example: Giraffe's long neck from stretching
- **Not supported by evidence** (acquired traits not inherited)

## Mechanisms of Evolution

### 1. Mutation

- Source of **new genetic variation**
- Changes in DNA sequence
- Most are neutral or harmful, few are beneficial
- Provides raw material for evolution

### 2. Gene Flow (Migration)

- Movement of genes between populations
- Introduces new alleles
- Increases genetic diversity
- Can prevent population divergence

### 3. Genetic Drift

- **Random changes** in allele frequencies
- More pronounced in **small populations**
- Not related to fitness

**Types**:
- **Bottleneck Effect**: Population drastically reduced (disaster, disease), surviving individuals have limited genetic diversity
- **Founder Effect**: Small group colonizes new area, limited genetic diversity (e.g., Amish population)

### 4. Natural Selection

- **Non-random** process
- Favors beneficial traits
- Three types:
  - **Directional**: One extreme favored (e.g., antibiotic resistance in bacteria)
  - **Stabilizing**: Average favored, extremes selected against (e.g., human birth weight)
  - **Disruptive**: Both extremes favored, average selected against (may lead to speciation)

### 5. Sexual Selection

- Selection for traits that increase **mating success**
- May not improve survival
- Examples: Peacock's tail, deer antlers
- **Intrasexual selection**: Competition within same sex (male-male combat)
- **Intersexual selection**: Mate choice (female preference)

## Hardy-Weinberg Principle

**Conditions for genetic equilibrium** (no evolution):
1. **No mutations**
2. **Random mating**
3. **No gene flow** (migration)
4. **Large population size** (no genetic drift)
5. **No natural selection**

**Equation**: **p² + 2pq + q² = 1** (where **p + q = 1**)
- p = frequency of dominant allele
- q = frequency of recessive allele
- p² = frequency of homozygous dominant
- 2pq = frequency of heterozygous
- q² = frequency of homozygous recessive

**Use**: Detect if evolution is occurring by comparing observed vs. expected frequencies

## Speciation

**Speciation**: Process by which new species arise from existing species

### Types of Speciation

**1. Allopatric Speciation** (Geographic)
- **Geographic isolation** separates population
- Different selection pressures in different areas
- Populations diverge genetically
- Eventually cannot interbreed (reproductive isolation)
- Example: Darwin's finches on different Galapagos islands

**2. Sympatric Speciation** (Same area)
- New species arise **without geographic isolation**
- Mechanisms:
  - **Polyploidy** (especially in plants) - chromosome number changes
  - Habitat differentiation
  - Sexual selection
- Example: Cichlid fish in African lakes

### Reproductive Isolation

Mechanisms preventing interbreeding between species:

**Prezygotic Barriers** (before fertilization):
- **Habitat isolation**: Different habitats
- **Temporal isolation**: Different breeding seasons/times
- **Behavioral isolation**: Different mating rituals
- **Mechanical isolation**: Incompatible reproductive organs
- **Gametic isolation**: Sperm-egg incompatibility

**Postzygotic Barriers** (after fertilization):
- **Hybrid inviability**: Hybrid dies before reproductive maturity
- **Hybrid sterility**: Hybrid cannot reproduce (e.g., **mule** - horse × donkey)
- **Hybrid breakdown**: F₂ hybrids have reduced fitness

### Adaptive Radiation

- Single ancestral species evolves into **multiple species**
- Each adapted to different **ecological niches**
- Examples:
  - **Darwin's finches** (Galapagos)
  - **Australian marsupials**
  - **Hawaiian honeycreepers**

### Convergent vs. Divergent Evolution

**Convergent Evolution**:
- Unrelated species evolve **similar traits**
- Similar environmental pressures
- Results in **analogous structures**
- Examples: Streamlined body of sharks (fish) and dolphins (mammals)

**Divergent Evolution**:
- Related species become **more different**
- Adapt to different environments
- Results in **homologous structures**
- Example: Mammalian forelimbs

## Human Evolution

### Primate Characteristics

- **Opposable thumb**
- **Binocular vision** (forward-facing eyes)
- Large brain relative to body size
- Long gestation, prolonged parental care

### Hominid Evolution

**Australopithecus** (3-4 million years ago)
- First bipedal hominids
- Brain size: 400-500 cc
- Found in Africa
- Example: "**Lucy**" fossil (*A. afarensis*)

**Homo habilis** (2-1.5 million years ago)
- "**Handy man**"
- Used stone tools
- Brain size: 650-800 cc
- Africa

**Homo erectus** (1.5 million-300,000 years ago)
- "**Upright man**"
- Spread to Asia, Europe
- Brain size: 900 cc
- Used fire, better tools
- Examples: **Java man**, **Peking man**

**Homo neanderthalensis** (300,000-30,000 years ago)
- Lived in Europe and Asia
- Brain size: 1400 cc (larger than modern humans)
- Buried dead, used tools, possibly had language
- Went extinct

**Homo sapiens** (200,000 years ago - present)
- Modern humans
- Brain size: 1350 cc
- Developed agriculture (~10,000 years ago)
- Complex language, art, culture
- Only surviving hominid species
- Originated in **Africa**, migrated worldwide (**Out of Africa theory**)

### Key Human Features

- **Bipedal locomotion** (walking upright)
- **Large brain** (especially cerebral cortex)
- Reduced jaw and teeth
- Loss of body hair
- **Complex language and culture**

## Important Formulae

1. **Hardy-Weinberg**: p² + 2pq + q² = 1, where p + q = 1
2. **Allele frequency**: p = (2×homozygotes + heterozygotes) / (2×total individuals)

## Summary Points

1. Life originated through chemical evolution about 3.5 billion years ago
2. Evidence for evolution comes from fossils, morphology, embryology, biochemistry, and biogeography
3. Darwin's natural selection explains how species evolve through differential survival and reproduction
4. Mechanisms of evolution include mutation, gene flow, genetic drift, natural selection, and sexual selection
5. Speciation occurs through geographic isolation (allopatric) or within same area (sympatric)
6. Human evolution shows progressive increase in brain size and bipedal locomotion
7. Hardy-Weinberg principle describes equilibrium conditions when evolution is NOT occurring
`,

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Evidence of Evolution',
        description: 'Fossils, homologous organs, and molecular data.'
      },
      {
        type: 'flowchart',
        title: 'Speciation Pathway',
        description: 'Isolation -> divergence -> new species.'
      },
      {
        type: 'graph',
        title: 'Hardy-Weinberg Equilibrium',
        description: 'Allele frequencies remain constant without forces.'
      },
      {
        type: 'comparison',
        title: 'Natural vs Artificial Selection',
        description: 'Drivers, timescales, and outcomes.'
      },
      {
        type: 'table',
        title: 'Geological Time Scale',
        description: 'Major eras and key evolutionary events.'
      },
    ],
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Evolution',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Evidence of Evolution',
          description: 'Fossils, homologous organs, and molecular data.'
        },
        {
          type: 'flowchart',
          title: 'Speciation Pathway',
          description: 'Isolation -> divergence -> new species.'
        },
        {
          type: 'graph',
          title: 'Hardy-Weinberg Equilibrium',
          description: 'Allele frequencies remain constant without forces.'
        },
        {
          type: 'comparison',
          title: 'Natural vs Artificial Selection',
          description: 'Drivers, timescales, and outcomes.'
        },
        {
          type: 'table',
          title: 'Geological Time Scale',
          description: 'Major eras and key evolutionary events.'
        },
      ],}
  });

  console.log('✓ Seeded Biology Class 12 Chapter 7: Evolution');
}

seedBiologyClass12Chapter7().catch(console.error);
