import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyChapter19() {
  console.log('Seeding Biology Class 11 Chapter 19: Excretory Products and their Elimination...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 19,
    chapterTitle: 'Excretory Products and their Elimination',
    introduction: `Metabolism produces various waste products that, if accumulated, can be toxic to the organism. Excretion is the biological process of removing these metabolic wastes, maintaining internal chemical balance and osmotic regulation. In humans, the excretory system comprises kidneys, ureters, urinary bladder, and urethra. The kidneys are remarkable organs that filter blood, reabsorb useful substances, secrete wastes, and regulate water-electrolyte balance and acid-base balance. Understanding renal physiology is crucial for medical sciences, as kidney diseases are prevalent and kidney function is vital for survival. This chapter explores nitrogenous waste products, modes of excretion, human excretory system structure, urine formation mechanisms, and regulation of kidney function.`,

    detailedNotes: `
# Excretory Products and their Elimination

## Excretion

**Definition**: Removal of metabolic wastes from the body

**Importance:**
- Prevents toxic accumulation
- Maintains homeostasis
- Regulates osmotic balance
- Maintains pH balance

**Metabolic Wastes:**
- **Nitrogenous wastes**: Ammonia, urea, uric acid (from protein/nucleic acid metabolism)
- **CO₂**: From cellular respiration (excreted by lungs)
- **Bile pigments**: Bilirubin, biliverdin (from hemoglobin breakdown)
- **Excess salts and water**

## Nitrogenous Waste Products

### 1. Ammonia (NH₃)

**Formation**: Deamination of amino acids

**Characteristics:**
- Highly toxic
- Very soluble in water
- Requires large amounts of water for excretion

**Organisms**: Ammonotelic
- Examples: Aquatic animals (bony fishes, tadpoles, aquatic invertebrates)
- Advantage in aquatic environment: Abundant water for dilution and excretion

### 2. Urea (NH₂-CO-NH₂)

**Formation**: Ornithine cycle (urea cycle) in liver

**Characteristics:**
- Less toxic than ammonia (~100,000× less)
- Moderately soluble
- Requires moderate water for excretion

**Organisms**: Ureotelic
- Examples: Mammals (including humans), adult amphibians, cartilaginous fishes
- Adaptation: Conserves water compared to ammonia excretion

**Urea Cycle (Ornithine Cycle):**
- Occurs in liver
- 2 NH₃ + CO₂ + Energy → Urea + H₂O
- Key intermediates: Citrulline, arginine, ornithine

### 3. Uric Acid (C₅H₄N₄O₃)

**Formation**: Breakdown of purines (nucleic acids)

**Characteristics:**
- Least toxic
- Nearly insoluble (excreted as paste/crystals)
- Requires minimal water

**Organisms**: Uricotelic
- Examples: Birds, reptiles, insects, land snails
- Advantage: Maximum water conservation (crucial for terrestrial eggs, desert animals)

### Comparison

| Feature | Ammonia | Urea | Uric Acid |
|---------|---------|------|-----------|
| Toxicity | Highest | Moderate | Lowest |
| Solubility | Very high | Moderate | Very low |
| Water needed | Maximum | Moderate | Minimum |
| Energy for synthesis | Minimal | Moderate | High |
| Examples | Bony fishes | Mammals | Birds, reptiles |

## Modes of Excretion

**Ammonotelism**: Ammonia excretion (aquatic animals)
**Ureotelism**: Urea excretion (mammals, adult amphibians)
**Uricotelism**: Uric acid excretion (birds, reptiles, insects)

## Human Excretory System

### Excretory Organs

**Primary**: Kidneys

**Accessory**:
- **Lungs**: Excrete CO₂, water vapor
- **Liver**: Excrete bile pigments, cholesterol, drugs, toxins (via bile)
- **Skin**: Excrete sweat (water, NaCl, urea, lactic acid)
- **Intestine**: Excrete excess salts, undigested matter

### Kidneys

**Location**: Retroperitoneal (behind peritoneum), on either side of vertebral column

**Shape**: Bean-shaped

**Size**: ~10-12 cm long, 5-7 cm wide

**Weight**: ~120-170 g each

**Structure:**

**External Features:**
- **Hilum**: Concave notch (renal artery enters, renal vein and ureter exit)
- **Renal capsule**: Fibrous outer covering

**Internal Structure (Longitudinal Section):**

**1. Cortex (Outer region)**
- Reddish-brown
- Contains:
  - Bowman's capsules
  - Proximal and distal convoluted tubules
  - Blood vessels
- Extensions into medulla: **Renal columns (Columns of Bertini)**

**2. Medulla (Inner region)**
- Darker
- Divided into **renal pyramids** (8-18)
- Apex of pyramid: **Renal papilla**
- Contains:
  - Loops of Henle
  - Collecting ducts

**3. Renal Pelvis**
- Funnel-shaped space
- Receives urine from collecting ducts
- Extensions: **Calyces** (major and minor) - cup-like projections

**Functional Unit: Nephron**

**Number**: ~1 million per kidney

**Structure:**

**A. Renal Corpuscle (in cortex):**

**1. Glomerulus**
- Tuft of capillaries
- Receives blood from afferent arteriole
- Blood exits via efferent arteriole
- High pressure (filtration)

**2. Bowman's Capsule**
- Cup-shaped structure surrounding glomerulus
- Double-walled
- **Parietal layer**: Outer, simple squamous epithelium
- **Visceral layer**: Inner, specialized cells (**podocytes**)
  - Podocytes have foot-like processes creating **filtration slits**
- **Capsular space**: Between two layers (receives filtrate)

**B. Renal Tubule:**

**1. Proximal Convoluted Tubule (PCT)**
- Highly coiled
- Lined with brush border (microvilli) - increases surface area
- Maximum reabsorption occurs here

**2. Loop of Henle**
- Hairpin-shaped
- Parts:
  - **Descending limb**: Thin, permeable to water
  - **Ascending limb**: Thick, impermeable to water, active transport of salts

**3. Distal Convoluted Tubule (DCT)**
- Coiled
- Selective reabsorption and secretion
- Responsive to hormones (ADH, aldosterone)

**C. Collecting Duct**
- Receives from multiple nephrons
- Extends through medulla
- Opens at renal papilla
- Water reabsorption (ADH-regulated)
- Concentrated urine formation

**Types of Nephrons:**

**1. Cortical Nephrons (85%)**
- Glomeruli in outer cortex
- Short loops of Henle (extend to outer medulla)

**2. Juxtamedullary Nephrons (15%)**
- Glomeruli near cortico-medullary junction
- Long loops of Henle (deep into medulla)
- Essential for concentrated urine (desert animals have more)

### Blood Supply to Kidney

**Renal Artery** → **Afferent arteriole** → **Glomerulus** → **Efferent arteriole** → **Peritubular capillaries** (around PCT, DCT) / **Vasa recta** (around loop of Henle in juxtamedullary nephrons) → **Renal vein**

**Special Features:**
- Portal system: Capillaries (glomerulus) → Arteriole (efferent) → Capillaries (peritubular)
- Afferent arteriole wider than efferent → High glomerular pressure

### Juxtaglomerular Apparatus (JGA)

**Location**: Junction of DCT and afferent arteriole

**Components:**
- **Juxtaglomerular cells** (in afferent arteriole): Secrete renin
- **Macula densa** (specialized DCT cells): Sense Na⁺ concentration

**Function**: Regulate GFR and blood pressure (via renin-angiotensin-aldosterone system)

## Urine Formation

**Three Processes:**

### 1. Glomerular Filtration

**Site**: Glomerulus and Bowman's capsule

**Process**:
- Blood pressure forces water and small solutes from glomerular capillaries into Bowman's capsule
- Filtration barrier:
  1. Endothelium of glomerular capillaries (fenestrated - has pores)
  2. Basement membrane
  3. Podocyte filtration slits (slit diaphragm)

**Filtered Substances (Filtrate):**
- Water, glucose, amino acids, urea, uric acid, creatinine, salts
- Small molecules (<70,000 Da)

**Not Filtered:**
- Blood cells (RBCs, WBCs, platelets)
- Large proteins (albumin, globulins)
- Negatively charged molecules (repelled by negative basement membrane)

**Glomerular Filtration Rate (GFR):**
- Volume of filtrate formed per minute
- **Normal GFR**: ~125 ml/min or ~180 liters/day
- **Urine output**: ~1-1.5 liters/day
- **Reabsorption**: ~99% of filtrate (178.5 liters reabsorbed!)

**Factors Affecting GFR:**
- **Blood pressure**: Higher BP → Higher GFR
- **Afferent/Efferent arteriole diameter**: Afferent dilation or efferent constriction → Higher GFR
- **Plasma protein concentration**: Higher proteins → Lower GFR (increased osmotic pressure)

### 2. Tubular Reabsorption

**Site**: PCT, Loop of Henle, DCT, Collecting duct

**Purpose**: Recover useful substances from filtrate

**PCT (Proximal Convoluted Tubule):**
- **Maximum reabsorption occurs here** (~65% of filtrate)
- **Active transport**:
  - **Glucose**: 100% reabsorbed (normally none in urine)
  - **Amino acids**: 100% reabsorbed
  - **Na⁺**: ~65% reabsorbed (active)
  - **Vitamins**, nutrients
- **Passive transport**:
  - **Water**: Follows Na⁺ (osmosis) - obligatory water reabsorption
  - **Cl⁻**: Follows Na⁺
  - **Urea**: ~50% passively reabsorbed
- **Selective secretion**: H⁺, NH₃, drugs, toxins

**Loop of Henle:**
- **Descending limb**:
  - Permeable to water, impermeable to salts
  - Water reabsorbed (osmosis) → Filtrate becomes concentrated
- **Ascending limb**:
  - Impermeable to water
  - Active transport of Na⁺, Cl⁻ out (into medullary interstitium)
  - Filtrate becomes dilute
- **Countercurrent multiplication**: Creates osmotic gradient in medulla (300 in cortex → 1200 mOsm in inner medulla)

**DCT (Distal Convoluted Tubule):**
- **Conditional reabsorption** (hormone-regulated):
  - **Na⁺**: Aldosterone stimulates reabsorption
  - **Ca²⁺**: Parathyroid hormone (PTH) stimulates reabsorption
- **Secretion**: K⁺, H⁺

**Collecting Duct:**
- **Water reabsorption**: ADH (vasopressin) increases permeability
  - High ADH → More water reabsorption → Concentrated urine
  - Low ADH → Less water reabsorption → Dilute urine
- **Urea reabsorption**: Some urea reabsorbed (maintains medullary gradient)
- Final urine concentration: 50-1200 mOsm (4× concentrated vs. blood)

### 3. Tubular Secretion

**Site**: PCT, DCT

**Purpose**: Remove additional wastes and maintain pH, K⁺ balance

**Secreted Substances:**
- **H⁺**: Acidosis regulation
- **K⁺**: Excess potassium removal
- **NH₃**: Produced in tubule cells, helps buffer H⁺
- **Creatinine**: Muscle waste product
- **Drugs**: Penicillin, aspirin
- **Toxins**

**Importance:**
- Eliminates substances not filtered (bound to proteins)
- Fine-tunes pH and electrolyte balance

## Mechanism of Concentration of Filtrate

**Countercurrent Mechanism:**

**1. Countercurrent Multiplier (Loop of Henle):**
- Ascending limb pumps Na⁺, Cl⁻ into medullary interstitium
- Descending limb loses water to concentrated interstitium
- Creates osmotic gradient (300 → 1200 mOsm)

**2. Countercurrent Exchanger (Vasa Recta):**
- Hairpin capillaries parallel to loop of Henle
- **Descending vasa recta**: Gains salts, loses water
- **Ascending vasa recta**: Loses salts, gains water
- Removes reabsorbed water and solutes without disrupting gradient

**Result**: Medullary osmotic gradient maintained, allowing concentrated urine formation

## Composition of Urine

**Normal Urine:**
- **Volume**: 1-1.5 liters/day
- **Color**: Yellow (due to urochrome pigment)
- **pH**: 4.5-8.0 (average ~6.0, slightly acidic)
- **Specific gravity**: 1.003-1.030

**Components:**
- **Water**: 95%
- **Urea**: 2% (25-30 g/day) - main nitrogenous waste
- **Uric acid**: 0.05%
- **Creatinine**: ~1 g/day
- **Salts**: NaCl, K⁺, Ca²⁺, Mg²⁺, phosphates, sulfates
- **Other**: Ammonia, hormones, vitamins, traces of glucose, proteins (pathological if high)

**Abnormal Constituents (Pathological):**
- **Glucose** (Glycosuria): Diabetes mellitus, high blood sugar
- **Proteins** (Proteinuria/Albuminuria): Kidney disease, damage to filtration barrier
- **RBCs** (Hematuria): Kidney stones, infection, trauma
- **WBCs** (Pyuria): Urinary tract infection
- **Ketone bodies** (Ketonuria): Diabetes, starvation

## Regulation of Kidney Function

### Hormonal Regulation

**1. Antidiuretic Hormone (ADH / Vasopressin)**
- **Source**: Hypothalamus (secreted by posterior pituitary)
- **Target**: Collecting duct
- **Effect**: Increases water permeability (inserts aquaporins) → More water reabsorption → Concentrated urine, reduced urine volume
- **Stimulus**: High blood osmolarity (dehydration), low blood volume

**2. Aldosterone**
- **Source**: Adrenal cortex
- **Target**: DCT and collecting duct
- **Effect**: Increases Na⁺ reabsorption (and water follows) → Increases blood volume and pressure
- **Stimulus**: Low Na⁺, high K⁺, angiotensin II (RAAS)

**3. Renin-Angiotensin-Aldosterone System (RAAS)**
- **Trigger**: Low blood pressure, low Na⁺ (detected by JGA)
- **Process**:
  1. JGA releases **renin**
  2. Renin: Angiotensinogen (liver) → **Angiotensin I**
  3. ACE (lungs): Angiotensin I → **Angiotensin II**
  4. Angiotensin II:
     - **Vasoconstriction** → Increased blood pressure
     - Stimulates **aldosterone** release → Na⁺ and water reabsorption
     - Stimulates **ADH** release → Water reabsorption
     - Stimulates **thirst**

**4. Atrial Natriuretic Peptide (ANP)**
- **Source**: Atrial cells of heart
- **Stimulus**: High blood volume/pressure (atrial stretch)
- **Effect**:
  - Inhibits Na⁺ reabsorption → More Na⁺ and water excreted
  - Inhibits renin, aldosterone, ADH
  - Vasodilation
  - **Net effect**: Decreases blood volume and pressure

### Neural Regulation

- Sympathetic nervous system can constrict afferent arterioles → Decrease GFR (during stress, exercise)

## Micturition (Urination)

**Process**:
1. Urine collects in urinary bladder
2. Bladder distension (150-400 ml) → Stretch receptors activated
3. Signal to CNS (sacral region)
4. Reflex contraction of bladder smooth muscle
5. Relaxation of internal urethral sphincter (involuntary)
6. Relaxation of external urethral sphincter (voluntary) → Urination

**Bladder capacity**: ~500-700 ml

## Disorders of Excretory System

**Uremia:**
- Accumulation of urea and other wastes in blood
- Due to kidney failure
- Symptoms: Nausea, fatigue, confusion
- Treatment: Dialysis, transplant

**Renal Calculi (Kidney Stones):**
- Crystal formation (calcium oxalate, uric acid, cystine)
- Causes: Dehydration, high calcium, infection
- Symptoms: Severe pain (renal colic), hematuria

**Glomerulonephritis:**
- Inflammation of glomeruli
- Causes: Infection, autoimmune
- Proteinuria, hematuria, reduced GFR

**Renal Failure:**
- **Acute**: Sudden loss of function (reversible)
- **Chronic**: Progressive, irreversible damage
- Treatment: Dialysis, transplant

**Hemodialysis:**
- Artificial kidney machine
- Blood filtered through semipermeable membrane
- Removes wastes, excess water, electrolytes
- 2-3 times per week

**Kidney Transplant:**
- Surgical replacement with healthy kidney
- From living or deceased donor
- Immunosuppressants required

**Other Disorders:**
- **Diabetes insipidus**: ADH deficiency → Dilute urine, excessive thirst
- **Diabetes mellitus**: High blood glucose → Glycosuria
- **Urinary Tract Infection (UTI)**: Bacterial infection
`,

    keyConcepts: [
      'Nitrogenous wastes: Ammonia (most toxic), Urea (mammals), Uric acid (birds, least toxic)',
      'Ammonotelism (aquatic), Ureotelism (mammals), Uricotelism (birds, reptiles)',
      'Kidneys: Retroperitoneal, bean-shaped, ~1 million nephrons each',
      'Kidney structure: Cortex (outer) + Medulla (pyramids) + Pelvis',
      'Nephron: Glomerulus + Bowman\'s capsule + PCT + Loop of Henle + DCT + Collecting duct',
      'Cortical nephrons (85%, short loop) vs Juxtamedullary (15%, long loop)',
      'Urine formation: Filtration + Reabsorption + Secretion',
      'GFR: 125 ml/min or 180 L/day, 99% reabsorbed',
      'PCT: Maximum reabsorption (65%), glucose, amino acids, Na⁺, water',
      'Loop of Henle: Descending (water out), Ascending (salts out), creates gradient',
      'Countercurrent mechanism: Multiplier (loop) + Exchanger (vasa recta)',
      'ADH: Increases water reabsorption in collecting duct → Concentrated urine',
      'Aldosterone: Increases Na⁺ reabsorption → Water follows → Increases blood volume',
      'RAAS: Renin → Angiotensin I → Angiotensin II → Aldosterone + Vasoconstriction',
      'ANP: Decreases Na⁺ reabsorption → Decreases blood volume and pressure',
      'Normal urine: 1-1.5 L/day, pH 6, 2% urea',
      'Abnormal: Glycosuria (diabetes), Proteinuria (kidney damage), Hematuria (stones)',
      'JGA: Juxtaglomerular cells (renin) + Macula densa (Na⁺ sensor)'
    ],

    formulas: [
      'GFR = 125 ml/min = 180 L/day',
      'Urea cycle: 2 NH₃ + CO₂ → Urea + H₂O',
      'RAAS: Renin → Angiotensinogen → Angiotensin I → (ACE) → Angiotensin II'
    ],

    learningObjectives: [
      'Understand types of nitrogenous wastes and their excretion',
      'Differentiate between ammonotelism, ureotelism, and uricotelism',
      'Describe human kidney structure (cortex, medulla, pelvis)',
      'Explain nephron structure and types',
      'Understand three processes of urine formation',
      'Describe glomerular filtration and GFR',
      'Explain tubular reabsorption in PCT, loop of Henle, DCT',
      'Understand countercurrent mechanism',
      'Describe hormonal regulation (ADH, aldosterone, RAAS, ANP)',
      'Explain normal and abnormal urine composition',
      'Identify common kidney disorders and treatments'
    ],

    prerequisites: [
      'Understanding of osmosis and diffusion',
      'Knowledge of active and passive transport',
      'Basic understanding of hormones',
      'Knowledge of blood composition'
    ],

    importantTopics: [
      'Nitrogenous wastes: Ammonia, urea, uric acid',
      'Modes: Ammonotelism, ureotelism, uricotelism',
      'Kidney structure: Cortex, medulla, pyramids',
      'Nephron parts and functions',
      'Cortical vs juxtamedullary nephrons',
      'GFR: 125 ml/min, 180 L/day',
      'Filtration barrier: Endothelium, basement membrane, podocytes',
      'PCT: Maximum reabsorption (65%)',
      'Loop of Henle: Countercurrent multiplier',
      'Vasa recta: Countercurrent exchanger',
      'DCT and collecting duct: Hormone-regulated',
      'ADH mechanism and effect',
      'Aldosterone mechanism',
      'RAAS pathway',
      'ANP effects',
      'Normal urine composition',
      'Abnormal constituents: Glycosuria, proteinuria, hematuria',
      'JGA and renin release',
      'Disorders: Kidney stones, renal failure, dialysis'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 19',
    estimatedStudyMinutes: 390,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Kidney Structure',
        description: 'Longitudinal section showing cortex, medulla, pyramids, pelvis'
      },
      {
        type: 'diagram',
        title: 'Nephron Structure',
        description: 'Glomerulus, Bowman\'s capsule, PCT, loop of Henle, DCT, collecting duct'
      },
      {
        type: 'flowchart',
        title: 'Urine Formation Process',
        description: 'Filtration → Reabsorption → Secretion pathway'
      },
      {
        type: 'diagram',
        title: 'Countercurrent Mechanism',
        description: 'Loop of Henle multiplier and vasa recta exchanger'
      },
      {
        type: 'flowchart',
        title: 'RAAS Pathway',
        description: 'Renin → Angiotensin I → Angiotensin II → Aldosterone cascade'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Excretory Products and their Elimination',
      estimatedStudyMinutes: 390,
      difficultyLevel: 4,
      status: 'published',

      learningObjectives: sql`EXCLUDED.learning_objectives`,


      prerequisites: sql`EXCLUDED.prerequisites`,


      importantTopics: sql`EXCLUDED.important_topics`,


      visualizationsData: sql`EXCLUDED.visualizations_data`
    }
  });

  console.log('✅ Biology Chapter 19: Excretory Products and their Elimination seeded successfully!');
}

seedBiologyChapter19()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
