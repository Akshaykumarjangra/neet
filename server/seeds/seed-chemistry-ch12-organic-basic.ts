import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter12() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 12: Organic Chemistry - Some Basic Principles...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 12,
    chapterTitle: 'Organic Chemistry - Some Basic Principles and Techniques',
    introduction: `Organic chemistry is the study of carbon-containing compounds and their properties, structures, reactions, and synthesis. Carbon's unique ability to form stable bonds with itself and other elements creates millions of organic compounds that form the basis of life and modern materials. This chapter introduces fundamental concepts including classification of organic compounds, nomenclature (IUPAC), isomerism, electronic effects, reaction mechanisms, and purification techniques. Understanding these principles is essential for studying biochemistry, pharmaceuticals, polymers, and the chemistry of life itself.`,

    detailedNotes: `## Why Carbon Forms Covalent Compounds

**Tetravalency:** Carbon has 4 valence electrons (2s² 2p²)
- Cannot lose/gain 4 electrons (too high energy)
- Forms 4 covalent bonds through sharing

**Catenation:** Ability to form long chains
- C-C bond is very strong (347 kJ/mol)
- Forms chains, rings, branched structures
- Unlike Si-Si bonds (weaker, less stable)

**Small Size:** Allows strong π bonding
- Forms double and triple bonds
- Multiple bonding with C, O, N, S

**Tetrahedrality:** sp³ hybridization
- Tetrahedral geometry (109.5°)
- Allows 3D structural diversity

## Classification of Organic Compounds

### Based on Structure

**1. Acyclic (Open Chain/Aliphatic)**
- Straight or branched chains
- Examples: CH₃-CH₂-CH₃ (propane), CH₃-CH(CH₃)-CH₃ (isobutane)

**2. Cyclic (Closed Chain)**

**a) Alicyclic (Carbocyclic):**
- Rings of carbon atoms
- Examples: Cyclopropane, cyclohexane

**b) Aromatic:**
- Special stability (Hückel's rule: 4n+2 π electrons)
- Example: Benzene (C₆H₆)

**c) Heterocyclic:**
- Rings containing heteroatoms (O, N, S)
- Examples: Furan, pyridine, thiophene

### Based on Functional Groups

**Functional Group:** Atom or group determining chemical properties

**Major Functional Groups:**
- **Alkanes:** C-C single bonds (e.g., CH₃CH₃)
- **Alkenes:** C=C double bond (e.g., CH₂=CH₂)
- **Alkynes:** C≡C triple bond (e.g., HC≡CH)
- **Alcohols:** -OH (e.g., CH₃OH)
- **Aldehydes:** -CHO (e.g., HCHO)
- **Ketones:** >C=O (e.g., CH₃COCH₃)
- **Carboxylic Acids:** -COOH (e.g., CH₃COOH)
- **Esters:** -COOR (e.g., CH₃COOCH₃)
- **Amines:** -NH₂ (e.g., CH₃NH₂)
- **Halides:** -X (e.g., CH₃Cl)

## IUPAC Nomenclature

**Steps for naming:**

**1. Identify longest carbon chain (parent chain)**
**2. Number the chain** (lowest numbers to substituents/functional groups)
**3. Name substituents** (alkyl groups, halogens)
**4. Arrange substituents alphabetically**
**5. Add functional group suffix**

**Prefixes:**
- 1 C: Meth-
- 2 C: Eth-
- 3 C: Prop-
- 4 C: But-
- 5 C: Pent-
- 6 C: Hex-

**Suffixes:**
- Alkane: -ane
- Alkene: -ene
- Alkyne: -yne
- Alcohol: -ol
- Aldehyde: -al
- Ketone: -one
- Carboxylic acid: -oic acid

**Examples:**
- CH₃-CH₂-CH₂-CH₃: Butane
- CH₃-CH(CH₃)-CH₃: 2-Methylpropane
- CH₃-CH₂-OH: Ethanol
- CH₃-CHO: Ethanal
- CH₃-CO-CH₃: Propanone
- CH₃-COOH: Ethanoic acid

## Isomerism

**Isomers:** Compounds with same molecular formula but different structures

### Structural Isomerism (Constitutional Isomerism)

**1. Chain Isomerism**
- Different carbon skeleton
- Example: C₄H₁₀
  - CH₃-CH₂-CH₂-CH₃ (butane)
  - CH₃-CH(CH₃)-CH₃ (2-methylpropane)

**2. Position Isomerism**
- Different position of functional group/substituent
- Example: C₃H₈O
  - CH₃-CH₂-CH₂-OH (1-propanol)
  - CH₃-CH(OH)-CH₃ (2-propanol)

**3. Functional Group Isomerism**
- Different functional groups
- Example: C₂H₆O
  - CH₃-CH₂-OH (ethanol)
  - CH₃-O-CH₃ (dimethyl ether)

**4. Metamerism**
- Different alkyl groups around same functional group
- Example: C₄H₁₀O (ethers)
  - CH₃-O-CH₂-CH₂-CH₃
  - CH₃-CH₂-O-CH₂-CH₃

**5. Tautomerism**
- Rapid equilibrium between two forms
- Example: Keto-enol tautomerism
  - CH₃-CO-CH₃ ⇌ CH₃-C(OH)=CH₂

### Stereoisomerism

**Same connectivity, different spatial arrangement**

**1. Geometrical Isomerism (cis-trans)**
- Due to restricted rotation (C=C or ring)
- **cis:** Same side
- **trans:** Opposite sides
- Example: But-2-ene
  - cis-but-2-ene
  - trans-but-2-ene

**2. Optical Isomerism**
- Due to chirality (asymmetric carbon)
- **Chiral carbon:** 4 different groups attached
- **Enantiomers:** Non-superimposable mirror images
- Rotate plane-polarized light
  - Dextrorotatory (+): Clockwise
  - Levorotatory (-): Anticlockwise
- **Racemic mixture:** Equal mixture of enantiomers (optically inactive)

## Electronic Effects

### Inductive Effect (I)

**Definition:** Transmission of charge through σ bonds

**-I Effect (Electron-withdrawing):**
- Groups more electronegative than H
- Examples: -NO₂, -CN, -COOH, -F, -Cl, -Br, -I, -OH
- Order: -NO₂ > -CN > -COOH > -F > -Cl > -Br > -I > -OH

**+I Effect (Electron-donating):**
- Groups less electronegative than H (alkyl groups)
- Examples: -CH₃, -C₂H₅
- Order: -C(CH₃)₃ > -CH(CH₃)₂ > -CH₂CH₃ > -CH₃

**Decreases with distance:** Effect diminishes along chain

### Resonance (Mesomeric Effect)

**Definition:** Delocalization of π electrons

**Resonance structures:**
- Same positions of atoms
- Different positions of electrons
- Actual structure is resonance hybrid

**-M Effect (Electron-withdrawing):**
- Groups with π bond to electronegative atom
- Examples: -NO₂, -CHO, -COOH, -CN

**+M Effect (Electron-donating):**
- Lone pair donated to π system
- Examples: -OH, -OR, -NH₂, -Cl, -Br, -I

**Example: Benzene**
- 6 π electrons delocalized
- All C-C bonds equal length (139 pm)
- Resonance stabilization

### Electromeric Effect (E)

**Temporary effect in presence of reagent**
- Complete transfer of π electron pair
- +E and -E effects

### Hyperconjugation

**No-bond resonance**
- Delocalization involving σ bond (C-H)
- Stabilizes carbocations and free radicals
- Example: CH₃-CH₂⁺ (ethyl cation)

## Types of Organic Reactions

### Based on Bond Breaking

**1. Homolytic Fission**
- Bond breaks symmetrically
- Each atom gets one electron
- Forms free radicals
- A:B → A• + B•

**2. Heterolytic Fission**
- Bond breaks asymmetrically
- One atom gets both electrons
- Forms ions
- A:B → A⁺ + :B⁻

### Types of Reagents

**1. Nucleophiles (Nucleus-loving)**
- Electron-rich species
- Donate electron pair
- Examples: OH⁻, CN⁻, NH₃, H₂O

**2. Electrophiles (Electron-loving)**
- Electron-deficient species
- Accept electron pair
- Examples: H⁺, NO₂⁺, BF₃, AlCl₃, carbocations

### Types of Reactions

**1. Substitution**
- One atom/group replaced by another
- Example: CH₃Cl + OH⁻ → CH₃OH + Cl⁻

**2. Addition**
- Two molecules combine
- Example: CH₂=CH₂ + H₂ → CH₃-CH₃

**3. Elimination**
- Removal of atoms/groups
- Example: CH₃-CH₂-Br → CH₂=CH₂ + HBr

**4. Rearrangement**
- Change in carbon skeleton
- Example: CH₃-CH(CH₃)-CH₂⁺ → CH₃-C⁺(CH₃)-CH₃

## Reactive Intermediates

**1. Carbocations (R₃C⁺)**
- Positively charged carbon
- sp² hybridized, planar
- Stability: 3° > 2° > 1° > CH₃⁺
- Stabilized by +I effect and hyperconjugation

**2. Carbanions (R₃C:⁻)**
- Negatively charged carbon
- sp³ hybridized, pyramidal
- Stability: CH₃⁻ > 1° > 2° > 3°
- Stabilized by -I effect

**3. Free Radicals (R₃C•)**
- Unpaired electron
- sp² hybridized
- Stability: 3° > 2° > 1° > CH₃•
- Stabilized by hyperconjugation

**4. Carbenes (R₂C:)**
- Neutral, divalent carbon
- Two non-bonding electrons
- Highly reactive

## Purification of Organic Compounds

**1. Sublimation**
- For volatile solids
- Direct solid → vapor → solid
- Example: Camphor, benzoic acid

**2. Crystallization**
- Dissolve in hot solvent, cool to crystallize
- Removes impurities

**3. Distillation**
- **Simple:** For liquids with large b.p. difference
- **Fractional:** For liquids with close b.p.
- **Steam:** For heat-sensitive, water-immiscible compounds
- **Vacuum:** For high b.p. compounds

**4. Differential Extraction**
- Based on solubility differences
- Use separating funnel

**5. Chromatography**
- **Adsorption:** Paper, TLC, column
- **Partition:** Paper chromatography
- Separates based on differential migration

## Qualitative Analysis

**Detection of Elements:**

**1. Nitrogen (Lassaigne's Test):**
Na + compound → Na extract
Na extract + FeSO₄ + heat → Prussian blue (Fe₄[Fe(CN)₆]₃)

**2. Sulfur:**
Na extract + Pb(CH₃COO)₂ → PbS (black ppt)

**3. Halogens:**
Na extract + AgNO₃:
- Cl: White ppt (AgCl)
- Br: Pale yellow ppt (AgBr)
- I: Yellow ppt (AgI)

## Quantitative Analysis

**1. Carbon and Hydrogen (Liebig Method)**
- Combustion analysis
- % C from CO₂ collected
- % H from H₂O collected

**2. Nitrogen (Dumas Method, Kjeldahl Method)**
- Dumas: N₂ gas volume measured
- Kjeldahl: NH₃ absorbed in acid, titrated

**3. Molecular Mass Determination**
- **Silver salt method**
- **Chloroplatinate method**
- **Victor Meyer method**`,

    keyConcepts: [
      'Carbon forms covalent compounds due to tetravalency and small size',
      'Catenation: carbon chain-forming ability unique to carbon',
      'Classification: aliphatic, cyclic (alicyclic, aromatic, heterocyclic)',
      'Functional groups determine chemical properties',
      'IUPAC nomenclature: prefix-parent-suffix system',
      'Structural isomerism: chain, position, functional, metamerism, tautomerism',
      'Stereoisomerism: geometrical (cis-trans) and optical (enantiomers)',
      'Inductive effect: electron transmission through σ bonds',
      'Resonance: delocalization of π electrons',
      'Homolytic vs heterolytic bond fission',
      'Nucleophiles (electron donors) vs electrophiles (electron acceptors)',
      'Reactive intermediates: carbocations, carbanions, free radicals',
      'Purification techniques: distillation, crystallization, chromatography'
    ],

    formulas: [
      'Carbocation stability: 3° > 2° > 1° > CH₃⁺',
      'Carbanion stability: CH₃⁻ > 1° > 2° > 3°',
      'Free radical stability: 3° > 2° > 1° > CH₃•',
      '-I effect order: -NO₂ > -CN > -COOH > -F > -Cl',
      '+I effect order: -C(CH₃)₃ > -CH(CH₃)₂ > -CH₂CH₃ > -CH₃',
      'Hückel\'s rule: 4n+2 π electrons for aromaticity'
    ],

    learningObjectives: [
      'Understand why carbon forms covalent compounds',
      'Classify organic compounds by structure and functional groups',
      'Apply IUPAC nomenclature rules for naming',
      'Identify different types of isomerism',
      'Explain electronic effects: inductive and resonance',
      'Differentiate between nucleophiles and electrophiles',
      'Understand stability of reactive intermediates',
      'Describe purification techniques for organic compounds',
      'Perform qualitative analysis for elements',
      'Calculate empirical and molecular formulas'
    ],

    prerequisites: [
      'Chemical bonding and hybridization (Chapter 4)',
      'Basic stoichiometry (Chapter 1)',
      'Understanding of electronegativity',
      'Concept of oxidation states',
      'Basic algebra for formula calculations'
    ],

    importantTopics: [
      'Catenation and tetravalency of carbon',
      'IUPAC nomenclature rules and examples',
      'Types of isomerism with clear examples',
      'Chirality and optical activity',
      'Inductive effect: +I and -I groups order',
      'Resonance structures and stability',
      'Carbocation stability order (hyperconjugation)',
      'Nucleophile vs electrophile identification',
      'Homolytic vs heterolytic fission',
      'Purification: distillation types, chromatography'
    ],

    ncertChapterRef: 'Chapter 12, Pages 327-363',

    difficultyLevel: 4,
    estimatedStudyMinutes: 330,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Hybridization in Carbon',
        description: '3D models showing sp³, sp², and sp hybridization states with geometry'
      },
      {
        type: 'concept',
        title: 'Resonance in Benzene',
        description: 'Animation of electron delocalization in benzene ring showing resonance structures'
      },
      {
        type: 'concept',
        title: 'Optical Isomers',
        description: 'Interactive 3D visualization of enantiomers and their mirror-image relationship'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 12: Organic Chemistry - Some Basic Principles seeded successfully');
}

seedChemistryChapter12()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
