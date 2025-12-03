import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter11() {
  console.log('Seeding Biology Class 12 Chapter 11: Biotechnology: Principles and Processes...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 11,
    chapterTitle: 'Biotechnology: Principles and Processes',
    introduction: `Biotechnology harnesses cellular and biomolecular processes to develop technologies and products that improve human life and the health of our planet. This chapter explores the fundamental principles of genetic engineering, recombinant DNA technology, tools of biotechnology like restriction enzymes and vectors, and processes like PCR, gel electrophoresis, and gene cloning. Understanding these molecular techniques is critical for NEET as they form the foundation of modern medicine, agriculture, and industrial applications.`,

    detailedNotes: `
# Biotechnology: Principles and Processes

## Introduction

**Biotechnology**: Use of living organisms or their components to make useful products

**Traditional Biotechnology**: Fermentation-based processes (bread, beer, curd)
**Modern Biotechnology**: Genetic engineering and recombinant DNA technology

## Principles of Biotechnology

### Two Core Techniques

**1. Genetic Engineering (Recombinant DNA Technology)**
- Manipulation of DNA to alter genetic makeup of organisms
- Transfer of genes from one organism to another
- Creates **transgenic organisms** or **Genetically Modified Organisms (GMOs)**

**2. Bioprocess Engineering**
- Maintenance of sterile conditions for microbial growth
- Large-scale production in bioreactors
- Downstream processing to purify products

### Central Dogma and Genetic Engineering

**Normal**: DNA → RNA → Protein

**Reverse Transcription**: RNA → DNA (using reverse transcriptase from retroviruses)

**Genetic Engineering allows**:
- Cutting DNA at specific sites
- Joining DNA fragments from different sources
- Inserting modified DNA into host organisms
- Expression of foreign genes

## Tools of Recombinant DNA Technology

### 1. Restriction Enzymes (Molecular Scissors)

**Definition**: Enzymes that cut DNA at specific recognition sequences

**Discovery**: Werner Arber, Hamilton Smith, Daniel Nathans (Nobel Prize, 1978)

**Mechanism**:
- Recognize specific palindromic sequences (read same on both strands)
- Cut both DNA strands
- Part of bacterial **restriction-modification system** (defense against viruses)

**Types of Cuts**:

**A. Sticky Ends (Cohesive ends)**
- Staggered cuts leaving overhanging single strands
- Can base-pair with complementary sticky ends
- Example: **EcoRI**
  - Recognition sequence: 5'-GAATTC-3'
  - Cuts between G and A
  - Creates 5' overhang

**B. Blunt Ends**
- Straight cuts (no overhang)
- Example: **SmaI**, **AluI**

**Common Restriction Enzymes**:

| Enzyme | Source | Recognition Sequence | Cut Type |
|--------|--------|---------------------|----------|
| **EcoRI** | *E. coli* | GAATTC | Sticky |
| **BamHI** | *Bacillus amyloliquefaciens* | GGATCC | Sticky |
| **HindIII** | *Haemophilus influenzae* | AAGCTT | Sticky |
| **PstI** | *Pseudomonas stuartii* | CTGCAG | Sticky |
| **SmaI** | *Serratia marcescens* | CCCGGG | Blunt |

**Naming Convention**:
- First letter: Genus name
- Next two letters: Species name
- Roman numerals: Order of discovery

### 2. DNA Ligase (Molecular Glue)

**Function**: Joins DNA fragments by forming **phosphodiester bonds**

**Mechanism**:
- Catalyzes bond formation between 3'-OH and 5'-phosphate groups
- Requires ATP

**Use**: Join:
- DNA insert to vector
- Sticky ends from same restriction enzyme
- Blunt ends (less efficient)

### 3. Vectors (Gene Carriers)

**Definition**: DNA molecules that carry foreign DNA into host cell

**Requirements**:
- Origin of replication (ori): Self-replication in host
- Selectable marker: Identify transformed cells
- Cloning sites: Restriction sites for gene insertion
- Small size: Easy manipulation

**Types**:

**A. Plasmids**
- Circular, extrachromosomal DNA in bacteria
- Most commonly used vectors
- Examples: **pBR322**, **pUC18**

**pBR322** (E. coli plasmid):
- Size: 4,361 base pairs
- **Antibiotic resistance genes**:
  - **ampR** (ampicillin resistance)
  - **tetR** (tetracycline resistance)
- **Origin of replication (ori)**
- **Multiple restriction sites**

**B. Bacteriophages (Viral Vectors)**
- **λ phage** (lambda phage)
- Can carry larger DNA inserts (up to 25 kb)

**C. Cosmids**
- Hybrid of plasmid and phage
- Larger DNA capacity

**D. BAC and YAC**
- **Bacterial Artificial Chromosomes** (BAC)
- **Yeast Artificial Chromosomes** (YAC)
- Very large inserts (100-300 kb for BAC, 1000 kb for YAC)
- Used in Human Genome Project

### 4. Host Organisms

**Most common**: *Escherichia coli* (E. coli bacterium)

**Reasons**:
- Easy to grow and manipulate
- Well-studied genetics
- Rapid multiplication
- Takes up foreign DNA easily (competent cells)

**Other hosts**:
- Yeast (*Saccharomyces cerevisiae*)
- Plant cells
- Animal cells

## Processes of Recombinant DNA Technology

### Step 1: Isolation of DNA

**Genomic DNA Extraction**:

1. **Cell lysis**: Break cell membrane using enzymes
   - Lysozyme (bacteria)
   - Cellulase (plants)
   - Chitinase (fungi)

2. **RNA removal**: Add RNase enzyme

3. **Protein removal**: Add protease enzyme

4. **DNA precipitation**: Add chilled ethanol
   - DNA appears as fine threads

5. **Purification**: Washing and centrifugation

**Result**: Pure genomic DNA

### Step 2: Cutting DNA (Restriction Digestion)

1. Treat genomic DNA with **restriction enzyme**
2. Cut at specific recognition sequences
3. Generates DNA fragments with sticky/blunt ends

**Also cut vector** with same restriction enzyme
- Creates compatible ends

### Step 3: Amplification (PCR - Polymerase Chain Reaction)

**Invented by**: Kary Mullis (Nobel Prize, 1993)

**Purpose**: Make millions of copies of specific DNA segment

**Requirements**:
- **Template DNA**: DNA to be amplified
- **Primers**: Short DNA sequences (15-20 bases) complementary to template
- **dNTPs**: Deoxynucleotide triphosphates (building blocks)
- **Taq polymerase**: Heat-stable DNA polymerase (from *Thermus aquaticus*)
- **Buffer solution**

**Steps** (One Cycle):

1. **Denaturation** (94-96°C):
   - Double-stranded DNA separates into single strands
   - High temperature breaks hydrogen bonds

2. **Annealing** (50-60°C):
   - Primers bind to complementary sequences on template
   - Temperature lowered

3. **Extension** (72°C):
   - **Taq polymerase** synthesizes new DNA strand
   - Adds nucleotides in 5' → 3' direction
   - Optimal temperature for Taq polymerase

**Cycles**: Repeat 25-35 times
- Each cycle doubles DNA amount
- **Exponential amplification**: 2ⁿ (where n = number of cycles)
- 30 cycles = 2³⁰ = ~1 billion copies

**Applications**:
- Gene cloning
- Diagnosis of genetic diseases
- DNA fingerprinting
- Detection of pathogens

### Step 4: Ligation (Joining Insert and Vector)

1. **Mix**:
   - DNA insert (gene of interest)
   - Vector (cut with same restriction enzyme)
   - DNA ligase enzyme

2. **Complementary sticky ends** base-pair

3. **DNA ligase** forms covalent bonds

**Result**: **Recombinant DNA** (rDNA)

### Step 5: Introduction into Host Cell (Transformation)

**Transformation**: Uptake of foreign DNA by bacterial cell

**Methods**:

**A. Heat Shock Method**
1. Treat bacterial cells with **CaCl₂** (calcium chloride)
   - Makes cell membrane permeable (**competent cells**)
2. Mix with recombinant DNA
3. Place on ice, then heat shock (42°C for 90 seconds)
4. DNA enters cells

**B. Electroporation**
- Electric pulses create temporary pores in membrane
- DNA enters through pores
- Used for plant and animal cells too

**C. Microinjection**
- Direct injection of DNA into nucleus
- Used for animal cells, fertilized eggs

**D. Gene Gun (Biolistics)**
- Coat gold/tungsten particles with DNA
- "Shoot" into plant cells
- Used for plant transformation

### Step 6: Selection of Transformants

**Problem**: Not all cells take up recombinant DNA

**Solution**: Use **selectable markers**

**Methods**:

**A. Antibiotic Resistance Selection**

Using **pBR322** plasmid:
- Has ampR and tetR genes
- Foreign DNA inserted into tetR gene (**insertional inactivation**)

**Selection**:
1. Plate on ampicillin medium
   - Only transformed cells (with plasmid) survive
   - Non-transformed cells die

2. **Replica plating** on tetracycline medium
   - **Recombinants** (with insert): ampR, tetS (sensitive to tetracycline) - DIE on tetracycline
   - **Non-recombinants**: ampR, tetR - SURVIVE on tetracycline

3. **Identify colonies** that grow on ampicillin but NOT on tetracycline
   - These have recombinant DNA

**B. Blue-White Selection** (Better method)

Using **pUC vectors**:
- Contains **lacZ gene** (codes for β-galactosidase)
- Foreign DNA inserted into lacZ gene

**Process**:
1. Grow on medium with **X-gal** (chromogenic substrate)
2. β-galactosidase cleaves X-gal → **Blue color**

**Results**:
- **Non-recombinants**: Functional lacZ → **Blue colonies**
- **Recombinants**: Disrupted lacZ → **White colonies**

**Pick white colonies** = Contain recombinant DNA

### Step 7: Transfer to Bioreactor

**Bioreactor (Fermenter)**: Large vessel for growing microorganisms in controlled conditions

**Functions**:
- Maintain optimal temperature, pH, oxygen
- Provide nutrients
- Remove waste products
- Control foam formation

**Components**:
- Stirrer for mixing
- Oxygen delivery system
- pH and temperature sensors
- Foam breaker
- Sampling ports

**Types**:
- **Stirred-tank bioreactor**: Most common, with agitator
- **Airlift bioreactor**: Mixing by air bubbles

**Scale**:
- Small-scale: 100-1000 L
- Industrial: 1000-100,000 L

### Step 8: Downstream Processing

**Definition**: Purification of biotechnology product

**Steps**:
1. **Separation**: Separate product from cells
   - Filtration, centrifugation

2. **Purification**: Remove impurities
   - Chromatography (column, gel filtration)
   - Crystallization

3. **Quality control**: Test purity, activity

4. **Formulation**: Prepare for use (tablets, injections)

## Gel Electrophoresis

**Purpose**: Separate DNA fragments by size

**Principle**: DNA is negatively charged (phosphate groups), moves toward positive electrode

**Procedure**:
1. **Prepare gel**: Agarose gel in buffer
2. **Load samples**: DNA in wells at one end (negative electrode end)
3. **Apply electric field**: DNA migrates through gel
4. **Staining**: Ethidium bromide binds DNA, fluoresces under UV light
5. **Visualization**: Bands visible under UV light

**Result**:
- **Small fragments** move faster (farther from wells)
- **Large fragments** move slower (closer to wells)
- Separated by size

**Uses**:
- Check DNA quality after extraction
- Verify PCR product
- Analyze restriction digestion
- DNA fingerprinting

## Summary Points

1. Restriction enzymes cut DNA at specific palindromic sequences creating sticky or blunt ends
2. Vectors like plasmids carry foreign DNA into host cells and have ori, selectable markers, and cloning sites
3. PCR amplifies DNA through repeated cycles of denaturation, annealing, and extension using Taq polymerase
4. Competent cells take up recombinant DNA through heat shock or electroporation (transformation)
5. Transformants selected using antibiotic resistance or blue-white screening (insertional inactivation)
6. Bioreactors provide controlled environment for large-scale production of recombinant proteins
7. Gel electrophoresis separates DNA fragments by size using electric field through agarose gel
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Biotechnology: Principles and Processes',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Biology Class 12 Chapter 11: Biotechnology: Principles and Processes');
}

seedBiologyClass12Chapter11().catch(console.error);
