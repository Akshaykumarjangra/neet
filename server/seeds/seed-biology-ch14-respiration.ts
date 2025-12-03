import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter14() {
  console.log('Seeding Biology Class 11 Chapter 14: Respiration in Plants...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 14,
    chapterTitle: 'Respiration in Plants',
    introduction: `Respiration is the biochemical process by which organisms release energy from organic compounds, typically glucose, to produce ATP (adenosine triphosphate). Unlike photosynthesis which captures energy, respiration releases the stored chemical energy for use in cellular processes. In plants, respiration occurs continuously in all living cells, both day and night, in both photosynthetic and non-photosynthetic tissues. Understanding plant respiration is essential for comprehending energy metabolism, crop productivity, post-harvest losses, and the carbon cycle. This chapter explores aerobic and anaerobic pathways of respiration, their mechanisms, energy yields, and regulation.`,

    detailedNotes: `
# Respiration in Plants

## Overview of Respiration

**Definition**: Oxidation of organic compounds (usually glucose) to release energy, which is stored in ATP.

**Overall Equation (Aerobic Respiration):**
C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (686 kcal or 2880 kJ)

**Key Points:**
- Catabolic process (breakdown of complex molecules)
- Occurs in all living cells, 24 hours a day
- Releases energy in stepwise manner (not all at once)
- Energy stored in ATP molecules (38 ATP from 1 glucose in ideal conditions)
- Reverse of photosynthesis (but not the same pathways)

## Types of Respiration

### 1. Aerobic Respiration
- Requires oxygen
- Complete oxidation of glucose to CO₂ and H₂O
- Occurs in cytoplasm and mitochondria
- High ATP yield (38 ATP per glucose, theoretical maximum)
- Most common in plants

### 2. Anaerobic Respiration (Fermentation)
- Does not require oxygen
- Incomplete oxidation of glucose
- Occurs in cytoplasm only
- Low ATP yield (2 ATP per glucose)
- Produces ethanol or lactic acid as end products

## Aerobic Respiration: Stages

Aerobic respiration consists of four main stages:

### Stage 1: Glycolysis (EMP Pathway)

**Location**: Cytoplasm (cytosol)

**Substrate**: Glucose (6C)

**End Product**: 2 Pyruvate (3C each)

**Oxygen Requirement**: None (anaerobic process)

**Discovered by**: Gustav Embden, Otto Meyerhof, J. Parnas (hence EMP pathway)

**Steps:**

**Phase 1: Energy Investment (Preparatory Phase)**
1. Glucose phosphorylated to Glucose-6-phosphate (uses 1 ATP)
2. Isomerization to Fructose-6-phosphate
3. Phosphorylation to Fructose-1,6-bisphosphate (uses 1 ATP)
4. Cleavage into two 3-carbon molecules: DHAP and G3P
5. DHAP converted to G3P (both are triose phosphates)

**Phase 2: Energy Payoff (Oxidation Phase)**
6. Oxidation of G3P to 1,3-bisphosphoglycerate (produces NADH)
7. Substrate-level phosphorylation produces 3-phosphoglycerate (produces ATP)
8. Conversion to 2-phosphoglycerate
9. Dehydration to phosphoenolpyruvate (PEP)
10. Substrate-level phosphorylation produces pyruvate (produces ATP)

**Net Products of Glycolysis (per glucose):**
- 2 Pyruvate (3C)
- 2 ATP (net: 4 produced - 2 consumed)
- 2 NADH + 2H⁺

**Key Enzymes:**
- Hexokinase (glucose phosphorylation)
- Phosphofructokinase (PFK) - rate-limiting enzyme
- Pyruvate kinase (final ATP synthesis)

### Stage 2: Link Reaction (Oxidative Decarboxylation of Pyruvate)

**Location**: Mitochondrial matrix

**Process:**
- Pyruvate (3C) enters mitochondria
- Oxidative decarboxylation by pyruvate dehydrogenase complex
- One CO₂ removed, one NADH produced
- Forms Acetyl-CoA (2C)

**Equation (per pyruvate):**
Pyruvate (3C) + NAD⁺ + CoA → Acetyl-CoA (2C) + CO₂ + NADH + H⁺

**Net Products (per glucose, 2 pyruvates):**
- 2 Acetyl-CoA
- 2 CO₂
- 2 NADH + 2H⁺

### Stage 3: Krebs Cycle (Citric Acid Cycle / TCA Cycle)

**Location**: Mitochondrial matrix

**Discovered by**: Hans Krebs (1937)

**Also called**: Tricarboxylic Acid (TCA) cycle (citric acid has 3 carboxyl groups)

**Steps (per Acetyl-CoA):**

1. **Condensation**: Acetyl-CoA (2C) + Oxaloacetate (4C) → Citrate (6C) + CoA
   - Enzyme: Citrate synthase

2. **Isomerization**: Citrate (6C) → Isocitrate (6C)
   - Via cis-aconitate intermediate
   - Enzyme: Aconitase

3. **First Decarboxylation**: Isocitrate (6C) → α-ketoglutarate (5C) + CO₂ + NADH
   - Enzyme: Isocitrate dehydrogenase
   - NAD⁺ reduced to NADH

4. **Second Decarboxylation**: α-ketoglutarate (5C) → Succinyl-CoA (4C) + CO₂ + NADH
   - Enzyme: α-ketoglutarate dehydrogenase complex
   - NAD⁺ reduced to NADH

5. **Substrate-level Phosphorylation**: Succinyl-CoA (4C) → Succinate (4C) + GTP/ATP
   - Enzyme: Succinyl-CoA synthetase
   - Only step producing ATP/GTP directly

6. **Oxidation**: Succinate (4C) → Fumarate (4C) + FADH₂
   - Enzyme: Succinate dehydrogenase (embedded in inner mitochondrial membrane)
   - FAD reduced to FADH₂

7. **Hydration**: Fumarate (4C) → Malate (4C)
   - Enzyme: Fumarase
   - Addition of water

8. **Oxidation**: Malate (4C) → Oxaloacetate (4C) + NADH
   - Enzyme: Malate dehydrogenase
   - NAD⁺ reduced to NADH
   - Regenerates oxaloacetate to continue cycle

**Net Products (per Acetyl-CoA, one turn):**
- 3 NADH + 3H⁺
- 1 FADH₂
- 1 GTP/ATP
- 2 CO₂
- Oxaloacetate regenerated

**Net Products (per glucose, two turns):**
- 6 NADH + 6H⁺
- 2 FADH₂
- 2 ATP/GTP
- 4 CO₂

**Amphibolic Nature:**
- Both catabolic (breakdown) and anabolic (synthesis)
- Intermediates used for biosynthesis of amino acids, fatty acids, etc.

### Stage 4: Electron Transport Chain (ETC) and Oxidative Phosphorylation

**Location**: Inner mitochondrial membrane

**Purpose**: Reoxidize NADH and FADH₂, synthesize ATP using chemiosmotic gradient

**Electron Transport Chain Components:**

**Complex I: NADH Dehydrogenase**
- Accepts electrons from NADH
- Transfers to ubiquinone (coenzyme Q)
- Pumps 4 H⁺ into intermembrane space
- FMN and Fe-S clusters as cofactors

**Complex II: Succinate Dehydrogenase**
- Accepts electrons from FADH₂ (from succinate oxidation)
- Transfers to ubiquinone
- Does NOT pump protons
- Part of Krebs cycle enzyme

**Ubiquinone (Coenzyme Q)**
- Mobile electron carrier
- Moves within membrane
- Transfers electrons from Complex I/II to Complex III

**Complex III: Cytochrome bc₁ Complex**
- Accepts electrons from ubiquinone
- Transfers to cytochrome c
- Pumps 4 H⁺ into intermembrane space
- Contains cytochrome b, c₁, and Fe-S protein

**Cytochrome c**
- Mobile electron carrier
- Small peripheral protein
- Transfers electrons from Complex III to Complex IV

**Complex IV: Cytochrome c Oxidase**
- Accepts electrons from cytochrome c
- Final electron acceptor: O₂ (reduced to H₂O)
- Pumps 2 H⁺ into intermembrane space
- Contains cytochrome a, a₃, and copper centers

**Final Reaction:**
4e⁻ + 4H⁺ + O₂ → 2H₂O

**Chemiosmotic Hypothesis (Peter Mitchell, 1961)**

**Mechanism:**
1. Proton gradient established: H⁺ concentration higher in intermembrane space than matrix
2. Creates electrochemical gradient (ΔpH and membrane potential)
3. H⁺ flows back through ATP synthase (F₀F₁ complex)
4. Flow of H⁺ drives ATP synthesis from ADP + Pi

**ATP Synthase Structure:**
- **F₀**: Proton channel in membrane
- **F₁**: Catalytic unit projecting into matrix
- Rotational catalysis mechanism

**ATP Yield:**
- Each NADH → ~2.5 ATP (when electrons enter at Complex I)
- Each FADH₂ → ~1.5 ATP (electrons enter at Complex II, skip Complex I)

## Complete ATP Accounting (Ideal Theoretical Maximum)

**From Glycolysis:**
- 2 ATP (substrate-level)
- 2 NADH → 5 ATP (if using malate-aspartate shuttle) or 3 ATP (if using glycerol-3-phosphate shuttle)

**From Link Reaction:**
- 2 NADH (from 2 pyruvates) → 5 ATP

**From Krebs Cycle:**
- 2 ATP (substrate-level)
- 6 NADH → 15 ATP
- 2 FADH₂ → 3 ATP

**Total (theoretical maximum):**
- Using malate-aspartate shuttle: **38 ATP**
- Using glycerol-3-phosphate shuttle: **36 ATP**
- **Realistic yield: ~30-32 ATP** (due to proton leak, transport costs)

## Anaerobic Respiration (Fermentation)

### Alcoholic Fermentation

**Location**: Cytoplasm

**Organisms**: Yeast, some plant tissues (waterlogged roots)

**Process:**
1. Glycolysis: Glucose → 2 Pyruvate + 2 ATP + 2 NADH
2. Decarboxylation: Pyruvate → Acetaldehyde + CO₂
3. Reduction: Acetaldehyde + NADH → Ethanol + NAD⁺

**Net Equation:**
Glucose → 2 Ethanol + 2 CO₂ + 2 ATP

**Enzymes:**
- Pyruvate decarboxylase
- Alcohol dehydrogenase

**Significance:**
- Brewing, wine-making, bread-making
- Occurs in waterlogged plant roots (oxygen deficiency)
- NADH reoxidized to NAD⁺ to continue glycolysis

### Lactic Acid Fermentation

**Location**: Cytoplasm

**Organisms**: Some bacteria, muscle cells during oxygen debt (not common in plants)

**Process:**
1. Glycolysis: Glucose → 2 Pyruvate + 2 ATP + 2 NADH
2. Reduction: Pyruvate + NADH → Lactate + NAD⁺

**Net Equation:**
Glucose → 2 Lactate + 2 ATP

**Enzyme**: Lactate dehydrogenase

## Respiratory Quotient (RQ)

**Definition**: Ratio of volume of CO₂ evolved to volume of O₂ consumed

**Formula**: RQ = CO₂ evolved / O₂ consumed

**Values for Different Substrates:**

**Carbohydrates**: RQ = 1
- C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O
- 6CO₂/6O₂ = 1

**Proteins**: RQ ≈ 0.8-0.9
- Contain less oxygen, require more for oxidation

**Fats/Lipids**: RQ ≈ 0.7
- Example: 2C₅₁H₉₈O₆ + 145O₂ → 102CO₂ + 98H₂O
- Fats are more reduced, require more O₂

**Organic Acids**: RQ > 1
- Example: Oxalic acid: 2C₂H₂O₄ + O₂ → 4CO₂ + 2H₂O
- RQ = 4CO₂/1O₂ = 4
- Already partially oxidized

**Anaerobic Respiration**: RQ = ∞ (infinity)
- No O₂ consumed, only CO₂ produced

**Succulent Plants (CAM)**: RQ < 1 (can be 0)
- During night: Store CO₂ as malic acid (no CO₂ release)

## Respiratory Substrates

**Primary Substrate**: Glucose (from starch, sucrose breakdown)

**Alternative Substrates:**
- **Fats**: Glycerol and fatty acids (β-oxidation)
  - Higher energy yield per gram
  - Common in oilseeds during germination
- **Proteins**: Deamination to keto acids
  - Enter Krebs cycle at various points
  - Usually respiratory substrate only during starvation

**Entry Points into Respiratory Pathway:**
- Glucose → Glycolysis (beginning)
- Glycerol → DHAP (glycolysis intermediate)
- Fatty acids → Acetyl-CoA (Krebs cycle)
- Amino acids → Various keto acids → Krebs cycle intermediates

## Factors Affecting Respiration Rate

**1. Temperature**
- Optimum: 20-30°C for most plants
- Low temperature: Enzyme activity reduced
- High temperature: Enzyme denaturation
- Q₁₀ (temperature coefficient): ~2-3 (rate doubles/triples per 10°C rise)

**2. Oxygen Concentration**
- Below 5%: Anaerobic respiration predominates
- Normal atmospheric (21%): Optimal aerobic respiration
- Above 21%: Little further increase

**3. Carbon Dioxide Concentration**
- High CO₂ (>5%): Inhibits respiration
- Used in storage to reduce respiration and extend shelf life

**4. Water**
- Adequate water needed for enzyme activity
- Dry seeds have minimal respiration
- Respiration increases upon imbibition

**5. Availability of Respiratory Substrate**
- Abundant substrate → higher respiration
- Starvation → reduced respiration, protein breakdown

**6. Light**
- Indirect effect through stomatal opening
- Provides substrate (sugars from photosynthesis)

**7. Injury/Wounding**
- Increases respiration rate
- Healing response, defense mechanisms
- Wound respiration (climacteric-like rise)

## Comparison of Aerobic and Anaerobic Respiration

| Feature | Aerobic | Anaerobic |
|---------|---------|-----------|
| Oxygen requirement | Required | Not required |
| Location | Cytoplasm + Mitochondria | Cytoplasm only |
| End products | CO₂ + H₂O | Ethanol/Lactate + CO₂ |
| ATP yield | 36-38 ATP | 2 ATP |
| Complete oxidation | Yes | No (partial) |
| RQ value | 0.7-1.0 | ∞ |
| Krebs cycle | Present | Absent |
| ETC | Present | Absent |

## Importance of Respiration

**1. Energy Production**
- ATP for all cellular processes
- Active transport, biosynthesis, movement

**2. Intermediates for Biosynthesis**
- Krebs cycle intermediates used for amino acid, nucleotide synthesis
- Amphibolic pathway

**3. Post-Harvest Losses**
- Respiration continues in stored grains, fruits
- Loss of dry matter
- Controlled atmosphere storage reduces losses

**4. Climacteric Fruits**
- Sudden rise in respiration during ripening
- Examples: Mango, banana, apple
- Non-climacteric: Grapes, citrus

**5. Seed Germination**
- Mobilization of food reserves
- Energy for embryo growth

**6. Heat Production**
- Thermogenic plants (e.g., Arum)
- Spadix temperature rises, volatilizes odors to attract pollinators
`,

    keyConcepts: [
      'Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (38 ATP)',
      'Aerobic respiration: 4 stages - Glycolysis, Link reaction, Krebs cycle, ETC',
      'Glycolysis: Glucose → 2 Pyruvate (cytoplasm, 2 ATP net, 2 NADH)',
      'EMP pathway: Embden-Meyerhof-Parnas pathway (glycolysis)',
      'Link reaction: Pyruvate → Acetyl-CoA (mitochondria, 2 NADH per glucose)',
      'Krebs cycle: 8 steps, 3 NADH + 1 FADH₂ + 1 ATP per turn',
      'Krebs cycle: Amphibolic (both catabolic and anabolic)',
      'ETC: 4 complexes (I, II, III, IV) in inner mitochondrial membrane',
      'Chemiosmotic hypothesis: H⁺ gradient drives ATP synthesis (Peter Mitchell)',
      'ATP yield: NADH → 2.5 ATP, FADH₂ → 1.5 ATP (theoretical)',
      'Total ATP: 38 ATP (theoretical max), 30-32 ATP (realistic)',
      'Fermentation: Glucose → 2 Ethanol/Lactate + 2 ATP (anaerobic)',
      'RQ = CO₂/O₂: Carbohydrates = 1, Fats = 0.7, Proteins = 0.8-0.9',
      'Alcoholic fermentation: Yeast, produces ethanol + CO₂',
      'Anaerobic respiration: RQ = ∞ (no oxygen consumed)',
      'Respiratory substrates: Glucose primary, fats/proteins alternative',
      'Factors: Temperature (Q₁₀ = 2-3), oxygen, CO₂, water, substrate',
      'Climacteric fruits: Sudden respiration rise during ripening'
    ],

    formulas: [
      'Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP',
      'Glycolysis: Glucose + 2 NAD⁺ + 2 ADP + 2 Pi → 2 Pyruvate + 2 NADH + 2 ATP',
      'Link: Pyruvate + NAD⁺ + CoA → Acetyl-CoA + CO₂ + NADH',
      'Krebs (per turn): Acetyl-CoA → 3 NADH + 1 FADH₂ + 1 ATP + 2 CO₂',
      'ETC: 2 NADH → 5 ATP, 2 FADH₂ → 3 ATP',
      'Alcoholic fermentation: Glucose → 2 Ethanol + 2 CO₂ + 2 ATP',
      'RQ = Volume of CO₂ evolved / Volume of O₂ consumed'
    ],

    learningObjectives: [
      'Understand the overall process and equation of respiration',
      'Differentiate between aerobic and anaerobic respiration',
      'Explain glycolysis pathway and its products',
      'Describe the link reaction and formation of Acetyl-CoA',
      'Understand the Krebs cycle steps and products',
      'Explain electron transport chain and oxidative phosphorylation',
      'Describe chemiosmotic hypothesis of ATP synthesis',
      'Calculate ATP yield from complete glucose oxidation',
      'Understand fermentation pathways and their significance',
      'Explain respiratory quotient and its values for different substrates',
      'Identify factors affecting rate of respiration'
    ],

    prerequisites: [
      'Understanding of mitochondrial structure',
      'Basic knowledge of enzymes and coenzymes (NAD⁺, FAD)',
      'Concept of ATP as energy currency',
      'Understanding of oxidation-reduction reactions',
      'Knowledge of cellular organization'
    ],

    importantTopics: [
      'Overall respiration equation and ATP yield',
      'Glycolysis: location, steps, net products (2 ATP, 2 NADH)',
      'Link reaction: pyruvate to acetyl-CoA',
      'Krebs cycle: 8 steps, enzymes, products (3 NADH, 1 FADH₂, 1 ATP)',
      'Amphibolic nature of Krebs cycle',
      'Electron transport chain: 4 complexes',
      'Chemiosmotic hypothesis (Peter Mitchell)',
      'ATP synthase (F₀F₁ complex)',
      'Complete ATP accounting (38 ATP maximum)',
      'Alcoholic fermentation: pyruvate → ethanol + CO₂',
      'Respiratory quotient (RQ) for carbohydrates, fats, proteins',
      'RQ = 1 (carbohydrates), 0.7 (fats), 0.8-0.9 (proteins)',
      'Factors affecting respiration: temperature, oxygen, CO₂',
      'Respiratory substrates and entry points',
      'Aerobic vs anaerobic respiration comparison'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 14',
    estimatedStudyMinutes: 420,
    difficultyLevel: 5,
    status: 'published',

    visualizationsData: [
      {
        type: 'flowchart',
        title: 'Glycolysis Pathway',
        description: '10-step breakdown of glucose to pyruvate with ATP and NADH production'
      },
      {
        type: 'diagram',
        title: 'Krebs Cycle',
        description: 'Circular pathway showing 8 steps with NADH, FADH₂, and ATP generation'
      },
      {
        type: 'diagram',
        title: 'Electron Transport Chain',
        description: 'Complexes I-IV in inner mitochondrial membrane with H⁺ pumping'
      },
      {
        type: 'flowchart',
        title: 'ATP Synthesis Accounting',
        description: 'Complete breakdown of ATP yield from each stage of respiration'
      },
      {
        type: 'comparison',
        title: 'Aerobic vs Anaerobic Respiration',
        description: 'Side-by-side comparison of pathways, products, and efficiency'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Respiration in Plants',
      estimatedStudyMinutes: 420,
      difficultyLevel: 5,
      status: 'published'
    }
  });

  console.log('✅ Biology Chapter 14: Respiration in Plants seeded successfully!');
}

seedBiologyChapter14()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
