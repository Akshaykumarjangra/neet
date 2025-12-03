import { db } from "../db";
import { chapterContent } from "../../shared/schema";

async function seedBiologyChapter8() {
  console.log("Seeding Biology Class 11 Chapter 8: Cell - The Unit of Life...");

  await db
    .insert(chapterContent)
    .values({
      subject: "Biology",
      classLevel: "11",
      chapterNumber: 8,
      chapterTitle: "Cell - The Unit of Life",
      introduction:
        "The cell is the fundamental structural and functional unit of all living organisms. Every organism, from the tiniest bacterium to the largest whale, is composed of cells. The discovery of cells revolutionized biology and led to the formulation of the Cell Theory, one of the most important unifying principles in biology. Understanding cell structure and organization is essential for comprehending how life functions at the molecular level - how organisms grow, reproduce, respond to their environment, and maintain homeostasis. This chapter explores the fascinating world inside cells, from the simple organization of prokaryotic cells to the complex compartmentalization of eukaryotic cells with their diverse membrane-bound organelles. Each organelle performs specialized functions that contribute to the cell's survival, making the cell a remarkably efficient microscopic factory of life.",

      detailedNotes: `
# Cell - The Unit of Life

## Discovery of Cell

**Robert Hooke (1665)**
- First observed cork cells under a compound microscope
- Coined the term "**cell**" (Latin: cellula = small room)
- Observed only dead cell walls, not living cells

**Anton van Leeuwenhoek (1674)**
- First to observe living cells (bacteria, protozoans)
- Discovered free-living cells in pond water
- Called them "animalcules"

**Robert Brown (1831)**
- Discovered nucleus in orchid root cells

## Cell Theory

Proposed independently by **Matthias Schleiden (1838)** and **Theodor Schwann (1839)**.

**Postulates:**
1. All living organisms are composed of cells and products of cells
2. All cells arise from pre-existing cells (later added by Rudolf Virchow, 1855: "Omnis cellula e cellula")
3. Cell is the basic structural and functional unit of life

**Modern Cell Theory (Modifications):**
- Cells contain hereditary information (DNA) passed from cell to cell
- All cells are basically the same in chemical composition and metabolic activities
- Energy flow (metabolism and biochemistry) occurs within cells

## Overview of Cell Structure

**Cell Size:**
- Generally microscopic (1-100 μm)
- Exceptions: Ostrich egg (largest cell), nerve cells (longest cells), bacteria (smallest cells: 0.1-0.5 μm)

**Cell Shape:**
- Variable: spherical, cuboidal, polygonal, elongated, spindle-shaped, branched, disc-like
- Shape often related to function

**Types of Cells:**
1. **Prokaryotic cells**: Lack membrane-bound nucleus and organelles (bacteria, blue-green algae)
2. **Eukaryotic cells**: Have membrane-bound nucleus and organelles (plants, animals, fungi, protists)

## Prokaryotic Cell

Found in bacteria and cyanobacteria (blue-green algae).

**General Characteristics:**
- No nuclear membrane (nucleoid region)
- No membrane-bound organelles
- Smaller (1-10 μm)
- Simple internal organization
- Single circular chromosome (DNA not associated with histones)

**Structure:**

**1. Cell Envelope**

Multilayered structure with 3 layers:

**a) Glycocalyx (Outermost layer)**
- **Capsule**: Thick, organized layer (pathogenic bacteria)
- **Slime layer**: Loose, unorganized layer
- Functions: Protection, attachment to surfaces, prevents desiccation

**b) Cell Wall**
- Made of **peptidoglycan** (murein) - complex polymer of sugars and amino acids
- Provides shape and rigidity
- Protects from osmotic lysis

**Types based on Gram staining:**
- **Gram-positive**: Thick peptidoglycan layer, retains crystal violet stain (purple)
- **Gram-negative**: Thin peptidoglycan layer + outer lipopolysaccharide layer, does not retain stain (pink/red after counterstain)

**c) Plasma Membrane**
- Selectively permeable barrier
- Fluid mosaic model (lipid bilayer with proteins)
- Functions: Transport, respiration (respiratory enzymes), photosynthesis (in photosynthetic bacteria)
- **Mesosomes**: Infoldings of plasma membrane
  - Functions: Increase surface area for respiration, help in DNA replication, cell wall formation

**2. Cytoplasm**
- Thick, gel-like matrix
- Contains ribosomes (70S type)
- No membrane-bound organelles
- Contains inclusion bodies (storage granules)

**3. Nucleoid**
- Nuclear region without nuclear membrane
- Contains single circular DNA molecule (not associated with histone proteins)
- Called **genophore** or **bacterial chromosome**

**4. Plasmids**
- Small circular DNA molecules separate from main chromosome
- Carry genes for antibiotic resistance, toxin production
- Can be transferred between bacteria (horizontal gene transfer)

**5. Ribosomes**
- **70S type** (50S + 30S subunits)
- Free in cytoplasm
- Site of protein synthesis

**6. Inclusion Bodies**
- Reserve material storage
- Examples: Glycogen granules, lipid droplets, gas vacuoles (cyanobacteria)

**7. Appendages**

**a) Flagella**
- Long, whip-like structures for locomotion
- Made of protein **flagellin**
- Types: Monotrichous (one), Amphitrichous (both ends), Lophotrichous (tuft), Peritrichous (all over)

**b) Pili and Fimbriae**
- Hair-like structures
- Fimbriae: Attachment to surfaces
- Pili: DNA transfer during conjugation (sex pili)

**c) Cilia**
- Short, numerous hair-like structures
- Locomotion and feeding

## Eukaryotic Cell

Found in plants, animals, fungi, and protists.

**General Characteristics:**
- Membrane-bound nucleus with nuclear envelope
- Membrane-bound organelles
- Larger (10-100 μm)
- Complex internal organization
- Multiple linear chromosomes (DNA associated with histone proteins)

### Cell Membrane (Plasma Membrane)

**Structure: Fluid Mosaic Model** (Singer and Nicolson, 1972)

**Components:**

**1. Lipid Bilayer**
- Mainly **phospholipids** (amphipathic molecules)
  - Hydrophilic head (polar) facing outward
  - Hydrophobic tails (non-polar) facing inward
- **Cholesterol**: Provides fluidity and stability
- **Glycolipids**: Lipids with carbohydrate chains (cell recognition)

**2. Proteins**
- **Integral proteins**: Embedded in membrane (transmembrane proteins)
- **Peripheral proteins**: Attached to membrane surface
- **Glycoproteins**: Proteins with carbohydrate chains (cell recognition, receptors)

**Functions:**
- Selectively permeable barrier
- Transport of molecules (passive and active transport)
- Cell recognition and signaling
- Enzymatic activity
- Cell adhesion

**Characteristics:**
- **Quasi-fluid** nature (lipids and proteins can move laterally)
- **Asymmetric** (inner and outer layers differ in composition)

### Cell Wall (in Plant Cells)

**Absent in animal cells, present in plant, fungal, and algal cells.**

**Plant Cell Wall:**

**Composition:**
- Primarily **cellulose** (fibrous polysaccharide)
- **Hemicellulose** and **pectin** (matrix)
- Proteins (extensins)

**Layers:**

**1. Middle Lamella**
- Outermost layer, shared between adjacent cells
- Made of **calcium pectate**
- Cementing layer, holds cells together

**2. Primary Cell Wall**
- Formed during cell growth
- Thin, flexible, extensible
- Cellulose microfibrils in pectin matrix

**3. Secondary Cell Wall**
- Formed after cell stops growing
- Thick, rigid, lignified
- Provides mechanical strength
- **Plasmodesmata**: Cytoplasmic connections through cell walls

**Functions:**
- Provides shape and mechanical support
- Protects from mechanical damage and pathogens
- Prevents over-expansion due to water uptake

### Endomembrane System

A network of membrane-bound organelles that work together.

**Components:**
1. Endoplasmic Reticulum (ER)
2. Golgi Apparatus
3. Lysosomes
4. Vacuoles

**Excluded:** Mitochondria, chloroplasts, peroxisomes (have their own origin)

### Endoplasmic Reticulum (ER)

Network of interconnected membrane-bound tubules and sacs (cisternae).

**Types:**

**1. Rough Endoplasmic Reticulum (RER)**
- Studded with ribosomes on outer surface
- Flattened, interconnected sacs (cisternae)

**Functions:**
- Protein synthesis (ribosomes)
- Protein folding and modification
- Protein packaging into vesicles for Golgi

**2. Smooth Endoplasmic Reticulum (SER)**
- No ribosomes
- Tubular network

**Functions:**
- Lipid synthesis (phospholipids, steroids, cholesterol)
- Carbohydrate metabolism
- Detoxification of drugs and poisons (liver cells)
- Calcium storage (muscle cells - sarcoplasmic reticulum)

### Golgi Apparatus (Golgi Complex)

**Structure:**
- Stacks of flattened, disc-shaped sacs called **cisternae**
- Usually 4-8 cisternae per stack
- **Cis face** (forming face): Receives vesicles from ER
- **Trans face** (maturing face): Releases vesicles to destinations

**Components:**
- Cisternae (flattened sacs)
- Tubules
- Vesicles

**Functions:**
- **Modification** of proteins (glycosylation, phosphorylation)
- **Packaging** into vesicles
- **Sorting** and **distribution** to destinations (plasma membrane, lysosomes, secretion)
- Formation of lysosomes
- Synthesis of cell wall materials (in plants)

**Plant Golgi = Dictyosomes**

### Lysosomes ("Suicide Bags")

**Discovered by Christian de Duve (1955)**

**Structure:**
- Membrane-bound sacs
- Contain **hydrolytic enzymes** (acid hydrolases)
- Enzymes active at acidic pH (~5)

**Types:**
- **Primary lysosomes**: Newly formed, inactive
- **Secondary lysosomes**: Active, formed by fusion with vesicles

**Functions:**
- **Intracellular digestion** of materials
- **Autophagy**: Digestion of worn-out organelles
- **Autolysis**: Self-digestion of cell (during cell death, metamorphosis)
- **Heterophagy**: Digestion of extracellular materials
- **Extracellular digestion**: Release enzymes outside cell (bone remodeling, sperm penetration of egg)

**Polymorphism of Lysosomes:**
- Primary lysosomes
- Secondary lysosomes (phagosomes, autophagic vacuoles)
- Residual bodies (indigestible material)

### Vacuoles

**Structure:**
- Membrane-bound sacs
- Membrane = **Tonoplast**
- Filled with cell sap (water, ions, sugars, pigments, wastes)

**Types:**

**1. Plant Cell Vacuoles**
- **Large central vacuole** (up to 90% of cell volume)
- Functions:
  - Storage of water, ions, nutrients, wastes
  - Maintain turgor pressure (cell rigidity)
  - Store pigments (anthocyanins in flowers, fruits)
  - Store toxic metabolites (defense against herbivores)

**2. Animal Cell Vacuoles**
- Small, temporary vacuoles
- **Food vacuoles**: Digestion
- **Contractile vacuoles**: Osmoregulation (protozoans)

**3. Sap Vacuoles**
- Store cell sap (sugar, salts, amino acids, pigments)

### Mitochondria ("Powerhouse of Cell")

**Structure:**

**1. Double Membrane**
- **Outer membrane**: Smooth, permeable
- **Inner membrane**: Highly folded into **cristae** (increase surface area)
  - Contains **oxysomes** (F₀-F₁ particles) for ATP synthesis

**2. Intermembrane Space**
- Space between outer and inner membranes

**3. Matrix**
- Innermost compartment
- Contains:
  - Mitochondrial DNA (circular, prokaryotic-like)
  - Mitochondrial ribosomes (70S type)
  - Enzymes for Krebs cycle, fatty acid oxidation

**Functions:**
- **Cellular respiration** (aerobic respiration)
- **ATP production** (energy currency)
- Krebs cycle in matrix
- Electron transport chain and oxidative phosphorylation on cristae

**Special Features:**
- Semi-autonomous (have own DNA and ribosomes)
- Self-replicating
- Maternal inheritance
- **Endosymbiotic origin** (evolved from bacteria)

### Plastids (Only in Plant Cells)

**Structure:**
- Double membrane-bound
- Internal membrane system
- Semi-autonomous (own DNA and ribosomes)

**Types:**

**1. Chloroplasts**
- Green plastids containing **chlorophyll**
- Site of **photosynthesis**

**Structure:**
- **Outer membrane**: Smooth, permeable
- **Inner membrane**: Less permeable
- **Stroma**: Fluid matrix
  - Contains chloroplast DNA, ribosomes (70S), enzymes
  - Calvin cycle occurs here
- **Thylakoids**: Flattened membranous sacs
  - Stacked thylakoids = **Grana** (singular: granum)
  - Light reactions occur on thylakoid membranes
  - Contain chlorophyll and photosystems

**Functions:**
- Photosynthesis (light reactions and dark reactions)
- Synthesis of starch, amino acids, fatty acids

**2. Chromoplasts**
- Colored plastids (yellow, orange, red)
- Contain **carotenoids** (carotene, xanthophyll)
- Give color to flowers and fruits

**3. Leucoplasts**
- Colorless plastids
- Storage organelles

**Types:**
- **Amyloplasts**: Store starch (potato tuber)
- **Elaioplasts**: Store oils and fats
- **Aleuroplasts**: Store proteins

**Plastid Interconversion:**
- Leucoplasts → Chloroplasts (light exposure)
- Chloroplasts → Chromoplasts (fruit ripening)

### Ribosomes ("Protein Factories")

**Structure:**
- Not membrane-bound
- Composed of rRNA + proteins
- Two subunits (large + small)

**Types:**

**1. 70S Ribosomes**
- Found in prokaryotes, mitochondria, chloroplasts
- Subunits: 50S + 30S

**2. 80S Ribosomes**
- Found in eukaryotic cytoplasm
- Subunits: 60S + 40S

**Distribution:**
- **Free ribosomes**: Free in cytoplasm (synthesize proteins for cell use)
- **Bound ribosomes**: Attached to ER (synthesize proteins for export/membrane)

**Functions:**
- Protein synthesis (translation)
- Read mRNA and assemble amino acids into proteins

### Cytoskeleton

**Network of protein filaments in cytoplasm.**

**Components:**

**1. Microfilaments (Actin Filaments)**
- Thinnest (6 nm diameter)
- Made of protein **actin**
- Functions: Cell shape, muscle contraction, cell movement, cytokinesis

**2. Intermediate Filaments**
- Medium diameter (8-12 nm)
- Made of various proteins (keratins, vimentin, lamins)
- Functions: Mechanical strength, maintain cell shape

**3. Microtubules**
- Thickest (25 nm diameter)
- Made of protein **tubulin** (α and β tubulin dimers)
- Hollow cylindrical structures
- Functions: Cell shape, chromosome movement in cell division, intracellular transport, form cilia and flagella

**Functions of Cytoskeleton:**
- Maintain cell shape
- Cell motility
- Intracellular transport
- Cell division
- Mechanical support

### Cilia and Flagella

**Motile structures projecting from cell surface.**

**Structure:**
- Membrane-bound extensions
- Core structure: **Axoneme**
  - **9+2 arrangement**: 9 doublet microtubules + 2 central singlet microtubules
  - Doublets connected by **dynein arms** (motor protein)
  - Radial spokes connect doublets to central sheath

**Differences:**

| Feature | Cilia | Flagella |
|---------|-------|----------|
| Length | Short (2-10 μm) | Long (up to 150 μm) |
| Number | Many (hundreds) | Few (one or two) |
| Beat | Coordinated, oar-like | Wave-like, whip-like |
| Example | Paramecium, respiratory tract | Sperm, Euglena |

**Functions:**
- Locomotion
- Movement of substances over cell surface (mucus in respiratory tract)

**Basal Body:**
- Anchoring structure at base of cilia/flagella
- Similar to centriole (9 triplet microtubules, no central tubules)

### Centrosome and Centrioles

**Centrosome:**
- Organelle near nucleus in animal cells
- **MTOC** (Microtubule Organizing Center)
- Contains two centrioles

**Centrioles:**
- Cylindrical structures
- Made of 9 triplet microtubules (cartwheel arrangement)
- Lie perpendicular to each other

**Functions:**
- Form spindle fibers during cell division
- Form basal bodies of cilia and flagella

**Note:** Absent in most plant cells and fungi

### Nucleus ("Control Center of Cell")

**Structure:**

**1. Nuclear Envelope**
- Double membrane with nuclear pores
- **Outer membrane**: Continuous with ER
- **Inner membrane**: Lined with nuclear lamina (protein network)
- **Nuclear pores**: Regulate exchange of materials (RNA, proteins)

**2. Nucleoplasm (Nuclear Sap)**
- Gel-like matrix inside nucleus
- Contains chromosomes and nucleolus

**3. Chromatin**
- DNA + histone proteins
- **Euchromatin**: Loosely packed, transcriptionally active
- **Heterochromatin**: Tightly packed, transcriptionally inactive

**During cell division:**
- Chromatin condenses into **chromosomes**

**4. Nucleolus**
- Dense, spherical body (not membrane-bound)
- Site of **ribosomal RNA (rRNA) synthesis**
- Site of **ribosome assembly**
- Usually one or more per nucleus

**Functions of Nucleus:**
- Stores genetic information (DNA)
- Controls cellular activities through gene expression
- Coordinates cell growth, metabolism, and reproduction
- Site of DNA replication
- Site of transcription (RNA synthesis)

## Comparison: Prokaryotic vs Eukaryotic Cells

| Feature | Prokaryotic | Eukaryotic |
|---------|-------------|------------|
| Size | 1-10 μm | 10-100 μm |
| Nucleus | No nuclear membrane (nucleoid) | Membrane-bound nucleus |
| Chromosomes | Single circular DNA | Multiple linear DNA with histones |
| Organelles | No membrane-bound organelles | Membrane-bound organelles |
| Ribosomes | 70S | 80S (70S in organelles) |
| Cell division | Binary fission | Mitosis/Meiosis |
| Examples | Bacteria, Cyanobacteria | Plants, Animals, Fungi, Protists |

## Comparison: Plant vs Animal Cells

| Feature | Plant Cell | Animal Cell |
|---------|-----------|--------------|
| Cell wall | Present (cellulose) | Absent |
| Plastids | Present | Absent |
| Vacuoles | Large central vacuole | Small, temporary |
| Centrioles | Absent (except lower plants) | Present |
| Lysosomes | Rare | Common |
| Storage | Starch | Glycogen |
| Shape | Fixed (due to cell wall) | Variable |
`,

      keyConcepts: [
        "Cell Theory: All organisms made of cells, cells from pre-existing cells",
        "Prokaryotic cells: No nucleus, no membrane-bound organelles, 70S ribosomes",
        "Eukaryotic cells: Nucleus present, membrane-bound organelles, 80S ribosomes",
        "Fluid Mosaic Model: Phospholipid bilayer with embedded proteins",
        "Endomembrane system: ER, Golgi, lysosomes, vacuoles",
        "RER: Protein synthesis; SER: Lipid synthesis, detoxification",
        "Golgi apparatus: Modification, packaging, sorting of proteins",
        "Lysosomes: Hydrolytic enzymes, intracellular digestion, autophagy",
        "Mitochondria: Double membrane, cristae, ATP production, own DNA",
        "Chloroplasts: Thylakoids (grana), stroma, photosynthesis, own DNA",
        "Ribosomes: 70S (prokaryotes) vs 80S (eukaryotes), protein synthesis",
        "Cytoskeleton: Microfilaments, intermediate filaments, microtubules",
        "Cilia and flagella: 9+2 arrangement of microtubules, locomotion",
        "Nucleus: Nuclear envelope with pores, chromatin, nucleolus",
        "Cell wall: Cellulose (plants), peptidoglycan (bacteria)",
        "Plastid types: Chloroplasts (green), chromoplasts (colored), leucoplasts (colorless)",
        "Semi-autonomous organelles: Mitochondria and chloroplasts (own DNA, ribosomes)",
        "Endosymbiotic theory: Mitochondria and chloroplasts from bacteria",
      ],

      formulas: [
        "Cell envelope (prokaryotes) = Glycocalyx + Cell wall + Plasma membrane",
        "Prokaryotic ribosomes: 70S = 50S + 30S subunits",
        "Eukaryotic ribosomes: 80S = 60S + 40S subunits",
        "Endomembrane system = ER + Golgi + Lysosomes + Vacuoles",
        "Mitochondria structure = Outer membrane + Inner membrane (cristae) + Matrix",
        "Chloroplast structure = Outer + Inner membrane + Stroma + Thylakoids (grana)",
        "Cilia/Flagella axoneme: 9+2 arrangement (9 doublets + 2 central singlets)",
        "Centriole structure: 9 triplet microtubules",
        "Nucleus = Nuclear envelope + Nucleoplasm + Chromatin + Nucleolus",
        "Cytoskeleton = Microfilaments (actin) + Intermediate filaments + Microtubules (tubulin)",
        "Plastids: Chloroplasts (photosynthesis) + Chromoplasts (pigments) + Leucoplasts (storage)",
      ],

      learningObjectives: [
        "Understand the Cell Theory and its postulates",
        "Differentiate between prokaryotic and eukaryotic cells",
        "Describe the structure and functions of plasma membrane",
        "Explain the Fluid Mosaic Model of cell membrane",
        "Identify the components of prokaryotic cell structure",
        "Understand the endomembrane system and its components",
        "Describe the structure and functions of endoplasmic reticulum",
        "Explain the role of Golgi apparatus in protein processing",
        "Understand the structure and functions of mitochondria",
        "Describe the structure and functions of chloroplasts",
        "Compare and contrast different types of plastids",
        "Explain the structure and function of ribosomes",
        "Understand the cytoskeleton and its components",
        "Describe the structure of cilia and flagella",
        "Explain the structure and functions of nucleus",
        "Compare plant and animal cells",
      ],

      prerequisites: [
        "Basic understanding of living organisms and their characteristics",
        "Knowledge of microscopy and cell observation techniques",
        "Familiarity with biomolecules (will be detailed in Chapter 9)",
        "Understanding of basic chemistry (atoms, molecules, chemical bonds)",
        "Knowledge of scientific method and observation",
      ],

      importantTopics: [
        "Cell Theory postulates and historical development",
        "Prokaryotic cell structure: cell envelope, nucleoid, ribosomes, flagella",
        "Eukaryotic cell: plasma membrane (Fluid Mosaic Model)",
        "Endomembrane system: ER (RER vs SER), Golgi apparatus, lysosomes, vacuoles",
        "Mitochondria: double membrane, cristae, ATP production, own DNA (70S ribosomes)",
        "Chloroplasts: thylakoids, grana, stroma, photosynthesis, own DNA",
        "Plastid types and interconversion",
        "Ribosomes: 70S vs 80S types",
        "Cytoskeleton: microfilaments, intermediate filaments, microtubules",
        "Cilia and flagella: 9+2 arrangement, locomotion",
        "Nucleus: nuclear envelope, chromatin, nucleolus",
        "Centrosome and centrioles in animal cells",
        "Differences: Prokaryotic vs Eukaryotic cells",
        "Differences: Plant vs Animal cells",
      ],

      ncertChapterRef: "Class 11 Biology - Chapter 8",
      difficultyLevel: 4,
      estimatedStudyMinutes: 360,
      status: "published",

      visualizationsData: {
        type: "cell-structure",
        title: "Interactive 3D Cell Model",
        description:
          "Explore prokaryotic and eukaryotic cell structures with detailed organelle visualization including mitochondria, chloroplasts, ER, Golgi apparatus, and nucleus",
      },
    })
    .onConflictDoUpdate({
      target: [
        chapterContent.subject,
        chapterContent.classLevel,
        chapterContent.chapterNumber,
      ],
      set: {
        chapterTitle: "Cell - The Unit of Life",
        introduction:
          "The cell is the fundamental structural and functional unit of all living organisms. Every organism, from the tiniest bacterium to the largest whale, is composed of cells. The discovery of cells revolutionized biology and led to the formulation of the Cell Theory, one of the most important unifying principles in biology. Understanding cell structure and organization is essential for comprehending how life functions at the molecular level - how organisms grow, reproduce, respond to their environment, and maintain homeostasis. This chapter explores the fascinating world inside cells, from the simple organization of prokaryotic cells to the complex compartmentalization of eukaryotic cells with their diverse membrane-bound organelles. Each organelle performs specialized functions that contribute to the cell's survival, making the cell a remarkably efficient microscopic factory of life.",
        updatedAt: new Date(),
      },
    });

  console.log("✅ Biology Chapter 8: Cell - The Unit of Life seeded successfully!");
}

seedBiologyChapter8()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding chapter:", error);
    process.exit(1);
  });
