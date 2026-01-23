import { db } from "../db";
import { chapterContent } from "../../shared/schema";
import { sql } from 'drizzle-orm';

async function seedBiologyChapter5() {
  console.log("Seeding Biology Class 11 Chapter 5: Morphology of Flowering Plants...");

  await db
    .insert(chapterContent)
    .values({
      subject: "Biology",
      classLevel: "11",
      chapterNumber: 5,
      chapterTitle: "Morphology of Flowering Plants",
      introduction:
        "Plant morphology is the study of the external structure and form of plants. Flowering plants (angiosperms) represent the most advanced and diverse group in the plant kingdom, exhibiting remarkable variety in their vegetative and reproductive structures. Understanding plant morphology is essential for plant identification, classification, agricultural practices, and appreciating the adaptations that allow plants to thrive in diverse environments. From the underground root system that anchors the plant and absorbs water, to the above-ground shoot system with stems, leaves, and flowers, each organ has a specific structure suited to its function. This chapter explores the fascinating diversity of plant forms and the modifications that enable plants to survive in various ecological niches.",

      detailedNotes: `
# Morphology of Flowering Plants

## The Root System

The root is the descending, non-green, cylindrical part of the plant axis that typically grows downward into the soil. Roots anchor the plant, absorb water and minerals, store food, and sometimes perform specialized functions.

### Regions of Root

1. **Root cap**: Protects the delicate root tip as it pushes through soil
2. **Region of meristematic activity**: Zone of active cell division
3. **Region of elongation**: Cells increase in length, pushing root deeper
4. **Region of maturation**: Cells differentiate into specialized tissues; root hairs develop here

### Types of Root Systems

**1. Tap Root System**
- Develops from radicle (embryonic root)
- Primary root persists and grows
- Secondary and tertiary roots arise from primary root
- **Found in**: Dicotyledons (mustard, gram, mango, neem)
- **Advantage**: Deep penetration for stability and water access

**2. Fibrous Root System**
- Primary root short-lived
- Replaced by numerous thin, fiber-like roots from stem base
- **Found in**: Monocotyledons (wheat, rice, maize, bamboo)
- **Advantage**: Extensive surface area for absorption, prevents soil erosion

**3. Adventitious Roots**
- Arise from parts other than radicle (stems, leaves)
- Can be fibrous or fleshy
- Examples: Prop roots (banyan), stilt roots (maize), climbing roots (betel)

### Modifications of Roots

**A. For Storage:**
1. **Fusiform roots**: Spindle-shaped (radish)
2. **Napiform roots**: Top swollen, tail-like base (turnip)
3. **Conical roots**: Cone-shaped (carrot)
4. **Tuberous roots**: No specific shape (sweet potato)

**B. For Support:**
1. **Prop/pillar roots**: Grow down from branches for support (banyan)
2. **Stilt roots**: Arise from lower nodes for support (maize, sugarcane)

**C. For Respiration:**
1. **Pneumatophores**: Negatively geotropic roots with breathing pores (mangroves like Rhizophora)

**D. For Absorption:**
1. **Epiphytic/aerial roots**: Absorb moisture from air (orchids)

**E. For Climbing:**
1. **Climbing roots**: Help plants climb (betel, black pepper)

**F. Special Functions:**
1. **Nodulated roots**: House nitrogen-fixing bacteria (legumes)
2. **Parasitic roots/haustoria**: Absorb nutrients from host (Cuscuta, Viscum)
3. **Mycorrhizal roots**: Symbiotic association with fungi

## The Stem

The stem is the ascending axis of the plant that develops from the plumule, bears leaves, flowers, and fruits, and conducts water and nutrients.

### Functions of Stem
- Support and elevate leaves, flowers, and fruits
- Conduct water and minerals (xylem) and food (phloem)
- Store food materials
- Produce new living tissues
- Bear vegetative and reproductive structures

### Characteristics
- **Nodes**: Points where leaves arise
- **Internodes**: Portions between two nodes
- **Buds**: Present in leaf axils (axillary buds) and at tip (terminal bud)
- **Positive phototropism**: Grows towards light
- **Negative geotropism**: Grows away from gravity

### Types of Stems

**Based on Habitat:**

**1. Aerial Stems**
- **Erect stems**: Upright, strong (mango, neem)
- **Weak stems** (need support):
  - *Climbers*: Coil around support (pea, grapevine, money plant)
  - *Trailers/Creepers*: Grow along ground (pumpkin, watermelon)
  - *Lianas*: Woody climbers (Bougainvillea)

**2. Underground Stems**
- Store food, perennation, vegetative propagation
- Types:
  - **Rhizome**: Thick horizontal stem (ginger, turmeric, banana)
  - **Corm**: Condensed, vertical, rounded (Colocasia, Crocus)
  - **Tuber**: Swollen stem tips (potato - eyes are buds)
  - **Bulb**: Reduced disc-shaped stem with fleshy scale leaves (onion, garlic)

**3. Sub-aerial Stems**
- Partly aerial, partly underground
- Types:
  - **Runner**: Creeps on ground, roots at nodes (grass, Oxalis)
  - **Stolon**: Lateral branch arches above ground (mint, jasmine)
  - **Sucker**: Underground, grows obliquely, emerges as shoot (chrysanthemum)
  - **Offset**: Short horizontal branch in aquatic plants (Eichhornia - water hyacinth)

### Modifications of Stem

**A. For Storage:**
- Underground stems (rhizome, corm, tuber, bulb)

**B. For Support:**
1. **Stem tendrils**: Coil around support (grapevine, gourd family)
2. **Thorns**: Protect from browsing animals, reduce transpiration (Bougainvillea, citrus)

**C. For Photosynthesis:**
1. **Phylloclade**: Flattened stem for photosynthesis in xerophytes (Opuntia - prickly pear)
2. **Cladode**: Single internode phylloclade (Asparagus)

**D. For Vegetative Propagation:**
- Underground and sub-aerial stems

## The Leaf

The leaf is a lateral, generally flattened appendage of the stem, developed from a node and having a bud in its axil. Leaves are the primary photosynthetic organs.

### Parts of a Typical Leaf

1. **Leaf base**: Attaches leaf to stem, may bear stipules (small leaf-like structures)
2. **Petiole**: Leaf stalk connecting blade to base
3. **Lamina/blade**: Flattened green part, main photosynthetic region

### Types Based on Petiole

1. **Petiolate**: Leaf with petiole (mango, neem)
2. **Sessile**: Leaf without petiole, directly attached (mustard)
3. **Sheathing leaf base**: Base expands to partly or wholly enclose stem (grasses, banana)

### Venation

**Pattern of vein distribution** in lamina:

1. **Reticulate venation**: Network of veins
   - **Unicostate**: Single midrib with lateral branches (dicot leaves - mango, neem)
   - **Multicostate**: Many main veins (banana, Canna)
   - Characteristic of **dicotyledons**

2. **Parallel venation**: Veins run parallel to each other
   - **Unicostate**: Parallel to midrib (grasses, sugarcane)
   - **Multicostate**: Many parallel veins from base (palm, bamboo)
   - Characteristic of **monocotyledons**

### Types of Leaves

**Simple Leaf**: Single undivided lamina
- Margin may be entire, serrated, or lobed
- Examples: Mango, guava, hibiscus

**Compound Leaf**: Lamina divided into distinct leaflets
- Leaflets attached to common axis (rachis)

**Types of Compound Leaves:**

**A. Pinnately Compound** (feather-like arrangement):
1. **Unipinnate**: Leaflets on both sides of rachis (neem, rose)
2. **Bipinnate**: Rachis branches, leaflets on secondary axes (Mimosa, Acacia)
3. **Tripinnate**: Further division (Moringa)

**B. Palmately Compound** (palm-like from single point):
- All leaflets arise from tip of petiole (silk cotton, Cannabis)

### Phyllotaxy

**Arrangement of leaves on stem:**

1. **Alternate/Spiral**: One leaf per node, alternate sides (china rose, mustard, sunflower)
2. **Opposite**: Two leaves per node, opposite sides (Calotropis, guava)
   - **Superposed**: Successive pairs in same plane
   - **Decussate**: Successive pairs at right angles
3. **Whorled**: More than two leaves per node in whorl (Alstonia, Nerium)

### Modifications of Leaves

**A. For Storage:**
1. **Fleshy leaves**: Store water (Aloe, Agave - xerophytes)
2. **Scale leaves**: Food storage (onion bulb)

**B. For Support:**
1. **Leaf tendrils**: Modified leaflets for climbing (pea, wild pea)

**C. For Protection:**
1. **Spines**: Modified leaves, reduce transpiration (Opuntia, Aloe)
2. **Phyllode**: Flattened petiole for photosynthesis (Acacia)

**D. For Nutrition:**
1. **Insectivorous leaves**: Trap and digest insects (pitcher plant, Venus flytrap, sundew)
   - Supplement nitrogen in nitrogen-poor soils

**E. Special Functions:**
1. **Cotyledons**: Seed leaves, food storage in dicots
2. **Bud scales**: Protect buds

## The Inflorescence

An inflorescence is a cluster of flowers arranged on a floral axis. When a shoot tip transforms into a flower, it is termed a flower. Depending on whether the apex gets converted into a flower or continues to grow, two major types are recognized:

### Types of Inflorescence

**A. Racemose Inflorescence**
- Main axis continues to grow, flowers borne laterally
- Flowers open in acropetal succession (bottom to top)

**Types:**
1. **Raceme**: Stalked flowers on elongated axis (mustard, radish)
2. **Spike**: Sessile flowers on elongated axis (Achyranthes)
3. **Spadix**: Fleshy spike with spathe (Colocasia, banana)
4. **Catkin**: Pendulous spike, unisexual flowers (mulberry)
5. **Corymb**: Lower flowers with longer pedicels, all at same level (Iberis)
6. **Umbel**: Flowers arise from one point like umbrella (coriander, Centella)
7. **Capitulum/Head**: Sessile flowers on flattened receptacle (sunflower, marigold)

**B. Cymose Inflorescence**
- Main axis terminates in a flower, limited growth
- Flowers open in basipetal succession (top to bottom)

**Types:**
1. **Monochasial cyme**: One lateral branch per node (Saraca)
2. **Dichasial cyme**: Two lateral branches per node (jasmine, Bougainvillea)
3. **Polychasial cyme**: More than two lateral branches (Nerium)

**C. Special Types**
1. **Cyathium**: Cup-shaped involucre with single female and male flowers (Euphorbia)
2. **Verticillaster**: Condensed dichasial cyme in whorls (Ocimum, Coleus)

## The Flower

The flower is a modified shoot specialized for sexual reproduction. It is the reproductive unit of angiosperms.

### Parts of a Flower

A typical flower has four whorls on the thalamus (receptacle):

**1. Calyx** (Outermost whorl)
- Individual unit: **Sepal**
- Usually green, leaf-like
- Protects flower in bud stage
- **Gamosepalous**: Fused sepals (Datura, china rose)
- **Polysepalous**: Free sepals (rose, mustard)

**2. Corolla** (Second whorl)
- Individual unit: **Petal**
- Brightly colored to attract pollinators
- **Gamopetalous**: Fused petals (Datura, tobacco)
- **Polypetalous**: Free petals (rose, mustard)
- **Perianth**: Calyx and corolla not distinct (lily, tulip)

**3. Androecium** (Male reproductive whorl)
- Individual unit: **Stamen**
- Components:
  - **Filament**: Slender stalk
  - **Anther**: Bilobed structure producing pollen grains
- **Dithecous anther**: Two lobes with two pollen sacs each (total 4 microsporangia)

**Stamen types:**
- **Epipetalous**: Attached to petals (brinjal, Datura)
- **Epiphyllous**: Attached to perianth (lily)

**4. Gynoecium** (Female reproductive whorl)
- Individual unit: **Carpel/Pistil**
- Components:
  - **Stigma**: Receives pollen
  - **Style**: Connects stigma to ovary
  - **Ovary**: Contains ovules (future seeds)

**Carpel arrangement:**
- **Apocarpous**: Free carpels (rose, lotus)
- **Syncarpous**: Fused carpels (mustard, tomato)

**Placentation**: Arrangement of ovules within ovary
1. **Marginal**: Ovules on margin (pea)
2. **Axile**: Ovules in center at junction of septa (china rose, tomato, lemon)
3. **Parietal**: Ovules on inner wall (mustard, cucumber)
4. **Basal**: Ovules at base (sunflower, marigold)
5. **Free central**: Ovules on central axis, no septa (Dianthus, Primrose)

### Flower Types

**Based on Symmetry:**
1. **Actinomorphic**: Radial symmetry, can be divided into equal halves in any plane (mustard, Datura, chili)
2. **Zygomorphic**: Bilateral symmetry, divisible into equal halves in one plane (pea, gulmohar, Cassia)
3. **Asymmetric**: Cannot be divided into equal halves (Canna)

**Based on Sex:**
1. **Bisexual/Hermaphrodite**: Both stamens and carpels (mustard, rose, Datura)
2. **Unisexual**: Only one sex organ present
   - **Staminate**: Only stamens (male flower)
   - **Pistillate**: Only carpels (female flower)

**Plant types based on flower sex:**
- **Monoecious**: Male and female flowers on same plant (maize, coconut, castor)
- **Dioecious**: Male and female flowers on different plants (papaya, date palm)

**Based on Bracts:**
1. **Bracteate**: Bracts present (china rose, Abutilon)
2. **Ebracteate**: Bracts absent (mustard, shoe flower)

**Based on Position of Ovary:**
1. **Hypogynous**: Ovary superior (above other whorls) - mustard, china rose
2. **Perigynous**: Ovary half inferior (at same level) - plum, rose, peach
3. **Epigynous**: Ovary inferior (below other whorls) - guava, cucumber, sunflower

## The Fruit

The fruit develops from the ovary after fertilization. It protects seeds and aids in their dispersal.

### Types of Fruits

**A. True Fruits**: Develop from ovary (mango, coconut)
**B. False Fruits**: Develop from thalamus or other parts (apple, cashew, strawberry)

**Based on Seed Number:**
- **Simple fruits**: From single ovary (mango, tomato)
- **Aggregate fruits**: From multiple free carpels (strawberry, lotus)
- **Composite/Multiple fruits**: From entire inflorescence (jackfruit, pineapple, mulberry)

## The Seed

Seeds develop from ovules after fertilization. They contain embryo, food reserve, and seed coat.

### Seed Structure

1. **Seed coat**: Protective outer covering
   - **Testa**: Outer layer
   - **Tegmen**: Inner layer
   - **Hilum**: Scar where seed attached to fruit
   - **Micropyle**: Small pore for water entry

2. **Embryo**: Future plant
   - **Cotyledons**: 1 (monocot) or 2 (dicot)
   - **Plumule**: Future shoot
   - **Radicle**: Future root

3. **Endosperm**: Nutritive tissue (in some seeds)

**Monocot vs Dicot Seeds:**

| Feature | Monocot (e.g., maize) | Dicot (e.g., gram) |
|---------|----------------------|-------------------|
| Cotyledons | One (scutellum) | Two |
| Endosperm | Present (albuminous) | Absent (non-albuminous) |
| Food storage | In endosperm | In cotyledons |

## Semi-technical Description of Families

Understanding flower structure helps in plant identification and classification. The flora consists of families like Fabaceae, Solanaceae, and Liliaceae, each with diagnostic features.

### Important Plant Families (Example characteristics)

**Fabaceae (Legume family):**
- Zygomorphic flowers
- Vexillary aestivation (butterfly-like petals)
- Diadelphous stamens (9+1)
- Marginal placentation
- Examples: Pea, groundnut, gram

**Solanaceae (Potato family):**
- Actinomorphic flowers
- Gamopetalous corolla
- Epipetalous stamens
- Axile placentation
- Examples: Tomato, potato, brinjal, Datura

**Liliaceae (Lily family):**
- Trimerous flowers (parts in 3s)
- Perianth present
- Epiphyllous stamens
- Axile placentation
- Examples: Onion, garlic, Aloe, tulip

## Economic Importance

Understanding plant morphology is crucial for:
1. **Agriculture**: Crop improvement, breeding programs
2. **Horticulture**: Ornamental plant cultivation, grafting
3. **Taxonomy**: Plant identification and classification
4. **Medicine**: Identifying medicinal plants
5. **Ecology**: Understanding plant adaptations and evolution
6. **Food security**: Improving crop yield and quality
`,

      keyConcepts: [
        "Root types: tap root (dicots) vs fibrous root (monocots)",
        "Root modifications: storage (carrot, radish), support (prop, stilt), respiration (pneumatophores)",
        "Stem characteristics: nodes, internodes, buds",
        "Stem types: aerial (erect, weak), underground (rhizome, tuber, bulb, corm)",
        "Leaf parts: leaf base, petiole, lamina",
        "Venation: reticulate (dicots) vs parallel (monocots)",
        "Simple vs compound leaves (pinnate and palmate)",
        "Phyllotaxy: alternate, opposite, whorled",
        "Leaf modifications: tendrils, spines, insectivorous leaves",
        "Inflorescence types: racemose vs cymose",
        "Flower parts: calyx, corolla, androecium, gynoecium",
        "Flower symmetry: actinomorphic vs zygomorphic",
        "Placentation types: marginal, axile, parietal, basal, free central",
        "Ovary position: hypogynous, perigynous, epigynous",
        "Fruit types: true vs false, simple vs aggregate vs composite",
        "Seed structure: seed coat, embryo, endosperm",
        "Monocot vs dicot seed differences",
        "Plant families: Fabaceae, Solanaceae, Liliaceae characteristics",
        "Economic importance of plant morphology in agriculture and medicine",
      ],

      formulas: [
        "Tap root formula: Primary root + Secondary roots + Tertiary roots",
        "Fibrous root formula: Short primary root → Adventitious roots from stem base",
        "Stem formula: Node + Internode + Bud (axillary/terminal)",
        "Simple leaf: Leaf base + Petiole + Single lamina",
        "Compound leaf: Leaf base + Petiole + Rachis + Multiple leaflets",
        "Flower parts formula: Calyx + Corolla + Androecium + Gynoecium",
        "Stamen = Filament + Anther (with 4 microsporangia)",
        "Carpel = Stigma + Style + Ovary (with ovules)",
        "Dicot characteristics: Tap root + Reticulate venation + 2 cotyledons",
        "Monocot characteristics: Fibrous root + Parallel venation + 1 cotyledon",
        "Bisexual flower = Stamens (♂) + Carpels (♀) present together",
      ],

      learningObjectives: [
        "Differentiate between tap root and fibrous root systems with examples",
        "Identify various root modifications and their functions",
        "Describe the structure and types of stems with modifications",
        "Understand the parts of a leaf and types of venation patterns",
        "Distinguish between simple and compound leaves",
        "Explain different types of phyllotaxy and their significance",
        "Identify leaf modifications for various functions",
        "Differentiate between racemose and cymose inflorescences",
        "Describe the structure of a typical flower and its parts",
        "Understand different types of placentation in ovaries",
        "Explain flower symmetry and classification based on various criteria",
        "Differentiate between monocot and dicot seed structures",
        "Recognize diagnostic features of important plant families",
        "Appreciate the economic importance of plant morphology",
      ],

      prerequisites: [
        "Basic understanding of plant structure and functions",
        "Knowledge of plant classification (Chapter 3: Plant Kingdom)",
        "Understanding of cell and tissue organization in plants",
        "Familiarity with photosynthesis and plant nutrition concepts",
        "Basic knowledge of plant life cycle and reproduction",
      ],

      importantTopics: [
        "Root system types (tap vs fibrous) and modifications",
        "Stem types (aerial, underground, sub-aerial) and modifications",
        "Leaf structure, venation patterns, and phyllotaxy",
        "Simple vs compound leaves with examples",
        "Leaf modifications (tendrils, spines, insectivorous)",
        "Inflorescence types (racemose vs cymose)",
        "Flower structure and parts (calyx, corolla, androecium, gynoecium)",
        "Placentation types (marginal, axile, parietal, basal, free central)",
        "Flower symmetry (actinomorphic vs zygomorphic)",
        "Ovary position (hypogynous, perigynous, epigynous)",
        "Monocot vs dicot differences (root, venation, seed)",
        "Plant families: Fabaceae, Solanaceae, Liliaceae",
        "Fruit and seed structure",
      ],

      ncertChapterRef: "Class 11 Biology - Chapter 5",
      difficultyLevel: 3,
      estimatedStudyMinutes: 270,
      status: "published",

      visualizationsData: [
        {
          type: "plant-anatomy",
          title: "Flower Structure Interactive Model",
          description:
            "3D visualization of flower parts showing calyx, corolla, androecium, and gynoecium with different placentation types",
        },
      ],
    })
    .onConflictDoUpdate({
      target: [
        chapterContent.subject,
        chapterContent.classLevel,
        chapterContent.chapterNumber,
      ],
      set: {
        chapterTitle: "Morphology of Flowering Plants",
        introduction:
          "Plant morphology is the study of the external structure and form of plants. Flowering plants (angiosperms) represent the most advanced and diverse group in the plant kingdom, exhibiting remarkable variety in their vegetative and reproductive structures. Understanding plant morphology is essential for plant identification, classification, agricultural practices, and appreciating the adaptations that allow plants to thrive in diverse environments. From the underground root system that anchors the plant and absorbs water, to the above-ground shoot system with stems, leaves, and flowers, each organ has a specific structure suited to its function. This chapter explores the fascinating diversity of plant forms and the modifications that enable plants to survive in various ecological niches.",
        learningObjectives: sql`EXCLUDED.learning_objectives`,

        prerequisites: sql`EXCLUDED.prerequisites`,

        importantTopics: sql`EXCLUDED.important_topics`,

        visualizationsData: [
          {
            type: "plant-anatomy",
            title: "Flower Structure Interactive Model",
            description:
              "3D visualization of flower parts showing calyx, corolla, androecium, and gynoecium with different placentation types",
          },
        ],
        updatedAt: new Date(),
      },
    });

  console.log("✅ Biology Chapter 5: Morphology of Flowering Plants seeded successfully!");
}

seedBiologyChapter5()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding chapter:", error);
    process.exit(1);
  });
