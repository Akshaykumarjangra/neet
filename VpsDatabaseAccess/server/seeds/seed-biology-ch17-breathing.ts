import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter17() {
  console.log('Seeding Biology Class 11 Chapter 17: Breathing and Exchange of Gases...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 17,
    chapterTitle: 'Breathing and Exchange of Gases',
    introduction: `Respiration at the cellular level (covered in Chapter 14) requires a continuous supply of oxygen and removal of carbon dioxide. The respiratory system facilitates this gas exchange between the organism and the environment. In humans, breathing involves ventilation of lungs, diffusion of gases across respiratory surfaces, and transport of gases in blood. Understanding respiratory physiology is crucial for comprehending metabolic processes, altitude physiology, respiratory disorders, and medical interventions. This chapter explores respiratory organs, breathing mechanisms, gas exchange, transport of gases, and regulation of respiration.`,

    detailedNotes: `
# Breathing and Exchange of Gases

## Respiratory System Overview

**Functions:**
1. **Ventilation**: Movement of air in and out of lungs (breathing)
2. **Gas Exchange**: Diffusion of O₂ and CO₂ across respiratory membrane
3. **Transport**: Carrying gases in blood
4. **Regulation**: Control of breathing rate and depth

**Key Terms:**
- **Breathing/Ventilation**: Physical movement of air
- **Respiration**: Cellular oxidation of glucose (Chapter 14)
- **External Respiration**: Gas exchange between lungs and blood
- **Internal Respiration**: Gas exchange between blood and tissues

## Human Respiratory System

### Conducting Part (Respiratory Passages)

**1. Nostrils (External Nares)**
- Openings for air entry
- Lined with hair (filters dust)

**2. Nasal Cavity**
- Divided by nasal septum
- Lined with mucus membrane and ciliated epithelium
- Functions:
  - Filters air (cilia trap particles)
  - Warms air (rich blood supply)
  - Moistens air (mucus)
  - Olfactory epithelium (smell detection)

**3. Pharynx**
- Common passage for air and food
- Connects to larynx (air) and esophagus (food)

**4. Larynx (Voice Box)**
- Cartilaginous box
- Contains vocal cords
- **Epiglottis**: Flap that covers larynx during swallowing (prevents food entry)
- **Glottis**: Opening of larynx
- Sound production by vibration of vocal cords

**5. Trachea (Windpipe)**
- ~12 cm long tube
- Supported by 16-20 C-shaped cartilaginous rings (keep it open)
- Incomplete posteriorly (allows esophagus expansion)
- Lined with ciliated mucus membrane
- Divides into two bronchi at 5th thoracic vertebra

**6. Bronchi and Bronchioles**
- **Primary bronchi**: Two, enter left and right lungs
- **Secondary bronchi**: Branch within lungs (lobar bronchi)
- **Tertiary bronchi**: Further subdivisions (segmental bronchi)
- **Bronchioles**: Smaller branches (1 mm diameter)
- **Terminal bronchioles**: End of conducting zone
- Cartilage decreases, smooth muscle increases in bronchioles

### Respiratory Part (Gas Exchange)

**7. Alveoli**
- Tiny air sacs at end of bronchioles
- **Number**: ~300-400 million per lung
- **Diameter**: ~0.2-0.3 mm
- **Total surface area**: ~70-80 m² (size of tennis court)
- Thin-walled (single layer of squamous epithelium)
- Rich blood supply (dense capillary network)
- **Type I pneumocytes**: Gas exchange
- **Type II pneumocytes**: Secrete surfactant (reduces surface tension, prevents collapse)
- **Alveolar macrophages**: Phagocytose dust and pathogens

### Lungs

**Location**: Thoracic cavity, on either side of heart

**Structure:**
- **Right lung**: 3 lobes (superior, middle, inferior)
- **Left lung**: 2 lobes (superior, inferior) - cardiac notch accommodates heart
- Covered by **pleura**: Double membrane
  - **Visceral pleura**: Inner layer (on lung surface)
  - **Parietal pleura**: Outer layer (lines thoracic wall)
  - **Pleural cavity**: Space between, contains pleural fluid (lubrication, surface tension)

**Protection:**
- Ribs and intercostal muscles
- Diaphragm below
- Sternum in front
- Vertebral column behind

## Mechanism of Breathing

**Breathing**: Physical process of inspiration (inhalation) and expiration (exhalation)

**Breathing Muscles:**
- **Primary**: Diaphragm (dome-shaped, separates thorax from abdomen)
- **Accessory**:
  - **Inspiration**: External intercostal muscles, sternocleidomastoid, scalenes
  - **Expiration**: Internal intercostal muscles, abdominal muscles

### Inspiration (Inhalation)

**Process:**
1. Diaphragm contracts (flattens, moves down)
2. External intercostal muscles contract (ribs move up and out)
3. Thoracic volume increases
4. Intra-pulmonary pressure decreases (below atmospheric)
5. Air rushes into lungs (down pressure gradient)

**Type**: Active process (requires muscle contraction)

### Expiration (Exhalation)

**Normal Expiration:**
1. Diaphragm relaxes (moves up, dome-shaped)
2. External intercostal muscles relax (ribs move down and in)
3. Thoracic volume decreases
4. Intra-pulmonary pressure increases (above atmospheric)
5. Air pushed out of lungs

**Type**: Passive process at rest (elastic recoil)

**Forced Expiration**: Active (internal intercostals, abdominal muscles contract)

## Respiratory Volumes and Capacities

### Respiratory Volumes (Four Types)

**1. Tidal Volume (TV)**
- Volume of air inspired or expired during normal breathing
- **Value**: ~500 ml

**2. Inspiratory Reserve Volume (IRV)**
- Maximum additional air that can be inspired after normal inspiration
- **Value**: ~2500-3000 ml

**3. Expiratory Reserve Volume (ERV)**
- Maximum additional air that can be expired after normal expiration
- **Value**: ~1000-1100 ml

**4. Residual Volume (RV)**
- Air remaining in lungs after maximal expiration
- Cannot be expelled voluntarily
- **Value**: ~1100-1200 ml

### Respiratory Capacities (Four Types)

**1. Inspiratory Capacity (IC)**
- Maximum air inspired after normal expiration
- **IC = TV + IRV**
- **Value**: ~3500 ml

**2. Expiratory Capacity (EC)**
- Maximum air expired after normal inspiration
- **EC = TV + ERV**
- **Value**: ~1500 ml

**3. Functional Residual Capacity (FRC)**
- Air remaining after normal expiration
- **FRC = ERV + RV**
- **Value**: ~2100-2200 ml

**4. Vital Capacity (VC)**
- Maximum air that can be breathed out after maximum inspiration
- **VC = TV + IRV + ERV** or **VC = IC + EC**
- **Value**: ~4000-4500 ml in males, ~3000-3500 ml in females
- Varies with age, sex, height, physical condition

**Total Lung Capacity (TLC)**
- Total volume of air lungs can hold
- **TLC = VC + RV** or **TLC = TV + IRV + ERV + RV**
- **Value**: ~5500-6000 ml

**Minute Respiratory Volume (Minute Ventilation)**
- Volume of air breathed per minute
- **= TV × Respiratory rate**
- **= 500 ml × 12-16 breaths/min = 6000-8000 ml/min**

## Gas Exchange

### Mechanism: Diffusion

**Principle**: Movement of gases along **partial pressure gradient** (high to low)

**Partial Pressure**: Pressure exerted by individual gas in a mixture
- **Dalton's Law**: Total pressure = Sum of partial pressures
- Atmospheric pressure at sea level: 760 mmHg
  - O₂: 21% × 760 = 159 mmHg
  - CO₂: 0.04% × 760 = 0.3 mmHg
  - N₂: ~78% × 760 = 593 mmHg

### Alveolar Gas Exchange

**Partial Pressures in Alveoli:**
- **pO₂**: ~104 mmHg
- **pCO₂**: ~40 mmHg

**Partial Pressures in Deoxygenated Blood (entering lungs):**
- **pO₂**: ~40 mmHg
- **pCO₂**: ~45 mmHg

**Diffusion:**
- **O₂**: Alveoli (104 mmHg) → Blood (40 mmHg) → Blood becomes oxygenated (104 mmHg)
- **CO₂**: Blood (45 mmHg) → Alveoli (40 mmHg) → Exhaled

**Factors Affecting Gas Exchange:**
1. **Partial pressure gradient**: Greater difference = faster diffusion
2. **Solubility**: CO₂ is 20× more soluble than O₂ in water
3. **Thickness of membrane**: Thinner = faster diffusion
4. **Surface area**: Larger area = more diffusion
5. **Ventilation-perfusion ratio**: Matching of air flow to blood flow

### Tissue Gas Exchange

**Partial Pressures in Oxygenated Blood (leaving lungs):**
- **pO₂**: ~95-100 mmHg
- **pCO₂**: ~40 mmHg

**Partial Pressures in Tissues:**
- **pO₂**: ~40 mmHg (or lower in active tissues)
- **pCO₂**: ~45 mmHg (or higher in active tissues)

**Diffusion:**
- **O₂**: Blood (95 mmHg) → Tissues (40 mmHg) → Tissues use O₂ for respiration
- **CO₂**: Tissues (45 mmHg) → Blood (40 mmHg) → Blood carries CO₂ to lungs

## Transport of Gases

### Transport of Oxygen

**Three Forms (in blood):**

**1. Dissolved in Plasma (3%)**
- Physically dissolved
- Small amount due to low solubility of O₂

**2. Bound to Hemoglobin (97%)**
- **Hemoglobin (Hb)**: Protein in RBCs
- Structure: 4 heme groups (each with Fe²⁺) + 4 globin chains
- Each Hb can bind 4 O₂ molecules

**Reaction:**
Hb + 4O₂ ⇌ Hb(O₂)₄ (Oxyhemoglobin)

**Oxygen-Hemoglobin Dissociation Curve:**
- S-shaped (sigmoid) curve
- Shows % saturation of Hb with O₂ at different pO₂

**Factors Affecting O₂ Binding:**

**1. Partial Pressure of O₂:**
- High pO₂ (lungs ~100 mmHg): Hb ~97% saturated (loads O₂)
- Low pO₂ (tissues ~40 mmHg): Hb ~75% saturated (unloads O₂)

**2. pCO₂ (Bohr Effect):**
- High pCO₂: Decreases Hb affinity for O₂ (promotes O₂ release)
- In tissues: High CO₂ → Hb releases more O₂
- In lungs: Low CO₂ → Hb binds more O₂

**3. pH (H⁺ concentration):**
- Low pH (acidic): Decreases Hb affinity for O₂
- High H⁺ in tissues → O₂ release

**4. Temperature:**
- Higher temperature: Decreases Hb affinity (promotes O₂ release)
- Active tissues are warmer → more O₂ released

**5. 2,3-DPG (2,3-Diphosphoglycerate):**
- Produced in RBCs during glycolysis
- High 2,3-DPG: Decreases Hb affinity (promotes O₂ release)
- Increases at high altitude (adaptation)

### Transport of Carbon Dioxide

**Three Forms (in blood):**

**1. Dissolved in Plasma (7%)**
- Physically dissolved
- More soluble than O₂ (20× more)

**2. As Bicarbonate Ions (70%)**
- Most important mechanism
- Occurs in RBCs

**Process (in tissues):**
1. CO₂ enters RBCs
2. CO₂ + H₂O → H₂CO₃ (catalyzed by **carbonic anhydrase** enzyme)
3. H₂CO₃ → H⁺ + HCO₃⁻ (bicarbonate)
4. HCO₃⁻ diffuses into plasma
5. Cl⁻ enters RBC to maintain electrical neutrality (**Chloride shift/Hamburger shift**)
6. H⁺ binds to Hb (buffering)

**Reverse Process (in lungs):**
1. HCO₃⁻ enters RBCs from plasma
2. HCO₃⁻ + H⁺ → H₂CO₃
3. H₂CO₃ → CO₂ + H₂O (carbonic anhydrase)
4. CO₂ diffuses into alveoli → exhaled

**3. Bound to Hemoglobin (23%) - Carbaminohemoglobin**
- CO₂ binds to amino groups of globin (not heme)
- Hb + CO₂ ⇌ HbCO₂ (Carbaminohemoglobin)
- Deoxygenated Hb binds CO₂ more readily (Haldane effect)

**Haldane Effect:**
- Deoxygenated blood carries more CO₂
- In tissues: Hb releases O₂ → can bind more CO₂
- In lungs: Hb binds O₂ → releases CO₂

## Regulation of Respiration

### Respiratory Centers (in Medulla Oblongata and Pons)

**1. Medullary Respiratory Center:**
- **Dorsal Respiratory Group (DRG)**: Controls inspiration (primary rhythm generator)
- **Ventral Respiratory Group (VRG)**: Controls forced breathing (both inspiration and expiration)

**2. Pontine Respiratory Centers:**
- **Pneumotaxic center**: Inhibits inspiration, limits tidal volume, increases respiratory rate
- **Apneustic center**: Stimulates inspiration, prolongs inspiration

### Chemical Regulation

**Chemoreceptors detect changes in:**

**1. Central Chemoreceptors (Medulla):**
- Sensitive to **CO₂** and **H⁺** (pH) in CSF
- Increased CO₂/H⁺ → stimulates breathing
- Most important for normal regulation

**2. Peripheral Chemoreceptors:**
- **Carotid bodies** (carotid arteries)
- **Aortic bodies** (aortic arch)
- Sensitive to:
  - Decreased **O₂** (pO₂ < 60 mmHg)
  - Increased **CO₂**
  - Decreased **pH**
- Send signals to respiratory center

**Primary Stimulus**: Increased CO₂ (and decreased pH)
- CO₂ increases → pH decreases → stimulates breathing
- Hyperventilation → CO₂ decreases → breathing slows

**O₂ as Stimulus**:
- Normally not primary stimulus
- Becomes important when pO₂ drops significantly (< 60 mmHg)
- Important at high altitude

### Neural Regulation

**Stretch Receptors (in lung tissue):**
- Detect lung inflation
- **Hering-Breuer reflex**: Prevents over-inflation
  - Lung stretches → signals to medulla → inhibits further inspiration

**Higher Brain Centers:**
- Cerebral cortex: Voluntary control (hold breath, hyperventilate)
- Hypothalamus: Emotional states affect breathing
- Limbic system: Anxiety, fear increase breathing

## Disorders of Respiratory System

**Asthma:**
- Narrowing of airways due to inflammation and muscle spasm
- Wheezing, difficulty breathing
- Triggered by allergens, pollution, stress

**Emphysema:**
- Damage to alveolar walls (loss of elasticity)
- Reduced surface area for gas exchange
- Caused by smoking, air pollution

**Pneumonia:**
- Inflammation of alveoli (infection)
- Fluid accumulation in alveoli
- Caused by bacteria, viruses

**Tuberculosis (TB):**
- Bacterial infection (*Mycobacterium tuberculosis*)
- Lung nodules, tissue damage
- Contagious (airborne)

**Bronchitis:**
- Inflammation of bronchi
- Excess mucus production
- Acute (viral) or chronic (smoking)

**Occupational Respiratory Disorders:**
- **Silicosis**: Silica dust (mining, sandblasting)
- **Asbestosis**: Asbestos fibers
- **Black lung**: Coal dust (coal miners)

**COPD (Chronic Obstructive Pulmonary Disease):**
- Progressive lung disease (emphysema + chronic bronchitis)
- Airflow limitation
- Major cause: Smoking

**Lung Cancer:**
- Uncontrolled cell growth in lungs
- Major cause: Smoking (tobacco)
- Types: Small cell, non-small cell

**High Altitude Effects:**
- Lower atmospheric pressure → lower pO₂
- Altitude sickness: Headache, nausea, fatigue
- Acclimatization:
  - Increased RBC production (erythropoietin)
  - Increased breathing rate
  - Increased 2,3-DPG
`,

    keyConcepts: [
      'Respiratory system: Ventilation, gas exchange, transport, regulation',
      'Nasal cavity: Filters, warms, moistens air',
      'Trachea: Supported by C-shaped cartilage rings',
      'Alveoli: 300-400 million, total surface area ~70-80 m²',
      'Surfactant: Reduces surface tension, prevents alveolar collapse',
      'Pleura: Visceral (on lung) and parietal (on thoracic wall)',
      'Inspiration: Diaphragm contracts → volume ↑ → pressure ↓ → air in',
      'Expiration: Diaphragm relaxes → volume ↓ → pressure ↑ → air out',
      'Vital capacity: TV + IRV + ERV (~4500 ml males)',
      'Total lung capacity: VC + RV (~6000 ml)',
      'Gas diffusion: Along partial pressure gradient (high to low)',
      'O₂ transport: 97% bound to hemoglobin, 3% dissolved',
      'CO₂ transport: 70% as HCO₃⁻, 23% as carbaminohemoglobin, 7% dissolved',
      'Carbonic anhydrase: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻',
      'Chloride shift: HCO₃⁻ out, Cl⁻ in (electrical neutrality)',
      'Bohr effect: High CO₂/H⁺ decreases Hb-O₂ affinity',
      'Haldane effect: Deoxygenated Hb carries more CO₂',
      'Respiratory control: Medullary centers respond to CO₂ and pH'
    ],

    formulas: [
      'Inspiratory Capacity (IC) = TV + IRV',
      'Expiratory Capacity (EC) = TV + ERV',
      'Functional Residual Capacity (FRC) = ERV + RV',
      'Vital Capacity (VC) = TV + IRV + ERV = IC + EC',
      'Total Lung Capacity (TLC) = VC + RV',
      'Minute Ventilation = TV × Respiratory rate',
      'Carbonic anhydrase: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻',
      'Oxyhemoglobin: Hb + 4O₂ ⇌ Hb(O₂)₄',
      'Carbaminohemoglobin: Hb + CO₂ ⇌ HbCO₂'
    ],

    learningObjectives: [
      'Describe the human respiratory system structure',
      'Understand the mechanism of breathing (inspiration and expiration)',
      'Explain respiratory volumes and capacities',
      'Understand gas exchange at alveoli and tissues',
      'Describe transport of oxygen by hemoglobin',
      'Explain transport of carbon dioxide in blood',
      'Understand Bohr effect and Haldane effect',
      'Describe regulation of respiration',
      'Identify common respiratory disorders'
    ],

    prerequisites: [
      'Understanding of gas diffusion and partial pressure',
      'Knowledge of blood composition and hemoglobin',
      'Basic anatomy of thoracic cavity',
      'Understanding of pH and buffering'
    ],

    importantTopics: [
      'Respiratory system anatomy: Nose to alveoli',
      'Alveoli structure and surface area',
      'Mechanism of breathing: Diaphragm and intercostal muscles',
      'Respiratory volumes: TV, IRV, ERV, RV',
      'Vital capacity and total lung capacity',
      'Gas exchange: Partial pressure gradients',
      'O₂ transport: 97% as oxyhemoglobin',
      'CO₂ transport: 70% as bicarbonate',
      'Carbonic anhydrase reaction',
      'Chloride shift (Hamburger shift)',
      'Bohr effect: CO₂/H⁺ effect on O₂ release',
      'Haldane effect: O₂ effect on CO₂ transport',
      'Respiratory centers in medulla',
      'Chemical regulation: CO₂ primary stimulus',
      'Common disorders: Asthma, emphysema, pneumonia'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 17',
    estimatedStudyMinutes: 360,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'diagram',
        title: 'Human Respiratory System',
        description: 'Complete system from nasal cavity to alveoli'
      },
      {
        type: 'diagram',
        title: 'Alveolus Structure',
        description: 'Cross-section showing capillary network and gas exchange'
      },
      {
        type: 'graph',
        title: 'Oxygen-Hemoglobin Dissociation Curve',
        description: 'S-shaped curve showing % saturation vs pO₂'
      },
      {
        type: 'flowchart',
        title: 'CO₂ Transport Mechanism',
        description: 'Bicarbonate formation and chloride shift in RBCs'
      },
      {
        type: 'diagram',
        title: 'Respiratory Volumes and Capacities',
        description: 'Spirogram showing TV, IRV, ERV, RV, VC, TLC'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Breathing and Exchange of Gases',
      estimatedStudyMinutes: 360,
      difficultyLevel: 4,
      status: 'published'
    }
  });

  console.log('✅ Biology Chapter 17: Breathing and Exchange of Gases seeded successfully!');
}

seedBiologyChapter17()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
