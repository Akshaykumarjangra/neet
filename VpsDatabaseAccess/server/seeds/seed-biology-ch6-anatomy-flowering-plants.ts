import { db } from "../db";
import { chapterContent } from "../../shared/schema";

async function seedBiologyChapter6() {
  console.log("Seeding Biology Class 11 Chapter 6: Anatomy of Flowering Plants...");

  await db
    .insert(chapterContent)
    .values({
      subject: "Biology",
      classLevel: "11",
      chapterNumber: 6,
      chapterTitle: "Anatomy of Flowering Plants",
      introduction:
        "Plant anatomy is the study of the internal structure of plants. While morphology deals with external features, anatomy reveals the intricate organization of tissues and cells within plant organs. Understanding plant anatomy is essential for comprehending how plants function - how they transport water and nutrients, provide mechanical support, carry out photosynthesis, and adapt to their environment. The arrangement of different tissue systems in roots, stems, and leaves reflects the division of labor among specialized cells, where each tissue performs specific functions that contribute to the plant's survival and growth. This chapter explores the fascinating microscopic world within plants, from the actively dividing meristematic tissues to the highly specialized permanent tissues that form the complex internal architecture of flowering plants.",

      detailedNotes: `
# Anatomy of Flowering Plants

## Plant Tissues

A tissue is a group of cells having a common origin and performing a common function. Plant tissues are classified based on their ability to divide.

### Classification of Plant Tissues

**A. Meristematic Tissues** (Dividing tissues)
- Cells capable of continuous division
- Thin cellulose cell walls
- Dense cytoplasm with prominent nucleus
- No vacuoles or very small vacuoles
- No intercellular spaces

**B. Permanent Tissues** (Non-dividing tissues)
- Cells that have lost the ability to divide
- Derived from meristematic tissues through differentiation
- Perform specific functions

## Meristematic Tissues

Meristems are responsible for plant growth. They are classified based on **position**, **origin**, and **function**.

### Based on Position

**1. Apical Meristem**
- Located at growing tips (root and shoot apex)
- Responsible for **primary growth** (increase in length)
- Example: Root tip, shoot tip

**2. Intercalary Meristem**
- Located at leaf base and internodes
- Common in monocots (grasses)
- Allows regrowth after grazing or mowing
- Example: Base of leaves in grasses

**3. Lateral Meristem**
- Located parallel to the sides of organs
- Responsible for **secondary growth** (increase in girth/thickness)
- Examples: **Vascular cambium**, **Cork cambium** (phellogen)

### Based on Origin

**1. Primary Meristem**
- Present from early embryonic stage
- Forms primary tissues
- Example: Apical meristem

**2. Secondary Meristem**
- Develops later from permanent tissues
- Forms secondary tissues
- Example: Vascular cambium, cork cambium

### Based on Function

**1. Protoderm**
- Forms epidermis

**2. Procambium**
- Forms primary vascular tissues (xylem and phloem)

**3. Ground Meristem**
- Forms ground tissue (cortex, pith, pericycle)

## Permanent Tissues

Cells derived from meristematic tissues that have lost the ability to divide and have attained a permanent form, structure, and function.

### Classification

**A. Simple Permanent Tissues** (Composed of one type of cell)
**B. Complex Permanent Tissues** (Composed of more than one type of cell)

### Simple Permanent Tissues

**1. Parenchyma**

**Characteristics:**
- Most common and abundant tissue
- Living cells with thin cellulose walls
- Isodiametric cells (equal dimensions)
- Large central vacuole
- Intercellular spaces present

**Functions:**
- Photosynthesis (chlorenchyma)
- Storage of food, water, air
- Provide turgidity and support

**Special Types:**
- **Chlorenchyma**: Contains chloroplasts for photosynthesis
- **Aerenchyma**: Air-filled parenchyma in aquatic plants, provides buoyancy
- **Prosenchyma**: Elongated parenchyma cells

**2. Collenchyma**

**Characteristics:**
- Living cells with thickened corners
- Cell wall has additional **cellulose** and **pectin** deposits at corners
- Little or no intercellular spaces
- Chloroplasts may be present
- Cells often elongated

**Functions:**
- Provide **mechanical support** with flexibility
- Common in herbaceous dicot stems, leaf stalks, floral parts

**Location:**
- Hypodermis (layer below epidermis) in young dicot stems
- Midrib and petiole

**3. Sclerenchyma**

**Characteristics:**
- **Dead cells** at maturity (lose protoplasm)
- Thick **lignified** secondary walls
- No intercellular spaces
- Very hard and rigid

**Functions:**
- Provide **mechanical support** and strength
- Most rigid plant tissue

**Types:**

**a) Sclerenchyma Fibers**
- Long, narrow, thick-walled cells
- Pointed ends
- Found in vascular bundles
- Used commercially (jute, hemp, flax fibers)

**b) Sclereids (Stone cells)**
- Spherical, oval, or cylindrical
- Extremely thick walls
- Found in seed coats, nutshells, fruit walls
- Give gritty texture to pear fruit

### Complex Permanent Tissues

Composed of more than one type of cell working together as a unit.

**1. Xylem** (Water-conducting tissue)

**Components:**
- **Tracheids**: Dead, elongated cells with lignified walls, pointed ends
- **Vessels**: Dead, tube-like structures formed by end-to-end fusion of cells, perforations allow water flow
- **Xylem parenchyma**: Living cells for storage
- **Xylem fibers**: Dead sclerenchyma fibers for support

**Functions:**
- Transport water and minerals from roots to aerial parts
- Provide mechanical support (lignified tissues)
- Storage (xylem parenchyma)

**Types:**
- **Primary xylem**: Formed from procambium
  - **Protoxylem**: Forms first, narrow vessels
  - **Metaxylem**: Forms later, wider vessels
- **Secondary xylem**: Formed from vascular cambium (in secondary growth)

**2. Phloem** (Food-conducting tissue)

**Components:**
- **Sieve tube elements**: Living cells without nucleus at maturity, perforated sieve plates
- **Companion cells**: Living cells with nucleus, closely associated with sieve tubes
- **Phloem parenchyma**: Living cells for storage (absent in monocots)
- **Phloem fibers**: Dead sclerenchyma fibers (commercial fibers like jute, hemp)

**Functions:**
- Transport organic food (sucrose, amino acids) from leaves to other parts
- Bidirectional transport

**Types:**
- **Primary phloem**: Formed from procambium
  - **Protophloem**: Forms first
  - **Metaphloem**: Forms later
- **Secondary phloem**: Formed from vascular cambium

## The Tissue Systems

Plant organs are composed of three main tissue systems:

### 1. Epidermal Tissue System

**Components:**
- Epidermis (outermost protective layer)
- Stomata (pores for gas exchange)
- Trichomes (hair-like structures)

**Epidermis Characteristics:**
- Single layer of compactly arranged cells
- No intercellular spaces
- Outer walls covered with **cuticle** (waxy layer of cutin) to prevent water loss
- Usually lacks chloroplasts (except guard cells)

**Stomata:**
- Tiny pores surrounded by two **guard cells**
- Guard cells contain chloroplasts
- Regulate transpiration and gas exchange
- **Subsidiary cells**: Specialized epidermal cells surrounding guard cells

**Stomatal Types:**
- **Anomocytic**: Irregular arrangement of subsidiary cells
- **Anisocytic**: Three subsidiary cells, one smaller
- **Paracytic**: Two subsidiary cells parallel to guard cells
- **Diacytic**: Two subsidiary cells perpendicular to guard cells

**Trichomes:**
- Epidermal hair-like outgrowths
- May be unicellular or multicellular
- Functions: Reduce water loss, protect from insects, secrete substances

**Root Hair:**
- Unicellular extensions of epidermal cells in roots
- Increase surface area for water absorption

### 2. Ground Tissue System

All tissues except epidermis and vascular bundles constitute the ground tissue system.

**Components:**

**In Dicot Stem:**
- **Hypodermis**: Collenchymatous layer for mechanical support
- **Cortex**: Parenchymatous, stores food
- **Endodermis**: Innermost layer of cortex (starch sheath in stems)
- **Pericycle**: Layer between endodermis and vascular bundles
- **Pith**: Central parenchymatous region for storage
- **Medullary rays**: Radial connections between pith and cortex

**In Monocot Stem:**
- Ground tissue not differentiated into cortex and pith
- Parenchymatous ground tissue throughout

**In Root:**
- **Cortex**: Large parenchymatous region
- **Endodermis**: Single layer with **Casparian strips** (suberin deposits)
- **Pericycle**: Gives rise to lateral roots

### 3. Vascular Tissue System

Comprises xylem and phloem arranged in vascular bundles.

**Types of Vascular Bundles:**

**Based on Presence of Cambium:**

**1. Open Vascular Bundle**
- Cambium present between xylem and phloem
- Capable of secondary growth
- Found in dicot stems

**2. Closed Vascular Bundle**
- Cambium absent
- No secondary growth
- Found in monocot stems

**Based on Arrangement:**

**1. Radial**
- Xylem and phloem on different radii
- Found in roots

**2. Conjoint**
- Xylem and phloem on same radius
- Found in stems and leaves

**Types of Conjoint Bundles:**
- **Collateral**: Phloem on outer side, xylem on inner side (most common)
- **Bicollateral**: Phloem on both sides of xylem (cucurbits - pumpkin, cucumber)

## Anatomy of Dicot Root

**Structure (from outside to inside):**

**1. Epidermis (Epiblema/Rhizodermis)**
- Single layer without cuticle (allows water absorption)
- Root hairs present

**2. Cortex**
- Multiple layers of parenchyma
- Large intercellular spaces
- Storage of food and water

**3. Endodermis**
- Single layer barrel-shaped cells
- **Casparian strips**: Band of suberin on radial and tangential walls
- Acts as selective barrier
- Few **passage cells** without Casparian strips (allow water entry)

**4. Pericycle**
- Single to few layers of parenchyma
- Gives rise to **lateral roots**
- Forms vascular cambium and cork cambium during secondary growth

**5. Vascular Bundle**
- **Radial arrangement**: Xylem and phloem on different radii
- **Exarch xylem**: Protoxylem towards periphery, metaxylem towards center
- **Polyarch**: Many xylem bundles (2-6 or more)
- Phloem bundles alternate with xylem

**6. Pith**
- Absent or very small in dicot roots

## Anatomy of Monocot Root

**Similar to dicot root with differences:**

**Similarities:**
- Epidermis with root hairs
- Multilayered cortex
- Endodermis with Casparian strips
- Pericycle
- Radial vascular bundles
- Exarch xylem

**Differences:**
- **Polyarch**: Usually more than 6 xylem bundles (8-12 or more)
- **Large pith**: Well-developed central pith (pith large compared to dicot)
- **No secondary growth**: Pericycle cannot form cambium

## Anatomy of Dicot Stem

**Structure (from outside to inside):**

**1. Epidermis**
- Single layer with cuticle
- Multicellular stem hairs present
- Stomata few

**2. Hypodermis (Cortex outer layer)**
- Collenchymatous (2-3 layers)
- Provides mechanical support

**3. General Cortex**
- Parenchymatous with intercellular spaces
- Chloroplasts present in outer layers (chlorenchyma)
- Inner layers for storage

**4. Endodermis**
- **Starch sheath**: Cells contain starch grains
- Casparian strips usually absent

**5. Pericycle**
- Patches of sclerenchyma fibers at intervals
- Parenchyma between sclerenchyma patches

**6. Vascular Bundles**
- **Conjoint, collateral, and open**
- Arranged in a ring
- Cambium strip present between xylem and phloem
- **Endarch xylem**: Protoxylem towards center, metaxylem towards periphery

**7. Medullary Rays**
- Radial parenchymatous connections between pith and cortex
- Storage and lateral conduction

**8. Pith**
- Large central parenchymatous region
- Storage of food

## Anatomy of Monocot Stem

**Structure:**

**1. Epidermis**
- Single layer with thick cuticle
- Stomata present
- Usually no stem hairs

**2. Hypodermis**
- Sclerenchymatous (unlike dicot which has collenchyma)
- 2-3 layers
- Mechanical support

**3. Ground Tissue**
- Not differentiated into cortex, endodermis, pericycle, and pith
- Parenchymatous throughout with scattered vascular bundles
- Peripheral ground tissue more compact

**4. Vascular Bundles**
- **Conjoint, collateral, and closed**
- Scattered throughout ground tissue (not in a ring)
- Smaller bundles towards periphery, larger towards center
- **No cambium** (closed bundles - no secondary growth)
- **Endarch xylem**
- Each bundle surrounded by **sclerenchymatous bundle sheath**

**5. Protoxylem Lacuna**
- Cavity/lysigenous space where protoxylem disintegrates
- Characteristic feature of monocot stems

## Anatomy of Dorsiventral (Dicot) Leaf

**Structure (from upper to lower surface):**

**1. Upper Epidermis**
- Single layer with thick cuticle
- Few or no stomata
- Trichomes may be present

**2. Mesophyll** (Tissue between upper and lower epidermis)

Differentiated into two types:

**a) Palisade Parenchyma**
- Below upper epidermis
- Elongated, cylindrical cells arranged vertically
- Tightly packed, few intercellular spaces
- Rich in chloroplasts
- Main site of photosynthesis

**b) Spongy Parenchyma**
- Below palisade layer, above lower epidermis
- Irregular, loosely arranged cells
- Large intercellular spaces for gas exchange
- Fewer chloroplasts than palisade

**3. Lower Epidermis**
- Single layer with thin cuticle
- Numerous stomata for gas exchange
- Guard cells with chloroplasts

**4. Vascular Bundles (Veins)**
- **Conjoint, collateral, and closed**
- Form midrib and lateral veins
- Surrounded by **bundle sheath** (parenchymatous or sclerenchymatous)
- **Xylem towards upper side**, **phloem towards lower side**

## Anatomy of Isobilateral (Monocot) Leaf

**Structure:**

**1. Epidermis**
- Both upper and lower epidermis similar
- Stomata on both surfaces (amphistomatic)
- **Bulliform cells** (large empty cells) in upper epidermis
  - Help in leaf rolling during water stress
  - Reduce water loss

**2. Mesophyll**
- Not differentiated into palisade and spongy parenchyma
- Uniform parenchyma cells with chloroplasts throughout
- Intercellular spaces present

**3. Vascular Bundles**
- **Conjoint, collateral, and closed**
- Arranged parallel to each other
- Each bundle surrounded by **bundle sheath** (sclerenchymatous)
- Large vascular bundles with xylem vessels arranged in 'Y' shape

**4. Bulliform Cells**
- Large, empty, colorless cells in upper epidermis
- Help in leaf folding/rolling
- Reduce transpiration during drought

## Secondary Growth

Secondary growth is the increase in girth (thickness) of plant organs due to activity of lateral meristems.

### Formation of Secondary Tissues

**1. Vascular Cambium Formation**

In Dicot Stem:
- **Intrafascicular cambium**: Cambium within vascular bundles (already present)
- **Interfascicular cambium**: Develops from medullary ray cells (newly formed)
- Together form a complete **cambial ring**

**2. Activity of Vascular Cambium**

- Produces **secondary xylem** towards inside (more abundant)
- Produces **secondary phloem** towards outside (less abundant)
- Forms **secondary medullary rays** for lateral conduction

**3. Cork Cambium (Phellogen)**

- Develops in cortex as epidermis ruptures
- Produces:
  - **Cork (phellem)** towards outside: Dead cells with suberin, waterproof
  - **Secondary cortex (phelloderm)** towards inside: Living parenchyma

**4. Periderm**

Composed of:
- Cork (phellem) - outermost
- Cork cambium (phellogen) - middle
- Secondary cortex (phelloderm) - innermost

**Functions:**
- Protective layer replacing epidermis in older stems and roots
- **Lenticels**: Pores in cork for gaseous exchange

### Heartwood and Sapwood

**Heartwood (Duramen)**
- Inner, older, non-functional xylem
- Dark colored due to deposition of tannins, resins, oils
- Highly durable
- No water conduction

**Sapwood (Alburnum)**
- Outer, younger, functional xylem
- Light colored
- Conducts water and minerals
- Less durable

### Annual Rings

- Concentric rings visible in cross-section of woody stems
- Each ring = one year's growth
- **Spring wood** (early wood): Lighter, formed in spring, larger vessels
- **Autumn wood** (late wood): Darker, formed in autumn, smaller vessels, more fibers
- Used to determine **age of tree** (dendrochronology)

## Importance of Plant Anatomy

1. **Understanding plant function**: How plants transport, support, photosynthesize
2. **Taxonomy**: Anatomical features aid in plant classification
3. **Agriculture**: Understanding tissue structure helps in crop improvement
4. **Wood industry**: Knowledge of wood anatomy for timber selection
5. **Horticulture**: Grafting, budding techniques require anatomical knowledge
6. **Medicine**: Identifying medicinal plants, extracting compounds
7. **Forensics**: Plant tissue identification in criminal investigations
8. **Ecology**: Understanding plant adaptations to environment
`,

      keyConcepts: [
        "Meristematic tissues: apical, intercalary, lateral meristems",
        "Simple tissues: parenchyma, collenchyma, sclerenchyma",
        "Complex tissues: xylem (water transport), phloem (food transport)",
        "Xylem components: tracheids, vessels, xylem parenchyma, fibers",
        "Phloem components: sieve tubes, companion cells, phloem parenchyma, fibers",
        "Tissue systems: epidermal, ground, vascular",
        "Epidermis features: cuticle, stomata, trichomes",
        "Stomatal types: guard cells regulate gas exchange",
        "Vascular bundles: open vs closed, radial vs conjoint",
        "Dicot root: radial bundles, exarch xylem, endodermis with Casparian strips",
        "Monocot root: polyarch (many xylem), large pith",
        "Dicot stem: vascular bundles in ring, open bundles, endarch xylem",
        "Monocot stem: scattered vascular bundles, closed bundles, sclerenchymatous hypodermis",
        "Dorsiventral leaf: palisade and spongy mesophyll differentiation",
        "Isobilateral leaf: uniform mesophyll, bulliform cells",
        "Secondary growth: vascular cambium produces secondary xylem and phloem",
        "Periderm: cork cambium, cork, secondary cortex",
        "Heartwood vs sapwood: non-functional vs functional xylem",
        "Annual rings: dendrochronology for age determination",
      ],

      formulas: [
        "Meristem types: Apical (length) + Intercalary (regrowth) + Lateral (girth)",
        "Simple tissues: Parenchyma (storage) + Collenchyma (flexible support) + Sclerenchyma (rigid support)",
        "Xylem = Tracheids + Vessels + Xylem parenchyma + Xylem fibers",
        "Phloem = Sieve tubes + Companion cells + Phloem parenchyma + Phloem fibers",
        "Tissue systems: Epidermal + Ground + Vascular",
        "Vascular bundle types: Open (cambium present) vs Closed (no cambium)",
        "Root vascular pattern: Radial (xylem and phloem on different radii)",
        "Stem vascular pattern: Conjoint (xylem and phloem on same radius)",
        "Xylem arrangement: Exarch (root) vs Endarch (stem)",
        "Dicot root = Radial bundles + Exarch xylem + Small/no pith",
        "Monocot root = Radial bundles + Exarch xylem + Large pith + Polyarch",
        "Dicot stem = Ring arrangement + Open bundles + Endarch xylem + Cortex differentiation",
        "Monocot stem = Scattered bundles + Closed bundles + Endarch xylem + No differentiation",
        "Periderm = Cork (phellem) + Cork cambium (phellogen) + Secondary cortex (phelloderm)",
      ],

      learningObjectives: [
        "Differentiate between meristematic and permanent tissues",
        "Classify meristematic tissues based on position, origin, and function",
        "Describe the characteristics and functions of simple tissues (parenchyma, collenchyma, sclerenchyma)",
        "Explain the structure and function of complex tissues (xylem and phloem)",
        "Understand the three tissue systems in plants: epidermal, ground, vascular",
        "Identify the anatomical differences between dicot and monocot roots",
        "Compare the internal structure of dicot and monocot stems",
        "Distinguish between dorsiventral (dicot) and isobilateral (monocot) leaf anatomy",
        "Explain the process of secondary growth in dicot stems",
        "Understand the formation and significance of annual rings",
        "Differentiate between heartwood and sapwood",
        "Recognize the importance of plant anatomy in various fields",
      ],

      prerequisites: [
        "Basic understanding of plant structure and organization",
        "Knowledge of cell structure and functions",
        "Familiarity with plant classification (dicots vs monocots)",
        "Understanding of plant morphology (Chapter 5: Morphology of Flowering Plants)",
        "Basic knowledge of plant physiology concepts",
      ],

      importantTopics: [
        "Meristematic tissues: types and functions (apical, intercalary, lateral)",
        "Simple tissues: parenchyma, collenchyma, sclerenchyma characteristics",
        "Complex tissues: xylem and phloem structure and components",
        "Tissue systems: epidermal, ground, vascular",
        "Stomata structure and types",
        "Vascular bundle types: open vs closed, radial vs conjoint",
        "Dicot root anatomy: radial bundles, exarch xylem, Casparian strips",
        "Monocot root anatomy: polyarch, large pith",
        "Dicot stem anatomy: ring arrangement, open bundles, endarch xylem",
        "Monocot stem anatomy: scattered bundles, closed bundles",
        "Dicot leaf (dorsiventral): palisade and spongy mesophyll",
        "Monocot leaf (isobilateral): uniform mesophyll, bulliform cells",
        "Secondary growth: vascular cambium and cork cambium",
        "Annual rings and dendrochronology",
        "Heartwood vs sapwood",
      ],

      ncertChapterRef: "Class 11 Biology - Chapter 6",
      difficultyLevel: 4,
      estimatedStudyMinutes: 300,
      status: "published",

      visualizationsData: {
        type: "tissue-anatomy",
        title: "Plant Tissue Systems 3D Model",
        description:
          "Interactive cross-section showing epidermal, ground, and vascular tissue systems in dicot and monocot stems with detailed labeling",
      },
    })
    .onConflictDoUpdate({
      target: [
        chapterContent.subject,
        chapterContent.classLevel,
        chapterContent.chapterNumber,
      ],
      set: {
        chapterTitle: "Anatomy of Flowering Plants",
        introduction:
          "Plant anatomy is the study of the internal structure of plants. While morphology deals with external features, anatomy reveals the intricate organization of tissues and cells within plant organs. Understanding plant anatomy is essential for comprehending how plants function - how they transport water and nutrients, provide mechanical support, carry out photosynthesis, and adapt to their environment. The arrangement of different tissue systems in roots, stems, and leaves reflects the division of labor among specialized cells, where each tissue performs specific functions that contribute to the plant's survival and growth. This chapter explores the fascinating microscopic world within plants, from the actively dividing meristematic tissues to the highly specialized permanent tissues that form the complex internal architecture of flowering plants.",
        updatedAt: new Date(),
      },
    });

  console.log("✅ Biology Chapter 6: Anatomy of Flowering Plants seeded successfully!");
}

seedBiologyChapter6()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding chapter:", error);
    process.exit(1);
  });
