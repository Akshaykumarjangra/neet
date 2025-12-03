import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter14() {
  console.log('Seeding Biology Class 12 Chapter 14: Ecosystem...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 14,
    chapterTitle: 'Ecosystem',
    introduction: `An ecosystem is a functional unit of nature where living organisms interact with each other and their physical environment through energy flow and nutrient cycling. This chapter explores ecosystem structure and function, energy flow through trophic levels following the 10% law, biogeochemical cycles of carbon, nitrogen, and phosphorus, ecological pyramids, and ecological succession from pioneer to climax communities. Understanding ecosystem dynamics is crucial for NEET as it integrates concepts of ecology, energy transfer, and nutrient recycling essential for environmental science.`,

    detailedNotes: `
# Ecosystem

## Introduction

**Ecosystem**: Functional unit consisting of biotic (living) and abiotic (non-living) components interacting through energy flow and nutrient cycling

**Term coined by**: A.G. Tansley (1935)

### Components of Ecosystem

**1. Abiotic Components (Non-living)**
- **Inorganic substances**: C, N, CO₂, H₂O, minerals
- **Organic compounds**: Proteins, carbohydrates, lipids, humus
- **Climatic factors**: Temperature, light, rainfall, humidity

**2. Biotic Components (Living)**

Based on nutritional mode:

**A. Producers (Autotrophs)**
- Synthesize organic compounds from inorganic substances
- **Photoautotrophs**: Use light energy (plants, algae, cyanobacteria)
- **Chemoautotrophs**: Use chemical energy (some bacteria)
- Form **base of food chain**

**B. Consumers (Heterotrophs)**
- Depend on producers for food

**Types**:
- **Primary consumers (Herbivores)**: Eat plants
  - Examples: Grasshopper, rabbit, deer, cow
- **Secondary consumers (Primary carnivores)**: Eat herbivores
  - Examples: Frog (eats insects), snake
- **Tertiary consumers (Secondary carnivores)**: Eat other carnivores
  - Examples: Hawk, lion
- **Quaternary consumers (Top carnivores)**: Apex predators
  - Examples: Tiger, eagle
- **Omnivores**: Eat both plants and animals
  - Examples: Humans, bears, crows

**C. Decomposers (Saprotrophs)**
- Break down dead organic matter
- Release nutrients back to environment
- **Bacteria and Fungi** (main decomposers)
- Also called **Microconsumers** or **Reducers**

## Food Chain

**Definition**: Linear sequence of organisms where each is eaten by the next

**Energy flow**: Unidirectional (one direction only)

**Trophic Levels**: Position in food chain

### Types of Food Chains

**1. Grazing Food Chain (GFC)**
- Starts with **green plants** (producers)
- Energy from sunlight
- **Most common** in terrestrial ecosystems

**Example**: 
Grass → Grasshopper → Frog → Snake → Hawk

**2. Detritus Food Chain (DFC)**
- Starts with **dead organic matter** (detritus)
- **Decomposers** are main organisms
- Important in forest and aquatic ecosystems
- **More energy** flows through DFC than GFC in many ecosystems

**Example**: 
Dead leaves → Earthworm → Bird → Snake

**Detritus**: Dead plant/animal remains, fecal matter

**Detritivores**: Organisms feeding on detritus (earthworms, millipedes, dung beetles)

## Food Web

**Definition**: Interconnected food chains forming complex network

**Characteristics**:
- More realistic than simple food chains
- Provides **alternative food sources** (stability)
- Shows multiple feeding relationships
- Energy flow is complex

**Example**: Grass eaten by grasshopper AND rabbit; frog eats grasshopper; snake eats frog AND rabbit

**Importance**:
- Provides **stability**: If one species declines, predator can switch to alternative prey
- Shows **interdependence** of organisms

## Ecological Pyramids

**Definition**: Graphical representation of trophic structure

**Shapes**: Usually pyramid (broad base, narrow apex)

### Types of Ecological Pyramids

**1. Pyramid of Numbers**

Shows number of individuals at each trophic level

**A. Upright** (Most common)
- Producers most numerous
- Consumers decrease at higher levels
- **Example**: Grassland ecosystem
  - Grass (millions) → Grasshopper (thousands) → Frog (hundreds) → Snake (tens) → Hawk (few)

**B. Inverted**
- Producers less numerous than consumers
- **Example**: Tree ecosystem
  - 1 Tree → Many insects → Few birds
- **Example**: Parasitic food chain

**C. Spindle-shaped**
- Intermediate level has maximum individuals
- **Example**: Pond ecosystem

**2. Pyramid of Biomass**

Shows total dry weight of organisms at each level

**A. Upright** (Terrestrial ecosystems)
- Producers have maximum biomass
- Decreases at higher levels
- **Example**: Forest, grassland
  - Plants (1000 kg) → Herbivores (100 kg) → Carnivores (10 kg)

**B. Inverted** (Some aquatic ecosystems)
- Producers have less biomass than consumers
- **Example**: Ocean
  - Phytoplankton (small biomass, rapid turnover)
  - Zooplankton, fish (larger biomass)
- Possible because phytoplankton reproduce very rapidly

**3. Pyramid of Energy**

Shows energy content at each trophic level

**Always Upright** (no exceptions)
- Maximum energy at producer level
- Decreases at each level (10% rule)
- **Best representation** of ecosystem function

**Example**: 
- Producers: 10,000 kcal
- Herbivores: 1,000 kcal (10%)
- Carnivores: 100 kcal (10%)
- Top carnivores: 10 kcal (10%)

## Energy Flow in Ecosystem

**Characteristics**:
- **Unidirectional**: Sun → Producers → Consumers → Decomposers (no reverse flow)
- **Non-cyclic**: Energy is not recycled (unlike nutrients)
- Decreases at each trophic level

### 10% Law (Lindeman's Law)

**Proposed by**: Raymond Lindeman (1942)

**Principle**: Only **10% of energy** is transferred from one trophic level to the next; **90% is lost**

**Energy losses**:
- **Respiration**: 60-70% lost as heat
- **Not consumed**: Some parts not eaten
- **Not assimilated**: Some parts not digested/absorbed
- **Decomposition**: Some goes to decomposers

**Example**:
- Sunlight: 1,000,000 kcal
- Producers capture: ~1% = 10,000 kcal (GPP)
- Herbivores get: 10% = 1,000 kcal
- Carnivores get: 10% = 100 kcal
- Top carnivores get: 10% = 10 kcal

**Implications**:
- Food chains limited to **3-5 trophic levels**
- Higher trophic levels have less energy available
- Explains why there are fewer top predators

### Productivity

**Primary Productivity**: Rate at which producers capture and store energy

**A. Gross Primary Productivity (GPP)**
- Total rate of photosynthesis (total organic matter produced)
- Some used in respiration

**B. Net Primary Productivity (NPP)**
- **NPP = GPP - Respiration**
- Biomass available to consumers
- Usually measured in **g/m²/year** or **kcal/m²/year**

**Secondary Productivity**: Rate of biomass production by consumers

**Factors affecting productivity**:
- Light, temperature, water, nutrients
- Different ecosystems have different productivity
- **Highest**: Tropical rainforests, estuaries, coral reefs
- **Lowest**: Deserts, tundra, deep ocean

## Biogeochemical Cycles (Nutrient Cycling)

**Definition**: Cyclic movement of nutrients between biotic and abiotic components

**Characteristics**:
- **Cyclic** (unlike energy flow)
- Involve reservoirs (atmosphere, soil, water, organisms)
- Driven by biological and geological processes

### Types of Cycles

**1. Gaseous cycles**: Reservoir is atmosphere (C, N, O)
**2. Sedimentary cycles**: Reservoir is Earth's crust (P, S, Ca)

### 1. Carbon Cycle

**Reservoir**: Atmosphere (CO₂), oceans (dissolved CO₂, carbonates)

**Processes**:

**Carbon fixation** (Atmosphere → Organisms):
1. **Photosynthesis**: CO₂ → Glucose (plants, algae)
   - 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
2. **Chemosynthesis**: Some bacteria

**Carbon release** (Organisms → Atmosphere):
1. **Respiration**: All organisms release CO₂
   - C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy
2. **Decomposition**: Bacteria, fungi break down dead matter → CO₂
3. **Combustion**: Burning fossil fuels, wood → CO₂
4. **Volcanic activity**: Releases CO₂

**Ocean processes**:
- CO₂ dissolves in water
- Marine organisms use for shells (CaCO₃)
- Forms sedimentary rocks (limestone)
- Weathering releases CO₂

**Human impact**: Burning fossil fuels increases atmospheric CO₂ (greenhouse effect)

### 2. Nitrogen Cycle

**Reservoir**: Atmosphere (N₂ = 78% of air)

**Problem**: Most organisms cannot use atmospheric N₂ directly (triple bond very stable)

**Processes**:

**1. Nitrogen Fixation** (N₂ → NH₃/NH₄⁺)

**Biological fixation**:
- **Symbiotic**: *Rhizobium* in legume root nodules
- **Free-living**: *Azotobacter*, *Anabaena*, *Nostoc*
- **Nitrogenase enzyme** converts N₂ → NH₃

**Industrial fixation**: Haber process (fertilizers)

**Natural fixation**: Lightning (high energy breaks N≡N bond)

**2. Ammonification** (Organic N → NH₃)
- Decomposers break down proteins, urea, uric acid
- Release ammonia

**3. Nitrification** (NH₃ → NO₂⁻ → NO₃⁻)

**Two-step process**:
- **Step 1**: NH₃ → NO₂⁻ (nitrite)
  - By *Nitrosomonas*, *Nitrosococcus*
- **Step 2**: NO₂⁻ → NO₃⁻ (nitrate)
  - By *Nitrobacter*
- Plants absorb **NO₃⁻** (main form)

**4. Assimilation**
- Plants take up NO₃⁻ and NH₄⁺
- Convert to amino acids, proteins, nucleic acids
- Animals eat plants (get nitrogen)

**5. Denitrification** (NO₃⁻ → N₂)
- Bacteria convert nitrate → N₂ gas
- *Pseudomonas*, *Thiobacillus*
- Returns N₂ to atmosphere
- Occurs in waterlogged, anaerobic soils

**Human impact**: Excess fertilizers → runoff → eutrophication

### 3. Phosphorus Cycle

**Reservoir**: Rocks (phosphate minerals), sediments

**No gaseous phase** (unlike C, N cycles)

**Processes**:

**1. Weathering**
- Rocks erode → release phosphate (PO₄³⁻) into soil

**2. Absorption**
- Plants absorb phosphate from soil
- Used in ATP, nucleic acids, phospholipids

**3. Assimilation**
- Animals eat plants
- Phosphorus in bones, teeth, DNA, RNA

**4. Decomposition**
- Dead organisms decomposed
- Phosphate returns to soil

**5. Runoff**
- Phosphate washed into water bodies
- Sediments form rocks (geological uplift restarts cycle)

**Limiting nutrient**: Often limits plant growth in aquatic systems

**Human impact**: Detergents, fertilizers → eutrophication

## Ecological Succession

**Definition**: Gradual, sequential change in species composition of a community over time

**Climax Community**: Final, stable community (no further change)

### Types of Succession

**1. Primary Succession**
- Starts on **bare rock/substrate** (no soil, no life)
- **Examples**: Newly cooled lava, bare rock, sand dunes

**Stages** (Lithosere - on rocks):
1. **Pioneer species**: Lichens colonize bare rock
   - Produce acids, weather rock
   - Die, form thin soil layer
2. **Mosses**: Grow on soil
   - Add organic matter, hold moisture
3. **Herbaceous plants**: Grasses, herbs
   - More soil formation
4. **Shrubs**: Bushes appear
5. **Trees**: Forest develops
6. **Climax community**: Mature forest (stable)

**Time**: Hundreds to thousands of years

**2. Secondary Succession**
- Starts on **disturbed area** (soil present, some organisms survive)
- **Examples**: Abandoned farmland, after forest fire, deforestation
- **Faster** than primary (soil and seeds present)

**Stages**:
1. **Annual weeds**: Fast-growing (grasses)
2. **Perennial herbs**: Longer-lived
3. **Shrubs**
4. **Trees** (pioneer tree species)
5. **Climax forest**

**Time**: Decades to century

### Characteristics of Succession

**Changes during succession**:
- **Species diversity**: Increases (low → high)
- **Biomass**: Increases
- **Productivity**: Increases initially, then stabilizes
- **Nutrient cycling**: Becomes more efficient
- **Stability**: Increases (climax most stable)

**Pioneer species**:
- Hardy, fast-growing
- Tolerate harsh conditions
- Examples: Lichens, grasses

**Climax community**:
- Stable, self-sustaining
- High diversity
- Complex food webs
- Efficient nutrient cycling

## Ecosystem Services

**Services provided by ecosystems**:
1. **Provisioning**: Food, water, timber, fiber
2. **Regulating**: Climate regulation, flood control, disease control
3. **Supporting**: Nutrient cycling, soil formation, pollination
4. **Cultural**: Recreation, aesthetic, spiritual

## Summary Points

1. Ecosystems consist of biotic (producers, consumers, decomposers) and abiotic components interacting through energy flow and nutrient cycling
2. Energy flow is unidirectional, following the 10% law where only 10% transfers between trophic levels
3. Pyramid of energy is always upright; pyramid of biomass can be inverted in aquatic ecosystems
4. Carbon cycle involves photosynthesis (CO₂ fixation) and respiration/decomposition (CO₂ release)
5. Nitrogen cycle includes fixation, nitrification, assimilation, ammonification, and denitrification
6. Phosphorus cycle lacks gaseous phase; reservoir is rocks and sediments
7. Ecological succession progresses from pioneer species to climax community; primary succession starts on bare rock, secondary on disturbed soil
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Ecosystem',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Biology Class 12 Chapter 14: Ecosystem');
}

seedBiologyClass12Chapter14().catch(console.error);
