import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedBiologyChapter18() {
  console.log('Seeding Biology Class 11 Chapter 18: Body Fluids and Circulation...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 18,
    chapterTitle: 'Body Fluids and Circulation',
    introduction: `Blood and lymph are the principal body fluids that transport nutrients, gases, hormones, and waste products throughout the body. The circulatory system, comprising the heart, blood vessels, and blood, is essential for maintaining homeostasis and supporting all cellular functions. In humans, a closed double circulatory system ensures efficient oxygen delivery and waste removal. Understanding circulatory physiology is fundamental for medical sciences, as cardiovascular diseases are leading causes of mortality worldwide. This chapter explores blood composition, heart structure and function, blood circulation pathways, cardiac cycle, electrocardiogram, blood pressure, lymphatic system, and circulatory disorders.`,

    detailedNotes: `
# Body Fluids and Circulation

## Body Fluids

**Types:**

### 1. Intracellular Fluid (ICF)
- Fluid inside cells
- ~67% of total body water
- Rich in K⁺, proteins, phosphates

### 2. Extracellular Fluid (ECF)
- Fluid outside cells
- ~33% of total body water
- Includes:
  - **Blood plasma** (~20%)
  - **Interstitial fluid** (~80%) - surrounds cells
  - **Lymph**
  - Cerebrospinal fluid, synovial fluid (minor)

## Blood

**Definition**: Specialized connective tissue, fluid matrix (plasma) with suspended cells

**Volume**: ~5-6 liters in average adult (7-8% of body weight)

**pH**: 7.35-7.45 (slightly alkaline)

**Functions:**
1. **Transport**: O₂, CO₂, nutrients, hormones, wastes
2. **Protection**: Immunity (WBCs, antibodies), clotting (prevents blood loss)
3. **Regulation**: Temperature, pH, osmotic balance

### Blood Components

**1. Plasma (55% of blood volume)**

**Composition:**
- **Water**: 90-92%
- **Proteins**: 6-8%
  - **Albumin** (54%): Maintains osmotic pressure, transport
  - **Globulins** (38%): α, β (transport), γ (antibodies/immunoglobulins)
  - **Fibrinogen** (7%): Blood clotting
  - Prothrombin (clotting)
- **Nutrients**: Glucose, amino acids, lipids
- **Electrolytes**: Na⁺, K⁺, Ca²⁺, Mg²⁺, Cl⁻, HCO₃⁻, phosphates
- **Wastes**: Urea, uric acid, creatinine
- **Hormones**: Insulin, thyroxine, etc.
- **Gases**: O₂, CO₂

**Serum**: Plasma without clotting factors (fibrinogen removed)

**2. Formed Elements (45% of blood volume)**

### Erythrocytes (Red Blood Cells - RBCs)

**Count**: 5-5.5 million/mm³ in males, 4.5-5 million/mm³ in females

**Structure:**
- Biconcave disc shape (increases surface area)
- Anucleate (no nucleus in mammals) - more space for hemoglobin
- No mitochondria, ER (anaerobic respiration)
- Diameter: ~7-8 μm
- Lifespan: ~120 days

**Hemoglobin (Hb):**
- Red respiratory pigment
- Structure: 4 heme groups (each with Fe²⁺) + 4 globin chains
- Function: O₂ and CO₂ transport
- Content: 12-16 g/100 ml blood in males, 11-14 g/100 ml in females

**Formation (Erythropoiesis):**
- Site: Red bone marrow
- Stimulus: Erythropoietin hormone (from kidneys)
- Requires: Iron, Vitamin B₁₂, folic acid

**Destruction:**
- Occur in spleen ("graveyard of RBCs") and liver
- Hemoglobin → Heme + Globin
- Heme → Biliverdin → Bilirubin (bile pigment)
- Iron recycled

**Disorders:**
- **Anemia**: Low Hb/RBC count (fatigue, pallor)
- **Polycythemia**: Excess RBCs (increased viscosity)
- **Sickle cell anemia**: Abnormal Hb (HbS), RBCs sickle-shaped

### Leukocytes (White Blood Cells - WBCs)

**Count**: 6,000-8,000/mm³

**Characteristics:**
- Nucleated
- Amoeboid, can move through capillary walls (diapedesis)
- Lifespan: Few days to years
- Formed in bone marrow and lymphoid organs

**Types:**

**A. Granulocytes (Granular WBCs)**

**1. Neutrophils (60-65%)**
- Multi-lobed nucleus (2-7 lobes)
- First responders to infection
- Phagocytic (engulf bacteria)
- Lifespan: 5-90 hours

**2. Eosinophils (2-3%)**
- Bi-lobed nucleus
- Red granules (acidic dyes)
- Fight parasitic infections
- Involved in allergic reactions
- Lifespan: 8-12 days

**3. Basophils (0.5-1%)**
- Bi-lobed or irregular nucleus
- Blue granules (basic dyes)
- Release histamine, heparin
- Involved in allergic responses, inflammation
- Lifespan: 1-2 days

**B. Agranulocytes (Non-granular WBCs)**

**1. Lymphocytes (20-25%)**
- Large nucleus, thin cytoplasm rim
- Two types:
  - **B lymphocytes**: Produce antibodies (humoral immunity)
  - **T lymphocytes**: Cell-mediated immunity
- Lifespan: Days to years
- Key role in adaptive immunity

**2. Monocytes (6-8%)**
- Largest WBCs
- Kidney-shaped nucleus
- Phagocytic (macrophages when in tissues)
- Lifespan: Hours to days in blood, months in tissues

**Disorders:**
- **Leukemia**: Cancer of WBCs (uncontrolled production)
- **Leukopenia**: Low WBC count (increased infection risk)
- **Leukocytosis**: High WBC count (infection, inflammation)

### Platelets (Thrombocytes)

**Count**: 1.5-4 lakh (150,000-400,000)/mm³

**Structure:**
- Cell fragments (from megakaryocytes)
- No nucleus
- Lifespan: 8-10 days

**Function**: Blood clotting (hemostasis)

**Formation**: Bone marrow (from megakaryocytes)

**Destruction**: Spleen

## Blood Grouping

### ABO Blood Group System (Karl Landsteiner, 1900)

**Basis**: Antigens on RBC surface, Antibodies in plasma

**Four Groups:**

| Blood Group | RBC Antigens | Plasma Antibodies | Can Donate To | Can Receive From |
|-------------|--------------|-------------------|---------------|------------------|
| **A** | A | Anti-B | A, AB | A, O |
| **B** | B | Anti-A | B, AB | B, O |
| **AB** | A and B | None | AB | A, B, AB, O (Universal Recipient) |
| **O** | None | Anti-A and Anti-B | A, B, AB, O (Universal Donor) | O |

**Frequency in India**: O > B > A > AB

### Rh Blood Group System

**Basis**: Rh antigen (Rh factor/D antigen) on RBC surface

**Two Types:**
- **Rh⁺ (Rh positive)**: Have Rh antigen (~85% population)
- **Rh⁻ (Rh negative)**: Lack Rh antigen (~15% population)

**Erythroblastosis Fetalis (Hemolytic Disease of Newborn):**
- Mother: Rh⁻, Father: Rh⁺, Fetus: Rh⁺
- **First pregnancy**: Mother exposed to fetal Rh⁺ blood during delivery → produces anti-Rh antibodies
- **Second pregnancy**: Maternal anti-Rh antibodies cross placenta → attack fetal Rh⁺ RBCs → hemolysis
- **Prevention**: Anti-Rh antibody injection to mother after first delivery

## Blood Clotting (Coagulation)

**Purpose**: Prevent blood loss from damaged vessels

**Mechanism:**

**Intrinsic Pathway** (damaged vessel surface):
1. Contact with collagen activates Factor XII
2. Cascade of factors (XII → XI → IX → X)

**Extrinsic Pathway** (tissue damage):
1. Tissue factor (Factor III) released
2. Activates Factor VII → Factor X

**Common Pathway:**
3. Factor X (with Factor V, Ca²⁺, phospholipids) → **Prothrombinase**
4. Prothrombinase: **Prothrombin → Thrombin**
5. Thrombin: **Fibrinogen (soluble) → Fibrin (insoluble threads)**
6. Fibrin forms mesh, traps blood cells → **Clot formation**
7. Factor XIII stabilizes clot

**Factors Required:**
- **Ca²⁺ (Factor IV)**: Essential cofactor
- **Vitamin K**: Synthesis of Factors II, VII, IX, X in liver

**Anticoagulants:**
- **Heparin**: Prevents thrombin formation
- **EDTA, Citrate**: Chelate Ca²⁺
- **Warfarin**: Vitamin K antagonist

**Disorders:**
- **Hemophilia**: Deficiency of clotting factors (VIII - Hemophilia A, IX - Hemophilia B)
  - X-linked recessive disorder
  - Prolonged bleeding

## Circulatory System

### Types of Circulatory Systems

**Open Circulatory System:**
- Blood not always in vessels
- Hemolymph directly bathes organs
- Examples: Arthropods, most molluscs

**Closed Circulatory System:**
- Blood always in vessels
- More efficient
- Examples: Vertebrates, annelids

### Human Circulatory System

**Type**: Closed, double circulation

**Double Circulation:**
- **Pulmonary circulation**: Heart → Lungs → Heart (oxygenation)
- **Systemic circulation**: Heart → Body tissues → Heart (oxygen delivery)
- Blood passes through heart twice in one complete cycle

**Advantage**: Separation of oxygenated and deoxygenated blood, higher pressure in systemic circulation

## The Heart

**Location**: Thoracic cavity, between lungs (mediastinum), tilted left

**Size**: Fist-sized (~250-350 g)

**Protection:**
- **Pericardium**: Double-layered membrane
  - **Fibrous pericardium**: Outer, tough
  - **Serous pericardium**: Inner, double layer (parietal + visceral)
  - **Pericardial cavity**: Contains pericardial fluid (lubrication)

**Wall Layers (outer to inner):**
1. **Epicardium**: Outer layer (visceral pericardium)
2. **Myocardium**: Thick muscular layer (cardiac muscle)
3. **Endocardium**: Inner lining (endothelium)

### Heart Chambers

**Four Chambers:**
- **Two Atria** (upper, thin-walled, receive blood):
  - **Right atrium**: Receives deoxygenated blood
  - **Left atrium**: Receives oxygenated blood
- **Two Ventricles** (lower, thick-walled, pump blood):
  - **Right ventricle**: Pumps to lungs (thinner wall)
  - **Left ventricle**: Pumps to body (thickest wall - 3× right ventricle)

**Septum**: Separates left and right sides (interatrial, interventricular)

### Heart Openings and Valves

**Valves**: Prevent backflow of blood

**Atrioventricular (AV) Valves:**
- **Tricuspid valve**: Right atrium → Right ventricle (3 cusps)
- **Bicuspid/Mitral valve**: Left atrium → Left ventricle (2 cusps)
- Attached to **chordae tendineae** (prevent prolapse) → **papillary muscles**

**Semilunar Valves:**
- **Pulmonary semilunar valve**: Right ventricle → Pulmonary artery
- **Aortic semilunar valve**: Left ventricle → Aorta

**Blood Vessels Connected:**
- **Superior vena cava & Inferior vena cava**: → Right atrium (deoxygenated)
- **Pulmonary artery**: Right ventricle → Lungs (deoxygenated) - only artery carrying deoxygenated blood
- **Pulmonary veins** (4): Lungs → Left atrium (oxygenated) - only veins carrying oxygenated blood
- **Aorta**: Left ventricle → Body (oxygenated)

## Cardiac Cycle

**Definition**: Events from beginning of one heartbeat to next

**Duration**: ~0.8 seconds (at 75 beats/min)

**Phases:**

### 1. Atrial Systole (0.1 sec)
- Atria contract
- AV valves open
- Blood flows: Atria → Ventricles
- Ventricles fill (~70% already filled passively)
- Semilunar valves closed

### 2. Ventricular Systole (0.3 sec)
- Ventricles contract
- **Isovolumetric contraction**: All valves closed momentarily, pressure rises
- AV valves close → **First heart sound "Lub"** (S₁)
- Pressure exceeds arteries → Semilunar valves open
- Blood ejected: Right ventricle → Pulmonary artery, Left ventricle → Aorta

### 3. Joint Diastole (0.4 sec)
- Both atria and ventricles relax
- Semilunar valves close → **Second heart sound "Dub"** (S₂)
- AV valves open
- Passive filling of ventricles begins

**Heart Sounds:**
- **S₁ "Lub"**: Closure of AV valves (tricuspid + mitral)
- **S₂ "Dub"**: Closure of semilunar valves (pulmonary + aortic)

**Cardiac Output (CO):**
- Volume of blood pumped by each ventricle per minute
- **CO = Stroke Volume (SV) × Heart Rate (HR)**
- **SV**: ~70 ml (volume per beat)
- **HR**: ~72 beats/min
- **CO**: ~5 liters/min (at rest)

## Electrocardiogram (ECG/EKG)

**Definition**: Graphical record of electrical activity of heart

**Waves:**

**P wave:**
- Atrial depolarization (contraction)
- Small, upward deflection

**QRS complex:**
- Ventricular depolarization (contraction)
- Large, sharp spike
- Masks atrial repolarization

**T wave:**
- Ventricular repolarization (relaxation)
- Rounded, upward deflection

**Intervals:**
- **P-R interval**: 0.12-0.20 sec (atrial depolarization to start of ventricular depolarization)
- **Q-T interval**: ~0.38 sec (ventricular depolarization + repolarization)

**Clinical Significance:**
- Diagnose arrhythmias, heart attacks, conduction defects

## Regulation of Cardiac Activity

### Intrinsic Regulation (Auto-rhythmicity)

**Nodal Tissue** (Modified cardiac muscle):

**1. SA Node (Sinoatrial Node)**
- **Natural pacemaker** of heart
- Located: Right atrium wall, near SVC opening
- Generates impulses: ~70-75/min
- Initiates heartbeat

**2. AV Node (Atrioventricular Node)**
- Located: Lower right atrium, near AV septum
- Receives impulse from SA node
- Delays impulse (~0.1 sec) - allows atrial contraction before ventricular
- Backup pacemaker (~40-60/min if SA node fails)

**3. AV Bundle (Bundle of His)**
- Originates from AV node
- Only electrical connection between atria and ventricles

**4. Bundle Branches**
- Right and left bundle branches
- Run in interventricular septum

**5. Purkinje Fibers**
- Spread throughout ventricular myocardium
- Rapid conduction → synchronized ventricular contraction

**Conduction Pathway:**
SA node → Atrial muscle → AV node → AV bundle → Bundle branches → Purkinje fibers → Ventricular muscle

### Extrinsic Regulation

**Neural Regulation:**
- **Sympathetic**: Increases heart rate (norepinephrine)
- **Parasympathetic** (Vagus nerve): Decreases heart rate (acetylcholine)
- **Cardiovascular center**: Medulla oblongata

**Hormonal Regulation:**
- **Epinephrine/Adrenaline**: Increases heart rate, contractility
- **Thyroxine**: Increases heart rate (long-term)

**Chemical Factors:**
- **Ca²⁺**: Increases contractility
- **K⁺**: High levels decrease heart rate

## Blood Vessels

**Three Types:**

### 1. Arteries
- Carry blood **away from heart**
- Thick, elastic walls (withstand high pressure)
- No valves (except semilunar at origin)
- Smaller branches: Arterioles
- Examples: Aorta, pulmonary artery

### 2. Veins
- Carry blood **toward heart**
- Thin walls, less elastic
- **Valves present** (prevent backflow)
- Larger lumen than arteries
- Smaller branches: Venules
- Examples: Vena cava, pulmonary veins

### 3. Capillaries
- Microscopic vessels
- One-cell thick wall (endothelium only)
- Site of exchange (O₂, CO₂, nutrients, wastes)
- Connect arterioles to venules

## Blood Pressure (BP)

**Definition**: Pressure exerted by blood on vessel walls

**Measurement**: Sphygmomanometer (mm Hg)

**Normal BP**: **120/80 mm Hg**
- **Systolic pressure (120)**: Ventricular contraction, maximum pressure
- **Diastolic pressure (80)**: Ventricular relaxation, minimum pressure

**Pulse Pressure**: Systolic - Diastolic = 40 mm Hg

**Factors Affecting BP:**
1. **Cardiac output**: Higher CO → Higher BP
2. **Peripheral resistance**: Vasoconstriction → Higher BP
3. **Blood volume**: More blood → Higher BP
4. **Blood viscosity**: Thicker blood → Higher BP
5. **Elasticity of vessels**: Rigid vessels → Higher BP

**Disorders:**
- **Hypertension**: BP > 140/90 mm Hg (heart strain, stroke risk)
- **Hypotension**: BP < 90/60 mm Hg (dizziness, fainting)

## Lymphatic System

**Components**: Lymph, lymph vessels, lymph nodes, lymphoid organs

**Lymph:**
- Clear, colorless fluid
- Similar to plasma but less protein
- Contains lymphocytes
- No RBCs (normally)

**Formation:**
- Interstitial fluid → Lymphatic capillaries → Lymph

**Functions:**
1. **Fluid balance**: Returns excess interstitial fluid to blood
2. **Fat absorption**: Lacteals in intestinal villi absorb fats
3. **Immunity**: Lymphocytes, lymph nodes filter pathogens

**Lymph Vessels:**
- Similar to veins (thin walls, valves)
- **Thoracic duct**: Largest, drains into left subclavian vein
- **Right lymphatic duct**: Drains right upper body

**Lymph Nodes:**
- Bean-shaped structures
- Filter lymph
- Produce lymphocytes
- Examples: Cervical, axillary, inguinal nodes

**Lymphoid Organs:**
- **Spleen**: Filters blood, RBC destruction, immunity
- **Thymus**: T lymphocyte maturation
- **Tonsils**: First line of defense (throat)

## Disorders of Circulatory System

**Hypertension (High Blood Pressure):**
- BP > 140/90 mm Hg
- Risk: Heart attack, stroke, kidney damage

**Coronary Artery Disease (CAD):**
- Narrowing of coronary arteries (atherosclerosis)
- Reduced blood flow to heart muscle

**Angina Pectoris:**
- Chest pain (heart muscle ischemia)
- Due to reduced coronary blood flow

**Heart Attack (Myocardial Infarction):**
- Death of heart muscle
- Cause: Blocked coronary artery

**Heart Failure:**
- Heart unable to pump adequately
- Fluid accumulation (edema)

**Atherosclerosis:**
- Plaque buildup in arteries (cholesterol, fat)
- Narrowed, hardened arteries

**Stroke:**
- Brain damage due to blocked/burst blood vessel
- Ischemic (blockage) or hemorrhagic (rupture)
`,

    keyConcepts: [
      'Blood: 55% plasma, 45% formed elements (RBCs, WBCs, platelets)',
      'Plasma proteins: Albumin (osmotic pressure), Globulins (transport, antibodies), Fibrinogen (clotting)',
      'RBCs: 5 million/mm³, biconcave, anucleate, lifespan 120 days',
      'Hemoglobin: 4 heme + 4 globin, carries O₂ and CO₂',
      'WBCs: 6,000-8,000/mm³, Granulocytes (neutrophils, eosinophils, basophils) + Agranulocytes (lymphocytes, monocytes)',
      'Platelets: 1.5-4 lakh/mm³, blood clotting',
      'ABO blood groups: A, B, AB (universal recipient), O (universal donor)',
      'Rh factor: Rh⁺ (85%), Rh⁻ (15%), Erythroblastosis fetalis in Rh incompatibility',
      'Clotting: Prothrombin → Thrombin → Fibrinogen → Fibrin',
      'Heart: 4 chambers (2 atria, 2 ventricles), double circulation',
      'Valves: Tricuspid (RA→RV), Bicuspid/Mitral (LA→LV), Semilunar (ventricles→arteries)',
      'Cardiac cycle: Atrial systole (0.1s) → Ventricular systole (0.3s) → Joint diastole (0.4s)',
      'Heart sounds: S₁ "Lub" (AV valve closure), S₂ "Dub" (semilunar valve closure)',
      'SA node: Natural pacemaker (70-75/min)',
      'ECG waves: P (atrial depolarization), QRS (ventricular depolarization), T (ventricular repolarization)',
      'Cardiac output: CO = SV × HR = 70 ml × 72/min = 5 L/min',
      'Blood pressure: 120/80 mm Hg (systolic/diastolic)',
      'Lymphatic system: Returns fluid to blood, immunity, fat absorption'
    ],

    formulas: [
      'Cardiac Output (CO) = Stroke Volume (SV) × Heart Rate (HR)',
      'Pulse Pressure = Systolic BP - Diastolic BP',
      'Clotting: Prothrombin → Thrombin (via prothrombinase)',
      'Clotting: Fibrinogen → Fibrin (via thrombin)'
    ],

    learningObjectives: [
      'Understand blood composition and functions',
      'Describe structure and functions of RBCs, WBCs, and platelets',
      'Explain ABO and Rh blood group systems',
      'Understand blood clotting mechanism',
      'Describe human heart structure and chambers',
      'Explain cardiac cycle phases and heart sounds',
      'Understand ECG waves and their significance',
      'Describe regulation of cardiac activity (SA node)',
      'Differentiate between arteries, veins, and capillaries',
      'Explain blood pressure and its regulation',
      'Understand lymphatic system structure and functions',
      'Identify common circulatory disorders'
    ],

    prerequisites: [
      'Understanding of tissue types (connective tissue)',
      'Knowledge of cell structure and function',
      'Basic chemistry (ions, proteins)',
      'Understanding of diffusion and osmosis'
    ],

    importantTopics: [
      'Blood composition: Plasma and formed elements',
      'RBC structure: Biconcave, anucleate, hemoglobin content',
      'WBC types and functions: Neutrophils, lymphocytes, monocytes',
      'ABO blood groups and compatibility',
      'Rh factor and erythroblastosis fetalis',
      'Blood clotting cascade',
      'Heart chambers and valves',
      'Double circulation pathway',
      'Cardiac cycle: Three phases (0.1s, 0.3s, 0.4s)',
      'Heart sounds: Lub (S₁), Dub (S₂)',
      'SA node as pacemaker',
      'ECG: P, QRS, T waves',
      'Cardiac output calculation',
      'Blood pressure: 120/80 mm Hg',
      'Arterial vs venous structure',
      'Lymphatic system functions',
      'Common disorders: Hypertension, CAD, heart attack'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 18',
    estimatedStudyMinutes: 390,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Human Heart Structure',
        description: 'Four chambers, valves, and major blood vessels'
      },
      {
        type: 'flowchart',
        title: 'Double Circulation Pathway',
        description: 'Pulmonary and systemic circulation routes'
      },
      {
        type: 'graph',
        title: 'ECG Waveform',
        description: 'P, QRS, and T waves with intervals'
      },
      {
        type: 'diagram',
        title: 'Blood Clotting Cascade',
        description: 'Prothrombin to thrombin to fibrin pathway'
      },
      {
        type: 'comparison',
        title: 'ABO Blood Group Compatibility',
        description: 'Antigens, antibodies, donor-recipient matching'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Body Fluids and Circulation',
      estimatedStudyMinutes: 390,
      difficultyLevel: 4,
      status: 'published',

      learningObjectives: sql`EXCLUDED.learning_objectives`,


      prerequisites: sql`EXCLUDED.prerequisites`,


      importantTopics: sql`EXCLUDED.important_topics`,


      visualizationsData: sql`EXCLUDED.visualizations_data`
    }
  });

  console.log('✅ Biology Chapter 18: Body Fluids and Circulation seeded successfully!');
}

seedBiologyChapter18()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
