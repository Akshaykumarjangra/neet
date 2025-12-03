import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter16() {
  console.log('Seeding Biology Class 12 Chapter 16: Environmental Issues...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 16,
    chapterTitle: 'Environmental Issues',
    introduction: `Human activities have created unprecedented environmental challenges threatening the planet's ecological balance. This chapter examines major environmental issues including air pollution and its health impacts, water pollution and eutrophication, solid waste management challenges, greenhouse effect and global warming, ozone layer depletion, deforestation consequences, and sustainable solutions through practices like organic farming, integrated pest management, and rainwater harvesting. Understanding these issues is essential for NEET as future healthcare professionals must address environment-related health problems and promote sustainable practices.`,

    detailedNotes: `
# Environmental Issues

## Introduction

**Environmental degradation**: Deterioration of environment through depletion of resources and destruction of ecosystems

**Major Issues**:
1. Air pollution
2. Water pollution
3. Soil pollution
4. Noise pollution
5. Global warming
6. Ozone depletion
7. Deforestation
8. Solid waste management

## Air Pollution

**Definition**: Presence of harmful substances in air in concentrations that adversely affect living organisms

### Sources

**1. Natural Sources**:
- Volcanic eruptions (SO₂, particulates)
- Forest fires (CO, smoke)
- Dust storms
- Pollen grains (allergens)

**2. Anthropogenic (Human-made) Sources**:
- **Automobiles**: Major source (CO, NO₂, hydrocarbons, particulates)
- **Industries**: Power plants, factories (SO₂, NO₂, particulates, heavy metals)
- **Domestic**: Cooking (biomass burning), heating
- **Agriculture**: Burning crop residue

### Major Air Pollutants

**1. Particulate Matter (PM)**
- **PM10**: Particles <10 μm diameter
- **PM2.5**: Particles <2.5 μm (most harmful, enter deep into lungs)
- **Sources**: Combustion, dust, construction
- **Effects**: Respiratory diseases, asthma, lung cancer

**2. Carbon Monoxide (CO)**
- **Source**: Incomplete combustion (automobiles)
- **Effects**: 
  - Binds to hemoglobin → **Carboxyhemoglobin** (reduces O₂ carrying capacity)
  - Can be fatal in high concentrations
  - Headache, dizziness, impaired vision

**3. Sulfur Dioxide (SO₂)**
- **Sources**: Coal burning, petroleum refineries, smelters
- **Effects**:
  - Respiratory problems, bronchitis
  - **Acid rain** (SO₂ + H₂O → H₂SO₄)
  - Damages plants, buildings, aquatic life

**4. Nitrogen Oxides (NOₓ: NO, NO₂)**
- **Sources**: Automobiles, industries, power plants
- **Effects**:
  - Respiratory irritation
  - **Photochemical smog** formation
  - **Acid rain** (HNO₃)

**5. Ozone (O₃)** (Ground-level)
- **Formation**: Secondary pollutant (from NO₂ + hydrocarbons + sunlight)
- **Photochemical smog** component
- **Effects**: 
  - Eye irritation, respiratory problems
  - Damages plants, rubber, plastics

**6. Lead (Pb)**
- **Source**: Leaded petrol (now banned in many countries)
- **Effects**: Neurological damage (especially children), anemia

### Effects of Air Pollution

**Health Effects**:
- **Respiratory diseases**: Asthma, bronchitis, emphysema, lung cancer
- **Cardiovascular diseases**
- **Eye irritation**
- **Neurological effects** (lead, mercury)
- **Premature death**

**Environmental Effects**:
- **Acid rain**: Damages forests, acidifies lakes
- **Visibility reduction**: Smog, haze
- **Crop damage**: Ozone damages leaves
- **Material damage**: Corrosion of buildings, monuments
  - **Taj Mahal**: Marble yellowing from SO₂ (**marble cancer**)

### Smog

**Classical Smog (London Smog)**:
- **Smoke + Fog**
- **Composition**: SO₂ + particulates
- **Occurs**: Cool, humid conditions
- **Reducing** in nature

**Photochemical Smog (Los Angeles Smog)**:
- **Formation**: NO₂ + hydrocarbons + sunlight → O₃ + PAN
- **PAN**: Peroxyacetyl nitrate (eye irritant)
- **Occurs**: Warm, sunny conditions
- **Oxidizing** in nature
- Brownish haze

### Control Measures

**1. Source Control**:
- Use cleaner fuels (CNG, LPG, electric vehicles)
- Catalytic converters in vehicles (convert CO, NOₓ to CO₂, N₂)
- Industrial emission controls (scrubbers, electrostatic precipitators)
- Phasing out leaded petrol

**2. Regulatory Measures**:
- Emission standards (Bharat Stage norms in India)
- Air Quality Index (AQI) monitoring
- Banning crop burning

**3. Plantation**: 
- Trees absorb CO₂, release O₂
- Act as windbreaks, dust filters

## Water Pollution

**Definition**: Contamination of water bodies (rivers, lakes, groundwater, oceans) making it unsuitable for use

### Sources

**1. Point Sources**: Specific discharge points
- Industrial effluents
- Sewage treatment plants
- Oil spills

**2. Non-Point Sources**: Diffuse sources
- Agricultural runoff (fertilizers, pesticides)
- Urban runoff
- Atmospheric deposition

### Types of Water Pollutants

**1. Organic Pollutants**:
- Sewage (human/animal waste)
- Organic chemicals (pesticides, detergents)
- **Effect**: High **BOD** (Biological Oxygen Demand)

**2. Inorganic Pollutants**:
- Heavy metals (Hg, Pb, Cd, As)
- Acids, salts
- Fertilizers (nitrates, phosphates)

**3. Pathogens**:
- Bacteria, viruses, protozoa
- Cause waterborne diseases

**4. Thermal Pollution**:
- Hot water from industries, power plants
- Reduces dissolved oxygen

**5. Radioactive Pollutants**:
- Nuclear plants, mining

### Eutrophication

**Definition**: Nutrient enrichment (especially N, P) of water bodies

**Process**:
1. **Nutrient input**: Fertilizer runoff, sewage → excess N, P in water
2. **Algal bloom**: Rapid growth of algae (green scum on surface)
3. **Light blocked**: Algae block sunlight to submerged plants
4. **Plant death**: Submerged plants die (no photosynthesis)
5. **Decomposition**: Bacteria decompose dead organic matter
6. **Oxygen depletion**: Decomposers consume dissolved oxygen
7. **Hypoxia/Anoxia**: Low/no oxygen
8. **Fish death**: Fish and other aerobic organisms die
9. **Dead zone**: Water body becomes lifeless

**Accelerated by**: Agricultural runoff (fertilizers), sewage, detergents (phosphates)

**Examples**: 
- Gulf of Mexico dead zone
- Lakes in India (Dal Lake)

### Biomagnification (Biological Magnification)

**Definition**: Increase in concentration of toxic substances at successive trophic levels

**Mechanism**:
- Non-biodegradable pollutants (DDT, mercury, PCBs) not broken down
- Accumulate in organisms
- Transferred through food chain
- **Concentrated** at higher trophic levels

**Example - DDT**:
- Water: 0.02 ppm
- Phytoplankton: 5 ppm
- Small fish: 50 ppm
- Large fish: 500 ppm
- Birds (top predator): 2,000 ppm (100,000× concentration)

**Effects**:
- **DDT in birds**: Eggshell thinning, reproductive failure
- **Mercury**: Minamata disease (Japan) - neurological disorder from mercury-contaminated fish
- Top predators (eagles, pelicans) most affected

### Control Measures

**1. Wastewater Treatment**: 
- Primary, secondary, tertiary treatment before discharge

**2. Reduce Chemical Use**:
- Minimize fertilizers, pesticides
- Organic farming

**3. Industrial Control**:
- Pre-treatment of effluents
- Zero liquid discharge

**4. Public Awareness**: 
- Don't dump waste in water bodies

**5. Wetland Conservation**: 
- Natural water purification

## Solid Waste Management

**Solid waste**: Garbage, refuse (paper, plastic, metal, glass, organic waste)

**Sources**: 
- Domestic (households)
- Industrial
- Agricultural
- Medical (biomedical waste)

### E-Waste (Electronic Waste)

**Definition**: Discarded electronic devices (computers, phones, TVs, batteries)

**Problems**:
- Contains **heavy metals** (Pb, Hg, Cd)
- Toxic to health and environment
- Growing rapidly (shortest lifespan products)

**Management**:
- Recycling (recover metals)
- Proper disposal (not in landfills)
- E-waste collection centers

### Management Strategies

**3 R's**:

**1. Reduce**: 
- Minimize waste generation
- Avoid single-use plastics

**2. Reuse**: 
- Use items multiple times
- Donate old items

**3. Recycle**: 
- Convert waste to new products
- Paper, plastic, glass, metal recycling

**Composting**: 
- Organic waste → compost (fertilizer)
- Reduces landfill waste

**Sanitary Landfills**: 
- Waste buried in engineered sites
- Leachate collection
- Methane capture (biogas)

**Incineration**: 
- Burning waste (energy recovery)
- Reduces volume
- May cause air pollution if not controlled

## Greenhouse Effect and Global Warming

### Greenhouse Effect

**Definition**: Natural warming of Earth's surface due to atmospheric gases trapping heat

**Mechanism**:
1. Sunlight reaches Earth (shortwave radiation)
2. Earth absorbs, heats up
3. Earth emits heat (longwave infrared radiation)
4. **Greenhouse gases** absorb and re-emit infrared radiation
5. Some heat trapped → Earth stays warm

**Natural greenhouse effect**: Essential for life (without it, Earth would be -18°C)

**Enhanced greenhouse effect**: Excess greenhouse gases → excess warming

### Greenhouse Gases

**Major GHGs**:
1. **Carbon dioxide (CO₂)**: 60% contribution
   - Sources: Fossil fuel burning, deforestation
2. **Methane (CH₄)**: 20%
   - Sources: Rice paddies, cattle, landfills, wetlands
3. **Chlorofluorocarbons (CFCs)**: 14%
   - Sources: Refrigerants, aerosols
4. **Nitrous oxide (N₂O)**: 6%
   - Sources: Fertilizers, combustion

**Water vapor**: Most abundant, but not counted (natural cycle)

### Global Warming

**Definition**: Increase in Earth's average temperature due to enhanced greenhouse effect

**Evidence**:
- Average temperature increased **~1°C since 1880**
- **Glaciers melting** (Himalayan, polar)
- **Sea level rising** (~20 cm in 20th century)
- **Arctic ice declining**
- **Extreme weather events** increasing

**Projected impacts**:
- **Temperature rise**: 1.5-5°C by 2100 (depends on emissions)
- **Sea level rise**: 0.3-1 m (coastal flooding, island nations submerged)
- **Extreme weather**: More droughts, floods, heatwaves, hurricanes
- **Ecosystem disruption**: Species extinction, coral bleaching
- **Agriculture**: Crop yield changes, water scarcity
- **Human health**: Heat stress, disease spread

### Mitigation Strategies

**1. Reduce GHG Emissions**:
- **Renewable energy**: Solar, wind, hydro (replace fossil fuels)
- **Energy efficiency**: LED bulbs, efficient appliances
- **Afforestation**: Plant trees (carbon sinks)
- **Sustainable transport**: Public transport, electric vehicles

**2. International Agreements**:
- **Kyoto Protocol** (1997): Reduce GHG emissions
- **Paris Agreement** (2015): Limit warming to <2°C (preferably 1.5°C)

**3. Carbon Sequestration**: 
- Capture CO₂, store underground

## Ozone Layer Depletion

### Ozone Layer

**Location**: Stratosphere (15-35 km altitude)

**Formation**: 
- O₂ + UV → O + O
- O + O₂ → O₃ (ozone)

**Function**: **Shields Earth from harmful UV radiation**
- UV-B (280-320 nm) most damaging

### Ozone Depletion

**Ozone Hole**: 
- Discovered in **1985 over Antarctica**
- Seasonal thinning (Antarctic spring: September-November)

**Cause**: **Chlorofluorocarbons (CFCs)**
- Refrigerants (Freon), aerosols, foam
- Extremely stable, reach stratosphere
- UV breaks CFC → release Cl atoms

**Mechanism**:
1. CFCl₃ + UV → CFCl₂ + **Cl**
2. **Cl + O₃ → ClO + O₂** (ozone destroyed)
3. ClO + O → **Cl** + O₂ (Cl regenerated)
4. **One Cl atom destroys 100,000 O₃ molecules** (catalytic)

### Effects of Ozone Depletion

**Increased UV-B radiation**:
- **Skin cancer** (melanoma), cataracts
- **Immune suppression**
- **Crop damage**: Reduced yields
- **Phytoplankton decline**: Disrupts marine food web
- **Material damage**: Plastics, paints degrade

### Solutions

**Montreal Protocol** (1987):
- International treaty to **phase out CFCs**
- Most successful environmental agreement
- **Ozone layer recovering** (expected full recovery by 2060-2070)

**Alternatives to CFCs**:
- HFCs (hydrofluorocarbons) - less harmful but still GHGs
- Ammonia, CO₂-based refrigerants

## Deforestation

**Definition**: Clearing forests for agriculture, urbanization, logging

**Causes**:
- Agricultural expansion
- Logging (timber, fuelwood)
- Infrastructure (roads, dams)
- Urbanization

**Effects**:
- **Biodiversity loss**: Habitat destruction
- **Climate change**: Forests are carbon sinks; deforestation releases CO₂
- **Soil erosion**: Tree roots bind soil
- **Disrupted water cycle**: Less transpiration, reduced rainfall
- **Flooding**: Loss of water absorption capacity
- **Indigenous people displacement**

**Solutions**:
- **Afforestation/Reforestation**: Plant trees
- **Sustainable forestry**: Selective logging, replanting
- **Agroforestry**: Combine crops with trees
- **Legal protection**: National parks, reserves

## Sustainable Practices

### Organic Farming

**Definition**: Farming without synthetic chemicals (fertilizers, pesticides)

**Practices**:
- **Compost, manure**: Natural fertilizers
- **Biofertilizers**: Rhizobium, Azotobacter
- **Biopesticides**: Neem, Bt
- **Crop rotation**: Improves soil
- **Green manure**: Legume cover crops

**Advantages**:
- No chemical residues (healthier food)
- Soil fertility maintained
- Biodiversity-friendly
- Reduced pollution

### Integrated Pest Management (IPM)

**Definition**: Combination of biological, cultural, physical, and minimal chemical methods to control pests

**Components**:
- **Biological control**: Natural predators (ladybird for aphids)
- **Cultural control**: Crop rotation, resistant varieties
- **Mechanical control**: Handpicking, traps
- **Chemical control**: Pesticides as **last resort**, targeted application

**Advantages**:
- Reduces pesticide use
- Prevents resistance development
- Eco-friendly

### Rainwater Harvesting

**Definition**: Collection and storage of rainwater for later use

**Methods**:
- **Rooftop harvesting**: Collect from roofs → tanks
- **Surface runoff harvesting**: Ponds, check dams
- **Groundwater recharge**: Recharge pits, percolation tanks

**Benefits**:
- Reduces water scarcity
- Recharges groundwater
- Reduces flooding
- Reduces dependency on external sources

### Case Studies

**Amrita Devi Bishnoi**: 
- Sacrificed life (1730) to protect Khejri trees (Rajasthan)
- **Chipko Movement** inspired by this

**Chipko Movement** (1970s):
- **Hugging trees** to prevent logging
- Uttarakhand (Himalayan region)
- Led by Sunderlal Bahuguna

**Appiko Movement**: 
- Similar to Chipko, in Western Ghats (Karnataka)

## Summary Points

1. Air pollution from automobiles and industries causes respiratory diseases; CO binds hemoglobin reducing oxygen transport
2. Eutrophication results from nutrient enrichment causing algal blooms, oxygen depletion, and dead zones
3. Biomagnification concentrates non-biodegradable pollutants (DDT, mercury) at higher trophic levels
4. Enhanced greenhouse effect from CO₂, CH₄, CFCs causes global warming with rising temperatures and sea levels
5. CFCs deplete stratospheric ozone through catalytic destruction; Montreal Protocol phased out CFCs
6. Deforestation causes biodiversity loss, climate change, soil erosion, and disrupted water cycles
7. Sustainable practices include organic farming, IPM, and rainwater harvesting to reduce environmental impact
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Environmental Issues',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Biology Class 12 Chapter 16: Environmental Issues');
}

seedBiologyClass12Chapter16().catch(console.error);
