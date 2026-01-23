import { db } from "../db";
import { chapterContent } from "../../shared/schema";
import { sql } from 'drizzle-orm';

async function seedBiologyChapter9() {
  console.log("Seeding Biology Class 11 Chapter 9: Biomolecules...");

  await db
    .insert(chapterContent)
    .values({
      subject: "Biology",
      classLevel: "11",
      chapterNumber: 9,
      chapterTitle: "Biomolecules",
      introduction:
        "Life at the molecular level is orchestrated by an intricate network of chemical compounds called biomolecules. These organic molecules form the structural framework of cells and carry out the complex chemical reactions that sustain life. From the simple sugars that provide instant energy to the complex DNA molecules that carry hereditary information, biomolecules are the fundamental building blocks and functional units of all living organisms. Understanding the structure, properties, and functions of biomolecules is essential for comprehending biological processes - from photosynthesis and respiration to growth and reproduction. This chapter explores the four major classes of biomolecules - carbohydrates, proteins, lipids, and nucleic acids - along with the remarkable catalysts called enzymes that regulate virtually every chemical reaction in living systems.",

      detailedNotes: `
# Biomolecules

## Introduction

**Biomolecules** are organic compounds present in living organisms. They are primarily composed of carbon, hydrogen, oxygen, nitrogen, sulfur, and phosphorus.

**Classification based on molecular weight:**

**1. Micromolecules (Low molecular weight)**
- Molecular weight less than 1000 Da
- Examples: Glucose, amino acids, nucleotides
- Also called **monomers** (building blocks)

**2. Macromolecules (High molecular weight)**
- Molecular weight more than 10,000 Da
- Polymers formed by linking monomers
- Examples: Polysaccharides, proteins, nucleic acids
- Also called **biomacromolecules**

## Primary and Secondary Metabolites

**Primary Metabolites:**
- Essential for growth, development, and reproduction
- Found in all organisms
- Examples: Carbohydrates, proteins, lipids, nucleic acids

**Secondary Metabolites:**
- Not directly involved in growth
- Provide ecological advantages (defense, attraction)
- Species-specific
- Examples: Alkaloids (morphine, codeine), terpenoids (monoterpenes), essential oils, toxins, pigments

**Applications:**
- Drugs (morphine - pain reliever)
- Spices (curcumin from turmeric)
- Pigments (carotenoids)
- Scents (lemongrass oil)

## Analysis of Chemical Composition

**Method:**
1. Grind living tissue in trichloroacetic acid (metabolic inhibitor)
2. Filter to separate:
   - **Filtrate (Acid-soluble pool)**: Micromolecules
   - **Retentate (Acid-insoluble pool)**: Macromolecules

**Results:**
- Water: 70-90% of cell mass
- Organic compounds: 10-30%
- Inorganic compounds: 1-1.5%

## Carbohydrates

**Definition:** Organic compounds with general formula Cₙ(H₂O)ₙ (hydrates of carbon).

**Classification:**

### 1. Monosaccharides (Simple Sugars)

**Characteristics:**
- Cannot be hydrolyzed further
- White, crystalline, water-soluble, sweet taste
- General formula: (CH₂O)ₙ where n = 3-7

**Classification based on carbon atoms:**

**a) Trioses (C₃H₆O₃)**
- Examples: Glyceraldehyde (aldose), Dihydroxyacetone (ketose)

**b) Pentoses (C₅H₁₀O₅)**
- **Ribose**: In RNA, ATP, NAD⁺, FAD
- **Deoxyribose**: In DNA (lacks oxygen at C-2)
- **Ribulose**: In photosynthesis (CO₂ acceptor)

**c) Hexoses (C₆H₁₂O₆)**
- **Glucose**: Most abundant sugar, blood sugar, primary energy source
- **Fructose**: Fruit sugar, sweetest natural sugar, in honey
- **Galactose**: In lactose (milk sugar)

**Classification based on functional group:**
- **Aldoses**: Contain aldehyde group (-CHO)
  - Examples: Glucose, ribose, galactose
- **Ketoses**: Contain ketone group (>C=O)
  - Examples: Fructose, ribulose

**Functions:**
- Energy source (glucose)
- Structural components (ribose in nucleic acids)
- Metabolic intermediates

### 2. Oligosaccharides

**Characteristics:**
- Contain 2-10 monosaccharide units
- Formed by **glycosidic bonds** (dehydration synthesis)

**Disaccharides (Most common oligosaccharides)**

**a) Sucrose (Glucose + Fructose)**
- Table sugar, cane sugar
- Non-reducing sugar
- Found in sugarcane, sugar beet, fruits

**b) Lactose (Glucose + Galactose)**
- Milk sugar
- Reducing sugar
- Found in milk (4-8%)

**c) Maltose (Glucose + Glucose)**
- Malt sugar
- Reducing sugar
- Formed during starch digestion

**Reducing vs Non-reducing Sugars:**
- **Reducing sugars**: Free aldehyde or ketone group (can reduce Benedict's/Fehling's reagent)
  - Examples: Glucose, fructose, maltose, lactose
- **Non-reducing sugars**: No free aldehyde/ketone group
  - Example: Sucrose

### 3. Polysaccharides (Complex Carbohydrates)

**Characteristics:**
- Polymers of monosaccharides (hundreds to thousands of units)
- Linked by glycosidic bonds
- Not sweet, not crystalline
- Insoluble or partially soluble in water

**Types:**

**A. Homopolysaccharides** (One type of monosaccharide)

**a) Starch**
- Storage polysaccharide in plants
- Polymer of **α-glucose**
- Two forms:
  - **Amylose**: Unbranched, helical (15-20%)
  - **Amylopectin**: Branched (80-85%)
- Found in: Potatoes, rice, wheat, corn
- **Iodine test**: Gives blue-black color

**b) Glycogen**
- Storage polysaccharide in animals ("animal starch")
- Polymer of **α-glucose**
- Highly branched (more than amylopectin)
- Stored in: Liver (6-10%), muscles (1-2%)
- **Iodine test**: Gives red-brown color

**c) Cellulose**
- Structural polysaccharide in plant cell walls
- Polymer of **β-glucose** (β-1,4-glycosidic bonds)
- Unbranched, linear chains
- Forms microfibrils → cellulose fibers
- Most abundant organic compound on Earth
- Humans cannot digest (lack enzyme cellulase)
- Herbivores digest with help of gut bacteria

**d) Chitin**
- Structural polysaccharide in fungal cell walls and arthropod exoskeletons
- Polymer of **N-acetyl glucosamine** (modified glucose)
- Insoluble, tough, resistant

**B. Heteropolysaccharides** (Two or more types of monosaccharides)
- Examples: Peptidoglycan (cell wall of bacteria), hemicellulose, pectin

**Functions of Carbohydrates:**
1. **Energy source**: Glucose oxidation (cellular respiration)
2. **Energy storage**: Starch (plants), glycogen (animals)
3. **Structural support**: Cellulose (plant cell walls), chitin (fungi, arthropods)
4. **Part of nucleic acids**: Ribose in RNA, deoxyribose in DNA
5. **Cell recognition**: Glycoproteins and glycolipids on cell surface

## Proteins

**Definition:** Polymers of **amino acids** linked by **peptide bonds**.

### Amino Acids

**Structure:**
- Central carbon (α-carbon) bonded to:
  - Amino group (-NH₂)
  - Carboxyl group (-COOH)
  - Hydrogen atom (-H)
  - Variable R group (side chain)

**General Formula:** NH₂-CHR-COOH

**Classification based on R group:**

**1. Based on Polarity:**
- **Non-polar**: Glycine, alanine, valine, leucine, isoleucine, proline, methionine, phenylalanine, tryptophan
- **Polar (uncharged)**: Serine, threonine, cysteine, asparagine, glutamine, tyrosine
- **Acidic** (negatively charged): Aspartic acid, glutamic acid
- **Basic** (positively charged): Lysine, arginine, histidine

**2. Based on Nutritional Requirement:**
- **Essential amino acids**: Cannot be synthesized by body, must be obtained from diet
  - 9 essential: Valine, leucine, isoleucine, phenylalanine, tryptophan, threonine, methionine, lysine, histidine
  - Mnemonic: **PVT TIM HALL** (Phenylalanine, Valine, Threonine, Tryptophan, Isoleucine, Methionine, Histidine, Arginine, Leucine, Lysine)
- **Non-essential amino acids**: Can be synthesized by body

**Special Amino Acids:**
- **Glycine**: Simplest (R = H)
- **Cysteine**: Contains sulfur, forms disulfide bonds
- **Proline**: Imino acid (secondary amine)

**Peptide Bond:**
- Covalent bond between amino group of one amino acid and carboxyl group of another
- Formed by **dehydration synthesis** (removal of water)
- -CO-NH- linkage

**Peptide Classification:**
- **Dipeptide**: 2 amino acids (e.g., glycylalanine)
- **Tripeptide**: 3 amino acids (e.g., glutathione - antioxidant)
- **Oligopeptide**: 3-10 amino acids
- **Polypeptide**: > 10 amino acids
- **Protein**: > 50 amino acids (typically 100-1000+)

### Protein Structure

**Four Levels of Organization:**

**1. Primary Structure**
- Linear sequence of amino acids in polypeptide chain
- Determined by genetic code (DNA sequence)
- Held by peptide bonds
- Determines all higher levels of structure
- Example: Insulin (51 amino acids in two chains linked by disulfide bonds)

**2. Secondary Structure**
- Regular, repeating folding patterns
- Stabilized by **hydrogen bonds** between backbone atoms
- Types:
  - **α-helix**: Right-handed spiral coil (e.g., keratin)
  - **β-pleated sheet**: Extended, zigzag structure (e.g., silk fibroin)
  - **Turns and loops**: Connect α-helices and β-sheets

**3. Tertiary Structure**
- 3D folding of entire polypeptide chain
- Stabilized by:
  - **Hydrogen bonds**
  - **Ionic bonds** (salt bridges)
  - **Disulfide bonds** (-S-S- between cysteine residues)
  - **Hydrophobic interactions**
  - **Van der Waals forces**
- Determines biological activity
- Example: Myoglobin

**4. Quaternary Structure**
- Assembly of multiple polypeptide chains (subunits)
- Each subunit has its own tertiary structure
- Stabilized by non-covalent interactions
- Example: Hemoglobin (4 subunits: 2α + 2β)

**Denaturation:**
- Loss of protein structure (secondary, tertiary, quaternary)
- Primary structure remains intact
- Caused by: Heat, pH changes, chemicals, radiation
- Results in loss of biological activity
- Can be reversible (renaturation) or irreversible

### Classification of Proteins

**1. Based on Structure:**

**a) Fibrous Proteins**
- Long, thread-like
- Structural roles
- Water-insoluble
- Examples: Collagen (connective tissue), keratin (hair, nails), fibroin (silk)

**b) Globular Proteins**
- Compact, spherical
- Functional roles (enzymes, hormones)
- Water-soluble
- Examples: Enzymes, antibodies, hemoglobin, insulin

**2. Based on Composition:**

**a) Simple Proteins**
- Contain only amino acids
- Examples: Albumin, globulin

**b) Conjugated Proteins**
- Contain amino acids + non-protein part (prosthetic group)
- Types:
  - **Glycoproteins**: Protein + carbohydrate (mucin)
  - **Lipoproteins**: Protein + lipid (HDL, LDL)
  - **Nucleoproteins**: Protein + nucleic acid (chromatin)
  - **Chromoproteins**: Protein + pigment (hemoglobin with heme)
  - **Metalloproteins**: Protein + metal ion (ferritin with iron)

### Functions of Proteins

1. **Structural**: Collagen, keratin, elastin
2. **Enzymatic**: Catalyze biochemical reactions
3. **Transport**: Hemoglobin (O₂), myoglobin, transferrin (iron)
4. **Defense**: Antibodies (immunoglobulins)
5. **Hormonal**: Insulin, growth hormone, glucagon
6. **Contractile**: Actin, myosin (muscle contraction)
7. **Storage**: Casein (milk), ovalbumin (egg)
8. **Regulatory**: Transcription factors

## Lipids

**Definition:** Hydrophobic or amphipathic biological molecules soluble in non-polar solvents (chloroform, benzene).

**Characteristics:**
- Heterogeneous group
- Mostly esters of fatty acids and glycerol
- Insoluble in water, soluble in organic solvents

### Fatty Acids

**Structure:**
- Long hydrocarbon chain (4-24 carbons)
- Terminal carboxyl group (-COOH)
- General formula: CH₃(CH₂)ₙCOOH

**Classification:**

**1. Based on Saturation:**

**a) Saturated Fatty Acids**
- No double bonds (C-C single bonds)
- Solid at room temperature
- Examples: Palmitic acid (C₁₆), stearic acid (C₁₈), butyric acid (C₄)
- Found in: Animal fats, butter, coconut oil

**b) Unsaturated Fatty Acids**
- One or more double bonds (C=C)
- **Monounsaturated**: One double bond (oleic acid - C₁₈:₁)
- **Polyunsaturated**: Multiple double bonds (linoleic acid - C₁₈:₂, linolenic acid - C₁₈:₃)
- Liquid at room temperature (oils)
- Found in: Plant oils, fish oil

**Essential Fatty Acids:**
- Cannot be synthesized by body
- Must be obtained from diet
- Examples: Linoleic acid, linolenic acid, arachidonic acid

### Classification of Lipids

**1. Simple Lipids**

**a) Fats and Oils (Triglycerides/Triacylglycerols)**
- Esters of glycerol + 3 fatty acids
- **Fats**: Solid at room temperature (animal origin)
- **Oils**: Liquid at room temperature (plant origin)
- Energy storage (9 kcal/g - highest among biomolecules)

**2. Compound Lipids (Complex Lipids)**

**a) Phospholipids**
- Glycerol + 2 fatty acids + phosphate group + alcohol
- **Amphipathic**: Hydrophilic head (phosphate) + hydrophobic tails (fatty acids)
- Major component of **cell membranes** (lipid bilayer)
- Examples: Phosphatidylcholine (lecithin), phosphatidylethanolamine, phosphatidylserine

**b) Glycolipids**
- Lipid + carbohydrate
- Found in cell membranes (outer leaflet)
- Cell recognition and signaling
- Example: Cerebrosides, gangliosides

**c) Lipoproteins**
- Lipid + protein
- Transport lipids in blood
- Types:
  - **HDL** (High-Density Lipoprotein): "Good cholesterol"
  - **LDL** (Low-Density Lipoprotein): "Bad cholesterol"
  - **VLDL** (Very Low-Density Lipoprotein)

**3. Derived Lipids**

**a) Steroids**
- Four fused carbon rings (steroid nucleus)
- Examples:
  - **Cholesterol**: Membrane component, precursor for other steroids
  - **Steroid hormones**: Testosterone, estrogen, progesterone, cortisol
  - **Bile salts**: Aid fat digestion
  - **Vitamin D**: Calcium absorption

**b) Terpenes**
- Built from isoprene units (C₅H₈)
- Examples: Carotenoids (vitamin A precursor), natural rubber

**c) Waxes**
- Esters of long-chain fatty acids + long-chain alcohols
- Protective coating on leaves, fruits, animal skin
- Example: Beeswax, lanolin

### Functions of Lipids

1. **Energy storage**: Most concentrated energy source (9 kcal/g)
2. **Structural**: Cell membrane (phospholipid bilayer)
3. **Insulation**: Thermal insulation, electrical insulation (myelin sheath)
4. **Protection**: Waterproof coating (waxes)
5. **Hormones**: Steroid hormones
6. **Vitamins**: Fat-soluble vitamins (A, D, E, K)
7. **Signaling**: Lipid-derived messengers

## Nucleic Acids

**Definition:** Polymers of **nucleotides**, store and transmit genetic information.

**Two types:** DNA (Deoxyribonucleic Acid) and RNA (Ribonucleic Acid)

### Nucleotide Structure

**Three Components:**

**1. Nitrogenous Base**

**a) Purines** (Double-ring)
- **Adenine (A)**: In DNA and RNA
- **Guanine (G)**: In DNA and RNA

**b) Pyrimidines** (Single-ring)
- **Cytosine (C)**: In DNA and RNA
- **Thymine (T)**: Only in DNA
- **Uracil (U)**: Only in RNA

**2. Pentose Sugar**
- **Ribose**: In RNA (has -OH at C-2)
- **Deoxyribose**: In DNA (lacks -OH at C-2, has -H)

**3. Phosphate Group**
- Phosphoric acid (H₃PO₄)
- Links nucleotides via phosphodiester bonds

**Nucleoside = Base + Sugar** (no phosphate)
**Nucleotide = Base + Sugar + Phosphate**

Examples:
- Adenosine (nucleoside), Adenosine monophosphate/AMP (nucleotide)
- Cytidine (nucleoside), Cytidine monophosphate/CMP (nucleotide)

### DNA (Deoxyribonucleic Acid)

**Structure:**

**Watson-Crick Model (1953):**
- **Double helix** - two polynucleotide chains
- **Antiparallel** strands (5'→3' and 3'→5')
- **Complementary base pairing**:
  - **A pairs with T** (2 hydrogen bonds)
  - **G pairs with C** (3 hydrogen bonds)
- **Chargaff's Rules**: [A] = [T] and [G] = [C]
- **Sugar-phosphate backbone** on outside
- **Bases** directed inward (perpendicular to axis)
- **Right-handed helix**
- **Major and minor grooves**

**Dimensions:**
- Diameter: 2 nm (20 Å)
- Distance between base pairs: 0.34 nm (3.4 Å)
- One complete turn: 10 base pairs (3.4 nm / 34 Å)

**Functions:**
1. **Genetic material**: Stores hereditary information
2. **Replication**: Produces copies for cell division
3. **Transcription**: Template for RNA synthesis
4. **Mutation**: Source of genetic variation

### RNA (Ribonucleic Acid)

**Structure:**
- Usually **single-stranded**
- Contains **ribose** sugar
- Contains **uracil** instead of thymine
- Can fold into complex 3D structures (secondary structure)

**Types:**

**1. mRNA (Messenger RNA)**
- Carries genetic information from DNA to ribosomes
- Template for protein synthesis
- Contains **codons** (triplet sequences coding for amino acids)
- **Monocistronic** (eukaryotes) - codes for one protein
- **Polycistronic** (prokaryotes) - codes for multiple proteins

**2. tRNA (Transfer RNA)**
- **Cloverleaf** secondary structure
- **L-shaped** tertiary structure
- **Adaptor molecule** in protein synthesis
- Carries amino acids to ribosomes
- Contains **anticodon** complementary to mRNA codon
- About 70-90 nucleotides

**3. rRNA (Ribosomal RNA)**
- Structural and catalytic component of ribosomes
- Most abundant RNA (80% of total RNA)
- Ribozyme activity (catalyzes peptide bond formation)
- Types: 28S, 18S, 5.8S, 5S (eukaryotes); 23S, 16S, 5S (prokaryotes)

**Other RNAs:**
- **snRNA** (Small Nuclear RNA): RNA splicing
- **miRNA** (MicroRNA): Gene regulation
- **siRNA** (Small Interfering RNA): Gene silencing

### DNA vs RNA Comparison

| Feature | DNA | RNA |
|---------|-----|-----|
| Sugar | Deoxyribose | Ribose |
| Bases | A, G, C, T | A, G, C, U |
| Strands | Double-stranded | Single-stranded (usually) |
| Function | Genetic material | Protein synthesis |
| Location | Nucleus (mainly) | Nucleus and cytoplasm |
| Stability | More stable | Less stable |

## Enzymes

**Definition:** Biological catalysts (mostly proteins) that speed up biochemical reactions without being consumed.

**Discovery:**
- **Eduard Buchner** - discovered enzyme activity in cell-free extracts (fermentation)
- **James Sumner (1926)** - first crystallized urease enzyme (proved enzymes are proteins)

### Characteristics of Enzymes

1. **Catalytic efficiency**: Increase reaction rate by 10⁶ to 10¹² times
2. **Specificity**: Act on specific substrates
3. **Not consumed**: Remain unchanged after reaction
4. **Lower activation energy**: Reduce energy barrier
5. **Work under mild conditions**: Physiological temperature and pH
6. **Mostly proteins**: Some are RNA (ribozymes)
7. **Can be regulated**: Enzyme activity controlled by various factors

### Chemical Nature

**1. Simple Enzymes**
- Made entirely of protein
- Example: Pepsin, trypsin

**2. Conjugated Enzymes (Holoenzymes)**
- **Apoenzyme** (protein part) + **Cofactor** (non-protein part)
- Apoenzyme alone is inactive

**Cofactors:**

**a) Prosthetic Groups**
- Organic cofactors tightly bound to enzyme
- Examples: Heme in peroxidase, FAD in succinate dehydrogenase

**b) Coenzymes**
- Organic cofactors loosely bound
- Can be separated by dialysis
- Often derived from vitamins
- Examples:
  - **NAD⁺, NADP⁺** (from niacin/vitamin B₃)
  - **FAD, FMN** (from riboflavin/vitamin B₂)
  - **Coenzyme A** (from pantothenic acid/vitamin B₅)
  - **TPP** (from thiamine/vitamin B₁)

**c) Metal Ions**
- Inorganic cofactors
- Examples:
  - Zn²⁺ (carbonic anhydrase)
  - Fe²⁺/Fe³⁺ (cytochromes, catalase)
  - Mg²⁺ (kinases, DNA polymerase)
  - Cu²⁺ (cytochrome oxidase)
  - Mn²⁺ (arginase)

### Mechanism of Enzyme Action

**Lock and Key Model** (Emil Fischer, 1894)
- Enzyme active site has specific shape
- Only specific substrate fits (like lock and key)
- Explains enzyme specificity

**Induced Fit Model** (Daniel Koshland, 1958)
- Active site not rigid
- Conformational change upon substrate binding
- Better explains enzyme catalysis

**Steps:**
1. **Substrate binding**: S + E → ES (enzyme-substrate complex)
2. **Catalysis**: ES → EP (enzyme-product complex)
3. **Product release**: EP → E + P (enzyme regenerated)

### Factors Affecting Enzyme Activity

**1. Temperature**
- **Optimum temperature**: Maximum activity (typically 37°C for human enzymes)
- **Below optimum**: Slower reaction (low kinetic energy)
- **Above optimum**: Denaturation (loss of activity)
- **Q₁₀ effect**: Reaction rate doubles for every 10°C rise (up to optimum)

**2. pH**
- **Optimum pH**: Maximum activity (varies by enzyme)
  - Pepsin: pH 2 (stomach)
  - Trypsin: pH 8 (small intestine)
  - Arginase: pH 10
- Extreme pH denatures enzyme

**3. Substrate Concentration**
- Initially: Rate increases with [S] (more ES complexes)
- **Vmax**: Maximum rate when all enzyme saturated
- **Km (Michaelis constant)**: [S] at half Vmax (measure of affinity)

**4. Enzyme Concentration**
- Rate directly proportional to [E] (if substrate is excess)

**5. Inhibitors**

**a) Competitive Inhibition**
- Inhibitor competes with substrate for active site
- Similar structure to substrate
- Can be overcome by increasing [S]
- **Km increases**, Vmax unchanged
- Example: Malonate inhibits succinate dehydrogenase

**b) Non-competitive Inhibition**
- Inhibitor binds to site other than active site (allosteric site)
- Changes enzyme shape
- Cannot be overcome by increasing [S]
- **Vmax decreases**, Km unchanged
- Example: Heavy metals (Pb²⁺, Hg²⁺)

**c) Irreversible Inhibition**
- Inhibitor permanently inactivates enzyme
- Covalent modification
- Example: Organophosphates (nerve gases)

**6. Activators**
- Increase enzyme activity
- Examples: Chloride ions activate salivary amylase

### Classification of Enzymes (IUB System)

**Six Major Classes:**

**1. Oxidoreductases**
- Catalyze oxidation-reduction reactions
- Transfer electrons, hydrogen, or oxygen
- Examples: Dehydrogenase, oxidase, peroxidase, catalase

**2. Transferases**
- Transfer functional groups between molecules
- Examples: Kinase (phosphate transfer), transaminase (amino group)

**3. Hydrolases**
- Catalyze hydrolysis reactions (break bonds using water)
- Examples: Amylase, lipase, protease, nuclease

**4. Lyases**
- Add or remove groups to form double bonds
- Non-hydrolytic cleavage
- Examples: Decarboxylase, aldolase, fumarase

**5. Isomerases**
- Catalyze intramolecular rearrangements (isomerization)
- Examples: Phosphohexose isomerase, racemase

**6. Ligases (Synthetases)**
- Join two molecules using ATP energy
- Form C-C, C-O, C-S, C-N bonds
- Examples: DNA ligase, aminoacyl-tRNA synthetase

### Importance of Enzymes

1. **Metabolic regulation**: Control biochemical pathways
2. **Digestion**: Break down food (amylase, pepsin, lipase)
3. **Blood clotting**: Thrombin, fibrinogen
4. **Industrial applications**: Food processing, brewing, detergents, biofuel
5. **Medical diagnosis**: Enzyme levels indicate diseases (ALT, AST for liver)
6. **Genetic engineering**: Restriction enzymes, DNA ligase
`,

      keyConcepts: [
        "Biomolecules: carbohydrates, proteins, lipids, nucleic acids",
        "Monosaccharides: glucose, fructose, ribose, deoxyribose",
        "Disaccharides: sucrose, lactose, maltose",
        "Polysaccharides: starch, glycogen (storage), cellulose, chitin (structural)",
        "Amino acids: building blocks of proteins, peptide bonds",
        "Protein structure: primary (sequence), secondary (α-helix, β-sheet), tertiary (3D), quaternary (multiple subunits)",
        "Fatty acids: saturated (no double bonds) vs unsaturated (C=C bonds)",
        "Lipids: triglycerides (energy), phospholipids (membranes), steroids (cholesterol, hormones)",
        "Nucleotides: nitrogenous base + pentose sugar + phosphate",
        "DNA: double helix, A-T and G-C base pairing, antiparallel strands",
        "RNA types: mRNA (messenger), tRNA (transfer), rRNA (ribosomal)",
        "Enzymes: biological catalysts, lower activation energy",
        "Enzyme-substrate complex: Lock and Key vs Induced Fit models",
        "Enzyme cofactors: prosthetic groups, coenzymes, metal ions",
        "Enzyme inhibition: competitive vs non-competitive",
        "Enzyme classification: 6 classes (oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases)",
        "Temperature and pH affect enzyme activity (optimum levels)",
        "Michaelis constant (Km): substrate affinity measure",
      ],

      formulas: [
        "Carbohydrates general formula: Cₙ(H₂O)ₙ",
        "Monosaccharides: (CH₂O)ₙ where n = 3-7",
        "Peptide bond formation: Amino acid₁ + Amino acid₂ → Dipeptide + H₂O",
        "Triglyceride = Glycerol + 3 Fatty acids",
        "Nucleotide = Nitrogenous base + Pentose sugar + Phosphate",
        "DNA base pairing: A=T (2 H-bonds), G≡C (3 H-bonds)",
        "Chargaff's rules: [A] = [T] and [G] = [C]",
        "Enzyme reaction: E + S ⇌ ES → E + P",
        "Holoenzyme = Apoenzyme (protein) + Cofactor (non-protein)",
        "Energy from biomolecules: Carbohydrates (4 kcal/g), Proteins (4 kcal/g), Lipids (9 kcal/g)",
      ],

      learningObjectives: [
        "Define biomolecules and classify them based on molecular weight",
        "Describe the structure and classification of carbohydrates",
        "Differentiate between monosaccharides, disaccharides, and polysaccharides",
        "Explain the structure of amino acids and formation of peptide bonds",
        "Understand the four levels of protein structure",
        "Describe the structure and classification of lipids",
        "Explain the importance of phospholipids in cell membranes",
        "Understand the structure of nucleotides and nucleic acids",
        "Compare and contrast DNA and RNA structure and function",
        "Define enzymes and explain their catalytic properties",
        "Describe the mechanism of enzyme action (Lock and Key, Induced Fit)",
        "Understand factors affecting enzyme activity",
        "Classify enzymes based on their functions",
        "Explain enzyme inhibition mechanisms",
      ],

      prerequisites: [
        "Basic chemistry: atomic structure, chemical bonding, functional groups",
        "Understanding of organic chemistry: hydrocarbons, alcohols, acids",
        "Knowledge of cell structure (Chapter 8)",
        "Familiarity with pH scale and solutions",
        "Basic understanding of energy and chemical reactions",
      ],

      importantTopics: [
        "Carbohydrate classification: monosaccharides, disaccharides, polysaccharides",
        "Polysaccharides: starch, glycogen, cellulose, chitin (structure and function)",
        "Amino acids: structure, classification, essential amino acids",
        "Protein structure levels: primary, secondary, tertiary, quaternary",
        "Protein denaturation and factors causing it",
        "Lipid classification: simple, compound, derived lipids",
        "Phospholipids: structure and role in cell membranes",
        "Steroids: cholesterol and steroid hormones",
        "Nucleotide structure: components and examples",
        "DNA structure: Watson-Crick model, base pairing, antiparallel strands",
        "RNA types: mRNA, tRNA, rRNA (structure and function)",
        "Enzymes: characteristics, mechanism of action",
        "Enzyme cofactors: prosthetic groups, coenzymes, metal ions",
        "Factors affecting enzyme activity: temperature, pH, substrate concentration",
        "Enzyme inhibition: competitive vs non-competitive",
        "Enzyme classification: 6 major classes with examples",
      ],

      ncertChapterRef: "Class 11 Biology - Chapter 9",
      difficultyLevel: 4,
      estimatedStudyMinutes: 360,
      status: "published",

      visualizationsData: [
        {
          type: "biomolecule-structure",
          title: "Interactive 3D Biomolecule Models",
          description:
            "Explore 3D structures of carbohydrates (glucose, starch), proteins (amino acids, α-helix, β-sheet), lipids (phospholipid bilayer), and nucleic acids (DNA double helix, RNA)",
        },
      ],
    })
    .onConflictDoUpdate({
      target: [
        chapterContent.subject,
        chapterContent.classLevel,
        chapterContent.chapterNumber,
      ],
      set: {
        chapterTitle: "Biomolecules",
        introduction:
          "Life at the molecular level is orchestrated by an intricate network of chemical compounds called biomolecules. These organic molecules form the structural framework of cells and carry out the complex chemical reactions that sustain life. From the simple sugars that provide instant energy to the complex DNA molecules that carry hereditary information, biomolecules are the fundamental building blocks and functional units of all living organisms. Understanding the structure, properties, and functions of biomolecules is essential for comprehending biological processes - from photosynthesis and respiration to growth and reproduction. This chapter explores the four major classes of biomolecules - carbohydrates, proteins, lipids, and nucleic acids - along with the remarkable catalysts called enzymes that regulate virtually every chemical reaction in living systems.",
        learningObjectives: sql`EXCLUDED.learning_objectives`,

        prerequisites: sql`EXCLUDED.prerequisites`,

        importantTopics: sql`EXCLUDED.important_topics`,

        visualizationsData: [
          {
          type: "biomolecule-structure",
          title: "Interactive 3D Biomolecule Models",
          description:
            "Explore 3D structures of carbohydrates (glucose, starch), proteins (amino acids, α-helix, β-sheet), lipids (phospholipid bilayer), and nucleic acids (DNA double helix, RNA)",
          },
        ],
        updatedAt: new Date(),
      },
    });

  console.log("✅ Biology Chapter 9: Biomolecules seeded successfully!");
}

seedBiologyChapter9()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding chapter:", error);
    process.exit(1);
  });
