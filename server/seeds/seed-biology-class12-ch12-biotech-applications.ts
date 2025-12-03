import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyClass12Chapter12() {
  console.log('Seeding Biology Class 12 Chapter 12: Biotechnology and its Applications...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '12',
    chapterNumber: 12,
    chapterTitle: 'Biotechnology and its Applications',
    introduction: `Biotechnology has revolutionized medicine, agriculture, and industry by applying genetic engineering to create life-saving drugs, disease-resistant crops, and innovative therapies. This chapter explores practical applications including production of human insulin and gene therapy in medicine, development of pest-resistant Bt crops and Golden Rice in agriculture, and techniques like RNA interference and biosafety regulations. Understanding these applications is vital for NEET as they demonstrate how molecular biology translates into real-world solutions for healthcare, food security, and environmental challenges.`,

    detailedNotes: `
# Biotechnology and its Applications

## Introduction

**Biotechnology Applications** in three major areas:
1. **Medicine** (Health)
2. **Agriculture** (Food production)
3. **Industry** (Industrial processes)

## Biotechnology in Medicine

### 1. Recombinant Insulin (Humulin)

**Traditional Source**: 
- Extracted from **pancreas of slaughtered cattle and pigs**
- Problems:
  - Expensive, limited supply
  - Allergic reactions in some patients
  - Risk of infection
  - Ethical concerns

**Recombinant Insulin Production**:

**Discovery**: Eli Lilly company (1983) - First licensed drug from rDNA technology

**Process**:
1. **Gene isolation**: Human insulin gene identified
2. **Two-chain production** (A and B chains produced separately):
   - Chain A gene inserted into plasmid → E. coli
   - Chain B gene inserted into plasmid → E. coli
3. **Expression**: Bacteria produce insulin chains
4. **Extraction and purification**
5. **Combination**: A and B chains combined with disulfide bonds
6. **Result**: **Humulin** (human insulin)

**Advantages**:
- No risk of allergic reactions
- Unlimited supply
- Cost-effective
- Identical to human insulin

### 2. Gene Therapy

**Definition**: Treatment of genetic disorders by introducing functional genes into cells

**Principle**: Replace defective/missing gene with functional copy

**Process**:
1. Isolate functional gene
2. Insert into **vector** (usually modified virus)
3. Introduce into patient's cells
4. Gene expresses and corrects disorder

**Types**:

**A. Somatic Gene Therapy**
- Genes inserted into **body cells** (not reproductive cells)
- NOT inherited by offspring
- Ethical concerns lower

**B. Germline Gene Therapy**
- Genes inserted into **reproductive cells** (sperm, egg, embryo)
- Changes inherited by offspring
- **Not allowed in humans** (ethical concerns)

**First Gene Therapy** (1990):
- **Patient**: 4-year-old girl with **ADA deficiency**
- **Disease**: Adenosine Deaminase deficiency
  - Severe Combined Immunodeficiency (SCID)
  - No functional immune system ("bubble boy" disease)
- **Treatment**: 
  - Lymphocytes (white blood cells) removed
  - Functional ADA gene inserted using retroviral vector
  - Modified cells returned to patient
  - Periodic infusions required (not permanent cure)

**Challenges**:
- Difficult to target correct cells
- Immune response against vector
- Gene may insert at wrong location (risk of cancer)
- Temporary expression (genes may not integrate permanently)

### 3. Molecular Diagnosis

**Advantages over conventional methods**:
- Early detection
- More accurate
- Detects before symptoms appear

**Techniques**:

**A. PCR (Polymerase Chain Reaction)**
- Detects pathogens, mutations
- Example: HIV detection, COVID-19 testing

**B. ELISA (Enzyme-Linked Immunosorbent Assay)**
- Detects antibodies or antigens
- Example: HIV detection, pregnancy test

**C. DNA Microarrays (Gene Chips)**
- Analyze expression of thousands of genes simultaneously
- Detect mutations, predict disease risk

### 4. Recombinant Vaccines

**Traditional vaccines**: Killed or weakened pathogens

**Recombinant vaccines**: Use pathogen proteins (antigens) produced by genetic engineering

**Advantages**:
- Safer (no live pathogen)
- Specific immune response
- Easier to produce

**Examples**:
- **Hepatitis B vaccine**: Surface antigen produced in yeast
- **HPV vaccine**: Virus-like particles

### 5. Other Recombinant Proteins

**Human Growth Hormone (hGH)**
- Treats dwarfism
- Previously from cadaver pituitaries (limited, risk of Creutzfeldt-Jakob disease)
- Now produced in E. coli

**Alpha Interferon**
- Antiviral and anticancer properties
- Treats hepatitis C, certain cancers

**Factor VIII and IX**
- Blood clotting factors for hemophilia patients

**Tissue Plasminogen Activator (TPA)**
- Dissolves blood clots (stroke, heart attack)

## Biotechnology in Agriculture

### 1. Bt Crops (Insect-Resistant Crops)

**Bt toxin**: Produced by **Bacillus thuringiensis** bacterium

**Mechanism**:
- Bt produces **cry proteins** (crystal proteins)
- Genes: **cry I Ac, cry II Ab** (control cotton bollworms)
- **cry I Ab** (controls corn borer)
- Inactive in bacteria (protoxin)
- In alkaline insect gut → activated
- Toxin binds to receptors on midgut epithelial cells
- Creates pores → cell lysis
- Insect dies

**Bt Crops**:
- **Bt cotton** (India, 2002)
- **Bt corn**
- **Bt tomato**
- **Bt brinjal** (controversial in India)

**Cry Gene inserted into plant genome**:
- Plant produces Bt toxin
- Insect eats plant → dies
- Reduces pesticide use

**Advantages**:
- Reduced pesticide application (80-90% reduction)
- Increased yield
- Environment-friendly
- Lower production costs
- Safe for humans (no receptor in human gut)

**Concerns**:
- Development of resistant pests
- Effect on non-target organisms
- Cross-contamination with non-Bt crops
- Long-term ecological effects unknown

### 2. Pest-Resistant Plants (Other Methods)

**RNA Interference (RNAi)**
- Gene silencing technique
- Introduce dsRNA (double-stranded RNA) complementary to target gene
- dsRNA binds to mRNA → degradation
- Gene expression blocked

**Example**: 
- **Tobacco plant** resistant to *Meloidogyne incognitia* (nematode)
- Nematode-specific genes targeted with RNAi
- Nematode cannot survive in transgenic plant

**Mechanism**:
1. dsRNA introduced into plant
2. Nematode ingests dsRNA while feeding
3. RNAi machinery silences nematode's genes
4. Nematode dies

**Advantages**:
- Specific to target pest
- No chemicals
- Safe for other organisms

### 3. Biofortification (Nutritional Enhancement)

**Golden Rice**
- Genetically modified rice with **beta-carotene** (Vitamin A precursor)
- Yellow-orange color from carotene
- **Target**: Vitamin A deficiency in developing countries
  - Causes blindness in children
  - Weakens immune system

**Genes inserted**:
- **psy gene** (phytoene synthase) from daffodil
- **crt I gene** from bacterium *Erwinia uredovora*
- Produce beta-carotene in rice endosperm

**Iron-fortified crops**:
- **Iron-rich rice and wheat**
- Addresses iron deficiency anemia

**Protein-enhanced crops**:
- **High-lysine maize**
- **Protein-rich potato**

### 4. Herbicide-Resistant Crops

**Purpose**: Allow herbicide application to kill weeds without harming crop

**Example**:
- **Glyphosate-resistant crops** (soybean, corn)
- Contain bacterial gene making enzyme resistant to glyphosate herbicide
- Farmer can spray herbicide; weeds die, crop survives

**Concerns**: Development of herbicide-resistant weeds

## Transgenic Animals

**Definition**: Animals with foreign gene(s) integrated into genome

**Applications**:

**1. Disease Models**
- Study human diseases
- Test treatments
- Example: Transgenic mice for Alzheimer's, cancer research

**2. Biological Products**
- Produce human proteins in milk
- Example: **Rosie** the transgenic cow
  - Produces human alpha-lactalbumin in milk
  - Human-like milk for babies

**3. Vaccine Safety Testing**
- Transgenic animals test vaccine safety before human trials

**4. Organ Transplantation (Xenotransplantation)**
- Pigs with human-compatible organs
- Reduces rejection risk
- Addresses organ shortage

**5. Chemical Safety Testing**
- Test toxicity of chemicals
- Reduce animal testing through better models

## Ethical Issues

**GMOs (Genetically Modified Organisms)**:

**Concerns**:
- **Environmental**: 
  - Gene flow to wild relatives
  - Loss of biodiversity
  - Ecological imbalance
- **Health**:
  - Allergenicity
  - Antibiotic resistance marker genes
  - Long-term effects unknown
- **Ethical/Social**:
  - Corporate control (patent issues)
  - Farmer dependency on companies
  - "Playing God" concerns
  - Labeling and consumer choice

**Biosafety**:
- Regulations to ensure GMO safety
- **Cartagena Protocol** (2000): International treaty on biosafety
- India: **Genetic Engineering Appraisal Committee (GEAC)**
  - Approves GM crop trials and release

**Risk Assessment**:
- Testing before release
- Containment strategies
- Monitoring after release

## Biopiracy

**Definition**: Exploitation of biological resources and traditional knowledge without proper authorization or compensation

**Examples**:
- **Basmati rice**: US company patented Indian basmati varieties
- **Turmeric**: US patent on wound-healing properties (revoked after challenge)
- **Neem**: European patents on neem extract (revoked)

**Solutions**:
- **Patent laws** protecting indigenous knowledge
- **Benefit-sharing agreements**
- **Biological Diversity Act, 2002** (India)

## Bioremediation

**Definition**: Use of microorganisms to clean up polluted environments

**Examples**:

**1. Oil Spills**
- Bacteria like *Pseudomonas putida*
- Genetically engineered to degrade hydrocarbons faster

**2. Heavy Metal Removal**
- Certain bacteria accumulate heavy metals
- Remove mercury, cadmium from contaminated water

**3. Sewage Treatment**
- Bacterial consortia degrade organic pollutants

**Phytoremediation**: Use of plants to remove pollutants
- Example: *Eichhornia* (water hyacinth) removes heavy metals

## Summary Points

1. Recombinant insulin (Humulin) produced in E. coli provides unlimited, safe supply for diabetics
2. Gene therapy treats genetic disorders like ADA deficiency by introducing functional genes into cells
3. Bt crops contain bacterial cry genes producing toxin that kills insect pests, reducing pesticide use
4. Golden Rice biofortified with beta-carotene addresses Vitamin A deficiency in developing countries
5. RNAi-based pest control silences essential nematode genes making plants resistant to pests
6. Transgenic animals serve as disease models, produce therapeutic proteins, and may provide organs for transplantation
7. Biosafety regulations and ethical considerations are crucial for responsible use of GMOs
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Biotechnology and its Applications',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Biology Class 12 Chapter 12: Biotechnology and its Applications');
}

seedBiologyClass12Chapter12().catch(console.error);
