import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter11() {
  console.log('Seeding Biology Class 11 Chapter 11: Transport in Plants...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 11,
    chapterTitle: 'Transport in Plants',
    introduction: `Plants, being predominantly autotrophic organisms, must transport water, minerals, and organic nutrients across considerable distances—from the roots deep in the soil to the leaves at the top of the canopy, and vice versa. Unlike animals, plants lack a circulatory system with a pumping organ. Instead, they rely on specialized vascular tissues—xylem and phloem—and various physical and physiological processes to move substances throughout the plant body. Understanding transport mechanisms in plants reveals the elegant solutions evolved by nature to overcome the challenges of moving materials against gravity and across long distances without energy-intensive pumps.`,

    detailedNotes: `
# Transport in Plants

## Means of Transport

### Types of Transport
Plants employ various mechanisms to transport substances:

**1. Diffusion**
- Movement of molecules from high concentration to low concentration
- Passive process, no energy required
- Short-distance transport
- Examples: CO₂ entry into leaves, O₂ exit from leaves
- Rate depends on: concentration gradient, temperature, pressure

**2. Facilitated Diffusion**
- Movement through membrane proteins (carrier proteins, channel proteins)
- Passive transport along concentration gradient
- Specific for particular molecules
- Faster than simple diffusion
- Example: water movement through aquaporins

**3. Active Transport**
- Movement against concentration gradient
- Requires energy (ATP)
- Involves carrier proteins and pumps
- Example: mineral uptake by roots against concentration gradient
- Na⁺-K⁺ pump, H⁺-ATPase pump

**4. Osmosis**
- Movement of water across semipermeable membrane
- From high water potential (dilute solution) to low water potential (concentrated solution)
- Passive process
- Crucial for plant water relations

## Water Potential and Osmosis

### Water Potential (Ψ)
Water potential is the potential energy of water per unit volume relative to pure water at atmospheric pressure and ambient temperature.

**Components of Water Potential:**
- **Ψw = Ψs + Ψp + Ψm**
  - Ψw = total water potential
  - Ψs = solute potential (osmotic potential) - always negative
  - Ψp = pressure potential (turgor pressure) - positive in turgid cells
  - Ψm = matric potential (negligible in most cases)

**Key Concepts:**
- Pure water has the highest water potential (Ψ = 0 MPa at standard conditions)
- Addition of solutes decreases water potential (makes it more negative)
- Water moves from higher Ψ to lower Ψ
- At equilibrium, Ψ is equal on both sides

### Plant Cell and Water Relations

**Plasmolysis**
- Shrinkage of protoplast away from cell wall when placed in hypertonic solution
- Cell loses water, protoplast contracts
- Ψ of cell becomes more negative than surroundings
- Types: Incipient plasmolysis (just begins), Complete plasmolysis (full separation)

**Deplasmolysis**
- Reversal of plasmolysis when cell is placed in hypotonic solution
- Cell regains turgidity

**Turgor Pressure**
- Pressure exerted by protoplast against cell wall
- Provides mechanical support to non-woody tissues
- Important for cell enlargement and growth
- Drives stomatal opening

## Long Distance Transport: Xylem

### Structure of Xylem
- **Tracheids**: elongated cells with tapered ends, found in gymnosperms and angiosperms
- **Vessels**: shorter, wider cells arranged end-to-end forming continuous tubes, mainly in angiosperms
- **Xylem parenchyma**: storage and lateral transport
- **Xylem fibers**: provide mechanical support

### Water Absorption by Roots

**Pathways of Water Movement in Roots:**

**1. Apoplast Pathway**
- Movement through cell walls and intercellular spaces
- Does not cross plasma membrane
- Faster route
- Blocked by Casparian strip in endodermis
- Non-living pathway

**2. Symplast Pathway**
- Movement through cytoplasm via plasmodesmata
- Crosses plasma membrane initially
- Living pathway
- Allows selective absorption

**3. Transmembrane Pathway**
- Crosses plasma membrane multiple times
- Both active and passive transport
- Highly selective

**Casparian Strip:**
- Waxy, suberin-impregnated band in radial and transverse walls of endodermal cells
- Forces all water to enter symplast pathway
- Acts as checkpoint for mineral uptake
- Prevents backflow of water and minerals

### Mechanisms of Water Transport in Xylem

**1. Root Pressure**
- Positive pressure developing in roots due to active mineral uptake
- Creates osmotic gradient, water follows by osmosis
- Builds up in xylem vessels
- Evidence: guttation (exudation of xylem sap from leaf margins) and bleeding (xylem sap oozing from cut stems)
- Limitations: 
  - Small magnitude (1-2 bar), insufficient to push water to tall trees
  - Absent in many plants during rapid transpiration
  - Does not occur in all seasons

**2. Transpiration Pull (Cohesion-Tension Theory)**
Proposed by Dixon and Joly, this is the main mechanism explaining water ascent in tall trees.

**Key Components:**
- **Transpiration**: Loss of water vapor from aerial parts, mainly through stomata
- **Cohesion**: Strong attraction between water molecules due to hydrogen bonding
- **Adhesion**: Attraction between water molecules and xylem wall
- **Tension**: Negative pressure (pull) created by transpiration

**Mechanism:**
1. Water evaporates from mesophyll cells in leaf
2. Creates tension (negative pressure) in xylem of leaf
3. Tension is transmitted down the continuous water column
4. Water molecules cohesively held together; column doesn't break
5. Water is pulled up from roots to leaves
6. Water is absorbed from soil to replace water lost by transpiration

**Evidence Supporting Cohesion-Tension Theory:**
- Extremely strong cohesive force of water (can withstand tension up to 15,000 atm)
- Narrow diameter of xylem vessels increases capillary action
- Transpiration rate correlates with water uptake rate
- Trunk diameter decreases slightly during peak transpiration (due to tension)

**3. Capillarity**
- Water rises in narrow tubes due to adhesion and cohesion
- Contributes to water ascent but alone insufficient
- More effective in narrow xylem vessels
- Can account for rise up to ~1 meter

## Transpiration

### Definition and Significance
Transpiration is the loss of water in the form of vapor from aerial parts of plants, primarily through stomata.

**Significance:**
- Creates transpiration pull for water ascent
- Cools the plant (evaporative cooling)
- Maintains turgidity of cells
- Enables mineral uptake and distribution
- Maintains water balance

**Types of Transpiration:**
1. **Stomatal Transpiration** (90-95%): through stomata
2. **Cuticular Transpiration** (3-10%): through cuticle
3. **Lenticular Transpiration** (<1%): through lenticels in woody stems

### Stomatal Structure and Function

**Structure:**
- Guard cells: kidney-shaped (dicots) or dumbbell-shaped (monocots)
- Contain chloroplasts (unlike other epidermal cells)
- Unevenly thickened cell walls (thicker on inner side)
- Stomatal pore between two guard cells
- Subsidiary cells: support guard cells

**Mechanism of Stomatal Opening and Closing:**

**Opening (Daytime in most plants):**
1. Light triggers active K⁺ uptake by guard cells
2. H⁺-ATPase pumps H⁺ out, creating electrochemical gradient
3. K⁺ channels open, K⁺ enters guard cells
4. Organic acids (malate) synthesized in guard cells
5. Solute concentration increases, water potential decreases
6. Water enters by osmosis
7. Guard cells become turgid
8. Due to uneven wall thickness, guard cells curve outward
9. Stomatal pore opens

**Closing (Nighttime or water stress):**
1. Reverse process occurs
2. K⁺ and malate exit guard cells
3. Water potential increases
4. Water leaves by osmosis
5. Guard cells become flaccid
6. Stomatal pore closes

**Factors Affecting Transpiration:**
- **Light**: increases transpiration (stomata open)
- **Temperature**: higher temperature increases evaporation
- **Humidity**: higher humidity reduces transpiration
- **Wind**: moderate wind increases, strong wind may cause stomatal closure
- **Soil water availability**: water stress causes stomatal closure
- **CO₂ concentration**: high CO₂ causes stomatal closure

### Adaptations to Reduce Transpiration

**Xerophytes** (desert plants):
- Thick cuticle
- Sunken stomata
- Reduced leaf surface area
- Leaf rolling
- Presence of trichomes (hairs)
- CAM photosynthesis (stomata open at night)

## Transport of Food: Phloem

### Structure of Phloem
- **Sieve tube elements**: conducting cells, lack nucleus at maturity, perforated end walls (sieve plates)
- **Companion cells**: metabolically active, connected to sieve tubes via plasmodesmata, provide energy
- **Phloem parenchyma**: storage
- **Phloem fibers**: support

### Translocation in Phloem

**Characteristics:**
- Bidirectional (can move up or down)
- Transports organic nutrients (mainly sucrose) and hormones
- From source (site of synthesis/storage) to sink (site of utilization/storage)
- Examples: 
  - Source: photosynthetic leaves, storage organs releasing nutrients
  - Sink: growing roots, fruits, flowers, storage organs accumulating nutrients

### Pressure Flow Hypothesis (Mass Flow Hypothesis)
Proposed by Ernst Münch, explains translocation mechanism.

**Mechanism:**
1. **At Source (e.g., leaf):**
   - Sucrose is actively loaded into sieve tubes
   - Increases solute concentration
   - Water potential decreases
   - Water enters by osmosis from xylem
   - Pressure increases (turgor pressure)

2. **At Sink (e.g., root):**
   - Sucrose is actively unloaded and used/stored
   - Solute concentration decreases
   - Water potential increases
   - Water leaves and returns to xylem
   - Pressure decreases

3. **Flow:**
   - Pressure gradient from source to sink
   - Sap flows from high pressure (source) to low pressure (sink)
   - Bulk flow of solution

**Evidence:**
- Sieve tube sap is under positive pressure (exudes when cut)
- Sucrose concentration gradient exists from source to sink
- Removal of phloem ring (girdling) stops translocation

**Limitations:**
- Requires metabolic energy for loading and unloading
- Doesn't fully explain bidirectional simultaneous transport in same sieve tube

### Phloem Loading and Unloading

**Loading at Source:**
- **Apoplastic loading**: sucrose transported across membrane into sieve tubes
- **Symplastic loading**: sucrose moves through plasmodesmata
- Requires H⁺-sucrose cotransporter
- Energy-dependent process

**Unloading at Sink:**
- Reversal of loading
- Can be apoplastic or symplastic
- Sucrose converted to starch, used in respiration, or incorporated into structural components

## Comparison: Xylem vs. Phloem Transport

| Feature | Xylem | Phloem |
|---------|-------|--------|
| Material transported | Water and minerals | Organic nutrients (mainly sucrose) |
| Direction | Unidirectional (upward) | Bidirectional |
| Mechanism | Transpiration pull, root pressure | Pressure flow |
| Conducting cells | Tracheids, vessels (dead) | Sieve tubes (living) |
| Energy requirement | Passive (except mineral uptake) | Active (loading/unloading) |
| Pressure | Negative (tension) | Positive |

## Mineral Uptake and Transport

**Mineral Absorption:**
- Mainly through roots
- Both passive and active uptake
- Active transport against concentration gradient (requires ATP)
- Selective uptake through specific carriers

**Factors Affecting Mineral Uptake:**
- Concentration of minerals in soil
- Soil pH
- Aeration of soil
- Temperature
- Interaction between minerals

**Transport to Shoot:**
- Minerals absorbed by roots
- Enter xylem via symplast or apoplast pathway
- Transported upward with transpiration stream
- Redistributed through phloem as needed

## Guttation
- Exudation of liquid water droplets from leaf margins
- Occurs through hydathodes (water stomata)
- Happens when root pressure is high and transpiration is low
- Common in early morning
- Indicates root pressure mechanism

## Practical Applications

**Girdling (Ringing):**
- Removal of phloem tissue in a ring around stem
- Stops downward translocation of food
- Used to increase fruit size (food accumulates above girdle)
- Can kill plant if done completely

**Hydroponics:**
- Growing plants in nutrient solution without soil
- Demonstrates mineral requirements
- Used commercially for vegetable production
`,

    keyConcepts: [
      'Water potential (Ψw) = Ψs + Ψp + Ψm',
      'Water moves from higher to lower water potential',
      'Plasmolysis: protoplast shrinks in hypertonic solution',
      'Turgor pressure provides mechanical support',
      'Three pathways in roots: apoplast, symplast, transmembrane',
      'Casparian strip forces water into symplast pathway',
      'Root pressure: positive pressure due to active mineral uptake',
      'Transpiration pull (cohesion-tension theory): main mechanism for water ascent',
      'Cohesion: H-bonding between water molecules',
      'Adhesion: attraction between water and xylem walls',
      'Guttation: liquid water exudation through hydathodes',
      'Stomatal opening: K⁺ uptake, water enters, guard cells turgid',
      'Stomatal closing: K⁺ exit, water leaves, guard cells flaccid',
      'Transpiration: 90-95% stomatal, 3-10% cuticular',
      'Phloem translocates organic nutrients bidirectionally',
      'Pressure flow hypothesis: explains phloem transport',
      'Source: site of synthesis; Sink: site of utilization',
      'Phloem loading and unloading require energy'
    ],

    formulas: [
      'Water potential: Ψw = Ψs + Ψp + Ψm',
      'Solute potential: Ψs = -iCRT (always negative)',
      'DPD (Diffusion Pressure Deficit) = OP - TP (older terminology)',
      'At plasmolysis: Ψp = 0, so Ψw = Ψs',
      'At full turgidity: Ψp = -Ψs, so Ψw = 0'
    ],

    learningObjectives: [
      'Understand different means of transport in plants (diffusion, osmosis, active transport)',
      'Explain water potential and its components',
      'Describe plasmolysis and turgor pressure',
      'Explain pathways of water movement in roots',
      'Understand the role of Casparian strip',
      'Explain mechanisms of water transport: root pressure and transpiration pull',
      'Describe the cohesion-tension theory in detail',
      'Understand stomatal mechanism and factors affecting transpiration',
      'Explain translocation in phloem using pressure flow hypothesis',
      'Compare xylem and phloem transport mechanisms',
      'Understand mineral uptake and transport'
    ],

    prerequisites: [
      'Understanding of plant tissues (xylem, phloem)',
      'Concept of osmosis and diffusion',
      'Knowledge of plant anatomy (root, stem, leaf)',
      'Understanding of cell structure and membrane transport',
      'Basic chemistry: hydrogen bonding'
    ],

    importantTopics: [
      'Water potential equation and components',
      'Plasmolysis and deplasmolysis',
      'Three pathways in roots: apoplast, symplast, transmembrane',
      'Casparian strip structure and function',
      'Root pressure: mechanism and evidence (guttation, bleeding)',
      'Cohesion-tension theory: complete mechanism and evidence',
      'Stomatal opening and closing mechanism',
      'Factors affecting transpiration',
      'Xerophytic adaptations',
      'Pressure flow hypothesis in phloem',
      'Source and sink concept',
      'Phloem loading and unloading',
      'Comparison table: Xylem vs Phloem transport',
      'Guttation and its significance',
      'Mineral uptake by roots'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 11',
    estimatedStudyMinutes: 360,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Root Cross Section: Water Pathways',
        description: 'Detailed diagram showing apoplast, symplast, and transmembrane pathways with Casparian strip'
      },
      {
        type: 'animation',
        title: 'Cohesion-Tension Theory',
        description: 'Animation of water transport from root to leaf via transpiration pull'
      },
      {
        type: 'diagram',
        title: 'Stomatal Mechanism',
        description: 'Guard cell structure and mechanism of opening/closing with K⁺ movement'
      },
      {
        type: 'animation',
        title: 'Pressure Flow in Phloem',
        description: 'Visualization of sucrose loading at source and unloading at sink with pressure gradient'
      },
      {
        type: 'comparison',
        title: 'Plasmolysis Stages',
        description: 'Side-by-side comparison of turgid cell, incipient plasmolysis, and complete plasmolysis'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Transport in Plants',
      introduction: `Plants, being predominantly autotrophic organisms, must transport water, minerals, and organic nutrients across considerable distances—from the roots deep in the soil to the leaves at the top of the canopy, and vice versa. Unlike animals, plants lack a circulatory system with a pumping organ. Instead, they rely on specialized vascular tissues—xylem and phloem—and various physical and physiological processes to move substances throughout the plant body. Understanding transport mechanisms in plants reveals the elegant solutions evolved by nature to overcome the challenges of moving materials against gravity and across long distances without energy-intensive pumps.`,
      detailedNotes: `
# Transport in Plants

## Means of Transport

### Types of Transport
Plants employ various mechanisms to transport substances:

**1. Diffusion**
- Movement of molecules from high concentration to low concentration
- Passive process, no energy required
- Short-distance transport
- Examples: CO₂ entry into leaves, O₂ exit from leaves
- Rate depends on: concentration gradient, temperature, pressure

**2. Facilitated Diffusion**
- Movement through membrane proteins (carrier proteins, channel proteins)
- Passive transport along concentration gradient
- Specific for particular molecules
- Faster than simple diffusion
- Example: water movement through aquaporins

**3. Active Transport**
- Movement against concentration gradient
- Requires energy (ATP)
- Involves carrier proteins and pumps
- Example: mineral uptake by roots against concentration gradient
- Na⁺-K⁺ pump, H⁺-ATPase pump

**4. Osmosis**
- Movement of water across semipermeable membrane
- From high water potential (dilute solution) to low water potential (concentrated solution)
- Passive process
- Crucial for plant water relations

## Water Potential and Osmosis

### Water Potential (Ψ)
Water potential is the potential energy of water per unit volume relative to pure water at atmospheric pressure and ambient temperature.

**Components of Water Potential:**
- **Ψw = Ψs + Ψp + Ψm**
  - Ψw = total water potential
  - Ψs = solute potential (osmotic potential) - always negative
  - Ψp = pressure potential (turgor pressure) - positive in turgid cells
  - Ψm = matric potential (negligible in most cases)

**Key Concepts:**
- Pure water has the highest water potential (Ψ = 0 MPa at standard conditions)
- Addition of solutes decreases water potential (makes it more negative)
- Water moves from higher Ψ to lower Ψ
- At equilibrium, Ψ is equal on both sides

### Plant Cell and Water Relations

**Plasmolysis**
- Shrinkage of protoplast away from cell wall when placed in hypertonic solution
- Cell loses water, protoplast contracts
- Ψ of cell becomes more negative than surroundings
- Types: Incipient plasmolysis (just begins), Complete plasmolysis (full separation)

**Deplasmolysis**
- Reversal of plasmolysis when cell is placed in hypotonic solution
- Cell regains turgidity

**Turgor Pressure**
- Pressure exerted by protoplast against cell wall
- Provides mechanical support to non-woody tissues
- Important for cell enlargement and growth
- Drives stomatal opening

## Long Distance Transport: Xylem

### Structure of Xylem
- **Tracheids**: elongated cells with tapered ends, found in gymnosperms and angiosperms
- **Vessels**: shorter, wider cells arranged end-to-end forming continuous tubes, mainly in angiosperms
- **Xylem parenchyma**: storage and lateral transport
- **Xylem fibers**: provide mechanical support

### Water Absorption by Roots

**Pathways of Water Movement in Roots:**

**1. Apoplast Pathway**
- Movement through cell walls and intercellular spaces
- Does not cross plasma membrane
- Faster route
- Blocked by Casparian strip in endodermis
- Non-living pathway

**2. Symplast Pathway**
- Movement through cytoplasm via plasmodesmata
- Crosses plasma membrane initially
- Living pathway
- Allows selective absorption

**3. Transmembrane Pathway**
- Crosses plasma membrane multiple times
- Both active and passive transport
- Highly selective

**Casparian Strip:**
- Waxy, suberin-impregnated band in radial and transverse walls of endodermal cells
- Forces all water to enter symplast pathway
- Acts as checkpoint for mineral uptake
- Prevents backflow of water and minerals

### Mechanisms of Water Transport in Xylem

**1. Root Pressure**
- Positive pressure developing in roots due to active mineral uptake
- Creates osmotic gradient, water follows by osmosis
- Builds up in xylem vessels
- Evidence: guttation (exudation of xylem sap from leaf margins) and bleeding (xylem sap oozing from cut stems)
- Limitations: 
  - Small magnitude (1-2 bar), insufficient to push water to tall trees
  - Absent in many plants during rapid transpiration
  - Does not occur in all seasons

**2. Transpiration Pull (Cohesion-Tension Theory)**
Proposed by Dixon and Joly, this is the main mechanism explaining water ascent in tall trees.

**Key Components:**
- **Transpiration**: Loss of water vapor from aerial parts, mainly through stomata
- **Cohesion**: Strong attraction between water molecules due to hydrogen bonding
- **Adhesion**: Attraction between water molecules and xylem wall
- **Tension**: Negative pressure (pull) created by transpiration

**Mechanism:**
1. Water evaporates from mesophyll cells in leaf
2. Creates tension (negative pressure) in xylem of leaf
3. Tension is transmitted down the continuous water column
4. Water molecules cohesively held together; column doesn't break
5. Water is pulled up from roots to leaves
6. Water is absorbed from soil to replace water lost by transpiration

**Evidence Supporting Cohesion-Tension Theory:**
- Extremely strong cohesive force of water (can withstand tension up to 15,000 atm)
- Narrow diameter of xylem vessels increases capillary action
- Transpiration rate correlates with water uptake rate
- Trunk diameter decreases slightly during peak transpiration (due to tension)

**3. Capillarity**
- Water rises in narrow tubes due to adhesion and cohesion
- Contributes to water ascent but alone insufficient
- More effective in narrow xylem vessels
- Can account for rise up to ~1 meter

## Transpiration

### Definition and Significance
Transpiration is the loss of water in the form of vapor from aerial parts of plants, primarily through stomata.

**Significance:**
- Creates transpiration pull for water ascent
- Cools the plant (evaporative cooling)
- Maintains turgidity of cells
- Enables mineral uptake and distribution
- Maintains water balance

**Types of Transpiration:**
1. **Stomatal Transpiration** (90-95%): through stomata
2. **Cuticular Transpiration** (3-10%): through cuticle
3. **Lenticular Transpiration** (<1%): through lenticels in woody stems

### Stomatal Structure and Function

**Structure:**
- Guard cells: kidney-shaped (dicots) or dumbbell-shaped (monocots)
- Contain chloroplasts (unlike other epidermal cells)
- Unevenly thickened cell walls (thicker on inner side)
- Stomatal pore between two guard cells
- Subsidiary cells: support guard cells

**Mechanism of Stomatal Opening and Closing:**

**Opening (Daytime in most plants):**
1. Light triggers active K⁺ uptake by guard cells
2. H⁺-ATPase pumps H⁺ out, creating electrochemical gradient
3. K⁺ channels open, K⁺ enters guard cells
4. Organic acids (malate) synthesized in guard cells
5. Solute concentration increases, water potential decreases
6. Water enters by osmosis
7. Guard cells become turgid
8. Due to uneven wall thickness, guard cells curve outward
9. Stomatal pore opens

**Closing (Nighttime or water stress):**
1. Reverse process occurs
2. K⁺ and malate exit guard cells
3. Water potential increases
4. Water leaves by osmosis
5. Guard cells become flaccid
6. Stomatal pore closes

**Factors Affecting Transpiration:**
- **Light**: increases transpiration (stomata open)
- **Temperature**: higher temperature increases evaporation
- **Humidity**: higher humidity reduces transpiration
- **Wind**: moderate wind increases, strong wind may cause stomatal closure
- **Soil water availability**: water stress causes stomatal closure
- **CO₂ concentration**: high CO₂ causes stomatal closure

### Adaptations to Reduce Transpiration

**Xerophytes** (desert plants):
- Thick cuticle
- Sunken stomata
- Reduced leaf surface area
- Leaf rolling
- Presence of trichomes (hairs)
- CAM photosynthesis (stomata open at night)

## Transport of Food: Phloem

### Structure of Phloem
- **Sieve tube elements**: conducting cells, lack nucleus at maturity, perforated end walls (sieve plates)
- **Companion cells**: metabolically active, connected to sieve tubes via plasmodesmata, provide energy
- **Phloem parenchyma**: storage
- **Phloem fibers**: support

### Translocation in Phloem

**Characteristics:**
- Bidirectional (can move up or down)
- Transports organic nutrients (mainly sucrose) and hormones
- From source (site of synthesis/storage) to sink (site of utilization/storage)
- Examples: 
  - Source: photosynthetic leaves, storage organs releasing nutrients
  - Sink: growing roots, fruits, flowers, storage organs accumulating nutrients

### Pressure Flow Hypothesis (Mass Flow Hypothesis)
Proposed by Ernst Münch, explains translocation mechanism.

**Mechanism:**
1. **At Source (e.g., leaf):**
   - Sucrose is actively loaded into sieve tubes
   - Increases solute concentration
   - Water potential decreases
   - Water enters by osmosis from xylem
   - Pressure increases (turgor pressure)

2. **At Sink (e.g., root):**
   - Sucrose is actively unloaded and used/stored
   - Solute concentration decreases
   - Water potential increases
   - Water leaves and returns to xylem
   - Pressure decreases

3. **Flow:**
   - Pressure gradient from source to sink
   - Sap flows from high pressure (source) to low pressure (sink)
   - Bulk flow of solution

**Evidence:**
- Sieve tube sap is under positive pressure (exudes when cut)
- Sucrose concentration gradient exists from source to sink
- Removal of phloem ring (girdling) stops translocation

**Limitations:**
- Requires metabolic energy for loading and unloading
- Doesn't fully explain bidirectional simultaneous transport in same sieve tube

### Phloem Loading and Unloading

**Loading at Source:**
- **Apoplastic loading**: sucrose transported across membrane into sieve tubes
- **Symplastic loading**: sucrose moves through plasmodesmata
- Requires H⁺-sucrose cotransporter
- Energy-dependent process

**Unloading at Sink:**
- Reversal of loading
- Can be apoplastic or symplastic
- Sucrose converted to starch, used in respiration, or incorporated into structural components

## Comparison: Xylem vs. Phloem Transport

| Feature | Xylem | Phloem |
|---------|-------|--------|
| Material transported | Water and minerals | Organic nutrients (mainly sucrose) |
| Direction | Unidirectional (upward) | Bidirectional |
| Mechanism | Transpiration pull, root pressure | Pressure flow |
| Conducting cells | Tracheids, vessels (dead) | Sieve tubes (living) |
| Energy requirement | Passive (except mineral uptake) | Active (loading/unloading) |
| Pressure | Negative (tension) | Positive |

## Mineral Uptake and Transport

**Mineral Absorption:**
- Mainly through roots
- Both passive and active uptake
- Active transport against concentration gradient (requires ATP)
- Selective uptake through specific carriers

**Factors Affecting Mineral Uptake:**
- Concentration of minerals in soil
- Soil pH
- Aeration of soil
- Temperature
- Interaction between minerals

**Transport to Shoot:**
- Minerals absorbed by roots
- Enter xylem via symplast or apoplast pathway
- Transported upward with transpiration stream
- Redistributed through phloem as needed

## Guttation
- Exudation of liquid water droplets from leaf margins
- Occurs through hydathodes (water stomata)
- Happens when root pressure is high and transpiration is low
- Common in early morning
- Indicates root pressure mechanism

## Practical Applications

**Girdling (Ringing):**
- Removal of phloem tissue in a ring around stem
- Stops downward translocation of food
- Used to increase fruit size (food accumulates above girdle)
- Can kill plant if done completely

**Hydroponics:**
- Growing plants in nutrient solution without soil
- Demonstrates mineral requirements
- Used commercially for vegetable production
`,
      keyConcepts: [
        'Water potential (Ψw) = Ψs + Ψp + Ψm',
        'Water moves from higher to lower water potential',
        'Plasmolysis: protoplast shrinks in hypertonic solution',
        'Turgor pressure provides mechanical support',
        'Three pathways in roots: apoplast, symplast, transmembrane',
        'Casparian strip forces water into symplast pathway',
        'Root pressure: positive pressure due to active mineral uptake',
        'Transpiration pull (cohesion-tension theory): main mechanism for water ascent',
        'Cohesion: H-bonding between water molecules',
        'Adhesion: attraction between water and xylem walls',
        'Guttation: liquid water exudation through hydathodes',
        'Stomatal opening: K⁺ uptake, water enters, guard cells turgid',
        'Stomatal closing: K⁺ exit, water leaves, guard cells flaccid',
        'Transpiration: 90-95% stomatal, 3-10% cuticular',
        'Phloem translocates organic nutrients bidirectionally',
        'Pressure flow hypothesis: explains phloem transport',
        'Source: site of synthesis; Sink: site of utilization',
        'Phloem loading and unloading require energy'
      ],
      formulas: [
        'Water potential: Ψw = Ψs + Ψp + Ψm',
        'Solute potential: Ψs = -iCRT (always negative)',
        'DPD (Diffusion Pressure Deficit) = OP - TP (older terminology)',
        'At plasmolysis: Ψp = 0, so Ψw = Ψs',
        'At full turgidity: Ψp = -Ψs, so Ψw = 0'
      ],
      learningObjectives: [
        'Understand different means of transport in plants (diffusion, osmosis, active transport)',
        'Explain water potential and its components',
        'Describe plasmolysis and turgor pressure',
        'Explain pathways of water movement in roots',
        'Understand the role of Casparian strip',
        'Explain mechanisms of water transport: root pressure and transpiration pull',
        'Describe the cohesion-tension theory in detail',
        'Understand stomatal mechanism and factors affecting transpiration',
        'Explain translocation in phloem using pressure flow hypothesis',
        'Compare xylem and phloem transport mechanisms',
        'Understand mineral uptake and transport'
      ],
      prerequisites: [
        'Understanding of plant tissues (xylem, phloem)',
        'Concept of osmosis and diffusion',
        'Knowledge of plant anatomy (root, stem, leaf)',
        'Understanding of cell structure and membrane transport',
        'Basic chemistry: hydrogen bonding'
      ],
      importantTopics: [
        'Water potential equation and components',
        'Plasmolysis and deplasmolysis',
        'Three pathways in roots: apoplast, symplast, transmembrane',
        'Casparian strip structure and function',
        'Root pressure: mechanism and evidence (guttation, bleeding)',
        'Cohesion-tension theory: complete mechanism and evidence',
        'Stomatal opening and closing mechanism',
        'Factors affecting transpiration',
        'Xerophytic adaptations',
        'Pressure flow hypothesis in phloem',
        'Source and sink concept',
        'Phloem loading and unloading',
        'Comparison table: Xylem vs Phloem transport',
        'Guttation and its significance',
        'Mineral uptake by roots'
      ],
      ncertChapterRef: 'Class 11 Biology, Chapter 11',
      estimatedStudyMinutes: 360,
      difficultyLevel: 4,
      status: 'published',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Root Cross Section: Water Pathways',
          description: 'Detailed diagram showing apoplast, symplast, and transmembrane pathways with Casparian strip'
        },
        {
          type: 'animation',
          title: 'Cohesion-Tension Theory',
          description: 'Animation of water transport from root to leaf via transpiration pull'
        },
        {
          type: 'diagram',
          title: 'Stomatal Mechanism',
          description: 'Guard cell structure and mechanism of opening/closing with K⁺ movement'
        },
        {
          type: 'animation',
          title: 'Pressure Flow in Phloem',
          description: 'Visualization of sucrose loading at source and unloading at sink with pressure gradient'
        },
        {
          type: 'comparison',
          title: 'Plasmolysis Stages',
          description: 'Side-by-side comparison of turgid cell, incipient plasmolysis, and complete plasmolysis'
        }
      ]
    }
  });

  console.log('✅ Biology Chapter 11: Transport in Plants seeded successfully!');
}

seedBiologyChapter11()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
