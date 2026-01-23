import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyClass12Chapter2() {
  console.log('Seeding Biology Class 12 Chapter 2: Sexual Reproduction in Flowering Plants...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 2,
    chapterTitle: 'Sexual Reproduction in Flowering Plants',
    introduction: `Flowering plants (angiosperms) dominate the terrestrial landscape, with over 300,000 species exhibiting remarkable diversity in reproductive strategies. Sexual reproduction in these plants involves complex structures (flowers), specialized processes (pollination, fertilization), and unique features like double fertilization. The flower, with its precise architecture, orchestrates the union of male and female gametes while ensuring genetic diversity through cross-pollination mechanisms. Understanding plant reproduction is fundamental to agriculture, horticulture, and plant breeding - disciplines that feed humanity. This chapter explores flower structure, microsporogenesis and megasporogenesis, pollination mechanisms, fertilization including the unique double fertilization, and post-fertilization events leading to seed and fruit formation.`,

    detailedNotes: `
# Sexual Reproduction in Flowering Plants

## Flower: The Reproductive Unit

**Flower**: Specialized shoot for sexual reproduction

**Functions:**
- Production of male gametes (pollen)
- Production of female gametes (egg)
- Site of fertilization
- Development of seeds and fruits

### Flower Structure

**Parts of a Typical Flower** (from outside to inside):

**1. Calyx**
- **Sepals**: Outermost, green, protective
- Protect flower bud
- Usually green (photosynthetic)

**2. Corolla**
- **Petals**: Colored, attract pollinators
- Brightly colored (in insect-pollinated flowers)
- Scented, nectar glands

**3. Androecium** (Male reproductive part)
- **Stamens**: Male organs
- Each stamen has:
  - **Filament**: Stalk
  - **Anther**: Pollen sacs (microsporangia)

**4. Gynoecium/Pistil** (Female reproductive part)
- **Carpels**: Female organs
- Each carpel has:
  - **Stigma**: Sticky top, receives pollen
  - **Style**: Connects stigma to ovary
  - **Ovary**: Contains ovules (future seeds)

**Flower Types:**

**Based on presence of parts:**
- **Complete**: All four whorls present
- **Incomplete**: One or more whorls absent

**Based on sexuality:**
- **Bisexual (Hermaphrodite)**: Both stamens and pistil present (Hibiscus, Mustard)
- **Unisexual**: Only stamens (male) or only pistil (female)
  - **Monoecious**: Male and female flowers on same plant (Cucumber, Maize)
  - **Dioecious**: Male and female flowers on different plants (Papaya, Date palm)

## Pre-fertilization: Gametogenesis

### A. Microsporogenesis (Male Gamete Formation)

**Location**: Anther (microsporangium)

**Anther Structure:**
- Four pollen sacs (microsporangia)
- **Microspore mother cells (MMC)** / Pollen mother cells (PMC) inside
- Diploid (2n)

**Process:**

**1. Meiosis**
- Each **diploid MMC (2n)** undergoes meiosis
- Produces **four haploid microspores (n)**
- Arrangement: **Tetrad** (group of four)

**2. Microspore Development**
- Microspores separate
- Each develops into **pollen grain**

**Pollen Grain Structure** (at maturity):
- **Two cells**:
  - **Vegetative cell**: Large, has food reserve, forms pollen tube
  - **Generative cell**: Small, floats in vegetative cell, will divide to form male gametes
- **Two-layered wall**:
  - **Exine**: Outer, hard, made of **sporopollenin** (most resistant organic material, withstands high temperatures, acids)
    - Has **germ pores** (thin areas for pollen tube emergence)
  - **Intine**: Inner, thin, cellulosic

**Pollen Grain Release:**
- **Dehiscence**: Anther splits, releases pollen
- At this stage: **2-celled** (vegetative + generative) or **3-celled** (vegetative + 2 male gametes)

### B. Megasporogenesis (Female Gamete Formation)

**Location**: Ovule (megasporangium)

**Ovule Structure:**
- **Funiculus**: Stalk attaching ovule to placenta
- **Hilum**: Junction of ovule and funiculus
- **Integuments**: Protective layers (one or two)
  - Leave a small opening: **Micropyle** (pollen tube entry)
- **Nucellus**: Central tissue (megasporangium)
- **Chalaza**: Opposite end from micropyle
- **Megaspore mother cell (MMC)**: Single diploid cell inside nucellus

**Process:**

**1. Meiosis**
- **Diploid MMC (2n)** undergoes meiosis
- Produces **four haploid megaspores (n)** (linear arrangement)

**2. Megaspore Degeneration**
- **Three megaspores degenerate**
- **One functional megaspore** survives (usually chalazal)

**3. Embryo Sac Development** (Female gametophyte)
- Functional megaspore undergoes **three mitotic divisions**
- Produces **7-celled, 8-nucleate embryo sac**

**Mature Embryo Sac (7 cells, 8 nuclei):**

**At Micropylar End:**
- **Egg apparatus** (3 cells):
  - **1 Egg cell** (Female gamete) - Central
  - **2 Synergids** (Help cells) - Have filiform apparatus (guide pollen tube)

**At Center:**
- **Central cell** (1 large cell with **2 polar nuclei**)

**At Chalazal End:**
- **3 Antipodal cells** (Degenerate later)

**Summary:**
- 1 Egg (n)
- 2 Synergids (n)
- 2 Polar nuclei (n + n) in central cell
- 3 Antipodals (n)

## Pollination

**Definition**: Transfer of pollen grains from **anther to stigma**

**Types:**

### 1. Self-Pollination (Autogamy)

**Definition**: Pollen from same flower or another flower on same plant

**Requirements:**
- Bisexual flowers
- Synchronous anther dehiscence and stigma receptivity

**Examples:** Pea, Wheat, Rice

**Advantages:**
- Assured pollination
- Maintains pure line (uniform characteristics)
- No dependence on external agents

**Disadvantages:**
- No genetic variation
- Inbreeding depression (accumulation of harmful genes)

**Special Case - Cleistogamy:**
- Flowers never open
- Ensured self-pollination
- Example: Commelina, Oxalis

### 2. Cross-Pollination (Allogamy)

**Definition**: Pollen from **different plant** of same species

**Advantages:**
- Genetic variation (healthier offspring)
- Better adaptation
- Vigor (heterosis)

**Disadvantages:**
- Uncertain (depends on agents)
- Wastage of pollen
- Dependence on external agents

**Mechanisms to Prevent Self-Pollination:**

**1. Unisexuality**
- Flowers unisexual (Papaya, Watermelon)

**2. Dichogamy**
- **Anthers and stigma mature at different times**
- **Protandry**: Anthers mature first (Sunflower)
- **Protogyny**: Stigma matures first (Plantain)

**3. Self-Incompatibility**
- **Genetic mechanism**: Pollen cannot germinate on stigma of same plant
- Prevents inbreeding

**4. Heterostyly**
- Different style/stamen lengths in different flowers
- Ensures cross-pollination

### Pollination Agents

**1. Abiotic:**

**Wind (Anemophily)**
- Light, non-sticky pollen
- Large quantity produced
- Small, inconspicuous flowers
- Example: Grasses, Maize, Coconut

**Water (Hydrophily)**
- Aquatic plants
- Pollen transported by water
- Example: Vallisneria, Hydrilla

**2. Biotic:**

**Insects (Entomophily)**
- Colorful, scented flowers
- Nectar production
- Sticky pollen
- Example: Roses, Jasmine, Sunflower

**Birds (Ornithophily)**
- Large, brightly colored flowers
- Abundant nectar
- Example: Coral tree, Bombax

**Bats (Chiropterophily)**
- Night-blooming flowers
- Strong odor
- Example: Adansonia (Baobab)

## Fertilization

**After pollination**, pollen grain lands on stigma

### Pollen Germination and Pollen Tube

**Process:**
1. Pollen absorbs water and nutrients from stigma
2. **Pollen tube emerges** through germ pore
3. **Generative cell divides** → **Two male gametes**
4. Pollen tube grows through style (chemotropic growth toward ovary)
5. Enters ovary, directed to ovule
6. Enters ovule through **micropyle**
7. Penetrates embryo sac

**Filiform apparatus** (in synergids) guides pollen tube

### Double Fertilization

**Unique to Angiosperms**

**Process:**
1. Pollen tube enters embryo sac
2. Tip dissolves, releases **two male gametes**

**Two Fusions Occur:**

**1. Syngamy (True Fertilization)**
- **One male gamete (n) + Egg (n) → Zygote (2n)**
- Forms **diploid zygote**
- Will develop into **embryo**

**2. Triple Fusion**
- **Second male gamete (n) + Two polar nuclei (n + n) → Primary Endosperm Nucleus (3n)**
- Forms **triploid PEN**
- Will develop into **endosperm** (nutritive tissue)

**Name**: **Double fertilization** (two fusions occurring)

**Significance:**
- **Ensures nutrition**: Endosperm develops only if fertilization occurs
- **Evolutionary advantage**: Resource not wasted on unfertilized ovules

## Post-Fertilization Events

### 1. Endosperm Development

**Source**: Primary Endosperm Nucleus (3n)

**Process**: PEN divides repeatedly → **Endosperm tissue**

**Types:**

**A. Nuclear Endosperm**
- Free nuclear divisions (no cell wall formation initially)
- Later, cell walls form
- Example: Coconut (liquid = free nuclei stage, white kernel = cellular)

**B. Cellular Endosperm**
- Cell wall formation after each division
- Example: Most plants

**Function**: **Nutrition for developing embryo**

**Note**: In some plants, endosperm consumed during seed development (non-endospermic seeds, e.g., Pea, Beans)

### 2. Embryo Development (Embryogeny)

**Source**: Zygote (2n)

**Process:**

**1. Zygote Division**
- Zygote divides → Two cells
- **Basal cell** → **Suspensor** (attaches embryo to embryo sac)
- **Apical cell** → **Embryo proper**

**2. Embryo Stages:**
- **Globular** → **Heart-shaped** → **Mature embryo**

**Dicot Embryo Structure:**
- **Cotyledons**: Two seed leaves (store food)
- **Epicotyl**: Above cotyledons, forms shoot
  - **Plumule**: Future shoot apex
- **Hypocotyl**: Below cotyledons
- **Radicle**: Embryonic root

**Monocot Embryo:**
- **One cotyledon** (scutellum in grass family)
- **Coleoptile**: Sheath covering plumule
- **Coleorhiza**: Sheath covering radicle

### 3. Seed Development

**Definition**: Mature ovule

**Components:**

**1. Seed Coat** (from integuments)
- **Testa**: Outer layer (from outer integument)
- **Tegmen**: Inner layer (from inner integument)
- **Hilum**: Scar (attachment point)
- **Micropyle**: Small pore (water entry during germination)

**2. Embryo** (from zygote)

**3. Endosperm** (from PEN) - May be present or absent

**Types of Seeds:**

**Endospermic (Albuminous)**:
- Endosperm **persists** in mature seed
- Example: Wheat, Rice, Maize, Castor

**Non-endospermic (Ex-albuminous)**:
- Endosperm **consumed** during development
- Food stored in cotyledons
- Example: Pea, Beans, Groundnut

### 4. Fruit Development

**Source**: **Ovary** (sometimes other floral parts)

**Function**: 
- Protects seeds
- Aids seed dispersal

**True Fruits**: From ovary only (Mango, Tomato)

**False Fruits**: From ovary + other parts
- **Apple**: Thalamus (fleshy part), ovary (core)
- **Cashew**: Peduncle (cashew apple), nut (true fruit)
- **Strawberry**: Thalamus

**Parthenocarpy**: Fruit formation **without fertilization** (seedless fruits)
- Natural: Banana
- Artificial: Grapes (hormone treatment)

### Summary of Post-Fertilization Changes

| Structure | Becomes |
|-----------|---------|
| **Ovule** | Seed |
| **Integuments** | Seed coat |
| **Zygote** | Embryo |
| **Primary Endosperm Nucleus** | Endosperm |
| **Ovary** | Fruit |
| **Ovary wall** | Fruit wall (Pericarp) |

## Apomixis and Polyembryony

**Apomixis**: Seed formation **without fertilization**
- Asexual reproduction but produces seeds
- Example: Some grasses, Citrus

**Polyembryony**: **More than one embryo** in a single seed
- Example: Citrus, Mango (nucellar embryos), Orchids
`,

    keyConcepts: [
      'Flower: Reproductive unit with Calyx (sepals), Corolla (petals), Androecium (stamens), Gynoecium (pistil)',
      'Microsporogenesis: Diploid MMC (anther) → Meiosis → 4 haploid microspores → Pollen grains (2-celled)',
      'Pollen grain: Vegetative cell + Generative cell; Wall: Exine (sporopollenin) + Intine',
      'Megasporogenesis: Diploid MMC (ovule) → Meiosis → 4 megaspores (3 degenerate, 1 functional)',
      'Embryo sac (7 cells, 8 nuclei): Egg + 2 Synergids (micropylar), 2 Polar nuclei (central), 3 Antipodals (chalazal)',
      'Pollination: Pollen transfer anther → stigma; Self (autogamy) vs Cross (allogamy)',
      'Cross-pollination agents: Wind (anemophily), Water (hydrophily), Insects (entomophily), Birds (ornithophily)',
      'Double fertilization (unique to angiosperms): Syngamy (male gamete + egg → zygote 2n) + Triple fusion (male gamete + 2 polar nuclei → PEN 3n)',
      'Post-fertilization: Ovule → Seed, Integuments → Seed coat, Zygote → Embryo, PEN → Endosperm (3n), Ovary → Fruit',
      'Endosperm: Nutritive tissue (3n) from PEN',
      'Embryo: Cotyledons, Plumule, Radicle (from zygote)',
      'Seed types: Endospermic (endosperm persists - Wheat, Rice), Non-endospermic (food in cotyledons - Pea, Beans)',
      'Parthenocarpy: Seedless fruit formation without fertilization (Banana)',
      'Apomixis: Seed formation without fertilization; Polyembryony: Multiple embryos per seed'
    ],

    formulas: [
      'Microsporogenesis: MMC (2n) → Meiosis → 4 Microspores (n) → Pollen grains',
      'Megasporogenesis: MMC (2n) → Meiosis → 4 Megaspores (n) → 3 degenerate, 1 → Embryo sac',
      'Syngamy: Male gamete (n) + Egg (n) → Zygote (2n)',
      'Triple fusion: Male gamete (n) + 2 Polar nuclei (n + n) → PEN (3n)',
      'PEN (3n) → Endosperm (3n)',
      'Zygote (2n) → Embryo (2n)'
    ],

    learningObjectives: [
      'Describe flower structure and parts',
      'Explain microsporogenesis and pollen grain formation',
      'Understand pollen grain structure (vegetative, generative cells; exine, intine)',
      'Explain megasporogenesis and embryo sac development',
      'Describe embryo sac structure (7 cells, 8 nuclei)',
      'Distinguish between self-pollination and cross-pollination',
      'Understand mechanisms to prevent self-pollination',
      'Describe pollination agents (wind, water, insects, birds)',
      'Explain pollen germination and pollen tube growth',
      'Understand double fertilization (syngamy and triple fusion)',
      'Describe post-fertilization events (seed and fruit formation)',
      'Distinguish between endospermic and non-endospermic seeds',
      'Explain parthenocarpy, apomixis, and polyembryony'
    ],

    prerequisites: [
      'Understanding of flower structure',
      'Knowledge of meiosis and mitosis',
      'Understanding of haploid and diploid chromosome numbers'
    ],

    importantTopics: [
      'Flower parts: Calyx, Corolla, Androecium (stamens), Gynoecium (pistil)',
      'Microsporogenesis: MMC → 4 microspores → Pollen grains',
      'Pollen grain structure: 2 cells (vegetative, generative), sporopollenin exine',
      'Megasporogenesis: MMC → 4 megaspores (3 degenerate)',
      'Embryo sac: 7 cells, 8 nuclei (Egg, 2 Synergids, 2 Polar nuclei, 3 Antipodals)',
      'Pollination types: Self vs Cross; Agents: Wind, Water, Insects, Birds',
      'Double fertilization: Syngamy (zygote 2n) + Triple fusion (PEN 3n)',
      'Post-fertilization: Ovule → Seed, Ovary → Fruit, Zygote → Embryo, PEN → Endosperm',
      'Seed types: Endospermic (Wheat, Rice) vs Non-endospermic (Pea, Beans)',
      'Parthenocarpy: Seedless fruits (Banana)'
    ],

    ncertChapterRef: 'Class 12 Biology, Chapter 2',
    estimatedStudyMinutes: 360,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Flower Structure (L.S.)',
        description: 'Longitudinal section showing all four whorls and parts'
      },
      {
        type: 'diagram',
        title: 'Anther T.S.',
        description: 'Transverse section showing pollen sacs and microsporogenesis'
      },
      {
        type: 'diagram',
        title: 'Pollen Grain Structure',
        description: 'Vegetative cell, generative cell, exine, intine, germ pores'
      },
      {
        type: 'diagram',
        title: 'Ovule Structure',
        description: 'Funiculus, integuments, micropyle, nucellus, embryo sac'
      },
      {
        type: 'diagram',
        title: 'Embryo Sac (7-celled, 8-nucleate)',
        description: 'Egg apparatus, central cell, antipodals'
      },
      {
        type: 'flowchart',
        title: 'Double Fertilization',
        description: 'Syngamy and triple fusion pathways'
      },
      {
        type: 'comparison',
        title: 'Endospermic vs Non-endospermic Seeds',
        description: 'Structure and examples'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Sexual Reproduction in Flowering Plants',
      estimatedStudyMinutes: 360,
      difficultyLevel: 4,
      status: 'published',
      visualizationsData: [
      {
        type: 'diagram',
        title: 'Flower Structure (L.S.)',
        description: 'Longitudinal section showing all four whorls and parts'
      },
      {
        type: 'diagram',
        title: 'Anther T.S.',
        description: 'Transverse section showing pollen sacs and microsporogenesis'
      },
      {
        type: 'diagram',
        title: 'Pollen Grain Structure',
        description: 'Vegetative cell, generative cell, exine, intine, germ pores'
      },
      {
        type: 'diagram',
        title: 'Ovule Structure',
        description: 'Funiculus, integuments, micropyle, nucellus, embryo sac'
      },
      {
        type: 'diagram',
        title: 'Embryo Sac (7-celled, 8-nucleate)',
        description: 'Egg apparatus, central cell, antipodals'
      },
      {
        type: 'flowchart',
        title: 'Double Fertilization',
        description: 'Syngamy and triple fusion pathways'
      },
      {
        type: 'comparison',
        title: 'Endospermic vs Non-endospermic Seeds',
        description: 'Structure and examples'
      }
    ]
    }
  });

  console.log('✅ Biology Class 12 Chapter 2: Sexual Reproduction in Flowering Plants seeded successfully!');
}

seedBiologyClass12Chapter2()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
