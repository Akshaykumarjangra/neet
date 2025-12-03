import { db } from "../db";
import { chapterContent } from "../../shared/schema";

async function seedBiologyChapter7() {
  console.log("Seeding Biology Class 11 Chapter 7: Structural Organisation in Animals...");

  await db
    .insert(chapterContent)
    .values({
      subject: "Biology",
      classLevel: "11",
      chapterNumber: 7,
      chapterTitle: "Structural Organisation in Animals",
      introduction:
        "The study of animal structure reveals the remarkable complexity and organization that enables animals to perform diverse functions. Unlike plants, animals exhibit active movement, rapid responses to stimuli, and complex organ systems for digestion, circulation, respiration, and coordination. Understanding animal tissue organization and anatomy is fundamental to comprehending how animal bodies function and adapt to their environment. This chapter explores the four basic types of animal tissues - epithelial, connective, muscular, and nervous - and examines the anatomy of a frog (Rana tigrina) as a representative vertebrate. The frog serves as an excellent model organism for studying vertebrate anatomy because it exhibits characteristics of both aquatic and terrestrial life, making it invaluable for understanding amphibian adaptations and the general organization of vertebrate organ systems.",

      detailedNotes: `
# Structural Organisation in Animals

## Levels of Organization in Animals

Animals exhibit hierarchical levels of organization from simple to complex:

1. **Cellular level**: Cells function independently (Porifera)
2. **Tissue level**: Similar cells group to form tissues (Coelenterata)
3. **Organ level**: Tissues combine to form organs (Platyhelminthes)
4. **Organ system level**: Organs work together in systems (Annelida onwards)
5. **Organism level**: Complete individual organism

## Animal Tissues

A tissue is a group of similar cells along with intercellular substances performing a specific function.

### 1. Epithelial Tissue

Epithelial tissues cover body surfaces, line body cavities, and form glands.

**General Characteristics:**
- Cells tightly packed with little intercellular material
- Rest on **basement membrane** (non-cellular)
- Avascular (no blood vessels) - nourished by diffusion
- High regeneration capacity
- Form protective barrier
- **Free surface** exposed to external environment or body cavity
- **Basal surface** attached to basement membrane

**Functions:**
- Protection (skin)
- Absorption (intestine)
- Secretion (glands)
- Sensation (sensory receptors)
- Excretion (kidney tubules)

**Classification:**

**A. Based on Number of Cell Layers:**

**1. Simple Epithelium** (Single layer)

- **Simple squamous epithelium**
  - Flattened, plate-like cells
  - Thin for easy diffusion
  - Location: Blood vessels (endothelium), air sacs of lungs (alveoli), Bowman's capsule of kidney
  - Function: Diffusion and filtration

- **Simple cuboidal epithelium**
  - Cube-shaped cells
  - Location: Kidney tubules, salivary glands, thyroid follicles
  - Function: Secretion and absorption

- **Simple columnar epithelium**
  - Tall, pillar-like cells
  - Nucleus at base
  - May have microvilli (brush border) or cilia
  - Location: Stomach, intestine (with microvilli), fallopian tubes (ciliated)
  - Function: Absorption and secretion

- **Ciliated epithelium**
  - Cells with cilia on free surface
  - Location: Respiratory tract, oviducts, spinal canal
  - Function: Move mucus, ova, cerebrospinal fluid

**2. Compound/Stratified Epithelium** (Multiple layers)

- **Stratified squamous epithelium**
  - Multiple layers; upper cells flat, lower cells cuboidal
  - **Keratinized**: Dead outer layer with keratin protein (skin epidermis)
  - **Non-keratinized**: No keratin, moist (oral cavity, esophagus, vagina)
  - Function: Protection from mechanical stress, pathogens

- **Transitional epithelium**
  - Stretches with organ expansion
  - Location: Urinary bladder, ureters
  - Function: Allows expansion

**B. Based on Function:**

**Glandular Epithelium**
- Specialized for secretion
- Develops from epithelial tissues

**Types:**

**1. Exocrine Glands**
- Have ducts to carry secretions
- Secrete onto body surfaces or into cavities
- Examples: Sweat glands, salivary glands, mammary glands, liver

**2. Endocrine Glands**
- Ductless glands
- Secrete hormones directly into blood
- Examples: Pituitary, thyroid, adrenal glands

### 2. Connective Tissue

Most abundant and widely distributed tissue. Connects, supports, and binds other tissues.

**General Characteristics:**
- Cells loosely scattered in abundant **intercellular matrix**
- Matrix has:
  - **Ground substance** (amorphous gel-like)
  - **Fibers** (collagen, elastic, reticular)
- Vascular (has blood vessels) - except cartilage and tendons
- Derived from mesoderm

**Functions:**
- Bind and support other tissues
- Protect organs
- Transport (blood)
- Store energy (adipose)
- Defend against pathogens (immune cells)
- Repair damaged tissues

**Classification:**

**A. Loose Connective Tissue**

**1. Areolar Tissue**
- Most common connective tissue
- Loose arrangement of cells and fibers in semi-fluid matrix
- Cells: Fibroblasts (secrete fibers), macrophages (phagocytosis), mast cells (allergic reactions)
- Fibers: Collagen (strength), elastic (flexibility), reticular (support)
- Location: Below skin, between organs, around blood vessels
- Functions: Support, repair, packaging material

**2. Adipose Tissue**
- Fat-storing tissue
- Cells (adipocytes) filled with fat droplets
- Nucleus pushed to periphery
- Little matrix
- Location: Below skin, around kidneys, heart, behind eyeballs
- Functions: Energy storage, insulation, cushioning

**B. Dense Connective Tissue**

**1. Dense Regular Connective Tissue**
- Collagen fibers arranged in parallel bundles
- Fibroblasts between fibers
- Great tensile strength in one direction
- Examples:
  - **Tendons**: Connect muscles to bones
  - **Ligaments**: Connect bones to bones (more elastic fibers than tendons)

**2. Dense Irregular Connective Tissue**
- Collagen fibers irregularly arranged
- Strength in multiple directions
- Location: Dermis of skin, capsules of organs
- Function: Protection and support

**C. Specialized Connective Tissue**

**1. Cartilage**
- Solid, pliable matrix of **chondrin** (protein + polysaccharide)
- Cells: **Chondrocytes** in spaces called **lacunae**
- Avascular (no blood vessels)
- Covered by **perichondrium** (fibrous membrane)

**Types:**

- **Hyaline cartilage**: Glassy appearance, most common
  - Location: Nose tip, tracheal rings, ends of long bones, ribs, embryonic skeleton
  - Function: Support, flexibility

- **Elastic cartilage**: Abundant elastic fibers, more flexible
  - Location: External ear (pinna), eustachian tube, epiglottis
  - Function: Support with flexibility

- **Fibrocartilage**: Abundant collagen fibers, strongest cartilage
  - Location: Intervertebral discs, pubic symphysis, menisci of knee
  - Function: Shock absorption

**2. Bone (Osseous Tissue)**
- Hardest connective tissue
- Matrix of **ossein** protein + calcium salts (mainly calcium phosphate)
- Cells: **Osteocytes** in lacunae
- Highly vascular
- **Haversian system**: Structural unit of compact bone
  - **Haversian canal**: Central canal with blood vessels and nerves
  - **Lamellae**: Concentric bony rings around canal
  - **Canaliculi**: Fine channels connecting lacunae

**Types:**
- **Compact bone**: Dense, outer layer of bones
- **Spongy bone**: Porous, inner layer with bone marrow

**Functions:**
- Support and protection
- Muscle attachment (locomotion)
- Blood cell formation (red bone marrow)
- Mineral storage (calcium, phosphorus)

**3. Blood**
- Fluid connective tissue
- **Plasma**: Liquid matrix (55% of blood)
- **Formed elements** (45%):
  - **Red Blood Cells (Erythrocytes)**: Transport oxygen (hemoglobin)
  - **White Blood Cells (Leukocytes)**: Immune defense
  - **Platelets (Thrombocytes)**: Blood clotting

**Functions:**
- Transport oxygen, nutrients, hormones, wastes
- Immune defense
- Blood clotting
- Temperature regulation

**4. Lymph**
- Colorless fluid in lymphatic vessels
- Similar to plasma but less proteins
- Contains lymphocytes (WBCs)
- Functions: Immunity, return tissue fluid to blood

### 3. Muscular Tissue

Specialized for contraction and movement.

**General Characteristics:**
- Cells called **muscle fibers** - elongated and contractile
- Contain **myofibrils** with contractile proteins (actin and myosin)
- Rich in mitochondria for energy
- Well-developed sarcoplasmic reticulum

**Types:**

**A. Skeletal/Striated/Voluntary Muscle**

**Characteristics:**
- Long, cylindrical, unbranched fibers
- **Multinucleated** (many nuclei) - nuclei at periphery
- **Striated** appearance (light and dark bands)
- **Voluntary control** (under conscious control)
- Fatigue easily

**Location:**
- Attached to bones via tendons
- Tongue, pharynx, upper esophagus, diaphragm

**Functions:**
- Locomotion and body movements
- Maintain posture
- Heat production

**B. Smooth/Non-striated/Involuntary Muscle**

**Characteristics:**
- Spindle-shaped (tapering ends), unbranched fibers
- **Uninucleate** - single nucleus in center
- **Non-striated** (no bands)
- **Involuntary control** (autonomic)
- Fatigue slowly

**Location:**
- Walls of hollow organs: digestive tract, blood vessels, urinary bladder, uterus, bronchioles, iris

**Functions:**
- Peristalsis in digestive tract
- Regulate blood vessel diameter
- Control pupil size

**C. Cardiac Muscle**

**Characteristics:**
- Cylindrical, branched fibers
- **Uninucleate** (usually) - nucleus central
- **Striated** (like skeletal muscle)
- **Involuntary control** (autonomic)
- **Intercalated discs**: Special junctions between cells for rapid signal transmission
- Rhythmic contraction
- Does not fatigue (highly resistant to fatigue)

**Location:**
- Heart wall (myocardium)

**Functions:**
- Pump blood throughout body
- Continuous rhythmic contractions

### 4. Neural/Nervous Tissue

Specialized for receiving stimuli and conducting impulses.

**Components:**

**A. Neurons (Nerve Cells)**

Structural and functional unit of nervous system.

**Parts:**
- **Cell body (Soma/Cyton)**: Contains nucleus and organelles
- **Dendrites**: Short, branched processes receiving signals
- **Axon**: Single long process transmitting impulses away from cell body
  - Covered by **myelin sheath** (fatty insulation) with gaps called **Nodes of Ranvier**
  - Terminal branches end in **synaptic knobs** (axon terminals)

**Functions:**
- Receive stimuli
- Generate and conduct nerve impulses
- Communication between different body parts

**B. Neuroglia (Glial Cells)**

Supporting cells of nervous tissue.

**Types and Functions:**
- **Astrocytes**: Support neurons, form blood-brain barrier
- **Oligodendrocytes**: Form myelin in CNS
- **Schwann cells**: Form myelin in PNS
- **Microglia**: Immune defense (phagocytosis)
- **Ependymal cells**: Line brain ventricles

## Organ and Organ Systems

### Organ
A structure composed of different tissues working together to perform specific functions.
Examples: Heart, stomach, kidney, brain

### Organ System
A group of organs working together to perform complex functions.

**Major Organ Systems:**

1. **Digestive System**: Ingestion, digestion, absorption, egestion
2. **Respiratory System**: Gas exchange (O₂ and CO₂)
3. **Circulatory System**: Transport of materials throughout body
4. **Excretory System**: Removal of nitrogenous wastes
5. **Nervous System**: Coordination and control via nerve impulses
6. **Endocrine System**: Chemical coordination via hormones
7. **Skeletal System**: Support, protection, movement
8. **Muscular System**: Movement and locomotion
9. **Reproductive System**: Production of offspring
10. **Integumentary System**: Protection (skin and derivatives)

## Anatomy of Frog (*Rana tigrina*)

The common Indian frog serves as an excellent model for studying vertebrate anatomy.

### External Features

**Body Divisions:**
- **Head and trunk**: Fused, no neck
- **No tail** (tailless amphibian)

**Skin:**
- Moist, slimy (mucus glands)
- No scales
- **Camouflage coloration**: Dorsal side dark green/brown, ventral side pale yellow
- Functions: Respiration (cutaneous), protection, prevents desiccation

**Head:**
- Triangular
- **Eyes**: Large, bulging, covered by **nictitating membrane** (third eyelid)
- **Tympanic membrane** (eardrum): External, circular, behind eyes
- **External nares** (nostrils): Paired, anterior
- **Mouth**: Wide, terminal

**Trunk:**
- **Forelimbs**: Short, four digits (fingers)
  - Help in balance, landing after jump
- **Hindlimbs**: Long, muscular, five digits (toes) with webbed feet
  - Adaptation for swimming and jumping
- **Sexual dimorphism**:
  - **Male**: Vocal sacs, copulatory pad (nuptial pad) on first digit of forelimb
  - **Female**: Larger body size

### Digestive System

**Components:**

**Alimentary Canal:**
1. **Mouth**: Wide opening
2. **Buccal cavity**: 
   - **Maxillary teeth**: On upper jaw
   - **Vomerine teeth**: On roof (palate)
   - **Tongue**: Bilobed, free at front, attached at back (can flip out to catch prey)
3. **Pharynx**: Junction of buccal cavity and esophagus
   - **Eustachian tubes**: Connect to middle ear
   - **Glottis**: Opening to larynx and lungs
4. **Esophagus**: Short, muscular tube
5. **Stomach**: J-shaped, stores and digests food
6. **Small intestine**: Long, coiled
   - **Duodenum**: First U-shaped part
   - **Ileum**: Longer coiled part
7. **Large intestine**: Short, straight
8. **Cloaca**: Common chamber for digestive, urinary, and reproductive systems
9. **Cloacal aperture**: Terminal opening

**Digestive Glands:**
- **Liver**: Large, three-lobed (right, left, median)
  - **Gall bladder**: Stores bile
  - Bile duct opens into duodenum
- **Pancreas**: Yellowish, between stomach and duodenum
  - Pancreatic duct opens into duodenum

**Digestion Process:**
- Carnivorous (insects, worms, small invertebrates)
- Mechanical (teeth grip prey, tongue captures)
- Chemical (enzymes from stomach, pancreas, intestine)
- Absorption in small intestine

### Respiratory System

Frogs show **dual respiration** - change of respiratory organs with life stages.

**Methods:**

**1. Cutaneous Respiration** (Skin)
- Throughout life, especially in water
- Thin, moist, vascular skin
- Diffusion of gases

**2. Buccopharyngeal Respiration** (Mouth cavity)
- Through moist lining of buccal cavity
- Supplements skin respiration

**3. Pulmonary Respiration** (Lungs)
- Main method in adults on land
- **Lungs**: Paired, thin-walled, vascular sacs
- **No diaphragm**: Breathing by positive pressure (force air in)
  - Floor of mouth lowers → air enters nostrils
  - Glottis opens, mouth floor raises → air forced into lungs
  - Glottis closes → air in lungs
  - Elastic lungs compress → air expelled

**4. Aquatic Respiration** (Gills)
- Only in tadpole (larval) stage
- External gills first, then internal gills
- Lost during metamorphosis

### Circulatory System

**Type**: Closed circulatory system with double circulation (incomplete)

**Heart:**
- **Three-chambered**: Two atria, one ventricle
- **Location**: Thoracic cavity in pericardial sac
- **Chambers**:
  - **Right atrium**: Receives deoxygenated blood from body (via sinus venosus)
  - **Left atrium**: Receives oxygenated blood from lungs and skin (via pulmonary veins)
  - **Ventricle**: Receives mixed blood from both atria
    - Partial separation prevents complete mixing

**Blood Vessels:**
- **Truncus arteriosus**: Leaves ventricle, divides into left and right branches
  - Each divides into three arches:
    1. **Carotid arch**: To head (carotid artery)
    2. **Systemic arch**: To body organs (dorsal aorta)
    3. **Pulmocutaneous arch**: To lungs and skin
- **Sinus venosus**: Receives blood from veins, opens into right atrium
- **Venous system**: Hepatic portal, renal portal systems

**Blood:**
- **Nucleated RBCs** (unlike mammals)
- Various types of WBCs
- Platelets for clotting

**Circulation:**
- **Pulmonary circulation**: Heart → Lungs → Heart
- **Systemic circulation**: Heart → Body → Heart
- Incomplete separation (mixed blood in ventricle)

### Excretory System

**Type**: Ureotelic (excrete urea)

**Organs:**
- **Kidneys**: Paired, dark red, elongated, mesonephric kidneys
  - Located on either side of vertebral column
  - Functional units: **Nephrons** (with Malpighian corpuscles)
- **Ureters**: Carry urine from kidneys to cloaca
- **Urinary bladder**: Thin-walled sac, stores urine temporarily
  - Bilobed, opens into cloaca
- **Cloaca**: Common chamber for urine, feces, gametes

**Process:**
- Filter blood to remove nitrogenous waste (urea)
- Conserve water and useful substances
- Urine stored in bladder, released via cloaca

### Nervous System

**Components:**

**1. Central Nervous System (CNS)**

**Brain:**
- Protected by skull (cranium)
- Enclosed in meninges (membranes)
- **Divisions**:
  - **Forebrain**: Olfactory lobes, cerebral hemispheres, diencephalon
  - **Midbrain**: Optic lobes (two prominent lobes)
  - **Hindbrain**: Cerebellum, medulla oblongata

**Spinal Cord:**
- Runs through vertebral column
- Gives rise to spinal nerves

**2. Peripheral Nervous System (PNS)**

- **Cranial nerves**: 10 pairs from brain
- **Spinal nerves**: 10 pairs from spinal cord

**3. Autonomic Nervous System**
- Sympathetic and parasympathetic divisions
- Controls involuntary functions

**Sense Organs:**
- **Eyes**: Well-developed, with eyelids and nictitating membrane
- **Ears**: Tympanic membrane (external), middle ear, internal ear
- **Nose**: Olfactory receptors
- **Skin**: Touch, temperature receptors

### Reproductive System

**Sexual Dimorphism Present**

**Male Reproductive System:**
- **Testes**: Paired, yellowish, oval
  - Attached to kidneys by mesorchium
- **Vasa efferentia**: Connect testes to kidneys
- **Ureter**: Acts as **urogenital duct** (carries both urine and sperms)
- **Cloaca**: Common opening
- **Secondary sexual characters**:
  - Vocal sacs (males call during breeding)
  - Copulatory pads (nuptial pads) on forelimbs

**Female Reproductive System:**
- **Ovaries**: Paired, large, lobulated
  - Attached to kidneys by mesovarium
- **Oviducts**: Long, coiled tubes
  - Anterior funnel-shaped opening (ostium)
  - Open separately into cloaca
  - **Ovisac**: Dilated posterior part stores eggs temporarily
- **Ureter**: Separate from reproductive system (only carries urine)

**Fertilization:**
- **External fertilization** in water
- **Oviparous**: Lay eggs
- **Development**: Tadpole larva → Metamorphosis → Adult frog

### Skeletal System

**Endoskeleton** (internal) made of bones and cartilage.

**Divisions:**

**1. Axial Skeleton**
- **Skull**: Protects brain
- **Vertebral column**: 9 vertebrae
  - No ribs (except small ones in transverse processes)
- **Urostyle**: Rod-like bone replacing tail vertebrae

**2. Appendicular Skeleton**
- **Pectoral girdle**: Supports forelimbs
  - Clavicle, scapula, coracoid, sternum
- **Forelimbs**: Humerus, radio-ulna (fused), carpals, metacarpals, phalanges
- **Pelvic girdle**: Supports hindlimbs
  - Ilium, ischium, pubis (fused as innominate bone)
- **Hindlimbs**: Femur, tibio-fibula (fused), tarsals, metatarsals, phalanges

**Adaptations:**
- Long hindlimbs for jumping
- Webbed feet for swimming
- Reduced vertebrae (9) for flexibility during jumping

## Importance of Studying Animal Anatomy

1. **Medical Science**: Understanding human anatomy based on comparative anatomy
2. **Veterinary Science**: Animal health and treatment
3. **Physiology**: Structure-function relationships
4. **Evolution**: Comparative anatomy reveals evolutionary relationships
5. **Taxonomy**: Anatomical features aid classification
6. **Conservation**: Understanding animal adaptations for protection
`,

      keyConcepts: [
        "Epithelial tissue: simple (squamous, cuboidal, columnar) vs stratified",
        "Glandular epithelium: exocrine (with ducts) vs endocrine (ductless)",
        "Connective tissue: loose (areolar, adipose) vs dense",
        "Specialized connective tissues: cartilage, bone, blood, lymph",
        "Cartilage types: hyaline, elastic, fibrocartilage",
        "Bone structure: Haversian system with osteocytes in lacunae",
        "Blood components: plasma and formed elements (RBCs, WBCs, platelets)",
        "Muscle types: skeletal (striated, voluntary), smooth (non-striated, involuntary), cardiac (striated, involuntary)",
        "Cardiac muscle features: intercalated discs, rhythmic contraction",
        "Nervous tissue: neurons (dendrites, axon) and neuroglia",
        "Frog external features: moist skin, webbed feet, sexual dimorphism",
        "Frog digestive system: bilobed tongue, J-shaped stomach, cloaca",
        "Frog respiration: cutaneous, buccopharyngeal, pulmonary, gills (tadpole)",
        "Frog circulatory system: three-chambered heart, incomplete double circulation",
        "Frog excretory system: mesonephric kidneys, ureotelic (urea excretion)",
        "Frog nervous system: brain (fore, mid, hind), 10 pairs cranial nerves",
        "Frog reproduction: external fertilization, sexual dimorphism (vocal sacs, nuptial pads)",
        "Frog adaptations: long hindlimbs (jumping), webbed feet (swimming)",
      ],

      formulas: [
        "Animal tissue types: Epithelial + Connective + Muscular + Nervous",
        "Epithelial classification: Simple (1 layer) vs Stratified (multiple layers)",
        "Glands: Exocrine (ducts) vs Endocrine (ductless, hormones to blood)",
        "Connective tissue = Cells + Matrix (ground substance + fibers)",
        "Cartilage cells: Chondrocytes in lacunae, matrix = chondrin",
        "Bone cells: Osteocytes in lacunae, matrix = ossein + calcium salts",
        "Blood = Plasma (55%) + Formed elements (45%: RBCs, WBCs, Platelets)",
        "Muscle types: Skeletal (multinucleate, striated) + Smooth (uninucleate, non-striated) + Cardiac (uninucleate, striated, intercalated discs)",
        "Neuron = Cell body + Dendrites (receive) + Axon (transmit)",
        "Frog heart: 3 chambers = 2 atria (right + left) + 1 ventricle",
        "Frog respiration: Cutaneous + Buccopharyngeal + Pulmonary (adults) + Gills (tadpole)",
        "Frog circulation: Incomplete double = Pulmonary + Systemic (mixed blood in ventricle)",
      ],

      learningObjectives: [
        "Identify and describe the four main types of animal tissues",
        "Differentiate between simple and stratified epithelial tissues with examples",
        "Explain the structure and functions of different types of connective tissues",
        "Compare and contrast the three types of muscular tissues",
        "Describe the structure of a neuron and its role in nervous tissue",
        "Understand the organization of organs into organ systems",
        "Identify the external features and adaptations of frog",
        "Describe the digestive system of frog from mouth to cloaca",
        "Explain the dual respiration in frogs (aquatic and terrestrial)",
        "Understand the three-chambered heart and circulatory system of frog",
        "Describe the excretory system and ureotelic nature of frogs",
        "Compare male and female reproductive systems in frogs",
        "Recognize the importance of frog anatomy in understanding vertebrate organization",
      ],

      prerequisites: [
        "Basic understanding of cell structure and functions",
        "Knowledge of animal classification (Chapter 4: Animal Kingdom)",
        "Familiarity with levels of organization (cellular to organism)",
        "Understanding of basic physiological concepts",
        "Knowledge of plant tissues helps in comparison",
      ],

      importantTopics: [
        "Epithelial tissue types: simple vs stratified, exocrine vs endocrine glands",
        "Connective tissues: areolar, adipose, cartilage (3 types), bone structure",
        "Blood components and functions",
        "Muscle tissue comparison: skeletal, smooth, cardiac",
        "Neuron structure: dendrites, cell body, axon, myelin sheath",
        "Frog external anatomy: skin, webbed feet, tympanic membrane, sexual dimorphism",
        "Frog digestive system: bilobed tongue, J-shaped stomach, liver, pancreas, cloaca",
        "Frog respiratory adaptations: cutaneous, buccopharyngeal, pulmonary respiration",
        "Frog three-chambered heart and incomplete double circulation",
        "Frog excretory system: mesonephric kidneys, urinary bladder, cloaca",
        "Frog nervous system: brain divisions, cranial and spinal nerves",
        "Frog reproductive system: sexual dimorphism, external fertilization",
      ],

      ncertChapterRef: "Class 11 Biology - Chapter 7",
      difficultyLevel: 3,
      estimatedStudyMinutes: 300,
      status: "published",

      visualizationsData: {
        type: "animal-anatomy",
        title: "Frog Anatomy Interactive 3D Model",
        description:
          "Detailed 3D visualization of frog internal organ systems including digestive, respiratory, circulatory, and nervous systems with tissue cross-sections",
      },
    })
    .onConflictDoUpdate({
      target: [
        chapterContent.subject,
        chapterContent.classLevel,
        chapterContent.chapterNumber,
      ],
      set: {
        chapterTitle: "Structural Organisation in Animals",
        introduction:
          "The study of animal structure reveals the remarkable complexity and organization that enables animals to perform diverse functions. Unlike plants, animals exhibit active movement, rapid responses to stimuli, and complex organ systems for digestion, circulation, respiration, and coordination. Understanding animal tissue organization and anatomy is fundamental to comprehending how animal bodies function and adapt to their environment. This chapter explores the four basic types of animal tissues - epithelial, connective, muscular, and nervous - and examines the anatomy of a frog (Rana tigrina) as a representative vertebrate. The frog serves as an excellent model organism for studying vertebrate anatomy because it exhibits characteristics of both aquatic and terrestrial life, making it invaluable for understanding amphibian adaptations and the general organization of vertebrate organ systems.",
        updatedAt: new Date(),
      },
    });

  console.log("✅ Biology Chapter 7: Structural Organisation in Animals seeded successfully!");
}

seedBiologyChapter7()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding chapter:", error);
    process.exit(1);
  });
