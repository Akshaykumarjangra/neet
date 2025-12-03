import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter13() {
  console.log('Seeding Biology Class 11 Chapter 13: Photosynthesis in Higher Plants...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 13,
    chapterTitle: 'Photosynthesis in Higher Plants',
    introduction: `Photosynthesis is the biochemical process by which green plants, algae, and some bacteria convert light energy into chemical energy stored in organic compounds. This remarkable process is the foundation of life on Earth, providing oxygen for respiration and organic matter for food chains. The term "photosynthesis" literally means "synthesis with the help of light." Through photosynthesis, plants transform carbon dioxide and water into glucose and oxygen using sunlight energy. Understanding photosynthesis is crucial not only for plant biology but also for addressing global challenges like food security and climate change.`,

    detailedNotes: `
# Photosynthesis in Higher Plants

## Overview and Historical Background

**Overall Equation:**
6CO₂ + 12H₂O + Light energy → C₆H₁₂O₆ + 6O₂ + 6H₂O

**Key Historical Discoveries:**
- **Jan Ingenhousz (1779)**: Demonstrated that plants release O₂ only in sunlight
- **Julius von Sachs (1862)**: Showed that starch is produced during photosynthesis
- **T.W. Engelmann (1882)**: Identified chlorophyll's role using aerobic bacteria and algae
- **C.B. van Niel (1930s)**: Proposed that O₂ comes from water, not CO₂
- **Ruben and Kamen (1941)**: Used ¹⁸O isotope to confirm O₂ comes from H₂O
- **Melvin Calvin (1950s)**: Elucidated the dark reaction pathway (Calvin cycle)

## Site of Photosynthesis: The Chloroplast

**Chloroplast Structure:**
- Double membrane organelle (outer and inner membrane)
- **Stroma**: Aqueous matrix containing enzymes for dark reactions
- **Thylakoids**: Flattened membranous sacs arranged in stacks called grana (singular: granum)
- **Grana**: Stacks of thylakoids where light reactions occur
- **Stroma lamellae**: Thylakoids connecting different grana
- Contains own DNA (circular), ribosomes (70S), and enzymes

## Photosynthetic Pigments

**Types of Pigments:**

**1. Chlorophylls** (Primary pigments)
- **Chlorophyll a**: Blue-green, universal in all photosynthetic organisms, absorption peaks at 430 nm and 662 nm
- **Chlorophyll b**: Yellow-green, accessory pigment, absorption peaks at 453 nm and 642 nm
- Structure: Porphyrin ring with Mg²⁺ at center, long phytol tail

**2. Carotenoids** (Accessory pigments)
- **Carotenes**: Orange (β-carotene)
- **Xanthophylls**: Yellow
- Absorb light in blue-green region (400-550 nm)
- Protect chlorophyll from photo-oxidation
- Transfer absorbed energy to chlorophyll a

**Absorption and Action Spectrum:**
- **Absorption spectrum**: Graph of light absorption vs wavelength for a pigment
- **Action spectrum**: Graph of photosynthetic rate vs wavelength
- Action spectrum closely matches combined absorption of all pigments

## Light Reactions (Photochemical Phase)

Light reactions occur in thylakoid membranes and convert light energy into chemical energy (ATP and NADPH).

### Photosystems

**Photosystem II (P680)**
- Absorbs light at 680 nm
- Located in grana thylakoids
- Involved in photolysis of water
- Reaction center: P680

**Photosystem I (P700)**
- Absorbs light at 700 nm
- Located in stroma lamellae and grana
- Reduces NADP⁺ to NADPH
- Reaction center: P700

### Z-Scheme (Non-Cyclic Photophosphorylation)

**Sequence of Events:**

1. **Photosystem II Activation**
   - Light excites P680 chlorophyll
   - Electrons reach higher energy level
   - Electrons accepted by primary electron acceptor (pheophytin)

2. **Water Splitting (Photolysis)**
   - 2H₂O → 4H⁺ + 4e⁻ + O₂
   - Occurs in lumen of thylakoid
   - Requires Mn²⁺ and Cl⁻ ions
   - Oxygen-evolving complex (OEC)
   - Source of atmospheric oxygen

3. **Electron Transport Chain**
   - Electrons flow through: Pheophytin → Plastoquinone (PQ) → Cytochrome b₆f complex → Plastocyanin (PC)
   - During transport, H⁺ ions pumped into thylakoid lumen
   - Creates proton gradient

4. **Photosystem I Activation**
   - Light excites P700
   - Electrons reach higher energy level
   - Accepted by primary acceptor (A₀)

5. **NADP⁺ Reduction**
   - Electrons flow through: Ferredoxin (Fd) → Ferredoxin-NADP⁺ reductase (FNR)
   - 2e⁻ + 2H⁺ + NADP⁺ → NADPH + H⁺

6. **ATP Synthesis (Photophosphorylation)**
   - Proton gradient drives ATP synthesis
   - H⁺ flows through ATP synthase (CF₀-CF₁ complex)
   - Chemiosmotic hypothesis (Peter Mitchell)
   - ADP + Pi → ATP

**Products of Non-Cyclic Photophosphorylation:**
- ATP
- NADPH + H⁺
- O₂ (as by-product)

### Cyclic Photophosphorylation

- Involves only Photosystem I
- Electrons from P700 return to P700 via electron transport chain
- No NADPH production
- No O₂ evolution
- Only ATP produced
- Occurs when NADP⁺ is not available or when cells need extra ATP

## Dark Reactions (Biosynthetic Phase / Calvin Cycle)

Dark reactions occur in stroma and use ATP and NADPH to fix CO₂ into glucose.

### Calvin Cycle (C₃ Pathway)

**Three Stages:**

**1. Carboxylation (CO₂ Fixation)**
- Enzyme: **RuBisCO** (Ribulose-1,5-bisphosphate carboxylase/oxygenase)
- Most abundant enzyme on Earth
- CO₂ acceptor: Ribulose-1,5-bisphosphate (RuBP, 5C)
- Reaction: RuBP (5C) + CO₂ (1C) → 2 molecules of 3-phosphoglycerate (3-PGA, 3C)
- First stable product: 3-PGA (3-carbon compound, hence "C₃")

**2. Reduction**
- 3-PGA reduced to glyceraldehyde-3-phosphate (G3P)
- Uses ATP and NADPH from light reactions
- For every 6 CO₂ fixed: 12 G3P produced
- 10 G3P used to regenerate RuBP
- 2 G3P exit cycle to form glucose

**3. Regeneration of RuBP**
- 10 G3P (3C) rearranged to form 6 RuBP (5C)
- Uses ATP
- Regeneration ensures continuation of cycle

**Overall Equation for Calvin Cycle:**
- To produce 1 glucose (6C): 6 CO₂ fixed
- Requires: 18 ATP + 12 NADPH
- 6 turns of cycle needed

### C₄ Pathway (Hatch-Slack Pathway)

**Significance:**
- Adaptation to hot, dry climates
- Minimizes photorespiration
- Higher photosynthetic efficiency under high light, temperature
- Found in: sugarcane, maize, sorghum

**Leaf Anatomy:**
- **Kranz anatomy**: Bundle sheath cells surrounded by mesophyll cells in wreath-like manner
- Bundle sheath cells: thick-walled, large chloroplasts with reduced grana
- Mesophyll cells: normal chloroplasts

**Mechanism:**

**Step 1: CO₂ Fixation in Mesophyll Cells**
- Enzyme: **PEP carboxylase** (phosphoenolpyruvate carboxylase)
- CO₂ acceptor: PEP (3C)
- First product: Oxaloacetate (OAA, 4C) - hence "C₄"
- OAA reduced to malate or converted to aspartate

**Step 2: Decarboxylation in Bundle Sheath Cells**
- C₄ acids (malate/aspartate) transported to bundle sheath cells
- Decarboxylation releases CO₂
- CO₂ enters Calvin cycle (same as C₃)
- Pyruvate (3C) returns to mesophyll cells
- Pyruvate regenerated to PEP using ATP

**Advantages:**
- PEP carboxylase has no oxygenase activity (no photorespiration)
- Higher CO₂ concentration in bundle sheath cells
- Can concentrate CO₂ 10-60 times atmospheric levels
- Efficient under high temperatures
- Better water use efficiency (stomata open less)

### CAM Pathway (Crassulacean Acid Metabolism)

**Found in:** Succulents (cacti, pineapple, Agave) - xerophytes

**Temporal Separation:**

**Night:**
- Stomata open (reduced water loss)
- CO₂ fixed via PEP carboxylase
- Forms OAA → Malate
- Malate stored in vacuoles as malic acid

**Day:**
- Stomata closed (conserve water)
- Malate released from vacuoles
- Decarboxylation releases CO₂
- CO₂ enters Calvin cycle
- Similar to C₄ but temporal instead of spatial separation

**Advantages:**
- Extreme water conservation
- Stomata closed during day
- Survival in arid environments

## Photorespiration

**Definition:** Light-dependent uptake of O₂ and release of CO₂ by photosynthetic organs, without ATP production

**Mechanism:**
- Occurs when RuBisCO binds O₂ instead of CO₂
- RuBP + O₂ → 3-PGA (3C) + 2-phosphoglycolate (2C)
- 2-phosphoglycolate pathway involves chloroplasts, peroxisomes, and mitochondria
- Releases CO₂ (loss of previously fixed carbon)
- Consumes energy (ATP)
- No useful products

**Factors Favoring Photorespiration:**
- High O₂ concentration
- Low CO₂ concentration
- High temperature (increases O₂ solubility, decreases CO₂ solubility)

**Significance:**
- Wasteful process (energy loss, carbon loss)
- C₄ and CAM plants avoid photorespiration
- May have protective role against photoinhibition

## Factors Affecting Photosynthesis

### Law of Limiting Factors
Proposed by Blackman (1905): Rate of physiological process is limited by the factor present in minimum quantity.

**Major Factors:**

**1. Light Intensity**
- At low light: photosynthesis increases linearly with light intensity
- At high light: saturation reached, no further increase
- Light saturation point differs for sun vs shade plants
- Light compensation point: light intensity where photosynthesis = respiration

**2. Carbon Dioxide Concentration**
- Atmospheric CO₂: ~0.03-0.04%
- Increasing CO₂ to 0.05-0.1% increases photosynthesis (used in greenhouses)
- Above 1%, stomata close, photosynthesis decreases
- CO₂ is often limiting factor in nature

**3. Temperature**
- Optimum: 25-35°C for most plants
- C₄ plants have higher optimum (30-45°C)
- Low temperature: enzyme activity reduced
- High temperature: enzyme denaturation, increased photorespiration

**4. Water**
- Substrate for photosynthesis
- Maintains turgidity
- Deficiency causes stomatal closure
- Indirectly limits photosynthesis

**5. Chlorophyll**
- More chlorophyll generally means higher photosynthesis
- Depends on mineral nutrition (N, Mg, Fe)

## Comparison Tables

### C₃ vs C₄ vs CAM Plants

| Feature | C₃ | C₄ | CAM |
|---------|-----|-----|-----|
| First product | 3-PGA (3C) | OAA (4C) | OAA (4C) |
| CO₂ acceptor | RuBP (5C) | PEP (3C) | PEP (3C) |
| CO₂ fixing enzyme | RuBisCO | PEP carboxylase | PEP carboxylase |
| Leaf anatomy | Normal | Kranz anatomy | Normal succulent |
| Photorespiration | Present | Minimal | Minimal |
| CO₂ compensation point | 50 ppm | 5-10 ppm | Low |
| Water use efficiency | Low | High | Very high |
| Separation | None | Spatial (2 cell types) | Temporal (day/night) |
| Optimum temp | 20-25°C | 30-45°C | 35°C |
| Examples | Rice, wheat, soybean | Maize, sugarcane | Cactus, pineapple |

### Light vs Dark Reactions

| Feature | Light Reactions | Dark Reactions |
|---------|----------------|----------------|
| Location | Thylakoid membranes | Stroma |
| Light requirement | Required | Not required (but use light products) |
| Products | ATP, NADPH, O₂ | Glucose |
| Input | H₂O, NADP⁺, ADP, Pi | CO₂, ATP, NADPH |
| Temperature sensitive | Less | More (enzyme-controlled) |
| Photosystems | PSI, PSII | None |
`,

    keyConcepts: [
      'Photosynthesis equation: 6CO₂ + 12H₂O + Light → C₆H₁₂O₆ + 6O₂ + 6H₂O',
      'O₂ comes from water splitting (photolysis), not CO₂',
      'Chloroplast: stroma (dark reactions) and thylakoids (light reactions)',
      'Chlorophyll a: universal primary pigment (P680, P700)',
      'Carotenoids: accessory pigments, protect from photo-oxidation',
      'Photosystem II (P680): water splitting, electron source',
      'Photosystem I (P700): NADPH production',
      'Z-scheme: non-cyclic photophosphorylation produces ATP, NADPH, O₂',
      'Cyclic photophosphorylation: only PSI, produces only ATP',
      'Calvin cycle: RuBisCO, first product 3-PGA (C₃)',
      'C₄ pathway: PEP carboxylase, first product OAA (C₄), Kranz anatomy',
      'CAM pathway: temporal separation, stomata open at night',
      'Photorespiration: wasteful, RuBisCO binds O₂, occurs at high temp',
      'Law of limiting factors (Blackman): rate limited by minimum factor',
      'Light reactions: photochemical, produce ATP and NADPH',
      'Dark reactions: biosynthetic, fix CO₂ to glucose using ATP/NADPH',
      'C₄ advantages: no photorespiration, high CO₂ concentration',
      '18 ATP + 12 NADPH needed to produce 1 glucose molecule'
    ],

    formulas: [
      'Overall: 6CO₂ + 12H₂O + Light → C₆H₁₂O₆ + 6O₂ + 6H₂O',
      'Photolysis: 2H₂O → 4H⁺ + 4e⁻ + O₂',
      'NADP⁺ reduction: 2e⁻ + 2H⁺ + NADP⁺ → NADPH + H⁺',
      'Carboxylation: RuBP (5C) + CO₂ → 2 × 3-PGA (3C)',
      'C₄ fixation: PEP (3C) + CO₂ → OAA (4C)',
      'Photorespiration: RuBP + O₂ → 3-PGA + 2-phosphoglycolate'
    ],

    learningObjectives: [
      'Understand the overall process and equation of photosynthesis',
      'Describe chloroplast structure and its role in photosynthesis',
      'Explain the role of photosynthetic pigments',
      'Understand light reactions: photosystems, Z-scheme, ATP synthesis',
      'Explain water splitting and oxygen evolution',
      'Describe dark reactions: Calvin cycle and its three stages',
      'Differentiate between C₃, C₄, and CAM pathways',
      'Understand photorespiration and its significance',
      'Explain factors affecting rate of photosynthesis',
      'Apply law of limiting factors to photosynthesis'
    ],

    prerequisites: [
      'Understanding of chloroplast structure',
      'Basic knowledge of enzymes and enzyme kinetics',
      'Concept of ATP as energy currency',
      'Understanding of redox reactions',
      'Knowledge of leaf anatomy'
    ],

    importantTopics: [
      'Overall photosynthesis equation and its significance',
      'Historical experiments confirming O₂ from H₂O',
      'Chloroplast structure: stroma, grana, thylakoids',
      'Photosynthetic pigments: chlorophyll a, b, carotenoids',
      'Absorption and action spectra',
      'Photosystem I (P700) and Photosystem II (P680)',
      'Z-scheme: non-cyclic photophosphorylation',
      'Cyclic photophosphorylation',
      'Photolysis of water (water splitting)',
      'Chemiosmotic hypothesis and ATP synthesis',
      'Calvin cycle: three stages (carboxylation, reduction, regeneration)',
      'RuBisCO enzyme and its dual function',
      'C₄ pathway: PEP carboxylase, Kranz anatomy',
      'CAM pathway: temporal separation',
      'Photorespiration: mechanism and significance',
      'Comparison: C₃ vs C₄ vs CAM plants',
      'Factors affecting photosynthesis',
      'Law of limiting factors'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 13',
    estimatedStudyMinutes: 420,
    difficultyLevel: 5,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Chloroplast Structure',
        description: 'Detailed cross-section showing outer/inner membrane, stroma, grana, thylakoids'
      },
      {
        type: 'graph',
        title: 'Absorption and Action Spectra',
        description: 'Overlapping graphs of pigment absorption vs photosynthetic action spectrum'
      },
      {
        type: 'flowchart',
        title: 'Z-Scheme of Light Reactions',
        description: 'Electron flow through PSI, PSII with energy levels and ATP/NADPH production'
      },
      {
        type: 'diagram',
        title: 'Calvin Cycle',
        description: 'Three stages: carboxylation, reduction, regeneration with ATP/NADPH usage'
      },
      {
        type: 'comparison',
        title: 'C₃ vs C₄ vs CAM Pathways',
        description: 'Side-by-side comparison of mechanisms, leaf anatomy, and adaptations'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Photosynthesis in Higher Plants',
      detailedNotes: `
# Photosynthesis in Higher Plants

## Overview and Historical Background

**Overall Equation:**
6CO₂ + 12H₂O + Light energy → C₆H₁₂O₆ + 6O₂ + 6H₂O

**Key Historical Discoveries:**
- **Jan Ingenhousz (1779)**: Demonstrated that plants release O₂ only in sunlight
- **Julius von Sachs (1862)**: Showed that starch is produced during photosynthesis
- **T.W. Engelmann (1882)**: Identified chlorophyll's role using aerobic bacteria and algae
- **C.B. van Niel (1930s)**: Proposed that O₂ comes from water, not CO₂
- **Ruben and Kamen (1941)**: Used ¹⁸O isotope to confirm O₂ comes from H₂O
- **Melvin Calvin (1950s)**: Elucidated the dark reaction pathway (Calvin cycle)

## Site of Photosynthesis: The Chloroplast

**Chloroplast Structure:**
- Double membrane organelle (outer and inner membrane)
- **Stroma**: Aqueous matrix containing enzymes for dark reactions
- **Thylakoids**: Flattened membranous sacs arranged in stacks called grana (singular: granum)
- **Grana**: Stacks of thylakoids where light reactions occur
- **Stroma lamellae**: Thylakoids connecting different grana
- Contains own DNA (circular), ribosomes (70S), and enzymes

## Photosynthetic Pigments

**Types of Pigments:**

**1. Chlorophylls** (Primary pigments)
- **Chlorophyll a**: Blue-green, universal in all photosynthetic organisms, absorption peaks at 430 nm and 662 nm
- **Chlorophyll b**: Yellow-green, accessory pigment, absorption peaks at 453 nm and 642 nm
- Structure: Porphyrin ring with Mg²⁺ at center, long phytol tail

**2. Carotenoids** (Accessory pigments)
- **Carotenes**: Orange (β-carotene)
- **Xanthophylls**: Yellow
- Absorb light in blue-green region (400-550 nm)
- Protect chlorophyll from photo-oxidation
- Transfer absorbed energy to chlorophyll a

**Absorption and Action Spectrum:**
- **Absorption spectrum**: Graph of light absorption vs wavelength for a pigment
- **Action spectrum**: Graph of photosynthetic rate vs wavelength
- Action spectrum closely matches combined absorption of all pigments

## Light Reactions (Photochemical Phase)

Light reactions occur in thylakoid membranes and convert light energy into chemical energy (ATP and NADPH).

### Photosystems

**Photosystem II (P680)**
- Absorbs light at 680 nm
- Located in grana thylakoids
- Involved in photolysis of water
- Reaction center: P680

**Photosystem I (P700)**
- Absorbs light at 700 nm
- Located in stroma lamellae and grana
- Reduces NADP⁺ to NADPH
- Reaction center: P700

### Z-Scheme (Non-Cyclic Photophosphorylation)

**Sequence of Events:**

1. **Photosystem II Activation**
   - Light excites P680 chlorophyll
   - Electrons reach higher energy level
   - Electrons accepted by primary electron acceptor (pheophytin)

2. **Water Splitting (Photolysis)**
   - 2H₂O → 4H⁺ + 4e⁻ + O₂
   - Occurs in lumen of thylakoid
   - Requires Mn²⁺ and Cl⁻ ions
   - Oxygen-evolving complex (OEC)
   - Source of atmospheric oxygen

3. **Electron Transport Chain**
   - Electrons flow through: Pheophytin → Plastoquinone (PQ) → Cytochrome b₆f complex → Plastocyanin (PC)
   - During transport, H⁺ ions pumped into thylakoid lumen
   - Creates proton gradient

4. **Photosystem I Activation**
   - Light excites P700
   - Electrons reach higher energy level
   - Accepted by primary acceptor (A₀)

5. **NADP⁺ Reduction**
   - Electrons flow through: Ferredoxin (Fd) → Ferredoxin-NADP⁺ reductase (FNR)
   - 2e⁻ + 2H⁺ + NADP⁺ → NADPH + H⁺

6. **ATP Synthesis (Photophosphorylation)**
   - Proton gradient drives ATP synthesis
   - H⁺ flows through ATP synthase (CF₀-CF₁ complex)
   - Chemiosmotic hypothesis (Peter Mitchell)
   - ADP + Pi → ATP

**Products of Non-Cyclic Photophosphorylation:**
- ATP
- NADPH + H⁺
- O₂ (as by-product)

### Cyclic Photophosphorylation

- Involves only Photosystem I
- Electrons from P700 return to P700 via electron transport chain
- No NADPH production
- No O₂ evolution
- Only ATP produced
- Occurs when NADP⁺ is not available or when cells need extra ATP

## Dark Reactions (Biosynthetic Phase / Calvin Cycle)

Dark reactions occur in stroma and use ATP and NADPH to fix CO₂ into glucose.

### Calvin Cycle (C₃ Pathway)

**Three Stages:**

**1. Carboxylation (CO₂ Fixation)**
- Enzyme: **RuBisCO** (Ribulose-1,5-bisphosphate carboxylase/oxygenase)
- Most abundant enzyme on Earth
- CO₂ acceptor: Ribulose-1,5-bisphosphate (RuBP, 5C)
- Reaction: RuBP (5C) + CO₂ (1C) → 2 molecules of 3-phosphoglycerate (3-PGA, 3C)
- First stable product: 3-PGA (3-carbon compound, hence "C₃")

**2. Reduction**
- 3-PGA reduced to glyceraldehyde-3-phosphate (G3P)
- Uses ATP and NADPH from light reactions
- For every 6 CO₂ fixed: 12 G3P produced
- 10 G3P used to regenerate RuBP
- 2 G3P exit cycle to form glucose

**3. Regeneration of RuBP**
- 10 G3P (3C) rearranged to form 6 RuBP (5C)
- Uses ATP
- Regeneration ensures continuation of cycle

**Overall Equation for Calvin Cycle:**
- To produce 1 glucose (6C): 6 CO₂ fixed
- Requires: 18 ATP + 12 NADPH
- 6 turns of cycle needed

### C₄ Pathway (Hatch-Slack Pathway)

**Significance:**
- Adaptation to hot, dry climates
- Minimizes photorespiration
- Higher photosynthetic efficiency under high light, temperature
- Found in: sugarcane, maize, sorghum

**Leaf Anatomy:**
- **Kranz anatomy**: Bundle sheath cells surrounded by mesophyll cells in wreath-like manner
- Bundle sheath cells: thick-walled, large chloroplasts with reduced grana
- Mesophyll cells: normal chloroplasts

**Mechanism:**

**Step 1: CO₂ Fixation in Mesophyll Cells**
- Enzyme: **PEP carboxylase** (phosphoenolpyruvate carboxylase)
- CO₂ acceptor: PEP (3C)
- First product: Oxaloacetate (OAA, 4C) - hence "C₄"
- OAA reduced to malate or converted to aspartate

**Step 2: Decarboxylation in Bundle Sheath Cells**
- C₄ acids (malate/aspartate) transported to bundle sheath cells
- Decarboxylation releases CO₂
- CO₂ enters Calvin cycle (same as C₃)
- Pyruvate (3C) returns to mesophyll cells
- Pyruvate regenerated to PEP using ATP

**Advantages:**
- PEP carboxylase has no oxygenase activity (no photorespiration)
- Higher CO₂ concentration in bundle sheath cells
- Can concentrate CO₂ 10-60 times atmospheric levels
- Efficient under high temperatures
- Better water use efficiency (stomata open less)

### CAM Pathway (Crassulacean Acid Metabolism)

**Found in:** Succulents (cacti, pineapple, Agave) - xerophytes

**Temporal Separation:**

**Night:**
- Stomata open (reduced water loss)
- CO₂ fixed via PEP carboxylase
- Forms OAA → Malate
- Malate stored in vacuoles as malic acid

**Day:**
- Stomata closed (conserve water)
- Malate released from vacuoles
- Decarboxylation releases CO₂
- CO₂ enters Calvin cycle
- Similar to C₄ but temporal instead of spatial separation

**Advantages:**
- Extreme water conservation
- Stomata closed during day
- Survival in arid environments

## Photorespiration

**Definition:** Light-dependent uptake of O₂ and release of CO₂ by photosynthetic organs, without ATP production

**Mechanism:**
- Occurs when RuBisCO binds O₂ instead of CO₂
- RuBP + O₂ → 3-PGA (3C) + 2-phosphoglycolate (2C)
- 2-phosphoglycolate pathway involves chloroplasts, peroxisomes, and mitochondria
- Releases CO₂ (loss of previously fixed carbon)
- Consumes energy (ATP)
- No useful products

**Factors Favoring Photorespiration:**
- High O₂ concentration
- Low CO₂ concentration
- High temperature (increases O₂ solubility, decreases CO₂ solubility)

**Significance:**
- Wasteful process (energy loss, carbon loss)
- C₄ and CAM plants avoid photorespiration
- May have protective role against photoinhibition

## Factors Affecting Photosynthesis

### Law of Limiting Factors
Proposed by Blackman (1905): Rate of physiological process is limited by the factor present in minimum quantity.

**Major Factors:**

**1. Light Intensity**
- At low light: photosynthesis increases linearly with light intensity
- At high light: saturation reached, no further increase
- Light saturation point differs for sun vs shade plants
- Light compensation point: light intensity where photosynthesis = respiration

**2. Carbon Dioxide Concentration**
- Atmospheric CO₂: ~0.03-0.04%
- Increasing CO₂ to 0.05-0.1% increases photosynthesis (used in greenhouses)
- Above 1%, stomata close, photosynthesis decreases
- CO₂ is often limiting factor in nature

**3. Temperature**
- Optimum: 25-35°C for most plants
- C₄ plants have higher optimum (30-45°C)
- Low temperature: enzyme activity reduced
- High temperature: enzyme denaturation, increased photorespiration

**4. Water**
- Substrate for photosynthesis
- Maintains turgidity
- Deficiency causes stomatal closure
- Indirectly limits photosynthesis

**5. Chlorophyll**
- More chlorophyll generally means higher photosynthesis
- Depends on mineral nutrition (N, Mg, Fe)

## Comparison Tables

### C₃ vs C₄ vs CAM Plants

| Feature | C₃ | C₄ | CAM |
|---------|-----|-----|-----|
| First product | 3-PGA (3C) | OAA (4C) | OAA (4C) |
| CO₂ acceptor | RuBP (5C) | PEP (3C) | PEP (3C) |
| CO₂ fixing enzyme | RuBisCO | PEP carboxylase | PEP carboxylase |
| Leaf anatomy | Normal | Kranz anatomy | Normal succulent |
| Photorespiration | Present | Minimal | Minimal |
| CO₂ compensation point | 50 ppm | 5-10 ppm | Low |
| Water use efficiency | Low | High | Very high |
| Separation | None | Spatial (2 cell types) | Temporal (day/night) |
| Optimum temp | 20-25°C | 30-45°C | 35°C |
| Examples | Rice, wheat, soybean | Maize, sugarcane | Cactus, pineapple |

### Light vs Dark Reactions

| Feature | Light Reactions | Dark Reactions |
|---------|----------------|----------------|
| Location | Thylakoid membranes | Stroma |
| Light requirement | Required | Not required (but use light products) |
| Products | ATP, NADPH, O₂ | Glucose |
| Input | H₂O, NADP⁺, ADP, Pi | CO₂, ATP, NADPH |
| Temperature sensitive | Less | More (enzyme-controlled) |
| Photosystems | PSI, PSII | None |
`,
      estimatedStudyMinutes: 420,
      difficultyLevel: 5
    }
  });

  console.log('✅ Biology Chapter 13: Photosynthesis in Higher Plants seeded successfully!');
}

seedBiologyChapter13()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
