import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter6() {
  console.log('Seeding Biology Class 12 Chapter 6: Molecular Basis of Inheritance...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 6,
    chapterTitle: 'Molecular Basis of Inheritance',
    introduction: `This chapter explores the molecular mechanisms of heredity, focusing on DNA as the genetic material, its structure and replication, and the processes of transcription and translation that convert genetic information into functional proteins. Understanding these molecular processes is fundamental for NEET as they form the basis of genetics, biotechnology, and molecular biology. The chapter covers landmark experiments proving DNA as genetic material, Watson-Crick DNA model, semiconservative replication, central dogma, genetic code, protein synthesis, and gene regulation through the lac operon model.`,

    detailedNotes: `
# Molecular Basis of Inheritance

## DNA as Genetic Material

### Historical Experiments

**Friedrich Miescher (1869)**: First isolated "nuclein" (DNA + proteins) from white blood cell nuclei

**Griffith's Transformation Experiment (1928)**
- Used *Streptococcus pneumoniae* bacteria
- **S strain**: Smooth, virulent (causes pneumonia)
- **R strain**: Rough, non-virulent (harmless)

**Experiment**:
1. Live S strain → Mouse dies
2. Live R strain → Mouse survives
3. Heat-killed S strain → Mouse survives
4. Heat-killed S strain + Live R strain → **Mouse dies!**

**Conclusion**: Some "transforming principle" transferred from dead S to live R, converting R to virulent S type

**Avery, MacLeod, and McCarty (1944)**
- Identified DNA as the transforming principle
- Used enzymes to destroy:
  - Protease (destroys proteins) → Transformation occurred
  - RNase (destroys RNA) → Transformation occurred
  - DNase (destroys DNA) → **No transformation**

**Conclusion**: DNA is the transforming principle, not protein or RNA

**Hershey-Chase Experiment (1952) - "Blender Experiment"**
- Used bacteriophage T2 (virus infecting bacteria)
- **Radioactive labeling**:
  - DNA labeled with ³²P (radioactive phosphorus)
  - Protein coat labeled with ³⁵S (radioactive sulfur)

**Experiment**:
1. Infected bacteria with labeled phages
2. Blended to separate phage coats from bacteria
3. Centrifuged to separate bacteria (pellet) from phage coats (supernatant)

**Results**:
- ³²P (DNA) found in bacteria (pellet)
- ³⁵S (protein) found in supernatant

**Conclusion**: DNA enters bacteria and directs production of new phages; DNA is the genetic material

## Structure of DNA

### Chargaff's Rules (1950)

1. Amount of adenine (A) = Amount of thymine (T)
2. Amount of guanine (G) = Amount of cytosine (C)
3. A + G = T + C (purines = pyrimidines)
4. (A + T) / (G + C) ratio varies between species

### Watson and Crick Model (1953)

**Structural Features**:
- **Double helix**: Two polynucleotide chains coiled around same axis
- **Antiparallel strands**: One strand 5' → 3', other 3' → 5'
- **Sugar-phosphate backbone**: Outside of helix
- **Nitrogenous bases**: Inside, perpendicular to axis
- **Right-handed helix**
- **Diameter**: 2 nm (20 Å)
- **Distance between base pairs**: 0.34 nm (3.4 Å)
- **Pitch** (one complete turn): 3.4 nm = 10 base pairs

**Base Pairing (Complementary)**:
- **Adenine (A) ≡ Thymine (T)**: 2 hydrogen bonds
- **Guanine (G) ≡ Cytosine (C)**: 3 hydrogen bonds
- Purine always pairs with pyrimidine (constant diameter)

### Components of DNA

**1. Sugar**: Deoxyribose (5-carbon sugar, lacks 2'-OH group)

**2. Phosphate**: Links sugars via **phosphodiester bonds** (between 3' carbon of one sugar and 5' carbon of next)

**3. Nitrogenous Bases**:
- **Purines** (double ring): Adenine (A), Guanine (G)
- **Pyrimidines** (single ring): Thymine (T), Cytosine (C)

### RNA Structure

**Differences from DNA**:
- **Single-stranded** (except in some viruses like Reovirus)
- **Sugar**: Ribose (has 2'-OH group)
- **Bases**: Uracil (U) replaces Thymine (T)
- Generally shorter than DNA

**Types of RNA**:
1. **mRNA** (messenger RNA): Carries genetic code from DNA to ribosomes
2. **tRNA** (transfer RNA): Brings amino acids to ribosomes
3. **rRNA** (ribosomal RNA): Structural component of ribosomes

## DNA Replication

### Meselson-Stahl Experiment (1958)

**Proved**: DNA replication is **semiconservative**

**Experiment**:
- Grew *E. coli* in medium with heavy nitrogen (¹⁵N) for many generations
- DNA became heavy (both strands with ¹⁵N)
- Transferred to normal ¹⁴N medium for one generation
- DNA analyzed by density gradient centrifugation

**Results**:
- After one generation: All DNA had **intermediate density** (hybrid)
- After two generations: 50% intermediate, 50% light density

**Conclusion**: Each new DNA molecule has one original strand and one newly synthesized strand (semiconservative)

### Mechanism of Replication

**Step 1: Initiation**
- Begins at **origin of replication** (ori)
- **Helicase** unwinds double helix, creating replication fork
- **SSB proteins** (single-strand binding) stabilize separated strands
- **Topoisomerase** relieves tension ahead of replication fork

**Step 2: Elongation**

**Leading Strand**:
- Synthesized continuously in 5' → 3' direction
- Same direction as replication fork movement

**Lagging Strand**:
- Synthesized discontinuously as **Okazaki fragments**
- Direction opposite to replication fork movement
- Each fragment is 1000-2000 nucleotides (prokaryotes) or 100-200 (eukaryotes)

**Steps**:
1. **Primase** synthesizes short RNA primers
2. **DNA Polymerase III** adds nucleotides in 5' → 3' direction
3. **DNA Polymerase I** removes RNA primers and fills gaps
4. **DNA Ligase** joins Okazaki fragments

**Step 3: Termination**
- Replication forks meet
- Final fragments joined
- Circular DNA: Complete circles formed
- Linear DNA: Special mechanisms for chromosome ends (telomeres)

**Enzymes Involved**:
- **Helicase**: Unwinds DNA double helix
- **Topoisomerase**: Relieves supercoiling
- **Primase**: Synthesizes RNA primers
- **DNA Polymerase III**: Main replicating enzyme (adds nucleotides)
- **DNA Polymerase I**: Removes primers, fills gaps
- **DNA Ligase**: Joins DNA fragments

**Proofreading**: DNA polymerase has 3' → 5' exonuclease activity to remove incorrect nucleotides (error rate: 1 in 10⁹)

## Transcription

**Central Dogma** (Francis Crick):
DNA → RNA → Protein (Replication → Transcription → Translation)

**Definition**: Synthesis of RNA from DNA template

### Steps of Transcription

**1. Initiation**
- **RNA polymerase** binds to **promoter** region
- **Prokaryotes**: σ (sigma) factor helps recognition
- **Eukaryotes**: Transcription factors required (TFIID, etc.)
- DNA unwinds at promoter

**2. Elongation**
- RNA polymerase moves along **template strand** (3' → 5')
- Synthesizes RNA in **5' → 3'** direction
- Only one strand transcribed (template/antisense strand)
- Other strand is coding/sense strand (same sequence as mRNA except T→U)
- **No primer required** (unlike DNA replication)
- **Nucleotides**: ATP, GTP, CTP, UTP

**3. Termination**
- **Terminator sequence** signals end
- **Prokaryotes**: Rho-dependent or rho-independent termination
- **Eukaryotes**: Polyadenylation signal (AAUAAA)

### Post-Transcriptional Modifications (Eukaryotes)

**1. Capping (5' end)**
- **7-methylguanosine cap** added
- Functions:
  - Protects from degradation
  - Helps ribosome binding
  - Facilitates export from nucleus

**2. Tailing (3' end)**
- **Poly-A tail** (200 adenine nucleotides) added
- Functions:
  - Stability
  - Helps export from nucleus
  - Translation regulation

**3. Splicing**
- Removal of **introns** (non-coding sequences)
- Joining of **exons** (coding sequences)
- Done by **spliceosome** (snRNPs + proteins)
- **Alternative splicing**: Different proteins from same gene

**Split Genes**: Eukaryotic genes have interrupted coding sequences (exons separated by introns). Prokaryotes lack introns.

## Genetic Code

**Definition**: Sequence of nucleotides in mRNA that specifies amino acid sequence in proteins

### Features of Genetic Code

1. **Triplet Code**: Three nucleotides (codon) code for one amino acid
2. **Degenerate**: Most amino acids coded by more than one codon (except Met and Trp)
3. **Universal**: Same code in all organisms (with minor exceptions in mitochondria)
4. **Non-overlapping**: Each nucleotide part of only one codon
5. **Commaless**: No punctuation between codons
6. **Start Codon**: AUG (codes for methionine, initiates translation)
7. **Stop Codons**: UAA, UAG, UGA (terminate translation, no amino acid)

**Total Codons**: 4³ = 64 (61 code for amino acids, 3 are stop codons)

## Translation

**Definition**: Synthesis of proteins from mRNA template

### Steps of Translation

**1. Activation of Amino Acids**
- Amino acid + tRNA + ATP → **Aminoacyl-tRNA**
- Catalyzed by **aminoacyl-tRNA synthetase**
- Specific enzyme for each amino acid (high fidelity)

**2. Initiation**
- Small ribosomal subunit (40S) binds to mRNA at **Shine-Dalgarno sequence** (prokaryotes) or 5' cap (eukaryotes)
- **Start codon AUG** recognized
- **Initiator tRNA** (Met-tRNA) binds to P site
- Large ribosomal subunit (60S) joins
- **Ribosome sites**:
  - **A site**: Aminoacyl (incoming tRNA)
  - **P site**: Peptidyl (growing chain)
  - **E site**: Exit (empty tRNA leaves)

**3. Elongation**
- Aminoacyl-tRNA enters A site (codon recognition)
- **Peptide bond** forms between amino acids (peptidyl transferase)
- Ribosome moves 3 nucleotides (translocation)
- tRNA moves: A → P → E site
- Empty tRNA exits from E site

**4. Termination**
- **Stop codon** (UAA, UAG, UGA) reaches A site
- **Release factors** bind (no tRNA for stop codons)
- Polypeptide chain released
- Ribosomal subunits dissociate

### Post-Translational Modifications

- Folding into 3D structure (chaperones help)
- Cleavage of signal sequences
- Addition of chemical groups:
  - **Phosphorylation**: Adding phosphate groups
  - **Glycosylation**: Adding carbohydrate groups
  - **Methylation**: Adding methyl groups
- Formation of **disulfide bonds** (between cysteine residues)

## Regulation of Gene Expression

### Lac Operon (Jacob and Monod, 1961)

**Model organism**: *E. coli*
**Function**: Regulates lactose metabolism

**Components**:

**Structural Genes**:
- **lacZ**: Codes for β-galactosidase (breaks lactose → glucose + galactose)
- **lacY**: Codes for permease (transports lactose into cell)
- **lacA**: Codes for transacetylase (acetylates lactose)

**Regulatory Elements**:
- **Promoter (P)**: RNA polymerase binding site
- **Operator (O)**: Repressor binding site
- **Regulatory gene (lacI)**: Produces repressor protein

**Mechanism**:

**Lactose Absent** (Operon OFF):
1. Repressor protein binds to operator
2. Blocks RNA polymerase from transcribing structural genes
3. No enzymes produced

**Lactose Present** (Operon ON):
1. Lactose (inducer) binds to repressor
2. Repressor changes shape, releases from operator
3. RNA polymerase transcribes structural genes
4. Enzymes produced to metabolize lactose

**Positive Regulation**:
- **CAP-cAMP** complex enhances transcription when glucose is low
- Provides preferential use of glucose over lactose

### Eukaryotic Gene Regulation

More complex, occurs at multiple levels:
1. **Chromatin remodeling**: Acetylation, methylation of histones
2. **Transcriptional control**: Transcription factors, enhancers
3. **Post-transcriptional**: RNA splicing, RNA stability
4. **Translational control**: miRNA regulation
5. **Post-translational**: Protein modifications, degradation

## Human Genome

- **~3 billion base pairs**
- **~30,000 genes** (only 1.5% codes for proteins)
- **99.9% similarity** between individuals
- **Completed in 2003** (Human Genome Project)

## Important Formulae

1. **Base pairing**: A=T (2 H-bonds), G≡C (3 H-bonds)
2. **DNA length**: Number of base pairs × 0.34 nm
3. **Number of turns**: Number of base pairs ÷ 10
4. **Number of codons**: 4³ = 64

## Summary Points

1. DNA is the genetic material, proven by Griffith, Avery, and Hershey-Chase experiments
2. DNA is a double helix with antiparallel strands and complementary base pairing (A-T, G-C)
3. DNA replication is semiconservative with leading and lagging strand synthesis
4. Transcription produces RNA from DNA; translation produces proteins from RNA
5. Genetic code is triplet, degenerate, universal, and non-overlapping
6. Gene expression is regulated by operons in prokaryotes and multiple mechanisms in eukaryotes
7. Central dogma: DNA → RNA → Protein
`,

    visualizationsData: [
      {
        type: 'diagram',
        title: 'DNA Double Helix',
        description: 'Base pairing and antiparallel strands.'
      },
      {
        type: 'flowchart',
        title: 'Central Dogma',
        description: 'DNA -> RNA -> Protein.'
      },
      {
        type: 'diagram',
        title: 'DNA Replication Fork',
        description: 'Leading and lagging strand synthesis.'
      },
      {
        type: 'table',
        title: 'Genetic Code Features',
        description: 'Codons, start/stop signals, and degeneracy.'
      },
      {
        type: 'comparison',
        title: 'Prokaryotic vs Eukaryotic Gene',
        description: 'Introns, promoters, and processing differences.'
      },
    ],
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Molecular Basis of Inheritance',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
      visualizationsData: [
        {
          type: 'diagram',
          title: 'DNA Double Helix',
          description: 'Base pairing and antiparallel strands.'
        },
        {
          type: 'flowchart',
          title: 'Central Dogma',
          description: 'DNA -> RNA -> Protein.'
        },
        {
          type: 'diagram',
          title: 'DNA Replication Fork',
          description: 'Leading and lagging strand synthesis.'
        },
        {
          type: 'table',
          title: 'Genetic Code Features',
          description: 'Codons, start/stop signals, and degeneracy.'
        },
        {
          type: 'comparison',
          title: 'Prokaryotic vs Eukaryotic Gene',
          description: 'Introns, promoters, and processing differences.'
        },
      ],}
  });

  console.log('✓ Seeded Biology Class 12 Chapter 6: Molecular Basis of Inheritance');
}

seedBiologyClass12Chapter6().catch(console.error);
