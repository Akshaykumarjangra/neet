import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter12() {
  console.log('Seeding Biology Class 11 Chapter 12: Mineral Nutrition...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 12,
    chapterTitle: 'Mineral Nutrition',
    introduction: `Plants require various inorganic nutrients for their growth, development, and metabolic activities. These essential elements, absorbed primarily from the soil as ions, play critical roles ranging from structural components to enzymatic cofactors. Unlike animals, plants must synthesize all their organic compounds from simple inorganic nutrients. Understanding mineral nutrition is fundamental to agriculture, horticulture, and plant physiology. This chapter explores the essential mineral elements, their functions, deficiency symptoms, and the fascinating process of nitrogen metabolism—a cornerstone of plant nutrition that enables plants to convert atmospheric nitrogen into proteins.`,

    detailedNotes: `
# Mineral Nutrition

## Essential Mineral Elements

### Criteria for Essentiality
For an element to be classified as essential for plants, it must satisfy three criteria proposed by Arnon and Stout:
1. **Absolute requirement**: Plant cannot complete its life cycle without the element
2. **Non-substitutable**: No other element can fulfill its specific function
3. **Direct involvement**: Element must be directly involved in plant metabolism or structure

### Classification of Essential Elements

**Based on Quantity Required:**

**1. Macronutrients (Required in large amounts, >10 mmol/kg dry weight)**
- Carbon (C), Hydrogen (H), Oxygen (O) - obtained from air and water
- Nitrogen (N), Phosphorus (P), Potassium (K), Calcium (Ca), Magnesium (Mg), Sulfur (S)

**2. Micronutrients (Required in trace amounts, <10 mmol/kg dry weight)**
- Iron (Fe), Manganese (Mn), Copper (Cu), Zinc (Zn), Boron (B), Molybdenum (Mo), Chlorine (Cl), Nickel (Ni)

**Based on Function:**

**1. Framework Elements**: C, H, O, N, S
- Form organic compounds (carbohydrates, proteins, lipids, nucleic acids)

**2. Energy-Related Elements**: Mg (chlorophyll), P (ATP)
- Involved in energy metabolism

**3. Enzyme Activators**: K, Ca, Mg, Mn, Zn, Cu, Mo, Cl
- Activate or constitute enzymes

## Functions of Essential Elements

### Macronutrients

**Nitrogen (N)**
- Component of amino acids, proteins, nucleic acids (DNA, RNA)
- Part of chlorophyll, vitamins (B-complex), hormones (auxins, cytokinins)
- Essential for cell division and growth
- Absorbed as: NO₃⁻ (nitrate) or NH₄⁺ (ammonium)

**Phosphorus (P)**
- Component of nucleic acids, phospholipids, ATP, NADP
- Part of sugar phosphates in photosynthesis and respiration
- Essential for energy transfer
- Important for root development and flowering
- Absorbed as: H₂PO₄⁻ or HPO₄²⁻

**Potassium (K)**
- Enzyme activator (60+ enzymes)
- Maintains cell turgidity and osmotic potential
- Opening and closing of stomata
- Protein synthesis, photosynthesis
- Important for disease resistance
- Absorbed as: K⁺

**Calcium (Ca)**
- Component of cell wall (calcium pectate in middle lamella)
- Membrane stabilizer
- Enzyme cofactor
- Regulates cell permeability
- Required for cell division (mitotic spindle formation)
- Absorbed as: Ca²⁺

**Magnesium (Mg)**
- Central atom of chlorophyll molecule
- Activator of enzymes (RuBisCO, PEP carboxylase)
- Required for ribosome integrity
- Involved in protein synthesis
- Absorbed as: Mg²⁺

**Sulfur (S)**
- Component of amino acids (cysteine, methionine)
- Part of coenzymes (CoA), vitamins (thiamine, biotin)
- Component of ferredoxin (photosynthesis)
- Required for chlorophyll synthesis
- Absorbed as: SO₄²⁻ (sulfate)

### Micronutrients

**Iron (Fe)**
- Component of cytochromes, ferredoxin
- Activator of catalase, peroxidase
- Essential for chlorophyll synthesis (though not a component)
- Required for nitrogen fixation
- Absorbed as: Fe²⁺ or Fe³⁺

**Manganese (Mn)**
- Activates enzymes involved in photosynthesis, respiration, nitrogen metabolism
- Essential for water-splitting reaction in Photosystem II
- Required for chlorophyll synthesis
- Absorbed as: Mn²⁺

**Zinc (Zn)**
- Activates enzymes (carbonic anhydrase, alcohol dehydrogenase)
- Essential for auxin (IAA) synthesis
- Required for protein synthesis
- Absorbed as: Zn²⁺

**Copper (Cu)**
- Component of plastocyanin (electron carrier in photosynthesis)
- Activates oxidase enzymes
- Important for lignin synthesis
- Absorbed as: Cu²⁺

**Boron (B)**
- Required for pollen germination and pollen tube growth
- Involved in translocation of sugars
- Essential for cell differentiation and development
- Uptake mechanism not fully understood

**Molybdenum (Mo)**
- Component of nitrogenase (nitrogen fixation)
- Component of nitrate reductase (nitrate reduction)
- Required in smallest amount
- Absorbed as: MoO₄²⁻

**Chlorine (Cl)**
- Required for photolysis of water (oxygen evolution)
- Maintains ionic balance
- Increases cell osmotic pressure
- Absorbed as: Cl⁻

**Nickel (Ni)**
- Component of urease enzyme
- Essential for nitrogen metabolism
- Required in very small amounts

## Deficiency Symptoms

### General Principles
- **Mobile elements** (N, P, K, Mg): Deficiency symptoms appear first in **older leaves** (element translocated to younger parts)
- **Immobile elements** (Ca, S, Fe, B, Cu, Mn): Deficiency symptoms appear first in **younger leaves** (element cannot be transported)

### Specific Deficiency Symptoms

**Nitrogen Deficiency**
- Chlorosis (yellowing) of older leaves
- Stunted growth, thin stems
- Reduced branching
- Early maturity

**Phosphorus Deficiency**
- Dark green leaves with purple/reddish coloration (anthocyanin accumulation)
- Delayed maturity
- Poor root development
- Reduced flowering and fruiting

**Potassium Deficiency**
- Marginal chlorosis and necrosis (death of tissue) starting from leaf tips
- Lodging in cereals (plants fall over)
- Reduced disease resistance

**Calcium Deficiency**
- Death of growing points (apical meristems)
- Young leaves deformed, hooked
- Blossom-end rot in tomatoes

**Magnesium Deficiency**
- Interveinal chlorosis in older leaves (veins remain green)
- Leaf curling

**Iron Deficiency**
- Interveinal chlorosis in younger leaves
- Severe chlorosis leading to white leaves

**Manganese Deficiency**
- Interveinal chlorosis
- Gray speck disease in oats

**Zinc Deficiency**
- Little leaf disease (small leaves)
- Rosetting (shortened internodes)
- Interveinal chlorosis

**Boron Deficiency**
- Death of terminal buds
- Heart rot in beets
- Brown heart in turnips

## Mechanism of Nutrient Absorption

### Passive Absorption
- Movement along concentration gradient
- No energy expenditure
- Occurs through diffusion and mass flow
- Initial rapid uptake is passive

### Active Absorption
- Movement against concentration gradient
- Requires metabolic energy (ATP)
- Mediated by carrier proteins and ion pumps
- Most mineral absorption is active

**Carrier Proteins:**
- Specific for particular ions
- Transport against electrochemical gradient
- Examples: H⁺-ATPase pump, co-transport systems

### Factors Affecting Mineral Absorption
1. **Temperature**: Optimum around 25-30°C
2. **pH**: Affects ion availability and uptake
3. **Light**: Indirectly (through photosynthesis providing energy)
4. **Oxygen**: Required for respiration (energy for active transport)
5. **Ion interaction**: Some ions promote/inhibit uptake of others

## Nitrogen Metabolism

### Nitrogen Cycle
Nitrogen is essential but atmospheric N₂ is inert and unavailable to most plants. The nitrogen cycle converts N₂ into usable forms.

**Steps in Nitrogen Cycle:**
1. **Nitrogen Fixation**: N₂ → NH₃
2. **Nitrification**: NH₃ → NO₂⁻ → NO₃⁻
3. **Assimilation**: NO₃⁻ → amino acids, proteins
4. **Ammonification**: Organic N → NH₃
5. **Denitrification**: NO₃⁻ → N₂ (loss to atmosphere)

### Biological Nitrogen Fixation

**Nitrogen Fixers:**

**1. Free-living (Asymbiotic)**
- Cyanobacteria: Anabaena, Nostoc (in soil and water)
- Free-living bacteria: Azotobacter (aerobic), Clostridium (anaerobic)

**2. Symbiotic**
- Rhizobium in root nodules of legumes (pea, beans, clover)
- Frankia in root nodules of non-legumes (Alnus)
- Anabaena in coralloid roots of Cycas

**Mechanism of Nitrogen Fixation:**
- Enzyme: **Nitrogenase complex** (dinitrogenase + dinitrogenase reductase)
- Reaction: N₂ + 8H⁺ + 8e⁻ + 16 ATP → 2NH₃ + H₂ + 16 ADP + 16 Pi
- Requires: Large amounts of energy (16 ATP per N₂), anaerobic conditions
- **Leghemoglobin**: Oxygen scavenger in root nodules, protects nitrogenase from O₂ inactivation

**Root Nodule Formation (Rhizobium-Legume Symbiosis):**
1. Recognition and attachment: Rhizobium recognizes root hairs
2. Infection thread formation: Bacteria enter root hair
3. Nodule development: Bacteria released into cortical cells
4. Differentiation: Bacteria become bacteroids, nodule becomes functional
5. Nitrogen fixation: Nitrogenase becomes active

### Nitrate Assimilation

**Nitrate Reduction:**
Plants absorb NO₃⁻ and reduce it to NH₄⁺ before incorporation into amino acids.

**Step 1: Nitrate → Nitrite**
- Enzyme: Nitrate reductase (requires Mo, NADH)
- Location: Cytoplasm
- Reaction: NO₃⁻ + NADH + H⁺ → NO₂⁻ + NAD⁺ + H₂O

**Step 2: Nitrite → Ammonia**
- Enzyme: Nitrite reductase (requires Fe)
- Location: Chloroplasts (in leaves) or plastids (in roots)
- Reaction: NO₂⁻ + 6Fd(reduced) + 8H⁺ → NH₄⁺ + 6Fd(oxidized) + 2H₂O

### Ammonia Assimilation

Ammonia (from reduction or fixation) is toxic at high concentrations and must be quickly incorporated into amino acids.

**Main Pathways:**

**1. Reductive Amination**
- Glutamate dehydrogenase pathway
- α-ketoglutarate + NH₄⁺ + NADH → Glutamate + NAD⁺ + H₂O
- Less important in vivo (high Km for NH₄⁺)

**2. GS-GOGAT Pathway (Primary pathway)**

**Step 1: Glutamine Synthetase (GS)**
- Glutamate + NH₄⁺ + ATP → Glutamine + ADP + Pi
- High affinity for NH₄⁺ (low Km)

**Step 2: Glutamate Synthase (GOGAT)**
- Glutamine + α-ketoglutarate + NADH → 2 Glutamate + NAD⁺

**Net Result**: α-ketoglutarate + NH₄⁺ + ATP + NADH → Glutamate + ADP + Pi + NAD⁺

**Transamination:**
- Transfer of amino group from glutamate to other keto acids
- Catalyzed by transaminases (aminotransferases)
- Example: Glutamate + Oxaloacetate → α-ketoglutarate + Aspartate

## Hydroponics

**Definition**: Technique of growing plants in nutrient solution without soil

**Advantages:**
- Precise control of nutrient composition
- Higher yields in controlled conditions
- No soil-borne diseases
- Efficient water use
- Used in research to study mineral requirements

**Types:**
- Water culture (roots in nutrient solution)
- Gravel/sand culture (inert medium with nutrient solution)
- Aeroponics (roots suspended in air, misted with nutrients)

**Limitations:**
- High initial cost
- Requires technical expertise
- Power failure risk
- Disease spreads rapidly if occurs

## Toxicity and Antagonism

**Mineral Toxicity:**
- Excess minerals can be toxic
- Example: Manganese toxicity causes brown spots on leaves
- Heavy metal toxicity (Pb, Cd, Hg) damages metabolism

**Antagonism:**
- Presence of one ion inhibits uptake of another
- Example: Excess Ca²⁺ inhibits K⁺ and Mg²⁺ uptake
- Important in formulating fertilizers
`,

    keyConcepts: [
      'Essential elements: Macronutrients (>10 mmol/kg) and Micronutrients (<10 mmol/kg)',
      'Arnon and Stout criteria for essentiality',
      'Nitrogen: component of amino acids, proteins, nucleic acids, chlorophyll',
      'Phosphorus: component of ATP, NADP, nucleic acids, phospholipids',
      'Potassium: enzyme activator (60+ enzymes), stomatal movement',
      'Magnesium: central atom of chlorophyll, enzyme activator',
      'Iron: essential for chlorophyll synthesis, component of cytochromes',
      'Molybdenum: component of nitrogenase and nitrate reductase',
      'Mobile elements (N, P, K, Mg): deficiency in older leaves',
      'Immobile elements (Ca, S, Fe, B): deficiency in younger leaves',
      'Active absorption requires ATP, against concentration gradient',
      'Biological nitrogen fixation: N₂ → NH₃ via nitrogenase (16 ATP)',
      'Rhizobium-legume symbiosis forms root nodules',
      'Leghemoglobin protects nitrogenase from oxygen',
      'Nitrate reduction: NO₃⁻ → NO₂⁻ → NH₄⁺',
      'GS-GOGAT pathway: primary ammonia assimilation',
      'Glutamine synthetase (GS) has high affinity for NH₄⁺',
      'Hydroponics: growing plants without soil in nutrient solution'
    ],

    formulas: [
      'Nitrogen fixation: N₂ + 8H⁺ + 8e⁻ + 16 ATP → 2NH₃ + H₂ + 16 ADP + 16 Pi',
      'Nitrate reduction: NO₃⁻ + NADH → NO₂⁻ + NAD⁺ (nitrate reductase)',
      'Nitrite reduction: NO₂⁻ + 6Fd(red) → NH₄⁺ + 6Fd(ox) (nitrite reductase)',
      'Glutamine synthetase: Glutamate + NH₄⁺ + ATP → Glutamine + ADP + Pi',
      'GOGAT: Glutamine + α-ketoglutarate + NADH → 2 Glutamate + NAD⁺',
      'Net GS-GOGAT: α-ketoglutarate + NH₄⁺ + ATP + NADH → Glutamate'
    ],

    learningObjectives: [
      'Understand the criteria for essential elements',
      'Classify essential elements into macro and micronutrients',
      'Explain functions of major essential elements',
      'Identify deficiency symptoms and their causes',
      'Understand the mechanism of mineral absorption',
      'Explain the nitrogen cycle and its biological significance',
      'Describe biological nitrogen fixation and nitrogenase enzyme',
      'Understand Rhizobium-legume symbiosis and nodule formation',
      'Explain nitrate assimilation pathway',
      'Describe ammonia assimilation via GS-GOGAT pathway',
      'Understand the principle and applications of hydroponics'
    ],

    prerequisites: [
      'Understanding of plant structure and tissues',
      'Knowledge of cell membrane and transport mechanisms',
      'Basic biochemistry: amino acids, proteins, enzymes',
      'Understanding of photosynthesis and respiration',
      'Concept of osmosis and active transport'
    ],

    importantTopics: [
      'Criteria for essentiality (Arnon and Stout)',
      'Classification: Macronutrients vs Micronutrients',
      'Functions of N, P, K, Ca, Mg, S (macronutrients)',
      'Functions of Fe, Mn, Zn, Cu, B, Mo (micronutrients)',
      'Deficiency symptoms: Mobile vs Immobile elements',
      'Specific deficiency symptoms for major elements',
      'Active vs Passive mineral absorption',
      'Nitrogen cycle: fixation, nitrification, assimilation, denitrification',
      'Biological nitrogen fixation: nitrogenase enzyme, 16 ATP requirement',
      'Rhizobium-legume symbiosis: root nodule formation',
      'Leghemoglobin function in root nodules',
      'Nitrate reduction pathway: nitrate reductase, nitrite reductase',
      'GS-GOGAT pathway for ammonia assimilation',
      'Transamination reactions',
      'Hydroponics: principles and applications'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 12',
    estimatedStudyMinutes: 360,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'table',
        title: 'Essential Elements and Their Functions',
        description: 'Comprehensive table of macro and micronutrients with forms absorbed and major functions'
      },
      {
        type: 'comparison',
        title: 'Deficiency Symptoms Chart',
        description: 'Visual guide to identifying nutrient deficiencies by symptoms in leaves'
      },
      {
        type: 'diagram',
        title: 'Nitrogen Cycle',
        description: 'Complete nitrogen cycle showing fixation, nitrification, assimilation, and denitrification'
      },
      {
        type: 'diagram',
        title: 'Root Nodule Structure',
        description: 'Cross-section of legume root nodule showing bacteroids, infection thread, and leghemoglobin'
      },
      {
        type: 'flowchart',
        title: 'GS-GOGAT Pathway',
        description: 'Step-by-step ammonia assimilation via glutamine synthetase and glutamate synthase'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Mineral Nutrition',
      introduction: `Plants require various inorganic nutrients for their growth, development, and metabolic activities. These essential elements, absorbed primarily from the soil as ions, play critical roles ranging from structural components to enzymatic cofactors. Unlike animals, plants must synthesize all their organic compounds from simple inorganic nutrients. Understanding mineral nutrition is fundamental to agriculture, horticulture, and plant physiology. This chapter explores the essential mineral elements, their functions, deficiency symptoms, and the fascinating process of nitrogen metabolism—a cornerstone of plant nutrition that enables plants to convert atmospheric nitrogen into proteins.`,
      detailedNotes: `
# Mineral Nutrition

## Essential Mineral Elements

### Criteria for Essentiality
For an element to be classified as essential for plants, it must satisfy three criteria proposed by Arnon and Stout:
1. **Absolute requirement**: Plant cannot complete its life cycle without the element
2. **Non-substitutable**: No other element can fulfill its specific function
3. **Direct involvement**: Element must be directly involved in plant metabolism or structure

### Classification of Essential Elements

**Based on Quantity Required:**

**1. Macronutrients (Required in large amounts, >10 mmol/kg dry weight)**
- Carbon (C), Hydrogen (H), Oxygen (O) - obtained from air and water
- Nitrogen (N), Phosphorus (P), Potassium (K), Calcium (Ca), Magnesium (Mg), Sulfur (S)

**2. Micronutrients (Required in trace amounts, <10 mmol/kg dry weight)**
- Iron (Fe), Manganese (Mn), Copper (Cu), Zinc (Zn), Boron (B), Molybdenum (Mo), Chlorine (Cl), Nickel (Ni)

**Based on Function:**

**1. Framework Elements**: C, H, O, N, S
- Form organic compounds (carbohydrates, proteins, lipids, nucleic acids)

**2. Energy-Related Elements**: Mg (chlorophyll), P (ATP)
- Involved in energy metabolism

**3. Enzyme Activators**: K, Ca, Mg, Mn, Zn, Cu, Mo, Cl
- Activate or constitute enzymes

## Functions of Essential Elements

### Macronutrients

**Nitrogen (N)**
- Component of amino acids, proteins, nucleic acids (DNA, RNA)
- Part of chlorophyll, vitamins (B-complex), hormones (auxins, cytokinins)
- Essential for cell division and growth
- Absorbed as: NO₃⁻ (nitrate) or NH₄⁺ (ammonium)

**Phosphorus (P)**
- Component of nucleic acids, phospholipids, ATP, NADP
- Part of sugar phosphates in photosynthesis and respiration
- Essential for energy transfer
- Important for root development and flowering
- Absorbed as: H₂PO₄⁻ or HPO₄²⁻

**Potassium (K)**
- Enzyme activator (60+ enzymes)
- Maintains cell turgidity and osmotic potential
- Opening and closing of stomata
- Protein synthesis, photosynthesis
- Important for disease resistance
- Absorbed as: K⁺

**Calcium (Ca)**
- Component of cell wall (calcium pectate in middle lamella)
- Membrane stabilizer
- Enzyme cofactor
- Regulates cell permeability
- Required for cell division (mitotic spindle formation)
- Absorbed as: Ca²⁺

**Magnesium (Mg)**
- Central atom of chlorophyll molecule
- Activator of enzymes (RuBisCO, PEP carboxylase)
- Required for ribosome integrity
- Involved in protein synthesis
- Absorbed as: Mg²⁺

**Sulfur (S)**
- Component of amino acids (cysteine, methionine)
- Part of coenzymes (CoA), vitamins (thiamine, biotin)
- Component of ferredoxin (photosynthesis)
- Required for chlorophyll synthesis
- Absorbed as: SO₄²⁻ (sulfate)

### Micronutrients

**Iron (Fe)**
- Component of cytochromes, ferredoxin
- Activator of catalase, peroxidase
- Essential for chlorophyll synthesis (though not a component)
- Required for nitrogen fixation
- Absorbed as: Fe²⁺ or Fe³⁺

**Manganese (Mn)**
- Activates enzymes involved in photosynthesis, respiration, nitrogen metabolism
- Essential for water-splitting reaction in Photosystem II
- Required for chlorophyll synthesis
- Absorbed as: Mn²⁺

**Zinc (Zn)**
- Activates enzymes (carbonic anhydrase, alcohol dehydrogenase)
- Essential for auxin (IAA) synthesis
- Required for protein synthesis
- Absorbed as: Zn²⁺

**Copper (Cu)**
- Component of plastocyanin (electron carrier in photosynthesis)
- Activates oxidase enzymes
- Important for lignin synthesis
- Absorbed as: Cu²⁺

**Boron (B)**
- Required for pollen germination and pollen tube growth
- Involved in translocation of sugars
- Essential for cell differentiation and development
- Uptake mechanism not fully understood

**Molybdenum (Mo)**
- Component of nitrogenase (nitrogen fixation)
- Component of nitrate reductase (nitrate reduction)
- Required in smallest amount
- Absorbed as: MoO₄²⁻

**Chlorine (Cl)**
- Required for photolysis of water (oxygen evolution)
- Maintains ionic balance
- Increases cell osmotic pressure
- Absorbed as: Cl⁻

**Nickel (Ni)**
- Component of urease enzyme
- Essential for nitrogen metabolism
- Required in very small amounts

## Deficiency Symptoms

### General Principles
- **Mobile elements** (N, P, K, Mg): Deficiency symptoms appear first in **older leaves** (element translocated to younger parts)
- **Immobile elements** (Ca, S, Fe, B, Cu, Mn): Deficiency symptoms appear first in **younger leaves** (element cannot be transported)

### Specific Deficiency Symptoms

**Nitrogen Deficiency**
- Chlorosis (yellowing) of older leaves
- Stunted growth, thin stems
- Reduced branching
- Early maturity

**Phosphorus Deficiency**
- Dark green leaves with purple/reddish coloration (anthocyanin accumulation)
- Delayed maturity
- Poor root development
- Reduced flowering and fruiting

**Potassium Deficiency**
- Marginal chlorosis and necrosis (death of tissue) starting from leaf tips
- Lodging in cereals (plants fall over)
- Reduced disease resistance

**Calcium Deficiency**
- Death of growing points (apical meristems)
- Young leaves deformed, hooked
- Blossom-end rot in tomatoes

**Magnesium Deficiency**
- Interveinal chlorosis in older leaves (veins remain green)
- Leaf curling

**Iron Deficiency**
- Interveinal chlorosis in younger leaves
- Severe chlorosis leading to white leaves

**Manganese Deficiency**
- Interveinal chlorosis
- Gray speck disease in oats

**Zinc Deficiency**
- Little leaf disease (small leaves)
- Rosetting (shortened internodes)
- Interveinal chlorosis

**Boron Deficiency**
- Death of terminal buds
- Heart rot in beets
- Brown heart in turnips

## Mechanism of Nutrient Absorption

### Passive Absorption
- Movement along concentration gradient
- No energy expenditure
- Occurs through diffusion and mass flow
- Initial rapid uptake is passive

### Active Absorption
- Movement against concentration gradient
- Requires metabolic energy (ATP)
- Mediated by carrier proteins and ion pumps
- Most mineral absorption is active

**Carrier Proteins:**
- Specific for particular ions
- Transport against electrochemical gradient
- Examples: H⁺-ATPase pump, co-transport systems

### Factors Affecting Mineral Absorption
1. **Temperature**: Optimum around 25-30°C
2. **pH**: Affects ion availability and uptake
3. **Light**: Indirectly (through photosynthesis providing energy)
4. **Oxygen**: Required for respiration (energy for active transport)
5. **Ion interaction**: Some ions promote/inhibit uptake of others

## Nitrogen Metabolism

### Nitrogen Cycle
Nitrogen is essential but atmospheric N₂ is inert and unavailable to most plants. The nitrogen cycle converts N₂ into usable forms.

**Steps in Nitrogen Cycle:**
1. **Nitrogen Fixation**: N₂ → NH₃
2. **Nitrification**: NH₃ → NO₂⁻ → NO₃⁻
3. **Assimilation**: NO₃⁻ → amino acids, proteins
4. **Ammonification**: Organic N → NH₃
5. **Denitrification**: NO₃⁻ → N₂ (loss to atmosphere)

### Biological Nitrogen Fixation

**Nitrogen Fixers:**

**1. Free-living (Asymbiotic)**
- Cyanobacteria: Anabaena, Nostoc (in soil and water)
- Free-living bacteria: Azotobacter (aerobic), Clostridium (anaerobic)

**2. Symbiotic**
- Rhizobium in root nodules of legumes (pea, beans, clover)
- Frankia in root nodules of non-legumes (Alnus)
- Anabaena in coralloid roots of Cycas

**Mechanism of Nitrogen Fixation:**
- Enzyme: **Nitrogenase complex** (dinitrogenase + dinitrogenase reductase)
- Reaction: N₂ + 8H⁺ + 8e⁻ + 16 ATP → 2NH₃ + H₂ + 16 ADP + 16 Pi
- Requires: Large amounts of energy (16 ATP per N₂), anaerobic conditions
- **Leghemoglobin**: Oxygen scavenger in root nodules, protects nitrogenase from O₂ inactivation

**Root Nodule Formation (Rhizobium-Legume Symbiosis):**
1. Recognition and attachment: Rhizobium recognizes root hairs
2. Infection thread formation: Bacteria enter root hair
3. Nodule development: Bacteria released into cortical cells
4. Differentiation: Bacteria become bacteroids, nodule becomes functional
5. Nitrogen fixation: Nitrogenase becomes active

### Nitrate Assimilation

**Nitrate Reduction:**
Plants absorb NO₃⁻ and reduce it to NH₄⁺ before incorporation into amino acids.

**Step 1: Nitrate → Nitrite**
- Enzyme: Nitrate reductase (requires Mo, NADH)
- Location: Cytoplasm
- Reaction: NO₃⁻ + NADH + H⁺ → NO₂⁻ + NAD⁺ + H₂O

**Step 2: Nitrite → Ammonia**
- Enzyme: Nitrite reductase (requires Fe)
- Location: Chloroplasts (in leaves) or plastids (in roots)
- Reaction: NO₂⁻ + 6Fd(reduced) + 8H⁺ → NH₄⁺ + 6Fd(oxidized) + 2H₂O

### Ammonia Assimilation

Ammonia (from reduction or fixation) is toxic at high concentrations and must be quickly incorporated into amino acids.

**Main Pathways:**

**1. Reductive Amination**
- Glutamate dehydrogenase pathway
- α-ketoglutarate + NH₄⁺ + NADH → Glutamate + NAD⁺ + H₂O
- Less important in vivo (high Km for NH₄⁺)

**2. GS-GOGAT Pathway (Primary pathway)**

**Step 1: Glutamine Synthetase (GS)**
- Glutamate + NH₄⁺ + ATP → Glutamine + ADP + Pi
- High affinity for NH₄⁺ (low Km)

**Step 2: Glutamate Synthase (GOGAT)**
- Glutamine + α-ketoglutarate + NADH → 2 Glutamate + NAD⁺

**Net Result**: α-ketoglutarate + NH₄⁺ + ATP + NADH → Glutamate + ADP + Pi + NAD⁺

**Transamination:**
- Transfer of amino group from glutamate to other keto acids
- Catalyzed by transaminases (aminotransferases)
- Example: Glutamate + Oxaloacetate → α-ketoglutarate + Aspartate

## Hydroponics

**Definition**: Technique of growing plants in nutrient solution without soil

**Advantages:**
- Precise control of nutrient composition
- Higher yields in controlled conditions
- No soil-borne diseases
- Efficient water use
- Used in research to study mineral requirements

**Types:**
- Water culture (roots in nutrient solution)
- Gravel/sand culture (inert medium with nutrient solution)
- Aeroponics (roots suspended in air, misted with nutrients)

**Limitations:**
- High initial cost
- Requires technical expertise
- Power failure risk
- Disease spreads rapidly if occurs

## Toxicity and Antagonism

**Mineral Toxicity:**
- Excess minerals can be toxic
- Example: Manganese toxicity causes brown spots on leaves
- Heavy metal toxicity (Pb, Cd, Hg) damages metabolism

**Antagonism:**
- Presence of one ion inhibits uptake of another
- Example: Excess Ca²⁺ inhibits K⁺ and Mg²⁺ uptake
- Important in formulating fertilizers
`,
      keyConcepts: [
        'Essential elements: Macronutrients (>10 mmol/kg) and Micronutrients (<10 mmol/kg)',
        'Arnon and Stout criteria for essentiality',
        'Nitrogen: component of amino acids, proteins, nucleic acids, chlorophyll',
        'Phosphorus: component of ATP, NADP, nucleic acids, phospholipids',
        'Potassium: enzyme activator (60+ enzymes), stomatal movement',
        'Magnesium: central atom of chlorophyll, enzyme activator',
        'Iron: essential for chlorophyll synthesis, component of cytochromes',
        'Molybdenum: component of nitrogenase and nitrate reductase',
        'Mobile elements (N, P, K, Mg): deficiency in older leaves',
        'Immobile elements (Ca, S, Fe, B): deficiency in younger leaves',
        'Active absorption requires ATP, against concentration gradient',
        'Biological nitrogen fixation: N₂ → NH₃ via nitrogenase (16 ATP)',
        'Rhizobium-legume symbiosis forms root nodules',
        'Leghemoglobin protects nitrogenase from oxygen',
        'Nitrate reduction: NO₃⁻ → NO₂⁻ → NH₄⁺',
        'GS-GOGAT pathway: primary ammonia assimilation',
        'Glutamine synthetase (GS) has high affinity for NH₄⁺',
        'Hydroponics: growing plants without soil in nutrient solution'
      ],
      formulas: [
        'Nitrogen fixation: N₂ + 8H⁺ + 8e⁻ + 16 ATP → 2NH₃ + H₂ + 16 ADP + 16 Pi',
        'Nitrate reduction: NO₃⁻ + NADH → NO₂⁻ + NAD⁺ (nitrate reductase)',
        'Nitrite reduction: NO₂⁻ + 6Fd(red) → NH₄⁺ + 6Fd(ox) (nitrite reductase)',
        'Glutamine synthetase: Glutamate + NH₄⁺ + ATP → Glutamine + ADP + Pi',
        'GOGAT: Glutamine + α-ketoglutarate + NADH → 2 Glutamate + NAD⁺',
        'Net GS-GOGAT: α-ketoglutarate + NH₄⁺ + ATP + NADH → Glutamate'
      ],
      learningObjectives: [
        'Understand the criteria for essential elements',
        'Classify essential elements into macro and micronutrients',
        'Explain functions of major essential elements',
        'Identify deficiency symptoms and their causes',
        'Understand the mechanism of mineral absorption',
        'Explain the nitrogen cycle and its biological significance',
        'Describe biological nitrogen fixation and nitrogenase enzyme',
        'Understand Rhizobium-legume symbiosis and nodule formation',
        'Explain nitrate assimilation pathway',
        'Describe ammonia assimilation via GS-GOGAT pathway',
        'Understand the principle and applications of hydroponics'
      ],
      prerequisites: [
        'Understanding of plant structure and tissues',
        'Knowledge of cell membrane and transport mechanisms',
        'Basic biochemistry: amino acids, proteins, enzymes',
        'Understanding of photosynthesis and respiration',
        'Concept of osmosis and active transport'
      ],
      importantTopics: [
        'Criteria for essentiality (Arnon and Stout)',
        'Classification: Macronutrients vs Micronutrients',
        'Functions of N, P, K, Ca, Mg, S (macronutrients)',
        'Functions of Fe, Mn, Zn, Cu, B, Mo (micronutrients)',
        'Deficiency symptoms: Mobile vs Immobile elements',
        'Specific deficiency symptoms for major elements',
        'Active vs Passive mineral absorption',
        'Nitrogen cycle: fixation, nitrification, assimilation, denitrification',
        'Biological nitrogen fixation: nitrogenase enzyme, 16 ATP requirement',
        'Rhizobium-legume symbiosis: root nodule formation',
        'Leghemoglobin function in root nodules',
        'Nitrate reduction pathway: nitrate reductase, nitrite reductase',
        'GS-GOGAT pathway for ammonia assimilation',
        'Transamination reactions',
        'Hydroponics: principles and applications'
      ],
      ncertChapterRef: 'Class 11 Biology, Chapter 12',
      estimatedStudyMinutes: 360,
      difficultyLevel: 4,
      status: 'published',
      visualizationsData: [
        {
          type: 'table',
          title: 'Essential Elements and Their Functions',
          description: 'Comprehensive table of macro and micronutrients with forms absorbed and major functions'
        },
        {
          type: 'comparison',
          title: 'Deficiency Symptoms Chart',
          description: 'Visual guide to identifying nutrient deficiencies by symptoms in leaves'
        },
        {
          type: 'diagram',
          title: 'Nitrogen Cycle',
          description: 'Complete nitrogen cycle showing fixation, nitrification, assimilation, and denitrification'
        },
        {
          type: 'diagram',
          title: 'Root Nodule Structure',
          description: 'Cross-section of legume root nodule showing bacteroids, infection thread, and leghemoglobin'
        },
        {
          type: 'flowchart',
          title: 'GS-GOGAT Pathway',
          description: 'Step-by-step ammonia assimilation via glutamine synthetase and glutamate synthase'
        }
      ]
    }
  });

  console.log('✅ Biology Chapter 12: Mineral Nutrition seeded successfully!');
}

seedBiologyChapter12()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
