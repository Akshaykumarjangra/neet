import { db } from "../db";
import { chapterContent } from "@shared/schema";
import { eq } from "drizzle-orm";

const zoologyChapters = [
  // ============ CLASS 11 ZOOLOGY CHAPTERS ============
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 4,
    chapterTitle: "Animal Kingdom",
    introduction: "Welcome to Zoology! This chapter introduces you to the amazing diversity of animal life on Earth. From simple sponges to complex mammals, you'll learn how scientists classify animals into different groups based on their body organization, symmetry, and other features.",
    detailedNotes: `# Animal Kingdom (Zoology)

The animal kingdom includes all multicellular organisms that are heterotrophic (cannot make their own food) and lack cell walls. There are over 1.5 million described animal species - and many more waiting to be discovered!

## Basis of Classification

Scientists use these features to classify animals:

**1. Levels of Organization**
- **Cellular level**: Cells work independently (Porifera)
- **Tissue level**: Cells organized into tissues (Cnidaria)
- **Organ level**: Tissues form organs (Platyhelminthes)
- **Organ system level**: Organs work in systems (most animals)

**💡 Did You Know?**
Sponges don't have true tissues! Each cell in a sponge can function independently - they're like a colony of single cells living together.

**2. Body Symmetry**
- **Asymmetrical**: No symmetry (sponges)
- **Radial symmetry**: Can be divided into equal halves through any plane passing through center (jellyfish, starfish)
- **Bilateral symmetry**: Only one plane divides body into equal halves (most animals including humans)

**3. Germ Layers**
- **Diploblastic**: Two layers - ectoderm and endoderm (Cnidaria)
- **Triploblastic**: Three layers - ectoderm, mesoderm, endoderm (most animals)

**4. Body Cavity (Coelom)**
- **Acoelomates**: No body cavity (flatworms)
- **Pseudocoelomates**: False body cavity (roundworms)
- **Coelomates**: True body cavity lined by mesoderm (most animals)

**🔑 Remember This!**
Coelom = Body cavity between gut and body wall. True coelom is lined completely by mesoderm!

## Major Phyla

### Phylum Porifera (Sponges)
- Simplest animals, porous body
- Water canal system for food and oxygen
- Spicules for support (made of CaCO₃, silica, or spongin)
- Examples: Sycon, Euspongia (bath sponge)

### Phylum Cnidaria (Coelenterata)
- Radial symmetry, tissue-level organization
- Have cnidocytes (stinging cells) - hence the name!
- Two body forms: polyp (sessile) and medusa (free-swimming)
- Examples: Hydra, Jellyfish, Corals, Sea anemone

### Phylum Platyhelminthes (Flatworms)
- Bilaterally symmetrical, dorsoventrally flattened
- Acoelomates, triploblastic
- Many are parasites (liver fluke, tapeworm)
- Examples: Planaria, Taenia (tapeworm), Fasciola (liver fluke)

**⚠️ Common Mistake Alert!**
Don't confuse flatworms with roundworms! Flatworms are flat (dorsoventrally compressed) and acoelomate. Roundworms are cylindrical and pseudocoelomate.

### Phylum Aschelminthes (Roundworms)
- Cylindrical body, pseudocoelomate
- Complete digestive system (mouth AND anus)
- Many are parasites in humans
- Examples: Ascaris (roundworm), Wuchereria (causes elephantiasis)

### Phylum Annelida (Segmented Worms)
- Body divided into segments (metameres)
- True coelom, closed circulatory system
- Examples: Earthworm, Leech, Nereis (marine worm)

### Phylum Arthropoda (Largest Phylum!)
- Jointed legs (arthros = joint, poda = feet)
- Exoskeleton made of chitin
- Open circulatory system (hemolymph)
- Examples: Insects, Spiders, Crabs, Scorpions

**💡 Did You Know?**
Arthropods make up about 80% of all known animal species! There are more types of beetles alone than all plant species combined!

### Phylum Mollusca
- Soft body with muscular foot
- Many have shell (snails, oysters)
- Examples: Snail, Octopus, Squid, Oyster

### Phylum Echinodermata
- Spiny-skinned, radial symmetry in adults (bilateral as larvae)
- Water vascular system for locomotion
- Examples: Starfish, Sea urchin, Sea cucumber

### Phylum Chordata
- Have notochord at some stage of life
- Dorsal hollow nerve cord
- Pharyngeal gill slits
- Post-anal tail
- Examples: Fish, Amphibians, Reptiles, Birds, Mammals`,
    keyConcepts: JSON.stringify([
      { title: "Levels of Organization", description: "Animals organized from cellular level (Porifera) to tissue level (Cnidaria) to organ level (Platyhelminthes) to organ system level (most animals)." },
      { title: "Body Symmetry", description: "Asymmetrical (sponges), radial symmetry (jellyfish, starfish), or bilateral symmetry (most animals including humans)." },
      { title: "Germ Layers", description: "Diploblastic animals have 2 layers (ectoderm, endoderm). Triploblastic have 3 layers (ectoderm, mesoderm, endoderm)." },
      { title: "Coelom Types", description: "Acoelomates have no body cavity. Pseudocoelomates have false cavity. Coelomates have true cavity lined by mesoderm." },
      { title: "Cnidaria Features", description: "Possess cnidocytes (stinging cells), two body forms (polyp and medusa), radial symmetry. Examples: Hydra, Jellyfish." },
      { title: "Arthropoda Dominance", description: "Largest phylum with 80% of animal species. Have jointed legs, chitin exoskeleton, open circulatory system." },
      { title: "Chordate Characters", description: "Notochord, dorsal hollow nerve cord, pharyngeal gill slits, and post-anal tail at some stage of life." }
    ]),
    formulas: JSON.stringify([
      { name: "Body Cavity Classification", formula: "Acoelomate → Pseudocoelomate → Eucoelomate", description: "Evolution from no cavity to false cavity to true coelom lined by mesoderm." },
      { name: "Germ Layer Development", formula: "Ectoderm → Skin, Nervous system; Mesoderm → Muscles, Skeleton; Endoderm → Gut lining", description: "Each germ layer gives rise to specific organ systems." },
      { name: "Arthropod Diversity", formula: "~80% of all animal species", description: "Insects alone have over 1 million described species, more than all other animals combined." },
      { name: "Chordate Characteristics", formula: "Notochord + Dorsal nerve cord + Gill slits + Post-anal tail", description: "All four features present at some stage of life in all chordates." },
      { name: "Annelid Segmentation", formula: "Body = Multiple metameres (segments)", description: "Each segment has its own muscles, nerves, and excretory organs." },
      { name: "Classification Hierarchy", formula: "Kingdom → Phylum → Class → Order → Family → Genus → Species", description: "King Philip Came Over For Good Soup - memory trick!" }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 7,
    chapterTitle: "Structural Organisation in Animals",
    introduction: "Zoology explores how animal bodies are organized from cells to tissues to organs. This chapter takes you on a journey through the four main tissue types and how they combine to form complex organ systems that keep animals alive and functioning.",
    detailedNotes: `# Structural Organisation in Animals (Zoology)

Just like a house is built from bricks, animal bodies are built from cells. But cells alone can't do everything - they need to work together in organized groups called tissues!

## Animal Tissues

Tissue = Group of cells with similar structure and function

**Four Types of Animal Tissues:**

### 1. Epithelial Tissue

Covers body surfaces and lines cavities. Like a protective wallpaper!

**Types based on shape:**
- **Squamous**: Flat, scale-like cells (cheek lining, blood vessels)
- **Cuboidal**: Cube-shaped (kidney tubules, glands)
- **Columnar**: Tall, pillar-like (intestine lining)
- **Ciliated**: With hair-like cilia (respiratory tract)

**💡 Did You Know?**
Your small intestine is lined with columnar epithelium that has tiny finger-like projections called microvilli. If you flattened all these folds, your intestine's surface area would be as big as a tennis court!

**Types based on layers:**
- **Simple**: Single layer (diffusion, absorption)
- **Stratified**: Multiple layers (protection, like skin)

**Special epithelia:**
- **Glandular**: Forms glands (exocrine and endocrine)
- **Sensory**: Contains sensory receptors

### 2. Connective Tissue

Connects, supports, and binds other tissues. Most abundant tissue!

**🔑 Remember This!**
All connective tissues have: Cells + Matrix (ground substance + fibers)

**Types:**

**Loose Connective Tissue:**
- Areolar: Found under skin, loosely organized
- Adipose: Fat storage, insulation

**Dense Connective Tissue:**
- Regular: Fibers in parallel (tendons, ligaments)
- Irregular: Fibers in all directions (dermis)

**Specialized Connective Tissues:**

**Cartilage:**
- Solid but flexible
- Cells called chondrocytes in lacunae
- Types: Hyaline (nose, trachea), Elastic (ear), Fibrous (intervertebral discs)

**Bone:**
- Hard due to calcium salts
- Cells called osteocytes
- Haversian system for blood supply

**Blood:**
- Liquid connective tissue
- Plasma + Blood cells (RBCs, WBCs, Platelets)
- Transports gases, nutrients, hormones

**⚠️ Common Mistake Alert!**
Blood IS a connective tissue even though it's liquid! The plasma is the matrix, and blood cells are the "cells" of this tissue.

### 3. Muscular Tissue

Specialized for contraction and movement.

**Types:**

**Skeletal Muscle:**
- Attached to bones, voluntary control
- Striated (striped) appearance
- Multinucleate, cylindrical fibers

**Smooth Muscle:**
- Found in gut, blood vessels, internal organs
- Involuntary control
- Non-striated, spindle-shaped cells

**Cardiac Muscle:**
- Found only in heart
- Involuntary but striated!
- Cells connected by intercalated discs

### 4. Neural (Nervous) Tissue

Specialized for receiving stimuli and conducting impulses.

**Components:**
- **Neurons**: Transmit nerve impulses
- **Glial cells**: Support and protect neurons

**Neuron Structure:**
- Cell body (soma): Contains nucleus
- Dendrites: Receive impulses
- Axon: Transmits impulses away from cell body

## Organ Systems in Animals

Organs combine to form organ systems:

| System | Main Organs | Function |
|--------|-------------|----------|
| Digestive | Stomach, Intestines | Breakdown of food |
| Respiratory | Lungs, Gills | Gas exchange |
| Circulatory | Heart, Blood vessels | Transport |
| Excretory | Kidneys | Remove waste |
| Nervous | Brain, Nerves | Coordination |
| Muscular | Muscles | Movement |
| Skeletal | Bones | Support, Protection |

## Case Study: Cockroach Morphology

Body divided into: Head + Thorax + Abdomen
- Head: Compound eyes, antennae, mouthparts
- Thorax: 3 pairs of legs, 2 pairs of wings
- Abdomen: 10 segments, spiracles for breathing`,
    keyConcepts: JSON.stringify([
      { title: "Four Tissue Types", description: "Epithelial (covering), Connective (binding), Muscular (movement), and Neural (coordination) tissues make up all animal bodies." },
      { title: "Epithelial Classification", description: "Based on shape (squamous, cuboidal, columnar) and layers (simple or stratified). Lines all body surfaces and cavities." },
      { title: "Connective Tissue Components", description: "Always has cells + matrix (ground substance + fibers). Includes cartilage, bone, blood, and fat tissue." },
      { title: "Three Muscle Types", description: "Skeletal (voluntary, striated), Smooth (involuntary, non-striated), and Cardiac (involuntary but striated with intercalated discs)." },
      { title: "Blood as Connective Tissue", description: "Liquid connective tissue with plasma as matrix. Contains RBCs, WBCs, and platelets for transport and defense." },
      { title: "Neuron Structure", description: "Cell body (soma) + Dendrites (receive signals) + Axon (transmit signals). Glial cells provide support." },
      { title: "Organ System Integration", description: "Multiple organ systems work together for homeostasis: digestive, respiratory, circulatory, excretory, nervous, muscular, skeletal." }
    ]),
    formulas: JSON.stringify([
      { name: "Tissue Hierarchy", formula: "Cells → Tissues → Organs → Organ Systems → Organism", description: "Increasing levels of organization in multicellular animals." },
      { name: "Epithelium Types", formula: "Simple (1 layer) vs Stratified (many layers) × Shape (squamous/cuboidal/columnar)", description: "Classification based on layers and cell shape." },
      { name: "Connective Tissue Formula", formula: "Connective Tissue = Cells + Matrix (Ground substance + Fibers)", description: "All connective tissues have this basic composition." },
      { name: "Muscle Comparison", formula: "Skeletal: Voluntary + Striated; Smooth: Involuntary + Non-striated; Cardiac: Involuntary + Striated", description: "Key distinguishing features of three muscle types." },
      { name: "Blood Composition", formula: "Blood = Plasma (55%) + Formed Elements (45%)", description: "Plasma is liquid matrix; formed elements include RBCs, WBCs, platelets." },
      { name: "Neuron Pathway", formula: "Dendrites → Cell Body → Axon → Synapse → Next Neuron", description: "Direction of nerve impulse transmission through a neuron." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 16,
    chapterTitle: "Digestion and Absorption",
    introduction: "Zoology includes understanding how animals process food! This chapter explores the human digestive system - from the moment food enters your mouth to when nutrients are absorbed into your blood. You'll learn about enzymes, organs, and the amazing chemistry of digestion.",
    detailedNotes: `# Digestion and Absorption (Zoology)

Digestion is the process of breaking down complex food into simple, absorbable molecules. Your digestive system processes about 30 tons of food in a lifetime!

## The Digestive System

**Alimentary Canal (GI Tract):**
Mouth → Pharynx → Esophagus → Stomach → Small Intestine → Large Intestine → Rectum → Anus

**Accessory Glands:**
Salivary glands, Liver, Pancreas, Gallbladder

**💡 Did You Know?**
If you stretched out your small intestine, it would be about 6 meters (20 feet) long! The inner folds and villi increase surface area to about 250 square meters - the size of a tennis court!

## Digestion in Different Parts

### Mouth (Buccal Cavity)
- **Teeth**: Mechanical digestion (cutting, grinding)
- **Tongue**: Mixes food with saliva, helps swallowing
- **Saliva**: Contains salivary amylase (ptyalin)

**Salivary amylase converts:**
Starch → Maltose (in mouth)

**🔑 Remember This!**
Teeth formula for adult humans: 2123/2123 = 32 teeth
(2 Incisors, 1 Canine, 2 Premolars, 3 Molars in each half jaw)

### Stomach
- Stores food (capacity ~1.5 liters)
- Churns food into chyme
- Gastric glands secrete gastric juice

**Gastric Juice Components:**
- HCl (pH 1.5-2.5): Kills bacteria, activates pepsinogen
- Pepsinogen → Pepsin (active): Digests proteins
- Mucus: Protects stomach lining

**Pepsin converts:**
Proteins → Peptones + Proteoses

**⚠️ Common Mistake Alert!**
Pepsin only works in acidic conditions (pH 2). In alkaline conditions, it becomes inactive. That's why antacids can reduce digestion!

### Small Intestine

**Three regions:** Duodenum → Jejunum → Ileum

**Duodenum receives:**
1. **Bile** (from liver via gallbladder): Emulsifies fats
2. **Pancreatic juice**: Contains multiple enzymes

**Pancreatic Enzymes:**
- Trypsin: Proteins → Peptides
- Pancreatic amylase: Starch → Maltose
- Lipase: Fats → Fatty acids + Glycerol
- Nucleases: Nucleic acids → Nucleotides

**Intestinal Juice (Succus entericus):**
Completes digestion of all food types

### Large Intestine
- Absorbs water and electrolytes
- No digestion (no enzymes)
- Contains beneficial bacteria that produce vitamin K and B vitamins

## Absorption of Nutrients

**Small Intestine: Main site of absorption**

**Adaptations for absorption:**
1. Very long (6 meters)
2. Circular folds (plicae)
3. Villi (finger-like projections)
4. Microvilli (brush border)

**Absorption pathways:**
- **Simple sugars, amino acids, vitamins**: Into blood capillaries → Portal vein → Liver
- **Fatty acids, glycerol**: Into lacteals (lymph vessels) → Lymphatic system

**💡 Did You Know?**
Each villus contains blood capillaries AND a lacteal (lymph vessel). Water-soluble nutrients go to blood; fats go to lymph!

## Hormones in Digestion

| Hormone | Source | Action |
|---------|--------|--------|
| Gastrin | Stomach | Stimulates gastric juice secretion |
| Secretin | Duodenum | Stimulates pancreatic bicarbonate |
| CCK | Duodenum | Stimulates bile and pancreatic enzyme release |
| GIP | Small intestine | Inhibits gastric secretion |

## Digestive Disorders

**1. Jaundice**: Liver dysfunction, yellowing of skin
**2. Vomiting**: Reverse peristalsis, expulsion of stomach contents
**3. Diarrhea**: Abnormally frequent loose stools
**4. Constipation**: Infrequent, hard stools
**5. Indigestion**: Incomplete digestion
**6. PEM (Protein-Energy Malnutrition)**: Kwashiorkor, Marasmus`,
    keyConcepts: JSON.stringify([
      { title: "Alimentary Canal", description: "Complete digestive tract from mouth to anus. Includes esophagus, stomach, small intestine (duodenum, jejunum, ileum), and large intestine." },
      { title: "Enzymatic Digestion", description: "Salivary amylase (starch), Pepsin (proteins in stomach), Trypsin (proteins), Lipase (fats), complete digestion in small intestine." },
      { title: "Gastric Juice Functions", description: "HCl kills bacteria and activates pepsinogen. Pepsin digests proteins. Mucus protects stomach lining from acid." },
      { title: "Role of Bile", description: "Bile from liver emulsifies fats into small droplets, increasing surface area for lipase action. Stored in gallbladder." },
      { title: "Small Intestine Adaptations", description: "Long length, circular folds, villi, and microvilli increase surface area for maximum nutrient absorption." },
      { title: "Absorption Pathways", description: "Water-soluble nutrients (sugars, amino acids) → blood capillaries → liver. Fat-soluble → lacteals → lymph." },
      { title: "Digestive Hormones", description: "Gastrin (gastric juice), Secretin (pancreatic bicarbonate), CCK (bile and enzymes) coordinate digestive secretions." }
    ]),
    formulas: JSON.stringify([
      { name: "Dental Formula (Human Adult)", formula: "2123/2123 = 32 teeth", description: "2 Incisors, 1 Canine, 2 Premolars, 3 Molars per half jaw." },
      { name: "Starch Digestion", formula: "Starch → (Amylase) → Maltose → (Maltase) → Glucose", description: "Two-step process: mouth and small intestine." },
      { name: "Protein Digestion", formula: "Protein → Peptones → Peptides → Amino Acids", description: "Sequential action of pepsin, trypsin, and peptidases." },
      { name: "Fat Digestion", formula: "Fats → (Bile) → Emulsified fats → (Lipase) → Fatty acids + Glycerol", description: "Bile emulsifies, lipase hydrolyzes fats." },
      { name: "Gastric Juice pH", formula: "pH 1.5-2.5 (strongly acidic)", description: "HCl creates acidic environment for pepsin action and bacterial killing." },
      { name: "Surface Area Increase", formula: "~250 m² (due to folds + villi + microvilli)", description: "Massive surface area for absorption in small intestine." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 17,
    chapterTitle: "Breathing and Exchange of Gases",
    introduction: "Zoology reveals how animals exchange gases with their environment. This chapter explores the human respiratory system, how oxygen reaches every cell in your body, and how carbon dioxide is removed. Breathe in, and let's discover the amazing chemistry of respiration!",
    detailedNotes: `# Breathing and Exchange of Gases (Zoology)

Every cell in your body needs oxygen for energy production. The respiratory system is responsible for getting oxygen from the air into your blood and removing carbon dioxide waste.

## Respiratory Organs in Different Animals

- **Earthworm**: Moist skin (cutaneous respiration)
- **Insects**: Tracheal system (network of tubes)
- **Fish**: Gills
- **Frogs**: Skin, buccal cavity, lungs
- **Mammals**: Lungs

**💡 Did You Know?**
Your lungs contain about 300 million alveoli! If you spread them out flat, they would cover a tennis court - about 70-80 square meters of surface area!

## Human Respiratory System

**Respiratory Tract:**
Nostrils → Nasal cavity → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli

**Key Structures:**

**Nasal Cavity**: Filters, warms, and moistens air

**Larynx (Voice Box)**: Contains vocal cords

**Trachea (Windpipe)**: 
- C-shaped cartilage rings (keep it open)
- Lined with ciliated epithelium and mucus

**Lungs**:
- Right lung: 3 lobes
- Left lung: 2 lobes (smaller, heart takes space)
- Covered by pleural membrane

**🔑 Remember This!**
Trachea divides into 2 bronchi → 23 generations of branching → Bronchioles → Terminal bronchioles → Alveoli

## Mechanism of Breathing

**Two phases:**

### 1. Inspiration (Breathing In)
- Diaphragm contracts (flattens)
- External intercostal muscles contract
- Rib cage moves up and out
- Thoracic volume increases
- Pressure decreases
- Air rushes IN

### 2. Expiration (Breathing Out)
- Diaphragm relaxes (domes up)
- Internal intercostal muscles contract
- Rib cage moves down and in
- Thoracic volume decreases
- Pressure increases
- Air pushed OUT

**⚠️ Common Mistake Alert!**
Normal expiration is passive (just relaxation of muscles). Forced expiration requires muscle contraction (internal intercostals, abdominal muscles).

## Lung Volumes and Capacities

**Volumes:**
- Tidal Volume (TV): ~500 mL (normal breath)
- Inspiratory Reserve Volume (IRV): ~2500-3000 mL
- Expiratory Reserve Volume (ERV): ~1000-1100 mL
- Residual Volume (RV): ~1100-1200 mL (can't be expelled)

**Capacities (combinations):**
- Vital Capacity (VC) = TV + IRV + ERV = ~4600 mL
- Total Lung Capacity (TLC) = VC + RV = ~5800 mL
- Functional Residual Capacity (FRC) = ERV + RV
- Inspiratory Capacity (IC) = TV + IRV

## Exchange of Gases

**Where:** Alveoli (respiratory surface)

**What makes alveoli efficient:**
1. Very thin walls (0.2 μm)
2. Moist surface
3. Rich blood supply
4. Large surface area

**Partial Pressures (mmHg):**

| Gas | Atmospheric Air | Alveolar Air | Blood (Deoxygenated) |
|-----|-----------------|--------------|---------------------|
| O₂ | 159 | 104 | 40 |
| CO₂ | 0.3 | 40 | 45 |

Gases diffuse from high to low partial pressure!

## Transport of Gases

### Oxygen Transport

**97% with Hemoglobin:**
Hb + O₂ ⇌ HbO₂ (Oxyhemoglobin)

One hemoglobin molecule binds 4 O₂ molecules!

**Oxygen-Hemoglobin Dissociation Curve:**
Sigmoid (S-shaped) curve showing cooperative binding

**Factors decreasing O₂ affinity (Bohr Effect):**
- Low pH (high H⁺)
- High CO₂
- High temperature
- High 2,3-DPG

**💡 Did You Know?**
The Bohr effect is clever! In active tissues (muscles), pH drops and CO₂ increases, making hemoglobin release more oxygen exactly where it's needed!

### Carbon Dioxide Transport

- **70% as Bicarbonate** (HCO₃⁻) in plasma
- **23% with Hemoglobin** as carbaminohemoglobin (HbCO₂)
- **7% dissolved** in plasma

**Carbonic anhydrase enzyme in RBCs:**
CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻

## Disorders of Respiratory System

- **Asthma**: Bronchial inflammation, difficulty breathing
- **Emphysema**: Alveolar damage, reduced surface area
- **Occupational Lung Diseases**: Silicosis, Asbestosis
- **Hypoxia**: Low oxygen in tissues`,
    keyConcepts: JSON.stringify([
      { title: "Respiratory Pathway", description: "Air travels: Nostrils → Nasal cavity → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli for gas exchange." },
      { title: "Mechanism of Breathing", description: "Inspiration: diaphragm contracts, volume increases, pressure decreases, air enters. Expiration: opposite process." },
      { title: "Alveolar Adaptations", description: "Thin walls (0.2 μm), moist surface, rich blood supply, and 300 million alveoli create 70-80 m² surface area." },
      { title: "Oxygen Transport", description: "97% carried by hemoglobin as oxyhemoglobin (HbO₂). Each Hb binds 4 O₂ molecules. 3% dissolved in plasma." },
      { title: "Bohr Effect", description: "Low pH, high CO₂, and high temperature decrease O₂-Hb affinity, releasing more O₂ to active tissues." },
      { title: "CO₂ Transport", description: "70% as bicarbonate (HCO₃⁻), 23% as carbaminohemoglobin (HbCO₂), 7% dissolved in plasma." },
      { title: "Vital Capacity", description: "Maximum air that can be exhaled after maximum inhalation. VC = TV + IRV + ERV ≈ 4600 mL." }
    ]),
    formulas: JSON.stringify([
      { name: "Vital Capacity", formula: "VC = TV + IRV + ERV ≈ 4600 mL", description: "Sum of tidal volume, inspiratory reserve, and expiratory reserve volumes." },
      { name: "Total Lung Capacity", formula: "TLC = VC + RV ≈ 5800 mL", description: "Vital capacity plus residual volume (air that can't be expelled)." },
      { name: "Oxygen-Hemoglobin Binding", formula: "Hb + 4O₂ ⇌ Hb(O₂)₄", description: "One hemoglobin molecule can carry up to 4 oxygen molecules." },
      { name: "Carbonic Acid Formation", formula: "CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻", description: "Catalyzed by carbonic anhydrase in RBCs. Major CO₂ transport mechanism." },
      { name: "Oxygen Partial Pressure", formula: "pO₂: Alveoli (104 mmHg) → Blood (40 mmHg)", description: "Gradient drives O₂ diffusion from alveoli into blood." },
      { name: "Respiratory Rate", formula: "Normal: 12-20 breaths/minute", description: "Adult breathing rate at rest. Increases during exercise." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 18,
    chapterTitle: "Body Fluids and Circulation",
    introduction: "Zoology teaches us how blood and other body fluids transport materials throughout the animal body. This chapter explores the composition of blood, the heart's structure and function, and how the circulatory system keeps you alive with every heartbeat.",
    detailedNotes: `# Body Fluids and Circulation (Zoology)

The circulatory system is like a highway network in your body - it transports oxygen, nutrients, hormones, and waste products. Your heart beats about 100,000 times a day, pumping blood through 60,000 miles of blood vessels!

## Body Fluids

**Blood**: Main transport fluid
**Lymph**: Colorless fluid in lymphatic system
**Interstitial Fluid**: Fluid between cells

## Composition of Blood

Blood = Plasma (55%) + Formed Elements (45%)

### Plasma (55%)

**Composition:**
- 90-92% Water
- 6-8% Proteins (Albumin, Globulins, Fibrinogen)
- Glucose, Amino acids, Lipids
- Electrolytes (Na⁺, K⁺, Ca²⁺, Cl⁻)
- Hormones, Antibodies, Waste products

**💡 Did You Know?**
If all your blood vessels were laid end to end, they would circle the Earth more than twice - about 60,000 miles!

### Formed Elements (45%)

**Red Blood Cells (RBCs/Erythrocytes):**
- 5-5.5 million/mm³ in males
- 4.5-5 million/mm³ in females
- No nucleus in mammals
- Contain hemoglobin for O₂ transport
- Lifespan: 120 days
- Destroyed in spleen ("graveyard of RBCs")

**White Blood Cells (WBCs/Leukocytes):**
- 6000-8000/mm³
- Have nucleus
- Defense against pathogens
- Types: Neutrophils, Eosinophils, Basophils, Lymphocytes, Monocytes

**🔑 Remember This!**
"Never Let Monkeys Eat Bananas" - WBC types in decreasing order of abundance: Neutrophils > Lymphocytes > Monocytes > Eosinophils > Basophils

**Platelets (Thrombocytes):**
- 1.5-3.5 lakh/mm³
- Cell fragments (no nucleus)
- Essential for blood clotting

## Blood Groups

### ABO System

| Blood Group | Antigens on RBCs | Antibodies in Plasma |
|-------------|-----------------|---------------------|
| A | A | Anti-B |
| B | B | Anti-A |
| AB | A and B | None |
| O | None | Anti-A and Anti-B |

**Universal Donor:** O (no antigens)
**Universal Recipient:** AB (no antibodies)

### Rh Factor

- Rh⁺ (Rh positive): Have Rh antigen
- Rh⁻ (Rh negative): No Rh antigen

**⚠️ Common Mistake Alert!**
Erythroblastosis fetalis occurs when Rh⁻ mother carries Rh⁺ baby. Mother develops anti-Rh antibodies that can attack baby's RBCs in subsequent pregnancies!

## Blood Coagulation

Injury → Platelets aggregate → Clotting cascade

**Key steps:**
1. Thromboplastin released
2. Prothrombin → Thrombin (requires Ca²⁺)
3. Fibrinogen → Fibrin
4. Fibrin mesh traps blood cells = CLOT

## The Heart

**Location:** Mediastinum, between lungs

**Structure:**
- 4 chambers: 2 Atria (upper), 2 Ventricles (lower)
- Right side: Deoxygenated blood
- Left side: Oxygenated blood
- Septum divides left and right

**Heart Wall Layers:**
1. Pericardium (outer protective sac)
2. Epicardium (outer layer of heart)
3. Myocardium (middle, muscular layer)
4. Endocardium (inner lining)

### Heart Valves

**Atrioventricular valves:**
- Tricuspid (Right): 3 flaps
- Bicuspid/Mitral (Left): 2 flaps

**Semilunar valves:**
- Pulmonary (Right ventricle → Pulmonary artery)
- Aortic (Left ventricle → Aorta)

### Cardiac Cycle

One complete heartbeat = 0.8 seconds

**Three phases:**
1. **Atrial systole** (0.1 s): Atria contract
2. **Ventricular systole** (0.3 s): Ventricles contract
3. **Joint diastole** (0.4 s): All chambers relax

**Cardiac Output = Stroke Volume × Heart Rate**
= 70 mL × 72 beats/min = ~5 liters/min

## Conduction System (Pacemaker)

**Pathway of electrical impulse:**
SA node → AV node → Bundle of His → Purkinje fibers

**SA node** = Natural pacemaker (70-75 impulses/min)

**💡 Did You Know?**
Your heart can beat even when removed from the body! This is because it has its own electrical system and doesn't need signals from the brain to beat - it's called myogenic.

## Blood Vessels

**Arteries**: Carry blood AWAY from heart (thick walls, no valves)
**Veins**: Carry blood TO heart (thin walls, have valves)
**Capillaries**: Exchange of materials (one cell thick)

## Circulatory Pathways

**Double Circulation:**
1. Pulmonary: Heart → Lungs → Heart
2. Systemic: Heart → Body → Heart

## Disorders

- **Hypertension**: High blood pressure (>140/90 mmHg)
- **Coronary Artery Disease**: Blocked coronary arteries
- **Angina**: Chest pain due to reduced blood flow
- **Heart Attack**: Death of heart muscle`,
    keyConcepts: JSON.stringify([
      { title: "Blood Composition", description: "Plasma (55%) contains proteins and nutrients. Formed elements (45%) include RBCs (oxygen transport), WBCs (defense), and Platelets (clotting)." },
      { title: "ABO Blood Groups", description: "Based on antigens (A, B, both, or none) on RBCs and antibodies in plasma. O is universal donor, AB is universal recipient." },
      { title: "Heart Structure", description: "Four-chambered with 2 atria (receiving) and 2 ventricles (pumping). Right side has deoxygenated blood, left has oxygenated." },
      { title: "Cardiac Cycle", description: "One heartbeat = 0.8s. Atrial systole (0.1s) → Ventricular systole (0.3s) → Joint diastole (0.4s)." },
      { title: "Conduction System", description: "SA node (pacemaker) → AV node → Bundle of His → Purkinje fibers. Heart is myogenic (self-exciting)." },
      { title: "Double Circulation", description: "Blood passes through heart twice: Pulmonary circuit (heart-lungs-heart) and Systemic circuit (heart-body-heart)." },
      { title: "Blood Clotting Cascade", description: "Injury → Platelets → Thromboplastin → Prothrombin to Thrombin → Fibrinogen to Fibrin → Clot formation." }
    ]),
    formulas: JSON.stringify([
      { name: "RBC Count", formula: "Males: 5-5.5 million/mm³; Females: 4.5-5 million/mm³", description: "Normal red blood cell count per cubic millimeter of blood." },
      { name: "Cardiac Output", formula: "CO = Stroke Volume × Heart Rate = 70 mL × 72/min = 5 L/min", description: "Volume of blood pumped by heart per minute." },
      { name: "Cardiac Cycle Duration", formula: "0.8 seconds = Atrial systole (0.1s) + Ventricular systole (0.3s) + Diastole (0.4s)", description: "Time for one complete heartbeat at 72 bpm." },
      { name: "Blood Pressure Normal", formula: "120/80 mmHg (systolic/diastolic)", description: "Normal adult blood pressure. Hypertension if consistently above 140/90." },
      { name: "WBC Order", formula: "Neutrophils > Lymphocytes > Monocytes > Eosinophils > Basophils", description: "Decreasing order of WBC types abundance (Never Let Monkeys Eat Bananas)." },
      { name: "RBC Lifespan", formula: "120 days", description: "Average lifespan of red blood cells before destruction in spleen." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 19,
    chapterTitle: "Excretory Products and their Elimination",
    introduction: "Zoology reveals how animals remove metabolic waste from their bodies. This chapter explores the human excretory system, focusing on the kidneys - amazing organs that filter your blood 400 times a day to produce urine and maintain body's internal environment.",
    detailedNotes: `# Excretory Products and their Elimination (Zoology)

Metabolism produces waste products that must be removed from the body. The excretory system is responsible for eliminating these wastes and maintaining homeostasis.

## Types of Nitrogenous Wastes

| Animal Type | Main Waste | Example |
|-------------|------------|---------|
| Ammonotelic | Ammonia | Fish, aquatic amphibians |
| Ureotelic | Urea | Mammals, terrestrial amphibians |
| Uricotelic | Uric acid | Birds, reptiles, insects |

**💡 Did You Know?**
Ammonia is very toxic but needs lots of water to flush out. That's why fish (living in water) excrete ammonia directly. Land animals can't waste that much water, so they convert it to less toxic urea or uric acid!

## Human Excretory System

**Main organs:** 2 Kidneys + 2 Ureters + 1 Urinary bladder + 1 Urethra

### Kidney Structure

**External:** Bean-shaped, ~11 cm long
**Location:** Behind peritoneum (retroperitoneal)

**Internal layers:**
1. **Cortex** (outer): Contains Bowman's capsules, convoluted tubules
2. **Medulla** (inner): Contains loops of Henle, collecting ducts
3. **Pelvis**: Central funnel-shaped cavity

### Nephron - Functional Unit

Each kidney has about 1 million nephrons!

**Parts of a Nephron:**

**1. Glomerulus**
- Tuft of capillaries
- High pressure blood filtration
- Afferent arteriole (enters) > Efferent arteriole (leaves)

**2. Bowman's Capsule**
- Cup-shaped structure around glomerulus
- Collects filtrate

**3. Proximal Convoluted Tubule (PCT)**
- Reabsorbs 65-80% of filtrate
- Active reabsorption of glucose, amino acids, Na⁺

**4. Loop of Henle**
- Descending limb: Permeable to water
- Ascending limb: Impermeable to water, active Na⁺ transport
- Creates concentration gradient in medulla

**🔑 Remember This!**
Loop of Henle works like a countercurrent multiplier - the longer the loop, the more concentrated urine an animal can produce!

**5. Distal Convoluted Tubule (DCT)**
- Fine-tuning of reabsorption
- Regulated by hormones (ADH, Aldosterone)

**6. Collecting Duct**
- Collects urine from many nephrons
- ADH increases water reabsorption here

## Urine Formation

**Three Processes:**

### 1. Glomerular Filtration

Blood → Glomerulus → Filtrate in Bowman's capsule

**Glomerular Filtration Rate (GFR) = 125 mL/min = 180 L/day**

Filtrate contains: Water, glucose, amino acids, urea, salts
(Filtered out: Blood cells, proteins - too large)

### 2. Tubular Reabsorption

99% of filtrate reabsorbed!

| Substance | Location | Mechanism |
|-----------|----------|-----------|
| Glucose, Amino acids | PCT | Active transport |
| Na⁺, K⁺ | PCT, DCT | Active transport |
| Water | PCT, DCT, Collecting duct | Osmosis |
| HCO₃⁻ | PCT | Active transport |

### 3. Tubular Secretion

Additional waste added to filtrate:
- H⁺, K⁺, NH₃, drugs, toxins

**Final urine = Filtrate - Reabsorbed + Secreted**

**⚠️ Common Mistake Alert!**
We produce 180 L of filtrate daily but only excrete 1.5-2 L of urine. That's 99% reabsorption! Without this, we'd lose all our body water in minutes!

## Hormonal Regulation

**ADH (Antidiuretic Hormone):**
- From posterior pituitary
- Increases water reabsorption
- Less urine, more concentrated

**Aldosterone:**
- From adrenal cortex
- Increases Na⁺ reabsorption
- Water follows Na⁺

**ANF (Atrial Natriuretic Factor):**
- From heart atria
- Increases Na⁺ excretion
- Lowers blood pressure

## Countercurrent Mechanism

**Countercurrent Multiplier (Loop of Henle):**
Creates osmotic gradient in medulla (300 → 1200 mOsm/L)

**Countercurrent Exchanger (Vasa recta):**
Maintains the gradient without washing it away

## Hemodialysis (Artificial Kidney)

For kidney failure patients:
- Blood passed through dialyzer
- Wastes diffuse out through semipermeable membrane
- Clean blood returned to body

**💡 Did You Know?**
Your kidneys filter your entire blood volume about 400 times a day! That's like filtering a large swimming pool!

## Disorders

- **Uremia**: High urea in blood
- **Renal calculi**: Kidney stones
- **Glomerulonephritis**: Inflammation of glomeruli`,
    keyConcepts: JSON.stringify([
      { title: "Types of Nitrogenous Wastes", description: "Ammonotelic (ammonia) - fish; Ureotelic (urea) - mammals; Uricotelic (uric acid) - birds, reptiles. Based on water availability." },
      { title: "Nephron Structure", description: "Glomerulus → Bowman's capsule → PCT → Loop of Henle → DCT → Collecting duct. Each kidney has ~1 million nephrons." },
      { title: "Three Steps of Urine Formation", description: "1. Glomerular filtration (180 L/day) 2. Tubular reabsorption (99%) 3. Tubular secretion (H⁺, K⁺, drugs)." },
      { title: "Glomerular Filtration Rate", description: "GFR = 125 mL/min = 180 L/day. Only 1.5-2 L excreted as urine due to 99% reabsorption." },
      { title: "Countercurrent Mechanism", description: "Loop of Henle creates concentration gradient (300-1200 mOsm/L). Vasa recta maintains gradient for concentrated urine." },
      { title: "Hormonal Control", description: "ADH (water reabsorption), Aldosterone (Na⁺ reabsorption), ANF (Na⁺ excretion) regulate urine volume and concentration." },
      { title: "Hemodialysis", description: "Artificial kidney for renal failure. Blood filtered through dialyzer membrane to remove wastes." }
    ]),
    formulas: JSON.stringify([
      { name: "Glomerular Filtration Rate", formula: "GFR = 125 mL/min = 180 L/day", description: "Volume of filtrate formed per day. 99% is reabsorbed." },
      { name: "Urine Production", formula: "Final urine = Filtrate - Reabsorbed + Secreted ≈ 1.5-2 L/day", description: "Daily urine output after reabsorption and secretion." },
      { name: "Medullary Gradient", formula: "300 mOsm/L (cortex) → 1200 mOsm/L (inner medulla)", description: "Concentration gradient created by countercurrent mechanism." },
      { name: "Normal Urine Composition", formula: "95% water + 2% urea + 2% salts + 1% other wastes", description: "Approximate composition of normal human urine." },
      { name: "Reabsorption Rate", formula: "99% of filtrate reabsorbed", description: "Of 180 L filtered daily, only 1.5-2 L becomes urine." },
      { name: "Nephron Count", formula: "~1 million nephrons per kidney", description: "Functional units of the kidney responsible for urine formation." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 20,
    chapterTitle: "Locomotion and Movement",
    introduction: "Zoology explores how animals move! This chapter covers the human musculoskeletal system - the bones that provide framework and the muscles that power movement. From walking to blinking, every movement involves this incredible system.",
    detailedNotes: `# Locomotion and Movement (Zoology)

Movement is one of the most characteristic features of animals. From the beating of cilia to the running of a cheetah, movement is essential for survival - for finding food, escaping predators, and reproduction.

## Types of Movement

**Amoeboid movement**: Pseudopodia (WBCs, Amoeba)
**Ciliary movement**: Cilia beating (respiratory tract, oviducts)
**Muscular movement**: Muscle contraction (most animal movement)

## Skeletal System

The human skeleton has 206 bones in adults.

**Functions:**
1. Support
2. Protection (skull protects brain, ribs protect heart/lungs)
3. Movement (with muscles)
4. Blood cell production (in bone marrow)
5. Mineral storage (calcium, phosphorus)

### Parts of Skeleton

**Axial Skeleton (80 bones):**
- Skull: 22 bones (8 cranial + 14 facial)
- Vertebral column: 26 vertebrae (7C + 12T + 5L + 1S + 1C)
- Sternum: 1 bone
- Ribs: 24 (12 pairs)

**💡 Did You Know?**
Babies are born with about 270 bones, but many fuse together as they grow, leaving adults with just 206 bones!

**Appendicular Skeleton (126 bones):**
- Pectoral girdle: Clavicle + Scapula
- Upper limbs: Humerus, Radius, Ulna, Carpals, Metacarpals, Phalanges
- Pelvic girdle: 2 hip bones (each = Ilium + Ischium + Pubis)
- Lower limbs: Femur, Tibia, Fibula, Tarsals, Metatarsals, Phalanges

**🔑 Remember This!**
Vertebral formula: C₇T₁₂L₅S₁C₁ = 26 vertebrae
(7 Cervical + 12 Thoracic + 5 Lumbar + 1 Sacrum + 1 Coccyx)

### Types of Joints

**Immovable (Fibrous)**: Skull sutures
**Slightly movable (Cartilaginous)**: Between vertebrae
**Freely movable (Synovial)**: Most joints

**Types of Synovial Joints:**
- Ball and socket: Shoulder, Hip (maximum movement)
- Hinge: Knee, Elbow (one plane)
- Pivot: Atlas-Axis (rotation)
- Gliding: Wrist, Ankle
- Saddle: Thumb base
- Condyloid: Wrist

## Muscular System

Three types of muscles:

**1. Skeletal Muscle** (Voluntary)
- Attached to bones
- Striated appearance
- Under conscious control

**2. Smooth Muscle** (Involuntary)
- In internal organs
- Non-striated
- Autonomic control

**3. Cardiac Muscle** (Involuntary)
- Only in heart
- Striated but involuntary
- Intercalated discs connect cells

### Structure of Skeletal Muscle

Muscle → Fascicles → Muscle fibers → Myofibrils → Sarcomeres

**Sarcomere - Basic Contractile Unit**
- Z-line to Z-line
- Contains actin (thin) and myosin (thick) filaments
- I-band: Light, contains only actin
- A-band: Dark, contains myosin (+actin overlap)
- H-zone: Only myosin, no overlap

**⚠️ Common Mistake Alert!**
During contraction, the I-band and H-zone become SHORTER, but the A-band stays the SAME LENGTH! This is because filaments slide, they don't shorten.

## Sliding Filament Theory

**How muscles contract:**

1. Nerve impulse reaches muscle
2. Ca²⁺ released from sarcoplasmic reticulum
3. Ca²⁺ binds troponin, moves tropomyosin
4. Myosin binding sites on actin exposed
5. Myosin heads attach to actin (cross-bridges)
6. Power stroke: Myosin pulls actin toward center
7. ATP binds, cross-bridges detach
8. Cycle repeats → Sarcomere shortens → Muscle contracts

**💡 Did You Know?**
Rigor mortis (stiffness after death) happens because without ATP, myosin heads can't detach from actin! The muscles get stuck in contracted position.

## Energy for Muscle Contraction

**ATP sources:**
1. **Immediate**: Stored ATP, Creatine phosphate (10-15 seconds)
2. **Short-term**: Anaerobic glycolysis (30-40 seconds) → Lactic acid
3. **Long-term**: Aerobic respiration (unlimited with O₂)

**Oxygen Debt:**
After intense exercise, you breathe heavily to repay oxygen used and remove lactic acid.

## Disorders

- **Myasthenia gravis**: Autoimmune, muscle weakness
- **Muscular dystrophy**: Genetic, progressive muscle degeneration
- **Osteoporosis**: Bone density loss
- **Arthritis**: Joint inflammation
- **Gout**: Uric acid crystals in joints`,
    keyConcepts: JSON.stringify([
      { title: "Human Skeleton", description: "206 bones: Axial (80 - skull, vertebrae, ribs, sternum) + Appendicular (126 - limbs and girdles). Provides support, protection, movement." },
      { title: "Vertebral Column", description: "26 vertebrae: 7 Cervical + 12 Thoracic + 5 Lumbar + 1 Sacrum + 1 Coccyx. Protects spinal cord, supports body." },
      { title: "Types of Synovial Joints", description: "Ball & socket (shoulder), Hinge (elbow), Pivot (atlas-axis), Gliding (wrist), Saddle (thumb), Condyloid. Based on movement type." },
      { title: "Sarcomere Structure", description: "Z-line to Z-line. Contains actin (I-band), myosin (A-band), H-zone. During contraction, I-band and H-zone shorten." },
      { title: "Sliding Filament Theory", description: "Muscle contraction: Ca²⁺ release → Myosin-actin cross-bridges → Power stroke → ATP for detachment → Sarcomere shortens." },
      { title: "Energy for Contraction", description: "Immediate: ATP, Creatine phosphate. Short-term: Anaerobic glycolysis. Long-term: Aerobic respiration." },
      { title: "Muscle Types", description: "Skeletal (voluntary, striated), Smooth (involuntary, non-striated), Cardiac (involuntary, striated with intercalated discs)." }
    ]),
    formulas: JSON.stringify([
      { name: "Total Bones", formula: "206 = 80 (Axial) + 126 (Appendicular)", description: "Adult human skeleton bone count." },
      { name: "Vertebral Formula", formula: "C₇ + T₁₂ + L₅ + S₁ + C₁ = 26 vertebrae", description: "Cervical, Thoracic, Lumbar, Sacrum, Coccyx." },
      { name: "Ribs Classification", formula: "24 ribs = 14 True + 6 False + 4 Floating", description: "7 pairs attach to sternum, 3 pairs to 7th rib, 2 pairs free." },
      { name: "Muscle Contraction Sequence", formula: "Nerve impulse → Ca²⁺ release → Cross-bridge → Power stroke → ATP → Detach → Repeat", description: "Steps of sliding filament mechanism." },
      { name: "ATP Sources Duration", formula: "Creatine phosphate: 10-15s; Glycolysis: 30-40s; Aerobic: unlimited", description: "Energy systems for different exercise durations." },
      { name: "Sarcomere Changes", formula: "Contraction: I-band ↓, H-zone ↓, A-band = same", description: "What changes during muscle contraction." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 21,
    chapterTitle: "Neural Control and Coordination",
    introduction: "Zoology reveals how the nervous system coordinates all body activities. This chapter explores neurons, the brain, spinal cord, and how nerve impulses travel faster than you can blink. From reflexes to memory, your nervous system controls it all!",
    detailedNotes: `# Neural Control and Coordination (Zoology)

The nervous system is your body's control center and communication network. It receives information, processes it, and responds - all in milliseconds!

## Neural System Organization

**Central Nervous System (CNS):**
- Brain
- Spinal cord

**Peripheral Nervous System (PNS):**
- Cranial nerves (12 pairs)
- Spinal nerves (31 pairs)

**💡 Did You Know?**
Your brain contains about 86 billion neurons - more than 10 times the world's population! And each neuron can connect with up to 10,000 other neurons!

## Neuron - The Basic Unit

**Structure:**
1. **Cell body (Soma)**: Contains nucleus, Nissl granules
2. **Dendrites**: Short, branched, receive signals
3. **Axon**: Long, single, transmits signals away
4. **Axon terminals**: Synaptic knobs at end

**Types of Neurons:**
- **Sensory (Afferent)**: Carry impulses TO CNS
- **Motor (Efferent)**: Carry impulses FROM CNS
- **Interneurons (Association)**: Connect neurons within CNS

**Myelin Sheath:**
- Fatty covering around axons
- Made by Schwann cells (PNS) or Oligodendrocytes (CNS)
- Speeds up impulse transmission
- Gaps = Nodes of Ranvier (saltatory conduction)

## Nerve Impulse

**Resting Potential:** -70 mV (inside negative)
- Na⁺/K⁺-ATPase maintains: Na⁺ outside, K⁺ inside

**Action Potential:**
1. **Depolarization**: Na⁺ channels open, Na⁺ rushes in (+30 mV)
2. **Repolarization**: K⁺ channels open, K⁺ rushes out
3. **Hyperpolarization**: Below -70 mV briefly
4. **Recovery**: Na⁺/K⁺ pump restores resting potential

**🔑 Remember This!**
"All-or-None Law" - A neuron either fires completely or not at all. There's no partial action potential!

**Speed of Impulse:**
- Myelinated fibers: 100-120 m/s (saltatory conduction)
- Non-myelinated: 0.5-2 m/s

## Synapse

**Chemical Synapse:**
1. Impulse arrives at synaptic knob
2. Ca²⁺ enters
3. Vesicles release neurotransmitters
4. Neurotransmitters bind receptors on next neuron
5. New impulse generated (or inhibited)

**Common Neurotransmitters:**
- Acetylcholine (muscles, CNS)
- Dopamine (reward, movement)
- Serotonin (mood, sleep)
- GABA (inhibitory)
- Glutamate (excitatory)

## Human Brain

**Weight:** ~1.4 kg (2% of body weight, uses 20% of oxygen!)

### Major Parts:

**1. Forebrain**

**Cerebrum (largest part):**
- Two hemispheres connected by corpus callosum
- Surface = Cerebral cortex (grey matter)
- Folds = Gyri; Grooves = Sulci
- Four lobes: Frontal, Parietal, Temporal, Occipital

**Functional areas:**
- Motor area: Movement (frontal lobe)
- Sensory area: Touch, pressure (parietal lobe)
- Visual area: Sight (occipital lobe)
- Auditory area: Hearing (temporal lobe)

**Thalamus**: Relay center for sensory information
**Hypothalamus**: Controls hunger, thirst, temperature, emotions

**⚠️ Common Mistake Alert!**
The LEFT hemisphere controls the RIGHT side of body and vice versa! This is called contralateral control.

**2. Midbrain**
- Controls visual and auditory reflexes
- Contains cerebral aqueduct

**3. Hindbrain**

**Cerebellum**: Balance, posture, coordination
**Pons**: Bridge between cerebrum and cerebellum
**Medulla oblongata**: Vital functions (breathing, heartbeat, BP)

## Spinal Cord

**Location**: Within vertebral column, 43-45 cm long

**Functions:**
1. Conducts impulses to/from brain
2. Center for reflex actions

**Structure:**
- Grey matter: Central, H-shaped
- White matter: Outer, nerve tracts

## Reflex Action

**Definition**: Automatic, involuntary response to stimulus

**Reflex Arc:**
Receptor → Sensory neuron → CNS (integration) → Motor neuron → Effector

**Example - Knee Jerk Reflex:**
Tap patellar tendon → Stretch receptor → Sensory neuron → Spinal cord → Motor neuron → Quadriceps contracts → Leg kicks

**💡 Did You Know?**
Doctors test reflexes because they reveal the health of your nervous system. An abnormal reflex can indicate nerve damage or disease!

## Sense Organs

**Eye**: Vision (photoreceptors - rods and cones)
**Ear**: Hearing and balance (mechanoreceptors)
**Nose**: Smell (chemoreceptors)
**Tongue**: Taste (chemoreceptors)
**Skin**: Touch, pressure, temperature (mechanoreceptors, thermoreceptors)

## Disorders

- **Parkinson's**: Dopamine deficiency, tremors
- **Alzheimer's**: Memory loss, dementia
- **Epilepsy**: Abnormal brain activity, seizures`,
    keyConcepts: JSON.stringify([
      { title: "Neuron Structure", description: "Cell body (soma) + Dendrites (receive signals) + Axon (transmit signals) + Axon terminals. Myelin sheath speeds up transmission." },
      { title: "Action Potential", description: "Resting potential (-70mV) → Depolarization (Na⁺ in, +30mV) → Repolarization (K⁺ out) → Recovery. All-or-none response." },
      { title: "Synapse and Neurotransmitters", description: "Chemical synapse: impulse → Ca²⁺ entry → neurotransmitter release → receptor binding → new impulse. Examples: Acetylcholine, Dopamine." },
      { title: "Brain Divisions", description: "Forebrain (cerebrum, thalamus, hypothalamus), Midbrain (reflexes), Hindbrain (cerebellum, pons, medulla for vital functions)." },
      { title: "Cerebral Lobes", description: "Frontal (motor), Parietal (sensory), Temporal (auditory), Occipital (visual). Left hemisphere controls right body side." },
      { title: "Reflex Arc", description: "Stimulus → Receptor → Sensory neuron → CNS → Motor neuron → Effector. Quick, involuntary responses without brain involvement." },
      { title: "Spinal Cord Functions", description: "Conducts impulses between body and brain. Center for reflex actions. Grey matter inside, white matter outside." }
    ]),
    formulas: JSON.stringify([
      { name: "Resting Potential", formula: "-70 mV (inside negative)", description: "Maintained by Na⁺/K⁺-ATPase: 3 Na⁺ out, 2 K⁺ in." },
      { name: "Action Potential Peak", formula: "+30 mV during depolarization", description: "When Na⁺ channels open and sodium rushes into the neuron." },
      { name: "Nerve Impulse Speed", formula: "Myelinated: 100-120 m/s; Non-myelinated: 0.5-2 m/s", description: "Myelin enables saltatory conduction, greatly increasing speed." },
      { name: "Brain Statistics", formula: "Weight: 1.4 kg; Neurons: 86 billion; Uses 20% of body's O₂", description: "Key facts about the human brain." },
      { name: "Cranial Nerves", formula: "12 pairs from brain", description: "Olfactory, Optic, Oculomotor, Trochlear, Trigeminal, Abducens, Facial, Vestibulocochlear, Glossopharyngeal, Vagus, Accessory, Hypoglossal." },
      { name: "Spinal Nerves", formula: "31 pairs from spinal cord", description: "8 Cervical + 12 Thoracic + 5 Lumbar + 5 Sacral + 1 Coccygeal." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  
  // ============ CLASS 12 ZOOLOGY CHAPTERS ============
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 3,
    chapterTitle: "Human Reproduction",
    introduction: "Zoology includes the study of reproduction - how life creates new life. This chapter explores the male and female reproductive systems, the journey of sperm and egg, fertilization, and the incredible nine-month journey of human development.",
    detailedNotes: `# Human Reproduction (Zoology)

Humans reproduce sexually, involving the fusion of male and female gametes. This chapter explores the amazing journey from single cells to a new human being!

## Male Reproductive System

**Primary Sex Organ:** Testes (paired, in scrotum)

**Scrotum:** Outside body (2-2.5°C cooler than body - essential for sperm production!)

### Testis Structure
- Surrounded by tunica albuginea
- Contains 250 lobules
- Each lobule has 1-3 seminiferous tubules

**Seminiferous Tubules:**
- Site of sperm production
- Lined with: Spermatogonia (germ cells) + Sertoli cells (nurse cells)
- **Leydig cells** (interstitial cells) between tubules: Produce testosterone

**💡 Did You Know?**
Men produce about 200-300 million sperm daily - enough to populate several countries! Yet only ONE sperm fertilizes the egg.

**Accessory Ducts:**
Seminiferous tubules → Rete testis → Vasa efferentia → Epididymis → Vas deferens → Ejaculatory duct → Urethra

**Accessory Glands:**
1. **Seminal vesicles**: Fructose (energy for sperm)
2. **Prostate gland**: Alkaline fluid (neutralizes vaginal acidity)
3. **Bulbourethral glands**: Lubricating mucus

**Semen = Sperm + Secretions from accessory glands**
(2-5 mL per ejaculation, 200-400 million sperm)

## Female Reproductive System

**Primary Sex Organs:** Ovaries (paired, in pelvic cavity)

### Ovary Structure
- Contains follicles at various stages
- Produces eggs and hormones (estrogen, progesterone)

**🔑 Remember This!**
Women are born with all the eggs they'll ever have (~2 million at birth, ~40,000 at puberty, ~400 ovulated in lifetime)!

**Accessory Structures:**
1. **Fallopian tubes (Oviducts)**: Site of fertilization
   - Infundibulum with fimbriae (catch egg)
   - Ampulla (fertilization site)
   - Isthmus (narrow part)
2. **Uterus**: Implantation, fetal development
3. **Vagina**: Receives sperm, birth canal

**Uterus Structure:**
- Perimetrium (outer)
- Myometrium (muscular, contracts during labor)
- Endometrium (inner, sheds during menstruation)

## Gametogenesis

### Spermatogenesis (in males)

**Location:** Seminiferous tubules
**Duration:** ~74 days
**Production:** Continuous from puberty

**Stages:**
Spermatogonium (2n) → Primary spermatocyte (2n) → 2 Secondary spermatocytes (n) → 4 Spermatids (n) → 4 Spermatozoa (n)

**Sperm Structure:**
- Head: Acrosome (enzymes) + Nucleus
- Middle piece: Mitochondria (energy)
- Tail: Flagellum (movement)

### Oogenesis (in females)

**Location:** Ovary
**Duration:** Starts in fetal life, one egg matures each month
**Production:** Cyclic, from puberty to menopause

**Stages:**
Oogonium (2n) → Primary oocyte (2n) → Secondary oocyte (n) + First polar body → Ovum (n) + Second polar body (only after fertilization)

**⚠️ Common Mistake Alert!**
The "egg" released during ovulation is actually a secondary oocyte! It only becomes a true ovum after fertilization triggers the second meiotic division!

## Menstrual Cycle

**Duration:** ~28 days (varies 21-35 days)

### Phases:

**1. Menstrual Phase (Days 1-5)**
- Endometrium sheds
- Bleeding (menstruation)
- Low estrogen and progesterone

**2. Follicular/Proliferative Phase (Days 6-14)**
- FSH stimulates follicle development
- Follicle produces estrogen
- Endometrium rebuilds
- One dominant follicle emerges

**3. Ovulation (Day 14)**
- LH surge triggers ovulation
- Secondary oocyte released from Graafian follicle

**4. Luteal/Secretory Phase (Days 15-28)**
- Empty follicle becomes corpus luteum
- Corpus luteum produces progesterone
- Endometrium prepares for implantation
- If no pregnancy, corpus luteum degenerates

**💡 Did You Know?**
The LH surge that triggers ovulation is what home ovulation tests detect!

## Fertilization

**Location:** Ampulla of fallopian tube (within 24 hours of ovulation)

**Steps:**
1. Sperm capacitation (in female tract)
2. Acrosomal reaction (enzymes released)
3. Sperm penetrates zona pellucida
4. Fusion of plasma membranes
5. Cortical reaction (prevents polyspermy)
6. Second meiosis completed
7. Pronuclei fuse → Zygote (2n)

## Implantation and Pregnancy

**Implantation:** Day 7 post-fertilization
- Blastocyst implants in endometrium

**Placenta:** Formed from trophoblast + maternal tissue
- Hormone production (hCG, hPL, estrogen, progesterone)
- Nutrient/gas exchange
- Waste removal
- Antibody transfer

**Pregnancy Duration:** ~40 weeks (280 days) from LMP

## Parturition (Birth)

Triggers: Fetal stress hormones, oxytocin, prostaglandins
- Cervix dilates
- Strong uterine contractions
- Baby delivered
- Placenta expelled (afterbirth)

**Lactation:** Prolactin (milk production) + Oxytocin (milk ejection)`,
    keyConcepts: JSON.stringify([
      { title: "Male Reproductive System", description: "Testes produce sperm (in seminiferous tubules) and testosterone (in Leydig cells). Sperm travel through epididymis, vas deferens to urethra." },
      { title: "Female Reproductive System", description: "Ovaries produce eggs and hormones. Fertilization in fallopian tubes, implantation and development in uterus." },
      { title: "Spermatogenesis", description: "One spermatogonium → 4 sperms. Continuous from puberty. Takes ~74 days in seminiferous tubules." },
      { title: "Oogenesis", description: "One oogonium → 1 ovum + 3 polar bodies. Begins in fetal life, one egg matures per cycle from puberty to menopause." },
      { title: "Menstrual Cycle Phases", description: "Menstrual (1-5) → Follicular (6-14) → Ovulation (14) → Luteal (15-28). FSH, LH, estrogen, progesterone coordinate cycle." },
      { title: "Fertilization Events", description: "Sperm capacitation → Acrosomal reaction → Zona pellucida penetration → Cortical reaction → Pronuclei fusion → Zygote." },
      { title: "Placenta Functions", description: "Hormone production (hCG, progesterone), nutrient/gas exchange, waste removal, antibody transfer. Connects mother and fetus." }
    ]),
    formulas: JSON.stringify([
      { name: "Spermatogenesis Output", formula: "1 Spermatogonium (2n) → 4 Spermatozoa (n)", description: "Complete division produces 4 functional sperm from one germ cell." },
      { name: "Oogenesis Output", formula: "1 Oogonium (2n) → 1 Ovum (n) + 3 Polar bodies", description: "Unequal division ensures one large egg with cytoplasm resources." },
      { name: "Menstrual Cycle", formula: "~28 days: Menstrual (5d) + Follicular (9d) + Luteal (14d)", description: "Day 14 ovulation, luteal phase always ~14 days." },
      { name: "Sperm Count Normal", formula: "200-400 million sperm per ejaculation (2-5 mL)", description: "Below 20 million/mL considered low sperm count." },
      { name: "Pregnancy Duration", formula: "40 weeks = 280 days from LMP", description: "Last Menstrual Period used to calculate due date." },
      { name: "Egg Viability", formula: "24 hours after ovulation", description: "Time window for fertilization. Sperm viable for 3-5 days in female tract." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 4,
    chapterTitle: "Reproductive Health",
    introduction: "Zoology includes understanding reproductive health for a healthy society. This chapter covers birth control methods, sexually transmitted diseases, infertility treatments, and the importance of reproductive rights and education.",
    detailedNotes: `# Reproductive Health (Zoology)

Reproductive health means complete physical, mental, and social well-being related to the reproductive system. India was the first country to launch a family planning program in 1951!

## Reproductive Health - Goals

1. Creating awareness about reproduction
2. Providing facilities for birth control
3. Managing population growth
4. Preventing sexually transmitted diseases
5. Ensuring safe motherhood
6. Managing infertility

**💡 Did You Know?**
India's population growth rate has decreased from 2.2% (1970s) to about 1.0% (2020s) thanks to reproductive health programs!

## Birth Control Methods

### 1. Natural Methods

**Periodic Abstinence (Rhythm Method):**
- Avoid intercourse during fertile period (Day 10-17)
- Ovulation typically on Day 14

**Coitus Interruptus (Withdrawal):**
- Withdrawal before ejaculation
- Least reliable method

**Lactational Amenorrhea (LAM):**
- Breastfeeding delays ovulation
- Effective up to 6 months postpartum

### 2. Barrier Methods

**Condoms** (male/female):
- Physical barrier to sperm
- Also prevents STDs
- 85-98% effective

**Diaphragm/Cervical Cap:**
- Covers cervix
- Used with spermicide

**🔑 Remember This!**
Condoms are the ONLY method that provides dual protection - against both pregnancy AND sexually transmitted infections!

### 3. Intrauterine Devices (IUDs)

Inserted into uterus by doctor

**Types:**
- **Non-medicated**: Lippes loop (plastic)
- **Copper-releasing**: CuT, Cu7 (copper ions spermicidal)
- **Hormone-releasing**: LNG-20, Progestasert (progesterone)

**Mechanism:**
- Increase phagocytosis of sperm
- Create hostile uterine environment
- Make endometrium unsuitable for implantation

### 4. Hormonal Methods

**Oral Contraceptives (Pills):**
- Synthetic estrogen + progesterone
- Prevent ovulation
- Must be taken daily
- "Saheli" - Indian non-steroidal weekly pill

**Injectables:**
- Depo-Provera (every 3 months)
- Progesterone-based

**Implants:**
- Under skin of upper arm
- Release hormones for 3-5 years

**⚠️ Common Mistake Alert!**
Emergency contraceptive pills are NOT regular contraceptives! They should only be used in emergencies within 72 hours of unprotected intercourse.

### 5. Surgical Methods (Sterilization)

**Vasectomy (Male):**
- Vas deferens cut and tied
- Prevents sperm from reaching semen
- Permanent, highly effective

**Tubectomy (Female):**
- Fallopian tubes cut and tied
- Prevents egg from meeting sperm
- Permanent, highly effective

## Medical Termination of Pregnancy (MTP)

**Legal in India up to 20 weeks** (24 weeks in special cases after 2021 amendment)

**Permitted conditions:**
- Continuation dangerous to mother's health
- Fetal abnormalities
- Failure of contraception (married women)
- Rape/incest cases

**Important:** Must be performed by registered doctor in approved facility

## Sexually Transmitted Diseases (STDs/STIs)

### Bacterial STDs

| Disease | Causative Agent | Symptoms |
|---------|-----------------|----------|
| Gonorrhea | Neisseria gonorrhoeae | Discharge, painful urination |
| Syphilis | Treponema pallidum | Painless sore (chancre), rashes |
| Chlamydia | Chlamydia trachomatis | Often asymptomatic |

### Viral STDs

| Disease | Causative Agent | Features |
|---------|-----------------|----------|
| HIV/AIDS | HIV virus | Attacks immune system (CD4 cells) |
| Genital Herpes | Herpes simplex virus | Painful blisters, recurring |
| Genital Warts | HPV (Human Papilloma Virus) | Warts, linked to cervical cancer |
| Hepatitis B | Hepatitis B virus | Liver infection |

**💡 Did You Know?**
HPV vaccine can prevent cervical cancer! It's recommended for girls aged 9-14 years before they become sexually active.

### Prevention of STDs

1. Avoid multiple partners
2. Use condoms consistently
3. Get tested regularly
4. Avoid sharing needles
5. Mother-to-child transmission prevention

## Infertility

**Definition:** Inability to conceive after one year of unprotected intercourse

**Causes in Males:**
- Low sperm count/motility
- Blockage in reproductive tract
- Hormonal imbalances
- Erectile dysfunction

**Causes in Females:**
- Ovulatory disorders (PCOS)
- Blocked fallopian tubes
- Uterine abnormalities
- Endometriosis

### Assisted Reproductive Technologies (ART)

**1. IVF (In Vitro Fertilization):**
- Egg + Sperm fertilized in lab
- Embryo transferred to uterus
- "Test tube baby" technique

**2. ZIFT (Zygote Intra Fallopian Transfer):**
- Zygote transferred to fallopian tube

**3. GIFT (Gamete Intra Fallopian Transfer):**
- Unfertilized egg + sperm transferred to tube

**4. ICSI (Intracytoplasmic Sperm Injection):**
- Single sperm injected directly into egg
- For severe male infertility

**5. AI (Artificial Insemination):**
- Sperm placed directly in uterus
- Uses husband's or donor sperm

**Surrogacy:**
- Another woman carries pregnancy
- Genetic or gestational surrogacy`,
    keyConcepts: JSON.stringify([
      { title: "Birth Control Methods", description: "Natural (rhythm, withdrawal, LAM), Barrier (condoms, diaphragm), IUDs, Hormonal (pills, injectables), Surgical (vasectomy, tubectomy)." },
      { title: "IUD Types", description: "Non-medicated (Lippes loop), Copper-releasing (CuT, Cu7 - copper ions are spermicidal), Hormone-releasing (progestasert)." },
      { title: "Surgical Sterilization", description: "Vasectomy: vas deferens cut in males. Tubectomy: fallopian tubes cut in females. Both are permanent methods." },
      { title: "Common STDs", description: "Bacterial: Gonorrhea, Syphilis, Chlamydia. Viral: HIV/AIDS, Herpes, HPV, Hepatitis B. Prevention: condoms, testing, monogamy." },
      { title: "Infertility Causes", description: "Males: low sperm count, blockages. Females: ovulatory disorders (PCOS), blocked tubes, endometriosis." },
      { title: "ART Techniques", description: "IVF (test tube baby), ZIFT, GIFT, ICSI (sperm injection), AI (artificial insemination). Help couples with infertility." },
      { title: "MTP in India", description: "Legal up to 20 weeks (24 in special cases). Permitted for health risks, fetal abnormalities, contraception failure, rape cases." }
    ]),
    formulas: JSON.stringify([
      { name: "Fertile Period", formula: "Days 10-17 of 28-day cycle", description: "Period to avoid for natural birth control (rhythm method)." },
      { name: "Condom Effectiveness", formula: "85-98% effective with proper use", description: "Only method protecting against both pregnancy and STDs." },
      { name: "IVF Success Rate", formula: "40-50% per cycle (varies with age)", description: "In vitro fertilization success depends on many factors." },
      { name: "Emergency Contraception Window", formula: "Within 72 hours of unprotected intercourse", description: "More effective the sooner it's taken. Not for regular use." },
      { name: "MTP Legal Limit", formula: "Up to 20 weeks (24 in special cases)", description: "As per Medical Termination of Pregnancy Act (India, 2021 amendment)." },
      { name: "Infertility Definition", formula: "Inability to conceive after 1 year of unprotected intercourse", description: "Affects about 10-15% of couples worldwide." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 8,
    chapterTitle: "Human Health and Disease",
    introduction: "Zoology helps us understand diseases that affect humans. This chapter explores pathogens, the immune system, and major diseases like AIDS and cancer. Knowledge is power - understanding diseases helps us prevent and fight them!",
    detailedNotes: `# Human Health and Disease (Zoology)

Health is not merely the absence of disease but a state of complete physical, mental, and social well-being. This chapter explores how diseases affect us and how our body defends itself.

## Types of Diseases

**Infectious (Communicable):** Caused by pathogens, can spread
**Non-infectious (Non-communicable):** Cannot spread (diabetes, cancer)

## Common Human Diseases

### Bacterial Diseases

**1. Typhoid (Typhoid Fever)**
- Causative agent: Salmonella typhi
- Transmission: Contaminated food/water
- Symptoms: High fever, weakness, stomach pain
- Prevention: Proper sanitation, Widal test for diagnosis

**2. Pneumonia**
- Causative agents: Streptococcus pneumoniae, Haemophilus influenzae
- Transmission: Droplet infection
- Symptoms: Fever, chills, cough, difficulty breathing
- Alveoli fill with fluid

**💡 Did You Know?**
Pneumonia kills more children under 5 than any other infectious disease worldwide - more than AIDS, malaria, and measles combined!

**3. Malaria** (Protozoan)
- Causative agent: Plasmodium (P. vivax, P. falciparum)
- Vector: Female Anopheles mosquito
- Symptoms: Recurring fever with chills (every 48-72 hours)
- Life cycle: Liver stage → RBC stage → Sexual stage in mosquito

**4. Amoebiasis (Amoebic Dysentery)**
- Causative agent: Entamoeba histolytica
- Transmission: Contaminated food/water
- Symptoms: Abdominal pain, bloody diarrhea

**🔑 Remember This!**
Plasmodium has two hosts: Humans (asexual reproduction) and Mosquitoes (sexual reproduction). The mosquito is the definitive host!

### Viral Diseases

**1. Common Cold**
- Causative agents: Rhinoviruses
- Transmission: Droplet infection
- Symptoms: Nasal congestion, sore throat, sneezing

**2. Dengue**
- Causative agent: Dengue virus
- Vector: Aedes aegypti mosquito
- Symptoms: High fever, severe joint/muscle pain ("breakbone fever")

**3. Chikungunya**
- Causative agent: Chikungunya virus
- Vector: Aedes mosquitoes
- Symptoms: Fever, severe joint pain

### Helminth Diseases

**Ascariasis** - Ascaris (roundworm)
**Filariasis** - Wuchereria (causes elephantiasis)

## The Immune System

### Innate (Non-specific) Immunity
Present from birth, first line of defense

**Components:**
1. **Physical barriers**: Skin, mucous membranes
2. **Physiological barriers**: Stomach acid, lysozyme in tears
3. **Cellular barriers**: Neutrophils, macrophages (phagocytosis)
4. **Inflammatory response**: Redness, swelling, heat, pain

### Acquired (Adaptive) Immunity
Develops after exposure to pathogen

**Features:**
- Specificity (recognizes specific antigens)
- Memory (remembers previous infections)
- Self/non-self discrimination

**⚠️ Common Mistake Alert!**
B-cells make antibodies (humoral immunity), T-cells kill infected cells directly (cell-mediated immunity). Both are needed for complete protection!

### Types of Acquired Immunity

**1. Active Immunity**
Body makes its own antibodies

- **Natural active**: After recovering from infection
- **Artificial active**: Vaccination

**2. Passive Immunity**
Ready-made antibodies given

- **Natural passive**: Mother's antibodies to fetus/infant
- **Artificial passive**: Antivenom, antitoxin injections

### Antibodies (Immunoglobulins)

**Structure:** Y-shaped proteins
- 2 heavy chains + 2 light chains
- Variable region (antigen binding)
- Constant region (effector functions)

**Types:**
- IgG: Most abundant, crosses placenta
- IgA: In secretions (saliva, tears, breast milk)
- IgM: First antibody in response
- IgE: Allergies, parasites
- IgD: B-cell activation

## AIDS (Acquired Immunodeficiency Syndrome)

**Causative agent:** HIV (Human Immunodeficiency Virus)

**Transmission:**
- Unprotected sexual contact
- Sharing needles
- Blood transfusion
- Mother to child (pregnancy, birth, breastfeeding)

**NOT transmitted by:** Casual contact, mosquitoes, sharing food

**Mechanism:**
HIV attacks CD4+ T-helper cells → Immune system weakens → Opportunistic infections

**💡 Did You Know?**
HIV can remain dormant for years. A person can be HIV positive but not have AIDS. AIDS is diagnosed when CD4 count drops below 200 cells/μL.

**Stages:**
1. Acute infection (flu-like symptoms)
2. Latent period (asymptomatic, years)
3. AIDS (opportunistic infections, CD4 < 200)

**Prevention:** Safe sex (condoms), no needle sharing, blood screening, antiretroviral therapy (ART)

## Cancer

**Definition:** Uncontrolled cell division leading to tumors

### Types of Tumors

**Benign:** Non-cancerous, don't spread
**Malignant:** Cancerous, can metastasize (spread)

### Causes (Carcinogens)

1. **Physical**: UV rays, X-rays, radiation
2. **Chemical**: Tobacco, asbestos, dyes
3. **Biological**: Viruses (HPV, Hepatitis B)
4. **Genetic**: Inherited mutations (BRCA1, BRCA2)

### Cancer Treatment

1. **Surgery**: Remove tumor
2. **Radiation therapy**: Kill cancer cells with radiation
3. **Chemotherapy**: Drugs that kill rapidly dividing cells
4. **Immunotherapy**: Boost immune system to fight cancer

## Drugs and Alcohol Abuse

**Opioids**: Heroin, morphine (pain relief, addiction)
**Cannabinoids**: Marijuana (affects cardiovascular, respiratory systems)
**Cocaine**: Stimulant (euphoria, addiction)
**Alcohol**: Depressant (liver damage, addiction)

**Prevention**: Education, counseling, rehabilitation`,
    keyConcepts: JSON.stringify([
      { title: "Malaria Life Cycle", description: "Plasmodium in humans (liver → RBCs, asexual) and mosquitoes (sexual reproduction). Female Anopheles is vector." },
      { title: "Innate vs Acquired Immunity", description: "Innate: present from birth, non-specific. Acquired: develops after exposure, specific, has memory." },
      { title: "Active vs Passive Immunity", description: "Active: body makes antibodies (natural infection or vaccine). Passive: ready-made antibodies given (maternal or injection)." },
      { title: "Antibody Structure", description: "Y-shaped with 2 heavy + 2 light chains. Variable region binds antigen. Types: IgG, IgA, IgM, IgE, IgD." },
      { title: "HIV/AIDS Mechanism", description: "HIV attacks CD4+ T-helper cells, weakening immunity. AIDS diagnosed when CD4 < 200 cells/μL. Transmitted sexually, blood, mother-child." },
      { title: "Cancer Characteristics", description: "Uncontrolled cell division, metastasis. Caused by physical, chemical, biological carcinogens, or genetic factors." },
      { title: "B-cells vs T-cells", description: "B-cells: produce antibodies (humoral immunity). T-cells: kill infected cells directly (cell-mediated immunity)." }
    ]),
    formulas: JSON.stringify([
      { name: "Malaria Fever Pattern", formula: "P. vivax/ovale: 48 hours (Tertian); P. malariae: 72 hours (Quartan)", description: "Recurring fever intervals based on Plasmodium species." },
      { name: "AIDS Diagnosis", formula: "CD4 count < 200 cells/μL", description: "When CD4+ T-cell count drops below this, AIDS is diagnosed." },
      { name: "Antibody Structure", formula: "2 Heavy chains + 2 Light chains = Y-shape", description: "Immunoglobulin structure with variable and constant regions." },
      { name: "Immunity Types", formula: "Innate (non-specific) + Acquired (specific)", description: "Two main divisions of immune system protection." },
      { name: "Vaccination Principle", formula: "Antigen exposure → Memory cells → Faster response on re-exposure", description: "How vaccines provide long-term protection." },
      { name: "HIV Transmission Routes", formula: "Sexual + Blood + Mother-to-child (NOT casual contact)", description: "Only these routes can transmit HIV infection." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 11,
    chapterTitle: "Biotechnology: Principles and Processes",
    introduction: "Zoology and modern biotechnology intersect in fascinating ways! This chapter explores how scientists manipulate DNA - the tools of genetic engineering like restriction enzymes, vectors, PCR, and cloning that have revolutionized medicine and agriculture.",
    detailedNotes: `# Biotechnology: Principles and Processes (Zoology)

Biotechnology uses living organisms or their parts to develop products and processes for human benefit. Modern biotechnology relies on genetic engineering - the direct manipulation of DNA!

## Two Core Techniques

1. **Genetic Engineering**: Altering DNA for desired traits
2. **Bioprocess Engineering**: Large-scale production using bioreactors

## Tools of Genetic Engineering

### 1. Restriction Enzymes (Molecular Scissors)

**Function:** Cut DNA at specific sequences

**💡 Did You Know?**
Bacteria use restriction enzymes as defense against viruses. The name comes from their ability to "restrict" viral growth by cutting viral DNA!

**Types:**
- **Type I**: Cut far from recognition site
- **Type II**: Cut at recognition site (most useful in lab)
- **Type III**: Cut near recognition site

**Key Examples:**
- EcoRI (from E. coli): 5'-GAATTC-3'
- HindIII: 5'-AAGCTT-3'
- BamHI: 5'-GGATCC-3'

**Types of Cuts:**
- **Sticky ends**: Overhanging single-stranded ends (can rejoin easily)
- **Blunt ends**: Straight cuts (harder to rejoin)

**🔑 Remember This!**
EcoRI = E (Escherichia) + co (coli) + R (strain RY13) + I (first enzyme from this strain)

### 2. Cloning Vectors (Molecular Vehicles)

Carry foreign DNA into host cells

**Ideal Vector Properties:**
1. Origin of replication (ori)
2. Selectable marker (antibiotic resistance)
3. Cloning/restriction sites
4. Small size

**Types of Vectors:**
- **Plasmids**: Small circular DNA (pBR322, pUC18)
- **Bacteriophages**: Virus vectors (lambda phage, M13)
- **Cosmids**: Hybrid of plasmid and phage (carry larger DNA)
- **BACs**: Bacterial Artificial Chromosomes
- **YACs**: Yeast Artificial Chromosomes (largest capacity)

### 3. DNA Ligase (Molecular Glue)

Joins DNA fragments by forming phosphodiester bonds

**Process:**
Foreign DNA (cut by EcoRI) + Vector (cut by same enzyme) → DNA ligase → Recombinant DNA

### 4. Host Organisms

Most common: E. coli (easy to grow, well-studied)
Also: Yeast, Plant cells, Animal cells

## Recombinant DNA Technology Steps

**Step 1: Isolation of Genetic Material (DNA)**
- Break cells (enzymes, chemicals, or physical methods)
- Remove proteins, RNA
- Purify DNA (ethanol precipitation)

**⚠️ Common Mistake Alert!**
DNA precipitates in ethanol (becomes visible as white threads), not dissolves! This allows you to spool it out with a glass rod.

**Step 2: Cutting with Restriction Enzymes**
- Same enzyme cuts both insert and vector
- Creates compatible sticky ends

**Step 3: Amplification - PCR**

**Polymerase Chain Reaction (PCR)** - Revolutionary technique!

**Components needed:**
1. Template DNA
2. Two primers (forward and reverse)
3. Taq DNA polymerase (heat-stable)
4. dNTPs (A, T, G, C nucleotides)
5. Buffer with Mg²⁺

**Three Steps (repeated 25-35 cycles):**
1. **Denaturation** (94-98°C): DNA strands separate
2. **Annealing** (50-65°C): Primers bind to template
3. **Extension** (72°C): Taq polymerase copies DNA

**💡 Did You Know?**
PCR can make over 1 billion copies of a DNA segment in just 30 cycles! Each cycle doubles the DNA, so 2^30 ≈ 1 billion!

**Step 4: Ligation**
- Insert + Vector joined by DNA ligase
- Creates recombinant DNA

**Step 5: Transformation**
Introducing recombinant DNA into host

**Methods:**
- **Heat shock**: Brief exposure to 42°C
- **Electroporation**: Electric pulses make pores
- **Gene gun**: DNA-coated particles shot into cells
- **Microinjection**: Direct injection into nucleus

**Step 6: Selection of Recombinants**

**Insertional Inactivation:**
- Insert gene disrupts marker gene
- Blue-white screening: Insert disrupts lacZ gene
- Recombinants: White colonies (lacZ inactive)
- Non-recombinants: Blue colonies (lacZ active)

## Bioreactors

Large vessels for growing organisms on industrial scale

**Features:**
- Optimal temperature, pH, aeration
- Stirrer for mixing
- Foam control
- Sampling port

**Types:**
1. **Simple stirred-tank**: Mechanical agitation
2. **Sparged stirred-tank**: Air bubbles for mixing

## Downstream Processing

**After production in bioreactor:**
1. Separation and purification
2. Formulation (stable product)
3. Quality testing
4. Packaging`,
    keyConcepts: JSON.stringify([
      { title: "Restriction Enzymes", description: "Molecular scissors that cut DNA at specific palindromic sequences. Type II most useful. Example: EcoRI cuts GAATTC creating sticky ends." },
      { title: "Cloning Vectors", description: "DNA vehicles carrying foreign genes into hosts. Need ori, selectable marker, cloning sites. Types: plasmids, phages, cosmids, BACs, YACs." },
      { title: "PCR Components", description: "Template DNA + Primers + Taq polymerase + dNTPs + Buffer. Three steps: Denaturation → Annealing → Extension, repeated 25-35 cycles." },
      { title: "rDNA Technology Steps", description: "DNA isolation → Cutting (restriction enzymes) → Amplification (PCR) → Ligation (DNA ligase) → Transformation → Selection." },
      { title: "Transformation Methods", description: "Heat shock (42°C), Electroporation (electric pulses), Gene gun (particles), Microinjection. Introduce DNA into host cells." },
      { title: "Selection of Recombinants", description: "Blue-white screening using lacZ gene. Recombinants are white (insert disrupts lacZ), non-recombinants are blue." },
      { title: "Bioreactors", description: "Large vessels for industrial-scale production. Control temperature, pH, oxygen, mixing for optimal organism growth." }
    ]),
    formulas: JSON.stringify([
      { name: "PCR Amplification", formula: "2^n copies (n = number of cycles)", description: "30 cycles produce about 1 billion copies of target DNA." },
      { name: "Restriction Enzyme Naming", formula: "Genus + species + strain + number (e.g., EcoRI)", description: "Names derived from bacterial source of the enzyme." },
      { name: "EcoRI Recognition Sequence", formula: "5'-GAATTC-3' / 3'-CTTAAG-5'", description: "Palindromic sequence cut by EcoRI, creating sticky ends." },
      { name: "PCR Temperature Cycle", formula: "Denaturation (94°C) → Annealing (50-65°C) → Extension (72°C)", description: "Three temperature steps per PCR cycle." },
      { name: "Vector Requirements", formula: "ori + Selectable marker + Cloning sites + Small size", description: "Essential features for an effective cloning vector." },
      { name: "DNA Precipitation", formula: "Chilled ethanol precipitates DNA", description: "DNA becomes visible as white strands for isolation." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 12,
    chapterTitle: "Biotechnology and its Applications",
    introduction: "Zoology benefits greatly from biotechnology applications! This chapter explores how genetic engineering creates medicines like insulin, improves crops (GMOs), enables gene therapy, and raises important ethical questions about modifying life.",
    detailedNotes: `# Biotechnology and its Applications (Zoology)

Biotechnology has revolutionized medicine, agriculture, and industry. From life-saving medicines to disease-resistant crops, the applications are transforming our world!

## Applications in Medicine

### 1. Recombinant Therapeutics

**Human Insulin (Humulin)**

**💡 Did You Know?**
Before genetic engineering, insulin came from pig and cow pancreas. A diabetic patient needed insulin from 50 animals per year! Now bacteria produce unlimited human insulin!

**Production:**
1. Human insulin gene isolated
2. Inserted into E. coli plasmid
3. Bacteria produce proinsulin
4. Processed to active insulin

**Challenge:** Insulin has two polypeptide chains (A and B)
**Solution:** Produce A and B chains separately, then combine

**Other Recombinant Products:**
- Human Growth Hormone (hGH)
- Blood clotting factors (Factor VIII for hemophilia)
- Erythropoietin (EPO - treats anemia)
- Interferons (antiviral, anticancer)

### 2. Gene Therapy

**Definition:** Correcting genetic defects by inserting functional genes

**Types:**
- **Somatic gene therapy**: Non-reproductive cells (not inherited)
- **Germ-line gene therapy**: Reproductive cells (heritable, controversial)

**🔑 Remember This!**
The first successful gene therapy was for ADA (Adenosine Deaminase) deficiency in 1990. The girl's white blood cells were corrected outside her body and reinfused!

**ADA Deficiency Treatment:**
1. Lymphocytes extracted from patient
2. Functional ADA gene introduced
3. Modified cells returned to patient
4. Treatment must be repeated (cells die)

**Permanent cure:** Gene therapy into bone marrow stem cells

### 3. Molecular Diagnostics

**PCR-based Detection:**
- Detect pathogens with very few cells
- Early detection of HIV, Hepatitis, TB

**ELISA (Enzyme-Linked Immunosorbent Assay):**
- Detects antibodies or antigens
- Used for HIV testing, pregnancy tests

**DNA Probes:**
- Labeled DNA that binds to specific sequences
- Detect genetic diseases, pathogens

## Applications in Agriculture

### Transgenic Crops (GMOs)

**Goals:**
1. Pest resistance
2. Herbicide tolerance
3. Improved nutrition
4. Stress tolerance

### Bt Crops (Pest Resistant)

**Bacillus thuringiensis (Bt)** produces cry proteins toxic to insects

**How it works:**
1. Bt gene inserted into crop
2. Plant produces Bt toxin (Cry protein)
3. Insects eat plant, toxin activates in gut
4. Insect dies, plant protected!

**⚠️ Common Mistake Alert!**
Bt toxin is safe for humans because it only becomes active in alkaline insect gut (pH 9). Human gut is acidic (pH 2), so the toxin remains inactive!

**Bt Cotton in India:**
- Contains Cry1Ac and Cry2Ab genes
- Resistant to bollworm (major pest)
- Reduces pesticide use by 50%

**Bt Brinjal:**
- Resistant to fruit and shoot borer
- Approved but controversial

### Herbicide-Tolerant Crops

**Roundup Ready Crops:**
- Contain gene for glyphosate tolerance
- Farmers can spray herbicide to kill weeds
- Crop survives

### Golden Rice (Vitamin A Enhanced)

- Contains genes for beta-carotene synthesis
- Addresses Vitamin A deficiency
- Rice grains are golden yellow

### Flavr Savr Tomato

- First commercially grown GM food (1994)
- Delayed ripening gene
- Longer shelf life

## RNA Interference (RNAi)

**Silencing genes using dsRNA**

**Process:**
1. dsRNA introduced
2. Dicer enzyme cuts it into siRNA
3. siRNA binds to mRNA
4. mRNA destroyed → Gene silenced

**Application - Nematode Resistant Tobacco:**
- Nematode infection genes silenced
- Nematodes can't complete life cycle

## Biopiracy and Ethical Issues

### Biopiracy

Using biological resources of developing nations without proper authorization

**Examples in India:**
- **Neem**: Patented by US company (challenged)
- **Turmeric**: Wound healing patent (revoked)
- **Basmati rice**: Patented (challenged)

**💡 Did You Know?**
India's Traditional Knowledge Digital Library (TKDL) documents traditional knowledge to prevent biopiracy. It has prevented over 200 patent applications!

### Bioethics

**Ethical Concerns:**
1. Environmental safety of GMOs
2. Unknown long-term effects
3. Corporate control of food supply
4. Playing God with life
5. Genetic discrimination

### Biosafety

**Regulations:**
- Cartagena Protocol (international)
- GEAC (Genetic Engineering Appraisal Committee) in India
- Testing before release

## Intellectual Property Rights (IPR)

**Patents:** Protect inventions, including GM organisms
**TRIPS Agreement:** Trade-Related Intellectual Property Rights
**Challenges:** Balancing innovation with access to medicines`,
    keyConcepts: JSON.stringify([
      { title: "Recombinant Insulin", description: "Human insulin produced in E. coli. A and B chains made separately and combined. First recombinant therapeutic (1982)." },
      { title: "Gene Therapy", description: "Correcting genetic defects by inserting functional genes. Somatic (not inherited) vs Germline (heritable). First success: ADA deficiency." },
      { title: "Bt Crops", description: "Contain Bt toxin genes from Bacillus thuringiensis. Cry proteins toxic to insects but safe for humans. Examples: Bt cotton, Bt brinjal." },
      { title: "Golden Rice", description: "GM rice with beta-carotene genes for Vitamin A production. Addresses deficiency in rice-dependent populations." },
      { title: "RNA Interference (RNAi)", description: "Gene silencing using dsRNA. Dicer cuts dsRNA → siRNA binds mRNA → mRNA destroyed. Used for pest resistance." },
      { title: "Biopiracy", description: "Unauthorized use of traditional knowledge. Examples: Neem, Turmeric, Basmati patents challenged. TKDL protects India's knowledge." },
      { title: "Biosafety Regulations", description: "GEAC in India approves GMOs. Cartagena Protocol for international biosafety. Testing required before release." }
    ]),
    formulas: JSON.stringify([
      { name: "Bt Toxin Activation", formula: "Alkaline gut (pH 9-10) activates Cry protein", description: "Why Bt toxin kills insects but is safe for humans (acidic gut)." },
      { name: "Insulin Chains", formula: "A chain (21 amino acids) + B chain (30 amino acids)", description: "Two polypeptide chains of human insulin connected by disulfide bonds." },
      { name: "RNAi Pathway", formula: "dsRNA → Dicer → siRNA → RISC → mRNA degradation", description: "Steps in RNA interference gene silencing mechanism." },
      { name: "Golden Rice Genes", formula: "psy (phytoene synthase) + crtI (carotene desaturase)", description: "Two genes introduced for beta-carotene synthesis pathway." },
      { name: "ADA Gene Therapy", formula: "Patient's lymphocytes + ADA gene → Corrected cells returned", description: "Ex vivo gene therapy procedure for ADA deficiency." },
      { name: "GEAC Full Form", formula: "Genetic Engineering Appraisal Committee", description: "Indian regulatory body for GMO approval and monitoring." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 7,
    chapterTitle: "Evolution",
    introduction: "Zoology traces the origins and evolution of animal life. This chapter explores how life began, Darwin's theory of natural selection, evidence for evolution, and the fascinating story of human evolution from ancient primates to modern Homo sapiens.",
    detailedNotes: `# Evolution (Zoology)

Evolution is the gradual change in living organisms over generations. It explains the diversity of life on Earth and connects all living things through common ancestry!

## Origin of Life

### Early Earth Conditions (4.5 billion years ago)
- No oxygen (reducing atmosphere)
- Atmosphere: CH₄, NH₃, H₂O vapor, H₂
- High temperature, volcanic activity
- No ozone layer (UV radiation reached surface)

### Theories of Origin of Life

**1. Abiogenesis (Spontaneous Generation)** - Disproved

**2. Biogenesis** - Life from pre-existing life (Pasteur's experiments)

**3. Oparin-Haldane Hypothesis (Chemical Evolution)**
- Organic molecules formed from inorganic
- Primitive ocean = "Primordial soup"
- Complex molecules formed over time

**💡 Did You Know?**
Stanley Miller and Harold Urey tested this in 1953! They created early Earth conditions in a flask and produced amino acids - the building blocks of life - in just a week!

**Miller-Urey Experiment:**
- Mixture: CH₄, NH₃, H₂O, H₂
- Energy: Electric sparks (simulating lightning)
- Result: Amino acids formed!

**4. RNA World Hypothesis**
- RNA was first self-replicating molecule
- RNA can store information AND catalyze reactions

## Darwin's Theory of Evolution

### Observations:
1. Organisms produce more offspring than survive
2. Populations remain relatively stable
3. Resources are limited
4. Individuals vary within populations
5. Variations are heritable

### Conclusions:
1. **Struggle for existence**: Competition for resources
2. **Survival of the fittest**: Best adapted survive
3. **Natural selection**: Nature selects beneficial traits
4. **Descent with modification**: Species change over time

**🔑 Remember This!**
"Survival of the fittest" doesn't mean strongest - it means best adapted to the environment! A slow sloth is perfectly "fit" for its lifestyle!

### Natural Selection Evidence

**Industrial Melanism:**
- Peppered moths in England
- Before industrialization: Light moths common
- After pollution: Dark moths became common
- Trees darkened by soot → Dark moths camouflaged

## Evidences of Evolution

### 1. Paleontological (Fossil) Evidence
- Fossils show gradual changes
- Transitional forms (Archaeopteryx: dinosaur-bird)
- Age determined by radioactive dating

**⚠️ Common Mistake Alert!**
Fossils are rare! Organisms must be buried quickly and preserved. Most organisms decompose without leaving fossils.

### 2. Comparative Anatomy

**Homologous Organs:**
- Same structure, different function
- Indicate common ancestry
- Example: Forelimbs of humans, whales, bats

**Analogous Organs:**
- Different structure, same function
- Convergent evolution
- Example: Wings of insects and birds

**Vestigial Organs:**
- Reduced, non-functional structures
- Evidence of ancestry
- Examples: Human appendix, wisdom teeth, tailbone

### 3. Embryological Evidence
- Embryos of different vertebrates look similar
- Gill slits in human embryo
- Suggests common ancestry

### 4. Molecular Evidence
- Similar DNA sequences = Close relationship
- Genetic code is universal
- Cytochrome c similarities across species

## Hardy-Weinberg Principle

**Allele Frequencies in Population**

Conditions for equilibrium (no evolution):
1. Large population
2. Random mating
3. No mutations
4. No migration
5. No natural selection

**Equation:**
p² + 2pq + q² = 1
(AA) + (Aa) + (aa) = 1

Where p + q = 1 (p = frequency of dominant allele, q = frequency of recessive allele)

**💡 Did You Know?**
If Hardy-Weinberg conditions are NOT met, evolution is happening! The equation helps scientists detect evolutionary changes in populations.

## Human Evolution

### Timeline (approximate):

**15 mya**: Dryopithecus (ape-like ancestors)
**5-8 mya**: Divergence of human and chimpanzee lineages
**4 mya**: Australopithecus (first bipedal)
**2 mya**: Homo habilis (tool maker)
**1.8 mya**: Homo erectus (fire, larger brain)
**300,000 ya**: Homo sapiens (modern humans)

### Key Milestones

**Bipedalism (Walking Upright):**
- First major adaptation
- Freed hands for tools
- Australopithecus

**Brain Enlargement:**
- Homo habilis: 650-800 cc
- Homo erectus: 900-1100 cc
- Homo sapiens: 1200-1500 cc

**Tool Use:**
- Stone tools (2.5 mya)
- Fire use (1 mya)
- Agriculture (10,000 ya)

**Language and Culture:**
- Abstract thinking
- Art, music, religion
- Complex societies

### Hominid Comparisons

| Species | Brain Size | Features |
|---------|------------|----------|
| Australopithecus | 450 cc | Bipedal, small brain |
| Homo habilis | 650-800 cc | First toolmaker |
| Homo erectus | 900-1100 cc | Fire, hunting |
| Neanderthals | 1400 cc | Europe, cold-adapted |
| Homo sapiens | 1300-1400 cc | Language, culture |`,
    keyConcepts: JSON.stringify([
      { title: "Chemical Evolution", description: "Oparin-Haldane hypothesis: organic molecules from inorganic in primordial soup. Miller-Urey experiment produced amino acids." },
      { title: "Natural Selection", description: "Darwin's mechanism of evolution. Variation + Competition + Selection → Adaptation. Survival of the fittest (best adapted)." },
      { title: "Homologous Organs", description: "Same structure, different function (divergent evolution). Example: forelimbs of mammals. Evidence of common ancestry." },
      { title: "Analogous Organs", description: "Different structure, same function (convergent evolution). Example: wings of insects and birds. Not evidence of common ancestry." },
      { title: "Hardy-Weinberg Equilibrium", description: "p² + 2pq + q² = 1. Conditions: large population, random mating, no mutation/migration/selection. Deviation indicates evolution." },
      { title: "Human Evolution", description: "Australopithecus (bipedal) → Homo habilis (tools) → Homo erectus (fire) → Homo sapiens (language, culture). Brain size increased." },
      { title: "Molecular Evidence", description: "DNA sequence similarities indicate evolutionary relationships. Universal genetic code supports common ancestry." }
    ]),
    formulas: JSON.stringify([
      { name: "Hardy-Weinberg Equation", formula: "p² + 2pq + q² = 1 where p + q = 1", description: "Allele frequencies in non-evolving population. p = dominant, q = recessive allele frequency." },
      { name: "Miller-Urey Conditions", formula: "CH₄ + NH₃ + H₂O + H₂ + energy → Amino acids", description: "Simulated early Earth conditions produced building blocks of life." },
      { name: "Human Brain Evolution", formula: "450 cc (Australopithecus) → 1400 cc (Homo sapiens)", description: "Approximate brain size increase during human evolution." },
      { name: "Divergence Time", formula: "Human-Chimp split: 5-8 million years ago", description: "When human and chimpanzee lineages diverged from common ancestor." },
      { name: "Radioactive Dating", formula: "Half-life decay to determine fossil age", description: "Carbon-14 for recent fossils, Potassium-Argon for older ones." },
      { name: "Natural Selection Formula", formula: "Variation + Competition + Selection = Adaptation", description: "Darwin's mechanism for evolutionary change." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Biology",
    classLevel: "11",
    chapterNumber: 22,
    chapterTitle: "Chemical Coordination and Integration",
    introduction: "Zoology reveals how hormones control body functions! This chapter explores the endocrine system - the glands that produce hormones, how hormones work, and what happens when the system goes wrong. From growth to metabolism, hormones regulate it all!",
    detailedNotes: `# Chemical Coordination and Integration (Zoology)

While the nervous system provides quick, short-lived responses, the endocrine system provides slow, long-lasting coordination through chemical messengers called hormones!

## Endocrine System Overview

**Endocrine glands:** Ductless, secrete hormones directly into blood
**Exocrine glands:** Have ducts (sweat, salivary, digestive glands)

**💡 Did You Know?**
The word "hormone" comes from Greek "hormon" meaning "to excite or stir up." Hormones literally stir up activity in target organs!

## Major Endocrine Glands

### 1. Hypothalamus (Master Control)

**Location:** Base of brain, above pituitary

**Functions:**
- Links nervous and endocrine systems
- Controls pituitary gland
- Releases releasing/inhibiting hormones

**Hormones:**
- GnRH (Gonadotropin Releasing Hormone)
- TRH (Thyrotropin Releasing Hormone)
- GHRH (Growth Hormone Releasing Hormone)
- CRH (Corticotropin Releasing Hormone)
- Somatostatin (inhibits growth hormone)

### 2. Pituitary Gland (Master Gland)

**Location:** Below hypothalamus in sella turcica

**Two lobes:**

**Anterior Pituitary (Adenohypophysis):**
| Hormone | Target | Function |
|---------|--------|----------|
| GH | All cells | Growth |
| TSH | Thyroid | Stimulates T3/T4 release |
| ACTH | Adrenal cortex | Stimulates cortisol release |
| FSH | Gonads | Gamete production |
| LH | Gonads | Sex hormone production |
| Prolactin | Mammary glands | Milk production |

**🔑 Remember This!**
"FLAT PiG" - FSH, LH, ACTH, TSH, Prolactin, GH (Anterior pituitary hormones)

**Posterior Pituitary (Neurohypophysis):**
- Oxytocin: Uterine contraction, milk ejection
- ADH (Vasopressin): Water reabsorption in kidney

### 3. Thyroid Gland

**Location:** Neck, below larynx

**Hormones:**
- T3 (Triiodothyronine) and T4 (Thyroxine)
- Calcitonin

**Functions of T3/T4:**
- Increase metabolic rate
- Essential for growth and development
- Brain development in fetus

**Calcitonin:** Lowers blood calcium (deposits in bones)

**Disorders:**
- **Hypothyroidism:** Low T3/T4 → Fatigue, weight gain
- **Cretinism:** Childhood hypothyroidism → Mental retardation
- **Myxedema:** Adult hypothyroidism
- **Goiter:** Enlarged thyroid (iodine deficiency)
- **Hyperthyroidism:** Excess T3/T4 → Weight loss, anxiety
- **Graves' disease:** Autoimmune hyperthyroidism

**⚠️ Common Mistake Alert!**
Goiter can be caused by BOTH too little iodine (can't make hormones) AND too much thyroid activity (gland overworked). The cause matters for treatment!

### 4. Parathyroid Gland

**Location:** Behind thyroid (4 small glands)

**Hormone:** PTH (Parathyroid Hormone)

**Function:** Raises blood calcium
- Stimulates bone resorption
- Increases Ca²⁺ absorption in gut
- Increases Ca²⁺ reabsorption in kidney

**Calcitonin vs PTH:** Opposite effects on blood calcium!

### 5. Adrenal Glands

**Location:** Above kidneys ("ad-renal" = near kidney)

**Two parts:**

**Adrenal Cortex (outer):**
- Mineralocorticoids (Aldosterone): Na⁺ retention, K⁺ excretion
- Glucocorticoids (Cortisol): Stress response, glucose metabolism
- Sex steroids: Small amounts

**Adrenal Medulla (inner):**
- Adrenaline (Epinephrine): Fight or flight
- Noradrenaline (Norepinephrine): Similar effects

**💡 Did You Know?**
Adrenaline can increase heart rate to 180+ bpm, dilate pupils, redirect blood to muscles, and provide surge of energy - all in seconds! It's your body's emergency response system.

**Disorders:**
- **Addison's disease:** Low cortisol, aldosterone
- **Cushing's syndrome:** Excess cortisol

### 6. Pancreas (Mixed Gland)

**Location:** Below stomach

**Islets of Langerhans:**
- Alpha cells: Glucagon (raises blood sugar)
- Beta cells: Insulin (lowers blood sugar)
- Delta cells: Somatostatin

**Insulin:** 
- Promotes glucose uptake by cells
- Converts glucose to glycogen
- Promotes fat and protein synthesis

**Glucagon:**
- Stimulates glycogenolysis
- Raises blood glucose

**Diabetes Mellitus:**
- Type 1: Insulin deficiency (beta cell destruction)
- Type 2: Insulin resistance

### 7. Gonads

**Testes:** Testosterone (male characteristics, sperm production)
**Ovaries:** Estrogen, Progesterone (female characteristics, menstrual cycle)

### 8. Pineal Gland

**Melatonin:** Regulates sleep-wake cycle (circadian rhythm)

### 9. Thymus

**Thymosin:** T-cell development (immunity)

## Hormone Action Mechanisms

**1. Steroid hormones:** Enter cell, bind nuclear receptor, affect gene expression
**2. Peptide hormones:** Bind surface receptor, second messenger (cAMP), cellular response`,
    keyConcepts: JSON.stringify([
      { title: "Hypothalamus-Pituitary Axis", description: "Hypothalamus releases hormones controlling pituitary. Pituitary controls other glands. Negative feedback maintains balance." },
      { title: "Anterior Pituitary Hormones", description: "GH (growth), TSH (thyroid), ACTH (adrenal), FSH & LH (gonads), Prolactin (milk). Remember: FLAT PiG." },
      { title: "Thyroid Functions", description: "T3/T4 regulate metabolism, growth, development. Calcitonin lowers blood calcium. Iodine required for hormone synthesis." },
      { title: "Calcium Regulation", description: "PTH raises calcium (bone resorption). Calcitonin lowers calcium (bone deposition). Opposite effects maintain balance." },
      { title: "Adrenal Hormones", description: "Cortex: Aldosterone (salt balance), Cortisol (stress, glucose). Medulla: Adrenaline/Noradrenaline (fight or flight)." },
      { title: "Blood Sugar Regulation", description: "Insulin (from beta cells) lowers blood glucose. Glucagon (from alpha cells) raises blood glucose. Diabetes: insulin problem." },
      { title: "Hormone Mechanisms", description: "Steroids: enter cell, nuclear receptor. Peptides: surface receptor, second messengers (cAMP). Different pathways for action." }
    ]),
    formulas: JSON.stringify([
      { name: "Anterior Pituitary Hormones", formula: "FLAT PiG: FSH, LH, ACTH, TSH, Prolactin, GH", description: "Memory aid for anterior pituitary hormone names." },
      { name: "Calcium Balance", formula: "PTH ↑ blood Ca²⁺ | Calcitonin ↓ blood Ca²⁺", description: "Opposite effects maintain calcium homeostasis." },
      { name: "Blood Glucose", formula: "Insulin ↓ blood glucose | Glucagon ↑ blood glucose", description: "Pancreatic hormones maintain blood sugar balance." },
      { name: "Thyroid Hormones", formula: "T3 (active) and T4 (prohormone) - require iodine", description: "T4 converted to T3 in tissues. Both regulate metabolism." },
      { name: "Diabetes Types", formula: "Type 1: No insulin | Type 2: Insulin resistance", description: "Different causes require different treatments." },
      { name: "Adrenal Layers", formula: "Cortex (outside): steroids | Medulla (inside): catecholamines", description: "Anatomical arrangement of adrenal gland hormone production." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Biology",
    classLevel: "12",
    chapterNumber: 10,
    chapterTitle: "Microbes in Human Welfare",
    introduction: "Zoology and microbiology intersect in this chapter on beneficial microorganisms. From fermented foods to antibiotics, biogas to biofertilizers, microbes play vital roles in human welfare. These tiny organisms are our powerful allies!",
    detailedNotes: `# Microbes in Human Welfare (Zoology)

Microorganisms are not just disease-causing agents - many are incredibly beneficial! They help us make food, medicines, fuel, and even clean up pollution. Let's explore the good side of microbes!

## Microbes in Household Products

### Fermented Foods

**Curd from Milk**
- Bacteria: Lactobacillus
- Converts lactose to lactic acid
- Acid coagulates milk protein (casein)
- Also increases vitamin B12

**💡 Did You Know?**
A small amount of curd can convert liters of milk into curd because the bacteria multiply rapidly! This is why we add a "starter" to begin fermentation.

**Bread Making**
- Yeast: Saccharomyces cerevisiae (Baker's yeast)
- Ferments sugar, produces CO₂
- CO₂ bubbles make bread rise (fluffy texture)

**Toddy (Palm Wine)**
- Fermented palm sap
- Natural yeast from palm bark

**Idli, Dosa**
- Rice and urad dal batter
- Fermented by Leuconostoc, yeasts
- CO₂ makes batter fluffy

**Cheese**
- Different microbes = different cheeses
- Swiss cheese: Propionibacterium (makes holes!)
- Roquefort: Penicillium roqueforti (blue veins)

**🔑 Remember This!**
Fermentation = Anaerobic breakdown of sugars by microbes. Different products (alcohol, lactic acid, CO₂) depending on the microbe!

## Microbes in Industrial Products

### Antibiotics

**Alexander Fleming (1928):**
- Discovered Penicillin from Penicillium notatum
- Nobel Prize in 1945
- Saved millions of lives!

**Other Antibiotics:**
| Antibiotic | Source | Target |
|------------|--------|--------|
| Streptomycin | Streptomyces griseus | TB, bacteria |
| Tetracycline | Streptomyces aureofaciens | Broad spectrum |
| Chloramphenicol | Streptomyces venezuelae | Typhoid |
| Erythromycin | Streptomyces erythraeus | Respiratory infections |

**⚠️ Common Mistake Alert!**
Antibiotics only work against bacteria, not viruses! Taking antibiotics for viral infections (cold, flu) is useless and contributes to antibiotic resistance.

### Organic Acids

- **Citric acid**: Aspergillus niger (soft drinks, food)
- **Acetic acid**: Acetobacter aceti (vinegar)
- **Butyric acid**: Clostridium butylicum
- **Lactic acid**: Lactobacillus (food, cosmetics)

### Alcoholic Beverages

| Beverage | Starting Material | Microbe |
|----------|-------------------|---------|
| Beer | Malted cereals | Saccharomyces cerevisiae |
| Wine | Grape juice | Saccharomyces ellipsoideus |
| Whiskey | Grain mash | Yeast |
| Rum | Molasses | Yeast |

**Ethanol Production:**
C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂
(Glucose → Ethanol + Carbon dioxide)

### Enzymes

- **Lipases**: Detergents (fat removal)
- **Pectinases**: Clarifying fruit juices
- **Proteases**: Tenderizing meat, cleaning contacts
- **Amylases**: Starch processing

### Vitamins

- **B12**: Propionibacterium
- **Riboflavin (B2)**: Ashbya gossypii

## Microbes in Sewage Treatment

**Primary Treatment:**
- Physical removal of solids
- Screening, sedimentation

**Secondary Treatment (Biological):**
- Aerobic microbes digest organic matter
- BOD reduced significantly

**💡 Did You Know?**
The "activated sludge" in sewage treatment is teeming with bacteria that eat organic waste! They're like an army of tiny garbage processors.

**Process:**
1. Sewage enters aeration tanks
2. Microbes digest organic matter
3. Flocs (clumps of bacteria) form
4. Sludge settles, water clarified
5. Sludge recycled as inoculum

**Anaerobic Sludge Digestion:**
- Produces biogas (methane + CO₂)
- Reduces sludge volume
- Biogas used for heating

## Biogas Production

**Biogas Composition:**
- Methane (CH₄): 50-70%
- Carbon dioxide (CO₂): 30-40%
- Other gases: H₂S, N₂

**Methanogens (bacteria):**
- Methanobacterium
- Strict anaerobes
- Found in cattle gut (cow dung rich in methanogens)

**Biogas Plant:**
1. Mixing tank (slurry of cow dung + water)
2. Digester (anaerobic, methanogens work)
3. Gas holder (collects biogas)
4. Outlet for spent slurry (fertilizer)

## Microbes as Biocontrol Agents

**Instead of chemical pesticides:**

**Bacillus thuringiensis (Bt):**
- Produces toxin lethal to insects
- Safe for humans and animals
- Used as biopesticide

**Trichoderma:**
- Fungus that attacks plant pathogens
- Protects roots

**Baculoviruses:**
- Kill insects without harming other organisms
- Species-specific

**Ladybugs:**
- Eat aphids (biological control)

**🔑 Remember This!**
Biocontrol = Using living organisms to control pests. It's more environmentally friendly than chemical pesticides!

## Microbes as Biofertilizers

**Nitrogen Fixers:**
- **Rhizobium**: Symbiotic (in legume root nodules)
- **Azotobacter**: Free-living, aerobic
- **Azospirillum**: Associative symbiosis with grasses
- **Cyanobacteria**: Anabaena, Nostoc (fix N₂ + photosynthesis)

**Mycorrhiza:**
- Fungi associated with plant roots
- Help absorb phosphorus and water
- Example: Glomus

**Phosphate Solubilizers:**
- Release phosphorus from insoluble compounds

**Benefits:**
- Reduce chemical fertilizer use
- Improve soil health
- Sustainable agriculture`,
    keyConcepts: JSON.stringify([
      { title: "Fermentation", description: "Anaerobic microbial process. Lactobacillus makes curd. Yeast makes bread rise and alcohol. Different products from different microbes." },
      { title: "Antibiotics", description: "Penicillin from Penicillium (Fleming, 1928). Most from Streptomyces. Only work against bacteria, not viruses." },
      { title: "Sewage Treatment", description: "Primary (physical), Secondary (biological - aerobic microbes reduce BOD), Anaerobic digestion produces biogas." },
      { title: "Biogas Production", description: "Methanogens (like Methanobacterium) convert organic waste to methane (50-70%) + CO₂. Cow dung is rich source." },
      { title: "Biocontrol Agents", description: "Bt bacteria (insecticide), Trichoderma (fungal pathogen control), Baculoviruses (specific to insect pests). Eco-friendly pest control." },
      { title: "Biofertilizers", description: "Rhizobium (nitrogen fixation in legumes), Azotobacter (free-living), Mycorrhiza (phosphorus absorption). Sustainable agriculture." },
      { title: "Industrial Microbe Uses", description: "Organic acids (citric from Aspergillus), Enzymes (lipases, proteases), Vitamins (B12 from bacteria). Wide applications." }
    ]),
    formulas: JSON.stringify([
      { name: "Alcoholic Fermentation", formula: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂", description: "Glucose converted to ethanol and carbon dioxide by yeast." },
      { name: "Biogas Composition", formula: "CH₄ (50-70%) + CO₂ (30-40%) + traces (H₂S, N₂)", description: "Methane is the fuel component of biogas." },
      { name: "Nitrogen Fixation", formula: "N₂ + 8H⁺ + 8e⁻ + 16ATP → 2NH₃ + H₂ + 16ADP", description: "Enzyme nitrogenase converts atmospheric nitrogen to ammonia." },
      { name: "Lactic Acid Fermentation", formula: "C₆H₁₂O₆ → 2CH₃CHOHCOOH", description: "Glucose to lactic acid by Lactobacillus (curd making)." },
      { name: "BOD Reduction", formula: "High BOD (sewage) → Low BOD (treated water)", description: "Biological Oxygen Demand reduced by microbial action in treatment." },
      { name: "Penicillin Discovery", formula: "1928 - Fleming - Penicillium notatum", description: "First antibiotic discovered from fungal contamination of bacterial plate." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 100
  }
];

export async function seedZoology() {
  console.log("Seeding Zoology chapters (Class 11 & Class 12)...");
  
  for (const chapter of zoologyChapters) {
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
  
  console.log("Zoology seeding complete! (8 Class 11 + 8 Class 12 chapters)");
}
