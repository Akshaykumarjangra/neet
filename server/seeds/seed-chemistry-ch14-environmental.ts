import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter14() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 14: Environmental Chemistry...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 14,
    chapterTitle: 'Environmental Chemistry',
    introduction: `Environmental chemistry studies the chemical and biochemical phenomena occurring in natural environments and the effects of human activities on ecosystems. This chapter explores atmospheric, water, and soil pollution, their sources, effects, and control measures. It covers critical global issues like greenhouse effect, global warming, ozone layer depletion, and acid rain. Understanding environmental chemistry is essential for sustainable development, pollution control, and protecting our planet for future generations. The chapter also introduces green chemistry principles for environmentally friendly chemical processes.`,

    detailedNotes: `## Environmental Pollution

**Definition:** Introduction of harmful substances or energy into the environment causing adverse effects

**Types:**
1. Air pollution
2. Water pollution
3. Soil pollution
4. Noise pollution
5. Radioactive pollution
6. Thermal pollution

## Atmospheric Pollution

### Tropospheric Pollution

The **troposphere** is the lowest layer of atmosphere (up to 10-12 km).

### Major Air Pollutants

**1. Gaseous Pollutants**

**a) Oxides of Sulfur (SO₂, SO₃)**

**Sources:**
- Combustion of fossil fuels (coal, petroleum)
- Volcanic eruptions
- Industrial processes (smelting)

**Effects:**
- Respiratory problems, asthma
- Acid rain formation: SO₂ + H₂O → H₂SO₃
- Damages buildings (corrosion of metals, marble)
- Harms vegetation

**Control:**
- Use low-sulfur fuels
- Flue gas desulfurization (scrubbers)
- CaO + SO₂ → CaSO₃

**b) Oxides of Nitrogen (NO, NO₂)**

**Sources:**
- Automobile exhaust (high-temperature combustion)
- Power plants
- Industrial processes

**Formation:**
N₂ + O₂ → 2NO (in engines at high temp)
2NO + O₂ → 2NO₂

**Effects:**
- Respiratory irritation
- Photochemical smog formation
- Acid rain: 4NO₂ + O₂ + 2H₂O → 4HNO₃
- Damages plants

**Control:**
- Catalytic converters in automobiles
- CNG (Compressed Natural Gas) as fuel

**c) Carbon Monoxide (CO)**

**Sources:**
- Incomplete combustion of carbon fuels
- Automobiles (major source)
- Forest fires

**Effects:**
- Highly toxic (binds to hemoglobin)
- CO + Hb → COHb (carboxyhemoglobin, stable)
- Reduces oxygen-carrying capacity of blood
- Causes headaches, dizziness, death at high concentrations

**Control:**
- Proper ventilation
- Catalytic converters: 2CO + O₂ → 2CO₂

**d) Carbon Dioxide (CO₂)**

**Sources:**
- Combustion of fossil fuels
- Respiration
- Deforestation

**Effects:**
- Greenhouse gas (global warming)
- Ocean acidification
- Normal concentration: 0.03-0.04%

**e) Hydrocarbons**

**Sources:**
- Unburnt fuel from automobiles
- Petroleum refineries
- Evaporation of solvents

**Effects:**
- Some are carcinogenic (benzene, benzopyrene)
- Photochemical smog formation

**f) Hydrogen Sulfide (H₂S)**

**Sources:**
- Volcanic eruptions
- Decay of organic matter
- Petroleum refineries

**Effects:**
- Toxic, foul smell
- Respiratory irritation

**2. Particulate Pollutants**

**Types:**
- Smoke (carbon particles)
- Dust (solid particles)
- Mist (liquid droplets)
- Fumes (solid particles from condensation)

**Sources:**
- Industrial emissions
- Construction activities
- Automobiles
- Natural (volcanic ash, pollen)

**Effects:**
- Respiratory diseases (bronchitis, asthma)
- Reduces visibility
- Damages materials

**Control:**
- Electrostatic precipitators
- Scrubbers
- Bag filters
- Cyclone collectors

### Photochemical Smog

**Formation:**
- Occurs in warm, dry, sunny climate
- Primary pollutants: NO, hydrocarbons (from automobiles)
- Sunlight triggers photochemical reactions

**Reactions:**
NO₂ + hν → NO + O
O + O₂ → O₃ (ozone)
O₃ + NO → NO₂ + O₂

**Formation of PAN (Peroxyacetyl Nitrate):**
Hydrocarbons + NO₂ + O₃ → PAN

**Effects:**
- Eye irritation, breathing difficulty
- Plant damage
- Rubber cracking

**Control:**
- Use of catalytic converters
- Plantation of certain trees (e.g., Pinus, Juniparus)
- Use of CNG

### Global Warming and Greenhouse Effect

**Greenhouse Effect:**
- Natural warming of Earth's surface
- Greenhouse gases trap infrared radiation
- Essential for life (without it, Earth would be -18°C)

**Greenhouse Gases:**
- CO₂ (major contributor)
- CH₄ (methane)
- N₂O (nitrous oxide)
- CFCs (chlorofluorocarbons)
- Water vapor

**Global Warming:**
- Enhanced greenhouse effect due to human activities
- Average temperature increase
- CO₂ levels increased from 280 ppm (pre-industrial) to 410+ ppm (current)

**Effects:**
- Melting of polar ice caps
- Rising sea levels
- Extreme weather events
- Ecosystem disruption
- Agricultural impacts

**Control:**
- Reduce fossil fuel consumption
- Renewable energy (solar, wind)
- Afforestation
- International agreements (Paris Agreement, Kyoto Protocol)

### Acid Rain

**Definition:** Rain with pH < 5.6 (normal rain pH ≈ 5.6 due to dissolved CO₂)

**Formation:**
SO₂ + ½O₂ → SO₃
SO₃ + H₂O → H₂SO₄

2NO₂ + H₂O → HNO₃ + HNO₂
4NO₂ + O₂ + 2H₂O → 4HNO₃

**Effects:**
- Damages buildings, monuments (marble cancer)
  CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂
- Soil acidification (leaches nutrients)
- Harms aquatic life
- Damages forests

**Control:**
- Reduce SO₂ and NOₓ emissions
- Use catalytic converters
- Liming of lakes (add CaCO₃)

## Stratospheric Pollution

The **stratosphere** extends from 10-50 km above Earth's surface.

### Ozone Layer

**Formation:**
O₂ + UV → 2O (oxygen atoms)
O + O₂ → O₃ (ozone)

**Importance:**
- Shields Earth from harmful UV-B radiation
- Concentration maximum at 25-30 km (ozone layer)

**UV Radiation Effects (without ozone protection):**
- Skin cancer
- Cataracts
- Immune system suppression
- Damage to marine phytoplankton
- Crop damage

### Ozone Depletion

**Ozone Hole:**
- Significant decrease in ozone concentration
- First observed over Antarctica (1980s)
- Seasonal (September-November)

**Causes:**

**1. Chlorofluorocarbons (CFCs):**
- Used in refrigerators, air conditioners, aerosols
- Examples: CFCl₃ (CFC-11), CF₂Cl₂ (CFC-12)
- Very stable, reach stratosphere

**Mechanism:**
CFCl₃ + UV → CFCl₂ + Cl•
Cl• + O₃ → ClO• + O₂
ClO• + O → Cl• + O₂
**Net:** O₃ + O → 2O₂

- Cl• acts as catalyst (regenerated)
- One Cl• can destroy ~100,000 O₃ molecules

**2. Other Ozone Depleting Substances:**
- Halons (fire extinguishers)
- Carbon tetrachloride (CCl₄)
- Methyl bromide (CH₃Br)
- NOₓ from supersonic aircraft

**Control:**
- **Montreal Protocol (1987):** International treaty to phase out CFCs
- Use of CFC alternatives:
  - HFCs (Hydrofluorocarbons) - temporary
  - HCFCs (Hydrochlorofluorocarbons) - transitional
- Green refrigerants (hydrocarbons, ammonia, CO₂)

## Water Pollution

**Sources:**

**1. Domestic Sewage:**
- Organic matter, detergents
- Pathogenic microorganisms

**2. Industrial Effluents:**
- Heavy metals (Pb, Hg, Cd, As)
- Acids, alkalis
- Organic chemicals
- Thermal pollution

**3. Agricultural Runoff:**
- Fertilizers (nitrates, phosphates)
- Pesticides, herbicides

**4. Oil Spills:**
- Marine pollution
- Harms aquatic life

### Major Water Pollutants

**1. Organic Matter:**
- Depletes dissolved oxygen (DO)
- Measured by BOD (Biochemical Oxygen Demand)
- High BOD = high pollution

**2. Pathogens:**
- Bacteria (Salmonella, E. coli)
- Viruses (hepatitis, polio)
- Protozoa (Giardia)
- Waterborne diseases

**3. Heavy Metals:**
- Mercury: Minamata disease (neurological damage)
- Lead: Brain damage, anemia
- Cadmium: Itai-itai disease (bone damage)
- Arsenic: Skin lesions, cancer

**4. Pesticides:**
- DDT, BHC, organophosphates
- Bioaccumulation, biomagnification
- Persistent organic pollutants (POPs)

**5. Eutrophication:**
- Excessive nutrients (N, P) in water
- Algal bloom
- Oxygen depletion
- Fish kill

**6. Fluoride:**
- Essential in small amounts (prevents tooth decay)
- Excess: Fluorosis (mottled teeth, skeletal damage)

**7. Nitrates:**
- From fertilizers, sewage
- Blue baby syndrome (methemoglobinemia)

### Water Quality Parameters

**1. pH:**
- Should be 6.5-8.5 for drinking water

**2. Dissolved Oxygen (DO):**
- Essential for aquatic life
- Clean water: 8-9 ppm

**3. BOD (Biochemical Oxygen Demand):**
- Oxygen required by bacteria to decompose organic matter
- Low BOD = clean water
- High BOD = polluted water

**4. Total Dissolved Solids (TDS):**
- Dissolved minerals, salts
- High TDS = hard water, unfit for drinking

### Water Treatment

**1. Domestic Water Treatment:**
- Sedimentation (removes suspended particles)
- Filtration (sand filters)
- Chlorination (disinfection)
- Ozonation (alternative disinfectant)

**2. Sewage Treatment:**

**Primary Treatment:**
- Physical removal of solids
- Sedimentation, screening

**Secondary Treatment:**
- Biological degradation
- Activated sludge process
- Trickling filters

**Tertiary Treatment:**
- Advanced treatment
- Removal of nutrients, heavy metals
- Disinfection

## Soil Pollution

**Sources:**
- Industrial wastes
- Agricultural chemicals
- Domestic wastes
- Acid rain

**Pollutants:**
- Heavy metals
- Pesticides
- Plastics
- Radioactive materials

**Effects:**
- Reduced soil fertility
- Bioaccumulation in food chain
- Groundwater contamination

**Control:**
- Proper waste disposal
- Recycling and composting
- Organic farming
- Bioremediation

## Green Chemistry

**Definition:** Design of chemical products and processes that reduce or eliminate hazardous substances

**Twelve Principles of Green Chemistry:**

1. **Prevention:** Prevent waste rather than treat/clean up
2. **Atom Economy:** Maximize incorporation of reactants into products
3. **Less Hazardous Synthesis:** Use/generate less toxic substances
4. **Designing Safer Chemicals:** Minimize toxicity while maintaining function
5. **Safer Solvents:** Use safer, preferably aqueous solvents
6. **Energy Efficiency:** Minimize energy requirements
7. **Renewable Feedstocks:** Use renewable raw materials
8. **Reduce Derivatives:** Minimize temporary modifications
9. **Catalysis:** Use catalytic reagents (not stoichiometric)
10. **Degradable Design:** Products should break down after use
11. **Real-Time Pollution Prevention:** Monitor processes to prevent pollution
12. **Safer Chemistry for Accident Prevention:** Minimize hazards, explosions

**Examples:**
- Use of H₂O₂ instead of Cl₂ for bleaching
- Use of CO₂ as blowing agent instead of CFCs
- Enzymatic catalysis
- Solvent-free reactions
- Microwave-assisted synthesis

## Strategies for Environmental Protection

1. **3 R's:** Reduce, Reuse, Recycle
2. **Renewable Energy:** Solar, wind, hydroelectric
3. **Waste Management:** Proper disposal, composting
4. **Afforestation:** Plant trees
5. **Pollution Control:** Catalytic converters, scrubbers
6. **Environmental Laws:** Clean Air Act, Water Act
7. **International Cooperation:** Climate agreements
8. **Public Awareness:** Education, campaigns
9. **Green Technology:** Sustainable practices
10. **Biodegradable Materials:** Replace plastics`,

    keyConcepts: [
      'Atmospheric pollution: gaseous and particulate pollutants',
      'Major air pollutants: SOₓ, NOₓ, CO, CO₂, hydrocarbons',
      'Photochemical smog: NO, O₃, PAN formation in sunlight',
      'Greenhouse effect and global warming: CO₂, CH₄, CFCs',
      'Acid rain: pH < 5.6 from SOₓ and NOₓ',
      'Ozone layer: UV protection in stratosphere',
      'Ozone depletion: CFCs release Cl• radicals',
      'Montreal Protocol: international CFC phase-out',
      'Water pollution: organic matter, heavy metals, eutrophication',
      'BOD: measure of organic pollution in water',
      'Soil pollution: pesticides, heavy metals, plastics',
      'Green chemistry: 12 principles for sustainable chemistry',
      'Environmental protection: reduce, reuse, recycle'
    ],

    formulas: [
      'SO₂ + H₂O → H₂SO₃',
      '2NO + O₂ → 2NO₂',
      '4NO₂ + O₂ + 2H₂O → 4HNO₃',
      'CO + Hb → COHb',
      'O₂ + UV → 2O',
      'O + O₂ → O₃',
      'CFCl₃ + UV → CFCl₂ + Cl•',
      'Cl• + O₃ → ClO• + O₂',
      'ClO• + O → Cl• + O₂',
      'CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂ (marble cancer)'
    ],

    learningObjectives: [
      'Identify sources and effects of major air pollutants',
      'Explain formation and effects of photochemical smog',
      'Understand greenhouse effect and global warming',
      'Describe acid rain formation and its impacts',
      'Explain ozone layer formation and importance',
      'Understand mechanism of ozone depletion by CFCs',
      'Identify sources and types of water pollution',
      'Explain BOD as water quality parameter',
      'Describe water and sewage treatment processes',
      'Understand sources and effects of soil pollution',
      'Apply principles of green chemistry',
      'Suggest strategies for environmental protection'
    ],

    prerequisites: [
      'Basic chemistry concepts (Chapter 1)',
      'Redox reactions (Chapter 8)',
      'Atmospheric composition and structure',
      'Understanding of pH and acids/bases',
      'Knowledge of catalysis',
      'Environmental awareness'
    ],

    importantTopics: [
      'Major air pollutants: sources, effects, control',
      'Photochemical smog formation (NO₂ + hν)',
      'Greenhouse gases and global warming',
      'Acid rain: H₂SO₄ and HNO₃ formation',
      'Ozone formation: O₂ + UV → O → O₃',
      'CFC-ozone depletion mechanism (Cl• catalyst)',
      'Montreal Protocol and CFC alternatives',
      'BOD: biochemical oxygen demand concept',
      'Eutrophication: algal bloom, oxygen depletion',
      'Minamata disease (Hg), Itai-itai (Cd), fluorosis',
      'Green chemistry: 12 principles',
      'Control measures: catalytic converters, scrubbers, sewage treatment'
    ],

    ncertChapterRef: 'Chapter 14, Pages 399-419',

    difficultyLevel: 3,
    estimatedStudyMinutes: 240,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Greenhouse Effect',
        description: 'Visual representation of greenhouse gases trapping infrared radiation and global warming'
      },
      {
        type: 'concept',
        title: 'Ozone Depletion Mechanism',
        description: 'Step-by-step animation showing CFC breakdown and Cl• catalytic cycle destroying ozone'
      },
      {
        type: 'concept',
        title: 'Acid Rain Formation',
        description: 'Process diagram showing SO₂/NO₂ conversion to sulfuric/nitric acid and effects on marble'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 14: Environmental Chemistry seeded successfully');
}

seedChemistryChapter14()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
