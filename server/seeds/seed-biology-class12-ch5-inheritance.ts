import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter5() {
  console.log('Seeding Biology Class 12 Chapter 5: Principles of Inheritance and Variation...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 5,
    chapterTitle: 'Principles of Inheritance and Variation',
    introduction: `Genetics is the branch of biology that deals with heredity and variation. This chapter explores Mendel's groundbreaking experiments that laid the foundation for understanding inheritance patterns, chromosomal theory of inheritance, sex determination mechanisms, genetic disorders, and the role of mutations in creating variation. Understanding these principles is crucial for NEET as they form the basis of modern genetics, biotechnology, and evolutionary biology. The chapter covers Mendel's laws, linkage and crossing over, pedigree analysis, chromosomal and Mendelian disorders, and the molecular basis of variation.`,

    detailedNotes: `
# Principles of Inheritance and Variation

## Mendel's Laws of Inheritance

**Gregor Mendel (1822-1884)**: "Father of Genetics" - Austrian monk who conducted experiments on garden pea (Pisum sativum) from 1856-1863.

**Why Pea Plant?**
- Distinct contrasting traits (tall/dwarf, round/wrinkled)
- Short life cycle, easy to cultivate
- True-breeding varieties available
- Self-pollination and cross-pollination both possible
- Large number of offspring

### Monohybrid Cross

**Experiment**: Crossed tall plant (TT) × dwarf plant (tt)
- **F₁ generation**: All tall (100%)
- **F₂ generation** (F₁ self-pollination): 3 tall : 1 dwarf

**Law of Dominance**: When two contrasting traits are crossed, one trait (dominant) expresses itself while the other (recessive) remains masked in F₁ generation.

**Law of Segregation**: During gamete formation, paired alleles separate (segregate) so that each gamete receives only one allele. During fertilization, alleles unite randomly.

**Genotypic Ratio**: 1 TT : 2 Tt : 1 tt
**Phenotypic Ratio**: 3 Tall : 1 Dwarf

### Dihybrid Cross

**Experiment**: Round-yellow seeds (RRYY) × Wrinkled-green seeds (rryy)
- **F₁**: All round-yellow (RrYy)
- **F₂**: 9:3:3:1 ratio
  - 9 Round-Yellow
  - 3 Round-Green
  - 3 Wrinkled-Yellow
  - 1 Wrinkled-Green

**Law of Independent Assortment**: When two pairs of traits are combined in a hybrid, segregation of one pair is independent of the other pair.

**Test Cross**: Crossing an organism with unknown genotype with homozygous recessive organism (F₁ × recessive parent) to determine if it's homozygous dominant or heterozygous.

**Back Cross**: Crossing F₁ hybrid with either of the parental types.

## Chromosomal Theory of Inheritance

**Sutton and Boveri (1902)**: Proposed that genes are located on chromosomes. Chromosomes serve as physical carriers of genetic information.

**Evidence**:
- Chromosomes and genes both occur in pairs
- Chromosomes segregate during meiosis (like genes)
- Independent assortment of chromosomes corresponds to independent assortment of genes

### Linkage and Crossing Over

**Linkage**: Genes located on the same chromosome tend to be inherited together. Discovered by Thomas Hunt Morgan in Drosophila (fruit flies).

**Types**:
- **Complete Linkage**: Genes stay together (rare, only in male Drosophila)
- **Incomplete Linkage**: Some recombination occurs

**Crossing Over**: Physical exchange of chromosomal segments between non-sister chromatids of homologous chromosomes during prophase I of meiosis.

**Recombination Frequency**: Percentage of recombinant offspring
- Directly proportional to distance between genes
- 1% recombination = 1 map unit (centimorgan)

**Genetic Mapping**: Creating chromosome maps showing relative positions of genes based on recombination frequencies.

## Sex Determination

### XY Type (Humans, Drosophila)
- **Females**: XX (homogametic - produce one type of gamete)
- **Males**: XY (heterogametic - produce two types of gametes)
- Sex determined by sperm carrying X or Y chromosome

### ZW Type (Birds, Butterflies)
- **Males**: ZZ (homogametic)
- **Females**: ZW (heterogametic)

### XO Type (Grasshoppers, Cockroaches)
- **Females**: XX
- **Males**: XO (one X chromosome, no Y)

### Sex-Linked Inheritance

Genes located on sex chromosomes show different inheritance patterns.

**X-linked traits**: More common in males (hemizygous condition)

**Examples**:
- **Hemophilia A**: X-linked recessive, blood clotting disorder due to deficiency of Factor VIII
- **Color blindness** (red-green): X-linked recessive, inability to distinguish certain colors
- **Duchenne muscular dystrophy**: X-linked recessive, progressive muscle degeneration

**Pedigree Analysis**: Study of inheritance patterns through family trees to determine if a trait is dominant/recessive, autosomal/sex-linked.

**Symbols**:
- Square = Male
- Circle = Female
- Filled = Affected
- Unfilled = Normal
- Half-filled = Carrier

## Genetic Disorders

### Mendelian Disorders (Single Gene Disorders)

#### Autosomal Recessive

**1. Sickle Cell Anemia**
- Mutation in β-globin gene (HbS)
- Glutamic acid replaced by valine at 6th position
- Red blood cells become sickle-shaped
- Causes: Anemia, pain, organ damage
- Heterozygotes: Resistance to malaria

**2. Phenylketonuria (PKU)**
- Deficiency of phenylalanine hydroxylase enzyme
- Phenylalanine accumulates in blood
- Causes mental retardation if untreated
- Treatment: Diet low in phenylalanine

**3. Thalassemia**
- Defective synthesis of α or β globin chains of hemoglobin
- α-Thalassemia: α-chain defect
- β-Thalassemia: β-chain defect
- Causes severe anemia, requires blood transfusion

#### Autosomal Dominant

**Huntington's Disease**
- Neurodegenerative disorder
- Symptoms appear in middle age (35-44 years)
- Progressive loss of muscle control, cognitive decline
- No cure available

### Chromosomal Disorders

Due to absence, excess, or abnormal arrangement of chromosomes.

**1. Down Syndrome (Trisomy 21)**
- Extra chromosome 21 (47 chromosomes total)
- Characteristics:
  - Mental retardation
  - Short stature
  - Characteristic facial features (flat face, protruding tongue)
  - Palm crease
  - Congenital heart defects

**2. Klinefelter Syndrome (47, XXY)**
- Extra X chromosome in males
- Characteristics:
  - Tall stature, long limbs
  - Gynecomastia (breast development)
  - Sterility (underdeveloped testes)
  - Feminine body features

**3. Turner Syndrome (45, XO)**
- Missing X chromosome in females (only 45 chromosomes)
- Characteristics:
  - Short stature
  - Webbed neck
  - Sterility (rudimentary ovaries)
  - Shield-shaped chest

**Genetic Counseling Tools**:
- **Karyotyping**: Photographing and arranging chromosomes during metaphase
- **Amniocentesis**: Testing amniotic fluid for genetic disorders (14-16 weeks)
- **Chorionic villus sampling (CVS)**: Testing placental tissue (8-10 weeks)

## Variation and Mutations

**Variation**: Differences among individuals of the same species.

### Types of Variation

**1. Continuous Variation**
- Shows a range of phenotypes (height, skin color, weight)
- Controlled by multiple genes (polygenic)
- Influenced by environment
- Bell-shaped distribution curve

**2. Discontinuous Variation**
- Distinct categories, no intermediates (blood groups, seed shape)
- Controlled by single genes (monogenic)
- Little environmental influence
- Clear-cut phenotypic classes

### Mutations

**Definition**: Sudden heritable change in genetic material.

#### Gene/Point Mutations

**1. Substitution**: One base pair replaced by another
- Example: Sickle cell anemia (GAG → GTG)

**2. Insertion**: Addition of base pairs
- Causes frameshift mutation
- Alters all downstream codons

**3. Deletion**: Removal of base pairs
- Causes frameshift mutation
- May result in non-functional protein

#### Chromosomal Mutations

**1. Deletion**: Loss of chromosomal segment
- Example: Cri-du-chat syndrome (deletion in chromosome 5)

**2. Duplication**: Segment repeated
- Provides raw material for evolution

**3. Inversion**: Segment reversed (180° rotation)
- May affect gene expression

**4. Translocation**: Segment transferred to another chromosome
- Example: Chronic Myeloid Leukemia (Philadelphia chromosome)

### Mutagens

**Physical Mutagens**:
- UV radiation, X-rays, gamma rays
- Ionizing radiation

**Chemical Mutagens**:
- Nitrous acid, alkylating agents
- Base analogs (5-bromouracil)
- Intercalating agents (acridine dyes)

**Biological Mutagens**:
- Certain viruses
- Transposons (jumping genes)

## Important Formulae

1. **F₂ Monohybrid Ratio**: 3:1 (phenotypic), 1:2:1 (genotypic)
2. **F₂ Dihybrid Ratio**: 9:3:3:1 (phenotypic)
3. **Number of gamete types**: 2ⁿ (where n = number of heterozygous gene pairs)
4. **Map distance (centimorgan)**: Recombination frequency (%)

## Key Terms

- **Allele**: Alternative forms of a gene
- **Genotype**: Genetic makeup of an organism
- **Phenotype**: Observable characteristics
- **Homozygous**: Identical alleles (TT or tt)
- **Heterozygous**: Different alleles (Tt)
- **Dominant**: Allele that expresses itself in heterozygous condition
- **Recessive**: Allele masked in heterozygous condition
- **Linkage**: Genes on same chromosome inherited together
- **Crossing Over**: Exchange of chromosomal segments during meiosis
- **Karyotype**: Photographic representation of chromosomes

## Summary Points

1. Mendel's laws explain basic inheritance patterns through dominance, segregation, and independent assortment
2. Chromosomal theory states genes are located on chromosomes
3. Linkage and crossing over affect inheritance of genes on same chromosome
4. Sex determination varies across species (XY, ZW, XO systems)
5. Genetic disorders can be Mendelian (single gene) or chromosomal (abnormal chromosome number/structure)
6. Mutations are the ultimate source of genetic variation
7. Pedigree analysis helps determine inheritance patterns in families
`,

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Mendelian Monohybrid Cross',
        description: 'Punnett square showing a 3:1 phenotypic ratio.'
      },
      {
        type: 'comparison',
        title: 'Autosomal vs Sex-linked Traits',
        description: 'Key differences in inheritance patterns.'
      },
      {
        type: 'flowchart',
        title: 'Chromosomal Theory Steps',
        description: 'Genes on chromosomes -> meiosis -> segregation.'
      },
      {
        type: 'table',
        title: 'Genetic Disorders Snapshot',
        description: 'Selected Mendelian and chromosomal disorders with features.'
      },
      {
        type: 'graph',
        title: 'Recombination vs Distance',
        description: 'Higher recombination with larger gene distance.'
      },
    ],
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Principles of Inheritance and Variation',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`,
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Mendelian Monohybrid Cross',
          description: 'Punnett square showing a 3:1 phenotypic ratio.'
        },
        {
          type: 'comparison',
          title: 'Autosomal vs Sex-linked Traits',
          description: 'Key differences in inheritance patterns.'
        },
        {
          type: 'flowchart',
          title: 'Chromosomal Theory Steps',
          description: 'Genes on chromosomes -> meiosis -> segregation.'
        },
        {
          type: 'table',
          title: 'Genetic Disorders Snapshot',
          description: 'Selected Mendelian and chromosomal disorders with features.'
        },
        {
          type: 'graph',
          title: 'Recombination vs Distance',
          description: 'Higher recombination with larger gene distance.'
        },
      ],}
  });

  console.log('✓ Seeded Biology Class 12 Chapter 5: Principles of Inheritance and Variation');
}

seedBiologyClass12Chapter5().catch(console.error);
