import { db } from "../db";
import { chapterContent } from "@shared/schema";
import { eq } from "drizzle-orm";

const botanyChapters = [
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 1,
    chapterTitle: "The Living World",
    introduction: "Welcome to Botany! This chapter explores what makes something 'alive' and how scientists organize the incredible diversity of life on Earth. You'll discover taxonomy, the science of naming and classifying organisms, and learn how all living things share fundamental characteristics.",
    detailedNotes: `# The Living World (Botany)

What makes something ALIVE? This is one of the biggest questions in biology! Let's explore the amazing world of living organisms and how we classify them.

## Characteristics of Living Organisms

All living things share these fundamental properties:

**1. Growth**
- Increase in mass and number of cells
- In plants: Growth continues throughout life (indeterminate growth)
- In animals: Growth stops at maturity

**💡 Did You Know?**
Some bristlecone pine trees are over 5,000 years old and still growing! They're among the oldest living organisms on Earth!

**2. Reproduction**
- Ability to produce offspring
- Sexual (two parents) or asexual (one parent)
- Fungi reproduce by spores, plants by seeds or vegetative parts

**3. Metabolism**
- All chemical reactions in an organism
- Anabolism: Building complex molecules (photosynthesis)
- Catabolism: Breaking down molecules (respiration)

**4. Cellular Organization**
- All living things are made of cells
- Cell is the basic unit of life
- Unicellular (bacteria) or multicellular (plants, animals)

**5. Consciousness/Response to Stimuli**
- Ability to sense and respond to environment
- Plants respond to light (phototropism), gravity (geotropism)
- Touch-me-not plant folds when touched!

**🔑 Remember This!**
Living things show: Growth, Reproduction, Metabolism, Organization, and Consciousness - remember "GRMOC"!

## Biodiversity

**Biodiversity** = Variety of life forms on Earth

- About 1.7-1.8 million species are described
- Scientists estimate 5-30 million species exist
- India has ~45,000 plant species and ~90,000 animal species

## Taxonomy - The Science of Classification

**Taxonomy** is the science of identification, naming, and classification of organisms.

**Father of Taxonomy**: Carl Linnaeus (Swedish botanist)

### Taxonomic Hierarchy

From largest to smallest:
**Kingdom → Phylum → Class → Order → Family → Genus → Species**

**⚠️ Common Mistake Alert!**
Remember the order using: "King Philip Came Over For Good Spaghetti"

### Nomenclature - The Art of Naming

**Binomial Nomenclature** (Two-name system by Linnaeus):
- Every organism has a scientific name with two parts
- **Generic name** (Genus) + **Specific epithet** (species)
- Written in Latin/Greek, italicized

**Examples:**
- Mango: *Mangifera indica*
- Human: *Homo sapiens*
- Rice: *Oryza sativa*

**Rules for Binomial Nomenclature:**
1. Generic name starts with CAPITAL letter
2. Specific epithet starts with small letter
3. Both are italicized (underlined when handwritten)
4. Author's name may follow (e.g., *Rosa indica* Linn.)

## ICBN - International Code of Botanical Nomenclature

These rules govern plant naming worldwide to avoid confusion!

## Taxonomic Aids

Tools to help identify and classify organisms:

**1. Herbarium**
- Collection of dried, pressed plant specimens
- Mounted on sheets with labels
- Major herbaria: Kew (UK), IARI (Delhi)

**2. Botanical Gardens**
- Living plant collections
- Major: Kew Gardens, Indian Botanical Garden (Kolkata)

**3. Taxonomic Keys**
- Help identify unknown organisms
- Uses contrasting characteristics (couplets)

**4. Museum**
- Preserved specimens of plants and animals

**5. Zoological Parks**
- Wild animals in protected environments`,
    keyConcepts: JSON.stringify([
      { title: "Characteristics of Life", description: "Living organisms show growth, reproduction, metabolism, cellular organization, and consciousness/response to stimuli." },
      { title: "Biodiversity", description: "The variety of life forms on Earth. About 1.7-1.8 million species described, but millions more exist." },
      { title: "Taxonomy", description: "Science of identification, naming, and classification of organisms. Carl Linnaeus is the father of taxonomy." },
      { title: "Taxonomic Hierarchy", description: "Kingdom → Phylum → Class → Order → Family → Genus → Species. Each level is called a taxon." },
      { title: "Binomial Nomenclature", description: "Two-name system: Genus (capital) + species (small). Names are in Latin, italicized or underlined." },
      { title: "Taxonomic Aids", description: "Herbarium (dried specimens), botanical gardens (living collections), keys, museums help in identification." }
    ]),
    formulas: JSON.stringify([
      { name: "Taxonomic Hierarchy", formula: "Kingdom → Phylum → Class → Order → Family → Genus → Species", description: "Mnemonic: King Philip Came Over For Good Spaghetti" },
      { name: "Binomial Format", formula: "Genus species (Author)", description: "Example: Mangifera indica Linn. - Genus capitalized, species lowercase" },
      { name: "Growth Definition", formula: "Growth = Increase in mass + Increase in cell number", description: "Internal growth from within, not external addition" },
      { name: "Metabolism Types", formula: "Metabolism = Anabolism + Catabolism", description: "Anabolism builds up, catabolism breaks down molecules" },
      { name: "Species Estimate", formula: "Described species ≈ 1.8 million, Total estimate: 5-30 million", description: "Only a fraction of Earth's species have been discovered" },
      { name: "India's Biodiversity", formula: "Plants: ~45,000 species, Animals: ~90,000 species", description: "India is one of 17 megadiverse countries" }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 60
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 2,
    chapterTitle: "Biological Classification",
    introduction: "Botany Chapter: How do we organize millions of living species? This chapter explores the Five Kingdom Classification system and the fascinating world of viruses, viroids, prions, and lichens - organisms that blur the line between living and non-living!",
    detailedNotes: `# Biological Classification (Botany)

With millions of species on Earth, we need a system to organize them! Let's explore how scientists classify all living things.

## History of Classification

**Two Kingdom Classification** (Linnaeus)
- Plantae and Animalia
- Problem: Where do bacteria, fungi fit?

**Five Kingdom Classification** (R.H. Whittaker, 1969)
- Based on: Cell type, body organization, mode of nutrition, reproduction, phylogenetic relationships

## The Five Kingdoms

### Kingdom Monera (Bacteria)

**Characteristics:**
- Prokaryotic (no membrane-bound nucleus)
- Single-celled, microscopic
- Cell wall contains peptidoglycan (murein)

**💡 Did You Know?**
Bacteria were the first life forms on Earth, appearing about 3.5 billion years ago! They can survive in extreme environments from boiling hot springs to frozen Antarctic ice.

**Types of Bacteria (by shape):**
- **Cocci**: Spherical
- **Bacilli**: Rod-shaped
- **Spirilla**: Spiral
- **Vibrio**: Comma-shaped

**Nutrition:**
- Autotrophs: Photosynthetic or chemosynthetic
- Heterotrophs: Decomposers, parasites

**Special Bacteria:**
- **Cyanobacteria** (Blue-green algae): Photosynthetic, fix nitrogen
- **Archaebacteria**: Extremophiles living in harsh conditions

### Kingdom Protista

**Characteristics:**
- Eukaryotic, mostly unicellular
- Bridge between prokaryotes and complex organisms

**💡 Did You Know?**
The giant kelp (a protist algae) can grow up to 45 meters tall - that's as tall as a 15-story building!

**Groups:**
- **Chrysophytes**: Diatoms (cell wall has silica)
- **Dinoflagellates**: Two flagella, cause red tides
- **Euglenoids**: Have chloroplasts but can be heterotrophs
- **Slime molds**: Decomposers
- **Protozoans**: Animal-like protists

### Kingdom Fungi

**Characteristics:**
- Eukaryotic, heterotrophic (saprophytes or parasites)
- Cell wall made of chitin
- Body made of network of hyphae (mycelium)

**⚠️ Common Mistake Alert!**
Fungi are NOT plants! They don't photosynthesize and their cell wall is made of chitin, not cellulose!

**Classification:**
- **Phycomycetes**: Rhizopus (bread mold), Mucor
- **Ascomycetes**: Yeast, Penicillium, Aspergillus
- **Basidiomycetes**: Mushrooms, bracket fungi, puffballs
- **Deuteromycetes**: Imperfect fungi (no sexual reproduction known)

### Kingdom Plantae

**Characteristics:**
- Eukaryotic, multicellular, autotrophic (photosynthesis)
- Cell wall made of cellulose
- Contain chlorophyll in chloroplasts

Includes: Algae, bryophytes, pteridophytes, gymnosperms, angiosperms

### Kingdom Animalia

**Characteristics:**
- Eukaryotic, multicellular, heterotrophic
- No cell wall
- Most are motile

## Beyond Five Kingdoms - Special Organisms

### Viruses - Living or Non-Living?

**🔑 Remember This!**
Viruses are at the edge of living and non-living! They're called "organisms at the edge of life."

**Characteristics:**
- Non-cellular, obligate parasites
- Contain either DNA OR RNA (never both)
- Protein coat called capsid
- Can crystallize like chemicals!

**Discovery**: Dmitri Ivanowsky (1892) - Tobacco Mosaic Virus

**Types by Host:**
- Bacteriophages: Attack bacteria
- Plant viruses: TMV, CMV (usually RNA)
- Animal viruses: Influenza, HIV

### Viroids

- Even smaller than viruses
- Only RNA, no protein coat
- Cause plant diseases (e.g., potato spindle tuber disease)

### Prions

- Infectious proteins (no nucleic acid!)
- Cause brain diseases: Mad cow disease, Creutzfeldt-Jakob disease

### Lichens - A Partnership!

**Symbiotic association** between:
- Algae (photobiont) - provides food
- Fungus (mycobiont) - provides shelter, moisture

**Ecological Importance:**
- Pioneer colonizers on bare rocks
- Pollution indicators (sensitive to SO₂)

**🔑 Remember This!**
Lichens are "pollution indicators" - if you see lots of lichens, the air is clean! They die in polluted areas.`,
    keyConcepts: JSON.stringify([
      { title: "Five Kingdom Classification", description: "Whittaker's system: Monera (prokaryotes), Protista (unicellular eukaryotes), Fungi, Plantae, and Animalia." },
      { title: "Kingdom Monera", description: "Prokaryotes including bacteria and cyanobacteria. No membrane-bound nucleus. Cell wall has peptidoglycan." },
      { title: "Kingdom Fungi", description: "Eukaryotic heterotrophs with chitin cell wall. Body is mycelium (network of hyphae). Decomposers or parasites." },
      { title: "Virus Structure", description: "Non-cellular, contain DNA or RNA in protein coat (capsid). Obligate parasites that can crystallize." },
      { title: "Viroids and Prions", description: "Viroids: RNA only. Prions: Protein only. Both cause diseases despite being simpler than viruses." },
      { title: "Lichens", description: "Symbiotic partnership of algae (food) and fungi (shelter). Pioneer species and pollution indicators." },
      { title: "Protista Kingdom", description: "Eukaryotic bridge organisms. Includes diatoms, euglenoids, dinoflagellates, slime molds, protozoans." }
    ]),
    formulas: JSON.stringify([
      { name: "Five Kingdoms", formula: "Monera → Protista → Fungi → Plantae → Animalia", description: "From simplest prokaryotes to complex multicellular organisms" },
      { name: "Bacteria Cell Wall", formula: "Peptidoglycan (Murein)", description: "Made of amino acids and sugars. Target of penicillin antibiotic" },
      { name: "Fungi Cell Wall", formula: "Chitin (N-acetylglucosamine polymer)", description: "Different from plant cellulose - fungi are not plants!" },
      { name: "Virus Composition", formula: "Nucleic acid (DNA OR RNA) + Protein coat (Capsid)", description: "Some have envelope. Always have only one type of nucleic acid" },
      { name: "Lichen Partnership", formula: "Algae (Photobiont) + Fungus (Mycobiont) = Lichen", description: "Algae provides food, fungus provides protection" },
      { name: "TMV Discovery", formula: "Dmitri Ivanowsky, 1892 - Tobacco Mosaic Virus", description: "First virus discovered. Crystalized by Stanley (1935)" },
      { name: "Bacterial Shapes", formula: "Coccus (sphere), Bacillus (rod), Spirillum (spiral), Vibrio (comma)", description: "Shape helps in identification of bacteria" }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 75
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 3,
    chapterTitle: "Plant Kingdom",
    introduction: "Botany Chapter: From tiny mosses to towering trees, the Plant Kingdom is incredibly diverse! This chapter takes you on a journey through plant evolution, exploring algae, bryophytes, pteridophytes, gymnosperms, and angiosperms - the major plant groups.",
    detailedNotes: `# Plant Kingdom (Botany)

The Plant Kingdom shows an amazing diversity - from simple algae in ponds to giant sequoia trees! Let's explore this incredible journey of plant evolution.

## Classification of Plant Kingdom

Plants are classified based on:
- Presence/absence of well-differentiated body
- Presence/absence of vascular tissue
- Presence/absence of seeds
- Whether seeds are enclosed in fruits

## ALGAE - The Simple Aquatic Plants

**Characteristics:**
- Thallus body (no true roots, stems, leaves)
- Mostly aquatic, photosynthetic
- Chlorophyll present

**💡 Did You Know?**
Algae produce about 50% of Earth's oxygen! They're the unsung heroes of our atmosphere!

**Classification by Pigments:**

| Division | Common Name | Pigments | Food Storage | Cell Wall |
|----------|-------------|----------|--------------|-----------|
| Chlorophyta | Green algae | Chlorophyll a,b | Starch | Cellulose |
| Phaeophyta | Brown algae | Chlorophyll a,c + Fucoxanthin | Laminarin | Cellulose + Algin |
| Rhodophyta | Red algae | Chlorophyll a,d + Phycoerythrin | Floridean starch | Cellulose + Pectin |

**Examples:**
- Green: Chlamydomonas, Ulva (sea lettuce), Spirogyra
- Brown: Laminaria (kelp), Fucus, Sargassum
- Red: Porphyra (nori), Gracilaria (agar source)

**Economic Importance:**
- Food: Spirulina, Chlorella (protein-rich)
- Agar from Gelidium, Gracilaria
- Algin from brown algae (used in ice cream!)

## BRYOPHYTES - Amphibians of Plant Kingdom

**🔑 Remember This!**
Bryophytes are called "Amphibians of the Plant Kingdom" because they need water for reproduction (sperm must swim to egg)!

**Characteristics:**
- Non-vascular (no xylem/phloem)
- Dominant gametophyte (haploid plant is main plant)
- Need water for fertilization
- Small in size

**Division into:**
1. **Liverworts** (Hepaticopsida): Flat, liver-shaped (Marchantia, Riccia)
2. **Mosses** (Bryopsida): Leafy, erect (Funaria, Sphagnum)
3. **Hornworts** (Anthocerotopsida): Horn-shaped sporophyte

**Life Cycle:**
Spore → Gametophyte → Gametes → Fertilization (needs water) → Sporophyte → Spores

**Ecological Role:**
- Sphagnum moss forms peat deposits
- Pioneer species on bare rocks
- Prevent soil erosion

## PTERIDOPHYTES - The First Vascular Plants

**Characteristics:**
- First plants with vascular tissue (xylem, phloem)
- Dominant sporophyte (diploid plant is main)
- Still need water for fertilization
- Reproduce by spores

**⚠️ Common Mistake Alert!**
Pteridophytes have vascular tissue but NO seeds. They're intermediate between bryophytes and seed plants!

**Examples:**
- Ferns: Pteris, Dryopteris, Adiantum (maidenhair fern)
- Horsetails: Equisetum
- Club mosses: Selaginella, Lycopodium

**Types based on spore production:**
- **Homosporous**: Same-sized spores (most ferns)
- **Heterosporous**: Different-sized spores - microspores (male) and megaspores (female) (Selaginella)

## GYMNOSPERMS - The Naked Seed Plants

**Characteristics:**
- First seed-bearing plants
- Seeds are NAKED (not enclosed in fruit)
- Mostly evergreen, woody plants
- Needle-like or scale-like leaves

**💡 Did You Know?**
The giant sequoia is the world's largest living organism by volume! Some are over 3,000 years old and 115 meters tall!

**Examples:**
- **Cycas**: Palm-like, living fossil
- **Pinus**: Pine trees, cones
- **Ginkgo**: Only surviving species, living fossil
- **Sequoia**: Giant redwoods

**Reproductive Structures:**
- Male cones: Produce pollen
- Female cones: Contain ovules
- Wind pollination

## ANGIOSPERMS - The Flowering Plants

**Characteristics:**
- Seeds ENCLOSED in fruit
- Have flowers - reproductive structures
- Double fertilization
- Most successful plant group (300,000+ species)

**Classification:**

**Monocots vs Dicots:**

| Feature | Monocots | Dicots |
|---------|----------|--------|
| Cotyledons | One | Two |
| Leaf venation | Parallel | Reticulate |
| Root system | Fibrous | Tap root |
| Flowers | Trimerous (3s) | Pentamerous (5s) |
| Vascular bundles | Scattered | Ring arrangement |

**Examples:**
- Monocots: Grasses, wheat, rice, palms, lilies
- Dicots: Rose, mango, pea, sunflower

**🔑 Remember This!**
Plant evolution: Algae → Bryophytes → Pteridophytes → Gymnosperms → Angiosperms
From simple → complex, aquatic → terrestrial, spores → seeds → fruits!`,
    keyConcepts: JSON.stringify([
      { title: "Algae Classification", description: "Green (Chlorophyta), Brown (Phaeophyta), Red (Rhodophyta) - classified by pigments and storage products." },
      { title: "Bryophytes", description: "Non-vascular plants needing water for reproduction. Dominant gametophyte. Called 'Amphibians of Plant Kingdom'." },
      { title: "Pteridophytes", description: "First vascular plants with xylem and phloem but no seeds. Dominant sporophyte. Include ferns and horsetails." },
      { title: "Gymnosperms", description: "First seed plants with naked seeds (not in fruits). Mostly conifers with cones. Wind-pollinated." },
      { title: "Angiosperms", description: "Flowering plants with seeds in fruits. Double fertilization. Most diverse group (300,000+ species)." },
      { title: "Alternation of Generations", description: "Life cycle alternates between gametophyte (n) and sporophyte (2n). Dominance shifts through plant evolution." },
      { title: "Monocots vs Dicots", description: "Monocots: 1 cotyledon, parallel veins, fibrous roots. Dicots: 2 cotyledons, reticulate veins, tap root." }
    ]),
    formulas: JSON.stringify([
      { name: "Plant Evolution Sequence", formula: "Algae → Bryophytes → Pteridophytes → Gymnosperms → Angiosperms", description: "Increasing complexity: non-vascular → vascular → seeds → flowers" },
      { name: "Algae Pigments", formula: "Green=Chl a,b | Brown=Chl a,c+Fucoxanthin | Red=Chl a,d+Phycoerythrin", description: "Different pigments allow different depth adaptation" },
      { name: "Bryophyte Life Cycle", formula: "Gametophyte (n) [DOMINANT] → Gametes → Zygote → Sporophyte (2n)", description: "Haploid phase is dominant, needs water for fertilization" },
      { name: "Pteridophyte Life Cycle", formula: "Sporophyte (2n) [DOMINANT] → Spores → Gametophyte → Gametes", description: "Diploid phase is dominant, still needs water" },
      { name: "Heterospory", formula: "Microspores → Male gametophyte, Megaspores → Female gametophyte", description: "Led to evolution of seeds. Found in Selaginella" },
      { name: "Monocot Features", formula: "1 cotyledon + Parallel veins + Fibrous root + Trimerous flowers", description: "Examples: grasses, wheat, rice, bamboo" },
      { name: "Dicot Features", formula: "2 cotyledons + Reticulate veins + Tap root + Pentamerous flowers", description: "Examples: rose, mango, bean, sunflower" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 4,
    chapterTitle: "Morphology of Flowering Plants",
    introduction: "Botany Chapter: Every part of a flowering plant has a purpose! This chapter explores the external structure of plants - roots that anchor and absorb, stems that transport and support, leaves that make food, and flowers that reproduce. Understanding morphology is key to plant identification!",
    detailedNotes: `# Morphology of Flowering Plants (Botany)

Morphology is the study of external form and structure. Every plant part you see has been beautifully designed by nature for specific functions!

## THE ROOT

The root is the underground part that anchors the plant and absorbs water and minerals.

### Types of Root Systems

**1. Tap Root System**
- One main root with branches
- Found in dicots
- Examples: Mango, carrot, radish

**2. Fibrous Root System**
- Many thin roots from base of stem
- Found in monocots
- Examples: Wheat, rice, grass

**💡 Did You Know?**
The roots of a single rye plant can have a combined length of over 600 km! That's like traveling from Delhi to Jaipur and back, underground!

### Root Modifications

Roots can be modified for different functions:

| Modification | Function | Example |
|--------------|----------|---------|
| Storage roots | Store food | Carrot, radish, beetroot |
| Prop roots | Support | Banyan, maize |
| Stilt roots | Support in water | Sugarcane, mangroves |
| Pneumatophores | Respiration | Rhizophora (mangrove) |
| Nodules | Nitrogen fixation | Legumes (pea, bean) |

## THE STEM

The stem is the ascending axis of the plant that bears leaves, branches, and flowers.

### Functions
- Conduction of water and minerals
- Support for leaves and flowers
- Storage of food
- Photosynthesis (young, green stems)

### Stem Modifications

**🔑 Remember This!**
Modified stems have nodes and internodes, buds, and scale leaves - that's how you identify them as stems, not roots!

**Underground Stems:**
- **Rhizome**: Horizontal, stores food (ginger, turmeric)
- **Tuber**: Swollen tip storing starch (potato)
- **Bulb**: Short stem with fleshy leaves (onion, garlic)
- **Corm**: Solid, vertical (Colocasia, Crocus)

**Aerial Stems:**
- **Tendril**: Climbing (grapevine, passion fruit)
- **Thorn**: Defense (Citrus, Bougainvillea)
- **Phylloclade**: Flattened, photosynthetic (Opuntia cactus)

## THE LEAF

The leaf is the food factory of the plant!

### Parts of a Typical Leaf
1. **Leaf base**: Attaches to stem
2. **Petiole**: Stalk
3. **Lamina/Blade**: Flat, expanded part

### Leaf Venation
- **Reticulate**: Network pattern (dicots)
- **Parallel**: Veins run parallel (monocots)

### Types of Leaves

**Simple Leaf**: Single, undivided blade (mango, peepal)
**Compound Leaf**: Blade divided into leaflets
- Pinnate: Leaflets on common axis (neem, rose)
- Palmate: Leaflets from a point (Bombax)

### Leaf Modifications

**⚠️ Common Mistake Alert!**
Don't confuse leaf spines with stem thorns! Spines develop from leaves (like in cactus), thorns from stems (like in lemon).

- **Tendrils**: Climbing (pea)
- **Spines**: Defense (cactus, Aloe)
- **Storage leaves**: Fleshy (onion scales)
- **Insectivorous**: Catch insects (Venus flytrap, pitcher plant)

### Phyllotaxy (Leaf Arrangement)
- Alternate: One leaf per node (sunflower)
- Opposite: Two leaves per node (Calotropis)
- Whorled: More than two per node (Nerium)

## THE FLOWER

The flower is the reproductive unit of angiosperms!

### Parts of a Flower
1. **Calyx**: Outer whorl of sepals (protection)
2. **Corolla**: Whorl of petals (attract pollinators)
3. **Androecium**: Male organs (stamens with pollen)
4. **Gynoecium**: Female organs (pistil with ovules)

**💡 Did You Know?**
The corpse flower (Rafflesia) is the world's largest flower - up to 1 meter wide and 11 kg! It smells like rotting flesh to attract flies for pollination.

### Types of Flowers
- **Complete**: All four whorls present
- **Incomplete**: One or more whorls missing
- **Bisexual**: Both androecium and gynoecium
- **Unisexual**: Only one type (male OR female)

### Aestivation (Arrangement of petals in bud)
- Valvate: Edges touch (Calotropis)
- Twisted: Overlapping like a fan (China rose)
- Imbricate: One fully inside, one outside, rest overlap
- Vexillary: 5 petals like butterfly wings (pea)

## THE FRUIT

Fruit develops from the ovary after fertilization.

### True Fruit vs False Fruit
- **True fruit**: Only ovary forms fruit (mango)
- **False fruit**: Other parts also involved (apple - thalamus)

### Types
- **Simple**: From single ovary (mango, tomato)
- **Aggregate**: From many free carpels (strawberry)
- **Multiple**: From inflorescence (pineapple, jackfruit)

## THE SEED

Seed is the mature ovule containing the embryo.

### Structure
- **Seed coat**: Outer covering
- **Cotyledons**: Seed leaves (1 in monocots, 2 in dicots)
- **Embryo**: Future plant (radicle, plumule)
- **Endosperm**: Food storage (present in some seeds)`,
    keyConcepts: JSON.stringify([
      { title: "Root Systems", description: "Tap root (dicots) - single main root. Fibrous root (monocots) - many thin roots from stem base." },
      { title: "Stem Modifications", description: "Underground: rhizome, tuber, bulb, corm. Aerial: tendril, thorn, phylloclade. All have nodes and buds." },
      { title: "Leaf Structure", description: "Leaf base, petiole, lamina. Venation: reticulate (dicots) or parallel (monocots)." },
      { title: "Flower Whorls", description: "Calyx (sepals), Corolla (petals), Androecium (stamens), Gynoecium (pistil). Complete flowers have all four." },
      { title: "Fruit Types", description: "True fruit from ovary only. False fruit includes other parts. Simple, aggregate, or multiple based on origin." },
      { title: "Seed Structure", description: "Seed coat, cotyledons (1 or 2), embryo (radicle + plumule), and sometimes endosperm." },
      { title: "Phyllotaxy", description: "Leaf arrangement: Alternate (one/node), Opposite (two/node), Whorled (many/node)." }
    ]),
    formulas: JSON.stringify([
      { name: "Floral Formula", formula: "Br Brl ⊕ K C A G", description: "Br=bract, ⊕=actinomorphic, K=calyx, C=corolla, A=androecium, G=gynoecium" },
      { name: "Root Identification", formula: "Tap root = Dicot, Fibrous root = Monocot", description: "Root system helps identify plant type" },
      { name: "Leaf Venation", formula: "Reticulate = Dicot, Parallel = Monocot", description: "Venation pattern indicates plant classification" },
      { name: "Aestivation Types", formula: "Valvate, Twisted, Imbricate, Vexillary", description: "Arrangement of petals in flower bud" },
      { name: "Placentation Types", formula: "Marginal, Axile, Parietal, Free central, Basal", description: "Arrangement of ovules in ovary" },
      { name: "Seed Components", formula: "Seed = Seed coat + Embryo (± Endosperm)", description: "Embryo has radicle, plumule, and cotyledon(s)" },
      { name: "Fruit Classification", formula: "Simple (1 ovary), Aggregate (many carpels), Multiple (inflorescence)", description: "Based on number of ovaries/flowers involved" }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 85
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 5,
    chapterTitle: "Anatomy of Flowering Plants",
    introduction: "Botany Chapter: If morphology is studying the outside, anatomy is studying the inside! This chapter takes you on a microscopic journey through plant tissues - from the protective epidermis to the water-conducting xylem and food-transporting phloem. Understanding plant anatomy reveals how plants truly work!",
    detailedNotes: `# Anatomy of Flowering Plants (Botany)

Anatomy is the study of internal structure. Let's look inside plants at the cellular level to understand how they're built!

## PLANT TISSUES

Tissues are groups of similar cells performing a common function.

### Meristematic Tissues

**💡 Did You Know?**
Meristematic cells are like stem cells - they can divide and become any type of plant cell! That's why plants can grow throughout their lives.

**Characteristics:**
- Actively dividing cells
- Thin cell walls, no vacuoles
- Dense cytoplasm, large nucleus

**Types by Location:**
1. **Apical meristem**: Tips of roots and shoots (length growth)
2. **Intercalary meristem**: Between mature tissues (grasses regrow after cutting!)
3. **Lateral meristem**: Sides of plant (girth growth)
   - Vascular cambium: Forms secondary xylem and phloem
   - Cork cambium: Forms bark

### Permanent Tissues

Mature tissues that have lost ability to divide.

## SIMPLE PERMANENT TISSUES

**1. Parenchyma**
- Living cells with thin walls
- Store food, perform photosynthesis (when green)
- Most abundant tissue
- Have intercellular spaces

**2. Collenchyma**
- Living cells with thick corners
- Provide flexible support
- Found in petioles, young stems
- Example: Tomato stem

**3. Sclerenchyma**
- Dead cells with thick, lignified walls
- Provide rigidity and strength
- Types:
  - **Fibers**: Long, narrow (jute, hemp)
  - **Sclereids**: Stone cells (pear grit, nut shells)

**🔑 Remember This!**
Parenchyma = Thin walls, living, storage
Collenchyma = Thick corners, living, flexibility
Sclerenchyma = Thick walls, dead, strength

## COMPLEX PERMANENT TISSUES

Made of more than one cell type, working together.

### Xylem - Water Highway

**Function**: Transports water and minerals UPWARD

**Components:**
| Element | Structure | Function |
|---------|-----------|----------|
| Tracheids | Dead, elongated, tapered ends | Water conduction, support |
| Vessels | Dead, shorter, open ends | Efficient water conduction |
| Xylem fibers | Dead, very thick walls | Mechanical support |
| Xylem parenchyma | Living, thin walls | Storage |

**⚠️ Common Mistake Alert!**
Vessels are more efficient than tracheids because they have open ends for continuous water flow. Vessels are found only in angiosperms!

### Phloem - Food Highway

**Function**: Transports food (sugars) in BOTH directions

**Components:**
| Element | Structure | Function |
|---------|-----------|----------|
| Sieve tubes | Living, no nucleus | Main conduction |
| Companion cells | Living, with nucleus | Help sieve tubes |
| Phloem fibers | Dead | Support |
| Phloem parenchyma | Living | Storage |

## THE TISSUE SYSTEM

Plants have three tissue systems:

**1. Epidermal Tissue System**
- Outermost layer, single cell thick
- Covered with waxy cuticle (prevents water loss)
- Contains stomata (gas exchange) with guard cells
- Trichomes (hair-like outgrowths)

**2. Ground Tissue System**
- All tissues except epidermis and vascular
- Includes cortex, pith, medullary rays
- Made of parenchyma, collenchyma, sclerenchyma

**3. Vascular Tissue System**
- Xylem and phloem together
- Arranged in vascular bundles

## ANATOMY OF DICOT AND MONOCOT

### Dicot Root
- Vascular bundles: 2-4 (usually 4)
- Xylem and phloem alternate (radial arrangement)
- Pith small or absent
- Can show secondary growth

### Monocot Root
- Vascular bundles: Many (polyarch)
- Xylem and phloem alternate
- Pith large and well-developed
- No secondary growth

### Dicot Stem
- Vascular bundles in a ring
- Bundles are open (have cambium)
- Can show secondary growth

### Monocot Stem
- Vascular bundles scattered
- Bundles are closed (no cambium)
- No secondary growth

**💡 Did You Know?**
Palm trees don't get thicker as they age because they're monocots without secondary growth! That's why you see old palm trees that are still thin at the base.

### Dicot Leaf (Dorsiventral)
- Upper surface different from lower
- Palisade mesophyll (upper) - tightly packed for photosynthesis
- Spongy mesophyll (lower) - loosely packed for gas exchange
- More stomata on lower surface

### Monocot Leaf (Isobilateral)
- Both surfaces similar
- No differentiation into palisade and spongy
- Stomata on both surfaces equally
- Bulliform cells (for rolling in drought)

## SECONDARY GROWTH

Growth in girth due to lateral meristems.

**Occurs in:** Most dicots and gymnosperms
**Not in:** Monocots (no cambium)

**Steps:**
1. Vascular cambium becomes active
2. Produces secondary xylem inward
3. Produces secondary phloem outward
4. Cork cambium forms bark`,
    keyConcepts: JSON.stringify([
      { title: "Meristematic Tissues", description: "Actively dividing cells. Apical (length), Intercalary (regrowth), Lateral (girth). Like plant stem cells." },
      { title: "Simple Tissues", description: "Parenchyma (storage), Collenchyma (flexibility), Sclerenchyma (strength). Made of one cell type." },
      { title: "Xylem", description: "Complex tissue for water transport upward. Contains tracheids, vessels (dead), fibers, parenchyma." },
      { title: "Phloem", description: "Complex tissue for food transport. Contains sieve tubes, companion cells (living), fibers, parenchyma." },
      { title: "Tissue Systems", description: "Epidermal (protection), Ground (filling), Vascular (transport). Three systems in all plant organs." },
      { title: "Dicot vs Monocot Anatomy", description: "Dicots: ring of vascular bundles, open, secondary growth. Monocots: scattered bundles, closed, no secondary growth." },
      { title: "Secondary Growth", description: "Increase in girth by vascular and cork cambium. Produces wood (secondary xylem) and bark." }
    ]),
    formulas: JSON.stringify([
      { name: "Tissue Classification", formula: "Meristematic (dividing) vs Permanent (mature)", description: "Permanent = Simple (one type) + Complex (many types)" },
      { name: "Simple Tissues", formula: "Parenchyma + Collenchyma + Sclerenchyma", description: "PCS - Parenchyma stores, Collenchyma flexes, Sclerenchyma supports" },
      { name: "Xylem Components", formula: "Tracheids + Vessels + Fibers + Parenchyma", description: "Vessels only in angiosperms, most efficient" },
      { name: "Phloem Components", formula: "Sieve tubes + Companion cells + Fibers + Parenchyma", description: "Sieve tubes alive but no nucleus, companion cells help" },
      { name: "Dicot Root Xylem", formula: "2-4 xylem bundles (usually tetrarch)", description: "Radial arrangement of xylem and phloem" },
      { name: "Monocot Root Xylem", formula: "Many xylem bundles (polyarch)", description: "Large pith, no secondary growth" },
      { name: "Secondary Growth", formula: "Cambium → 2° Xylem (inward) + 2° Phloem (outward)", description: "Annual rings form in seasonal climates" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 6,
    chapterTitle: "Cell: The Unit of Life",
    introduction: "Botany Chapter: Every living thing is made of cells - the basic units of life! This chapter explores cell theory, the differences between prokaryotic and eukaryotic cells, and the fascinating organelles that make cells work like tiny factories.",
    detailedNotes: `# Cell: The Unit of Life (Botany)

The cell is the fundamental unit of life. Whether it's a tiny bacterium or a giant whale, all organisms are made of cells!

## Discovery and Cell Theory

**Robert Hooke (1665)**: First saw cells in cork, coined the term "cell"
**Anton van Leeuwenhoek**: First to observe living cells (bacteria, protozoa)

**Cell Theory** (Schleiden, Schwann, Virchow):
1. All living organisms are composed of cells
2. Cell is the basic unit of life
3. All cells arise from pre-existing cells

**💡 Did You Know?**
The largest single cell is the ostrich egg! The longest cells in your body are nerve cells that can be over 1 meter long!

## PROKARYOTIC vs EUKARYOTIC CELLS

| Feature | Prokaryotic | Eukaryotic |
|---------|-------------|------------|
| Nucleus | No membrane | Membrane-bound |
| Size | 0.1-5 μm | 5-100 μm |
| Organelles | Few, no membrane | Many membrane-bound |
| DNA | Circular, in nucleoid | Linear, in nucleus |
| Ribosomes | 70S | 80S |
| Examples | Bacteria | Plants, Animals, Fungi |

**🔑 Remember This!**
Pro = primitive, before; Eu = true. Prokaryotes came first (simpler), Eukaryotes evolved later (complex)!

## CELL MEMBRANE (Plasma Membrane)

**Structure** (Fluid Mosaic Model by Singer & Nicolson):
- Lipid bilayer (phospholipids)
- Proteins embedded or attached
- Cholesterol (in animal cells)
- Glycoproteins and glycolipids

**Functions:**
- Selective permeability
- Cell recognition
- Transport of materials
- Protection

### Transport Across Membrane

**Passive Transport** (No energy needed):
- Simple diffusion: High → Low concentration
- Facilitated diffusion: Through proteins
- Osmosis: Water movement through semipermeable membrane

**Active Transport** (Energy needed):
- Against concentration gradient
- ATP required
- Examples: Na⁺/K⁺ pump

## CELL WALL (Plants, Fungi, Bacteria)

**In Plants:**
- Made of cellulose microfibrils
- Provides rigidity and support
- Prevents bursting when water enters

**Layers:**
1. Primary wall: Young cells, thin
2. Secondary wall: Mature cells, thick, lignified
3. Middle lamella: Cement between cells (pectin)

**⚠️ Common Mistake Alert!**
Animal cells have NO cell wall - only cell membrane! That's why animal cells can change shape but plant cells can't.

## THE NUCLEUS - Control Center

**Components:**
- **Nuclear envelope**: Double membrane with pores
- **Nucleoplasm**: Fluid inside nucleus
- **Chromatin**: DNA + histone proteins
- **Nucleolus**: Makes ribosomal RNA

**Functions:**
- Contains genetic information (DNA)
- Controls cell activities
- Site of DNA replication

## CYTOPLASMIC ORGANELLES

### Endoplasmic Reticulum (ER)
**Rough ER**: Has ribosomes, makes proteins
**Smooth ER**: No ribosomes, makes lipids, detoxification

### Golgi Apparatus (Dictyosome in plants)
- Packaging and modifying proteins
- Making lysosomes
- Cell plate formation during division

### Mitochondria - Powerhouse

**💡 Did You Know?**
Mitochondria have their own DNA and ribosomes! This supports the endosymbiotic theory - they were once free-living bacteria that got engulfed by larger cells.

**Structure:**
- Double membrane
- Inner membrane folded into cristae
- Matrix contains enzymes for Krebs cycle

**Function:** ATP production through cellular respiration

### Plastids (Only in Plant Cells!)

**Types:**
| Plastid | Pigment | Function |
|---------|---------|----------|
| Chloroplast | Chlorophyll | Photosynthesis |
| Chromoplast | Carotenoids | Color (flowers, fruits) |
| Leucoplast | None | Storage |

**Chloroplast Structure:**
- Double membrane
- Stroma: Fluid with enzymes for dark reactions
- Thylakoids: Stacked into grana, light reactions occur here

### Ribosomes - Protein Factories
- 70S in prokaryotes (50S + 30S)
- 80S in eukaryotes (60S + 40S)
- Made of rRNA and proteins

### Vacuoles
**In plant cells:** Large central vacuole
- Stores water, nutrients, waste
- Maintains turgor pressure
- Contains cell sap

### Centrioles
- In animal cells (absent in most plants)
- Organize spindle fibers during division

### Cytoskeleton
- Microtubules, microfilaments, intermediate filaments
- Cell shape and movement`,
    keyConcepts: JSON.stringify([
      { title: "Cell Theory", description: "All organisms made of cells, cell is basic unit of life, all cells from pre-existing cells." },
      { title: "Prokaryote vs Eukaryote", description: "Prokaryotes: no nucleus, smaller, 70S ribosomes. Eukaryotes: membrane-bound nucleus, larger, 80S ribosomes." },
      { title: "Cell Membrane", description: "Fluid Mosaic Model - lipid bilayer with proteins. Selectively permeable. Controls what enters/exits." },
      { title: "Nucleus", description: "Control center with DNA. Has nuclear envelope, nucleoplasm, chromatin, nucleolus. Makes RNA." },
      { title: "Mitochondria", description: "Powerhouse making ATP. Double membrane with cristae. Has own DNA (endosymbiotic origin)." },
      { title: "Chloroplast", description: "Site of photosynthesis in plants. Has grana (light reactions) and stroma (dark reactions). Own DNA." },
      { title: "Endomembrane System", description: "ER, Golgi, lysosomes, vacuoles work together. Protein synthesis, modification, packaging, transport." }
    ]),
    formulas: JSON.stringify([
      { name: "Cell Sizes", formula: "Prokaryotes: 0.1-5 μm | Eukaryotes: 5-100 μm", description: "Eukaryotic cells are typically 10x larger than prokaryotes" },
      { name: "Ribosome Size", formula: "Prokaryotes: 70S (50S+30S) | Eukaryotes: 80S (60S+40S)", description: "S = Svedberg unit (sedimentation rate)" },
      { name: "Membrane Structure", formula: "Lipid bilayer + Proteins + Carbohydrates", description: "Fluid Mosaic Model by Singer & Nicolson (1972)" },
      { name: "Osmosis", formula: "Water moves from low to high solute concentration", description: "Through semipermeable membrane to equalize concentrations" },
      { name: "ATP Formula", formula: "ADP + Pi + Energy → ATP", description: "Made in mitochondria through oxidative phosphorylation" },
      { name: "Photosynthesis Location", formula: "Light reactions: Thylakoids | Dark reactions: Stroma", description: "Both occur in chloroplasts" },
      { name: "Cell Wall Layers", formula: "Middle lamella → Primary wall → Secondary wall", description: "From outer shared layer to inner strengthening layers" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 95
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 7,
    chapterTitle: "Cell Cycle and Cell Division",
    introduction: "Botany Chapter: How do cells multiply? This chapter explores the fascinating process of cell division - mitosis for growth and repair, and meiosis for sexual reproduction. Understanding these processes explains how a single cell can become a whole organism!",
    detailedNotes: `# Cell Cycle and Cell Division (Botany)

Every cell in your body came from a single cell through division! Let's explore how cells reproduce themselves.

## THE CELL CYCLE

The cell cycle is the sequence of events from one cell division to the next.

**Phases:**
1. **Interphase** (95% of cycle) - Cell prepares for division
2. **M Phase** (5% of cycle) - Actual division

### Interphase - The Preparation Phase

**G₁ Phase (Gap 1):**
- Cell grows in size
- Synthesizes RNA and proteins
- Most active metabolic phase

**S Phase (Synthesis):**
- DNA replication occurs
- Chromosome number remains same
- Each chromosome now has two chromatids

**G₂ Phase (Gap 2):**
- More proteins synthesized
- Cell prepares for division
- Organelles duplicated

**💡 Did You Know?**
Some cells enter a resting state called G₀ phase. Nerve cells and muscle cells stay in G₀ and rarely divide. That's why nerve damage is often permanent!

## MITOSIS - Division for Growth

Mitosis produces two identical daughter cells with the same chromosome number as the parent.

**🔑 Remember This!**
Mitosis = Makes Identical Two cells! (Same chromosome number)

### Stages of Mitosis (PMAT)

**1. Prophase**
- Chromosomes condense and become visible
- Each chromosome has 2 sister chromatids joined at centromere
- Nuclear envelope starts breaking
- Centrioles move to poles (in animal cells)
- Spindle fibers begin forming

**2. Metaphase**
- Chromosomes align at cell equator (metaphase plate)
- Spindle fibers attach to centromeres
- Best stage to study chromosomes!

**3. Anaphase**
- Sister chromatids separate
- Move to opposite poles
- Shortest phase
- Centromere splits

**4. Telophase**
- Chromosomes reach poles
- Nuclear envelope reforms
- Chromosomes decondense
- Nucleolus reappears

### Cytokinesis

**In Animal cells:** Cleavage furrow forms (cell pinches in)
**In Plant cells:** Cell plate forms from center outward

**⚠️ Common Mistake Alert!**
In plant cells, cytokinesis happens by cell plate formation (not cleavage) because the cell wall is rigid!

## MEIOSIS - Division for Reproduction

Meiosis produces four cells with HALF the chromosome number (haploid).

**🔑 Remember This!**
Meiosis = Makes Eggs and Sperm! (Half chromosome number - 4 cells)

### Meiosis I - Reduction Division

**Prophase I** (Longest phase!)
Important events:
- **Leptotene**: Chromosomes visible
- **Zygotene**: Homologous pairs come together (synapsis)
- **Pachytene**: Crossing over occurs! (exchange of genetic material)
- **Diplotene**: Chiasmata visible (sites of crossing over)
- **Diakinesis**: Terminalization of chiasmata

**Metaphase I**
- Bivalents (pairs) align at equator
- Random orientation (independent assortment)

**Anaphase I**
- Homologous chromosomes separate
- Sister chromatids stay together!

**Telophase I**
- Two cells formed
- Each has half the chromosomes (but each chromosome still has 2 chromatids)

### Meiosis II - Similar to Mitosis

**Prophase II → Metaphase II → Anaphase II → Telophase II**

Sister chromatids separate, producing 4 haploid cells.

## SIGNIFICANCE OF CELL DIVISION

### Mitosis:
1. Growth of organism
2. Repair of damaged tissues
3. Asexual reproduction
4. Maintains chromosome number
5. Genetic consistency

### Meiosis:
1. Sexual reproduction
2. Produces gametes (sex cells)
3. Reduces chromosome number by half
4. Creates genetic variation through:
   - Crossing over
   - Random assortment

**💡 Did You Know?**
Crossing over during meiosis creates new combinations of genes! This is why you're not an exact copy of either parent, but a unique mix of both.

## COMPARISON

| Feature | Mitosis | Meiosis |
|---------|---------|---------|
| Divisions | 1 | 2 |
| Daughter cells | 2 | 4 |
| Chromosome number | Same (2n) | Half (n) |
| Crossing over | No | Yes (Prophase I) |
| Genetic variation | None | Yes |
| Where | Somatic cells | Reproductive cells |
| Purpose | Growth, repair | Gamete formation |`,
    keyConcepts: JSON.stringify([
      { title: "Cell Cycle Phases", description: "Interphase (G₁, S, G₂) is preparation. M phase is division. S phase is when DNA replicates." },
      { title: "Mitosis", description: "Produces 2 identical diploid cells. For growth and repair. Stages: Prophase, Metaphase, Anaphase, Telophase (PMAT)." },
      { title: "Meiosis", description: "Produces 4 haploid cells. For gamete formation. Two divisions: Meiosis I (reduction) and Meiosis II." },
      { title: "Crossing Over", description: "Exchange of genetic material between homologous chromosomes in Prophase I. Creates genetic variation." },
      { title: "Significance of Meiosis", description: "Halves chromosome number, produces gametes, creates genetic diversity through crossing over and random assortment." },
      { title: "Cytokinesis", description: "Division of cytoplasm. Animal cells: cleavage furrow. Plant cells: cell plate from center." },
      { title: "Chromosome Behavior", description: "Mitosis: sister chromatids separate. Meiosis I: homologs separate. Meiosis II: sister chromatids separate." }
    ]),
    formulas: JSON.stringify([
      { name: "Cell Cycle", formula: "G₁ → S → G₂ → M (Mitosis + Cytokinesis)", description: "Interphase (G₁SG₂) takes 95% of cycle time" },
      { name: "Mitosis Stages", formula: "Prophase → Metaphase → Anaphase → Telophase (PMAT)", description: "Remember: 'Please Make Another Twin'" },
      { name: "Meiosis I Prophase", formula: "Leptotene → Zygotene → Pachytene → Diplotene → Diakinesis", description: "LZPDD - longest phase, crossing over occurs" },
      { name: "Mitosis Result", formula: "1 cell (2n) → 2 cells (2n)", description: "Daughter cells identical to parent, same chromosome number" },
      { name: "Meiosis Result", formula: "1 cell (2n) → 4 cells (n)", description: "Chromosome number halved, genetic variation created" },
      { name: "Crossing Over", formula: "Occurs in Pachytene of Prophase I", description: "Exchange between non-sister chromatids of homologous pair" },
      { name: "Chromosome Count", formula: "After S phase: DNA doubled, chromosome # same", description: "Each chromosome now has 2 sister chromatids" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 85
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 8,
    chapterTitle: "Transport in Plants",
    introduction: "Botany Chapter: How does water reach the top of a 100-meter tall tree? This chapter explores the amazing transport systems in plants - how water and minerals move up through xylem, and how food travels through phloem. Discover the physics and biology behind plant transport!",
    detailedNotes: `# Transport in Plants (Botany)

Plants have no hearts, yet they move water up to 100 meters! Let's explore the fascinating transport systems in plants.

## MEANS OF TRANSPORT

### 1. Diffusion
- Movement from high to low concentration
- Slow process, works over short distances
- No energy required
- Example: Gas exchange in leaves

### 2. Facilitated Diffusion
- Uses membrane proteins
- Faster than simple diffusion
- Still passive (no energy)
- For molecules that can't cross lipid bilayer

### 3. Active Transport
- Against concentration gradient
- Requires ATP
- Uses carrier proteins
- Example: Ion uptake by roots

### 4. Osmosis
**Movement of water through a semipermeable membrane from high water potential to low water potential.**

**💡 Did You Know?**
A large oak tree can transport over 400 liters of water per day from roots to leaves! That's more than 4 bathtubs full!

## WATER POTENTIAL (Ψ)

Water potential determines direction of water movement.

**Ψw = Ψs + Ψp**

Where:
- Ψw = Water potential
- Ψs = Solute potential (always negative)
- Ψp = Pressure potential (usually positive in plants)

**Pure water has Ψw = 0** (maximum water potential)
Water moves from HIGH Ψw to LOW Ψw.

**🔑 Remember This!**
Water always flows from higher water potential to lower water potential - like water flowing downhill!

## ABSORPTION OF WATER BY ROOTS

### Path of Water
Soil → Root hair → Epidermis → Cortex → Endodermis → Pericycle → Xylem

### Two Pathways

**1. Apoplast Pathway**
- Through cell walls and intercellular spaces
- Faster, less resistance
- Blocked at Casparian strip (endodermis)

**2. Symplast Pathway**
- Through cytoplasm via plasmodesmata
- Slower, more regulated
- Water must enter living cells

**⚠️ Common Mistake Alert!**
The Casparian strip forces water through the symplast pathway at the endodermis, giving the plant control over what enters the xylem!

## ASCENT OF SAP (Water Movement Upward)

How does water reach the top of tall trees? Several forces work together:

### 1. Root Pressure
- Active pumping of ions into xylem
- Water follows by osmosis
- Creates positive pressure
- Seen as guttation (water droplets on leaf margins)
- Works mainly in short plants

### 2. Transpiration Pull (Cohesion-Tension Theory)

**Main mechanism for tall plants!**

**Key concepts:**
- **Transpiration**: Evaporation from leaves creates tension
- **Cohesion**: Water molecules stick together (hydrogen bonds)
- **Adhesion**: Water sticks to xylem walls

**The Process:**
1. Water evaporates from mesophyll cells
2. Creates tension (negative pressure) in leaf veins
3. Tension pulls water column up through xylem
4. Cohesion keeps water column intact
5. Adhesion prevents water from falling back

**💡 Did You Know?**
The transpiration pull can create tensions equivalent to lifting water to heights of over 100 meters - higher than any tree on Earth!

## TRANSPIRATION

**Definition:** Loss of water as vapor from aerial parts of plant.

### Types
1. **Stomatal**: Through stomata (95%)
2. **Cuticular**: Through cuticle (5%)
3. **Lenticular**: Through lenticels (minimal)

### Factors Affecting Transpiration
- Light (opens stomata)
- Temperature (increases evaporation)
- Humidity (low humidity increases transpiration)
- Wind (removes water vapor)

### Significance
- Creates transpiration pull
- Cools the plant
- Helps in mineral transport
- Maintains water balance

## OPENING AND CLOSING OF STOMATA

**Guard cells** control stomata opening.

**Opening (Light/Low CO₂):**
1. K⁺ ions enter guard cells
2. Water enters by osmosis
3. Guard cells become turgid
4. Stomata open

**Closing (Dark/High CO₂):**
1. K⁺ ions leave guard cells
2. Water leaves
3. Guard cells become flaccid
4. Stomata close

## PHLOEM TRANSPORT (Translocation)

**Translocation** = Transport of organic solutes (mainly sucrose) through phloem.

### Munch's Mass Flow Hypothesis (Pressure Flow)

**🔑 Remember This!**
Sugar (source) → High pressure → Flow → Low pressure → Sugar (sink)

**The Process:**
1. Sugar loaded into phloem at source (leaves)
2. Creates high solute concentration
3. Water enters by osmosis
4. High pressure develops
5. Contents flow to sink (roots, fruits)
6. Sugar unloaded at sink
7. Water returns to xylem

### Source and Sink
- **Source**: Where sugar is produced (mature leaves)
- **Sink**: Where sugar is used (roots, growing tips, fruits)

**Comparison:**
| Feature | Xylem Transport | Phloem Transport |
|---------|-----------------|------------------|
| Material | Water, minerals | Sugars, amino acids |
| Direction | Upward only | Both directions |
| Cells | Dead (except parenchyma) | Living (sieve tubes) |
| Energy | Passive (transpiration pull) | Active (loading/unloading) |`,
    keyConcepts: JSON.stringify([
      { title: "Water Potential", description: "Ψw = Ψs + Ψp. Water moves from high to low water potential. Pure water has Ψw = 0." },
      { title: "Water Absorption Pathways", description: "Apoplast (cell walls, faster) and Symplast (cytoplasm, controlled). Casparian strip blocks apoplast." },
      { title: "Transpiration Pull", description: "Main force for water ascent. Cohesion-tension theory: evaporation creates tension, cohesion keeps column intact." },
      { title: "Root Pressure", description: "Active ion pumping creates positive pressure. Causes guttation. Important in short plants." },
      { title: "Stomatal Mechanism", description: "K⁺ movement controls opening. Light/low CO₂ opens stomata, dark/high CO₂ closes them." },
      { title: "Phloem Transport", description: "Pressure flow hypothesis. Sugar loaded at source creates pressure, flows to sink where it's unloaded." },
      { title: "Transpiration", description: "Water vapor loss from leaves. 95% through stomata. Creates pull, cools plant, aids mineral transport." }
    ]),
    formulas: JSON.stringify([
      { name: "Water Potential", formula: "Ψw = Ψs + Ψp", description: "Solute potential (negative) + Pressure potential (positive in cells)" },
      { name: "Water Movement", formula: "High Ψw → Low Ψw", description: "Water always moves down its potential gradient" },
      { name: "Transpiration Types", formula: "Stomatal (95%) + Cuticular (5%) + Lenticular (trace)", description: "Most water lost through stomata" },
      { name: "Root Pressure Evidence", formula: "Guttation = Exudation of water droplets from leaves", description: "Seen in morning when transpiration is low" },
      { name: "Cohesion-Tension", formula: "Transpiration → Tension → Cohesion → Water ascent", description: "Main mechanism for tall trees" },
      { name: "Stomata Opening", formula: "K⁺ in → Water in → Turgid guard cells → Open", description: "Reversed for closing" },
      { name: "Mass Flow", formula: "Source (high P) → Phloem → Sink (low P)", description: "Pressure flow drives phloem transport" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 80
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 1,
    chapterTitle: "Sexual Reproduction in Flowering Plants",
    introduction: "Botany Chapter (Class 12): Flowers are nature's most beautiful reproductive structures! This chapter explores the complete journey of sexual reproduction in angiosperms - from flower development to pollination, fertilization, and seed formation. Discover the amazing process of double fertilization unique to flowering plants!",
    detailedNotes: `# Sexual Reproduction in Flowering Plants (Botany - Class 12)

Flowers are the reproductive organs of angiosperms. Let's explore the amazing journey from flower to seed!

## FLOWER STRUCTURE

A complete flower has four whorls:
1. **Calyx** (sepals) - Protection
2. **Corolla** (petals) - Attract pollinators
3. **Androecium** (stamens) - Male organs
4. **Gynoecium** (pistil) - Female organs

## STAMEN - Male Reproductive Organ

**Parts:**
- **Filament**: Stalk
- **Anther**: Produces pollen (bilobed, dithecous)

### Microsporogenesis (Pollen Formation)

**💡 Did You Know?**
A single anther can produce hundreds of thousands of pollen grains! This ensures that at least some reach their target.

**Steps:**
1. Pollen mother cells (2n) undergo meiosis
2. Form microspore tetrads (n)
3. Each microspore develops into pollen grain

### Pollen Grain Structure

**Two-celled Stage:**
- Vegetative cell (larger)
- Generative cell (smaller)

**Three-celled Stage** (in some plants):
- Vegetative cell
- Two male gametes (from generative cell division)

**Outer wall**: Exine (sporopollenin - very resistant)
**Inner wall**: Intine (cellulose + pectin)

**🔑 Remember This!**
Sporopollenin is the most resistant organic material known! It can survive harsh conditions, which is why pollen fossils are well preserved.

## PISTIL - Female Reproductive Organ

**Parts:**
- **Stigma**: Receives pollen
- **Style**: Tube connecting stigma to ovary
- **Ovary**: Contains ovules

### Ovule Structure

- **Funiculus**: Stalk attaching to ovary
- **Hilum**: Point of attachment
- **Integuments**: Protective coverings (1-2)
- **Micropyle**: Opening for pollen tube entry
- **Nucellus**: Nutritive tissue
- **Embryo sac**: Female gametophyte (7 cells, 8 nuclei)

### Megasporogenesis (Embryo Sac Formation)

**Steps:**
1. Megaspore mother cell (2n) undergoes meiosis
2. Forms 4 megaspores (n)
3. Only one survives (functional megaspore)
4. Three mitotic divisions produce 8 nuclei
5. Organize into 7-celled, 8-nucleate embryo sac

### Embryo Sac Structure (Female Gametophyte)

**⚠️ Common Mistake Alert!**
The embryo sac has 7 cells but 8 nuclei - the central cell has 2 polar nuclei that fuse during fertilization!

- **Egg apparatus** (micropylar end): 1 egg cell + 2 synergids
- **Central cell**: 2 polar nuclei
- **Antipodal cells** (chalazal end): 3 cells

## POLLINATION

**Definition:** Transfer of pollen from anther to stigma.

### Types

**Self-pollination (Autogamy):**
Same flower or same plant
- Ensures seed set
- Reduces genetic variation

**Cross-pollination (Allogamy):**
Between different plants
- Promotes genetic variation
- More common in nature

### Agents of Pollination

| Agent | Features | Pollen | Stigma |
|-------|----------|--------|--------|
| Wind (anemophily) | Light pollen, long stamens | Dry, smooth | Feathery |
| Water (hydrophily) | Aquatic plants | Protected | Wet-tolerant |
| Insects (entomophily) | Colored, scented, nectar | Sticky, rough | Sticky |
| Birds (ornithophily) | Red flowers, no scent | Sticky | Large |

### Outbreeding Devices

Plants avoid self-pollination through:
1. **Dichogamy**: Stamens and pistil mature at different times
2. **Herkogamy**: Physical barrier between stamens and stigma
3. **Self-incompatibility**: Genetic rejection of own pollen
4. **Unisexuality**: Separate male and female flowers

## DOUBLE FERTILIZATION - Unique to Angiosperms!

**💡 Did You Know?**
Double fertilization was discovered by Nawaschin in 1898. It's found ONLY in flowering plants - nowhere else in the plant or animal kingdom!

### Process

**Pollen Germination:**
1. Pollen lands on stigma
2. Pollen tube grows through style
3. Enters ovule through micropyle

**Syngamy (True Fertilization):**
Sperm 1 + Egg → Zygote (2n)

**Triple Fusion:**
Sperm 2 + 2 Polar nuclei → Primary Endosperm Nucleus (3n)

### Post-Fertilization Changes

| Structure | Develops into |
|-----------|---------------|
| Zygote | Embryo |
| Primary endosperm nucleus | Endosperm (3n) |
| Ovule | Seed |
| Ovary | Fruit |
| Integuments | Seed coat |

## EMBRYO DEVELOPMENT

**Dicot Embryo:**
- Epicotyl (above cotyledons)
- Hypocotyl (below cotyledons)
- Radicle (embryonic root)
- Plumule (embryonic shoot)
- Two cotyledons

**Monocot Embryo:**
- Single cotyledon (scutellum)
- Coleoptile (protects plumule)
- Coleorhiza (protects radicle)

## SEED AND FRUIT FORMATION

**Seed** = Fertilized, mature ovule
**Fruit** = Mature ovary

**Types of Seeds:**
- **Albuminous**: With endosperm (wheat, maize)
- **Ex-albuminous**: Without endosperm, food in cotyledons (pea, bean)

**🔑 Remember This!**
True fruits develop from ovary only. False fruits involve other flower parts (apple - thalamus, strawberry - receptacle).`,
    keyConcepts: JSON.stringify([
      { title: "Stamen Structure", description: "Male organ with filament and anther. Anther produces pollen through microsporogenesis (meiosis)." },
      { title: "Embryo Sac", description: "7 cells, 8 nuclei: 1 egg + 2 synergids + 2 polar nuclei + 3 antipodals. Formed by megasporogenesis." },
      { title: "Pollination Types", description: "Self (autogamy) or cross (allogamy). Agents: wind, water, insects, birds, bats." },
      { title: "Double Fertilization", description: "Unique to angiosperms. Sperm 1 + Egg = Zygote. Sperm 2 + Polar nuclei = Endosperm (3n)." },
      { title: "Post-fertilization", description: "Zygote → Embryo, Ovule → Seed, Ovary → Fruit. Integuments become seed coat." },
      { title: "Outbreeding Devices", description: "Dichogamy, herkogamy, self-incompatibility, unisexuality prevent self-pollination." },
      { title: "Seed Types", description: "Albuminous (with endosperm) or ex-albuminous (without endosperm, food in cotyledons)." }
    ]),
    formulas: JSON.stringify([
      { name: "Pollen Development", formula: "Pollen mother cell (2n) → Meiosis → 4 Pollen grains (n)", description: "Each microspore becomes a pollen grain" },
      { name: "Embryo Sac Formation", formula: "Megaspore (n) → 3 Mitotic divisions → 8 nuclei", description: "7 cells: 3+2+1+1 (antipodals, synergids, egg, central)" },
      { name: "Double Fertilization", formula: "Sperm₁ + Egg = Zygote (2n) | Sperm₂ + 2 Polar nuclei = PEN (3n)", description: "Unique to angiosperms" },
      { name: "Seed Components", formula: "Seed = Embryo + Endosperm (optional) + Seed coat", description: "Developed from fertilized ovule" },
      { name: "Fruit Development", formula: "Ovary → Fruit (Pericarp)", description: "True fruit from ovary only" },
      { name: "Outbreeding", formula: "Dichogamy + Herkogamy + Self-incompatibility", description: "Mechanisms to promote cross-pollination" },
      { name: "Dicot Embryo", formula: "Epicotyl + Hypocotyl + Radicle + Plumule + 2 Cotyledons", description: "Monocot has 1 cotyledon + coleoptile + coleorhiza" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 2,
    chapterTitle: "Principles of Inheritance and Variation",
    introduction: "Botany Chapter (Class 12): Why do children look like their parents but aren't identical? Gregor Mendel's pea plant experiments unlocked the secrets of heredity. This chapter explores Mendelian genetics, inheritance patterns, and how genes are passed from one generation to the next!",
    detailedNotes: `# Principles of Inheritance and Variation (Botany - Class 12)

Genetics is the study of heredity and variation. Gregor Mendel, the "Father of Genetics," discovered the fundamental laws using pea plants!

## MENDEL'S EXPERIMENTS

**Why Pea Plants?**
- Many contrasting traits
- Short life cycle
- Self-pollination possible
- Easy to cross-pollinate

**💡 Did You Know?**
Mendel was a monk who worked with over 28,000 pea plants for 7 years! His work was ignored for 35 years until three scientists independently rediscovered it in 1900.

### Monohybrid Cross

Cross between parents differing in ONE trait.

**Example:** Tall × Dwarf

**F₁ Generation:** All Tall (dominant trait)
**F₂ Generation:** 3 Tall : 1 Dwarf (3:1 ratio)

**Genotypes:**
- TT (Homozygous tall)
- Tt (Heterozygous tall)
- tt (Homozygous dwarf)

**Phenotypes:** Tall or Dwarf

### MENDEL'S LAWS

**1. Law of Dominance**
- One allele is dominant over the other (recessive)
- Dominant allele expressed in heterozygote
- Example: T (tall) dominant over t (dwarf)

**2. Law of Segregation**
- Each individual has two alleles for each trait
- Alleles separate during gamete formation
- Each gamete receives one allele

**🔑 Remember This!**
Law of Segregation is also called "Law of Purity of Gametes" - gametes are always pure for one allele!

**3. Law of Independent Assortment**
- Alleles of different genes assort independently
- Forms basis of dihybrid cross

### Dihybrid Cross

Cross between parents differing in TWO traits.

**Example:** Round Yellow × Wrinkled Green

**F₂ Ratio:** 9:3:3:1
- 9 Round Yellow
- 3 Round Green
- 3 Wrinkled Yellow
- 1 Wrinkled Green

**⚠️ Common Mistake Alert!**
9:3:3:1 ratio appears ONLY when genes are on different chromosomes! If genes are linked (same chromosome), ratios change.

## INCOMPLETE DOMINANCE

When heterozygote is intermediate between two homozygotes.

**Example:** Snapdragon flower color
- RR = Red
- Rr = Pink (intermediate)
- rr = White

**F₂ Ratio:** 1 Red : 2 Pink : 1 White (1:2:1)

## CO-DOMINANCE

When BOTH alleles express equally in heterozygote.

**Example:** ABO blood group
- Iᴬ and Iᴮ are co-dominant
- Both express in Iᴬ Iᴮ (AB blood type)

## MULTIPLE ALLELES

More than two alleles for a gene in population (but each individual has only 2).

**Example:** ABO Blood Groups

| Genotype | Blood Type |
|----------|------------|
| Iᴬ Iᴬ or Iᴬ i | A |
| Iᴮ Iᴮ or Iᴮ i | B |
| Iᴬ Iᴮ | AB |
| ii | O |

**💡 Did You Know?**
Blood type O is the universal donor and AB is the universal recipient. This saved millions of lives in blood transfusions!

## CHROMOSOMAL THEORY OF INHERITANCE

Sutton and Boveri (1902):
- Genes are on chromosomes
- Chromosomes occur in pairs
- Chromosomes segregate during meiosis
- This explains Mendel's laws!

## LINKAGE AND RECOMBINATION

**Linkage:** Genes on same chromosome tend to inherit together.
**Recombination:** Crossing over creates new combinations.

**Recombination Frequency = (Recombinant offspring / Total offspring) × 100**

Higher frequency = genes farther apart on chromosome

## SEX DETERMINATION

### In Humans (XX-XY System)
- Females: XX (homogametic)
- Males: XY (heterogametic)
- Father determines sex of child

### In Birds (ZW-ZZ System)
- Males: ZZ
- Females: ZW
- Mother determines sex

## SEX-LINKED INHERITANCE

Genes on sex chromosomes show special inheritance patterns.

**X-linked Recessive** (Color blindness, Hemophilia):
- More common in males (only one X)
- Carrier females pass to sons
- Affected male + Carrier female → 50% affected sons

**Example:** Color Blindness

| Cross | Offspring |
|-------|-----------|
| Carrier female × Normal male | 50% carrier daughters, 50% normal daughters, 50% affected sons, 50% normal sons |

## MUTATION

Changes in genetic material.

**Point Mutations:** Single nucleotide changes
- Sickle cell anemia: GAG → GUG (Glu → Val)

**Chromosomal Mutations:**
- Deletion, Duplication, Inversion, Translocation

## PEDIGREE ANALYSIS

**🔑 Remember This!**
Pedigree symbols: Square = Male, Circle = Female, Filled = Affected, Half-filled = Carrier

**Autosomal Dominant:** Appears every generation, affected parent has affected child
**Autosomal Recessive:** Skips generations, unaffected parents can have affected child
**X-linked Recessive:** More males affected, mother is carrier`,
    keyConcepts: JSON.stringify([
      { title: "Mendel's Laws", description: "Dominance (one allele expressed), Segregation (alleles separate in gametes), Independent Assortment (genes assort independently)." },
      { title: "Monohybrid Cross", description: "Single trait cross. F₂ ratio 3:1. Example: Tt × Tt → 1 TT : 2 Tt : 1 tt." },
      { title: "Dihybrid Cross", description: "Two trait cross. F₂ ratio 9:3:3:1. Requires independent assortment (genes on different chromosomes)." },
      { title: "Incomplete vs Co-dominance", description: "Incomplete: heterozygote is intermediate (1:2:1). Co-dominance: both alleles fully expressed." },
      { title: "Sex Determination", description: "Humans: XX-XY (father determines sex). Birds: ZW-ZZ (mother determines sex)." },
      { title: "Sex-linked Inheritance", description: "X-linked recessive traits more common in males. Carrier mothers pass to sons." },
      { title: "Linkage and Recombination", description: "Linked genes on same chromosome. Crossing over creates recombinants. Frequency indicates distance." }
    ]),
    formulas: JSON.stringify([
      { name: "Monohybrid F₂", formula: "3:1 (Phenotypic) | 1:2:1 (Genotypic)", description: "Ratio for complete dominance" },
      { name: "Dihybrid F₂", formula: "9:3:3:1 (Phenotypic)", description: "For independently assorting genes" },
      { name: "Incomplete Dominance F₂", formula: "1:2:1 (Phenotypic = Genotypic)", description: "All three phenotypes distinguishable" },
      { name: "Test Cross", formula: "Unknown × Recessive homozygote", description: "Determines if dominant phenotype is TT or Tt" },
      { name: "Recombination Frequency", formula: "RF = (Recombinants/Total) × 100%", description: "1% RF = 1 centimorgan (map unit)" },
      { name: "Blood Type Genetics", formula: "Iᴬ, Iᴮ (co-dominant) > i (recessive)", description: "Three alleles, four blood types" },
      { name: "Sex Ratio", formula: "XX × XY → 1:1 (female:male)", description: "50% chance of each sex" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 95
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 3,
    chapterTitle: "Molecular Basis of Inheritance",
    introduction: "Botany Chapter (Class 12): DNA is the blueprint of life! This chapter explores the molecular structure of genetic material, how DNA replicates itself, and how the genetic code is transcribed and translated into proteins. Understanding these processes reveals the central dogma of molecular biology!",
    detailedNotes: `# Molecular Basis of Inheritance (Botany - Class 12)

DNA (Deoxyribonucleic Acid) is the molecule that carries genetic information. Let's explore its structure and function!

## DNA AS GENETIC MATERIAL

### Evidence

**Griffith's Experiment (1928):**
- Showed "transforming principle" could transfer traits
- Heat-killed virulent bacteria transformed non-virulent ones

**Avery, MacLeod, McCarty (1944):**
- Identified DNA as the transforming principle
- Not proteins, RNA, or lipids

**Hershey-Chase Experiment (1952):**
- Used radioactive S³⁵ (proteins) and P³² (DNA)
- Only P³² (DNA) entered bacteria
- Proved DNA is genetic material

**💡 Did You Know?**
If all the DNA in your body was uncoiled and placed end to end, it would reach to the Sun and back about 600 times!

## DNA STRUCTURE (Watson & Crick, 1953)

### Double Helix Model

- Two polynucleotide chains twisted around each other
- Antiparallel (one 5'→3', other 3'→5')
- Right-handed helix

### Components

**Nucleotide = Sugar + Phosphate + Nitrogenous Base**

**Sugar:** Deoxyribose (5-carbon)

**Bases:**
- Purines: Adenine (A), Guanine (G) - double ring
- Pyrimidines: Cytosine (C), Thymine (T) - single ring

**Base Pairing (Chargaff's Rules):**
- A = T (2 hydrogen bonds)
- G ≡ C (3 hydrogen bonds)

**🔑 Remember This!**
A-T has 2 bonds (2 letters, 2 bonds)
G-C has 3 bonds (3 letters, 3 bonds)

### Dimensions
- Width: 20 Å (2 nm)
- Pitch (one complete turn): 34 Å
- Base pairs per turn: 10
- Distance between base pairs: 3.4 Å

## DNA PACKAGING

In eukaryotes, DNA is wrapped around histone proteins to form chromatin.

**Levels:**
1. DNA wraps around histone octamer → Nucleosome
2. Nucleosomes coil → 30 nm fiber (solenoid)
3. Further coiling → Chromosome

**⚠️ Common Mistake Alert!**
Histones are positively charged (basic) to bind with negatively charged DNA (acidic). If you mix up the charges, the model doesn't work!

## DNA REPLICATION

**Semiconservative Replication:**
- Each new DNA has one old strand and one new strand
- Proved by Meselson and Stahl (1958) using N¹⁵

### Enzymes Involved

| Enzyme | Function |
|--------|----------|
| Helicase | Unwinds double helix |
| SSB proteins | Stabilize single strands |
| Primase | Makes RNA primer |
| DNA Polymerase III | Adds nucleotides (5'→3' only) |
| DNA Polymerase I | Removes primers, fills gaps |
| Ligase | Joins Okazaki fragments |

### Leading vs Lagging Strand

- **Leading strand:** Continuous synthesis (toward replication fork)
- **Lagging strand:** Discontinuous (Okazaki fragments, away from fork)

## CENTRAL DOGMA

**DNA → RNA → Protein**
(Replication) (Transcription) (Translation)

## TRANSCRIPTION (DNA → RNA)

RNA Polymerase reads template strand and synthesizes mRNA.

### Steps (in Prokaryotes):
1. **Initiation:** RNA polymerase binds to promoter
2. **Elongation:** RNA synthesized 5'→3'
3. **Termination:** At terminator sequence

### In Eukaryotes:
- Three RNA polymerases (I, II, III)
- mRNA processed: 5' cap, 3' poly-A tail, splicing

**💡 Did You Know?**
Introns are removed during RNA processing! Some genes have more intron than exon sequences - your cells are removing "junk" to make the final message.

## GENETIC CODE

Triplet of bases (codon) codes for amino acid.

**Properties:**
- Triplet: 3 bases = 1 codon = 1 amino acid
- Degenerate: Multiple codons for same amino acid (61 codons for 20 amino acids)
- Universal: Same in all organisms
- Non-overlapping: Each base read only once
- Commaless: No gaps between codons

**Special Codons:**
- Start: AUG (also codes Methionine)
- Stop: UAA, UAG, UGA

## TRANSLATION (mRNA → Protein)

Occurs on ribosomes.

### Steps:
1. **Initiation:** mRNA binds ribosome, initiator tRNA brings Met
2. **Elongation:** tRNA brings amino acids, peptide bond forms
3. **Termination:** Stop codon reached, protein released

### tRNA Structure:
- Cloverleaf shape
- Anticodon: Complementary to mRNA codon
- 3' end: Amino acid attachment (CCA)

## REGULATION OF GENE EXPRESSION

### Lac Operon (E. coli)

**🔑 Remember This!**
Lac operon is INDUCIBLE - genes are OFF normally, turned ON by lactose.

**Components:**
- Regulatory gene (i): Makes repressor
- Promoter (p): RNA polymerase binding
- Operator (o): Repressor binding
- Structural genes (z, y, a): Make enzymes for lactose metabolism

**Without lactose:** Repressor blocks operator, genes OFF
**With lactose:** Lactose binds repressor, genes ON`,
    keyConcepts: JSON.stringify([
      { title: "DNA Structure", description: "Double helix, antiparallel strands. A-T (2 H-bonds), G-C (3 H-bonds). 10 bp per turn, 34 Å pitch." },
      { title: "DNA Replication", description: "Semiconservative - each new DNA has one old strand. Requires helicase, primase, DNA polymerase, ligase." },
      { title: "Transcription", description: "DNA → RNA by RNA polymerase. In eukaryotes: capping, tailing, splicing of mRNA." },
      { title: "Genetic Code", description: "Triplet, degenerate, universal, non-overlapping, commaless. 64 codons, 3 stop (UAA, UAG, UGA)." },
      { title: "Translation", description: "mRNA → Protein on ribosomes. tRNA brings amino acids. Initiation, elongation, termination." },
      { title: "Lac Operon", description: "Inducible operon in E. coli. Repressor normally blocks transcription. Lactose induces expression." },
      { title: "Central Dogma", description: "DNA → RNA → Protein. Information flows from nucleic acids to proteins, not reverse (except retroviruses)." }
    ]),
    formulas: JSON.stringify([
      { name: "Chargaff's Rules", formula: "A = T, G = C, Purines = Pyrimidines", description: "Base pairing is complementary and equal" },
      { name: "DNA Dimensions", formula: "Width: 20Å, Pitch: 34Å, 10 bp/turn, 3.4Å between bp", description: "Standard B-form DNA measurements" },
      { name: "Nucleotide Structure", formula: "Nucleotide = Sugar + Phosphate + Base", description: "Sugar is deoxyribose in DNA, ribose in RNA" },
      { name: "Codons", formula: "4³ = 64 possible codons", description: "61 code for amino acids, 3 are stop codons" },
      { name: "Central Dogma", formula: "DNA → RNA → Protein", description: "Replication, Transcription, Translation" },
      { name: "Start Codon", formula: "AUG (Methionine)", description: "First codon translated, sets reading frame" },
      { name: "Stop Codons", formula: "UAA, UAG, UGA", description: "Signal end of translation, no amino acid" }
    ]),
    difficultyLevel: 4,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 4,
    chapterTitle: "Organisms and Populations",
    introduction: "Botany Chapter (Class 12): How do organisms survive in their environment? This chapter explores ecology at the levels of organisms and populations. Learn about adaptations to different habitats, population dynamics, and the complex interactions between species in nature!",
    detailedNotes: `# Organisms and Populations (Botany - Class 12)

Ecology is the study of interactions between organisms and their environment. Let's explore how living things adapt and interact!

## ECOLOGY - BASIC CONCEPTS

**Levels of Organization:**
Organism → Population → Community → Ecosystem → Biome → Biosphere

## ORGANISM AND ITS ENVIRONMENT

### Abiotic Factors

**1. Temperature**
- Most important factor
- Affects enzyme activity, metabolism
- Eurythermal: Wide range tolerance (humans)
- Stenothermal: Narrow range tolerance (polar bears)

**💡 Did You Know?**
Some Antarctic fish have antifreeze proteins in their blood! They can survive in water below 0°C that would freeze other fish solid.

**2. Water**
- Essential for all life
- Euryhaline: Tolerate wide salinity range
- Stenohaline: Tolerate narrow salinity range

**3. Light**
- Energy source for photosynthesis
- Affects flowering (photoperiodism)
- Diurnal/nocturnal behavior

**4. Soil**
- Provides minerals and water
- Determines plant distribution
- Soil pH affects nutrient availability

### Responses to Abiotic Stress

**1. Regulate** (Homeostasis)
- Maintain constant internal environment
- Energy expensive
- Example: Mammals maintain body temperature

**2. Conform**
- Body changes with environment
- Energy efficient
- Example: Most fish, reptiles

**3. Migrate**
- Move to favorable conditions
- Temporary solution
- Example: Birds, butterflies

**4. Suspend**
- Enter dormancy during stress
- Hibernation (winter), Aestivation (summer)
- Seeds remain dormant for years

**🔑 Remember This!**
Regulators spend energy to maintain constancy. Conformers save energy but their functions vary with environment.

## ADAPTATIONS

### Desert Adaptations

**Plants:**
- Thick cuticle (reduces water loss)
- Sunken stomata (less evaporation)
- CAM photosynthesis (stomata open at night)
- Deep roots, succulent stems
- Example: Cactus (Opuntia)

**Animals:**
- Nocturnal behavior
- Concentrated urine (kangaroo rat)
- Burrows to escape heat

### Aquatic Adaptations

**Plants:**
- Aerenchyma (air spaces)
- Floating leaves
- Reduced roots

**Animals:**
- Streamlined body
- Gills for respiration
- Swim bladder

### Cold Adaptations

**Allen's Rule:** Animals in cold regions have shorter extremities
**Bergmann's Rule:** Animals in cold regions are larger bodied

**⚠️ Common Mistake Alert!**
Allen's Rule is about extremities (ears, tail), Bergmann's Rule is about body size. Don't confuse them!

## POPULATIONS

### Population Attributes

1. **Population Size (N):** Total number of individuals
2. **Population Density:** N per unit area
3. **Birth Rate (Natality):** Births per individual per unit time
4. **Death Rate (Mortality):** Deaths per individual per unit time
5. **Sex Ratio:** Males to females
6. **Age Structure:** Proportion in different age groups

### Population Growth

**Exponential Growth** (J-shaped curve):
- Unlimited resources
- dN/dt = rN
- N = N₀ × e^(rt)

**Logistic Growth** (S-shaped/Sigmoid curve):
- Limited resources
- Carrying capacity (K)
- dN/dt = rN(K-N)/K

**💡 Did You Know?**
If bacteria divided every 20 minutes without any checks, a single bacterium would produce a mass greater than Earth in just 2 days!

### Life History Strategies

**r-strategists:** Many offspring, little parental care (insects, fish)
**K-strategists:** Few offspring, much parental care (elephants, humans)

## POPULATION INTERACTIONS

| Interaction | Species A | Species B | Example |
|------------|-----------|-----------|---------|
| Mutualism | + | + | Mycorrhiza, Lichens |
| Competition | - | - | Tigers competing for territory |
| Predation | + | - | Lion and deer |
| Parasitism | + | - | Tapeworm in host |
| Commensalism | + | 0 | Orchids on trees |
| Amensalism | 0 | - | Penicillium inhibiting bacteria |

### Competition

**Gause's Competitive Exclusion Principle:**
Two closely related species cannot coexist indefinitely if competing for same resources.

**Resource Partitioning:** Species divide resources to reduce competition

### Predation

Benefits:
- Controls prey population
- Transfers energy through food chain
- Promotes biodiversity

**Prey Defenses:**
- Camouflage (cryptic coloration)
- Warning coloration (aposematic)
- Mimicry (Batesian, Müllerian)
- Thorns, spines, toxins

### Mutualism

Both species benefit!

**Examples:**
- Mycorrhiza: Fungus + Plant root
- Lichen: Algae + Fungus
- Fig and wasp: Pollination
- Nitrogen-fixing bacteria + Legumes

**🔑 Remember This!**
+ means benefit, - means harm, 0 means no effect. This helps remember interaction types!`,
    keyConcepts: JSON.stringify([
      { title: "Abiotic Factors", description: "Temperature, water, light, soil affect organism distribution. Eurythermal/stenothermal, euryhaline/stenohaline." },
      { title: "Stress Responses", description: "Regulate (maintain constant), Conform (change with environment), Migrate (move), Suspend (dormancy)." },
      { title: "Adaptations", description: "Desert: thick cuticle, CAM. Aquatic: aerenchyma, streamlined. Cold: Allen's rule (extremities), Bergmann's rule (size)." },
      { title: "Population Growth", description: "Exponential (J-curve, unlimited resources). Logistic (S-curve, carrying capacity K limits growth)." },
      { title: "Population Interactions", description: "Mutualism (+/+), Competition (-/-), Predation (+/-), Parasitism (+/-), Commensalism (+/0), Amensalism (0/-)." },
      { title: "Competitive Exclusion", description: "Gause's principle: two species competing for same resource cannot coexist indefinitely." },
      { title: "Prey Defenses", description: "Camouflage, warning colors, mimicry, chemical defenses protect prey from predators." }
    ]),
    formulas: JSON.stringify([
      { name: "Exponential Growth", formula: "dN/dt = rN; N = N₀e^(rt)", description: "J-shaped curve, unlimited resources" },
      { name: "Logistic Growth", formula: "dN/dt = rN(K-N)/K", description: "S-shaped curve, K = carrying capacity" },
      { name: "Birth Rate", formula: "Natality = Births/Individual/Time", description: "Expressed as per capita birth rate" },
      { name: "Death Rate", formula: "Mortality = Deaths/Individual/Time", description: "Expressed as per capita death rate" },
      { name: "Population Growth Rate", formula: "r = Birth rate - Death rate", description: "Intrinsic rate of natural increase" },
      { name: "Allen's Rule", formula: "Cold climate → Shorter extremities", description: "Reduces surface area for heat retention" },
      { name: "Bergmann's Rule", formula: "Cold climate → Larger body size", description: "Reduces surface area to volume ratio" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 85
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 5,
    chapterTitle: "Ecosystem",
    introduction: "Botany Chapter (Class 12): An ecosystem is nature's economy! This chapter explores how energy flows and nutrients cycle through ecosystems. Learn about food chains, food webs, ecological pyramids, and the vital processes that keep our planet functioning!",
    detailedNotes: `# Ecosystem (Botany - Class 12)

An ecosystem is a functional unit of nature where living organisms interact with each other and their physical environment.

## ECOSYSTEM STRUCTURE

### Components

**Abiotic (Non-living):**
- Sunlight, temperature, water
- Soil, minerals, gases

**Biotic (Living):**
- Producers (Autotrophs)
- Consumers (Heterotrophs)
- Decomposers

**💡 Did You Know?**
The entire Amazon rainforest is one giant ecosystem that produces about 20% of Earth's oxygen! It's often called "the lungs of the planet."

### Trophic Levels

| Level | Organisms | Example |
|-------|-----------|---------|
| T₁ | Producers (autotrophs) | Plants, algae |
| T₂ | Primary consumers (herbivores) | Grasshopper, deer |
| T₃ | Secondary consumers (carnivores) | Frog, lion |
| T₄ | Tertiary consumers (top carnivores) | Snake, tiger |
| - | Decomposers | Bacteria, fungi |

## PRODUCTIVITY

### Types

**1. Primary Productivity**
Rate at which producers capture solar energy and convert to organic matter.

**Gross Primary Productivity (GPP):**
Total organic matter produced by photosynthesis

**Net Primary Productivity (NPP):**
NPP = GPP - Respiration

**🔑 Remember This!**
NPP is what's available for consumers. Some energy is always "lost" to plant respiration!

**2. Secondary Productivity**
Rate at which consumers produce organic matter

### Factors Affecting Productivity
- Light availability
- Temperature
- Water availability
- Nutrient availability

**Most Productive Ecosystems:**
1. Tropical rainforests
2. Coral reefs
3. Estuaries

**Least Productive:**
1. Deserts
2. Open ocean

## ENERGY FLOW

**Laws of Thermodynamics apply:**
- Energy cannot be created or destroyed
- Energy transfer is never 100% efficient

### 10% Law (Lindeman's Law)

**Only 10% of energy transfers to the next trophic level!**

**⚠️ Common Mistake Alert!**
90% of energy is lost at each level, not transferred! It's used for respiration, lost as heat, or remains undigested.

**Example:**
- Producers: 1000 kcal
- Primary consumers: 100 kcal (10%)
- Secondary consumers: 10 kcal (1%)
- Tertiary consumers: 1 kcal (0.1%)

### Food Chain

Linear sequence of who eats whom.

**Grazing Food Chain (GFC):**
Plants → Herbivores → Carnivores
(Starts with living plants)

**Detritus Food Chain (DFC):**
Dead organic matter → Detritivores → Decomposers
(Starts with dead matter)

### Food Web

Interconnected food chains showing complex feeding relationships.

**💡 Did You Know?**
In a typical ecosystem, food webs are so complex that removing just one species can collapse the entire system - like removing a thread from a sweater!

## ECOLOGICAL PYRAMIDS

Graphical representation of trophic levels.

### Types

**1. Pyramid of Numbers**
- Usually upright (grass → insects → birds → hawk)
- Inverted in tree ecosystem (1 tree → many insects → fewer birds)
- Parasitic food chain also inverted

**2. Pyramid of Biomass**
- Usually upright on land
- Inverted in aquatic ecosystems (phytoplankton < zooplankton)

**3. Pyramid of Energy**
- ALWAYS upright!
- 10% energy transfer at each level
- Never inverted

## NUTRIENT CYCLING (Biogeochemical Cycles)

Nutrients cycle between living and non-living components.

### Carbon Cycle

**Sources of CO₂:**
- Respiration
- Decomposition
- Combustion (fossil fuels)
- Volcanic eruptions

**Sinks for CO₂:**
- Photosynthesis
- Ocean absorption
- Fossil fuel formation

**🔑 Remember This!**
CO₂ in atmosphere: ~0.04% (400 ppm)
Increased from 280 ppm (pre-industrial) due to human activities!

### Nitrogen Cycle

**Steps:**
1. **Nitrogen Fixation:** N₂ → NH₃ (by bacteria, lightning)
2. **Nitrification:** NH₃ → NO₂⁻ → NO₃⁻ (by Nitrosomonas, Nitrobacter)
3. **Assimilation:** Plants absorb NO₃⁻
4. **Ammonification:** Organic N → NH₃ (decomposition)
5. **Denitrification:** NO₃⁻ → N₂ (by Pseudomonas)

**Nitrogen-fixing organisms:**
- Free-living: Azotobacter, Cyanobacteria
- Symbiotic: Rhizobium (in legume nodules)

### Phosphorus Cycle

- NO gaseous phase (unlike C and N)
- Major reservoir: Rocks
- Weathering releases phosphates
- Absorbed by plants
- Returns through decomposition

## ECOLOGICAL SUCCESSION

Gradual change in species composition over time.

### Types

**Primary Succession:**
- On bare, lifeless substrate (new volcanic island, exposed rock)
- Starts with pioneer species (lichens, mosses)
- Very slow (hundreds to thousands of years)

**Secondary Succession:**
- On previously vegetated area (after fire, flood)
- Soil and seeds already present
- Faster than primary

### Stages (Sere)
Pioneer community → Intermediate communities → Climax community

**Example (Rock succession):**
Lichens → Mosses → Herbs → Shrubs → Trees (climax)`,
    keyConcepts: JSON.stringify([
      { title: "Ecosystem Components", description: "Abiotic (non-living) and Biotic (producers, consumers, decomposers). Trophic levels organize feeding relationships." },
      { title: "Productivity", description: "GPP = total photosynthesis. NPP = GPP - respiration. NPP is available for consumers." },
      { title: "10% Law", description: "Only 10% of energy transfers to next trophic level. 90% lost to respiration and heat. Limits food chain length." },
      { title: "Food Chain vs Web", description: "Food chain is linear (one path). Food web shows interconnected chains (realistic complexity)." },
      { title: "Ecological Pyramids", description: "Numbers and biomass can be inverted. Energy pyramid is ALWAYS upright due to 10% law." },
      { title: "Carbon Cycle", description: "Photosynthesis fixes CO₂, respiration releases it. Human activities increasing atmospheric CO₂." },
      { title: "Nitrogen Cycle", description: "Fixation → Nitrification → Assimilation → Ammonification → Denitrification. Bacteria are key players." }
    ]),
    formulas: JSON.stringify([
      { name: "Net Primary Productivity", formula: "NPP = GPP - Respiration", description: "Energy available for consumers" },
      { name: "10% Law", formula: "Energy at Tₙ₊₁ = 10% of Energy at Tₙ", description: "Lindeman's law of energy transfer" },
      { name: "Energy at Each Level", formula: "T₁(1000) → T₂(100) → T₃(10) → T₄(1)", description: "Example showing 10% transfer" },
      { name: "Nitrogen Fixation", formula: "N₂ + 8H⁺ + 8e⁻ → 2NH₃ + H₂", description: "By nitrogenase enzyme in bacteria" },
      { name: "Nitrification", formula: "NH₃ → NO₂⁻ → NO₃⁻", description: "Nitrosomonas then Nitrobacter" },
      { name: "Denitrification", formula: "NO₃⁻ → N₂", description: "Returns nitrogen to atmosphere (Pseudomonas)" },
      { name: "Carbon in Atmosphere", formula: "~0.04% or 400 ppm", description: "Increasing due to fossil fuel burning" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 6,
    chapterTitle: "Biodiversity and Conservation",
    introduction: "Botany Chapter (Class 12): Earth is home to millions of species, but many are disappearing faster than ever before. This chapter explores patterns of biodiversity, the alarming causes of biodiversity loss, and the conservation strategies we must adopt to protect our planet's living heritage!",
    detailedNotes: `# Biodiversity and Conservation (Botany - Class 12)

Biodiversity is the variety of life on Earth - our planet's greatest treasure that we must protect!

## WHAT IS BIODIVERSITY?

**Definition:** The variety of life at all levels - genetic, species, and ecosystem diversity.

### Levels of Biodiversity

**1. Genetic Diversity**
- Variation in genes within a species
- Example: Different rice varieties (over 50,000!)
- More genetic diversity = better adaptability

**2. Species Diversity**
- Number of different species in an area
- Includes species richness and evenness
- Rainforests have highest species diversity

**3. Ecosystem Diversity**
- Variety of ecosystems in a region
- India: Deserts, rainforests, wetlands, coral reefs, mountains

**💡 Did You Know?**
Scientists estimate there are 8-10 million species on Earth, but only about 1.8 million have been discovered and named! Most undiscovered species are insects in tropical rainforests.

## PATTERNS OF BIODIVERSITY

### Species-Area Relationship

**Alexander von Humboldt observed:**
Within a region, species richness increases with area explored.

**S = cA^z**

Where:
- S = Species richness
- A = Area
- c = Y-intercept (constant)
- z = Slope (regression coefficient)

**Normal z value: 0.1 to 0.2** (for small areas)
**Larger z value: 0.6 to 1.2** (for continents/large areas)

### Latitudinal Gradient

**More species near the equator, fewer toward poles.**

**🔑 Remember This!**
Tropical regions have highest biodiversity because:
1. More solar energy
2. Stable climate year-round
3. More evolutionary time
4. Greater habitat diversity

**Examples:**
- Colombia: 1,400 bird species
- India: 1,200 bird species
- New York (USA): 105 bird species
- Greenland: 56 bird species

## IMPORTANCE OF BIODIVERSITY

### Direct Values

**1. Consumptive Value**
- Food (rice, wheat, fruits)
- Fuel wood, timber
- Fiber (cotton, jute)
- Medicines (25% of drugs from plants)

**2. Productive Value**
- Commercial products
- Biotechnology resources
- Genetic resources for breeding

### Indirect Values (Ecosystem Services)

- Oxygen production
- Carbon sequestration
- Pollination (worth billions!)
- Nutrient cycling
- Water purification
- Soil formation
- Climate regulation

**⚠️ Common Mistake Alert!**
Ecosystem services are often ignored because they're free - but they're worth trillions of dollars! We only notice when we lose them.

### Ethical/Intrinsic Value
- Every species has a right to exist
- Aesthetic and spiritual value
- Future generations' rights

## BIODIVERSITY LOSS

### The Extinction Crisis

- Current extinction rate: 1000x natural rate
- We're in the 6th mass extinction!
- 12% mammals and 12% birds threatened
- 32% amphibians at risk

### Causes of Biodiversity Loss ("HIPPO")

**💡 Did You Know?**
Remember HIPPO for causes of extinction:
H - Habitat loss
I - Invasive species
P - Pollution
P - Population growth (overexploitation)
O - Overexploitation

**1. Habitat Loss and Fragmentation**
- Most important cause!
- Tropical rainforests reduced from 14% to 6% of land
- Fragmentation creates "islands" isolating populations

**2. Overexploitation**
- Hunting, fishing beyond sustainable levels
- Passenger pigeon: 5 billion → extinct (1914)
- Dodo: Extinct by 1690

**3. Alien Species Invasion**
- Introduced species outcompete natives
- Water hyacinth in India
- Cats in New Zealand killed native birds

**4. Co-extinctions**
- When one species goes extinct, dependent species follow
- Example: Plant-specific pollinator loses its host

**5. Pollution and Climate Change**
- Acid rain, pesticides
- Global warming shifting habitats

## CONSERVATION STRATEGIES

### In-situ Conservation (On-site)

**Protected Areas:**
- National Parks (106 in India)
- Wildlife Sanctuaries (553 in India)
- Biosphere Reserves (18 in India)

**Biodiversity Hotspots:**
- Regions with exceptionally high biodiversity
- High endemism and under threat
- 36 hotspots worldwide
- India has 4: Western Ghats, Himalayas, Indo-Burma, Sundaland

**🔑 Remember This!**
Hotspots criteria: >1,500 endemic plant species AND lost >70% original habitat

### Ex-situ Conservation (Off-site)

**Gene Banks:**
- Store seeds, pollen, tissue cultures
- National Bureau of Plant Genetic Resources (NBPGR)

**Botanical Gardens:**
- Living plant collections
- Over 1,500 worldwide

**Zoological Parks:**
- Captive breeding programs
- Reintroduction to wild

**Seed Banks:**
- Svalbard Global Seed Vault (Norway)
- Stores seeds from around the world

### International Efforts

- CITES (Convention on Trade in Endangered Species)
- CBD (Convention on Biological Diversity)
- IUCN Red List
- Ramsar Convention (Wetlands)

## SACRED GROVES

Traditional community-protected forest patches.

**Significance:**
- Protect rare species
- Preserve genetic diversity
- Cultural and religious importance
- Examples: Khasi hills, Western Ghats`,
    keyConcepts: JSON.stringify([
      { title: "Levels of Biodiversity", description: "Genetic (within species), Species (between species), Ecosystem (habitats). All levels are interconnected." },
      { title: "Species-Area Relationship", description: "S = cAᶻ. More area = more species. z typically 0.1-0.2 for small areas, higher for continents." },
      { title: "Latitudinal Gradient", description: "Biodiversity highest at equator, decreases toward poles. Due to stable climate, more energy, longer evolution time." },
      { title: "HIPPO Causes", description: "Habitat loss, Invasive species, Pollution, Population growth, Overexploitation - main causes of biodiversity loss." },
      { title: "Biodiversity Hotspots", description: "36 regions with high endemism (>1500 plants) and >70% habitat loss. India has 4 hotspots." },
      { title: "In-situ Conservation", description: "Protecting species in natural habitat. National parks, sanctuaries, biosphere reserves." },
      { title: "Ex-situ Conservation", description: "Protecting species outside habitat. Gene banks, seed banks, botanical gardens, zoos, captive breeding." }
    ]),
    formulas: JSON.stringify([
      { name: "Species-Area Relationship", formula: "S = cAᶻ (or log S = log c + z log A)", description: "S = species, A = area, z = slope (0.1-0.2 typical)" },
      { name: "Current Extinction Rate", formula: "1000× natural background rate", description: "We're in the 6th mass extinction" },
      { name: "HIPPO Causes", formula: "Habitat loss, Invasive, Pollution, Population, Overexploitation", description: "Mnemonic for extinction causes" },
      { name: "Hotspot Criteria", formula: ">1,500 endemic plants AND >70% habitat lost", description: "36 hotspots worldwide, 4 in India" },
      { name: "India's Protected Areas", formula: "106 National Parks + 553 Wildlife Sanctuaries", description: "Plus 18 Biosphere Reserves" },
      { name: "Global Species", formula: "~1.8 million described, ~8-10 million estimated", description: "Most undiscovered are insects and microbes" },
      { name: "Rivet Popper Hypothesis", formula: "Species loss = Rivets popping from airplane", description: "Ehrlich's analogy for ecosystem collapse" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 85
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 7,
    chapterTitle: "Photosynthesis in Higher Plants",
    introduction: "Botany Chapter (Class 12): Photosynthesis is the most important chemical process on Earth! This chapter dives deep into how plants capture sunlight and convert it into food. Explore the light reactions, the Calvin cycle, and discover why some plants have evolved special pathways like C4 and CAM!",
    detailedNotes: `# Photosynthesis in Higher Plants (Botany - Class 12)

Photosynthesis is the process by which plants convert light energy into chemical energy, producing food for almost all life on Earth!

## THE EQUATION

**6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O**

Light energy is captured by chlorophyll and stored in glucose!

**💡 Did You Know?**
Photosynthesis produces about 170 billion tonnes of organic matter per year! That's the basis of almost all food chains on Earth.

## WHERE PHOTOSYNTHESIS OCCURS

### Chloroplast Structure

- **Outer membrane**: Permeable
- **Inner membrane**: Less permeable
- **Stroma**: Fluid matrix, dark reaction occurs
- **Thylakoids**: Membrane sacs, light reaction occurs
- **Grana**: Stacks of thylakoids

### Photosynthetic Pigments

| Pigment | Color | Absorbs | Location |
|---------|-------|---------|----------|
| Chlorophyll a | Blue-green | Red, blue | Reaction center |
| Chlorophyll b | Yellow-green | Red, blue | Antenna |
| Carotenoids | Yellow-orange | Blue-violet | Antenna |
| Xanthophylls | Yellow | Blue-violet | Antenna |

**🔑 Remember This!**
Chlorophyll a is the primary pigment (in reaction center). Others are accessory pigments that capture and transfer light energy.

## LIGHT REACTION (Hill Reaction)

Occurs in thylakoid membranes.

### Photosystems

**Photosystem II (PS II, P680):**
- Absorbs 680 nm light
- Splits water (photolysis)
- Releases O₂

**Photosystem I (PS I, P700):**
- Absorbs 700 nm light
- Reduces NADP⁺ to NADPH

### Steps

**1. Light Absorption**
Pigments absorb light, energy excites electrons.

**2. Water Splitting (Photolysis)**
2H₂O → 4H⁺ + 4e⁻ + O₂
(Oxygen released as byproduct!)

**3. Electron Transport Chain**
Electrons flow: PS II → PQ → Cytochrome b6f → PC → PS I → Fd → NADP⁺

**4. ATP Synthesis (Photophosphorylation)**
H⁺ gradient drives ATP synthesis through ATP synthase.

**⚠️ Common Mistake Alert!**
PS II comes before PS I in electron flow! The numbers refer to order of discovery, not function.

### Types of Photophosphorylation

**Cyclic:**
- Only PS I involved
- Produces only ATP
- Electrons return to PS I

**Non-cyclic:**
- Both PS I and PS II
- Produces ATP and NADPH
- Electrons from water end up in NADPH

## DARK REACTION (Calvin Cycle)

Occurs in stroma. Called "dark" because it doesn't directly need light (but needs ATP and NADPH from light reactions).

### The Calvin Cycle (C3 Pathway)

**Discovered by Melvin Calvin using radioactive C¹⁴**

**💡 Did You Know?**
Melvin Calvin won the Nobel Prize in 1961 for discovering the path of carbon in photosynthesis. He used paper chromatography to trace ¹⁴C through different compounds!

### Three Stages

**1. Carboxylation**
CO₂ + RuBP (5C) → 2 × 3-PGA (3C)
Enzyme: RuBisCO (most abundant protein on Earth!)

**2. Reduction**
3-PGA → G3P (using ATP and NADPH)

**3. Regeneration**
G3P → RuBP (using ATP)
Some G3P exits to form glucose

### Summary

For 1 glucose (6C):
- 6 CO₂ fixed
- 18 ATP used
- 12 NADPH used
- 6 turns of cycle

## C4 PATHWAY (Hatch-Slack Pathway)

Found in: Maize, sugarcane, sorghum

### Why C4?

**Photorespiration Problem:**
- RuBisCO can bind O₂ instead of CO₂
- Wastes energy, reduces efficiency
- Worse in hot, dry conditions

**C4 Solution:**
- Concentrate CO₂ around RuBisCO
- Separate initial fixation (mesophyll) from Calvin cycle (bundle sheath)

### C4 Anatomy (Kranz Anatomy)

- **Mesophyll cells**: Initial CO₂ fixation
- **Bundle sheath cells**: Calvin cycle (thick walls, no grana)

### C4 Process

**In Mesophyll:**
CO₂ + PEP → OAA (4C) [by PEP carboxylase]
OAA → Malate

**In Bundle Sheath:**
Malate → CO₂ + Pyruvate
CO₂ enters Calvin cycle
Pyruvate returns to mesophyll

**🔑 Remember This!**
C4 plants have TWO CO₂-fixing enzymes:
1. PEP carboxylase (mesophyll) - no O₂ affinity
2. RuBisCO (bundle sheath) - protected from O₂

## CAM PATHWAY (Crassulacean Acid Metabolism)

Found in: Succulents, cacti, pineapple

### CAM Strategy

**Temporal separation** instead of spatial (C4):
- Night: Stomata open, CO₂ fixed into malate
- Day: Stomata closed, malate releases CO₂ for Calvin cycle

**Advantage:** Extreme water conservation!

## FACTORS AFFECTING PHOTOSYNTHESIS

**Law of Limiting Factors** (Blackman):
Rate is determined by the factor in shortest supply.

**Factors:**
1. Light intensity (up to saturation)
2. CO₂ concentration
3. Temperature
4. Water availability`,
    keyConcepts: JSON.stringify([
      { title: "Photosynthesis Equation", description: "6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O. Light energy converted to chemical energy in glucose." },
      { title: "Light Reactions", description: "In thylakoids. PS II splits water, releases O₂. Electron flow generates ATP and NADPH." },
      { title: "Calvin Cycle", description: "In stroma. Carboxylation (CO₂ + RuBP), Reduction (to G3P), Regeneration (RuBP). Needs ATP and NADPH." },
      { title: "RuBisCO", description: "Most abundant protein. Fixes CO₂ but also O₂ (photorespiration). Key enzyme of Calvin cycle." },
      { title: "C4 Pathway", description: "Spatial separation: PEP carboxylase in mesophyll, RuBisCO in bundle sheath. Avoids photorespiration." },
      { title: "CAM Pathway", description: "Temporal separation: CO₂ fixed at night into malate, released by day. For succulents in dry climates." },
      { title: "Photosystems", description: "PS II (P680) splits water, PS I (P700) reduces NADP⁺. Non-cyclic flow produces both ATP and NADPH." }
    ]),
    formulas: JSON.stringify([
      { name: "Photosynthesis", formula: "6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O", description: "Overall equation, light energy required" },
      { name: "Water Splitting", formula: "2H₂O → 4H⁺ + 4e⁻ + O₂", description: "Photolysis in PS II, releases oxygen" },
      { name: "ATP per Glucose", formula: "18 ATP + 12 NADPH for 1 glucose", description: "Energy cost of Calvin cycle" },
      { name: "Calvin Cycle Turns", formula: "6 CO₂ = 6 turns = 1 glucose", description: "Each turn fixes one CO₂" },
      { name: "RuBisCO Reaction", formula: "CO₂ + RuBP (5C) → 2 × 3-PGA (3C)", description: "Carboxylation step, first stable product is 3C" },
      { name: "C4 Initial Fixation", formula: "CO₂ + PEP (3C) → OAA (4C)", description: "By PEP carboxylase, first product is 4C" },
      { name: "Limiting Factor Law", formula: "Rate = f(factor in shortest supply)", description: "Blackman's law of limiting factors" }
    ]),
    difficultyLevel: 4,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 8,
    chapterTitle: "Plant Growth and Development",
    introduction: "Botany Chapter (Class 12): How do plants know when to flower? Why do they grow toward light? This chapter explores the fascinating world of plant hormones, the regulation of growth and development, and environmental responses like photoperiodism and vernalization that sync plant life with the seasons!",
    detailedNotes: `# Plant Growth and Development (Botany - Class 12)

Plants don't just grow randomly - their growth and development is precisely controlled by hormones and environmental signals!

## GROWTH

**Definition:** Irreversible permanent increase in size, form, and often dry weight.

### Characteristics of Plant Growth

**1. Growth is indeterminate**
- Plants grow throughout life (unlike animals)
- Due to meristematic tissue

**2. Regions of Growth**
- Apical meristem: Primary growth (length)
- Lateral meristem: Secondary growth (girth)
- Intercalary meristem: Between mature tissues

### Phases of Growth

**💡 Did You Know?**
Bamboo can grow up to 91 cm (3 feet) in a single day! This is because cell elongation can happen incredibly fast when conditions are right.

**1. Meristematic/Formative Phase**
- Cells divide rapidly
- Small cells with thin walls

**2. Elongation Phase**
- Cells enlarge
- New cell wall material deposited
- Maximum growth rate

**3. Maturation Phase**
- Cells differentiate
- Acquire specific functions

### Growth Rate

**Arithmetic Growth:**
- Linear increase
- One daughter cell divides, other matures
- L = L₀ + rt

**Geometric Growth:**
- Exponential increase
- Both daughter cells divide
- W = W₀ × e^(rt)

### Measuring Growth

**Growth Curve (Sigmoid/S-curve):**
- Lag phase → Exponential phase → Stationary phase

**🔑 Remember This!**
The S-curve appears in many biological processes - population growth, bacterial growth, and plant growth all follow this pattern!

## PLANT HORMONES (Phytohormones)

Chemical messengers that regulate growth and development.

### 1. AUXINS

**Discovery:** Went's experiment with coleoptile tips

**Natural auxin:** Indole-3-acetic acid (IAA)
**Synthetic:** 2,4-D (herbicide)

**Functions:**
- Cell elongation
- Apical dominance
- Phototropism, gravitropism
- Root initiation
- Parthenocarpy (seedless fruits)

**⚠️ Common Mistake Alert!**
Auxin promotes stem elongation but INHIBITS root elongation at high concentrations. Roots are more sensitive to auxin!

### 2. GIBBERELLINS (GA)

**Discovery:** Foolish seedling disease in rice (Gibberella fungus)

**Functions:**
- Stem elongation (especially in dwarf plants)
- Bolting (rapid stem growth before flowering)
- Breaking seed dormancy
- Malting in brewing industry

**💡 Did You Know?**
Seedless grapes and large apples are often treated with gibberellins! The hormones make fruits bigger without seeds.

### 3. CYTOKININS

**Discovery:** From coconut milk (promotes cell division)

**Natural:** Zeatin

**Functions:**
- Cell division (cytokinesis)
- Delay senescence
- Promote lateral bud growth (counters auxin)
- Chloroplast development

### 4. ABSCISIC ACID (ABA)

**The "stress hormone"**

**Functions:**
- Stomatal closure (water stress)
- Seed dormancy
- Inhibits growth
- Abscission (leaf/fruit fall) - though ethylene is more important

### 5. ETHYLENE

**Only gaseous hormone!**

**Functions:**
- Fruit ripening (banana, apple)
- Leaf and fruit abscission
- Senescence
- Triple response in seedlings
- Breaks seed and bud dormancy

**Application:** Artificial fruit ripening

**🔑 Remember This!**
"One bad apple spoils the bunch" - ripening apples release ethylene that ripens nearby fruits!

## PHOTOPERIODISM

Response of plants to relative duration of light and dark periods.

### Types of Plants

| Type | Critical Photoperiod | Examples |
|------|---------------------|----------|
| Long-day plants | Need light > critical | Wheat, spinach |
| Short-day plants | Need light < critical | Chrysanthemum, rice |
| Day-neutral plants | No effect | Tomato, cucumber |

### The Mechanism

**Phytochrome system:**
- Pr (red-absorbing form) ⇌ Pfr (far-red absorbing form)
- Light converts Pr → Pfr
- Dark converts Pfr → Pr
- Pfr is the active form that triggers flowering

**Critical period = Dark period, not light period!**
Short-day plants actually need LONG NIGHTS!

## VERNALIZATION

Requirement of cold treatment to induce flowering.

**Example:** Winter wheat needs cold winter before spring flowering.

**Site of perception:** Shoot apex (meristem)

**Applications:**
- Shift flowering season
- Accelerate breeding programs

## SEED DORMANCY

Seeds don't germinate immediately after maturation - they wait for favorable conditions.

### Types of Dormancy

**1. Exogenous (seed coat):**
- Hard, impermeable coat
- Broken by: scarification, fire, acids

**2. Endogenous (embryo):**
- Immature embryo or inhibitors
- Broken by: stratification (cold), hormones

### Breaking Dormancy

- Light (phytochrome activation)
- Temperature (vernalization/stratification)
- Hormones (GA stimulates, ABA inhibits)
- Scarification (mechanical/chemical)

## SENESCENCE

Programmed aging and death of plant organs.

**Types:**
- Leaf senescence (autumn)
- Whole plant senescence (annual plants after flowering)

**Control:**
- ABA and ethylene promote senescence
- Cytokinins delay senescence`,
    keyConcepts: JSON.stringify([
      { title: "Growth Phases", description: "Meristematic (division), Elongation (enlargement), Maturation (differentiation). Growth is indeterminate in plants." },
      { title: "Auxins", description: "Promote stem elongation, inhibit root growth at high levels. Cause phototropism, apical dominance, root initiation." },
      { title: "Gibberellins", description: "Promote stem elongation, bolting, break seed dormancy. Used for seedless fruits, brewing." },
      { title: "Cytokinins", description: "Promote cell division, delay senescence, counter apical dominance by promoting lateral buds." },
      { title: "Ethylene and ABA", description: "Ethylene: gaseous, fruit ripening, abscission. ABA: stress hormone, stomatal closure, dormancy." },
      { title: "Photoperiodism", description: "Response to day/night length. Phytochrome system senses light. Actually responds to dark period length!" },
      { title: "Vernalization", description: "Cold requirement for flowering. Perceived by shoot apex. Important in winter cereals." }
    ]),
    formulas: JSON.stringify([
      { name: "Arithmetic Growth", formula: "L = L₀ + rt", description: "Linear growth, one cell divides" },
      { name: "Geometric Growth", formula: "W = W₀ × e^(rt)", description: "Exponential growth, both cells divide" },
      { name: "Relative Growth Rate", formula: "RGR = (W₂ - W₁)/(t₂ - t₁)", description: "Growth per unit time per unit mass" },
      { name: "Auxin Effect", formula: "Low conc. → root growth, High conc. → root inhibition", description: "Roots more sensitive than stems" },
      { name: "Phytochrome", formula: "Pr ⇌ Pfr (Red light ↔ Far-red light)", description: "Pfr is active form, triggers responses" },
      { name: "SDP Requirement", formula: "Short-day = Long night (> critical dark period)", description: "It's the dark period that matters!" },
      { name: "Hormone Antagonism", formula: "Auxin:Cytokinin ratio determines organ development", description: "High ratio = roots, Low ratio = shoots" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 90
  }
];

export async function seedBotany() {
  console.log("Seeding Botany chapters (Class 11 & Class 12)...");
  
  for (const chapter of botanyChapters) {
    try {
      const existingChapter = await db.query.chapterContent.findFirst({
        where: (c, { and, eq, ilike }) => and(
          ilike(c.subject, '%biology%'),
          eq(c.classLevel, chapter.classLevel),
          eq(c.chapterNumber, chapter.chapterNumber)
        )
      });

      if (existingChapter) {
        await db.update(chapterContent)
          .set({
            chapterTitle: chapter.chapterTitle,
            introduction: chapter.introduction,
            detailedNotes: chapter.detailedNotes,
            keyConcepts: chapter.keyConcepts,
            formulas: chapter.formulas,
            difficultyLevel: chapter.difficultyLevel,
            estimatedStudyMinutes: chapter.estimatedStudyMinutes,
            updatedAt: new Date()
          })
          .where(eq(chapterContent.id, existingChapter.id));
        console.log(`Updated: Class ${chapter.classLevel} - ${chapter.chapterTitle}`);
      } else {
        await db.insert(chapterContent).values({
          subject: chapter.subject,
          classLevel: chapter.classLevel,
          chapterNumber: chapter.chapterNumber,
          chapterTitle: chapter.chapterTitle,
          introduction: chapter.introduction,
          detailedNotes: chapter.detailedNotes,
          keyConcepts: chapter.keyConcepts,
          formulas: chapter.formulas,
          difficultyLevel: chapter.difficultyLevel,
          estimatedStudyMinutes: chapter.estimatedStudyMinutes,
          status: "published",
          approvalStatus: "approved"
        });
        console.log(`Created: Class ${chapter.classLevel} - ${chapter.chapterTitle}`);
      }
    } catch (error) {
      console.error(`Error with chapter ${chapter.chapterTitle}:`, error);
    }
  }
  
  console.log("Botany seeding complete! (8 Class 11 + 8 Class 12 chapters)");
}
