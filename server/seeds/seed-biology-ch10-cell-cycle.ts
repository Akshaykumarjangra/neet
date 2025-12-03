import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter10() {
  console.log('Seeding Biology Class 11 Chapter 10: Cell Cycle and Cell Division...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 10,
    chapterTitle: 'Cell Cycle and Cell Division',
    introduction: `The continuity of life depends on the precise replication and distribution of genetic material from one generation of cells to the next. Cell division is the fundamental process through which a parent cell divides to form two or more daughter cells. This mechanism ensures growth, repair, and reproduction in all living organisms. In unicellular organisms, cell division is the means of reproduction, while in multicellular organisms, it underlies growth, development, and tissue repair. The cell cycle is the sequence of events that occurs in a cell leading to its division and duplication, characterized by distinct phases that ensure accurate DNA replication and equal distribution of chromosomes.`,

    detailedNotes: `
# Cell Cycle and Cell Division

## The Cell Cycle

### Overview
The cell cycle is an orderly sequence of events in which a cell grows, duplicates its DNA, and divides to produce two daughter cells. It consists of two major phases: **Interphase** (the period between divisions) and **M Phase** (mitosis and cytokinesis).

### Interphase
Interphase occupies approximately 90-95% of the cell cycle duration and is divided into three sub-phases:

**1. G₁ Phase (Gap 1 Phase)**
- The period of cell growth and normal metabolic activities
- Cell synthesizes enzymes and proteins required for DNA replication
- Organelles like mitochondria and ER are duplicated
- Cell size increases substantially
- Duration varies greatly depending on cell type (hours to months)
- G₁/S checkpoint (restriction point): Cell "decides" whether to proceed to S phase or enter G₀

**2. S Phase (Synthesis Phase)**
- DNA replication occurs, doubling the genetic material
- Each chromosome is replicated to form two sister chromatids joined at the centromere
- Histone proteins are synthesized
- Centrioles duplicate in animal cells
- DNA content changes from 2C to 4C (C = DNA content)
- Duration: typically 6-8 hours in mammalian cells

**3. G₂ Phase (Gap 2 Phase)**
- Cell continues to grow and prepares for mitosis
- Synthesis of proteins necessary for chromosome condensation and mitotic spindle formation
- RNA and proteins are synthesized
- G₂/M checkpoint: Cell ensures DNA is properly replicated before entering mitosis
- Duration: 3-4 hours in mammalian cells

**G₀ Phase (Quiescent Phase)**
- Cells that do not actively divide enter G₀ from G₁
- Cells perform their specialized functions without preparing for division
- Examples: neurons, heart muscle cells remain in G₀ permanently
- Some cells (liver cells) can re-enter the cell cycle from G₀ when stimulated

### M Phase (Mitotic Phase)
M Phase includes both mitosis (nuclear division) and cytokinesis (cytoplasmic division), lasting approximately 1 hour.

## Mitosis

### Definition and Significance
Mitosis is the process of nuclear division in which two genetically identical daughter nuclei are formed from one parent nucleus. It maintains the chromosome number across generations of cells.

**Significance of Mitosis:**
- Growth of multicellular organisms
- Repair and replacement of damaged tissues
- Asexual reproduction in unicellular organisms
- Maintains genetic stability and chromosome number

### Phases of Mitosis

**1. Prophase**
- Chromatin condenses into visible chromosomes, each consisting of two sister chromatids joined at the centromere
- Centrioles (in animal cells) move to opposite poles and begin forming the mitotic spindle
- Nuclear envelope and nucleolus begin to disintegrate
- Golgi complex and ER fragment into vesicles
- Longest phase of mitosis

**2. Metaphase**
- Chromosomes are maximally condensed and most easily visible
- Chromosomes align at the equatorial plane (metaphase plate)
- Spindle fibers from opposite poles attach to kinetochores on centromeres
- Metaphase checkpoint: ensures all chromosomes are properly attached to spindle fibers before proceeding

**3. Anaphase**
- Centromeres split, separating sister chromatids
- Chromatids (now individual chromosomes) move to opposite poles
- Spindle fibers shorten, pulling chromosomes apart
- Cell elongates
- Shortest phase of mitosis

**4. Telophase**
- Chromosomes reach opposite poles and begin to decondense
- Nuclear envelope reforms around each set of chromosomes
- Nucleolus reappears
- Spindle apparatus disassembles
- Essentially the reverse of prophase

### Cytokinesis
- Division of the cytoplasm to form two daughter cells
- In **animal cells**: cleavage furrow forms due to contractile ring of actin and myosin filaments
- In **plant cells**: cell plate forms from the center outward, derived from Golgi vesicles containing cell wall material
- Usually begins in late anaphase and completes during telophase

## Meiosis

### Definition and Significance
Meiosis is a specialized type of cell division that reduces the chromosome number by half, producing four haploid daughter cells from one diploid parent cell. It occurs in reproductive cells (gamete formation).

**Significance of Meiosis:**
- Maintains constant chromosome number across generations in sexually reproducing organisms
- Introduces genetic variation through crossing over and random assortment
- Formation of gametes (sperm and egg cells)
- Ensures genetic diversity in offspring

### Meiosis I (Reductional Division)

**Prophase I** (Longest and most complex phase)
- **Leptotene**: Chromosomes condense and become visible as long thin threads
- **Zygotene**: Homologous chromosomes pair up (synapsis) forming bivalents or tetrads
- **Pachytene**: Crossing over (recombination) occurs between non-sister chromatids of homologous chromosomes, forming chiasmata
- **Diplotene**: Homologous chromosomes begin to separate but remain attached at chiasmata
- **Diakinesis**: Chromosomes fully condense, chiasmata move toward chromosome ends (terminalization), nuclear envelope disintegrates

**Metaphase I**
- Bivalents align at the metaphase plate
- Spindle fibers attach to centromeres of homologous chromosomes
- Independent assortment occurs: random orientation of maternal and paternal chromosomes

**Anaphase I**
- Homologous chromosomes (each still consisting of two sister chromatids) separate and move to opposite poles
- Centromeres do not split
- Reduction in chromosome number occurs

**Telophase I**
- Chromosomes reach poles and may partially decondense
- Nuclear envelope may reform briefly
- Cytokinesis produces two haploid cells
- Each cell contains half the number of chromosomes, but each chromosome consists of two chromatids

**Interkinesis**
- Brief interphase between meiosis I and II
- No DNA replication occurs
- Cells prepare for second meiotic division

### Meiosis II (Equational Division)

Meiosis II is similar to mitosis, separating sister chromatids.

**Prophase II**
- Chromosomes condense again
- Nuclear envelope breaks down
- Spindle apparatus forms

**Metaphase II**
- Chromosomes align at the equatorial plane
- Spindle fibers attach to centromeres

**Anaphase II**
- Centromeres split
- Sister chromatids separate and move to opposite poles

**Telophase II**
- Nuclear envelopes reform around four haploid nuclei
- Chromosomes decondense
- Cytokinesis produces four haploid daughter cells

## Comparison: Mitosis vs. Meiosis

| Feature | Mitosis | Meiosis |
|---------|---------|---------|
| Number of divisions | One | Two (Meiosis I and II) |
| Number of daughter cells | Two | Four |
| Chromosome number | Diploid (2n) | Haploid (n) |
| Genetic identity | Genetically identical | Genetically different |
| Crossing over | Does not occur | Occurs in Prophase I |
| Site of occurrence | Somatic cells | Germ cells |
| Function | Growth, repair, asexual reproduction | Sexual reproduction, gamete formation |
| Synapsis | Absent | Present in Prophase I |

## Cell Cycle Regulation

### Checkpoints
Cell cycle checkpoints ensure proper progression through the cell cycle:

**1. G₁/S Checkpoint (Restriction Point)**
- Checks cell size, nutrients, growth factors, DNA damage
- "Point of no return" - once passed, cell is committed to division

**2. G₂/M Checkpoint**
- Verifies complete and accurate DNA replication
- Checks for DNA damage before mitosis
- Ensures cell has adequate size and proteins for division

**3. M Checkpoint (Spindle Checkpoint)**
- Ensures all chromosomes are properly attached to spindle fibers
- Prevents premature chromosome separation

### Cyclin-Dependent Kinases (CDKs)
- Protein kinases that regulate cell cycle progression
- Require binding to cyclins for activation
- Different CDK-cyclin complexes control different transitions
- Example: MPF (Maturation Promoting Factor) = CDK1 + Cyclin B, triggers entry into M phase

### Cyclins
- Regulatory proteins whose concentration fluctuates during the cell cycle
- Activate CDKs when bound
- Different cyclins accumulate at different phases
- Degraded after their function is complete

## Disorders of Cell Division

### Cancer
- Uncontrolled cell division resulting from loss of cell cycle regulation
- Caused by mutations in genes controlling cell division (oncogenes, tumor suppressors)
- Cells bypass checkpoints and divide continuously
- Forms tumors that can invade other tissues (metastasis)

### Down Syndrome (Trisomy 21)
- Caused by nondisjunction during meiosis
- Individual has three copies of chromosome 21
- Results in intellectual disability and characteristic physical features

### Turner Syndrome (XO)
- Loss of one sex chromosome (45, X instead of 46, XX)
- Affects females, causing short stature and infertility

## Significance of Cell Division

1. **Growth**: Increases number of cells in multicellular organisms
2. **Reproduction**: Asexual reproduction in unicellular and some multicellular organisms
3. **Repair and Regeneration**: Replaces damaged or dead cells
4. **Genetic Variation**: Meiosis creates genetic diversity through crossing over and independent assortment
5. **Maintenance**: Replaces aging cells (skin cells, blood cells)

## Cell Division in Different Organisms

**Bacteria (Binary Fission)**
- Simple division without mitosis
- DNA replicates, cell elongates, and septum forms

**Yeast (Budding)**
- Asymmetric division forming smaller daughter cell
- Type of asexual reproduction

**Higher Plants**
- Mitosis in meristematic tissues (root tips, shoot tips)
- Meiosis in pollen mother cells and embryo sac

**Animals**
- Mitosis in somatic cells throughout body
- Meiosis in gonads (testes and ovaries)
`,

    keyConcepts: [
      'Cell cycle phases: G₁, S, G₂, M, and G₀',
      'Interphase occupies 90-95% of cell cycle duration',
      'S phase: DNA replication, content changes from 2C to 4C',
      'Mitosis produces two genetically identical diploid daughter cells',
      'Phases of mitosis: Prophase, Metaphase, Anaphase, Telophase (PMAT)',
      'Cytokinesis: cleavage furrow in animals, cell plate in plants',
      'Meiosis produces four genetically different haploid gametes',
      'Meiosis I: Reductional division, homologous chromosomes separate',
      'Meiosis II: Equational division, sister chromatids separate',
      'Prophase I substages: Leptotene, Zygotene, Pachytene, Diplotene, Diakinesis',
      'Crossing over occurs in Pachytene of Prophase I',
      'Synapsis: pairing of homologous chromosomes forming bivalents',
      'Independent assortment in Metaphase I creates genetic variation',
      'Cell cycle checkpoints: G₁/S, G₂/M, M (spindle checkpoint)',
      'Cyclin-Dependent Kinases (CDKs) and Cyclins regulate cell cycle',
      'Cancer results from loss of cell cycle control',
      'Nondisjunction during meiosis causes chromosomal disorders',
      'Significance: growth, repair, reproduction, genetic variation'
    ],

    formulas: [
      'DNA content in G₁: 2C, after S phase: 4C',
      'Mitosis: 2n → 2n + 2n (two diploid cells)',
      'Meiosis: 2n → n + n + n + n (four haploid cells)',
      'Cell cycle duration = Interphase + M phase',
      'Chromosome number after Meiosis I: n (but DNA still 2C)',
      'Chromosome number after Meiosis II: n (DNA now 1C)'
    ],

    learningObjectives: [
      'Understand the phases of the cell cycle and their significance',
      'Describe the events occurring during each phase of mitosis',
      'Explain the process and significance of cytokinesis in plant and animal cells',
      'Differentiate between mitosis and meiosis',
      'Describe the two meiotic divisions in detail',
      'Understand the significance of crossing over and independent assortment',
      'Explain the role of cell cycle checkpoints in regulation',
      'Understand how CDKs and cyclins control cell division',
      'Recognize disorders resulting from errors in cell division'
    ],

    prerequisites: [
      'Understanding of cell structure and organelles',
      'Knowledge of DNA structure and chromosomes',
      'Concept of diploid and haploid cells',
      'Basic genetics and heredity',
      'Understanding of chromatin and chromosome structure'
    ],

    importantTopics: [
      'Phases of cell cycle: G₁, S, G₂, M',
      'Mitosis: PMAT phases with detailed events',
      'Cytokinesis differences in plant and animal cells',
      'Meiosis I and Meiosis II with all substages',
      'Prophase I in detail: Leptotene to Diakinesis',
      'Crossing over and chiasmata formation',
      'Synapsis and bivalent formation',
      'Independent assortment in Metaphase I',
      'Comparison table: Mitosis vs Meiosis',
      'Cell cycle checkpoints and their functions',
      'CDKs and Cyclins in cell cycle regulation',
      'Significance of mitosis and meiosis',
      'Chromosomal disorders: Down syndrome, Turner syndrome',
      'Cancer as a disorder of cell division'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 10',
    estimatedStudyMinutes: 360,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Cell Cycle Phases',
        description: 'Circular diagram showing Interphase (G₁, S, G₂) and M phase with durations'
      },
      {
        type: 'animation',
        title: 'Mitosis Phases',
        description: 'Step-by-step animation of Prophase, Metaphase, Anaphase, and Telophase'
      },
      {
        type: 'comparison',
        title: 'Cytokinesis in Plant vs Animal Cells',
        description: 'Side-by-side comparison showing cleavage furrow vs cell plate formation'
      },
      {
        type: 'animation',
        title: 'Meiosis I and II',
        description: 'Complete animation showing both meiotic divisions with chromosome behavior'
      },
      {
        type: 'diagram',
        title: 'Crossing Over in Prophase I',
        description: 'Detailed diagram of synapsis, chiasma formation, and genetic recombination'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Cell Cycle and Cell Division',
      introduction: `The continuity of life depends on the precise replication and distribution of genetic material from one generation of cells to the next. Cell division is the fundamental process through which a parent cell divides to form two or more daughter cells. This mechanism ensures growth, repair, and reproduction in all living organisms. In unicellular organisms, cell division is the means of reproduction, while in multicellular organisms, it underlies growth, development, and tissue repair. The cell cycle is the sequence of events that occurs in a cell leading to its division and duplication, characterized by distinct phases that ensure accurate DNA replication and equal distribution of chromosomes.`,
      detailedNotes: `
# Cell Cycle and Cell Division

## The Cell Cycle

### Overview
The cell cycle is an orderly sequence of events in which a cell grows, duplicates its DNA, and divides to produce two daughter cells. It consists of two major phases: **Interphase** (the period between divisions) and **M Phase** (mitosis and cytokinesis).

### Interphase
Interphase occupies approximately 90-95% of the cell cycle duration and is divided into three sub-phases:

**1. G₁ Phase (Gap 1 Phase)**
- The period of cell growth and normal metabolic activities
- Cell synthesizes enzymes and proteins required for DNA replication
- Organelles like mitochondria and ER are duplicated
- Cell size increases substantially
- Duration varies greatly depending on cell type (hours to months)
- G₁/S checkpoint (restriction point): Cell "decides" whether to proceed to S phase or enter G₀

**2. S Phase (Synthesis Phase)**
- DNA replication occurs, doubling the genetic material
- Each chromosome is replicated to form two sister chromatids joined at the centromere
- Histone proteins are synthesized
- Centrioles duplicate in animal cells
- DNA content changes from 2C to 4C (C = DNA content)
- Duration: typically 6-8 hours in mammalian cells

**3. G₂ Phase (Gap 2 Phase)**
- Cell continues to grow and prepares for mitosis
- Synthesis of proteins necessary for chromosome condensation and mitotic spindle formation
- RNA and proteins are synthesized
- G₂/M checkpoint: Cell ensures DNA is properly replicated before entering mitosis
- Duration: 3-4 hours in mammalian cells

**G₀ Phase (Quiescent Phase)**
- Cells that do not actively divide enter G₀ from G₁
- Cells perform their specialized functions without preparing for division
- Examples: neurons, heart muscle cells remain in G₀ permanently
- Some cells (liver cells) can re-enter the cell cycle from G₀ when stimulated

### M Phase (Mitotic Phase)
M Phase includes both mitosis (nuclear division) and cytokinesis (cytoplasmic division), lasting approximately 1 hour.

## Mitosis

### Definition and Significance
Mitosis is the process of nuclear division in which two genetically identical daughter nuclei are formed from one parent nucleus. It maintains the chromosome number across generations of cells.

**Significance of Mitosis:**
- Growth of multicellular organisms
- Repair and replacement of damaged tissues
- Asexual reproduction in unicellular organisms
- Maintains genetic stability and chromosome number

### Phases of Mitosis

**1. Prophase**
- Chromatin condenses into visible chromosomes, each consisting of two sister chromatids joined at the centromere
- Centrioles (in animal cells) move to opposite poles and begin forming the mitotic spindle
- Nuclear envelope and nucleolus begin to disintegrate
- Golgi complex and ER fragment into vesicles
- Longest phase of mitosis

**2. Metaphase**
- Chromosomes are maximally condensed and most easily visible
- Chromosomes align at the equatorial plane (metaphase plate)
- Spindle fibers from opposite poles attach to kinetochores on centromeres
- Metaphase checkpoint: ensures all chromosomes are properly attached to spindle fibers before proceeding

**3. Anaphase**
- Centromeres split, separating sister chromatids
- Chromatids (now individual chromosomes) move to opposite poles
- Spindle fibers shorten, pulling chromosomes apart
- Cell elongates
- Shortest phase of mitosis

**4. Telophase**
- Chromosomes reach opposite poles and begin to decondense
- Nuclear envelope reforms around each set of chromosomes
- Nucleolus reappears
- Spindle apparatus disassembles
- Essentially the reverse of prophase

### Cytokinesis
- Division of the cytoplasm to form two daughter cells
- In **animal cells**: cleavage furrow forms due to contractile ring of actin and myosin filaments
- In **plant cells**: cell plate forms from the center outward, derived from Golgi vesicles containing cell wall material
- Usually begins in late anaphase and completes during telophase

## Meiosis

### Definition and Significance
Meiosis is a specialized type of cell division that reduces the chromosome number by half, producing four haploid daughter cells from one diploid parent cell. It occurs in reproductive cells (gamete formation).

**Significance of Meiosis:**
- Maintains constant chromosome number across generations in sexually reproducing organisms
- Introduces genetic variation through crossing over and random assortment
- Formation of gametes (sperm and egg cells)
- Ensures genetic diversity in offspring

### Meiosis I (Reductional Division)

**Prophase I** (Longest and most complex phase)
- **Leptotene**: Chromosomes condense and become visible as long thin threads
- **Zygotene**: Homologous chromosomes pair up (synapsis) forming bivalents or tetrads
- **Pachytene**: Crossing over (recombination) occurs between non-sister chromatids of homologous chromosomes, forming chiasmata
- **Diplotene**: Homologous chromosomes begin to separate but remain attached at chiasmata
- **Diakinesis**: Chromosomes fully condense, chiasmata move toward chromosome ends (terminalization), nuclear envelope disintegrates

**Metaphase I**
- Bivalents align at the metaphase plate
- Spindle fibers attach to centromeres of homologous chromosomes
- Independent assortment occurs: random orientation of maternal and paternal chromosomes

**Anaphase I**
- Homologous chromosomes (each still consisting of two sister chromatids) separate and move to opposite poles
- Centromeres do not split
- Reduction in chromosome number occurs

**Telophase I**
- Chromosomes reach poles and may partially decondense
- Nuclear envelope may reform briefly
- Cytokinesis produces two haploid cells
- Each cell contains half the number of chromosomes, but each chromosome consists of two chromatids

**Interkinesis**
- Brief interphase between meiosis I and II
- No DNA replication occurs
- Cells prepare for second meiotic division

### Meiosis II (Equational Division)

Meiosis II is similar to mitosis, separating sister chromatids.

**Prophase II**
- Chromosomes condense again
- Nuclear envelope breaks down
- Spindle apparatus forms

**Metaphase II**
- Chromosomes align at the equatorial plane
- Spindle fibers attach to centromeres

**Anaphase II**
- Centromeres split
- Sister chromatids separate and move to opposite poles

**Telophase II**
- Nuclear envelopes reform around four haploid nuclei
- Chromosomes decondense
- Cytokinesis produces four haploid daughter cells

## Comparison: Mitosis vs. Meiosis

| Feature | Mitosis | Meiosis |
|---------|---------|---------|
| Number of divisions | One | Two (Meiosis I and II) |
| Number of daughter cells | Two | Four |
| Chromosome number | Diploid (2n) | Haploid (n) |
| Genetic identity | Genetically identical | Genetically different |
| Crossing over | Does not occur | Occurs in Prophase I |
| Site of occurrence | Somatic cells | Germ cells |
| Function | Growth, repair, asexual reproduction | Sexual reproduction, gamete formation |
| Synapsis | Absent | Present in Prophase I |

## Cell Cycle Regulation

### Checkpoints
Cell cycle checkpoints ensure proper progression through the cell cycle:

**1. G₁/S Checkpoint (Restriction Point)**
- Checks cell size, nutrients, growth factors, DNA damage
- "Point of no return" - once passed, cell is committed to division

**2. G₂/M Checkpoint**
- Verifies complete and accurate DNA replication
- Checks for DNA damage before mitosis
- Ensures cell has adequate size and proteins for division

**3. M Checkpoint (Spindle Checkpoint)**
- Ensures all chromosomes are properly attached to spindle fibers
- Prevents premature chromosome separation

### Cyclin-Dependent Kinases (CDKs)
- Protein kinases that regulate cell cycle progression
- Require binding to cyclins for activation
- Different CDK-cyclin complexes control different transitions
- Example: MPF (Maturation Promoting Factor) = CDK1 + Cyclin B, triggers entry into M phase

### Cyclins
- Regulatory proteins whose concentration fluctuates during the cell cycle
- Activate CDKs when bound
- Different cyclins accumulate at different phases
- Degraded after their function is complete

## Disorders of Cell Division

### Cancer
- Uncontrolled cell division resulting from loss of cell cycle regulation
- Caused by mutations in genes controlling cell division (oncogenes, tumor suppressors)
- Cells bypass checkpoints and divide continuously
- Forms tumors that can invade other tissues (metastasis)

### Down Syndrome (Trisomy 21)
- Caused by nondisjunction during meiosis
- Individual has three copies of chromosome 21
- Results in intellectual disability and characteristic physical features

### Turner Syndrome (XO)
- Loss of one sex chromosome (45, X instead of 46, XX)
- Affects females, causing short stature and infertility

## Significance of Cell Division

1. **Growth**: Increases number of cells in multicellular organisms
2. **Reproduction**: Asexual reproduction in unicellular and some multicellular organisms
3. **Repair and Regeneration**: Replaces damaged or dead cells
4. **Genetic Variation**: Meiosis creates genetic diversity through crossing over and independent assortment
5. **Maintenance**: Replaces aging cells (skin cells, blood cells)

## Cell Division in Different Organisms

**Bacteria (Binary Fission)**
- Simple division without mitosis
- DNA replicates, cell elongates, and septum forms

**Yeast (Budding)**
- Asymmetric division forming smaller daughter cell
- Type of asexual reproduction

**Higher Plants**
- Mitosis in meristematic tissues (root tips, shoot tips)
- Meiosis in pollen mother cells and embryo sac

**Animals**
- Mitosis in somatic cells throughout body
- Meiosis in gonads (testes and ovaries)
`,
      keyConcepts: [
        'Cell cycle phases: G₁, S, G₂, M, and G₀',
        'Interphase occupies 90-95% of cell cycle duration',
        'S phase: DNA replication, content changes from 2C to 4C',
        'Mitosis produces two genetically identical diploid daughter cells',
        'Phases of mitosis: Prophase, Metaphase, Anaphase, Telophase (PMAT)',
        'Cytokinesis: cleavage furrow in animals, cell plate in plants',
        'Meiosis produces four genetically different haploid gametes',
        'Meiosis I: Reductional division, homologous chromosomes separate',
        'Meiosis II: Equational division, sister chromatids separate',
        'Prophase I substages: Leptotene, Zygotene, Pachytene, Diplotene, Diakinesis',
        'Crossing over occurs in Pachytene of Prophase I',
        'Synapsis: pairing of homologous chromosomes forming bivalents',
        'Independent assortment in Metaphase I creates genetic variation',
        'Cell cycle checkpoints: G₁/S, G₂/M, M (spindle checkpoint)',
        'Cyclin-Dependent Kinases (CDKs) and Cyclins regulate cell cycle',
        'Cancer results from loss of cell cycle control',
        'Nondisjunction during meiosis causes chromosomal disorders',
        'Significance: growth, repair, reproduction, genetic variation'
      ],
      formulas: [
        'DNA content in G₁: 2C, after S phase: 4C',
        'Mitosis: 2n → 2n + 2n (two diploid cells)',
        'Meiosis: 2n → n + n + n + n (four haploid cells)',
        'Cell cycle duration = Interphase + M phase',
        'Chromosome number after Meiosis I: n (but DNA still 2C)',
        'Chromosome number after Meiosis II: n (DNA now 1C)'
      ],
      learningObjectives: [
        'Understand the phases of the cell cycle and their significance',
        'Describe the events occurring during each phase of mitosis',
        'Explain the process and significance of cytokinesis in plant and animal cells',
        'Differentiate between mitosis and meiosis',
        'Describe the two meiotic divisions in detail',
        'Understand the significance of crossing over and independent assortment',
        'Explain the role of cell cycle checkpoints in regulation',
        'Understand how CDKs and cyclins control cell division',
        'Recognize disorders resulting from errors in cell division'
      ],
      prerequisites: [
        'Understanding of cell structure and organelles',
        'Knowledge of DNA structure and chromosomes',
        'Concept of diploid and haploid cells',
        'Basic genetics and heredity',
        'Understanding of chromatin and chromosome structure'
      ],
      importantTopics: [
        'Phases of cell cycle: G₁, S, G₂, M',
        'Mitosis: PMAT phases with detailed events',
        'Cytokinesis differences in plant and animal cells',
        'Meiosis I and Meiosis II with all substages',
        'Prophase I in detail: Leptotene to Diakinesis',
        'Crossing over and chiasmata formation',
        'Synapsis and bivalent formation',
        'Independent assortment in Metaphase I',
        'Comparison table: Mitosis vs Meiosis',
        'Cell cycle checkpoints and their functions',
        'CDKs and Cyclins in cell cycle regulation',
        'Significance of mitosis and meiosis',
        'Chromosomal disorders: Down syndrome, Turner syndrome',
        'Cancer as a disorder of cell division'
      ],
      ncertChapterRef: 'Class 11 Biology, Chapter 10',
      estimatedStudyMinutes: 360,
      difficultyLevel: 4,
      status: 'published',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Cell Cycle Phases',
          description: 'Circular diagram showing Interphase (G₁, S, G₂) and M phase with durations'
        },
        {
          type: 'animation',
          title: 'Mitosis Phases',
          description: 'Step-by-step animation of Prophase, Metaphase, Anaphase, and Telophase'
        },
        {
          type: 'comparison',
          title: 'Cytokinesis in Plant vs Animal Cells',
          description: 'Side-by-side comparison showing cleavage furrow vs cell plate formation'
        },
        {
          type: 'animation',
          title: 'Meiosis I and II',
          description: 'Complete animation showing both meiotic divisions with chromosome behavior'
        },
        {
          type: 'diagram',
          title: 'Crossing Over in Prophase I',
          description: 'Detailed diagram of synapsis, chiasma formation, and genetic recombination'
        }
      ]
    }
  });

  console.log('✅ Biology Chapter 10: Cell Cycle and Cell Division seeded successfully!');
}

seedBiologyChapter10()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
