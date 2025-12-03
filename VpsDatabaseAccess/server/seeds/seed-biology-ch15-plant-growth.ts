import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyChapter15() {
  console.log('Seeding Biology Class 11 Chapter 15: Plant Growth and Development...');

  await db.insert(chapterContent).values({
    subject: 'Biology',
    classLevel: '11',
    chapterNumber: 15,
    chapterTitle: 'Plant Growth and Development',
    introduction: `Plant growth and development are fundamental processes that transform a tiny seed into a complex, mature organism. Growth refers to irreversible increase in size and mass, while development encompasses all qualitative changes including differentiation, morphogenesis, and maturation. Unlike animals, plants exhibit indeterminate growth throughout their life due to meristems. Understanding plant growth regulation is crucial for agriculture, horticulture, and biotechnology. This chapter explores growth phases, growth regulators (phytohormones), and plant movements, providing insights into how plants respond to environmental cues and coordinate their developmental programs.`,

    detailedNotes: `
# Plant Growth and Development

## Concepts of Growth and Development

### Growth
**Definition**: Irreversible, permanent increase in size, mass, and cell number

**Characteristics:**
- Quantitative changes (measurable)
- Results from cell division, cell enlargement, cell differentiation
- Can be measured as: fresh weight, dry weight, length, area, volume, cell number
- **Unlimited/Indeterminate** in plants (due to meristems)

### Development
**Definition**: Sum of growth and differentiation; all changes organism undergoes during life cycle

**Characteristics:**
- Qualitative changes
- Includes differentiation, dedifferentiation, redifferentiation
- Programmed sequence of events

### Differentiation
**Definition**: Process by which cells derived from root apical and shoot apical meristems mature to perform specific functions

**Examples:**
- Xylem and phloem differentiation
- Epidermal cells with cuticle
- Root hair formation

### Dedifferentiation
**Definition**: Loss of specialized function, regaining capacity to divide

**Examples:**
- Formation of interfascicular cambium from parenchyma
- Cork cambium formation
- Callus formation in tissue culture

### Redifferentiation
**Definition**: Dedifferentiated cells mature again to perform specific functions

**Example**: Interfascicular cambium differentiating into secondary xylem and phloem

## Phases of Growth

### Phase 1: Meristematic (Formative) Phase
- Cells rich in protoplasm
- Large nucleus, thin cell walls
- Abundant cell division
- Located at root and shoot apices

### Phase 2: Elongation Phase
- Cells increase in size
- Vacuolation occurs
- New cell wall material deposited
- Maximum growth rate
- Located just behind meristems

### Phase 3: Maturation (Differentiation) Phase
- Cells attain maximum size
- Thickening of cell walls
- Protoplasmic modifications
- Cells become specialized
- Growth rate decreases

## Growth Rate

**Arithmetic Growth:**
- One daughter cell remains meristematic, other differentiates
- Linear growth (constant rate)
- Example: Root elongating at constant rate
- **Equation**: Lt = L₀ + rt
  - Lt = length at time t
  - L₀ = initial length
  - r = growth rate

**Geometric Growth:**
- Both daughter cells retain ability to divide
- Exponential growth
- Characteristic of cells in log/exponential phase
- **Equation**: W₁ = W₀e^(rt)
  - W₁ = final size
  - W₀ = initial size
  - r = relative growth rate
  - t = time
  - e = base of natural logarithms

## Growth Curve (Sigmoid Curve)

**Pattern**: S-shaped curve when growth plotted against time

**Phases:**

**1. Lag Phase**
- Slow growth initially
- Cells preparing for division
- Metabolic machinery being set up

**2. Log/Exponential Phase**
- Rapid, exponential growth
- Maximum cell division
- Geometric growth pattern

**3. Stationary Phase**
- Growth rate decreases
- Limited nutrients, space
- Maturation beginning

**4. Senescence Phase**
- Decline phase
- Degenerative changes
- Leading to death

## Conditions for Growth

**1. Water**: Essential for cell enlargement, turgor pressure
**2. Oxygen**: For respiration, energy production
**3. Nutrients**: Macro and micronutrients
**4. Temperature**: Optimum 28-30°C for most plants
**5. Light**: Affects photosynthesis, some seeds need light for germination

## Plant Growth Regulators (Phytohormones)

**Definition**: Organic substances produced in small quantities, transported to other sites, where they cause physiological responses

**Characteristics:**
- Produced in minute quantities
- Transported within plant
- Can promote or inhibit growth
- Work in very low concentrations

### Five Major Groups:

1. Auxins
2. Gibberellins
3. Cytokinins
4. Abscisic Acid (ABA)
5. Ethylene

### 1. AUXINS

**Discovery:**
- Charles Darwin (1880): Phototropism in coleoptiles
- F.W. Went (1928): Isolated auxin from oat coleoptile tips
- Term "auxin" from Greek "auxein" (to grow)

**Natural Auxins:**
- **IAA (Indole-3-Acetic Acid)**: Most common
- Indole butyric acid (IBA)
- Phenyl acetic acid (PAA)

**Synthetic Auxins:**
- NAA (Naphthalene Acetic Acid)
- 2,4-D (2,4-Dichlorophenoxyacetic acid) - herbicide
- 2,4,5-T (Agent Orange component)

**Site of Production**: Shoot apex, young leaves, developing seeds

**Physiological Effects:**

**Growth Promotion:**
- **Apical dominance**: Suppresses lateral bud growth
- **Cell elongation**: Promotes by increasing cell wall plasticity
- **Root initiation**: Stimulates adventitious and lateral root formation
- **Parthenocarpy**: Fruit development without fertilization

**Tropisms:**
- **Phototropism**: Bending toward light (unequal auxin distribution)
- **Gravitropism**: Response to gravity

**Other Effects:**
- Prevents abscission of leaves and fruits
- Delays senescence
- Xylem differentiation
- Apical dominance (inhibits lateral buds)

**Agricultural Applications:**
- Rooting hormone (IBA, NAA)
- Prevent fruit and leaf drop
- Parthenocarpic fruits (seedless)
- 2,4-D as selective herbicide (kills dicots, not monocots)
- Pineapple flowering synchronization

### 2. GIBBERELLINS

**Discovery:**
- Japanese scientist E. Kurosawa (1926)
- Studied "bakanae" (foolish seedling) disease in rice
- Caused by fungus *Gibberella fujikuroi*
- Isolated gibberellic acid (GA₃)

**Types**: Over 100 gibberellins identified (GA₁, GA₂, GA₃...GA₁₂₀)
- Most common: **GA₃ (Gibberellic Acid)**

**Site of Production**: Young leaves, seeds, root tips, shoot tips

**Physiological Effects:**

**Growth Promotion:**
- **Stem elongation**: Dramatic increase in internodal length
- **Bolting**: Rapid stem elongation in rosette plants before flowering
- **Cell elongation and division**

**Seed Germination:**
- Breaks seed dormancy
- Stimulates α-amylase synthesis in aleurone layer
- Hydrolyzes starch to sugars for embryo

**Flowering:**
- Promotes flowering in long-day plants
- Substitute for cold treatment (vernalization)

**Other Effects:**
- Parthenocarpy (seedless fruits)
- Delays senescence
- Increases fruit size

**Agricultural Applications:**
- Increase sugarcane yield (elongation)
- Malting process (brewing industry)
- Grape berry elongation
- Overcome dormancy in seeds and buds
- Sugar beet bolting

### 3. CYTOKININS

**Discovery:**
- F. Skoog and C.O. Miller (1950s)
- Isolated from autoclaved herring sperm DNA
- Named "kinetin" (synthetic)
- Natural cytokinin: **Zeatin** (from maize)

**Natural Cytokinins:**
- Zeatin (most abundant)
- Isopentenyladenine (IPA)

**Synthetic Cytokinins:**
- Kinetin
- Benzylaminopurine (BAP)

**Site of Production**: Root apex, developing seeds, fruits

**Physiological Effects:**

**Cell Division:**
- **Promotes cytokinesis** (hence "cytokinin")
- Works with auxin in tissue culture

**Auxin-Cytokinin Ratio:**
- High auxin:cytokinin → Root formation
- Equal ratio → Callus formation
- High cytokinin:auxin → Shoot formation

**Other Effects:**
- Delays senescence (Richmond-Lang effect)
- Breaks apical dominance (promotes lateral bud growth)
- Promotes cell enlargement
- Nutrient mobilization
- Chloroplast development

**Agricultural Applications:**
- Tissue culture (shoot induction)
- Delay leaf senescence (cut flowers)
- Promote lateral branching
- Increase shelf life of vegetables

### 4. ABSCISIC ACID (ABA)

**Discovery:**
- P.F. Wareing (1960s): Dormancy factor
- F.T. Addicott: Abscission-promoting substance
- Later found to be same compound

**Alternative Names:**
- Stress hormone
- Dormin (dormancy inducing)

**Site of Production**: Leaves (especially stressed), root cap, seeds, fruits

**Physiological Effects:**

**Growth Inhibition:**
- Inhibits seed germination
- Promotes seed dormancy
- Antagonistic to gibberellins

**Stress Responses:**
- **Stomatal closure**: During water stress, wilting
- Increases in response to drought, salinity, cold
- Induces synthesis of storage proteins in seeds

**Other Effects:**
- Promotes abscission of leaves, flowers, fruits
- Induces bud dormancy
- Inhibits shoot growth

**Agricultural Applications:**
- Induce drought tolerance
- Storage of seeds
- Promote bud dormancy

### 5. ETHYLENE

**Discovery:**
- Recognized as plant hormone in 1930s
- Only gaseous plant hormone

**Production**: All plant parts, especially ripening fruits, senescent tissues

**Precursor**: Methionine (amino acid) → ACC (1-aminocyclopropane-1-carboxylic acid) → Ethylene

**Physiological Effects:**

**Ripening:**
- **Climacteric fruits**: Triggers ripening (mango, banana, apple)
- Autocatalytic (ethylene production increases exponentially)

**Senescence:**
- Promotes aging of flowers and leaves
- Abscission of leaves, flowers, fruits

**Other Effects:**
- Triple response in seedlings (inhibits stem elongation, increases lateral growth, abnormal swelling)
- Promotes female flowers in cucurbits
- Breaks bud and seed dormancy
- Promotes root hair formation, root initiation

**Agricultural Applications:**
- Artificial fruit ripening
- Promotes flowering in pineapple, mango
- Degreening of citrus fruits
- Sex expression modification in cucurbits

## Photoperiodism

**Definition**: Physiological response to relative lengths of day and night (photoperiod)

**Discovered by**: W.W. Garner and H.A. Allard (1920)

**Classification Based on Flowering:**

**1. Short-Day Plants (SDP)**
- Flower when day length < critical photoperiod
- Actually respond to long night duration
- Examples: Rice, soybean, chrysanthemum, tobacco

**2. Long-Day Plants (LDP)**
- Flower when day length > critical photoperiod
- Actually respond to short night duration
- Examples: Wheat, barley, spinach, lettuce

**3. Day-Neutral Plants (DNP)**
- Flowering not affected by photoperiod
- Examples: Tomato, sunflower, cotton, cucumber

**Site of Perception**: Leaves (not shoot apex)

**Photoperiodic Stimulus**: Transmissible signal (florigen - hypothetical flowering hormone)

**Mechanism:**
- Involves phytochrome (Pr and Pfr forms)
- Pfr (far-red absorbing form) is active form
- Accumulates during day, converts to Pr during night

## Vernalization

**Definition**: Promotion of flowering by exposure to cold treatment

**Term**: Coined by T.D. Lysenko

**Examples:**
- Winter wheat (requires cold for flowering)
- Biennial plants (require cold in first year to flower in second)

**Temperature Required**: Usually 0-10°C for several weeks

**Site of Perception**: Shoot apical meristem

**Mechanism:**
- Induces competence for flowering
- Prevents gibberellin degradation
- Some require both vernalization AND photoperiod

**Examples:**
- Winter wheat, winter rye
- Carrot, beet, cabbage (biennials)

**Applications:**
- Convert winter varieties to spring varieties
- Advance flowering time
- Increase crop yield

## Plant Movements

### Tropic Movements (Tropisms)

**Definition**: Directional growth movements in response to external stimulus

**Types:**

**1. Phototropism** (Response to light)
- Positive: Stem grows toward light
- Negative: Root grows away from light
- Mechanism: Unequal auxin distribution

**2. Geotropism/Gravitropism** (Response to gravity)
- Positive: Root grows downward
- Negative: Stem grows upward
- Mechanism: Starch statoliths, auxin redistribution

**3. Hydrotropism** (Response to water)
- Roots grow toward moisture
- Can overcome gravitropism

**4. Thigmotropism** (Response to touch)
- Tendrils coil around support
- Examples: Pea, grape, passion fruit

**5. Chemotropism** (Response to chemicals)
- Pollen tube growth toward ovule

### Nastic Movements (Nasties)

**Definition**: Non-directional movements in response to stimulus

**Types:**

**1. Photonasty** (Response to light intensity)
- Sunflower head tracking sun
- Opening/closing of flowers (day/night)

**2. Thermonasty** (Response to temperature)
- Tulip flowers opening in warmth

**3. Seismonasty/Thigmonasty** (Response to touch/vibration)
- *Mimosa pudica* (touch-me-not) leaf folding
- Venus flytrap closing
- Mechanism: Turgor changes in pulvinus

**4. Nyctinasty** (Sleep movements)
- Diurnal (day-night) leaf/flower movements
- *Oxalis*, *Tamarindus* (closing at night)
- Circadian rhythm controlled
`,

    keyConcepts: [
      'Growth: irreversible increase in size; Development: growth + differentiation',
      'Differentiation → Dedifferentiation → Redifferentiation',
      'Growth phases: Meristematic, Elongation, Maturation',
      'Arithmetic growth: Lt = L₀ + rt (linear)',
      'Geometric growth: W₁ = W₀e^(rt) (exponential)',
      'Sigmoid curve: Lag → Log → Stationary → Senescence',
      'Plant growth regulators: Auxins, Gibberellins, Cytokinins, ABA, Ethylene',
      'Auxin (IAA): apical dominance, phototropism, root initiation',
      '2,4-D: selective herbicide (synthetic auxin)',
      'Gibberellins (GA₃): stem elongation, bolting, break dormancy',
      'Cytokinins (Zeatin): cell division, delay senescence',
      'Auxin:Cytokinin ratio: High auxin → roots, High cytokinin → shoots',
      'ABA: stress hormone, stomatal closure, seed dormancy',
      'Ethylene: gaseous hormone, fruit ripening, senescence',
      'Photoperiodism: SDP (short-day), LDP (long-day), DNP (day-neutral)',
      'Vernalization: cold treatment promotes flowering',
      'Tropisms: directional (phototropism, gravitropism, thigmotropism)',
      'Nastic movements: non-directional (seismonasty in Mimosa)'
    ],

    formulas: [
      'Arithmetic growth: Lt = L₀ + rt',
      'Geometric growth: W₁ = W₀e^(rt)',
      'Relative growth rate: RGR = (W₁ - W₀)/(W₀ × t)'
    ],

    learningObjectives: [
      'Understand concepts of growth and development',
      'Differentiate between differentiation, dedifferentiation, and redifferentiation',
      'Explain phases of plant growth',
      'Distinguish between arithmetic and geometric growth',
      'Describe the sigmoid growth curve',
      'Identify five major plant growth regulators and their functions',
      'Explain physiological effects of auxins, gibberellins, and cytokinins',
      'Understand role of ABA as stress hormone',
      'Describe ethylene effects on fruit ripening',
      'Explain photoperiodism and classification of plants',
      'Understand vernalization and its significance',
      'Differentiate between tropic and nastic movements'
    ],

    prerequisites: [
      'Understanding of plant tissues and meristems',
      'Knowledge of cell division and differentiation',
      'Basic biochemistry concepts',
      'Understanding of plant anatomy'
    ],

    importantTopics: [
      'Growth vs Development',
      'Differentiation, Dedifferentiation, Redifferentiation',
      'Three phases of growth',
      'Arithmetic vs Geometric growth equations',
      'Sigmoid growth curve',
      'Auxins: IAA, apical dominance, 2,4-D herbicide',
      'Gibberellins: GA₃, bolting, seed germination',
      'Cytokinins: Zeatin, cell division, auxin:cytokinin ratio',
      'ABA: stress hormone, stomatal closure',
      'Ethylene: fruit ripening, climacteric fruits',
      'Photoperiodism: SDP, LDP, DNP classification',
      'Vernalization: cold requirement for flowering',
      'Phototropism: auxin redistribution',
      'Gravitropism: starch statoliths',
      'Seismonasty: Mimosa pudica',
      'Applications of plant hormones in agriculture'
    ],

    ncertChapterRef: 'Class 11 Biology, Chapter 15',
    estimatedStudyMinutes: 360,
    difficultyLevel: 4,
    status: 'published',

    visualizationsData: [
      {
        type: 'graph',
        title: 'Sigmoid Growth Curve',
        description: 'S-shaped curve showing lag, log, stationary, and senescence phases'
      },
      {
        type: 'diagram',
        title: 'Auxin Distribution in Phototropism',
        description: 'Unequal auxin distribution causing stem bending toward light'
      },
      {
        type: 'flowchart',
        title: 'Gibberellin Action in Seed Germination',
        description: 'GA₃ → α-amylase synthesis → starch hydrolysis pathway'
      },
      {
        type: 'comparison',
        title: 'Five Plant Hormones Comparison',
        description: 'Functions, effects, and applications of auxins, GAs, cytokinins, ABA, ethylene'
      },
      {
        type: 'diagram',
        title: 'Photoperiodism Classification',
        description: 'Short-day, long-day, and day-neutral plants with critical photoperiods'
      }
    ]
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Plant Growth and Development',
      estimatedStudyMinutes: 360,
      difficultyLevel: 4,
      status: 'published'
    }
  });

  console.log('✅ Biology Chapter 15: Plant Growth and Development seeded successfully!');
}

seedBiologyChapter15()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding:', error);
    process.exit(1);
  });
