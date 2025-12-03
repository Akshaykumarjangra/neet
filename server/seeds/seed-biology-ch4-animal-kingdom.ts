import { db } from "../db";
import { chapterContent } from "../../shared/schema";

async function seedBiologyChapter4() {
  console.log("Seeding Biology Class 11 Chapter 4: Animal Kingdom...");

  await db
    .insert(chapterContent)
    .values({
      subject: "Biology",
      classLevel: "11",
      chapterNumber: 4,
      chapterTitle: "Animal Kingdom",
      introduction:
        "The animal kingdom (Kingdom Animalia) represents the most diverse and complex group of organisms on Earth, with over 1.5 million described species inhabiting every ecosystem from the deepest oceans to the highest mountains. Animals are multicellular, eukaryotic organisms that are heterotrophic, meaning they obtain nutrition by consuming other organisms. They exhibit remarkable diversity in body plans, life cycles, and adaptations, ranging from simple sponges without true tissues to complex mammals with advanced nervous systems. The study of animal diversity and classification helps us understand evolutionary relationships, ecological roles, and the incredible adaptations that have allowed animals to colonize virtually every habitat on our planet.",

      detailedNotes: `
# Animal Kingdom: Diversity and Classification

## Basis of Classification

Animals are classified based on several fundamental criteria that reflect their evolutionary history and body organization:

### 1. Levels of Organization
- **Cellular level**: Cells work independently (Porifera - sponges)
- **Tissue level**: Cells organized into tissues (Coelenterata - hydra, jellyfish)
- **Organ level**: Tissues form organs (Platyhelminthes - flatworms)
- **Organ system level**: Organs work together in systems (Annelida onwards)

### 2. Symmetry
- **Asymmetrical**: No definite shape (most sponges)
- **Radial symmetry**: Body parts arranged around central axis (Coelenterata, Echinodermata)
- **Bilateral symmetry**: Left and right halves are mirror images (most animals)

### 3. Diploblastic vs Triploblastic
- **Diploblastic**: Two germ layers - ectoderm and endoderm (Porifera, Coelenterata)
- **Triploblastic**: Three germ layers - ectoderm, mesoderm, endoderm (Platyhelminthes onwards)

### 4. Coelom (Body Cavity)
- **Acoelomate**: No body cavity (Platyhelminthes)
- **Pseudocoelomate**: False coelom not lined by mesoderm (Aschelminthes)
- **Coelomate**: True coelom lined by mesoderm (Annelida, Arthropoda, Mollusca, Echinodermata, Chordata)

### 5. Segmentation
- **Metamerism**: Body divided into repeated segments (Annelida, Arthropoda)
- **Non-segmented**: Body not divided into segments (most other phyla)

### 6. Notochord
- **Non-chordates**: Lack notochord (all invertebrates)
- **Chordates**: Possess notochord at some life stage (Chordata)

## Major Animal Phyla

### Phylum Porifera (Sponges)

**Characteristics:**
- Simplest multicellular animals with cellular level of organization
- Asymmetrical or radial symmetry
- Body has numerous pores (ostia) leading to a central cavity (spongocoel)
- Water flows through pores and exits via osculum
- **Choanocytes** (collar cells) create water current and capture food
- Skeleton made of **spicules** (calcium carbonate or silica) or **spongin** (protein fibers)
- Unique regenerative ability - can regenerate from small fragments
- Hermaphroditic (both male and female organs in same individual)

**Examples**: Sycon (scypha), Spongilla (freshwater sponge), Euspongia (bath sponge)

**Ecological importance**: Filter feeders that purify water, provide habitat for other organisms

### Phylum Coelenterata (Cnidaria)

**Characteristics:**
- Tissue level of organization with radial symmetry
- Diploblastic animals (two germ layers)
- Aquatic, mostly marine
- Two body forms: **Polyp** (sessile) and **Medusa** (free-swimming)
- **Cnidoblasts** (stinging cells) containing nematocysts for defense and prey capture
- Central gastrovascular cavity with single opening (mouth)
- Exhibit **polymorphism** - presence of different forms in same species
- Nerve net present but no brain

**Examples**: Hydra (freshwater polyp), Physalia (Portuguese man-of-war), Aurelia (jellyfish), Adamsia (sea anemone), Corals

**Ecological importance**: Coral reefs provide habitat for 25% of marine species

### Phylum Platyhelminthes (Flatworms)

**Characteristics:**
- Organ level of organization with bilateral symmetry
- Triploblastic, acoelomate animals
- Dorsoventrally flattened body (hence "flatworms")
- Free-living (Planaria) or parasitic (Taenia, Fasciola)
- Flame cells for excretion and osmoregulation
- No circulatory or respiratory systems - flat body allows diffusion
- **Regeneration** highly developed in free-living forms
- Hermaphroditic with complex life cycles in parasites

**Classes:**
1. **Turbellaria**: Free-living (Planaria)
2. **Trematoda**: Flukes, parasitic (Fasciola hepatica - liver fluke)
3. **Cestoda**: Tapeworms (Taenia solium - pork tapeworm)

**Medical importance**: Many parasitic species cause serious diseases in humans and livestock

### Phylum Aschelminthes (Roundworms/Nematodes)

**Characteristics:**
- Organ system level of organization with bilateral symmetry
- Triploblastic, pseudocoelomate animals
- Cylindrical, unsegmented body with pointed ends
- Complete digestive system (mouth and anus)
- Sexes separate (dioecious) - sexual dimorphism often present
- Tough cuticle covers body
- No circulatory or respiratory systems
- Free-living or parasitic

**Examples**: 
- Free-living: Rhabditis (soil nematode)
- Parasitic: Ascaris (intestinal roundworm), Wuchereria (filariasis), Ancylostoma (hookworm)

**Medical importance**: Cause diseases like ascariasis, filariasis (elephantiasis), hookworm disease

### Phylum Annelida (Segmented Worms)

**Characteristics:**
- Organ system level with bilateral symmetry
- Triploblastic, coelomate animals
- **Metamerism**: Body divided into similar segments
- Longitudinal and circular muscles for movement
- **Setae** (chitinous bristles) aid in locomotion
- Closed circulatory system with blood containing hemoglobin
- Nephridia for excretion (one pair per segment)
- Well-developed nervous system with ventral nerve cord

**Classes:**
1. **Polychaeta**: Marine worms with parapodia and numerous setae (Nereis - sandworm)
2. **Oligochaeta**: Freshwater/terrestrial with few setae (Pheretima - earthworm, Lumbricus)
3. **Hirudinea**: Leeches with suckers, no setae (Hirudinaria - medicinal leech)

**Ecological importance**: Earthworms improve soil fertility and structure

### Phylum Arthropoda (Joint-Legged Animals)

**Characteristics:**
- Largest animal phylum (over 1 million species - 80% of all animals)
- Organ system level with bilateral symmetry
- Triploblastic, coelomate, segmented animals
- **Jointed appendages** (arthro = joint, poda = feet)
- **Chitinous exoskeleton** that must be shed (molting/ecdysis) for growth
- Open circulatory system with hemolymph
- Respiration through gills, book lungs, or tracheal system
- Compound eyes in most species
- Well-developed sensory organs

**Classes:**
1. **Crustacea**: Two pairs of antennae, gills for respiration (Prawn, Crab, Daphnia)
2. **Arachnida**: Four pairs of legs, no antennae (Scorpion, Spider, Tick, Mite)
3. **Myriapoda**: Many body segments with legs (Centipede, Millipede)
4. **Insecta**: Three body parts (head, thorax, abdomen), three pairs of legs, usually two pairs of wings (Butterfly, Bee, Mosquito, Housefly)

**Ecological/Economic importance**: Pollinators, decomposers, disease vectors, food source

### Phylum Mollusca (Soft-Bodied Animals)

**Characteristics:**
- Second largest animal phylum
- Organ system level with bilateral symmetry (some secondarily asymmetrical)
- Triploblastic, coelomate animals
- Soft, unsegmented body often covered by **calcareous shell**
- Body divided into head, visceral mass, and muscular foot
- **Mantle** secretes shell and encloses **mantle cavity**
- **Radula** (rasping organ) for feeding in many species
- Open circulatory system (except cephalopods)
- Gills or lungs for respiration

**Classes:**
1. **Gastropoda**: Snails and slugs with coiled shell (Pila - apple snail, Limax - slug)
2. **Pelecypoda/Bivalvia**: Two-shelled molluscs (Unio - freshwater mussel, Ostrea - oyster)
3. **Cephalopoda**: Tentacles with suckers, most intelligent invertebrates (Octopus, Sepia - cuttlefish, Loligo - squid)

**Economic importance**: Food source (oysters, clams), pearls, some are pests (slugs, snails)

### Phylum Echinodermata (Spiny-Skinned Animals)

**Characteristics:**
- Exclusively marine animals
- Organ system level of organization
- Triploblastic, coelomate animals
- **Adults radially symmetrical** (usually pentamerous - five-part symmetry)
- Larvae bilaterally symmetrical (indicates evolutionary ancestry)
- **Spiny skin** with calcareous ossicles (endoskeleton)
- Unique **water vascular system** (ambulacral system) for locomotion, food capture, respiration
- **Tube feet** with suckers for movement and attachment
- No excretory organs
- Simple nervous system without brain

**Classes:**
1. **Asteroidea**: Starfish with five or more arms (Asterias)
2. **Ophiuroidea**: Brittle stars with long, slender arms (Ophiura)
3. **Echinoidea**: Sea urchins and sand dollars (Echinus)
4. **Holothuroidea**: Sea cucumbers (Holothuria)
5. **Crinoidea**: Sea lilies and feather stars (Antedon)

**Ecological importance**: Key predators and grazers in marine ecosystems

### Phylum Hemichordata

**Characteristics:**
- Small phylum of worm-like marine animals
- Transitional between non-chordates and chordates
- Possess **stomochord** (similar to notochord but not homologous)
- Pharyngeal gill slits present
- Dorsal nerve cord in collar region
- Open circulatory system
- Examples: Balanoglossus (acorn worm), Saccoglossus

**Evolutionary significance**: Shows chordate-like features, important in understanding chordate evolution

### Phylum Chordata

**Fundamental characteristics** (present at some life stage):
1. **Notochord**: Rod-like supporting structure dorsal to gut
2. **Dorsal hollow nerve cord**: Develops into brain and spinal cord
3. **Pharyngeal gill slits**: For filter feeding or respiration
4. **Post-anal tail**: Extends beyond anus

**Subphyla:**

#### 1. Urochordata (Tunicates)
- Marine, sessile adults
- Notochord only in larval tail (hence "uro" - tail)
- Adults show degenerative features
- Example: Herdmania (sea squirt), Doliolum

#### 2. Cephalochordata (Lancelets)
- Small, fish-like marine animals
- Notochord extends from head (cephalo) to tail throughout life
- Example: Branchiostoma (Amphioxus)

#### 3. Vertebrata (Animals with Backbone)

**General features:**
- Notochord replaced by **vertebral column**
- Ventral heart with closed circulatory system
- Well-developed brain enclosed in skull (cranium)
- Paired kidneys for excretion
- Internal skeleton (endoskeleton)

**Classes of Vertebrata:**

**A. Cyclostomata** (Jawless fishes)
- Most primitive vertebrates
- Circular sucking mouth without jaws
- Cartilaginous endoskeleton
- Examples: Petromyzon (lamprey), Myxine (hagfish)

**B. Pisces** (Fishes)
- Aquatic with streamlined body
- Fins for locomotion
- Gills for respiration
- Two-chambered heart
- Cold-blooded (poikilothermic)

*Class Chondrichthyes* (Cartilaginous fishes):
- Skeleton entirely cartilaginous
- Ventral mouth, separate gill slits
- No swim bladder
- Examples: Scoliodon (dogfish), Pristis (sawfish), Trygon (stingray)

*Class Osteichthyes* (Bony fishes):
- Bony endoskeleton
- Four pairs of gills covered by operculum
- Swim bladder for buoyancy
- Cycloid/ctenoid scales
- Examples: Labeo (rohu), Catla, Clarias (magur)

**C. Amphibia** (Dual-life animals)
- Live in water and on land
- Moist, glandular skin without scales
- Metamorphosis from aquatic larva to terrestrial adult
- Three-chambered heart (two atria, one ventricle)
- Cold-blooded
- Examples: Rana (frog), Bufo (toad), Salamandra, Ichthyophis (limbless amphibian)

**D. Reptilia** (Crawling vertebrates)
- Creep or crawl on land
- Dry skin with epidermal scales or scutes
- Three-chambered heart (four-chambered in crocodiles)
- Cold-blooded
- Lay eggs with leathery shells (oviparous)
- Examples: Chelone (turtle), Hemidactylus (house lizard), Chameleon, Draco (flying lizard), Crocodilus, Naja (cobra)

**E. Aves** (Birds)
- Presence of **feathers** (unique characteristic)
- Forelimbs modified into wings
- **Pneumatic bones** (hollow, air-filled) for flight
- Four-chambered heart
- Warm-blooded (homeothermic)
- Oviparous with hard-shelled eggs
- Examples: Corvus (crow), Columba (pigeon), Psittacula (parrot), Struthio (ostrich), Pavo (peacock)

**F. Mammalia** (Mammals)
- Presence of **mammary glands** (milk-producing)
- **Hair** covering body
- Four-chambered heart
- Warm-blooded
- Well-developed brain
- Internal fertilization, mostly viviparous
- Diaphragm separates thorax and abdomen

*Subclasses:*
- **Prototheria** (Egg-laying mammals): Ornithorhynchus (platypus), Echidna (spiny anteater)
- **Metatheria** (Marsupials with pouch): Macropus (kangaroo), Phascolarctos (koala)
- **Eutheria** (Placental mammals): Rattus (rat), Canis (dog), Felis (cat), Elephas (elephant), Homo (human)

## Evolutionary Trends in Animal Kingdom

1. **Complexity increases**: From cellular to organ system level
2. **Symmetry**: Asymmetry → Radial → Bilateral
3. **Cephalization**: Concentration of sensory organs at anterior end
4. **Coelom development**: Acoelomate → Pseudocoelomate → Coelomate
5. **Segmentation**: Allows specialization of body regions
6. **Notochord to vertebral column**: Provides better support and protection
7. **Respiration**: Diffusion → Gills → Lungs
8. **Circulation**: No system → Open → Closed
9. **Temperature regulation**: Cold-blooded → Warm-blooded
10. **Reproduction**: External fertilization → Internal fertilization; Ovipary → Vivipary

## Importance of Animal Classification

1. **Understanding biodiversity**: Over 1.5 million animal species described
2. **Evolutionary relationships**: Phylogenetic trees show common ancestry
3. **Ecological roles**: Each group has specific ecological functions
4. **Economic importance**: Food, medicines, materials, pollination
5. **Medical significance**: Understanding parasites and disease vectors
6. **Conservation**: Identifying endangered species and ecosystems
`,

      keyConcepts: [
        "Levels of organization: cellular, tissue, organ, organ system",
        "Symmetry: asymmetrical, radial, bilateral",
        "Germ layers: diploblastic vs triploblastic",
        "Coelom: acoelomate, pseudocoelomate, coelomate",
        "Metamerism: body segmentation",
        "Porifera: sponges with cellular organization, choanocytes, spicules",
        "Coelenterata: cnidoblasts, polymorphism, polyp and medusa forms",
        "Platyhelminthes: flatworms, acoelomate, flame cells",
        "Aschelminthes: roundworms, pseudocoelomate, complete digestive system",
        "Annelida: segmented worms, metamerism, nephridia, closed circulation",
        "Arthropoda: jointed appendages, chitinous exoskeleton, largest phylum",
        "Mollusca: soft body, mantle, shell, radula",
        "Echinodermata: water vascular system, tube feet, pentamerous symmetry",
        "Chordata characteristics: notochord, dorsal nerve cord, pharyngeal gill slits, post-anal tail",
        "Vertebrata: vertebral column, cranium, closed circulation",
        "Evolution from simple to complex organization",
        "Cephalization: concentration of sensory organs anteriorly",
        "Temperature regulation: poikilothermic vs homeothermic",
        "Reproduction modes: oviparous vs viviparous",
        "Adaptive radiation in different animal groups",
      ],

      formulas: [
        "Classification hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species",
        "Symmetry types: Asymmetrical (Porifera) → Radial (Coelenterata) → Bilateral (higher phyla)",
        "Germ layers: Diploblastic (2 layers) → Triploblastic (3 layers)",
        "Body cavity: Acoelomate → Pseudocoelomate → Eucoelomate",
        "Heart chambers: No heart → 2-chambered (fish) → 3-chambered (amphibia, reptiles) → 4-chambered (crocodiles, birds, mammals)",
        "Chordate features formula: Notochord + Dorsal nerve cord + Gill slits + Post-anal tail = Chordate",
      ],

      learningObjectives: [
        "Understand the basis of animal classification including symmetry, germ layers, and coelom",
        "Describe the characteristics of major animal phyla from Porifera to Chordata",
        "Explain the evolutionary trends observed in the animal kingdom",
        "Differentiate between invertebrates and vertebrates with examples",
        "Identify the unique features that distinguish each animal phylum",
        "Understand the economic and ecological importance of different animal groups",
        "Recognize examples of animals from different phyla and classes",
        "Comprehend the significance of metamerism and cephalization in animal evolution",
        "Explain the adaptive features in different animal groups for survival",
        "Understand the concept of levels of organization from cellular to organ system level",
      ],

      prerequisites: [
        "Basic understanding of cell structure and functions",
        "Knowledge of biological classification (Chapter 2: Biological Classification)",
        "Understanding of taxonomy and nomenclature (Chapter 1: The Living World)",
        "Familiarity with evolutionary concepts and adaptation",
        "Basic knowledge of human anatomy and organ systems",
      ],

      importantTopics: [
        "Basis of animal classification (symmetry, germ layers, coelom, segmentation)",
        "Characteristics of Phylum Porifera and Coelenterata (diploblastic)",
        "Flatworms (Platyhelminthes) and Roundworms (Aschelminthes)",
        "Segmented worms (Annelida) - metamerism concept",
        "Arthropoda - largest phylum, exoskeleton, jointed appendages",
        "Mollusca - soft body, mantle, radula",
        "Echinodermata - water vascular system, tube feet",
        "Chordate characteristics and classification",
        "Vertebrate classes: Fishes, Amphibia, Reptilia, Aves, Mammalia",
        "Evolutionary trends in animal kingdom",
        "Economic and medical importance of different animal groups",
      ],

      ncertChapterRef: "Class 11 Biology - Chapter 4",
      difficultyLevel: 3,
      estimatedStudyMinutes: 300,
      status: "published",

      visualizationsData: {
        type: "comparative-anatomy",
        title: "Animal Phyla Comparison",
        description:
          "Interactive comparison showing body organization, symmetry, and key features across major animal phyla from Porifera to Chordata",
      },
    })
    .onConflictDoUpdate({
      target: [
        chapterContent.subject,
        chapterContent.classLevel,
        chapterContent.chapterNumber,
      ],
      set: {
        chapterTitle: "Animal Kingdom",
        introduction:
          "The animal kingdom (Kingdom Animalia) represents the most diverse and complex group of organisms on Earth, with over 1.5 million described species inhabiting every ecosystem from the deepest oceans to the highest mountains. Animals are multicellular, eukaryotic organisms that are heterotrophic, meaning they obtain nutrition by consuming other organisms. They exhibit remarkable diversity in body plans, life cycles, and adaptations, ranging from simple sponges without true tissues to complex mammals with advanced nervous systems. The study of animal diversity and classification helps us understand evolutionary relationships, ecological roles, and the incredible adaptations that have allowed animals to colonize virtually every habitat on our planet.",
        detailedNotes: `
# Animal Kingdom: Diversity and Classification

## Basis of Classification

Animals are classified based on several fundamental criteria that reflect their evolutionary history and body organization:

### 1. Levels of Organization
- **Cellular level**: Cells work independently (Porifera - sponges)
- **Tissue level**: Cells organized into tissues (Coelenterata - hydra, jellyfish)
- **Organ level**: Tissues form organs (Platyhelminthes - flatworms)
- **Organ system level**: Organs work together in systems (Annelida onwards)

### 2. Symmetry
- **Asymmetrical**: No definite shape (most sponges)
- **Radial symmetry**: Body parts arranged around central axis (Coelenterata, Echinodermata)
- **Bilateral symmetry**: Left and right halves are mirror images (most animals)

### 3. Diploblastic vs Triploblastic
- **Diploblastic**: Two germ layers - ectoderm and endoderm (Porifera, Coelenterata)
- **Triploblastic**: Three germ layers - ectoderm, mesoderm, endoderm (Platyhelminthes onwards)

### 4. Coelom (Body Cavity)
- **Acoelomate**: No body cavity (Platyhelminthes)
- **Pseudocoelomate**: False coelom not lined by mesoderm (Aschelminthes)
- **Coelomate**: True coelom lined by mesoderm (Annelida, Arthropoda, Mollusca, Echinodermata, Chordata)

### 5. Segmentation
- **Metamerism**: Body divided into repeated segments (Annelida, Arthropoda)
- **Non-segmented**: Body not divided into segments (most other phyla)

### 6. Notochord
- **Non-chordates**: Lack notochord (all invertebrates)
- **Chordates**: Possess notochord at some life stage (Chordata)

## Major Animal Phyla

### Phylum Porifera (Sponges)

**Characteristics:**
- Simplest multicellular animals with cellular level of organization
- Asymmetrical or radial symmetry
- Body has numerous pores (ostia) leading to a central cavity (spongocoel)
- Water flows through pores and exits via osculum
- **Choanocytes** (collar cells) create water current and capture food
- Skeleton made of **spicules** (calcium carbonate or silica) or **spongin** (protein fibers)
- Unique regenerative ability - can regenerate from small fragments
- Hermaphroditic (both male and female organs in same individual)

**Examples**: Sycon (scypha), Spongilla (freshwater sponge), Euspongia (bath sponge)

**Ecological importance**: Filter feeders that purify water, provide habitat for other organisms

### Phylum Coelenterata (Cnidaria)

**Characteristics:**
- Tissue level of organization with radial symmetry
- Diploblastic animals (two germ layers)
- Aquatic, mostly marine
- Two body forms: **Polyp** (sessile) and **Medusa** (free-swimming)
- **Cnidoblasts** (stinging cells) containing nematocysts for defense and prey capture
- Central gastrovascular cavity with single opening (mouth)
- Exhibit **polymorphism** - presence of different forms in same species
- Nerve net present but no brain

**Examples**: Hydra (freshwater polyp), Physalia (Portuguese man-of-war), Aurelia (jellyfish), Adamsia (sea anemone), Corals

**Ecological importance**: Coral reefs provide habitat for 25% of marine species

### Phylum Platyhelminthes (Flatworms)

**Characteristics:**
- Organ level of organization with bilateral symmetry
- Triploblastic, acoelomate animals
- Dorsoventrally flattened body (hence "flatworms")
- Free-living (Planaria) or parasitic (Taenia, Fasciola)
- Flame cells for excretion and osmoregulation
- No circulatory or respiratory systems - flat body allows diffusion
- **Regeneration** highly developed in free-living forms
- Hermaphroditic with complex life cycles in parasites

**Classes:**
1. **Turbellaria**: Free-living (Planaria)
2. **Trematoda**: Flukes, parasitic (Fasciola hepatica - liver fluke)
3. **Cestoda**: Tapeworms (Taenia solium - pork tapeworm)

**Medical importance**: Many parasitic species cause serious diseases in humans and livestock

### Phylum Aschelminthes (Roundworms/Nematodes)

**Characteristics:**
- Organ system level of organization with bilateral symmetry
- Triploblastic, pseudocoelomate animals
- Cylindrical, unsegmented body with pointed ends
- Complete digestive system (mouth and anus)
- Sexes separate (dioecious) - sexual dimorphism often present
- Tough cuticle covers body
- No circulatory or respiratory systems
- Free-living or parasitic

**Examples**: 
- Free-living: Rhabditis (soil nematode)
- Parasitic: Ascaris (intestinal roundworm), Wuchereria (filariasis), Ancylostoma (hookworm)

**Medical importance**: Cause diseases like ascariasis, filariasis (elephantiasis), hookworm disease

### Phylum Annelida (Segmented Worms)

**Characteristics:**
- Organ system level with bilateral symmetry
- Triploblastic, coelomate animals
- **Metamerism**: Body divided into similar segments
- Longitudinal and circular muscles for movement
- **Setae** (chitinous bristles) aid in locomotion
- Closed circulatory system with blood containing hemoglobin
- Nephridia for excretion (one pair per segment)
- Well-developed nervous system with ventral nerve cord

**Classes:**
1. **Polychaeta**: Marine worms with parapodia and numerous setae (Nereis - sandworm)
2. **Oligochaeta**: Freshwater/terrestrial with few setae (Pheretima - earthworm, Lumbricus)
3. **Hirudinea**: Leeches with suckers, no setae (Hirudinaria - medicinal leech)

**Ecological importance**: Earthworms improve soil fertility and structure

### Phylum Arthropoda (Joint-Legged Animals)

**Characteristics:**
- Largest animal phylum (over 1 million species - 80% of all animals)
- Organ system level with bilateral symmetry
- Triploblastic, coelomate, segmented animals
- **Jointed appendages** (arthro = joint, poda = feet)
- **Chitinous exoskeleton** that must be shed (molting/ecdysis) for growth
- Open circulatory system with hemolymph
- Respiration through gills, book lungs, or tracheal system
- Compound eyes in most species
- Well-developed sensory organs

**Classes:**
1. **Crustacea**: Two pairs of antennae, gills for respiration (Prawn, Crab, Daphnia)
2. **Arachnida**: Four pairs of legs, no antennae (Scorpion, Spider, Tick, Mite)
3. **Myriapoda**: Many body segments with legs (Centipede, Millipede)
4. **Insecta**: Three body parts (head, thorax, abdomen), three pairs of legs, usually two pairs of wings (Butterfly, Bee, Mosquito, Housefly)

**Ecological/Economic importance**: Pollinators, decomposers, disease vectors, food source

### Phylum Mollusca (Soft-Bodied Animals)

**Characteristics:**
- Second largest animal phylum
- Organ system level with bilateral symmetry (some secondarily asymmetrical)
- Triploblastic, coelomate animals
- Soft, unsegmented body often covered by **calcareous shell**
- Body divided into head, visceral mass, and muscular foot
- **Mantle** secretes shell and encloses **mantle cavity**
- **Radula** (rasping organ) for feeding in many species
- Open circulatory system (except cephalopods)
- Gills or lungs for respiration

**Classes:**
1. **Gastropoda**: Snails and slugs with coiled shell (Pila - apple snail, Limax - slug)
2. **Pelecypoda/Bivalvia**: Two-shelled molluscs (Unio - freshwater mussel, Ostrea - oyster)
3. **Cephalopoda**: Tentacles with suckers, most intelligent invertebrates (Octopus, Sepia - cuttlefish, Loligo - squid)

**Economic importance**: Food source (oysters, clams), pearls, some are pests (slugs, snails)

### Phylum Echinodermata (Spiny-Skinned Animals)

**Characteristics:**
- Exclusively marine animals
- Organ system level of organization
- Triploblastic, coelomate animals
- **Adults radially symmetrical** (usually pentamerous - five-part symmetry)
- Larvae bilaterally symmetrical (indicates evolutionary ancestry)
- **Spiny skin** with calcareous ossicles (endoskeleton)
- Unique **water vascular system** (ambulacral system) for locomotion, food capture, respiration
- **Tube feet** with suckers for movement and attachment
- No excretory organs
- Simple nervous system without brain

**Classes:**
1. **Asteroidea**: Starfish with five or more arms (Asterias)
2. **Ophiuroidea**: Brittle stars with long, slender arms (Ophiura)
3. **Echinoidea**: Sea urchins and sand dollars (Echinus)
4. **Holothuroidea**: Sea cucumbers (Holothuria)
5. **Crinoidea**: Sea lilies and feather stars (Antedon)

**Ecological importance**: Key predators and grazers in marine ecosystems

### Phylum Hemichordata

**Characteristics:**
- Small phylum of worm-like marine animals
- Transitional between non-chordates and chordates
- Possess **stomochord** (similar to notochord but not homologous)
- Pharyngeal gill slits present
- Dorsal nerve cord in collar region
- Open circulatory system
- Examples: Balanoglossus (acorn worm), Saccoglossus

**Evolutionary significance**: Shows chordate-like features, important in understanding chordate evolution

### Phylum Chordata

**Fundamental characteristics** (present at some life stage):
1. **Notochord**: Rod-like supporting structure dorsal to gut
2. **Dorsal hollow nerve cord**: Develops into brain and spinal cord
3. **Pharyngeal gill slits**: For filter feeding or respiration
4. **Post-anal tail**: Extends beyond anus

**Subphyla:**

#### 1. Urochordata (Tunicates)
- Marine, sessile adults
- Notochord only in larval tail (hence "uro" - tail)
- Adults show degenerative features
- Example: Herdmania (sea squirt), Doliolum

#### 2. Cephalochordata (Lancelets)
- Small, fish-like marine animals
- Notochord extends from head (cephalo) to tail throughout life
- Example: Branchiostoma (Amphioxus)

#### 3. Vertebrata (Animals with Backbone)

**General features:**
- Notochord replaced by **vertebral column**
- Ventral heart with closed circulatory system
- Well-developed brain enclosed in skull (cranium)
- Paired kidneys for excretion
- Internal skeleton (endoskeleton)

**Classes of Vertebrata:**

**A. Cyclostomata** (Jawless fishes)
- Most primitive vertebrates
- Circular sucking mouth without jaws
- Cartilaginous endoskeleton
- Examples: Petromyzon (lamprey), Myxine (hagfish)

**B. Pisces** (Fishes)
- Aquatic with streamlined body
- Fins for locomotion
- Gills for respiration
- Two-chambered heart
- Cold-blooded (poikilothermic)

*Class Chondrichthyes* (Cartilaginous fishes):
- Skeleton entirely cartilaginous
- Ventral mouth, separate gill slits
- No swim bladder
- Examples: Scoliodon (dogfish), Pristis (sawfish), Trygon (stingray)

*Class Osteichthyes* (Bony fishes):
- Bony endoskeleton
- Four pairs of gills covered by operculum
- Swim bladder for buoyancy
- Cycloid/ctenoid scales
- Examples: Labeo (rohu), Catla, Clarias (magur)

**C. Amphibia** (Dual-life animals)
- Live in water and on land
- Moist, glandular skin without scales
- Metamorphosis from aquatic larva to terrestrial adult
- Three-chambered heart (two atria, one ventricle)
- Cold-blooded
- Examples: Rana (frog), Bufo (toad), Salamandra, Ichthyophis (limbless amphibian)

**D. Reptilia** (Crawling vertebrates)
- Creep or crawl on land
- Dry skin with epidermal scales or scutes
- Three-chambered heart (four-chambered in crocodiles)
- Cold-blooded
- Lay eggs with leathery shells (oviparous)
- Examples: Chelone (turtle), Hemidactylus (house lizard), Chameleon, Draco (flying lizard), Crocodilus, Naja (cobra)

**E. Aves** (Birds)
- Presence of **feathers** (unique characteristic)
- Forelimbs modified into wings
- **Pneumatic bones** (hollow, air-filled) for flight
- Four-chambered heart
- Warm-blooded (homeothermic)
- Oviparous with hard-shelled eggs
- Examples: Corvus (crow), Columba (pigeon), Psittacula (parrot), Struthio (ostrich), Pavo (peacock)

**F. Mammalia** (Mammals)
- Presence of **mammary glands** (milk-producing)
- **Hair** covering body
- Four-chambered heart
- Warm-blooded
- Well-developed brain
- Internal fertilization, mostly viviparous
- Diaphragm separates thorax and abdomen

*Subclasses:*
- **Prototheria** (Egg-laying mammals): Ornithorhynchus (platypus), Echidna (spiny anteater)
- **Metatheria** (Marsupials with pouch): Macropus (kangaroo), Phascolarctos (koala)
- **Eutheria** (Placental mammals): Rattus (rat), Canis (dog), Felis (cat), Elephas (elephant), Homo (human)

## Evolutionary Trends in Animal Kingdom

1. **Complexity increases**: From cellular to organ system level
2. **Symmetry**: Asymmetry → Radial → Bilateral
3. **Cephalization**: Concentration of sensory organs at anterior end
4. **Coelom development**: Acoelomate → Pseudocoelomate → Coelomate
5. **Segmentation**: Allows specialization of body regions
6. **Notochord to vertebral column**: Provides better support and protection
7. **Respiration**: Diffusion → Gills → Lungs
8. **Circulation**: No system → Open → Closed
9. **Temperature regulation**: Cold-blooded → Warm-blooded
10. **Reproduction**: External fertilization → Internal fertilization; Ovipary → Vivipary

## Importance of Animal Classification

1. **Understanding biodiversity**: Over 1.5 million animal species described
2. **Evolutionary relationships**: Phylogenetic trees show common ancestry
3. **Ecological roles**: Each group has specific ecological functions
4. **Economic importance**: Food, medicines, materials, pollination
5. **Medical significance**: Understanding parasites and disease vectors
6. **Conservation**: Identifying endangered species and ecosystems
`,
        updatedAt: new Date(),
      },
    });

  console.log("✅ Biology Chapter 4: Animal Kingdom seeded successfully!");
}

seedBiologyChapter4()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding chapter:", error);
    process.exit(1);
  });
