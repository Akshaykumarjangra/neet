import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyClass12Chapter1() {
  console.log('Seeding Biology Class 12 Chapter 1: Reproduction in Organisms...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 1,
    chapterTitle: 'Reproduction in Organisms',
    introduction: `Reproduction is the biological process by which organisms produce new individuals of their own kind, ensuring the continuity of species across generations. This fundamental characteristic of living organisms maintains the genetic heritage while allowing for variations through sexual reproduction. From simple binary fission in bacteria to complex reproductive strategies in mammals, the diversity of reproductive mechanisms reflects evolutionary adaptations to different environments. Understanding reproduction is crucial not only for biology but also for agriculture, animal husbandry, and human health. This chapter explores both asexual and sexual reproduction, examining their mechanisms, advantages, and biological significance in the perpetuation of life.`,

    detailedNotes: `
# Reproduction in Organisms

## Definition and Significance

**Reproduction**: Biological process by which organisms produce new individuals (offspring) of the same species

**Importance:**
- **Continuity of species**: Prevents extinction
- **Genetic diversity**: Sexual reproduction creates variations
- **Evolution**: Variations provide raw material for natural selection
- **Population growth**: Increases number of individuals

**Universal feature**: All living organisms reproduce (viruses need host cells)

## Types of Reproduction

### 1. Asexual Reproduction

**Definition**: Production of offspring from a **single parent** without gamete formation or fertilization

**Characteristics:**
- No meiosis
- No gametes
- No fusion
- **Genetically identical offspring** (clones) - except for mutations
- Faster than sexual reproduction
- No need for mate

**Advantages:**
- **Rapid multiplication**: Large numbers quickly
- **Favorable traits preserved**: Clones maintain superior characteristics
- **No mate needed**: Useful in isolated environments
- **Energy efficient**: No gamete production, courtship

**Disadvantages:**
- **No genetic variation**: All identical (except mutations)
- **Adaptation limited**: Cannot respond quickly to environmental changes
- **Disease susceptibility**: All individuals vulnerable to same pathogens

### Types of Asexual Reproduction

#### A. Binary Fission

**Definition**: Parent cell divides into **two equal daughter cells**

**Mechanism:**
1. DNA replication
2. Cell elongation
3. Septum formation
4. Two identical cells

**Examples:**
- **Bacteria** (Prokaryotes): No mitosis, direct DNA segregation
- **Protozoans**: Amoeba, Paramecium (involves mitosis)

**Variations:**
- **Simple binary fission**: Amoeba (any plane)
- **Transverse**: Paramecium (perpendicular to longitudinal axis)
- **Longitudinal**: Euglena (along longitudinal axis)

#### B. Multiple Fission (Sporulation)

**Definition**: Parent divides into **many daughter cells simultaneously**

**Mechanism:**
1. Nucleus divides multiple times (repeated mitosis)
2. Cytoplasm divides into multiple parts
3. Each part gets one nucleus
4. Many offspring produced

**Examples:**
- **Plasmodium** (Malaria parasite): In RBCs and mosquito
- **Amoeba**: During unfavorable conditions (cyst formation)

#### C. Budding

**Definition**: Small outgrowth (bud) develops from parent body, eventually detaches

**Mechanism:**
1. Mitotic division at specific site
2. Bud grows
3. Develops into miniature organism
4. Detaches (or remains attached forming colony)

**Examples:**
- **Yeast** (Saccharomyces): Unicellular fungus
- **Hydra**: Simple multicellular animal
- **Sponges**: Some species

#### D. Fragmentation

**Definition**: Parent organism breaks into **fragments**, each develops into new organism

**Mechanism:**
1. Body breaks (spontaneously or mechanically)
2. Each fragment regenerates missing parts
3. Develops into complete organism

**Requirements**: Each fragment must have cells capable of regeneration

**Examples:**
- **Spirogyra** (Filamentous alga)
- **Planaria** (Flatworm)
- **Starfish**: Can regenerate from arm fragments (with part of central disc)

**Note**: Not all fragmentation is reproduction (e.g., broken lizard tail doesn't form new lizard)

#### E. Vegetative Propagation (Plants)

**Definition**: New plants from **vegetative parts** (roots, stems, leaves) without seeds

**Natural Methods:**

**1. Runners (Stolons)**
- Horizontal stems growing above ground
- Nodes develop roots and shoots
- Example: Grass, Strawberry, Mint

**2. Rhizomes**
- Underground horizontal stems
- Nodes produce shoots upward and roots downward
- Example: Ginger, Turmeric, Banana

**3. Suckers**
- Lateral shoots from underground base
- Develop adventitious roots
- Example: Pineapple, Chrysanthemum

**4. Tubers**
- Swollen underground stems with buds ("eyes")
- Example: Potato

**5. Bulbs**
- Underground buds with fleshy leaves
- Example: Onion, Garlic

**6. Leaves**
- Buds on leaf margins develop into plantlets
- Example: Bryophyllum (leaf notches), Begonia

**Artificial Methods** (Agriculture/Horticulture):

**1. Cutting**
- Stem/root piece planted
- Develops roots and shoots
- Example: Rose, Sugarcane, Grapes

**2. Grafting**
- **Stock**: Rooted plant portion
- **Scion**: Shoot/bud from desired plant
- Joined together, vascular tissues unite
- Example: Mango, Citrus fruits

**3. Layering**
- Branch bent and buried (still attached to parent)
- Develops roots
- Then separated
- Example: Jasmine, Bougainvillea

**4. Tissue Culture (Micropropagation)**
- Small tissue/cell mass cultured in lab
- Develops into plantlets
- Produces thousands of identical plants
- Example: Orchids, Banana, ornamental plants

**Advantages of Vegetative Propagation:**
- **Faster**: No seed germination delay
- **Uniform**: Genetically identical (preserves desirable traits)
- **Seedless plants**: Can propagate (Banana, Grapes)
- **Juvenile period bypassed**: Flowers/fruits earlier

#### F. Spore Formation

**Definition**: Asexual reproductive units called **spores**

**Characteristics:**
- Small, single-celled
- Resistant to harsh conditions (thick wall)
- Dispersed by wind, water
- Germinate in favorable conditions

**Examples:**
- **Fungi**: Bread mold (Rhizopus), Mushrooms
- **Ferns**: Spores on underside of leaves (sporangia)
- **Mosses**

**Note**: Some organisms produce sexual spores (meiospores) during sexual reproduction

### 2. Sexual Reproduction

**Definition**: Production of offspring from **two parents** involving **gamete formation** and **fertilization**

**Characteristics:**
- Involves **meiosis** (gamete formation)
- Involves **fertilization** (gamete fusion)
- **Genetic variation**: Offspring differ from parents
- Two parents (usually)
- Slower than asexual reproduction

**Advantages:**
- **Genetic variation**: Creates diversity
- **Adaptation**: Better survival in changing environment
- **Evolution**: Variations drive natural selection
- **Vigor**: Hybrid vigor (heterosis)

**Disadvantages:**
- **Slow**: Complex process
- **Energy expensive**: Gamete production, courtship, mating
- **Mate required**: Must find compatible partner
- **Uncertainty**: Not all gametes fertilize

### Events in Sexual Reproduction

**Three Main Events:**

#### 1. Pre-fertilization Events

**A. Gametogenesis**: Formation of gametes (sex cells)

**Gametes:**
- **Haploid** (n) - Half the chromosome number
- Formed by **meiosis** (reduction division)
- **Male gametes**: Small, motile (usually) - Sperm, pollen grains
- **Female gametes**: Large, non-motile (usually) - Egg, ovum

**Types of Gametes:**

**Isogametes** (Isogamy):
- Morphologically **similar** gametes
- Cannot distinguish male/female
- Example: Some algae (Ulothrix), fungi

**Anisogametes** (Anisogamy):
- Morphologically **dissimilar** gametes
- Can distinguish male (smaller, motile) and female (larger)
- Example: Advanced algae, most organisms

**Oogamy** (Extreme anisogamy):
- Large, **non-motile female** gamete (egg)
- Small, **motile male** gamete (sperm)
- Most common in higher organisms
- Example: Humans, flowering plants, most animals

**Sexuality:**

**Bisexual (Hermaphrodite/Monoecious)**:
- Both male and female gametes in **same organism**
- Example: Earthworms, tapeworms, many flowering plants

**Unisexual (Dioecious)**:
- Male and female gametes in **separate organisms**
- Example: Humans, birds, Papaya, Date palm

**B. Gamete Transfer**

**Need**: Gametes must come in contact for fertilization

**Methods:**
- **Aquatic organisms**: Release gametes in water (external fertilization)
- **Terrestrial organisms**: 
  - **Plants**: Pollen transfer (pollination - wind, insects, animals)
  - **Animals**: Copulation (mating) - internal fertilization

#### 2. Fertilization

**Definition**: **Fusion of male and female gametes** to form zygote

**Process:**
1. Gametes come in contact
2. Sperm penetrates egg
3. Nuclei fuse (karyogamy)
4. **Diploid (2n) zygote** formed

**Types:**

**External Fertilization**:
- Fusion **outside** the body (in water)
- Large number of gametes released (many fail)
- Example: Most fish, amphibians, aquatic invertebrates

**Internal Fertilization**:
- Fusion **inside** female body
- Fewer gametes needed (higher success)
- Protection to developing embryo
- Example: Reptiles, birds, mammals, terrestrial insects

**Significance:**
- Restores **diploid number** (2n)
- Combines genetic material from both parents
- **Genetic variation**: New gene combinations

#### 3. Post-fertilization Events

**A. Zygote Development**

**Zygote**: Vital link between generations
- **First cell** of new organism
- Diploid (2n)
- Undergoes development

**Development Process:**

**1. Cell Division (Cleavage)**
- Rapid **mitotic divisions**
- **No growth** between divisions
- Cells become smaller (blastomeres)
- Forms **morula** (solid ball), then **blastula** (hollow ball)

**2. Cell Differentiation**
- Cells specialize (become different types)
- Form tissues and organs
- Controlled by genes and signaling

**3. Morphogenesis**
- Development of shape and structure
- Organ formation
- Body plan emerges

**B. Embryo Development**

**Embryo**: Early developmental stage

**Development Patterns:**

**Oviparous** (Egg-laying):
- Embryo develops in **egg outside** mother's body
- Egg has yolk (nutrition)
- Example: Birds, reptiles, most fish, insects, monotremes (Platypus)

**Viviparous** (Live-birth):
- Embryo develops **inside** mother's body
- Nutrition from mother (placenta in mammals)
- Young born alive
- Example: Most mammals, some reptiles (snakes), fish

**Ovoviviparous** (Intermediate):
- Eggs retained inside mother
- Embryo develops inside egg (uses yolk)
- Hatches inside mother → Live birth
- Example: Some sharks, snakes

## Life Span

**Life Span**: Period from birth to natural death

**Variation**: Ranges from a few days to thousands of years
- **Short**: Bacteria (minutes), insects (days to weeks)
- **Medium**: Humans (~70-80 years), dogs (~15 years)
- **Long**: Elephants (~80 years), Tortoises (>100 years), Trees (>1000 years)

**Phases:**
1. **Juvenile (Growth) phase**: From birth to reproductive maturity
2. **Reproductive phase**: Capable of reproduction
3. **Senescent phase**: Old age, decline in function

**Annual vs Perennial:**
- **Annual plants**: Complete life cycle in one season (Wheat, Rice)
- **Perennial plants**: Live for many years (Trees, shrubs)

## Reproduction vs Growth

**Common Feature**: Both involve cell division (mitosis)

**Differences:**

| Feature | Growth | Reproduction |
|---------|--------|--------------|
| **Purpose** | Increase size/mass | Produce offspring |
| **Cell division** | Mitosis | Meiosis + Mitosis |
| **Result** | Larger organism | New organisms |
| **Occurrence** | Within organism | Creates separate organisms |
| **Reversibility** | Can slow/stop | Continues cyclically |

**Note**: In unicellular organisms, reproduction = growth (cell division creates new individuals)
`,

    keyConcepts: [
      'Reproduction: Biological process producing new individuals, ensuring species continuity',
      'Asexual reproduction: Single parent, no gametes, genetically identical offspring (clones)',
      'Binary fission: Parent divides into two (Bacteria, Amoeba, Paramecium)',
      'Budding: Outgrowth forms new organism (Yeast, Hydra)',
      'Fragmentation: Body breaks, each fragment regenerates (Spirogyra, Planaria)',
      'Vegetative propagation: New plants from vegetative parts (runners, rhizomes, tubers, bulbs, leaves)',
      'Grafting: Stock + Scion joined (fruits); Cutting: Stem/root planted (Rose, Sugarcane)',
      'Sexual reproduction: Two parents, gametes (meiosis), fertilization, genetic variation',
      'Gametogenesis: Gamete formation by meiosis (haploid n)',
      'Isogamy: Similar gametes; Anisogamy: Dissimilar; Oogamy: Large egg + small sperm',
      'Fertilization: Gamete fusion → Diploid zygote (2n), restores chromosome number',
      'External fertilization: In water (fish); Internal: Inside body (mammals, birds)',
      'Zygote development: Cleavage → Cell differentiation → Morphogenesis',
      'Oviparous: Egg-laying (birds, reptiles); Viviparous: Live birth (mammals)',
      'Life span: Birth to natural death; varies from minutes to thousands of years'
    ],

    formulas: [
      'Fertilization: Male gamete (n) + Female gamete (n) → Zygote (2n)',
      'Asexual reproduction: 1 parent → Genetically identical offspring',
      'Sexual reproduction: 2 parents → Genetically varied offspring'
    ],

    learningObjectives: [
      'Define reproduction and explain its biological significance',
      'Distinguish between asexual and sexual reproduction',
      'Describe types of asexual reproduction (binary fission, budding, fragmentation, spore formation)',
      'Explain vegetative propagation in plants (natural and artificial methods)',
      'Understand sexual reproduction and its advantages',
      'Describe pre-fertilization events (gametogenesis, gamete transfer)',
      'Explain types of gametes (isogametes, anisogametes, oogamy)',
      'Understand fertilization (external vs internal)',
      'Describe post-fertilization events (zygote and embryo development)',
      'Distinguish between oviparous and viviparous organisms',
      'Understand life span and its phases'
    ],

    prerequisites: [
      'Basic understanding of cells and cell division',
      'Knowledge of mitosis and meiosis',
      'Understanding of chromosome number (haploid vs diploid)'
    ],

    importantTopics: [
      'Types of asexual reproduction: Binary fission, budding, fragmentation, spore formation',
      'Vegetative propagation: Runners, rhizomes, tubers, bulbs, cuttings, grafting, layering',
      'Sexual reproduction advantages: Genetic variation, adaptation',
      'Gametogenesis: Meiosis produces haploid gametes',
      'Types of gametes: Isogamy, anisogamy, oogamy',
      'Fertilization: External (aquatic) vs Internal (terrestrial)',
      'Post-fertilization: Cleavage, differentiation, morphogenesis',
      'Oviparous vs Viviparous development',
      'Life span variations across organisms'
    ],

    ncertChapterRef: 'Class 12 Biology, Chapter 1',
    estimatedStudyMinutes: 300,
    difficultyLevel: 3,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Binary Fission in Amoeba',
        description: 'Step-by-step division process showing nuclear and cytoplasmic division'
      },
      {
        type: 'diagram',
        title: 'Budding in Yeast',
        description: 'Parent cell with bud formation and detachment'
      },
      {
        type: 'comparison',
        title: 'Asexual vs Sexual Reproduction',
        description: 'Comparison of characteristics, advantages, and examples'
      },
      {
        type: 'diagram',
        title: 'Types of Gametes',
        description: 'Isogamy, anisogamy, and oogamy illustrations'
      },
      {
        type: 'flowchart',
        title: 'Events in Sexual Reproduction',
        description: 'Pre-fertilization → Fertilization → Post-fertilization'
      },
      {
        type: 'diagram',
        title: 'Vegetative Propagation Methods',
        description: 'Runners, rhizomes, tubers, bulbs, cuttings, grafting'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Reproduction in Organisms',
      estimatedStudyMinutes: 300,
      difficultyLevel: 3,
      status: 'published'
    }
  });

  console.log('✅ Biology Class 12 Chapter 1: Reproduction in Organisms seeded successfully!');
}

seedBiologyClass12Chapter1()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
