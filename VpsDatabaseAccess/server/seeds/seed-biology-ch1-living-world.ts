import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter1() {
  console.log('🧬 Seeding Biology Class 11 Chapter 1: The Living World...');

  const chapter = {
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 1,
    chapterTitle: 'The Living World',
    introduction: `The living world is incredibly diverse, with millions of species inhabiting different ecosystems. This chapter introduces the fundamental characteristics that distinguish living organisms from non-living matter and explores the science of taxonomy - the systematic classification and naming of organisms. Understanding classification helps us organize the vast biodiversity, study evolutionary relationships, and communicate scientific knowledge effectively. From microscopic bacteria to giant blue whales, all life shares common characteristics while displaying remarkable diversity in form, function, and habitat.`,

    detailedNotes: `## What is Living?

Living organisms exhibit certain distinctive characteristics that differentiate them from non-living matter.

### Defining Characteristics of Living Organisms

**1. Growth**
- **In living organisms:** Growth occurs from inside (intrinsic)
- **Cellular mechanism:** Increase in number of cells (cell division)
- **Multicellular organisms:** Irreversible increase in mass and size
- **Unicellular organisms:** Growth by cell division
- **Plants:** Indefinite growth (throughout life)
- **Animals:** Definite growth (stops after maturity)

**Example:** A seed grows into a plant, a baby grows into an adult

**Non-living can also "grow":** Mountains grow due to external accumulation (extrinsic growth)

**2. Reproduction**
- Production of offspring similar to parents
- Ensures continuity of species
- **Sexual reproduction:** Involves two parents, genetic variation
- **Asexual reproduction:** Single parent, genetically identical offspring

**Examples:**
- Bacteria: Binary fission
- Hydra: Budding
- Plants: Vegetative propagation
- Humans: Sexual reproduction

**Exception:** Mules (sterile), worker bees (sterile), but still considered living

**3. Metabolism**
- Sum total of all chemical reactions in body
- **Anabolism:** Building up (synthesis) reactions - require energy
- **Catabolism:** Breaking down reactions - release energy

**Examples:**
- Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (ATP)
- Photosynthesis: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂

**In vitro (test tube) reactions:** Can occur outside body but organism is needed to catalyze

**4. Cellular Organization**
- All living organisms composed of cells (Cell Theory)
- **Prokaryotic cells:** No membrane-bound nucleus (bacteria)
- **Eukaryotic cells:** Membrane-bound nucleus (animals, plants, fungi)
- Cell is basic structural and functional unit

**5. Consciousness (Responsiveness)**
- Ability to sense and respond to environmental stimuli
- **Plants:** Phototropism (light), geotropism (gravity), thigmotropism (touch)
- **Animals:** Nervous system, sensory organs
- **Humans:** Self-consciousness, awareness

**Example:** Mimosa (touch-me-not) plant folds leaves when touched

**Organisms in coma:** Alive but lack consciousness temporarily

**Summary:** Living = Growth + Reproduction + Metabolism + Cellular Organization + Consciousness

**Note:** No single defining feature can identify living organisms; combination of all characteristics is necessary.

## Diversity in the Living World

**Biodiversity:** Variety of life forms on Earth

**Estimates:**
- **Plants:** ~300,000 species
- **Animals:** ~1.5 million species
- **Total described:** ~1.7-1.8 million species
- **Estimated total:** 10-100 million species

**Levels of biodiversity:**
1. **Genetic diversity:** Variation in genes within species
2. **Species diversity:** Variety of species in an area
3. **Ecosystem diversity:** Variety of habitats and ecosystems

## Need for Classification

**Reasons:**
1. **Organization:** Systematic arrangement of vast diversity
2. **Identification:** Easy recognition and naming
3. **Study:** Facilitates research and understanding
4. **Evolution:** Reveals evolutionary relationships
5. **Conservation:** Helps identify endangered species

**Without classification:** Impossible to study millions of organisms individually

## Taxonomy and Systematics

**Taxonomy:** Science of identifying, naming, and classifying organisms
- Coined by: **A.P. de Candolle** (1813)
- **Father of Taxonomy:** **Carolus Linnaeus**

**Systematics:** Study of diversity and evolutionary relationships among organisms
- Broader than taxonomy
- Includes identification, nomenclature, classification, and phylogeny

**Branches:**
- **Alpha taxonomy:** Identification and naming
- **Beta taxonomy:** Arrangement in hierarchical system
- **Gamma taxonomy:** Evolutionary and phylogenetic relationships

## Taxonomic Hierarchy (Categories)

Classification system with hierarchical arrangement from general to specific.

**Taxonomic Categories (Obligate):**

**1. Kingdom** (Highest category)
- Broadest level
- Examples: Plantae, Animalia, Fungi, Protista, Monera

**2. Phylum (Animals) / Division (Plants)**
- Groups of related classes
- Example: Chordata (animals with notochord)

**3. Class**
- Groups of related orders
- Example: Mammalia (mammals)

**4. Order**
- Groups of related families
- Example: Primata (primates)

**5. Family**
- Groups of related genera
- Ends with suffix **-aceae** (plants) or **-idae** (animals)
- Example: Hominidae (great apes)

**6. Genus**
- Groups of closely related species
- First word in binomial name (capitalized)
- Example: *Homo*

**7. Species** (Lowest category, Basic unit)
- Group of actually/potentially interbreeding populations
- Reproductively isolated from other groups
- Second word in binomial name (lowercase)
- Example: *Homo sapiens*

**Hierarchical Arrangement:**
Kingdom → Phylum/Division → Class → Order → Family → Genus → Species

**Mnemonic:** **K**ing **P**hilip **C**ame **O**ver **F**or **G**ood **S**oup

### Example Classification

**Human Classification:**
- **Kingdom:** Animalia
- **Phylum:** Chordata
- **Class:** Mammalia
- **Order:** Primata
- **Family:** Hominidae
- **Genus:** *Homo*
- **Species:** *sapiens*
- **Scientific name:** *Homo sapiens*

**Mango Classification:**
- **Kingdom:** Plantae
- **Division:** Magnoliophyta (Angiosperms)
- **Class:** Dicotyledonae
- **Order:** Sapindales
- **Family:** Anacardiaceae
- **Genus:** *Mangifera*
- **Species:** *indica*
- **Scientific name:** *Mangifera indica*

### Taxon (pl. Taxa)

**Definition:** Any level of grouping in taxonomic hierarchy

**Examples:**
- Insects: Class (taxon)
- Primata: Order (taxon)
- Hominidae: Family (taxon)

Each taxon represents a **taxonomic category** and has specific **rank**.

## Taxonomic Aids

Tools and techniques used for identification, classification, and study of organisms.

**1. Herbarium**
- Collection of pressed and dried plant specimens
- Mounted on sheets with labels
- Stored systematically
- **Largest:** Royal Botanic Gardens, Kew (England)
- **India:** Indian Botanical Garden, Kolkata; National Botanical Research Institute, Lucknow

**Components:**
- Plant specimen (pressed, dried)
- Collection data (location, date, collector)
- Identification label (scientific name, family)

**2. Botanical Gardens**
- Living collection of plants for reference
- Maintained for scientific research, conservation, education
- **Examples:** Kew Gardens (UK), Indian Botanic Garden (Kolkata)

**3. Museums**
- Preserved specimens (dried, stuffed, skeletons)
- Insects in insect boxes
- Animals preserved in jars with preservatives
- **Largest:** Natural History Museum, London

**4. Zoological Parks (Zoos)**
- Living collections of animals
- Conservation, breeding, education
- **Example:** Alipore Zoological Garden, Kolkata

**5. Keys (Taxonomic Keys)**
- Analytical tools for identification
- Based on contrasting characters
- **Types:**
  - **Dichotomous keys:** Two contrasting choices at each step
  - **Polyclave keys:** Multiple choices

**Example of Dichotomous Key:**
1a. Plant has flowers → Go to 2
1b. Plant lacks flowers → Non-flowering plant

2a. Petals free → Polypetalous
2b. Petals fused → Gamopetalous

**6. Monographs**
- Detailed study of a particular taxon
- Comprehensive information on all aspects

**7. Catalogues**
- Alphabetical listing of species in an area
- Brief information

**8. Manuals**
- Guide for identification of organisms
- Contains keys and descriptions

**9. Flora and Fauna**
- **Flora:** Inventory of plants in an area
- **Fauna:** Inventory of animals in an area
- **Example:** Flora of Delhi, Fauna of Rajasthan

## Nomenclature

**Definition:** System of naming organisms scientifically

**Problems with Common Names:**
- Same organism has different names in different languages
- Same name used for different organisms
- Creates confusion in scientific communication

**Example:**
- "Maize" (English), "Makka" (Hindi), "Cholam" (Tamil) → Same plant
- "Musli" refers to different plants in different regions

### Binomial Nomenclature

**Definition:** System of naming organisms using two words

**Proposed by:** **Carolus Linnaeus** in *Species Plantarum* (1753)

**Rules (ICBN - International Code of Botanical Nomenclature / ICZN - Zoological):**

**1. Two-word name:**
- First word: **Genus** (Generic name) - capitalized
- Second word: **Species** (Specific epithet) - lowercase

**2. Latin or Latinized:**
- Universal language for science
- Example: *Mangifera indica*, *Homo sapiens*

**3. Italics or Underlined:**
- Printed: *Italics* (*Mangifera indica*)
- Handwritten: Underlined (Mangifera indica)

**4. Author's Name:**
- Often abbreviated after species name
- Example: *Mangifera indica* L. (L. = Linnaeus)

**5. Generic Name as Adjective:**
- Can be used alone (refers to genus)
- Example: *Mangifera* refers to all mango species

**6. Specific Epithet Never Alone:**
- Must be preceded by generic name
- Cannot say just "*indica*"

**Examples:**
- *Homo sapiens* (humans)
- *Panthera leo* (lion)
- *Panthera tigris* (tiger)
- *Solanum tuberosum* (potato)
- *Oryza sativa* (rice)

**Advantages:**
- Universal recognition
- No confusion across languages
- Reflects relationships (same genus = closely related)
- Stable and permanent

### Trinomial Nomenclature

Used for naming **subspecies** or **varieties**

**Format:** *Genus species subspecies*

**Example:**
- *Corvus splendens splendens* (house crow)
- *Brassica oleracea capitata* (cabbage)

## Classification Systems

**1. Artificial Classification**
- Based on superficial/few characters
- Example: Linnaeus system (based on androecium structure)
- Easy but not natural

**2. Natural Classification**
- Based on many characters (morphology, anatomy, embryology)
- Reflects natural relationships
- Example: Bentham and Hooker system

**3. Phylogenetic Classification**
- Based on evolutionary relationships
- Uses fossils, molecular data
- Most modern approach
- Example: Engler and Prantl, APG system

## Importance of Classification

1. **Systematic arrangement** of organisms
2. **Easy identification** and naming
3. **Study of evolution** and phylogeny
4. **Conservation** planning
5. **Economic importance** identification
6. **Comparison** of organisms
7. **Prediction** of characteristics`,

    keyConcepts: [
      { 
        title: 'Living Organisms',
        description: 'Defined by five characteristics: growth, reproduction, metabolism, cellular organization, and consciousness'
      },
      {
        title: 'Biodiversity',
        description: '1.7-1.8 million described species, with an estimated total of 10-100 million species on Earth'
      },
      {
        title: 'Taxonomy',
        description: 'Science of identification, naming, and classification of organisms founded by Carolus Linnaeus'
      },
      {
        title: 'Taxonomic Hierarchy',
        description: 'Seven obligate categories from general to specific: Kingdom → Phylum → Class → Order → Family → Genus → Species'
      },
      {
        title: 'Binomial Nomenclature',
        description: 'Two-word scientific naming system: Genus species (e.g., Homo sapiens)',
        formula: 'Genus species (italicized, genus capitalized)'
      },
      {
        title: 'Taxonomic Aids',
        description: 'Tools for identification and study including herbarium, botanical gardens, museums, zoos, and dichotomous keys'
      },
      {
        title: 'Classification Systems',
        description: 'Three approaches: artificial (superficial characters), natural (multiple characters), and phylogenetic (evolutionary relationships)'
      },
      {
        title: 'Taxon',
        description: 'Any level of grouping in the taxonomic hierarchy, representing a specific rank'
      }
    ],

    formulas: [
      'Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (ATP)',
      'Photosynthesis: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂',
      'Taxonomic Hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species',
      'Scientific Name: Genus species (e.g., Homo sapiens, Mangifera indica)'
    ],

    learningObjectives: [
      'Define living organisms and their characteristics',
      'Explain the need for classification of organisms',
      'Understand taxonomy and systematics',
      'Describe taxonomic hierarchy and categories',
      'Apply binomial nomenclature rules correctly',
      'Identify taxonomic aids and their uses',
      'Compare artificial, natural, and phylogenetic classification',
      'Write scientific names following ICBN/ICZN conventions',
      'Classify organisms using taxonomic keys',
      'Appreciate biodiversity and its conservation'
    ],

    prerequisites: [
      'Basic understanding of plants and animals',
      'General awareness of diversity in nature',
      'Elementary knowledge of cell structure',
      'Basic scientific terminology'
    ],

    importantTopics: [
      'Characteristics of living organisms (growth, reproduction, metabolism)',
      'Taxonomic hierarchy: 7 categories from kingdom to species',
      'Binomial nomenclature: rules and examples (Homo sapiens, Mangifera indica)',
      'Human classification: Animalia → Chordata → Mammalia → Primata → Hominidae → Homo → sapiens',
      'Taxonomic aids: herbarium, botanical gardens, museums, keys',
      'Dichotomous keys for identification',
      'Difference between taxonomy and systematics',
      'Carolus Linnaeus: Father of Taxonomy, introduced binomial nomenclature',
      'Scientific name writing: italics/underline, genus capitalized, species lowercase',
      'Types of classification: artificial, natural, phylogenetic'
    ],

    ncertChapterRef: 'Chapter 1, Pages 1-12',

    difficultyLevel: 2,
    estimatedStudyMinutes: 180,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Taxonomic Hierarchy',
        description: 'Interactive pyramid showing Kingdom → Phylum → Class → Order → Family → Genus → Species with examples'
      },
      {
        type: 'concept',
        title: 'Binomial Nomenclature',
        description: 'Visual guide showing correct format for writing scientific names with examples'
      },
      {
        type: 'concept',
        title: 'Characteristics of Living Organisms',
        description: 'Animated diagram showing growth, reproduction, metabolism, cellular organization, and consciousness'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Biology Chapter 1: The Living World seeded successfully');
}

seedBiologyChapter1()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
