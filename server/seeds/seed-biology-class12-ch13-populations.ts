import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter13() {
  console.log('Seeding Biology Class 12 Chapter 13: Organisms and Populations...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 13,
    chapterTitle: 'Organisms and Populations',
    introduction: `Ecology studies the interactions between organisms and their environment, from individual adaptations to population dynamics. This chapter explores how organisms respond to abiotic factors like temperature and water, population characteristics including growth patterns and age distribution, and interactions between species such as competition, predation, and symbiosis. Understanding these ecological principles is vital for NEET as they explain biodiversity patterns, evolutionary adaptations, and the mechanisms regulating population sizes in nature.`,

    detailedNotes: `
# Organisms and Populations

## Introduction to Ecology

**Ecology**: Study of interactions between organisms and their environment

**Levels of Biological Organization**:
1. **Organism/Individual**: Single living entity
2. **Population**: Group of individuals of same species in an area
3. **Community**: All populations (different species) in an area
4. **Ecosystem**: Community + abiotic environment
5. **Biome**: Large region with characteristic climate and organisms
6. **Biosphere**: All ecosystems on Earth

## Organism and Environment

### Abiotic Factors (Physical Factors)

**1. Temperature**

Most important ecological factor

**Effects on organisms**:
- Affects enzyme activity, metabolism
- Influences distribution and breeding seasons
- Determines latitudinal gradients

**Thermal Zones**:
- **Tropical**: Average temperature >25°C
- **Temperate**: 10-25°C
- **Polar**: <10°C

**Adaptations to Temperature**:

**A. Regulate (Thermoregulation)**
- Maintain constant body temperature (homeothermy)
- **Birds and mammals** (endotherms/warm-blooded)
- High metabolic cost (need more food)
- **Advantages**: Active in all conditions, can inhabit extreme environments

**B. Conform**
- Body temperature varies with environment
- **Most animals** (ectotherms/cold-blooded): Fish, amphibians, reptiles
- **All plants**
- **Advantage**: Energy-efficient

**C. Migrate**
- Move to favorable areas during unfavorable seasons
- **Examples**: 
  - Birds migrate to warmer regions in winter
  - Siberian cranes to Bharatpur

**D. Suspend (Dormancy)**

**Hibernation** (winter sleep):
- Bears, frogs, snakes
- Metabolic rate decreases
- Example: Polar bears

**Aestivation** (summer sleep):
- Snails, fish in hot, dry conditions
- Example: Lungfish burrow in mud

**Diapause** (suspended development):
- Insects, zooplankton
- Development arrested at specific stage
- Example: Many insects

**2. Water**

**Importance**:
- Universal solvent (all biochemical reactions occur in water)
- 70-90% of organism's body weight
- Determines plant productivity

**Productivity**: Desert (low) < Temperate forest < Tropical rainforest (high)

**Adaptations**:

**Desert Plants (Xerophytes)**:
- Thick cuticle, sunken stomata (reduce water loss)
- CAM photosynthesis (open stomata at night)
- Deep roots or extensive shallow roots
- Succulent stems (store water): Cacti, Opuntia
- Leaves reduced to spines (reduce surface area)
- Examples: Acacia, Euphorbia

**Desert Animals**:
- Nocturnal (active at night, avoid heat)
- **Kangaroo rat**: Never drinks water, gets water from metabolism, concentrated urine
- Camel: Tolerates dehydration, fat in hump
- Lizards: Burrow during day

**Aquatic Adaptations**:
- Fish: Gills, streamlined body
- Dolphins, whales: Blubber (insulation), blowholes

**3. Light**

**Importance**:
- Energy source (photosynthesis)
- Influences plant distribution, flowering, migration, reproduction

**Photoperiod**: Duration of daylight
- Affects flowering in plants, breeding in animals

**Plant Adaptations**:

**Shade Plants (Sciophytes)**:
- Broad, thin leaves
- More chlorophyll
- Example: Forest floor plants

**Sun Plants (Heliophytes)**:
- Thick cuticle
- Smaller, thicker leaves
- Example: Desert plants

**Photoperiodism**: Response to day length

**Plants classified as**:
- **Short-day plants**: Flower when day length <12 hours (Rice, Soybean, Chrysanthemum)
- **Long-day plants**: Flower when day length >12 hours (Wheat, Radish, Spinach)
- **Day-neutral plants**: Not affected by photoperiod (Tomato, Cotton)

**4. Soil**

**Components**:
- Mineral particles (sand, silt, clay)
- Organic matter (humus)
- Water, air
- Microorganisms

**Properties affecting organisms**:
- **pH**: Acidic, neutral, alkaline
- **Texture**: Sandy, loamy, clayey
- **Nutrients**: Nitrogen, phosphorus, potassium
- **Water-holding capacity**

**Plant adaptations**:
- **Halophytes**: Grow in saline soils (Mangroves)
- **Acidophiles**: Prefer acidic soils (Tea, Rhododendron)

## Population Attributes

**Population**: Group of individuals of same species living in a defined area at a given time

### Population Characteristics

**1. Population Size (N)**
- Total number of individuals
- Measured as:
  - **Absolute number**: Exact count (200 deer)
  - **Relative number**: Percentage of quadrats occupied

**Measurement Methods**:
- **Total count**: For small populations, sedentary organisms
- **Sampling**: Count in representative areas, extrapolate
- **Pug marks**: Tigers counted by pug mark identification
- **Fecal pellets**: Deer population

**2. Population Density (N/Area)**
- Number of individuals per unit area or volume
- **Example**: 200 Parthenium plants per hectare

**3. Birth Rate (Natality)**
- Number of births per 1000 individuals per year
- **Example**: If 8 births in population of 40, birth rate = 8/40 = 0.2 or 20%

**4. Death Rate (Mortality)**
- Number of deaths per 1000 individuals per year

**5. Age Distribution (Age Pyramid)**

Shows proportion of individuals in different age groups

**Three Age Groups**:
- **Pre-reproductive**: Young, not yet reproducing
- **Reproductive**: Adults, breeding
- **Post-reproductive**: Old, no longer reproducing

**Types of Age Pyramids**:

**A. Expanding (Triangular)**
- Large pre-reproductive base
- **Growing population**
- Example: India (human population)

**B. Stable (Bell-shaped)**
- Moderate pre-reproductive group
- **Stable population**
- Birth rate ≈ Death rate

**C. Declining (Urn-shaped)**
- Small pre-reproductive base
- **Declining population**
- Example: Many developed countries

**6. Sex Ratio**
- Ratio of males to females
- **Example**: 60% females, 40% males

**7. Immigration and Emigration**
- **Immigration**: Movement into population (+)
- **Emigration**: Movement out of population (-)

## Population Growth

**Growth Rate**: Change in population size over time

**Formula**: 
- **r (intrinsic rate of increase)** = (Births + Immigration) - (Deaths + Emigration)
- If **r > 0**: Population growing
- If **r < 0**: Population declining
- If **r = 0**: Population stable

### Growth Models

**1. Exponential Growth (J-shaped curve)**

**Conditions**: Unlimited resources, no competition

**Equation**: **dN/dt = rN**
- N = Population size
- r = Intrinsic rate of increase
- t = Time

**Integrated form**: **Nt = N₀ e^(rt)**
- Nt = Population at time t
- N₀ = Initial population
- e = Base of natural logarithm (2.718)

**Characteristics**:
- Accelerating growth
- J-shaped curve
- **Rare in nature** (only in ideal conditions)
- Example: Bacterial growth in unlimited medium

**2. Logistic Growth (S-shaped/Sigmoid curve)**

**Realistic model**: Considers limited resources

**Equation**: **dN/dt = rN(K-N)/K**
- K = **Carrying capacity** (maximum population size environment can sustain)
- (K-N)/K = **Environmental resistance**

**Phases**:

**A. Lag Phase**
- Slow growth
- Population adapting to environment

**B. Acceleration Phase (Log/Exponential Phase)**
- Rapid growth
- Resources abundant

**C. Deceleration Phase**
- Growth rate slows
- Resources becoming limited
- Competition increases

**D. Asymptote (Plateau)**
- Population stabilizes at **carrying capacity (K)**
- Birth rate = Death rate
- Zero growth

**Carrying Capacity (K)**:
- Maximum population size sustainable by environment
- Determined by limiting resources (food, water, space, shelter)
- **Beyond K**: Population declines (deaths exceed births)

## Population Interactions

**Species Interactions**: Relationships between two species living together

### Types of Interactions

**1. Competition (- / -)**

Both species harmed

**Intraspecific Competition**: Within same species
- Competition for resources, mates, territory
- Regulates population size

**Interspecific Competition**: Between different species
- **Competitive Exclusion Principle (Gause's Principle)**:
  - Two species competing for identical resources cannot coexist
  - One species will outcompete and eliminate the other
  - **Example**: Paramecium aurelia outcompetes P. caudatum

**Resource Partitioning**:
- Species coexist by using slightly different resources or niches
- **Example**: MacArthur's warblers - five warbler species feed on different parts of same tree

**2. Predation (+ / -)**

**Predator** benefits, **prey** harmed

**Importance**:
- **Population control**: Regulates prey population
- **Energy transfer**: Prey energy to predator
- **Evolution**: Drives adaptations in both predator and prey

**Prey Defenses**:

**A. Camouflage (Cryptic coloration)**
- Blend with surroundings
- Example: Walking stick insect, leaf insects

**B. Chemical Defense**
- Toxic chemicals
- Example: Monarch butterfly (toxic from milkweed), poisonous frogs

**C. Warning Coloration (Aposematic)**
- Bright colors warn predators
- Example: Poison dart frogs, wasps

**D. Mimicry**
- **Batesian mimicry**: Harmless species mimics harmful one
  - Example: Viceroy butterfly (harmless) mimics Monarch (toxic)
- **Müllerian mimicry**: Two harmful species resemble each other
  - Reinforces predator learning

**Predator Strategies**:
- Speed, sharp claws/teeth
- Venom (snakes, spiders)
- Pack hunting (wolves)

**3. Parasitism (+ / -)**

**Parasite** benefits, **host** harmed

**Characteristics**:
- Parasite smaller than host
- Host remains alive (at least for a time)
- Specialized adaptations

**Types**:

**A. Ectoparasites** (External)
- Live on host surface
- Examples: Lice, ticks, mosquitoes, leeches

**B. Endoparasites** (Internal)
- Live inside host body
- Examples: 
  - **Plasmodium** (malaria)
  - **Taenia** (tapeworm)
  - **Ascaris** (roundworm)
  - **Liver fluke**

**Adaptations**:
- Loss of unnecessary organs (digestive system in tapeworm)
- High reproductive rate (millions of eggs)
- Hooks, suckers for attachment
- Resistant stages (cysts)

**Brood Parasitism**: Cuckoo (koel) lays eggs in crow's nest; crow raises cuckoo chick

**4. Commensalism (+ / 0)**

One species benefits, other unaffected

**Examples**:
- **Orchids on trees**: Orchid gets support, tree unaffected
- **Sucker fish (Remora) on shark**: Gets food scraps, transport; shark unaffected
- **Cattle egret and cattle**: Bird gets insects disturbed by cattle; cattle unaffected
- **Barnacles on whales**: Get substrate and food; whale unaffected

**5. Mutualism (+ / +)**

Both species benefit

**Examples**:

**A. Lichen** (Fungus + Alga)
- Fungus provides shelter, water, minerals
- Alga produces food (photosynthesis)

**B. Mycorrhiza** (Fungus + Plant roots)
- Fungus absorbs phosphorus, minerals for plant
- Plant provides carbohydrates to fungus

**C. Rhizobium + Legumes**
- Bacteria fix nitrogen for plant
- Plant provides shelter, nutrients to bacteria

**D. Pollination**
- Bees, butterflies get nectar
- Plants get pollinated

**E. Sea anemone + Clownfish**
- Clownfish protected by anemone's stinging cells (immune to them)
- Clownfish attracts prey for anemone

**F. Lichens** (classic example of obligate mutualism - neither can survive alone)

**6. Amensalism (- / 0)**

One species harmed, other unaffected

**Example**: 
- **Penicillium** secretes antibiotics, kills bacteria; fungus unaffected
- Large tree shading smaller plants (inhibits growth)

## Summary Points

1. Organisms respond to temperature through regulation, conforming, migration, or dormancy (hibernation, aestivation)
2. Water availability determines productivity; xerophytes have adaptations like CAM photosynthesis and succulent stems
3. Population characteristics include size, density, age distribution, sex ratio, birth/death rates
4. Exponential growth (J-curve) occurs with unlimited resources; logistic growth (S-curve) considers carrying capacity
5. Competitive exclusion principle states two species cannot coexist on identical resources indefinitely
6. Predator-prey interactions drive evolution of defenses (camouflage, toxins, mimicry) and hunting strategies
7. Mutualism benefits both species (lichens, mycorrhiza, Rhizobium-legume symbiosis)
`,

    visualizationsData: [
      {
        type: 'graph',
        title: 'Population Growth Curves',
        description: 'Exponential and logistic growth.'
      },
      {
        type: 'diagram',
        title: 'Population Interactions',
        description: 'Predation, competition, mutualism.'
      },
      {
        type: 'table',
        title: 'Population Parameters',
        description: 'N, r, K, birth and death rates.'
      },
      {
        type: 'comparison',
        title: 'r-selected vs K-selected',
        description: 'Life history strategies.'
      },
      {
        type: 'flowchart',
        title: 'Population Regulation',
        description: 'Factors -> response -> equilibrium.'
      },
    ],
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Organisms and Populations',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
      visualizationsData: [
        {
          type: 'graph',
          title: 'Population Growth Curves',
          description: 'Exponential and logistic growth.'
        },
        {
          type: 'diagram',
          title: 'Population Interactions',
          description: 'Predation, competition, mutualism.'
        },
        {
          type: 'table',
          title: 'Population Parameters',
          description: 'N, r, K, birth and death rates.'
        },
        {
          type: 'comparison',
          title: 'r-selected vs K-selected',
          description: 'Life history strategies.'
        },
        {
          type: 'flowchart',
          title: 'Population Regulation',
          description: 'Factors -> response -> equilibrium.'
        },
      ],}
  });

  console.log('✓ Seeded Biology Class 12 Chapter 13: Organisms and Populations');
}

seedBiologyClass12Chapter13().catch(console.error);
