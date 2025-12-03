import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter3() {
  console.log('🧬 Seeding Biology Class 11 Chapter 3: Plant Kingdom...');

  const chapter = {
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 3,
    chapterTitle: 'Plant Kingdom',
    introduction: `The plant kingdom represents one of the most diverse and essential groups of organisms on Earth, ranging from simple algae to complex flowering plants. This chapter traces the evolutionary journey of plants from aquatic to terrestrial habitats, exploring the major plant groups: algae, bryophytes, pteridophytes, gymnosperms, and angiosperms. Each group shows progressive adaptations including development of vascular tissue, seeds, flowers, and fruits. Understanding plant classification helps us appreciate the biodiversity around us and recognize the ecological and economic importance of different plant groups in our daily lives.`,

    detailedNotes: `## Classification of Plant Kingdom

Plants classified into five major groups based on:
- Body organization
- Vascular tissue presence
- Seed formation ability
- Reproductive structures

**The Five Groups:**
1. **Algae** - Thallophyta (no differentiation)
2. **Bryophytes** - Amphibians of plant kingdom
3. **Pteridophytes** - First vascular plants
4. **Gymnosperms** - Naked seed plants
5. **Angiosperms** - Flowering plants

## Algae

**Characteristics:**
- **Habitat:** Mostly aquatic (marine, freshwater)
- **Body:** Thallus (no root, stem, leaf differentiation)
- **Pigments:** Chlorophyll a, b, c, d; carotenoids, phycobilins
- **Cell wall:** Cellulose
- **Food storage:** Starch
- **Reproduction:** Asexual and sexual

**Range:** Microscopic (*Chlorella*) to giant kelps (100 m)

### Classification of Algae

**Based on pigments, stored food, and cell wall composition:**

**1. Chlorophyceae (Green Algae)**

**Pigments:** Chlorophyll a, b (grass green color)
**Stored food:** Starch
**Cell wall:** Cellulose
**Habitat:** Fresh water, some marine, moist terrestrial

**Forms:**
- Unicellular: *Chlamydomonas*, *Chlorella*
- Colonial: *Volvox*
- Filamentous: *Spirogyra*, *Ulothrix*

**Reproduction:**
- Asexual: Zoospores (flagellated)
- Sexual: Isogamous, Anisogamous, Oogamous

**2. Phaeophyceae (Brown Algae)**

**Pigments:** Chlorophyll a, c; fucoxanthin (brown color)
**Stored food:** Laminarin, mannitol (carbohydrates)
**Cell wall:** Cellulose + algin
**Habitat:** Marine (mostly)

**Features:**
- Mostly multicellular
- Plant body: Holdfast, stipe, frond
- Large size (kelps)

**Examples:** *Ectocarpus*, *Dictyota*, *Laminaria* (kelp), *Sargassum*, *Fucus*

**Economic importance:**
- Alginate (thickening agent)
- Source of iodine

**3. Rhodophyceae (Red Algae)**

**Pigments:** Chlorophyll a, d; r-phycoerythrin (red color)
**Stored food:** Floridean starch
**Cell wall:** Cellulose, pectin, polysulfate esters
**Habitat:** Marine (warm waters)

**Features:**
- Mostly multicellular
- No flagellated stages
- Sexual reproduction: Oogamous

**Examples:** *Polysiphonia*, *Porphyra*, *Gracilaria*, *Gelidium*

**Economic importance:**
- Agar-agar (from *Gelidium*, *Gracilaria*)
- Food (nori from *Porphyra*)
- Carrageenan

### Reproduction in Algae

**Vegetative:**
- Fragmentation (*Spirogyra*)

**Asexual:**
- Zoospores (flagellated)
- Aplanospores (non-flagellated)

**Sexual:**

**1. Isogamy:** Fusion of morphologically similar gametes
- Example: *Ulothrix*, *Spirogyra*

**2. Anisogamy:** Fusion of dissimilar-sized gametes (both motile)
- Example: Some species of *Chlamydomonas*

**3. Oogamy:** Fusion of large non-motile egg with small motile sperm
- Example: *Volvox*, *Fucus*

### Economic Importance of Algae

**Food:**
- *Porphyra*, *Laminaria*, *Sargassum* (eaten in Asia)
- *Chlorella*, *Spirulina* (protein-rich)

**Industrial:**
- Agar (culture medium) - *Gelidium*
- Alginates (ice cream, cosmetics) - brown algae
- Carrageenan (food industry)

**Other uses:**
- Fertilizers
- Sewage treatment
- Oxygen production
- Animal feed

## Bryophytes (Amphibians of Plant Kingdom)

**Characteristics:**
- **Habitat:** Moist, shady places (need water for reproduction)
- **Body:** Simple, thalloid or leafy
- **Vascular tissue:** Absent
- **Roots:** Absent (rhizoids for anchorage)
- **Dominant phase:** Gametophyte (haploid)
- **Reproduction:** Requires water for fertilization

**Called "amphibians":** Need water for sexual reproduction but live on land

**Range:** Small (few mm to few cm)

### Classification of Bryophytes

**1. Hepaticopsida (Liverworts)**

**Characteristics:**
- Plant body: Thalloid (liver-shaped)
- Dorsiventral, prostrate
- No midrib
- Asexual: Gemmae (in gemma cups)

**Examples:**
- *Marchantia* (liverwort)
- *Riccia* (aquatic liverwort)

**2. Anthocerotopsida (Hornworts)**

**Characteristics:**
- Thalloid gametophyte
- Sporophyte: Horn-like structure
- Contains chloroplasts (photosynthetic)

**Example:** *Anthoceros*

**3. Bryopsida (Mosses)**

**Characteristics:**
- Plant body: Leafy (leaf-like, stem-like structures)
- Radially symmetrical
- Leaves with midrib
- Form dense cushions

**Examples:**
- *Funaria* (common moss)
- *Sphagnum* (peat moss)
- *Polytrichum*

### Life Cycle of Bryophytes

**Alternation of Generations:**

**Gametophyte (Dominant, n):**
- Green, independent, photosynthetic
- Haploid
- Bears sex organs
- **Antheridia** (male) produce sperms
- **Archegonia** (female) produce eggs

↓ (Fertilization, requires water)

**Zygote (2n)**

↓

**Sporophyte (Dependent, 2n):**
- Attached to gametophyte
- Parasitic on gametophyte
- Not photosynthetic (except hornworts)
- Parts: Foot, seta, capsule
- **Capsule** produces spores by meiosis

↓ (Meiosis)

**Spores (n)**

↓ (Germination)

**Protonema (Juvenile gametophyte)**

↓

**Gametophyte (n)**

### Economic Importance of Bryophytes

- *Sphagnum* (peat moss): Fuel, packing material
- Soil erosion prevention
- Ecological indicators
- Pioneer plants (colonize bare rocks)

## Pteridophytes (First Vascular Plants)

**Characteristics:**
- **Habitat:** Moist, shady places
- **Vascular tissue:** Present (xylem, phloem)
- **Body:** Differentiated into root, stem, leaves
- **Dominant phase:** Sporophyte (diploid)
- **Leaves:**
  - **Microphylls:** Small leaves (*Selaginella*)
  - **Macrophylls:** Large leaves (ferns)
- **Reproduction:** Spores, requires water for fertilization

**"First land plants":** First to have true vascular tissue

### Classification of Pteridophytes

**1. Psilopsida**
- Most primitive
- No true roots, leaves
- Example: *Psilotum*

**2. Lycopsida (Club Mosses)**
- **Leaves:** Microphylls
- **Sporangia:** In strobili (cones)
- Examples: *Lycopodium*, *Selaginella*

**3. Sphenopsida (Horsetails)**
- **Stem:** Jointed, ridged
- **Leaves:** Scale-like, whorled
- Example: *Equisetum*

**4. Pteropsida (Ferns)**
- **Leaves:** Macrophylls (large, compound)
- **Young leaves:** Circinate vernation (coiled)
- **Sporangia:** On undersurface of leaves (sori)
- Examples: *Dryopteris*, *Pteris*, *Adiantum* (maidenhair fern)

### Life Cycle of Pteridophytes

**Sporophyte (Dominant, 2n):**
- Independent, photosynthetic
- Differentiated: Root, stem, leaves
- Bears sporangia
- Produces spores by meiosis

**Types:**
- **Homosporous:** One type of spore (e.g., ferns)
- **Heterosporous:** Two types (microspores, megaspores) - *Selaginella*, *Salvinia*

↓ (Meiosis)

**Spores (n)**

↓ (Germination)

**Gametophyte/Prothallus (n):**
- Small, independent, photosynthetic
- Heart-shaped (in ferns)
- Bears antheridia and archegonia

↓ (Fertilization, requires water)

**Zygote (2n)**

↓

**Sporophyte (2n)**

### Economic Importance

- Ornamental: *Pteris*, *Adiantum*
- Food: *Marsilea* (water fern)
- Soil binders
- Medicinal

## Gymnosperms (Naked Seed Plants)

**Characteristics:**
- **Seeds:** Naked (not enclosed in fruit)
- **Vascular tissue:** Well-developed (xylem, phloem)
- **Body:** Differentiated (root, stem, leaves)
- **Leaves:** Needle-like (reduce water loss)
- **Dominant phase:** Sporophyte
- **Reproduction:** No water needed for fertilization
- **Pollination:** Wind

**"Naked seeds":** Seeds exposed on cone scales

**Habitat:** Temperate regions, high altitudes

### Important Features

**1. Heterosporous:**
- Microspores (male) → Pollen grains
- Megaspores (female) → Ovules

**2. Seed Formation:**
- First seed-bearing plants
- Seeds not in fruits

**3. Wood:**
- Softwood (coniferous trees)
- Economic importance

**4. No Flowers:**
- Reproductive structures: Cones (strobili)

### Classification

**Major Groups:**

**1. Cycadales (Cycads)**
- Palm-like appearance
- Dioecious (male and female plants separate)
- Example: *Cycas* (sago palm)

**2. Coniferales (Conifers)**
- Cone-bearing
- Needle-like leaves
- Examples:
  - *Pinus* (pine)
  - *Cedrus* (cedar, deodar)
  - *Abies* (fir)
  - *Picea* (spruce)

**3. Gnetales**
- Example: *Gnetum*, *Ephedra*

**4. Ginkgoales**
- "Living fossil"
- Only species: *Ginkgo biloba*

### Life Cycle (e.g., Pinus)

**Sporophyte (Dominant, 2n):**
- Large tree
- Bears cones

**Male Cone (Microsporangiate):**
- Produces microspores
- Microspores → Pollen grains

**Female Cone (Megasporangiate):**
- Produces megaspores
- Megaspore → Female gametophyte inside ovule

↓ (Pollination by wind)

**Pollen tube** grows to ovule

↓ (Fertilization)

**Zygote (2n)**

↓

**Embryo** develops inside seed

↓

**Seed** (contains embryo + stored food)

↓ (Germination)

**Sporophyte (2n)**

### Economic Importance

- **Timber:** Pine, cedar, spruce
- **Paper industry:** Softwood pulp
- **Resin, turpentine:** From conifers
- **Ornamental:** Cycas, cedar
- **Food:** *Cycas* seeds (after detoxification)
- **Medicinal:** Ephedrine from *Ephedra*

## Angiosperms (Flowering Plants)

**Characteristics:**
- **Seeds:** Enclosed in fruits
- **Flowers:** Present (reproductive structure)
- **Vascular tissue:** Well-developed
- **Dominant phase:** Sporophyte
- **Diversity:** Largest group (~250,000 species)
- **Habitat:** All types (aquatic, terrestrial, desert)
- **Double fertilization:** Unique feature

**Most successful plant group:** Occupy diverse habitats

### Classification

**Two Classes:**

**1. Dicotyledons (Dicots)**

**Characteristics:**
- **Embryo:** Two cotyledons
- **Venation:** Reticulate (net-like)
- **Root system:** Taproot
- **Flower parts:** Multiples of 4 or 5
- **Vascular bundles:** Arranged in ring
- **Secondary growth:** Present

**Examples:** Pea, mango, rose, sunflower

**Families:** Brassicaceae, Fabaceae, Solanaceae

**2. Monocotyledons (Monocots)**

**Characteristics:**
- **Embryo:** One cotyledon
- **Venation:** Parallel
- **Root system:** Fibrous
- **Flower parts:** Multiples of 3
- **Vascular bundles:** Scattered
- **Secondary growth:** Usually absent

**Examples:** Wheat, rice, maize, palm, lily

**Families:** Poaceae (Gramineae), Liliaceae

### Flower Structure

**Parts of Flower:**

**1. Calyx:**
- Sepals (outermost)
- Usually green
- Protective function

**2. Corolla:**
- Petals (colorful)
- Attract pollinators

**3. Androecium (Male):**
- Stamens
- Parts: Filament + Anther
- Produces pollen (microspores)

**4. Gynoecium (Female):**
- Carpels/Pistil
- Parts: Stigma, style, ovary
- Ovary contains ovules (megaspores)

### Life Cycle (Double Fertilization)

**Sporophyte (2n):**
- Produces flower

**Anther:**
- Produces pollen grains (male gametophyte, n)

**Ovule:**
- Produces embryo sac (female gametophyte, n)
- Contains egg cell

↓ (Pollination)

**Pollen tube** grows through style

**Pollen grain releases two male gametes:**

**First Fertilization:**
- Male gamete + Egg → Zygote (2n) → Embryo

**Second Fertilization (Triple fusion):**
- Male gamete + Secondary nucleus (2n) → Endosperm (3n)

This is **Double Fertilization** (unique to angiosperms)

↓

**Seed Formation:**
- Ovule → Seed
- Contains: Embryo (2n) + Endosperm (3n) + Seed coat

**Fruit Formation:**
- Ovary → Fruit

### Economic Importance

**Food:**
- Cereals: Rice, wheat, maize
- Pulses: Pea, gram, lentil
- Fruits: Mango, apple, banana
- Vegetables: Potato, tomato, onion
- Oils: Groundnut, mustard, sunflower
- Spices: Pepper, turmeric, cardamom

**Other:**
- Fibers: Cotton, jute
- Timber: Teak, oak
- Medicines: Quinine, morphine
- Beverages: Tea, coffee
- Ornamental: Rose, lotus

## Summary Comparison

| Feature | Algae | Bryophytes | Pteridophytes | Gymnosperms | Angiosperms |
|---------|-------|------------|---------------|-------------|-------------|
| Habitat | Aquatic | Moist land | Moist land | Land | All |
| Vascular tissue | Absent | Absent | Present | Present | Present |
| Dominant phase | Gametophyte | Gametophyte | Sporophyte | Sporophyte | Sporophyte |
| Seeds | Absent | Absent | Absent | Naked | Enclosed |
| Flowers | Absent | Absent | Absent | Absent | Present |
| Water for fertilization | Yes | Yes | Yes | No | No |`,

    keyConcepts: [
      'Plant kingdom: Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms',
      'Algae classification: Chlorophyceae (green), Phaeophyceae (brown), Rhodophyceae (red)',
      'Bryophytes: amphibians of plant kingdom, gametophyte dominant',
      'Pteridophytes: first vascular plants, sporophyte dominant',
      'Gymnosperms: naked seeds, cone-bearing, no water needed for fertilization',
      'Angiosperms: flowering plants, seeds in fruits, double fertilization',
      'Alternation of generations: gametophyte and sporophyte phases',
      'Heterosporous: producing two types of spores (micro and mega)',
      'Double fertilization: unique to angiosperms, forms embryo and endosperm',
      'Dicots vs Monocots: cotyledons, venation, root system differences'
    ],

    formulas: [
      'Isogamy: Gamete₁ (similar) + Gamete₂ (similar) → Zygote',
      'Anisogamy: Small gamete + Large gamete (both motile) → Zygote',
      'Oogamy: Sperm (motile) + Egg (non-motile) → Zygote',
      'Double Fertilization: Male gamete + Egg → Embryo (2n); Male gamete + Secondary nucleus → Endosperm (3n)',
      'Alternation of Generations: Gametophyte (n) ↔ Sporophyte (2n)'
    ],

    learningObjectives: [
      'Classify plant kingdom into major groups',
      'Describe characteristics of algae and their classification',
      'Explain why bryophytes are called amphibians of plant kingdom',
      'Understand alternation of generations in bryophytes',
      'Identify key features of pteridophytes as first vascular plants',
      'Describe gymnosperms and their adaptations',
      'Explain double fertilization in angiosperms',
      'Compare dicots and monocots',
      'Understand economic importance of different plant groups',
      'Trace evolutionary progression from algae to angiosperms'
    ],

    prerequisites: [
      'Basic plant structure knowledge',
      'Understanding of cell types (prokaryotic/eukaryotic)',
      'Knowledge of reproduction types',
      'Familiarity with biological classification (Chapter 2)'
    ],

    importantTopics: [
      'Algae classification: Chlorophyceae (green, starch), Phaeophyceae (brown, laminarin), Rhodophyceae (red, no flagella)',
      'Sexual reproduction in algae: Isogamy, Anisogamy, Oogamy',
      'Bryophytes: amphibians of plant kingdom, need water for fertilization',
      'Bryophyte life cycle: gametophyte (dominant, n) → sporophyte (dependent, 2n)',
      'Pteridophytes: first vascular plants, sporophyte dominant',
      'Heterosporous: Selaginella (microspores and megaspores)',
      'Gymnosperms: naked seeds, cones, wind pollination, no flowers',
      'Pinus: male cones (microsporangiate), female cones (megasporangiate)',
      'Angiosperms: flowering plants, double fertilization',
      'Double fertilization: embryo (2n) + endosperm (3n)',
      'Dicots vs Monocots: 2 vs 1 cotyledon, reticulate vs parallel venation, taproot vs fibrous',
      'Economic importance: food, timber, medicines, ornamentals'
    ],

    ncertChapterRef: 'Chapter 3, Pages 35-55',

    difficultyLevel: 4,
    estimatedStudyMinutes: 270,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Plant Kingdom Evolution',
        description: 'Evolutionary timeline from algae to angiosperms showing progressive adaptations'
      },
      {
        type: 'concept',
        title: 'Alternation of Generations',
        description: 'Interactive diagram showing gametophyte and sporophyte phases in bryophytes and pteridophytes'
      },
      {
        type: 'concept',
        title: 'Double Fertilization',
        description: 'Step-by-step animation of double fertilization in angiosperms forming embryo and endosperm'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Biology Chapter 3: Plant Kingdom seeded successfully');
}

seedBiologyChapter3()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
