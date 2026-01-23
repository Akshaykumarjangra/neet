import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter9() {
  console.log('Seeding Biology Class 12 Chapter 9: Strategies for Enhancement in Food Production...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 9,
    chapterTitle: 'Strategies for Enhancement in Food Production',
    introduction: `With the growing human population, increasing food production is critical for ensuring food security. This chapter explores scientific approaches to enhance agricultural productivity through animal husbandry, plant breeding, and tissue culture techniques. Understanding these strategies is essential for NEET as they cover genetics applications, agricultural practices, and biotechnology methods used to develop high-yielding, disease-resistant crop varieties and improved livestock breeds for sustainable food production.`,

    detailedNotes: `
# Strategies for Enhancement in Food Production

## Introduction

**Green Revolution**: Increased agricultural production through high-yielding varieties, irrigation, fertilizers, and pesticides (1960s-1970s in India)

**Challenges**:
- Growing population (requires more food)
- Limited arable land
- Climate change, pests, diseases
- Need for sustainable practices

**Solutions**:
- Improved crop varieties (plant breeding)
- Better livestock breeds (animal husbandry)
- Biotechnology and tissue culture

## Animal Husbandry

**Definition**: Scientific management of livestock for obtaining maximum benefits and improving genetic qualities

### Types of Animal Husbandry

**1. Dairy Farm Management**
- Production of milk and milk products
- Focus on cattle (cows, buffaloes) and goats

**2. Poultry Farming**
- Production of eggs and chicken meat
- Two types:
  - **Broilers**: For meat production (fast-growing varieties)
  - **Layers**: For egg production (high egg-laying capacity)

**3. Fisheries**
- **Capture fishing**: Obtaining fish from natural water bodies
- **Culture fisheries (Aquaculture)**: Rearing fish in controlled environments
  - Freshwater: Catla, Rohu, Mrigal
  - Marine: Mullets, Pearl spots, Pomfrets

**4. Apiculture (Beekeeping)**
- Rearing honeybees for honey and wax
- Species: *Apis indica* (Indian bee), *Apis mellifera* (Italian bee)
- Benefits: Honey production, crop pollination

**5. Sericulture**
- Rearing silkworms for silk production
- Silkworm: *Bombyx mori* (feeds on mulberry leaves)

### Cattle Breeding

**Indigenous Breeds** (Indian):
- **Milch breeds** (high milk production): Red Sindhi, Sahiwal, Gir
- **Draught breeds** (used for farm labor): Nagori, Malvi, Hallikar
- **Dual purpose**: Haryana, Ongole, Deoni

**Exotic Breeds** (Foreign):
- Jersey, Holstein-Friesian, Brown Swiss
- Higher milk production but less heat-tolerant

**Breeding Methods**:

**1. Inbreeding**
- Mating between closely related individuals (brother-sister, parent-offspring)
- **Purpose**: 
  - Purify breed (make homozygous)
  - Maintain superior traits within breed
- **Advantages**: Ensures breed purity
- **Disadvantages**: 
  - **Inbreeding depression** (reduced fertility, productivity, vigor)
  - Accumulation of harmful recessive traits
- **Solution**: Introduce unrelated superior male after 4-6 generations (**outcrossing**)

**2. Outbreeding**

Mating between unrelated animals

**Types**:

**A. Outcrossing**
- Mating within same breed but unrelated animals (no common ancestors for 4-6 generations)
- **Purpose**: Overcome inbreeding depression
- Offspring may be used for breeding

**B. Cross-breeding**
- Mating between different breeds
- **Purpose**: Combine desirable traits from both breeds
- **Example**: Hisardale sheep (Bikaneri ewes × Marino rams) - combines wool quality and survival in harsh climate
- Offspring often superior (**hybrid vigor/heterosis**)
- Offspring NOT used for further breeding (genetic variation)

**C. Interspecific Hybridization**
- Mating between different species
- **Examples**:
  - **Mule**: Male donkey × Female horse (sterile, strong, used for transport)
  - **Hinny**: Male horse × Female donkey
- Usually sterile (cannot reproduce)

### Controlled Breeding Experiments

**Artificial Insemination (AI)**
- Semen collected from superior male
- Stored in frozen form (liquid nitrogen, -196°C)
- Inseminated into female at right time
- **Advantages**:
  - One superior bull can inseminate thousands of cows
  - Overcomes geographical barriers
  - Prevents disease transmission
  - Maintains frozen semen for years

**Multiple Ovulation Embryo Transfer (MOET)**
- Hormones given to cow to induce super-ovulation (6-8 eggs instead of 1)
- Artificial insemination
- Embryos collected at 8-32 cell stage (after 7 days)
- Transferred to surrogate mothers
- **Advantage**: Superior cow can produce many calves per year (instead of one)

## Plant Breeding

**Definition**: Genetic improvement of crops through selection and hybridization

**Goals**:
- Increased yield (productivity)
- Improved quality (nutrition, taste)
- Disease and pest resistance
- Tolerance to environmental stress (drought, salinity, heat, cold)
- Shorter maturity duration

### Steps in Plant Breeding

**1. Collection of Variability**
- Germplasm collection: Gathering all genetic varieties of a crop
- Includes wild relatives, local varieties, exotic varieties
- **Germplasm banks**: Preserve seeds at low temperature

**2. Evaluation and Selection of Parents**
- Assess germplasm for desired traits
- Select superior parent plants

**3. Cross-Hybridization**
- Cross superior parents to combine desirable traits
- Create genetic variation in offspring

**4. Selection and Testing**
- Select superior hybrids
- Evaluate over multiple seasons/locations
- Test for yield, quality, resistance

**5. Release of New Varieties**
- Registered and released for commercial cultivation
- Farmers adopt new variety

### Plant Breeding Methods

**1. Hybridization**
- Cross-pollination between genetically different plants
- **Types**:
  - **Intervarietal**: Between different varieties of same species
  - **Interspecific**: Between different species of same genus
  - **Intergeneric**: Between different genera (rare)

**2. Selection**
- Mass selection: Selecting superior individual plants
- Pure line selection: Selecting from self-pollinating crops

**3. Mutation Breeding**
- Induced mutations using physical (radiation) or chemical mutagens
- Creates new variations
- **Examples**: 
  - High-yielding rice varieties developed through mutation
  - Improved mung bean varieties

### Green Revolution in India

**Father of Green Revolution**: Dr. Norman Borlaug (Nobel Prize, 1970)
**India**: Dr. M.S. Swaminathan

**High-Yielding Varieties (HYVs)**:
- **Wheat**: Sonalika, Kalyan Sona (semi-dwarf, high-yielding)
- **Rice**: IR-8, Jaya, Ratna, Jaya
- **Sugarcane**, **Millets**, **Maize**

**Features of HYVs**:
- Semi-dwarf varieties (don't lodge/fall)
- High response to fertilizers
- Disease-resistant
- Early maturing

**Increased production but also**:
- Increased fertilizer and water use
- Environmental concerns

### Important Plant Breeding Achievements

**1. Disease Resistance**
- **Wheat**: Rust-resistant varieties (Himgiri)
- **Cowpea**: Bacterial blight resistant
- **Chilli**: Mosaic virus and leaf curl resistant

**2. Pest Resistance**
- **Brassica**: Aphid resistant (using hairy leaves)
- **Wheat**: Cereal cyst nematode resistant

**3. Quality Improvement**
- **Protein quality**: 
  - **Atlas 66** wheat (high protein content)
  - **Fortified rice**: Iron-enriched
- **Oil quality**: Improved oil content in groundnut, mustard
- **Nutritional enhancement**: Vitamin A rice (Golden Rice)

**4. Biofortification**
- Breeding crops with higher nutritional value
- **Examples**:
  - **Iron-rich spinach**
  - **Vitamin A-enriched carrots**
  - **Protein-rich maize** (Quality Protein Maize)

## Single Cell Protein (SCP)

**Definition**: Protein derived from single-celled organisms (microbes)

**Sources**:
- **Algae**: *Spirulina*, *Chlorella*
- **Bacteria**: *Methylophilus methylotrophus*
- **Yeast**: *Saccharomyces cerevisiae*, *Candida utilis*
- **Fungi**: Mushrooms

**Advantages**:
- Rapid multiplication (high protein in short time)
- Can grow on cheap substrates (waste materials)
- High protein content (40-80%)
- Rich in vitamins and minerals

**Uses**:
- Animal feed (cattle, poultry, fish)
- Human food supplement
- Reduces dependency on traditional protein sources

**Example**: *Spirulina* - blue-green alga, rich in protein, vitamins, and minerals

## Tissue Culture

**Definition**: Growing plant cells, tissues, or organs in artificial nutrient medium under sterile conditions

**Principle**: **Totipotency** - Every plant cell has genetic potential to develop into complete plant

**Process**:
1. **Explant selection**: Choose tissue (shoot tip, root tip, leaf)
2. **Surface sterilization**: Disinfect with alcohol, bleach
3. **Nutrient medium**: MS medium (Murashige and Skoog) with sucrose, vitamins, hormones
4. **Callus formation**: Unorganized mass of cells
5. **Shoot/root induction**: Hormones induce differentiation
6. **Plantlet transfer**: Move to soil

**Types**:

**1. Micropropagation**
- Rapid multiplication of plants
- Thousands of identical plants from single explant
- **Advantages**: Disease-free, genetically uniform, year-round production

**2. Somatic Hybridization (Protoplast Fusion)**
- Fusion of protoplasts (cells without cell wall) from different species
- Creates hybrid plants not possible through sexual reproduction
- **Example**: **Pomato** (Potato + Tomato)

**3. Somaclonal Variation**
- Genetic variations arising during tissue culture
- Can be used to develop new varieties

**Applications**:
- Mass propagation (orchids, banana, sugarcane)
- Production of disease-free plants (virus-free potato, banana)
- Conservation of endangered species
- Production of secondary metabolites (medicines)
- Cryopreservation (storing germplasm)

## Summary Points

1. Animal husbandry includes dairy, poultry, fisheries, apiculture, and sericulture for food production
2. Breeding methods include inbreeding (breed purity), outcrossing, cross-breeding, and interspecific hybridization
3. Artificial insemination and MOET technology enable rapid multiplication of superior livestock
4. Plant breeding develops high-yielding, disease-resistant varieties through selection and hybridization
5. Green Revolution introduced semi-dwarf, high-yielding varieties transforming Indian agriculture
6. Biofortification enhances nutritional quality of crops (iron, vitamin A, protein)
7. Tissue culture enables rapid multiplication and production of disease-free plants through totipotency
`,

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Plant Breeding Cycle',
        description: 'Selection -> crossing -> evaluation.'
      },
      {
        type: 'flowchart',
        title: 'Animal Husbandry Pipeline',
        description: 'Breed selection -> feeding -> disease control.'
      },
      {
        type: 'table',
        title: 'High Yield Varieties',
        description: 'Crop traits and examples.'
      },
      {
        type: 'comparison',
        title: 'Traditional vs Modern Breeding',
        description: 'Techniques and outcomes.'
      },
      {
        type: 'graph',
        title: 'Yield vs Input',
        description: 'Productivity changes with inputs.'
      },
    ],
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Strategies for Enhancement in Food Production',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Plant Breeding Cycle',
          description: 'Selection -> crossing -> evaluation.'
        },
        {
          type: 'flowchart',
          title: 'Animal Husbandry Pipeline',
          description: 'Breed selection -> feeding -> disease control.'
        },
        {
          type: 'table',
          title: 'High Yield Varieties',
          description: 'Crop traits and examples.'
        },
        {
          type: 'comparison',
          title: 'Traditional vs Modern Breeding',
          description: 'Techniques and outcomes.'
        },
        {
          type: 'graph',
          title: 'Yield vs Input',
          description: 'Productivity changes with inputs.'
        },
      ],}
  });

  console.log('✓ Seeded Biology Class 12 Chapter 9: Strategies for Enhancement in Food Production');
}

seedBiologyClass12Chapter9().catch(console.error);
