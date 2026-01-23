import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter15() {
  console.log('Seeding Biology Class 12 Chapter 15: Biodiversity and Conservation...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 15,
    chapterTitle: 'Biodiversity and Conservation',
    introduction: `Biodiversity encompasses the variety of life on Earth at all levels - from genes to ecosystems. This chapter explores patterns of biodiversity across latitudes and altitudes, the immense value of biodiversity for ecosystem services and human welfare, major threats causing unprecedented extinction rates, biodiversity hotspots requiring urgent conservation, and strategies for both in-situ and ex-situ conservation. Understanding biodiversity conservation is critical for NEET as it addresses one of the most pressing environmental challenges facing humanity and future generations.`,

    detailedNotes: `
# Biodiversity and Conservation

## What is Biodiversity?

**Biodiversity (Biological Diversity)**: Variability among living organisms from all sources including terrestrial, marine, and other aquatic ecosystems

**Term coined by**: Edward O. Wilson

### Levels of Biodiversity

**1. Genetic Diversity**
- Variation in genes within a species
- Different alleles, gene combinations
- **Examples**:
  - Different varieties of rice (Basmati, IR-8, Kalanamak)
  - Different breeds of dogs (all *Canis familiaris*)
  - Human genetic diversity (blood groups, skin color)
- **Importance**: 
  - Source of variation for evolution
  - Crop/livestock breeding
  - Disease resistance

**2. Species Diversity**
- Variety of species in a region
- Number of different species (species richness)
- **Examples**:
  - Western Ghats: High diversity
  - Thar Desert: Low diversity
- Measured by **species richness** and **species evenness**

**3. Ecological Diversity**
- Variety of ecosystems in a region
- **Examples**: Forests, grasslands, deserts, wetlands, coral reefs, tundra
- India: High ecosystem diversity (deserts, rainforests, mangroves, coral reefs, alpine)

## Global Biodiversity

**Estimated species**: 
- **Known and described**: ~1.8-2 million species
- **Estimated total**: 5-50 million species (most undiscovered)
- **Insects**: >70% of all species
- **Plants**: ~270,000 species
- **Fungi**: ~100,000 species (estimated 1.5 million)

**Species-rich groups**:
1. **Insects**: >1 million species (beetles alone: 300,000)
2. **Plants**: 270,000+
3. **Fungi**: 100,000+
4. **Fishes**: 28,000
5. **Birds**: 10,000
6. **Reptiles**: 9,000
7. **Mammals**: 5,500
8. **Amphibians**: 6,500

## Patterns of Biodiversity

### Latitudinal Gradient

**Pattern**: Species diversity **decreases from equator to poles**

**Tropical regions** (near equator):
- **Highest biodiversity**
- Tropical rainforests (Amazon, Congo, Southeast Asia)
- More species than temperate/polar regions

**Polar regions**:
- **Lowest biodiversity**
- Fewer species

**Reasons for tropical richness**:

1. **Constant climate**: 
   - Less seasonal variation
   - Species not subjected to harsh winters
   - More **niche specialization**

2. **Longer evolutionary time**:
   - Tropics remained undisturbed for millions of years
   - More time for speciation, diversification

3. **More solar energy**:
   - Higher productivity
   - More resources support more species

**Examples**:
- **Amazon rainforest**: ~40,000 plant species
- **Tropical forest (1 hectare)**: May have more tree species than entire temperate country
- **India**: ~45,000 plant species (10% of world flora)

### Species-Area Relationship

**Discovered by**: Alexander von Humboldt

**Pattern**: **Species richness increases with area**

**Equation**: **S = cA^z**
- S = Species richness
- A = Area
- c = Y-intercept constant
- z = Slope (regression coefficient)

**Log form**: **log S = log c + z log A**
- Straight line on log-log plot
- **z value**: 
  - Small areas: z = 0.1 to 0.2
  - Large areas/continents: z = 0.6 to 1.2

**Implications**:
- Larger areas harbor more species
- **Habitat fragmentation** reduces area → species loss

## Importance of Biodiversity

### 1. Economic/Direct Use Value

**Food**: 
- Crops, fruits, vegetables, meat, fish
- **Example**: 90% of world's food from ~20 plant species

**Medicine**:
- **25% of drugs** derived from plants
- **Examples**:
  - **Quinine** (from *Cinchona*): Malaria treatment
  - **Taxol** (from *Taxus*): Cancer treatment
  - **Morphine** (from opium poppy): Pain relief
  - **Aspirin** (from willow bark)
- **Future potential**: Many undiscovered medicinal compounds

**Industrial Products**:
- Timber, rubber, fiber, dyes, resins, oils
- **Examples**: Rubber from *Hevea brasiliensis*, cotton, jute

### 2. Ecosystem Services

**Pollination**: 
- Bees, butterflies, birds pollinate crops
- **Economic value**: Billions of dollars
- **Without pollinators**: Food production collapses

**Oxygen production**: 
- **Photosynthesis** by plants, algae
- **Amazon rainforest**: "Lungs of Earth"

**Climate regulation**:
- Forests absorb CO₂ (carbon sink)
- Regulate temperature, rainfall

**Soil formation**: 
- Decomposers recycle nutrients
- Earthworms, bacteria maintain soil fertility

**Water purification**:
- Wetlands filter pollutants
- Natural water purification

**Flood control**: Forests, wetlands absorb excess water

**Waste decomposition**: Bacteria, fungi break down organic waste

### 3. Aesthetic and Cultural Value

- Recreation, tourism (ecotourism)
- Spiritual, religious significance
- Inspiration for art, poetry, culture

### 4. Ethical Value

- **Intrinsic value**: Every species has right to exist
- Moral duty to protect biodiversity for future generations

## Threats to Biodiversity

**Current extinction rate**: **100-1000 times higher** than natural background rate

**"The Evil Quartet"** - Four main threats (acronym: **HIPPO**):

### 1. Habitat Loss and Fragmentation

**Main cause of biodiversity loss**

**Causes**:
- **Deforestation**: Tropical forests disappearing
- **Urbanization**: Cities expanding
- **Agriculture**: Land conversion for farming
- **Mining, dams**: Infrastructure projects

**Effects**:
- **Habitat fragmentation**: Large areas broken into small patches
- **Reduced area**: Fewer species (species-area relationship)
- **Edge effects**: Altered microclimate at patch edges
- **Isolated populations**: Reduced gene flow, inbreeding

**Examples**:
- **Amazon rainforest**: Losing area size of football field every minute
- **Tropical forests**: Harbored >50% species, now <6% of Earth's surface

### 2. Invasive Alien Species (Over-exploitation)

**Invasive species**: Non-native species introduced to new area

**Characteristics**:
- No natural predators in new environment
- Outcompete native species
- Alter ecosystems

**Examples**:

**Nile Perch** (Africa):
- Introduced to Lake Victoria
- Ate native cichlid fish
- **200+ cichlid species extinct**

**Water Hyacinth** (*Eichhornia crassipes*):
- Introduced to India
- **"Terror of Bengal"**
- Clogs water bodies, depletes oxygen
- Kills fish, blocks sunlight

**Lantana** (*Lantana camara*):
- Invasive weed
- Replaces native vegetation

**African catfish** (*Clarias gariepinus*):
- Threatens native catfish species in India

**Parthenium** (Carrot grass):
- Causes allergies, reduces crop yield

### 3. Pollution

**Types**:
- **Air pollution**: Acid rain damages forests
- **Water pollution**: Pesticides, heavy metals, sewage
- **Soil pollution**: Chemicals reduce soil fertility
- **Plastic pollution**: Harms marine life

**Effects**:
- Toxic to organisms
- Bioaccumulation, biomagnification
- Eutrophication (nutrient pollution)

### 4. Climate Change (Over-exploitation)

**Global warming**: Increasing temperatures

**Effects on biodiversity**:
- **Shifting ranges**: Species move to cooler areas (poles, higher altitudes)
- **Phenology changes**: Altered timing of migration, flowering, breeding
- **Coral bleaching**: Warmer oceans stress corals
- **Sea level rise**: Floods coastal habitats
- **Extreme weather**: Droughts, floods, storms

**Example**: Polar bears threatened by melting Arctic ice

### 5. Over-exploitation

Harvesting species faster than they can reproduce

**Examples**:
- **Overfishing**: Cod, tuna populations collapsed
- **Hunting**: Passenger pigeon extinct (billions → 0 in 100 years)
- **Poaching**: Tigers, elephants, rhinos (for ivory, horns, skins)
- **Illegal wildlife trade**: Parrots, reptiles

**Steller's sea cow**: Extinct within 27 years of discovery (1768)

## Biodiversity Conservation

### Why Conserve?

**Three main reasons** (coined by Stanford ecologist Paul Ehrlich):

1. **Narrowly utilitarian**: 
   - Direct economic benefits (food, medicine, materials)

2. **Broadly utilitarian**: 
   - Ecosystem services (pollination, climate regulation, oxygen)

3. **Ethical**: 
   - Intrinsic value, moral responsibility

### Biodiversity Hotspots

**Definition** (Norman Myers, 1988): Regions with:
1. **High endemism**: Many species found nowhere else
2. **Under threat**: Facing habitat loss

**Criteria**:
- At least **1,500 endemic vascular plants** (0.5% of world total)
- Lost **≥70% of original habitat**

**Global hotspots**: **36 biodiversity hotspots** worldwide

**Hotspots in India** (4):
1. **Western Ghats**
2. **Eastern Himalayas**
3. **Indo-Burma** (includes Northeast India)
4. **Sundaland** (includes Nicobar Islands)

**Cover**: <2% of Earth's surface
**Contain**: >50% of world's plant species, 43% of vertebrates

### Conservation Strategies

**1. In-Situ Conservation** (On-site)

**Definition**: Conservation in natural habitat

**Methods**:

**A. Protected Areas**:
- **National Parks**: Strict protection, no human activity
  - Examples: Jim Corbett, Kaziranga, Gir (Asiatic lions)
- **Wildlife Sanctuaries**: Less strict, some activities allowed
  - Examples: Bharatpur (birds), Periyar
- **Biosphere Reserves**: Large areas, humans coexist with nature
  - Examples: Nilgiri, Nanda Devi, Sunderbans
  - **UNESCO Man and Biosphere Programme**

**B. Sacred Groves**: 
- Forest patches protected by local communities for religious reasons
- **Examples**: Khasi, Jaintia hills (Meghalaya)

**Advantages**:
- Natural habitat maintained
- Entire ecosystem protected
- Cost-effective for large populations
- Animals/plants in natural environment

**2. Ex-Situ Conservation** (Off-site)

**Definition**: Conservation outside natural habitat

**Methods**:

**A. Zoological Parks (Zoos)**:
- Captive breeding programs
- **Example**: Breeding programs for tigers, pandas

**B. Botanical Gardens**:
- Conserve plant diversity
- **Example**: Indian Botanical Garden (Kolkata)

**C. Seed Banks**:
- Store seeds at low temperature (-20°C)
- **Example**: Svalbard Global Seed Vault (Norway)
- **Kew Gardens** (UK): Millennium Seed Bank

**D. Cryopreservation**:
- Preserve gametes, embryos in liquid nitrogen (-196°C)
- For future use

**E. Tissue Culture Banks**:
- Preserve plant/animal tissues

**Advantages**:
- Saves critically endangered species
- Genetic material preserved
- Breeding programs possible
- Research opportunities

**Disadvantages**:
- Expensive
- Limited genetic diversity
- Animals may not adapt back to wild

### Important Conservation Efforts in India

**Project Tiger** (1973): 
- Protect Bengal tiger
- 53 tiger reserves

**Project Elephant** (1992):
- Protect elephants and corridors

**Crocodile Conservation**:
- Gharial, saltwater crocodile

**Hangul** (Kashmir stag): 
- Dachigam National Park

**One-horned Rhino**: 
- Kaziranga National Park (Assam)

## International Conservation Efforts

**CITES**: Convention on International Trade in Endangered Species (1975)
- Regulates wildlife trade

**CBD**: Convention on Biological Diversity (1992)
- Rio Earth Summit

**Ramsar Convention**: Wetland conservation

**IUCN Red List**: Lists threatened species
- Categories: Extinct, Critically Endangered, Endangered, Vulnerable, Near Threatened

## Summary Points

1. Biodiversity includes genetic, species, and ecosystem diversity with insects comprising >70% of known species
2. Species richness decreases from equator to poles due to stable climate and longer evolutionary time in tropics
3. Species-area relationship (S = cA^z) shows larger areas support more species; habitat fragmentation causes extinctions
4. "Evil Quartet" threats are habitat loss, invasive species, pollution, and climate change/over-exploitation
5. Biodiversity hotspots have high endemism and >70% habitat loss; India has 4 hotspots (Western Ghats, Himalayas, Indo-Burma, Sundaland)
6. In-situ conservation (national parks, sanctuaries, biosphere reserves) protects species in natural habitat
7. Ex-situ conservation (zoos, botanical gardens, seed banks, cryopreservation) preserves species outside natural habitat
`,

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Levels of Biodiversity',
        description: 'Genetic, species, ecosystem.'
      },
      {
        type: 'graph',
        title: 'Species-Area Relationship',
        description: 'S = cA^z curve.'
      },
      {
        type: 'table',
        title: 'Biodiversity Hotspots',
        description: 'Regions and key traits.'
      },
      {
        type: 'comparison',
        title: 'In-situ vs Ex-situ',
        description: 'Conservation approaches.'
      },
      {
        type: 'flowchart',
        title: 'Conservation Strategy',
        description: 'Assess -> protect -> monitor.'
      },
    ],
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Biodiversity and Conservation',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Levels of Biodiversity',
          description: 'Genetic, species, ecosystem.'
        },
        {
          type: 'graph',
          title: 'Species-Area Relationship',
          description: 'S = cA^z curve.'
        },
        {
          type: 'table',
          title: 'Biodiversity Hotspots',
          description: 'Regions and key traits.'
        },
        {
          type: 'comparison',
          title: 'In-situ vs Ex-situ',
          description: 'Conservation approaches.'
        },
        {
          type: 'flowchart',
          title: 'Conservation Strategy',
          description: 'Assess -> protect -> monitor.'
        },
      ],}
  });

  console.log('✓ Seeded Biology Class 12 Chapter 15: Biodiversity and Conservation');
}

seedBiologyClass12Chapter15().catch(console.error);
